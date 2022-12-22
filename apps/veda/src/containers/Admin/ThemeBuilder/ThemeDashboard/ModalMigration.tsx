import MyModal from 'components/MyModal';
import { useGetThemeShopify, useMigrateThemeShopify } from 'containers/Admin/ThemeBuilder/ThemeDashboard/slice/actions';
import { themeDashboardSelector, useSetVisibleModalMigration } from 'containers/Admin/ThemeBuilder/ThemeDashboard/slice/sliceThemeDashboard';
import { useSocketForSyncShopify } from 'hooks/useSocket/useSocketForSyncShopify';
import { useEffect, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { useGetThemeObjectNCss } from 'store/actions/liquid/actionLiquidVariables';
import { liquidVariablesSelector } from 'store/selectors';
import SelectAntd, { Option } from 'components/SelectAntd';
import Button from 'components/Button';
import { notification } from 'antd';
import { i18n } from 'translation';
import { Space, Styles, Text } from 'wiloke-react-core';

const contentModalStyles: Styles = {
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  padding: '0 90px',
  textAlign: 'center',
};

const bodyModalStyles: Styles = {
  width: '690px',
  height: '500px',
};

// Todo: i18n
export const ModalMigration: React.FC = () => {
  const { getThemesShopifyStatus, migrateThemeShopifyStatus, shopifyThemes, visibleModalMigration } = useSelector(themeDashboardSelector);
  const { data, statusRequestThemeCssObject } = useSelector(liquidVariablesSelector);

  const migrateTheme = useMigrateThemeShopify();
  const getThemesShopify = useGetThemeShopify();
  const getThemeObject = useGetThemeObjectNCss();
  const setVisible = useSetVisibleModalMigration();

  const [targetThemeId, setTargetThemeId] = useState(undefined);
  const { connect, disconnect, statusSocketConnection } = useSocketForSyncShopify();

  const latestThemeInteractive = useMemo(() => {
    if (!data.theme || !data.theme.id) {
      return undefined;
    }
    return shopifyThemes.find(shopifyTheme => shopifyTheme.id === data.theme?.id?.toString())?.name;
  }, [data.theme, shopifyThemes]);

  const availableThemesCanMigrate = useMemo(() => {
    if (!latestThemeInteractive) {
      return [];
    }
    return shopifyThemes.reduce<Option[]>((res, shopifyTheme) => {
      if (shopifyTheme.id === latestThemeInteractive) {
        return res;
      }
      return res.concat({ value: shopifyTheme.id, label: shopifyTheme.name });
    }, []);
  }, [latestThemeInteractive, shopifyThemes]);

  useEffect(() => {
    if (getThemesShopifyStatus === 'idle') {
      getThemesShopify.request(undefined);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!data.theme) {
      getThemeObject.request({ variant: 'Action chạy khi vào build hoặc vào client theme manager' });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data.theme]);

  const handleCancel = () => {
    setVisible(false);
  };

  return (
    <MyModal
      size="medium"
      isVisible={visibleModalMigration}
      onCancel={handleCancel}
      headerText="Migration"
      bodyCss={bodyModalStyles}
      contentCss={contentModalStyles}
      cancelText=""
      okText=""
    >
      <Text tagName="p" fontFamily="secondary" size={30}>
        Veda{' '}
        <Text fontFamily="secondary" tagName="span" color="primary" css={{ fontWeight: '500' }}>
          Migration
        </Text>{' '}
        Needed
      </Text>
      <Text tagName="p" fontFamily="secondary" size={14}>
        You've published another Shopify theme. Please migrate Veda Builder to your currently active theme to avoid unfortunate errors.
      </Text>
      <Space size={20} />
      <SelectAntd
        style={{ textAlign: 'left' }}
        value={targetThemeId}
        onChange={setTargetThemeId}
        loading={getThemesShopifyStatus === 'loading' || statusRequestThemeCssObject === 'loading'}
        options={availableThemesCanMigrate}
        placeholder="Select yoyr active theme..."
        showSearch
      />
      <Space size={20} />
      <Button
        radius={6}
        loading={migrateThemeShopifyStatus === 'loading' || statusSocketConnection === 'loading'}
        onClick={() => {
          if (targetThemeId) {
            connect({
              onSuccess: () => {
                migrateTheme.request({
                  targetThemeId: targetThemeId,
                  onFulfill: () => disconnect({}),
                  forceActive: true,
                });
              },
              onError: () => {
                notification.error({
                  message: i18n.t('publish_shopify.init_sync_error'),
                });
              },
            });
          }
        }}
      >
        {i18n.t('publish_shopify.migrate', { text: i18n.t('time.now') })}
      </Button>
      <Space size={10} />
      <Text fontFamily="secondary" tagName="small" size={12}>
        This process may take a few minutes
      </Text>
    </MyModal>
  );
};
