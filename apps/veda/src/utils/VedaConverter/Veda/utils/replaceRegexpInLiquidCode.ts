/**
 * Function đảm replace chính xác regexp truyền vào
 * @example
 Input: Mỗi dòng là 1 tham số truyền vào
  {% paginate customer.orders by 3 %} - {{ 'veda.customer.orders.order_number' | t }}
  new RegExp(`${strToRegexpPattern("customer.orders")}(?!\\s*\\|)`, "gm")
  TARGET

 Output:
 {% paginate "TARGET" by 3 %} - {{ 'veda.customer.orders.order_number' | t }}
 */
export const replaceExactRegexpInLiquidCode = (liquid: string, source: RegExp, target: string | Parameters<string['replace']>['1']) => {
  const regexp_ = new RegExp(`.${source.source}.`, Array.from(new Set(['g', ...source.flags.split('')])).join(''));

  return liquid.replace(regexp_, value => {
    const startOrEndWithWords = /(^\w)|(\w$)/.test(value);
    const startOrEndWithDot = value.startsWith('.') || value.endsWith('.');
    const startOrEndWithHyphenMinus = value.startsWith('-') || value.endsWith('-');
    const startOrEndWithQuote = value.startsWith(`'`) || value.endsWith(`'`);
    const startOrEndWithDoubleQuote = value.startsWith(`"`) || value.endsWith(`"`);
    const isInvalidToReplace =
      startOrEndWithWords || startOrEndWithDot || startOrEndWithHyphenMinus || startOrEndWithQuote || startOrEndWithDoubleQuote;
    if (isInvalidToReplace) {
      return value;
    } else {
      if (typeof target === 'string') {
        return value.replace(source, target);
      }
      return value.replace(source, target);
    }
  });
};
