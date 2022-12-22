import Tooltip, { TooltipProps } from 'components/Tooltip';
import { ButtonHTMLAttributes, DOMAttributes, forwardRef, memo, ReactNode, Ref } from 'react';
import { ActivityIndicator, Size, Text, useStyleSheet, View, ViewProps } from 'wiloke-react-core';
import * as styled from './styles';

export interface ButtonProps extends ViewProps {
  /** React children */
  children: ReactNode;
  /** Các kích thước của button */
  size?: Size;
  /** Bật lên sẽ dài full 100% */
  block?: boolean;
  /** Thuộc tính href của thẻ a */
  href?: string;
  /** Thuộc tính target của thẻ a nhưng bỏ "_" ở trước */
  target?: 'blank' | 'self' | 'parent' | 'top';
  /** Set css font-size */
  fontSize?: number;
  /** Khi bật disabled thì nút mờ đi và không thể thực hiện event */
  disabled?: boolean;
  /** Khi bật lên thì sẽ hiển thị icon loading bên trái */
  loading?: boolean;
  /** Thuộc tính type của thẻ button */
  type?: ButtonHTMLAttributes<HTMLButtonElement>['type'];
  /** Sự kiện click */
  onClick?: DOMAttributes<HTMLElement>['onClick'];
  /** Nguyên nhân mà button bị disabled */
  tooltip?: TooltipProps;
  Icon?: ReactNode;
}

const Button = forwardRef<HTMLElement, ButtonProps>(
  (
    {
      href,
      children,
      target = 'self',
      className,
      size = 'medium',
      block = false,
      onClick,
      disabled = false,
      loading = false,
      type = 'button',
      fontSize,
      style,
      borderWidth = 0,
      backgroundColor = 'primary',
      color = 'light',
      radius = 'square',
      css,
      tooltip,
      Icon,
      ...rest
    },
    ref,
  ) => {
    const { styles } = useStyleSheet();
    const props: ViewProps = {
      ...rest,
      css: [styled.container(size, borderWidth), styled.block(block), styled.disabled(disabled), styled.fontSize(fontSize), css],
      className,
      style,
      backgroundColor,
      radius,
      color,
      ...(disabled ? {} : { onClick }),
    };
    const renderChildren = () => {
      return (
        <>
          {loading ? <ActivityIndicator size={18} className={styles(styled.loading)} /> : Icon ? <View css={styled.loading}>{Icon}</View> : null}
          <Text tagName="span" css={styled.text}>
            {children}
          </Text>
        </>
      );
    };

    const renderButton = () => {
      if (!!href) {
        return (
          <View tagName="a" ref={ref as Ref<HTMLAnchorElement>} href={href} rel="noopener noreferrer" target={`_${target}`} {...props}>
            {renderChildren()}
          </View>
        );
      }
      return (
        <View tagName="button" ref={ref as Ref<HTMLButtonElement>} type={type} {...props}>
          {renderChildren()}
        </View>
      );
    };

    if (tooltip) {
      return <Tooltip {...tooltip}>{renderButton()}</Tooltip>;
    }

    return renderButton();
  },
);

export default memo(Button);
