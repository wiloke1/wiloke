import Tooltip from 'components/Tooltip';
import React, { InputHTMLAttributes, useEffect } from 'react';
import { i18n } from 'translation';
import { FontAwesome, Size, useStyleSheet, View, ViewProps } from 'wiloke-react-core';
import { classNames } from 'wiloke-react-core/utils';
import Action from './Actions';
import { DragIcon } from './DragIcon';
import { parseDecimal } from './parseDecimal';
import * as styled from './styles';
import useCount from './useCount';

type InputType = 'number' | 'phone';
export interface NumberInputProps<T extends boolean = false> extends ViewProps {
  /** Size của input */
  sizeInput?: Exclude<Size, 'extra-small'>;
  /** Bật lên input sẽ rộng 100% */
  block?: boolean;
  /** Kiểu đầu vào của input */
  type?: InputType;
  /** Giá trị đầu vào của input */
  value?: number;
  /** Khi bật disabled thì nút mờ đi và không thể thực hiện event */
  disabled?: boolean;
  /** Giá trị nhỏ nhất của input */
  min?: number;
  /** Giá trị lớn nhất của input */
  max?: number;
  /** Bước nhảy cho mỗi lần tăng / giảm giá trị */
  step?: number;
  enableDrag?: boolean;
  clearEnabled?: T;
  /** Sự kiện onChange của input */
  onChange?: InputHTMLAttributes<HTMLInputElement>['onChange'];
  /** Sự kiện onValueChange của input, trả về dữ liệu dạng string(chuỗi) */
  onValueChange?: (value: T extends false ? number : number | undefined) => void;
}

const NumberInput = <T extends boolean = false>({
  sizeInput = 'medium',
  type = 'number',
  value,
  min = 0,
  max = 10,
  step = 1,
  block = false,
  disabled = false,
  className,
  color = 'gray8',
  backgroundColor = 'light',
  borderColor = 'gray5',
  borderWidth = 1,
  borderStyle = 'solid',
  enableDrag = false,
  css,
  clearEnabled = false as T,
  onValueChange,
  onChange,
  ...rest
}: NumberInputProps<T>) => {
  const { styles } = useStyleSheet();

  const { count, decrement, increment, setCount, clear } = useCount({ min, max, step, value });

  useEffect(() => {
    if (value !== count && count !== undefined) {
      // note: ngừng onChange khi value > max
      onValueChange?.(Math.max(min, Math.min(max, count)));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [count]);

  const _handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange?.(event);
    const _val = Number(event.target.value);

    // note: nếu value > max thì set value = max
    if (_val > max) {
      setCount(max);
    } else {
      setCount(parseDecimal(_val));
    }
  };

  const _onIncrement = () => increment(step);
  const _onDecrement = () => decrement(step);

  return (
    <View
      {...rest}
      className={classNames(className, 'NumberInput-container')}
      css={[styled.container(sizeInput, block, disabled, count !== undefined && clearEnabled), css]}
      color={color}
      backgroundColor={backgroundColor}
      borderColor={borderColor}
      borderWidth={borderWidth}
      borderStyle={borderStyle}
    >
      <View
        tagName="input"
        className={styles(styled.input(sizeInput))}
        style={count === undefined ? { width: 50 } : {}}
        type={count === undefined ? 'text' : type}
        min={min}
        max={max}
        step={step}
        value={count === undefined ? '-' : count}
        disabled={disabled}
        onChange={_handleChange}
        color="gray7"
      />

      <View css={styled.actions} backgroundColor="transparent">
        <Action increment={_onIncrement} decrement={_onDecrement} size={sizeInput} />
      </View>
      {count !== undefined && clearEnabled && clearEnabled && (
        <Tooltip
          portal
          text={i18n.t('general.clear')}
          onClick={() => {
            clear();
            onValueChange?.(undefined as any);
          }}
          css={styled.clear}
        >
          <FontAwesome type="far" name="undo-alt" size={11} color="gray6" />
        </Tooltip>
      )}
      {!!enableDrag && <DragIcon value={count || 0} setValue={setCount} />}
    </View>
  );
};

export default NumberInput;
