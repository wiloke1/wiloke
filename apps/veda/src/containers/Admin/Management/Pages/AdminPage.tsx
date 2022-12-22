import AsyncComponent from 'components/AsyncComponent';
import DraftBox from 'components/DraftBox';
import FieldBox from 'components/FieldBox';
import { useEffect, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { AdminPageDatabase } from 'services/ResultService/atomTypes';
import { i18n } from 'translation';
import { getShopName, getUserInfo } from 'utils/functions/getUserInfo';
import { ActivityIndicator, GridSmart, View, ViewportTracking } from 'wiloke-react-core';
import { at } from 'utils/at';
import { MultiCollectionPicker, MultiProductPicker } from 'containers/Shopify/ModalMultiPicker';
import { MultiBlogPicker } from 'containers/Shopify/ModalMultiPicker/MultiBlogPicker';
import { useSettingsShopifyPicker } from 'containers/Shopify/ModalMultiPicker/slice';
import { RegularPageLiquidVariable } from 'types/Page';
import { useGetShopifyPageTemplate } from 'containers/Admin/PageBuilder/TemplatesPage/utils/useGetShopifyPageTemplate';
import PopConfirmAntd from 'components/ConfirmAntd';
import { useSocketForSyncShopify } from 'hooks/useSocket/useSocketForSyncShopify';
import { notification } from 'antd';
import { ModalPublishPage } from './ModalPublishPage';
import {
  useDeletePageAtom,
  useDisableShopifyPageAtom,
  useEnableShopifyPageAtom,
  useGetPagesAtom,
  useLoadMorePagesAtom,
} from './store/actions/actionPagesAtom';
import { useForkPageAtom } from './store/actions/actionPagesDraft';
import { pagesDraftSelector } from './store/reducers/slicePagesDraft';
import { pagesAtomSelector, useModalHotfixPage, useModalPublishPage } from './store/reducers/slicePagesAtom';
import * as styles from './styles';
import { ModalHotfixAtom } from './ModalHotfixAtom';

export const AdminPage = () => {
  const [currentPage, setCurrentPage] = useState<AdminPageDatabase | undefined>(undefined);

  const { data, hasNextPage, getStatus, loadMoreStatus, queueDeleting, queueHotfixing, queueDisabling, queueEnabling } = useSelector(
    pagesAtomSelector,
  );
  const { queueForking } = useSelector(pagesDraftSelector);
  const { shopName, role } = getUserInfo();

  const history = useHistory();
  const getPagesAtom = useGetPagesAtom();
  const loadmorePagesAtom = useLoadMorePagesAtom();
  const deletePageAtom = useDeletePageAtom();
  const forkPageAtom = useForkPageAtom();
  const enableShopifyPageAtom = useEnableShopifyPageAtom();
  const disableShopifyPageAtom = useDisableShopifyPageAtom();

  const setModalPublishPage = useModalPublishPage();
  const setModalHotfixPage = useModalHotfixPage();
  const changeSettingsShopify = useSettingsShopifyPicker();
  const { getShopifyPages, getShopifyPresentPage } = useGetShopifyPageTemplate();

  const { connect, disconnect, statusSocketConnection } = useSocketForSyncShopify();

  const handleCancel = () => {
    changeSettingsShopify({
      visibleProduct: false,
      slugsProduct: [],
      visibleCollection: false,
      slugsCollection: [],
      visibleBlog: false,
      slugBlog: [],
    });
    setCurrentPage(undefined);
  };

  const handleOk = () => {
    if (currentPage) {
      changeSettingsShopify({
        visibleProduct: false,
        slugsProduct: [],
        visibleCollection: false,
        slugsCollection: [],
        visibleBlog: false,
        slugBlog: [],
      });
      history.push(`/builder?shop=${shopName}&id=${currentPage.commandId}&entityVariant=Atom`, {
        headerFooterEnabled: currentPage.pageSettings ? currentPage.pageSettings.generalSettings.headerFooterEnabled : false,
        label: currentPage.label,
        type: currentPage.type,
        backToPage: '/manager-page',
        isCreate: false,
        entityVariant: 'Atom',
        shopifyRepresentPage: getShopifyPresentPage(currentPage.type),
        shopifyPages: getShopifyPages(currentPage.type),
      });
    }
  };

  const handlePreview = (page: AdminPageDatabase) => () => {
    if (page.type === 'article') {
      setCurrentPage(page);
      changeSettingsShopify({
        visibleBlog: true,
      });
    } else if (page.type === 'product') {
      setCurrentPage(page);
      changeSettingsShopify({
        visibleProduct: true,
      });
    } else if (page.type === 'collection') {
      setCurrentPage(page);
      changeSettingsShopify({
        visibleCollection: true,
      });
    } else {
      history.push(`/builder?shop=${shopName}&id=${page.commandId}&entityVariant=Atom`, {
        headerFooterEnabled: page.pageSettings ? page.pageSettings.generalSettings.headerFooterEnabled : false,
        label: page.label,
        type: page.type,
        backToPage: '/manager-page',
        isCreate: false,
        entityVariant: 'Atom',
        shopifyPages: page.type === 'page' ? [{ handle: page.label } as RegularPageLiquidVariable] : undefined,
        shopifyRepresentPage: page.type === 'page' ? ({ handle: page.label } as RegularPageLiquidVariable) : undefined,
      });
    }
  };

  const handlePreviewWithApplyAll = (page: AdminPageDatabase) => {
    history.push(`/builder?shop=${shopName}&id=${page.commandId}&entityVariant=Atom`, {
      headerFooterEnabled: page.pageSettings ? page.pageSettings.generalSettings.headerFooterEnabled : false,
      label: page.label,
      type: page.type,
      backToPage: '/manager-page',
      isCreate: false,
      entityVariant: 'Atom',
    });
  };

  const Actions = (item: typeof data[number]) => {
    const { commandId, label, type } = item;
    if (role === 'admin') {
      return (
        <View css={{ display: 'flex', padding: '0' }}>
          <View
            color="light"
            fontFamily="secondary"
            backgroundColor="linkedin"
            css={styles.rightItem}
            onClick={() => {
              connect({
                onSuccess: () => {
                  deletePageAtom.request({
                    commandId,
                    name: label,
                    type,
                    onlyShopify: true,
                    onFulfill: () => disconnect({}),
                  });
                },
                onError: () => {
                  notification.error({
                    message: i18n.t('publish_shopify.init_sync_error'),
                  });
                },
              });
            }}
          >
            {i18n.t('general.delete', { text: 'shopify' })}
          </View>
          <View
            color="light"
            fontFamily="secondary"
            backgroundColor="behance"
            css={styles.rightItem}
            onClick={() => {
              connect({
                onSuccess: () => {
                  enableShopifyPageAtom.request({
                    commandId,
                    data: item,
                    onFulfill: () => disconnect({}),
                  });
                },
                onError: () => {
                  notification.error({
                    message: i18n.t('publish_shopify.init_sync_error'),
                  });
                },
              });
            }}
          >
            {i18n.t('general.enable', { text: 'shopify' })}
          </View>

          <View
            color="light"
            fontFamily="secondary"
            backgroundColor="digg"
            css={styles.rightItem}
            onClick={() => {
              connect({
                onSuccess: () => {
                  disableShopifyPageAtom.request({
                    commandId,
                    data: item,
                    onFulfill: () => disconnect({}),
                  });
                },
                onError: () => {
                  notification.error({
                    message: i18n.t('publish_shopify.init_sync_error'),
                  });
                },
              });
            }}
          >
            {i18n.t('general.disable', { text: 'shopify' })}
          </View>

          <View
            color="light"
            fontFamily="secondary"
            backgroundColor="secondary"
            css={styles.rightItem}
            onClick={() => {
              setModalPublishPage(item);
            }}
          >
            {i18n.t('general.publish')}
          </View>

          <PopConfirmAntd
            title={`You want delete ${label}`}
            onConfirm={() => {
              connect({
                onSuccess: () => {
                  deletePageAtom.request({
                    commandId,
                    name: label,
                    type,
                    onlyShopify: false,
                    onFulfill: () => disconnect({}),
                  });
                },
                onError: () => {
                  notification.error({
                    message: i18n.t('publish_shopify.init_sync_error'),
                  });
                },
              });
            }}
          >
            <View color="light" fontFamily="secondary" backgroundColor="danger" css={styles.rightItem}>
              {i18n.t('general.delete')}
            </View>
          </PopConfirmAntd>

          <View
            color="light"
            fontFamily="secondary"
            backgroundColor="linkedin"
            css={styles.rightItem}
            onClick={() => {
              setModalHotfixPage(item);
            }}
          >
            {i18n.t('general.hotfix')}
          </View>

          <View
            color="light"
            fontFamily="secondary"
            backgroundColor="dark"
            css={styles.rightItem}
            onClick={() => {
              handlePreviewWithApplyAll(item);
            }}
          >
            {i18n.t('general.apply_all')}
          </View>
        </View>
      );
    }
    if (role === 'dev') {
      return (
        <View css={{ display: 'flex', padding: '0' }}>
          <View
            color="light"
            fontFamily="secondary"
            backgroundColor="primary"
            css={styles.rightItem}
            onClick={() => {
              forkPageAtom.request({
                commandId,
                callback: commandId => {
                  history.push(`/builder?shop=${getShopName()}&id=${commandId}&entityVariant=Draft`, {
                    entityVariant: 'Draft',
                    backToPage: '/manager-page',
                    label,
                    isCreate: false,
                  });
                },
              });
            }}
          >
            {i18n.t('general.fork')}
          </View>
        </View>
      );
    }
    return null;
  };

  const TrackingLoadmore = useMemo(() => {
    const cursor = at(data, -1)?.commandId;
    if (hasNextPage && cursor) {
      return (
        <ViewportTracking
          onEnterViewport={() => {
            if (loadMoreStatus !== 'loading') {
              loadmorePagesAtom.request({ cursor });
            }
          }}
        >
          <View css={{ display: 'flex', justifyContent: 'center', marginTop: '14px' }}>
            <ActivityIndicator size={40} />
          </View>
        </ViewportTracking>
      );
    }
    return null;
  }, [data, hasNextPage, loadMoreStatus, loadmorePagesAtom]);

  useEffect(() => {
    getPagesAtom.request(undefined);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <FieldBox radius={6} borderColor="gray2" css={{ padding: '20px 10px' }}>
      <AsyncComponent
        status={getStatus}
        isEmpty={data.length === 0}
        Success={
          <View>
            <GridSmart columnCount={1} columnWidth={300}>
              {data.map(item => (
                <DraftBox
                  cssContainer={{ marginBottom: '0px' }}
                  key={item.commandId}
                  title={item.label}
                  slug={`Page type ${item.type}`}
                  image={item.image.src}
                  CustomDropdown={<></>}
                  onClick={handlePreview(item)}
                  loading={
                    queueDeleting.includes(item.commandId) ||
                    queueForking.includes(item.commandId) ||
                    queueHotfixing.includes(item.commandId) ||
                    queueDisabling.includes(item.commandId) ||
                    queueEnabling.includes(item.commandId) ||
                    statusSocketConnection === 'loading'
                  }
                  Right={Actions(item)}
                />
              ))}
            </GridSmart>
            {TrackingLoadmore}
          </View>
        }
      />

      <ModalPublishPage />
      <ModalHotfixAtom />

      <MultiProductPicker onCancel={handleCancel} onOk={handleOk} />
      <MultiCollectionPicker onCancel={handleCancel} onOk={handleOk} />
      <MultiBlogPicker onCancel={handleCancel} onOk={handleOk} />
    </FieldBox>
  );
};
