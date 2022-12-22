import DragItem from 'components/DragItem';
import FieldGroup from 'components/FieldGroup';
import Sortable, { RenderItemParam } from 'components/Sortable';
import { equals } from 'ramda';
import { FC, ReactNode, useState } from 'react';
import { useDeepCompareEffect } from 'react-use';
import { getLocale } from 'translation';
import reorder from 'utils/functions/reorder';
import { Space, View } from 'wiloke-react-core';
import FlexOrderSchema from './FlexOrderSchema';
import * as styles from './styles';
import { FlexOrderDataItem, FlexOrderValue } from './types';

export interface FlexOrderProps {
  label: string;
  summary?: string;
  value: FlexOrderValue;
  options: FlexOrderDataItem[];
  onChange?: (data: FlexOrderValue) => void;
  AfterLabel?: ReactNode;
}

const getData = (value: FlexOrderValue, options: FlexOrderDataItem[]) => {
  return Object.keys(value).map(itemName => {
    return options.find(option => option.name === itemName) as FlexOrderDataItem;
  });
};

type FlexOrderFC = FC<FlexOrderProps> & {
  Schema: typeof FlexOrderSchema;
};

const FlexOrder: FlexOrderFC = ({ label, summary, value, options, onChange, AfterLabel = null }) => {
  const [data, setData] = useState(getData(value, options));
  const locale = getLocale() as keyof Exclude<FlexOrderDataItem['label'], string>;

  useDeepCompareEffect(() => {
    const result = data.reduce(
      (obj, item, index) => ({
        ...obj,
        [item.name]: index,
      }),
      {} as FlexOrderValue,
    );
    if (!equals(result, value)) {
      onChange?.(result);
    }
  }, [data]);

  useDeepCompareEffect(() => {
    setData(getData(value, options));
  }, [value, options]);

  const renderSortableItem = ({ item, dragHandleProps }: RenderItemParam<FlexOrderDataItem>) => {
    const { label } = item;
    const label_ = typeof label === 'string' ? label : label[locale];
    return (
      <View {...dragHandleProps} css={styles.dragItem}>
        <DragItem variant="variant2" label={label_} innerCss={{ backgroundColor: 'transparent' }} />
      </View>
    );
  };

  return (
    <FieldGroup label={label} summary={summary} AfterLabel={AfterLabel}>
      <Sortable
        keyExtractor={item => item.id}
        data={data}
        renderItem={renderSortableItem}
        itemCss={{ marginBottom: '2px' }}
        onDragEnd={result => {
          const srcIndex = result.source.index;
          const desIndex = result.destination?.index;
          if (desIndex !== undefined) {
            setData(state => reorder(state, srcIndex, desIndex));
          }
        }}
      />
      <Space size={10} />
    </FieldGroup>
  );
};

FlexOrder.Schema = FlexOrderSchema;

export default FlexOrder;
