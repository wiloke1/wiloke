import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useResetPreviewWithShopifyStatus } from 'store/global/socket/actions';
import { socketOfSyncShopifySelector } from 'store/selectors';
import { at } from 'utils/at';

export const ModalSyncShopifyForPreviewSuccess = () => {
  const { previewUrls, statusPreviewWithShopify } = useSelector(socketOfSyncShopifySelector);
  const resetPreviewWithShopifyStatus = useResetPreviewWithShopifyStatus();

  useEffect(() => {
    if (statusPreviewWithShopify === 'success') {
      resetPreviewWithShopifyStatus();
      const url = at(previewUrls, 0);
      if (url) {
        const $anchorEl = document.createElement('a');
        $anchorEl.target = '_blank';
        $anchorEl.href = url;
        $anchorEl.click();
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [statusPreviewWithShopify]);

  return null;
};
