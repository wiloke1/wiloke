import Button from 'components/Button';
import Field from 'components/Field';
import MyModal from 'components/MyModal';
import SelectAntd from 'components/SelectAntd';
import TextInput from 'components/TextInput';
import withDebounce from 'hocs/withDebounce';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { i18n } from 'translation';
import { Divider, View } from 'wiloke-react-core';
import { usePublishThemeAtom } from '../store/actions/actionThemesAtom';
import { useCreateCategoryOfThemeProduct, useGetCategoriesOfThemeProduct } from '../store/actions/actionThemesProduct';
import { themesAtomSelector, useModalPublishThemeAtom } from '../store/reducers/sliceThemesAtom';
import { themesProductSelector, transformUserThemeCategories } from '../store/reducers/sliceThemesProduct';

const DebounceInput = withDebounce(TextInput, 'value', 'onValueChange');

export const ModalPublishTheme = () => {
  const { modalPublishThemeAtom, publishStatus } = useSelector(themesAtomSelector);
  const { createStatus, categories: originCategories } = useSelector(themesProductSelector);
  const categories = useSelector(transformUserThemeCategories);

  const setModalPublishThemeAtom = useModalPublishThemeAtom();
  const publishThemeAtom = usePublishThemeAtom();
  const getCategoriesOfThemeProduct = useGetCategoriesOfThemeProduct();
  const createCategoryOfThemeProduct = useCreateCategoryOfThemeProduct();

  const [plan, setPlan] = useState('free');

  const [category, setCategory] = useState<{ name: string; description: string }>({
    name: '',
    description: '',
  });

  const [createdCategory, setCreateCategory] = useState<{ name: string; description: string }>({
    description: '',
    name: '',
  });

  useEffect(() => {
    if (modalPublishThemeAtom) {
      getCategoriesOfThemeProduct.request(undefined);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [modalPublishThemeAtom]);

  const handlePublish = () => {
    const theme = modalPublishThemeAtom;
    if (theme) {
      const _cate = originCategories.find(item => item.slug === category.name);

      publishThemeAtom.request({
        themeAtom: theme,
        categoryOfProduct: _cate,
      });
    }
  };

  const handleCancel = () => {
    setModalPublishThemeAtom(undefined);
  };

  if (!modalPublishThemeAtom) {
    return null;
  }

  return (
    <MyModal
      size="medium"
      headerText={`${i18n.t('general.publish', { text: i18n.t('general.on', { text: i18n.t('general.application') }) })}`}
      okText={i18n.t('general.publish')}
      isVisible
      onCancel={handleCancel}
      onOk={handlePublish}
      isLoading={publishStatus === 'loading'}
    >
      <Field label={i18n.t('general.plan')}>
        <SelectAntd
          value={plan}
          onChange={val => {
            setPlan(val);
          }}
          data={[
            { value: 'free', label: i18n.t('general.free') },
            { value: 'pro', label: i18n.t('general.pro') },
            { value: 'enterprise', label: i18n.t('general.enterprise') },
          ]}
        />
      </Field>

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
                      loading={createStatus === 'loading'}
                      onClick={() => {
                        if (createdCategory.name) {
                          createCategoryOfThemeProduct.request({
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
    </MyModal>
  );
};
