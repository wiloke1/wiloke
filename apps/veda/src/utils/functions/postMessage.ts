import { AddonPositionState } from 'containers/BuilderPage/store/addonPosition/slice';
import { SettingsHooksData } from 'containers/IframePage/components/SettingsHooks';
import { AddElementInput } from 'store/actions/actionPages';
import { Page } from 'types/Page';
import { SectionSettingType } from 'types/Schema';
import { PageSectionType } from 'types/Sections';
import { createPostMessage } from 'wiloke-react-core/utils';

export interface ParentEmitMessage {
  /** Khi bấm vào nút Edit code thì gửi sectionId sang cho iframe */
  '@leftBarSection/editCode': { sectionId: string };
  /** Khi bấm vào nút Delete thì gửi sectionId sang cho iframe */
  '@section/delete': { sectionId: string };
  /** Khi section được chọn để sửa thì cũng gửi sectionId sang cho iframe */
  '@section/sectionIdActive': string;
  /** Khi bấm vào blocks là object | array tại sidebar fields */
  '@component/componentNameActive': {
    /** Id của section */
    sectionId: string;
    /** Trường name của blocks */
    componentName: string;
    /** Xác định là active boolean */
    value?: boolean;
  };
  /** Khi hover vào blocks field thì gửi sectionId và name của blocks sang cho iframe */
  '@component/hoverComponent': {
    sectionId: string;
    name: string;
  };
  /** Khi hover vào thành phần con của blocks array thì gửi sectionId và index của item trong array sang iframe */
  '@component/hoverArrayIndex': {
    sectionId: string;
    index: number;
    name: string;
  };
  /** Khi click vào thành phần con của blocks array thì gửi sectionId và index của item trong array sang iframe */
  '@component/clickArrayIndex': {
    sectionId: string;
    index: number;
    name: string;
  };
  /** Khi bấm vào nút 3 chấm ở section sidebar thì gửi sectionId sang cho iframe */
  '@section/dropdownOpen': {
    sectionId: string;
  };
  '@addonsPositionStart': AddonPositionState;
  /* Bắn sang sectionId mục đích re-render lại cả section */
  '@rerender': {
    /**
     * @tuong -> Các trường hợp bắt buộc phải bắn sang "@rerender"
      1. Thay đổi số lượng item trong array
      2. Các field "forceRender = true" -> Xét bài toán 1 button có js toggle dark light và button đó có settings là "variant" -> Nếu thay đổi variant DOM mới được tạo ra nhưng JS lại không được tạo lại -> JS không có tác dụng -> "forceRerender" sinh ra để khắc phục
      3. Đặt vị trí "addon" -> Khi đặt vị trí "addon" -> Đoạn code của "addon" sẽ được thêm vào liquid -> Các DOM được sinh ra sau đoạn "code của addon" được chèn vào sẽ rerender -> DOM mới được tạo ra nhưng JS không được tạo lại -> JS không có tác dụng
      4. Tương tự (3) với bài toán xoá addon
      5. Undo Redo
      6. Update JS
      7. Chắc chắn là chưa thể bao hết các trường hợp

      Cách làm hiện tại: Bằng cách chèn 1 thẻ fake vào cuối mỗi "section" và lắng nghe MutationObserver -> Cứ bất kì khi nào thẻ fake đó được update sẽ cần chạy lại js -> Bằng cách này ta có thể khắc phục đa số các trường hợp DOM bị thêm vào hoặc xoá đi (bởi code liquid, addon nằm trong item được render bởi 1 settings array, ...) -> DOM bị update index -> Chỉ cần bắn postMessage này bằng tay với những trường hợp html không bị thay đổi index như "Update settings" và "Update js", "Duplicate array"

      * DOM được xoá -> Không cần quân tâm vì nó vẫn sẽ chạy đúng
      * DOM được thêm -> Cần tạo DOM mới và js mới
      * DOM được update mà DOM đó có js thì cần quan tâm việc tạo lại DOM mới và js mới
     */
    sectionId: string | string[];
    action: string;
  };
  /** Sử dụng postmessage này tại method checkForBuilder AnimateScroll */
  '@animate': undefined;
  /** Chụp ảnh */
  '@screenshot/request': {
    uniqId: string; // Trường hợp theme là nhiều page -> cần phân biệt postMessage đó chịu trách nhiệm xuất kết quả page nào
  };
  '@atomicCss/request': {
    uniqId: string; // Trường hợp theme là nhiều page -> cần phân biệt postMessage đó chịu trách nhiệm xuất kết quả page nào
  };
  /** Check khi iframe thực sự đã load xong */
  '@PostmessageOfIframeReady': undefined;
  '@AppState': AppState;
}

export interface ParentOnMessage {
  /** Check khi iframe thực sự đã load xong */
  '@PostmessageOfIframeReady': undefined;
  /** Nhận sectionId và addon từ iframe khi bấm vào section */
  '@section/sectionIdActive': {
    id: string;
    isAddons: boolean;
  };
  /** Nhận thông tin từ iframe khi bấm vào component trong section */
  '@component/componentNameActive': {
    /** Id của section */
    sectionId: string;
    /** Trường name của blocks */
    componentName: string;
    /** Các kiểu của trường dữ liệu để giúp ta xác định xem thành phần nào để xử lý */
    settingType?: SectionSettingType;
    /** Trạng thái mở đóng boolean */
    value?: boolean;
  };
  /** Nhận thông tin từ iframe sang trước khi component được active để xử lý trước */
  '@component/beforeComponentNameActive': boolean;
  /** Nhận index của blocks array người dùng bấm vào các item tại section */
  '@component/componentArrIndexActive': {
    index: number;
  };
  /** Nhận sectionId khi bấm vào nút Duplicate tại section toolbar */
  '@component/duplicate': {
    sectionId: string;
  };
  /** Nhận sectionId khi bấm vào nút Delete tại section toolbar */
  '@section/delete': {
    sectionId: string;
  };
  /** Nhận thông tin khi bấm vào nút Up | Down tại section toolbar */
  '@section/sortable': {
    /** Vị trí của section được kéo đi */
    srcIndex: number;
    /** Vị trí của section cần tới */
    desIndex: number;
    /** id fe của section */
    sectionId: string;
    /** type của section */
    sectionType?: PageSectionType;
    /** direction lúc bấm */
    direction?: 'up' | 'down';
  };
  /** Nhận vị trí khi bấm vào nút Add to top tại section toolbar */
  '@section/addToTop': {
    index: number;
    /** Kiểu của section */
    sectionType?: PageSectionType;
  };
  /** Nhận vị trí khi bấm vào nút Add to bottom tại section toolbar */
  '@section/addToBottom': {
    index: number;
    /** Kiểu của section */
    sectionType?: PageSectionType;
  };
  /** Nhận vị trí khi bấm vào component add-code tại section của iframe */
  '@section/editCode': {
    id: string;
  };
  /**
   * TODO: Cần làm sau khi release v1
   * Nhận thông tin như sectionId, liquid, scss... khi bấm OK tại ModalAddElement tại section của iframe */
  '@component/addElement': AddElementInput;
  /** Nhận thông tin khi bấm vào nút add-element ở section của iframe */
  '@component/openModalAddElement': {
    sectionId: string;
    elementIndex: number;
  };
  /** Nhận thông tin đổi theme giúp hiển thị phần trợ giúp màu sắc ở mục edit code */
  '@themeDark': boolean;
  '@addAddonsPosition': {
    insert: 'before' | 'after';
    openTag: string;
    tagName: string;
    sectionId: string;
    addonsSectionId: string;
    indexBOC: number;
    hasStyleOrder: boolean;
  };
  '@iframeCache/twigLoaded': { sectionId: string };
  '@iframeCache/scss': {
    key: string;
    value: string;
  };
  '@previewLoaded': undefined;
  '@iframeTwigLoading': boolean;
  /** Chụp ảnh */
  '@screenshot/fulfill': {
    image: Exclude<Page['image'], undefined>;
    uniqId: string; // Trường hợp theme là nhiều page -> cần phân biệt postMessage đó chịu trách nhiệm xuất kết quả page nào
  };
  '@atomicCss/fulfill': {
    atomicCss: string;
    uniqId: string; // Trường hợp theme là nhiều page -> cần phân biệt postMessage đó chịu trách nhiệm xuất kết quả page nào
  };
  '@settingsHooks': SettingsHooksData;
  '@redirectToHooks': string;
}

/** Ngược lại của ParentOnMessage */
export interface ChildrenEmitMessage extends ParentOnMessage {}

/** Ngược lại của ParentEmitMessage */
export interface ChildrenOnMessage extends ParentEmitMessage {}

export const pmPopup = createPostMessage<ParentEmitMessage, ParentOnMessage>({
  is: 'parent',
});

export const pmParent = createPostMessage<ParentEmitMessage, ParentOnMessage>({
  is: 'parent',
  iframeSelector: '#iframe-content',
  url: '*',
});

export const pmChildren = createPostMessage<ChildrenEmitMessage, ChildrenOnMessage>({
  is: 'children',
  url: '*',
});

export interface LandingEmitMessage {
  '@landing/plan/success': undefined;
  '@landing/plan/failure': undefined;
}

export interface LandingOnMessage {
  '@landing/plan/request': {
    handle: string;
    type: 'monthly' | 'yearly';
  };
}

export const pmLanding = createPostMessage<LandingEmitMessage, LandingOnMessage>({
  is: 'parent',
  iframeSelector: '#iframe-landing',
  url: '*',
});
