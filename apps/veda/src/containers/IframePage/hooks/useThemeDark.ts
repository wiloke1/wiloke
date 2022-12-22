import { useEffect, useRef } from 'react';
import { pmChildren } from 'utils/functions/postMessage';
import { isPreviewPage } from 'utils/isPreviewPage';

const htmlElement = document.querySelector('html') as HTMLHtmlElement;

const useThemeDark = () => {
  const observer = useRef<MutationObserver>();

  const handleMutationObserver = () => {
    if (!isPreviewPage()) {
      const isDark = htmlElement.className.includes('dark');
      pmChildren.emit('@themeDark', isDark);
    }
  };

  useEffect(() => {
    observer.current = new MutationObserver(handleMutationObserver);
    observer.current.observe(htmlElement, { attributes: true });
    return () => {
      observer.current?.disconnect?.();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
};

export default useThemeDark;
