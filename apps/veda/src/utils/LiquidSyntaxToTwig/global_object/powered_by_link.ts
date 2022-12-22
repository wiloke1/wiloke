/**
 * @link https://shopify.dev/api/liquid/objects#powered_by_link
 */

export const powered_by_link = (liquid: string) => {
  return liquid.replace(/{{\s*powered_by_link\s*}}/, () => {
    return `<a target="_blank" rel="nofollow noopener" href="https://www.shopify.com?utm_campaign=poweredby&amp;utm_medium=shopify&amp;utm_source=onlinestore" aria-describedby="a11y-new-window-external-message">Powered by Shopify</a>`;
  });
};
