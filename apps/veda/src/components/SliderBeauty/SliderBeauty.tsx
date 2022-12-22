import Box, { BoxProps } from 'components/FieldBox';
import { NumberInput } from 'components/NumberInput';
import Slider, { SliderProps } from 'components/Slider';
import { BorderStyle, ColorNames, Radius, useTheme, View, ViewProps } from 'wiloke-react-core';
import * as css from './styles';

export interface SliderBeautyProps<T extends boolean = false>
  extends SliderProps,
    Pick<BoxProps, 'borderStyle' | 'borderWidth' | 'borderColor' | 'radius'> {
  /** Giá trị thấp nhất của slide beauty */
  min?: number;
  /** Giá trị lớn nhất của slide beauty */
  max?: number;
  /** Giá mỗi lần nhảy(step) của slide beauty */
  step?: number;
  /** Giá trị default của slide beauty */
  defaultValue?: number;
  /** Giá trị của slide beauty */
  value?: number | undefined;
  /** Bật lên thì hiểu thị dots slide beauty */
  dots?: boolean;
  /** Background color của box */
  backgroundInnerField?: ColorNames;
  /** Bật lên thì hiện tooltip */
  tooltip?: boolean;
  /** Radius của ô input */
  radiusInput?: Radius;
  /** Style border của input */
  borderInputStyle?: BorderStyle;
  /** Background color của input */
  borderInputColor?: ColorNames;
  clearEnabled?: T;
  /** Sự kiện onChange */
  onValueChange?: (value: T extends false ? number : number | undefined) => void;
  containerCss?: ViewProps['css'];
}

const SliderBeauty = <T extends boolean = false>({
  min = 0,
  max = 100,
  step = 1,
  value,
  defaultValue = 0,
  handleBorderColor = 'gray4',
  handleColor = 'light',
  railColor = 'gray5',
  trackColor = 'gray5',
  tooltip = false,
  dots = false,
  borderColor = 'gray5',
  borderStyle = 'solid',
  radius = 6,
  borderInputStyle = 'solid',
  radiusInput = 5,
  borderWidth = 1,
  borderInputColor = 'gray5',
  backgroundInnerField = 'light',
  clearEnabled = false as T,
  containerCss,
  onValueChange,
}: SliderBeautyProps<T>) => {
  const { colors } = useTheme();
  return (
    <Box
      backgroundColor={backgroundInnerField}
      borderColor={borderColor}
      borderStyle={borderStyle}
      borderWidth={borderWidth}
      radius={radius}
      css={[css.container, containerCss]}
    >
      <View css={css.inner} radius={6}>
        <View css={css.silder}>
          <Slider
            defaultValue={defaultValue}
            value={value || 0}
            min={min}
            max={max}
            step={step}
            dots={dots}
            tooltip={tooltip}
            handleStyle={{ backgroundColor: colors[handleColor], border: `1px solid ${colors[handleBorderColor]}` }}
            trackStyle={{ backgroundColor: colors[trackColor] }}
            railStyle={{ backgroundColor: colors[railColor] }}
            onChange={onValueChange}
          />
        </View>

        <View css={css.input}>
          <NumberInput
            css={{ minWidth: '70px', maxWidth: '70px' }}
            defaultValue={defaultValue}
            value={value}
            min={min}
            max={max}
            step={step}
            radius={radiusInput}
            borderStyle={borderInputStyle}
            borderColor={borderInputColor}
            sizeInput="small"
            clearEnabled={clearEnabled}
            onValueChange={onValueChange}
          />
        </View>
      </View>
    </Box>
  );
};

export default SliderBeauty;
