/**
 * TODO: Có hay không nên việc custom lại cái này ?????
 * TODO: Liệu có cần xét từng block {{...}} và {%...%} để tăng độ chính xác
 * @link https://shopify.github.io/liquid/filters/floor/
 */
export const floor = (liquid: string) => {
  return liquid.replace(/\|\s*floor/gm, `| round(0, 'floor')`);
};
