let checked = false;
const storageAvailable = () => {
  if (!checked) {
    checked = true;
    const item = '@localStorageCheck';
    try {
      window.localStorage.setItem(item, item);
      window.localStorage.removeItem(item);
      return true;
    } catch {
      return false;
    }
  }
};
const createStorage = (): Storage => {
  if (storageAvailable()) {
    return window.localStorage;
  } else {
    return {
      getItem() {
        return null;
      },
      setItem() {},
      removeItem() {},
      clear() {},
      key() {
        return null;
      },
      length: 0,
    };
  }
};

const storage = createStorage();

export default storage;
