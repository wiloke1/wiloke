import { liquidFilterParamsToTwigFilterParams } from '../utils/liquidFilterParamsToTwigFilterParams';

/**
 * TODO: Có hay không nên việc custom lại cái này ?????
 * @link https://shopify.github.io/liquid/filters/concat/
 */
export const concat = (liquid: string) => liquidFilterParamsToTwigFilterParams({ liquid, liquidFilterName: 'concat', twigFilterName: 'merge' });
