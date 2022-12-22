const { getCssVariables } = require('./getCssVariants');

exports.cssVarsTransformer = variables => {
  return ({ addBase }) => {
    const cssVariables = getCssVariables(variables);
    addBase(cssVariables);
  };
};
