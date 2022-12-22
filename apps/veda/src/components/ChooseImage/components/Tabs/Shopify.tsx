import AsyncComponent from 'components/AsyncComponent';
import { ChooseCard } from 'components/ChooseCard';
import ChooseCardLoading from 'components/ChooseCard/ChooseCardLoading';
import { useChangeSearchKey, useGetShopifyProducts, useLoadMoreShopifyProducts } from 'components/ChooseImage/actions/actionShopify';
import { defaultItem, ProductItem } from 'components/ChooseImage/reducers/reducerShopify';
import { imageGallerySelector } from 'components/ChooseImage/selector';
import { useOnChangeImage } from 'components/ChooseImage/utils/useSetImage';
import TextInput from 'components/TextInput';
import VirtualList from 'components/VirtualList/VirtualList';
import withDebounce from 'hocs/withDebounce';
import { isEmpty } from 'ramda';
import { FC, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { i18n } from 'translation';
import { GridSmart, View } from 'wiloke-react-core';
import { COLUMN_GAP, ROW_HEIGHT } from './constants';
import { SettingTabProps } from './Tabs';

const DebounceInput = withDebounce(TextInput, 'value', 'onValueChange');

const numberOfColumn = 1;

const Shopify: FC<SettingTabProps> = () => {
  const { shopify } = useSelector(imageGallerySelector);
  const { data, searchKey } = shopify;
  const { statusRequest, products, statusLoadmore, hasNextPage } = data[searchKey] ?? defaultItem;

  const getShopifyProducts = useGetShopifyProducts();
  const loadmoreShopifyProducts = useLoadMoreShopifyProducts();
  const changeSearchKey = useChangeSearchKey();
  const { handleChangeImage } = useOnChangeImage();

  useEffect(() => {
    if (statusRequest === 'failure' || statusRequest === 'idle') {
      getShopifyProducts.request({ searchKey: searchKey });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [statusRequest, searchKey]);

  const _renderItemSuccess = ({ id, image }: ProductItem) => {
    return (
      <ChooseCard
        buttonText={i18n.t('builderPage.use')}
        key={id}
        containerStyle={{ height: ROW_HEIGHT - COLUMN_GAP }}
        uri={image.src}
        onEdit={handleChangeImage({ src: image.src, width: image.width, height: image.height })}
      />
    );
  };

  return (
    <View css={{ padding: '10px', height: '100%' }}>
      <DebounceInput
        value={searchKey}
        onValueChange={val => changeSearchKey({ searchKey: val })}
        placeholder="Search"
        block
        css={{ marginBottom: '8px' }}
      />

      <AsyncComponent
        status={statusRequest}
        isEmpty={isEmpty(data)}
        Success={
          <VirtualList
            rowCount={Math.ceil(products.length / numberOfColumn) + (hasNextPage ? 2 : 0)}
            onScroll={({ scrollTop, clientHeight, scrollHeight }) => {
              if (scrollHeight - scrollTop - clientHeight < 300 && statusLoadmore !== 'loading' && hasNextPage) {
                loadmoreShopifyProducts.request({ searchKey });
              }
            }}
            rowHeight={ROW_HEIGHT}
            rowRender={index => {
              const dataSlice = products.slice(index * numberOfColumn, index * numberOfColumn + numberOfColumn);
              const rowItem = dataSlice.length ? dataSlice : hasNextPage ? Array(numberOfColumn).fill(undefined) : [];
              return (
                <GridSmart columnWidth={1} columnCount={numberOfColumn} columnGap={COLUMN_GAP}>
                  {rowItem.map((item, index) => {
                    if (typeof item === 'undefined') {
                      return <ChooseCardLoading containerStyle={{ height: ROW_HEIGHT - COLUMN_GAP }} key={index} />;
                    }
                    return _renderItemSuccess(item);
                  })}
                </GridSmart>
              );
            }}
          />
        }
      />
    </View>
  );
};

export default Shopify;
