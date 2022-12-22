import AsyncComponent from 'components/AsyncComponent';
import Button from 'components/Button';
import Field from 'components/Field';
import FieldBox from 'components/FieldBox';
import TextInput from 'components/TextInput';
import { useDeleteProductCategory, useGetTemplateCategories, useUpdateProductCategory } from 'containers/ChooseTemplate/store/actions';
import { useEditProductCategory } from 'containers/ChooseTemplate/store/reducers/sections/user.reducerCategory';
import withDebounce from 'hocs/withDebounce';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { chooseTemplateVisibleSelector, sectionsSelector } from 'store/selectors';
import { i18n } from 'translation';
import { GridSmart, View } from 'wiloke-react-core';

const DebounceInput = withDebounce(TextInput, 'value', 'onValueChange', 300);

export const ProductCategories = () => {
  const { visible, navKeys } = useSelector(chooseTemplateVisibleSelector);
  const { categories, getStatus, deleteStatus, updateStatus } = useSelector(sectionsSelector.categories);

  const getCategory = useGetTemplateCategories();
  const deleteCategory = useDeleteProductCategory();
  const updateCategory = useUpdateProductCategory();
  const editCategory = useEditProductCategory();

  useEffect(() => {
    if (visible && navKeys[0] === 'admin' && navKeys[1] === 'Product Categories') {
      getCategory.request(undefined);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visible, navKeys]);

  const renderSuccess = () => {
    return (
      <GridSmart columnCount={4} columnWidth={100} columnGap={8}>
        {categories.map(item => (
          <FieldBox borderColor="gray3" key={item.commandId} css={{ padding: '10px 15px' }}>
            <Field label={i18n.t('general.title')}>
              <DebounceInput
                value={item.title}
                block
                sizeInput="medium"
                onValueChange={val => {
                  editCategory({
                    commandId: item.commandId,
                    title: val,
                  });
                }}
              />
            </Field>
            <Field label="Slug">
              <DebounceInput
                value={item.slug}
                block
                sizeInput="medium"
                onValueChange={val => {
                  editCategory({
                    commandId: item.commandId,
                    slug: val,
                  });
                }}
              />
            </Field>

            <View css={{ display: 'flex', justifyContent: 'flex-end' }}>
              <Button
                loading={updateStatus[item.commandId] === 'loading'}
                size="extra-small"
                css={{ marginRight: '8px' }}
                radius={4}
                onClick={() => {
                  updateCategory.request({
                    commandId: item.commandId,
                    name: item.slug,
                    description: item.title,
                  });
                }}
              >
                {i18n.t('general.update')}
              </Button>
              <Button
                loading={deleteStatus[item.commandId] === 'loading'}
                backgroundColor="danger"
                size="extra-small"
                radius={4}
                onClick={() => {
                  deleteCategory.request({
                    commandId: item.commandId,
                  });
                }}
                disabled={!!item.quantity}
              >
                {i18n.t('general.delete')}
              </Button>
            </View>
          </FieldBox>
        ))}
      </GridSmart>
    );
  };

  return (
    <View css={{ padding: '10px' }}>
      <AsyncComponent status={getStatus} Success={renderSuccess()} />
    </View>
  );
};
