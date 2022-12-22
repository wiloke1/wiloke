import style1 from './style1.css';
import style2 from './style2.css';
import style3 from './style3.css';
import style4 from './style4.css';

const defaultCss = `
.veda-preloader {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: var(--veda-preloader-background-color, var(--color-primary));
  z-index: 9999999999;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  transition: all 0.3s;
}
.veda-preloader--done {
  opacity: 0;
  visibility: hidden;
}
.veda-preloader__item-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100px;
}
.veda-preloader__logo {
  width: 100px;
}
`;

export const preloaderCss = (variant?: number) => `
${defaultCss}
${variant === 1 ? style1 : ''}
${variant === 2 ? style2 : ''}
${variant === 3 ? style3 : ''}
${variant === 4 ? style4 : ''}
`;

export const preloaderCssForBuilder = `
${defaultCss}
${style1}
${style2}
${style3}
${style4}
`;
