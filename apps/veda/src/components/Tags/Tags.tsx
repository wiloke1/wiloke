import SelectAntd, { Option } from 'components/SelectAntd';
import { useRef } from 'react';
import strToCapitalize from 'utils/functions/strToCapitalize';
import { Styles, View } from 'wiloke-react-core';

export interface TagsProps<T extends string> {
  data: T[];
  onChange?: (item: T) => void;
}

const containerStyles: Styles = {
  display: 'flex',
  flexWrap: 'wrap',
  marginBottom: '10px',
};

const Tags = <T extends string>({ data, onChange }: TagsProps<T>) => {
  const dataRef = useRef<Option[]>(data.map(value => ({ label: strToCapitalize(value), value }))).current;

  return (
    <View css={containerStyles}>
      <SelectAntd
        data={dataRef}
        showSearch
        placeholder="Black friday, christmas, sale..."
        onChange={value => {
          onChange?.(value);
        }}
      />
    </View>
  );
};

export default Tags;
