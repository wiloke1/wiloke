import { ShopLocale } from './ShopLocale';
import { Country } from './Country';
import { DeepNullable } from './@utils';

/** @link https://shopify.dev/api/liquid/objects#localization */
interface _Localization {
  available_countries: Country[];
  available_languages: ShopLocale[];
  country: Country;
  language: ShopLocale;
}

export type Localization = DeepNullable<_Localization> | null;
