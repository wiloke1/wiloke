import { File, ThemeGeneralSettings } from 'types/Result';
import { PageSection } from 'types/Sections';
import { getPreloader } from 'utils/functions/getPreloader';
import { getJs, getJsLazyload, optimizeSectionJs } from '../generateHelpers';

interface GetAllScriptOfPage_Dùng_ở_watchUpdatePageSettings {
  globalJs: string;
  lazyload: boolean;
  variant: 'Dùng ở watchUpdatePageSettings.ts';
}
interface GetAllScriptOfPageDùng_ở_useResult {
  globalJs: string;
  lazyload: boolean;
  sections_notIncludeAddonSections_includeMegamenuSections: PageSection[];
  variant: 'Dùng ở useResult.ts';
}

export const getAllScriptOfPage = (
  params: GetAllScriptOfPage_Dùng_ở_watchUpdatePageSettings | GetAllScriptOfPageDùng_ở_useResult,
): [File] | [File, File] => {
  const { variant, globalJs, lazyload } = params;
  const lazyloadJs = getJsLazyload(lazyload);

  const globalJsFile: File = {
    // NOTE: @tuong -> Hiện tại file được ghi vào file có tên "assets/<pageType>-veda-<pageCommandId>-scripts.js" và được sử dụng trong file "sections/<pageType>-veda-{pageCommandId}}.liquid" tổng
    /** "Làm dấu" để BE có thể xử lí sync shopify */
    // đánh dấu "/* globalJsBorder */" vì ở ngoài dashboard khi lưu sẽ không thể lấy được js của các "sections"
    content: `
      ${[globalJs, lazyloadJs].join('\n')}
      /* globalJsBorder */
    `,
    type: 'globalJs của page - bảo gồm globalJs và lazyLoadJs của page',
    id: 'globalJs',
    name: 'globalJs',
    section: undefined,
  };

  if (variant === 'Dùng ở watchUpdatePageSettings.ts') {
    return [globalJsFile];
  }
  if (variant === 'Dùng ở useResult.ts') {
    const { sections_notIncludeAddonSections_includeMegamenuSections } = params;
    const jsArr = sections_notIncludeAddonSections_includeMegamenuSections.reduce<string[]>((res, item) => {
      if (item.enable) {
        return res.concat(getJs(item.id, item.data.js ?? ''));
      }
      return res;
    }, []);
    const jsArrOptimized = optimizeSectionJs(jsArr);

    return [
      globalJsFile,
      {
        // NOTE: @tuong -> Hiện tại file được ghi vào file có tên "assets/<pageType>-veda-<pageCommandId>-scripts.js" và được sử dụng trong file "sections/<pageType>-veda-{pageCommandId}}.liquid" tổng
        // cái này đang không làm dấu (có thể làm dấu để đồng bộ)
        content: jsArrOptimized,
        type: 'js của page - bao gồm js của các section',
        name: 'sections',
        id: 'sections',
        section: undefined,
      },
    ];
  }
  throw new Error('getAllScriptOfPage');
};

interface GetAllScriptOfTheme_Dùng_ở_watchUpdatePageSettings {
  globalJs: string;
  themeGeneralSettings: ThemeGeneralSettings;
  variant: 'Dùng ở watchUpdatePageSettings.ts' | 'Dùng ở useResult.ts nhưng là build page';
}
interface GetAllScriptOfTheme_Dùng_ở_useResult {
  globalJs: string;
  themeGeneralSettings: ThemeGeneralSettings;
  headerSections_notIncludeAddonSections_includeMegamenuSections: PageSection[];
  footerSections_notIncludeAddonSections_includeMegamenuSections: PageSection[];
  variant: 'Dùng ở useResult.ts';
}

export const getAllScriptOfTheme = (
  params: GetAllScriptOfTheme_Dùng_ở_watchUpdatePageSettings | GetAllScriptOfTheme_Dùng_ở_useResult,
): [File, File] | [File, File, File, File] => {
  const { variant, globalJs, themeGeneralSettings } = params;
  const { js: preloaderJs } = getPreloader(themeGeneralSettings);

  const globalJsFile: File = {
    // NOTE: @tuong -> Hiện tại file được ghi vào file có tên "assets/global-veda-globalJs.js" và được sử dụng tại "snippets/veda-header-scripts.liquid"
    // "snippets/veda-header-scripts.liquid" được sử dụng tại "theme.liquid" và "theme.veda-landing.liquid"
    /** "Làm dấu" để BE có thể xử lí sync shopify vì ở ngoài dashboard khi lưu sẽ không thể lấy được js của các "header, footer sections" */
    content: `
      //startAssets @veda_id:globalJs @veda_name:globalJs @veda_type:js @veda_content:
      ${[globalJs].join('\n')}
    `,
    type: 'globalJs của theme - bao gồm globalJs của theme',
    name: 'globalJs',
    id: 'globalJs',
    section: undefined,
  };

  const preloaderJsFile: File = {
    // NOTE: @tuong -> Hiện tại file được ghi vào file có tên "assets/global-veda-preloaderJs.js"
    // "@veda_position:footer" thì file sẽ được sử dụng tại "veda-footer-scripts.liquid"
    // "@veda_position:header" thì file sẽ được sử dụng tại "veda-header-scripts.liquid"
    // "veda-footer.liquid" và "veda-header.liquid" sẽ được dùng tại "theme.liquid" và "theme.veda-landing.liquid"
    /** "Làm dấu" để BE có thể xử lí sync shopify vì ở ngoài dashboard khi lưu sẽ không thể lấy được js của các "header, footer sections" */
    content: `
      //startAssets @veda_id:preloaderJs @veda_name:preloader @veda_position:footer @veda_type:js @veda_content:
      ${[preloaderJs].join('\n')}
    `,
    type: 'js của preloader',
    id: 'preloaderJs',
    name: 'preloaderJs',
    section: undefined,
  };

  if (variant === 'Dùng ở watchUpdatePageSettings.ts' || variant === 'Dùng ở useResult.ts nhưng là build page') {
    return [globalJsFile, preloaderJsFile];
  }
  if (variant === 'Dùng ở useResult.ts') {
    const { footerSections_notIncludeAddonSections_includeMegamenuSections, headerSections_notIncludeAddonSections_includeMegamenuSections } = params;
    const headerSectionsJsArr = headerSections_notIncludeAddonSections_includeMegamenuSections.reduce<string[]>((res, item) => {
      if (item.enable) {
        return res.concat(getJs(item.id, item.data.js ?? ''));
      }
      return res;
    }, []);
    const footerSectionsJsArr = footerSections_notIncludeAddonSections_includeMegamenuSections.reduce<string[]>((res, item) => {
      if (item.enable) {
        return res.concat(getJs(item.id, item.data.js ?? ''));
      }
      return res;
    }, []);

    const headerSectionsJsArrOptimized = optimizeSectionJs(headerSectionsJsArr);
    const footerSectionsJsArrOptimized = optimizeSectionJs(footerSectionsJsArr);

    return [
      globalJsFile,
      preloaderJsFile,
      {
        // NOTE: @tuong -> Hiện tại file được ghi vào file có tên "assets/themeheader-veda-<ID>.js" và được sử dụng tại "snippets/veda-theme-header"
        // "snippets/veda-theme-header" được sử dụng tại "theme.liquid" và "theme.veda-landing.liquid"
        /** "Làm dấu" để BE có thể xử lí sync shopify vì ở ngoài dashboard khi lưu sẽ không thể lấy được js của các "header, footer sections" */
        content: `
          //startAssets @veda_id:headerSectionsJs @veda_name:headerSectionsJs @veda_type:js @veda_content:
          ${headerSectionsJsArrOptimized}
        `,
        type: 'js của các section header',
        name: 'jsHeader',
        id: 'jsHeader',
        section: undefined,
      },
      {
        // NOTE: @tuong -> Hiện tại file được ghi vào file có tên "assets/themefooter-veda-<ID>.js" và được sử dụng tại "snippets/veda-theme-footer"
        // "snippets/veda-theme-footer" được sử dụng tại "theme.liquid" và "theme.veda-landing.liquid"
        /** "Làm dấu" để BE có thể xử lí sync shopify vì ở ngoài dashboard khi lưu sẽ không thể lấy được js của các "header, footer sections" */
        content: `
          //startAssets @veda_id:footerSectionsJs @veda_name:footerSectionsJs @veda_type:js @veda_content:
          ${footerSectionsJsArrOptimized}
        `,
        type: 'js của các section footer',
        name: 'jsFooter',
        id: 'jsFooter',
        section: undefined,
      },
    ];
  }
  throw new Error('getAllScriptOfTheme');
};
interface GetAllScriptOfAddonSection {
  addonSection: PageSection;
}
export const getAllScriptOfAddonSection = ({ addonSection }: GetAllScriptOfAddonSection): File => {
  return {
    // NOTE: @tuong -> Hiện tại file được ghi vào file có tên "assets/veda-addon-<ID>.js" và được sử dụng tại "snippets/veda-addon-<ID>.liquid"
    // "snippets/veda-addon-<ID>.liquid" được sử dụng tại file liquid của section chứa addon đó
    // cái này đang không làm dấu (có thể làm dấu để đồng bộ)
    type: 'js của 1 addon',
    id: addonSection.id,
    name: addonSection.label,
    content: getJs(addonSection.id, addonSection.data.js ?? ''),
    section: undefined,
  };
};
