import { useEffect } from 'react';
import { createGlobalState } from 'react-use';
import { pmParent } from 'utils/functions/postMessage';

const useDark = createGlobalState(false);

const useTemplateDark = () => {
  const [isDark, setIsDark] = useDark();

  useEffect(() => {
    const off = pmParent.on('@themeDark', isDark => {
      setIsDark(isDark);
    });
    return () => {
      off();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return isDark;
};

export default useTemplateDark;
