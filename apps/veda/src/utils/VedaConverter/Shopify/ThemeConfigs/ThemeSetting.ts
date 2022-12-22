import { sectionConverter } from '../../Veda/SectionConvert/SectionConvert';

type HeaderFooterSectionSetting = Pick<ReturnType<typeof sectionConverter>, 'blocks' | 'settings' | 'block_order'> & {
  type: string;
};

export interface ThemeSetting {
  [x: string]: boolean | number | string | Record<string, HeaderFooterSectionSetting>;
}
