export interface FreeImageCategoriesData {
  id: number;
  handle: string;
  name: string;
  cover_photo: {
    title: string;
    url: string;
  };
}

export interface FreeImageCategoriesResponse {
  data: FreeImageCategoriesData[];
  metadata: {
    total_count: number;
    paging: {
      next: string;
      previous?: null | string;
    };
  };
}

// images
export interface FreeImages {
  id: number;
  handle: string;
  title: string;
  width: number;
  height: number;
  url: string;
  size_in_bytes: number;
  cityhash: string;
  variations: {
    shopify: {
      height: number;
      width: number;
      cityhash: string;
      size_in_bytes: number;
    };
  };
}

export interface FreeImagesResponse {
  data: FreeImages[];
  metadata: {
    total_count: number;
    paging: {
      next: string;
      previous?: null | string;
    };
  };
}
