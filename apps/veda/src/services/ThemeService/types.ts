import { AddonOfTheme_Atom_N_Client } from 'types/Addons';
import { ThemeSettings, Vendor } from 'types/Result';
import { SectionOfPage_Atom_N_ClientOrTheme_Atom_N_Client } from 'types/Sections';
import { ThemeGeneral } from 'types/Theme';

export interface UpdateThemeParams {
  commandId: string;
  name: string;
  themeSettings: ThemeSettings;
  globalJs: string;
  featuredImage: string;
  globalScss: string;
  vendors: {
    data: Vendor[];
  };
  pageIds: string[];
  addons: AddonOfTheme_Atom_N_Client[];
  headers: SectionOfPage_Atom_N_ClientOrTheme_Atom_N_Client[];
  footers: SectionOfPage_Atom_N_ClientOrTheme_Atom_N_Client[];
}

export interface GetActivateThemeResponse {
  info: ThemeGeneral;
  message: string;
}

export interface ThemeShopify {
  id: string;
  name: string;
  role: null;
  previewable: null;
  processing: null;
  created_at: null;
  updated_at: null;
  theme_store_id: null;
  admin_graphql_api_id: null;
}
