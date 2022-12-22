export interface ArticlesApiData {
  id: number;
  title: string;
  handle: string;
  image: Image | null;
  cursor: string;
}

interface Image {
  altText: string;
  height: number;
  width: number;
  src: string;
}
