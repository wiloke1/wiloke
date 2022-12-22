import Active from 'components/Active';
import AsyncComponent from 'components/AsyncComponent';
import Empty from 'components/Empty';
import MyModal from 'components/MyModal';
import ProductCard from 'components/ProductCard';
import ScrollBars from 'components/ScrollBars';
import TextInput from 'components/TextInput';
import withDebounce from 'hocs/withDebounce';
import { FC, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useChangeBlogKey, useGetBlogs, useLoadMoreBlogs } from 'store/actions/shopify';
import { defaultArticleDataState } from 'store/reducers/shopify/reducerArticles';
import { defaultBlogDataState } from 'store/reducers/shopify/reducerBlogs';
import { shopifySelector } from 'store/selectors';
import { i18n } from 'translation';
import { ActivityIndicator, GridSmart, View, ViewportTracking } from 'wiloke-react-core';
import { Collapse } from 'antd';
import Checkbox from 'components/Checkbox';
import { ArticlePageLiquidVariable } from 'types/Page';
import { useSettingsShopifyPicker } from './slice';
import * as styles from './styles';

const DebounceInput = withDebounce(TextInput, 'value', 'onValueChange', 300);

interface MultiBlogPickerProps {
  onOk?: () => void;
  onCancel?: () => void;
}

const { Panel } = Collapse;

export const MultiBlogPicker: FC<MultiBlogPickerProps> = ({ onOk, onCancel }) => {
  const { blogs, searchKey } = useSelector(shopifySelector.blogs);
  const blogData = blogs[searchKey] || defaultBlogDataState;

  const { data: articleState } = useSelector(shopifySelector.articles);

  const { visibleBlog, slugBlog } = useSelector(shopifySelector.multiShopifyPicker);

  const changeKey = useChangeBlogKey();
  const changeSettingsShopify = useSettingsShopifyPicker();

  const getBlogs = useGetBlogs();
  const loadMoreBlogs = useLoadMoreBlogs();

  useEffect(() => {
    if (visibleBlog) {
      getBlogs.request({ search: searchKey, shouldGetArticle: true });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visibleBlog, searchKey]);

  const handleSelectBlog = ({
    handle,
    id,
    blogHandle,
    blogId,
    featuredImage,
  }: {
    handle: string;
    id: number;
    blogId: number;
    blogHandle: string;
    featuredImage?: string;
  }) => (isSelect: boolean) => {
    if (isSelect) {
      const article: Exclude<ArticlePageLiquidVariable, undefined> = { handle, itemId: id, blogHandle, blogId, featuredImg: featuredImage };
      changeSettingsShopify({
        slugBlog: [...slugBlog, article],
      });
    } else {
      changeSettingsShopify({
        slugBlog: slugBlog.filter(item => item.handle !== handle),
      });
    }
  };

  const handleSelectAll = ({ blogHandle, blogId }: { blogId: number; blogHandle: string }) => (isSelect: boolean) => {
    if (isSelect) {
      const articlesData = articleState[blogId] ?? defaultArticleDataState;
      const articlePages: Exclude<ArticlePageLiquidVariable, undefined>[] = articlesData.articles.map(item => ({
        featuredImg: item.image?.src,
        handle: item.handle,
        itemId: item.id,
        blogId,
        blogHandle,
      }));

      changeSettingsShopify({
        slugBlog: [...slugBlog, ...articlePages],
      });
    } else {
      changeSettingsShopify({
        slugBlog: slugBlog.filter(item => item.blogHandle !== blogHandle),
      });
    }
  };

  const handleSearch = (val: string) => {
    changeKey(val);
  };

  const handleClose = () => {
    if (!!onCancel) {
      onCancel?.();
    } else {
      changeSettingsShopify({
        visibleBlog: false,
      });
    }
  };

  const handleOk = () => {
    // NOTE: Nếu không chọn article nào trong blog này thì mặc định sẽ là chọn all article thuộc blog này ?? hoặc không
    if (!!onOk) {
      onOk?.();
    } else {
      changeSettingsShopify({
        visibleBlog: false,
      });
    }
  };

  const renderLoadMoreBlog = () => {
    if (blogData.hasNextPage || blogData.loadMoreStatus === 'loading') {
      return (
        <ViewportTracking
          offsetBottom={0}
          onEnterViewport={() => {
            if (blogData.requestStatus === 'success') {
              loadMoreBlogs.request({ search: searchKey, shouldGetArticle: true });
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

  const renderBlogSuccess = () => {
    return (
      <ScrollBars css={{ height: 'calc(100% - 40px) !important' }}>
        <View css={styles.renderBlogSuccessContainer}>
          <Collapse className="veda-collapse-container" activeKey={blogData.data.map(item => item.id).filter(Boolean)}>
            {blogData.data.map(item => {
              const isActive = slugBlog.map(item => item.blogHandle).includes(item.handle);
              const articlesData = articleState[item.id] ?? defaultArticleDataState;

              return (
                <Panel
                  key={item.id}
                  header={item.title}
                  extra={
                    <Checkbox
                      checked={isActive}
                      tooltipContent={articlesData.articles.length === 0 ? i18n.t('adminDashboard.cannot_choose_blog') : ''}
                      disabledOnChange={articlesData.articles.length === 0}
                      onValueChange={handleSelectAll({ blogHandle: item.handle, blogId: item.id })}
                    />
                  }
                  showArrow={false}
                >
                  {articlesData.articles.length > 0 ? (
                    <GridSmart columnWidth={200} columnGap={10}>
                      {articlesData.articles.map(article => {
                        const activeArticle = slugBlog.map(item => item.handle).includes(article.handle);
                        return (
                          <Active
                            disabledMulti
                            variant="style2"
                            active={activeArticle}
                            key={article.id}
                            onActive={handleSelectBlog({
                              blogHandle: item.handle,
                              blogId: item.id,
                              id: article.id,
                              handle: article.handle,
                              featuredImage: article.image?.src,
                            })}
                          >
                            <ProductCard imageAspectRatio={16 / 9} imageSrc={article.image ? article.image.src : ''} title={article.title} />
                          </Active>
                        );
                      })}
                    </GridSmart>
                  ) : (
                    <Empty text={i18n.t('adminDashboard.blog_has_no_articles')} />
                  )}
                </Panel>
              );
            })}
          </Collapse>
          {renderLoadMoreBlog()}
        </View>
      </ScrollBars>
    );
  };

  return (
    <MyModal
      headerText={i18n.t('adminDashboard.blog')}
      bodyCss={{
        height: '80%',
      }}
      isVisible={visibleBlog}
      depsHeightRecalculation={blogData.requestStatus}
      cancelText={i18n.t('general.remove')}
      okText={i18n.t('general.accept')}
      scrollDisabled
      onCancel={handleClose}
      onOk={handleOk}
      size="large"
    >
      <View css={{ height: '100%' }}>
        <DebounceInput
          block
          sizeInput="medium"
          placeholder={i18n.t('general.search_with', { text: i18n.t('adminDashboard.blog') })}
          css={{ marginBottom: '8px' }}
          value={searchKey}
          onValueChange={handleSearch}
        />

        <AsyncComponent status={blogData.requestStatus} isEmpty={blogData.data.length === 0} Success={renderBlogSuccess()} />
      </View>
    </MyModal>
  );
};
