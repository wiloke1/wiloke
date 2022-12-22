import Field from 'components/Field';
import MyModal from 'components/MyModal';
import TextInput from 'components/TextInput';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { i18n } from 'translation';
import { useValidateCoupon } from './store/actions';
import { couponSelector, useSetValidateCouponVisible } from './store/sliceCoupon';

// Todo: i18n
export const ValidateCoupon: React.FC = () => {
  const { visibleValidate } = useSelector(couponSelector);

  const setValidateVisible = useSetValidateCouponVisible();
  const validateCoupon = useValidateCoupon();

  const [coupon, setCoupon] = useState('');

  const handleOk = () => {
    validateCoupon.request({
      couponCode: coupon,
      planHandle: 'free',
    });
  };

  const handleCancel = () => {
    setValidateVisible(false);
  };

  return (
    <MyModal
      headerText="Enter your coupon"
      size="small"
      isVisible={visibleValidate}
      onCancel={handleCancel}
      okText={i18n.t('general.confirm')}
      onOk={handleOk}
    >
      <Field css={{ marginBottom: '0' }}>
        <TextInput block value={coupon} onValueChange={setCoupon} />
      </Field>
    </MyModal>
  );
};
