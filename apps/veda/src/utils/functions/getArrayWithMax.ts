export const unshiftWithMaxIndex = <T extends any>(arr: T[], newItem: T, maxIndex = Infinity) => {
  return [
    newItem,
    ...arr.reduce<T[]>((acc, cur, index) => {
      return [...acc, ...(index + 1 < maxIndex ? [cur] : [])];
    }, []),
  ];
};

export const pushWithMaxIndex = <T extends any>(arr: T[], newItem: T, maxIndex = Infinity) => {
  return [
    ...arr.reduce<T[]>((acc, cur, index) => {
      return [...acc, ...(index >= arr.length - maxIndex + 1 ? [cur] : [])];
    }, []),
    newItem,
  ];
};
