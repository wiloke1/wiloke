/**
 * TODO: Có hay không nên việc custom lại cái này ?????
 * TODO: Liệu có cần xét từng block {{...}} và {%...%} để tăng độ chính xác
 * @link https://shopify.dev/api/liquid/filters/string-filters#camelcase
 @example
 Input: {{ 'coming-soon' | camelcase }}
 Output: {{ 'coming-soon' | title | replace({ '-': '', '_': '', ' ': '' }) }}
 */
export const camelcase = (liquid: string) => {
  return liquid.replace(/\|\s*camelcase\s*/gm, () => {
    return `| title | replace({ '-': '', '_': '', ' ': '' })`;
  });
};
