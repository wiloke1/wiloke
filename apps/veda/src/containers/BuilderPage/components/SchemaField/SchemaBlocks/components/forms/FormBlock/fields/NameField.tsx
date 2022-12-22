import Field from 'components/Field';
import { TextInputDebounce } from 'containers/BuilderPage/components/SchemaField/components/InputDebounced/InputDebounced';
import { useSchemaBlocks } from 'containers/BuilderPage/components/SchemaField/SchemaBlocks/contexts/SchemaBlocksContext';
import { getError } from 'containers/BuilderPage/components/SchemaField/SchemaBlocks/utils';
import { FC } from 'react';
import { i18n } from 'translation';
import { Text } from 'wiloke-react-core';
import { FormBlockProps } from '../FormBlock';

/**
 * Lưu ý: Nếu có update ở đây cần xem xét lại việc file "SchemaField/components/FormSchemaSetting/fields/NameField/NameField.tsx" cũng cần có sự update tương tự
 * Vì các field này gần như là giống nhau nhưng cách update data cũng như data type truyền vào có sự khác nhau nên tách ra và cần xem xét việc update cả 2
 */
export const NameField: FC<FormBlockProps> = ({ blockData, section }) => {
  const { settings } = section.data.schema;
  const { name, id } = blockData;
  const { blocks, editBlock } = useSchemaBlocks();

  const error = getError({
    variant: 'block',
    blockId: id,
    blocks,
    formEditData: blockData,
    settings,
  });

  return (
    <Field label={i18n.t('schema.name')}>
      <TextInputDebounce
        borderColor={error ? 'danger' : undefined}
        value={name}
        block
        onValueChange={value => {
          editBlock({
            blockId: id,
            newData: {
              name: value.replaceAll(' ', '_'),
            },
          });
        }}
      />
      <Text color="danger">
        {error === 'exist'
          ? i18n.t('builderPage.schema.error.existed', { name })
          : error === 'is_shopify_variable'
          ? i18n.t('builderPage.schema.error.is_shopify_variable', { name })
          : ''}
      </Text>
    </Field>
  );
};
