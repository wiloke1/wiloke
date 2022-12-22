import { compose } from 'ramda';
import { SchemaSettingField, SectionSettings, SettingArray, SettingBlockObject } from 'types/Schema';
import strToRegexpPattern from 'utils/functions/strToRegexpPattern';
import { handleBOCDelimiters, handleReplaceGeneralOpenCloseBlock } from './preprocess';
import { handleBOCDelimiters as handleBOCDelimitersPostprocess } from './postprocess';
import { isExistExactVariableNameInLiquidCode } from './utils/isExistExactVariableNameInLiquidCode';
import { isFieldTranslation } from './utils/isFieldTranslation';

const getReplacer = (item: SchemaSettingField, variableName: string) => (value: string) => {
  if (isFieldTranslation(item) && isExistExactVariableNameInLiquidCode(value, variableName)) {
    if (!/{%.*%}/g.test(value)) {
      const value_ = item.children as string;
      const twig = value_
        .replace(/({\s*)(veda\.[\w.]*)(\s*})/g, translationClause => {
          const keyOfTranslation = translationClause
            .replace(/{/g, '')
            .replace(/}/g, '')
            .trim();
          return `{{ "${keyOfTranslation}" | t }}`;
        })
        .trim();
      return twig;
    } else if (/{%.*assign.*%}/g.test(value)) {
      const variableValue = (item.children as string)
        // Xét trường hợp value của field có format {{ "..." | t }} trước để không xoá kết quả quả phép thế {veda....}
        .replace(/{{\s*["'].*["']\s*\|\s*t.*}}/g, translationClause => translationClause.replace(/({{)|(}})/g, ''))
        // Xét trường hợp value của field có format {veda....}
        .replace(/({\s*)(veda\.[\w.]*)(\s*})/g, translationClause => {
          const keyOfTranslation = translationClause
            .replace(/{/g, '')
            .replace(/}/g, '')
            .trim();
          return `"${keyOfTranslation}" | t`;
        })
        .trim();

      return value.replace(variableName, variableValue);
    }
  }
  return value;
};

interface HandleSettings_SchemaSettings {
  parentName?: string;
  liquid: string;
  settings: SchemaSettingField[];
}

const handleReplaceFieldTranslationInSettings_SchemaSettings = ({ settings, parentName, liquid }: HandleSettings_SchemaSettings) => {
  let _result = liquid;
  // NOTE: Những thứ được code liên quan đến những đoạn generateHelpers. Chú ý nếu có thay đổi
  settings.forEach(item => {
    const variableName = [parentName, item.name].filter(item => !!item).join('.');
    /** Xét từng block {{...}} và {%...%} để tăng độ chính xác (có khá nhiều vị trí xét từng block như thế này -> nếu update cần xem xét việc update những cái còn lại) */
    _result = _result.replace(new RegExp(`({{|{%).*${strToRegexpPattern(variableName)}.*(%}|}})`, 'g'), getReplacer(item, variableName));
    // FIX cho trường hợp all_products[products] (có khá nhiều vị trí xét từng block như thế này -> nếu update cần xem xét việc update những cái còn lại)
    _result = _result.replace(new RegExp(strToRegexpPattern(`[${variableName}]`), 'g'), getReplacer(item, variableName));
  });
  return _result;
};

interface HandleSettings_SchemaBlocks {
  liquid: string;
  blocks: (SettingArray | SettingBlockObject)[];
}

const handleReplaceFieldTranslationInSettings_SchemaBlocks = ({ liquid, blocks }: HandleSettings_SchemaBlocks) => {
  let _result = liquid;
  blocks.forEach(block => {
    if (block.type === 'object') {
      _result = handleReplaceFieldTranslationInSettings_SchemaSettings({ liquid: _result, parentName: block.name, settings: block.children });
    }
  });
  return _result;
};

interface HandleFieldTranslation {
  liquid: string;
  settings: SectionSettings;
}

// NOTE: @tuong -> Logic thế biến được lặp lại tại "handleShopifyTagInForloop" -> Nếu có sự update ở đây cần xem xét update cả những file mà logic được lặp lại
/** Thế các biến mà điền key của translation object để sử dụng translation trong field input */
// Input: Lorem {{ title_with_translation_input }} ipsum, title_with_translation_input = "{veda.translate.add_to_cart }"
// Output: Lorem {{ 'veda.translate.add_to_cart' | t }} ipsum
export const handleFieldIsTranslation = ({ liquid, settings }: HandleFieldTranslation) => {
  const preprocessDataFlow = compose(handleReplaceGeneralOpenCloseBlock, handleBOCDelimiters);
  const preprocessData = preprocessDataFlow(liquid);

  const schema_blocks = settings.filter(item => item.type === 'array' || item.type === 'object') as (SettingArray | SettingBlockObject)[];
  const schema_settings = settings.filter(item => item.type !== 'array' && item.type !== 'object') as SchemaSettingField[];
  return handleBOCDelimitersPostprocess(
    handleReplaceFieldTranslationInSettings_SchemaSettings({
      liquid: handleReplaceFieldTranslationInSettings_SchemaBlocks({ blocks: schema_blocks, liquid: preprocessData }),
      settings: schema_settings,
    }),
  );
};
