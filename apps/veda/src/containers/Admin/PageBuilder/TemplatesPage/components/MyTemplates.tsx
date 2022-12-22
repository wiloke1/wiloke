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
import { isEmpty } from 'ramda';
import { useEffect, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { BE_PageProduct } from 'services/PageService/VedaApplication/types';
import { pageBuilderSelector } from 'store/selectors';
import { ActivityIndicator, GridSmart, View, ViewportTracking } from 'wiloke-react-core';
import { useDeleteFavoritePage, useGetMyTemplates, useLoadMoreMyPageTemplates } from '../reducers/slice';

export const MyTemplates = () => {
  const {
    myTemplates: { data, getStatus, loadMoreStatus, hasNextPage, deleteStatus, searchKey },
    tabKey,
  } = useSelector(pageBuilderSelector.templates);

  const { createNormalPage, createArticle, createCollection, createProduct } = useSelector(modalsSelector);

  const getMyTemplates = useGetMyTemplates();
  const loadMoreTemplates = useLoadMoreMyPageTemplates();
  const deleteFavoritePage = useDeleteFavoritePage();
  const changeModalAdminSettings = useChangeModalAdminSettings();

  const [currentPage, setCurrentPage] = useState<BE_PageProduct | undefined>(undefined);

  useEffect(() => {
    if (tabKey === 'my-template') {
      getMyTemplates.request({ limit: 20, searchKey });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tabKey, searchKey]);

  const openModal = (page: BE_PageProduct) => () => {
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
              loadMoreTemplates.request({ tabKey, searchKey });
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
  }, [getStatus, hasNextPage, loadMoreStatus, loadMoreTemplates, searchKey, tabKey]);

  const renderSuccess = () => {
    return (
      <View>
        <GridSmart columnWidth={250} columnGap={20} columnCount={5}>
          {data.map(page => {
            const { label, image, type, saved, commandId } = page;
            return (
              <ImageTextCard.Style2
                disabledIconSave
                key={commandId}
                label={type || label}
                description={type ? label : ''}
                src={image ? image.src : ''}
                widthImage={image ? image.width : 0}
                heightImage={image ? image.height : 0}
                saved={saved}
                onAdd={openModal(page)}
                loading={deleteStatus[commandId] === 'loading'}
                onDelete={() => {
                  deleteFavoritePage.request({ commandId });
                }}
              />
            );
          })}
        </GridSmart>
        {TrackingLoadMore}
      </View>
    );
  };

  return (
    <View>
      <AsyncComponent status={getStatus} Request={renderLoading} isEmpty={isEmpty(data)} Success={renderSuccess()} />

      {currentPage && createNormalPage && (
        <ModalCreateNormalPage forceActiveDrawer={true} pageInput={currentPage as any} pageType={currentPage.type} />
      )}

      {currentPage && currentPage.type === 'article' && createArticle && (
        <ModalCreateArticle forceActiveDrawer={true} pageInput={currentPage as any} />
      )}
      {currentPage && currentPage.type === 'collection' && createCollection && (
        <ModalCreateCollection forceActiveDrawer={true} pageInput={currentPage as any} />
      )}
      {currentPage && currentPage.type === 'product' && createProduct && (
        <ModalCreateProduct forceActiveDrawer={true} pageInput={currentPage as any} />
      )}
    </View>
  );
};
