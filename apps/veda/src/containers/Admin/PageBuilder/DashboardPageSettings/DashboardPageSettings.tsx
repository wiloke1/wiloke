import { notification } from 'antd';
import InlineMenu from 'components/InlineMenu';
import MyModal from 'components/MyModal';
import NavItemSetting from 'components/NavItemSetting';
import { dashboardPageSettings, DashboardPageSettingValue } from 'containers/BuilderPage/components/Settings/data';
import { ModalAskBeforeSave, useSetAskBeforeSaveVisible } from 'containers/ModalAskBeforeSave';
import { useSocketForSyncShopify } from 'hooks/useSocket/useSocketForSyncShopify';
import { FC, ReactNode, useState } from 'react';
import { useSelector } from 'react-redux';
import { i18n } from 'translation';
import { PageType } from 'types/Page';
import { View } from 'wiloke-react-core';
import { dashboardPageSettingsSelector, useChangeSettingsDashboardPage } from '.';
import { GeneralSettings } from './components/GeneralSettings';
import { JsSettings } from './components/JsSettings';
import { ScssSettings } from './components/ScssSettings';
import { VendorSettings } from './components/VendorSettings';
import { useCheckSlugExist, useUpdatePageSettings } from './slice';
import * as styles from './styles';

interface DashboardPageSettingsProps {
  pageType?: PageType;
}

/*
 * Component này xuất hiện ở các page item ngoài dashboard
 */
export const DashboardPageSettings: FC<DashboardPageSettingsProps> = () => {
  const { visible, page, originPage, updateStatus, checkSlugStatus, isChangingHandle } = useSelector(dashboardPageSettingsSelector);
  const [keys, setKeys] = useState<DashboardPageSettingValue[]>(['general']);

  const changeSettings = useChangeSettingsDashboardPage();
  const checkSlugExist = useCheckSlugExist();
  const updatePageSettings = useUpdatePageSettings();
  const setAskBeforeSaveVisible = useSetAskBeforeSaveVisible();

  const { connect, disconnect, statusSocketConnection } = useSocketForSyncShopify();

  const handleCancel = () => {
    changeSettings({
      visible: false,
      page: undefined,
      isChangingHandle: false,
    });
  };

  // Nếu isChangingHandle = true thì gọi api kiểm tra slug trước rồi mới gọi api update page settings
  const handleSave = (isOverride: boolean) => {
    if (page && originPage) {
      connect({
        onSuccess: () => {
          if (isChangingHandle) {
            checkSlugExist.request({
              commandId: page.commandId,
              handle: page.pageSettings?.generalSettings.handle ?? '',
              pageType: page.type,
              callback: () => {
                updatePageSettings.request({
                  page,
                  originPage,
                  variant: 'Update page settings',
                  isOverrideIndividualPages: isOverride,
                  onFulfill: () => {
                    disconnect({});
                  },
                });
              },
            });
          } else {
            updatePageSettings.request({
              page,
              originPage,
              variant: 'Update page settings',
              isOverrideIndividualPages: isOverride,
              onFulfill: () => {
                disconnect({});
              },
            });
          }
        },
        onError: () => {
          notification.error({
            message: i18n.t('publish_shopify.init_sync_error'),
          });
        },
      });
    }
  };

  const mappingContent: Record<DashboardPageSettingValue, ReactNode | JSX.Element> = {
    general: <GeneralSettings />,
    vendors: <VendorSettings />,
    scss: <ScssSettings />,
    js: <JsSettings />,
  };

  return (
    <MyModal
      size="large"
      isVisible={visible}
      onOk={() => {
        setAskBeforeSaveVisible(true);
      }}
      onCancel={handleCancel}
      headerText={i18n.t('builderPage.page_settings.general.text')}
      contentCss={{ padding: '0' }}
    >
      <View css={styles.body}>
        <InlineMenu
          width={280}
          onChange={ids => {
            setKeys(ids as DashboardPageSettingValue[]);
          }}
          defaultItemIds={['general']}
          containerCss={({ colors }) => ({ borderRight: `1px solid ${colors.gray3}` })}
        >
          {dashboardPageSettings.map(item => (
            <InlineMenu.Item itemId={item.value} key={item.value} width={280}>
              <NavItemSetting
                title={item.label}
                iconType={item.iconType}
                iconName={item.icon}
                active={keys.includes(item.value)}
                containerCss={styles.navItem}
              />
            </InlineMenu.Item>
          ))}
        </InlineMenu>
        {mappingContent[keys[0]]}
      </View>

      <ModalAskBeforeSave
        onOverride={handleSave}
        isLoading={statusSocketConnection === 'loading' || updateStatus === 'loading' || checkSlugStatus === 'loading'}
      />
    </MyModal>
  );
};
