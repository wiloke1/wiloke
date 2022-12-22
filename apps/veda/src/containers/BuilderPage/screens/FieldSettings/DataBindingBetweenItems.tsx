import BoxCenter from 'components/BoxCenter';
import Checkbox from 'components/Checkbox';
import MyModal from 'components/MyModal';
import Tooltip from 'components/Tooltip';
import { labelOfTypes } from 'containers/BuilderPage/components/SchemaField/components/FormSchemaSetting/fields/TypeField/TypeField';
import { FC, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { dataBindingFieldNamesSelector, useDataBindingFieldNamesClear, useDataBindingFieldNamesSave } from 'store/global/dataBindingFieldNames/slice';
import { sectionIdActiveSelector } from 'store/selectors';
import { i18n } from 'translation';
import { SettingArray } from 'types/Schema';
import { getLabel } from 'utils/functions/getLabel';
import { FontAwesome, Space, Text, View } from 'wiloke-react-core';

export interface DataBindingBetweenItemsProps {
  setting: SettingArray;
}

export const DataBindingBetweenItems: FC<DataBindingBetweenItemsProps> = ({ setting }) => {
  const dataBindingFieldNames = useSelector(dataBindingFieldNamesSelector);
  const [modalVisible, setModalVisible] = useState(false);
  const [fieldNames, setFieldNames] = useState<string[]>([]);
  const sectionIdActive = useSelector(sectionIdActiveSelector);
  const dataBindingFieldNamesSave = useDataBindingFieldNamesSave();
  const dataBindingFieldNamesClear = useDataBindingFieldNamesClear();
  // Active khi length của field names đc lưu tại redux > 0
  const active = dataBindingFieldNames.length > 0;

  useEffect(() => {
    if (modalVisible) {
      setFieldNames(dataBindingFieldNames);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [modalVisible]);

  const handleApply = () => {
    dataBindingFieldNamesSave({ sectionId: sectionIdActive, fieldNames });
    setModalVisible(false);
    setFieldNames([]);
  };

  const handleCancel = () => {
    dataBindingFieldNamesClear({ sectionId: sectionIdActive });
    setModalVisible(false);
    setFieldNames([]);
  };

  return (
    <>
      <Tooltip portal placement="right" text={i18n.t('general.data_binding_between_items')}>
        <BoxCenter
          size={30}
          onClick={() => {
            setModalVisible(true);
          }}
        >
          <FontAwesome type={active ? 'fas' : 'far'} name="link" size={14} color={active ? 'secondary' : 'gray6'} />
        </BoxCenter>
      </Tooltip>
      <MyModal
        isVisible={modalVisible}
        headerText={i18n.t('general.data_binding_between_items')}
        okText={i18n.t('general.apply')}
        cancelText={i18n.t('general.clear')}
        onButtonCancel={handleCancel}
        onCancel={() => setModalVisible(false)}
        onOk={handleApply}
      >
        <Text>{i18n.t('general.data_binding_text')}</Text>
        <Space size={10} />
        {setting.children[0]?.children.map(item => {
          if (
            item.type === 'slider' ||
            item.type === 'styleBox' ||
            item.type === 'color' ||
            item.type === 'animate' ||
            item.type === 'animateInOut' ||
            item.type === 'responsive' ||
            item.type === 'radioGroup' ||
            item.type === 'switch'
          ) {
            return (
              <View key={item.id} css={{ marginTop: '3px' }}>
                <Checkbox
                  checked={dataBindingFieldNames.includes(item.name)}
                  innerCss={{ verticalAlign: 'top', marginTop: '-3px' }}
                  onValueChange={value => {
                    if (value) {
                      setFieldNames(fieldNames => [...fieldNames, item.name]);
                    } else {
                      setFieldNames(fieldNames => fieldNames.filter(name => name !== item.name));
                    }
                  }}
                >
                  <View css={{ marginLeft: '5px' }}>
                    <Text size={11}>{labelOfTypes[item.type]}</Text>
                    <Text>{getLabel(item.label)}</Text>
                  </View>
                </Checkbox>
                <Space size={10} />
              </View>
            );
          }

          return null;
        })}
      </MyModal>
    </>
  );
};
