const { getRgb } = require('./getRgb');

const getCssColorVariables = (colors, isDark = false, freeze = false) => {
  return colors.reduce(
    (str, item) =>
      `${str}${item.name}${freeze ? '-freeze' : ''}:${item[isDark ? 'dark' : 'light']};${item.name.replace(/^--/g, '--rgb-')}${
        freeze ? '-freeze' : ''
      }:${getRgb(item[isDark ? 'dark' : 'light'])};`,
    '',
  );
};

const getCssFontVariables = fonts => {
  return fonts.reduce((str, item) => `${str}${item.name}:${item.value};`, '');
};

exports.getCssVariables = cssVariables =>
  `:root { ${getCssColorVariables(cssVariables.colors, false)}${getCssColorVariables(cssVariables.colors, false, true)}${getCssFontVariables(
    cssVariables.fonts,
  )} } :root.dark { ${getCssColorVariables(cssVariables.colors, true)} }`;
