import { i18n } from 'translation';
import { Form } from 'utils/LiquidSyntaxToTwig/objects';
import { LiquidSyntaxToTwigError } from '../../Error';
import { toString } from '../../utils/toString';
import { handleFormAttributes, handlePreprocess } from './.utils';

// // NOTE: Chỉ có thể fake. Mọi dữ liệu không thể đúng hoàn toàn
// const formError: Form = {
//   address1: 'address1',
//   address2: 'address2',
//   author: 'author',
//   body: 'body',
//   city: 'city',
//   company: 'company',
//   country: 'country',
//   email: 'email',
//   first_name: 'first_name',
//   id: 0,
//   last_name: 'last_name',
//   phone: 'phone',
//   posted_successfully: false,
//   province: 'province',
//   set_as_default_checkbox: null,
//   zip: 'zip',
//   password_needed: null,
//   errors: {
//     messages: {
//       country: 'is not a valid country',
//     },
//     translated_fields: {
//       country: 'country',
//     },
//   },
// };

// // NOTE: Chỉ có thể fake. Mọi dữ liệu không thể đúng hoàn toàn
const formSuccess: Form = {
  address1: 'address1',
  address2: 'address2',
  author: 'author',
  body: 'body',
  city: 'city',
  company: 'company',
  country: 'country',
  email: 'email',
  first_name: 'first_name',
  id: 0,
  last_name: 'last_name',
  phone: 'phone',
  posted_successfully: true,
  province: 'province',
  set_as_default_checkbox: null,
  zip: 'zip',
  password_needed: null,
  errors: null,
};

/**
 * @link https://shopify.dev/api/liquid/tags/theme-tags#form
 * @requires Với liquid đầu vào các tag form: {% form ... %} bắt buộc phải nằm trên 1 dòng mới có thể regex được
 */
export const customer_address = (liquid: string) => {
  return liquid.replace(/{%\s*form.*customer_address.*%}/gm, BOC => {
    const _BOC = handlePreprocess(BOC);
    // Lấy ra những dòng code {% form ... %}
    return _BOC.replace(/{%\s*form.*customer_address.*%}/, value => {
      const form = handleFormAttributes({
        onException: err => {
          return new LiquidSyntaxToTwigError(i18n.t('twig_error.theme_tags.forms.create_customer', { error_signal: toString(err) }));
        },
        lineOfCodeOpenTagForm: value,
        additionAttributes: {
          method: 'post',
          action: '/account',
          'accept-charset': 'UTF-8',
          id: 'customer_address',
        },
      });
      return `
      {% set form = ${JSON.stringify(formSuccess)} %}
      ${form.outerHTML.replace('</form>', '')}
      <input name="form_type" type="hidden" value="customer_address" />
      <input name="utf8" type="hidden" value="✓" />`;
    });
  });
};
