import { DataItem } from 'components/Dropdown/Dropdown';
import { i18n } from 'translation';
import { PageSectionType } from 'types/Sections';
import getPageInfo from 'utils/functions/getInfo';

export type Placement = 'in' | 'out';

export const getAddonsDropdown = (placement: Placement): DataItem[] => [
  { icon: 'code', label: `${i18n.t('general.edit')} code`, value: 'editcode' },
  { icon: 'pen', label: i18n.t('general.rename'), value: 'rename' },
  { icon: 'copy', label: i18n.t('general.duplicate'), value: 'duplicate' },
  ...((placement === 'in' ? [{ icon: 'sort', label: i18n.t('general.reorder'), value: 'reorder' }] : []) as DataItem[]),
  ...([{ icon: 'file-export', label: i18n.t('general.export'), value: 'export' }] as DataItem[]),
  { icon: 'cog', label: i18n.t('general.edit_info'), value: 'setting', topDivider: true },
  { icon: 'trash', label: i18n.t('general.delete'), value: 'delete', topDivider: true },
];

const getDropdownWithSectionType = (type?: PageSectionType): DataItem[] => {
  if (!getPageInfo('themeId')) {
    return [];
  }
  switch (type) {
    case 'header':
      return [
        {
          icon: 'arrow-alt-down',
          label: i18n.t('general.move_to', { text: i18n.t('general.main'), textTransform: 'capitalize' }),
          value: 'move_to_main',
          topDivider: true,
        },
        {
          icon: 'arrow-alt-down',
          label: i18n.t('general.move_to', { text: i18n.t('general.footer'), textTransform: 'capitalize' }),
          value: 'move_to_footer',
        },
      ];
    case 'footer':
      return [
        {
          icon: 'arrow-alt-up',
          label: i18n.t('general.move_to', { text: i18n.t('general.main'), textTransform: 'capitalize' }),
          value: 'move_to_main',
          topDivider: true,
        },
        {
          icon: 'arrow-alt-up',
          label: i18n.t('general.move_to', { text: i18n.t('general.header'), textTransform: 'capitalize' }),
          value: 'move_to_header',
        },
      ];
    default:
      return [
        {
          icon: 'arrow-alt-up',
          label: i18n.t('general.move_to', { text: i18n.t('general.header'), textTransform: 'capitalize' }),
          value: 'move_to_header',
          topDivider: true,
        },
        {
          icon: 'arrow-alt-down',
          label: i18n.t('general.move_to', { text: i18n.t('general.footer'), textTransform: 'capitalize' }),
          value: 'move_to_footer',
        },
      ];
  }
};

export const getSectionDropdown = (placement: Placement = 'out', type?: PageSectionType): DataItem[] => [
  { icon: 'code', label: `${i18n.t('general.edit')} code`, value: 'editcode' },
  { icon: 'pen', label: i18n.t('general.rename'), value: 'rename' },
  { icon: 'copy', label: i18n.t('general.duplicate'), value: 'duplicate' },
  ...((placement === 'in' ? [{ icon: 'sort', label: i18n.t('general.reorder'), value: 'reorder' }] : []) as DataItem[]),
  { icon: 'file-export', label: i18n.t('general.export'), value: 'export' },
  { icon: 'file-import', label: i18n.t('general.import'), value: 'import' },
  ...getDropdownWithSectionType(type),
  { icon: 'trash', label: i18n.t('general.delete'), value: 'delete', topDivider: true },
];
