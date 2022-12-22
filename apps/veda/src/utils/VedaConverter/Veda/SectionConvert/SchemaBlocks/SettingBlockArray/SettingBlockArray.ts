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
  const componentField = getFieldCategorizeComponent(array); // Tìm setting (child) để "phân loại component" thuộc array
  // Nếu block array có setting (child) để "phân loại component" => Mỗi item trong array là 1 kiểu tuỳ thuộc vào giá trị của "setting đó" ==> Với mỗi type nằm trong miền giá trị của setting đó sẽ tạo ra 1 block trên shopify
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

            // Nếu deps= heading.component !== 'space' vì match với heading.component !== 'title' => Nhận --> Unmatch = false
            !new RegExp(`${strToRegexpPattern(sourceClause)}\\s*(!==?)\\s*('|")[^${strToRegexpPattern(targetClause)}].*('|")`).test(item.deps) &&
            // Nếu deps= heading.component === 'title' vì match với regexp heading.component === 'title' => Nhận --> Unmatch = false
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
  // Nếu block array không có settings (child) để "phân loại component" => Mọi item trong array đều giống nhau => Tạo ra 1 block  trên shopify
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
        throw new Error('Có gì đó sai sai!');
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
        console.warn('Có gì đó đã sai sai');
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
  // Xử lý array
  const START_BOC = new RegExp(/{%\s*for\s+.*\s+in\s+.*\s*%}/);
  const END_BOC = new RegExp(/{%\s*endfor\s*%}/);
  const CHEAT_END_FOR = ` Các "BOCs" đều:
  - Bắt đầu bằng "{% for ... %}" (1)
  - Kết thúc bằng "{% endfor %}" (2)
  - Nested -> Tức trong BOCs này có thể BOCs khác hay nói cách khác là vòng for lồng nhau (3)
  ==> Từ (3) gặp rắc rối trong việc regex vì việc lặp code là có thể xảy ra. Cụ thể ở đây là trường hợp ".replace(/{%\s*endfor\s*%}/g, '')" ở dưới
  ==> Thêm đoạn này để cheat regex đúng và dễ dàng
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
        // Tách ra các phần tử cần thiết (biến lặp, biến array, limit, offset, reversed)
        const [loopVariable, , arrayName] = line_of_code_start_for
          .replace(/{%\s*for/g, '')
          .replace('%}', '')
          .trim()
          .replace(/\s+/g, ' ')
          .split(' ');

        // Tìm biến gốc
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

        // Tìm settings tương ứng với biến gốc
        const data = array.name === variableName ? array : undefined;
        if (!data) {
          continue;
        }

        // Xử lý thế code assign tên biến loop
        const componentField = getFieldCategorizeComponent(array); // Tìm setting (child) để "phân loại component" thuộc array
        const contentOfBOCCheated = BOC.content.concat(CHEAT_END_FOR);
        let newCode = contentOfBOCCheated;
        // Nếu block array có setting (child) để "phân loại component" => Đoạn code "case-when" của veda cần xử lý theo một kiểu khác
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
            // Làm thế này để tăng dộ tin cậy
            const regex = new RegExp(`{%.*${strToRegexpPattern(optionValue_)}.*%}`, 'g');
            newCode = newCode.replace(regex, value => {
              return value.replace(new RegExp(`('|")${strToRegexpPattern(optionValue_)}('|")`), `'${type}'`);
            });
          });
        } // Nếu block array không có setting (child) để "phân loại component" => Thực hiện gán biến loop = section block settings là OK
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

        // Xử lý thế các biến đã bị biến đổi tên theo tên biến loop
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
