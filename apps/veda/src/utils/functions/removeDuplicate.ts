export const removeDuplicate = <T extends any>(arr: T[]) => {
  return Array.from(new Set(arr));
};

export function removeDuplicateByKey<T>(objects: T[], uniqueKey: keyof T): T[] {
  const ids = objects.map(object => object[uniqueKey]);
  return objects.filter((object, index) => !ids.includes(object[uniqueKey], index + 1));
}
