/**
 * TODO: Có hay không nên việc custom lại cái này ???
 * TODO: Liệu có cần xét từng block {{...}} và {%...%} để tăng độ chính xác
 * @link https://shopify.github.io/liquid/filters/upcase/
 */
export const upcase = (liquid: string) => {
  return liquid.replace(/\|\s*upcase/gm, '| upper');
};
