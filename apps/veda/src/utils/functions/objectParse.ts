export function objectParse(value: string) {
  const fn = new Function(`return ${value.trim()}`);
  const obj = fn();
  return JSON.parse(JSON.stringify(obj));
}
