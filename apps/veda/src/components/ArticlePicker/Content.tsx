import AsyncComponent from 'components/AsyncComponent';
import PageCard from 'components/PageCard';
import ScrollBars from 'components/ScrollBars';
import TextInput from 'components/TextInput';
import withDebounce from 'hocs/withDebounce';
import { isEmpty } from 'ramda';
import { useSelector } from 'react-redux';
import { useChangeBlogKey } from 'store/actions/shopify';
import { defaultArticleDataState } from 'store/reducers/shopify/reducerArticles';
import { shopifySelector } from 'store/selectors';
import { ArticlesApiData } from 'types/Articles';
import { View } from 'wiloke-react-core';
import { useArticlePicker } from './store/context/ArticlePickerContext';

const DebounceInput = withDebounce(TextInput, 'value', 'onValueChange');

export const Content = () => {
  const { blogId, data, searchKey } = useSelector(shopifySelector.articles);
  const { articles, requestStatus } = data[blogId] || defaultArticleDataState;

  const { dispatch, value } = useArticlePicker();
  const changeSearchKey = useChangeBlogKey();
  // const getProducts = useGetArticles();

  // useEffect(() => {
  //   getProducts.request({ search: searchKey });
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [searchKey]);

  const _handleChangeKey = (value: string) => {
    changeSearchKey(value);
  };

  const _renderRowItem = (item: ArticlesApiData) => {
    const { id, handle, title, image } = item;
    return (
      <PageCard.Style2
        isActive={handle === value?.handle}
        title={title}
        css={{ marginBottom: '5px' }}
        key={id}
        onClick={() => {
          dispatch({
            type: '@ArticlePicker/setSettings',
            payload: {
              value: {
                itemId: id,
                handle,
                blogId: 0, // TODO: @tuong -> Chưa có cái này
                blogHandle: '', // TODO: @tuong -> Chưa có cái này
                featuredImg: image?.src,
              },
            },
          });
        }}
      />
    );
  };

  const _renderSuccess = () => {
    return (
      <ScrollBars css={{ height: 'calc(100% - 110px) !important' }}>
        <View css={{ height: '100%' }}>{articles.map(_renderRowItem)}</View>
      </ScrollBars>
    );
  };

  return (
    <View css={{ height: '100%' }}>
      <DebounceInput
        block
        sizeInput="medium"
        placeholder="Search articles..."
        css={{ marginBottom: '8px' }}
        value={searchKey}
        onValueChange={_handleChangeKey}
      />

      <AsyncComponent status={requestStatus} isEmpty={isEmpty(data)} Success={_renderSuccess()} />
    </View>
  );
};
