import Field from 'components/Field';
import { I18nComponent } from 'containers/BuilderPage/components/SchemaField/components/I18nComponent/I18nComponent';
import { TextInputDebounce } from 'containers/BuilderPage/components/SchemaField/components/InputDebounced/InputDebounced';
import { useSchemaBlocks } from 'containers/BuilderPage/components/SchemaField/SchemaBlocks/contexts/SchemaBlocksContext';
import { FC, useState } from 'react';
import { getLocale, i18n } from 'translation';
import { SettingHelpText } from 'types/Schema';
import { getLabel } from 'utils/functions/getLabel';
import { FontAwesome, Text, View } from 'wiloke-react-core';
import { FormBlockProps } from '../FormBlock';

/**
 *  Lưu ý: Nếu có update ở đây cần xem xét lại việc file "SchemaField/components/FormSchemaSetting/fields/HelpTextField/HelpTextField.tsx" cũng cần có sự update tương tự
 * Vì các field này gần như là giống nhau nhưng cách update data cũng như data type truyền vào có sự khác nhau nên tách ra và cần xem xét việc update cả 2
 */
export const HelpTextField: FC<FormBlockProps> = ({ blockData }) => {
  const { summary = '', id } = blockData;
  const { editBlock } = useSchemaBlocks();
  const _locale = getLocale();
  const [modalVisible, setModalVisible] = useState(false);

  const _handleHelpTextChange = (value: string) => {
    editBlock({
      blockId: id,
      newData: {
        ...(typeof summary === 'string'
          ? {
              summary: value,
            }
          : {
              summary: Object.keys(summary).reduce<Exclude<SettingHelpText, string>>((res, key) => {
                if (typeof summary === 'object') {
                  return { ...res, [key]: summary[key] === summary[_locale] ? value : summary[key] };
                }
                return res;
              }, {}),
            }),
      },
    });
  };

  return (
    <Field
      label={
        <View css={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }} colorHover="primary" onClick={() => setModalVisible(true)}>
          <Text>{i18n.t('schema.summary')}</Text>
          <FontAwesome
            color={typeof summary === 'string' ? undefined : 'primary'}
            colorHover="inherit"
            type="far"
            name="language"
            size={18}
            css={{ marginLeft: '4px' }}
          />
        </View>
      }
    >
      <TextInputDebounce block value={getLabel(summary)} onValueChange={_handleHelpTextChange} />
      <I18nComponent
        label={summary}
        isVisible={modalVisible}
        onCancel={() => setModalVisible(false)}
        onOk={() => setModalVisible(false)}
        onResult={value => {
          editBlock({
            blockId: id,
            newData: { summary: value },
          });
        }}
      />
    </Field>
  );
};
