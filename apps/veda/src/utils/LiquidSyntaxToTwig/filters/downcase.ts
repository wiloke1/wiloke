/**
 * TODO: Có hay không việc nên custom lại cái này
 * TODO: Liệu có cần xét từng block {{...}} và {%...%} để tăng độ chính xác
 * @link https://shopify.github.io/liquid/filters/downcase/
 */
export const downcase = (liquid: string) => {
  return liquid.replace(/\|\s*downcase/gm, '| lower');
};
