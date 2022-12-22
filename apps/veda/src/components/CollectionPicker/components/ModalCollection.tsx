import AsyncComponent from 'components/AsyncComponent';
import Button from 'components/Button';
import { useChooseCollection } from 'components/CollectionPicker/store/context/CollectionContext';
import PageCard from 'components/PageCard';
import TextInput from 'components/TextInput';
import VirtualList from 'components/VirtualList/VirtualList';
import withDebounce from 'hocs/withDebounce';
import { isEmpty, range } from 'ramda';
import { FC, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useChangeCollectionKey, useGetCollections, useLoadMoreCollections } from 'store/actions/shopify/actionCollections';
import { defaultCollectionDataState } from 'store/reducers/shopify/reducerCollection';
import { liquidVariablesSelector, shopifySelector } from 'store/selectors';
import { i18n } from 'translation';
import { CollectionApiData } from 'types/Collections';
import { getUserInfo } from 'utils/functions/getUserInfo';
import { ActivityIndicator, FontAwesome, View, ViewportTracking } from 'wiloke-react-core';
import * as styles from './styles';

const DebounceInput = withDebounce(TextInput, 'value', 'onValueChange', 300);

const ROW_HEIGHT = 57;
const NUMBER_OF_COLUMNS = 1;

export const ModalCollection: FC<{ onClick?: () => void }> = ({ onClick }) => {
  const { collection, dispatch } = useChooseCollection();
  const { searchKey, collections } = useSelector(shopifySelector.collections);
  const { collectionIdsLoading, collectionIdsFailed, collectionIdsLoaded } = useSelector(liquidVariablesSelector);
  const { data: _collections, requestStatus, hasNextPage, loadMoreStatus } = collections[searchKey] || defaultCollectionDataState;
  const { shopName } = getUserInfo();

  const changeSearchKey = useChangeCollectionKey();
  const getCollections = useGetCollections();
  const loadMoreCollection = useLoadMoreCollections();

  useEffect(() => {
    getCollections.request({ search: searchKey });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchKey]);

  const _handleChangeKey = (value: string) => {
    changeSearchKey(value);
  };

  const handleRefresh = () => {
    getCollections.request({ search: searchKey, refresh: true });
  };

  const chooseCollection = (item: CollectionApiData) => () => {
    const isLoading = collectionIdsLoading.length > 0;
    if (isLoading) {
      return;
    } else {
      dispatch({
        type: '@SetInitialCollection',
        payload: {
          data: {
            itemId: Number(item.id),
            handle: item.handle,
            featuredImg: item.image?.src,
          },
        },
      });

      onClick?.();
    }
  };

  const renderLoading = () => {
    return (
      <View css={{ padding: '10px' }}>
        {range(1, Math.floor(Math.random() * 12) + 1).map(num => (
          <PageCard.Loading key={num} />
        ))}
      </View>
    );
  };

  const _renderSuccess = () => {
    const rowCount = Math.ceil(_collections.length / NUMBER_OF_COLUMNS) + (hasNextPage ? NUMBER_OF_COLUMNS : 1);

    return (
      <View css={{ height: '100%', padding: '5px 10px 10px 10px' }}>
        <VirtualList
          rowHeight={ROW_HEIGHT}
          rowCount={rowCount}
          containerCss={{ height: 'calc(100% - 42px)' }}
          rowRender={index => {
            const dataSlice = _collections.slice(index * NUMBER_OF_COLUMNS, index * NUMBER_OF_COLUMNS + NUMBER_OF_COLUMNS);
            const rowItem = dataSlice.length ? dataSlice : hasNextPage ? Array(NUMBER_OF_COLUMNS).fill(undefined) : [];

            return rowItem.map((item, index) => {
              if (loadMoreStatus === 'failure' && typeof item === 'undefined' && index % NUMBER_OF_COLUMNS === 0) {
                return (
                  <Button
                    key={index}
                    onClick={() => {
                      getCollections.request({ search: searchKey });
                    }}
                    radius={8}
                    size="large"
                    block
                    css={{ width: '100%' }}
                  >
                    {i18n.t('builderPage.retry')}
                  </Button>
                );
              }
              if (typeof item === 'undefined' && loadMoreStatus !== 'failure') {
                return (
                  <ViewportTracking
                    key={index}
                    offsetTop={-200}
                    onEnterViewport={() => {
                      if (loadMoreStatus !== 'loading' && hasNextPage) {
                        loadMoreCollection.request({ search: searchKey });
                      }
                    }}
                  >
                    {renderLoading()}
                  </ViewportTracking>
                );
              }
              if (item) {
                return (
                  <PageCard.Style3
                    borderColor="gray3"
                    key={item.id}
                    loading={collectionIdsLoading.includes(Number(item.id))}
                    isActive={collection?.handle === item.handle && collectionIdsLoaded.includes(Number(item.id))}
                    isFailed={collectionIdsFailed.includes(Number(item.id))}
                    image={item.image?.src}
                    title={item.title}
                    onClick={chooseCollection(item)}
                    css={{ marginBottom: '5px' }}
                  />
                );
              }
              return null;
            });
          }}
        />
      </View>
    );
  };

  const renderSelected = () => {
    if (collection) {
      if (collectionIdsLoading.includes(collection.itemId)) {
        return <PageCard.Style3 css={{ cursor: 'auto' }} borderColor="gray3" title={`${i18n.t('builderPage.data_request.loading')}...`} />;
      }
      if (collectionIdsLoaded.includes(collection.itemId)) {
        const _collection = _collections.find(item => item.handle === collection.handle);
        return (
          <PageCard.Style3
            css={{ cursor: 'auto' }}
            image={collection.featuredImg}
            borderColor="gray3"
            title={_collection?.title ?? collection.handle}
          />
        );
      }
      if (collectionIdsFailed.includes(collection.itemId)) {
        return (
          <PageCard.Style3
            css={{ cursor: 'auto' }}
            image={collection.featuredImg}
            borderColor="gray3"
            title={i18n.t('builderPage.data_request.failed')}
          />
        );
      }
    }

    return (
      <PageCard.Style3
        css={{ cursor: 'auto' }}
        borderColor="gray3"
        title={i18n.t('builderPage.data_not_selected', { text: i18n.t('adminDashboard.collection') })}
      />
    );
  };

  return (
    <View css={styles.container}>
      <View css={{ height: 'calc(100% - 160px)' }}>
        <View css={styles.header}>
          <View css={styles.filter}>
            <DebounceInput
              placeholder={i18n.t('builderPage.search', { text: i18n.t('adminDashboard.collection') })}
              value={searchKey}
              onValueChange={_handleChangeKey}
              block
              css={{ flex: '1' }}
            />

            <View css={styles.refreshIcon} onClick={handleRefresh}>
              {requestStatus === 'loading' ? <ActivityIndicator size={18} /> : <FontAwesome color="primary" size={18} type="far" name="sync-alt" />}
            </View>
          </View>

          <View
            tagName="a"
            href={`https://${shopName}/admin/collections/new`}
            color="primary"
            colorHover="primary"
            target="_blank"
            fontFamily="secondary"
            css={styles.createLink}
          >
            <View css={{ flex: '1', display: 'flex', alignItems: 'center' }}>
              <View css={styles.icon}>
                <FontAwesome size={20} type="far" name="plus-square" />
              </View>
              <View>{i18n.t('general.create', { text: i18n.t('adminDashboard.collection') })}</View>
            </View>

            <FontAwesome size={16} type="far" name="external-link" />
          </View>
        </View>
        <AsyncComponent status={requestStatus} Request={renderLoading()} Success={_renderSuccess()} isEmpty={isEmpty(_collections)} />
      </View>

      <View css={styles.selectedItem} backgroundColor="light">
        <View css={{ lineHeight: '1.8' }} fontFamily="secondary" color="primary">
          {i18n.t('general.currently_selected')}
        </View>

        {renderSelected()}
      </View>
    </View>
  );
};
