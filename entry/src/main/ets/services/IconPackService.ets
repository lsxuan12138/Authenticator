import { common } from '@kit.AbilityKit';
import { BusinessError, zlib } from '@kit.BasicServicesKit';
import { fileIo as fs, picker } from '@kit.CoreFileKit';
import { util } from '@kit.ArkTS';
import { preferences } from '@kit.ArkData';
import { DiagnosticLogService } from './DiagnosticLogService';

export interface IconDefinition {
  filename: string;
  name?: string;
  issuer?: string[];
}

export interface IconPack {
  id: string;
  name: string;
  version: number;
  directory: string;
  icons: IconDefinition[];
}

interface IconPackBudget {
  files: number;
  bytes: number;
}

interface IconPackManifest {
  uuid?: string;
  name?: string;
  version?: number;
  icons?: IconDefinition[];
}

/**
 * Aegis 图标包的安装、发现和匹配服务。
 * 自动匹配只读取当前选中的图标包；Token 的 iconPath 仅作为用户手动覆盖。
 */
export class IconPackService {
  // “不使用图标包”仍需一个稳定键写入 Preferences，但它不代表任何内嵌资源。
  private static readonly NO_PACK_KEY: string = 'no-pack';
  private static readonly SETTINGS_STORE: string = 'icon_settings_v1';
  private static readonly ACTIVE_PACK_KEY: string = 'active_pack';
  private static readonly MAX_ARCHIVE_SIZE: number = 64 * 1024 * 1024;
  private static readonly MAX_EXTRACTED_SIZE: number = 256 * 1024 * 1024;
  private static readonly MAX_FILE_SIZE: number = 8 * 1024 * 1024;
  private static readonly MAX_FILE_COUNT: number = 20000;
  private static readonly MAX_MANIFEST_SIZE: number = 4 * 1024 * 1024;

  /** 返回“不使用任何图标包”的稳定选择键。 */
  static noPackKey(): string {
    return IconPackService.NO_PACK_KEY;
  }

  /** 从 issuer 生成稳定的默认图标背景色，保证各页面预览结果一致。 */
  static fallbackColor(issuer: string): string {
    let hash = 0;
    for (let index = 0; index < issuer.length; index++) {
      hash = issuer.charCodeAt(index) + ((hash << 5) - hash);
    }
    const colors: string[] = ['#4668E8', '#287A52', '#A65B25', '#7A4DA3', '#176C82', '#A33143'];
    return colors[Math.abs(hash) % colors.length];
  }

  /** 从安装目录生成图标包唯一键，供设置持久化使用。 */
  static packKey(pack: IconPack): string {
    return pack.directory;
  }

  /** 仅在当前选中的图标包中查找 issuer 的最佳自动匹配图标。 */
  static suggestedIcon(issuer: string, packs: IconPack[], activePackKey: string): string {
    // 当前包没有匹配项时返回空字符串，UI 会显示稳定配色的 Issuer 首字母。
    const normalized = IconPackService.normalize(issuer);
    const active = packs.find((pack: IconPack) => IconPackService.packKey(pack) === activePackKey);
    if (active) {
      for (const icon of active.icons) {
        const matched = (icon.issuer ?? []).some((candidate: string) => {
          const value = IconPackService.normalize(candidate);
          return normalized.length > 0 && value.length > 0 &&
            (normalized.includes(value) || value.includes(normalized));
        });
        if (matched) {
          return `file://${active.directory}/${icon.filename}`;
        }
      }
    }
    return '';
  }

  /** 汇总所有已安装包中的候选图标，供懒加载选择器展示。 */
  static suggestedIcons(issuer: string, packs: IconPack[]): string[] {
    // 手动选择器会展示所有包中的候选项，不受“当前包”限制。
    const normalized = IconPackService.normalize(issuer);
    const paths: string[] = [];
    for (const pack of packs) {
      for (const icon of pack.icons) {
        const matched = (icon.issuer ?? []).some((candidate: string) => {
          const value = IconPackService.normalize(candidate);
          return normalized.length > 0 && value.length > 0 &&
            (normalized.includes(value) || value.includes(normalized));
        });
        if (matched) {
          paths.push(`file://${pack.directory}/${icon.filename}`);
        }
      }
    }
    return paths;
  }

  /** 按“有效手动选择 > 当前图标包自动匹配 > 默认字母图标”的优先级解析图标。 */
  static resolveIcon(issuer: string, manualPath: string, iconManual: boolean,
    packs: IconPack[], activePackKey: string): string {
    // 手动路径失效（例如图标包被删除）时安全回退到自动匹配。
    if (iconManual && IconPackService.pathExists(manualPath)) {
      return manualPath;
    }
    return IconPackService.suggestedIcon(issuer, packs, activePackKey);
  }

  /** 按索引惰性构造图标路径，避免一次创建大量 Image 资源。 */
  static iconPathAt(pack: IconPack, index: number): string {
    if (index < 0 || index >= pack.icons.length) {
      return '';
    }
    return `file://${pack.directory}/${pack.icons[index].filename}`;
  }

  /** 检查用户安装图标包中的沙箱文件当前是否仍可访问。 */
  static pathExists(path: string): boolean {
    if (!path) {
      return false;
    }
    try {
      return fs.accessSync(path.startsWith('file://') ? path.substring(7) : path);
    } catch (error) {
      const detail = error as BusinessError;
      DiagnosticLogService.warn('IconPack', `Failed to inspect icon path: ${detail.message ?? 'unknown'}`);
      return false;
    }
  }

  /** 读取用户选择的活动图标包键，未设置时回退默认模式。 */
  static async activePackKey(context: common.UIAbilityContext): Promise<string> {
    try {
      const store = await preferences.getPreferences(context, IconPackService.SETTINGS_STORE);
      return await store.get(IconPackService.ACTIVE_PACK_KEY, IconPackService.NO_PACK_KEY) as string;
    } catch (error) {
      const detail = error as BusinessError;
      DiagnosticLogService.warn('IconPack', `Failed to read active icon pack: ${detail.message ?? 'unknown'}`);
      return IconPackService.NO_PACK_KEY;
    }
  }

  /** 持久化活动图标包选择，不修改 Token 的手动图标字段。 */
  static async selectPack(context: common.UIAbilityContext, key: string): Promise<void> {
    try {
      const store = await preferences.getPreferences(context, IconPackService.SETTINGS_STORE);
      await store.put(IconPackService.ACTIVE_PACK_KEY, key);
      await store.flush();
    } catch (error) {
      const detail = error as BusinessError;
      throw new Error(`保存当前图标包失败：${detail.message ?? '未知错误'}`);
    }
  }

  /** 选择一个或多个 ZIP 图标包并逐个安装，返回成功数量。 */
  static async chooseAndImport(context: common.UIAbilityContext): Promise<number> {
    // 系统选择器一次最多选 5 个 ZIP，逐个安装以便单个包拥有独立目录。
    const options = new picker.DocumentSelectOptions();
    options.maxSelectNumber = 5;
    options.fileSuffixFilters = ['.zip'];
    const selected = await new picker.DocumentViewPicker(context).select(options);
    for (const uri of selected) {
      await IconPackService.importZip(context, uri);
    }
    return selected.length;
  }

  /** 删除指定已安装图标包的沙箱目录。 */
  static async remove(context: common.UIAbilityContext, pack: IconPack): Promise<void> {
    const root = IconPackService.ensureRoot(context);
    if (!pack.directory.startsWith(`${root}/`) || pack.directory.includes('..')) {
      throw new Error('拒绝删除图标包安装目录之外的路径');
    }
    DiagnosticLogService.info('IconPack', `Removing icon pack directory: ${pack.directory}`);
    IconPackService.removeDirectory(pack.directory);
  }

  /** 扫描安装目录并读取有效清单，跳过损坏或不完整的图标包。 */
  static async list(context: common.UIAbilityContext): Promise<IconPack[]> {
    try {
      const root = IconPackService.ensureRoot(context);
      const folders = fs.listFileSync(root);
      const result: IconPack[] = [];
      for (const folder of folders) {
        const directory = `${root}/${folder}`;
        try {
          result.push(IconPackService.readPack(directory, folder));
        } catch (error) {
          const detail = error as BusinessError;
          DiagnosticLogService.warn('IconPack',
            `Ignoring invalid icon pack ${directory}: ${detail.message ?? 'unknown'}`);
        }
      }
      return result;
    } catch (error) {
      const detail = error as BusinessError;
      throw new Error(`读取已安装图标包失败：${detail.message ?? '未知错误'}`);
    }
  }

  /** 将单个 ZIP 解压到随机临时目录，校验清单后再移动到正式目录。 */
  private static async importZip(context: common.UIAbilityContext, uri: string): Promise<void> {
    const root = IconPackService.ensureRoot(context);
    const suffix = `${Date.now()}_${util.generateRandomUUID().substring(0, 8)}`;
    const staging = `${context.tempDir}/icon_pack_${suffix}`;
    const target = `${root}/pack_${suffix}`;
    // 输出实际解压目录，便于设备日志定位包结构或权限问题。
    DiagnosticLogService.info('IconPack', `Extracting icon pack to temporary directory: ${staging}`);
    try {
      fs.mkdirSync(staging);
      const file = fs.openSync(uri, fs.OpenMode.READ_ONLY);
      let source = '';
      let archiveSize = 0;
      try {
        source = file.path;
        archiveSize = fs.statSync(file.fd).size;
      } finally {
        fs.closeSync(file.fd);
      }
      if (archiveSize <= 0 || archiveSize > IconPackService.MAX_ARCHIVE_SIZE) {
        throw new Error('图标包为空或压缩文件超过 64MB');
      }
      await zlib.decompressFile(source, staging);
      IconPackService.validateExtractedDirectory(staging);
      const pack = IconPackService.readPack(staging, `pack_${suffix}`);
      if (pack.icons.length === 0) {
        throw new Error('图标包缺少有效的 pack.json 或图片');
      }
      // rename 对目录生效；成功前临时目录不会被已安装图标包扫描发现。
      await fs.rename(staging, target);
    } catch (error) {
      const detail = error as BusinessError;
      try {
        IconPackService.removeDirectory(staging);
      } catch (cleanupError) {
        const cleanupDetail = cleanupError as BusinessError;
        DiagnosticLogService.error('IconPack',
          `Failed to clean temporary icon pack directory: ${cleanupDetail.message ?? 'unknown'}`);
      }
      throw new Error(`图标包导入失败：${detail.message ?? '未知错误'}`);
    }
    DiagnosticLogService.info('IconPack', `Installed icon pack directory: ${target}`);
  }

  /** 从指定目录读取并校验图标包清单，可同时用于临时安装区和正式安装区。 */
  private static readPack(directory: string, fallbackId: string): IconPack {
    const manifest = `${directory}/pack.json`;
    if (!IconPackService.isAccessible(manifest)) {
      throw new Error('图标包缺少 pack.json');
    }
    const parsed = JSON.parse(IconPackService.readText(manifest)) as IconPackManifest;
    const source = parsed.icons;
    if (!Array.isArray(source)) {
      throw new Error('pack.json 的 icons 必须是数组');
    }
    // manifest 只能引用包目录内的现有文件，issuer 也必须是字符串数组，避免坏清单延迟到首页才崩溃。
    const safeIcons = source.filter((icon: IconDefinition): boolean =>
      icon !== null && typeof icon === 'object' && IconPackService.isSafeRelativePath(icon.filename) &&
      (icon.issuer === undefined || Array.isArray(icon.issuer) &&
        icon.issuer.every((issuer: string): boolean => typeof issuer === 'string')) &&
      IconPackService.isAccessible(`${directory}/${icon.filename}`));
    const version = typeof parsed.version === 'number' && Number.isFinite(parsed.version) ? parsed.version : 0;
    return {
      id: typeof parsed.uuid === 'string' && parsed.uuid.trim().length > 0 ? parsed.uuid : fallbackId,
      name: typeof parsed.name === 'string' && parsed.name.trim().length > 0 ? parsed.name : fallbackId,
      version: version,
      directory: directory,
      icons: safeIcons
    };
  }

  /** 将可能抛出文件系统异常的存在性检查转换为安全布尔结果。 */
  private static isAccessible(path: string): boolean {
    try {
      return fs.accessSync(path);
    } catch (_error) {
      return false;
    }
  }

  /** 创建并返回图标包安装根目录。 */
  private static ensureRoot(context: common.UIAbilityContext): string {
    const root = `${context.filesDir}/icon_packs`;
    try {
      if (!fs.accessSync(root)) {
        fs.mkdirSync(root);
      }
      return root;
    } catch (error) {
      const detail = error as BusinessError;
      throw new Error(`准备图标包目录失败：${detail.message ?? '未知错误'}`);
    }
  }

  /** 规范化 issuer 与图标名，以进行大小写和符号无关匹配。 */
  private static normalize(value: string): string {
    return value.trim().toLowerCase().replaceAll(' ', '_').replaceAll('-', '_');
  }

  /** 拒绝绝对路径和目录穿越，确保清单只能引用包内文件。 */
  private static isSafeRelativePath(value: string): boolean {
    return typeof value === 'string' && value.length > 0 && !value.startsWith('/') && !value.startsWith('\\') &&
      !value.includes('..') && !value.includes(':');
  }

  /** 解压后限制文件数、单文件和总大小，避免异常图标包长期占满应用沙箱。 */
  private static validateExtractedDirectory(directory: string): void {
    const budget: IconPackBudget = { files: 0, bytes: 0 };
    IconPackService.inspectDirectory(directory, budget);
  }

  /** 递归累加解压目录预算，达到任一上限时立即终止安装并由调用方清理临时目录。 */
  private static inspectDirectory(directory: string, budget: IconPackBudget): void {
    try {
      for (const name of fs.listFileSync(directory)) {
        const path = `${directory}/${name}`;
        const stat = fs.statSync(path);
        if (stat.isDirectory()) {
          IconPackService.inspectDirectory(path, budget);
          continue;
        }
        budget.files++;
        budget.bytes += stat.size;
        if (stat.size > IconPackService.MAX_FILE_SIZE) {
          throw new Error(`图标包中存在超过 8MB 的单个文件：${name}`);
        }
        if (budget.files > IconPackService.MAX_FILE_COUNT || budget.bytes > IconPackService.MAX_EXTRACTED_SIZE) {
          throw new Error('图标包解压后超过 20000 个文件或 256MB');
        }
      }
    } catch (error) {
      const detail = error as BusinessError;
      throw new Error(`检查图标包解压内容失败：${detail.message ?? '未知错误'}`);
    }
  }

  /** 在已确认的包目录内递归删除文件，用于卸载和失败回滚。 */
  private static removeDirectory(path: string): void {
    // 图标包目录只位于应用 filesDir 下；递归删除用于兼容 ZIP 中的子目录。
    try {
      if (!fs.accessSync(path)) {
        return;
      }
      const children = fs.listFileSync(path);
      for (const name of children) {
        const child = `${path}/${name}`;
        const stat = fs.statSync(child);
        if (stat.isDirectory()) {
          IconPackService.removeDirectory(child);
        } else {
          fs.unlinkSync(child);
        }
      }
      fs.rmdirSync(path);
    } catch (error) {
      const detail = error as BusinessError;
      throw new Error(`删除图标包目录失败（${path}）：${detail.message ?? '未知错误'}`);
    }
  }

  /** 读取图标包清单文本，并在所有异常路径关闭文件句柄。 */
  private static readText(path: string): string {
    let file: fs.File | undefined;
    let content = '';
    let failure: Error | undefined;
    try {
      file = fs.openSync(path, fs.OpenMode.READ_ONLY);
      const size = fs.statSync(file.fd).size;
      if (size <= 0 || size > IconPackService.MAX_MANIFEST_SIZE) {
        throw new Error('pack.json 为空或超过 4MB');
      }
      const data = new ArrayBuffer(size);
      const count = fs.readSync(file.fd, data);
      content = new util.TextDecoder().decodeToString(new Uint8Array(data.slice(0, count)));
    } catch (error) {
      const detail = error as BusinessError;
      failure = new Error(`读取图标包清单失败：${detail.message ?? '未知错误'}`);
    }
    if (file !== undefined) {
      try {
        fs.closeSync(file.fd);
      } catch (error) {
        if (failure === undefined) {
          const detail = error as BusinessError;
          failure = new Error(`关闭图标包清单失败：${detail.message ?? '未知错误'}`);
        }
      }
    }
    if (failure !== undefined) {
      throw failure;
    }
    return content;
  }
}
