import { atomic } from 'mota-css';
import { useEffect } from 'react';
import loadStyle from 'utils/functions/loadStyle';

atomic.find(JSON.stringify(window.motaCoreClassNames ?? '[]'));

export const useSetAtomicCss = () => {
  useEffect(() => {
    const id = atomic.on('success', css => {
      loadStyle({ id: 'atomic-css', content: css });
    });
    return () => {
      atomic.off(id);
    };
  }, []);
};
