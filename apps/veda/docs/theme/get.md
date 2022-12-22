#### Dữ liệu get về

[https://shopify-builder.netlify.app/themebuilder/templates](https://shopify-builder.netlify.app/themebuilder/templates)

```ts
import { Page, PageId } from 'types/Page';

/** Mô tả data trên server trả về để hiển thị theme */
export interface ThemeServerResponse {
  data: ThemeServiceData[];
  meta: {
    pagination: Pagination;
  };
}

export interface Pagination {
  limit: number;
  offset: number;
  total: number;
}

/** Dữ liệu các pages trong theme */
export type ThemeServicePageData = Record<PageId, Page>;

export interface ThemeServiceData {
  /** Id */
  id: string;
  /** Tên của theme */
  label: string;
  /** Dữ liệu các pages trong theme */
  pages: ThemeServicePageData;
  /** Các pages trong theme */
  createdAt?: string;
  /** Hình ảnh hiển thị mô tả theme */
  image?: string;
}
```

#### JSON

```ts
{
  "data": [
    {
      "id": "id_252e7977-eddf-4c4f-93e7-7f23839551ba",
      "label": "Theme 1",
      "pages": {
          "homepage1": {
              "id": "homepage1",
              "label": "Home page",
              "type": "home",
              "sections": []
          },
          "collection-page": {
              "id": "collection-page",
              "label": "Collection page",
              "type": "collection",
              "sections": []
          }
      },
      "createdAt": "",
      "image": "https://d3dfaj4bukarbm.cloudfront.net/production/images/admin/fdd97ac4-fbb7-4feb-97e1-f3a2e9c27e88.png"
    },
    {
      "id": "id_a3d4eb9b-e372-47ed-980b-de0338fab313",
      "label": "Theme 2",
      "pages": {
          "homepage10": {
              "id": "homepage10",
              "label": "Home page 10",
              "type": "home",
              "sections": []
          }
      },
      "createdAt": "",
      "image": "https://d3dfaj4bukarbm.cloudfront.net/production/images/admin/fdd97ac4-fbb7-4feb-97e1-f3a2e9c27e88.png"
    }
  ],
  "meta": {
    "pagination": {
      "offset": 0,
      "limit": 20,
      "total": 100
    }
  }
}
```
