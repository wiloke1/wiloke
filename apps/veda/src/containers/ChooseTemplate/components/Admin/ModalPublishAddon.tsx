import Button from 'components/Button';
import Field from 'components/Field';
import MyModal from 'components/MyModal';
import SelectAntd from 'components/SelectAntd';
import TextInput from 'components/TextInput';
import { useCreateUserAddonsCategory, usePublishAdminAddonsToProduct } from 'containers/ChooseTemplate/store/actions';
import { useSetModalPublishAddons } from 'containers/ChooseTemplate/store/reducers/addons/admin.sliceAddons';
import { transformUserAddonCategories } from 'containers/ChooseTemplate/store/reducers/addons/user.sliceAddonCategory';
import withDebounce from 'hocs/withDebounce';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { addonSelector } from 'store/selectors';
import { i18n } from 'translation';
import { ProductAddon } from 'types/Addons';
import { Divider, View } from 'wiloke-react-core';

const DebounceInput = withDebounce(TextInput, 'value', 'onValueChange');

export const ModalPublishAddon = () => {
  const { visible, addons, addonId, approveStatus } = useSelector(addonSelector.adminAddons);
  const { addStatus, addonsNav: userCategories } = useSelector(addonSelector.userAddonsCategory);
  const categories = useSelector(transformUserAddonCategories);
  const addon = addons.find(item => item.commandId === addonId);

  const setModalVisible = useSetModalPublishAddons();
  const createCategoryProduct = useCreateUserAddonsCategory();
  const publishAddon = usePublishAdminAddonsToProduct();

  const [category, setCategory] = useState<{ name: string; description: string }>({
    name: '',
    description: '',
  });
  const [createdCategory, setCreateCategory] = useState<{ name: string; description: string }>({
    description: '',
    name: '',
  });
  const [version, setVersion] = useState('0');
  const [authorName, setAuthorName] = useState('');

  useEffect(() => {
    if (addon) {
      if (addon.authorName) {
        setAuthorName(addon.authorName);
      }
    }
  }, [addon]);

  const handlePublish = () => {
    if (addon) {
      const _cate = userCategories.find(item => item.slug === category.name);
      const { body } = addon;

      const productAddon: ProductAddon = {
        id: addon.id,
        commandId: '',
        parentCommandId: addon.commandId,
        category: {
          commandId: _cate?.commandId ?? '',
          description: _cate?.title ?? '',
          name: _cate?.slug ?? '',
        },
        logo: addon.logo,
        currentVersion: version,
        downloadedCount: 0,
        plan: undefined,
        label: addon.label,
        positionEnabled: addon.positionEnabled,
        sectionId: addon.body.id,
        syncedToServices: null,
        tagLine: addon.tagLine,
        type: addon.type,
        authorName: authorName,
        detail: addon.detail,
        canAddMulti: addon.canAddMulti,
        image: addon.image,
        body: {
          id: body.id,
          commandId: '',
          category: {
            commandId: _cate?.commandId ?? '',
            description: _cate?.title ?? '',
            name: _cate?.slug ?? '',
          },
          parentCommandId: addon.commandId ?? '',
          currentVersion: version,
          data: body.data,
          downloadedCount: 0,
          enable: true,
          label: addon.label,
          plan: undefined,
          syncedToServices: null,
          addonIds: body.addonIds,
          image: addon.image,
          type: body.type,
          approvedBy: addon.approvedBy,
          createdBy: addon.createdBy,
          pageTypes: [],
          tags: null,
          megaMenuCommandIds: body.megaMenuCommandIds ?? [],
        },
        enable: addon.enable || true,
      };

      publishAddon.request({ addon: productAddon });
    }
  };

  const handleCancel = () => {
    setModalVisible({
      visible: false,
      addonId: '',
    });
  };

  return (
    <MyModal
      onCancel={handleCancel}
      isVisible={visible}
      size="medium"
      headerText={`${i18n.t('general.publish', { text: i18n.t('general.on', { text: i18n.t('general.application') }) })}`}
      okText={i18n.t('general.publish')}
      isLoading={approveStatus === 'loading'}
      onOk={handlePublish}
    >
      <Field label={i18n.t('general.category')}>
        <SelectAntd
          data={categories}
          value={category.name}
          onChange={(val, opt: any) => {
            setCategory({
              name: val,
              description: opt.children,
            });
          }}
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
                          name: val,
                        });
                      }}
                    />
                  </View>

                  <View columns={[2, 2, 2]}>
                    <Button
                      radius={4}
                      size="extra-small"
                      block
                      loading={addStatus === 'loading'}
                      onClick={() => {
                        if (createdCategory.name) {
                          createCategoryProduct.request({
                            name: createdCategory.name,
                            description: createdCategory.description,
                          });

                          setCreateCategory({
                            description: '',
                            name: '',
                          });
                        }
                      }}
                    >
                      {i18n.t('builderPage.save_for_builder.add_category')}
                    </Button>
                  </View>
                </View>
              </>
            );
          }}
        />
      </Field>
      <Field label={`${i18n.t('general.version')}`}>
        <DebounceInput block value={version} onValueChange={setVersion} />
      </Field>
      <Field label={`${i18n.t('general.author')} ${i18n.t('general.name')}`}>
        <DebounceInput block value={authorName} onValueChange={setAuthorName} />
      </Field>
    </MyModal>
  );
};
