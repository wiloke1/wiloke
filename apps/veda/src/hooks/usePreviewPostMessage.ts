import { previewLoadedSelector, useSetPreviewLoaded } from 'containers/BuilderPage/store/previewLoaded/slice';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useDeepCompareEffect } from 'react-use';
import { pageSectionsSelector, pagesSelector } from 'store/selectors';
import getPageInfo from 'utils/functions/getInfo';
import { pmPopup } from 'utils/functions/postMessage';

export const usePreviewPostMessage = () => {
  const setPreviewLoaded = useSetPreviewLoaded();
  const pages = useSelector(pagesSelector);
  const pageSections = useSelector(pageSectionsSelector);
  const previewLoaded = useSelector(previewLoadedSelector);
  const pageId = getPageInfo('id');

  useEffect(() => {
    const off = pmPopup.on('@previewLoaded', () => {
      setPreviewLoaded(true);
    });
    return () => {
      off();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useDeepCompareEffect(() => {
    // Phải bao gồm cả themeGeneralSettings bởi ta cần preview cả preloader...
    // Nếu themeGeneralSettings tách riêng ra để emit thì có thể khi bị load sau UI sẽ bị xấu
    // khi hiển thị preloader
    if (previewLoaded && pages.status[pageId] === 'success') {
      // @ts-ignore
      const { _persist, ...appState } = window.store.getState();

      pmPopup.emit('@animate');
      pmPopup.emit('@AppState', appState);
    }
  }, [pageSections, [previewLoaded, pages.status, pageId]]);
};
