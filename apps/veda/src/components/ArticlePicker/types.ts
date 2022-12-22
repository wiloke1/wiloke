export type ArticlePickerResult =
  | undefined
  | {
      blogId: number;
      blogHandle: string;
      handle: string;
      itemId: number;
      featuredImg: string | undefined;
    };

export interface ArticlePickerProps {
  value: ArticlePickerResult;
  onChange?: (value: ArticlePickerResult) => void;
}
