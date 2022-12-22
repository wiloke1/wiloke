import { getBlogsObject } from './services/getBlogsObject';
import { getCollectionsObject } from './services/getCollectionsObject';
import { getLocalizationObject } from './services/getLocalizationObject';
import { getPagesObject } from './services/getPagesObject';
import { getProductsObject } from './services/getProductsObject';
import { getShopObject } from './services/getShopObject';
import { getThemeCss } from './services/getThemeCss';
import { getTranslationObject } from './services/getTranslationObject';
import { getThemeObject } from './services/getThemeObject';

export class LiquidVariables {
  getCollectionsObject = getCollectionsObject;
  getProductsObject = getProductsObject;
  getBlogsObject = getBlogsObject;
  getPagesObject = getPagesObject;
  getShopObject = getShopObject;
  getThemeCss = getThemeCss;
  getLocalizationObject = getLocalizationObject;
  getTranslationObject = getTranslationObject;
  getThemeObject = getThemeObject;
}
