import AsyncComponent from 'components/AsyncComponent';
import { useLinkPicker } from 'components/LinkPicker/store/context/LinkPickerContext';
import { getShopifyHandle } from 'components/LinkPicker/utils/getShopifyHandle';
import { useShopifyModal } from 'components/LinkPicker/utils/globaState';
import PageCard from 'components/PageCard';
import ScrollBars from 'components/ScrollBars';
import { isEmpty } from 'ramda';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useChangeBlogKey, useGetBlogs, useLoadMoreBlogs } from 'store/actions/shopify';
import { defaultBlogDataState } from 'store/reducers/shopify/reducerBlogs';
import { shopifySelector } from 'store/selectors';
import { i18n } from 'translation';
import { BlogApiData } from 'types/Blogs';
import { ActivityIndicator, View, ViewportTracking } from 'wiloke-react-core';
import { DebounceTextInput } from '../Form/Fields/Fields';

export const Blogs = () => {
  const { blogs, searchKey } = useSelector(shopifySelector.blogs);
  const { data, requestStatus, hasNextPage, loadMoreStatus } = blogs[searchKey] || defaultBlogDataState;
  const { dispatch, value } = useLinkPicker();
  const getBlogs = useGetBlogs();
  const changeKey = useChangeBlogKey();
  const [, setVisible] = useShopifyModal();
  const loadMoreBlogs = useLoadMoreBlogs();

  useEffect(() => {
    getBlogs.request({ search: searchKey, shouldGetArticle: false });
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
              loadMoreBlogs.request({ search: searchKey, shouldGetArticle: false });
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

  const _renderRowItem = (item: BlogApiData) => {
    const { id, title, handle } = item;
    return (
      <PageCard.Style2
        isActive={handle === getShopifyHandle(value)}
        title={title}
        css={{ marginBottom: '5px' }}
        key={id}
        onClick={() => {
          setVisible(false);
          dispatch({
            type: '@LinkPicker/setSettings',
            payload: {
              value: `/blogs/${handle}`,
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
          placeholder={i18n.t('builderPage.search', { text: i18n.t('adminDashboard.blog') })}
          css={{ marginBottom: '8px' }}
          value={searchKey}
          onValueChange={_handleSearch}
        />
      </View>

      <AsyncComponent status={requestStatus} isEmpty={isEmpty(data)} Success={_renderSuccess()} />
    </View>
  );
};
