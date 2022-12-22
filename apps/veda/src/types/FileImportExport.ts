import { AddonOfTheme_Atom_N_Client, ProductAddon } from './Addons';
import { Page } from './Page';
import { PageSettings } from './Result';
import { ProductSection, SectionOfPage_Atom_N_ClientOrTheme_Atom_N_Client } from './Sections';

export interface FileImportExportContent {
  page?: Page;
  pageSettings?: PageSettings;
}

export type FileImportSection = ProductSection | SectionOfPage_Atom_N_ClientOrTheme_Atom_N_Client;

export type FileImportAddons = ProductAddon | AddonOfTheme_Atom_N_Client;
