import AsyncComponent from 'components/AsyncComponent';
import Button from 'components/Button';
import PageCard from 'components/PageCard';
import TextInput from 'components/TextInput';
import VirtualList from 'components/VirtualList/VirtualList';
import withDebounce from 'hocs/withDebounce';
import { isEmpty, range } from 'ramda';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useChangeBlogKey, useGetBlogs, useLoadMoreBlogs } from 'store/actions/shopify';
import { defaultBlogDataState } from 'store/reducers/shopify/reducerBlogs';
import { liquidVariablesSelector, shopifySelector } from 'store/selectors';
import { i18n } from 'translation';
import { BlogApiData } from 'types/Blogs';
import { getUserInfo } from 'utils/functions/getUserInfo';
import { ActivityIndicator, FontAwesome, View, ViewportTracking } from 'wiloke-react-core';
import { useBlogPicker } from './store/context/BlogContext';
import * as styles from './styles';

const DebounceInput = withDebounce(TextInput, 'value', 'onValueChange');

const ROW_HEIGHT = 57;
const NUMBER_OF_COLUMNS = 1;

export const Content = () => {
  const { blogSlugsLoading, blogSlugsFailed, blogSlugsLoaded } = useSelector(liquidVariablesSelector);
  const { blogs, searchKey } = useSelector(shopifySelector.blogs);
  const { data, requestStatus, hasNextPage, loadMoreStatus } = blogs[searchKey] || defaultBlogDataState;
  const { dispatch, value } = useBlogPicker();
  const changeSearchKey = useChangeBlogKey();
  const getBlogs = useGetBlogs();
  const loadMoreBlogs = useLoadMoreBlogs();
  const { shopName } = getUserInfo();

  useEffect(() => {
    getBlogs.request({ search: searchKey, shouldGetArticle: false, limit: 20 });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchKey]);

  const _handleChangeKey = (value: string) => {
    changeSearchKey(value);
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

  const chooseBlog = (item: BlogApiData) => () => {
    const isLoading = blogSlugsLoading.length > 0;
    if (isLoading) {
      return;
    } else {
      dispatch({
        type: '@BlogPicker/setSettings',
        payload: {
          value: {
            id: item.id,
            handle: item.handle,
            featuredImg: undefined, // NOTE: @tuong -> Blog không có trường "image"
          },
        },
      });
    }
  };

  const handleRefresh = () => {
    getBlogs.request({ search: searchKey, shouldGetArticle: false, limit: 20, refresh: true });
  };

  const _renderSuccess = () => {
    const rowCount = Math.ceil(data.length / NUMBER_OF_COLUMNS) + (hasNextPage ? NUMBER_OF_COLUMNS : 1);

    return (
      <View css={{ height: '100%', padding: '5px 10px 10px 10px' }}>
        <VirtualList
          rowHeight={ROW_HEIGHT}
          rowCount={rowCount}
          containerCss={{ height: 'calc(100% - 42px)' }}
          rowRender={index => {
            const dataSlice = data.slice(index * NUMBER_OF_COLUMNS, index * NUMBER_OF_COLUMNS + NUMBER_OF_COLUMNS);
            const rowItem = dataSlice.length ? dataSlice : hasNextPage ? Array(NUMBER_OF_COLUMNS).fill(undefined) : [];

            return rowItem.map((item, index) => {
              if (loadMoreStatus === 'failure' && typeof item === 'undefined' && index % NUMBER_OF_COLUMNS === 0) {
                return (
                  <Button
                    key={index}
                    onClick={() => {
                      getBlogs.request({ search: searchKey, shouldGetArticle: false, limit: 20 });
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
                      if (loadMoreStatus !== 'loading' && hasNextPage && index % NUMBER_OF_COLUMNS === 0) {
                        loadMoreBlogs.request({ search: searchKey, shouldGetArticle: false });
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
                    loading={blogSlugsLoading.includes(item.handle)}
                    isActive={value?.handle === item.handle && blogSlugsLoaded.includes(item.handle)}
                    isFailed={blogSlugsFailed.includes(item.handle)}
                    title={item.title}
                    onClick={chooseBlog(item)}
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
    if (value) {
      if (blogSlugsLoading.includes(value.handle)) {
        return <PageCard.Style3 css={{ cursor: 'auto' }} borderColor="gray3" title={`${i18n.t('builderPage.data_request.loading')}...`} />;
      }
      if (blogSlugsLoaded.includes(value.handle)) {
        const _blog = data.find(item => item.handle === value.handle);
        return <PageCard.Style3 css={{ cursor: 'auto' }} image={value.featuredImg} borderColor="gray3" title={_blog?.title ?? value.handle} />;
      }
      if (blogSlugsFailed.includes(value.handle)) {
        return (
          <PageCard.Style3
            css={{ cursor: 'auto' }}
            image={value.featuredImg}
            borderColor="gray3"
            title={`${i18n.t('builderPage.data_request.failed')}`}
          />
        );
      }
    }

    return (
      <PageCard.Style3
        css={{ cursor: 'auto' }}
        borderColor="gray3"
        title={i18n.t('builderPage.data_not_selected', { text: i18n.t('adminDashboard.blog') })}
      />
    );
  };

  return (
    <View css={{ height: '100%', position: 'relative' }}>
      <View css={{ height: 'calc(100% - 160px)' }}>
        <View css={{ padding: '10px 10px 0px 10px' }}>
          <View css={styles.filter}>
            <DebounceInput
              block
              placeholder={i18n.t('builderPage.search', { text: i18n.t('adminDashboard.blog') })}
              value={searchKey}
              onValueChange={_handleChangeKey}
              css={{ flex: '1' }}
            />
            <View css={styles.refreshIcon} onClick={handleRefresh}>
              {requestStatus === 'loading' ? <ActivityIndicator size={18} /> : <FontAwesome color="primary" size={18} type="far" name="sync-alt" />}
            </View>
          </View>
          <View
            tagName="a"
            href={`https://${shopName}/admin/articles/new`}
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
              <View>{i18n.t('general.create', { text: i18n.t('adminDashboard.blog') })}</View>
            </View>

            <FontAwesome size={16} type="far" name="external-link" />
          </View>
        </View>

        <AsyncComponent status={requestStatus} Request={renderLoading()} isEmpty={isEmpty(data)} Success={_renderSuccess()} />
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
