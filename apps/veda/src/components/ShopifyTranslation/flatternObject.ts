export const flatternObject = (obj: Record<string, any>, parentKey: string[] = []): Record<string, any> => {
  return Object.entries(obj).reduce<Record<string, any>>((acc, [key, val]) => {
    const keys = parentKey.length ? [...parentKey, key] : [key];
    if (typeof val === 'object') {
      return { ...acc, ...flatternObject(val, keys) };
    }
    return { ...acc, [keys.join('.')]: val };
  }, {});
};
