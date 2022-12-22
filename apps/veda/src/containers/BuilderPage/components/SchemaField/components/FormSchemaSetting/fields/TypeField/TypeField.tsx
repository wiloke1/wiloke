import Field from 'components/Field';
import { Option } from 'components/SelectAntd';
import { FC } from 'react';
import { useSelector } from 'react-redux';
import { defaultPickerRelateShopifySelector } from 'store/selectors';
import { i18n } from 'translation';
import {
  SchemaSettingField,
  SchemaSettingType,
  SettingArticlePicker,
  SettingBlogPicker,
  SettingCollectionPicker,
  SettingHidden,
  SettingSingleProductPicker,
  SettingRadioGroup,
  SettingResponsive,
  SettingSelect,
  SettingSlider,
  SettingFlexOrder,
} from 'types/Schema';
import { getShopName } from 'utils/functions/getUserInfo';
import { v4 } from 'uuid';
import { Text, View } from 'wiloke-react-core';
import { SelectAntdDebounce } from '../../../InputDebounced/InputDebounced';
import { FormSchemaSettingProps } from '../../type';

type GetSettingTypesParams = Pick<FormSchemaSettingProps, 'blockType' | 'section'>;

export const IGNORE_TYPES_IN_ARRAY_FIELD: SchemaSettingType[] = [];

const GET_SETTING_TYPES = ({ blockType }: GetSettingTypesParams): SchemaSettingType[] => {
  const _types: SchemaSettingType[] = [
    'articlePicker',
    'blogPicker',
    'collectionPicker',
    'color',
    'date',
    'divider',
    'flexOrder',
    'font',
    'hidden',
    'icon',
    'image',
    'linkPicker',
    'navigation',
    'productPicker',
    'products',
    'radioGroup',
    'responsive',
    'richText',
    'select',
    'slider',
    'space',
    'styleBox',
    'switch',
    'tags',
    'text',
    'textReadOnly',
    'textarea',
    'video',
    'animate',
    'animateInOut',
  ];
  // ignore đi collectionPicker tại block type array vì không thể regex để thế giá trị vào được
  const _ignoreTypesInBlocks: SchemaSettingType[] = [];
  if (blockType === 'array') {
    // NOTE: @tuong -> Nếu tắt chức năng "handleArrayFieldInShopifyTag" cần thay đổi
    // _ignoreTypesInBlocks.push('navigation', 'products', 'collectionPicker', 'productPicker', 'blogPicker', 'articlePicker');
    _ignoreTypesInBlocks.push(...IGNORE_TYPES_IN_ARRAY_FIELD);
  }
  return _types.filter(item => !_ignoreTypesInBlocks.includes(item));
};
type FieldTypes = Exclude<SchemaSettingField['type'], 'blogPicker' | 'articlePicker' | 'collectionPicker' | 'productPicker'>;
type DefaultValues = {
  [P in FieldTypes]: Extract<SchemaSettingField, { type: P }>['children'];
};

const defaultValues: DefaultValues = {
  color: '',
  font: 'Roboto',
  radioGroup: '',
  select: '',
  slider: undefined,
  styleBox: '',
  switch: true,
  text: '',
  textarea: '',
  image: undefined,
  icon: '<i class="far fa-atom"></i>',
  space: {},
  date: Date.now(),
  navigation: [
    {
      id: v4(),
      label: 'Item 1',
      href: '#',
      expanded: true,
      icon: '<i class="far fa-home"></i>',
      iconEnabled: false,
    },
    {
      id: v4(),
      label: 'Item 2',
      href: '#',
      expanded: true,
      icon: '<i class="far fa-home"></i>',
      iconEnabled: false,
    },
  ],
  linkPicker: '',
  flexOrder: {},
  responsive: {
    lg: 1,
    md: 1,
    sm: 1,
    xs: 1,
  },
  video: '',
  textReadOnly: '',
  tags: '',
  richText: '',
  hidden: '',
  divider: 1,
  products: [],
  animate: '',
  animateInOut: {
    in: '',
    out: '',
  },
  // Khi có 1 cái gì đấy được thêm vào đây -> xem xét việc thế giá trị đó vào code liquid (handleClauseInTagShopify.ts)
  // Nếu có 1 field có giá trị động (như Record<string, any>, ...) nào đấy được thêm vào đây -> editBlockChild.ts, editSetting.ts, editBlock.ts cần phải check điều kiện thế từ "schema" ra "settings"
};

export const labelOfTypes: Record<SchemaSettingField['type'], string> = {
  articlePicker: i18n.t('schema.fieldLabel.articlePicker'),
  blogPicker: i18n.t('schema.fieldLabel.blogPicker'),
  collectionPicker: i18n.t('schema.fieldLabel.collectionPicker'),
  color: i18n.t('schema.fieldLabel.color'),
  date: i18n.t('schema.fieldLabel.date'),
  divider: i18n.t('schema.fieldLabel.divider'),
  flexOrder: i18n.t('schema.fieldLabel.flexOrder'),
  font: i18n.t('schema.fieldLabel.font'),
  icon: i18n.t('schema.fieldLabel.icon'),
  image: i18n.t('schema.fieldLabel.image'),
  linkPicker: i18n.t('schema.fieldLabel.linkPicker'),
  navigation: i18n.t('schema.fieldLabel.navigation'),
  productPicker: i18n.t('schema.fieldLabel.productPicker'),
  radioGroup: i18n.t('schema.fieldLabel.radioGroup'),
  responsive: i18n.t('schema.fieldLabel.responsive'),
  select: i18n.t('schema.fieldLabel.select'),
  slider: i18n.t('schema.fieldLabel.slider'),
  space: i18n.t('schema.fieldLabel.space'),
  styleBox: i18n.t('schema.fieldLabel.styleBox'),
  switch: i18n.t('schema.fieldLabel.switch'),
  text: i18n.t('schema.fieldLabel.text'),
  textarea: i18n.t('schema.fieldLabel.textarea'),
  textReadOnly: i18n.t('schema.fieldLabel.textReadOnly'),
  video: i18n.t('schema.fieldLabel.video'),
  tags: i18n.t('schema.fieldLabel.tags'),
  richText: i18n.t('schema.fieldLabel.richText'),
  hidden: i18n.t('schema.fieldLabel.hidden'),
  products: i18n.t('schema.fieldLabel.products'),
  animate: i18n.t('schema.fieldLabel.animate'),
  animateInOut: i18n.t('schema.fieldLabel.animateInOut'),
};

/**
 * Lưu ý: Nếu có update ở đây cần xem xét lại việc file "SchemaField/SchemaBlocks/components/forms/FormBlock/fields/TypeField/TypeField.tsx" cũng cần có sự update tương tự
 * Vì các field này gần như là giống nhau nhưng cách update data cũng như data type truyền vào có sự khác nhau nên tách ra và cần xem xét việc update cả 2
 */
export const TypeField: FC<FormSchemaSettingProps> = ({ data, blockType, section, onChange }) => {
  const { data: defaultPickerRelateShopifyData, statusRequest } = useSelector(defaultPickerRelateShopifySelector);
  const { article, blog, collection, product } = defaultPickerRelateShopifyData;
  return (
    <Field
      label={i18n.t('schema.type')}
      description={
        <View>
          {article === 'Không tồn tại' && (
            <Text color="danger">
              {i18n.t('schema.default_picker_relate_shopify_non_exist', { object_name: 'Article' })}
              <Text
                tagName="a"
                target="blank"
                href={`https://${getShopName()}/admin/articles`}
                css={{ marginLeft: '4px', textDecoration: 'underline' }}
                color="primary"
              >
                {i18n.t('schema.create')}
              </Text>
            </Text>
          )}
          {blog === 'Không tồn tại' && (
            <Text color="danger">
              {i18n.t('schema.default_picker_relate_shopify_non_exist', { object_name: 'Blog' })}
              <Text
                tagName="a"
                target="blank"
                href={`https://${getShopName()}/admin/articles`}
                css={{ marginLeft: '4px', textDecoration: 'underline' }}
                color="primary"
              >
                {i18n.t('schema.create')}
              </Text>
            </Text>
          )}
          {collection === 'Không tồn tại' && (
            <Text color="danger">
              {i18n.t('schema.default_picker_relate_shopify_non_exist', { object_name: 'Collection' })}
              <Text
                tagName="a"
                target="blank"
                href={`https://${getShopName()}/admin/collections`}
                css={{ marginLeft: '4px', textDecoration: 'underline' }}
                color="primary"
              >
                {i18n.t('schema.create')}
              </Text>
            </Text>
          )}
          {product === 'Không tồn tại' && (
            <Text color="danger">
              {i18n.t('schema.default_picker_relate_shopify_non_exist', { object_name: 'Product' })}
              <Text
                tagName="a"
                target="blank"
                href={`https://${getShopName()}/admin/products`}
                css={{ marginLeft: '4px', textDecoration: 'underline' }}
                color="primary"
              >
                {i18n.t('schema.create')}
              </Text>
            </Text>
          )}
        </View>
      }
    >
      <SelectAntdDebounce
        showSearch
        loading={statusRequest === 'loading'}
        value={data.type}
        options={GET_SETTING_TYPES({ blockType, section }).map<Option>(item => {
          if (
            (item === 'articlePicker' && article === 'Không tồn tại') ||
            (item === 'blogPicker' && blog === 'Không tồn tại') ||
            (item === 'collectionPicker' && collection === 'Không tồn tại') ||
            (item === 'productPicker' && product === 'Không tồn tại')
          ) {
            return { label: labelOfTypes[item], value: item, disabled: true };
          }
          return { label: labelOfTypes[item], value: item };
        })}
        onChange={value => {
          const _value = value as SchemaSettingType;
          if (_value === 'hidden' || _value === 'divider') {
            onChange?.({
              children: undefined,
              type: _value,
            } as Partial<SettingHidden>);
          } else if (_value === 'responsive') {
            onChange?.({
              children: defaultValues[_value],
              type: _value,
              max: 12,
              min: 1,
            } as Partial<SettingResponsive>);
          } else if (_value === 'slider') {
            onChange?.({
              children: defaultValues[_value],
              type: _value,
              max: 100,
              min: 0,
            } as Partial<SettingSlider>);
          } else if (_value === 'select' || _value === 'radioGroup') {
            onChange?.({
              children: defaultValues[_value],
              type: _value,
              options: [],
            } as Partial<SettingSelect | SettingRadioGroup>);
          } else if (_value === 'flexOrder') {
            onChange?.({
              children: defaultValues[_value],
              type: _value,
              options: [],
            } as Partial<SettingFlexOrder>);
          } else if (_value === 'articlePicker') {
            onChange?.({
              children: article === 'Không tồn tại' ? undefined : article,
              type: _value,
            } as Partial<SettingArticlePicker>);
          } else if (_value === 'blogPicker') {
            onChange?.({
              children: blog === 'Không tồn tại' ? undefined : blog,
              type: _value,
            } as Partial<SettingBlogPicker>);
          } else if (_value === 'collectionPicker') {
            onChange?.({
              children: collection === 'Không tồn tại' ? undefined : collection,
              type: _value,
            } as Partial<SettingCollectionPicker>);
          } else if (_value === 'productPicker') {
            onChange?.({
              children: product === 'Không tồn tại' ? undefined : product,
              type: _value,
            } as Partial<SettingSingleProductPicker>);
          } else {
            onChange?.({ children: defaultValues[_value], type: _value });
          }
        }}
      />
    </Field>
  );
};
