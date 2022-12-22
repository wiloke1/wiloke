import Field from 'components/Field';
import FieldGroup from 'components/FieldGroup';
import { FC } from 'react';
import { i18n } from 'translation';
import { AnimateField } from './AnimateField';
import { Animate } from './types';

export interface AnimateInOutValue {
  in: Animate;
  out: Animate;
}

export interface AnimateInOutFieldProps {
  label: string;
  summary?: string;
  value: AnimateInOutValue;
  onChange?: (value: AnimateInOutValue) => void;
}

export const AnimateInOutField: FC<AnimateInOutFieldProps> = ({ label, summary, value, onChange }) => {
  return (
    <FieldGroup label={label} summary={summary}>
      <Field label={i18n.t('builderPage.in', { textTransform: 'capitalize' })}>
        <AnimateField
          value={value.in}
          onChange={(val: Animate) =>
            onChange?.({
              ...value,
              in: val,
            })
          }
        />
      </Field>
      <Field label={i18n.t('builderPage.out', { textTransform: 'capitalize' })}>
        <AnimateField
          value={value.out}
          onChange={(val: Animate) =>
            onChange?.({
              ...value,
              out: val,
            })
          }
        />
      </Field>
    </FieldGroup>
  );
};
