import { Consts } from 'utils/constants/constants';

const preloaderJs = `
window.${Consts.AppName}.plugins.preloader = function(containerEl) {
  window.addEventListener('load', () => {
    const el = document.querySelector('.veda-preloader');
    el.classList.add('veda-preloader--done');
  });
}
${Consts.AppName}.plugins.preloader();
`;

export default preloaderJs;
