/**
 * Function được sử dụng để xử lý tag {% liquid ... %} do "preprocess/handleBOCDelimiters" gây ra. Bằng một cách nào đó shopify không hỗ trợ viết hết 1 dòng như case dưới
 Input: `{% liquid assign defaultClass = 'p:12px_20px fz:14px z:10' case add_to_cart_action.variant when 'primary' assign variantClass = 'bgc:color-primary c:color-light-freeze bgc:color-gray9|h c:color-light|h' when 'secondary' assign variantClass = 'bgc:color-secondary c:color-light-freeze bgc:color-gray9|h c:color-light|h' when 'dark' assign variantClass = 'bgc:color-gray9 c:color-light bgc:color-primary|h c:color-light-freeze|h' when 'gray' assign variantClass = 'bgc:color-gray2 c:color-gray9 bgc:color-primary|h c:color-light-freeze|h' when 'light' assign variantClass = 'bgc:color-light c:color-gray9 bgc:color-primary|h c:color-light-freeze|h' else assign variantClass = 'bgc:color-gray9-freeze bgc:color-gray9-freeze|h c:color-gray9 c:color-primary|h' endcase %}`

 Output: Lỗi ở shopify
 */

import { SHOPIFY_TAG } from './theme_tags/liquid';
import { getBOCsBetweenSomething } from './utils/getBOCsBetweenSomething';
import { replaceExactKeywordInLiquidCode } from './utils/replaceExactKeywordInLiquidCode';

interface HandleTagLiquidBeforeSyncShopify {
  liquidFile: string;
}

/** Function được sử dụng để vá lỗi {% liquid ... %}
 * Bằng một cách nào đó shopify không hỗ trợ viết hết 1 dòng như case dưới
 Input: `{% liquid assign defaultClass = 'p:12px_20px fz:14px z:10' case add_to_cart_action.variant when 'primary' assign variantClass = 'bgc:color-primary c:color-light-freeze bgc:color-gray9|h c:color-light|h' when 'secondary' assign variantClass = 'bgc:color-secondary c:color-light-freeze bgc:color-gray9|h c:color-light|h' when 'dark' assign variantClass = 'bgc:color-gray9 c:color-light bgc:color-primary|h c:color-light-freeze|h' when 'gray' assign variantClass = 'bgc:color-gray2 c:color-gray9 bgc:color-primary|h c:color-light-freeze|h' when 'light' assign variantClass = 'bgc:color-light c:color-gray9 bgc:color-primary|h c:color-light-freeze|h' else assign variantClass = 'bgc:color-gray9-freeze bgc:color-gray9-freeze|h c:color-gray9 c:color-primary|h' endcase %}`

 Output: Lỗi ở shopify
*/

export const handleTagLiquidBeforeSyncShopify = ({ liquidFile }: HandleTagLiquidBeforeSyncShopify) => {
  let BOCs = getBOCsBetweenSomething({
    liquid: liquidFile,
    endBOC: /%}/,
    startBOC: /{%\s*liquid/,
  });
  let _liquid = liquidFile;

  while (BOCs.length) {
    const BOC = BOCs.shift();
    if (BOC) {
      let _BOC = BOC;
      SHOPIFY_TAG.sort((a, b) => b.length - a.length).forEach(shopifyTag => {
        _BOC = replaceExactKeywordInLiquidCode(
          _BOC,
          shopifyTag,
          shopifyTag.startsWith('end') || shopifyTag === 'elsif' ? `\n${shopifyTag}\n` : `\n${shopifyTag}`,
        );
      });
      _liquid = _liquid.replaceAll(BOC, _BOC);
      BOCs = BOCs.map(item => item.replaceAll(BOC, _BOC));
    }
  }

  return _liquid;
};
