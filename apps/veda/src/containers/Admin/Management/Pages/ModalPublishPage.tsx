import Button from 'components/Button';
import ChooseImage from 'components/ChooseImage';
import Field from 'components/Field';
import MyModal from 'components/MyModal';
import SelectAntd from 'components/SelectAntd';
import TextInput from 'components/TextInput';
import withDebounce from 'hocs/withDebounce';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { i18n } from 'translation';
import { PreviewImage } from 'types/Page';
import { Divider, View } from 'wiloke-react-core';
import { usePublishPageAtom } from './store/actions/actionPagesAtom';
import { useCreateCategoryOfPageProduct, useGetCategoriesOfPageProduct } from './store/actions/actionPagesProduct';
import { pagesAtomSelector, useModalPublishPage } from './store/reducers/slicePagesAtom';
import { pagesProductSelector, transformUserPageCategories } from './store/reducers/slicePagesProduct';

const DebounceInput = withDebounce(TextInput, 'value', 'onValueChange');

export const ModalPublishPage = () => {
  const { modalPublish, publishStatus } = useSelector(pagesAtomSelector);
  const { createStatus, categories: originCategories } = useSelector(pagesProductSelector);
  const categories = useSelector(transformUserPageCategories);

  const setModalPublishPage = useModalPublishPage();
  const publishPageAtom = usePublishPageAtom();
  const getCategoriesOfPageProduct = useGetCategoriesOfPageProduct();
  const createCategoryOfPageProduct = useCreateCategoryOfPageProduct();

  const [image, setImage] = useState<PreviewImage>(modalPublish?.image ?? { src: '', width: 0, height: 0 });
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
    if (modalPublish) {
      getCategoriesOfPageProduct.request(undefined);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [modalPublish]);

  useEffect(() => {
    if (modalPublish) {
      setImage(modalPublish.image);
    }
  }, [modalPublish]);

  useEffect(() => {
    console.log(image);
  }, [image]);

  const handlePublish = () => {
    if (modalPublish) {
      const _cate = originCategories.find(item => item.slug === category.name);

      publishPageAtom.request({
        pageAtom: {
          ...modalPublish,
          image,
        },
        categoryOfProduct: _cate,
      });
    }
  };

  if (!modalPublish) {
    return null;
  }

  return (
    <MyModal
      size="medium"
      headerText="Publish on application"
      okText={i18n.t('general.publish')}
      isVisible
      onCancel={() => setModalPublishPage(undefined)}
      onOk={handlePublish}
      isLoading={publishStatus === 'loading'}
    >
      <Field label="Plan">
        <SelectAntd
          value={plan}
          onChange={val => {
            setPlan(val);
          }}
          data={[
            { value: 'free', label: 'Free' },
            { value: 'pro', label: 'Pro' },
            { value: 'enterprise', label: 'Enterprise' },
          ]}
        />
      </Field>

      <Field label="Category">
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
                          createCategoryOfPageProduct.request({
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

      <Field label={i18n.t('general.image')} width={400}>
        <ChooseImage mode="popup" value={image} onChange={setImage} />
      </Field>
    </MyModal>
  );
};
