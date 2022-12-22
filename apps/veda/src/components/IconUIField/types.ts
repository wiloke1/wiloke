import { CSSProp } from 'wiloke-react-core/dist/hocs/withStyles';
import {icons, iconBrands} from './icons';

export type FontType = 'fas' | 'far' | 'fal';
export type FontAwesomeBrand = typeof iconBrands[number];
export type FontAwesomeDefault = typeof icons[number];
export type FontAwesomeType = FontAwesomeDefault | FontAwesomeBrand;

// eslint-disable-next-line prettier/prettier
export type IconValue = `<i class="${FontType} ${FontAwesomeType}"></i>` | `<i class="fab ${FontAwesomeBrand}"></i>`;

export interface IconUIFieldProps {
  label?: string;
  value?: IconValue;
  onChange?: (value: IconValue | Omit<string, IconValue>) => void;
  goBack?: () => void;
  onImageClick?: () => void;
  css?: CSSProp;
}

export interface IconUIFieldButtonProps {
  value?: IconValue;
  onClick?: () => void;
}
