import strToRegexpPattern from '../../../../../utils/functions/strToRegexpPattern';

export const replaceExactKeyword = (str: string, source: string, target: any) => {
  // 2 dấu cách đầu tiên để vá lỗi cho function "replaceExactKeyword"
  const _str = ` ${str} `;
  return _str.replace(new RegExp(`.${strToRegexpPattern(source)}.`, 'g'), value => {
    const startOrEndWithWords = /(^\w)|(\w$)/.test(value);
    const startOrEndWithDot = value.startsWith('.') || value.endsWith('.');
    const startOrEndWithHyphenMinus = value.startsWith('-') || value.endsWith('-');
    const startOrEndWithQuote = value.startsWith(`'`) || value.endsWith(`'`);
    const startOrEndWithDoubleQuote = value.startsWith(`"`) || value.endsWith(`"`);
    if (startOrEndWithWords || startOrEndWithDot || startOrEndWithHyphenMinus || startOrEndWithQuote || startOrEndWithDoubleQuote) {
      return value;
    } else {
      return value.replace(source, target);
    }
  });
};

export const isExistExactKeyword = (str: string, source: string) => {
  // 2 dấu cách đầu tiên để vá lỗi cho function "replaceExactKeyword"
  const _str = ` ${str} `;
  let result = false;
  _str.replace(new RegExp(`.${strToRegexpPattern(source)}.`, 'g'), value => {
    const startOrEndWithWords = /(^\w)|(\w$)/.test(value);
    const startOrEndWithDot = value.startsWith('.') || value.endsWith('.');
    const startOrEndWithHyphenMinus = value.startsWith('-') || value.endsWith('-');
    const startOrEndWithQuote = value.startsWith(`'`) || value.endsWith(`'`);
    const startOrEndWithDoubleQuote = value.startsWith(`"`) || value.endsWith(`"`);
    if (startOrEndWithWords || startOrEndWithDot || startOrEndWithHyphenMinus || startOrEndWithQuote || startOrEndWithDoubleQuote) {
    } else {
      result = true;
    }
    return value;
  });

  return result;
};

export const convertToSyntaxDataType = (value: boolean | number | string): string => {
  if (typeof value === 'boolean') {
    return `${value}`;
  }
  if (typeof value === 'number') {
    return `${value}`;
  }
  if (typeof value === 'string') {
    if (/".*"/g.test(value)) {
      return `'${value}'`;
    }
    return `"${value}"`;
  }
  return value;
};
