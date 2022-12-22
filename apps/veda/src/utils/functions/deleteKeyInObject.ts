type Key = string | number;

/**
 * Delete the key in the object if it exists
 * @param {T} object - The object to delete the key from.
 * @param {Key} key - The key to delete.
 */
export function deleteKeyInObject<T extends Record<string, any>>(object: T, key: Key) {
  for (const k in object) {
    if (k === key) {
      delete object[k];
    }
  }
  return object;
}
