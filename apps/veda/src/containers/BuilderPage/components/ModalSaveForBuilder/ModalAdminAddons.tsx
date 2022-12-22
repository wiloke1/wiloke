import Button from 'components/Button';
import ChooseImage from 'components/ChooseImage';
import Field from 'components/Field';
import MyModal from 'components/MyModal';
import SelectAntd from 'components/SelectAntd';
import SwitchBeauty from 'components/SwitchBeauty';
import { TextEditor2 } from 'components/TextEditor2';
import TextInput from 'components/TextInput';
import { useSaveAtomAddon } from 'containers/BuilderPage/store/saveForBuilder/actions';
import { modalAdminAddonsVisibleSelector, useSetModalAdminAddonsVisible } from 'containers/BuilderPage/store/saveForBuilder/slice';
import { useCreateAdminAddonCategory, useCreateAdminAddonChangelog, useGetAdminAddonsCategory } from 'containers/ChooseTemplate/store/actions';
import { transformAdminAddonCategories } from 'containers/ChooseTemplate/store/reducers/addons/admin.sliceAddonCategory';
import withDebounce from 'hocs/withDebounce';
import { FC, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useUpdateAddonToPages } from 'store/actions/actionPages';
import { useSetActiveAddon, useUpdateActiveAddons } from 'store/global/themeAddons';
import { addonSelector, saveForBuilderSelector } from 'store/selectors';
import { i18n } from 'translation';
import { AdminAddon } from 'types/Addons';
import { AdminSection } from 'types/Sections';
import { getUserInfo } from 'utils/functions/getUserInfo';
import { Divider, Space, View } from 'wiloke-react-core';
import { useSaveAdminAddon } from './utils/useSaveAdminAddons';

const TextInputDebounce = withDebounce(TextInput, 'value', 'onValueChange');
const TextEditorDebounce = withDebounce(TextEditor2, 'value', 'onChange');

export const ModalSaveAdminAddon: FC = () => {
  // selector
  const modalAddonsVisible = useSelector(modalAdminAddonsVisibleSelector);
  const { saveAddonStatus } = useSelector(saveForBuilderSelector);
  const { addStatus, categories: adminCategories, createChangelogStatus } = useSelector(addonSelector.adminAddonsCategory);
  const categories = useSelector(transformAdminAddonCategories);
  const addCategory = useCreateAdminAddonCategory();
  const { id } = getUserInfo();

  const { type, setType, setCreateCategory, changelog, setChangelog, setVersion, version, addon, section, createdCategory } = useSaveAdminAddon();

  const saveAddonsForBuilder = useSaveAtomAddon();
  const setModalAddonsVisible = useSetModalAdminAddonsVisible();
  const updateAddon = useUpdateActiveAddons();
  const updateSectionAddons = useUpdateAddonToPages();
  const reSetActiveAddon = useSetActiveAddon();
  const getAdminAddon = useGetAdminAddonsCategory();
  const createChangelog = useCreateAdminAddonChangelog();

  const [error, setError] = useState('');

  useEffect(() => {
    if (modalAddonsVisible) {
      getAdminAddon.request(undefined);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [modalAddonsVisible]);

  const publishAddons = () => {
    if (section && addon) {
      const newSection: AdminSection = {
        ...section,
        label: addon.label,
        image: addon.image,
        type: addon.type === 'third-party' ? 'third-party-add-ons' : 'built-in-add-ons',
        category: {
          name: addon.category?.name ?? '',
          description: addon.category?.description ?? '',
          commandId: addon.category?.commandId ?? '',
        },
        createdBy: id,
        currentVersion: type === 'create' ? '1.0.0' : version,
      };

      const newAddons: AdminAddon = {
        ...addon,
        body: {
          ...newSection,
        } as AdminSection,
        createdBy: id,
        currentVersion: type === 'create' ? '1.0.0' : version,
      };
      saveAddonsForBuilder.request({ type, data: newAddons });
    }
  };

  const saveAddons = () => {
    if (section && addon) {
      const newSection: AdminSection = {
        ...section,
        label: addon.label,
        image: addon.image,
        type: addon.type === 'third-party' ? 'third-party-add-ons' : 'built-in-add-ons',
        category: {
          name: addon?.category?.name ?? '',
          description: addon?.category?.description ?? '',
          commandId: addon?.category?.commandId ?? '',
        },
        createdBy: addon.createdBy ? addon.createdBy : id,
        currentVersion: version,
      };

      const newAddons: AdminAddon = {
        ...addon,
        body: {
          ...newSection,
        } as AdminSection,
        createdBy: addon.createdBy ? addon.createdBy : id,
        currentVersion: version,
      };
      updateAddon({ addons: newAddons });
      reSetActiveAddon({ addon: newAddons });
      updateSectionAddons(newSection);
      setModalAddonsVisible(false);
    }
  };

  const handleChangeCategory = (val: string) => {
    const _cate = adminCategories.find(item => item.slug === val);
    if (addon && _cate) {
      reSetActiveAddon({
        addon: {
          ...addon,
          category: {
            description: _cate.title,
            name: _cate.slug,
            commandId: _cate.commandId,
          },
        },
      });
    }
  };

  const handleAddCategory = () => {
    if (createdCategory.name && createdCategory.description) {
      addCategory.request({ description: createdCategory.description, name: createdCategory.name });
      setCreateCategory({
        name: '',
        description: '',
      });
    }
  };

  const handleCreateChangelog = () => {
    if (addon && version && addon.commandId) {
      createChangelog.request({
        content: changelog,
        version: version,
        versionId: addon.commandId,
      });
    }
  };

  const handleCancel = () => {
    saveAddonsForBuilder.cancel();
    setModalAddonsVisible(false);
  };

  return (
    <MyModal
      size="medium"
      headerText={`${i18n.t('general.save', { text: i18n.t('general.addons') })}`}
      depsHeightRecalculation={type}
      isVisible={modalAddonsVisible}
      onCancel={handleCancel}
      okText={i18n.t('general.save')}
      onOk={saveAddons}
      okBackgroundColor="secondary"
      FooterRight={
        <Button
          loading={saveAddonStatus === 'loading'}
          onClick={publishAddons}
          backgroundColor="primary"
          size="extra-small"
          radius={4}
          fontFamily="secondary"
          css={{ fontWeight: 500 }}
        >
          {i18n.t('general.save')} & {i18n.t('general.publish')}
        </Button>
      }
    >
      <View css={{ margin: 'auto', padding: '20px 0' }}>
        <Field label={i18n.t('general.createNewAddons')}>
          <SwitchBeauty
            checked={type === 'create'}
            radius={6}
            borderColor="gray3"
            borderWidth={1}
            enableText={i18n.t('general.enable')}
            disableText={i18n.t('general.disable')}
            onValueChange={value => {
              setType(value ? 'create' : 'update');
            }}
          />
        </Field>

        <Field label={i18n.t('general.title')}>
          <TextInputDebounce
            value={addon?.label}
            block
            sizeInput="medium"
            onValueChange={val => {
              if (addon) {
                reSetActiveAddon({
                  addon: {
                    ...addon,
                    label: val,
                  },
                });
              }
            }}
          />
        </Field>

        <Field label={i18n.t('builderPage.save_for_builder.addons_type')}>
          <SelectAntd
            value={addon?.type}
            onChange={value => {
              if (addon) {
                reSetActiveAddon({
                  addon: {
                    ...addon,
                    type: value,
                  },
                });
              }
            }}
            data={[
              {
                label: i18n.t('builderPage.built_in'),
                value: 'built-in',
              },
              {
                label: i18n.t('builderPage.third_party'),
                value: 'third-party',
              },
            ]}
          />
        </Field>

        <Field label={i18n.t('general.category')}>
          <SelectAntd
            data={categories}
            value={addon?.category?.name}
            onChange={handleChangeCategory}
            dropdownRender={menu => {
              return (
                <>
                  {menu}
                  <Divider />
                  <View css={{ padding: '8px 0 4px 0', display: 'flex', justifyContent: 'space-between' }}>
                    <View columns={[10, 10, 10]}>
                      <TextInputDebounce
                        value={createdCategory.description}
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

        <Field label={i18n.t('general.description')}>
          <TextEditorDebounce
            richText={false}
            value={addon?.tagLine}
            onChange={val => {
              if (addon) {
                reSetActiveAddon({
                  addon: {
                    ...addon,
                    tagLine: val,
                  },
                });
              }
            }}
          />
        </Field>

        <Field label={i18n.t('general.author')}>
          <TextInputDebounce
            value={addon?.authorName}
            block
            sizeInput="medium"
            onValueChange={val => {
              if (addon) {
                reSetActiveAddon({
                  addon: {
                    ...addon,
                    authorName: val,
                  },
                });
              }
            }}
          />
        </Field>

        <Field label={i18n.t('builderPage.save_for_builder.can_add_multi')}>
          <SwitchBeauty
            radius={6}
            borderColor="gray3"
            borderWidth={1}
            checked={addon?.canAddMulti}
            onValueChange={val => {
              if (addon) {
                reSetActiveAddon({
                  addon: {
                    ...addon,
                    canAddMulti: val,
                  },
                });
              }
            }}
          />
        </Field>

        <Field label={i18n.t('builderPage.save_for_builder.enable_position')}>
          <SwitchBeauty
            radius={6}
            borderColor="gray3"
            borderWidth={1}
            checked={addon?.positionEnabled}
            onValueChange={val => {
              if (addon) {
                reSetActiveAddon({
                  addon: {
                    ...addon,
                    positionEnabled: val,
                  },
                });
              }
            }}
          />
        </Field>

        {!!addon?.commandId && (
          <Field label={i18n.t('general.changelog')}>
            <View tagName="span">{i18n.t('general.current', { text: i18n.t('general.version') })}</View>
            <TextInput disabled value={addon?.currentVersion} block />
            <Space size={8} />
            <TextInputDebounce
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
              <View tagName="span" color="warning">
                {error}
              </View>
            ) : null}
            <Space size={8} />
            <TextInputDebounce placeholder={i18n.t('general.content')} value={changelog} block sizeInput="medium" onValueChange={setChangelog} />
            <Space size={8} />
            <Button size="extra-small" radius={4} loading={createChangelogStatus === 'loading'} onClick={handleCreateChangelog}>
              {i18n.t('general.create', { text: i18n.t('general.changelog') })}
            </Button>
          </Field>
        )}

        <Field label={i18n.t('builderPage.save_for_builder.logo')} width={200}>
          <ChooseImage
            value={{ src: addon?.logo ?? '', width: 0, height: 0 }}
            onChange={value => {
              if (addon) {
                reSetActiveAddon({
                  addon: {
                    ...addon,
                    logo: value.src,
                  },
                });
              }
            }}
            mode="popup"
          />
        </Field>

        <Field label={`${i18n.t('general.preview', { text: i18n.t('general.image') })}`} width={400}>
          <ChooseImage
            value={addon?.image}
            onChange={({ src, width, height }) => {
              if (addon) {
                reSetActiveAddon({
                  addon: {
                    ...addon,
                    image: {
                      src: src,
                      height: height ?? 0,
                      width: width ?? 0,
                    },
                  },
                });
              }
            }}
            mode="popup"
          />
        </Field>

        <Field label={i18n.t('builderPage.save_for_builder.detail')}>
          <TextEditorDebounce
            value={addon?.detail}
            onChange={value => {
              if (addon) {
                reSetActiveAddon({
                  addon: {
                    ...addon,
                    detail: value,
                  },
                });
              }
            }}
          />
        </Field>
      </View>
    </MyModal>
  );
};
