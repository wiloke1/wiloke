import { PageLiquidVariable } from 'types/Page';
import { sectionConverter } from 'utils/VedaConverter/Veda/SectionConvert/SectionConvert';
import { GetAdditionalDataRelateToShopify_BEExpectResponse } from './getAdditionalDataRelateToShopify';

export type FileType = 'section' | 'vendorsCss' | 'vendorsJs' | 'css' | 'js' | 'preloader';export interface LiquidFile {
  type: Extract<FileType, 'section'>;
  id: `section_${string}`;
  name: `section_${string}`;
  content: string;
  shopify_converter_result: Pick<ReturnType<typeof sectionConverter>, 'blocks' | 'block_order' | 'settings'> | undefined;
}


export type File = LiquidFile
| {
    // "section bình thường", "header", "footer", "addon" đều sẽ được ghi như "section bình thường"
    type: FileType;
    id:
      `js_${string}`
      | `globalJs_${string}`
      | `css_${string}`
      | `globalCss_${string}`
      | `vendorsJs_${string}`
      | `vendorsCss_${string}`;
    name:
      `js_${string}`
      | `globalJs_${string}`
      | `css_${string}`
      | `globalCss_${string}`
      | `vendorsJs_${string}`
      | `vendorsCss_${string}`;
    content: string;
  }

export interface Product_Collection_Page {
  pageName: string;
  handle: string;
  templateSuffix: string;
  shopifyPages: PageLiquidVariable[];
  seo: {
    title: string;
    description: string;
    featuredImage: string;
  };
  isPublished: boolean;
  isApplyToAll: boolean;
  /**
   * Ví dụ: Customer tạo 1 design cho Collection A, Collection B trước đó
   * Sau đó, Customer tạo 1 design mới và bật "isApplyToAll"
   * Nếu "isOverrideInvidualPages" là true => Viết đè Collection A, Collection B theo design mới
   * Nếu "isOverrideInvidualPages" là false => Chỉ viết đè những Collections chưa được thiết kế
   */
  isOverrideIndividualPages: GetAdditionalDataRelateToShopify_BEExpectResponse['info']['isOverrideIndividualPages']; // Nếu không bắn lên BE sẽ set mặc định là true nên cần set cái này vào để giữ nguyên trạng thái nên trường này bắt buộc phải bắn lên
}

export type ArticlePage = Omit<Product_Collection_Page, 'shopifyPages'> & {
  shopifyPages: Array<{
    blogId: number;
    itemId: number;
  }>;
  /**
   * Ví dụ: Customer tạo 1 design cho Collection A, Collection B trước đó
   * Sau đó, Customer tạo 1 design mới và bật "isApplyToAll"
   * Nếu "isOverrideInvidualPages" là true => Viết đè Collection A, Collection B theo design mới
   * Nếu "isOverrideInvidualPages" là false => Chỉ viết đè những Collections chưa được thiết kế
   */
  isOverrideIndividualPages: GetAdditionalDataRelateToShopify_BEExpectResponse['info']['isOverrideIndividualPages']; // Nếu không bắn lên BE sẽ set mặc định là true nên cần set cái này vào để giữ nguyên trạng thái nên trường này bắt buộc phải bắn lên
};

export interface RegularPage {
  pageName: string;
  handle: string;
  isPublished: boolean;
  seo: {
    title: string;
    description: string;
    featuredImage: string;
  };
}

export interface HomePage {
  pageName: string;
  handle: string;
  isPublished: boolean;
}
