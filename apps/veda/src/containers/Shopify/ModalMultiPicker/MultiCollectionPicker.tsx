import Active from 'components/Active';
import AsyncComponent from 'components/AsyncComponent';
import MyModal from 'components/MyModal';
import ProductCard from 'components/ProductCard';
import ScrollBars from 'components/ScrollBars';
import TextInput from 'components/TextInput';
import withDebounce from 'hocs/withDebounce';
import { FC, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useChangeCollectionKey, useGetCollections, useLoadMoreCollections } from 'store/actions/shopify';
import { defaultCollectionDataState } from 'store/reducers/shopify/reducerCollection';
import { shopifySelector } from 'store/selectors';
import { i18n } from 'translation';
import { CollectionApiData } from 'types/Collections';
import { ActivityIndicator, GridSmart, View, ViewportTracking } from 'wiloke-react-core';
import { useSettingsShopifyPicker } from './slice';

const DebounceInput = withDebounce(TextInput, 'value', 'onValueChange', 300);

interface MultiCollectionPickerProps {
  onOk?: () => void;
  onCancel?: () => void;
}

export const MultiCollectionPicker: FC<MultiCollectionPickerProps> = ({ onOk, onCancel }) => {
  const { collections, searchKey } = useSelector(shopifySelector.collections);
  const { visibleCollection, slugsCollection } = useSelector(shopifySelector.multiShopifyPicker);
  const { data, requestStatus, hasNextPage, loadMoreStatus } = collections[searchKey] || defaultCollectionDataState;

  const changeKey = useChangeCollectionKey();
  const changeSettingsShopify = useSettingsShopifyPicker();
  const getCollections = useGetCollections();
  const loadMoreCollections = useLoadMoreCollections();

  useEffect(() => {
    if (visibleCollection) {
      getCollections.request({ search: searchKey });
      changeSettingsShopify({
        slugsCollection: slugsCollection.filter(item => item.handle !== 'all'),
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visibleCollection, searchKey]);

  const _handleSelectPage = (handle: string, id: number, featuredImage?: string) => (isSelect: boolean) => {
    if (isSelect) {
      changeSettingsShopify({
        slugsCollection: [...slugsCollection, { itemId: id, handle, featuredImg: featuredImage }],
      });
    } else {
      changeSettingsShopify({
        slugsCollection: slugsCollection.filter(item => item.handle !== handle),
      });
    }
  };

  const _handleSearch = (val: string) => {
    changeKey(val);
  };

  const renderLoadMore = () => {
    if (hasNextPage || loadMoreStatus === 'loading') {
      return (
        <ViewportTracking
          offsetBottom={0}
          onEnterViewport={() => {
            if (requestStatus === 'success') {
              loadMoreCollections.request({ search: searchKey });
            }
          }}
        >
          <View css={{ padding: '20px', display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%' }}>
            <ActivityIndicator />
          </View>
        </ViewportTracking>
      );
    }
  };

  const _renderRowItem = (item: CollectionApiData) => {
    const { id, title, handle, image } = item;
    const _stateHandles = slugsCollection.map(state => state.handle);

    return (
      <Active
        disabledMulti
        onActive={_handleSelectPage(handle, Number(id), image?.src)}
        variant="style2"
        active={_stateHandles.includes(handle)}
        key={id}
      >
        <ProductCard imageAspectRatio={16 / 9} imageSrc={image?.src || ''} title={title} />
      </Active>
    );
  };

  const _renderCollections = () => {
    return (
      <ScrollBars css={{ height: 'calc(100% - 40px) !important' }}>
        <View css={{ padding: '10px', height: '100%' }}>
          <GridSmart columnWidth={200} columnGap={10}>
            {data.map(_renderRowItem)}
          </GridSmart>
          {renderLoadMore()}
        </View>
      </ScrollBars>
    );
  };

  const handleClose = () => {
    if (!!onCancel) {
      onCancel?.();
    } else {
      changeSettingsShopify({
        visibleCollection: false,
      });
    }
  };

  const handleOk = () => {
    if (!!onOk) {
      onOk?.();
    } else {
      changeSettingsShopify({
        visibleCollection: false,
      });
    }
  };

  return (
    <MyModal
      headerText={i18n.t('adminDashboard.collection')}
      bodyCss={{
        height: '80%',
      }}
      isVisible={visibleCollection}
      depsHeightRecalculation={requestStatus}
      cancelText={i18n.t('general.remove')}
      okText={i18n.t('general.accept')}
      scrollDisabled
      onCancel={handleClose}
      onOk={handleOk}
      size="large"
    >
      <DebounceInput
        block
        sizeInput="medium"
        placeholder={`${i18n.t('builderPage.search', { text: i18n.t('adminDashboard.collection') })}...`}
        css={{ marginBottom: '8px' }}
        value={searchKey}
        onValueChange={_handleSearch}
      />

      <AsyncComponent status={requestStatus} isEmpty={data.length === 0} Success={_renderCollections()} />
    </MyModal>
  );
};
