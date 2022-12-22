import { notification } from 'antd';
import AsyncComponent from 'components/AsyncComponent';
import PopConfirmAntd from 'components/ConfirmAntd';
import DraftBox from 'components/DraftBox';
import FieldBox from 'components/FieldBox';
import { useGetShopifyPageTemplate } from 'containers/Admin/PageBuilder/TemplatesPage/utils/useGetShopifyPageTemplate';
import { MultiCollectionPicker, MultiProductPicker } from 'containers/Shopify/ModalMultiPicker';
import { MultiBlogPicker } from 'containers/Shopify/ModalMultiPicker/MultiBlogPicker';
import { useSettingsShopifyPicker } from 'containers/Shopify/ModalMultiPicker/slice';
import { useSocketForSyncShopify } from 'hooks/useSocket/useSocketForSyncShopify';
import { useEffect, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { DevPageDatabase } from 'services/ResultService/atomTypes';
import { i18n } from 'translation';
import { RegularPageLiquidVariable } from 'types/Page';
import { at } from 'utils/at';
import { getUserInfo } from 'utils/functions/getUserInfo';
import { ActivityIndicator, GridSmart, View, ViewportTracking } from 'wiloke-react-core';
import { ModalCommitDraft } from './ModalCommitDraft';
import { ModalRejectDraft } from './ModalRejectDraft';
import {
  useApprovePageDraft,
  useDeletePageDraft,
  useDisableShopifyPageDraft,
  useEnableShopifyPageDraft,
  useGetPagesDraft,
  useLoadMorePagesDraft,
} from './store/actions/actionPagesDraft';
import { pagesDraftSelector, useSetModalCommitDraft, useSetModalRejectDraft } from './store/reducers/slicePagesDraft';
import * as styles from './styles';

export const DraftPage = () => {
  const [currentPage, setCurrentPage] = useState<DevPageDatabase | undefined>(undefined);

  const {
    data,
    hasNextPage,
    loadMoreStatus,
    getStatus,
    queueApproving,
    queueDeleting,
    queueRejecting,
    queueCommiting,
    queueDisabling,
    queueEnabling,
  } = useSelector(pagesDraftSelector);
  const { shopName, role } = getUserInfo();

  const history = useHistory();
  const getPagesDraft = useGetPagesDraft();
  const loadmorePagesDraft = useLoadMorePagesDraft();
  const approvePageDraft = useApprovePageDraft();
  const deletePageDraft = useDeletePageDraft();
  const enableShopifyPageDraft = useEnableShopifyPageDraft();
  const disableShopifyPageDraft = useDisableShopifyPageDraft();

  const setModalComitDraft = useSetModalCommitDraft();
  const setModalRejectDraft = useSetModalRejectDraft();
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
      history.push(`/builder?shop=${shopName}&id=${currentPage.commandId}&entityVariant=Draft`, {
        headerFooterEnabled: currentPage.pageSettings ? currentPage.pageSettings.generalSettings.headerFooterEnabled : false,
        label: currentPage.label,
        type: currentPage.type,
        backToPage: '/manager-page',
        isCreate: false,
        entityVariant: 'Draft',
        shopifyRepresentPage: getShopifyPresentPage(currentPage.type),
        shopifyPages: getShopifyPages(currentPage.type),
      });
    }
  };

  const handlePreview = (page: DevPageDatabase) => () => {
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
      history.push(`/builder?shop=${shopName}&id=${page.commandId}&entityVariant=Draft`, {
        headerFooterEnabled: page.pageSettings ? page.pageSettings.generalSettings.headerFooterEnabled : false,
        label: page.label,
        type: page.type,
        backToPage: '/manager-page',
        isCreate: false,
        entityVariant: 'Draft',
        shopifyPages: page.type === 'page' ? [{ handle: page.label } as RegularPageLiquidVariable] : undefined,
        shopifyRepresentPage: page.type === 'page' ? ({ handle: page.label } as RegularPageLiquidVariable) : undefined,
      });
    }
  };

  const handlePreviewWithApplyAll = (page: DevPageDatabase) => {
    history.push(`/builder?shop=${shopName}&id=${page.commandId}&entityVariant=Draft`, {
      headerFooterEnabled: page.pageSettings ? page.pageSettings.generalSettings.headerFooterEnabled : false,
      label: page.label,
      type: page.type,
      backToPage: '/manager-page',
      isCreate: false,
      entityVariant: 'Draft',
    });
  };

  const Actions = (item: typeof data[number]) => {
    const { commandId, status, label, type } = item;

    if (role === 'admin') {
      return (
        <View css={{ display: 'flex', padding: '0' }}>
          <View
            color="light"
            backgroundColor="secondary"
            css={styles.rightItem}
            fontFamily="secondary"
            onClick={() => {
              approvePageDraft.request({ commandId });
            }}
          >
            {i18n.t('general.approve')}
          </View>

          <View
            color="light"
            fontFamily="secondary"
            backgroundColor="danger"
            css={styles.rightItem}
            onClick={() => {
              setModalRejectDraft(item);
            }}
          >
            {i18n.t('general.reject')}
          </View>
        </View>
      );
    }

    if (role === 'dev') {
      return (
        <View css={{ display: 'flex', padding: '0' }}>
          <PopConfirmAntd
            title={`You want delete "${label}"?`}
            onConfirm={() => {
              connect({
                onSuccess: () => {
                  deletePageDraft.request({
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
            backgroundColor="success"
            css={styles.rightItem}
            onClick={() => {
              setModalComitDraft(item);
            }}
          >
            {status === 'pending' ? i18n.t('general.recommit') : i18n.t('general.commit')}
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
              loadmorePagesDraft.request({ cursor });
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
  }, [data, hasNextPage, loadMoreStatus, loadmorePagesDraft]);

  useEffect(() => {
    getPagesDraft.request(undefined);
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
                  key={item.commandId}
                  title={item.label}
                  slug={`Page type: ${item.type}`}
                  image={item.image.src}
                  CustomDropdown={<></>}
                  cssContainer={{ padding: '15px 20px', marginBottom: '0' }}
                  onClick={handlePreview(item)}
                  loading={
                    queueApproving.includes(item.commandId) ||
                    queueDeleting.includes(item.commandId) ||
                    queueRejecting.includes(item.commandId) ||
                    queueCommiting.includes(item.commandId) ||
                    queueDisabling.includes(item.commandId) ||
                    queueEnabling.includes(item.commandId) ||
                    statusSocketConnection === 'loading'
                  }
                  Right={
                    <>
                      {Actions(item)}
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
                      <View
                        color="light"
                        fontFamily="secondary"
                        backgroundColor="behance"
                        css={styles.rightItem}
                        onClick={() => {
                          connect({
                            onSuccess: () => {
                              enableShopifyPageDraft.request({
                                commandId: item.commandId,
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
                              disableShopifyPageDraft.request({
                                commandId: item.commandId,
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
                      </View>{' '}
                      <View
                        color="light"
                        fontFamily="secondary"
                        backgroundColor="linkedin"
                        css={styles.rightItem}
                        onClick={() => {
                          connect({
                            onSuccess: () => {
                              deletePageDraft.request({
                                commandId: item.commandId,
                                name: item.label,
                                type: item.type,
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
                    </>
                  }
                />
              ))}
            </GridSmart>
            {TrackingLoadmore}
            <ModalCommitDraft />
            <ModalRejectDraft />

            <MultiProductPicker onCancel={handleCancel} onOk={handleOk} />
            <MultiCollectionPicker onCancel={handleCancel} onOk={handleOk} />
            <MultiBlogPicker onCancel={handleCancel} onOk={handleOk} />
          </View>
        }
      />
    </FieldBox>
  );
};
