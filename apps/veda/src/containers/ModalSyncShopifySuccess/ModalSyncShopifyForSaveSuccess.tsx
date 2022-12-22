import { CheckProgress } from 'components/CircleProgress';
import MyModal from 'components/MyModal';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useResetSyncToShopifyStatus } from 'store/global/socket/actions';
import { socketOfSyncShopifySelector } from 'store/selectors';
import { i18n } from 'translation';
import { at } from 'utils/at';
import { Text, View } from 'wiloke-react-core';

export const ModalSyncShopifyForSaveSuccess = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [message, setMessage] = useState<string | undefined>(undefined);
  const [previewUrlsState, setPreviewUrlsState] = useState<string[] | undefined | null>(undefined);
  const { previewUrls, statusSyncToShopify } = useSelector(socketOfSyncShopifySelector);
  const resetSyncToShopifyStatus = useResetSyncToShopifyStatus();

  const handleCancel = () => {
    setIsVisible(false);
    setMessage(undefined);
    setPreviewUrlsState(undefined);
  };

  const handleOk = () => {
    if (previewUrls) {
      window.open(at(previewUrls, 0));
    }
    handleCancel();
  };

  useEffect(() => {
    if (statusSyncToShopify === 'success') {
      setIsVisible(true);
      setPreviewUrlsState(previewUrls);
      resetSyncToShopifyStatus();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [statusSyncToShopify]);

  return (
    <MyModal
      isVisible={isVisible}
      headerText={i18n.t('publish_shopify.sync_success')}
      onCancel={handleCancel}
      onOk={handleOk}
      okText={i18n.t('publish_shopify.live_preview')}
      cancelText={i18n.t('publish_shopify.continue_editing')}
      depsHeightRecalculation={[statusSyncToShopify]}
    >
      <View css={{ padding: '12px 6px', textAlign: 'center' }}>
        <CheckProgress css={{ margin: '0 auto 12px auto' }} />
        <Text>{message}</Text>
        {previewUrlsState?.map(url => (
          <Text tagName="a" target="blank" href={url} key={url}>
            {url}
          </Text>
        ))}
      </View>
    </MyModal>
  );
};
