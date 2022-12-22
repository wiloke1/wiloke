import SelectAntd, { Option } from 'components/SelectAntd';
import { FC, useState } from 'react';
import { getLocale, setLocale } from 'translation';
import { langOptions } from 'translation/translation';
import { View, ViewProps } from 'wiloke-react-core';

export interface SelectLangProps {
  onClickItem?: (value: any) => void;
  containerCss?: ViewProps['css'];
}

const SelectLang: FC<SelectLangProps> = ({ containerCss, onClickItem }) => {
  const [value, setValue] = useState(getLocale().replace(/(-|_).*/g, ''));

  return (
    <View css={containerCss}>
      <SelectAntd
        value={value}
        data={(langOptions as unknown) as Option[]}
        onChange={value => {
          setValue(value);
          setLocale(value);
          onClickItem?.(value);
        }}
      />
    </View>
  );
};

export default SelectLang;
