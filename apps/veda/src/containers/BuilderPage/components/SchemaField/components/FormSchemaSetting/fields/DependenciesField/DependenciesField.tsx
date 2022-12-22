import Field from 'components/Field';
import { TextInputDebounce } from 'containers/BuilderPage/components/SchemaField/components/InputDebounced/InputDebounced';
import Tooltip from 'components/Tooltip';
import { FC, useMemo } from 'react';
import { i18n } from 'translation';
import { FontAwesome, Text, View } from 'wiloke-react-core';
import { FormSchemaSettingProps } from '../../type';

/**
 * Lưu ý: Nếu có update ở đây cần xem xét lại việc file "SchemaField/SchemaBlocks/components/forms/FormBlock/fields/DependenciesField/DependenciesField.tsx" cũng cần có sự update tương tự
 * Vì các field này gần như là giống nhau nhưng cách update data cũng như data type truyền vào có sự khác nhau nên tách ra và cần xem xét việc update cả 2
 */
export const DependenciesField: FC<FormSchemaSettingProps> = ({ data, onChange }) => {
  const { deps } = useMemo(() => data, [data]);

  const handleChange = (value: string) => {
    onChange?.({
      deps: value,
    });
  };

  const clear = () => {
    onChange?.({ deps: '' });
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
