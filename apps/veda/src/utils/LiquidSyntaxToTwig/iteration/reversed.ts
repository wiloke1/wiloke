import { getBOCsBetweenSomething } from '../utils/getBOCsBetweenSomething';

/**
 * TODO: Không dám chắc toàn bộ trường hợp nested sẽ đúng
 * @link https://shopify.github.io/liquid/tags/iteration/
 @example
 Input:
 {% for item in array reversed %}
  {{ item }}
{% endfor %}
Output:
 {% for item in array reverse %}
  {{ item }}
{% endfor %}
 */
export const reversed = (liquid: string) => {
  const START_BOC = new RegExp(/{%\s*for\s+.*\s+in\s+.*\s*%}/);
  const END_BOC = new RegExp(/{%\s*endfor\s*%}/);
  // @tuong -> có thể nested -> CÓ LẼ có thể xử lí những khối to nhất để tối ưu performance hơn
  let BOCs = getBOCsBetweenSomething({ liquid, startBOC: START_BOC, endBOC: END_BOC });
  let _liquid = liquid;
  while (!!BOCs.length) {
    const BOC = BOCs.shift() as string;
    let _BOC = BOC;

    if (!/^({%\s*for).*\sreversed/gm.test(_BOC)) {
      continue;
    }

    /**
     * @tuong ->
     * Xét trường hợp BOCs có 2 đoạn code giống y hệt nhau -> Khi đó "BOCs = BOCs.map(item => item.replaceAll(BOC, _BOC));" phía dưới sẽ ra kết quả không mong muốn dẫn đến việc xử lí sai ở bước tiếp theo của vòng lặp
     * Nên khi loop qua phần tử giống y hệt phần tử đã từng xét trước đó sẽ bỏ qua bước lặp này
     * NOTE: "BOCs = BOCs.map(item => item.replaceAll(BOC, _BOC));" được sử dụng ở nhiều file "case_when, unless, limit, offset, reversed, comment, liquid, paginate"
     * TODO: Không dám chắc toàn bộ trường hợp nested sẽ đúng
     */
    _BOC = _BOC.replace(/reversed/gm, () => {
      return `| reverse`;
    });
    // .replaceAll thay vì .replace để replace hết các BOC giống nhau luôn
    _liquid = _liquid.replaceAll(BOC, _BOC);
    BOCs = BOCs.map(item => item.replaceAll(BOC, _BOC));
  }
  return _liquid;
};
