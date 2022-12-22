export const toString = (arg: any) => {
  if (arg instanceof Error) {
    return arg.message;
  }
  try {
    return JSON.stringify(arg);
  } catch {
    return arg.toString ? arg.toString() : arg + '';
  }
};
