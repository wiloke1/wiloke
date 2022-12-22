import { Style } from 'containers/BuilderPage/components/StyleBox/types';
import { cssLinearInterpolation } from 'generate/utils/generateHelpers';
import _ from 'lodash';
import { SectionSettings, StyleBoxChildren } from 'types/Schema';
import { handleGetSchemaScope } from 'utils/LiquidSyntaxToTwig/handleGetTwigScope';
import { Base64 } from './base64';
import { objectToStyle } from './handleStyle';
import { jsonParse } from './jsonParse';
import { removeDuplicate } from './removeDuplicate';

/**
 * Xoá đi những css không có giá trị
 * @example ```css
 * Input: background-color:;padding-top: 50px;padding-right: px;padding-bottom: ;padding-left: px;
 * Output: padding-top: 50px;
 * ```
 */
const removeCssValueEmpty = (css: string) => {
  return css.replace(/-?\w*-?\w*:\s*(px|%|em|rem|vh|vw|)\s*(;|$)/g, '');
};

/**
 * @description Tự động responsive cho font, padding, margin khi giá trị quá lớn
 */
const autoResponsive = (style: string) => {
  return style.replace(/;(?!\s*base64,)/g, ';\n').replace(/(font-size|padding-top|padding-bottom|margin-top|margin-bottom).*/g, x => {
    const prop = x.replace(/(.*(?=:))(.*)/g, '$1');
    const value = Number(x.replace(/(.*:\s*)(\d*(?=px))(.*)/g, '$2') ?? 0);
    if (value > 20) {
      const min = value / 2 + (value > 30 ? 10 : 8);
      return `${prop}: clamp(${min}px, ${cssLinearInterpolation({ 400: min, 1200: value })}, ${value}px) !important;`;
    }
    return x;
  });
};

class InlineCss {
  private handleCss = (children: StyleBoxChildren) => {
    let css = '';
    const cssObjStr = Base64.decode(children.css);
    const styleObj: Partial<Style> = jsonParse(removeCssValueEmpty(cssObjStr));
    const defaultStyles = autoResponsive(objectToStyle(styleObj.cssDefault ?? {}, true));
    const hoverStyles = autoResponsive(objectToStyle(styleObj.cssHover ?? {}, true));
    if (!!defaultStyles) {
      const newCss = `[data-css="${children.id}"] {${defaultStyles}}`;
      if (!css.includes(newCss)) {
        css += newCss;
      }
    }
    if (!!hoverStyles) {
      const newCss = `[data-css="${children.id}"]:hover {${hoverStyles}}`;
      if (!css.includes(newCss)) {
        css += newCss;
      }
    }
    return css;
  };

  private getCssArr = (settings: SectionSettings): string[] => {
    return settings.reduce<string[]>((arr, setting) => {
      if (setting.type === 'object') {
        return [...arr, ...this.getCssArr(setting.children)];
      }
      if (setting.type === 'array') {
        return [
          ...arr,
          ...setting.children.reduce<string[]>((arr, child) => {
            return [...arr, ...this.getCssArr(child.children)];
          }, []),
        ];
      }
      if (setting.type === 'styleBox') {
        return [...arr, typeof setting.children === 'string' ? '' : this.handleCss(setting.children)];
      }
      return arr;
    }, [] as string[]);
  };

  public getCssFromSettings = (settings: SectionSettings | SectionSettings[]) => {
    if (Array.isArray(settings[0])) {
      return (settings as SectionSettings[])
        .reduce<string[]>((arr, item) => {
          return [...arr, ...this.getCssArr(item)];
        }, [])
        .join('\n');
    }
    return removeDuplicate(this.getCssArr(settings as SectionSettings)).join('\n');
  };

  public handleLiquid = (liquid: string, settings?: SectionSettings) => {
    const divider = '\n===splitInlineCss===\n';
    if (!settings) {
      return liquid;
    }
    const scope = handleGetSchemaScope({ sectionSettings: settings });
    return liquid
      .replace(/\scss=/g, ` ${divider}css=`)
      .replace(/(}}\s*["'])/g, `$1${divider}`)
      .replace(/^css=.*/gm, value => {
        const strKeys = value.replace(/css.*{{\s*|\s*}}.*/g, '');
        const css: string = _.get(scope, strKeys.includes('.css') ? strKeys : `${strKeys}.css`) ?? '';
        const val = Base64.decode(css);
        const hasBgImg = val.includes('background-image');
        const dataLazyload = hasBgImg ? 'data-veda-lazyloaded="false" ' : '';

        if (strKeys.includes('.id')) {
          return `${dataLazyload}data-${value}`;
        }
        return `${dataLazyload}data-${value.replace(strKeys, `${strKeys}.id`)}`;
      })
      .replace(new RegExp(divider, 'g'), '');
  };
}

export const inlineCss = new InlineCss();
