import defaultGlobalScss from 'generate/scss/scss';
import { File } from 'types/Result';
import { PageSection } from 'types/Sections';
import { inlineCss } from 'utils/functions/InlineCss';
import { sassCompile } from 'utils/functions/sass';

interface Dùng_ở_watchUpdatePageSettings {
  globalScss: string;
  variant: 'Dùng ở watchUpdatePageSettings.ts';
}

interface Dùng_ở_useResult {
  sections_notIncludeAddonSections_includeMegamenuSections: PageSection[];
  globalScss: string;
  variant: 'Dùng ở useResult.ts';
}

export const getCssFromSectionsScss_PageScss_SectionsInlinesCss = async (
  params: Dùng_ở_watchUpdatePageSettings | Dùng_ở_useResult,
): Promise<[File] | [File, File]> => {
  const { variant, globalScss } = params;
  const [_globalScss, _defaultGlobalScss] = await Promise.all([sassCompile.client(globalScss), sassCompile.client(defaultGlobalScss)]);

  const globalCssFile: File = {
    // NOTE: @tuong -> Hiện tại file được ghi vào file có tên "assets/<pageType>-veda-<pageCommandId>-style.css" và được sử dụng trong file "sections/<pageType>-veda-{pageCommandId}}.liquid" tổng
    /** "Làm dấu" để BE có thể xử lí sync shopify */
    // đánh dấu "/* globalCssBorder */" vì ở ngoài dashboard khi lưu sẽ không thể lấy được css của các "sections"
    content: `
      ${[_globalScss, _defaultGlobalScss].join('\n')}
      /* globalCssBorder */
    `,
    type: 'globalCss của page - chỉ bảo gồm globalCss của page',
    id: 'globalCss',
    name: 'globalCss',
    section: undefined,
  };

  if (variant === 'Dùng ở watchUpdatePageSettings.ts') {
    return [globalCssFile];
  }
  if (variant === 'Dùng ở useResult.ts') {
    const { sections_notIncludeAddonSections_includeMegamenuSections } = params;
    const sections = await Promise.all(
      sections_notIncludeAddonSections_includeMegamenuSections.reduce<Promise<string>[]>((res, item) => {
        if (item.enable) {
          return res.concat(sassCompile.client(item.data.scss ?? '', item.id));
        }
        return res;
      }, []),
    );
    return [
      globalCssFile,
      {
        // NOTE: @tuong -> Hiện tại file được ghi vào file có tên "assets/<pageType>-veda-<pageCommandId>-style.css" và được sử dụng trong file "sections/<pageType>-veda-{pageCommandId}}.liquid" tổng
        // cái này đang không làm dấu (có thể làm dấu để đồng bộ)
        content: [
          ...Array.from(new Set(sections)),
          inlineCss.getCssFromSettings(sections_notIncludeAddonSections_includeMegamenuSections.map(section => section.data.settings)),
        ].join('\n'),
        type:
          'css của page - bao gồm css của các section "thuộc page", css inline của các sections "thuộc page", không bao gồm atomic css của các sections "thuộc page"',
        name: 'sections',
        id: 'sections',
        section: undefined,
      },
    ];
  }
  throw new Error('getCssFromSectionScssNPageScssAsync');
};
