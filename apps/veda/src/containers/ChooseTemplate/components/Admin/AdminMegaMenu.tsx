import AsyncComponent from 'components/AsyncComponent';
import PopConfirmAntd from 'components/ConfirmAntd';
import Field from 'components/Field';
import Masonry from 'components/Masonry';

import MyModal from 'components/MyModal';
import SectionCard from 'components/SectionCard';
import SelectAntd from 'components/SelectAntd';
import { TextEditor2 } from 'components/TextEditor2';
import { VedaLoadingItem } from 'components/VedaLoadingItem';
import {
  useAddAdminMegaMenu,
  usedDeleteAdminMegaMenu,
  useForkMegaMenuAdminToDraft,
  useGetAdminMegaMenu,
  useLoadMoreAdminMegaMenu,
  useRejectAdminMegaMenu,
  useSetSettingsAdminMegaMenu,
  useSetTemplateBoardVisible,
} from 'containers/ChooseTemplate/store/actions';
import * as styles from 'containers/ChooseTemplate/styles';
import { useGetDefaultSection } from 'containers/ChooseTemplate/utils/defaultSection';
import setScrollTo from 'containers/IframePage/setScrollTo';
import withDebounce from 'hocs/withDebounce';
import useDelay from 'hooks/useDelay';
import { range } from 'ramda';
import { FC, useEffect, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { useAddSection } from 'store/actions/actionPages';
import { useGetAuthors, useLoadmoreAuthors } from 'store/global/authors/action';
import { authorsSelector, chooseTemplateVisibleSelector, defaultPickerRelateShopifySelector, megaMenuSelector } from 'store/selectors';
import { i18n } from 'translation';
import { AdminSection } from 'types/Sections';
import { adapterSectionHadShopifyData } from 'utils/adapterSectionHadShopifyData';
import { getUserInfo } from 'utils/functions/getUserInfo';
import { imageUrl } from 'utils/functions/imageUrl';
import { timeConverter } from 'utils/timeAgo';
import { GridSmart, Text, View, ViewportTracking } from 'wiloke-react-core';
import { ModalPublishMegaMenu } from './ModalPublishMegaMenu';

const TextEditorDebounce = withDebounce(TextEditor2, 'value', 'onChange');

export const AdminMegaMenu: FC = () => {
  const { data: sections, getAllStatus, hasNextPage, loadMoreStatus, deleteStatus, rejectStatus } = useSelector(megaMenuSelector.adminMegaMenu);
  const { approveStatus, forkStatus } = useSelector(megaMenuSelector.draftMegaMenu);
  const { visible, index, navKeys } = useSelector(chooseTemplateVisibleSelector);
  const { role } = getUserInfo();
  const authorState = useSelector(authorsSelector);
  // NOTE: @tuong -> Global mount sẽ lấy data này về => chắc chắn cái này được lấy về r mới vào được bước này nên không cần check "statusRequest"
  const {
    data: { article, blog, collection, product },
  } = useSelector(defaultPickerRelateShopifySelector);
  const getAuthors = useGetAuthors();
  const loadMoreMegaMenu = useLoadMoreAdminMegaMenu();
  const getMegaMenu = useGetAdminMegaMenu();
  const { defaultAdminSection } = useGetDefaultSection();

  const addSection = useAddSection();
  const setTemplateBoardVisible = useSetTemplateBoardVisible();
  const setSettingsAdminSection = useSetSettingsAdminMegaMenu();
  const deleteAdminSection = usedDeleteAdminMegaMenu();
  const rejectAdmin = useRejectAdminMegaMenu();
  const installAdminMegaMenu = useAddAdminMegaMenu();
  const loadmoreAuthors = useLoadmoreAuthors();
  const forkMegaMenu = useForkMegaMenuAdminToDraft();

  const [comment, setComment] = useState('');
  const [visibleModal, setVisibleModal] = useState(false);
  const [currentSection, setCurrentSection] = useState<AdminSection | undefined>(undefined);
  const [assignToUser, setAssignToUser] = useState<number | undefined>(undefined);
  const [delay] = useDelay();

  useEffect(() => {
    if (visible && navKeys[0] === 'admin' && navKeys[1] === 'Mega-menu') {
      getMegaMenu.request(undefined);
      getAuthors.request({ role: 'admin' });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visible, navKeys, role]);

  const saveSection = (item: AdminSection, method: 'approve' | 'delete' | 'reject') => () => {
    if (method === 'approve') {
      setSettingsAdminSection({
        visible: true,
        megaMenuId: item.commandId,
      });
    }
    if (method === 'delete') {
      deleteAdminSection.request({ commandId: item.commandId });
    }
    if (method === 'reject') {
      setCurrentSection(item);
      setVisibleModal(true);
    }
  };

  /** Add section vào sidebar */
  const handleInstall = (item: AdminSection) => () => {
    installAdminMegaMenu.request({ commandId: item.commandId });
  };

  const handleUpdate = (item: AdminSection) => () => {
    addSection(index, {
      ...item,
      ...adapterSectionHadShopifyData({ section: item, article, blog, collection, product, isImportAction: false }),
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
          offsetTop={-200}
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
          <SectionCard
            key="blank"
            title="Blank Admin Section"
            type={defaultAdminSection.type}
            buttonText={i18n.t('general.add')}
            onClick={() => {
              addSection(index, {
                ...defaultAdminSection,
                type: 'megamenu',
              });
              setScrollTo(`[data-id="${defaultAdminSection.id}"]`);
              setTemplateBoardVisible({
                visible: false,
              });
            }}
          />

          {sections.map(item => {
            const author = authorState.data.find(user => user.id === item.userId);

            return (
              <SectionCard
                key={item.commandId}
                title={item.label}
                type={item.type}
                image={item.image ? imageUrl(item.image.src, 300) : undefined}
                loading={
                  approveStatus[item.commandId] === 'loading' ||
                  rejectStatus[item.commandId] === 'loading' ||
                  forkStatus[item.commandId] === 'loading'
                }
                author={author ? <Text tagName="strong">{author.name}</Text> : undefined}
                date={item.createdDateTimestamp ? timeConverter(item.createdDateTimestamp) : undefined}
                buttonText={i18n.t('general.install')}
                onClick={handleInstall(item)}
                Right={
                  <View css={styles.draftItemButton}>
                    {role === 'dev' && (
                      <View
                        backgroundColor="tertiary"
                        borderColor="tertiary"
                        color="light"
                        fontFamily="secondary"
                        css={styles.adminButton}
                        onClick={() => {
                          forkMegaMenu.request({ commandId: item.commandId });
                        }}
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
                        onClick={saveSection(item, 'approve')}
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
                        onClick={saveSection(item, 'reject')}
                      >
                        {i18n.t('general.hotfix')}
                      </View>
                    )}

                    {role === 'admin' && (
                      <PopConfirmAntd
                        title={i18n.t('general.delete_confirm_message', { text: item.label })}
                        onConfirm={saveSection(item, 'delete')}
                        loading={deleteStatus[item.commandId] === 'loading'}
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

  const handleReject = async () => {
    if (currentSection) {
      rejectAdmin.request({ assignTo: assignToUser, commandId: currentSection.commandId, comment });
      await delay(500);
      setVisibleModal(false);
    }
  };

  const handleCancel = () => {
    setVisibleModal(false);
    setCurrentSection(undefined);
  };

  return (
    <View css={{ padding: '10px' }}>
      <AsyncComponent Request={renderLoading} status={getAllStatus} Success={renderSuccess()} />
      <ModalPublishMegaMenu />

      <MyModal
        isVisible={visibleModal}
        onCancel={handleCancel}
        onOk={handleReject}
        headerText={i18n.t('general.reject')}
        isLoading={rejectStatus[currentSection?.commandId ?? ''] === 'loading'}
      >
        <Field label={i18n.t('general.comment')}>
          <TextEditorDebounce richText={false} value={comment} onChange={setComment} />
        </Field>

        <Field label={i18n.t('general.assign_to')}>
          <SelectAntd
            value={assignToUser}
            loading={authorState.getStatus === 'loading' || authorState.loadmoreStatus === 'loading'}
            data={authorState.data.map(item => ({ label: item.name, value: item.id as number }))}
            onChange={setAssignToUser}
            onPopupScroll={e => {
              const { scrollHeight, scrollTop, clientHeight } = e.target as Element;
              if (
                scrollHeight - scrollTop - clientHeight < 300 &&
                authorState.getStatus === 'success' &&
                authorState.totalPages > authorState.page + 1
              ) {
                loadmoreAuthors.request({
                  page: authorState.page + 1,
                  role,
                });
              }
            }}
          />
        </Field>
      </MyModal>
    </View>
  );
};
