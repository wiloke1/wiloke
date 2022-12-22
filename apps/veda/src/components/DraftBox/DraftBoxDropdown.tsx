import Dropdown, { DropdownProps } from 'components/Dropdown';
import { FC } from 'react';
import { i18n } from 'translation';
import { FontAwesome, View } from 'wiloke-react-core';
import * as styles from './styles';

export interface DraftBoxDropdownProps {
  onClickDropdown?: DropdownProps['onClick'];
}

const _data: DropdownProps['data'] = [
  {
    label: i18n.t('general.preview'),
    value: 'preview',
    icon: 'eye',
  },
  {
    label: i18n.t('general.delete'),
    value: 'delete',
    icon: 'trash',
  },
];

export const DraftBoxDropdown: FC<DraftBoxDropdownProps> = ({ onClickDropdown }) => {
  return (
    <Dropdown data={_data} onClick={onClickDropdown}>
      <View css={styles.dropdown}>
        <View>
          <FontAwesome name="ellipsis-h" type="far" color="gray8" />
        </View>
      </View>
    </Dropdown>
  );
};
