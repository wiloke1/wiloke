import { compose } from 'ramda';
import {
  SchemaSettingField,
  SectionSettings,
  SettingArray,
  SettingBlockObject,
  SettingFlexOrder,
  SettingResponsive,
  SettingSpace,
} from 'types/Schema';
import strToRegexpPattern from 'utils/functions/strToRegexpPattern';
import { handleArrayFieldInShopifyTag } from './handleArrayFieldInShopifyTagNArrayFieldHasShopifyPicker';
import { handleFieldIsTranslation } from './handleFieldIsTranslation';
import { handleBOCDelimiters as handleBOCDelimitersPostprocess } from './postprocess';
import { handleBOCDelimiters } from './preprocess';
import { handleReplaceGeneralOpenCloseBlock } from './preprocess/handleReplaceToGeneralOpenCloseBlock';
import { convertToSyntaxShopifyDataType } from './utils/convertToSyntaxShopifyDataType';
import { isFieldTranslation } from './utils/isFieldTranslation';
import { replaceExactVariableNameInLiquidCode } from './utils/replaceExactVariableNameInLiquidCode';

interface HandleSettings_SchemaSettings {
  parentName?: string;
  shopify_clause: string;
  settings: SchemaSettingField[];
}

const getReplacer = (item: SchemaSettingField, variableName: string) => (value: string) => {
  if (item.children !== undefined) {
    if (item.type === 'articlePicker') {
      const variableValue = item.children?.handle;
      return replaceExactVariableNameInLiquidCode(value, variableName, convertToSyntaxShopifyDataType(variableValue));
    }
    if (item.type === 'blogPicker') {
      const variableValue = item.children?.handle;
      return replaceExactVariableNameInLiquidCode(value, variableName, convertToSyntaxShopifyDataType(variableValue));
    }
    if (item.type === 'collectionPicker') {
      const variableValue = item.children?.handle;
      return replaceExactVariableNameInLiquidCode(value, variableName, convertToSyntaxShopifyDataType(variableValue));
    }
    if (item.type === 'productPicker') {
      const variableValue = item.children?.handle;
      return replaceExactVariableNameInLiquidCode(value, variableName, convertToSyntaxShopifyDataType(variableValue));
    }
    if (item.type === 'hidden') {
      return value;
    }

    // Fix cho field "divider" v?? "divider c?? name='' n??n replace ch???y li??n t???c d???n ?????n sai"
    if (item.name === '') {
      return value;
    }

    // @tuong -> Translation field s??? ???????c x??? l?? t???i "handleFieldTranslation"
    if (isFieldTranslation(item)) {
      return value;
    }

    if (typeof item.children === 'boolean' || typeof item.children === 'number' || typeof item.children === 'string') {
      return replaceExactVariableNameInLiquidCode(value, variableName, convertToSyntaxShopifyDataType(item.children));
    }
    if (item.type === 'image' && item.children) {
      let value_ = value;
      value_ = replaceExactVariableNameInLiquidCode(value_, variableName, convertToSyntaxShopifyDataType(item.children.src));
      Object.entries(item.children).forEach(([key, valueOfKey]) => {
        if (typeof valueOfKey === 'string' || typeof valueOfKey === 'number' || typeof valueOfKey === 'boolean') {
          value_ = replaceExactVariableNameInLiquidCode(value_, [variableName, key].join('.'), convertToSyntaxShopifyDataType(valueOfKey));
        }
      });
      return value_;
    }
    if (typeof item.children === 'object' && !Array.isArray(item.children)) {
      const item_ = item as SettingResponsive | SettingFlexOrder | SettingSpace;
      let value_ = value;
      if (item_.children) {
        Object.entries(item_.children).forEach(([key, valueOfKey]) => {
          if (typeof valueOfKey === 'string' || typeof valueOfKey === 'number' || typeof valueOfKey === 'boolean') {
            value_ = replaceExactVariableNameInLiquidCode(value_, [variableName, key].join('.'), convertToSyntaxShopifyDataType(valueOfKey));
          }
        });
      }
      return value_;
    }
    return value;
  }
  return value;
};

const handleReplaceInSchemaSettings = ({ parentName, shopify_clause, settings }: HandleSettings_SchemaSettings) => {
  let _result = shopify_clause;
  // NOTE: Nh???ng th??? ???????c code li??n quan ?????n nh???ng ??o???n generateHelpers. Ch?? ?? n???u c?? thay ?????i
  settings.forEach(item => {
    const variableName = [parentName, item.name].filter(item => !!item).join('.');
    /** X??t t???ng block {{...}} v?? {%...%} ????? t??ng ????? ch??nh x??c (c?? kh?? nhi???u v??? tr?? x??t t???ng block nh?? th??? n??y -> n???u update c???n xem x??t vi???c update nh???ng c??i c??n l???i) */
    _result = _result.replace(new RegExp(`({{|{%).*${strToRegexpPattern(variableName)}.*(%}|}})`, 'g'), getReplacer(item, variableName));

    // FIX cho tr?????ng h???p all_products[products] (c?? kh?? nhi???u v??? tr?? x??t t???ng block nh?? th??? n??y -> n???u update c???n xem x??t vi???c update nh???ng c??i c??n l???i)
    _result = _result.replace(new RegExp(strToRegexpPattern(`[${variableName}]`), 'g'), getReplacer(item, variableName));
  });
  return _result;
};

interface HandleSettings_SchemaBlocks {
  shopify_clause: string;
  blocks: (SettingArray | SettingBlockObject)[];
}
const handleReplaceInSchemaBlocks = ({ shopify_clause, blocks }: HandleSettings_SchemaBlocks) => {
  let _result = shopify_clause;
  blocks.forEach(block => {
    if (block.type === 'array') {
      // NOTE: @tuong -> N???u t???t ch???c n??ng "handleArrayFieldInShopifyTag" c???n comment v?? throw l???i l???i ??o???n check n??y
      _result = handleArrayFieldInShopifyTag({ liquid: _result, settings: [block], variant: 'Liquid truy???n v??o l?? liquid trong c???p th??? shopify' });
      // const matches = getMatches(_result, new RegExp(`({{|{%).*${block.name}.*(%}|}})`, 'g'));
      // // FIX cho tr?????ng h???p all_products[products] (c?? kh?? nhi???u v??? tr?? x??t t???ng block nh?? th??? n??y -> n???u update c???n xem x??t vi???c update nh???ng c??i c??n l???i)
      // const matches2 = getMatches(_result, new RegExp(strToRegexpPattern(`[${block.name}]`), 'g'));
      // const isError =
      //   matches.findIndex(match => match && isExistExactVariableNameInLiquidCode(match, block.name)) !== -1 ||
      //   matches2.findIndex(match => match && isExistExactVariableNameInLiquidCode(match, block.name)) !== -1;
      // if (isError) {
      //   throw new LiquidSyntaxToTwigError(i18n.t('twig_error.clause_in_shopify.array'));
      // }
    }
    if (block.type === 'object') {
      _result = handleReplaceInSchemaSettings({ shopify_clause: _result, parentName: block.name, settings: block.children });
    }
  });
  return _result;
};

interface HandleReplaceInSectionSetingsValueToTagShopify {
  shopify_clause: string;
  settings: SectionSettings;
}
// NOTE: @tuong -> Logic th??? bi???n ???????c l???p l???i t???i "handleShopifyTagInForloop" -> N???u c?? s??? update ??? ????y c???n xem x??t update c??? nh???ng file m?? logic ???????c l???p l???i
/** Th??? c??c bi???n c???a builder cho c??c ph???n t??? b??n trong tag "shopify" */
export const handleReplaceSectionSetingsValueToTagShopify = ({ shopify_clause, settings }: HandleReplaceInSectionSetingsValueToTagShopify) => {
  const preprocessDataFlow = compose(
    (liquid: string) => handleFieldIsTranslation({ liquid, settings }),
    handleReplaceGeneralOpenCloseBlock,
    handleBOCDelimiters,
  );

  const schema_blocks = settings.filter(item => item.type === 'array' || item.type === 'object') as (SettingArray | SettingBlockObject)[];
  const schema_settings = settings.filter(item => item.type !== 'array' && item.type !== 'object') as SchemaSettingField[];
  const preprocessData = preprocessDataFlow(shopify_clause);

  return handleBOCDelimitersPostprocess(
    handleReplaceInSchemaSettings({
      shopify_clause: handleReplaceInSchemaBlocks({ blocks: schema_blocks, shopify_clause: preprocessData }),
      settings: schema_settings,
    }),
  );
};
