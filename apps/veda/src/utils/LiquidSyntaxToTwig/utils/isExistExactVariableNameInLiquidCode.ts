import strToRegexpPattern from 'utils/functions/strToRegexpPattern';
import { getMatches } from './getMatches';

/**
 * Function đảm check tồn tại chính xác string và bỏ qua các trường hợp string đó là substring của 1 string khác
 */
export const isExistExactVariableNameInLiquidCode = (liquid: string, source: string) => {
  const matches = getMatches(liquid, new RegExp(`.${strToRegexpPattern(source)}.`, 'g'));

  if (!matches.length) {
    return false;
  }
  return matches.find(match => {
    if (typeof match === 'string') {
      const startOrEndWithWords = /(^\w)|(\w$)/.test(match);
      const startOrEndWithDot = match.startsWith('.') || match.endsWith('.');
      const startOrEndWithHyphenMinus = match.startsWith('-') || match.endsWith('-');
      const startOrEndWithQuote = match.startsWith(`'`) || match.endsWith(`'`);
      const startOrEndWithDoubleQuote = match.startsWith(`"`) || match.endsWith(`"`);
      const startOrEndWithCloseDelimeter = match.startsWith(`}`) || match.endsWith(`}`); // "{{ heading.description_design }}order: {{ heading.sortable.description }}"
      const startOrEndWithDoubleDot = match.startsWith(`:`) || match.endsWith(`:`); // "{{ heading.description_design }}order: {{ heading.sortable.description }}"
      const isInvalidToReplace =
        startOrEndWithWords ||
        startOrEndWithDot ||
        startOrEndWithHyphenMinus ||
        startOrEndWithQuote ||
        startOrEndWithDoubleQuote ||
        startOrEndWithCloseDelimeter ||
        startOrEndWithDoubleDot;
      return !isInvalidToReplace;
    }
    return false;
  });
};
