/**
 * TODO: Có hay không việc nên custom lại cái này ???
 * TODO: Liệu có cần xét từng block {{...}} và {%...%} để tăng độ chính xác
 * @link https://shopify.github.io/liquid/filters/strip_html/
 */
export const strip_html = (liquid: string) => {
  return liquid.replace(/\|\s*strip_html/gm, '| striptags');
};
