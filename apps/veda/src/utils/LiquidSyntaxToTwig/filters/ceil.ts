/**
 * TODO: Có hay không nên việc custom lại cái này ?????
 * TODO: Liệu có cần xét từng block {{...}} và {%...%} để tăng độ chính xác
 * @link https://shopify.github.io/liquid/filters/ceil/
 */
export const ceil = (liquid: string) => {
  return liquid.replace(/\|\s*ceil/gm, `| round(0, 'ceil')`);
};
