import Field from 'components/Field';
import { I18nComponent } from 'containers/BuilderPage/components/SchemaField/components/I18nComponent/I18nComponent';
import { FC, useState } from 'react';
import { getLocale, i18n } from 'translation';
import { SettingHelpText } from 'types/Schema';
import { FontAwesome, Text, View } from 'wiloke-react-core';
import { TextInputDebounce } from '../../../InputDebounced/InputDebounced';
import { FormSchemaSettingProps } from '../../type';
import * as styles from './styles';

/**
 * Lưu ý: Nếu có update ở đây cần xem xét lại việc file "SchemaField/SchemaBlocks/components/forms/FormBlock/fields/HelpTextField/HelpTextField.tsx" cũng cần có sự update tương tự
 * Vì các field này gần như là giống nhau nhưng cách update data cũng như data type truyền vào có sự khác nhau nên tách ra và cần xem xét việc update cả 2
 */
export const HelpTextField: FC<FormSchemaSettingProps> = ({ data, onChange }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const _locale = getLocale();
  const { summary = '' } = data;

  const _handleInputChange = (value: string) => {
    const _summary =
      typeof summary === 'string'
        ? { summary: value }
        : {
            summary: Object.keys(summary).reduce<Exclude<SettingHelpText, string>>((res, key) => {
              if (typeof summary === 'object') {
                return { ...res, [key]: summary[key] === summary[_locale] ? value : summary[key] };
              }
              return res;
            }, {}),
          };
    onChange?.({ ..._summary });
  };

  return (
    <Field
      label={
        <View css={styles.label} colorHover="primary" onClick={() => setModalVisible(true)}>
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
      <TextInputDebounce block value={typeof summary === 'string' ? summary : summary[_locale]} onValueChange={_handleInputChange} />
      <I18nComponent
        label={summary}
        isVisible={modalVisible}
        onCancel={() => setModalVisible(false)}
        onOk={() => setModalVisible(false)}
        onResult={value => {
          onChange?.({ summary: value });
        }}
      />
    </Field>
  );
};
