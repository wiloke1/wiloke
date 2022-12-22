import { useState, Dispatch, SetStateAction } from 'react';
import { useDeepCompareEffect } from 'react-use';
import storage from 'utils/functions/storage';

const NAME = '@StorageState';

const useStorageState = <S>(initialState: S | (() => S), storageName: string): [S, Dispatch<SetStateAction<S>>] => {
  const storeCache = storage.getItem(NAME);
  const stateCache = JSON.parse(storeCache ?? '{}')[storageName] as S | undefined;
  const [state, setState] = useState(stateCache ? stateCache : initialState);

  const _setState: Dispatch<SetStateAction<S>> = state => {
    setState(state);
  };

  useDeepCompareEffect(() => {
    const storeCache = JSON.parse(storage.getItem(NAME) ?? '{}') as Record<string, S>;
    storage.setItem(
      NAME,
      JSON.stringify({
        ...storeCache,
        [storageName]: state,
      }),
    );
  }, [state]);

  return [state, _setState];
};

export default useStorageState;
