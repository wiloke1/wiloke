import { getJs } from 'generate/utils/generateHelpers';
import useDelay from 'hooks/useDelay';
import { atomic } from 'mota-css';
import { useEffect, useRef, useState } from 'react';
import { PageSection } from 'types/Sections';
import { TIME_RERENDER } from 'utils/constants/constants';
import loadScript from 'utils/functions/loadScript';
import { pmChildren } from 'utils/functions/postMessage';
import { getUndoRedoForReduxOfBuilderPage } from 'utils/getUndoRedoForReduxOfBuilderPage';
import { PostMessageOff } from 'wiloke-react-core/utils';

// const getRegExpCoreContainerClassName = () => {
//   return new RegExp(
//     Object.values(globalFunctionInfo)
//       .map(item => item.containerClassName)
//       .join('|'),
//     'g',
//   );
// };

interface UseJs {
  section: PageSection;
  codeVisible: boolean;
  elementAdded: boolean;
  renderHtmlStatusIsRendered: boolean;
  onLoad: () => void;
}

const timeoutIds = new Map<string, number>();
const THRESHOLD = 500;

const useJs = ({ section, codeVisible, renderHtmlStatusIsRendered, onLoad }: UseJs) => {
  const { id, data } = section;
  const { liquid, js: jsState = '', jsHook = '', settings } = data;

  const vedaMoneyFormat = `if (!document.querySelector('.veda-money-format')) {
    document.head.insertAdjacentHTML('afterbegin', window.Twig.twig({ data: '<script type="application/json" class="veda-money-format">{{ 100 | money }}</script>' }).render());
  }`;

  const js = `
    ${vedaMoneyFormat}
    function vedaHooks() {
      if (builderMode && window.location.pathname !== '/preview') {
        ${jsHook}
      }
    }
    vedaHooks();
    ${jsState}
  `;

  const [rerender, setRerender] = useState(false);
  const [needRender, setNeedRender] = useState(false);

  const [delayDebounce, cancelDebounce] = useDelay();
  const [delay, cancel] = useDelay();

  const needLoadScript = useRef<boolean>(false);

  const mounted = useRef(false);

  const pmChildrenOff = useRef<PostMessageOff | undefined>();

  const prevJs = useRef<string | null>(null);
  const prevLiquid = useRef<string | null>(null);
  const prevCodeVisible = useRef<boolean | null>(null);

  const handleLoadScript = () => {
    /**
     * NOTE @tuong -> Tại sao lại bỏ cách check cũ và dùng "setTimeout"
      - Xét bài toán có ngữ cảnh như sau:
        + 2 section hiển thị list sản phẩm của 1 collection shopify
        + 1 addon có js
      - Cách cũ đang check "nếu addon được render là addon cuối cùng của forloop" hoặc "nằm ngoài forloop" thì sẽ được mount js
        + Với ngữ cảnh trên thì có thể có >= 2 vòng forloop -> JS được mount >= 2 lần -> SAI
        + Tiếp tục xét bài toán 1 addon được đặt vị trí 2 lần trên cùng 1 section. Lần 1 add vào vòng forloop, lần 2 add ngoài vòng forloop -> Với cách check cũ thì js sẽ được mount tới 2 lần

      => Tạm thời cheat bằng cách "setTimeout"
     */
    clearTimeout(timeoutIds.get(id));
    const timeoutId = window.setTimeout(() => {
      const content = getJs(id, js, true);
      onLoad();
      loadScript({ content, id: `js_${id}`, el: document.body as HTMLElement });
      atomic.find(content);
      clearTimeout(timeoutIds.get(id));
    }, THRESHOLD);
    timeoutIds.set(id, timeoutId);
  };

  useEffect(() => {
    /**
     * Câu 1: Tại sao lại cần needLoadScript
     * Trả lời @tuong:
     * Xét trường hợp page có 2 section trong đó: 1 section có nút toggle dark light, 1 section có swiper
     * "htmlReactParseOptions" tại "LiquidComponent.tsx" luôn luôn chạy lại -> từ đó dẫn đến việc "renderHtmlStatusIsRendered" luôn luôn thay đổi nếu section có sự thay đổi (do đang đang .map từ "sections" trong redux) ra -> js của nút toggle dark light được chèn lại nếu có sự update ở section swiper -> dẫn đến việc toggle dark light sai (2n function toggle được chạy -> giữ nguyên trạng thái)
     * Việc check để ngăn "htmlReactParseOptions" không chạy lại là điều không thể -> tạo 1 biến như này
     *
     * Câu 2: Tại sao lại xét true tại useEffect này
     * Trả lời @tuong:
     * Các section được rerender lại bởi sự "toggle của state "rerender" ở trên (xem tại file "LiquidComponent.tsx")" -> section được rerender đồng nghĩa với việc js cần được load lại nên CHỈ CÓ THỂ xét needLoadScript tại đây
     */
    if (!rerender && mounted.current) {
      needLoadScript.current = true;
    }
  }, [rerender]);

  useEffect(() => {
    /**
     * Câu 1: Tại sao lại cần renderHtmlStatusIsRendered
     * Trả lời @tuong:
     * Check thêm renderHtmlStatusIsRendered để cho trường hợp section có data shopify hoặc render nặng bị disable trước đó -> enable lên -> JS sẽ chạy xong trước khi html được render ra -> SAI -> Phải check thêm renderHtmlStatusIsRendered để đảm bảo html đã được render
     * Cụ thể sẽ như sau: needRerender = true -> rerender lúc này sẽ toggle true false để force rerender section -> Lúc này giá trị state "rerender" cuối cùng sẽ là false và js sẽ chưa được load vì lí do đã nêu trên -> Lúc này renderHtmlStatusIsRendered sẽ thay đổi và khi renderHtmlStatusIsRendered = true (tức html đã được render ra) thì sẽ tiến hành load js -> Lúc này rerender vẫn = false = trạng thái trước đó nên section sẽ không bị rerender lại -> Thoả mãn bài toán
     */
    if (needLoadScript.current && mounted.current && renderHtmlStatusIsRendered) {
      handleLoadScript();
      needLoadScript.current = false;
    }
    if (!needLoadScript.current && mounted.current && renderHtmlStatusIsRendered) {
      onLoad();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [renderHtmlStatusIsRendered]);

  useEffect(() => {
    if (needRender) {
      const handleAsync = async () => {
        cancelDebounce();
        await delayDebounce(TIME_RERENDER);
        setRerender(true);
        await delay();
        setRerender(false);
        setNeedRender(false);
      };
      handleAsync();
    }
    return () => {
      cancelDebounce();
      cancel();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [needRender]);

  useEffect(() => {
    /** @tuong -> "@rerender" -> Xem tại "postMessage.ts" */
    pmChildrenOff.current = pmChildren.on('@rerender', ({ sectionId }) => {
      if ((typeof sectionId === 'string' && sectionId === id) || sectionId.includes(id)) {
        setNeedRender(true);
      }
    });
    return () => {
      pmChildrenOff.current?.();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    /** @tuong -> Tại thời điểm comment này được viết ngữ cảnh đang như sau:
    * Trường hợp "Edit Code"
      - 4 Trạng thái:
        1. "Đang edit" -> Không phải nguyên nhân gây nên "sự rerender của section" -> Không cần quan tâm
        2. "Preview" -> Có thể là 1 trong những nguyên nhân gây nên "sự rerender của section" -> Lúc này dữ liệu "liquid", "js" mới sẽ được apply vào section -> "section" sẽ rerender nếu có sự thay đổi của "2 Thứ cần quan tâm"
        3. "Save code" -> Có thể là 1 trong những nguyên nhân gây nên "sự rerender của section" -> Lúc này dữ liệu "liquid", "js" mới sẽ được apply vào section -> "section" sẽ rerender nếu có sự thay đổi của "2 Thứ cần quan tâm"
        4. "Cancel" -> Là 1 trong những nguyên nhân gây nên "sự rerender của section" -> Lúc này tại "LiquidComponent.tsx" sẽ thêm lại các attribute vào html
      - 2 Thứ cần quan tâm:
        1. "Liquid" (là 1 trong những nguyên nhân gây nên "sự rerender của section")
        2. "JS" (phụ thuộc vào sự rerender của "section")
      - postMessage nhận kết quả của "@rerender" trước "@sections" -> Bắt buộc phải check "prevJs", "prevLiquid", ...
      - undo redo có 2 trường hợp:
        1. Chỉ có "settings" thay đổi, "liquid" và "js" vẫn giữ nguyên -> Cần check "postMesage" được bắn do event "undo redo" hay không
        2. Nếu có sự thay đổi "liquid" hoặc "js" hoặc cả 2 thì tự động chạy lại r
     */
    if (
      (prevJs.current !== null && js !== prevJs.current) ||
      (prevLiquid.current !== null && liquid !== prevLiquid.current) ||
      (prevCodeVisible.current !== null && codeVisible !== prevCodeVisible.current) ||
      getUndoRedoForReduxOfBuilderPage().IS_UNDO_REDO // @tuong -> Có thể check thêm điều kiện trong "settings" có "forceRender" để tránh rerender
    ) {
      setNeedRender(true);
      prevJs.current = js;
      prevLiquid.current = liquid;
      prevCodeVisible.current = codeVisible;
    }
  }, [js, liquid, codeVisible, settings]);

  useEffect(() => {
    if (!renderHtmlStatusIsRendered) {
      return;
    }
    if (!mounted.current) {
      handleLoadScript();
      mounted.current = true;
      prevJs.current = js;
      prevLiquid.current = liquid;
      prevCodeVisible.current = codeVisible;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [renderHtmlStatusIsRendered]);

  return rerender;
};

export default useJs;
