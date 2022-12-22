import CssVariableBtn from 'components/CssVariableBtn';
import InlineMenu from 'components/InlineMenu';
import MyModal from 'components/MyModal';
import NavItemSetting from 'components/NavItemSetting/NavItemSetting';
import { ShopifyTranslation } from 'components/ShopifyTranslation/ShopifyTranslation';
import Tooltip from 'components/Tooltip';
import { dashboardPageSettingsSelector, useChangeSettingsDashboardPage, useCheckSlugExist } from 'containers/Admin/PageBuilder/DashboardPageSettings';
import { settingsVisibleSelector, useSetSettingsVisible } from 'containers/BuilderPage/store/settingsVisible/slice';
import useDelay from 'hooks/useDelay';
import { clone, equals } from 'ramda';
import { FC, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useSetLayoutSettings } from 'store/actions/actionLayoutSettings';
import { useSetModalSettingsOk } from 'store/actions/actionModalSettingsOk';
import { useSetPage } from 'store/actions/actionPages';
import { useSetReloadPage } from 'store/actions/actionReloadPage';
import { useSetVendors } from 'store/actions/actionVendors';
import { useGetLiquidTranslationsObject } from 'store/actions/liquid/actionLiquidVariables';
import { useSetCssVariables } from 'store/global/cssVariables/slice';
import { useSetGeneralSettingsPage } from 'store/global/generalSettings/slice';
import { useSetGlobalJs } from 'store/global/globalJs/slice';
import { useSetGlobalScss } from 'store/global/globalScss/slice';
import { globalThemeJsSelector, useSetGlobalThemeJs } from 'store/global/globalThemeJs/slice';
import { globalThemeScssSelector, useSetGlobalThemeScss } from 'store/global/globalThemeScss/slice';
import { globalThemeTranslationSelector, useEditGlobalThemeTransition, useSetGlobalThemeTranslation } from 'store/global/globalTranslation/slice';
import { useSetFileDraft } from 'store/global/importFileDraft/slice';
import { useSetPreloaderTesting } from 'store/global/preloaderTesting/slice';
import { useSetThemeGeneralSettings } from 'store/global/themeSettings/slice';
import { themeVendorsSelector, useSetThemeVendors } from 'store/global/themeVendors/slice';
import {
  cssVariablesSelector,
  generalSettingsSelector,
  globalJsSelector,
  globalScssSelector,
  importFileDraftSelector,
  layoutSettingsSelector,
  pageDataSelector,
  themeGeneralSettingsSelector,
  vendorsSelector,
} from 'store/selectors';
import { i18n } from 'translation';
import { CssVariables, LayoutSettings, PageGeneralSettings, ThemeGeneralSettings, ThemeTranslations, Vendor } from 'types/Result';
import getPageInfo from 'utils/functions/getInfo';
import { FontAwesome, Space, View } from 'wiloke-react-core';
import { pageSettings, PageSettingValue, Setting, settings, themeSettings, ThemeSettingValue } from './data';
import { useFileContent } from './PageSettings/ImportFile';
import PageSettings from './PageSettings/PageSettings';
import * as styles from './styles';
import ThemeSettings from './ThemeSettings/ThemeSettings';

export interface ModalSettingsProps {}

const ModalSettings: FC<ModalSettingsProps> = ({}) => {
  const cssVariables = useSelector(cssVariablesSelector);
  const vendors = useSelector(vendorsSelector);
  const globalScss = useSelector(globalScssSelector);
  const globalJs = useSelector(globalJsSelector);
  const globalThemeScss = useSelector(globalThemeScssSelector);
  const globalThemeJs = useSelector(globalThemeJsSelector);
  const globalThemeJson = useSelector(globalThemeTranslationSelector);
  const layoutSettings = useSelector(layoutSettingsSelector);
  const generalSettings = useSelector(generalSettingsSelector);
  const themeGeneralSettings = useSelector(themeGeneralSettingsSelector);
  const themeVendors = useSelector(themeVendorsSelector);
  const { visible, keys } = useSelector(settingsVisibleSelector);

  const [oldCssVariables, setOldCssVariables] = useState<CssVariables>();
  const [oldVendors, setOldVendors] = useState<Vendor[]>();
  const [oldThemeVendors, setOldThemeVendors] = useState<Vendor[]>();
  const [oldLayoutSettings, setOldLayoutSettings] = useState<LayoutSettings>();
  const [oldGeneralSettings, setOldGeneralSettings] = useState<PageGeneralSettings>();
  const [oldThemeGeneralSettings, setOldThemeGeneralSettings] = useState<ThemeGeneralSettings>();
  const [oldThemeTranslation, setOldThemeTranslation] = useState<ThemeTranslations>({ en: '', fr: '', vi: '' });

  const setSettingsVisible = useSetSettingsVisible();
  const setModalSettingsOk = useSetModalSettingsOk();

  const setVendors = useSetVendors();
  const setGlobalScss = useSetGlobalScss();
  const setGlobalJs = useSetGlobalJs();
  const setGeneralSettings = useSetGeneralSettingsPage();

  const setCssVariables = useSetCssVariables();
  const setGlobalThemeScss = useSetGlobalThemeScss();
  const setGlobalThemeJs = useSetGlobalThemeJs();
  const setGlobalThemeJson = useSetGlobalThemeTranslation();
  const setLayoutSettings = useSetLayoutSettings();
  const setThemeVendors = useSetThemeVendors();
  const setThemeGeneralSettings = useSetThemeGeneralSettings();
  const updateCurrentJson = useEditGlobalThemeTransition();

  const getLiquidTranslationsObject = useGetLiquidTranslationsObject();

  const [globalScssState, setGlobalScssState] = useState('');
  const [globalJsState, setGlobalJsState] = useState('');
  const [globalThemeScssState, setGlobalThemeScssState] = useState('');
  const [globalThemeJsState, setGlobalThemeJsState] = useState('');

  const setReloadPage = useSetReloadPage();
  const { fileContent } = useSelector(importFileDraftSelector);
  const setPage = useSetPage();
  const setFileDraft = useSetFileDraft();
  const [, setFileContentState] = useFileContent();
  const setPreloaderTesting = useSetPreloaderTesting();
  const [delay] = useDelay();
  const isTheme = !!getPageInfo('themeId');
  const checkSlugExist = useCheckSlugExist();
  const page = useSelector(pageDataSelector);
  const { checkSlugStatus, isChangingHandle } = useSelector(dashboardPageSettingsSelector);
  const changeSettings = useChangeSettingsDashboardPage();

  useEffect(() => {
    if (visible) {
      setOldCssVariables(clone(cssVariables));
      setOldVendors(clone(vendors));
      setGlobalScssState(globalScss);
      setGlobalJsState(globalJs);
      setGlobalThemeScssState(globalThemeScss);
      setGlobalThemeJsState(globalThemeJs);
      setOldThemeTranslation(clone(globalThemeJson.translation as ThemeTranslations));
      setOldLayoutSettings(clone(layoutSettings));
      setOldGeneralSettings(clone(generalSettings));
      setOldThemeGeneralSettings(clone(themeGeneralSettings));
      setOldThemeVendors(clone(themeVendors));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visible]);

  const renderSubMenuItem = (item: Setting<ThemeSettingValue> | Setting<PageSettingValue>) => {
    return (
      <InlineMenu.Item key={item.value} width={280} itemId={item.value}>
        <NavItemSetting
          title={item.label}
          text={item.description}
          iconName={item.icon}
          iconType={item.iconType}
          active={keys.includes(item.value)}
          containerCss={styles.navItem}
        />
      </InlineMenu.Item>
    );
  };

  const handleAccepSettings = async () => {
    setModalSettingsOk(true);
    setSettingsVisible({ visible: false, keys: [] });
    changeSettings({ isChangingHandle: false });
    if (fileContent?.pageSettings?.globalJs) {
      setGlobalJs({ js: fileContent.pageSettings.globalJs });
    } else {
      setGlobalJs({ js: globalJsState });
    }
    if (fileContent?.pageSettings?.globalScss) {
      setGlobalScss({ scss: fileContent.pageSettings.globalScss });
    } else {
      setGlobalScss({ scss: globalScssState });
    }
    if (!!fileContent?.pageSettings?.vendors) {
      setVendors({ vendors: fileContent.pageSettings.vendors });
    }
    if (!!fileContent?.page) {
      setPage(fileContent.page);
    }

    setGlobalThemeScss(globalThemeScssState);
    setGlobalThemeJs(globalThemeJsState);

    const translation = ShopifyTranslation.getValue(globalThemeJson.languageActive);
    updateCurrentJson(translation ? JSON.stringify(translation) : globalThemeJson.translation[globalThemeJson.languageActive] ?? '');

    // @tuong -> Update liquid variable
    getLiquidTranslationsObject.request({});

    if (
      globalJs !== globalJsState ||
      globalThemeJs !== globalThemeJsState ||
      // Nếu có import file và globalJs khác globalJs của file thì ta reload
      (!!fileContent?.pageSettings && globalJs !== fileContent?.pageSettings?.globalJs) ||
      // Nếu js trong vendors khác nhau
      !equals(
        oldVendors?.map(item => item.js),
        vendors.map(item => item.js),
      )
    ) {
      setReloadPage(undefined);
    }
    await delay(2000);
    setPreloaderTesting(false);
  };

  const acceptNewSettings = async () => {
    if (isChangingHandle) {
      checkSlugExist.request({
        handle: generalSettings.handle,
        commandId: page.commandId,
        pageType: page.type,
        callback: handleAccepSettings,
      });
    } else {
      handleAccepSettings();
    }
  };

  const resetToDefaultSettings = () => {
    setSettingsVisible({ visible: false, keys: [] });
    changeSettings({ isChangingHandle: false });
    setFileDraft({});
    if (!!oldCssVariables) {
      setCssVariables({
        colors: oldCssVariables.colors,
        fonts: oldCssVariables.fonts,
      });
    }
    if (!!oldVendors) {
      setVendors({ vendors: oldVendors });
    }
    if (!!oldThemeVendors) {
      setThemeVendors({ vendors: oldThemeVendors });
    }
    if (!!oldLayoutSettings) {
      setLayoutSettings(oldLayoutSettings);
    }
    if (!!oldGeneralSettings) {
      setGeneralSettings({ settings: oldGeneralSettings });
    }
    if (!!oldThemeGeneralSettings) {
      setThemeGeneralSettings(oldThemeGeneralSettings);
    }
    if (!!oldThemeTranslation) {
      setGlobalThemeJson(oldThemeTranslation);
    }
    setPreloaderTesting(false);
  };

  return (
    <>
      <MyModal
        isVisible={visible}
        scrollDisabled
        size="large"
        headerText={i18n.t('general.settings')}
        onCancel={resetToDefaultSettings}
        isLoading={checkSlugStatus === 'loading'}
        onOk={acceptNewSettings}
        contentCss={{ padding: 0 }}
      >
        <View css={styles.body}>
          <InlineMenu onChange={keys => setSettingsVisible({ keys })} defaultItemIds={keys} width={502}>
            {settings.map(setting => (
              <InlineMenu.SubMenu
                key={setting.value}
                titleWidth={220}
                width={280}
                itemId={setting.value}
                title={
                  <NavItemSetting
                    title={setting.label}
                    iconType={setting.iconType}
                    iconName={setting.icon}
                    active={keys.includes(setting.value)}
                    containerCss={styles.navItem}
                  />
                }
              >
                {(setting.value === 'theme'
                  ? themeSettings
                  : // Nếu là theme thì xoá general từ page settings
                  isTheme
                  ? pageSettings.filter(setting => setting.value !== 'general')
                  : pageSettings
                ).map(renderSubMenuItem)}
              </InlineMenu.SubMenu>
            ))}
          </InlineMenu>
          <View css={styles.content}>
            {keys[0] === 'theme' && <ThemeSettings keyActive={keys[1]} onChangeScss={setGlobalThemeScssState} onChangeJs={setGlobalThemeJsState} />}
            {keys[0] === 'page' && <PageSettings keyActive={keys[1]} onChangeScss={setGlobalScssState} onChangeJs={setGlobalJsState} />}
          </View>
        </View>
      </MyModal>
      <Tooltip
        text={i18n.t('general.settings', { text: i18n.t('general.theme'), textTransform: 'capitalize' })}
        placement="bottom"
        onClick={() => {
          setSettingsVisible({ visible: true, keys: ['theme', 'colors'] });
          setFileDraft({});
          setFileContentState(undefined);
          setModalSettingsOk(false);
        }}
      >
        <CssVariableBtn colors={cssVariables.colors} fonts={cssVariables.fonts} />
      </Tooltip>
      <Space size={10} type="horizontal" />
      <Tooltip
        text={i18n.t('general.settings')}
        placement="bottom"
        css={styles.settingBtn}
        onClick={() => {
          setSettingsVisible({ visible: true, keys: [isTheme ? 'theme' : 'page', 'general'] });
          setFileDraft({});
          setFileContentState(undefined);
          setModalSettingsOk(false);
        }}
      >
        <FontAwesome type="far" name="cog" size={18} color="gray8" />
      </Tooltip>
    </>
  );
};

export default ModalSettings;
