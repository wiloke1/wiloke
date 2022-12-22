import { handleLiquidFile } from 'generate/utils/getFilesForSave/getHtmlFiles/utils/handleLiquidFile';
import { i18n } from 'translation';
import { File } from 'types/Result';
import { PageSection } from 'types/Sections';
import { Consts, LIMIT_LIQUID_FILE_SIZE } from 'utils/constants/constants';
import { isSectionMegamenu } from 'utils/functions/checkSectionType';
import { ErrorOption } from './@types/ErrorOption';
import { ExpectReturnType } from './@types/ExpectReturnType';

type HandleHtmlContent = Parameters<typeof handleLiquidFile>[0] & { errorOption: ErrorOption };
const handleHtmlContent = ({ section, errorOption, lazyload, variant }: HandleHtmlContent) => {
  let result = '';
  try {
    result = handleLiquidFile({ section, lazyload, variant });
    if (![result.length].every(item => item < LIMIT_LIQUID_FILE_SIZE.value)) {
      throw new Error(i18n.t('publish_shopify.limit_liquid_file_size', { size: LIMIT_LIQUID_FILE_SIZE.humanity }));
    }
  } catch (err) {
    console.log(err);
    if (errorOption === 'throw') {
      throw err;
    }
  }

  return result;
};

interface GetHtmlFiles {
  sectionsIncludeMegamenuSections: PageSection[];
  lazyload: boolean;
  errorOption: ErrorOption;
  fileType: Extract<
    File['type'],
    | 'liquid của page - bao gồm liquid của section bình thường[đã thế megamenu tag placeholder]'
    | 'liquid của các section thuộc header - bao gồm liquid của section bình thường[đã thế megamenu tag placeholder] (cái này được ghi vào file header.liquid cái mà được render ở theme.liquid)'
    | 'liquid của các section thuộc footer - bao gồm liquid của mega menu | liquid của section bình thường[đã thế megamenu tag placeholder] (cái này được ghi vào file footer.liquid cái mà được render ở theme.liquid)'
    | 'liquid của 1 addon'
  >;
}
const MegamenuTag = Consts.FakeTags.Megamenu;
export const getHtmlFiles = ({ sectionsIncludeMegamenuSections, lazyload, errorOption, fileType }: GetHtmlFiles): ExpectReturnType[] => {
  return sectionsIncludeMegamenuSections.reduce<ReturnType<typeof getHtmlFiles>>((res, item) => {
    // NOTE: @tuong -> Megamenu sẽ được thế theo một cách khác nên ignore section megamenu ở đây
    if (!item.enable || isSectionMegamenu(item.type)) {
      return res;
    }
    const htmlWithMegamenuTags = handleHtmlContent({
      section: item,
      errorOption,
      lazyload,
      variant: fileType === 'liquid của 1 addon' ? 'addon -> cần compile' : 'section -> compile navigation',
    });
    // NOTE: @tuong -> Thế megamenu vào section (Không thế addon vì addon cần xử lý theo 1 cách khác)
    const htmlReplacedMegamenuTags = htmlWithMegamenuTags.replace(new RegExp(`<${MegamenuTag}\\s*data-id.*><\\/${MegamenuTag}>`, 'g'), x => {
      const domParser = new DOMParser();
      const doc = domParser.parseFromString(x, 'text/html');
      const megamenusTagEl = doc.querySelector(MegamenuTag) as HTMLElement;
      const id = megamenusTagEl.getAttribute('data-id') as string;
      const megamenuSections = sectionsIncludeMegamenuSections.find(section => section.id === id && section.enable);
      if (!megamenuSections) {
        return '';
      }
      return `<div data-id="${id}">${handleHtmlContent({
        section: megamenuSections,
        errorOption,
        lazyload,
        variant: 'megamenu -> cần compile',
      })}</div>`;
    });

    if (
      fileType ===
      'liquid của các section thuộc header - bao gồm liquid của section bình thường[đã thế megamenu tag placeholder] (cái này được ghi vào file header.liquid cái mà được render ở theme.liquid)'
    ) {
      // NOTE: @tuong -> Hiện tại file được ghi vào file có tên "assets/themeheader-veda-<ID>.liquid" và được sử dụng tại "snippets/veda-theme-header"
      // "snippets/veda-theme-header" được sử dụng tại "theme.liquid" và "theme.veda-landing.liquid"
      /** "Làm dấu" để BE có thể xử lí sync shopify vì ở ngoài dashboard khi lưu sẽ không thể lấy được html của các "header, footer sections" */
      return res.concat({
        // NOTE: @tuong -> Tại thời điểm comment này được viết: Addon phải thực hiện theo 1 kiểu khác nên sẽ không còn replace addon ở đây nữa
        content: `
            //startAssets @veda_id:headerSection-${item.id} @veda_name:headerSection-${item.id} @veda_type:section @veda_content:
            ${htmlReplacedMegamenuTags}
          `,
        // content: `
        // //startAssets @veda_id:headerSection-${item.id} @veda_name:headerSection-${item.id} @veda_type:section @veda_content:
        //   ${replace(MegamenuTag, replace(Consts.FakeTags.Addons, handleHtmlContent(item, lazyload, errorOption)))}
        // `,
        type: fileType,
        name: item.label,
        id: item.id,
        section: item,
      });
    }
    if (
      fileType ===
      'liquid của các section thuộc footer - bao gồm liquid của mega menu | liquid của section bình thường[đã thế megamenu tag placeholder] (cái này được ghi vào file footer.liquid cái mà được render ở theme.liquid)'
    ) {
      // NOTE: @tuong -> Hiện tại file được ghi vào file có tên "assets/themefooter-veda-<ID>.liquid" và được sử dụng tại "snippets/veda-theme-footer"
      // "snippets/veda-theme-footer" được sử dụng tại "theme.liquid" và "theme.veda-landing.liquid"
      /** "Làm dấu" để BE có thể xử lí sync shopify vì ở ngoài dashboard khi lưu sẽ không thể lấy được html của các "header, footer sections" */
      return res.concat({
        // NOTE: @tuong -> Tại thời điểm comment này được viết: Addon phải thực hiện theo 1 kiểu khác nên sẽ không còn replace addon ở đây nữa
        content: `
            //startAssets @veda_id:footerSection-${item.id} @veda_name:footerSection-${item.id} @veda_type:section @veda_content:
            ${htmlReplacedMegamenuTags}
          `,
        // content: `
        //   //startAssets @veda_id:footerSection-${item.id} @veda_name:footerSection-${item.id} @veda_type:section @veda_content:
        //   ${replace(MegamenuTag, replace(Consts.FakeTags.Addons, handleHtmlContent(item, lazyload, errorOption)))}
        // `,
        type: fileType,
        name: item.label,
        id: item.id,
        section: item,
      });
    }
    if (fileType === 'liquid của 1 addon') {
      // NOTE: @tuong -> Hiện tại file được ghi vào file có tên "snippets/veda-addon-<ID>.liquid" và được sử dụng trong file liquid của section chứa addon đó
      // cái này đang không làm dấu (có thể làm dấu để đồng bộ)
      return res.concat({
        type: 'liquid của 1 addon',
        id: item.id,
        name: item.label,
        content: htmlReplacedMegamenuTags,
        section: undefined,
      });
    }
    if (fileType === 'liquid của page - bao gồm liquid của section bình thường[đã thế megamenu tag placeholder]') {
      return res.concat({
        // NOTE: @tuong -> Hiện tại file được ghi vào file có tên "snippets/<pageType>-veda-<pageCommandId>-<sectionIndex>.liquid" và được sử dụng trong file "sections/<pageType>-veda-{pageCommandId}}.liquid" tổng
        // cái này đang không làm dấu (có thể làm dấu để đồng bộ)
        // NOTE: @tuong -> Tại thời điểm comment này được viết: Addon phải thực hiện theo 1 kiểu khác nên sẽ không còn replace addon ở đây nữa
        content: htmlReplacedMegamenuTags,
        // content: replace(MegamenuTag, replace(Consts.FakeTags.Addons, handleHtmlContent(item, lazyload, errorOption))),
        type: fileType,
        name: item.label,
        id: item.id,
        section: item,
      });
    }
    throw new Error('getHtmlFiles');
  }, []);
};
