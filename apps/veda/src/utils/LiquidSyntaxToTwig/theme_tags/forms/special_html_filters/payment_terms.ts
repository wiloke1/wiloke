/**
 * TODO: Không chắn chắn chính xác vì docs không rõ ràng
 * @link https://shopify.dev/api/liquid/filters/html-filters#payment_terms
 */
export const payment_terms = (liquid: string) => {
  return liquid.replace(/{{\s*form\s*\|\s*payment_terms\s*}}/gm, () => {
    return `
    <shopify-payment-terms variant-id="..." shopify-meta="...">

    </shopify-payment-terms>
  `;
  });
};
