import { PageType } from 'types/Page';

export interface BE_PageAtom {
  commandId: string;
  label: string;
  image: {
    src: string;
    width: number;
    height: number;
  };
  // @deprecated
  userId: number;
  // @deprecated
  approvedBy: number;
  sectionCommandIds: string[];
  // @deprecated
  addonCommandIds?: string[];
  type: PageType;
  pageSettings?: {
    generalSettings: {
      headerFooterEnabled: boolean;
      label: string;
      metaDescription: string;
      metaTitle: string;
      handle: string;
      socialShareImage: string;
      lazyload: boolean;
    };
    globalJs: string;
    globalScss: string;
    vendors: Array<{
      css: string;
      id: string;
      js: string;
    }>;
    cssVariables?: {
      colors: Array<{
        id: string;
        name: string;
        light: string;
        dark: string;
      }>;
      fonts: Array<{
        id: string;
        name: string;
        value: string;
      }>;
    };
    layoutSettings?: {
      containerWidth: number;
      containerGap: number;
      columnGapX: number;
      columnGapY: number;
    };
  };
  // @deprecated
  status?: string;
  // @deprecated
  comment?: string;
  enable?: boolean;
}

export interface BE_PageDraft extends BE_PageAtom {
  parentCommandId: string;
  changelog?: string;
}
