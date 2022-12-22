import { liquidFilterParamsToTwigFilterParams } from '../utils/liquidFilterParamsToTwigFilterParams';

/**
 * TODO: Docs shopify mới update thêm -> Thiếu args
 * @link https://shopify.dev/api/liquid/filters/additional-filters#default
 */
export const _default = (liquid: string) => liquidFilterParamsToTwigFilterParams({ liquid, liquidFilterName: 'default', twigFilterName: 'default' });
