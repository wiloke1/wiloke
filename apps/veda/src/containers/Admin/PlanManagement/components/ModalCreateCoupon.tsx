import Field from 'components/Field';
import MyModal from 'components/MyModal';
import { NumberInput } from 'components/NumberInput';
import Radio from 'components/Radio';
import SingleDatePicker from 'components/SingleDatePicker';
import { TextEditor2 } from 'components/TextEditor2';
import TextInput from 'components/TextInput';
import withDebounce from 'hocs/withDebounce';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { Coupon } from 'types/Coupon';
import { useCreateCoupon } from '../store/actions';
import { couponSelector, useSetVisibleModalCoupon } from '../store/sliceCoupon';

const DebounceTextInput = withDebounce(TextInput, 'value', 'onValueChange', 300);
const DebounceNumberInput = withDebounce(NumberInput, 'value', 'onValueChange', 300);
const DebounceRichText = withDebounce(TextEditor2, 'value', 'onChange');

const initFormValue: Omit<Coupon, 'commandId'> = {
  applyTo: [],
  code: '',
  description: '',
  expiredOn: '',
  number: 0,
  type: 'FIXED',
};

export const ModalCreateCoupon = () => {
  const { visible, createStatus } = useSelector(couponSelector);
  const setVisible = useSetVisibleModalCoupon();
  const createCoupont = useCreateCoupon();

  const [fieldsForm, setFieldsForm] = useState(initFormValue);

  const handleOk = () => {
    createCoupont.request({
      coupon: {
        ...fieldsForm,
        commandId: '',
      },
      onFulFill: () => {
        setFieldsForm(initFormValue);
      },
    });
  };

  const handleCancel = () => {
    setVisible(false);
  };

  return (
    <MyModal
      headerText="Coupon Form"
      isVisible={visible}
      size="medium"
      onCancel={handleCancel}
      onOk={handleOk}
      isLoading={createStatus === 'loading'}
    >
      <Field label="Code">
        <DebounceTextInput
          block
          borderWidth={1}
          borderColor={'gray3'}
          sizeInput="medium"
          radius={4}
          value={fieldsForm.code}
          onValueChange={val => {
            setFieldsForm(prev => ({
              ...prev,
              code: val,
            }));
          }}
        />
      </Field>
      <Field label="Discount type">
        <Radio.Group
          value={fieldsForm.type}
          onChangeValue={val => {
            setFieldsForm(prev => ({
              ...prev,
              type: val as any,
            }));
          }}
        >
          <Radio.Button value="FIXED">Cash</Radio.Button>
          <Radio.Button value="PERCENTAGE">Percentage</Radio.Button>
          <Radio.Button value="TRAILING">Trial days</Radio.Button>
          <Radio.Button disabled value="START_WITH_ONE_DOLLAR">
            Start with 1$(tạm thời chưa làm)
          </Radio.Button>
        </Radio.Group>
      </Field>
      <Field label={'Discount'}>
        <DebounceNumberInput
          min={0}
          max={100}
          block
          borderWidth={1}
          borderColor="gray3"
          sizeInput="medium"
          radius={4}
          clearEnabled
          value={fieldsForm.number}
          onValueChange={val => {
            setFieldsForm(prev => ({
              ...prev,
              number: val ?? 0,
            }));
          }}
        />
      </Field>
      <Field label={'Expire on'}>
        <SingleDatePicker
          date={fieldsForm.expiredOn === '' ? null : ((fieldsForm.expiredOn as unknown) as Date)}
          onChange={val => {
            if (!!val) {
              setFieldsForm(prev => ({
                ...prev,
                expiredOn: val,
              }));
            }
          }}
        />
      </Field>
      <Field label="Description">
        <DebounceRichText
          value={fieldsForm.description}
          onChange={html => {
            setFieldsForm(prev => ({
              ...prev,
              description: html,
            }));
          }}
        />
      </Field>
    </MyModal>
  );
};
