import { ShopifyDataProductAndCollection } from 'containers/Shopify/ModalMultiPicker/slice';
import { useSelector } from 'react-redux';
import { shopifySelector } from 'store/selectors';
import {
  ArticlePageLiquidVariable,
  CollectionPageLiquidVariable,
  HomePageLiquidVariable,
  PageLiquidVariable,
  PageType,
  ProductPageLiquidVariable,
  RegularPageLiquidVariable,
} from 'types/Page';

export const useGetShopifyPageTemplate = () => {
  const { slugsProduct, slugBlog, slugsCollection } = useSelector(shopifySelector.multiShopifyPicker);

  const adapterShopifyPresentPage: Record<PageType, PageLiquidVariable> = {
    home: undefined as HomePageLiquidVariable,
    password: undefined as HomePageLiquidVariable,
    cart: undefined as HomePageLiquidVariable,
    pageNotFound: undefined as HomePageLiquidVariable,
    search: undefined as HomePageLiquidVariable,
    collections: undefined as HomePageLiquidVariable,
    giftCard: undefined as HomePageLiquidVariable,
    account: undefined as HomePageLiquidVariable,
    activateAccount: undefined as HomePageLiquidVariable,
    login: undefined as HomePageLiquidVariable,
    addresses: undefined as HomePageLiquidVariable,
    order: undefined as HomePageLiquidVariable,
    register: undefined as HomePageLiquidVariable,
    resetPassword: undefined as HomePageLiquidVariable,
    page: { handle: '' } as RegularPageLiquidVariable,
    collection: {
      itemId: slugsCollection ? slugsCollection[0]?.itemId : 0,
      handle: slugsCollection ? slugsCollection[0]?.handle : '',
      featuredImg: slugsCollection[0]?.featuredImg,
    } as CollectionPageLiquidVariable,
    product: {
      itemId: slugsProduct ? slugsProduct[0]?.itemId : 0,
      handle: slugsProduct ? slugsProduct[0]?.handle : '',
      featuredImg: slugsProduct[0]?.featuredImg,
    } as ProductPageLiquidVariable,
    article: {
      blogHandle: slugBlog ? slugBlog[0]?.blogHandle : '',
      blogId: slugBlog ? slugBlog[0]?.blogId : 0,
      featuredImg: slugBlog[0]?.featuredImg,
      handle: slugBlog ? slugBlog[0]?.handle : '',
      itemId: slugBlog ? slugBlog[0]?.itemId : 0,
    } as ArticlePageLiquidVariable,
  };

  const adapterShopifyPages: Record<PageType, ShopifyDataProductAndCollection[] | undefined> = {
    home: undefined,
    password: undefined,
    cart: undefined,
    pageNotFound: undefined,
    search: undefined,
    collections: undefined,
    giftCard: undefined,
    account: undefined,
    activateAccount: undefined,
    login: undefined,
    addresses: undefined,
    order: undefined,
    register: undefined,
    resetPassword: undefined,
    page: undefined,
    article: slugBlog,
    product: slugsProduct,
    collection: slugsCollection,
  };

  const getShopifyPresentPage = (type: PageType): PageLiquidVariable => {
    if (type in adapterShopifyPresentPage) {
      return adapterShopifyPresentPage[type];
    } else {
      throw new Error('getShopifyPresentPage -> thêm type');
    }
  };

  const getShopifyPages = (type: PageType) => {
    if (type in adapterShopifyPages) {
      return adapterShopifyPages[type];
    } else {
      throw new Error('getShopifyPresentPage -> thêm type');
    }
  };

  return {
    getShopifyPages,
    getShopifyPresentPage,
  };
};
