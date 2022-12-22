import { message, notification } from 'antd';
import AsyncComponent from 'components/AsyncComponent';
import ImageTextCard from 'components/ImageTextCard';

import {
  ModalCreateArticle,
  ModalCreateCollection,
  ModalCreateNormalPage,
  ModalCreateProduct,
  useChangeModalAdminSettings,
} from 'containers/Admin/Modals';
import { modalsSelector } from 'containers/Admin/selector';
import { AdminPageData } from 'containers/Admin/types';
import { useSocketForSyncShopify } from 'hooks/useSocket/useSocketForSyncShopify';
import { isEmpty } from 'ramda';
import { useEffect, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { authSelector, pageBuilderSelector } from 'store/selectors';
import { i18n } from 'translation';
import { ActivityIndicator, GridSmart, View, ViewportTracking } from 'wiloke-react-core';
import { useDeleteTemplatePage, useGetTemplatesPage, useLoadMoreTemplatePage, useSaveToMyTemplate } from '../reducers/slice';

export const AllTemplates = () => {
  const {
    tabKey,
    allTemplates: { data: dataState, getStatus, hasNextPage, loadMoreStatus, saveStatus, deleteStatus, searchKey },
    selectPageType,
  } = useSelector(pageBuilderSelector.templates);
  const { role, id: userId } = useSelector(authSelector);
  const { createNormalPage, createArticle, createCollection, createProduct } = useSelector(modalsSelector);

  const getTemplates = useGetTemplatesPage();
  const loadMoreTemplates = useLoadMoreTemplatePage();
  const savePage = useSaveToMyTemplate();
  const deleteTemplatePage = useDeleteTemplatePage();
  const changeModalAdminSettings = useChangeModalAdminSettings();
  const { connect, disconnect, statusSocketConnection } = useSocketForSyncShopify();

  const [currentPage, setCurrentPage] = useState<AdminPageData | undefined>(undefined);

  useEffect(() => {
    if (tabKey === 'all') {
      getTemplates.request({ tabKey, limit: 20, pageType: selectPageType, label: searchKey });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tabKey, selectPageType, searchKey]);

  const openModal = (page: AdminPageData) => () => {
    setCurrentPage(page);
    if (page.type === 'article') {
      changeModalAdminSettings({ createArticle: true });
    } else if (page.type === 'product') {
      changeModalAdminSettings({ createProduct: true });
    } else if (page.type === 'collection') {
      changeModalAdminSettings({ createCollection: true });
    } else {
      changeModalAdminSettings({ createNormalPage: true });
    }
  };

  const handleDeletePage = (page: AdminPageData) => () => {
    if (userId === page.userId) {
      connect({
        onSuccess: () => {
          deleteTemplatePage.request({
            commandId: page.commandId,
            pageType: page.type,
            onFulfill: () => disconnect({}),
          });
        },
        onError: () => {
          notification.error({
            message: i18n.t('publish_shopify.init_sync_error'),
          });
        },
      });
    } else {
      message.warning({
        content: i18n.t('general.not_have_permission'),
      });
    }
  };

  const renderLoading = (
    <GridSmart columnWidth={250} columnGap={20} columnCount={5}>
      {[0, 1, 2, 3].map(item => (
        <ImageTextCard.Loading key={item} height={350} />
      ))}
    </GridSmart>
  );

  const TrackingLoadMore = useMemo(() => {
    if (hasNextPage) {
      return (
        <ViewportTracking
          offsetBottom={0}
          onEnterViewport={() => {
            if (getStatus === 'success' && loadMoreStatus !== 'loading') {
              loadMoreTemplates.request({ tabKey, pageType: selectPageType });
            }
          }}
        >
          <View css={{ padding: '20px', display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%' }}>
            <ActivityIndicator />
          </View>
        </ViewportTracking>
      );
    }
    return null;
  }, [getStatus, hasNextPage, loadMoreStatus, loadMoreTemplates, selectPageType, tabKey]);

  const renderSuccess = () => {
    return (
      <View>
        <GridSmart columnWidth={250} columnGap={20} columnCount={5}>
          {dataState.map(page => {
            const { label, image, commandId, type, category, parentCommandId } = page;
            return (
              <ImageTextCard.Style2
                key={commandId}
                label={type || ''}
                description={label}
                src={image ? image.src : ''}
                widthImage={image ? image.width : 0}
                heightImage={image ? image.height : 0}
                loadingAdd={
                  saveStatus[parentCommandId] === 'loading' || deleteStatus[commandId] === 'loading' || statusSocketConnection === 'loading'
                }
                onSave={() => {
                  savePage.request({
                    categories: category?.name ? [category.name] : ([] as string[]),
                    parentCommandId,
                    name: label,
                    image: image ?? { src: '', height: 0, width: 0 },
                    pageType: type,
                  });
                }}
                onAdd={openModal((page as unknown) as AdminPageData)}
                onDelete={role === 'admin' ? handleDeletePage((page as unknown) as AdminPageData) : undefined}
              />
            );
          })}
        </GridSmart>
        {TrackingLoadMore}
      </View>
    );
  };

  const handleCancel = () => {
    setCurrentPage(undefined);
  };

  return (
    <View>
      <AsyncComponent status={getStatus} Request={renderLoading} isEmpty={isEmpty(dataState)} Success={renderSuccess()} />

      {currentPage && createNormalPage && (
        <ModalCreateNormalPage forceActiveDrawer={true} pageInput={currentPage as any} pageType={currentPage.type} onCancel={handleCancel} />
      )}
      {currentPage && currentPage.type === 'article' && createArticle && (
        <ModalCreateArticle forceActiveDrawer={true} pageInput={currentPage as any} onCancel={handleCancel} />
      )}
      {currentPage && currentPage.type === 'collection' && createCollection && (
        <ModalCreateCollection forceActiveDrawer={true} pageInput={currentPage as any} onCancel={handleCancel} />
      )}
      {currentPage && currentPage.type === 'product' && createProduct && (
        <ModalCreateProduct forceActiveDrawer={true} pageInput={currentPage as any} onCancel={handleCancel} />
      )}
    </View>
  );
};
