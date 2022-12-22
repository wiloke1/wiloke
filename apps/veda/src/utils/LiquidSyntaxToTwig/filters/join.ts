import { liquidFilterParamsToTwigFilterParams } from '../utils/liquidFilterParamsToTwigFilterParams';

/**
 * @link https://shopify.github.io/liquid/filters/join/
 */
export const join = (liquid: string) => liquidFilterParamsToTwigFilterParams({ liquid, liquidFilterName: 'join', twigFilterName: 'join' });
