import { combineReducers } from 'redux';
import { sliceMultipleProduct } from 'containers/Shopify/ModalMultiPicker/slice';
import { reducerPages } from './reducerPages';
import { reducerCollection } from './reducerCollection';
import { reducerProducts } from './reducerProducts';
import { reducerArticles } from './reducerArticles';
import { reducerBlogs } from './reducerBlogs';
import { reducerMetafields } from './reducerMetafields';

export const reducerShopify = combineReducers({
  pages: reducerPages,
  collections: reducerCollection,
  products: reducerProducts,
  articles: reducerArticles,
  blogs: reducerBlogs,
  // picker
  multiProductPicker: sliceMultipleProduct.reducer,

  metafields: reducerMetafields,
});
