import { preloaderCss } from 'generate/plugins/preloader/preloader.css';
import preloaderJs from 'generate/plugins/preloader/preloader.js';
import { ThemeGeneralSettings } from 'types/Result';

export const getPreloader = (setting: ThemeGeneralSettings) => {
  if (!setting.preloaderEnable) {
    return {
      html: '',
      css: '',
      js: '',
    };
  }
  const cssVariables = `--veda-preloader-background-color: ${setting.preloaderBackgroundColor};--veda-preloader-color: ${setting.preloaderColor}`;
  return {
    html: `<div class="veda-preloader" style="${cssVariables}">
      ${!!setting.preloaderLogo ? `<img class="veda-preloader__logo" style="margin-bottom: 30px" src="${setting.preloaderLogo}" />` : ''}
      <div className="veda-preloader__item-wrapper">
        <div class="veda-preloader__item--${setting.preloaderVariant}"></div>
      </div>
    </div>`,
    css: preloaderCss(setting.preloaderVariant),
    js: preloaderJs,
  };
};
