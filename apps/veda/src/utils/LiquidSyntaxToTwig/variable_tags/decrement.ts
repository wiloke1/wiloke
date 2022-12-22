/**
 * @link https://shopify.github.io/liquid/tags/variable/
 */
export const decrement = (liquid: string) => {
  return liquid.replace(/{%\s*decrement\s.*\s*%}/g, BOC => {
    const targetVariable = BOC.replace(/{%\s*decrement/g, '')
      .replace(/%}/g, '')
      .trim();
    return `{% assign ${targetVariable} = ${targetVariable} - 1 %}`;
  });
};
