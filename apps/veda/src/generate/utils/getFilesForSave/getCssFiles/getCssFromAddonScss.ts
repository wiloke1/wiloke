import { File } from 'types/Result';
import { PageSection } from 'types/Sections';
import { inlineCss } from 'utils/functions/InlineCss';
import { sassCompile } from 'utils/functions/sass';

interface GetCssFromAddonScsss {
  addonSection: PageSection;
}
export const getCssFromAddonScss = async ({ addonSection }: GetCssFromAddonScsss): Promise<File> => {
  const scssCompiled = await sassCompile.client(addonSection.data.scss ?? '', addonSection.id);
  const inlineCssResult = inlineCss.getCssFromSettings([addonSection].map(section => section.data.settings));
  const content = `
    ${scssCompiled}
    ${inlineCssResult}
  `;
  return {
    // NOTE: @tuong -> Hiện tại file được ghi vào file có tên "assets/veda-addon-<ID>.css" và được sử dụng tại "snippets/veda-addon-<ID>.liquid"
    // "snippets/veda-addon-<ID>.liquid" được sử dụng tại file liquid của section chứa addon đó
    // cái này đang không làm dấu (có thể làm dấu để đồng bộ)
    type: 'css của 1 addon',
    id: addonSection.id,
    name: addonSection.label,
    content: content,
    section: undefined,
  };
};
