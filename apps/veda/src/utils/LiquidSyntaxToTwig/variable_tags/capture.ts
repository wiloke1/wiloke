/**
 * @link https://shopify.github.io/liquid/tags/variable/
 @example
 Input: {% capture my_variable %}I am being captured.{% endcapture %}
 Output: {% set my_variable %}I am being captured.{% endset %}
 */
export const capture = (liquid: string) => {
  return liquid.replace(/{%\s*capture/gm, '{% set').replace(/{%\s*endcapture\s*%}/gm, '{% endset %}');
};
