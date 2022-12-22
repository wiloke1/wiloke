import Field from 'components/Field';
import MyModal from 'components/MyModal';
import SelectAntd from 'components/SelectAntd';
import {
  useCreateProductCategory,
  useGetAdminSectionChangelog,
  usePublishAdminSectionToProduct,
  useSetSettingsAdminSection,
} from 'containers/ChooseTemplate/store/actions';
import { useSelector } from 'react-redux';
import { sectionsSelector } from 'store/selectors';
import { pageTypeData } from 'containers/BuilderPage/components/ModalSaveForBuilder/utils/pageTypeData';
import { i18n } from 'translation';
import { useEffect, useState } from 'react';
import { message } from 'antd';
import { ProductSection } from 'types/Sections';
import { Divider, View } from 'wiloke-react-core';
import withDebounce from 'hocs/withDebounce';
import TextInput from 'components/TextInput';
import Button from 'components/Button';
import { envatoSelector } from 'containers/ChooseTemplate/store/reducers/sections/user.sliceEnvato';
import { useCreateEnvatoCategory, useGetEnvatoCategories } from 'containers/ChooseTemplate/store/actions/sections/user.actionEnvato';
import ChooseImage from 'components/ChooseImage';
import { PreviewImage } from 'types/Page';
import { useGetUserPlans } from 'containers/Admin/PlanManagement/store/actions';
import { planSelector } from 'containers/Admin/PlanManagement/store/slicePlan';

const DebounceInput = withDebounce(TextInput, 'value', 'onValueChange');

export const ModalPublish = () => {
  const { visible, data, sectionId, publishStatus } = useSelector(sectionsSelector.adminSections);
  const categories = useSelector(sectionsSelector.transformCategories);
  const { categories: userCategories, createStatus } = useSelector(sectionsSelector.categories);
  const currentSection = data.find(item => item.commandId === sectionId);
  const { categories: envatoCategories, createStatus: createEnvatoStatus } = useSelector(envatoSelector);
  const { plans } = useSelector(planSelector);

  const setSettingsAdminSection = useSetSettingsAdminSection();
  const publishAdminSectionReq = usePublishAdminSectionToProduct();
  const createCategoryProduct = useCreateProductCategory();
  const createEnvatoCategory = useCreateEnvatoCategory();
  const getEnvatoCategories = useGetEnvatoCategories();
  const getUserPlans = useGetUserPlans();

  const [plan, setPlan] = useState('');
  const [category, setCategory] = useState<{ name: string; description: string }>({
    name: '',
    description: '',
  });
  const [createdCategory, setCreateCategory] = useState<{ name: string; description: string }>({
    description: '',
    name: '',
  });

  const [createdEnvato, setCreateEnvato] = useState<{ name: string; description: string }>({
    description: '',
    name: '',
  });
  const [envatoIds, setEnvatoIds] = useState<string[]>([]);

  const [pageTypes, setPageTypes] = useState<any[]>([
    'page',
    'article',
    'collection',
    'product',
    'home',
    'cart',
    'pageNotFound',
    'password',
    'search',
    'login',
    'resetPassword',
    'activateAccount',
    'register',
    'account',
    'order',
    'addresses',
    'giftCard',
    'collections',
  ]);

  const [image, setImage] = useState<PreviewImage | undefined>(currentSection?.image);
  const getAdminChangelog = useGetAdminSectionChangelog();

  useEffect(() => {
    if (currentSection && visible) {
      setImage(currentSection.image);
    }
  }, [currentSection, visible]);

  useEffect(() => {
    if (visible) {
      getEnvatoCategories.request(undefined);
      getUserPlans.request(undefined);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visible]);

  useEffect(() => {
    if (visible && sectionId) {
      getAdminChangelog.request({ commandId: sectionId });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visible, sectionId]);

  const handleCancel = () => {
    setSettingsAdminSection({
      visible: false,
      sectionId: '',
    });
    setImage(undefined);
  };

  const handlePublish = () => {
    if (currentSection && !!category.name) {
      const _cate = userCategories.find(item => item.slug === category.name);
      const _envatoCate = envatoCategories.filter(item => envatoIds.includes(item.commandId));

      const transformProductSection: ProductSection = {
        ...currentSection,
        plan: undefined,
        category: {
          commandId: _cate?.commandId ?? '',
          description: _cate?.title ?? '',
          name: _cate?.slug ?? '',
        },
        downloadedCount: 0,
        pageTypes,
        parentCommandId: currentSection.commandId,
        tags: null,
        enable: currentSection.enable || true,
        envatoCategories: _envatoCate,
      };

      publishAdminSectionReq.request({ section: transformProductSection });
    } else {
      message.warning({
        content: i18n.t('publish_shopify.error_unknown.message'),
      });
    }
  };

  return (
    <MyModal
      size="medium"
      headerText={`${i18n.t('general.publish', { text: i18n.t('general.on', { text: i18n.t('general.application') }) })}`}
      okText={i18n.t('general.publish')}
      isVisible={visible}
      onCancel={handleCancel}
      onOk={handlePublish}
      isLoading={publishStatus === 'loading'}
    >
      <Field label={`${i18n.t('general.plan')}`}>
        <SelectAntd
          value={plan}
          onChange={val => {
            setPlan(val);
          }}
          data={plans.map(item => ({ label: item.name, value: item.name }))}
        />
      </Field>

      <Field label={`${i18n.t('general.section', { text: i18n.t('builderPage.save_for_builder.page_types') })}`}>
        <SelectAntd
          mode="multiple"
          value={pageTypes}
          data={pageTypeData}
          onChange={val => {
            setPageTypes(val);
          }}
        />
      </Field>

      <Field label={`${i18n.t('general.category')}`}>
        <SelectAntd
          data={categories}
          value={category.name}
          filterOption={(input, option) => {
            return ((option?.children as unknown) as string).toLowerCase().includes(input.toLowerCase());
          }}
          showSearch
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
                      loading={createStatus === 'loading'}
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

      <Field label={`Envato ${i18n.t('general.category')}`}>
        <SelectAntd
          mode="multiple"
          data={envatoCategories.map(item => ({ value: item.commandId, label: item.name }))}
          onChange={val => {
            setEnvatoIds(val);
          }}
          dropdownRender={menu => {
            return (
              <>
                {menu}
                <Divider />
                <View css={{ padding: '8px 0 4px 0', display: 'flex', justifyContent: 'space-between' }}>
                  <View columns={[10, 10, 10]}>
                    <DebounceInput
                      value={createdEnvato.name}
                      block
                      placeholder={i18n.t('builderPage.save_for_builder.please_enter_item')}
                      sizeInput="small"
                      css={{ width: '100%', height: '38px' }}
                      onValueChange={val => {
                        setCreateEnvato({
                          name: val,
                          description: val,
                        });
                      }}
                    />
                  </View>

                  <View columns={[2, 2, 2]}>
                    <Button
                      radius={4}
                      size="extra-small"
                      block
                      loading={createEnvatoStatus === 'loading'}
                      onClick={() => {
                        if (createdEnvato.name) {
                          createEnvatoCategory.request({
                            description: createdEnvato.description,
                            name: createdEnvato.name,
                            envatoItemId: '1',
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

      <Field width={350} label={i18n.t('general.image')}>
        <ChooseImage mode="popup" value={image} onChange={setImage} />
      </Field>
    </MyModal>
  );
};
