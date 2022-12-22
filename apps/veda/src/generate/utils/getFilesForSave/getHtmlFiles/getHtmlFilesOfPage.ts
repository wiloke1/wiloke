import { PageSection } from 'types/Sections';
import { ErrorOption } from './@types/ErrorOption';
import { ExpectReturnType } from './@types/ExpectReturnType';
import { getHtmlFiles } from './getHtmlFiles';
import { handleCssInlines } from './handleCssInlines';

interface GetHtmlFilesOfPage {
  sections_notIncludeAddonSections_includeMegamenuSections: PageSection[];
  lazyload: boolean;
  errorOption: ErrorOption;
}

export const getHtmlFilesOfPage = ({
  errorOption,
  lazyload,
  sections_notIncludeAddonSections_includeMegamenuSections,
}: GetHtmlFilesOfPage): ExpectReturnType[] => {
  return handleCssInlines(
    getHtmlFiles({
      // NOTE: @tuong -> Hiện tại file được ghi vào file có tên "snippets/<pageType>-veda-<pageCommandId>-<sectionIndex>.liquid" và được sử dụng trong file "sections/<pageType>-veda-{pageCommandId}}.liquid" tổng
      // cái này đang không làm dấu (có thể làm dấu để đồng bộ)
      errorOption,
      lazyload,
      sectionsIncludeMegamenuSections: sections_notIncludeAddonSections_includeMegamenuSections,
      fileType: 'liquid của page - bao gồm liquid của section bình thường[đã thế megamenu tag placeholder]',
    }),
  );
};
