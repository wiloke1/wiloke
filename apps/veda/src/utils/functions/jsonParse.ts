export function jsonParse<T extends any = any>(value: string): T {
  try {
    const fn = new Function(`return ${value.trim()}`);
    const obj = fn();
    return JSON.parse(JSON.stringify(obj));
  } catch {
    return {} as T;
  }
}
