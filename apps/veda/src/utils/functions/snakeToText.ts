export const snakeToText = (str: string) => {
  return str.replace(/_/g, ' ').replace(/^./, str => str.toUpperCase());
};
