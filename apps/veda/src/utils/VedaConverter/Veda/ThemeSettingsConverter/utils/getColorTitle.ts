const strToCapitalize = (str: string) => {
  return str.charAt(0).toUpperCase() + str.toLowerCase().slice(1);
};
const removeVar = (str: string) => {
  return str
    .replace(/var\(|\)/g, '')
    .replace(/-freeze/g, '')
    .replace(/rgba\(|,.*$/g, '')
    .replace(/--rgb-/g, '--');
};

export const getColorTitle = (colorVariable: string) => {
  if (!colorVariable) {
    return 'No color';
  }
  if (!colorVariable.includes('--')) {
    return colorVariable;
  }
  return strToCapitalize(
    removeVar(colorVariable)
      .replace(/--/g, '')
      .replace(/-/g, ' '),
  );
};
