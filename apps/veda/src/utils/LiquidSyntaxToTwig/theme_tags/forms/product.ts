import { i18n } from 'translation';
import { Form } from 'utils/LiquidSyntaxToTwig/objects';
import { LiquidSyntaxToTwigError } from '../../Error';
import { toString } from '../../utils/toString';
import { handleFormAttributes, handlePreprocess } from './.utils';

const formSuccess: Form = {
  address1: null,
  address2: null,
  author: null,
  body: null,
  city: null,
  company: null,
  country: null,
  email: null,
  first_name: null,
  id: null,
  last_name: null,
  phone: null,
  posted_successfully: true,
  province: null,
  set_as_default_checkbox: null,
  zip: null,
  password_needed: true,
  errors: null,
};

// Dùng api thay vì form

/**
 * @link https://shopify.dev/api/liquid/tags/theme-tags#form
 * @requires Với liquid đầu vào các tag form: {% form ... %} bắt buộc phải nằm trên 1 dòng mới có thể regex được
 */
export const product = (liquid: string) => {
  return liquid.replace(/{%\s*form.*product.*%}/gm, BOC => {
    const _BOC = handlePreprocess(BOC);
    return _BOC.replace(/{%\s*form.*product.*%}/, value => {
      const form = handleFormAttributes({
        onException: err => {
          return new LiquidSyntaxToTwigError(i18n.t('twig_error.theme_tags.forms.product', { error_signal: toString(err) }));
        },
        lineOfCodeOpenTagForm: value,
        additionAttributes: {
          method: 'post',
          action: '/cart/add',
          enctype: 'multipart/form-data',
        },
      });
      return `
      {% set form = ${JSON.stringify(formSuccess)} %}
      ${form.outerHTML.replace('</form>', '')}
      <input type="hidden" name="form_type" value="product">
      <input type="hidden" name="utf8" value="✓">
      <input type="hidden" name="id" value="variant_id">`;
    });
  });
};
