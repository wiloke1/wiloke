import AsyncComponent from 'components/AsyncComponent';
import PopConfirmAntd from 'components/ConfirmAntd';
import Masonry from 'components/Masonry';
import MyModal from 'components/MyModal';
import SectionCard from 'components/SectionCard';
import TextInput from 'components/TextInput';
import { VedaLoadingItem } from 'components/VedaLoadingItem';
import {
  useAddDraftAddon,
  useApproveAddonToAdmin,
  useCreateAdminAddonChangelog,
  useDeleteDraftAddons,
  useGetDraftAddons,
  useGetDraftAddonsCategory,
  useLoadMoreDraftAddons,
  useRejectDraftAddon,
} from 'containers/ChooseTemplate/store/actions';
import { useSetTemplateBoardVisible } from 'containers/ChooseTemplate/store/actions/actionTemplateBoardVisible';
import * as styles from 'containers/ChooseTemplate/styles';
import { useGetDefaultAddons } from 'containers/ChooseTemplate/utils/defaultAddons';
import useDelay from 'hooks/useDelay';
import { range } from 'ramda';
import { useEffect, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { useSetAddonToPages } from 'store/actions/actionPages';
import { useSetSidebarTabActive } from 'store/actions/actionSidebarTabActive';
import { useSetThemeAddon } from 'store/global/themeAddons';
import { addonSelector, chooseTemplateVisibleSelector } from 'store/selectors';
import { i18n } from 'translation';
import { DevAddon } from 'types/Addons';
import { getUserInfo } from 'utils/functions/getUserInfo';
import { imageUrl } from 'utils/functions/imageUrl';
import { timeConverter } from 'utils/timeAgo';
import { GridSmart, Space, View, ViewportTracking } from 'wiloke-react-core';

export const DraftAddonTemplate = () => {
  // addons
  const { addons, hasNextPage, getAddonsStatus, loadMoreStatus, deleteStatus, approveStatus, rejectStatus } = useSelector(addonSelector.draftAddons);
  const { getAllStatus } = useSelector(addonSelector.draftAddonsCategory);
  const { navKeys, visible } = useSelector(chooseTemplateVisibleSelector);
  const { createChangelogStatus } = useSelector(addonSelector.adminAddons);

  const loadMoreAddons = useLoadMoreDraftAddons();
  const getAddonsTemplate = useGetDraftAddons();
  const addAddon = useSetThemeAddon();
  const setAddonToPages = useSetAddonToPages();
  const setTemplateBoardVisible = useSetTemplateBoardVisible();
  const deleteAddonReq = useDeleteDraftAddons();
  const approveAddonReq = useApproveAddonToAdmin();
  const getDraftCategory = useGetDraftAddonsCategory();
  const setSidebarTabActive = useSetSidebarTabActive();
  const { defaultDevAddon } = useGetDefaultAddons();
  const rejectDevAddon = useRejectDraftAddon();
  const installAddon = useAddDraftAddon();
  const { role } = getUserInfo();
  const createAtomChangelog = useCreateAdminAddonChangelog();

  const [version, setVersion] = useState('');
  const [versionContent, setVersionContent] = useState('');
  const [addonId, setAddonId] = useState<string>('');
  const [visibleModal, setVisibleModal] = useState(false);
  const [error, setError] = useState('');
  const [delay] = useDelay();

  useEffect(() => {
    if (visible && navKeys[0] === 'draft' && navKeys[1] === 'Addons') {
      getDraftCategory.request(undefined);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visible, navKeys]);

  useEffect(() => {
    if (visible && navKeys[0] === 'draft' && navKeys[1] === 'Addons' && getAllStatus === 'success') {
      getAddonsTemplate.request({
        categoryName: '',
      });
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visible, navKeys, getAllStatus]);

  const saveAddons = (item: DevAddon, method: 'approve' | 'reject' | 'delete') => () => {
    if (method === 'reject') {
      rejectDevAddon.request({ devAddon: item });
    }
    if (method === 'approve') {
      setAddonId(item.commandId);
      setVisibleModal(true);
    }
    if (method === 'delete') {
      deleteAddonReq.request({ commandId: item.commandId ?? '' });
    }
  };

  /** Add addons vào sidebar, không gọi request */
  const handlePreviewAddon = (item: DevAddon) => () => {
    if (item.commandId) {
      installAddon.request({ commandId: item.commandId });
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
          offsetBottom={0}
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

  const handleUpdate = (item: DevAddon) => () => {
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
    setAddonToPages({
      ...item.body,
      commandId: item.commandId ?? '',
      category: item.category,
      enable: item.enable,
    });
    setSidebarTabActive('add-ons');
    setTemplateBoardVisible({
      visible: false,
    });
  };

  const renderAddons = () => {
    return (
      <View>
        <Masonry defaultColumn={3}>
          {role === 'dev' && (
            <SectionCard
              key="blank"
              title="Blank Dev Addon"
              type={defaultDevAddon.type}
              buttonText={i18n.t('general.add')}
              onClick={() => {
                addAddon({
                  addon: defaultDevAddon,
                });
                setAddonToPages(defaultDevAddon.body);
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
                loading={rejectStatus[item.commandId ?? ''] === 'loading'}
                author={item.authorName}
                onClick={handlePreviewAddon(item)}
                date={item.createdDateTimestamp ? timeConverter(item.createdDateTimestamp) : undefined}
                Right={
                  <View css={styles.draftItemButton}>
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

                    {role === 'admin' && (
                      <View
                        backgroundColor="secondary"
                        borderColor="secondary"
                        color="light"
                        fontFamily="secondary"
                        css={styles.adminButton}
                        onClick={saveAddons(item, 'approve')}
                      >
                        {i18n.t('general.approve')}
                      </View>
                    )}

                    <PopConfirmAntd
                      title={i18n.t('general.delete_confirm_message', { text: item.label })}
                      onConfirm={saveAddons(item, 'delete')}
                      loading={deleteStatus[item.commandId ?? ''] === 'loading'}
                    >
                      <View backgroundColor="danger" borderColor="danger" color="light" fontFamily="secondary" css={styles.adminButton}>
                        {i18n.t('general.delete')}
                      </View>
                    </PopConfirmAntd>
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

  const handleApprove = async () => {
    if (version && addonId) {
      createAtomChangelog.request({
        content: versionContent,
        version,
        versionId: addonId,
      });

      await delay(500);
      approveAddonReq.request({
        commandId: addonId,
      });

      await delay(500);
      setVisibleModal(false);
      setAddonId('');
    } else {
      setError(i18n.t('builderPage.increase_version_to_update_section'));
    }
  };

  return (
    <View css={{ padding: '10px' }}>
      <AsyncComponent Request={renderLoading} status={getAddonsStatus} Success={renderAddons()} />

      <MyModal
        isLoading={createChangelogStatus === 'loading' || approveStatus[addonId] === 'loading'}
        isVisible={visibleModal}
        onOk={handleApprove}
        onCancel={() => {
          setVisibleModal(false);
          setAddonId('');
        }}
        okText={`${i18n.t('general.create', { text: i18n.t('general.changelog') })} & ${i18n.t('general.approve')}`}
        headerText={i18n.t('general.approve')}
      >
        <TextInput
          placeholder={i18n.t('general.version')}
          value={version}
          block
          sizeInput="medium"
          borderColor={!!error ? 'danger' : 'gray3'}
          onValueChange={val => {
            if (val !== '') {
              setError('');
            } else {
              setError(i18n.t('builderPage.increase_version_to_update_section'));
            }
            setVersion(val);
          }}
        />
        {error ? (
          <View tagName="span" color="danger">
            {error}
          </View>
        ) : null}
        <Space size={8} />
        <TextInput placeholder={i18n.t('general.content')} value={versionContent} block sizeInput="medium" onValueChange={setVersionContent} />
        <Space size={8} />
      </MyModal>
    </View>
  );
};
