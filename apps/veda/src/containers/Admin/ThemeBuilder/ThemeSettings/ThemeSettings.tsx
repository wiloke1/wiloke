import SectionPageHeader from 'components/SectionPageHeader';
import { Dashboard } from 'containers/Dashboard';
import { useSelector } from 'react-redux';
import { themeSettingsSelector } from 'store/selectors';
import { i18n } from 'translation';
import { View } from 'wiloke-react-core';
import { ThemeTranslations } from 'types/Result';
import { useSocketForSyncShopify } from 'hooks/useSocket/useSocketForSyncShopify';
import { notification } from 'antd';
import { useUpdateOriginThemeSettings } from 'store/reducers/sliceOriginThemeSettings';
import { useDeepCompareEffect } from 'react-use';
import { useLocation } from 'react-router-dom';
import ThemeSettingsWithSidebar from 'containers/BuilderPage/components/Settings/ThemeSettingsWithSidebar';
import { themeDashboardSelector } from '../ThemeDashboard/slice/sliceThemeDashboard';
import { themeDashboardSettingSelector, useUpdateThemeActiveSettings } from './sliceThemeSettingsDashboard';

export const ThemeSettings = () => {
  const { updateThemeActiveStatus } = useSelector(themeDashboardSettingSelector);
  const { themeActivate } = useSelector(themeDashboardSelector);

  const themeSettings = useSelector(themeSettingsSelector);
  const updateThemeActiveSettings = useUpdateThemeActiveSettings();

  const { connect, disconnect, statusSocketConnection } = useSocketForSyncShopify();

  const location = useLocation();

  const isInDashboard = location.pathname === '/theme/settings';
  const updateOriginThemeSettings = useUpdateOriginThemeSettings();

  useDeepCompareEffect(() => {
    if (isInDashboard) {
      updateOriginThemeSettings({ ...themeSettings, globalTranslations: themeSettings.globalTranslations.translation as ThemeTranslations });
    }
  }, [themeSettings]);

  return (
    <Dashboard
      disabledScroll
      Content={() => (
        <View css={{ paddingBottom: '100px', maxWidth: '1400px', height: '100%' }}>
          <SectionPageHeader
            title={i18n.t('adminDashboard.theme_settings_page')}
            description={i18n.t('adminDashboard.page_description.theme_settings')}
            buttonContent={i18n.t('general.save', { text: i18n.t('general.settings') })}
            isLoading={statusSocketConnection === 'loading' || updateThemeActiveStatus === 'loading'}
            onClick={() => {
              connect({
                onSuccess: () => {
                  updateThemeActiveSettings.request({
                    commandId: themeActivate.commandId,
                    body: {
                      themeSettings: {
                        generalSettings: themeSettings.generalSettings,
                        layoutSettings: themeSettings.layoutSettings,
                        globalTranslations: themeSettings.globalTranslations.translation as ThemeTranslations,
                        cssVariables: themeSettings.cssVariables,
                      },
                      globalScss: themeSettings.globalScss,
                      globalJs: themeSettings.globalJs,
                      vendors: themeSettings.vendors,
                    },
                    onFulfill: () => {
                      disconnect({});
                    },
                  });
                },
                onError: () => {
                  notification.error({
                    message: i18n.t('publish_shopify.init_sync_error'),
                  });
                },
              });
            }}
          />
          <View
            radius={6}
            borderWidth={1}
            borderStyle="solid"
            borderColor="gray3"
            backgroundColor="light"
            css={{ height: '100%', overflow: 'hidden' }}
          >
            <ThemeSettingsWithSidebar />
          </View>
        </View>
      )}
    />
  );
};
