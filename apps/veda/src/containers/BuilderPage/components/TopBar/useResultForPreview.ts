import { isThemeBuilder } from 'utils/validateBuilderMode';
import {
  getVendorsOfPage,
  getVendorsOfTheme,
  getHtmlFilesOfAddon,
  getHtmlFilesOfPage,
  getHtmlFilesOfTheme,
  getAllScriptOfAddonSection,
  getAllScriptOfPage,
  getAllScriptOfTheme,
  ErrorOption,
  getCssFromSectionsScss_PageScss_SectionsInlinesCss,
} from 'generate/utils/getFilesForSave';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { defaultGeneralSettings } from 'store/global/generalSettings/slice';
import { defaultVendors } from 'store/reducers/reducerVendors';
import {
  allGeneralSettingsSelector,
  allGlobalJsSelector,
  allGlobalScssSelector,
  allVendorsSelector,
  pagesSelector,
  themeAddonsSelector,
  themeHeaderFooterSelector,
  themeSettingsSelector,
} from 'store/selectors';
import { PageData, Result, ThemeTranslations } from 'types/Result';
import { isDefault, isFooter, isHeader, isMain, isSectionAddons, isSectionMegamenu } from 'utils/functions/checkSectionType';
import getPageInfo from 'utils/functions/getInfo';
import { pmParent } from 'utils/functions/postMessage';
import { getCssFromThemeSettings } from 'generate/utils/getFilesForSave/getCssFiles/getCssFromThemeSettings';
import { getCssFromAddonScss } from 'generate/utils/getFilesForSave/getCssFiles/getCssFromAddonScss';

const useResultForPreview = () => {
  const pages = useSelector(pagesSelector);
  const allGeneralSettings = useSelector(allGeneralSettingsSelector);
  const allVendors = useSelector(allVendorsSelector);
  const allGlobalScss = useSelector(allGlobalScssSelector);
  const allGlobalJs = useSelector(allGlobalJsSelector);
  const themeAddons = useSelector(themeAddonsSelector);
  const {
    globalJs: globalJsOfTheme,
    globalScss: globalScssOfTheme,
    vendors: vendorsOfTheme,
    layoutSettings,
    cssVariables,
    generalSettings: themeGeneralSettings,
    globalTranslations,
  } = useSelector(themeSettingsSelector);
  const { footers, headers } = useSelector(themeHeaderFooterSelector);

  const themeId = getPageInfo('themeId');
  const [isExtracting, setIsExtracting] = useState(false);

  const getResultOfAtomicCss = (pageId: string): Promise<Result['pages'][string]['atomicCss']> => {
    return new Promise(resolve => {
      const pmOff = pmParent.on('@atomicCss/fulfill', ({ uniqId, atomicCss }) => {
        if (uniqId === pageId) {
          pmOff();
          resolve(atomicCss);
        }
      });
      pmParent.emit('@atomicCss/request', { uniqId: pageId });
    });
  };

  // Trường hợp builderType='page' -> header và footer như 1 section bình thường
  const getResultOfPage = async (errorOption: ErrorOption): Promise<Result['pages']> => {
    const pageId = getPageInfo('id');
    const pages_ = { [pageId]: pages.data[pageId] };
    const resultInArray = await Promise.all(
      Object.entries(pages_).map(async ([pageId, page]) => {
        const vendors = allVendors[pageId] ?? defaultVendors;
        const globalScss = allGlobalScss[pageId] ?? '';
        const globalJs = allGlobalJs[pageId] ?? '';
        const generalSettings = allGeneralSettings[pageId] ?? defaultGeneralSettings;
        const mainSections = page.sections.filter(section => {
          return section.enable && (isMain(section.type) || isDefault(section.type) || isSectionMegamenu(section.type));
        });
        const htmlFiles = [
          ...getHtmlFilesOfPage({
            sections_notIncludeAddonSections_includeMegamenuSections: mainSections,
            errorOption,
            lazyload: generalSettings.lazyload,
          }),
        ];
        const js = getAllScriptOfPage({
          variant: 'Dùng ở useResult.ts',
          globalJs,
          sections_notIncludeAddonSections_includeMegamenuSections: mainSections,
          lazyload: generalSettings.lazyload,
        });
        const css = await getCssFromSectionsScss_PageScss_SectionsInlinesCss({
          variant: 'Dùng ở useResult.ts',
          globalScss,
          sections_notIncludeAddonSections_includeMegamenuSections: mainSections,
        });

        const atomicCss = await getResultOfAtomicCss(pageId);

        const result: PageData = {
          data: {
            page: {
              ...page,
              // Xoá section nào là addons vì nó đã được thế vào các section
              sections: mainSections.filter(section => section.enable && !isSectionAddons(section.type)),
            },
            pageSettings: {
              generalSettings,
              vendors,
              globalScss,
              globalJs,
            },
          },
          files: [...getVendorsOfPage({ vendors, lazyload: generalSettings.lazyload }), ...css, ...js, ...htmlFiles],
          atomicCss,
        };
        return result;
      }),
    );

    return resultInArray.reduce<Result['pages']>(
      (obj, item) => ({
        ...obj,
        ...(!!item.data.page.sections.length ? { [item.data.page.commandId]: item } : {}),
      }),
      {},
    );
  };

  const getResultOfTheme = async (errorOption: ErrorOption): Promise<Result['theme']> => {
    if (isThemeBuilder()) {
      const pageId = getPageInfo('id');
      const pageData = pages.data[pageId];
      const { headerSections, footerSections } = pageData.sections.reduce<{
        headerSections: Result['theme']['header'];
        footerSections: Result['theme']['footer'];
      }>(
        (res, section) => {
          if (isHeader(section.type) && res.headerSections) {
            return {
              ...res,
              headerSections: res.headerSections.concat(section),
            };
          }
          if (isFooter(section.type) && res.footerSections) {
            return {
              ...res,
              footerSections: res.footerSections.concat(section),
            };
          }
          return res;
        },
        {
          headerSections: [],
          footerSections: [],
        },
      );
      const js = getAllScriptOfTheme({
        variant: 'Dùng ở useResult.ts',
        footerSections_notIncludeAddonSections_includeMegamenuSections: footerSections ?? [],
        headerSections_notIncludeAddonSections_includeMegamenuSections: headerSections ?? [],
        globalJs: globalJsOfTheme,
        themeGeneralSettings,
      });
      // NOTE: @tuong -> Tách ra 2 headers, footers riêng vì có 2 fileType (css headers..., css footers...) => Tại thời điểm comment này được viết có thể gộp vào làm 1 nhưng vì có thể có sự thay đổi trong luồng ghi file (vị trí file, ...) nên viết thế này sẽ dễ thay đổi hơn
      const [htmlFilesInPreloader, ...htmlFilesInHeader] = getHtmlFilesOfTheme({
        footerSections_notIncludeAddonSections_includeMegamenuSections: [],
        headerSections_notIncludeAddonSections_includeMegamenuSections: headerSections ?? [],
        themeGeneralSettings,
        errorOption,
        variant: 'Dùng ở useResult.ts',
      });
      const [, ...htmlFilesInFooter] = getHtmlFilesOfTheme({
        footerSections_notIncludeAddonSections_includeMegamenuSections: footerSections ?? [],
        headerSections_notIncludeAddonSections_includeMegamenuSections: [],
        themeGeneralSettings,
        errorOption,
        variant: 'Dùng ở useResult.ts',
      });
      const css = await getCssFromThemeSettings({
        footerSections_notIncludeAddonSections_includeMegamenuSections: footerSections ?? [],
        headerSections_notIncludeAddonSections_includeMegamenuSections: headerSections ?? [],
        globalScss: globalScssOfTheme,
        themeGeneralSettings,
        variant: 'Dùng ở useResult.ts',
        cssVariables,
        layout: layoutSettings,
      });
      const vendors = getVendorsOfTheme({ vendors: vendorsOfTheme, themeGeneralSettings, cssVariables });
      return {
        themeSettings: {
          generalSettings: themeGeneralSettings,
          cssVariables,
          layoutSettings,
          globalTranslations: globalTranslations.translation as ThemeTranslations,
        },
        addons: themeAddons.data,
        header: headerSections,
        footer: footerSections,
        themeId: themeId,
        vendors: vendorsOfTheme,
        globalJs: globalJsOfTheme,
        globalScss: globalScssOfTheme,
        files: [...js, ...css, ...htmlFilesInHeader, ...htmlFilesInFooter, htmlFilesInPreloader, ...vendors],
      };
    } else {
      const js = getAllScriptOfTheme({
        variant: 'Dùng ở useResult.ts nhưng là build page',
        globalJs: globalJsOfTheme,
        themeGeneralSettings,
      });
      const [htmlFilesInPreloader] = getHtmlFilesOfTheme({
        themeGeneralSettings,
        variant: 'Dùng ở useResult.ts nhưng là build page',
      });
      const css = await getCssFromThemeSettings({
        globalScss: globalScssOfTheme,
        themeGeneralSettings,
        variant: 'Dùng ở useResult.ts nhưng là build page',
        cssVariables,
        layout: layoutSettings,
      });
      const vendors = getVendorsOfTheme({ vendors: vendorsOfTheme, themeGeneralSettings, cssVariables });
      return {
        themeSettings: {
          generalSettings: themeGeneralSettings,
          cssVariables,
          layoutSettings,
          globalTranslations: globalTranslations.translation as ThemeTranslations,
        },
        addons: themeAddons.data,
        header: headers,
        footer: footers,
        themeId: themeId,
        vendors: vendorsOfTheme,
        globalJs: globalJsOfTheme,
        globalScss: globalScssOfTheme,
        files: [...js, ...css, htmlFilesInPreloader, ...vendors],
      };
    }
  };

  const getResultOfAddon = async (errorOption: ErrorOption): Promise<Result['filesOfAddons']> => {
    const addons = await Promise.all(
      Object.entries(pages.data).map(async ([_, page]) => {
        const { sections } = page;
        const addonSections = sections.filter(section => section.enable && isSectionAddons(section.type));
        const addonFilesOfPage = await Promise.all(
          addonSections.map(async addonSection => {
            const isEnablePosition = themeAddons.data.find(addon => addon.sectionId === addonSection.id)?.positionEnabled;
            const [addonHtmlFile] = getHtmlFilesOfAddon({ addonSection, errorOption });
            const cssFile = await getCssFromAddonScss({ addonSection });
            const jsFile = getAllScriptOfAddonSection({ addonSection });
            return {
              css: cssFile,
              js: jsFile,
              liquid: addonHtmlFile,
              id: addonSection.id,
              type: isEnablePosition ? 'addon enable position' : 'addon disable position',
            } as Result['filesOfAddons'][number];
          }),
        );
        return Promise.resolve(addonFilesOfPage.flat());
      }),
    );
    return Promise.resolve(addons.flat());
  };

  const getResult = async (errorOption: ErrorOption): Promise<Result> => {
    setIsExtracting(true);
    try {
      const result: Result = {
        builderType: isThemeBuilder() ? 'theme' : 'page',
        pages: await getResultOfPage(errorOption),
        theme: await getResultOfTheme(errorOption),
        filesOfAddons: await getResultOfAddon(errorOption),
      };
      return result;
    } finally {
      setIsExtracting(false);
    }
  };

  return { getResult, isExtracting };
};

export default useResultForPreview;
