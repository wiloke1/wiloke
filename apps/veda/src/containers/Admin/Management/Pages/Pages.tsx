import SectionPageHeader from 'components/SectionPageHeader';
import { Tabs } from 'components/Tabs';
import { Dashboard } from 'containers/Dashboard';
import { useState } from 'react';
import { i18n } from 'translation';
import { Text, View } from 'wiloke-react-core';
import { AdminPage } from './AdminPage';
import { DraftPage } from './DraftPage';

export const PageManagement = () => {
  const [filterType, setFilterType] = useState<'draft' | 'admin' | 'preview' | string>('draft');

  return (
    <Dashboard
      Content={() => (
        <View>
          <SectionPageHeader description="" title={`${i18n.t('general.page', { text: i18n.t('general.manager') })}`} disableButton />

          <View row css={{ justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
            <View columns={[12, 6, 6]}>
              <Tabs variants="style2" activeKey={filterType} tabTitleGutter={10} onChange={setFilterType}>
                <Tabs.Pane tab={<Text>{i18n.t('adminDashboard.draft')}</Text>} key="draft" />
                <Tabs.Pane tab={<Text>{i18n.t('general.admin')}</Text>} key="admin" />
              </Tabs>
            </View>
          </View>

          {filterType === 'draft' && <DraftPage />}
          {filterType === 'admin' && <AdminPage />}
        </View>
      )}
    />
  );
};
