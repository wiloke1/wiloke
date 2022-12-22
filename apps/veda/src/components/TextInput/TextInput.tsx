import React, { ChangeEvent, FC, InputHTMLAttributes, useEffect, useRef } from 'react';
import { Size, View, ViewProps } from 'wiloke-react-core';
import { classNames } from 'wiloke-react-core/utils';
import * as styles from './styles';
import TextInputLoading from './TextInputLoading';

type InputType = 'text' | 'password' | 'email';

export interface TextInputProps extends ViewProps {
  /** Size của input */
  sizeInput?: Exclude<Size, 'extra-small'>;
  /** Placeholder của input */
  placeholder?: string;
  /** Bật lên input sẽ rộng 100% */
  block?: boolean;
  /** Kiểu đầu vào của input */
  type?: InputType;
  /** Giá trị default của input */
  defaultValue?: string;
  /** Giá trị đầu vào của input */
  value?: string;
  /** Khi bật disabled thì nút mờ đi và không thể thực hiện event */
  disabled?: boolean;
  innerRef?: React.RefObject<HTMLInputElement>;
  multiline?: boolean;
  /** Sự kiện onChange của input */
  onChange?: InputHTMLAttributes<HTMLInputElement>['onChange'];
  /** Sự kiện onValueChange của input, trả về dữ liệu dạng string(chuỗi) */
  onValueChange?: (text: string) => void;
}

const TextInput: FC<TextInputProps> & {
  Loading: typeof TextInputLoading;
} = ({
  className,
  sizeInput = 'medium',
  placeholder = '',
  block = false,
  type = 'text',
  defaultValue,
  value,
  disabled = false,
  borderColor = 'gray3',
  borderStyle = 'solid',
  borderWidth = 1,
  color = 'gray8',
  backgroundColor = 'light',
  radius = 6,
  innerRef,
  multiline = false,
  onChange,
  onValueChange,
  onKeyDown,
  css,
  ...rest
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (multiline && containerRef.current && inputRef.current) {
      containerRef.current.style.height = '0px';
      containerRef.current.style.height = `${inputRef.current.scrollHeight}px`;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const _handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (multiline && containerRef.current) {
      containerRef.current.style.height = '0px';
      containerRef.current.style.height = `${event.target.scrollHeight}px`;
    }
    if (!disabled) {
      onValueChange?.(event.target.value.replace(/\n/g, '<br>'));
      onChange?.(event);
    }
  };

  return (
    <View
      {...rest}
      ref={containerRef}
      className={classNames(className, 'TextInput-container')}
      css={[styles.container(sizeInput, block, disabled), css]}
      color={color}
      backgroundColor={backgroundColor}
      borderColor={borderColor}
      borderWidth={borderWidth}
      borderStyle={borderStyle}
      radius={radius}
    >
      {multiline ? (
        <View
          tagName="textarea"
          ref={innerRef ?? inputRef}
          autoFocus={rest.autoFocus}
          css={styles.input2(sizeInput)}
          type={type}
          value={value?.replace(/<br>/g, '\n')}
          defaultValue={defaultValue?.replace(/<br>/g, '\n')}
          placeholder={placeholder}
          disabled={disabled}
          onChange={_handleChange}
          onKeyDown={onKeyDown}
        />
      ) : (
        <View
          tagName="input"
          ref={innerRef ?? inputRef}
          autoFocus={rest.autoFocus}
          css={styles.input(sizeInput)}
          type={type}
          value={value?.replace(/<br>/g, '\n')}
          defaultValue={defaultValue?.replace(/<br>/g, '\n')}
          placeholder={placeholder}
          disabled={disabled}
          onChange={_handleChange}
          onKeyDown={onKeyDown}
        />
      )}
    </View>
  );
};

TextInput.Loading = TextInputLoading;

export default TextInput;
