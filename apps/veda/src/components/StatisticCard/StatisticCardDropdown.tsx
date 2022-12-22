import Dropdown, { DropdownProps } from 'components/Dropdown';
import { FC } from 'react';
import { FontAwesome, View } from 'wiloke-react-core';
import { dataDropdown } from './dataDropdown';
import * as styles from './styles';

export interface StatisticCardDropdownProps {
  onClickDropdown?: DropdownProps['onClick'];
}

export const StatisticCardDropdown: FC<StatisticCardDropdownProps> = ({ onClickDropdown }) => {
  return (
    <Dropdown data={dataDropdown} onClick={onClickDropdown}>
      <View css={styles.dropdown}>
        <FontAwesome name="ellipsis-h" type="far" />
      </View>
    </Dropdown>
  );
};
