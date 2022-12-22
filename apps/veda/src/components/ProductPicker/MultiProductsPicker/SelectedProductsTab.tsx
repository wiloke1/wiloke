import PageCard from 'components/PageCard';
import TextInput from 'components/TextInput';
import VirtualList from 'components/VirtualList/VirtualList';
import withDebounce from 'hocs/withDebounce';
import { useMemo, useState } from 'react';
import { i18n } from 'translation';
import { ProductApiData } from 'types/Products';
import { Space, View } from 'wiloke-react-core';
import * as styles from '../styles';
import { useMultiProductsPicker } from './store/context';

const ROW_HEIGHT = 57;
const NUMBER_OF_COLUMNS = 1;

const DebounceInput = withDebounce(TextInput, 'value', 'onValueChange');

// const multiProductsPickerResultToComponentType = (item: MultiProductsPickerResult[number]): ProductApiData => {
//   return {
//     variants: { edges: [] },
//     createdAt: '',
//     cursor: '',
//     tags: [],
//     id: item.id?.toString() ?? '',
//     title: item.title ?? '',
//     handle: item.handle ?? '',
//     featuredImage: {
//       altText: item.featured_image?.alt ?? '',
//       height: item.featured_image?.height ?? 0,
//       src: item.featured_image?.src ?? '',
//       width: item.featured_image?.width ?? 0
//     },
//   };
// };

export const SelectedProductsTab = () => {
  const [searchKey, setSearchKey] = useState('');
  const { dispatch, products: products_ } = useMultiProductsPicker();

  const data = useMemo(() => {
    if (searchKey) {
      return products_.filter(product => product.title?.toLowerCase().includes(searchKey));
    }
    return products_;
  }, [products_, searchKey]);

  const handleDeactiveProduct = (id: ProductApiData['id']) => () => {
    dispatch({
      type: '@DeleteProduct',
      payload: { productId: Number(id) },
    });
  };

  const renderListProducts = () => {
    const rowCount = Math.ceil(data.length / NUMBER_OF_COLUMNS);
    return (
      <VirtualList
        rowHeight={ROW_HEIGHT}
        rowCount={rowCount}
        rowRender={index => {
          const dataSlice = data.slice(index * NUMBER_OF_COLUMNS, index * NUMBER_OF_COLUMNS + NUMBER_OF_COLUMNS);
          const rowItem = dataSlice.length ? dataSlice : [];

          return rowItem.map(item => {
            if (item && item.id && item.title) {
              return (
                <PageCard.Style3
                  borderColor="gray3"
                  key={item.id}
                  isActive
                  image={item.featured_image?.src ?? undefined}
                  title={item.title}
                  onClick={handleDeactiveProduct(item.id.toString())}
                />
              );
            }
            return null;
          });
        }}
      />
    );
  };

  return (
    <View css={{ height: '100%' }}>
      <DebounceInput
        css={styles.input}
        placeholder={i18n.t('builderPage.search', { text: i18n.t('adminDashboard.product') })}
        value={searchKey}
        onValueChange={setSearchKey}
        block
      />
      <Space size={8} />
      {renderListProducts()}
    </View>
  );
};
