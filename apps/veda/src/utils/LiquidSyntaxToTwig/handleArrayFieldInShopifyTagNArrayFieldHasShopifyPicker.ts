import { compose } from 'ramda';
import { ComponentData } from 'types/Page';
import { SettingArray, SettingFlexOrder, SettingResponsive, SettingSpace } from 'types/Schema';
import { Consts } from 'utils/constants/constants';
import { i18n } from 'translation';
import strToRegexpPattern from 'utils/functions/strToRegexpPattern';
import { v4 } from 'uuid';
import { at } from 'utils/at';
import { handleBOCDelimiters, handleReplaceGeneralOpenCloseBlock } from './preprocess';
import { handleBOCDelimiters as handleBOCDelimitersPostprocess } from './postprocess';
import { convertToSyntaxShopifyDataType } from './utils/convertToSyntaxShopifyDataType';
import { getMatches } from './utils/getMatches';
import { isFieldTranslation } from './utils/isFieldTranslation';
import { replaceExactRegexpInLiquidCode } from './utils/replaceExactRegexpInLiquidCode';
import { LiquidSyntaxToTwigError } from './Error';
import { SHOPIFY_TAG } from './theme_tags/liquid';
import { SHOPIFY_PICKER_FIELD_TYPES } from './const';

interface GetBOCsBetweenSomething {
  liquid: string;
  startBOC: RegExp;
  endBOC: RegExp;
  isValid: (BOC: string) => boolean;
  ignoreNested: boolean;
  withUniqId: boolean;
}

const getBOCsBetweenSomething_ = ({ endBOC, liquid, startBOC, isValid, ignoreNested, withUniqId }: GetBOCsBetweenSomething) => {
  let signals;
  const startIndexes = [];
  const BOCs = [];
  const regex = new RegExp(`${startBOC.source}|${endBOC.source}`, 'gm');
  while (true) {
    signals = regex.exec(liquid);
    if (signals !== null) {
      const signal = signals[0];
      if (!endBOC.test(signal)) {
        if (!ignoreNested) {
          // Bắt đầu 1 root
          const startIndex = regex.lastIndex - signal.length;
          startIndexes.push(startIndex);
        } else if (ignoreNested && !startIndexes.length) {
          const startIndex = regex.lastIndex - signal.length;
          startIndexes.push(startIndex);
        }
      } else {
        const startIndex = startIndexes.pop();
        if (startIndex !== undefined) {
          // Kết thúc 1 root
          const endIndex = regex.lastIndex;
          const content = liquid.slice(startIndex, endIndex);
          if (isValid(content)) {
            BOCs.push({
              content,
              startIndex,
              id: withUniqId ? v4() : undefined,
            });
          }
        }
      }
    } else {
      break;
    }
  }

  return BOCs;
};

const CHEAT_END_FOR = ` Các "BOCs" đều:
- Bắt đầu bằng "{% for ... %}" (1)
- Kết thúc bằng "{% endfor %}" (2)
- Nested -> Tức trong BOCs này có thể BOCs khác hay nói cách khác là vòng for lồng nhau (3)
==> Từ (3) gặp rắc rối trong việc regex vì việc lặp code là có thể xảy ra. Cụ thể ở đây là trường hợp ".replace(/{%\s*endfor\s*%}/g, '')" ở dưới
==> Thêm đoạn này để cheat regex đúng và dễ dàng
`;

interface HandleArrayFieldInShopifyTag {
  liquid: string;
  variant:
    | 'Liquid là toàn bộ file liquid -> Extract các cặp thẻ shopify'
    | 'Liquid là toàn bộ file liquid -> Thế các shopify picker'
    | 'Liquid truyền vào là liquid trong cặp thẻ shopify';
  settings: ComponentData['settings'];
}

/**
 * Version 2: Cho phép dùng array trong cặp thẻ shopify
 * Ý tưởng Lấy toàn bộ BOC vòng for -> Lấy ra array được sử dụng để loop và tên biến được đặt -> Tạo ra n (với n là độ dài array) đoạn code và các giá trị (key trong array object) được assign vào các biến uniq (uuid-v4) và thế vào Cùng với đó là các biến của forloop(index, first, last, ...)

🔴 Lưu ý 1:
  * Khá khó vì không thể đúng cho trường hợp biến array được tạo từ 1 biến khác
  * Ví dụ case không thể giải quyết:
    Input: `
      <shopify>
        {% assign tags = veda_field_in_array | split: "," %}
        {% for tag in tags %}
          <h1>{{ tag }}<h1>
        {% endfor }
      </shopify>
    `

🔴 Lưu ý 2:
* Khó vì cách làm này là thế chứ không phải compile -> Các filter, ... sẽ không đảm bảo là có thể sử dụng và đúng
* Ví dụ trường hợp đúng:
  Input: {
    liquid: `
    <shopify>
      {% for option in options %}
        <h1>{{ option.title | capitalize }}</h1>
      {% endfor %}
    </shopify>
    `,
    settings: [
      { name: options, children: ["Size", "Color", ...], ... },
      ...
    ]
  }

  Output: `
    <shopify>
      <h1>{{ "Size" | capitalize }}</h1>
      <h1>{{ "Color" | capitalize }}</h1>
      <h1>{{ ... | capitalize }}</h1>
    </shopify>
  `
🔴 Lưu ý 3: Luồng xử lý trở nên khá phức tạp nếu thêm vì nhiều hành động được lặp lại
- Ví dụ thêm chức năng "Shopify Picker" trong field "Array" -> Khi đó logic của "handleReplaceShopifyPickerInSchemaSettingToLiquid" sẽ lặp lại 1 lần nữa tại đây để thế được các giá trị của "Shopify Picker" vào vị trí thích hợp
- Input:
  {% for item in picker_products_result %}
    {{ item.title }}
  {% endfor %}
- Output:
  {% assign item = all_products[GIÁ TRỊ CỦA "ITEM" - TỨC HANDLE CỦA PRODUCT THUỘC "ITEM CÓ INDEX 0"] %}
    {{ item.title }}
  ...

✅ Example:
- Input: {
  liquid: `
  <shopify>
    {% for option in options %}
      <h1>
        {{ option.title }}
      </h1>
    {% endfor %}
  </shopify>
  `,
  settings: [
    { type: 'array', children: [...], ... },
    ...
  ]
}

- Output: `
<shopify>
  <h1>{{ "Size" }}</h1>
  <h1>{{ "Color" }}</h1>
  {% assign option = null %}
</shopify>

{% assign option = null %}
`
*/

const handleArrayFieldInShopifyTag_ = ({ liquid, variant, settings }: HandleArrayFieldInShopifyTag) => {
  const START_BOC = new RegExp(/{%\s*for\s+.*\s+in\s+.*\s*%}/);
  const END_BOC = new RegExp(/{%\s*endfor\s*%}/);
  const settings_ = settings.filter(setting => setting.type === 'array') as SettingArray[];
  let liquid_ = liquid;
  let BOCs: ReturnType<typeof getBOCsBetweenSomething_> = [];
  if (variant === 'Liquid truyền vào là liquid trong cặp thẻ shopify' || variant === 'Liquid là toàn bộ file liquid -> Thế các shopify picker') {
    BOCs = getBOCsBetweenSomething_({
      liquid: liquid_,
      startBOC: START_BOC,
      endBOC: END_BOC,
      ignoreNested: false,
      withUniqId: false,
      isValid: () => true,
    });
  } else if (variant === 'Liquid là toàn bộ file liquid -> Extract các cặp thẻ shopify') {
    BOCs = getBOCsBetweenSomething_({
      liquid: liquid_,
      startBOC: new RegExp(`<${Consts.FakeTags.Shopify}>`),
      endBOC: new RegExp(`</${Consts.FakeTags.Shopify}>`),
      ignoreNested: false,
      withUniqId: false,
      isValid: () => true,
    }).reduce((res, shopifyClause) => {
      const BOCsInShopifyClause = getBOCsBetweenSomething_({
        liquid: shopifyClause.content,
        startBOC: START_BOC,
        endBOC: END_BOC,
        ignoreNested: false,
        withUniqId: false,
        isValid: () => true,
      });
      return res.concat(BOCsInShopifyClause);
    }, [] as typeof BOCs);
  }

  // Phải xử lí nested - DONE
  while (BOCs.length) {
    const BOC = BOCs.shift();
    if (BOC) {
      const [line_of_code_start_for] = getMatches(BOC.content, new RegExp(/{%\s*for.*%}/g));
      if (line_of_code_start_for) {
        // Lấy ra content ("...") bên trong cặp thẻ "{% for ... %}"
        const contentOfForLoop = BOC.content
          // Chuẩn hoá để tránh lỗi khi dùng "concat" do BOC có thể thừa ra 1 cái gì đó
          .replace(/^\n/, '')
          .replace(/\n$/, '')
          .trim()
          // Thêm CHEAT_END_FOR để regex dễ dàng hơn (tránh trường hợp trùng lặp)
          .concat(CHEAT_END_FOR)
          .replace(line_of_code_start_for, '')
          .replace(new RegExp(`{%\\s*endfor\\s*%}.*${strToRegexpPattern(CHEAT_END_FOR)}`, 'g'), '');

        // Xóa nested để thế các biến của forloop shopify đúng vị trí
        const nested = getBOCsBetweenSomething_({
          endBOC: END_BOC,
          startBOC: START_BOC,
          liquid: contentOfForLoop,
          ignoreNested: true,
          withUniqId: true,
          isValid: () => true,
        });

        const contentOfForLoopRemoveNested = nested.reduce<typeof contentOfForLoop>((res, nestedBOC) => {
          return res.replaceAll(nestedBOC.content, `<----- ${nestedBOC.id} ----->`);
        }, contentOfForLoop);

        // Tách ra các phần tử cần thiết (biến lặp, biến array, limit, offset, reversed)
        const [loopVariableName, _, arrayName, ...limit_offset_reversed] = line_of_code_start_for
          .replace(/{%\s*for/g, '')
          .replace('%}', '')
          .trim()
          .replace(/\s+/g, ' ')
          .split(' ')
          .map(item => item.trim());

        // Tìm biến gốc
        const liquidContext = liquid_.slice(0, BOC.startIndex);
        const liquidTagClauses = getBOCsBetweenSomething_({
          liquid: liquidContext,
          startBOC: /{%\s*liquid/,
          endBOC: /%}/,
          ignoreNested: false,
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
            const [_fakeName, _equalSignal, targetName] = lastClause
              .replace(/{%\s*assign/g, '')
              .replace('%}', '')
              .trim()
              .replace(/\s+/g, ' ')
              .split(' ')
              .map(item => item.trim());
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
                const [_fakeName, _equalSignal, targetName] = lastAssignClause
                  .replace(/\n/g, '')
                  .replace(/assign/g, '')
                  .trim()
                  .replace(/\s+/g, ' ')
                  .split(' ')
                  .map(item => item.trim());
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
        const data = settings_.find(block => block.name === variableName);
        if (!data) {
          continue;
        }
        // Nếu array k có field shopify picker thì k cần phải xử lý
        const isIncludeShopifyPickerField = at(data?.children, 0)?.children?.find(field => SHOPIFY_PICKER_FIELD_TYPES.includes(field.type));
        if (!isIncludeShopifyPickerField) {
          continue;
        }

        // Xử lí array nếu có limit, offset, reversed;
        const { limit, offset, reversed } = limit_offset_reversed?.reduce<{
          limit: number | undefined;
          reversed: boolean | undefined;
          offset: number | undefined;
        }>(
          (result, atomicClause, index) => {
            if (atomicClause.includes('limit')) {
              return {
                ...result,
                limit: Number(limit_offset_reversed[index + 1]),
              };
            }
            if (atomicClause.includes('reversed')) {
              return {
                ...result,
                reversed: true,
              };
            }
            if (atomicClause.includes('offset')) {
              return {
                ...result,
                offset: Number(limit_offset_reversed[index + 1]),
              };
            }
            return result;
          },
          { limit: undefined, reversed: false, offset: undefined },
        );
        let preprocessChildren = [...data.children];
        if (typeof limit === 'number' && !isNaN(limit)) {
          preprocessChildren = preprocessChildren.slice(0, limit);
        }
        if (typeof offset === 'number' && !isNaN(offset)) {
          preprocessChildren = preprocessChildren.slice(offset);
        }
        if (reversed && typeof reversed === 'boolean') {
          preprocessChildren.reverse();
        }
        const codeArr = preprocessChildren.reduce<any[]>((newCode, item, index) => {
          let code = contentOfForLoopRemoveNested;

          // thế biến loop
          const firstVariable = index === 0;
          const indexVariable = index + 1;
          const index0Variable = index;
          const lastVariable = index === data.children.length - 1;
          const lengthVariable = data.children.length;
          const rIndexVariable = data.children.length - index;
          const rIndex0Variable = data.children.length - index + 1;

          code = code
            .replace(new RegExp(strToRegexpPattern('forloop.first'), 'g'), `${firstVariable}`)
            .replace(new RegExp(strToRegexpPattern('forloop.index0'), 'g'), `${index0Variable}`)
            .replace(new RegExp(strToRegexpPattern('forloop.index'), 'g'), `${indexVariable}`)
            .replace(new RegExp(strToRegexpPattern('forloop.last'), 'g'), `${lastVariable}`)
            .replace(new RegExp(strToRegexpPattern('forloop.length'), 'g'), `${lengthVariable}`)
            .replace(new RegExp(strToRegexpPattern('forloop.rIndex0'), 'g'), `${rIndex0Variable}`)
            .replace(new RegExp(strToRegexpPattern('forloop.rIndex'), 'g'), `${rIndexVariable}`);

          // Thế lại nested
          code = nested.reduce<string>((res, nestedBOC) => {
            return res.replaceAll(`<----- ${nestedBOC.id} ----->`, nestedBOC.content);
          }, code);

          // Thế giá trị vào các biến
          const valuesOfLoopStepVariable = item.children;
          valuesOfLoopStepVariable.forEach(valueOfLoopStepVariable => {
            const fieldValue = valueOfLoopStepVariable.children;
            const fieldName = valueOfLoopStepVariable.name;
            if (variant === 'Liquid là toàn bộ file liquid -> Thế các shopify picker') {
              if (valueOfLoopStepVariable.type === 'articlePicker' && valueOfLoopStepVariable.children) {
                const value = valueOfLoopStepVariable.children.handle;
                const value_ = convertToSyntaxShopifyDataType(value);
                const syntaxInCode = `${loopVariableName}.${fieldName}`;
                code = replaceExactRegexpInLiquidCode(code, new RegExp(syntaxInCode, 'g'), value_);
              } else if (valueOfLoopStepVariable.type === 'blogPicker' && valueOfLoopStepVariable.children) {
                const value = valueOfLoopStepVariable.children.handle;
                const value_ = convertToSyntaxShopifyDataType(value);
                const syntaxInCode = `${loopVariableName}.${fieldName}`;
                code = replaceExactRegexpInLiquidCode(code, new RegExp(syntaxInCode, 'g'), value_);
              } else if (valueOfLoopStepVariable.type === 'collectionPicker' && valueOfLoopStepVariable.children) {
                const value = valueOfLoopStepVariable.children.handle;
                const value_ = convertToSyntaxShopifyDataType(value);
                const syntaxInCode = `${loopVariableName}.${fieldName}`;
                code = replaceExactRegexpInLiquidCode(code, new RegExp(syntaxInCode, 'g'), value_);
              } else if (valueOfLoopStepVariable.type === 'productPicker' && valueOfLoopStepVariable.children) {
                const value = valueOfLoopStepVariable.children.handle;
                const value_ = convertToSyntaxShopifyDataType(value);
                const syntaxInCode = `${loopVariableName}.${fieldName}`;
                code = replaceExactRegexpInLiquidCode(code, new RegExp(syntaxInCode, 'g'), value_);
              } else if (valueOfLoopStepVariable.type === 'image' && valueOfLoopStepVariable.children) {
                const value = valueOfLoopStepVariable.children.src;
                const value_ = convertToSyntaxShopifyDataType(value);
                const syntaxInCode = `${loopVariableName}.${fieldName}`;
                code = replaceExactRegexpInLiquidCode(code, new RegExp(syntaxInCode, 'g'), value_);
                Object.entries(valueOfLoopStepVariable.children).forEach(([key, valueOfKey]) => {
                  const value_ = convertToSyntaxShopifyDataType(valueOfKey);
                  const syntaxInCode = `${loopVariableName}.${fieldName}.${key}`;
                  code = replaceExactRegexpInLiquidCode(code, new RegExp(syntaxInCode, 'g'), value_);
                });
              }
              // Fix cho field "divider" vì "divider có name='' nên replace chạy liên tục dẫn đến sai"
              else if (valueOfLoopStepVariable.name === '') {
                code = code;
              }
              // Logic thay thế giá trị giống với "handleFieldIsTranslation" & "handleClauseInTagShopify"
              else if (isFieldTranslation(valueOfLoopStepVariable)) {
                const value_ = valueOfLoopStepVariable.children as string;
                const syntaxInCode = `${loopVariableName}.${fieldName}`;
                code = replaceExactRegexpInLiquidCode(code, new RegExp(syntaxInCode, 'g'), () => {
                  const twig = value_
                    .replace(/({\s*)(veda\.[\w.]*)(\s*})/g, translationClause => {
                      const keyOfTranslation = translationClause
                        .replace(/{/g, '')
                        .replace(/}/g, '')
                        .trim();
                      return `"${keyOfTranslation}" | t`;
                    })
                    .trim();

                  return twig;
                });
              } else if (typeof fieldValue === 'string' || typeof fieldValue === 'number' || typeof fieldValue === 'boolean') {
                const value_ = convertToSyntaxShopifyDataType(fieldValue);
                const syntaxInCode = `${loopVariableName}.${fieldName}`;
                code = replaceExactRegexpInLiquidCode(code, new RegExp(syntaxInCode, 'g'), value_);
              } else if (typeof fieldValue === 'object' && !Array.isArray(fieldValue)) {
                const valueOfLoopStepVariable_ = valueOfLoopStepVariable as SettingResponsive | SettingFlexOrder | SettingSpace;
                if (valueOfLoopStepVariable_.children) {
                  Object.entries(valueOfLoopStepVariable_.children).forEach(([key, valueOfKey]) => {
                    if (typeof valueOfKey === 'string' || typeof valueOfKey === 'number' || typeof valueOfKey === 'boolean') {
                      const value_ = convertToSyntaxShopifyDataType(valueOfKey);
                      const syntaxInCode = `${loopVariableName}.${fieldName}.${key}`;
                      code = replaceExactRegexpInLiquidCode(code, new RegExp(syntaxInCode, 'g'), value_);
                    }
                  });
                }
              }
            } else {
              if (valueOfLoopStepVariable.type === 'navigation') {
                throw new LiquidSyntaxToTwigError(i18n.t('twig_error.clause_in_shopify.navigation'));
              } else if (valueOfLoopStepVariable.type === 'products') {
                throw new LiquidSyntaxToTwigError(i18n.t('twig_error.clause_in_shopify.products'));
              } else if (valueOfLoopStepVariable.type === 'articlePicker' && valueOfLoopStepVariable.children) {
                const value = valueOfLoopStepVariable.children.handle;
                const value_ = convertToSyntaxShopifyDataType(value);
                const syntaxInCode = `${loopVariableName}.${fieldName}`;
                code = replaceExactRegexpInLiquidCode(code, new RegExp(syntaxInCode, 'g'), value_);
              } else if (valueOfLoopStepVariable.type === 'blogPicker' && valueOfLoopStepVariable.children) {
                const value = valueOfLoopStepVariable.children.handle;
                const value_ = convertToSyntaxShopifyDataType(value);
                const syntaxInCode = `${loopVariableName}.${fieldName}`;
                code = replaceExactRegexpInLiquidCode(code, new RegExp(syntaxInCode, 'g'), value_);
              } else if (valueOfLoopStepVariable.type === 'collectionPicker' && valueOfLoopStepVariable.children) {
                const value = valueOfLoopStepVariable.children.handle;
                const value_ = convertToSyntaxShopifyDataType(value);
                const syntaxInCode = `${loopVariableName}.${fieldName}`;
                code = replaceExactRegexpInLiquidCode(code, new RegExp(syntaxInCode, 'g'), value_);
              } else if (valueOfLoopStepVariable.type === 'productPicker' && valueOfLoopStepVariable.children) {
                const value = valueOfLoopStepVariable.children.handle;
                const value_ = convertToSyntaxShopifyDataType(value);
                const syntaxInCode = `${loopVariableName}.${fieldName}`;
                code = replaceExactRegexpInLiquidCode(code, new RegExp(syntaxInCode, 'g'), value_);
              } else if (valueOfLoopStepVariable.type === 'image' && valueOfLoopStepVariable.children) {
                const value = valueOfLoopStepVariable.children.src;
                const value_ = convertToSyntaxShopifyDataType(value);
                const syntaxInCode = `${loopVariableName}.${fieldName}`;
                code = replaceExactRegexpInLiquidCode(code, new RegExp(syntaxInCode, 'g'), value_);
                Object.entries(valueOfLoopStepVariable.children).forEach(([key, valueOfKey]) => {
                  const value_ = convertToSyntaxShopifyDataType(valueOfKey);
                  const syntaxInCode = `${loopVariableName}.${fieldName}.${key}`;
                  code = replaceExactRegexpInLiquidCode(code, new RegExp(syntaxInCode, 'g'), value_);
                });
              }
              // Fix cho field "divider" vì "divider có name='' nên replace chạy liên tục dẫn đến sai"
              else if (valueOfLoopStepVariable.name === '') {
                code = code;
              }
              // Logic thay thế giá trị giống với "handleFieldIsTranslation" & "handleClauseInTagShopify"
              else if (isFieldTranslation(valueOfLoopStepVariable)) {
                const value_ = valueOfLoopStepVariable.children as string;
                const syntaxInCode = `${loopVariableName}.${fieldName}`;
                code = replaceExactRegexpInLiquidCode(code, new RegExp(syntaxInCode, 'g'), () => {
                  const twig = value_
                    .replace(/({\s*)(veda\.[\w.]*)(\s*})/g, translationClause => {
                      const keyOfTranslation = translationClause
                        .replace(/{/g, '')
                        .replace(/}/g, '')
                        .trim();
                      return `"${keyOfTranslation}" | t`;
                    })
                    .trim();

                  return twig;
                });
              } else if (typeof fieldValue === 'string' || typeof fieldValue === 'number' || typeof fieldValue === 'boolean') {
                const value_ = convertToSyntaxShopifyDataType(fieldValue);
                const syntaxInCode = `${loopVariableName}.${fieldName}`;
                code = replaceExactRegexpInLiquidCode(code, new RegExp(syntaxInCode, 'g'), value_);
              } else if (typeof fieldValue === 'object' && !Array.isArray(fieldValue)) {
                const valueOfLoopStepVariable_ = valueOfLoopStepVariable as SettingResponsive | SettingFlexOrder | SettingSpace;
                if (valueOfLoopStepVariable_.children) {
                  Object.entries(valueOfLoopStepVariable_.children).forEach(([key, valueOfKey]) => {
                    if (typeof valueOfKey === 'string' || typeof valueOfKey === 'number' || typeof valueOfKey === 'boolean') {
                      const value_ = convertToSyntaxShopifyDataType(valueOfKey);
                      const syntaxInCode = `${loopVariableName}.${fieldName}.${key}`;
                      code = replaceExactRegexpInLiquidCode(code, new RegExp(syntaxInCode, 'g'), value_);
                    }
                  });
                }
              }
            }
          });
          // TODO: Trường hợp reset value nằm trong {% liquid ... %} thì sao?
          // if (lastVariable) {
          //   code = code.concat(`{% assign ${loopVariableName} = null %}`);
          // }

          return newCode.concat(code);
        }, []);

        const newCode = codeArr.join('\n');
        liquid_ = liquid_.replace(BOC.content, newCode);
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

export const handleArrayFieldInShopifyTag = ({ liquid, settings, variant }: HandleArrayFieldInShopifyTag) => {
  const preprocessDataFlow = compose(handleReplaceGeneralOpenCloseBlock, handleBOCDelimiters);
  const preprocessData = preprocessDataFlow(liquid);
  return handleBOCDelimitersPostprocess(handleArrayFieldInShopifyTag_({ liquid: preprocessData, settings, variant }));
};
