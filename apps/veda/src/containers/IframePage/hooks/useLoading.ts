import { useEffect, useState } from 'react';
import { useDeepCompareEffect } from 'react-use';
import { pagesSelector } from 'store/selectors';
import getPageInfo from 'utils/functions/getInfo';
import { pmChildren } from 'utils/functions/postMessage';
import { useIframeSelector } from './useIframeSelector';

const useLoading = (vendorsLoading: boolean, forPreview: boolean) => {
  const pages = useIframeSelector(pagesSelector);
  const [loading, setLoading] = useState(false);
  const pageId = getPageInfo('id');

  useDeepCompareEffect(() => {
    const loading = pages.status[pageId] === 'loading' || vendorsLoading;
    setLoading(loading);
  }, [pages, [vendorsLoading]]);

  useEffect(() => {
    // Nếu không phải là preview thì mới cho loading
    if (!forPreview) {
      pmChildren.emit('@iframeTwigLoading', loading);
    }
  }, [loading, forPreview]);
};

export default useLoading;
