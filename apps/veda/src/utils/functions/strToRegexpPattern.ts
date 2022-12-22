const strToRegexpPattern = (value: string) => {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
};

export default strToRegexpPattern;
