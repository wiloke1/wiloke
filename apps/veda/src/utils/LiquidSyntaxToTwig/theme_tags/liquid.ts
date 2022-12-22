import { i18n } from 'translation';
import { LiquidSyntaxToTwigError } from '../Error';
import { getBOCsBetweenSomething } from '../utils/getBOCsBetweenSomething';
import { toString } from '../utils/toString';

export const SHOPIFY_TAG = [
  'if',
  'elsif',
  'else',
  'endif',
  'case',
  'when',
  'endcase',
  'unless',
  'for',
  'break',
  'continue',
  'cycle',
  'tablerow',
  'comment',
  'echo',
  'include',
  'form',
  'liquid',
  'paginate',
  'raw',
  'render',
  'section',
  'style',
  'assign',
  'capture',
  'increment',
  'decrement',
];

/**
 * @link https://shopify.dev/api/liquid/tags/theme-tags#liquid
 * TODO: @tuong -> Chưa lường trước được hết các trường hợp. Đặc biệt với tag "echo"
 @example
 Input:
 {% liquid
  case section.blocks.size
  when 1
    assign column_size = ''
  when 2
    assign column_size = 'one-half'
  when 3
    assign column_size = 'one-third'
  else
    assign column_size = 'one-quarter'
  endcase
  echo column_size
  %}
  Output:
  {% case section.blocks.size %}
  {% when 1 %}
    assign column_size = ''
  {% when 2 %}
    assign column_size = 'one-half'
  {% when 3 %}
    assign column_size = 'one-third'
  {% else %}
    assign column_size = 'one-quarter'
  {% endcase %}
  {{ column_size }}
 */
export const liquid = (liquid: string) => {
  const START_BOC = new RegExp(/{%\s*liquid/);
  const END_BOC = new RegExp(/%}/);

  try {
    // theo ví dụ trên docs shopify thì {% liquid ... %} không có nested
    let BOCs = getBOCsBetweenSomething({ liquid, startBOC: START_BOC, endBOC: END_BOC, ignoreNested: true });
    let _liquid = liquid;
    while (!!BOCs.length) {
      const BOC = BOCs.shift() as string;
      const BOCForValidate = BOC.replace(/(^.|.$)/g, '');
      if (START_BOC.test(BOCForValidate)) {
        throw new LiquidSyntaxToTwigError(i18n.t('twig_error.exception_of_code_liquid.nested_liquid_tag', { error_signal: BOC }));
      }

      let _BOC = BOC;
      /**
       * @tuong ->
       * Xét trường hợp BOCs có 2 đoạn code giống y hệt nhau -> Khi đó "BOCs = BOCs.map(item => item.replaceAll(BOC, _BOC));" phía dưới sẽ ra kết quả không mong muốn dẫn đến việc xử lí sai ở bước tiếp theo của vòng lặp
       * Nên khi loop qua phần tử giống y hệt phần tử đã từng xét trước đó sẽ bỏ qua bước lặp này
       * NOTE: "BOCs = BOCs.map(item => item.replaceAll(BOC, _BOC));" được sử dụng ở nhiều file "case_when, unless, limit, offset, reversed, comment, liquid, paginate"
       */
      if (!/^({%\s*liquid)/gm.test(_BOC)) {
        continue;
      }

      // Xoá mở tag và đóng tag
      _BOC = _BOC
        .replace(/{%\s?liquid/, '')
        .replace(/%}/, '')
        .trim();
      // Chia làm từng "đoạn nhỏ" cách nhau bởi dấu " "
      const splited = _BOC
        .replace(/\s+/g, ' ')
        .split(' ')
        .map(item => item.trim());
      const clauses = [];
      let startTagIndex = 0;
      let i = 1;
      for (i; i < splited.length; i++) {
        const atomic = splited[i];
        // Nếu đoạn nhỏ hiện tại đang xét là shopify tag -> Bắt đầu 1 mệnh đề cần nhóm
        if (SHOPIFY_TAG.includes(atomic)) {
          const startTagName = splited[startTagIndex];
          // Nếu tag đó là "echo" -> và chỉ có thể echo ra giá trị biến (theo docs thực tế không biết có thể viết khác đi k) -> cần in ra
          if (startTagName === 'echo') {
            const combined = splited.slice(startTagIndex + 1, i);
            clauses.push(`{{ ${combined.join(' ')} }}`);
          }
          // Nếu thuộc những tag khác thì nó nhóm thành 1 mệnh đề hoàn chỉnh
          else {
            const combined = splited.slice(startTagIndex, i);
            clauses.push(`{% ${combined.join(' ')} %}`);
          }
          startTagIndex = i;
        }
      }
      // Xét "đoạn nhỏ" cuối cùng (vì đang làm theo kiểu tiến lên nên mệnh đề cuối cùng là chưa được nhóm hoàn chỉnh nên cần xét ngoài lề "đoạn nhỏ" cuối cùng này)
      const startTagNameOfLastAtomic = splited[startTagIndex];
      if (startTagNameOfLastAtomic === 'echo') {
        const _lastAtomic = startTagIndex === i ? [] : splited.slice(startTagIndex + 1, i);
        clauses.push(`{{ ${_lastAtomic.join(' ')} }}`);
      } else {
        const _lastAtomic = startTagIndex === i ? [splited[i]] : splited.slice(startTagIndex, i);
        clauses.push(`{% ${_lastAtomic.join(' ')} %}`);
      }
      _BOC = clauses.join('\n');
      // .replaceAll thay vì .replace để replace hết các BOC giống nhau luôn
      _liquid = _liquid.replaceAll(BOC, _BOC);
      BOCs = BOCs.map(item => item.replaceAll(BOC, _BOC));
    }
    return _liquid;
  } catch (err) {
    if (err instanceof LiquidSyntaxToTwigError) {
      throw err;
    }
    throw new LiquidSyntaxToTwigError(i18n.t('twig_error.theme_tags.liquid.example', { error_signal: toString(err) }));
  }
};
