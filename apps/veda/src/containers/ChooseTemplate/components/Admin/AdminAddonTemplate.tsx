import AsyncComponent from 'components/AsyncComponent';
import PopConfirmAntd from 'components/ConfirmAntd';
import Masonry from 'components/Masonry';
import SectionCard from 'components/SectionCard';
import { VedaLoadingItem } from 'components/VedaLoadingItem';
import {
  useDeleteAdminAddons,
  useForkAddonAdminToDraft,
  useGetAdminAddons,
  useGetAdminAddonsCategory,
  useInstallAdminAddon,
  useLoadMoreAdminAddons,
} from 'containers/ChooseTemplate/store/actions';
import { useSetTemplateBoardVisible } from 'containers/ChooseTemplate/store/actions/actionTemplateBoardVisible';
import { useSetCurrentAdminAddon, useSetModalPublishAddons } from 'containers/ChooseTemplate/store/reducers/addons/admin.sliceAddons';
import * as styles from 'containers/ChooseTemplate/styles';
import { useGetDefaultAddons } from 'containers/ChooseTemplate/utils/defaultAddons';
import { range } from 'ramda';
import { useEffect, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { useSetAddonToPages } from 'store/actions/actionPages';
import { useSetSidebarTabActive } from 'store/actions/actionSidebarTabActive';
import { useGetAuthors } from 'store/global/authors/action';
import { useSetThemeAddon } from 'store/global/themeAddons';
import { addonSelector, chooseTemplateVisibleSelector } from 'store/selectors';
import { i18n } from 'translation';
import { AdminAddon } from 'types/Addons';
import { AdminSection } from 'types/Sections';
import { getUserInfo } from 'utils/functions/getUserInfo';
import { imageUrl } from 'utils/functions/imageUrl';
import { timeConverter } from 'utils/timeAgo';
import { GridSmart, View, ViewportTracking } from 'wiloke-react-core';
import { ModalHotFixAddon } from './ModalHotFixAddon';
import { ModalPublishAddon } from './ModalPublishAddon';

export const AdminAddonTemplate = () => {
  // addons
  const { addons, hasNextPage, getAddonsStatus, loadMoreStatus, deleteStatus, installAddonStatus } = useSelector(addonSelector.adminAddons);
  const { forkStatus } = useSelector(addonSelector.draftAddons);
  const { getAllStatus } = useSelector(addonSelector.adminAddonsCategory);
  const { navKeys, visible } = useSelector(chooseTemplateVisibleSelector);

  const addAddon = useSetThemeAddon();
  const setAddonToPages = useSetAddonToPages();
  const setTemplateBoardVisible = useSetTemplateBoardVisible();
  const setSidebarTabActive = useSetSidebarTabActive();

  const loadMoreAddons = useLoadMoreAdminAddons();
  const getAddonsTemplate = useGetAdminAddons();
  const forkAddonAdminToDraft = useForkAddonAdminToDraft();
  const deleteAddonReq = useDeleteAdminAddons();
  const getAdminCategory = useGetAdminAddonsCategory();
  const { defaultAdminAddon } = useGetDefaultAddons();
  const setModalVisible = useSetModalPublishAddons();
  const installAddon = useInstallAdminAddon();
  const { role } = getUserInfo();
  const getAuthors = useGetAuthors();
  const setCurrentAddon = useSetCurrentAdminAddon();

  useEffect(() => {
    if (visible && navKeys[0] === 'admin' && navKeys[1] === 'Addons') {
      getAdminCategory.request(undefined);
      getAuthors.request({ role: 'admin' });
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visible, navKeys, role]);

  useEffect(() => {
    if (visible && navKeys[0] === 'admin' && navKeys[1] === 'Addons' && getAllStatus === 'success') {
      getAddonsTemplate.request({
        categoryName: '',
      });
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visible, navKeys, getAllStatus]);

  const saveAddons = (item: AdminAddon, method: 'approve' | 'reject' | 'delete') => () => {
    if (method === 'reject') {
      setCurrentAddon(item);
    }
    if (method === 'approve') {
      setModalVisible({
        addonId: item.commandId ?? '',
        visible: true,
      });
    }
    if (method === 'delete') {
      deleteAddonReq.request({ commandId: item.commandId ?? '' });
    }
  };

  /** Add addons vào sidebar */
  const handleInstall = (item: AdminAddon) => () => {
    if (item.commandId) {
      installAddon.request({ commandId: item.commandId });
    }
  };

  const handleUpdate = (item: AdminAddon) => () => {
    addAddon({
      addon: {
        ...item,
        sectionId: item.body.id,
        body: {
          ...item.body,
          commandId: item.commandId ?? '',
          category: item.category,
          enable: item.enable,
        },
      },
    });
    const newPageSection: AdminSection = {
      ...item.body,
      commandId: item.commandId ?? '',
      category: item.category,
      enable: item.enable,
    };
    setAddonToPages(newPageSection);
    setSidebarTabActive('add-ons');
    setTemplateBoardVisible({
      visible: false,
    });
  };

  const handleFork = (commandId: string) => () => {
    if (commandId !== '') {
      forkAddonAdminToDraft.request({ commandId });
    }
  };

  const renderLoading = (
    <GridSmart columnWidth={200} columnCount={3}>
      {range(0, 3).map(item => (
        <SectionCard.Loading key={item} />
      ))}
    </GridSmart>
  );

  const TrackingLoadMore = useMemo(() => {
    const lastCursor = addons.at(-1)?.commandId;
    if (hasNextPage && lastCursor) {
      return (
        <ViewportTracking
          offsetTop={-200}
          onEnterViewport={() => {
            if (loadMoreStatus !== 'loading') {
              loadMoreAddons.request({
                cursor: lastCursor,
              });
            }
          }}
        >
          <View css={{ padding: '30px 10px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <VedaLoadingItem />
          </View>
        </ViewportTracking>
      );
    }
    return null;
  }, [addons, hasNextPage, loadMoreAddons, loadMoreStatus]);

  const renderAddons = () => {
    return (
      <View>
        <Masonry defaultColumn={3}>
          {role === 'admin' && (
            <SectionCard
              key="blank"
              title="Blank Admin Addon"
              type={defaultAdminAddon.type}
              buttonText={i18n.t('general.add')}
              onClick={() => {
                addAddon({
                  addon: defaultAdminAddon,
                });
                setAddonToPages(defaultAdminAddon.body);
                setSidebarTabActive('add-ons');
                setTemplateBoardVisible({
                  visible: false,
                });
              }}
            />
          )}

          {addons.map(item => {
            return (
              <SectionCard
                key={item.commandId}
                title={item.label}
                type={item.type}
                image={item.image ? imageUrl(item.image.src, 300) : undefined}
                loading={forkStatus[item.commandId ?? ''] === 'loading' || installAddonStatus[item.commandId ?? ''] === 'loading'}
                author={item.authorName}
                onClick={handleInstall(item)}
                date={item.createdDateTimestamp ? timeConverter(item.createdDateTimestamp) : undefined}
                buttonText={i18n.t('general.install')}
                Right={
                  <View css={styles.draftItemButton}>
                    {role === 'dev' && (
                      <View
                        backgroundColor="tertiary"
                        borderColor="tertiary"
                        color="light"
                        fontFamily="secondary"
                        css={styles.adminButton}
                        onClick={handleFork(item.commandId ?? '')}
                      >
                        {i18n.t('general.fork')}
                      </View>
                    )}

                    {role === 'admin' && (
                      <View
                        backgroundColor="primary"
                        borderColor="primary"
                        color="light"
                        fontFamily="secondary"
                        css={styles.adminButton}
                        onClick={handleUpdate(item)}
                      >
                        {i18n.t('general.update')}
                      </View>
                    )}

                    {role === 'admin' && (
                      <View
                        backgroundColor="secondary"
                        borderColor="secondary"
                        color="light"
                        fontFamily="secondary"
                        css={styles.adminButton}
                        onClick={saveAddons(item, 'approve')}
                      >
                        {i18n.t('general.publish')}
                      </View>
                    )}

                    {role === 'admin' && (
                      <View
                        backgroundColor="warning"
                        borderColor="warning"
                        color="light"
                        fontFamily="secondary"
                        css={styles.adminButton}
                        onClick={saveAddons(item, 'reject')}
                      >
                        {i18n.t('general.hotfix')}
                      </View>
                    )}
                    {role === 'admin' && (
                      <PopConfirmAntd
                        title={i18n.t('general.delete_confirm_message', { text: item.label })}
                        onConfirm={saveAddons(item, 'delete')}
                        loading={deleteStatus[item.commandId ?? ''] === 'loading'}
                      >
                        <View backgroundColor="danger" borderColor="danger" color="light" fontFamily="secondary" css={styles.adminButton}>
                          {i18n.t('general.delete')}
                        </View>
                      </PopConfirmAntd>
                    )}
                  </View>
                }
              />
            );
          })}
        </Masonry>
        {TrackingLoadMore}
      </View>
    );
  };

  return (
    <View css={{ padding: '10px' }}>
      <AsyncComponent Request={renderLoading} status={getAddonsStatus} Success={renderAddons()} />

      <ModalPublishAddon />

      <ModalHotFixAddon />
    </View>
  );
};
