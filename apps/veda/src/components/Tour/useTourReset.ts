import { CLASSNAME, PREFIX, useGlobalIndexes, useGlobalIndexesActive, useGlobalOpen, useGlobalSkip } from './globalState';
import { Pathname } from './types';

export const useResetTour = () => {
  const [, setOpen] = useGlobalOpen();
  const [, setSkip] = useGlobalSkip();
  const [, setIndexes] = useGlobalIndexes();
  const [, setIndexesActive] = useGlobalIndexesActive();

  const handleReset = (pathname: Pathname) => {
    const el = document.querySelector(`.${CLASSNAME}`);
    const value = true;
    const index = 0;
    if (!el) {
      setSkip(false);
      setIndexes({} as any);
      setIndexesActive({});
      setOpen({ default: true });
      setOpen(open => {
        return Object.keys(open).reduce((obj, key) => {
          return {
            ...obj,
            [key]: false,
            [`${PREFIX}${index}(${pathname})`]: value,
          };
        }, {});
      });
    }
  };

  return handleReset;
};
