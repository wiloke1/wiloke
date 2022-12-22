import strToRegexpPattern from 'utils/functions/strToRegexpPattern';

export const replaceExactKeywordInLiquidCode = (liquid: string, source: string, target: string) => {
  return liquid.replace(new RegExp(`.${strToRegexpPattern(source)}.`, 'g'), value => {
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
      return value.replace(source, target);
    }
  });
};
