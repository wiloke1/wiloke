import AsyncComponent from 'components/AsyncComponent';
import { useLinkPicker } from 'components/LinkPicker/store/context/LinkPickerContext';
import { getShopifyHandle } from 'components/LinkPicker/utils/getShopifyHandle';
import { useShopifyModal } from 'components/LinkPicker/utils/globaState';
import PageCard from 'components/PageCard';
import ScrollBars from 'components/ScrollBars';
import { isEmpty } from 'ramda';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useChangeArticleKey, useGetArticles } from 'store/actions/shopify';
import { defaultArticleDataState } from 'store/reducers/shopify/reducerArticles';
import { shopifySelector } from 'store/selectors';
import { i18n } from 'translation';
import { ArticlesApiData } from 'types/Articles';
import { View } from 'wiloke-react-core';
import { DebounceTextInput } from '../Form/Fields/Fields';

export const Articles = () => {
  const { blogId, data, searchKey } = useSelector(shopifySelector.articles);
  const { articles, requestStatus } = data[blogId] || defaultArticleDataState;

  const { dispatch, value } = useLinkPicker();
  const getArticleByBlogId = useGetArticles();
  const changeKey = useChangeArticleKey();
  const [, setVisible] = useShopifyModal();

  useEffect(() => {
    getArticleByBlogId.request({ search: searchKey, blogId });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchKey, blogId]);

  const _handleSearch = (val: string) => {
    changeKey(val);
  };

  const _renderRowItem = (item: ArticlesApiData) => {
    const { id, title, handle, image } = item;
    return (
      <PageCard.Style2
        image={image?.src}
        isActive={handle === getShopifyHandle(value)}
        title={title}
        css={{ marginBottom: '5px' }}
        key={id}
        onClick={() => {
          setVisible(false);
          dispatch({
            type: '@LinkPicker/setSettings',
            payload: {
              value: `/articles/${handle}`,
            },
          });
        }}
      />
    );
  };

  const _renderSuccess = () => {
    return (
      <ScrollBars css={{ height: 'calc(100% - 100px) !important' }}>
        <View css={{ padding: '10px', height: '100%' }}>{articles.map(_renderRowItem)}</View>
      </ScrollBars>
    );
  };

  return (
    <View css={{ padding: '15px 0 20px', height: '100%' }}>
      <View css={{ padding: '0 10px' }}>
        <DebounceTextInput
          block
          sizeInput="medium"
          placeholder={i18n.t('builderPage.search', { text: i18n.t('adminDashboard.article') })}
          css={{ marginBottom: '8px' }}
          value={searchKey}
          onValueChange={_handleSearch}
        />
      </View>

      <AsyncComponent status={requestStatus} isEmpty={isEmpty(articles)} Success={_renderSuccess()} />
    </View>
  );
};
