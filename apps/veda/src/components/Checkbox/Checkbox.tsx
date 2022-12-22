import Tooltip from 'components/Tooltip';
import React, { FC, Fragment, InputHTMLAttributes, ReactNode, useEffect, useState } from 'react';
import { ColorNames, FontAwesome, Size, Text, TextProps, useStyleSheet, View, ViewProps } from 'wiloke-react-core';
import CheckboxLoading from './CheckboxLoading';
import * as cssStyle from './styles';

export interface CheckboxProps extends Pick<TextProps, 'borderWidth' | 'borderStyle' | 'borderColor' | 'radius' | 'className'> {
  value?: string | number;
  /** Kích thước của checkbox */
  size?: Size;
  /** Trạng thái của checkbox */
  checked?: boolean;
  /** Trạng thái default của checkbox */
  defaultChecked?: boolean;
  /** Disabled Checkbox */
  disabled?: boolean;
  /** Backgroundcolor checkbox*/
  activeColor?: ColorNames;
  /** Backgroundcolor checkbox*/
  inActiveBackgroundColor?: ColorNames;
  /** Color icon ben trong checkbox */
  iconActiveColor?: ColorNames;
  /** Icon ben trong checkbox */
  Icon?: ReactNode;
  innerCss?: ViewProps['css'];
  containerCss?: ViewProps['css'];
  disabledOnChange?: boolean;
  tooltipContent?: string;
  /** Sự kiện khi bấm vào checkbox và nhận được event */
  onChange?: InputHTMLAttributes<HTMLInputElement>['onChange'];
  /** Sự kiện khi bấm vào checkbox và nhận được value */
  onValueChange?: (value: boolean) => void;
  onClick?: () => void;
}

interface CheckboxStatic {
  Loading: typeof CheckboxLoading;
}

const Checkbox: FC<CheckboxProps> & CheckboxStatic = ({
  size = 'small',
  checked,
  disabled = false,
  children,
  Icon,
  value,
  borderColor = 'gray4',
  radius = 4,
  borderWidth = 1,
  borderStyle = 'solid',
  activeColor = 'primary',
  iconActiveColor = 'light',
  innerCss,
  containerCss,
  disabledOnChange = false,
  tooltipContent,
  onChange,
  onValueChange,
  onClick,
}) => {
  const [checkedState, setCheckedState] = useState(checked);
  const { styles } = useStyleSheet();

  const defaultIconMapping: Record<Size, ReactNode> = {
    'extra-small': <FontAwesome type="far" name="check" size={10} />,
    small: <FontAwesome type="far" name="check" size={12} />,
    medium: <FontAwesome type="far" name="check" size={16} />,
    large: <FontAwesome type="far" name="check" size={18} />,
  };

  const _handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (disabled || disabledOnChange) {
      return;
    }
    setCheckedState(!checkedState);
    onChange?.(event);
    onValueChange?.(!checkedState);
  };

  useEffect(() => {
    if (typeof checked !== 'undefined') {
      setCheckedState(checked);
    }
  }, [checked]);

  const _renderCheckboxNative = () => {
    return (
      <input value={value} disabled={disabled} className={styles(cssStyle.input)} checked={checkedState} type="checkbox" onChange={_handleChange} />
    );
  };

  const _renderCheckboxIcon = () => {
    return (
      <Text
        tagName="span"
        radius={radius}
        borderColor={borderColor}
        borderStyle={borderStyle}
        borderWidth={checkedState ? 0 : borderWidth}
        css={cssStyle.control(size)}
      >
        {checkedState ? (
          <Fragment>
            <Text color={iconActiveColor} nightModeBlacklist="color" tagName="span" css={cssStyle.icon}>
              {Icon || defaultIconMapping[size]}
            </Text>
            <View css={cssStyle.bgIcon} backgroundColor={activeColor} />
          </Fragment>
        ) : (
          <Fragment>
            <Text color={iconActiveColor} nightModeBlacklist="color" tagName="span" css={cssStyle.icon}>
              {Icon || defaultIconMapping[size]}
            </Text>
            <View css={cssStyle.bgInActive} />
          </Fragment>
        )}
      </Text>
    );
  };

  const renderInput = (
    <Text tagName="span" css={cssStyle.innerWrap}>
      {_renderCheckboxNative()}
      {_renderCheckboxIcon()}
    </Text>
  );

  return (
    <Text tagName="label" css={[cssStyle.container(disabled, size), containerCss]} onClick={onClick}>
      {!!tooltipContent ? (
        <Tooltip portal placement="left" text={tooltipContent}>
          {renderInput}
        </Tooltip>
      ) : (
        renderInput
      )}

      {!!children && (
        <Text css={[cssStyle.text, innerCss]} color="gray7" tagName="span">
          {children}
        </Text>
      )}
    </Text>
  );
};

Checkbox.Loading = CheckboxLoading;

export default Checkbox;
