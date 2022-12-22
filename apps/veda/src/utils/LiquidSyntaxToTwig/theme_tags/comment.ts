import { i18n } from 'translation';
import { LiquidSyntaxToTwigError } from '../Error';
import { getBOCsBetweenSomething } from '../utils/getBOCsBetweenSomething';
import { toString } from '../utils/toString';

/**
 * TODO: Không chắc chắn là sẽ chính xác hoàn toàn
 * @link https://shopify.dev/api/liquid/tags/theme-tags#comment
 */
export const comment = (liquid: string) => {
  try {
    // TODO: Nested comment????
    let BOCs = getBOCsBetweenSomething({ liquid, startBOC: new RegExp(/{%\s*comment\s*%}/), endBOC: new RegExp(/{%\s*endcomment\s*%}/) });
    let _liquid = liquid;
    while (!!BOCs.length) {
      const BOC = BOCs.shift() as string;
      let _BOC = BOC;

      /**
       * @tuong ->
       * Xét trường hợp BOCs có 2 đoạn code giống y hệt nhau -> Khi đó "BOCs = BOCs.map(item => item.replaceAll(BOC, _BOC));" phía dưới sẽ ra kết quả không mong muốn dẫn đến việc xử lí sai ở bước tiếp theo của vòng lặp
       * Nên khi loop qua phần tử giống y hệt phần tử đã từng xét trước đó sẽ bỏ qua bước lặp này
       * NOTE: "BOCs = BOCs.map(item => item.replaceAll(BOC, _BOC));" được sử dụng ở nhiều file "case_when, unless, limit, offset, reversed, comment, liquid, paginate"
       */
      if (!/^({%\s*comment\s*%})/gm.test(_BOC)) {
        continue;
      }
      _BOC = BOC.replace(/{%\s*comment\s*%}/, `{#`).replace(/{%\s*endcomment\s*%}/, () => `#}`);
      // .replaceAll thay vì .replace để replace hết các BOC giống nhau luôn
      _liquid = _liquid.replaceAll(BOC, _BOC);
      BOCs = BOCs.map(item => item.replaceAll(BOC, _BOC));
    }
    return _liquid;
  } catch (err) {
    if (err instanceof LiquidSyntaxToTwigError) {
      throw err;
    }
    throw new LiquidSyntaxToTwigError(i18n.t('twig_error.theme_tags.comment.example', { error_signal: toString(err) }));
  }
};
