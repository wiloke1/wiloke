import Field from 'components/Field';
import MyModal from 'components/MyModal';
import { NumberInput } from 'components/NumberInput';
import SelectAntd from 'components/SelectAntd';
import { TextEditor2 } from 'components/TextEditor2';
import TextInput from 'components/TextInput';
import { pageTypeData } from 'containers/BuilderPage/components/ModalSaveForBuilder/utils/pageTypeData';
import withDebounce from 'hocs/withDebounce';
import { FC, useState } from 'react';
import { useSelector } from 'react-redux';
import { PageType } from 'types/Page';
import { UserPlan } from 'types/Plan';
import { View } from 'wiloke-react-core';
import { useCreateUserPlan } from '../store/actions';
import { planSelector, useSetVisibleModalCreatePlan } from '../store/slicePlan';

const DebounceTextInput = withDebounce(TextInput, 'value', 'onValueChange', 300);
const DebounceNumberInput = withDebounce(NumberInput, 'value', 'onValueChange', 300);
const DebounceRichText = withDebounce(TextEditor2, 'value', 'onChange');

export const ModalCreatePlan: FC = () => {
  const { createStatus, visible } = useSelector(planSelector);
  const createPlan = useCreateUserPlan();
  const setVisible = useSetVisibleModalCreatePlan();

  const initState: Omit<UserPlan, 'commandId'> = {
    handle: '',
    numberOfPages: 1,
    numberOfSections: 1,
    pageTypes: ['page', 'article', 'collection', 'product', 'home'],
    price: 0,
    trialDays: 1,
    description: '',
    name: '',
    allowedThemeAtomCommandIds: [],
    yearlyPrice: 0,
  };

  const [fieldsForm, setFieldsForm] = useState<Omit<UserPlan, 'commandId'>>(initState);
  const [requireFieldError, setRequireFieldError] = useState({
    handle: '',
    price: '',
    trialDays: '',
    name: '',
  });

  const handleCancel = () => {
    setVisible(false);
    setFieldsForm(initState);
  };

  const handleCreate = () => {
    if (fieldsForm.handle === '' || fieldsForm.name === '') {
      setRequireFieldError(prev => ({
        ...prev,
        handle: 'The handle is require!',
        name: 'The name is require!',
      }));
    } else {
      createPlan.request({
        data: {
          ...fieldsForm,
          pageTypes: fieldsForm.pageTypes.map(item => item.toUpperCase() as PageType),
        },
        onFulfill: () => {
          setFieldsForm(initState);
        },
      });
    }
  };

  return (
    <MyModal
      headerText="Plan Form"
      isVisible={visible}
      size="medium"
      onCancel={handleCancel}
      onOk={handleCreate}
      isLoading={createStatus === 'loading'}
    >
      <Field label="Name">
        <DebounceTextInput
          value={fieldsForm.name}
          block
          borderWidth={1}
          borderColor={!!requireFieldError.name ? 'danger' : 'gray3'}
          sizeInput="medium"
          radius={4}
          onValueChange={val => {
            if (val) {
              setRequireFieldError(prev => ({
                ...prev,
                name: '',
              }));
            } else {
              setRequireFieldError(prev => ({
                ...prev,
                name: 'The name is require!',
              }));
            }

            setFieldsForm(prev => ({
              ...prev,
              name: val,
            }));
          }}
        />
        {requireFieldError.name ? (
          <View tagName="span" color="danger">
            {requireFieldError.name}
          </View>
        ) : null}
      </Field>

      <Field label="Handle">
        <DebounceTextInput
          value={fieldsForm.handle}
          block
          borderWidth={1}
          borderColor={!!requireFieldError.handle ? 'danger' : 'gray3'}
          sizeInput="medium"
          radius={4}
          onValueChange={val => {
            if (val) {
              setRequireFieldError(prev => ({
                ...prev,
                handle: '',
              }));
            } else {
              setRequireFieldError(prev => ({
                ...prev,
                handle: 'The handle is require!',
              }));
            }

            setFieldsForm(prev => ({
              ...prev,
              handle: val,
            }));
          }}
        />
        {requireFieldError.handle ? (
          <View tagName="span" color="danger">
            {requireFieldError.handle}
          </View>
        ) : null}
      </Field>

      <Field label="Price per month">
        <DebounceNumberInput
          value={fieldsForm.price}
          min={1}
          max={1000}
          block
          borderWidth={1}
          borderColor={!!requireFieldError.price ? 'danger' : 'gray3'}
          sizeInput="medium"
          radius={4}
          clearEnabled
          onValueChange={val => {
            if (val) {
              setRequireFieldError(prev => ({
                ...prev,
                price: '',
              }));
            } else {
              setRequireFieldError(prev => ({
                ...prev,
                price: 'The price is require!',
              }));
            }
            setFieldsForm(prev => ({
              ...prev,
              price: val ?? 0,
            }));
          }}
        />
        {requireFieldError.price ? (
          <View tagName="span" color="danger">
            {requireFieldError.price}
          </View>
        ) : null}
      </Field>

      <Field label="Price per year">
        <DebounceNumberInput
          min={0}
          max={1000}
          value={fieldsForm.yearlyPrice}
          block
          borderWidth={1}
          borderColor={'gray3'}
          sizeInput="medium"
          radius={4}
          clearEnabled
          onValueChange={val => {
            setFieldsForm(prev => ({
              ...prev,
              yearlyPrice: val ?? 0,
            }));
          }}
        />
      </Field>

      <Field label="Trial days">
        <DebounceNumberInput
          min={1}
          max={1000}
          value={fieldsForm.trialDays}
          block
          borderWidth={1}
          borderColor={!!requireFieldError.trialDays ? 'danger' : 'gray3'}
          sizeInput="medium"
          radius={4}
          clearEnabled
          onValueChange={val => {
            if (val && val > 0) {
              setRequireFieldError(prev => ({
                ...prev,
                trialDays: '',
              }));
            } else {
              setRequireFieldError(prev => ({
                ...prev,
                trialDays: 'The trialDays must be greater than zero!',
              }));
            }

            setFieldsForm(prev => ({
              ...prev,
              trialDays: val ?? 0,
            }));
          }}
        />
        {requireFieldError.trialDays ? (
          <View tagName="span" color="danger">
            {requireFieldError.trialDays}
          </View>
        ) : null}
      </Field>

      <Field label="Page types">
        <SelectAntd
          mode="multiple"
          value={fieldsForm.pageTypes}
          data={pageTypeData}
          onChange={val => {
            setFieldsForm(prev => ({
              ...prev,
              pageTypes: val,
            }));
          }}
        />
      </Field>

      <Field label="Number of pages">
        <DebounceNumberInput
          min={1}
          max={1000}
          value={fieldsForm.numberOfPages}
          block
          borderWidth={1}
          borderColor="gray3"
          sizeInput="medium"
          radius={4}
          clearEnabled
          onValueChange={val => {
            setFieldsForm(prev => ({
              ...prev,
              numberOfPages: val ?? 0,
            }));
          }}
        />
      </Field>

      <Field label="Number of sections">
        <DebounceNumberInput
          min={1}
          max={1000}
          value={fieldsForm.numberOfSections}
          block
          borderWidth={1}
          borderColor="gray3"
          sizeInput="medium"
          radius={4}
          clearEnabled
          onValueChange={val => {
            setFieldsForm(prev => ({
              ...prev,
              numberOfSections: val ?? 0,
            }));
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
