import { i18n } from 'translation';
import { at } from 'utils/at';
import { getBuilderPageReduxStore } from 'utils/getParentStore';
import { LiquidSyntaxToTwigError } from '../../Error';
import { toString } from '../../utils/toString';
import { handleFormAttributes, handlePreprocess } from './.utils';

/**
 * @link https://shopify.dev/api/liquid/tags/theme-tags#form
 * @requires Với liquid đầu vào các tag form: {% form ... %} bắt buộc phải nằm trên 1 dòng mới có thể regex được
 */
export const localization = (liquid: string) => {
  const state = getBuilderPageReduxStore().getState();
  const { localization } = state.liquidVariables.data;
  const currencies = [
    {
      currency: {
        symbol: localization?.country?.currency?.symbol,
        disambiguate_symbol: localization?.country?.currency?.symbol,
        subunit_symbol: null,
        iso_code: localization?.country?.currency?.iso_code,
        iso_numeric: '704',
        name: localization?.country?.currency?.name,
        smallest_denomination: 100,
        subunit_to_unit: 1,
        decimal_mark: ',',
        minor_units: 0,
      },
    },
  ];
  const locales = localization?.available_languages?.map(item => ({
    shop_locale: {
      locale: item?.iso_code,
      enabled: true,
      primary: item?.primary,
      published: true,
    },
  }));
  const form_localization_object = {
    available_currencies: currencies,
    available_locales: locales,
    current_currency: at(currencies, 0),
    current_locale: at(locales ?? [], 0),
    errors: null,
  };
  return liquid.replace(/{%\s*form.*localization.*%}/gm, BOC => {
    const _BOC = handlePreprocess(BOC);
    return _BOC.replace(/{%\s*form.*localization.*%}/, value => {
      const form = handleFormAttributes({
        onException: err => {
          return new LiquidSyntaxToTwigError(i18n.t('twig_error.theme_tags.forms.localization', { error_signal: toString(err) }));
        },
        lineOfCodeOpenTagForm: value,
        additionAttributes: {
          method: 'post',
          action: '/localization',
          id: 'localization_form',
          'accept-charset': 'UTF-8',
          class: 'shopify-localization-form',
          enctype: 'multipart/form-data',
        },
      });
      return `
      {% set form = ${JSON.stringify(form_localization_object)} %}
      ${form.outerHTML.replace('</form>', '')}
      <input type="hidden" name="form_type" value="localization" />
      <input type="hidden" name="utf8" value="✓" />
      <input type="hidden" name="_method" value="put" />
      <input type="hidden" name="return_to" value="/services/liquid_rendering/resource" />
      `;
    });
  });
};
