import { MeasureKey } from 'hooks/useMeasure';
import { CssColorVariable } from 'types/PresetStyles';
import { ViewProps } from 'wiloke-react-core';

export interface ColorPicker2Props {
  data: CssColorVariable[];
  triggerSmall?: boolean;
  triggerCss?: ViewProps['css'];
  color?: string;
  onChange: (color: string) => void;
  onAddOrEditColor?: () => void;
}

export interface ColorContextValue extends Required<ColorPicker2Props> {
  visible: boolean;
  measure: Record<MeasureKey, number>;
  setVisible: (visible: boolean) => void;
}
