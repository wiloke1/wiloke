import Button, { ButtonProps } from 'components/Button/Button';
import Dropdown from 'components/Dropdown';
import { DataItem } from 'components/Dropdown/Dropdown';
import { FC } from 'react';
import { FontAwesome, View } from 'wiloke-react-core';
import * as styles from './styles';

export interface ButtonDropdownProps extends Omit<ButtonProps, 'fontFamily' | 'size' | 'radius' | 'css'> {
  dropdownData: DataItem[];
  onClickItemDropdown?: (value: string) => void;
}

const ButtonDropdown: FC<ButtonDropdownProps> = ({ children, dropdownData, onClickItemDropdown, ...rest }) => {
  return (
    <Button {...rest} fontFamily="secondary" size="small" radius={4} css={styles.container}>
      <View css={styles.inner}>
        {children}
        <View onClick={event => event.stopPropagation()}>
          <Dropdown placement="bottomRight" data={dropdownData} onClick={onClickItemDropdown}>
            <View css={styles.icon}>
              <FontAwesome type="far" name="angle-down" size={16} />
            </View>
          </Dropdown>
        </View>
      </View>
    </Button>
  );
};

export default ButtonDropdown;
