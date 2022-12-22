const removeRedundantLines = (value: string) => {
  return value.replace(/\n\s*\n\s*$/gm, '');
};

export default removeRedundantLines;
