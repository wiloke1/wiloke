/** Function đảm nhiệm replace syntax trong code sao cho trùng với liquid */
export const convertToSyntaxShopifyDataType = (value: boolean | number | string): string => {
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
