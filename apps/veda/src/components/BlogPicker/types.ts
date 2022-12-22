export type BlogPickerResult =
  | undefined
  | {
      id: number;
      handle: string;
      featuredImg: string | undefined;
    };

export interface BlogPickerProps {
  /** Blog đầu vào, có thể là undefined */
  value?: BlogPickerResult;
  /** Sự kiện onChange, params: { id: number; handle: string; featuredImg: string | undefined; } */
  onChange?: (value: BlogPickerResult) => void;
}
