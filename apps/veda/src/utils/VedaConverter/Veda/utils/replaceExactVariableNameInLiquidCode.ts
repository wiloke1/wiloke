import { strToRegexpPattern } from './strToRegexpPattern';

/**
 * Function đảm replace chính xác string và bỏ qua các trường hợp string đó là substring của 1 string khác
 * @example
 Input: Mỗi dòng là 1 tham số đầu vào của function
 "{{ collections[collection_1] }} {{ collections[best_collection_1] }} {{ collections[best_collection_1_abc] }}"
 "collection_1"
 "target_value"

 Output:
 "{{ collections[target_value] }} {{ collections[best_collection_1] }} {{ collections[best_collection_1_abc] }}"
 */

interface ReplaceExactVariableNameInLiquidCode {
  liquid: string;
  source: string;
  target: string;
  isObject?: boolean;
}

export const replaceExactVariableNameInLiquidCode = ({ liquid, source, target, isObject = false }: ReplaceExactVariableNameInLiquidCode) => {
  return liquid.replace(new RegExp(`(.|\n)${strToRegexpPattern(source)}(.|\n)`, 'g'), value => {
    // Bắt đầu hoặc kết thúc bởi dấu "." cũng không được thế vào
    const startOrEndWithWords = /(^\w)|(\w$)/.test(value);
    const startOrEndWithDot = isObject ? value.startsWith('.') : value.startsWith('.') || value.endsWith('.');
    const startOrEndWithHyphenMinus = value.startsWith('-') || value.endsWith('-');
    const startOrEndWithQuote = value.startsWith(`'`) || value.endsWith(`'`);
    const startOrEndWithDoubleQuote = value.startsWith(`"`) || value.endsWith(`"`);
    const isInvalidToReplace =
      startOrEndWithWords || startOrEndWithDot || startOrEndWithHyphenMinus || startOrEndWithQuote || startOrEndWithDoubleQuote;
    if (isInvalidToReplace) {
      return value;
    } else {
      return value.replace(source, target);
    }
  });
};
