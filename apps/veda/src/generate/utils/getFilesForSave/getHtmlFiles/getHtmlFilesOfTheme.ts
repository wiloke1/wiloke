import { ThemeGeneralSettings } from 'types/Result';
import { PageSection } from 'types/Sections';
import { ErrorOption } from './@types/ErrorOption';
import { ExpectReturnType } from './@types/ExpectReturnType';
import { getHtmlFiles } from './getHtmlFiles';
import { getHtmlPreloaderFile } from './getHtmlPreloaderFile';
import { handleCssInlines } from './handleCssInlines';

interface GetHtmlFilesOfTheme_Dùng_ở_useResult {
  headerSections_notIncludeAddonSections_includeMegamenuSections: PageSection[];
  footerSections_notIncludeAddonSections_includeMegamenuSections: PageSection[];
  themeGeneralSettings: ThemeGeneralSettings;
  errorOption: ErrorOption;
  variant: 'Dùng ở useResult.ts';
}

interface GetHtmlFilesOfTheme_Dùng_ở_watchUpdatePageSettings {
  themeGeneralSettings: ThemeGeneralSettings;
  variant: 'Dùng ở watchUpdatePageSettings.ts' | 'Dùng ở useResult.ts nhưng là build page';
}

export const getHtmlFilesOfTheme = (
  params: GetHtmlFilesOfTheme_Dùng_ở_useResult | GetHtmlFilesOfTheme_Dùng_ở_watchUpdatePageSettings,
): ExpectReturnType[] => {
  const { variant } = params;
  if (variant === 'Dùng ở useResult.ts') {
    const {
      footerSections_notIncludeAddonSections_includeMegamenuSections,
      headerSections_notIncludeAddonSections_includeMegamenuSections,
      themeGeneralSettings,
    } = params;
    return [
      getHtmlPreloaderFile(themeGeneralSettings),
      ...handleCssInlines(
        getHtmlFiles({
          ...params,
          lazyload: false, // NOTE: @tuong -> Header Footer không cho lazyload
          sectionsIncludeMegamenuSections: headerSections_notIncludeAddonSections_includeMegamenuSections,
          fileType:
            'liquid của các section thuộc header - bao gồm liquid của section bình thường[đã thế megamenu tag placeholder] (cái này được ghi vào file header.liquid cái mà được render ở theme.liquid)',
        }),
      ),
      ...handleCssInlines(
        getHtmlFiles({
          ...params,
          lazyload: false, // NOTE: @tuong -> Header Footer không cho lazyload
          sectionsIncludeMegamenuSections: footerSections_notIncludeAddonSections_includeMegamenuSections,
          fileType:
            'liquid của các section thuộc footer - bao gồm liquid của mega menu | liquid của section bình thường[đã thế megamenu tag placeholder] (cái này được ghi vào file footer.liquid cái mà được render ở theme.liquid)',
        }),
      ),
    ];
  }
  if (variant === 'Dùng ở watchUpdatePageSettings.ts' || variant === 'Dùng ở useResult.ts nhưng là build page') {
    const { themeGeneralSettings } = params;
    return [getHtmlPreloaderFile(themeGeneralSettings)];
  }
  throw new Error('getHtmlFilesOfTheme');
};
