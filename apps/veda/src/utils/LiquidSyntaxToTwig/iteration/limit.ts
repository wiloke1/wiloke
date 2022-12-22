import { i18n } from 'translation';
import { LiquidSyntaxToTwigError } from '../Error';
import { getBOCsBetweenSomething } from '../utils/getBOCsBetweenSomething';
import { toString } from '../utils/toString';

/**
 * TODO: Không dám chắc toàn bộ trường hợp nested sẽ đúng
 * @link https://shopify.github.io/liquid/tags/iteration/
 @requires Với liquid đầu vào các vòng for: {% for ... %} bắt buộc phải nằm trên 1 dòng mới có thể regex được
 @example
  Input:
  {% for item in array limit: 2 %}
    {{ item }}
  {% endfor %}

  {% for item in array limit: variableName %}
    {{ item }}
  {% endfor %}

  {% for item in array limit: variableObject.key %}
    {{ item }}
  {% endfor %}
  Output:
  {% for item in array | slice(0, 2) %}
    {{ item }}
  {% endfor %}

  {% for item in array | slice(0, variableName) %}
    {{ item }}
  {% endfor %}

  {% for item in array | slice(0, variableObject.key) %}
    {{ item }}
  {% endfor %}
 */
export const limit = (liquid: string) => {
  const START_BOC = new RegExp(/{%\s*for\s+.*\s+in\s+.*\s*%}/);
  const END_BOC = new RegExp(/{%\s*endfor\s*%}/);
  try {
    // @tuong -> có thể nested -> CÓ LẼ có thể xử lí những khối to nhất để tối ưu performance hơn
    let BOCs = getBOCsBetweenSomething({ liquid, startBOC: START_BOC, endBOC: END_BOC });
    let _liquid = liquid;
    while (!!BOCs.length) {
      const BOC = BOCs.shift() as string;
      let _BOC = BOC;

      /**
       * @tuong ->
       * Xét trường hợp BOCs có 2 đoạn code giống y hệt nhau -> Khi đó "BOCs = BOCs.map(item => item.replaceAll(BOC, _BOC));" phía dưới sẽ ra kết quả không mong muốn dẫn đến việc xử lí sai ở bước tiếp theo của vòng lặp
       * Nên khi loop qua phần tử giống y hệt phần tử đã từng xét trước đó sẽ bỏ qua bước lặp này
       * NOTE: "BOCs = BOCs.map(item => item.replaceAll(BOC, _BOC));" được sử dụng ở nhiều file "case_when, unless, limit, offset, reversed, comment, liquid, paginate"
       * TODO: Không dám chắc toàn bộ trường hợp nested sẽ đúng
       */
      if (!/^({%\s*for).*\slimit/gm.test(_BOC)) {
        continue;
      }

      // Xử lí để {% for ... } và {% endfor %} k nằm trên cùng 1 dòng để có thể regex
      _BOC = BOC.replace(/%}/gm, '%}\n').replace(/{%\s*endfor\s*%}/gm, '\n{% endfor %}');
      // Lấy ra dòng code {% for ... %}
      _BOC = _BOC.replace(/{%\s*for.*%}/g, forBlock => {
        return (
          forBlock
            // Xử lí mọi limit: limitValue thành limit:limitValue để dễ regex
            .replace(/limit:\s/g, 'limit:')
            // Biến mọi khoảng trắng thành dấu xuống dòng (vì những tham số truyền vào biến đc sử dụng ở vòng for sẽ tách ra bởi dấu cách nên dùng cách này có thể tách ra đc các tham số đc áp dụng cho biến - cái mà đc sử dụng tại vòng for)
            .replace(/\s/g, '\n')
            // Lấy ra mệnh đề chứa limit và thay thế thành filter "slice" của twig
            .replace(/limit:.*/g, limitClause => {
              const [, limit] = limitClause.split(':').map(item => item.trim());
              if (limit !== undefined) {
                return `| slice(0, ${limit})`;
              }
              throw new LiquidSyntaxToTwigError(i18n.t('twig_error.iteration.limit', { error_signal: toString(BOC) }));
            })
            // Trả dấu xuống dòng thành dấu cách để quay về trạng thái ban đầu
            .replace(/\n/g, ' ')
        );
      });
      // Xoá "\n" được thêm vào để regex
      _BOC = _BOC.replace(/%}\n/g, '%}').replace(/\n{% endfor %}/g, '{% endfor %}');
      // .replaceAll thay vì .replace để replace hết các BOC giống nhau luôn
      _liquid = _liquid.replaceAll(BOC, _BOC);
      BOCs = BOCs.map(item => item.replaceAll(BOC, _BOC));
    }
    return _liquid;
  } catch (err) {
    if (err instanceof LiquidSyntaxToTwigError) {
      throw err;
    }
    throw new LiquidSyntaxToTwigError(i18n.t('twig_error.iteration.limit', { error_signal: toString(err) }));
  }
};
