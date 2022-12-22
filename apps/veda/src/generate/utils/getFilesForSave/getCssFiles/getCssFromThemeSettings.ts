import { getCssColorVariables, getCssFontVariables, getCssFromLayoutSettings } from 'generate/utils/generateHelpers';
import { CssVariables, File, LayoutSettings, ThemeGeneralSettings } from 'types/Result';
import { PageSection } from 'types/Sections';
import { getPreloader } from 'utils/functions/getPreloader';
import { sassCompile } from 'utils/functions/sass';
import defaultGlobalScss from 'generate/scss/scss';
import { isSectionAddons } from 'utils/functions/checkSectionType';
import { inlineCss } from 'utils/functions/InlineCss';

interface GetCssFromThemeSettings_Dùng_ở_watchUpdatePageSettings {
  globalScss: string;
  variant: 'Dùng ở watchUpdatePageSettings.ts' | 'Dùng ở useResult.ts nhưng là build page';
  themeGeneralSettings: ThemeGeneralSettings;
  cssVariables: CssVariables;
  layout: LayoutSettings;
}
interface GetCssFromThemeSettings_Dùng_ở_useResult {
  globalScss: string;
  variant: 'Dùng ở useResult.ts';
  themeGeneralSettings: ThemeGeneralSettings;
  cssVariables: CssVariables;
  layout: LayoutSettings;
  headerSections_notIncludeAddonSections_includeMegamenuSections: PageSection[];
  footerSections_notIncludeAddonSections_includeMegamenuSections: PageSection[];
}

export const getCssFromThemeSettings = async (
  params: GetCssFromThemeSettings_Dùng_ở_watchUpdatePageSettings | GetCssFromThemeSettings_Dùng_ở_useResult,
): Promise<[File, File] | [File, File, File, File]> => {
  const { variant, cssVariables, layout, globalScss, themeGeneralSettings } = params;
  const { containerWidth, containerGap, columnGapX, columnGapY } = layout;
  const { colors, fonts } = cssVariables;
  const strCssVariables = `
  :root { ${getCssColorVariables(colors, false)}${getCssColorVariables(colors, false, true)}${getCssFontVariables(fonts)} }
  :root.dark { ${getCssColorVariables(colors, true)} }
  `.trim();
  const cssFromLayoutSettings = getCssFromLayoutSettings(containerWidth, containerGap, columnGapX, columnGapY);

  const [_globalScss, _defaultGlobalScss] = await Promise.all([sassCompile.client(globalScss), sassCompile.client(defaultGlobalScss)]);
  const { css: preloaderCss } = getPreloader(themeGeneralSettings);

  const globalThemeCssFile: File = {
    // NOTE: @tuong -> Hiện tại file được ghi vào file có tên "assets/global-veda-globalCss.css" và được sử dụng tại "snippets/veda-header-scripts.liquid"
    // "snippets/veda-header-scripts.liquid" được sử dụng tại "theme.liquid" và "theme.veda-landing.liquid"
    /** "Làm dấu" để BE có thể xử lí sync shopify vì ở ngoài dashboard khi lưu sẽ không thể lấy được css của các "header, footer sections" */
    content: `
      //startAssets @veda_id:globalCss @veda_name:globalCss @veda_type:css @veda_content:
      ${[_globalScss, _defaultGlobalScss, strCssVariables, cssFromLayoutSettings].join('\n')}
    `,
    type: 'globalCss của theme - bao gồm layout, colors, fonts, scss của theme',
    name: 'globalCss',
    id: 'globalCss',
    section: undefined,
  };

  const preloaderCssFile: File = {
    // NOTE: @tuong -> Hiện tại file được ghi vào file có tên "assets/global-veda-preloaderCss.css"
    // "@veda_position:footer" thì file sẽ được sử dụng tại "veda-footer-scripts.liquid"
    // "@veda_position:header" thì file sẽ được sử dụng tại "veda-header-scripts.liquid"
    // "veda-footer.liquid" và "veda-header.liquid" sẽ được dùng tại "theme.liquid" và "theme.veda-landing.liquid"
    /** "Làm dấu" để BE có thể xử lí sync shopify vì ở ngoài dashboard khi lưu sẽ không thể lấy được js của các "header, footer sections" */
    content: `
      //startAssets @veda_id:preloaderCss @veda_name:preloader @veda_position:footer @veda_type:css @veda_content:
      ${[preloaderCss].join('\n')}
    `,
    type: 'css của preloader',
    name: 'preloaderCss',
    id: 'preloaderCss',
    section: undefined,
  };

  if (variant === 'Dùng ở watchUpdatePageSettings.ts' || variant === 'Dùng ở useResult.ts nhưng là build page') {
    return [globalThemeCssFile, preloaderCssFile];
  }
  if (variant === 'Dùng ở useResult.ts') {
    const { headerSections_notIncludeAddonSections_includeMegamenuSections, footerSections_notIncludeAddonSections_includeMegamenuSections } = params;
    const headerSectionsCss = await Promise.all(
      headerSections_notIncludeAddonSections_includeMegamenuSections.reduce<Promise<string>[]>((res, item) => {
        if (item.enable && !isSectionAddons(item.type)) {
          return res.concat(sassCompile.client(item.data.scss ?? '', item.id));
        }
        return res;
      }, []),
    );
    const footerSectionsCss = await Promise.all(
      footerSections_notIncludeAddonSections_includeMegamenuSections.reduce<Promise<string>[]>((res, item) => {
        if (item.enable) {
          return res.concat(sassCompile.client(item.data.scss ?? '', item.id));
        }
        return res;
      }, []),
    );
    return [
      globalThemeCssFile,
      preloaderCssFile,
      {
        // NOTE: @tuong -> Hiện tại file được ghi vào file có tên "assets/themeheader-veda-<ID>.css" và được sử dụng tại "snippets/veda-theme-header"
        // "snippets/veda-theme-header" được sử dụng tại "theme.liquid" và "theme.veda-landing.liquid"
        /** "Làm dấu" để BE có thể xử lí sync shopify vì ở ngoài dashboard khi lưu sẽ không thể lấy được css của các "header, footer sections" */
        type:
          'css của các sections thuộc header - chỉ gồm css của các sections thuộc header và css inline của các sections thuộc header, không bao gồm atomic css',
        content: `
          //startAssets @veda_id:headerSectionsCss @veda_name:headerSectionsCss @veda_type:css @veda_content:
          ${[
            inlineCss.getCssFromSettings(footerSections_notIncludeAddonSections_includeMegamenuSections.map(section => section.data.settings)),
            ...headerSectionsCss,
          ].join('\n')}
        `,
        id: 'header',
        name: 'header',
        section: undefined,
      },
      {
        // NOTE: @tuong -> Hiện tại file được ghi vào file có tên "assets/themefooter-veda-<ID>.css" và được sử dụng tại "snippets/veda-theme-footer"
        // "snippets/veda-theme-footer" được sử dụng tại "theme.liquid" và "theme.veda-landing.liquid"
        /** "Làm dấu" để BE có thể xử lí sync shopify vì ở ngoài dashboard khi lưu sẽ không thể lấy được css của các "header, footer sections" */
        type:
          'css của các sections thuộc footer - chỉ gồm css của các sections thuộc footer và css inline của các sections thuộc footer, không bao gồm atomic css',
        content: `
          //startAssets @veda_id:footerSectionsCss @veda_name:footerSectionsCss @veda_type:css @veda_content:
          ${[
            inlineCss.getCssFromSettings(footerSections_notIncludeAddonSections_includeMegamenuSections.map(section => section.data.settings)),
            ...footerSectionsCss,
          ].join('\n')}
        `,
        id: 'footer',
        name: 'footer',
        section: undefined,
      },
    ];
  }
  throw new Error('GetCssFromThemeSettings');
};
