import { NonEmptyValue, Product } from 'utils/LiquidSyntaxToTwig';

type Product_ = NonEmptyValue<Product>;

export type MultiProductsPickerResult = Array<
  Pick<
    Product_,
    // Uniq attribute
    | 'id'
    | 'handle'
    // Ảnh
    | 'featured_image'
    | 'images'
    // Tên
    | 'title'
    // Đường dẫn
    | 'url'
    // Giá
    | 'price'
    | 'price_max'
    | 'price_min'
    | 'price_varies'
    | 'compare_at_price'
    | 'compare_at_price_max'
    | 'compare_at_price_min'
    | 'compare_at_price_varies'
    // @tuong -> Có thể sau sẽ có "Variant" để hiển thị và làm cả chức năng "Buy it now"
  >
>;

export interface MultiProductsPickerProps {
  products: MultiProductsPickerResult;
  onChange?: (data: MultiProductsPickerResult) => void;
}
