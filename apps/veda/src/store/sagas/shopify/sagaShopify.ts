import { watchLoadMoreArticles } from './articles/watchGetArticles';
import { watchGetBlogs, watchLoadMoreBlogs } from './articles/watchGetBlogs';
import { watchGetCollections, watchLoadMoreCollections } from './collections/watchGetCollections';
import { watchRenewCollections } from './collections/watchRenewCollections';
import { watchGetMetafields } from './metafields/watchGetMetafields';
import { watchLoadmoreMetafields } from './metafields/watchLoadmoreMetafields';
import { watchGetPages, watchLoadMoreShopifyPages } from './pages/watchGetPages';
import { watchGetProducts, watchLoadMoreProducts } from './products/watchGetProducts';
import { watchRenewProducts } from './products/watchRenewProducts';

export const sagaShopify = [
  watchLoadMoreArticles,
  watchGetBlogs,
  watchGetCollections,
  watchGetPages,
  watchGetProducts,
  watchLoadMoreProducts,
  watchLoadMoreCollections,
  watchLoadMoreBlogs,
  watchLoadMoreShopifyPages,
  watchGetMetafields,
  watchLoadmoreMetafields,
  watchRenewProducts,
  watchRenewCollections,
];
