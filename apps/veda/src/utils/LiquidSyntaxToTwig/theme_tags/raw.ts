/**
 * @link https://shopify.dev/api/liquid/tags/theme-tags#raw
 */
export const raw = (liquid: string) => {
  return liquid.replace(/{%\s*raw\s*%}/g, '{% verbatim %}').replace(/{%\s*endraw\s*%}/g, '{% endverbatim %}');
};
