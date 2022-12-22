import { i18n } from 'translation';
import strToRegexpPattern from 'utils/functions/strToRegexpPattern';
import { getBuilderPageReduxStore } from 'utils/getParentStore';
import { v4 } from 'uuid';
import { LiquidSyntaxToTwigError } from '../Error';
import { getBOCsBetweenSomething } from '../utils/getBOCsBetweenSomething';
import { getMatches } from '../utils/getMatches';
import { replaceExactRegexpInLiquidCode } from '../utils/replaceExactRegexpInLiquidCode';
import { toString } from '../utils/toString';

/**
 * TODO: Chưa test được tất cả các trường họp xuống dòng linh tinh, những thứ không bình thường, ...
 * @link https://shopify.dev/api/liquid/tags/theme-tags#paginate
 @example cái này khá dài để diễn giải nên chưa có demo
 */
export const paginate = (liquid: string) => {
  const START_BOC = new RegExp(/{%\s*paginate/);
  const END_BOC = new RegExp(/{%\s*endpaginate\s*%}/);
  try {
    const state = getBuilderPageReduxStore().getState();
    const pathname = state.liquidVariables.data.request?.path;

    // @tuong -> cái này không quan trọng xử lí từ khối con trước hay khối tổng thể vì tag paginate tạm thời không thể viết nested
    let BOCs = getBOCsBetweenSomething({ liquid, startBOC: START_BOC, endBOC: END_BOC, ignoreNested: true });
    let _liquid = liquid;

    while (!!BOCs.length) {
      const BOC = BOCs.shift() as string;
      // FIXME: shopify cho phép viết nested paginate (có lẽ)
      // xoá đi kĩ tự đầu tiên và cuối cùng
      const BOCForValidate = BOC.replace(/(^.|.$)/g, '');
      if (START_BOC.test(BOCForValidate) || END_BOC.test(BOCForValidate)) {
        throw new LiquidSyntaxToTwigError(i18n.t('twig_error.exception_of_code_liquid.nested_paginate', { error_signal: BOC }));
      }
      // Xử lí xuống dòng để có thể regex
      let _BOC = BOC.replace(/%}/gm, '%}\n').replace(/{%\s*endpaginate\s*%}/gm, '\n{% endpaginate %}');
      // Lấy ra dòng code {% paginate ... %}
      // NOTE: @tuong -> Tại sao lại chỉ lấy 1 phần tử trong "getMatches" -> Vì _BOC chỉ có duy nhất 1 mệnh đề nằm trong "new RegExp"
      const [line_of_code_start_paginate] = getMatches(_BOC, new RegExp(/{%\s*paginate.*%}/gm));

      /**
       * @tuong ->
       * Xét trường hợp BOCs có 2 đoạn code giống y hệt nhau -> Khi đó "BOCs = BOCs.map(item => item.replaceAll(BOC, _BOC));" phía dưới sẽ ra kết quả không mong muốn dẫn đến việc xử lí sai ở bước tiếp theo của vòng lặp
       * Check "if" và không throw lỗi trong "else" cho trường hợp nếu tồn tại nhiều hơn 2 BOC giống y hệt nhau trong BOCs -> "BOCs = BOCs.map(item => item.replaceAll(BOC, _BOC))" sẽ thay thế mất những BOC bị trùng đằng sau -> "line_of_code_start_paginate" những thằng trùng đằng sau sẽ là undefined
       * NOTE: "BOCs = BOCs.map(item => item.replaceAll(BOC, _BOC));" được sử dụng ở nhiều file "case_when, unless, limit, offset, reversed, comment, liquid, paginate"
       */
      if (line_of_code_start_paginate) {
        // Lấy ra mệnh đề chứa tên biến được paginate và số item trên 1 paginate
        const [arrayLimited, quantityLimit] = line_of_code_start_paginate
          .replace(/{%\s*paginate/, '')
          .replace(/%}/, '')
          .trim()
          .split('by')
          .map(item => item.trim());
        const _arrayLimited = arrayLimited.trim();
        const _quantityLimit = quantityLimit.trim();
        const UNIQ_ID = v4().replaceAll('-', '_');
        // Gán các biến để có thế sử dụng như liquid
        _BOC = _BOC
          .replace(
            line_of_code_start_paginate,
            `
        {% set current_page_of_paginate_${UNIQ_ID} = 1 %}
        {% set items_of_paginate_${UNIQ_ID} = (${_arrayLimited} | length) %}
        {% set pages_of_paginate_${UNIQ_ID} = (items_of_paginate_${UNIQ_ID} / ${quantityLimit}) | round(0, 'ceil') %}
        {% set current_offset_of_paginate_${UNIQ_ID} = (current_page_of_paginate_${UNIQ_ID} - 1) * items_of_paginate_${UNIQ_ID} %}

        {% if pages_of_paginate_${UNIQ_ID} == 1 %}
          {% set parts_of_paginate_${UNIQ_ID} = [] %}
        {% elseif pages_of_paginate_${UNIQ_ID} == 2 %}
          {% set parts_of_paginate_${UNIQ_ID} = [
            {"title":1,"is_link":false},
            {"title":2,"url":"${pathname}?page=2","is_link":true}
          ]%}
        {% elseif pages_of_paginate_${UNIQ_ID} == 3 %}
          {% set parts_of_paginate_${UNIQ_ID} = [
            {"title":1,"is_link":false},
            {"title":2,"url":"${pathname}?page=2","is_link":true},
            {"title":3,"url":"${pathname}?page=3","is_link":true}
          ]%}
        {% elseif pages_of_paginate_${UNIQ_ID} == 4 %}
          {% set parts_of_paginate_${UNIQ_ID} = [
            {"title":1,"is_link":false},
            {"title":2,"url":"${pathname}?page=2","is_link":true},
            {"title":3,"url":"${pathname}?page=3","is_link":true},
            {"title":4,"url":"${pathname}?page=4","is_link":true}
          ]%}
        {% elseif pages_of_paginate_${UNIQ_ID} > 4 %}
          {% set parts_of_paginate_${UNIQ_ID} = [
            {"title":1,"is_link":false},
            {"title":2,"url":"${pathname}?page=2","is_link":true},
            {"title":3,"url":"${pathname}?page=3","is_link":true},
            {"title":"\u0026hellip;","is_link":false},
            {"title": pages_of_paginate_${UNIQ_ID},"url":"${pathname}?page={{ pages_of_paginate_${UNIQ_ID} }}","is_link":true}
          ]%}
        {% else %}
          {% set parts_of_paginate_${UNIQ_ID} = [] %}
        {% endif %}


        {% set paginate = {
        "current_offset": current_offset_of_paginate_${UNIQ_ID},
        "current_page": current_page_of_paginate_${UNIQ_ID},
        "items": items_of_paginate_${UNIQ_ID},
        "page_size": ${_quantityLimit},
        "next":{"title":"Next \u0026raquo;","url":"${pathname}?page=2","is_link":true},
        "pages": pages_of_paginate_${UNIQ_ID},
        "parts": parts_of_paginate_${UNIQ_ID},
        "previous": null,
      } %}`,
          )
          .replace(/{%\s*endpaginate\s*%}/gm, '');
        // "(?!\\s*\\|)" vì thường paginate sử dụng để giới hạn vòng for và sẽ không có filter nào được sử dụng trong syntax vòng for nên đang làm như thế này
        _BOC = replaceExactRegexpInLiquidCode(
          _BOC,
          new RegExp(`${strToRegexpPattern(_arrayLimited)}(?!\\s*\\|)`, 'gm'),
          `${_arrayLimited} | slice(0, ${_quantityLimit})`,
        );
        // Xoá "\n" được thêm vào để regex
        _BOC = _BOC.replace(/%}\n/g, '%}').replace(/\n{% endpaginate %}/g, '{% endpaginate %}');
        // .replaceAll thay vì .replace để replace hết các BOC giống nhau luôn
        _liquid = _liquid.replaceAll(BOC, _BOC);
        BOCs = BOCs.map(item => item.replaceAll(BOC, _BOC));
      }
    }
    return _liquid;
  } catch (err) {
    if (err instanceof LiquidSyntaxToTwigError) {
      throw err;
    }
    throw new LiquidSyntaxToTwigError(i18n.t('twig_error.theme_tags.paginate.example', { error_signal: toString(err) }));
  }
};
