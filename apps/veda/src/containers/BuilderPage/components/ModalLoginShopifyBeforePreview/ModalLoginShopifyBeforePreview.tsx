import { notification } from 'antd';
import MyModal from 'components/MyModal';
import { useSocketForSyncShopify } from 'hooks/useSocket/useSocketForSyncShopify';
import { useEffect, useState } from 'react';
import { usePreviewWithShopify } from 'store/global/socket/actions';
import { i18n } from 'translation';
import getPageInfo from 'utils/functions/getInfo';
import storage from 'utils/functions/storage';
import { View } from 'wiloke-react-core';
import useResultForPreview from '../TopBar/useResultForPreview';

const STORAGE_KEY = 'isExecutedShopifyLogin';
export const ModalLoginShopifyBeforePreview = () => {
  const [isVisible, setVisible] = useState(false);
  const { getResult: getResultForPreview } = useResultForPreview();
  const previewWithShopify = usePreviewWithShopify();
  const { connect, disconnect, statusSocketConnection } = useSocketForSyncShopify();

  const handlePreview = () => {
    connect({
      onSuccess: async () => {
        setVisible(false);
        const result = await getResultForPreview('throw');
        previewWithShopify.request({
          result,
          onSyncFulfill: () => disconnect({}),
        });
      },
      onError: () => {
        setVisible(false);
        notification.error({ message: i18n.t('publish_shopify.init_sync_error') });
      },
    });
  };

  useEffect(() => {
    ModalLoginShopifyBeforePreview.open = () => {
      setVisible(true);
    };
    return () => {
      ModalLoginShopifyBeforePreview.open = () => {};
    };
  }, []);

  useEffect(() => {
    if (isVisible) {
      ModalLoginShopifyBeforePreview.isExecuted = true;
      storage.setItem(STORAGE_KEY, 'true');
    }
  }, [isVisible]);

  return (
    <MyModal
      headerText={i18n.t('builderPage.modal_login_shopify.headerText')}
      isLoading={statusSocketConnection === 'loading'}
      onOk={handlePreview}
      onCancel={() => setVisible(false)}
      isVisible={isVisible}
      cancelText=""
      okText={i18n.t('builderPage.modal_login_shopify.okText')}
    >
      <View tagName="a" href={getPageInfo('shop')} target="blank">
        {i18n.t('builderPage.modal_login_shopify.description')}
      </View>
    </MyModal>
  );
};

ModalLoginShopifyBeforePreview.open = () => {};
ModalLoginShopifyBeforePreview.isExecuted = Boolean(JSON.parse(storage.getItem(STORAGE_KEY) ?? 'false'));
