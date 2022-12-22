export const getStrTemplate = <T extends Record<string, any> = Record<string, any>>(str: string, data: T) => {
  const regex = /{{(.*?)}}/g;
  return str.replace(regex, (_, key) => {
    return data[key.trim()];
  });
};
