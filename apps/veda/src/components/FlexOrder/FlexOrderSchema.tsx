import Button from 'components/Button';
import Collapse from 'components/Collapse';
import DragItem from 'components/DragItem';
import DragItemRight from 'components/DragItemRight';
import Field from 'components/Field';
import Sortable, { RenderItemParam, SortableProps } from 'components/Sortable';
import TextInput from 'components/TextInput';
import Tooltip from 'components/Tooltip';
import { I18nComponent } from 'containers/BuilderPage/components/SchemaField/components/I18nComponent/I18nComponent';
import withDebounce from 'hocs/withDebounce';
import { withSchemaTranslation } from 'hocs/withSchemaTranslation';
import { FC, useState } from 'react';
import { useDeepCompareEffect } from 'react-use';
import { i18n } from 'translation';
import { DEFAULT_APP_LANGUAGE, langOptions } from 'translation/translation';
import reorder from 'utils/functions/reorder';
import { en } from 'utils/functions/schemaTranslation/label/en';
import { v4 } from 'uuid';
import { FontAwesome, Text, View } from 'wiloke-react-core';
import * as styles from './styles';
import { FlexOrderDataItem, FlexOrderValue } from './types';

export interface FlexOrderProps {
  value: FlexOrderValue;
  options: FlexOrderDataItem[];
  onChange?: (value: FlexOrderValue, options: FlexOrderDataItem[]) => void;
}

const getData = (value: FlexOrderValue, options: FlexOrderDataItem[]) => {
  return Object.values(value).map(index => {
    return options[index];
  });
};
const TextInputDebounce = withDebounce(TextInput, 'value', 'onValueChange');
const TextInputSchemaTranslation = withSchemaTranslation(TextInputDebounce, 'value', 'onValueChange');

const FlexOrderSchema: FC<FlexOrderProps> = ({ value, options, onChange }) => {
  const [data, setData] = useState(getData(value, options));
  const [modalVisible, setModalVisible] = useState(false);

  useDeepCompareEffect(() => {
    const result = data.reduce(
      (obj, item, index) => ({
        ...obj,
        [item.name]: index,
      }),
      {} as FlexOrderValue,
    );
    onChange?.(result, data);
  }, [data]);

  // useDeepCompareEffect(() => {
  //   setData(getData(value, options));
  // }, [value, options]);

  const handleChangeLabelFieldByInput = ({ id, label }: FlexOrderDataItem) => (value: string, optionClicked: boolean) => {
    setData(state =>
      state.map(i => {
        if (i.id === id) {
          const name_ =
            typeof i.label === 'string'
              ? i.label.toLowerCase().replaceAll(' ', '_') === i.name
                ? value.toLowerCase().replaceAll(' ', '_')
                : i.name
              : i.label[DEFAULT_APP_LANGUAGE]
              ? i.label[DEFAULT_APP_LANGUAGE].toLowerCase().replaceAll(' ', '_') === i.name
                ? value.toLowerCase().replaceAll(' ', '_')
                : i.name
              : i.name;
          const label_ =
            optionClicked || typeof label === 'string'
              ? value
              : Object.keys(label).reduce<Exclude<FlexOrderDataItem['label'], string>>(
                  (res, key) => {
                    const key_ = key as typeof langOptions[number]['value'];
                    if (typeof label === 'object') {
                      return {
                        ...res,
                        [key_]: label[key_] === label[DEFAULT_APP_LANGUAGE] ? value : label[key_],
                      };
                    }
                    return res;
                  },
                  { en: '', vi: '', fr: '' },
                );
          return {
            ...i,
            label: label_,
            name: name_,
          };
        }
        return i;
      }),
    );
  };

  const handleChangeLabelFieldByI18nComponent = ({ id }: FlexOrderDataItem) => (value: FlexOrderDataItem['label']) => {
    setData(state =>
      state.map(i => {
        if (i.id === id) {
          return { ...i, label: value };
        }
        return i;
      }),
    );
  };

  const handleChangeNameField = (item: FlexOrderDataItem) => (value: string) => {
    setData(state =>
      state.map(i => {
        if (i.id === item.id) {
          return { ...i, name: value };
        }
        return i;
      }),
    );
  };

  const handleDeleteItem = ({ id }: FlexOrderDataItem) => () => {
    setData(state => state.filter(i => i.id !== id));
  };

  const handleAddItem = () => {
    setData(state => [
      ...state,
      {
        id: v4(),
        label: '',
        name: '',
      },
    ]);
  };

  const handleSortItem: SortableProps<FlexOrderDataItem>['onDragEnd'] = result => {
    const srcIndex = result.source.index;
    const desIndex = result.destination?.index;
    if (desIndex !== undefined) {
      setData(state => reorder(state, srcIndex, desIndex));
    }
  };

  const renderSortableItem = ({ item, dragHandleProps }: RenderItemParam<FlexOrderDataItem>) => {
    const { label } = item;
    const isError = !!item.name && data.findIndex(({ name, id }) => item.name === name && item.id !== id) !== -1;
    const label_ = typeof label === 'string' ? label : label[DEFAULT_APP_LANGUAGE];

    const isExistInDirection = typeof label === 'string' && en[label as keyof typeof en];

    const I18Button = (
      <FontAwesome
        color={typeof item.label === 'string' ? undefined : 'primary'}
        colorHover="inherit"
        type="far"
        name="language"
        size={18}
        css={{ marginLeft: '4px' }}
      />
    );

    return (
      <Collapse
        name={item.id}
        groupName="flex-order"
        renderHeader={(handler, active) => {
          return (
            <View {...dragHandleProps}>
              <DragItem
                variant="variant2"
                active={active}
                label={label_}
                innerCss={{ backgroundColor: 'transparent' }}
                onEdit={handler}
                RightItem={<DragItemRight onEdit={handler} onDelete={handleDeleteItem(item)} />}
              />
            </View>
          );
        }}
      >
        <View css={{ padding: '10px' }}>
          <Field
            label={
              <View css={styles.label} colorHover="primary" onClick={() => setModalVisible(isExistInDirection ? false : true)}>
                <Text>{i18n.t('general.label')}</Text>
                {isExistInDirection ? <Tooltip text={i18n.t('schema.automated')}>{I18Button}</Tooltip> : I18Button}
              </View>
            }
          >
            <TextInputSchemaTranslation block autoFocus value={label_} sizeInput="medium" onValueChange={handleChangeLabelFieldByInput(item)} />
            <I18nComponent
              label={label}
              isVisible={modalVisible}
              onCancel={() => setModalVisible(false)}
              onOk={() => setModalVisible(false)}
              onResult={handleChangeLabelFieldByI18nComponent(item)}
            />
          </Field>
          <Field label={i18n.t('general.name')}>
            <TextInputDebounce
              borderColor={isError ? 'danger' : undefined}
              value={item.name}
              block
              sizeInput="medium"
              onValueChange={handleChangeNameField(item)}
            />
            <Text color="danger">{isError ? i18n.t('builderPage.schema.error.existed', { name: item.name }) : ''}</Text>
          </Field>
        </View>
      </Collapse>
    );
  };

  return (
    <View>
      <Sortable
        keyExtractor={item => item.id}
        data={data}
        renderItem={renderSortableItem}
        itemCss={{ marginBottom: '2px' }}
        onDragEnd={handleSortItem}
      />
      <Button block size="small" radius={6} backgroundColor="gray2" color="gray8" onClick={handleAddItem}>
        {i18n.t('general.add', { text: i18n.t('general.value', { text: i18n.t('general.default') }), textTransform: 'capitalize' })}
      </Button>
    </View>
  );
};

export default FlexOrderSchema;
