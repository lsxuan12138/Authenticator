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

/**
 * Aegis 图标包的安装、发现和匹配服务。
 * 自动匹配只读取当前选中的图标包；Token 的 iconPath 仅作为用户手动覆盖。
 */
export class IconPackService {
  private static readonly DEFAULT_PACK_KEY: string = 'builtin';
  private static readonly SETTINGS_STORE: string = 'icon_settings_v1';
  private static readonly ACTIVE_PACK_KEY: string = 'active_pack';

  static defaultPackKey(): string {
    return IconPackService.DEFAULT_PACK_KEY;
  }

  static packKey(pack: IconPack): string {
    return pack.directory;
  }

  static suggestedIcon(issuer: string, packs: IconPack[], activePackKey: string): string {
    // 当前包没有匹配项时返回空字符串，UI 会显示稳定配色的 Issuer 首字母。
    const normalized = IconPackService.normalize(issuer);
    const active = packs.find((pack: IconPack) => IconPackService.packKey(pack) === activePackKey);
    if (active) {
      for (const icon of active.icons) {
        const matched = (icon.issuer ?? []).some((candidate: string) => {
          const value = IconPackService.normalize(candidate);
          return normalized.includes(value) || value.includes(normalized);
        });
        if (matched) return `file://${active.directory}/${icon.filename}`;
      }
    }
    return '';
  }

  static suggestedIcons(issuer: string, packs: IconPack[]): string[] {
    // 手动选择器会展示所有包中的候选项，不受“当前包”限制。
    const normalized = IconPackService.normalize(issuer);
    const paths: string[] = [];
    for (const pack of packs) {
      for (const icon of pack.icons) {
        const matched = (icon.issuer ?? []).some((candidate: string) => {
          const value = IconPackService.normalize(candidate);
          return normalized.includes(value) || value.includes(normalized);
        });
        if (matched) paths.push(`file://${pack.directory}/${icon.filename}`);
      }
    }
    return paths;
  }

  static resolveIcon(issuer: string, manualPath: string, iconManual: boolean,
    packs: IconPack[], activePackKey: string): string {
    // 手动路径失效（例如图标包被删除）时安全回退到自动匹配。
    if (iconManual && IconPackService.pathExists(manualPath)) return manualPath;
    return IconPackService.suggestedIcon(issuer, packs, activePackKey);
  }

  static iconPathAt(pack: IconPack, index: number): string {
    if (index < 0 || index >= pack.icons.length) return '';
    return `file://${pack.directory}/${pack.icons[index].filename}`;
  }

  static pathExists(path: string): boolean {
    if (!path) return false;
    if (path.startsWith('rawfile://')) return true;
    try {
      return fs.accessSync(path.startsWith('file://') ? path.substring(7) : path);
    } catch (error) {
      const detail = error as BusinessError;
      DiagnosticLogService.warn('IconPack', `Failed to inspect icon path: ${detail.message ?? 'unknown'}`);
      return false;
    }
  }

  static async activePackKey(context: common.UIAbilityContext): Promise<string> {
    try {
      const store = await preferences.getPreferences(context, IconPackService.SETTINGS_STORE);
      return await store.get(IconPackService.ACTIVE_PACK_KEY, IconPackService.DEFAULT_PACK_KEY) as string;
    } catch (error) {
      const detail = error as BusinessError;
      DiagnosticLogService.warn('IconPack', `Failed to read active icon pack: ${detail.message ?? 'unknown'}`);
      return IconPackService.DEFAULT_PACK_KEY;
    }
  }

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

  static async chooseAndImport(context: common.UIAbilityContext): Promise<number> {
    // 系统选择器一次最多选 5 个 ZIP，逐个安装以便单个包拥有独立目录。
    const options = new picker.DocumentSelectOptions();
    options.maxSelectNumber = 5;
    options.fileSuffixFilters = ['.zip'];
    const selected = await new picker.DocumentViewPicker(context).select(options);
    for (const uri of selected) await IconPackService.importZip(context, uri);
    return selected.length;
  }

  static async remove(pack: IconPack): Promise<void> {
    DiagnosticLogService.info('IconPack', `Removing icon pack directory: ${pack.directory}`);
    IconPackService.removeDirectory(pack.directory);
  }

  static async list(context: common.UIAbilityContext): Promise<IconPack[]> {
    try {
      const root = IconPackService.ensureRoot(context);
      const folders = fs.listFileSync(root);
      const result: IconPack[] = [];
      for (const folder of folders) {
        const directory = `${root}/${folder}`;
        const manifest = `${directory}/pack.json`;
        if (!fs.accessSync(manifest)) continue;
        try {
          const parsed = JSON.parse(IconPackService.readText(manifest)) as Record<string, Object>;
          const icons = (parsed['icons'] ?? []) as IconDefinition[];
          // manifest 只能引用包目录内的现有文件，阻止“../”等路径穿越。
          const safeIcons = icons.filter((icon: IconDefinition) => IconPackService.isSafeRelativePath(icon.filename) &&
            fs.accessSync(`${directory}/${icon.filename}`));
          result.push({ id: `${parsed['uuid'] ?? folder}`, name: `${parsed['name'] ?? folder}`,
            version: Number(parsed['version'] ?? 0), directory: directory, icons: safeIcons });
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

  private static async importZip(context: common.UIAbilityContext, uri: string): Promise<void> {
    const root = IconPackService.ensureRoot(context);
    const target = `${root}/pack_${Date.now()}_${util.generateRandomUUID().substring(0, 8)}`;
    // 输出实际解压目录，便于设备日志定位包结构或权限问题。
    DiagnosticLogService.info('IconPack', `Extracting icon pack to: ${target}`);
    try {
      fs.mkdirSync(target);
      const file = fs.openSync(uri, fs.OpenMode.READ_ONLY);
      const source = file.path;
      fs.closeSync(file.fd);
      await zlib.decompressFile(source, target);
      const pack = (await IconPackService.list(context)).find((item: IconPack) => item.directory === target);
      if (!pack || pack.icons.length === 0) throw new Error('图标包缺少有效的 pack.json 或图片');
    } catch (error) {
      const detail = error as BusinessError;
      try {
        IconPackService.removeDirectory(target);
      } catch (cleanupError) {
        const cleanupDetail = cleanupError as BusinessError;
        DiagnosticLogService.error('IconPack',
          `Failed to clean icon pack directory: ${cleanupDetail.message ?? 'unknown'}`);
      }
      throw new Error(`图标包导入失败：${detail.message ?? '未知错误'}`);
    }
  }

  private static ensureRoot(context: common.UIAbilityContext): string {
    const root = `${context.filesDir}/icon_packs`;
    try {
      if (!fs.accessSync(root)) fs.mkdirSync(root);
      return root;
    } catch (error) {
      const detail = error as BusinessError;
      throw new Error(`准备图标包目录失败：${detail.message ?? '未知错误'}`);
    }
  }

  private static normalize(value: string): string {
    return value.trim().toLowerCase().replaceAll(' ', '_').replaceAll('-', '_');
  }

  private static isSafeRelativePath(value: string): boolean {
    return value.length > 0 && !value.startsWith('/') && !value.startsWith('\\') &&
      !value.includes('..') && !value.includes(':');
  }

  private static removeDirectory(path: string): void {
    // 图标包目录只位于应用 filesDir 下；递归删除用于兼容 ZIP 中的子目录。
    try {
      if (!fs.accessSync(path)) return;
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

  private static readText(path: string): string {
    let file: fs.File | undefined;
    let content = '';
    let failure: Error | undefined;
    try {
      file = fs.openSync(path, fs.OpenMode.READ_ONLY);
      const size = fs.statSync(file.fd).size;
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
    if (failure !== undefined) throw failure;
    return content;
  }
}
