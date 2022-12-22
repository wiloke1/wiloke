/**
 * TODO: Có hay không việc nên custom lại cái này ???
 * TODO: Liệu có cần xét từng block {{...}} và {%...%} để tăng độ chính xác
 * @link https://shopify.dev/api/liquid/filters/additional-filters#json
 */
export const json = (liquid: string) => {
  return liquid.replace(/\|\s*json\s*/gm, '| json_encode()');
};
