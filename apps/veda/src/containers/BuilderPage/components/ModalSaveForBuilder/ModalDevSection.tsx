import Button from 'components/Button';
import ChooseImage from 'components/ChooseImage';
import Field from 'components/Field';
import MyModal from 'components/MyModal';
import SelectAntd from 'components/SelectAntd';
import SwitchBeauty from 'components/SwitchBeauty';
import TextInput from 'components/TextInput';
import { useSaveDraftMegaMenu, useSaveDraftSection } from 'containers/BuilderPage/store/saveForBuilder/actions';
import { modalDevSectionVisibleSelector, useSetModalDevSectionVisible } from 'containers/BuilderPage/store/saveForBuilder/slice';
import { useAddDraftCategory, useGetDraftCategories } from 'containers/ChooseTemplate/store/actions';
import { draftCategorySelector, transformDraftCategories } from 'containers/ChooseTemplate/store/reducers/sections/draft.reducerCategory';
import withDebounce from 'hocs/withDebounce';
import { FC, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { pageSectionsSelector, saveForBuilderSelector, sectionIdCodeVisibleSelector } from 'store/selectors';
import { i18n } from 'translation';
import { DevSection, PageSectionType } from 'types/Sections';
import { getUserInfo } from 'utils/functions/getUserInfo';
import { Divider, View } from 'wiloke-react-core';
import { useSaveSection } from './utils/useSaveDevSection';

const DebounceInput = withDebounce(TextInput, 'value', 'onValueChange');

export const ModalSaveSectionForBuilder: FC = () => {
  const modalSectionVisible = useSelector(modalDevSectionVisibleSelector);
  const sectionIdCodeVisible = useSelector(sectionIdCodeVisibleSelector);
  const sections = useSelector(pageSectionsSelector);
  const { saveSectionStatus } = useSelector(saveForBuilderSelector);
  const section = sections.find(section => section.id === sectionIdCodeVisible) as DevSection | undefined;
  const { addStatus, categories: devCategories } = useSelector(draftCategorySelector);
  const categories = useSelector(transformDraftCategories);

  const setModalSectionVisible = useSetModalDevSectionVisible();
  const saveSectionForBuilder = useSaveDraftSection();
  const addCategory = useAddDraftCategory();
  const getCategories = useGetDraftCategories();
  const saveDraftMegaMenu = useSaveDraftMegaMenu();

  const { id: userId, role } = getUserInfo();

  const {
    label,
    setLabel,
    changelog,
    setChangelog,
    category,
    setCategory,
    image,
    setImage,
    createdCategory,
    setCreateCategory,
    type,
    setType,
    sectionType,
    setSectionType,
  } = useSaveSection();

  useEffect(() => {
    if (modalSectionVisible) {
      getCategories.request(undefined);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [modalSectionVisible]);

  const handleAddCategory = () => {
    if (createdCategory.name && createdCategory.description) {
      addCategory.request({ description: createdCategory.description, name: createdCategory.name });
      setCreateCategory({
        name: '',
        description: '',
      });
    }
  };

  const handleChangeCategory = (val: string, option: any) => {
    setCategory({
      description: option.children,
      name: val,
    });
  };

  const handleSaveSection = () => {
    const cateId = devCategories.filter(item => item.slug === category.name)[0];
    if (section) {
      const newSection: DevSection = {
        ...section,
        label,
        image,
        status: type === 'create' ? 'draft' : section.status,
        changelog: changelog,
        id: section.id,
        category:
          sectionType !== 'megamenu'
            ? {
                name: cateId ? cateId.slug : category.name,
                description: cateId ? cateId.title : category.description,
                commandId: cateId ? cateId.commandId : section?.category?.commandId ?? '',
              }
            : undefined,
        userId: section.userId ? section.userId : userId,
        type: sectionType,
      };
      if (sectionType === 'megamenu') {
        saveDraftMegaMenu.request({ type, data: newSection });
      } else {
        saveSectionForBuilder.request({ type, data: newSection });
      }
    }
  };

  const handleCancel = () => {
    if (sectionType === 'megamenu') {
      saveDraftMegaMenu.cancel();
    } else {
      saveSectionForBuilder.cancel();
    }
    setModalSectionVisible(false);
  };

  return (
    <MyModal
      size="medium"
      isLoading={saveSectionStatus === 'loading'}
      headerText={`${i18n.t('general.save', { text: i18n.t('general.section') })}`}
      depsHeightRecalculation={section}
      isVisible={modalSectionVisible}
      onCancel={handleCancel}
      onOk={handleSaveSection}
      okText={i18n.t('general.save', { text: 'to dev database' })}
    >
      <View css={{ margin: 'auto', padding: '20px 0' }}>
        <Field label={i18n.t('general.createNewSection')}>
          <SwitchBeauty
            checked={type === 'create'}
            radius={6}
            borderColor="gray3"
            disabled={role === 'admin'}
            borderWidth={1}
            enableText={i18n.t('general.enable')}
            disableText={i18n.t('general.disable')}
            onValueChange={value => {
              setType(value ? 'create' : 'update');
            }}
          />
        </Field>

        <Field label={i18n.t('general.title')}>
          <DebounceInput value={label} block sizeInput="medium" onValueChange={setLabel} />
        </Field>

        {sectionType !== 'megamenu' ? (
          <Field label={i18n.t('general.category')}>
            <SelectAntd
              data={categories}
              value={category?.name}
              onChange={handleChangeCategory}
              dropdownRender={menu => {
                return (
                  <>
                    {menu}
                    <Divider />
                    <View css={{ padding: '8px 0 4px 0', display: 'flex', justifyContent: 'space-between' }}>
                      <View columns={[10, 10, 10]}>
                        <DebounceInput
                          value={createdCategory.description}
                          block
                          placeholder={i18n.t('builderPage.save_for_builder.please_enter_item')}
                          sizeInput="small"
                          css={{ height: '40px', width: '250px' }}
                          onValueChange={val => {
                            setCreateCategory({
                              description: val,
                              name: val ? val : '',
                            });
                          }}
                        />
                      </View>
                      <View columns={[2, 2, 2]}>
                        <Button block radius={4} size="extra-small" loading={addStatus === 'loading'} onClick={handleAddCategory}>
                          {i18n.t('builderPage.save_for_builder.add_category')}
                        </Button>
                      </View>
                    </View>
                  </>
                );
              }}
            />
          </Field>
        ) : null}

        <Field label={i18n.t('general.type')}>
          <SelectAntd
            data={[
              {
                value: 'default',
                label: 'Default',
              },
              {
                value: 'megamenu',
                label: 'Mega menu',
              },
            ]}
            value={sectionType}
            onChange={val => setSectionType(val as PageSectionType)}
          />
        </Field>

        <Field label={i18n.t('general.description')}>
          <DebounceInput value={changelog} block sizeInput="medium" onValueChange={setChangelog} />
        </Field>

        <Field label={i18n.t('builderPage.save_for_builder.preview_image')} width={400}>
          <ChooseImage
            value={image}
            onChange={({ src, width, height }) => {
              setImage({
                src: src,
                width: width ?? 0,
                height: height ?? 0,
              });
            }}
            mode="popup"
          />
        </Field>
      </View>
    </MyModal>
  );
};
