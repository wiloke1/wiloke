import { liquidFilterParamsToTwigFilterParams } from '../utils/liquidFilterParamsToTwigFilterParams';

/**
 * TODO: Có hay không nên việc custom lại cái này ?????
 * @link https://shopify.github.io/liquid/filters/remove/
 */
export const remove = (liquid: string) => liquidFilterParamsToTwigFilterParams({ liquid, liquidFilterName: 'remove', twigFilterName: 'replace' });
