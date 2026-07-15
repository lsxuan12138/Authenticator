import { IconPack, IconPackService } from '../services/IconPackService';

/** LazyForEach 的按需数据源：只在框架请求某个索引时拼接对应图片路径。 */
class IconPathDataSource implements IDataSource {
  private listeners: DataChangeListener[] = [];
  private pack: IconPack;

  /** 为单个图标包创建按需取路径的数据源。 */
  constructor(pack: IconPack) {
    this.pack = pack;
  }

  /** 告诉 LazyForEach 当前图标包包含多少可见项。 */
  totalCount(): number {
    return this.pack.icons.length;
  }

  /** 仅在列表请求某个索引时生成对应文件路径。 */
  getData(index: number): string {
    return IconPackService.iconPathAt(this.pack, index);
  }

  /** 注册 LazyForEach 数据变化监听器，避免重复注册。 */
  registerDataChangeListener(listener: DataChangeListener): void {
    if (this.listeners.indexOf(listener) < 0) {
      this.listeners.push(listener);
    }
  }

  /** 组件销毁时移除监听器，避免持有无效页面引用。 */
  unregisterDataChangeListener(listener: DataChangeListener): void {
    const index = this.listeners.indexOf(listener);
    if (index >= 0) {
      this.listeners.splice(index, 1);
    }
  }
}

/**
 * Token 手动图标选择页。
 * List + LazyForEach + cachedCount 限制同时存在的 Image 节点，避免大图标包一次性解码耗尽内存。
 */
@Component
export struct TokenIconPicker {
  @Prop issuer: string = '';
  @Prop currentPath: string = '';
  @Prop packs: IconPack[] = [];
  onConfirm: (path: string) => void = (_path: string): void => {
  };
  onClose: () => void = (): void => {
  };
  @State private selectedPath: string = '';
  @State private suggestions: string[] = [];
  private sources: Map<string, IconPathDataSource> = new Map();

  /** 页面显示时按当前 issuer 计算推荐图标和各包懒加载数据源。 */
  aboutToAppear(): void {
    this.selectedPath = this.currentPath;
    this.suggestions = IconPackService.suggestedIcons(this.issuer, this.packs);
    // 每个图标包维护独立惰性数据源，分组标题本身仍由轻量的 ForEach 创建。
    this.packs.forEach((pack: IconPack) => {
      this.sources.set(IconPackService.packKey(pack), new IconPathDataSource(pack));
    });
  }

  @Builder
  /** 渲染单个图标选项，并区分恢复自动匹配的特殊入口。 */
  private iconCell(path: string, automatic: boolean = false) {
    ListItem() {
      Column({ space: 5 }) {
        Stack() {
          if (automatic) {
            Text(this.issuer ? this.issuer.substring(0, 1).toUpperCase() : '?')
              .fontSize(20).fontWeight(FontWeight.Bold).fontColor(Color.White)
          } else {
            Image(path).width(42).height(42).objectFit(ImageFit.Contain).draggable(false)
          }
        }
        .width(54)
        .height(54)
        .borderRadius(16)
        .backgroundColor(automatic ? '#4668E8' : $r('app.color.icon_surface'))
        .border({ width: this.selectedPath === path ? 2 : 0, color: '#4668E8' })

        if (automatic) {
          Text('自动').fontSize(11).fontColor($r('app.color.text_tertiary'))
        }
      }.width('100%').height(76).justifyContent(FlexAlign.Center)
      .onClick(() => this.selectedPath = path)
    }
  }

  @Builder
  /** 为图标列表分组生成统一的标题样式。 */
  private sectionHeader(title: string) {
    Text(title)
      .fontSize(14)
      .fontWeight(FontWeight.Medium)
      .fontColor($r('app.color.text_secondary'))
      .width('100%')
      .padding({ left: 4, top: 10, bottom: 8 })
  }

  /** 组合自动模式、推荐项与各图标包的懒加载列表。 */
  build() {
    Column() {
      Row({ space: 10 }) {
        Button() {
          SymbolGlyph($r('sys.symbol.chevron_left'))
            .fontSize(22)
            .fontColor([$r('app.color.text_secondary')])
        }
          .type(ButtonType.Circle)
          .width(38)
          .height(38)
          .backgroundColor($r('app.color.surface_muted'))
          .onClick(() => this.onClose())
        Column({ space: 3 }) {
          Text('选择图标').fontSize(26).fontWeight(FontWeight.Bold)
          Text(this.issuer).fontSize(13).fontColor($r('app.color.text_tertiary')).maxLines(1)
        }.alignItems(HorizontalAlign.Start).layoutWeight(1)

        Button('完成').backgroundColor('#4668E8').onClick(() => this.onConfirm(this.selectedPath))
      }
      .width('100%')
      .padding({
        left: 18,
        right: 18,
        top: 18,
        bottom: 8
      })

      List({ space: 6 }) {
        ListItemGroup({ header: this.sectionHeader('显示方式') }) {
          this.iconCell('', true)
        }

        if (this.suggestions.length > 0) {
          ListItemGroup({ header: this.sectionHeader('推荐') }) {
            ForEach(this.suggestions, (path: string) => {
              this.iconCell(path)
            }, (path: string) => `suggested_${path}`)
          }
        }
        ForEach(this.packs, (pack: IconPack) => {
          ListItemGroup({ header: this.sectionHeader(pack.name) }) {
            LazyForEach(this.sources.get(IconPackService.packKey(pack)) as IconPathDataSource,
              (path: string) => {
                this.iconCell(path)
              }, (path: string) => path)
          }
        }, (pack: IconPack) => IconPackService.packKey(pack))
      }
      .layoutWeight(1)
      .width('100%')
      .height('100%')
      .padding({ left: 12, right: 12, bottom: 12 })
      .lanes({ minLength: 74, maxLength: 74 })
      .cachedCount(10)
      .scrollBar(BarState.Auto)
    }.width('100%').height('100%').backgroundColor($r('app.color.surface'))
  }
}
