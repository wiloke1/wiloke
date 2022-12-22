import Field from 'components/Field';
import Tooltip from 'components/Tooltip';
import { I18nComponent } from 'containers/BuilderPage/components/SchemaField/components/I18nComponent/I18nComponent';
import { TextInputDebounce } from 'containers/BuilderPage/components/SchemaField/components/InputDebounced/InputDebounced';
import { useSchemaBlocks } from 'containers/BuilderPage/components/SchemaField/SchemaBlocks/contexts/SchemaBlocksContext';
import { withSchemaTranslation } from 'hocs/withSchemaTranslation';
import { FC, useMemo, useState } from 'react';
import { i18n } from 'translation';
import { DEFAULT_APP_LANGUAGE } from 'translation/translation';
import { SettingLabel } from 'types/Schema';
import { en } from 'utils/functions/schemaTranslation/label/en';
import { FontAwesome, Text, View } from 'wiloke-react-core';
import { FormBlockProps } from '../FormBlock';

const TextInputSchemaTranslation = withSchemaTranslation(TextInputDebounce, 'value', 'onValueChange');

const getLabel = (label: SettingLabel) => {
  return typeof label === 'object' ? label[DEFAULT_APP_LANGUAGE] : label;
};

/**
 * Lưu ý: Nếu có update ở đây cần xem xét lại việc file "SchemaField/components/FormSchemaSetting/fields/LabelField/LabelField.tsx" cũng cần có sự update tương tự
 * Vì các field này gần như là giống nhau nhưng cách update data cũng như data type truyền vào có sự khác nhau nên tách ra và cần xem xét việc update cả 2
 */
export const LabelField: FC<FormBlockProps> = ({ blockData }) => {
  const { label, name, id } = blockData;
  const { editBlock } = useSchemaBlocks();
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

  const _handleLabelChange = (value: string, optionClicked: boolean) => {
    editBlock({
      blockId: id,
      newData: {
        ...(optionClicked
          ? { label: value }
          : typeof label === 'string'
          ? { label: value, name: label.toLowerCase().replaceAll(' ', '_') === name ? value.toLowerCase().replaceAll(' ', '_') : name }
          : {
              label: Object.keys(label).reduce<Exclude<SettingLabel, string>>((res, key) => {
                if (typeof label === 'object') {
                  return { ...res, [key]: label[key] === label[DEFAULT_APP_LANGUAGE] ? value : label[key] };
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
      <TextInputSchemaTranslation block autoFocus value={getLabel(label)} onValueChange={_handleLabelChange} />
      <I18nComponent
        label={label}
        isVisible={modalVisible}
        onCancel={() => setModalVisible(false)}
        onOk={() => setModalVisible(false)}
        onResult={value => {
          editBlock({
            blockId: id,
            newData: { label: value },
          });
        }}
      />
    </Field>
  );
};
