import { Result } from 'types/Result';
import { sectionConverter } from 'utils/VedaConverter/Veda/SectionConvert/SectionConvert';
import { handleGetTranslationParams } from './handleGetSyncTranslationParams';
import { GetAdditionalDataRelateToShopify_BEExpectResponse } from './services/getAdditionalDataRelateToShopify';
import { WriteAddonToShopify_BEExpectParameters } from './services/writeAddonToShopify';
import { WriteAtomicCssToShopify_BEExpectParameters } from './services/writeAtomicCssToShopify';
import { WriteGlobalOfThemeToShopify_BEExpectParameters } from './services/writeGlobalOfThemeToShopify';
import { WriteHeaderFooterToShopify_BEExpectParameters } from './services/writeHeaderFooterToShopify';
import { WritePageToShopify_BEExpectParameters } from './services/writePageToShopify';
import { WriteTranslation_BEExpectParameters } from './services/writeTranslationToShopify';
import { getIdOfGlobalCssFile, getIdOfGlobalJsFile, getIdOfVendorsCssFile, getIdOfVendorsJsFile, getShopifyPages } from './utils';

type PagesParamsExpect = DeepPartial<WritePageToShopify_BEExpectParameters>;
type PageFileExpect = WritePageToShopify_BEExpectParameters['assets']['files'][number];

type ThemeParamsExpect = DeepPartial<WriteGlobalOfThemeToShopify_BEExpectParameters>;

type HeaderFooterParamsExpect = DeepPartial<WriteHeaderFooterToShopify_BEExpectParameters>;

type AtomicCssParamsExpect = DeepPartial<WriteAtomicCssToShopify_BEExpectParameters>;

type AddonsParamsExpect = DeepPartial<WriteAddonToShopify_BEExpectParameters>;

type SyncTranslationParamsExpect = DeepPartial<WriteTranslation_BEExpectParameters>[];
interface HandleSaveInBuilderPage {
  data: Result;
  eventId: string | undefined;
  isOverrideIndividualPages: GetAdditionalDataRelateToShopify_BEExpectResponse['info']['isOverrideIndividualPages'];
  themeName: string;
}
/** Function thực hiện lấy ra parameters để bắn lên api OutputOfBuilderService và cái tên đang thể hiện lên vị trí mà function được gọi */
export const handleSaveInBuilderPage = ({ data, eventId, isOverrideIndividualPages, themeName }: HandleSaveInBuilderPage) => {
  const { pages, theme, filesOfAddons, builderType } = data;
  // Lấy ra page params
  const pagesParams = Object.entries(pages).reduce<[PagesParamsExpect] | PagesParamsExpect[]>((result, [, pageData]) => {
    const { files, data } = pageData;
    const { page, pageSettings } = data;
    const { type, label, commandId, shopifyPages, enable } = page;
    const { generalSettings } = pageSettings;
    // NOTE: Tạm thời chuyển sang dùng label của page
    const { handle, headerFooterEnabled, metaDescription, metaTitle, socialShareImage } = generalSettings;
    // const { handle, headerFooterEnabled, metaDescription, metaTitle, socialShareImage, label } = generalSettings;

    const allJs: Record<'globalJsOfPage' | 'jsOfSectionsInPage', PageFileExpect> = {
      globalJsOfPage: {
        name: getIdOfGlobalJsFile(page),
        id: getIdOfGlobalJsFile(page),
        type: 'js',
        content: '',
      },
      jsOfSectionsInPage: {
        name: `js_${commandId}`,
        id: `js_${commandId}`,
        type: 'js',
        content: '',
      },
    };

    const allCss: Record<'globalCssOfPage' | 'cssOfSectionsInPage', PageFileExpect> = {
      globalCssOfPage: {
        name: getIdOfGlobalCssFile(page),
        id: getIdOfGlobalCssFile(page),
        type: 'css',
        content: '',
      },
      cssOfSectionsInPage: {
        name: `css_${commandId}`,
        id: `css_${commandId}`,
        type: 'css',
        content: '',
      },
    };

    const allLiquids: PageFileExpect[] = [];

    const allVendorsCss: PageFileExpect = {
      type: 'vendorsCss',
      id: getIdOfVendorsCssFile(page),
      name: getIdOfVendorsCssFile(page),
      content: '',
    };

    const allVendorsJs: PageFileExpect = {
      type: 'vendorsJs',
      id: getIdOfVendorsJsFile(page),
      name: getIdOfVendorsJsFile(page),
      content: '',
    };

    files.reduce((result, file) => {
      const { content, type, section } = file;
      // Gộp js
      if (type === 'globalJs của page - bảo gồm globalJs và lazyLoadJs của page') {
        allJs.globalJsOfPage.content += content;
      }
      if (type === 'js của page - bao gồm js của các section') {
        allJs.jsOfSectionsInPage.content += content;
      }
      // Gộp css
      if (type === 'globalCss của page - chỉ bảo gồm globalCss của page') {
        allCss.globalCssOfPage.content += content;
      }
      if (
        type ===
        'css của page - bao gồm css của các section "thuộc page", css inline của các sections "thuộc page", không bao gồm atomic css của các sections "thuộc page"'
      ) {
        allCss.cssOfSectionsInPage.content += content;
      }
      // Gộp vendorsCss
      if (type === 'vendors css tổng của page') {
        allVendorsCss.content += content;
      }
      // Gộp vendorsJs
      if (type === 'vendors js tổng của page') {
        allVendorsJs.content += content;
      }
      // Các file liquids
      if (type === 'liquid của page - bao gồm liquid của section bình thường[đã thế megamenu tag placeholder]' && section) {
        const shopify_converter_result = sectionConverter({
          lastLiquid: content,
          section,
          isPreview: false,
        });
        allLiquids.push({
          content: shopify_converter_result.liquid,
          id: `section_${section.id}`,
          name: `section_${section.id}`,
          type: 'section',
          shopify_converter_result: {
            block_order: shopify_converter_result.block_order,
            blocks: shopify_converter_result.blocks,
            settings: shopify_converter_result.settings,
          },
        });
      }
      return result;
    }, '');

    let parameters: PagesParamsExpect = {
      pageType: type,
      pageName: label,
      pageCommandId: commandId,
      eventId,
      eventType: 'Ghi file khi save ở builder page / Ghi page',
      assets: {
        files: [
          allVendorsJs,
          allVendorsCss,
          allCss.cssOfSectionsInPage,
          allCss.globalCssOfPage,
          allJs.globalJsOfPage,
          allJs.jsOfSectionsInPage,
          ...allLiquids,
        ],
      },
    };

    /** Chỉ có "page" mới NÊN update SEO */
    if (type === 'page') {
      parameters = {
        ...parameters,
        page: {
          // Với regular page handle rỗng là không thể
          handle: handle ? handle : undefined,
          isPublished: enable,
          pageName: label,
          seo: {
            description: metaDescription,
            title: metaTitle,
            featuredImage: socialShareImage,
          },
        },
        isIncludeThemeHeaderFooter: headerFooterEnabled,
      };
    } else if (type === 'product' || type === 'collection' || type === 'article') {
      parameters = {
        ...parameters,
        [type]: {
          handle: handle ? handle : undefined,
          isApplyToAll: shopifyPages === 'all' ? true : false,
          isPublished: enable,
          isOverrideIndividualPages,
          pageName: label,
          seo: undefined, // Chỉ có "Page" mới cần update SEO nên đang để "seo: undefined"
          shopifyPages: getShopifyPages(page),
        },
        isIncludeThemeHeaderFooter: headerFooterEnabled,
      };
    } else if (
      type === 'home' ||
      type === 'cart' ||
      type === 'pageNotFound' ||
      type === 'password' ||
      type === 'search' ||
      type === 'collections' ||
      type === 'account' ||
      type === 'activateAccount' ||
      type === 'addresses' ||
      type === 'login' ||
      type === 'order' ||
      type === 'register' ||
      type === 'resetPassword' ||
      type === 'giftCard'
    ) {
      // const _shopifyRepresentPage = shopifyRepresentPage as HomePageLiquidVariable
      parameters = {
        ...parameters,
        [type]: {
          handle: handle ? handle : undefined,
          isPublished: enable,
          pageName: label,
        },
        isIncludeThemeHeaderFooter: headerFooterEnabled,
      };
    } else {
      throw new Error('handleSaveInBuilderPage -> thêm type ');
    }

    return result.concat(parameters);
  }, []);
  // Kết thúc lấy ra page params

  // Lấy ra theme Params
  let globalJsOfTheme = '';
  let globalCssOfTheme = '';
  let vendorsJsOfTheme = '';
  let vendorsCssOfTheme = '';
  let liquidPreloaderOfTheme = '';
  let cssPreloaderOfTheme = '';
  let jsPreloaderOfTheme = '';
  const liquidHeaderSectionsOfTheme: string[] = [];
  let jsHeaderSectionsOfTheme = '';
  let cssHeaderSectionsOfTheme = '';
  const liquidFooterSectionsOfTheme: string[] = [];
  let jsFooterSectionsOfTheme = '';
  let cssFooterSectionsOfTheme = '';
  theme.files.forEach(file => {
    if (file.type === 'globalJs của theme - bao gồm globalJs của theme') {
      globalJsOfTheme = file.content;
    }
    if (file.type === 'globalCss của theme - bao gồm layout, colors, fonts, scss của theme') {
      globalCssOfTheme = file.content;
    }
    if (file.type === 'vendors js tổng của theme') {
      vendorsJsOfTheme = file.content;
    }
    if (file.type === 'vendors css tổng của theme') {
      vendorsCssOfTheme = file.content;
    }
    if (file.type === 'liquid của preloader - cái này được ghi vào theme.*.liquid') {
      liquidPreloaderOfTheme = file.content;
    }
    if (file.type === 'js của preloader') {
      jsPreloaderOfTheme = file.content;
    }
    if (file.type === 'css của preloader') {
      cssPreloaderOfTheme = file.content;
    }
    if (file.type === 'js của các section header') {
      jsHeaderSectionsOfTheme = file.content;
    }
    if (
      file.type ===
      'css của các sections thuộc header - chỉ gồm css của các sections thuộc header và css inline của các sections thuộc header, không bao gồm atomic css'
    ) {
      cssHeaderSectionsOfTheme = file.content;
    }
    if (
      file.type ===
      'liquid của các section thuộc header - bao gồm liquid của section bình thường[đã thế megamenu tag placeholder] (cái này được ghi vào file header.liquid cái mà được render ở theme.liquid)'
    ) {
      liquidHeaderSectionsOfTheme.push(file.content);
    }
    if (file.type === 'js của các section footer') {
      jsFooterSectionsOfTheme = file.content;
    }
    if (
      file.type ===
      'css của các sections thuộc footer - chỉ gồm css của các sections thuộc footer và css inline của các sections thuộc footer, không bao gồm atomic css'
    ) {
      cssFooterSectionsOfTheme = file.content;
    }
    if (
      file.type ===
      'liquid của các section thuộc footer - bao gồm liquid của mega menu | liquid của section bình thường[đã thế megamenu tag placeholder] (cái này được ghi vào file footer.liquid cái mà được render ở theme.liquid)'
    ) {
      liquidFooterSectionsOfTheme.push(file.content);
    }
  });

  const themeParams: ThemeParamsExpect = {
    eventId,
    eventType: 'Ghi file khi save ở builder page / Ghi global (sinh ra từ themeSettings)',
    content: `
      ${globalJsOfTheme}
      ${globalCssOfTheme}
      ${vendorsJsOfTheme}
      ${vendorsCssOfTheme}
      ${liquidPreloaderOfTheme}
      ${cssPreloaderOfTheme}
      ${jsPreloaderOfTheme}
    `,
  };
  // Kết thúc lấy ra themeParams

  // Lấy ra atomicCssParams
  const atomicCssParams: AtomicCssParamsExpect = {
    eventId,
    eventType: 'Ghi file atomic css khi save ở builder page',
    rawAtomic: Object.values(pages)
      .map(({ atomicCss }) => atomicCss)
      .join('\n'),
  };
  // Kết thúc lấy ra atomicCssParams

  // Lấy ra addonsEnablePositionParams
  const addonsEnablePositionParams: AddonsParamsExpect = {
    eventId,
    eventType: 'Ghi file khi save ở builder page / Ghi addon enable position',
    addonFiles: filesOfAddons.reduce<Exclude<AddonsParamsExpect['addonFiles'], undefined>>((res, item) => {
      if (item.type === 'addon enable position') {
        return res.concat({
          id: item.id,
          css: item.css.content,
          js: item.js.content,
          liquid: item.liquid.content,
        });
      }
      return res;
    }, []),
  };
  // Kết thúc lấy ra addonsEnablePositionParams

  // Lấy ra addon disable position
  const addonsDisablePositionParams: AddonsParamsExpect & { themeName: string } = {
    eventId,
    eventType: 'Ghi file khi save ở builder page / Ghi addon disable position',
    themeName,
    addonFiles: filesOfAddons.reduce<Exclude<AddonsParamsExpect['addonFiles'], undefined>>((res, item) => {
      if (item.type === 'addon disable position') {
        return res.concat({
          id: item.id,
          css: item.css.content,
          js: item.js.content,
          liquid: item.liquid.content,
        });
      }
      return res;
    }, []),
  };
  // Kết thúc lấy ra addon disable position

  // Lấy ra syncTranslation params  const languages = globalTranslations.translation;
  const syncTranslationsParams: SyncTranslationParamsExpect = handleGetTranslationParams({ eventId, themeSettings: theme.themeSettings });
  // Kết thúc Lấy ra syncTranslation params

  // Lấy ra headerFooterParams và return kết quả cuối cùng
  if (builderType === 'theme') {
    const headerFooterParams: HeaderFooterParamsExpect = {
      eventId,
      eventType: 'Ghi file khi save ở builder page / Ghi header footer',
      themeName,
      header: `
        ${liquidHeaderSectionsOfTheme.join('\n')}
        ${jsHeaderSectionsOfTheme}
        ${cssHeaderSectionsOfTheme}
      `,
      footer: `
        ${liquidFooterSectionsOfTheme.join('\n')}
        ${jsFooterSectionsOfTheme}
        ${cssFooterSectionsOfTheme}
      `,
    };
    return {
      pagesParams,
      themeParams,
      atomicCssParams,
      addonsEnablePositionParams,
      addonsDisablePositionParams,
      syncTranslationsParams,
      headerFooterParams,
    };
  }
  // Kết thúc lấy ra headerFooterParams và return kết quả cuối cùng

  return {
    pagesParams,
    themeParams,
    atomicCssParams,
    addonsDisablePositionParams,
    addonsEnablePositionParams,
    syncTranslationsParams,
  };
};
