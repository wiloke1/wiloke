import AsyncComponent from 'components/AsyncComponent';
import PopConfirmAntd from 'components/ConfirmAntd';
import Field from 'components/Field';
import Masonry from 'components/Masonry';
import MyModal from 'components/MyModal';
import SectionCard from 'components/SectionCard';
import SelectAntd from 'components/SelectAntd';
import TextInput from 'components/TextInput';
import { VedaLoadingItem } from 'components/VedaLoadingItem';
import {
  useApproveSectionToAdmin,
  useCreateAdminSectionChangelog,
  usedDeleteDraftSection,
  useGetDraftCategories,
  useGetDraftSections,
  useInstallDraftSection,
  useLoadMoreDraftSections,
  useRejectDraftSection,
  useSetSearchKeyDraftSection,
  useSetTemplateBoardVisible,
} from 'containers/ChooseTemplate/store/actions';
import { useAddDraftSectionNoRequestFlow } from 'containers/ChooseTemplate/store/actions/flows/sections';
import { draftCategorySelector, useSetDraftCategory } from 'containers/ChooseTemplate/store/reducers/sections/draft.reducerCategory';
import * as styles from 'containers/ChooseTemplate/styles';
import { useGetDefaultSection } from 'containers/ChooseTemplate/utils/defaultSection';
import setScrollTo from 'containers/IframePage/setScrollTo';
import withDebounce from 'hocs/withDebounce';
import useDelay from 'hooks/useDelay';
import { range } from 'ramda';
import { FC, useEffect, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { useAddSection } from 'store/actions/actionPages';
import { authorsSelector, chooseTemplateVisibleSelector, sectionsSelector } from 'store/selectors';
import { i18n } from 'translation';
import { DevSection } from 'types/Sections';
import { getUserInfo } from 'utils/functions/getUserInfo';
import { imageUrl } from 'utils/functions/imageUrl';
import { timeConverter } from 'utils/timeAgo';
import { GridSmart, Space, Text, View, ViewportTracking } from 'wiloke-react-core';

const TextInputDebounce = withDebounce(TextInput, 'value', 'onValueChange', 300);

const DraftSectionTemplate: FC = () => {
  // sections
  const { data: sections, getAllStatus, hasNextPage, loadMoreStatus, approveStatus, deleteStatus, installStatus, searchKey } = useSelector(
    sectionsSelector.draftSections,
  );
  const { visible, index, navKeys } = useSelector(chooseTemplateVisibleSelector);
  const { draftCategorySlug, draftCategoryId, categories } = useSelector(draftCategorySelector);
  const { createChangelogStatus } = useSelector(sectionsSelector.adminSections);
  const { role } = getUserInfo();
  const authorState = useSelector(authorsSelector);

  const loadMoreSections = useLoadMoreDraftSections();
  const approveDevSection = useApproveSectionToAdmin();
  const getSections = useGetDraftSections();
  const getCategory = useGetDraftCategories();
  const installSection = useInstallDraftSection();
  const addSection = useAddSection();
  const setTemplateBoardVisible = useSetTemplateBoardVisible();
  const updateDraftSection = useRejectDraftSection();
  const createAtomChangelog = useCreateAdminSectionChangelog();
  const deleteDraft = usedDeleteDraftSection();
  const setSearchKey = useSetSearchKeyDraftSection();
  const setDraftCategory = useSetDraftCategory();
  const addDraftSectionNoRequestFlow = useAddDraftSectionNoRequestFlow();
  const { defaultDevSection } = useGetDefaultSection();

  const [version, setVersion] = useState('');
  const [versionContent, setVersionContent] = useState('');
  const [sectionId, setSectionId] = useState<string>('');
  const [visibleModal, setVisibleModal] = useState(false);
  const [error, setError] = useState('');
  const [delay] = useDelay();

  useEffect(() => {
    if (visible && navKeys[0] === 'draft' && navKeys[1] === 'Sections') {
      getCategory.request(undefined);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visible, navKeys]);

  useEffect(() => {
    if (visible && navKeys[0] === 'draft' && navKeys[1] === 'Sections') {
      getSections.request({ categoryName: draftCategorySlug, label: searchKey });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visible, navKeys, draftCategorySlug, searchKey]);

  const saveSection = (item: DevSection, status: 'approve' | 'reject' | 'delete') => () => {
    if (status === 'approve') {
      setSectionId(item.commandId);
      setVisibleModal(true);
    }
    if (status === 'reject') {
      updateDraftSection.request({ section: item });
    }
    if (status === 'delete') {
      deleteDraft.request({ section: item });
    }
  };

  /** Add section vào sidebar*/
  const handlePreviewSection = (item: DevSection) => () => {
    installSection.request({ commandId: item.commandId });
  };

  const handleUpdate = (item: DevSection) => () => {
    addDraftSectionNoRequestFlow(index, item);
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
              loadMoreSections.request({ cursor: lastCursor, categoryName: draftCategorySlug, label: searchKey });
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
  }, [draftCategorySlug, hasNextPage, loadMoreSections, loadMoreStatus, searchKey, sections]);

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
                addSection(index, defaultDevSection);
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
                loading={installStatus[item.commandId] === 'loading'}
                author={author ? <Text tagName="strong">{author.name}</Text> : undefined}
                date={item.createdDateTimestamp ? timeConverter(item.createdDateTimestamp) : undefined}
                hasUpdate={!!item.comment}
                buttonText={role === 'admin' ? '' : i18n.t('general.install')}
                onClick={handlePreviewSection(item)}
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
                        onClick={saveSection(item, 'approve')}
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
      approveDevSection.request({
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
      <GridSmart columnWidth={300} columnCount={4}>
        <Field label={`${i18n.t('adminDashboard.search', { text: i18n.t('general.by', { text: i18n.t('general.label') }) })}`}>
          <TextInputDebounce value={searchKey} block onValueChange={setSearchKey} />
        </Field>

        <Field label={`${i18n.t('adminDashboard.search', { text: i18n.t('general.by', { text: i18n.t('general.category') }) })}`}>
          <SelectAntd
            value={draftCategoryId}
            allowClear
            data={categories.map(category => ({ value: category.commandId, label: category.slug, commandId: category.commandId }))}
            showArrow={false}
            filterOption={(input, option) => {
              return ((option?.children as unknown) as string).toLowerCase().includes(input.toLowerCase());
            }}
            showSearch
            onChange={(_, option: any) => {
              setDraftCategory({
                id: option?.value ?? '',
                slug: option?.children ?? '',
              });
            }}
          />
        </Field>
      </GridSmart>

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

export default DraftSectionTemplate;
