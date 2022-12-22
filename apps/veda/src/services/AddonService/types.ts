import { AdminAddon, DevAddon, ProductAddon, ThemeAddon } from 'types/Addons';
import { SectionCategoryTag } from 'types/Sections';

export interface ResponseGetAllAddons {
  info: ThemeAddon[];
  message: string;
}

export interface ResponsePublishAddons {
  info: ProductAddon[];
  message: string;
}

export interface ResponseGetOneAddons {
  info: ProductAddon;
  message: string;
}

export interface CreateUpdateAddonsResponse {
  info: AdminAddon | DevAddon;
  message: string;
}

export interface ResponseCreateCategory {
  info: SectionCategoryTag;
  message: string;
}

export interface CreateAdminAddonResponse {
  info: AdminAddon;
  message: string;
}

export interface CreateProductAddonResponse {
  info: ProductAddon;
  message: string;
}
