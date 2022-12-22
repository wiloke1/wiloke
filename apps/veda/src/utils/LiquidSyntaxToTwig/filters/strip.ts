/**
 * TODO: Có hay không việc nên custom lại cái này ???
 * TODO: Liệu có cần xét từng block {{...}} và {%...%} để tăng độ chính xác
 * @link https://shopify.github.io/liquid/filters/strip/
 */
export const strip = (liquid: string) => {
  // \w+ để fix lỗi cho strip_html
  return liquid.replace(/\|\s*strip(?!\w+)/gm, '| trim');
};
