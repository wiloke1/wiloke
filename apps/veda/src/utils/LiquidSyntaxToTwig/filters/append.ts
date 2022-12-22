/**
 * TODO: Có hay không việc nên custom lại cái này
 * TODO: Liệu có cần xét từng block {{...}} và {%...%} để tăng độ chính xác
 * @link https://shopify.github.io/liquid/filters/append/

 @example
 Input:
 {% assign collectionTitle = collection.title | append: ".helloworld" | append: collection.title %}
 Output:
 {% assign collectionTitle = collection.title ~ ".helloworld" ~ collection.title %}
 */
export const append = (liquid: string) => {
  return liquid.replace(/\|\s*append\s*:/gm, '~ ');
};
