import Field from 'components/Field';
import Tooltip from 'components/Tooltip';
import { I18nComponent } from 'containers/BuilderPage/components/SchemaField/components/I18nComponent/I18nComponent';
import { withSchemaTranslation } from 'hocs/withSchemaTranslation';
import { FC, useMemo, useState } from 'react';
import { i18n } from 'translation';
import { DEFAULT_APP_LANGUAGE } from 'translation/translation';
import { SettingLabel } from 'types/Schema';
import { en } from 'utils/functions/schemaTranslation/label/en';
import { FontAwesome, Text, View } from 'wiloke-react-core';
import { TextInputDebounce } from '../../../InputDebounced/InputDebounced';
import { FormSchemaSettingProps } from '../../type';

const TextInputSchemaTranslation = withSchemaTranslation(TextInputDebounce, 'value', 'onValueChange');
const getLabel = (label: SettingLabel) => {
  return typeof label === 'object' ? label[DEFAULT_APP_LANGUAGE] : label;
};
/**
 * Lưu ý: Nếu có update ở đây cần xem xét lại việc file "SchemaField/SchemaBlocks/components/forms/FormBlock/fields/LabelField/LabelField.tsx" cũng cần có sự update tương tự
 * Vì các field này gần như là giống nhau nhưng cách update data cũng như data type truyền vào có sự khác nhau nên tách ra và cần xem xét việc update cả 2
 */
export const LabelField: FC<FormSchemaSettingProps> = ({ data, onChange }) => {
  const { label, children, type, name } = data;
  const [modalVisible, setModalVisible] = useState(false);

  const isExistInDirection = useMemo(() => {
    return typeof label === 'string' && en[label as keyof typeof en];
  }, [label]);

  const I18nButton = useMemo(() => {
    return (
      <FontAwesome
        color={isExistInDirection || typeof label === 'object' ? 'primary' : undefined}
        colorHover="inherit"
        type="far"
        name="language"
        size={18}
        css={{ marginLeft: '4px' }}
      />
    );
  }, [isExistInDirection, label]);

  const _handleInputChange = (value: string, optionClicked: boolean) => {
    const _children = ['text', 'textarea'].includes(type)
      ? typeof label === 'string'
        ? { children: label === children ? value : children }
        : label[DEFAULT_APP_LANGUAGE]
        ? { children: label[DEFAULT_APP_LANGUAGE] === children ? value : name }
        : {}
      : {};
    const _label =
      optionClicked || typeof label === 'string'
        ? { label: value }
        : {
            label: Object.keys(label).reduce<Exclude<SettingLabel, string>>((res, key) => {
              if (typeof label === 'object') {
                return { ...res, [key]: label[key] === label[DEFAULT_APP_LANGUAGE] ? value : label[key] };
              }
              return res;
            }, {}),
          };
    const _name =
      typeof label === 'string'
        ? { name: label.toLowerCase().replaceAll(' ', '_') === name ? value.toLowerCase().replaceAll(' ', '_') : name }
        : label[DEFAULT_APP_LANGUAGE]
        ? { name: label[DEFAULT_APP_LANGUAGE].toLowerCase().replaceAll(' ', '_') === name ? value.toLowerCase().replaceAll(' ', '_') : name }
        : {};
    onChange?.({
      ..._children,
      ..._label,
      ...(type === 'divider'
        ? { name: 'Nếu để là string rỗng ở đây thì mọi chỗ regex hay replace sẽ chết mất -> Fix 1 name cứng và name này là uniq' }
        : _name),
    });
  };

  return (
    <Field
      label={
        <View
          css={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}
          colorHover="primary"
          onClick={() => setModalVisible(isExistInDirection ? false : true)}
        >
          <Text>{i18n.t('schema.label')}</Text>
          {isExistInDirection ? <Tooltip text={i18n.t('schema.automated')}>{I18nButton}</Tooltip> : I18nButton}
        </View>
      }
    >
      <TextInputSchemaTranslation block autoFocus value={getLabel(label)} onValueChange={_handleInputChange} />
      <I18nComponent
        label={label}
        isVisible={isExistInDirection ? false : modalVisible}
        onCancel={() => setModalVisible(false)}
        onOk={() => setModalVisible(false)}
        onResult={value => {
          onChange?.({ label: value });
        }}
      />
    </Field>
  );
};
