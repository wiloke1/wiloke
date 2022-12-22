import { PageSection } from 'types/Sections';
import { ErrorOption } from './@types/ErrorOption';
import { getHtmlFiles } from './getHtmlFiles';
import { handleCssInlines } from './handleCssInlines';

interface GetHtmlFilesOfAddon {
  addonSection: PageSection;
  errorOption: ErrorOption;
}
export const getHtmlFilesOfAddon = ({ addonSection, errorOption }: GetHtmlFilesOfAddon) => {
  return handleCssInlines(
    getHtmlFiles({
      fileType: 'liquid của 1 addon',
      sectionsIncludeMegamenuSections: [addonSection],
      lazyload: false, // NOTE: @tuong -> Header Footer không cho lazyload
      errorOption,
    }),
  );
};
