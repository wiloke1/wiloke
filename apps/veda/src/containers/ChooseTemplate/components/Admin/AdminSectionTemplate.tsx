import AsyncComponent from 'components/AsyncComponent';
import PopConfirmAntd from 'components/ConfirmAntd';
import Field from 'components/Field';
import Masonry from 'components/Masonry';
import SectionCard from 'components/SectionCard';
import SelectAntd from 'components/SelectAntd';
import TextInput from 'components/TextInput';
import { VedaLoadingItem } from 'components/VedaLoadingItem';
import {
  usedDeleteAdminSection,
  useForkSectionAdminToDraft,
  useGetAdminCategories,
  useGetAdminSections,
  useInstallAdminSection,
  useLoadMoreAdminSections,
  useSetCurrentAdminSection,
  useSetSearchKeySectionAtom,
  useSetSettingsAdminSection,
  useSetTemplateBoardVisible,
} from 'containers/ChooseTemplate/store/actions';
import { useAddAtomSectionNoRequestFlow } from 'containers/ChooseTemplate/store/actions/flows/sections';
import { adminCategorySelector, useSetAdminCategory } from 'containers/ChooseTemplate/store/reducers/sections/admin.reducerCategory';
import * as styles from 'containers/ChooseTemplate/styles';
import { useGetDefaultSection } from 'containers/ChooseTemplate/utils/defaultSection';
import withDebounce from 'hocs/withDebounce';
import { range } from 'ramda';
import { FC, useEffect, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { useAddSection } from 'store/actions/actionPages';
import { useGetAuthors } from 'store/global/authors/action';
import { authorsSelector, chooseTemplateVisibleSelector, sectionsSelector } from 'store/selectors';
import { i18n } from 'translation';
import { AdminSection } from 'types/Sections';
import { getUserInfo } from 'utils/functions/getUserInfo';
import { imageUrl } from 'utils/functions/imageUrl';
import { timeConverter } from 'utils/timeAgo';
import { GridSmart, Text, View, ViewportTracking } from 'wiloke-react-core';
import { ModalHotFixSection } from './ModalHotFixSection';
import { ModalPublish } from './ModalPublishSection';

const TextInputDebounce = withDebounce(TextInput, 'value', 'onValueChange', 300);

const AdminSectionTemplate: FC = () => {
  const { data: sections, getAllStatus, hasNextPage, loadMoreStatus, deleteStatus, rejectStatus, installStatus, searchKey } = useSelector(
    sectionsSelector.adminSections,
  );
  const { approveStatus, forkStatus } = useSelector(sectionsSelector.draftSections);
  const { visible, index, navKeys } = useSelector(chooseTemplateVisibleSelector);
  const { categories, adminCategoryId, adminCategorySlug } = useSelector(adminCategorySelector);
  const { role } = getUserInfo();
  const getAuthors = useGetAuthors();
  const authorState = useSelector(authorsSelector);

  const loadMoreSections = useLoadMoreAdminSections();
  const getSections = useGetAdminSections();
  const getCategory = useGetAdminCategories();
  const { defaultAdminSection } = useGetDefaultSection();
  const setAdminCategory = useSetAdminCategory();
  const setSearchKey = useSetSearchKeySectionAtom();
  const addSection = useAddSection();
  const setTemplateBoardVisible = useSetTemplateBoardVisible();
  const setSettingsAdminSection = useSetSettingsAdminSection();
  const deleteAdminSection = usedDeleteAdminSection();
  const installSection = useInstallAdminSection();
  const addSectionNoRequestFlow = useAddAtomSectionNoRequestFlow();
  const forkSectionAdminToDraft = useForkSectionAdminToDraft();

  const setCurrentSection = useSetCurrentAdminSection();

  useEffect(() => {
    if (visible && navKeys[0] === 'admin' && navKeys[1] === 'Sections') {
      getCategory.request(undefined);
      getAuthors.request({ role: 'admin' });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visible, navKeys]);

  useEffect(() => {
    if (visible && navKeys[0] === 'admin' && navKeys[1] === 'Sections') {
      getSections.request({ categoryName: adminCategorySlug, label: searchKey });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visible, navKeys, adminCategorySlug, searchKey]);

  const handleActionSection = (item: AdminSection, method: 'approve' | 'delete' | 'reject') => () => {
    if (method === 'approve') {
      setSettingsAdminSection({
        visible: true,
        sectionId: item.commandId,
      });
    }
    if (method === 'delete') {
      deleteAdminSection.request({ section: item });
    }
    if (method === 'reject') {
      setCurrentSection(item);
    }
  };

  /** cài đặt section của atom vào page, không gọi request */
  const handleInstall = (item: AdminSection) => () => {
    installSection.request({ commandId: item.commandId });
  };

  /** hàm này để phục vụ cho admin add vào sidebar để update section  */
  const handleUpdate = (item: AdminSection) => () => {
    addSectionNoRequestFlow(index, item);
  };

  const renderLoading = (
    <GridSmart columnWidth={200} columnCount={3}>
      {range(0, 3).map(item => (
        <SectionCard.Loading key={item} />
      ))}
    </GridSmart>
  );

  const TrackingLoadMore = useMemo(() => {
    const lastCursor = sections[sections.length - 1]?.commandId;
    if (hasNextPage && lastCursor) {
      return (
        <ViewportTracking
          offsetTop={-200}
          onEnterViewport={() => {
            if (loadMoreStatus !== 'loading') {
              loadMoreSections.request({ cursor: lastCursor, label: searchKey, categoryName: adminCategorySlug });
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
  }, [adminCategorySlug, hasNextPage, loadMoreSections, loadMoreStatus, searchKey, sections]);

  const renderSuccess = () => {
    return (
      <View>
        <Masonry defaultColumn={3}>
          {role === 'admin' && (
            <SectionCard
              key="blank"
              title="Blank Admin Section"
              type={defaultAdminSection.type}
              buttonText={i18n.t('general.add')}
              onClick={() => {
                addSection(index, defaultAdminSection);
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
                loading={
                  approveStatus[item.commandId] === 'loading' ||
                  rejectStatus[item.commandId] === 'loading' ||
                  installStatus[item.commandId] === 'loading' ||
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
                          forkSectionAdminToDraft.request({ commandId: item.commandId });
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
                        onClick={handleActionSection(item, 'approve')}
                      >
                        {item.syncedToProduct ? 'Published' : i18n.t('general.publish')}
                      </View>
                    )}

                    {role === 'admin' && (
                      <View
                        backgroundColor="warning"
                        borderColor="warning"
                        color="light"
                        fontFamily="secondary"
                        css={styles.adminButton}
                        onClick={handleActionSection(item, 'reject')}
                      >
                        {i18n.t('general.hotfix')}
                      </View>
                    )}

                    {role === 'admin' && (
                      <PopConfirmAntd
                        title={i18n.t('general.delete_confirm_message', { text: item.label })}
                        onConfirm={handleActionSection(item, 'delete')}
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

  return (
    <View css={{ padding: '10px' }}>
      <GridSmart columnWidth={300} columnCount={4}>
        <Field label={`${i18n.t('adminDashboard.search', { text: i18n.t('general.by', { text: i18n.t('general.label') }) })}`}>
          <TextInputDebounce value={searchKey} block onValueChange={setSearchKey} />
        </Field>

        <Field label={`${i18n.t('adminDashboard.search', { text: i18n.t('general.by', { text: i18n.t('general.category') }) })}`}>
          <SelectAntd
            value={adminCategoryId}
            showArrow={false}
            data={categories.map(category => ({ value: category.commandId, label: category.slug }))}
            allowClear
            filterOption={(input, option) => {
              return ((option?.children as unknown) as string).toLowerCase().includes(input.toLowerCase());
            }}
            showSearch
            onChange={(_, option: any) => {
              setAdminCategory({
                id: option?.value ?? '',
                slug: option?.children ?? '',
              });
            }}
          />
        </Field>
      </GridSmart>

      <AsyncComponent Request={renderLoading} status={getAllStatus} Success={renderSuccess()} />

      <ModalPublish />
      <ModalHotFixSection />
    </View>
  );
};

export default AdminSectionTemplate;
