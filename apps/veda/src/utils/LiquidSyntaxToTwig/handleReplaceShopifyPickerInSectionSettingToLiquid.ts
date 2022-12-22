import { ComponentData } from 'types/Page';
import { SchemaSettingField, SettingBlogPicker, SettingCollectionPicker, SettingSingleProductPicker } from 'types/Schema';
import strToRegexpPattern from 'utils/functions/strToRegexpPattern';
import { SHOPIFY_PICKER_FIELD_TYPES } from './const';
import { handleArrayFieldInShopifyTag } from './handleArrayFieldInShopifyTagNArrayFieldHasShopifyPicker';
import { replaceExactVariableNameInLiquidCode } from './utils/replaceExactVariableNameInLiquidCode';

interface HandleReplaceShopifyPickerInSectionSettingToLiquid {
  settings: ComponentData['settings'];
  liquid: string;
}

const getVariableNameDependonSchemaType = (setting: SchemaSettingField) => setting.name;

/**
 * function xử lí thế các biến picker thuộc các field không phải "Array" vào liquid ("Array" là một trường hợp đặc biệt nên được xử lý theo một cách khác)
 * @example
 { % assign collection = collections[name_of_collection_picker_field_created_in_schema] %}
 với name_of_collection_picker_field_created_in_schema là 1 trường trong settings
 => thế slug vào "name_of_collection_picker_field_created_in_schema"
 */
export const handleReplaceShopifyPickerInSectionSettingToLiquid = ({ liquid, settings }: HandleReplaceShopifyPickerInSectionSettingToLiquid) => {
  // Xử lí gán biến cho twig
  let _liquid = liquid;
  settings.forEach(setting => {
    // Trường hợp ở schema setting
    if (SHOPIFY_PICKER_FIELD_TYPES.includes(setting.type)) {
      const _setting = setting as SettingCollectionPicker | SettingSingleProductPicker | SettingBlogPicker;
      const variableName = getVariableNameDependonSchemaType(setting as SchemaSettingField);
      const variableValue = _setting.children?.handle;
      if (variableValue) {
        /** Xét từng block {{...}} và {%...%} để tăng độ chính xác (có khá nhiều vị trí xét từng block như thế này -> nếu update cần xem xét việc update những cái còn lại) */
        _liquid = _liquid.replace(new RegExp(`({{|{%).*${strToRegexpPattern(variableName)}.*(%}|}})`, 'g'), value => {
          return replaceExactVariableNameInLiquidCode(value, variableName, JSON.stringify(variableValue));
        });
        // FIX cho trường hợp all_products[products] (có khá nhiều vị trí xét từng block như thế này -> nếu update cần xem xét việc update những cái còn lại)
        _liquid = _liquid.replace(new RegExp(strToRegexpPattern(`[${variableName}]`), 'g'), value => {
          return replaceExactVariableNameInLiquidCode(value, variableName, JSON.stringify(variableValue));
        });
      }
    }

    // Trường hợp ở schema block
    if (setting.type === 'object') {
      const _children = setting.children;
      _children.forEach(child => {
        if (SHOPIFY_PICKER_FIELD_TYPES.includes(child.type)) {
          const _child = child as SettingCollectionPicker | SettingSingleProductPicker | SettingBlogPicker;
          const variableName = [setting.name, getVariableNameDependonSchemaType(child)].join('.');
          const variableValue = _child.children?.handle;
          if (variableValue) {
            /** Xét từng block {{...}} và {%...%} để tăng độ chính xác (có khá nhiều vị trí xét từng block như thế này -> nếu update cần xem xét việc update những cái còn lại) */
            _liquid = _liquid.replace(new RegExp(`({{|{%).*${variableName}.*(%}|}})`, 'g'), value => {
              return replaceExactVariableNameInLiquidCode(value, variableName, JSON.stringify(variableValue));
            });
            // FIX cho trường hợp all_products[products] (có khá nhiều vị trí xét từng block như thế này -> nếu update cần xem xét việc update những cái còn lại)
            _liquid = _liquid.replace(new RegExp(strToRegexpPattern(`[${variableName}]`), 'g'), value => {
              return replaceExactVariableNameInLiquidCode(value, variableName, JSON.stringify(variableValue));
            });
          }
        }
      });
    }
    if (setting.type === 'array') {
      // NOTE: @tuong -> Nếu tắt chức năng "handleArrayFieldInShopifyTag" cần comment và throw lỗi lại đoạn check này
      _liquid = handleArrayFieldInShopifyTag({
        liquid: _liquid,
        settings: [setting],
        variant: 'Liquid là toàn bộ file liquid -> Thế các shopify picker',
      });
      // const matches = getMatches(_result, new RegExp(`({{|{%).*${block.name}.*(%}|}})`, 'g'));
      // // FIX cho trường hợp all_products[products] (có khá nhiều vị trí xét từng block như thế này -> nếu update cần xem xét việc update những cái còn lại)
      // const matches2 = getMatches(_result, new RegExp(strToRegexpPattern(`[${block.name}]`), 'g'));
      // const isError =
      //   matches.findIndex(match => match && isExistExactVariableNameInLiquidCode(match, block.name)) !== -1 ||
      //   matches2.findIndex(match => match && isExistExactVariableNameInLiquidCode(match, block.name)) !== -1;
      // if (isError) {
      //   throw new LiquidSyntaxToTwigError(i18n.t('twig_error.clause_in_shopify.array'));
      // }
    }
  });
  return _liquid;
};
