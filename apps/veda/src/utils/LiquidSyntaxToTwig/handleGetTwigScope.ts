import { set } from 'lodash';
import { omit, path } from 'ramda';
import { PREFIX_BLOG_HANDLE, PREFIX_COLLECTION_HANDLE, PREFIX_PRODUCT_HANDLE } from 'store/reducers/liquid/randomPlaceholderLiquidObject';
import { ComponentData } from 'types/Page';
import { SettingBlogPicker, SettingCollectionPicker, SettingSingleProductPicker } from 'types/Schema';
import { PageSection } from 'types/Sections';
import { Consts } from 'utils/constants/constants';
import { getBuilderPageReduxStore } from 'utils/getParentStore';
import { objectPathBracketNotation } from 'utils/objectPathBracketNotation';
import { Blog, Collection, Product } from './objects';

type Scope = Record<string, any>;
interface HandleGetTwigScope {
  variant: 'Xuất kết quả cuối cùng -> Xoá shopify scope' | 'Cần shopify scope';
  sectionId: PageSection['id'];
  sectionSettings: ComponentData['settings'];
  builderMode: boolean;
  addonScope?: Scope;
}

const ALL_COLLECTIONS_VARIABLE = 'collections';
const ALL_PRODUCTS_VARIABLE = 'all_products';
const ALL_BLOGS_VARIABLE = 'blogs';

const handleGetShopifyScope = ({
  sectionId,
  sectionSettings,
  variant,
}: Pick<HandleGetTwigScope, 'sectionId' | 'sectionSettings' | 'variant'>): Scope => {
  if (variant === 'Xuất kết quả cuối cùng -> Xoá shopify scope') {
    return {};
  }
  const state = getBuilderPageReduxStore().getState();
  const liquidVariables = state.liquidVariables.data;
  const variables = sectionSettings.reduce<string[]>((variables, setting) => {
    if (setting.children) {
      if (setting.type === 'collectionPicker') {
        const _children = setting.children as Exclude<SettingCollectionPicker['children'], undefined>;
        return variables.concat(`${ALL_COLLECTIONS_VARIABLE}['${_children.handle}']`);
      }
      if (setting.type === 'productPicker') {
        const _children = setting.children as Exclude<SettingSingleProductPicker['children'], undefined>;
        return variables.concat(`${ALL_PRODUCTS_VARIABLE}['${_children.handle}']`);
      }
      if (setting.type === 'blogPicker') {
        const _children = setting.children as Exclude<SettingBlogPicker['children'], undefined>;
        return variables.concat(`${ALL_BLOGS_VARIABLE}['${_children.handle}']`);
      }
    }
    if (setting.type === 'object') {
      setting.children.forEach(({ children, type }) => {
        if (children) {
          if (type === 'collectionPicker') {
            const _children = children as Exclude<SettingCollectionPicker['children'], undefined>;
            variables.push(`${ALL_COLLECTIONS_VARIABLE}['${_children.handle}']`);
          }
          if (type === 'productPicker') {
            const _children = children as Exclude<SettingSingleProductPicker['children'], undefined>;
            variables.push(`${ALL_PRODUCTS_VARIABLE}['${_children.handle}']`);
          }
          if (type === 'blogPicker') {
            const _children = children as Exclude<SettingBlogPicker['children'], undefined>;
            variables.push(`${ALL_BLOGS_VARIABLE}['${_children.handle}']`);
          }
        }
      });
    }
    if (setting.type === 'array') {
      setting.children.forEach(arrayItem => {
        arrayItem.children.forEach(({ children, type }) => {
          if (children) {
            if (type === 'collectionPicker') {
              const _children = children as Exclude<SettingCollectionPicker['children'], undefined>;
              variables.push(`${ALL_COLLECTIONS_VARIABLE}['${_children.handle}']`);
            }
            if (type === 'productPicker') {
              const _children = children as Exclude<SettingSingleProductPicker['children'], undefined>;
              variables.push(`${ALL_PRODUCTS_VARIABLE}['${_children.handle}']`);
            }
            if (type === 'blogPicker') {
              const _children = children as Exclude<SettingBlogPicker['children'], undefined>;
              variables.push(`${ALL_BLOGS_VARIABLE}['${_children.handle}']`);
            }
          }
        });
      });
    }
    return variables;
  }, []);
  const defaultScopes = {
    // K lấy luôn liquidVariables vì nó sẽ bị thừa ra những cái không cần thiết và gây nặng
    ...omit(
      [
        'themeCss',
        'translations',
        'weight_with_unit',
        'all_products',
        'collections',
        'blogs',
        'articles',
        // 'product',
        // 'collection',
        // 'blog',
        // 'gift_card',
        // 'order',
      ],
      liquidVariables,
    ),
    // product: pageType === 'product' ? liquidVariables.product : null,
    // collection: pageType === 'collection' ? liquidVariables.collection : null,
    // blog: pageType === 'article' ? liquidVariables.blog : null,
    // gift_card: pageType === 'giftCard' ? liquidVariables.gift_card : null,
    // order: pageType === 'order' ? liquidVariables.order : null,

    all_products: Object.keys(liquidVariables.all_products)
      .filter(productHandle => productHandle.includes(PREFIX_PRODUCT_HANDLE))
      .map(productHandle => liquidVariables.all_products[productHandle]),
    collections: Object.keys(liquidVariables.collections)
      .filter(collectionHandle => collectionHandle.includes(PREFIX_COLLECTION_HANDLE))
      .map(collectionHandle => liquidVariables.collections[collectionHandle]),
    blogs: Object.keys(liquidVariables.blogs)
      .filter(blogHandle => blogHandle.includes(PREFIX_BLOG_HANDLE))
      .map(blogHandle => liquidVariables.blogs[blogHandle]),
    section: {
      blocks: [],
      settings: {},
      id: `${Consts.AppName}-${sectionId}`,
    },
  };
  const scope = variables?.reduce((res, variable) => {
    const liquidVariableData = path(objectPathBracketNotation(variable), liquidVariables);
    if (liquidVariableData && variable.includes(ALL_COLLECTIONS_VARIABLE)) {
      res.collections.push(liquidVariableData as Collection);
      set(res, objectPathBracketNotation(variable), liquidVariableData);
      return res;
    }
    if (liquidVariableData && variable.includes(ALL_PRODUCTS_VARIABLE)) {
      res.all_products.push(liquidVariableData as Product);
      set(res, objectPathBracketNotation(variable), liquidVariableData);
      return res;
    }
    if (liquidVariableData && variable.includes(ALL_BLOGS_VARIABLE)) {
      res.blogs.push(liquidVariableData as Blog);
      set(res, objectPathBracketNotation(variable), liquidVariableData);
      return res;
    }
    set(res, objectPathBracketNotation(variable), liquidVariableData);
    return res;
  }, defaultScopes);
  return { ...scope };
};

export const handleGetSchemaScope = ({ sectionSettings }: Pick<HandleGetTwigScope, 'sectionSettings'>): Scope => {
  return (
    sectionSettings?.reduce<Record<string, any>>((obj, item) => {
      if (item.type === 'object') {
        return {
          ...obj,
          [item.name]: handleGetSchemaScope({ sectionSettings: item.children }),
        };
      }
      if (item.type === 'array') {
        return {
          ...obj,
          [item.name]: item.children.map(item => {
            return handleGetSchemaScope({
              sectionSettings: [
                ...item.children,
                {
                  children: item.id,
                  type: 'text',
                  label: 'Id',
                  summary: '',
                  name: 'id',
                  id: item.id,
                  disable: false,
                },
              ],
            });
          }),
        };
      }
      return {
        ...obj,
        [item.name]: item.children,
      };
    }, {}) || {}
  );
};

const handleGetUniqIdScope = ({ sectionId }: Pick<HandleGetTwigScope, 'sectionId'>): Scope => {
  return {
    uniqueId: sectionId,
  };
};

const handleGetBuilderModeScope = ({ builderMode }: Pick<HandleGetTwigScope, 'builderMode'>): Scope => {
  return {
    builderMode,
  };
};

export const handleGetTwigScope = ({ addonScope = {}, ...params }: HandleGetTwigScope): Scope => {
  return {
    ...handleGetShopifyScope(params),
    ...handleGetUniqIdScope(params),
    ...handleGetSchemaScope(params),
    ...handleGetBuilderModeScope(params),
    ...addonScope,
  };
};
