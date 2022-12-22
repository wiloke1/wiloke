import { i18n } from 'translation';
import { LiquidSyntaxToTwigError } from '../Error';
import { getBOCsBetweenSomething } from '../utils/getBOCsBetweenSomething';
import { getMatches } from '../utils/getMatches';
import { toString } from '../utils/toString';
import { LiquidSyntaxToTwigWarning } from '../Warning';

// window.Twig.extend(Twig => {
//   Twig.exports.extendTag({
//     type: 'unless',
//     regex: /^unless\s+(.+)$/,
//     next: ['endunless'],
//     open: true,
//     compile: function(token: any) {
//       return token;
//     },
//     parse: function() {
//       throw new LiquidSyntaxToTwigError(i18n.t('twig_error.control_flow.unless'));
//     },
//   });

//   Twig.exports.extendTag({
//     type: 'endunless',
//     regex: /^endunless$/,
//     next: [],
//     open: false,
//   });
// });

/**
 * NOTE: Không đúng cho các điều kiện phức tạp nhiều "or"
 * TODO: Chưa test được tất cả các trường họp xuống dòng linh tinh, những thứ không bình thường, ...
 * @link https://shopify.github.io/liquid/tags/control-flow/
 * @warning Unless bắt buộc phải thực hiện sau "./contains.ts" để dảo "contains" -> "in"
 * @explain Unless sẽ được biến đổi về mệnh đề if (phủ định tất cả mệnh đề so sánh của unless). Song "not contains" không hề tồn tại trong liquid của shopify -> Để tránh confuse
 * @example
 Input:
  {% unless product.title == "Awesome Shoes" %}
    These shoes are not awesome.
  {% endunless %}
  {% unless product.title != "Awesome Shoes" %}
    These shoes are not awesome.
  {% endunless %}
  {% unless product.title == "Awesome Shoes" or product.title == "ABC" %}
    These shoes are not awesome.
  {% endunless %}
  {% unless product.title == "Awesome Shoes" and product.title == "ABC" %}
    These shoes are not awesome.
  {% endunless %}
  Output:
  {% if product.title != "Awesome Shoes" %}
    These shoes are not awesome.
  {% endif %}
  {% if product.title == "Awesome Shoes" %}
    These shoes are not awesome.
  {% endif %}
  {% if product.title != "Awesome Shoes" and product.title != "ABC" %}
    These shoes are not awesome.
  {% endif %}
  {% if product.title != "Awesome Shoes" or product.title != "ABC" %}
    These shoes are not awesome.
  {% endif %}
 */
export const unless = (liquid: string) => {
  try {
    let _liquid = liquid;
    // @tuong -> cần xử lí nested nên phải bắt đầu từ cái nhỏ nhất trước vì mỗi unless cần 1 thứ là "condition clause" -> r cũng cần replace những khối con trong những BOCs to chứa khối con đó để có thể chạy đúng khi loop đến những BOCs to hơn
    let BOCs = getBOCsBetweenSomething({ liquid, startBOC: new RegExp(/{%\s*unless/), endBOC: new RegExp(/{%\s*endunless\s*%}/) });
    while (!!BOCs.length) {
      const BOC = BOCs.shift() as string;
      try {
        // Xử lí xuống dòng để có thể regex
        let _BOC = BOC.replace(/%}/gm, '%}\n').replace(/{%\s*endunless\s*%}/gm, '\n{% endunless %}');
        // Lấy ra dòng code {% unless ... %}
        // NOTE: @tuong -> Tại sao lại chỉ lấy 1 phần tử trong "getMatches" -> Vì _BOC chỉ có duy nhất 1 mệnh đề nằm trong "new RegExp"
        const [line_of_code_start_unless] = getMatches(_BOC, new RegExp(/{%\s*unless.*%}/g));
        /**
         * @tuong ->
         * Xét trường hợp BOCs có 2 đoạn code giống y hệt nhau -> Khi đó "BOCs = BOCs.map(item => item.replaceAll(BOC, _BOC));" phía dưới sẽ ra kết quả không mong muốn dẫn đến việc xử lí sai ở bước tiếp theo của vòng lặp
         * Check "if" và không throw lỗi trong "else" cho trường hợp nếu tồn tại nhiều hơn 2 BOC giống y hệt nhau trong BOCs -> "BOCs = BOCs.map(item => item.replaceAll(BOC, _BOC))" sẽ thay thế mất những BOC bị trùng đằng sau -> "line_of_code_start_unless" những thằng trùng đằng sau sẽ là undefined
         * NOTE: "BOCs = BOCs.map(item => item.replaceAll(BOC, _BOC));" được sử dụng ở nhiều file "case_when, unless, limit, offset, reversed, comment, liquid, paginate"
         */
        if (line_of_code_start_unless) {
          if (/\sand\s/.test(line_of_code_start_unless) && /\sor\s/.test(line_of_code_start_unless)) {
            new LiquidSyntaxToTwigWarning(i18n.t('twig_error.control_flow.unless.warning_message', { error_signal: line_of_code_start_unless }));
          }

          // Xoá "{% unless" và "%}" để lấy ra đoạn code chứa mệnh đề so sánh
          const conditionClause = line_of_code_start_unless
            .replace(/{%\s*unless/gm, '')
            .replace(/%}/gm, '')
            .trim();

          // Cắt ra các mệnh đề so sánh thành các nguyên tử
          const atomicsConditionClause = conditionClause
            .replace(/\s(and|or)\s/g, '|||')
            .split('|||')
            .map(item => item.trim());
          // Copy line_of_code để tường minh hơn
          let _line_of_code_start_unless = line_of_code_start_unless;

          // Đảo dấu mệnh đề
          atomicsConditionClause.forEach(atomicConditionClause => {
            // Đảo dấu == và !=
            if (atomicConditionClause.includes('==') || atomicConditionClause.includes('!=')) {
              _line_of_code_start_unless = _line_of_code_start_unless.replaceAll(
                atomicConditionClause,
                atomicConditionClause.replace(/(==|!=)/gm, value => {
                  if (value === '==') {
                    return '!=';
                  }
                  if (value === '!=') {
                    return '==';
                  }
                  return '';
                }),
              );
            }
            // Đảo "in" (cái mà đã được biến đổi từ "contains") -> "not in"
            if (atomicConditionClause.includes('in')) {
              _line_of_code_start_unless = _line_of_code_start_unless.replaceAll(
                atomicConditionClause,
                atomicConditionClause.replace(/\sin\s/, ' not in '),
              );
            }
            // Đảo mệnh đề check tồn tại
            if (!atomicConditionClause.includes('==') && !atomicConditionClause.includes('!=') && !atomicConditionClause.includes('in')) {
              if (/\snot\s/g.test(atomicConditionClause)) {
                _line_of_code_start_unless = _line_of_code_start_unless.replaceAll(
                  atomicConditionClause,
                  atomicConditionClause.replace(/\snot\s/g, ''),
                );
              } else {
                _line_of_code_start_unless = _line_of_code_start_unless.replaceAll(atomicConditionClause, `not ${atomicConditionClause}`);
              }
            }
          });

          // Đảo "and" và "or"
          _line_of_code_start_unless = _line_of_code_start_unless.replace(/\s(and|or)\s/g, value => {
            if (value.includes('and')) {
              return value.replace(/and/g, 'or');
            }
            if (value.includes('or')) {
              return value.replace(/or/g, 'and');
            }
            return value;
          });

          // Xoá "\n" được thêm vào để regex
          _BOC = _BOC.replace(/%}\n/g, '%}').replace(/\n{% endunless %}/g, '{% endunless %}');

          // Biến "unless" -> "if" và "endunless" -> "endif"
          _BOC = _BOC
            .replaceAll(line_of_code_start_unless, _line_of_code_start_unless)
            .replace(/{%\s*unless/g, '{% if')
            .replace(/{%\s*endunless\s*%}/gm, '{% endif %}');

          // .replaceAll thay vì .replace để replace hết các BOC giống nhau luôn
          _liquid = _liquid.replaceAll(BOC, _BOC);
          BOCs = BOCs.map(item => item.replaceAll(BOC, _BOC));
        }
      } catch (err) {
        if (err instanceof LiquidSyntaxToTwigError) {
          throw err;
        }
        throw new LiquidSyntaxToTwigError(i18n.t('twig_error.control_flow.unless.example', { error_signal: toString(BOC) }));
      }
    }
    return _liquid;
  } catch (err) {
    if (err instanceof LiquidSyntaxToTwigError) {
      throw err;
    }
    throw new LiquidSyntaxToTwigError(i18n.t('twig_error.control_flow.unless.example', { error_signal: toString(err) }));
  }
};
