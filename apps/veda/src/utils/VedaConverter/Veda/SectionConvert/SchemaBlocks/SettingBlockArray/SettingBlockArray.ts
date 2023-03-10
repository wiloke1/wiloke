import { flatten, mergeDeepLeft } from 'ramda';
import strToRegexpPattern from 'utils/functions/strToRegexpPattern';
import { ArticleField } from '../../../../Shopify/InputSettings/ArticleField';
import { BlogField } from '../../../../Shopify/InputSettings/BlogField';
import { CheckboxField } from '../../../../Shopify/InputSettings/CheckboxField';
import { CollectionField } from '../../../../Shopify/InputSettings/CollectionField';
import { NumberField } from '../../../../Shopify/InputSettings/NumberField';
import { ProductField } from '../../../../Shopify/InputSettings/ProductField';
import { ProductListField } from '../../../../Shopify/InputSettings/ProductListField';
import { RadioField } from '../../../../Shopify/InputSettings/RadioField';
import { SelectField } from '../../../../Shopify/InputSettings/SelectField';
import { TextareaField } from '../../../../Shopify/InputSettings/TextareaField';
import { TextField } from '../../../../Shopify/InputSettings/TextField';
import { HeaderField } from '../../../../Shopify/SidebarSettings/HeaderField';
import { Locales } from '../../../@types/ShopifyLocales';
import { ParagraphField } from '../../../../Shopify/SidebarSettings/ParagraphField';
import { getMatches } from '../../../utils/getMatches';
import { replaceExactRegexpInLiquidCode } from '../../../utils/replaceRegexpInLiquidCode';
import { SHOPIFY_TAG } from './@consts/SHOPIFY_TAG';
import { SettingArray, SettingBlockArray } from './@types/SettingBlockArray';
import { getBOCsBetweenSomething } from './utils/getBOCsBetweenSomething';
import { LIQUID_Converters } from './utils/LIQUID_Converters';
import { SCHEMA_Converters } from './utils/SCHEMA_SettingBlockArray';
import { SETTING_Converters } from './utils/SETTING_Converters';
import { vedaLabelToShopifyFieldLabel } from './utils/vedaLabelToShopifyFieldLabel';
import { getFieldCategorizeComponent } from './utils/getFieldCategorizeComponent';
import { optionCategorizeComponentToShopifyBlockType } from './utils/optionCategorizeComponentToShopifyBlockNameNType';

interface RTSettingBlockArray {
  locales: Locales;
  shopifyField: Array<{
    type: string;
    name: string;
    settings: Array<
      | ArticleField
      | BlogField
      | CheckboxField
      | CollectionField
      | HeaderField
      | ParagraphField
      | ProductField
      | ProductListField
      | RadioField
      | NumberField
      | SelectField
      | TextareaField
      | TextField
    >;
  }>;
}

// FIXME: Clean code & logic
export const SCHEMA_SettingBlockArray = (array: SettingBlockArray): RTSettingBlockArray => {
  const componentField = getFieldCategorizeComponent(array); // T??m setting (child) ????? "ph??n lo???i component" thu???c array
  // N???u block array c?? setting (child) ????? "ph??n lo???i component" => M???i item trong array l?? 1 ki???u tu??? thu???c v??o gi?? tr??? c???a "setting ????" ==> V???i m???i type n???m trong mi???n gi?? tr??? c???a setting ???? s??? t???o ra 1 block tr??n shopify
  if (componentField) {
    let RLocales: Locales = {
      en: {},
      fr: {},
      vi: {},
    };
    const result: RTSettingBlockArray['shopifyField'] = componentField.options.map(option => {
      const newSettings = array.children
        .map(item => {
          const sourceClause = `${array.name}.${componentField.name}`;
          const targetClause = `${option.value}`;

          const isUnmatch =
            item.deps &&
            // targetClause = 'title'
            // array.name = 'heading'
            // componentField.name = 'component'

            // N???u deps= heading.component !== 'space' v?? match v???i heading.component !== 'title' => Nh???n --> Unmatch = false
            !new RegExp(`${strToRegexpPattern(sourceClause)}\\s*(!==?)\\s*('|")[^${strToRegexpPattern(targetClause)}].*('|")`).test(item.deps) &&
            // N???u deps= heading.component === 'title' v?? match v???i regexp heading.component === 'title' => Nh???n --> Unmatch = false
            !new RegExp(`${strToRegexpPattern(sourceClause)}\\s*(===?)\\s*('|")${strToRegexpPattern(targetClause)}('|")`).test(item.deps);

          const schemaConverter = SCHEMA_Converters[item.type];
          if (schemaConverter && item.id !== componentField.id && !isUnmatch) {
            const res = schemaConverter({
              // @ts-ignore
              field: item,
              parentField: array,
            });
            if (res) {
              const { locales, shopifyField } = res;
              RLocales = mergeDeepLeft(RLocales, locales as Locales);
              return shopifyField;
            }
            return undefined;
          }
        })
        .filter(item => !!item);
      const { name, type, locales } = optionCategorizeComponentToShopifyBlockType(array, option);
      RLocales = mergeDeepLeft(RLocales, locales as Locales);
      return {
        type,
        name,
        settings: flatten(newSettings as any),
      };
    });
    return {
      locales: RLocales,
      shopifyField: result,
    };
  }
  // N???u block array kh??ng c?? settings (child) ????? "ph??n lo???i component" => M???i item trong array ?????u gi???ng nhau => T???o ra 1 block  tr??n shopify
  else {
    let RLocales: Locales = {
      en: {},
      fr: {},
      vi: {},
    };
    const { newLabel, locales } = vedaLabelToShopifyFieldLabel(array);
    const newSettings = array.children
      .map(item => {
        const schemaConverter = SCHEMA_Converters[item.type];
        if (schemaConverter) {
          const res = schemaConverter({
            // @ts-ignore
            field: item,
            parentField: array,
          });
          if (res) {
            const { locales, shopifyField } = res;
            RLocales = mergeDeepLeft(RLocales, locales as Locales);
            return shopifyField;
          }
          return undefined;
        }
        throw new Error('C?? g?? ???? sai sai!');
      })
      .filter(item => !!item);

    RLocales = mergeDeepLeft(RLocales, locales);
    return {
      locales: RLocales,
      shopifyField: [
        {
          type: array.name,
          name: newLabel,
          settings: flatten(newSettings as any),
        },
      ],
    };
  }
};

export const SETTING_SettingBlockArray = (array: SettingArray, schemaOfItself: SettingBlockArray | undefined, isPreview: boolean) => {
  type SettingResult = Record<string, string | number | boolean | undefined>;
  const componentField = schemaOfItself ? getFieldCategorizeComponent(schemaOfItself) : undefined;
  if (componentField && schemaOfItself) {
    return array.children.reduce<Record<string, { type: string; settings: SettingResult }>>((res, { children, id }) => {
      const componentType = children.find(field => field.id === componentField.id)?.children as string;
      const option = componentField.options.find(option => option.value === componentType);
      if (option && componentType) {
        const { type } = optionCategorizeComponentToShopifyBlockType(schemaOfItself, option);
        return {
          ...res,
          [id]: {
            type,
            settings: children.reduce<SettingResult>((res, item) => {
              const settingConverter = SETTING_Converters[item.type];
              const sourceClause = `${array.name}.${componentField.name}`;
              const targetClause = componentType;
              const isUnmatch =
                item.deps &&
                !new RegExp(`${strToRegexpPattern(sourceClause)}\\s*(===?)\\s*('|")${strToRegexpPattern(targetClause)}('|")`).test(item.deps) &&
                !new RegExp(`${strToRegexpPattern(sourceClause)}\\s*(!==?)\\s*('|")[^${strToRegexpPattern(targetClause)}].*('|")`).test(item.deps);

              if (settingConverter && item.id !== componentField.id && !isUnmatch) {
                return {
                  ...res,
                  ...(settingConverter(
                    {
                      // @ts-ignore
                      parentField: array,
                      // @ts-ignore
                      field: item,
                    },
                    isPreview,
                  ) as SettingResult),
                };
              } else {
                return res;
              }
            }, {}),
          },
        };
      } else {
        console.warn('C?? g?? ???? ???? sai sai');
        return res;
      }
    }, {});
  } else {
    return array.children.reduce<Record<string, { type: string; settings: SettingResult }>>((res, { children, id }) => {
      return {
        ...res,
        [id]: {
          type: array.name,
          settings: children.reduce<SettingResult>((res, item) => {
            const settingConverter = SETTING_Converters[item.type];
            if (settingConverter) {
              return {
                ...res,
                ...(settingConverter(
                  {
                    // @ts-ignore
                    parentField: array,
                    // @ts-ignore
                    field: item,
                  },
                  isPreview,
                ) as SettingResult),
              };
            } else {
              return res;
            }
          }, {}),
        },
      };
    }, {});
  }
};

export const LIQUID_SettingBlockArray = (array: SettingBlockArray, liquid: string) => {
  // X??? l?? array
  const START_BOC = new RegExp(/{%\s*for\s+.*\s+in\s+.*\s*%}/);
  const END_BOC = new RegExp(/{%\s*endfor\s*%}/);
  const CHEAT_END_FOR = ` C??c "BOCs" ?????u:
  - B???t ?????u b???ng "{% for ... %}" (1)
  - K???t th??c b???ng "{% endfor %}" (2)
  - Nested -> T???c trong BOCs n??y c?? th??? BOCs kh??c hay n??i c??ch kh??c l?? v??ng for l???ng nhau (3)
  ==> T??? (3) g???p r???c r???i trong vi???c regex v?? vi???c l???p code l?? c?? th??? x???y ra. C??? th??? ??? ????y l?? tr?????ng h???p ".replace(/{%\s*endfor\s*%}/g, '')" ??? d?????i
  ==> Th??m ??o???n n??y ????? cheat regex ????ng v?? d??? d??ng
  `;

  let liquid_ = liquid;
  let BOCs = getBOCsBetweenSomething({
    liquid: liquid_,
    startBOC: START_BOC,
    endBOC: END_BOC,
    ignoreNested: false,
    withUniqId: false,
    isValid: () => true,
  });

  while (BOCs.length) {
    const BOC = BOCs.shift();
    if (BOC) {
      const [line_of_code_start_for] = getMatches(BOC.content, new RegExp(/{%\s*for.*%}/g));
      if (line_of_code_start_for) {
        // T??ch ra c??c ph???n t??? c???n thi???t (bi???n l???p, bi???n array, limit, offset, reversed)
        const [loopVariable, , arrayName] = line_of_code_start_for
          .replace(/{%\s*for/g, '')
          .replace('%}', '')
          .trim()
          .replace(/\s+/g, ' ')
          .split(' ');

        // T??m bi???n g???c
        const liquidContext = liquid_.slice(0, BOC.startIndex);
        const liquidTagClauses = getBOCsBetweenSomething({
          liquid: liquidContext,
          startBOC: /{%\s*liquid/,
          endBOC: /%}/,
          ignoreNested: true,
          withUniqId: false,
          isValid: () => true,
        });

        let variableName = arrayName;
        while (true) {
          const assignClausesRelateToArrayNameAbove = getMatches(
            liquidContext,
            new RegExp(`{%\\s*assign\\s*${strToRegexpPattern(variableName)}\\s*=.* %}`, 'g'),
          );
          const lastClause = assignClausesRelateToArrayNameAbove.pop();
          if (lastClause) {
            const [, , targetName] = lastClause
              .replace(/{%\s*assign/g, '')
              .replace('%}', '')
              .trim()
              .replace(/\s+/g, ' ')
              .split(' ');
            if (variableName === targetName || targetName === arrayName) {
              break;
            } else {
              variableName = targetName;
            }
          } else {
            const liquidClausesRelateToArraynameAbove = liquidTagClauses.filter(liquidClause => liquidClause.content.includes(variableName));
            const lastLiquidClause = liquidClausesRelateToArraynameAbove.pop();
            if (lastLiquidClause) {
              const _lastLiquidClause = SHOPIFY_TAG.reduce((res, shopifyTag) => {
                return replaceExactRegexpInLiquidCode(res, new RegExp(shopifyTag, 'g'), `\n${shopifyTag}`);
              }, lastLiquidClause.content);
              const assignClausesRelateToArrayNameAbove = getMatches(
                _lastLiquidClause,
                new RegExp(`\nassign\\s*${strToRegexpPattern(variableName)}\\s*=.*\n`, 'g'),
              );
              const lastAssignClause = assignClausesRelateToArrayNameAbove.pop();
              if (lastAssignClause) {
                const [, , targetName] = lastAssignClause
                  .replace(/\n/g, '')
                  .replace(/assign/g, '')
                  .trim()
                  .replace(/\s+/g, ' ')
                  .split(' ');
                if (variableName === targetName || targetName === arrayName) {
                  break;
                } else {
                  variableName = targetName;
                }
              } else {
                break;
              }
            } else {
              break;
            }
          }
        }

        // T??m settings t????ng ???ng v???i bi???n g???c
        const data = array.name === variableName ? array : undefined;
        if (!data) {
          continue;
        }

        // X??? l?? th??? code assign t??n bi???n loop
        const componentField = getFieldCategorizeComponent(array); // T??m setting (child) ????? "ph??n lo???i component" thu???c array
        const contentOfBOCCheated = BOC.content.concat(CHEAT_END_FOR);
        let newCode = contentOfBOCCheated;
        // N???u block array c?? setting (child) ????? "ph??n lo???i component" => ??o???n code "case-when" c???a veda c???n x??? l?? theo m???t ki???u kh??c
        if (componentField) {
          /**
           * Input: {% for headingItem in heading %}
           *   {% case headingItem.component %}
           *     {% when 'title' %}
           *        ....
           *     {% when 'text' %}
           *        ...
           *      .........
           *   {% endcase %}
           * {% endfor %}
           * Output: {% for block in section.blocks %}
           *  {% assign headingItem = block.settings %}
           *   {% case block.type %}
           *     {% when 'heading_title' %}
           *        ....
           *     {% when 'heading_text' %}
           *        ...
           *      .........
           *   {% endcase %}
           * {% endfor %}
           */
          newCode = contentOfBOCCheated
            .replace(line_of_code_start_for, () => {
              return `
            {% for block in section.blocks %}
              {% assign ${loopVariable} = block.settings %}
            `;
            })
            .replace(new RegExp(`{%\\s*endfor\\s*%}.*${strToRegexpPattern(CHEAT_END_FOR)}`, 'g'), '{% endfor %}');
          componentField.options.forEach(option => {
            const { type } = optionCategorizeComponentToShopifyBlockType(array, option);
            const optionValue_ = option.value as string;
            // L??m th??? n??y ????? t??ng d??? tin c???y
            const regex = new RegExp(`{%.*${strToRegexpPattern(optionValue_)}.*%}`, 'g');
            newCode = newCode.replace(regex, value => {
              return value.replace(new RegExp(`('|")${strToRegexpPattern(optionValue_)}('|")`), `'${type}'`);
            });
          });
        } // N???u block array kh??ng c?? setting (child) ????? "ph??n lo???i component" => Th???c hi???n g??n bi???n loop = section block settings l?? OK
        else {
          newCode = contentOfBOCCheated
            .replace(line_of_code_start_for, () => {
              return `
            {% for block in section.blocks %}
              {% if block.type == '${variableName}' %}
                {% assign ${loopVariable} = block.settings %}
            `;
            })
            .replace(new RegExp(`{%\\s*endfor\\s*%}.*${strToRegexpPattern(CHEAT_END_FOR)}`, 'g'), '{% endif %}{% endfor %}');
        }

        // X??? l?? th??? c??c bi???n ???? b??? bi???n ?????i t??n theo t??n bi???n loop
        const newCode2 = array.children.reduce<string>((res, item) => {
          if (componentField?.id === item.id) {
            return res.replace(new RegExp(strToRegexpPattern(`${loopVariable}.${componentField.name}`), 'g'), 'block.type');
          } else {
            const liquidConverter = LIQUID_Converters[item.type];
            if (liquidConverter) {
              return liquidConverter({
                // @ts-ignore
                field: item,
                parentField: array,
                liquid: res,
                loopVariable,
              });
            }
            return res;
          }
        }, newCode);

        liquid_ = liquid_.replace(BOC.content, newCode2);

        BOCs = BOCs.map(item => {
          return {
            ...item,
            content: item.content.replaceAll(BOC.content, newCode),
          };
        });
      }
    }
  }

  return liquid_;
};
