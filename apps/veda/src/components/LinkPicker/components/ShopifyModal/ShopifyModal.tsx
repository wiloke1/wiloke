import { ShopifyType } from 'components/LinkPicker/types';
import { useShopifyModal } from 'components/LinkPicker/utils/globaState';
import MyModal from 'components/MyModal';
import SimpleTabs from 'components/SimpleTabs';
import { ReactNode } from 'react';
import { i18n } from 'translation';
import { View } from 'wiloke-react-core';
import { Articles } from './Articles';
import { Blogs } from './Blogs';
import { Collections } from './Collections';
import { tabLinkPicker } from './data';
import { Page } from './Pages';
import { Products } from './Products';

export const ShopifyModal = () => {
  const [visible, setVisible] = useShopifyModal();

  const _closeModal = () => {
    setVisible(false);
  };

  const _mappingContent: Record<ShopifyType, ReactNode> = {
    pages: <Page />,
    articles: <Articles />,
    blogs: <Blogs />,
    collections: <Collections />,
    products: <Products />,
  };

  return (
    <MyModal
      bodyCss={{ minWidth: '600px', height: '50vh' }}
      headerText={i18n.t('builderPage.link_shopify')}
      onCancel={_closeModal}
      contentCss={{ height: '100%', padding: 0 }}
      okText=""
      cancelText=""
      onOk={_closeModal}
      isVisible={visible}
      scrollDisabled
    >
      <SimpleTabs
        defaultValue="pages"
        containerCss={{ height: '100%', padding: '0 10px' }}
        data={tabLinkPicker}
        tabItemCss={() => ({ fontSize: '13px' })}
      >
        {value => <View css={{ height: '100%' }}>{_mappingContent[value]}</View>}
      </SimpleTabs>
    </MyModal>
  );
};
