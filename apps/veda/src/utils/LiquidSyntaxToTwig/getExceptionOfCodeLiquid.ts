import { HandleLiquidFile } from 'generate/utils/getFilesForSave/getHtmlFiles/utils/handleLiquidFile';
import { isArray, isObject } from 'lodash';
import { i18n } from 'translation';
import { ComponentData } from 'types/Page';
import { at } from 'utils/at';
import { Consts } from 'utils/constants/constants';
import strToRegexpPattern from 'utils/functions/strToRegexpPattern';
import { FILTERS_AND_TAGS_MUST_BE_IN_SHOPIFY_TAG, VARIABLES_NAME_MUST_BE_IN_SHOPIFY_TAG, VARIABLES_NAME } from './const';
import { LiquidSyntaxToTwigError } from './Error';
import { getBOCsBetweenSomething } from './utils/getBOCsBetweenSomething';
import { getMatches } from './utils/getMatches';
import { isExistExactShopifyVariableInBOC } from './utils/isExistExactShopifyVariableInBOC';
import { toString } from './utils/toString';

interface GetExceptionOfCodeLiquid extends Pick<ComponentData, 'liquid' | 'settings'> {
  variant: HandleLiquidFile['variant'];
}
/** Function thực hiện kiểm tra syntax trong code đã thoả mãn điều kiện của app hay chưa (chi tiết xem tại README.md - NOTE: lưu ý đó không phải toàn bộ lỗi, đó chỉ là 1 phần nhỏ đã test được) và thả lỗi */
export const getExceptionOfCodeLiquid = ({ liquid, settings, variant }: GetExceptionOfCodeLiquid) => {
  if (variant === 'megamenu -> cần compile' || variant === 'addon -> cần compile') {
    const liquidRemoveAddonsContext = getBOCsBetweenSomething({
      liquid,
      endBOC: new RegExp(`</${Consts.FakeTags.AddonsContext.tagName}>`),
      startBOC: new RegExp(`<${Consts.FakeTags.AddonsContext.tagName}`),
      ignoreNested: true,
    }).reduce<string>((res, BOC) => res.replace(BOC, ''), liquid);

    const VARIABLES_NOT_PRIMITIVE_OF_HIDDEN_FIELD: string[] = [];

    settings.forEach(setting => {
      if (VARIABLES_NAME.includes(setting.name)) {
        throw new LiquidSyntaxToTwigError(i18n.t('twig_error.exception_of_code_liquid.variable', { error_signal: toString(setting) }));
      }
      if (setting.type === 'hidden' && (isObject(setting.children) || isArray(setting.children))) {
        VARIABLES_NOT_PRIMITIVE_OF_HIDDEN_FIELD.push(setting.name);
      }
      if (setting.type === 'object') {
        setting.children.forEach(({ children, type, name }) => {
          if (type === 'hidden' && (isObject(children) || isArray(children))) {
            VARIABLES_NOT_PRIMITIVE_OF_HIDDEN_FIELD.push(`${setting.name}.${name}`);
          }
        });
      }
      // @tuong -> type "Array" không thể sử dụng trong cặp thẻ "shopify" nên không cần check
      // if(setting.type === 'array') {}
    });

    const liquidBOCs = getBOCsBetweenSomething({
      liquid: liquidRemoveAddonsContext,
      startBOC: new RegExp(`<${Consts.FakeTags.Shopify}>`),
      endBOC: new RegExp(`</${Consts.FakeTags.Shopify}>`),
      ignoreNested: true,
    });

    let liquidRemoveShopifyTag = liquidRemoveAddonsContext;

    liquidBOCs.forEach(BOC => {
      const filter_in_if_error = at(BOC.match(/{%\s*if.*\|.*%}/g), 0);
      if (filter_in_if_error) {
        throw new LiquidSyntaxToTwigError(i18n.t('twig_error.exception_of_code_liquid.filter_in_if_tag', { error_signal: filter_in_if_error }));
      }
      const field_value_error = VARIABLES_NOT_PRIMITIVE_OF_HIDDEN_FIELD.find(item => {
        return (
          /** Xét từng block {{...}} và {%...%} để tăng độ chính xác (có khá nhiều vị trí xét từng block như thế này -> nếu update cần xem xét việc update những cái còn lại) */
          at(BOC.match(new RegExp(`({{|{%).*${strToRegexpPattern(item)}.*(%}|}})`, 'g')), 0) ||
          // FIX cho trường hợp all_products[products] (có khá nhiều vị trí xét từng block như thế này -> nếu update cần xem xét việc update những cái còn lại)
          at(BOC.match(new RegExp(strToRegexpPattern(`[${item}]`), 'g')), 0)
        );
      });
      if (field_value_error) {
        throw new LiquidSyntaxToTwigError(i18n.t('twig_error.exception_of_code_liquid.field_value', { error_signal: field_value_error }));
      }
      liquidRemoveShopifyTag = liquidRemoveShopifyTag.replace(BOC, '');
    });

    const delimeterBOCS = getMatches(liquidRemoveShopifyTag, new RegExp(`({{|{%).*(%}|}})`, 'g'));
    FILTERS_AND_TAGS_MUST_BE_IN_SHOPIFY_TAG.forEach(filter => {
      const isError = !!delimeterBOCS.find(BOC => {
        return (
          BOC &&
          (new RegExp(`({{|{%)(.*)\\|\\s*${strToRegexpPattern(filter)}(?!\\w+)`, 'g').test(BOC) ||
            new RegExp(strToRegexpPattern(`[${filter}]`), 'g').test(BOC))
        );
      });
      if (isError) {
        throw new LiquidSyntaxToTwigError(i18n.t('twig_error.exception_of_code_liquid.filter', { error_signal: toString(filter) }));
      }
    });
    VARIABLES_NAME_MUST_BE_IN_SHOPIFY_TAG.forEach(variableName => {
      const isError = !!delimeterBOCS.find(BOC => BOC && isExistExactShopifyVariableInBOC(BOC, variableName));
      if (isError) {
        console.log({
          delimeterBOCS,
          variableName,
          a: delimeterBOCS.find(BOC => BOC && isExistExactShopifyVariableInBOC(BOC, variableName)),
          liquidRemoveShopifyTag,
          liquid,
        });
        throw new LiquidSyntaxToTwigError(
          i18n.t('twig_error.exception_of_code_liquid.variable_outside_shopify_tag', { error_signal: toString(variableName) }),
        );
      }
    });
  }
};

interface GetErrorOfCodeLiquid extends Pick<ComponentData, 'liquid' | 'settings'> {
  checkShopifyVariable: boolean;
  cb: (args: { message: string; lineNumber: number }) => void;
  variant: HandleLiquidFile['variant'];
}

export const getErrorOfCodeLiquid = ({ liquid, settings, cb, checkShopifyVariable, variant }: GetErrorOfCodeLiquid) => {
  if (variant === 'megamenu -> cần compile' || variant === 'addon -> cần compile') {
    let isError = false;
    settings.forEach(setting => {
      if (VARIABLES_NAME.includes(setting.name)) {
        const lines = liquid.split('\n');
        cb({
          message: i18n.t('twig_error.exception_of_code_liquid.variable', { error_signal: toString(setting) }),
          lineNumber: lines.findIndex(line => line.includes(setting.name)) + 1,
        });
        isError = true;
      }
    });

    if (isError) {
      return true;
    }

    const liquidBOCs = getBOCsBetweenSomething({
      liquid,
      startBOC: new RegExp(`<${Consts.FakeTags.Shopify}>`),
      endBOC: new RegExp(`</${Consts.FakeTags.Shopify}>`),
      ignoreNested: true,
    });

    let liquidRemoveShopifyTag = liquid;
    const lines = liquidRemoveShopifyTag.split('\n');
    lines.forEach((line, index) => {
      if (/{%\s*if.*\|.*%}/g.test(line)) {
        const message = i18n.t('twig_error.exception_of_code_liquid.filter_in_if_tag', { error_signal: line.replace(/{%\s*if.*\||\s*%}.*/g, '') });
        cb({
          message,
          lineNumber: index + 1,
        });
        isError = true;
      }
    });

    if (isError) {
      return true;
    }
    liquidBOCs.forEach(BOC => {
      liquidRemoveShopifyTag = liquidRemoveShopifyTag.replace(BOC, '');
    });

    const delimeterBOCS = getMatches(liquidRemoveShopifyTag, new RegExp(`({{|{%).*(%}|}})`, 'g'));
    FILTERS_AND_TAGS_MUST_BE_IN_SHOPIFY_TAG.forEach(filter => {
      const lines = liquidRemoveShopifyTag.split('\n');
      lines.forEach(line => {
        const _isError = !!delimeterBOCS.find(BOC => {
          return (
            BOC &&
            (new RegExp(`({{|{%)(.*)\\|\\s*${strToRegexpPattern(filter)}(?!\\w+)`, 'g').test(BOC) ||
              new RegExp(strToRegexpPattern(`[${filter}]`), 'g').test(BOC))
          );
        });
        if (_isError) {
          const message = i18n.t('twig_error.exception_of_code_liquid.filter', { error_signal: toString(filter) });
          cb({
            message,
            lineNumber: liquid.split('\n').findIndex(l => l.includes(line)) + 1,
          });
          isError = true;
        }
      });
    });

    if (checkShopifyVariable) {
      VARIABLES_NAME_MUST_BE_IN_SHOPIFY_TAG.forEach(variableName => {
        const lines = liquidRemoveShopifyTag.split('\n');
        lines.forEach(line => {
          const _isError = !!delimeterBOCS.find(BOC => BOC && isExistExactShopifyVariableInBOC(BOC, variableName));
          if (_isError) {
            const message = i18n.t('twig_error.exception_of_code_liquid.variable_outside_shopify_tag', { error_signal: toString(variableName) });
            cb({
              message,
              lineNumber: liquid.split('\n').findIndex(l => l.includes(line)) + 1,
            });
            isError = true;
          }
        });
      });
    }

    if (isError) {
      return true;
    }
    return false;
  }
  return false;
};
