import Field from 'components/Field';
import MyModal from 'components/MyModal';
import { NumberInput } from 'components/NumberInput';
import Radio from 'components/Radio';
import SingleDatePicker from 'components/SingleDatePicker';
import { TextEditor2 } from 'components/TextEditor2';
import TextInput from 'components/TextInput';
import withDebounce from 'hocs/withDebounce';
import { useSelector } from 'react-redux';
import { useUpdateCoupon } from '../store/actions';

import { couponSelector, useEditCoupon } from '../store/sliceCoupon';

const DebounceTextInput = withDebounce(TextInput, 'value', 'onValueChange', 300);
const DebounceNumberInput = withDebounce(NumberInput, 'value', 'onValueChange', 300);
const DebounceRichText = withDebounce(TextEditor2, 'value', 'onChange');

export const ModalEditCoupon: React.FC = () => {
  const { editCoupon, updateStatus } = useSelector(couponSelector);
  const setEditCoupon = useEditCoupon();
  const updateCoupon = useUpdateCoupon();

  if (!editCoupon) {
    return null;
  }

  const handleOk = () => {
    updateCoupon.request({ ...editCoupon });
  };

  const handleCancel = () => {
    setEditCoupon(undefined);
  };

  return (
    <MyModal
      headerText="Coupon Form"
      isVisible
      size="medium"
      onCancel={handleCancel}
      onOk={handleOk}
      isLoading={updateStatus[editCoupon.commandId] === 'loading'}
    >
      <Field label="Code">
        <DebounceTextInput
          block
          borderWidth={1}
          borderColor={'gray3'}
          sizeInput="medium"
          radius={4}
          value={editCoupon.code}
          onValueChange={val => {
            setEditCoupon({
              ...editCoupon,
              code: val,
            });
          }}
        />
      </Field>
      <Field label="Discount type">
        <Radio.Group
          value={editCoupon.type}
          onChangeValue={val => {
            setEditCoupon({
              ...editCoupon,
              type: val as any,
            });
          }}
        >
          <Radio.Button value="FIXED">Tiền tươi</Radio.Button>
          <Radio.Button value="PERCENTAGE">Phần trăm</Radio.Button>
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
          value={editCoupon.number}
          onValueChange={val => {
            setEditCoupon({
              ...editCoupon,
              number: val ?? 0,
            });
          }}
        />
      </Field>
      <Field label={'Expire on'}>
        <SingleDatePicker
          date={new Date(editCoupon.expiredOn)}
          onChange={val => {
            if (!!val) {
              setEditCoupon({
                ...editCoupon,
                expiredOn: val,
              });
            }
          }}
        />
      </Field>
      <Field label="Description">
        <DebounceRichText
          value={editCoupon.description}
          onChange={html => {
            setEditCoupon({
              ...editCoupon,
              description: html,
            });
          }}
        />
      </Field>
    </MyModal>
  );
};
