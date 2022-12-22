import { getAllScriptOfTheme, getHtmlFilesOfTheme, getVendorsOfTheme } from 'generate/utils/getFilesForSave';
import { ThemeTranslations } from 'types/Result';
import { getCssFromThemeSettings } from 'generate/utils/getFilesForSave/getCssFiles/getCssFromThemeSettings';
import { WriteTranslation_BEExpectParameters } from './services/writeTranslationToShopify';
import { WriteGlobalOfThemeToShopify_BEExpectParameters } from './services/writeGlobalOfThemeToShopify';
import { handleGetTranslationParams } from './handleGetSyncTranslationParams';

type GlobalParamsExpect = DeepPartial<WriteGlobalOfThemeToShopify_BEExpectParameters>;
interface HandleUpdateThemeSettingsInDashboard {
  themeSettings: AppState['global']['themeSettings'];
  eventId: string | undefined;
}
type SyncTranslationParamsExpect = DeepPartial<WriteTranslation_BEExpectParameters>[];

/** Function thực hiện lấy ra parameters để bắn lên api OutputOfBuilderService và cái tên đang thể hiện lên vị trí mà function được gọi */
export const handleUpdateThemeSettingsInDashboard = async ({ themeSettings, eventId }: HandleUpdateThemeSettingsInDashboard) => {
  // Lấy ra global params
  const {
    cssVariables,
    generalSettings: themeGeneralSettings,
    layoutSettings,
    globalJs: globalJsOfTheme,
    globalScss: globalScssOfTheme,
    vendors: vendorsOfTheme,
  } = themeSettings;
  const js = getAllScriptOfTheme({
    variant: 'Dùng ở useResult.ts nhưng là build page',
    globalJs: globalJsOfTheme,
    themeGeneralSettings,
  });
  const [htmlFileInPreloader] = getHtmlFilesOfTheme({
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

  //
  let _globalJsOfTheme = '';
  let globalCssOfTheme = '';
  let vendorsJsOfTheme = '';
  let vendorsCssOfTheme = '';
  let liquidPreloaderOfTheme = '';
  let cssPreloaderOfTheme = '';
  let jsPreloaderOfTheme = '';
  // NOTE: @tuong -> Ngoài dashboard chỉ có thể update globalCss, globalJs, preloader, vendors nên comment phần dưới lại
  // const liquidHeaderSectionsOfTheme: string[] = [];
  // let jsHeaderSectionsOfTheme = '';
  // let cssHeaderSectionsOfTheme = '';
  // const liquidFooterSectionsOfTheme: string[] = [];
  // let jsFooterSectionsOfTheme = '';
  // let cssFooterSectionsOfTheme = '';

  [...js, ...css, htmlFileInPreloader, ...vendors].forEach(file => {
    if (file.type === 'globalJs của theme - bao gồm globalJs của theme') {
      _globalJsOfTheme = file.content;
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
    // NOTE: @tuong -> Ngoài dashboard chỉ có thể update globalCss, globalJs, preloader, vendors nên comment phần dưới lại
    // if (file.type === 'js của các section header') {
    //   jsHeaderSectionsOfTheme = file.content;
    // }
    // if (
    //   file.type ===
    //   'css của các sections thuộc header - chỉ gồm css của các sections thuộc header và css inline của các sections thuộc header, không bao gồm atomic css vì atomic css được gộp vào page nên từ đó page nào cũng có atomic css của các section của "header sections"'
    // ) {
    //   cssHeaderSectionsOfTheme = file.content;
    // }
    // if (
    //   file.type ===
    //   'liquid của các section thuộc header - bao gồm liquid của addon không đặt được vị trí | liquid của mega menu |liquid của page - bao gồm liquid của section bình thường [đã thế megamenu tag placeholder] + liquid của addon được đặt vào section (cái này được ghi vào file header.liquid cái mà được render ở theme.liquid)'
    // ) {
    //   liquidHeaderSectionsOfTheme.push(file.content);
    // }
    // if (file.type === 'js của các section footer') {
    //   jsFooterSectionsOfTheme = file.content;
    // }
    // if (
    //   file.type ===
    //   'css của các sections thuộc footer - chỉ gồm css của các sections thuộc footer và css inline của các sections thuộc footer, không bao gồm atomic css vì atomic css được gộp vào page nên từ đó page nào cũng có atomic css của các section của "footer sections"'
    // ) {
    //   cssFooterSectionsOfTheme = file.content;
    // }
    // if (
    //   file.type ===
    //   'liquid của các section thuộc footer - bao gồm liquid của addon không đặt được vị trí | liquid của mega menu |liquid của page - bao gồm liquid của section bình thường [đã thế megamenu tag placeholder] + liquid của addon được đặt vào section (cái này được ghi vào file footer.liquid cái mà được render ở theme.liquid)'
    // ) {
    //   liquidFooterSectionsOfTheme.push(file.content);
    // }
  });
  const themeParams: GlobalParamsExpect = {
    eventId,
    eventType: 'Ghi file khi update theme settings ngoài dashboard',
    content: `
      ${_globalJsOfTheme}
      ${globalCssOfTheme}
      ${vendorsJsOfTheme}
      ${vendorsCssOfTheme}
      ${liquidPreloaderOfTheme}
      ${cssPreloaderOfTheme}
      ${jsPreloaderOfTheme}
    `,
    //     ${liquidHeaderSectionsOfTheme.join('\n')}
    //     ${jsHeaderSectionsOfTheme}
    //     ${cssHeaderSectionsOfTheme}
    //     ${liquidFooterSectionsOfTheme.join('\n')}
    //     ${jsFooterSectionsOfTheme}
    //     ${cssFooterSectionsOfTheme}
  };
  // Kết thúc lấy ra global params

  // Lấy ra syncTranslation params
  const syncTranslationsParams: SyncTranslationParamsExpect = handleGetTranslationParams({
    eventId,
    themeSettings: { ...themeSettings, globalTranslations: themeSettings.globalTranslations.translation as ThemeTranslations },
  });
  // Kết thúc lấy ra syncTranslation params

  return {
    themeParams,
    syncTranslationsParams,
  };
};
