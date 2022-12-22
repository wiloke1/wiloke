import { ThemeGeneralSettings } from 'types/Result';
import { getPreloader } from 'utils/functions/getPreloader';
import { ExpectReturnType } from './@types/ExpectReturnType';

export const getHtmlPreloaderFile = ({ ...preloader }: ThemeGeneralSettings): ExpectReturnType => {
  const { html } = getPreloader(preloader);
  return {
    // NOTE: @tuong -> Hiện tại file được ghi vào file có tên "assets/global-veda-preloader.liquid"
    // "@veda_position:footer" thì file sẽ được sử dụng tại "veda-footer-scripts.liquid"
    // "@veda_position:header" thì file sẽ được sử dụng tại "veda-header-scripts.liquid"
    // "veda-footer.liquid" và "veda-header.liquid" sẽ được dùng tại "theme.liquid" và "theme.veda-landing.liquid"
    /** "Làm dấu" để BE có thể xử lí sync shopify */
    content: `
      //startAssets @veda_id:preloader @veda_name:preloader @veda_position:footer @veda_type:section @veda_content:
      ${html}
      `,
    type: 'liquid của preloader - cái này được ghi vào theme.*.liquid',
    name: 'preloader',
    id: 'preloader',
    section: undefined,
  };
};
