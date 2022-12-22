import { i18n } from 'translation';
import { at } from 'utils/at';
import strToRegexpPattern from 'utils/functions/strToRegexpPattern';
import { getBuilderPageReduxStore } from 'utils/getParentStore';
import { LiquidSyntaxToTwigError } from './Error';
import { getBOCsBetweenSomething } from './utils/getBOCsBetweenSomething';
import { getMatches } from './utils/getMatches';
import { replaceExactVariableNameInLiquidCode } from './utils/replaceExactVariableNameInLiquidCode';
import { toString } from './utils/toString';

const END_LINE = '___XUỐNG___DÒNG___';
const VARIABLE_ASSIGN_SPLITTER = ':____';
export const handleRenderTagBeforeAll = (liquid: string) => {
  const state = getBuilderPageReduxStore().getState();
  const liquidSnippets = state.global.appSettings.liquidSnippets.data;
  const START_BOC = new RegExp(/{%\s*render/);
  const END_BOC = new RegExp(/%}/);

  try {
    const BOCs = getBOCsBetweenSomething({ liquid, startBOC: START_BOC, endBOC: END_BOC, ignoreNested: true });
    let liquid_ = liquid;
    while (!!BOCs.length) {
      const BOC = BOCs.shift() as string;

      // Lên 1 dòng cho dễ xử lý
      const [renderClause, ...variableClauses] = BOC.replace(/\n/g, '')
        .replace('{%', '')
        .replace('%}', '')
        .trim()
        .split(',');
      const snippetName = at(getMatches(renderClause, /("|').*('|")/g), 0);
      const snippetName_ = snippetName?.replace(/("|')/g, '');
      const snippetCode = snippetName_ ? liquidSnippets[`${snippetName_}.liquid`] : undefined;
      if (snippetCode) {
        // TIền xử lý snippet
        let snippetCode_ = snippetCode.replace(/\n/g, END_LINE);
        // Xử lý
        variableClauses.forEach(variableClause => {
          // Phòng trường hợp value gán cho biến có chứa dấu ":"
          const variableClause_ = variableClause.replace(':', VARIABLE_ASSIGN_SPLITTER).replace(new RegExp(END_LINE, 'g'), '');
          const [variableName, variableValue] = variableClause_
            .trim()
            .split(VARIABLE_ASSIGN_SPLITTER)
            .map(item => item.trim());
          const variableName_ = strToRegexpPattern(variableName);
          snippetCode_ = snippetCode_.replace(new RegExp(`component=.${variableName_}.`, 'g'), `component='${variableValue}'`); // Gán component = tên biến truyền vào --> {% render 'section_heading' _heading: heading ==> Khi đó snippet có component="_heading" được replace thành component='heading' %}
          snippetCode_ = snippetCode_.replace(new RegExp(`({{|{%).*${variableName_}.*(%}|}})`, 'g'), value => {
            return replaceExactVariableNameInLiquidCode(value, variableName_, variableValue, true);
          });
        });

        // Hậu xử lý snippet
        snippetCode_ = snippetCode_.replace(new RegExp(END_LINE, 'g'), '\n');
        liquid_ = liquid_.replace(BOC, snippetCode_);
      } else {
        throw new LiquidSyntaxToTwigError(
          i18n.t('twig_error.theme_tags.render.not_exist', { snippet_name: toString(snippetName_), error_signal: toString(BOC) }),
        );
      }
    }
    return liquid_;
  } catch (error) {
    if (error instanceof LiquidSyntaxToTwigError) {
      throw error;
    }
    throw new LiquidSyntaxToTwigError(i18n.t('twig_error.theme_tags.render.example', { error_signal: toString(error) }));
  }
};
