/**
 * TODO: Liệu có cần xét từng block {{...}} và {%...%} để tăng độ chính xác
 * @link https://shopify.dev/api/liquid/objects/for-loops
 */
export const forloop = (liquid: string) => {
  return liquid.replaceAll('forloop.', 'loop.');
};
