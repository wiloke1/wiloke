import Field from 'components/Field';
import MyModal from 'components/MyModal';
import { NumberInput } from 'components/NumberInput';
import SelectAntd from 'components/SelectAntd';
import { TextEditor2 } from 'components/TextEditor2';
import TextInput from 'components/TextInput';
import { pageTypeData } from 'containers/BuilderPage/components/ModalSaveForBuilder/utils/pageTypeData';
import withDebounce from 'hocs/withDebounce';
import { useSelector } from 'react-redux';
import { useUpdateUserPlan } from '../store/actions';
import { planSelector, useSetEditPlan } from '../store/slicePlan';

const DebounceTextInput = withDebounce(TextInput, 'value', 'onValueChange', 300);
const DebounceNumberInput = withDebounce(NumberInput, 'value', 'onValueChange', 300);
const DebounceRichText = withDebounce(TextEditor2, 'value', 'onChange');

export const ModalEditPlan = () => {
  const { editPlan, updateStatus } = useSelector(planSelector);

  const setEditPlan = useSetEditPlan();
  const updateUserPlan = useUpdateUserPlan();

  if (!editPlan) {
    return null;
  }

  const onUpdate = () => {
    updateUserPlan.request(editPlan);
  };

  const handleCancel = () => {
    setEditPlan(undefined);
  };

  return (
    <MyModal
      headerText="Plan Form"
      size="medium"
      isVisible
      onCancel={handleCancel}
      onOk={onUpdate}
      isLoading={updateStatus[editPlan.commandId] === 'loading'}
    >
      <Field label="Name">
        <DebounceTextInput
          value={editPlan.name}
          block
          borderWidth={1}
          borderColor="gray3"
          sizeInput="medium"
          radius={4}
          onValueChange={val => {
            setEditPlan({
              ...editPlan,
              name: val,
            });
          }}
        />
      </Field>
      <Field label="Handle">
        <DebounceTextInput
          value={editPlan.handle}
          block
          borderWidth={1}
          borderColor="gray3"
          sizeInput="medium"
          radius={4}
          onValueChange={val => {
            setEditPlan({
              ...editPlan,
              handle: val,
            });
          }}
        />
      </Field>
      <Field label="Price per month">
        <DebounceNumberInput
          min={0}
          max={1000}
          value={editPlan.price}
          block
          borderWidth={1}
          borderColor="gray3"
          sizeInput="medium"
          radius={4}
          onValueChange={val => {
            setEditPlan({
              ...editPlan,
              price: val ?? 0,
            });
          }}
        />
      </Field>
      <Field label="Price per year">
        <DebounceNumberInput
          min={0}
          max={1000}
          value={editPlan.yearlyPrice}
          block
          borderWidth={1}
          borderColor="gray3"
          sizeInput="medium"
          radius={4}
          onValueChange={val => {
            setEditPlan({
              ...editPlan,
              yearlyPrice: val ?? 0,
            });
          }}
        />
      </Field>
      <Field label="Trial Days">
        <DebounceNumberInput
          min={1}
          max={1000}
          value={editPlan.trialDays}
          block
          borderWidth={1}
          borderColor="gray3"
          sizeInput="medium"
          radius={4}
          onValueChange={val => {
            setEditPlan({
              ...editPlan,
              trialDays: val ?? 0,
            });
          }}
        />
      </Field>
      <Field label="Number of Pages">
        <DebounceNumberInput
          min={1}
          max={1000}
          value={editPlan.numberOfPages}
          block
          borderWidth={1}
          borderColor="gray3"
          sizeInput="medium"
          radius={4}
          onValueChange={val => {
            setEditPlan({
              ...editPlan,
              numberOfPages: val ?? 0,
            });
          }}
        />
      </Field>
      <Field label="Number of Sections">
        <DebounceNumberInput
          min={1}
          max={1000}
          value={editPlan.numberOfSections}
          block
          borderWidth={1}
          borderColor="gray3"
          sizeInput="medium"
          radius={4}
          onValueChange={val => {
            setEditPlan({
              ...editPlan,
              numberOfSections: val ?? 0,
            });
          }}
        />
      </Field>
      <Field label="Page Types">
        <SelectAntd
          mode="multiple"
          value={editPlan.pageTypes}
          data={pageTypeData}
          onChange={val => {
            setEditPlan({
              ...editPlan,
              pageTypes: val,
            });
          }}
        />
      </Field>

      <Field label="Description">
        <DebounceRichText
          value={editPlan.description}
          onChange={val => {
            setEditPlan({
              ...editPlan,
              description: val,
            });
          }}
        />
      </Field>
    </MyModal>
  );
};
