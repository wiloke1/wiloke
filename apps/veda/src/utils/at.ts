type Result<T> = T extends any[] ? T[number] | undefined : undefined;

export const at = <T extends any[] | undefined | null>(array: T, index: number): Result<T> => {
  if (!Array.isArray(array)) {
    return undefined as Result<T>;
  }
  if (index < 0) {
    return array[array.length + index];
  }
  return array[index];
};
