export interface CollectionApiData {
  id: string;
  title: string;
  handle: string;
  image: Image | null;
  cursor: string;
}

interface Image {
  src: string;
  width: number;
  height: number;
}
