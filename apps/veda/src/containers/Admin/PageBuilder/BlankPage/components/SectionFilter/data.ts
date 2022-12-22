import { SelectAntdProps } from 'components/SelectAntd';
import { i18n } from 'translation';

export const filterTypes: SelectAntdProps['data'] = [
  {
    value: 'all',
    label: i18n.t('adminDashboard.all'),
  },
  {
    value: 'publish',
    label: i18n.t('adminDashboard.publish'),
  },
  {
    value: 'draft',
    label: i18n.t('adminDashboard.draft'),
  },
];
