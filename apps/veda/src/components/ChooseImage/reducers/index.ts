import { combineReducers } from 'redux';
import reducerMyMedia from './reducerMyMedia';
import reducerShopify from './reducerShopify';
import { reducerFreeImage } from './reducerFreeImage';

const reducersImageGallery = combineReducers({
  my_media: reducerMyMedia,
  shopify: reducerShopify,
  free_images: reducerFreeImage,
});

export { reducersImageGallery };
