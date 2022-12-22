import storage from 'utils/functions/storage';

const LOCAL_STORAGE_KEY = 'veda-cache-control';

export const renewVersion = () => {
  const version = Date.now();
  storage.setItem(LOCAL_STORAGE_KEY, version.toString());
  return storage.getItem(LOCAL_STORAGE_KEY);
};

export const getCurrentVersion = () => {
  return storage.getItem(LOCAL_STORAGE_KEY);
};
