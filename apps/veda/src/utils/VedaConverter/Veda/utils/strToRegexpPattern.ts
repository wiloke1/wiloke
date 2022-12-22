export const strToRegexpPattern = (value: string) => {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
};
