import { View } from 'wiloke-react-core';
import { useSelector } from 'react-redux';
import Empty from 'components/Empty';
import { PageSettings } from 'types/Result';
import { CodeEditor } from 'components/CodeEditor/CodeEditor';
import { dashboardPageSettingsSelector, useChangeSettingsDashboardPage } from '../slice';

export const JsSettings = () => {
  const { page } = useSelector(dashboardPageSettingsSelector);
  const changeSettings = useChangeSettingsDashboardPage();

  if (page) {
    const pageSettings = page?.pageSettings as PageSettings;

    return (
      <View css={{ flex: 1 }}>
        <CodeEditor
          id="javascript"
          language="javascript"
          value={pageSettings.globalJs}
          onChange={value => {
            changeSettings({
              page: {
                ...page,
                pageSettings: {
                  ...pageSettings,
                  globalJs: value ?? '',
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
