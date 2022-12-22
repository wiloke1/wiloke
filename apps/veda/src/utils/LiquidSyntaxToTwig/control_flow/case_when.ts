import { i18n } from 'translation';
import { LiquidSyntaxToTwigError } from '../Error';
import { getBOCsBetweenSomething } from '../utils/getBOCsBetweenSomething';
import { getMatches } from '../utils/getMatches';
import { toString } from '../utils/toString';

// window.Twig.extend(Twig => {
//   Twig.exports.extendTag({
//     type: 'case',
//     regex: /^case\s+(.+)$/,
//     next: ['endcase'],
//     open: true,
//     compile: function(token: any) {
//       return token;
//     },
//     parse: function() {
//       return {
//         output: `<span style='color: red; font-size: 18px'>${i18n.t('twig_error.control_flow.case_when')}</span>`,
//         chain: false
//       };
//     },
//   });

//   Twig.exports.extendTag({
//     type: 'endcase',
//     regex: /^endcase$/,
//     next: [],
//     open: false,
//   });
// });

/**
 * TODO: Chưa test được tất cả các trường họp xuống dòng linh tinh, những thứ không bình thường như {% case abc = 123 %} thì có lẽ là không thể chạy đc, ...
 * @link https://shopify.github.io/liquid/tags/control-flow/
 * @example
 Input:
 {% case handle %}
    {% when "cake" %}
      This is a cake
    {% when "cookie", "biscuit" %}
      This is a cookie
    {% else %}
      This is not a cake nor a cookie
  {% endcase %}

  Output:
  {% if handle == "cake" %}
    This is a cake
  {% elseif handle == "cookie" or handle == "biscuit" %}
    This is a cookie
  {% else %}
    This is not a cake nor a cookie
  {% endif %}

 * @example
 Input:
 {% case handle %}
    {% when "cake" %}
      This is a cake
    {% when "cookie" %}
      This is a cookie
    {% else %}
      This is not a cake nor a cookie
  {% endcase %}

  Output:
  {% if handle == "cake" %}
    This is a cake
  {% elseif handle == "cookie" %}
    This is a cookie
  {% else %}
    This is not a cake nor a cookie
  {% endif %}
 */

export const case_when = (liquid: string) => {
  try {
    let _liquid = liquid;
    // @tuong -> cần xử lí nested nên phải bắt đầu từ cái nhỏ nhất trước vì mỗi case_when cần 1 thứ là "variable clause và when clause" -> r cũng cần replace những khối con trong những BOCs to chứa khối con đó để có thể chạy đúng khi loop đến những BOCs to hơn
    let BOCs = getBOCsBetweenSomething({ liquid, startBOC: new RegExp(/{%\s*case/), endBOC: new RegExp(/{%\s*endcase\s*%}/) });
    while (!!BOCs.length) {
      const BOC = BOCs.shift() as string;
      try {
        // Xử lí xuống dòng để có thể regex
        let _BOC = BOC.replace(/%}/gm, '%}\n').replace(/{%\s*endcase\s*%}/gm, '\n{% endcase %}');
        // Lấy ra dòng code {% case ... %}
        // NOTE: @tuong -> Tại sao lại chỉ lấy 1 phần tử trong "getMatches" -> Vì _BOC chỉ có duy nhất 1 mệnh đề nằm trong "new RegExp"
        const [line_of_code_start_case] = getMatches(_BOC, new RegExp(/{%\s*case.*%}/g));
        /**
         * @tuong ->
         * Xét trường hợp BOCs có 2 đoạn code giống y hệt nhau -> Khi đó "BOCs = BOCs.map(item => item.replaceAll(BOC, _BOC));" phía dưới sẽ ra kết quả không mong muốn dẫn đến việc xử lí sai ở bước tiếp theo của vòng lặp
         * Check "if" và không throw lỗi trong "else" cho trường hợp nếu tồn tại nhiều hơn 2 BOC giống y hệt nhau trong BOCs -> "BOCs = BOCs.map(item => item.replaceAll(BOC, _BOC))" sẽ thay thế mất những BOC bị trùng đằng sau -> "line_of_code_start_case" những thằng trùng đằng sau sẽ là undefined
         * NOTE: "BOCs = BOCs.map(item => item.replaceAll(BOC, _BOC));" được sử dụng ở nhiều file "case_when, unless, limit, offset, reversed, comment, liquid, paginate"
         */
        if (line_of_code_start_case) {
          // Xoá "{% case" và "%}" để lấy ra đoạn code chứa tên biến được sử dụng
          const variableClause = line_of_code_start_case
            .replace(/{%\s*case/, '')
            .replace(/%}/, '')
            .trim();
          // Lấy ra tất cả dòng code {% when ...%}
          const whenClauses = getMatches(_BOC, new RegExp(/{%\s*when.*%}/g));
          whenClauses.forEach((whenClause, index) => {
            if (whenClause) {
              // Pagefly có viết: {% when 'external_video' or 'video' %} -> Có thể regex nhưng phòng còn nhiều trường hợp khác nữa (ví dụ "or not", "and", ... shopify vẫn có thể lưu được nhưng chỉ là chạy linh tinh thôi) -> Thả lỗi và yêu cầu chỉ ngăn nhau bởi dấu ","
              if (/\sor\s/g.test(whenClause)) {
                throw new LiquidSyntaxToTwigError(
                  i18n.t('twig_error.control_flow.case_when.or_in_when_clause', { error_signal: toString(whenClause) }),
                );
              }
              // Xoá "{% when" và "%}" để lấy ra đoạn code chứa các giá trị của biến được sử dụng để so sánh
              const values = whenClause
                .replace(/{%\s*when/, '')
                .replace(/%}/, '')
                .replace(/\s/g, '')
                .split(',')
                .map(item => item.trim());
              // Vì Twig không có "case when" nên chuyển thành các mệnh đề "if elseif else"
              _BOC = _BOC.replace(whenClause, () => {
                // Tạo mệnh đề so sánh ở twig
                const _finalConditionClause = values.map(value => `${variableClause} == ${value}`).join(' or ');
                if (index === 0) {
                  return `{% if ${_finalConditionClause} %}`;
                }
                return `{% elseif ${_finalConditionClause} %}`;
              });
            }
          });
          // Xoá "\n" được thêm vào để regex
          _BOC = _BOC.replace(/%}\n/g, '%}').replace(/\n{% endcase %}/g, '{% endcase %}');
          // Xoá dòng code {% case ... %} và chuyển "endcase" thành endif
          _BOC = _BOC.replace(line_of_code_start_case, '').replace(/{%\s*endcase\s*%}/gm, '{% endif %}');
          // .replaceAll thay vì .replace để replace hết các BOC giống nhau luôn
          _liquid = _liquid.replaceAll(BOC, _BOC);
          BOCs = BOCs.map(item => item.replaceAll(BOC, _BOC));
        }
      } catch (err) {
        // Có 1 lỗi bắt buộc phải throw bên trong block try -> Phải throw chính xác lỗi đó
        if (err instanceof LiquidSyntaxToTwigError) {
          throw err;
        }
        throw new LiquidSyntaxToTwigError(i18n.t('twig_error.control_flow.case_when.example', { error_signal: toString(BOC) }));
      }
    }
    return _liquid;
  } catch (err) {
    // Có 1 lỗi bắt buộc phải throw bên trong block try -> Phải throw chính xác lỗi đó
    if (err instanceof LiquidSyntaxToTwigError) {
      throw err;
    }
    throw new LiquidSyntaxToTwigError(i18n.t('twig_error.control_flow.case_when.example', { error_signal: toString(err) }));
  }
};
