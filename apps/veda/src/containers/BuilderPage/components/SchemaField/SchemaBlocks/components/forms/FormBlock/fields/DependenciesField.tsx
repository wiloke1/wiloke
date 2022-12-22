import Field from 'components/Field';
import { TextInputDebounce } from 'containers/BuilderPage/components/SchemaField/components/InputDebounced/InputDebounced';
import { useSchemaBlocks } from 'containers/BuilderPage/components/SchemaField/SchemaBlocks/contexts/SchemaBlocksContext';
import Tooltip from 'components/Tooltip';
import { FC, useMemo } from 'react';
import { i18n } from 'translation';
import { FontAwesome, Text, View } from 'wiloke-react-core';
import { FormBlockProps } from '../FormBlock';

/**
 * Lưu ý: Nếu có update ở đây cần xem xét lại việc file "SchemaField/components/FormSchemaSetting/fields/DependenciesField/DependenciesField.tsx" cũng cần có sự update tương tự
 * Vì các field này gần như là giống nhau nhưng cách update data cũng như data type truyền vào có sự khác nhau nên tách ra và cần xem xét việc update cả 2
 */
export const DependenciesField: FC<FormBlockProps> = ({ blockData }) => {
  const { editBlock } = useSchemaBlocks();

  const { id, deps } = useMemo(() => blockData, [blockData]);

  const handleChange = (value: string) => {
    editBlock({
      blockId: id,
      newData: { deps: value },
    });
  };

  const clear = () => {
    editBlock({
      blockId: id,
      newData: { deps: '' },
    });
  };

  return (
    <Field
      label={
        <View css={{ display: 'flex' }}>
          <Text>{i18n.t('schema.conditions')}</Text>
          <Tooltip text={i18n.t('schema.clear_conditions')}>
            <FontAwesome colorHover="primary" type="fas" name="eraser" size={14} css={{ padding: '2px 4px', cursor: 'pointer' }} onClick={clear} />
          </Tooltip>
        </View>
      }
    >
      <TextInputDebounce
        block
        placeholder="setting_name === something or block_name.child_name === something"
        value={deps ?? ''}
        onValueChange={handleChange}
      />
    </Field>
  );
};
