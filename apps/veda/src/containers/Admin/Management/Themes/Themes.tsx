import { notification } from 'antd';
import Button from 'components/Button';
import SectionPageHeader from 'components/SectionPageHeader';
import { Tabs } from 'components/Tabs';
import { Dashboard } from 'containers/Dashboard';
import { useState } from 'react';
import { i18n } from 'translation';
import { getUserInfo } from 'utils/functions/getUserInfo';
import { Text, View } from 'wiloke-react-core';
import { ModalCreateThemeAtom } from './components/ModalCreateThemeAtom';
import { ModalCreateThemeDraft } from './components/ModalCreateThemeDraft';
import { useSetModalCreateThemeAtom } from './store/reducers/sliceThemesAtom';
import { useSetModalCreateThemeDraft } from './store/reducers/sliceThemesDraft';
import { ThemesAtom } from './ThemesAtom';
import { ThemesDraft } from './ThemesDraft';

export const ThemeManagement = () => {
  const [filterType, setFilterType] = useState('draft');
  const setModalCreateThemeAtom = useSetModalCreateThemeAtom();
  const setModalCreateThemeDraft = useSetModalCreateThemeDraft();
  const { role } = getUserInfo();

  return (
    <Dashboard
      Content={() => (
        <View>
          <SectionPageHeader description="" title={`${i18n.t('general.theme', { text: i18n.t('general.manager') })}`} disableButton />
          <View row css={{ justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
            <View columns={[12, 6, 6]}>
              <Tabs activeKey={filterType} variants="style2" tabTitleGutter={10} onChange={setFilterType}>
                <Tabs.Pane tab={<Text>{i18n.t('adminDashboard.draft')}</Text>} key="draft" />
                <Tabs.Pane tab={<Text>{i18n.t('general.admin')}</Text>} key="admin" />
              </Tabs>
            </View>
            <View>
              <ModalCreateThemeAtom />
              <ModalCreateThemeDraft />
              <Button
                radius={8}
                size="small"
                onClick={() => {
                  if (role === 'admin') {
                    setModalCreateThemeAtom(true);
                  } else if (role === 'dev') {
                    setModalCreateThemeDraft(true);
                  } else {
                    notification.error({ message: '?' });
                  }
                }}
              >
                {i18n.t('general.create')}
              </Button>
            </View>
          </View>
          {filterType === 'draft' && <ThemesDraft />}
          {filterType === 'admin' && <ThemesAtom />}
        </View>
      )}
    />
  );
};
