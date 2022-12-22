/**
 *
 * TODO: Chưa chắc chắn chính xác và Có hay không nên việc custom lại cái này ?????
 * TODO: Liệu có cần xét từng block {{...}} và {%...%} để tăng độ chính xác
 * @link https://shopify.dev/api/liquid/filters/string-filters#url_param_escape
 */
export const url_param_escape = (liquid: string) => {
  return liquid.replace(/\|\s*url_param_escape\s*/gm, () => {
    return `| escape('url')`;
  });
};
