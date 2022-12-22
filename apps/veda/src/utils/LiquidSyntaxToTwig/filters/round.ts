import { liquidFilterParamsToTwigFilterParams } from '../utils/liquidFilterParamsToTwigFilterParams';

/**
 * @link https://shopify.github.io/liquid/filters/round/
 */
export const round = (liquid: string) => liquidFilterParamsToTwigFilterParams({ liquid, liquidFilterName: 'round', twigFilterName: 'round' });
