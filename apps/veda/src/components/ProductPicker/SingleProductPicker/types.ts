export type SingleProductPickerResult =
  | undefined
  | {
      itemId: number;
      handle: string;
      featuredImg: string | undefined;
    };

export interface SingleProductPickerProps {
  /** Product đầu vào, có thể là undefined */
  product: SingleProductPickerResult;
  /** Sự kiện onChange, params: { id: number; handle: string; featuredImg: string | undefined; } */
  onChange?: (data: SingleProductPickerResult) => void;
}
