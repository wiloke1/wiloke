import { animates } from './data';

type AnimatesUnion = typeof animates[number];
export type Animate = AnimatesUnion extends { value: infer U } ? U : never;

export interface CssAnimation {
  animate: Animate;
  type: 'infinite' | 'scroll' | '';
}

export type CSSPropKey =
  | 'color'
  | 'font-size'
  | 'font-family'
  | 'font-style'
  | 'font-weight'
  | 'line-height'
  | 'letter-spacing'
  | 'text-align'
  | 'text-decoration'
  | 'text-transform'
  | 'backgroundColor'
  | 'background'
  | 'width'
  | 'height'
  | 'padding'
  | 'margin'
  | 'border-width'
  | 'border-style'
  | 'border-color'
  | 'border-radius'
  | 'box-shadow'
  | 'transition-duration'
  | 'transition-timing-function'
  | 'transition-delay'
  | 'animation';

export type CSSProp = Record<CSSPropKey, string>;

export interface Style {
  cssDefault: CSSProp;
  cssHover: CSSProp;
}
