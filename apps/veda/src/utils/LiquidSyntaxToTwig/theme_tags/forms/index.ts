import { i18n } from 'translation';
import { LiquidSyntaxToTwigError } from 'utils/LiquidSyntaxToTwig/Error';
import { getBOCsBetweenSomething } from 'utils/LiquidSyntaxToTwig/utils/getBOCsBetweenSomething';
import { activate_customer_password } from './activate_customer_password';
import { cart } from './cart';
import { contact } from './contact';
import { create_customer } from './create_customer';
import { currency } from './currency-deprecated';
import { customer } from './customer';
import { customer_address } from './customer_address';
import { customer_login } from './customer_login';
import { guest_login } from './guest_login';
import { localization } from './localization';
import { new_comment } from './new_comment';
import { product } from './product';
import { recover_customer_password } from './recover_customer_password';
import { reset_customer_password } from './reset_customer_password';
import { payment_button } from './special_html_filters/payment_button';
import { payment_terms } from './special_html_filters/payment_terms';
import { storefront_password } from './storefront_password';

export const form = (liquid: string) => {
  const START_BOC = new RegExp(/{%\s*form/);
  const END_BOC = new RegExp(/{%\s*endform\s*%}/);
  // @tuong -> cái này không quan trọng xử lí từ khối con trước hay khối tổng thể vì tag form tạm thời không thể viết nested
  let BOCs = getBOCsBetweenSomething({ liquid, startBOC: START_BOC, endBOC: END_BOC, ignoreNested: true });
  let _liquid = liquid;
  while (!!BOCs.length) {
    const BOC = BOCs.shift() as string;

    // FIXME: shopify cho phép viết nested form
    const BOCForValidate = BOC.replace(/(^.|.$)/g, '');
    if (START_BOC.test(BOCForValidate) || END_BOC.test(BOCForValidate)) {
      throw new LiquidSyntaxToTwigError(i18n.t('twig_error.exception_of_code_liquid.nested_form', { error_signal: BOC }));
    }

    let _BOC = BOC;
    _BOC = activate_customer_password(_BOC);
    _BOC = cart(_BOC);
    _BOC = contact(_BOC);
    _BOC = create_customer(_BOC);
    _BOC = currency(_BOC);
    _BOC = customer(_BOC);
    _BOC = customer_address(_BOC);
    _BOC = customer_login(_BOC);
    _BOC = guest_login(_BOC);
    _BOC = localization(_BOC);
    _BOC = new_comment(_BOC);
    _BOC = payment_button(_BOC);
    _BOC = payment_terms(_BOC);
    _BOC = product(_BOC);
    _BOC = recover_customer_password(_BOC);
    _BOC = reset_customer_password(_BOC);
    _BOC = storefront_password(_BOC);

    // .replaceAll thay vì .replace để replace hết các BOC giống nhau luôn
    _liquid = _liquid.replaceAll(BOC, _BOC);
    BOCs = BOCs.map(item => item.replaceAll(BOC, _BOC));
  }

  return _liquid.replace(/{%\s*endform\s*%}/gm, '</form>');
};
