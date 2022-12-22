import Field from 'components/Field';
import { TextInputDebounce } from 'containers/BuilderPage/components/SchemaField/components/InputDebounced/InputDebounced';
import { FC } from 'react';
import { i18n } from 'translation';
import { Text } from 'wiloke-react-core';
import { FormSchemaSettingProps } from '../../type';

/**
 * Lưu ý: Nếu có update ở đây cần xem xét lại việc file "SchemaField/SchemaBlocks/components/forms/FormBlock/fields/NameField/NameField.tsx" cũng cần có sự update tương tự
 * Vì các field này gần như là giống nhau nhưng cách update data cũng như data type truyền vào có sự khác nhau nên tách ra và cần xem xét việc update cả 2
 */
export const NameField: FC<FormSchemaSettingProps> = ({ data, onChange, error }) => {
  const Error = (
    <Text color="danger">
      {error === 'exist'
        ? i18n.t('builderPage.schema.error.existed', { name: data.name })
        : error === 'is_shopify_variable'
        ? i18n.t('builderPage.schema.error.is_shopify_variable', { name: data.name })
        : ''}
    </Text>
  );

  return (
    <Field label={i18n.t('schema.name')}>
      <TextInputDebounce
        borderColor={error ? 'danger' : undefined}
        value={data.name}
        block
        onValueChange={value => {
          onChange?.({ name: value.replaceAll(' ', '_') });
        }}
      />
      {Error}
    </Field>
  );
};
