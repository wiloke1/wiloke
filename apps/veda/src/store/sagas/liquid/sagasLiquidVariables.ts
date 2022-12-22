import { watchGetBlogsObject } from './watchGetBlogsObject';
import { watchGetCollectionsObject } from './watchGetCollectionsObject';
import { watchGetTranslationObject } from './watchGetTranslationsObject';
import { watchGetPagesObject } from './watchGetPagesObject';
import { watchGetProductsObject } from './watchGetProductsObject';
import { watchGetShopObject } from './watchGetShopObject';
import { watchGetCartObject } from './watchGetCartObject';
import { watchGetLocalizationObject } from './watchGetLocalizationObject';
import { watchGetCustomerObject } from './watchGetCustomerObject';
import { watchGetThemeObjectNCss } from './watchGetThemeObjectNCss';
import { watchGetInitialOfLiquidVariables } from './watchGetInitialOfLiquidVariables';

export const sagasLiquidVariables = [
  watchGetCollectionsObject,
  watchGetProductsObject,
  watchGetBlogsObject,
  watchGetPagesObject,
  watchGetTranslationObject,
  watchGetShopObject,
  watchGetCartObject,
  watchGetLocalizationObject,
  watchGetCustomerObject,
  watchGetThemeObjectNCss,
  watchGetInitialOfLiquidVariables,
];
