import Tooltip from 'components/Tooltip';
import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { useRenewCollections, useRenewProducts } from 'store/actions/shopify';
import { defaultCollectionDataState } from 'store/reducers/shopify/reducerCollection';
import { defaultProductDataState } from 'store/reducers/shopify/reducerProducts';
import { shopifySelector } from 'store/selectors';
import { i18n } from 'translation';
import { View, FontAwesome, ActivityIndicator } from 'wiloke-react-core';

interface Props {
  variant: 'product' | 'collection';
}

export const RenewButton = ({ variant }: Props) => {
  const productsState = useSelector(shopifySelector.products);
  const collectionsState = useSelector(shopifySelector.collections);

  const { renewProductsStatus } = productsState.products[productsState.searchKey] || defaultProductDataState;
  const { renewCollectionsStatus } = collectionsState.collections[collectionsState.searchKey] || defaultCollectionDataState;

  const renewProducts = useRenewProducts();
  const renewCollections = useRenewCollections();

  const isLoading = useMemo(() => {
    if (variant === 'product') {
      return renewProductsStatus === 'loading';
    }
    if (variant === 'collection') {
      return renewCollectionsStatus === 'loading';
    }
    return false;
  }, [renewCollectionsStatus, renewProductsStatus, variant]);

  const handleClick = () => {
    if (variant === 'product') {
      renewProducts.request({ search: productsState.searchKey });
    }
    if (variant === 'collection') {
      renewCollections.request({ search: collectionsState.searchKey });
    }
  };

  return (
    <Tooltip text={i18n.t('general.renew_data')} placement="left">
      <View
        css={{ padding: '12px', marginRight: '12px', cursor: 'pointer' }}
        borderColor="gray3"
        borderWidth={1}
        borderStyle="solid"
        radius={10}
        onClick={handleClick}
      >
        {isLoading ? <ActivityIndicator size={16} /> : <FontAwesome type="far" name="sync-alt" size={16} />}
      </View>
    </Tooltip>
  );
};
