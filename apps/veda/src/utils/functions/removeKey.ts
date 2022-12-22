export const removeKey = <T extends Record<string, any>, K extends keyof T>(obj: T, key: K): Omit<T, K> => {
  const { [key]: _deleted, ...rest } = obj;
  return rest;
};
