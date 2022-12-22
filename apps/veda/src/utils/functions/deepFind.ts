export function deepFind<T extends Record<any, any>, R extends unknown = string>(data: T | T[], findKey: string, result: R[] = []) {
  if (Array.isArray(data)) {
    for (const arrayItem of data) {
      deepFind(arrayItem, findKey, result);
    }
  } else if (typeof data === 'object') {
    for (const key of Object.keys(data || {})) {
      if (key === findKey && data[findKey] !== '') {
        result.push(data[findKey]);
      } else {
        deepFind(data[key], findKey, result);
      }
    }
  }
  return result;
}
