import { DropdownProps } from 'components/Dropdown';
import { i18n } from 'translation';

export const dataDropdown: DropdownProps['data'] = [
  {
    value: 'export',
    label: i18n.t('general.export'),
    icon: 'file-export',
  },
  // {
  //   value: 'duplicate',
  //   label: i18n.t('general.duplicate'),
  //   icon: 'copy',
  // },
  {
    value: 'delete',
    label: i18n.t('general.delete'),
    icon: 'trash-alt',
  },
];
