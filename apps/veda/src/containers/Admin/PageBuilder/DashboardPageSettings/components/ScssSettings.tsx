import { CodeEditor } from 'components/CodeEditor/CodeEditor';
import Empty from 'components/Empty';
import { useSelector } from 'react-redux';
import { PageSettings } from 'types/Result';
import { View } from 'wiloke-react-core';
import { dashboardPageSettingsSelector, useChangeSettingsDashboardPage } from '..';

export const ScssSettings = () => {
  const { page } = useSelector(dashboardPageSettingsSelector);
  const changeSettings = useChangeSettingsDashboardPage();

  if (page) {
    const pageSettings = page?.pageSettings as PageSettings;

    return (
      <View css={{ flex: 1 }}>
        <CodeEditor
          id="scss"
          language="scss"
          value={pageSettings.globalScss}
          onChange={value => {
            changeSettings({
              page: {
                ...page,
                pageSettings: {
                  ...pageSettings,
                  globalScss: value ?? '',
                },
              },
            });
          }}
        />
      </View>
    );
  }

  return <Empty />;
};
