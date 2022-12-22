import { notification } from 'antd';
import Active from 'components/Active';
import AsyncComponent from 'components/AsyncComponent';
import Empty from 'components/Empty';
import Field from 'components/Field';
import MyModal from 'components/MyModal';
import ProductCard from 'components/ProductCard';
import Radio from 'components/Radio';
import ScrollBars from 'components/ScrollBars';
import TextInput from 'components/TextInput';
import withDebounce from 'hocs/withDebounce';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useChangeBlogKey, useGetBlogs, useLoadMoreBlogs } from 'store/actions/shopify';
import { defaultBlogDataState } from 'store/reducers/shopify/reducerBlogs';
import { shopifySelector } from 'store/selectors';
import { i18n } from 'translation';
import { ArticlesApiData } from 'types/Articles';

import { Collapse } from 'antd';
import Checkbox from 'components/Checkbox';
import { VedaLoadingItem } from 'components/VedaLoadingItem';
import { useHistory } from 'react-router-dom';
import { defaultArticleDataState } from 'store/reducers/shopify/reducerArticles';
import { ArticlePageLiquidVariable } from 'types/Page';
import { getUserInfo } from 'utils/functions/getUserInfo';
import { GridSmart, View, ViewportTracking } from 'wiloke-react-core';
import { dashboardPageSettingsSelector, useChangeSettingsDashboardPage } from '../slice';
import * as styles from '../styles';

const { Panel } = Collapse;
const DebounceInput = withDebounce(TextInput, 'value', 'onValueChange');

export const MultiBlog = () => {
  const { page, visibleListBlog, originPage } = useSelector(dashboardPageSettingsSelector);
  const { blogs, searchKey } = useSelector(shopifySelector.blogs);
  const { data, requestStatus, hasNextPage, loadMoreStatus } = blogs[searchKey] || defaultBlogDataState;
  const [applyType, setApplyType] = useState<'all' | 'custom'>('all');
  const { data: articleState } = useSelector(shopifySelector.articles);

  const changeSettings = useChangeSettingsDashboardPage();
  const changeKey = useChangeBlogKey();

  const getBlogs = useGetBlogs();
  const loadMoreBlogs = useLoadMoreBlogs();

  const history = useHistory();
  const { shopName } = getUserInfo();

  useEffect(() => {
    if (visibleListBlog) {
      getBlogs.request({ search: searchKey, shouldGetArticle: true });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visibleListBlog, searchKey]);

  useEffect(() => {
    if (visibleListBlog) {
      setApplyType(Array.isArray(page?.shopifyPages) ? 'custom' : 'all');
    }
  }, [page?.shopifyPages, visibleListBlog]);

  const _handleSearch = (val: string) => {
    changeKey(val);
  };

  const handleCancel = () => {
    changeSettings({
      visibleListBlog: false,
      page: undefined,
      originPage: undefined,
    });
  };

  const handleOverride = () => {
    if (page) {
      // nếu applyType = custom thì người dùng phải chọn ít nhất 1 product để có thể update lên server
      if (applyType === 'custom' && Array.isArray(page.shopifyPages) && page.shopifyPages.length < 1) {
        notification.warning({
          message: i18n.t('validate.choose_at_least', { text: i18n.t('adminDashboard.article') }),
        });
      } else {
        const entityVariant = 'Client';
        history.push(`/builder?shop=${shopName}&id=${page.commandId}&entityVariant=${entityVariant}`, {
          label: page.label,
          type: 'article',
          isCreate: false,
          shopifyRepresentPage: page.shopifyRepresentPage,
          shopifyPages: applyType === 'all' ? 'all' : page.shopifyPages,
          backToPage: '/page/article',
          entityVariant,
        });

        changeSettings({
          visibleListBlog: false,
          originPage: undefined,
        });
      }
    }
  };

  const handleChangeType = (val: string) => {
    const _val = val as 'all' | 'custom';
    setApplyType(_val);
    if (page && _val === 'all') {
      changeSettings({
        page: {
          ...page,
          shopifyPages: 'all',
        },
      });
    }
    if (page && _val === 'custom') {
      changeSettings({
        page: {
          ...page,
          shopifyPages: !originPage?.shopifyPages || typeof originPage.shopifyPages === 'string' ? [] : originPage?.shopifyPages,
        },
      });
    }
  };

  const handleChooseArticle = (item: ArticlesApiData, blogId: number, blogHandle: string) => (isSelect: boolean) => {
    if (page) {
      // iSelect = true thì thêm vào mảng
      if (isSelect) {
        changeSettings({
          page: {
            ...page,
            shopifyPages: [
              ...(Array.isArray(page?.shopifyPages) ? page.shopifyPages : []),
              { featuredImg: item.image?.src, handle: item.handle, itemId: item.id, blogId, blogHandle } as Exclude<
                ArticlePageLiquidVariable,
                undefined
              >,
            ],
          },
        });
      } else {
        changeSettings({
          page: {
            ...page,
            shopifyPages: (Array.isArray(page?.shopifyPages) ? page.shopifyPages : []).filter(liquid => liquid?.handle !== item.handle),
          },
        });
      }
    }
  };

  const renderLoadMoreBlog = () => {
    if (hasNextPage || loadMoreStatus === 'loading') {
      return (
        <ViewportTracking
          offsetBottom={0}
          onEnterViewport={() => {
            if (requestStatus === 'success') {
              loadMoreBlogs.request({ search: searchKey, shouldGetArticle: true });
            }
          }}
        >
          <View css={{ padding: '20px', display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%' }}>
            <VedaLoadingItem />
          </View>
        </ViewportTracking>
      );
    }
  };

  const handleSelectAll = ({ blogHandle, blogId }: { blogId: number; blogHandle: string }) => (isSelect: boolean) => {
    if (page) {
      if (isSelect) {
        const articlesData = articleState[blogId] ?? defaultArticleDataState;
        const articlePages: Exclude<ArticlePageLiquidVariable, undefined>[] = articlesData.articles.map(item => ({
          featuredImg: item.image?.src,
          handle: item.handle,
          itemId: item.id,
          blogId,
          blogHandle,
        }));

        changeSettings({
          page: {
            ...page,
            shopifyPages: [...(Array.isArray(page?.shopifyPages) ? page.shopifyPages : []), ...articlePages],
          },
        });
      } else {
        changeSettings({
          page: {
            ...page,
            shopifyPages: (Array.isArray(page?.shopifyPages) ? (page.shopifyPages as ArticlePageLiquidVariable[]) : []).filter(
              liquid => liquid?.blogId !== blogId,
            ),
          },
        });
      }
    }
  };

  const renderBlogSuccess = () => {
    return (
      <ScrollBars css={{ height: 'calc(100% - 150px) !important' }}>
        <View css={styles.renderBlogSuccessContainer}>
          <Collapse className="veda-collapse-container" activeKey={data.map(item => item.id).filter(Boolean)}>
            {data.map(item => {
              const articlesData = articleState[item.id] ?? defaultArticleDataState;

              const activeBlog =
                page !== undefined && page.shopifyPages !== undefined && page.shopifyPages !== 'all'
                  ? page.shopifyPages.map(item => (item as ArticlePageLiquidVariable)?.blogHandle).includes(item.handle)
                  : false;

              return (
                <Panel
                  key={item.id}
                  header={item.title}
                  extra={
                    <Checkbox
                      checked={activeBlog}
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
                        const activeArticle =
                          page !== undefined && page.shopifyPages !== undefined && page.shopifyPages !== 'all'
                            ? page.shopifyPages.map(item => (item as ArticlePageLiquidVariable)?.handle).includes(article.handle)
                            : false;

                        return (
                          <Active
                            disabledMulti
                            variant="style2"
                            active={activeArticle}
                            key={article.id}
                            onActive={handleChooseArticle(article, item.id, item.handle)}
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
      isVisible={visibleListBlog}
      bodyCss={{
        height: applyType === 'all' ? '280px' : '80%',
      }}
      headerText={'Blog Picker'}
      size="large"
      onCancel={handleCancel}
      onOk={handleOverride}
      scrollDisabled
    >
      <Field label="Apply to">
        <Radio.Group size="large" defaultValue={applyType} value={applyType} onChangeValue={handleChangeType}>
          <Radio.Button value="all">{i18n.t('adminDashboard.all')}</Radio.Button>
          <Radio.Button value="custom"> {i18n.t('adminDashboard.specific_text', { text: i18n.t('adminDashboard.blog') })}</Radio.Button>
        </Radio.Group>
      </Field>

      {applyType === 'custom' && (
        <View css={{ height: '100%' }}>
          <DebounceInput
            block
            sizeInput="medium"
            placeholder={`${i18n.t('adminDashboard.search')} ${i18n.t('adminDashboard.blog')}...`}
            css={{ marginBottom: '8px', width: 'calc(100% - 20px)' }}
            value={searchKey}
            onValueChange={_handleSearch}
          />

          <AsyncComponent status={requestStatus} Success={renderBlogSuccess()} />
        </View>
      )}

      {/* <ModalAskBeforeSave isLoading={statusSocketConnection === 'loading' || updateStatus === 'loading'} onOverride={handleOverride} /> */}
    </MyModal>
  );
};
