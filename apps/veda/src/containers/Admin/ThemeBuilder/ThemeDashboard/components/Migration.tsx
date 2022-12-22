import { notification } from 'antd';
import Button from 'components/Button';
import Box from 'components/FieldBox';
import MyModal from 'components/MyModal';
import SelectAntd, { Option } from 'components/SelectAntd';
import { useSocketForSyncShopify } from 'hooks/useSocket/useSocketForSyncShopify';
import { useEffect, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { useGetThemeObjectNCss } from 'store/actions/liquid/actionLiquidVariables';
import { liquidVariablesSelector } from 'store/selectors';
import { i18n } from 'translation';
import { FontAwesome, View } from 'wiloke-react-core';
import { useChangeThemeShopifyActivate, useGetThemeShopify, useMigrateThemeShopify } from '../slice/actions';
import { themeDashboardSelector, useSetModalChangeThemeShopifyActivate } from '../slice/sliceThemeDashboard';

const ModalChangeThemeShopifyActivate = () => {
  const { modalChangeThemeShopifyActivate, changeThemeShopifyActivateStatus } = useSelector(themeDashboardSelector);

  const changeThemeShopifyActivate = useChangeThemeShopifyActivate();
  const setModalChangeShopifyThemeActivate = useSetModalChangeThemeShopifyActivate();

  if (modalChangeThemeShopifyActivate) {
    return (
      <MyModal
        isVisible
        onOk={() => changeThemeShopifyActivate.request({ themeId: modalChangeThemeShopifyActivate.themeId })}
        onCancel={() => setModalChangeShopifyThemeActivate(undefined)}
        isLoading={changeThemeShopifyActivateStatus === 'loading'}
        okText={i18n.t('general.update')}
        headerText={i18n.t('general.active')}
      >
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Enim ex maiores similique nihil optio velit obcaecati soluta tempora praesentium
        voluptatibus.
      </MyModal>
    );
  }
  return null;
};

const Migration = () => {
  const migrateTheme = useMigrateThemeShopify();
  const getThemesShopify = useGetThemeShopify();
  const getThemeObject = useGetThemeObjectNCss();

  const [targetThemeId, setTargetThemeId] = useState(undefined);

  const { getThemesShopifyStatus, migrateThemeShopifyStatus, shopifyThemes } = useSelector(themeDashboardSelector);
  const { data, statusRequestThemeCssObject } = useSelector(liquidVariablesSelector);

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

  return (
    <Box.WithTitle
      title={`${i18n.t('publish_shopify.migrate')}`}
      description="Lorem ipsum dolor sit amet, consectetur adipiscing elit ut aliquam, purus sit amet luctus venenatis!"
      backgroundColor="light"
      borderWidth={0}
      radius={6}
      css={{ padding: '20px', marginBottom: '30px' }}
    >
      <View>
        <SelectAntd
          loading={getThemesShopifyStatus === 'loading' || statusRequestThemeCssObject === 'loading'}
          value={latestThemeInteractive}
          disabled
        />
        <View css={{ fontSize: '18px', textAlign: 'center' }}>
          <FontAwesome type="far" name="angle-down" />
        </View>
        <SelectAntd
          value={targetThemeId}
          onChange={setTargetThemeId}
          loading={getThemesShopifyStatus === 'loading' || statusRequestThemeCssObject === 'loading'}
          options={availableThemesCanMigrate}
        />
        <Button
          css={{ marginTop: '15px' }}
          radius={6}
          block
          loading={migrateThemeShopifyStatus === 'loading' || statusSocketConnection === 'loading'}
          onClick={() => {
            if (targetThemeId) {
              connect({
                onSuccess: () => {
                  migrateTheme.request({
                    targetThemeId: targetThemeId,
                    onFulfill: () => disconnect({}),
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
          {i18n.t('publish_shopify.migrate')}
        </Button>
      </View>
      <ModalChangeThemeShopifyActivate />
    </Box.WithTitle>
  );
};

export default Migration;
