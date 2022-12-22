/**
 * @link https://shopify.github.io/liquid/tags/variable/
 */
export const increment = (liquid: string) => {
  return liquid.replace(/{%\s*increment\s.*\s*%}/g, BOC => {
    const targetVariable = BOC.replace(/{%\s*increment/g, '')
      .replace(/%}/g, '')
      .trim();
    return `{% assign ${targetVariable} = ${targetVariable} + 1 %}`;
  });
};
