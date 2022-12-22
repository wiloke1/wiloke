import { i18n } from 'translation';
import { Form } from 'utils/LiquidSyntaxToTwig/objects';
import { LiquidSyntaxToTwigError } from '../../Error';
import { toString } from '../../utils/toString';
import { handleFormAttributes, handlePreprocess } from './.utils';

// NOTE: Chỉ có thể fake. Mọi dữ liệu không thể đúng hoàn toàn
// const formError: Form = {
//   address1: null,
//   address2: null,
//   author: null,
//   body: null,
//   city: null,
//   company: null,
//   country: null,
//   email: null,
//   first_name: null,
//   id: null,
//   last_name: null,
//   phone: null,
//   posted_successfully: false,
//   province: null,
//   set_as_default_checkbox: null,
//   zip: null,
//   password_needed: true,
//   errors: {
//     messages: {
//       form: 'No account found with that email',
//     },
//     translated_fields: {
//       form: 'form',
//     },
//   },
// };

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

/**
 * @link https://shopify.dev/api/liquid/tags/theme-tags#form
 * @requires Với liquid đầu vào các tag form: {% form ... %} bắt buộc phải nằm trên 1 dòng mới có thể regex được
 */
export const recover_customer_password = (liquid: string) => {
  return liquid.replace(/{%\s*form.*recover_customer_password.*%}/gm, BOC => {
    const _BOC = handlePreprocess(BOC);
    return _BOC.replace(/{%\s*form.*recover_customer_password.*%}/, value => {
      const form = handleFormAttributes({
        onException: err => {
          return new LiquidSyntaxToTwigError(i18n.t('twig_error.theme_tags.forms.recover_customer_password', { error_signal: toString(err) }));
        },
        lineOfCodeOpenTagForm: value,
        additionAttributes: {
          method: 'post',
          action: '/account/recover',
          'accept-charset': 'UTF-8',
        },
      });
      return `
      {% set form = ${JSON.stringify(formSuccess)} %}
      ${form.outerHTML.replace('</form>', '')}
      <input name="form_type" type="hidden" value="recover_customer_password" />
      <input name="utf8" type="hidden" value="✓" />`;
    });
  });
};
