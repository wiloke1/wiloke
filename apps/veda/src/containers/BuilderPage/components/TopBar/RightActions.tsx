import { notification } from 'antd';
import Button from 'components/Button';
import ButtonDropdown from 'components/ButtonDropdown';
import { DataItem } from 'components/Dropdown/Dropdown';
import { useSetPreviewLoaded } from 'containers/BuilderPage/store/previewLoaded/slice';
import { useSavePageForUser, useSaveTheme } from 'containers/BuilderPage/store/saveForBuilder/actions';
import {
  useSetModalAdminPageVisible,
  useSetModalDevPageVisible,
  useSetModalPageVisible,
  useSetModalThemeVisible,
} from 'containers/BuilderPage/store/saveForBuilder/slice';
import { ModalAskBeforeSave, useSetAskBeforeSaveVisible } from 'containers/ModalAskBeforeSave';
import { useSocketForSyncShopify } from 'hooks/useSocket/useSocketForSyncShopify';
import { useUndoRedoForRedux } from 'hooks/useUndoRedoForRedux/useUndoRedoForRedux';
import { FC, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
import useGuarded from 'routes/useGuarded';
import { useSetPageAfterCreate } from 'store/actions/actionPages';
import { usePreviewWithShopify } from 'store/global/socket/actions';
import { syncPageNotification } from 'store/global/socket/watchSyncToShopify';
import { pageDataSelector, pagesDataSelector, saveForBuilderSelector, socketOfSyncShopifySelector } from 'store/selectors';
import { i18n } from 'translation';
import { AddonOfTheme_Atom_N_Client } from 'types/Addons';
import { PageOfThemeService } from 'types/Page';
import { Result } from 'types/Result';
import { SectionOfPage_Atom_N_ClientOrTheme_Atom_N_Client } from 'types/Sections';
import { Consts } from 'utils/constants/constants';
import getPageInfo from 'utils/functions/getInfo';
import { pmPopup } from 'utils/functions/postMessage';
import { getEntityVariant } from 'utils/getEntityVariant';
import { LiquidSyntaxToTwigError } from 'utils/LiquidSyntaxToTwig';
import { isThemeBuilder } from 'utils/validateBuilderMode';
import { View } from 'wiloke-react-core';
import * as styles from './styles';
import useResultForPreview from './useResultForPreview';
import useResultForSave from './useResultForSave';

const RightActions: FC = () => {
  const { statusSyncToShopify, statusPreviewWithShopify } = useSelector(socketOfSyncShopifySelector);
  const { savePageStatus, saveThemeStatus } = useSelector(saveForBuilderSelector);
  const page = useSelector(pageDataSelector);
  const pages = useSelector(pagesDataSelector);

  const id = getPageInfo('id');
  const themeId = getPageInfo('themeId');
  const shop = getPageInfo('shop');

  const modalPageVisible = useSetModalPageVisible();
  const setPreviewLoaded = useSetPreviewLoaded();
  const { getResult: getResultForSave, isExtracting: isExtractingForSave } = useResultForSave();
  const { getResult: getResultForPreview, isExtracting: isExtractingForPreview } = useResultForPreview();
  const guarded = useGuarded();
  const history = useHistory<'/builder'>();
  const location = useLocation<'/builder'>();

  const savePageForUser = useSavePageForUser();
  const saveTheme = useSaveTheme();
  const setThemeVisible = useSetModalThemeVisible();
  const setVisible = useSetAskBeforeSaveVisible();
  const setPageAfterCreate = useSetPageAfterCreate();

  const previewWithShopify = usePreviewWithShopify();

  const setModalAdminPageVisible = useSetModalAdminPageVisible();
  const setModalDevPageVisible = useSetModalDevPageVisible();

  const { connect, disconnect, statusSocketConnection } = useSocketForSyncShopify();

  const isSyncingForSave = useMemo(() => {
    return (
      statusSocketConnection === 'loading' ||
      statusSyncToShopify === 'loading' ||
      isExtractingForSave ||
      savePageStatus === 'loading' ||
      saveThemeStatus === 'loading'
    );
  }, [isExtractingForSave, savePageStatus, saveThemeStatus, statusSocketConnection, statusSyncToShopify]);

  const isSyncingForPreview = useMemo(() => {
    return statusSocketConnection === 'loading' || isExtractingForPreview || statusPreviewWithShopify === 'loading';
  }, [isExtractingForPreview, statusPreviewWithShopify, statusSocketConnection]);

  const handleLivePreview = () => {
    setPreviewLoaded(false);
    pmPopup.setPopup(`/preview?shop=${shop}&id=${id}${themeId ? `&themeId=${themeId}` : ''}`);
  };

  const handlePreview = () => {
    connect({
      onSuccess: async () => {
        const result = await getResultForPreview('throw');
        previewWithShopify.request({
          result,
          onSyncFulfill: () => disconnect({}),
        });
      },
      onError: () => {
        notification.error({ message: i18n.t('publish_shopify.init_sync_error') });
      },
    });
  };

  const clearLabelParams = () => {
    const state = {
      ...history.location.state,
      label: '',
      handle: '',
      isCreate: false,
    };
    history.replace({ ...history.location, state });
  };

  const handleVisible = () => {
    setVisible(true);
  };

  const handleOverride = async (isOverride: boolean) => {
    setVisible(false);
    syncPageNotification.next({
      title: 'Step 1',
      description: i18n.t('publish_shopify.init_sync'),
    });

    connect({
      onSuccess: async () => {
        try {
          const result = await getResultForSave('throw');

          const result_with_enable_page: Result = {
            ...result,
            pages: {
              ...result.pages,
              [id]: {
                ...result.pages[id],
                data: {
                  ...result.pages[id].data,
                  page: {
                    ...result.pages[id].data.page,
                    enable: true,
                  },
                },
              },
            },
          };

          const pageData = result_with_enable_page.pages[page.commandId];

          // Nếu page không có section thì không cho save
          if (typeof pageData === 'undefined') {
            notification.error({
              message: i18n.t('builderPage.must_have_section'),
            });
            return;
          }

          // nếu params có themeId thì là save theme còn không là save page
          if (!isThemeBuilder()) {
            const isCreatePage = (id === Consts.BlankCommandId && page.commandId === Consts.BlankCommandId) || location.state?.isCreate === true;

            savePageForUser.request({
              isDraft: false,
              isOverrideIndividualPages: isOverride,
              data: { ...page },
              type: isCreatePage ? 'create' : 'update',
              result: pageData,
              addons: result_with_enable_page.theme.addons,
              builderType: 'page',
              previewImage: pageData.data.page.image ?? { src: '', height: 0, width: 0 },
              outputBuilder: result_with_enable_page,
              onFulfill: pageResponse => {
                useUndoRedoForRedux.reset?.();
                disconnect({});
                if (isCreatePage) {
                  // @duong: Nếu là tạo page thì sau khi save thành công sẽ thay id ở trên params bằng id mới của server trả về và xóa state params ở bên dashboard bắn sang
                  history.replace({
                    ...history.location,
                    state: {
                      ...history.location.state,
                      label: '',
                      isCreate: false,
                      isAdminTemplate: false,
                      entityVariant: 'Client',
                    },
                    search: `?shop=${shop}&id=${pageResponse.commandId}${!!themeId ? '&themeId=' + themeId : ''}&entityVariant=${history.location
                      .state?.entityVariant || 'Client'}`,
                  });

                  setPageAfterCreate(pageResponse);
                }
              },
              settings: {
                generalSettings: pageData.data.pageSettings.generalSettings,
                globalJs: pageData.data.pageSettings.globalJs,
                globalScss: pageData.data.pageSettings.globalScss,
                vendors: pageData.data.pageSettings.vendors,
                cssVariables: result_with_enable_page.theme.themeSettings.cssVariables,
                layoutSettings: result_with_enable_page.theme.themeSettings.layoutSettings,
              },
              page: pageData.data.page as PageOfThemeService,
            });
          } else {
            const pageIds = Object.values(pages).map(item => item.commandId);

            saveTheme.request({
              isDraft: false,
              variant: getEntityVariant(location as any),
              commandId: themeId,
              featuredImage: result_with_enable_page.theme.themeSettings.generalSettings.featuredImage ?? '',
              globalJs: result_with_enable_page.theme.globalJs,
              globalScss: result_with_enable_page.theme.globalScss,
              isOverrideIndividualPages: isOverride,
              name: result_with_enable_page.theme.themeSettings.generalSettings.label,
              outputBuilder: result_with_enable_page,
              pageIds: pageIds,
              themeSettings: result_with_enable_page.theme.themeSettings,
              vendors: {
                data: result_with_enable_page.theme.vendors,
              },
              addons: result_with_enable_page.theme.addons as AddonOfTheme_Atom_N_Client[],
              headers: (result_with_enable_page.theme.header ?? []) as SectionOfPage_Atom_N_ClientOrTheme_Atom_N_Client[],
              footers: (result_with_enable_page.theme.footer ?? []) as SectionOfPage_Atom_N_ClientOrTheme_Atom_N_Client[],
              onFulfill: () => {
                disconnect({});
              },
            });
            clearLabelParams();
          }
        } catch (err) {
          console.log(err);
          disconnect({});
          if (err instanceof LiquidSyntaxToTwigError) {
            notification.error({
              message: i18n.t('publish_shopify.error_in_code'),
              description: err.message,
            });
          } else if (err instanceof Error) {
            notification.error({
              message: i18n.t('publish_shopify.error_unknown.message'),
              description: i18n.t('publish_shopify.error_unknown.description'),
            });
          }
        }
      },
      onError: () => {
        notification.error({ message: i18n.t('publish_shopify.init_sync_error') });
      },
    });
  };

  const handleSaveAsDraft = async () => {
    syncPageNotification.next({
      title: 'Step 1',
      description: i18n.t('publish_shopify.init_sync'),
    });
    try {
      const result = await getResultForSave('throw');

      const result_with_enable_page: Result = {
        ...result,
        pages: {
          ...result.pages,
          [id]: {
            ...result.pages[id],
            data: {
              ...result.pages[id].data,
              page: {
                ...result.pages[id].data.page,
                enable: true,
              },
            },
          },
        },
      };

      const pageData = result_with_enable_page.pages[page.commandId];

      // Nếu page không có section thì không cho save
      if (typeof pageData === 'undefined') {
        notification.error({
          message: i18n.t('builderPage.must_have_section'),
        });
        return;
      }

      // nếu params có themeId thì là save theme còn không là save page
      if (!isThemeBuilder()) {
        const isCreatePage = (id === Consts.BlankCommandId && page.commandId === Consts.BlankCommandId) || location.state?.isCreate === true;

        savePageForUser.request({
          isDraft: true,
          isOverrideIndividualPages: false,
          data: { ...page },
          type: isCreatePage ? 'create' : 'update',
          result: pageData,
          addons: result_with_enable_page.theme.addons,
          builderType: 'page',
          previewImage: pageData.data.page.image ?? { src: '', height: 0, width: 0 },
          outputBuilder: result_with_enable_page,
          onFulfill: pageResponse => {
            syncPageNotification.done();
            if (isCreatePage) {
              // @duong: Nếu là tạo page thì sau khi save thành công sẽ thay id ở trên params bằng id mới của server trả về và xóa state params ở bên dashboard bắn sang
              history.replace({
                ...history.location,
                state: {
                  ...history.location.state,
                  label: '',
                  isCreate: false,
                  isAdminTemplate: false,
                  entityVariant: 'Client',
                },
                search: `?shop=${shop}&id=${pageResponse.commandId}${!!themeId ? '&themeId=' + themeId : ''}&entityVariant=${history.location.state
                  ?.entityVariant || 'Client'}`,
              });

              setPageAfterCreate(pageResponse);
            }
          },
          settings: {
            generalSettings: pageData.data.pageSettings.generalSettings,
            globalJs: pageData.data.pageSettings.globalJs,
            globalScss: pageData.data.pageSettings.globalScss,
            vendors: pageData.data.pageSettings.vendors,
            cssVariables: result_with_enable_page.theme.themeSettings.cssVariables,
            layoutSettings: result_with_enable_page.theme.themeSettings.layoutSettings,
          },
          page: pageData.data.page as PageOfThemeService,
        });
      } else {
        const pageIds = Object.values(pages).map(item => item.commandId);

        saveTheme.request({
          isDraft: true,
          variant: getEntityVariant(location as any),
          commandId: themeId,
          featuredImage: result_with_enable_page.theme.themeSettings.generalSettings.featuredImage ?? '',
          globalJs: result_with_enable_page.theme.globalJs,
          globalScss: result_with_enable_page.theme.globalScss,
          isOverrideIndividualPages: false,
          name: result_with_enable_page.theme.themeSettings.generalSettings.label,
          outputBuilder: result_with_enable_page,
          pageIds: pageIds,
          themeSettings: result_with_enable_page.theme.themeSettings,
          vendors: {
            data: result_with_enable_page.theme.vendors,
          },
          addons: result_with_enable_page.theme.addons as AddonOfTheme_Atom_N_Client[],
          headers: (result_with_enable_page.theme.header ?? []) as SectionOfPage_Atom_N_ClientOrTheme_Atom_N_Client[],
          footers: (result_with_enable_page.theme.footer ?? []) as SectionOfPage_Atom_N_ClientOrTheme_Atom_N_Client[],
          onFulfill() {
            syncPageNotification.done();
          },
        });
        clearLabelParams();
      }
    } catch (err) {
      console.log(err);
      if (err instanceof LiquidSyntaxToTwigError) {
        notification.error({
          message: i18n.t('publish_shopify.error_in_code'),
          description: err.message,
        });
      } else if (err instanceof Error) {
        notification.error({
          message: i18n.t('publish_shopify.error_unknown.message'),
          description: i18n.t('publish_shopify.error_unknown.description'),
        });
      }
    }
  };

  return (
    <View css={styles.right}>
      <View css={{ marginRight: '10px' }}>
        <Button
          backgroundColor="gray2"
          color="gray8"
          size="small"
          radius={4}
          fontFamily="secondary"
          css={{ fontWeight: 500, height: '36px', fontSize: '13px', paddingTop: '8px', paddingBottom: '8px' }}
          onClick={handleLivePreview}
        >
          {i18n.t('general.live_preview')}
        </Button>
      </View>
      <View css={{ marginRight: '10px' }}>
        <Button
          backgroundColor="gray2"
          color="gray8"
          size="small"
          radius={4}
          fontFamily="secondary"
          css={{ fontWeight: 500, height: '36px', fontSize: '13px', paddingTop: '8px', paddingBottom: '8px' }}
          onClick={handlePreview}
          loading={isSyncingForPreview}
          disabled={isSyncingForSave}
          tooltip={isSyncingForSave ? { text: i18n.t('publish_shopify.process_used'), placement: 'bottom' } : undefined}
        >
          {isExtractingForSave ? i18n.t('builderPage.extracting') : i18n.t('general.preview')}
        </Button>
      </View>
      <View>
        <ButtonDropdown
          loading={isSyncingForSave}
          disabled={isSyncingForPreview}
          tooltip={isSyncingForPreview ? { text: i18n.t('publish_shopify.process_used'), placement: 'bottom' } : undefined}
          dropdownData={[
            { icon: 'file', label: i18n.t('builderPage.save_as_draft'), value: 'save_as_draft' },
            ...((guarded('admin', 'dev')
              ? [{ icon: 'user-alt', label: i18n.t('builderPage.save_for', { text: i18n.t('builderPage.builder') }), value: 'save_for_builder' }]
              : []) as DataItem[]),
            ...((guarded('admin', 'dev')
              ? [{ icon: 'user-tie', label: i18n.t('builderPage.save_for', { text: i18n.t('builderPage.dev') }), value: 'save_for_dev' }]
              : []) as DataItem[]),
            ...((guarded('admin', 'dev')
              ? [{ icon: 'user-shield', label: i18n.t('builderPage.save_for', { text: i18n.t('general.admin') }), value: 'save_for_admin' }]
              : []) as DataItem[]),
          ]}
          onClick={handleVisible}
          onClickItemDropdown={value => {
            if (!isThemeBuilder() && value === 'save_for_builder') {
              modalPageVisible(true);
            }
            if (isThemeBuilder() && value === 'save_for_builder') {
              setThemeVisible(true);
            }
            if (value === 'save_as_draft') {
              handleSaveAsDraft();
            }
            if (value === 'save_for_admin') {
              setModalAdminPageVisible(true);
            }
            if (value === 'save_for_dev') {
              setModalDevPageVisible(true);
            }
          }}
        >
          {statusSocketConnection === 'loading'
            ? i18n.t('publish_shopify.init_sync')
            : isExtractingForSave
            ? i18n.t('builderPage.extracting')
            : savePageStatus === 'loading' || saveThemeStatus === 'loading'
            ? i18n.t('builderPage.saving')
            : statusSyncToShopify === 'loading'
            ? i18n.t('publish_shopify.syncing')
            : i18n.t('general.publish', { text: i18n.t(isThemeBuilder() ? 'general.theme' : 'general.page'), textTransform: 'capitalize' })}
        </ButtonDropdown>
      </View>

      {/* save and publish modal  */}
      <ModalAskBeforeSave
        headerText={i18n.t('builderPage.save_and_publish')}
        isLoading={
          statusSocketConnection === 'loading' ||
          isExtractingForSave ||
          statusSyncToShopify === 'loading' ||
          savePageStatus === 'loading' ||
          saveThemeStatus === 'loading'
        }
        okText={
          statusSocketConnection === 'loading'
            ? i18n.t('publish_shopify.init_sync')
            : isExtractingForSave
            ? i18n.t('builderPage.extracting')
            : savePageStatus === 'loading' || saveThemeStatus === 'loading'
            ? i18n.t('builderPage.saving')
            : statusSyncToShopify === 'loading'
            ? i18n.t('publish_shopify.syncing')
            : i18n.t('builderPage.confirm_override')
        }
        cancelText={i18n.t('builderPage.publish_not_override')}
        content={i18n.t('builderPage.publish_ask_text')}
        onOverride={handleOverride}
      />
    </View>
  );
};

export default RightActions;
