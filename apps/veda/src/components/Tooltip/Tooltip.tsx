import Portal from 'components/Portal';
import { useMeasure } from 'hooks/useMeasure';
import { FC, useState } from 'react';
import { View, ViewProps } from 'wiloke-react-core';
import { classNames } from 'wiloke-react-core/utils';
import * as styles from './styles';

export interface TooltipProps
  extends Pick<ViewProps, 'wilokeStyles' | 'tachyons' | 'className' | 'style' | 'css' | 'onClick' | 'onMouseEnter' | 'onMouseLeave'> {
  /** Vị trí hiển thị tooltip */
  placement?: 'top' | 'right' | 'bottom' | 'left';
  /** Text hiển thị khi hover vào tooltip */
  text: string;
  /** Bật chức năng portal */
  portal?: boolean;
}

const Tooltip: FC<TooltipProps> = ({ text, placement = 'top', className, portal = false, css, children, ...rest }) => {
  const [visible, setVisible] = useState(false);
  const { top, left, width, height, setMeasure } = useMeasure();

  if (!portal) {
    return (
      <View
        {...rest}
        data-tooltip={text}
        css={[styles.container, styles.tooltip, styles.placementTooltip(placement), css]}
        className={classNames(className)}
      >
        {children}
      </View>
    );
  }

  const renderTooltip = () => {
    if (!text) {
      return null;
    }
    return <View css={[styles.tooltipText, styles.placementTooltipText(placement, top, left, width, height)]}>{text}</View>;
  };

  return (
    <View
      {...rest}
      css={[styles.container, css]}
      onMouseEnter={event => {
        setMeasure(event);
        setVisible(true);
        rest.onMouseEnter?.(event);
      }}
      onMouseLeave={event => {
        setVisible(false);
        rest.onMouseLeave?.(event);
      }}
    >
      <Portal visible={visible}>{renderTooltip()}</Portal>
      {children}
    </View>
  );
};

export default Tooltip;
