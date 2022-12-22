import { langOptions } from 'translation/translation';
import { CssColorVariable, CssFontVariable } from 'types/PresetStyles';
import { ThemeAddon } from './Addons';
import { Page, PageId } from './Page';
import { PageSection } from './Sections';

export interface File {
  /** Nội dung file
   * bao gồm những đoạn string làm dấu hiệu để BE regex
   * Câu 1: Tại sao không thêm đánh dấu ở service mà lại đánh dấu tại các hàm generate
   * Trả lời @tuong: TÁCH ĐƯỢC NHƯNG KHÔNG NÊN
        1. Các api có những tham số truyền vào khác nhau và mỗi nghiệp vụ đang có 1 hàm để xử lí lấy ra parameters (handleSaveInBuilderPage, ...) -> Cần phải viết ra 1 hàm utils để xử lí việc "làm dấu" và gọi trong các hàm "xử lí lấy ra parameters" -> Việc này không làm cho code trở nên tường minh hơn bao nhiêu, thậm chí việc gọi đi gọi lại vẫn có thể tái diễn - ví dụ file "handleUpdatePageSettingInDashboard.ts" cần xử lí "lấy ra tất cả các file" rồi tiếp tục "xử lí việc làm dấu" -> việc transform này là không quá cần thiết
        2. "Hợp tình hợp lí với ngữ cảnh hiện tại":
          - Đầu ra của builder có file js là js của tất cả sections gộp làm 1 file. Việc đánh dấu bắt đầu kết thúc 1 file là việc của việc trích xuất file
          - Ví dụ file js được xuất ra bao gồm tất cả js của các sections trong pages -> Trong trường hợp cần phân chia js các section làm từng phần riêng thì từ cả 1 cục lớn (không dấu hiệu nhận biết bắt đầu kết thúc) không thể nào tách đc
   */
  content: string;
  /** Type của file
   * Câu 1: Tại sao lại đặt type như kia và tại sao lại nhiều file lại có nhiều type đến vậy ?
   * Trả lời @tuong: Do nghiệp vụ không nằm hoàn toàn bên BE (tức bắn 1 cục lên và BE xử lí) -> tách nhỏ ra từng phần riêng biệt để tiện xử lí và đặt tên để thể hiện nghiệp vụ hiện tại đang theo (1 phần cũng không biết viết Tiếng Anh như nào)

   * Câu 2: Tại sao lại tách nhỏ ra từng phần riêng biệt
   * Trả lời @tuong: ban đầu từng phần khá lớn và sai nghiệp vụ, Ví dụ: tất cả js của page - bao gồm globalJs của page, js sections, js preloader, globalJs của theme,... - được gộp vào 1 file luôn để không phải thêm 1 bước transform dữ liệu để đẩy lên BE -> Song gặp thay đổi và bug nghiệp vụ. Cụ thể ở ví dụ trên, file js được đẩy lên thừa - js preloader và globalJs. GlobalJs và preloader phải là 1 file được import vào theme.*.liquid để khi có thay đổi các page sẽ được apply chứ không phải của 1 page - Lúc đó việc thay đổi lại khá loạn -> Chia ra để tiện cho thay đổi tuy dài (nhiều chỗ lặp đi lặp lại) nhưng tường minh
   */
  type:
    | 'liquid của page - bao gồm liquid của section bình thường[đã thế megamenu tag placeholder]'
    | 'liquid của các section thuộc header - bao gồm liquid của section bình thường[đã thế megamenu tag placeholder] (cái này được ghi vào file header.liquid cái mà được render ở theme.liquid)'
    | 'liquid của các section thuộc footer - bao gồm liquid của mega menu | liquid của section bình thường[đã thế megamenu tag placeholder] (cái này được ghi vào file footer.liquid cái mà được render ở theme.liquid)'
    | 'liquid của preloader - cái này được ghi vào theme.*.liquid'
    | 'globalJs của page - bảo gồm globalJs và lazyLoadJs của page'
    | 'js của page - bao gồm js của các section'
    | 'globalJs của theme - bao gồm globalJs của theme'
    | 'js của các section header'
    | 'js của các section footer'
    | 'js của preloader'
    | 'globalCss của page - chỉ bảo gồm globalCss của page'
    | 'css của page - bao gồm css của các section "thuộc page", css inline của các sections "thuộc page", không bao gồm atomic css của các sections "thuộc page"'
    | 'globalCss của theme - bao gồm layout, colors, fonts, scss của theme'
    | 'css của các sections thuộc header - chỉ gồm css của các sections thuộc header và css inline của các sections thuộc header, không bao gồm atomic css'
    | 'css của các sections thuộc footer - chỉ gồm css của các sections thuộc footer và css inline của các sections thuộc footer, không bao gồm atomic css'
    | 'css của preloader'
    | 'vendors js tổng của page'
    | 'vendors js tổng của theme'
    | 'vendors css tổng của page'
    | 'vendors css tổng của theme'
    /**
     * NOTE: @tuong ->
     * Câu hỏi 1: Vì sao lại có "liquid, css, js của 1 addon"
     * Trả lời: Xét bài toán như sau
          - Giả dụ ta có 2 page A, B và cả 2 page này đều sử dụng addon "Gallery Instagram"
          - Vào một ngày đẹp trời ta sửa page A và XOÁ LUÔN ADDON (XOÁ LUÔN chứ không phải là xoá vị trí tại được thêm addon tại page đó) - hoặc sửa code addon đó
          - Khi đó, theo lí mà nói thì page B cũng cần phải được xoá addon đó đi - hoặc update code addon đó
          => Khi đó có 2 giải pháp như sau:

          Giải pháp 1: Đọc toàn bộ file liquid trên shopify được ghi bởi veda -> Sau đó tìm và xoá (hoặc sửa) những đoạn code liquid, css, js liên quan đến addon đã được thao tác trước đó -> Cách này khá nặng vì rate limit của shopify -> Không khả thi

          Giải pháp 2: Với mỗi addon ghi 3 file: liquid, js, css và tại những code liquid của page đẩy lên giữ nguyên đoạn đánh dấu vị trí addon để BE thế vào -> Khi đó việc update hay xoá addon trở nên dễ dàng hơn vì chỉ cần thao tác với 3 file của addon đó sinh ra. NOTE: Lưu ý giải pháp này bị 1 lỗi là nếu xoá mất file liquid thì shopify sẽ hiện thông báo lỗi "File không tồn tại" ở html ngoài shop -> Đã có cách hack ẩn lỗi này như sau:
            ```
            {% capture existFile %}
              {% render 'abc.liquid' %}
            {% endcapture %}

            {% if existFile contains "Could not find asset" %}
            {% render 'abc.liquid' %}
            {% endif %}
            ```

     */
    | 'liquid của 1 addon'
    | 'js của 1 addon'
    | 'css của 1 addon';
  name: string;
  id: string;
  section: PageSection | undefined;
}

export interface CssVariables {
  /** Các màu cho theme */
  colors: CssColorVariable[];
  /** Toàn bộ fonts của theme */
  fonts: CssFontVariable[];
}

export interface Vendor {
  /** Unique id */
  id: string;
  /** Css của thư viện bên ngoài */
  css: string;
  /** Js của thư viện bên ngoài */
  js: string;
}

export type ThemeVendors = Vendor[];

export interface LayoutSettings {
  containerWidth: number;
  containerGap: number;
  columnGapX: number;
  columnGapY: number;
}

export interface ThemeGeneralSettings {
  /** Bật preloader */
  preloaderEnable: boolean;
  /** Chọn kiểu cho preloader */
  preloaderVariant: number;
  /** Chọn background color cho preloader */
  preloaderBackgroundColor: string;
  /** Chọn color cho preloader */
  preloaderColor: string;
  /** Chọn logo cho preloader */
  preloaderLogo: string;

  /** Chọn favicon */
  favicon: string;
  /** Tên của theme */
  label: string;
  /** ảnh preview của theme */
  featuredImage?: string;
}

type Language = typeof langOptions[number]['value'];
type FileContent = any;

export type ThemeTranslations = Record<Language, FileContent>;

export interface ThemeSettings {
  /** Tất cả các biến colors và fonts */
  cssVariables: CssVariables;
  /** Settings layout như container, column */
  layoutSettings: LayoutSettings;
  /** Settings chung của theme */
  generalSettings: ThemeGeneralSettings;
  /** Translation của theme */
  globalTranslations: ThemeTranslations;
}

export interface PageGeneralSettings {
  /** Tiêu đề của page */
  label: string;
  /** Bật/tắt header footer */
  headerFooterEnabled: boolean;
  /** Slug của trang */
  handle: string;
  /** Nội dung thẻ meta title */
  metaTitle: string;
  /** Nội dung thẻ meta description */
  metaDescription: string;
  /** Link ảnh khi share trên các mạng xã hội */
  socialShareImage: string;
  /** Bật lazyload cho ảnh */
  lazyload: boolean;
}

export interface PageSettings {
  /** Js + css từ nguồn bên ngoài cho page */
  vendors: Vendor[];
  globalScss: string;
  globalJs: string;
  generalSettings: PageGeneralSettings;
}

export interface PageData {
  /** Dữ liệu đẩy lên server */
  data: {
    /** Dữ liệu của page */
    page: Page;
    /** Dữ liệu của page */
    pageSettings: PageSettings;
  };
  /** Dữ liệu để ghi vào shopify bao gồm js, css, liquid của các section thuộc page (không bao gồm addon) */
  // NOTE, SUGGEST: @tuong -> DB và shopify là 2 thứ không liên quan đến nhau. Ấy vậy mà tại đây lại chứa data để thực hiện request api liên quan đến cả 2 "thứ đó" -> Điều này có thể gây confuse trong tương lai. "filesOfAddons" bị thừa ra như kia là 1 ví dụ
  files: File[];
  /** atomic css của page để ghi tạm thời cho khách preview trên shopify trước */
  atomicCss: string;
}

export type ThemeHeaderFooter = PageSection[];

export interface Theme {
  /** Dữ liệu của theme */
  themeSettings: ThemeSettings;
  /** Dữ liệu của addons */
  addons: ThemeAddon[];
  /** Dữ liệu của header */
  header?: ThemeHeaderFooter;
  /** Dữ liệu của footer */
  footer?: ThemeHeaderFooter;
  /** Id của theme */
  themeId?: string;
  /** Js + css từ nguồn bên ngoài cho theme */
  vendors: Vendor[];
  globalScss: string;
  globalJs: string;
  /** Dữ liệu để ghi vào shopify bao gồm js, css, preloader (không bao gồm addon) */
  // NOTE, SUGGEST: @tuong -> DB và shopify là 2 thứ không liên quan đến nhau. Ấy vậy mà tại đây lại chứa data để thực hiện request api liên quan đến cả 2 "thứ đó" -> Điều này có thể gây confuse trong tương lai. "filesOfAddons" bị thừa ra như kia là 1 ví dụ
  files: File[];
}

export type ResultPages = Record<PageId, PageData>;
export interface Result {
  builderType: 'theme' | 'page';
  pages: ResultPages;
  theme: Theme;
  filesOfAddons: Array<{ type: 'addon enable position' | 'addon disable position'; js: File; css: File; liquid: File; id: string }>;
}
