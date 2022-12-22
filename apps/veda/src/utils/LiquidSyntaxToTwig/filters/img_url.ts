import { i18n } from 'translation';
import { RANDOM_UNPLASH_IMAGE } from 'store/reducers/liquid/randomPlaceholderLiquidObject';
import { liquidFilterParamsToTwigFilterParams } from '../utils/liquidFilterParamsToTwigFilterParams';
import { getMatches } from '../utils/getMatches';
import { toString } from '../utils/toString';
import { LiquidSyntaxToTwigError } from '../Error';

// NOTE: @tuong -> có thể custom cái này như của liquid (bao gồm cả các tham số vẫn syntax để viết)
// Check nếu value truyền vào là 1 object (tức featured_image, image, ...) thì sử dụng .src
// Lúc đó thì có thể như liquid (featured_image | img_url hoặc featured_image.src | img_url đều đúng)
window.Twig.extendFilter('img_url', (value, args) => {
  const size: string | undefined = Array.isArray(args) ? args[0] : 'small';
  if (typeof size !== 'string') {
    throw new LiquidSyntaxToTwigError(i18n.t('twig_error.filters.img_url.size', { error_signal: toString(size) }));
  }
  let imgUrl: string = typeof value === 'string' ? value : typeof value === 'object' && value.hasOwnProperty('src') ? value.src : '';
  imgUrl =
    imgUrl.includes('cdn.shopify.com') || imgUrl.includes(RANDOM_UNPLASH_IMAGE)
      ? imgUrl
      : 'https://cdn.shopify.com/shopifycloud/shopify/assets/no-image-2048-5e88c1b20e087fb7bbe9a3771824e743c244f437e4f8ba93bbf7b11b53f7824c.gif';
  try {
    const matches = getMatches(imgUrl, new RegExp(/(\.jpg|\.jpeg|\.png|\.gif)/g));
    const imageExtension = matches[matches.length - 1];

    // img_url: master -> Đường dẫn ảnh co kích thước gốc
    if (imageExtension && size !== 'master') {
      return imgUrl.replace(imageExtension, img_extension => {
        return `_${size}${img_extension}`;
      });
    }
    return imgUrl;
  } catch (err) {
    if (err instanceof LiquidSyntaxToTwigError) {
      throw err;
    }
    throw new LiquidSyntaxToTwigError(i18n.t('twig_error.filters.img_url.example', { message: toString(err) }));
  }
});

/**
 * TODO: Theo docs những cái này đã bị deprecated
 * @link https://shopify.dev/api/liquid/filters/deprecated-filters#url-filters
 */
export const img_url = (liquid: string) => liquidFilterParamsToTwigFilterParams({ liquid, liquidFilterName: 'img_url', twigFilterName: 'img_url' });
