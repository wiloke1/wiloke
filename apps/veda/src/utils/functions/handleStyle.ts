export const styleToObject = (value: string): Record<string, any> => {
  if (!value) {
    return {};
  }
  return value
    .replace(/;$/g, '')
    .replace(/:\s*/g, ':')
    .replace(/;\s*/g, ';')
    .replace(/\s*;\s*base64,/g, '__________base64,')
    .split(';')
    .reduce((obj, item) => {
      const key = item.replace(/:.*/g, '');
      const val = item.replace(/^[\w-]*:(?!\/)/g, '');
      if (!key) {
        return obj;
      }
      return {
        ...obj,
        [key]: val.replace(/__________/g, ';'),
      };
    }, {});
};

export const objectToStyle = (value: Record<string, any>, useImportant = false): string => {
  const important = useImportant ? ' !important' : '';
  return Object.entries(value).reduce((str, [key, val]) => {
    const _val = val.includes('!important') ? val : val + important;
    return `${str}${key}:${_val};`;
  }, '');
};
