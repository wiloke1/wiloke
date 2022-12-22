import { Tabs } from 'components/Tabs';
import { i18n } from 'translation';
import { Text } from 'wiloke-react-core';
import { FilterTypePage } from 'containers/Admin/types';
import { FC } from 'react';

interface BuilderPageFilterTabProps {
  value: FilterTypePage;
  onChange: (value: FilterTypePage) => void;
}

export const BuilderPageFilterTab: FC<BuilderPageFilterTabProps> = ({ value, onChange }) => {
  return (
    <Tabs variants="style2" tabTitleGutter={10} defaultActiveKey={value} onChange={val => onChange(val as FilterTypePage)}>
      <Tabs.Pane tab={<Text>{i18n.t('adminDashboard.all')}</Text>} key="all" />
      <Tabs.Pane tab={<Text>{i18n.t('adminDashboard.publish')}</Text>} key="publish" />
      <Tabs.Pane tab={<Text>{i18n.t('adminDashboard.draft')}</Text>} key="draft" />
    </Tabs>
  );
};
