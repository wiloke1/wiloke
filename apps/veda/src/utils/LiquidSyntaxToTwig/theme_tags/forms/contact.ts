import { i18n } from 'translation';
import { Form } from 'utils/LiquidSyntaxToTwig/objects';
import { LiquidSyntaxToTwigError } from '../../Error';
import { toString } from '../../utils/toString';
import { handleFormAttributes, handlePreprocess } from './.utils';

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
  password_needed: false,
  phone: 'phone',
  posted_successfully: true,
  province: 'province',
  set_as_default_checkbox: '<input type="checkbox" id="address_default_address_7847798472957" name="address[default]" value="1">',
  zip: 'zip',
  errors: null,
};

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
//   password_needed: false,
//   phone: 'phone',
//   posted_successfully: false,
//   province: 'province',
//   set_as_default_checkbox: '<input type="checkbox" id="address_default_address_7847798472957" name="address[default]" value="1">',
//   zip: 'zip',
//   errors: {
//     messages: {
//       email: 'is invalid',
//     },
//     translated_fields: {
//       email: 'email',
//     },
//   },
// };

/**
 * @link https://shopify.dev/api/liquid/tags/theme-tags#form
 * @requires Với liquid đầu vào các tag form: {% form ... %} bắt buộc phải nằm trên 1 dòng mới có thể regex được
 */
export const contact = (liquid: string) => {
  return liquid.replace(/{%\s*form.*contact.*%}/gm, BOC => {
    const _BOC = handlePreprocess(BOC);
    return _BOC.replace(/{%\s*form.*contact.*%}/, value => {
      const form = handleFormAttributes({
        onException: err => {
          return new LiquidSyntaxToTwigError(i18n.t('twig_error.theme_tags.forms.contact', { error_signal: toString(err) }));
        },
        lineOfCodeOpenTagForm: value,
        additionAttributes: {
          method: 'post',
          action: '/contact',
          'accept-charset': 'UTF-8',
          class: 'contact-form',
        },
      });
      return `
      {% set form = ${JSON.stringify(formSuccess)} %}
      ${form.outerHTML.replace('</form>', '')}
      <input name="form_type" type="hidden" value="contact" />
      <input name="utf8" type="hidden" value="✓" />`;
    });
  });
};
