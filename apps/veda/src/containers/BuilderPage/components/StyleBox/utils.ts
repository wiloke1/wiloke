import { Base64 } from 'utils/functions/base64';
import { jsonParse } from 'utils/functions/jsonParse';
import { objectEntries } from 'utils/functions/objectEntries';
import { Animate, CssAnimation, CSSProp, CSSPropKey, Style } from './types';

export const replaceUnit = (value?: string | undefined) => {
  if (value === undefined) {
    return undefined;
  }
  if (!value) {
    return 0;
  }
  return Number(value.replace(/(^(\d|\.)*)(.*)/g, '$1'));
};

export const replaceUrl = (value?: string | undefined) => {
  if (!value) {
    return '';
  }
  return value.replace(/url\(["']?|["']?\)/g, '');
};

export const defaultValue: Partial<CSSProp> = {
  'font-style': 'normal',
  'text-decoration': 'none',
  'text-transform': 'none',
  'border-style': 'solid',
  'transition-duration': '300ms',
  'transition-timing-function': 'ease',
};

export const defaultCss: DeepPartial<Style> = {
  ...defaultValue,
  cssHover: defaultValue,
};

export const defaultCssAnimation: CssAnimation = {
  animate: '',
  type: 'infinite',
};

export const CSS_START = '==cssStart==';
export const CSS_END = '==cssEnd==';

export const styleParse = (value: string): Style => {
  const cssObjStr = value.replace(/background-color/g, 'backgroundColor');
  const style: Style = jsonParse(cssObjStr);
  return style;
};

export const getSpaceObj = (css: Record<string, any>, type: CSSPropKey): Record<string, number | undefined> => {
  return {
    top: replaceUnit(css[`${type}-top`]),
    right: replaceUnit(css[`${type}-right`]),
    bottom: replaceUnit(css[`${type}-bottom`]),
    left: replaceUnit(css[`${type}-left`]),
  };
};

export const removeKey = (obj: Record<string, any>, key: string) => {
  return objectEntries(obj).reduce((acc, [k, v]) => {
    if (k === key || k.startsWith(`${key}-`)) {
      return acc;
    }
    return { ...acc, [k]: v };
  }, {});
};

export const removeKeyUndefined = (obj: Record<string, any>) => {
  return objectEntries(obj).reduce((acc, [k, v]) => {
    if (v === undefined) {
      return acc;
    }
    return { ...acc, [k]: v };
  }, {});
};

const getRegExp = () => {
  return new RegExp(`(${CSS_START})(.*)(${CSS_END})`, 'g');
};

export const styleBoxEncode = (value: string) => {
  const regex = getRegExp();
  const start = value.replace(regex, '$1');
  const css = value.replace(regex, '$2');
  const end = value.replace(regex, '$3');
  return `${start}${Base64.encode(css)}${end}`;
};

export const styleBoxDecode = (value: string) => {
  const regex = getRegExp();
  const start = value.replace(regex, '$1');
  const css = value.replace(regex, '$2');
  const end = value.replace(regex, '$3');
  return `${start}${Base64.decode(css)}${end}`;
};

export const getAnimateCss = ({ animate, type }: CssAnimation) => {
  if (!animate) {
    return '';
  }
  if (type === 'scroll') {
    return `scroll_${animate} var(--animate-duration, 1s) both`;
  }
  if (type === 'infinite') {
    return `${animate} var(--animate-duration, 1s) both infinite`;
  }
  return `${animate} var(--animate-duration, 1s) both`;
};

export const getAnimateValue = (animateCss: string): CssAnimation => {
  if (!animateCss) {
    return defaultCssAnimation;
  }
  if (animateCss.includes('scroll_')) {
    return {
      animate: animateCss.replace(/scroll_|\s.*/g, '') as Animate,
      type: 'scroll',
    };
  }
  if (animateCss.includes(' infinite')) {
    return {
      animate: animateCss.replace(/\s.*/g, '') as Animate,
      type: 'infinite',
    };
  }
  return {
    animate: animateCss.replace(/\s.*/g, '') as Animate,
    type: '',
  };
};
