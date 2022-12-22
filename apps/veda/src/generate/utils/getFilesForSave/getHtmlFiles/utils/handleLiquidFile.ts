import { PageSection } from 'types/Sections';
import { Consts } from 'utils/constants/constants';
import { isSectionAddons, isSectionMegamenu } from 'utils/functions/checkSectionType';
import { inlineCss } from 'utils/functions/InlineCss';
import {
  handleGetTwigScope,
  handleReplaceSectionSetingsValueToTagShopify,
  handleShopifyTagInForloop,
  liquidSyntaxToTwig,
} from 'utils/LiquidSyntaxToTwig';
import { custom_component } from 'utils/LiquidSyntaxToTwig/custom_components';
import { handleRenderTagBeforeAll } from 'utils/LiquidSyntaxToTwig/handleRenderTagBeforeAll';
import { v4 } from 'uuid';
import { deleteAddonPlaceholder, deleteComponentAttr, htmlWithLazyload, replaceTagFake } from '../../../generateHelpers';

const compileAll = (section: PageSection) => {
  const { id: sectionId, type } = section;
  const { settings, liquid } = section.data;
  const twig = handleShopifyTagInForloop({ liquid: replaceTagFake(liquid, ''), settings });

  let result = '';

  // Xử lí xoá content trong tag Shopify
  const regex = new RegExp(`<${Consts.FakeTags.Shopify}>|</${Consts.FakeTags.Shopify}>`, 'gm');
  let signals;
  const startPoints: number[] = [];
  const contentOfShopifyClauses: Array<{ content: string; id: string }> = [];
  while (true) {
    signals = regex.exec(twig);
    if (signals !== null) {
      const signal = signals[0];
      if (!signal.includes(`</${Consts.FakeTags.Shopify}>`)) {
        startPoints.push(regex.lastIndex - signal.length);
      } else {
        contentOfShopifyClauses.push({
          content: twig.slice(startPoints[startPoints.length - 1], regex.lastIndex),
          id: `@tuong@_HACK_CHO_TRƯỜNG_HỢP_ĐOẠN_CODE_SHOPIFY_NẰM_TRONG_CẢ_MỆNH_ĐỀ_IF_ELSE_NÊN_KHI_COMPILE_SẼ_CHỈ_NHẬN_MỘT_NÊN_CẦN_MỘT_ID_ĐỂ_THẾ_LẠI_VÀO_SHOPIFY_MỘT_CÁCH_CHÍNH_XÁC_${v4()}_@tuong@`,
        });
        startPoints.pop();
      }
    } else {
      break;
    }
  }

  const _twigRemovedShopify = contentOfShopifyClauses.reduce((res, { content, id }) => {
    return res.replace(content, id);
  }, twig);

  // Xử lí syntax liquid -> twig;
  const _twig = liquidSyntaxToTwig({
    liquid: _twigRemovedShopify,
    settings,
    variant: isSectionAddons(type) ? 'addon -> cần compile' : isSectionMegamenu(type) ? 'megamenu -> cần compile' : 'section -> compile navigation',
  });

  // Lấy ra HTML
  const compiled: string = window.Twig.twig({ data: _twig, rethrow: true }).render(
    handleGetTwigScope({
      sectionSettings: settings,
      sectionId,
      variant: 'Xuất kết quả cuối cùng -> Xoá shopify scope',
      builderMode: false,
    }),
  );

  // Xử lí thế lại content (cái mà đã thế các biến ở schema vào liquid trong tag Shopify) trong tag Shopify và xoá tag Shopify
  result = compiled.replace(new RegExp(`@tuong@.*@tuong@`, 'g'), signalShopifyClauseId => {
    const shopifyClause = contentOfShopifyClauses.find(content => content.id === signalShopifyClauseId);

    if (shopifyClause) {
      const { content } = shopifyClause;
      const content_ = content.replace(`<${Consts.FakeTags.Shopify}>`, '').replace(`</${Consts.FakeTags.Shopify}>`, '');
      return handleReplaceSectionSetingsValueToTagShopify({ shopify_clause: content_, settings });
    }
    return `<!-- ${signalShopifyClauseId} -->`;
  });

  return result;
};

// NOTE: Đang xử lý cho trường hợp trong <compiler> không có <shopify>
const compileInsideCompilerTag = (section: PageSection) => {
  const { id } = section;
  const { settings, liquid } = section.data;

  // Xử lí lấy content trong tag Navigation
  const regex = new RegExp(`<${Consts.FakeTags.Compiler}>|</${Consts.FakeTags.Compiler}>`, 'gm');
  let signals;
  const startPoints: number[] = [];
  const contentOfCompilerClauses: string[] = [];
  while (true) {
    signals = regex.exec(liquid);
    if (signals !== null) {
      const signal = signals[0];
      if (!signal.includes(`</${Consts.FakeTags.Compiler}>`)) {
        startPoints.push(regex.lastIndex - signal.length);
      } else {
        contentOfCompilerClauses.push(liquid.slice(startPoints[startPoints.length - 1], regex.lastIndex));
        startPoints.pop();
      }
    } else {
      break;
    }
  }
  const newLiquid = contentOfCompilerClauses.reduce((res, content) => {
    // Xử lí syntax liquid -> twig;
    const twig = liquidSyntaxToTwig({ liquid: content, settings, variant: 'section -> compile navigation' });
    // Lấy ra HTML
    const compiled: string = window.Twig.twig({ data: twig, rethrow: true }).render(
      handleGetTwigScope({
        sectionSettings: settings,
        sectionId: id,
        variant: 'Xuất kết quả cuối cùng -> Xoá shopify scope',
        builderMode: false,
      }),
    );
    return res.replace(content, compiled.replace(regex, ''));
  }, liquid);

  return newLiquid;
};

export interface HandleLiquidFile {
  section: PageSection;
  lazyload: boolean;
  variant: 'section -> compile navigation' | 'addon -> cần compile' | 'megamenu -> cần compile';
}

export const handleLiquidFile = ({ lazyload, section, variant }: HandleLiquidFile) => {
  const { liquid, settings } = section.data;

  // Thế các snippet trước tiên
  let result = handleRenderTagBeforeAll(liquid);
  // Replace tag fake
  result = replaceTagFake(result, '');
  // Xử lý data css
  result = inlineCss.handleLiquid(result, settings);
  if (variant === 'section -> compile navigation') {
    // Compile
    result = compileInsideCompilerTag({
      ...section,
      data: {
        ...section.data,
        liquid: result,
      },
    });
    // Thế các custom component
    result = custom_component(result);
    // Xoá cặp thẻ shopify
    result = result.replace(new RegExp(`<${Consts.FakeTags.Shopify}>`, 'g'), '').replace(new RegExp(`</${Consts.FakeTags.Shopify}>`, 'g'), '');
    // Xoá cặp thẻ compiler
    result = result.replace(new RegExp(`<${Consts.FakeTags.Compiler}>`, 'g'), '').replace(new RegExp(`</${Consts.FakeTags.Compiler}>`, 'g'), '');
  } else {
    result = compileAll({
      ...section,
      data: {
        ...section.data,
        liquid: result,
      },
    });
  }

  // Xoá component attribute
  result = deleteComponentAttr(result);
  // Xoá thẻ addonplaceholder
  result = deleteAddonPlaceholder(result);

  // Nếu bật lazyload thì ta thay thế src thành data-src
  if (lazyload) {
    result = htmlWithLazyload(result);
  }

  return result;
};
