import { mergeDeepLeft } from 'ramda';
import { handleImgInLiquid } from 'utils/functions/handleImgInLiquid';
import { Locales } from '../@types/ShopifyLocales';
import { Section } from './@types/Section';
import { SettingBlockArray } from './SchemaBlocks/SettingBlockArray/@types/SettingBlockArray';
import { LIQUID_SettingBlockArray, SCHEMA_SettingBlockArray, SETTING_SettingBlockArray } from './SchemaBlocks/SettingBlockArray/SettingBlockArray';
import {
  LIQUID_SettingBlockObject,
  SCHEMA_SettingBlockObject,
  SETTING_SettingBlockObject,
} from './SchemaBlocks/SettingBlockObject/SettingBlockObject';
import { LIQUID_Converters } from './utils/LIQUID_Converters';
import { SCHEMA_Converters } from './utils/SCHEMA_Converters';
import { SETTING_Converters } from './utils/SETTING_Converters';

type ShopifySetting = Record<string, string | number | boolean | undefined>;

interface ShopifyBlockInSchema {
  type: string;
  settings: ShopifySetting;
}

interface ShopifySchema {
  name: string;
  tag: keyof HTMLElementTagNameMap;
  blocks: ReturnType<typeof SCHEMA_SettingBlockArray>['shopifyField'];
  settings: ReturnType<typeof SCHEMA_SettingBlockObject>['shopifyField'];
  // presets: [{ name: ShopifySchema["name"] }];
}

interface RTSectionConverter {
  liquid: string;
  schema: ShopifySchema;
  settings: ShopifySetting;
  blocks: Record<string, ShopifyBlockInSchema>;
  block_order: Array<keyof RTSectionConverter['blocks']>;
  locales: Locales;
}

interface SectionConverter {
  lastLiquid: string;
  section: Section;
  isPreview: boolean;
}
export const sectionConverter = ({ lastLiquid, section, isPreview }: SectionConverter): RTSectionConverter => {
  let liquid_: RTSectionConverter['liquid'] = lastLiquid;
  let settings_: RTSectionConverter['settings'] = {};
  let blocks_: RTSectionConverter['blocks'] = {};
  let block_order_: RTSectionConverter['block_order'] = [];
  let locales_: RTSectionConverter['locales'] = {
    en: {},
    fr: {},
    vi: {},
  };

  const schema_: ShopifySchema = {
    name: section.label,
    blocks: [],
    settings: [],
    tag: 'div',
    // presets: [{ name: section.label }],
  };

  // Xử lý schema & liquid
  section.data.schema.blocks.forEach(block => {
    if (block.type === 'array') {
      const { locales, shopifyField } = SCHEMA_SettingBlockArray(block);
      // Xử lý locales
      locales_ = mergeDeepLeft(locales_, locales);

      // Xử lý liquid
      liquid_ = LIQUID_SettingBlockArray(block, liquid_);

      // Xử lý schema
      schema_.blocks.push(...shopifyField);
    } else if (block.type === 'object') {
      const { locales, shopifyField } = SCHEMA_SettingBlockObject(block);
      // Xử lý locales
      locales_ = mergeDeepLeft(locales_, locales);

      // Xử lý liquid
      liquid_ = LIQUID_SettingBlockObject(block, liquid_);

      // Xử lý schema
      schema_.settings.push(...shopifyField);
    } else {
      throw new Error('Block chưa được hỗ trợ');
    }
  });

  section.data.schema.settings.forEach(setting => {
    const schemaConverter = SCHEMA_Converters[setting.type];
    if (schemaConverter) {
      const res = schemaConverter?.({
        // @ts-ignore
        field: setting,
        parentField: undefined,
      });
      if (res) {
        const { locales, shopifyField } = res;
        // Xử lý locales
        locales_ = mergeDeepLeft(locales_, locales as Locales);

        // Xử lý liquid
        const liquidConverter = LIQUID_Converters[setting.type];
        const newLiquid =
          liquidConverter?.({
            // @ts-ignore
            field: setting,
            parentField: undefined,
            liquid: liquid_,
          }) ?? liquid_;
        liquid_ = newLiquid;

        // Xử lý schema
        if (Array.isArray(shopifyField)) {
          schema_.settings.push(...shopifyField);
        } else {
          schema_.settings.push(shopifyField as any);
        }
      }
    }
  });

  // Xử lý settings
  section.data.settings.forEach(setting => {
    if (setting.type === 'array') {
      const arrayItems = SETTING_SettingBlockArray(
        setting,
        section.data.schema.blocks.find(block => block.type === 'array' && setting.id === block.id) as SettingBlockArray,
        isPreview,
      );
      blocks_ = {
        ...blocks_,
        ...arrayItems,
      };
      block_order_ = block_order_.concat(...Object.keys(arrayItems));
    } else if (setting.type === 'object') {
      settings_ = {
        ...settings_,
        ...SETTING_SettingBlockObject(setting, isPreview),
      };
    } else {
      const settingConveter = SETTING_Converters[setting.type];
      if (settingConveter) {
        const res =
          settingConveter(
            {
              // @ts-ignore
              field: setting,
              parentField: undefined,
            },
            isPreview,
          ) ?? {};
        settings_ = {
          ...settings_,
          ...res,
        };
      }
    }
  });

  // Xử lý các filter image_urls
  liquid_ = handleImgInLiquid(liquid_);

  // nối schema vào liquid
  liquid_ = liquid_.concat(`{% schema %}${JSON.stringify(schema_, undefined, 2)}{% endschema %}`);
  return {
    block_order: block_order_,
    blocks: blocks_,
    liquid: `
      {% assign uniqueId = "${section.id}" %}
      ${liquid_}
    `,
    locales: locales_,
    schema: schema_,
    settings: settings_,
  };
};
