/**
 * @link https://shopify.dev/api/liquid/tags/theme-tags#style
 */
export const style = (liquid: string) => {
  return liquid
    .replace(/{%\.*styles.*%}/gm, () => {
      return `<style data-shopify>`;
    })
    .replace(/{%\.*endstyles.*%}/gm, () => {
      return `</style>`;
    });
};
