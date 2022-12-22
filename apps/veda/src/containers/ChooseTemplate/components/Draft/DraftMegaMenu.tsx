import AsyncComponent from 'components/AsyncComponent';
import PopConfirmAntd from 'components/ConfirmAntd';
import Masonry from 'components/Masonry';
import MyModal from 'components/MyModal';
import SectionCard from 'components/SectionCard';
import TextInput from 'components/TextInput';
import { VedaLoadingItem } from 'components/VedaLoadingItem';
import {
  useAddDraftMegaMenu,
  useApproveMegaMenuToAdmin,
  useCreateAdminMegaMenuChangelog,
  useDeleteDraftMegaMenu,
  useGetDraftMegaMenu,
  useLoadMoreDraftMegaMenu,
  useRejectDraftMegaMenu,
  useSetTemplateBoardVisible,
} from 'containers/ChooseTemplate/store/actions';
import * as styles from 'containers/ChooseTemplate/styles';
import { useGetDefaultSection } from 'containers/ChooseTemplate/utils/defaultSection';
import setScrollTo from 'containers/IframePage/setScrollTo';
import useDelay from 'hooks/useDelay';
import { range } from 'ramda';
import { FC, useEffect, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { useAddSection } from 'store/actions/actionPages';
import { authorsSelector, chooseTemplateVisibleSelector, defaultPickerRelateShopifySelector, megaMenuSelector } from 'store/selectors';
import { i18n } from 'translation';
import { DevSection } from 'types/Sections';
import { adapterSectionHadShopifyData } from 'utils/adapterSectionHadShopifyData';
import { getUserInfo } from 'utils/functions/getUserInfo';
import { imageUrl } from 'utils/functions/imageUrl';
import { timeConverter } from 'utils/timeAgo';
import { GridSmart, Space, Text, View, ViewportTracking } from 'wiloke-react-core';

export const DraftMegaMenu: FC = () => {
  // sections
  const { data: sections, getAllStatus, hasNextPage, loadMoreStatus, approveStatus, deleteStatus, rejectStatus } = useSelector(
    megaMenuSelector.draftMegaMenu,
  );
  const { createChangelogStatus } = useSelector(megaMenuSelector.adminMegaMenu);
  const { visible, index, navKeys } = useSelector(chooseTemplateVisibleSelector);
  const authorState = useSelector(authorsSelector);
  const { role } = getUserInfo();

  // NOTE: @tuong -> Global mount sẽ lấy data này về => chắc chắn cái này được lấy về r mới vào được bước này nên không cần check "statusRequest"
  const {
    data: { article, blog, collection, product },
  } = useSelector(defaultPickerRelateShopifySelector);

  const loadMoreMegaMenu = useLoadMoreDraftMegaMenu();
  const getMegaMenu = useGetDraftMegaMenu();
  const approveDevMegaMenu = useApproveMegaMenuToAdmin();
  const deleteDevMegaMenu = useDeleteDraftMegaMenu();
  const rejectDraft = useRejectDraftMegaMenu();

  const addSection = useAddSection();
  const setTemplateBoardVisible = useSetTemplateBoardVisible();
  const { defaultDevSection } = useGetDefaultSection();
  const createAtomChangelog = useCreateAdminMegaMenuChangelog();
  const installMegaMenu = useAddDraftMegaMenu();

  const [version, setVersion] = useState('');
  const [versionContent, setVersionContent] = useState('');
  const [sectionId, setSectionId] = useState<string>('');
  const [visibleModal, setVisibleModal] = useState(false);
  const [error, setError] = useState('');
  const [delay] = useDelay();

  useEffect(() => {
    if (visible && navKeys[0] === 'draft' && navKeys[1] === 'Mega-menu') {
      getMegaMenu.request(undefined);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visible, navKeys]);

  const saveSection = (item: DevSection, status: 'approved' | 'rejected' | 'delete') => () => {
    if (status === 'approved') {
      setSectionId(item.commandId);
      setVisibleModal(true);
    }
    if (status === 'delete') {
      deleteDevMegaMenu.request({
        commandId: item.commandId,
      });
    }
    if (status === 'rejected') {
      rejectDraft.request({ section: item });
    }
  };

  /** Add section vào sideba */
  const handleInstall = (item: DevSection) => () => {
    installMegaMenu.request({ commandId: item.commandId });
  };

  const handleUpdate = (item: DevSection) => () => {
    addSection(index, {
      ...(item as DevSection),
      ...adapterSectionHadShopifyData({ section: item as DevSection, article, blog, collection, product, isImportAction: false }),
      type: 'default',
    });

    setScrollTo(`[data-id="${item.id}"]`, { timeout: 100 });

    setTemplateBoardVisible({
      visible: false,
    });
  };

  const renderLoading = (
    <GridSmart columnWidth={200} columnCount={3}>
      {range(0, 3).map(item => (
        <SectionCard.Loading key={item} />
      ))}
    </GridSmart>
  );

  const TrackingLoadMore = useMemo(() => {
    const lastCursor = sections.at(-1)?.commandId;
    if (lastCursor && hasNextPage) {
      return (
        <ViewportTracking
          offsetBottom={50}
          onEnterViewport={() => {
            if (loadMoreStatus !== 'loading') {
              loadMoreMegaMenu.request({ cursor: lastCursor });
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
  }, [hasNextPage, loadMoreMegaMenu, loadMoreStatus, sections]);

  const renderSuccess = () => {
    return (
      <View>
        <Masonry defaultColumn={3}>
          {role === 'dev' && (
            <SectionCard
              key="blank"
              title="Blank Dev Section"
              type={defaultDevSection.type}
              buttonText={i18n.t('general.add')}
              onClick={() => {
                addSection(index, {
                  ...defaultDevSection,
                  type: 'megamenu',
                });
                setScrollTo(`[data-id="${defaultDevSection.id}"]`, { timeout: 100 });
                setTemplateBoardVisible({
                  visible: false,
                });
              }}
            />
          )}

          {sections.map(item => {
            const author = authorState.data.find(user => user.id === item.userId);
            return (
              <SectionCard
                key={item.commandId}
                title={item.label}
                type={item.type}
                image={item.image ? imageUrl(item.image.src, 300) : undefined}
                loading={rejectStatus[item.commandId] === 'loading'}
                author={author ? <Text tagName="strong">{author.name}</Text> : undefined}
                date={item.createdDateTimestamp ? timeConverter(item.createdDateTimestamp) : undefined}
                onClick={handleInstall(item)}
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
                        onClick={saveSection(item, 'approved')}
                      >
                        {i18n.t('general.approve')}
                      </View>
                    )}

                    <PopConfirmAntd
                      loading={deleteStatus[item.commandId] === 'loading'}
                      title={i18n.t('general.delete_confirm_message', { text: item.label })}
                      onConfirm={saveSection(item, 'delete')}
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
    if (version && sectionId) {
      createAtomChangelog.request({
        content: versionContent,
        version,
        versionId: sectionId,
      });

      await delay(500);
      approveDevMegaMenu.request({
        commandId: sectionId,
      });

      await delay(500);
      setVisibleModal(false);
      setSectionId('');
    } else {
      setError(i18n.t('builderPage.increase_version_to_update_section'));
    }
  };

  return (
    <View css={{ padding: '10px' }}>
      <AsyncComponent Request={renderLoading} status={getAllStatus} Success={renderSuccess()} />

      <MyModal
        isLoading={createChangelogStatus === 'loading' || approveStatus[sectionId] === 'loading'}
        isVisible={visibleModal}
        onOk={handleApprove}
        onCancel={() => {
          setVisibleModal(false);
          setSectionId('');
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
