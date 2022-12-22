import { getBOCsBetweenSomething } from '../utils/getBOCsBetweenSomething';

/**
 * NOTE: @tuong -> Những dấu "\n" được thêm vào sẽ gây ra lỗi khi dùng liquid ở thẻ script (json, biến js json ,...) -> Tạm thời đang xử lí tại "postprocess/handleBOCDelimiters"
 * Function thực hiện quy hết các đoạn code trong các delimiters về 1 kiểu (chuyển cả đoạn code liên quan đến block của template engine về 1 dòng)
 * => làm thế này để có thể regex đc
 * NOTE: @tuong -> Nếu update file này cần xem xét việc update cả file preprocess/handleBOCDelimiters
 * @requires Phải thực hiện sau "handleReplaceToGerneralOpenCloseBlock"
 * Function thực hiện xử lí xuống dòng và space của các block code shopify để có thể regex cho những function khác
 * @example
 * Input:
    {% paginate
    collections[best_seller_collection].products
    by
    quantity_product_displayed %}

    {% if variant.inventory_policy == 'continue' %}{{ variant.id | append: " " }}{% endif %}
  * Output:
    {%- paginate collections[best_seller_collection].products by quantity_product_displayed -%}

    {% if variant.inventory_policy == 'continue' %}
    {{ variant.id | append: " " }}
    {% endif %}
 */
export const handleBOCDelimiters = (liquid: string) => {
  const START_BOC = new RegExp(/({{)|({%)/);
  const END_BOC = new RegExp(/(%})|(}})/);
  let _liquid = liquid;
  // Trong cả twig và liquid BOC Delimiter không thể nested -> Regex startBOC và endBOC như thế kia là đc
  getBOCsBetweenSomething({ liquid: liquid, startBOC: START_BOC, endBOC: END_BOC, ignoreNested: true }).forEach(BOC => {
    // NOTE: @tuong -> Liệu có đúng vì nhỡ may trong code thực sự có \s+ và \n có ảnh hưởng đến kết quả
    const _BOC = BOC.replace(/\n/g, '').replace(/\s+/g, ' ');
    _liquid = _liquid.replace(BOC, _BOC);
  });
  return _liquid.replace(/(}}|%})/g, value => value.concat('\n'));
};
