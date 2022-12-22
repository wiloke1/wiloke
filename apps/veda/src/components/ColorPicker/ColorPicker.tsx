import { FC, ReactNode, useEffect, useRef, useState } from 'react';
import { ChromePicker, ColorChangeHandler, PhotoshopPicker, RGBColor, SketchPicker } from 'react-color';
import { Helmet } from 'react-helmet';
import { Manager, Popper, Reference } from 'react-popper';
import { createPortal } from 'utils/functions/createPortal';
import hexToRgb from 'utils/functions/hexToRgb';
import { Radius, useStyleSheet, View } from 'wiloke-react-core';
import { classNames } from 'wiloke-react-core/utils';
import ColorPickerLoading from './ColorPickerLoading';
import * as css from './styles';
import rgbaObjectToString from './utils/rgbaObjectToString';
import rgbaStringToObject from './utils/rgbaStringToObject';

export type ColorPickerType = 'chrome' | 'sketch' | 'photoshop';
export type PresetColor = { color: string; title: string } | string;
export type Placement =
  | 'top'
  | 'top-start'
  | 'top-end'
  | 'right'
  | 'right-start'
  | 'right-end'
  | 'bottom'
  | 'bottom-start'
  | 'bottom-end'
  | 'left'
  | 'left-start'
  | 'left-end';

export type Strategy = 'absolute' | 'fixed';

export interface ColorPickerProps {
  /** Giao diện của color picker platform: 'chrome' | 'sketch' | 'photoshop' | 'material' | 'compact' | 'swatches' */
  pickerType?: ColorPickerType;
  /** Đầu vào cùa color */
  color?: string;
  /** Thuộc tính disable alpha của các platform: 'chrome' | 'sketch */
  disableAlpha?: boolean;
  /** bảng màu ở phía dưới của platform: sketch */
  presetColors?: PresetColor[];
  /** className của color picker */
  className?: string;
  /** Position của color picker board */
  strategy?: Strategy;
  /** Chỉ hiện bảng color picker */
  onlyShowColorBoard?: boolean;
  /** Vị trí của color picker board */
  placement?: Placement;
  /** Bo viền */
  radius?: Radius;
  /** True thì Tạo color picker board ngoài root */
  isPortal?: boolean;
  /** Mảng màu sắc được chọn */
  documentColors?: string[];
  /** Sự kiện onChange */
  onChange?: (color: string) => void;
  /** Sự kiện onChangeComplete */
  onChangeComplete?: (color: string) => void;
  /** Render component đằng sau ColorPicker */
  renderAfter?: (color: string) => ReactNode;
}

export const getColor = (color: string, defaultColor = '') => {
  if (color.includes('rgba')) {
    return color;
  }
  if (color.includes('rgb(')) {
    return color.replace('rgb', 'rgba').replace(')', ', 1)');
  }
  if (color.includes('#')) {
    const { r, g, b } = hexToRgb(color);
    return `rgba(${r},${g},${b},1)`;
  }
  return defaultColor;
};

const ColorPicker: FC<ColorPickerProps> & {
  Loading: typeof ColorPickerLoading;
} = ({
  disableAlpha = false,
  onlyShowColorBoard = false,
  pickerType = 'sketch',
  placement = 'bottom-start',
  strategy = 'absolute',
  radius = 6,
  color = 'rgba(255,255,255,1)',
  isPortal = false,
  className,
  documentColors = [],
  presetColors = [
    '#D0021B',
    '#F5A623',
    '#F8E71C',
    '#8B572A',
    '#7ED321',
    '#417505',
    '#BD10E0',
    '#9013FE',
    '#4A90E2',
    '#50E3C2',
    '#B8E986',
    '#000000',
    '#4A4A4A',
    '#9B9B9B',
    '#FFFFFF',
  ],
  onChange,
  onChangeComplete,
  renderAfter,
}) => {
  const [colorState, setColorState] = useState<RGBColor>(rgbaStringToObject(getColor(color)));
  const [showPicker, setShowPicker] = useState(false);
  const { styles } = useStyleSheet();
  const innerPopperRef = useRef<HTMLDivElement | null>(null);
  const targetRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!!color) {
      setColorState(rgbaStringToObject(getColor(color)));
    }
  }, [color]);

  useEffect(() => {
    document.body.style.userSelect = showPicker ? 'none' : 'auto';
  }, [showPicker]);

  const _handleOnClick = () => {
    setShowPicker(!showPicker);
  };

  const _handleOnClose = () => {
    setShowPicker(false);
  };

  const _handleChange: ColorChangeHandler = color => {
    setColorState(color.rgb);
    const _color = rgbaObjectToString(color.rgb);
    if (!!_color) {
      onChange?.(_color);
    }
  };

  const _handleChangeComplete: ColorChangeHandler = color => {
    setColorState(color.rgb);
    onChangeComplete?.(rgbaObjectToString(color.rgb));
  };

  const handleWindowClick = (event: MouseEvent) => {
    if (!innerPopperRef.current?.contains(event.target as HTMLElement) && !targetRef.current?.contains(event.target as HTMLElement)) {
      _handleOnClose();
    }
  };

  useEffect(() => {
    window.addEventListener('click', handleWindowClick);
    return () => {
      window.removeEventListener('click', handleWindowClick);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const combineProps = {
    className: classNames(styles(css.container), className),
    color: colorState,
    onChange: _handleChange,
    onChangeComplete: _handleChangeComplete,
  };

  const mappingColorPicker: Record<ColorPickerType, ReactNode> = {
    chrome: <ChromePicker {...combineProps} disableAlpha={disableAlpha} />,
    photoshop: <PhotoshopPicker {...combineProps} />,
    sketch: <SketchPicker {...combineProps} disableAlpha={disableAlpha} presetColors={Array.from(new Set([...documentColors, ...presetColors]))} />,
  };

  const targetPicker = (
    <Reference>
      {({ ref }) => (
        <View ref={ref} className="TargetPicker" css={css.targetPicker} onClick={_handleOnClick}>
          <View
            ref={targetRef}
            radius={radius}
            borderWidth={1}
            borderColor="gray3"
            borderStyle="solid"
            css={css.targetBackground}
            style={{ backgroundColor: !!color ? rgbaObjectToString(colorState) : 'transparent' }}
          ></View>
        </View>
      )}
    </Reference>
  );

  const pickerBoard = (
    <Popper strategy={strategy} placement={placement}>
      {popperProps => {
        return (
          <View
            className="Placement-container"
            ref={popperProps.ref}
            style={popperProps.style}
            css={css.placement(popperProps.placement as Placement)}
          >
            <View ref={innerPopperRef}>
              <View>{mappingColorPicker[pickerType]}</View>
              <View ref={popperProps.arrowProps.ref} style={popperProps.arrowProps.style} css={{ position: 'absolute' }} />
            </View>
          </View>
        );
      }}
    </Popper>
  );

  const _renderColorPicker = () => showPicker && pickerBoard;

  const _renderPickerPortal = () => showPicker && createPortal(pickerBoard);

  return (
    <>
      <View css={{ position: 'relative' }}>
        {onlyShowColorBoard ? (
          mappingColorPicker[pickerType]
        ) : (
          <Manager>
            {targetPicker}
            {isPortal ? _renderPickerPortal() : _renderColorPicker()}
          </Manager>
        )}
      </View>
      {renderAfter?.(rgbaObjectToString(colorState))}
      <Helmet>
        <style>
          {`
            ${
              documentColors.length > 0
                ? `
                .sketch-picker > div:last-child > div:nth-child(${documentColors.length + 1}) {
                  width: 100% !important;
                  height: 10px !important;
                }
                .sketch-picker > div:last-child > div:nth-child(${documentColors.length + 1}) div {
                  display: none;
                }
                .sketch-picker > div:last-child {
                  padding-top: 25px !important;
                }
                .sketch-picker > div:last-child > div:nth-child(1),
                .sketch-picker > div:last-child > div:nth-child(${documentColors.length + 2}) {
                  position: relative;
                }
                .sketch-picker > div:last-child > div:nth-child(1):before,
                .sketch-picker > div:last-child > div:nth-child(${documentColors.length + 2}):before {
                  content: "Default Colors";
                  display: block;
                  position: absolute;
                  top: -4px;
                  left: 0;
                  transform: translateY(-100%);
                  white-space: nowrap;
                  font-size: 10px;
                }
                .sketch-picker > div:last-child > div:nth-child(1):before {
                  content: "Document Colors";
                }
              `
                : ''
            }
          `}
        </style>
      </Helmet>
    </>
  );
};

ColorPicker.Loading = ColorPickerLoading;

export default ColorPicker;
