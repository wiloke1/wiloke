import Button from 'components/Button';
import ChooseImage from 'components/ChooseImage';
import Field from 'components/Field';
import MyModal from 'components/MyModal';
import SelectAntd from 'components/SelectAntd';
import SwitchBeauty from 'components/SwitchBeauty';
import TextInput from 'components/TextInput';
import { useSaveAtomMegaMenu, useSaveAtomSection } from 'containers/BuilderPage/store/saveForBuilder/actions';
import { modalAdminSectionVisibleSelector, useSetModalAdminSectionVisible } from 'containers/BuilderPage/store/saveForBuilder/slice';
import {
  useAddAdminCategory,
  useCreateAdminMegaMenuChangelog,
  useCreateAdminSectionChangelog,
  useGetAdminCategories,
} from 'containers/ChooseTemplate/store/actions';
import { adminCategorySelector } from 'containers/ChooseTemplate/store/reducers/sections/admin.reducerCategory';
import withDebounce from 'hocs/withDebounce';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { saveForBuilderSelector, sectionsSelector } from 'store/selectors';
import { i18n } from 'translation';
import { AdminSection, PageSectionType } from 'types/Sections';
import { getUserInfo } from 'utils/functions/getUserInfo';
import { Divider, Space, View } from 'wiloke-react-core';
import { useSaveAdminSection } from './utils/useSaveAdminSection';

const DebounceInput = withDebounce(TextInput, 'value', 'onValueChange');

export const ModalAdminSection = () => {
  const modalSectionVisible = useSelector(modalAdminSectionVisibleSelector);
  const { saveSectionStatus } = useSelector(saveForBuilderSelector);
  const { addStatus, categories: adminCategories } = useSelector(adminCategorySelector);
  const { createChangelogStatus } = useSelector(sectionsSelector.adminSections);
  const { id } = getUserInfo();

  const setModalSectionVisible = useSetModalAdminSectionVisible();
  const saveSectionForBuilder = useSaveAtomSection();
  const addCategory = useAddAdminCategory();
  const getCategories = useGetAdminCategories();
  const createChangelog = useCreateAdminSectionChangelog();
  const createChangelogMegaMenu = useCreateAdminMegaMenuChangelog();
  const saveAtomMegaMenu = useSaveAtomMegaMenu();

  const {
    category,
    createdCategory,
    image,
    label,
    methodType,
    section,
    type,
    changelog,
    setChangelog,
    setCategory,
    setCreateCategory,
    setImage,
    setLabel,
    setMethodType,
    setType,
    setVersion,
    version,
  } = useSaveAdminSection();

  const [error, setError] = useState('');

  useEffect(() => {
    if (modalSectionVisible) {
      getCategories.request(undefined);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [modalSectionVisible]);

  const handleSaveSection = () => {
    const _cate = adminCategories.find(item => item.slug === category.name);

    if (section) {
      const newSection: AdminSection = {
        ...section,
        label,
        image,
        id: section.id,
        category:
          type !== 'megamenu'
            ? {
                name: _cate ? _cate.slug : category.name,
                description: _cate ? _cate.title : category.description,
                commandId: _cate ? _cate.commandId : section?.category?.commandId ?? '',
              }
            : undefined,
        type: type,
        userId: section.userId ? section.userId : id,
        currentVersion: methodType === 'create' ? '1.0.0' : version,
      };

      if (type === 'megamenu') {
        saveAtomMegaMenu.request({ type: methodType, data: newSection });
      } else {
        saveSectionForBuilder.request({ type: methodType, data: newSection });
      }
    }
  };

  const handleAddCategory = () => {
    if (createdCategory.name && createdCategory.description) {
      addCategory.request({ description: createdCategory.description, name: createdCategory.name });
      setCreateCategory({
        description: '',
        name: '',
      });
    }
  };

  const handleChangeCategory = (val: string, option: any) => {
    setCategory({
      description: option.children,
      name: val,
    });
  };

  const handleCreateChangelog = () => {
    if (section && version) {
      if (type === 'megamenu') {
        createChangelogMegaMenu.request({
          content: changelog,
          version: version,
          versionId: section.commandId,
        });
      } else {
        createChangelog.request({
          content: changelog,
          version: version,
          versionId: section.commandId,
        });
      }
    }
  };

  const handleCancel = () => {
    if (type === 'megamenu') {
      saveAtomMegaMenu.cancel();
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
      okText={i18n.t('general.save', { text: 'to admin database' })}
    >
      <View css={{ margin: 'auto', padding: '20px 0' }}>
        <Field label={i18n.t('general.createNewSection')}>
          <SwitchBeauty
            checked={methodType === 'create'}
            radius={6}
            borderColor="gray3"
            borderWidth={1}
            enableText={i18n.t('general.enable')}
            disableText={i18n.t('general.disable')}
            onValueChange={value => {
              setMethodType(value ? 'create' : 'update');
            }}
          />
        </Field>

        <Field label={i18n.t('general.title')}>
          <DebounceInput value={label} block sizeInput="medium" onValueChange={setLabel} />
        </Field>

        {type !== 'megamenu' ? (
          <Field label={i18n.t('general.category')}>
            <SelectAntd
              data={adminCategories.map(item => ({ value: item.slug, label: item.title }))}
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
                          value={createdCategory.name}
                          block
                          placeholder={i18n.t('builderPage.save_for_builder.please_enter_item')}
                          sizeInput="small"
                          css={{ width: '100%', height: '38px' }}
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
            value={type}
            onChange={val => setType(val as PageSectionType)}
          />
        </Field>

        {!!section?.commandId && (
          <Field label={i18n.t('general.changelog')}>
            <DebounceInput
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
            <DebounceInput placeholder={i18n.t('general.content')} value={changelog} block sizeInput="medium" onValueChange={setChangelog} />
            <Space size={8} />
            <Button size="extra-small" radius={4} loading={createChangelogStatus === 'loading'} onClick={handleCreateChangelog}>
              {i18n.t('general.create')} {i18n.t('general.changelog')}
            </Button>
          </Field>
        )}

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
