import { liquidFilterParamsToTwigFilterParams } from '../utils/liquidFilterParamsToTwigFilterParams';

/**
 * @link https://shopify.github.io/liquid/filters/split/
 */
export const split = (liquid: string) => liquidFilterParamsToTwigFilterParams({ liquid, liquidFilterName: 'split', twigFilterName: 'split' });
