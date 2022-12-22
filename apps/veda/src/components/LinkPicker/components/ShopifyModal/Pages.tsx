import AsyncComponent from 'components/AsyncComponent';
import { useLinkPicker } from 'components/LinkPicker/store/context/LinkPickerContext';
import { getShopifyHandle } from 'components/LinkPicker/utils/getShopifyHandle';
import { useShopifyModal } from 'components/LinkPicker/utils/globaState';
import PageCard from 'components/PageCard';
import ScrollBars from 'components/ScrollBars';
import { isEmpty } from 'ramda';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useChangePageKey, useGetPages, useLoadMoreShopifyPages } from 'store/actions/shopify';
import { defaultPageDataState } from 'store/reducers/shopify/reducerPages';
import { shopifySelector } from 'store/selectors';
import { i18n } from 'translation';
import { PageApiData } from 'types/Pages';
import { ActivityIndicator, View, ViewportTracking } from 'wiloke-react-core';
import { DebounceTextInput } from '../Form/Fields/Fields';

export const Page = () => {
  const { pages, searchKey } = useSelector(shopifySelector.pages);
  const { data, requestStatus, hasNextPage, loadMoreStatus } = pages[searchKey] || defaultPageDataState;
  const { dispatch, value } = useLinkPicker();
  const getPages = useGetPages();
  const changeKey = useChangePageKey();
  const [, setVisible] = useShopifyModal();
  const loadMorePages = useLoadMoreShopifyPages();

  useEffect(() => {
    getPages.request({ search: searchKey });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchKey]);

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
              loadMorePages.request({ search: searchKey });
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

  const _renderRowItem = (item: PageApiData) => {
    const { id, title, handle } = item;
    return (
      <PageCard.Style2
        title={title}
        isActive={handle === getShopifyHandle(value)}
        css={{ marginBottom: '5px' }}
        key={id}
        onClick={() => {
          setVisible(false);
          dispatch({
            type: '@LinkPicker/setSettings',
            payload: {
              value: `/pages/${handle}`,
            },
          });
        }}
      />
    );
  };

  const _renderSuccess = () => {
    return (
      <ScrollBars css={{ height: 'calc(100% - 100px) !important' }}>
        <View css={{ padding: '10px', height: '100%' }}>
          {data.map(_renderRowItem)}
          {renderLoadMore()}
        </View>
      </ScrollBars>
    );
  };

  return (
    <View css={{ padding: '15px 0 20px', height: '100%' }}>
      <View css={{ padding: '0 10px' }}>
        <DebounceTextInput
          block
          sizeInput="medium"
          placeholder={i18n.t('builderPage.search', { text: i18n.t('general.page') })}
          css={{ marginBottom: '8px' }}
          value={searchKey}
          onValueChange={_handleSearch}
        />
      </View>

      <AsyncComponent status={requestStatus} isEmpty={isEmpty(data)} Success={_renderSuccess()} />
    </View>
  );
};
