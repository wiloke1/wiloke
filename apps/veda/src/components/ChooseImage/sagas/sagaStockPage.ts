import { watchGetMyMedia } from './watchGetMyMedia';
import { watchLoadmoreMyMedia } from './watchLoadmoreMyMedia';
import { watchUploadFileToMyMedia } from './watchUploadFileToMyMedia';
import { watchUploadStockToMyMedia } from './watchUploadStockToMyMedia';
import { watchGetShopifyProducts } from './watchGetShopifyProducts';
import { watchLoadmoreShopifyProducts } from './watchLoadmoreShopifyProducts';
import { watchDeleteMyMedia } from './watchDeleteMyMedia';
import { watchGetFreeImages } from './watchGetFreeImages';
import { watchGetCategoriesOfFreeImages } from './watchGetCategoriesOfFreeImages';
import { watchLoadMoreFreeImages } from './watchLoadMoreFreeImages';
import { watchRemoveBackground } from './watchRemoveBackground';

const sagaImageGallery = [
  watchGetMyMedia,
  watchLoadmoreMyMedia,
  watchUploadFileToMyMedia,
  watchUploadStockToMyMedia,
  watchGetShopifyProducts,
  watchLoadmoreShopifyProducts,
  watchDeleteMyMedia,
  watchGetFreeImages,
  watchGetCategoriesOfFreeImages,
  watchLoadMoreFreeImages,
  watchRemoveBackground,
];

export default sagaImageGallery;
