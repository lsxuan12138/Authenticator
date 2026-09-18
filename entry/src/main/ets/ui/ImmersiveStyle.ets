import {
  BlurStrategy,
  hdsMaterial,
  HdsTabsFloatingStyle,
  ScrollEffectType,
  SystemMaterialParams,
  TitleBarStyleOptions
} from '@kit.UIDesignKit';

/** AppStorage 中保存底部导航指示区高度（vp）的键。 */
export const APP_NAVIGATION_INDICATOR_HEIGHT_KEY: string =
  'authenticator.navigationIndicatorHeight';
/** AppStorage 中保存顶部系统状态栏高度（vp）的键。 */
export const APP_STATUS_BAR_HEIGHT_KEY: string = 'authenticator.statusBarHeight';

/**
 * 沉浸式界面的公共 HDS 样式。
 *
 * ResourceColor 由页面传入，避免工具类自行解析主题资源；系统切换深浅色时，
 * ArkUI 仍会按当前资源限定词刷新颜色。
 */
export class ImmersiveStyle {
  /** 所有沉浸式容器统一使用系统推荐的自适应材质参数。 */
  static materialEffect(): SystemMaterialParams {
    return {
      materialType: hdsMaterial.MaterialType.ADAPTIVE,
      materialLevel: hdsMaterial.MaterialLevel.ADAPTIVE
    };
  }

  /**
   * 创建标题栏样式，并显式声明展开态和滚动态颜色。
   * 这样标题进入渐变模糊区域后不会沿用不适合当前主题的默认前景色。
   */
  static titleBarStyle(
    enableScrollEffect: boolean,
    primaryColor: ResourceColor,
    secondaryColor: ResourceColor,
    tertiaryColor: ResourceColor,
    scrollBackgroundColor: ResourceColor,
    scrollEffectType: ScrollEffectType = ScrollEffectType.GRADIENT_BLUR,
    originalBackgroundColor: ResourceColor = Color.Transparent,
    originalBlurRadius: number = 0
  ): TitleBarStyleOptions {
    return {
      scrollEffectOpts: {
        enableScrollEffect: enableScrollEffect,
        scrollEffectType: scrollEffectType
      },
      blurStrategy: BlurStrategy.ADAPTIVE,
      originalStyle: {
        backgroundStyle: {
          backgroundColor: originalBackgroundColor,
          blurRadius: originalBlurRadius
        },
        contentStyle: {
          titleStyle: {
            mainTitleColor: primaryColor,
            subTitleColor: tertiaryColor
          },
          menuStyle: {
            backgroundColor: Color.Transparent,
            iconColor: secondaryColor,
            textColor: secondaryColor
          },
          backIconStyle: {
            backgroundColor: Color.Transparent,
            iconColor: secondaryColor
          }
        }
      },
      scrollEffectStyle: {
        backgroundStyle: {
          // 模糊负责保留内容层次，半透明主题遮罩负责压低背后文字的对比度。
          backgroundColor: scrollBackgroundColor,
          // 显式设置滚动态半径，避免模拟器将自适应默认值降级为不可见效果。
          blurRadius: 20,
          maskExtraHeight: 32
        },
        contentStyle: {
          titleStyle: {
            mainTitleColor: primaryColor,
            subTitleColor: tertiaryColor
          },
          menuStyle: {
            backgroundColor: Color.Transparent,
            iconColor: secondaryColor,
            textColor: secondaryColor
          },
          backIconStyle: {
            backgroundColor: Color.Transparent,
            iconColor: secondaryColor
          }
        }
      },
      systemMaterialEffect: ImmersiveStyle.materialEffect()
    };
  }

  /**
   * 为文字密集型表单创建始终生效的均匀模糊标题栏。
   * 不绑定滚动状态可避免临界偏移处在透明态与模糊态之间反复切换。
   */
  static formTitleBarStyle(
    primaryColor: ResourceColor,
    secondaryColor: ResourceColor,
    tertiaryColor: ResourceColor,
    scrollBackgroundColor: ResourceColor
  ): TitleBarStyleOptions {
    return ImmersiveStyle.titleBarStyle(false, primaryColor, secondaryColor, tertiaryColor,
      scrollBackgroundColor, ScrollEffectType.COMMON_BLUR, scrollBackgroundColor, 20);
  }

  /** 根据设备底部指示区调整悬浮一级页签，避免依赖固定机型间距。 */
  static floatingTabs(
    navigationIndicatorHeight: number,
    lightColor: ResourceColor
  ): HdsTabsFloatingStyle {
    return {
      // 不覆盖 HDS 的分档默认宽度。两个页签在手机上约为 152vp，
      // 比原先固定的 224vp 更接近系统应用常用的紧凑胶囊比例。
      barBottomMargin: ImmersiveStyle.floatingBottomMargin(navigationIndicatorHeight),
      // 保留 HDS 蒙层占位，但使用透明蒙层，避免列表卡片被白色区域截断。
      gradientMask: {
        maskColor: Color.Transparent,
        maskHeight: 84
      },
      lightColor: lightColor,
      systemMaterialEffect: ImmersiveStyle.materialEffect()
    };
  }

  /** 为被悬浮页签覆盖的列表提供末尾滚动偏移，避免用 padding 截断绘制区域。 */
  static listEndOffset(navigationIndicatorHeight: number): number {
    return 72 + ImmersiveStyle.floatingBottomMargin(navigationIndicatorHeight);
  }

  /** MINI 标题栏高 56vp；首屏内容在状态栏、标题栏及常规间距之后开始。 */
  static miniTitleContentTopPadding(statusBarHeight: number): number {
    return Math.max(0, statusBarHeight) + 56 + 14;
  }

  /**
   * 保留导航手势区的安全距离，同时向下利用其顶部 6vp 空间。
   * 这能避免整块胶囊因完整避让区而显得悬得过高，也不会覆盖手势指示条。
   */
  private static floatingBottomMargin(navigationIndicatorHeight: number): number {
    if (navigationIndicatorHeight <= 0) {
      return 8;
    }
    return Math.max(8, navigationIndicatorHeight - 6);
  }
}
