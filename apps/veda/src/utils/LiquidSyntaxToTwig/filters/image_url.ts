import { i18n } from 'translation';
import { LiquidSyntaxToTwigError } from '../Error';
import { liquidFilterParamsToTwigFilterParams } from '../utils/liquidFilterParamsToTwigFilterParams';

const MIN_SIZE = 0;
const MAX_SIZE = 5760;
const CROP = ['top', 'center', 'bottom', 'left', 'right'];
const FORMAT = ['jpg', 'pjpg'];
// const IMAGE_SOURCES = ['cdn.shopify.com', RANDOM_UNPLASH_IMAGE, configureApp.baseUrl];

const PLACEHOLDER =
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAQSURBVHgBAQUA+v8AAAAAAAAFAAFkeJU4AAAAAElFTkSuQmCC';
const INVALID_URL_MESSAGE = PLACEHOLDER;

window.Twig.extendFilter('image_url', (value, args) => {
  if (value !== undefined) {
    let imgUrlInput: string =
      typeof value === 'string'
        ? value
        : typeof value === 'object' && value.hasOwnProperty('src')
        ? value.src
        : typeof value === 'object' && value.hasOwnProperty('image')
        ? value.image.src
        : typeof value === 'object' && value.hasOwnProperty('featured_image')
        ? value.featured_image.src
        : '';
    // imgUrlInput = !!imgUrlInput
    //   ? IMAGE_SOURCES.some(item => imgUrlInput.includes(item))
    //     ? imgUrlInput
    //     : 'https://cdn.shopify.com/shopifycloud/shopify/assets/no-image-2048-5e88c1b20e087fb7bbe9a3771824e743c244f437e4f8ba93bbf7b11b53f7824c.gif'
    //   : INVALID_URL_MESSAGE;
    imgUrlInput = !!imgUrlInput ? imgUrlInput : INVALID_URL_MESSAGE;

    if (imgUrlInput === INVALID_URL_MESSAGE) {
      return INVALID_URL_MESSAGE;
    } else {
      const _argsInput = Array.isArray(args) ? args : [];
      const _imgUrl = new URL(imgUrlInput);
      while (_argsInput.length) {
        const name = _argsInput.shift()?.key;
        const value = _argsInput.shift();
        if (name === 'width' || name === 'height') {
          const valueNumber = Number(value);
          if (isNaN(valueNumber) || valueNumber < MIN_SIZE || valueNumber > MAX_SIZE) {
            throw new LiquidSyntaxToTwigError(i18n.t('twig_error.filters.image_url.size'));
          }
        }
        if (name === 'crop' && (typeof value !== 'string' || !CROP.includes(value))) {
          throw new LiquidSyntaxToTwigError(i18n.t('twig_error.filters.image_url.crop'));
        }
        if (name === 'format' && (typeof value !== 'string' || !FORMAT.includes(value))) {
          throw new LiquidSyntaxToTwigError(i18n.t('twig_error.filters.image_url.format'));
        }
        if (name === 'pad_color' && (typeof value !== 'string' || !/([0-9A-Fa-f]{6}$)|([0-9A-Fa-f]{3}$)/i.test(value))) {
          throw new LiquidSyntaxToTwigError(i18n.t('twig_error.filters.image_url.pad_color'));
        }
        if (!['width', 'height', 'crop', 'format', 'pad_color'].includes(name)) {
          throw new LiquidSyntaxToTwigError(i18n.t('twig_error.filters.image_url.unexpect_params'));
        }
        if (name) {
          _imgUrl.searchParams.append(name, value);
        }
      }
      return _imgUrl.toString();
    }
  } else {
    return INVALID_URL_MESSAGE;
  }
});

/**
 * @link https://shopify.dev/api/liquid/filters/url-filters#image_url
 */
export const image_url = (liquid: string) =>
  liquidFilterParamsToTwigFilterParams({ liquid, liquidFilterName: 'image_url', twigFilterName: 'image_url' });
