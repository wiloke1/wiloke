import { notification } from 'antd';
import Button from 'components/Button';
import ButtonDropdown from 'components/ButtonDropdown';
import { CodeEditor, monacoCheckerAsync } from 'components/CodeEditor/CodeEditor';
import { DataItem } from 'components/Dropdown/Dropdown';
import SimpleTabs, { TabItem } from 'components/SimpleTabs';
import configureApp from 'configureApp';
import { useSetIframeLoaded } from 'containers/BuilderPage/store/iframeLoaded/slice';
import {
  useSetModalAdminAddonsVisible,
  useSetModalAdminMegaMenuVisible,
  useSetModalAdminSectionVisible,
  useSetModalDevAddonsVisible,
  useSetModalDevMegaMenuVisible,
  useSetModalDevSectionVisible,
} from 'containers/BuilderPage/store/saveForBuilder/slice';
import { useSaveSection } from 'containers/ChooseTemplate/store/actions';
import { replaceTagFake } from 'generate/utils/generateHelpers';
import { handleLiquidFile } from 'generate/utils/getFilesForSave/getHtmlFiles/utils/handleLiquidFile';
import useDelay from 'hooks/useDelay';
import { FC, ReactNode, useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import useGuarded from 'routes/useGuarded';
import { useCancelCode, useUpdateTemplateFile } from 'store/actions/actionPages';
import { useSetReloadPage } from 'store/actions/actionReloadPage';
import { useSetSectionIdActive } from 'store/actions/actionSectionIdActive';
import { appSettingsSelector } from 'store/global/appSettings/slice';
import { liquidSnippetsSelector, useSetLiquidSnippets, useUpdateLiquidSnippetContent } from 'store/global/globalSnippets/sliceGlobalSnippets';
import { useSetSectionEdittingId } from 'store/global/sectionEdittingId/actions';
import { useSetSectionIdCodeVisible } from 'store/global/sectionIdCodeVisible/slice';
import { useUpdateAddon } from 'store/global/themeAddons';
import { pageSectionsSelector, sectionActiveSelector, sectionEdittingIdSelector, sectionIdCodeVisibleSelector } from 'store/selectors';
import { i18n } from 'translation';
import { PageSection, ProductSection } from 'types/Sections';
import { Consts, LIMIT_LIQUID_FILE_SIZE } from 'utils/constants/constants';
import { isSectionAddons, isSectionMegamenu } from 'utils/functions/checkSectionType';
import { pmParent } from 'utils/functions/postMessage';
import { LiquidSyntaxToTwigError } from 'utils/LiquidSyntaxToTwig';
import { Space, View } from 'wiloke-react-core';
import ShowCssVariables from '../ShowCssVariables/ShowCssVariables';
import { Responsive } from '../TopBar/Responsive';
import { AddSectionAndPage } from './AddSectionAndPage/AddSectionAndPage';
import { EditorSchema } from './EditorSchema/EditorSchema';
import Iframe from './Iframe';
import { DEFAULT_FILE } from './ListLiquidFile/consts';
import { ListLiquidFile } from './ListLiquidFile/ListLiquidFile';
import { useCanEdit } from './ListLiquidFile/useCanEdit';
import { LivePreview } from './LivePreview';
import * as styles from './styles';
import { TabValue } from './types';
import { getLanguage, getValue } from './utils';

export interface ContentPageProps {}

const ContentPage: FC<ContentPageProps> = () => {
  const updateTemplateFile = useUpdateTemplateFile();
  const setSectionIdCodeVisible = useSetSectionIdCodeVisible();
  const cancelCode = useCancelCode();
  const setSectionIdActive = useSetSectionIdActive();
  const setSectionEdittingId = useSetSectionEdittingId();
  const setIframeLoaded = useSetIframeLoaded();
  const setModalDevSectionVisible = useSetModalDevSectionVisible();
  const setModalAdminMegaMenuVisible = useSetModalAdminMegaMenuVisible();
  const setModalDevMegaMenuVisible = useSetModalDevMegaMenuVisible();
  const setModalAdminSectionVisible = useSetModalAdminSectionVisible();
  const setModalDevAddonsVisible = useSetModalDevAddonsVisible();
  const setModalAdminAddonVisible = useSetModalAdminAddonsVisible();
  const saveToFavoriteSection = useSaveSection();
  const sectionIdCodeVisible = useSelector(sectionIdCodeVisibleSelector);
  const pageSections = useSelector(pageSectionsSelector);
  const sectionEdittingId = useSelector(sectionEdittingIdSelector);
  const appSettings = useSelector(appSettingsSelector);
  const sectionActive = useSelector(sectionActiveSelector);
  const [prevSection, setPrevSection] = useState<PageSection>();
  const section = pageSections.find(section => section.id === sectionEdittingId) as PageSection;
  const visible = !!section && !!sectionIdCodeVisible;
  const [liquidState, setLiquidState] = useState('');
  const [scssState, setScssState] = useState('');
  const [jsState, setJsState] = useState('');
  const [jsHookState, setJsHookState] = useState('');
  const [liquidSnippetsState, setLiquidSnippetsState] = useState<Record<string, string>>({});
  const defaultTabValue = 'liquid';
  const [tabValue, setTabValue] = useState<TabValue>(defaultTabValue);
  const guarded = useGuarded();
  const [delay, cancelDelay] = useDelay();
  const [delay2, cancelDelay2] = useDelay();
  const setReloadPage = useSetReloadPage();
  const updateAddon = useUpdateAddon();
  const [isSaved, setSaved] = useState(false);
  const [monacoLoadedState, setMonacoLoadedState] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [usingCtrlS, setUsingCtrlS] = useState(false);
  const [liquidFileActive, setLiquidFileActive] = useState(DEFAULT_FILE);
  const { data: liquidSnippets } = useSelector(liquidSnippetsSelector);
  const liquidSnippetsRef = useRef(liquidSnippets);
  const liquidFileContentActive = liquidFileActive === DEFAULT_FILE ? liquidState : liquidSnippetsState[liquidFileActive] ?? '';
  const updateLiquidSnippetContent = useUpdateLiquidSnippetContent();
  const setLiquidSnippets = useSetLiquidSnippets();
  const canEditSnippets = useCanEdit();

  useEffect(() => {
    if (sectionIdCodeVisible) {
      liquidSnippetsRef.current = liquidSnippets;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sectionIdCodeVisible, liquidSnippets]);

  useEffect(() => {
    setIframeLoaded(false);
    return () => {
      cancelDelay();
      cancelDelay2();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (isSaved && isSectionAddons(section.type)) {
      updateAddon({ section });
      setSaved(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSaved, section]);

  useEffect(() => {
    // Không lắng nghe section thay đổi
    if (!!sectionIdCodeVisible) {
      setTabValue(defaultTabValue);
      setPrevSection(section);
      setLiquidState(replaceTagFake(section.data.liquid));
      setScssState(section.data.scss ?? '');
      setJsState(section.data.js ?? '');
      setJsHookState(section.data.jsHook || Consts.JsHookComment);
      setLiquidSnippetsState(liquidSnippets);
    } else {
      setLiquidState('');
      setScssState('');
      setJsState('');
      setJsHookState('');
      setLiquidSnippetsState({});
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sectionIdCodeVisible, liquidSnippets]);

  const handleUpdateLiquidSnippets = () => {
    if (liquidFileActive !== DEFAULT_FILE) {
      updateLiquidSnippetContent({
        fileName: liquidFileActive,
        liquidContent: liquidSnippetsState[liquidFileActive] ?? '',
      });
    }
  };

  const handleUpdateTemplateFile = async (): Promise<{ hasError: boolean }> => {
    try {
      const result = handleLiquidFile({
        section: {
          ...section,
          data: {
            ...section.data,
            liquid: liquidState,
            js: jsState,
            jsHook: jsHookState,
            scss: scssState,
          },
        },
        lazyload: false,
        variant: isSectionAddons(section.type)
          ? 'addon -> cần compile'
          : isSectionMegamenu(section.type)
          ? 'megamenu -> cần compile'
          : 'section -> compile navigation',
      });
      if (![result.length].every(item => item < LIMIT_LIQUID_FILE_SIZE.value)) {
        notification.error({
          message: i18n.t('publish_shopify.limit_liquid_file_size', { size: LIMIT_LIQUID_FILE_SIZE.humanity }),
        });
        return { hasError: true };
      }
      await Promise.all([
        updateTemplateFile({
          sectionId: sectionEdittingId,
          fileType: 'liquid',
          value: liquidState,
        }),
        updateTemplateFile({
          sectionId: sectionEdittingId,
          fileType: 'scss',
          value: scssState,
        }),
        updateTemplateFile({
          sectionId: sectionEdittingId,
          fileType: 'js',
          value: jsState,
        }),
        updateTemplateFile({
          sectionId: sectionEdittingId,
          fileType: 'jsHook',
          value: jsHookState,
        }),
      ]);
      // Nếu update section có type là addons thì sẽ update reducer theme addons
      if (isSectionAddons(section.type)) {
        setSaved(true);
      }
      return { hasError: false };
    } catch (err) {
      console.log('Save Code Error', err);
      if (err instanceof LiquidSyntaxToTwigError) {
        notification.error({
          message: i18n.t('publish_shopify.error_in_code'),
          description: err.message,
        });
      } else {
        console.log(err);
        notification.error({
          message: i18n.t('publish_shopify.error_unknown.message'),
          description: i18n.t('publish_shopify.error_unknown.description'),
        });
      }
      return { hasError: true };
    }
  };

  useEffect(() => {
    if (usingCtrlS) {
      handleUpdateTemplateFile();
      handleUpdateLiquidSnippets();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [usingCtrlS]);

  const handleCancel = () => {
    setTabValue(defaultTabValue);
    if (!!prevSection) {
      setSectionIdCodeVisible({ sectionId: '' });
      cancelCode(prevSection);
    }
    setMonacoLoadedState(false);
    setLiquidSnippets(liquidSnippetsRef.current);
    setLiquidFileActive(DEFAULT_FILE);
    pmParent.emit('@animate');
  };

  const handleSave = async () => {
    setIsSaving(true);
    setTabValue('liquid');
    await delay2(100);
    const { hasError } = await handleUpdateTemplateFile();
    const liquidError = await monacoCheckerAsync('liquid', true);

    if (!hasError && !liquidError?.isError) {
      await delay();

      handleUpdateLiquidSnippets();
      setSectionIdCodeVisible({ sectionId: '' });
      setSectionIdActive('');
      setSectionEdittingId('');
      setTabValue(defaultTabValue);

      if (configureApp.forceReload) {
        setReloadPage(undefined);
      }
      pmParent.emit('@animate');
      setMonacoLoadedState(false);
      setLiquidFileActive(DEFAULT_FILE);
    }
    setIsSaving(false);
  };

  const handleTabChange = (tabValue: TabValue) => {
    setTabValue(tabValue);
    if (tabValue === 'preview') {
      handleUpdateTemplateFile();
      handleUpdateLiquidSnippets();
      if (configureApp.forceReload) {
        setReloadPage(undefined);
      }
    }
  };

  const handleSaveToMySection = () => {
    if (sectionActive && (sectionActive as ProductSection).parentCommandId) {
      saveToFavoriteSection.request({
        id: (sectionActive as ProductSection).parentCommandId,
        categories: sectionActive.category?.name ? [sectionActive.category.name] : ([] as string[]),
        name: sectionActive.label,
        image: sectionActive.image ?? { src: '', width: 0, height: 0 },
      });
    }
  };

  const handleSaveForBuilder = async () => {
    await handleUpdateTemplateFile();

    if (isSectionAddons(section.type)) {
      (guarded('admin') ? setModalAdminAddonVisible : setModalDevAddonsVisible)(true);
    } else if (isSectionMegamenu(section.type)) {
      (guarded('admin') ? setModalAdminMegaMenuVisible : setModalDevMegaMenuVisible)(true);
    } else {
      (guarded('admin') ? setModalAdminSectionVisible : setModalDevSectionVisible)(true);
    }
  };

  const renderContentWithSidebar = (content: ReactNode) => (
    <View css={[styles.textEditorWrap, /^(liquid|scss|js|jsHook)$/g.test(tabValue) ? {} : { display: 'none' }]}>
      {tabValue === 'liquid' && (
        <ListLiquidFile newSnippets={liquidSnippetsState} loaded={monacoLoadedState} fileName={liquidFileActive} onChange={setLiquidFileActive} />
      )}
      <View css={{ width: '100%' }}>{content}</View>
      {tabValue !== 'liquid' && <ShowCssVariables />}
    </View>
  );

  const renderActions = (
    <View css={styles.header} backgroundColor="light">
      <Button
        backgroundColor="gray2"
        color="gray8"
        size="extra-small"
        radius={4}
        fontFamily="secondary"
        css={{ fontWeight: 500 }}
        onClick={handleCancel}
      >
        {i18n.t('general.cancel')}
      </Button>
      <Space type="horizontal" size={10} />
      <ButtonDropdown
        dropdownData={[
          { icon: 'file', label: i18n.t('general.save_to_my_section'), value: 'save_to_my_section' },
          ...((guarded('admin')
            ? [
                { icon: 'user-alt', label: i18n.t('builderPage.save_for', { text: i18n.t('general.admin') }), value: 'save_for_builder' },
                { icon: 'user-alt', label: i18n.t('builderPage.save_for', { text: i18n.t('builderPage.dev') }), value: 'save_for_dev' },
              ]
            : guarded('dev')
            ? [{ icon: 'user-alt', label: i18n.t('builderPage.save_for', { text: i18n.t('builderPage.builder') }), value: 'save_for_builder' }]
            : []) as DataItem[]),
        ]}
        onClick={handleSave}
        onClickItemDropdown={value => {
          if (value === 'save_to_my_section') {
            handleSaveToMySection();
          } else if (value === 'save_for_builder') {
            handleSaveForBuilder();
          } else {
            if (isSectionAddons(section.type)) {
              setModalDevAddonsVisible(true);
            } else {
              setModalDevSectionVisible(true);
            }
          }
        }}
      >
        {isSaving
          ? i18n.t('general.saving', { text: i18n.t('general.code'), textTransform: 'capitalize' })
          : i18n.t('general.save', { text: i18n.t('general.code'), textTransform: 'capitalize' })}
      </ButtonDropdown>
    </View>
  );

  return (
    <View>
      {visible && renderActions}
      <SimpleTabs
        data={
          monacoLoadedState
            ? [
                { label: 'Liquid', value: 'liquid' },
                { label: 'Scss', value: 'scss' },
                { label: 'Javascript', value: 'js' },
                ...((appSettings.data.jsHookEnabled ? [{ label: 'Javascript Hook', value: 'jsHook' }] : []) as TabItem<TabValue>[]),
                { label: i18n.t('general.schema'), value: 'schema' },
                { label: i18n.t('general.preview'), value: 'preview' },
              ]
            : [{ label: `${i18n.t('general.loading')}...`, value: 'liquid' }]
        }
        TabRight={
          <>
            {monacoLoadedState && <LivePreview />}
            {tabValue === 'preview' ? (
              <View css={{ display: 'flex', marginLeft: '10px' }}>
                <Responsive />
              </View>
            ) : null}
          </>
        }
        highlightIndex={5}
        tabHide={!visible}
        defaultValue={tabValue}
        value={tabValue}
        tabCss={styles.tab}
        tabItemCss={() => styles.tabItem}
        onChange={handleTabChange}
      >
        {tabValue => (
          <View css={{ className: 'ContentPage-tab', position: 'relative', height: 'calc(100vh - 54px)', overflow: 'hidden' }}>
            {visible && (
              <>
                {renderContentWithSidebar(
                  <CodeEditor
                    id={tabValue + liquidFileActive}
                    language={getLanguage(tabValue)}
                    value={getValue(tabValue, liquidFileContentActive, scssState, jsState, jsHookState)}
                    sectionSettings={section.data.settings}
                    sectionCoding={pageSections.find(section => section.id === sectionIdCodeVisible)}
                    onLoaded={() => setMonacoLoadedState(true)}
                    options={{
                      readOnly: tabValue === 'liquid' && liquidFileActive !== DEFAULT_FILE && !canEditSnippets,
                    }}
                    onChange={value => {
                      if (tabValue === 'liquid') {
                        if (liquidFileActive === DEFAULT_FILE) {
                          setLiquidState(value ?? '');
                        } else {
                          setLiquidSnippetsState(state => ({
                            ...state,
                            [liquidFileActive]: value ?? '',
                          }));
                        }
                      } else if (tabValue === 'scss') {
                        setScssState(value ?? '');
                      } else if (tabValue === 'js') {
                        setJsState(value ?? '');
                      } else if (tabValue === 'jsHook') {
                        setJsHookState(value?.replace(i18n.t('builderPage.js_hook_state'), Consts.JsHookComment) ?? '');
                      }
                      setUsingCtrlS(false);
                    }}
                    onSave={() => {
                      setUsingCtrlS(true);
                    }}
                  />,
                )}
                <View css={styles.content(tabValue, 'schema')}>
                  <EditorSchema />
                </View>
              </>
            )}
            <View css={visible ? styles.content(tabValue, 'preview') : {}}>{pageSections.length > 0 ? <Iframe /> : <AddSectionAndPage />}</View>
          </View>
        )}
      </SimpleTabs>
    </View>
  );
};

export default ContentPage;
