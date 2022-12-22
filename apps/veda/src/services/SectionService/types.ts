import { PreviewImage } from 'types/Page';
import { AdminSection, DevSection, PageSection, ProductSection, SectionCategoryTag } from 'types/Sections';

export interface ResponseGetPublicSections {
  info: PageSection[];
  message: string;
}

export interface ResponseGetOneSection {
  info: PageSection;
  message: string;
}

export interface ResponseGetPublicCategories {
  info: SectionCategoryTag[];
  message: string;
}

export interface CreateUpdateResponse {
  info: DevSection | AdminSection;
  message: string;
}

export interface ResponseCreateCategory {
  info: SectionCategoryTag;
  message: string;
}

export interface ServerTagResponse {
  commandId: string;
  description: string;
  name: string;
}

// Biến đổi data của server trả về thành type của fe
export interface SectionCategoryForFrontend {
  commandId: string;
  title: string;
  slug: string;
  // Số lượng section trong category này
  quantity: string;
}

export interface CreateProductSectionResponse {
  info: ProductSection;
  message: string;
}

export interface CreateAdminSectionResponse {
  info: AdminSection;
  message: string;
}

export interface ResponseGetAddonCategories {
  info: SectionCategoryTag[];
  message: string;
}

export interface CategoryDataResponse extends SectionCategoryTag {
  count: number;
}

export interface SectionFavoriteDataResponse {
  categories: string[];
  commandId: string;
  favoriteType: string;
  image: PreviewImage;
  name: string;
  parentCommandId: string;
  userId: number;
}
