import useOuterClick from 'hooks/useOuterClick';
import { FC, ReactNode, useRef } from 'react';
import { createPortal } from 'react-dom';
import { View, ViewProps } from 'wiloke-react-core';
import { createPortalWrapper } from './createPortalWrapper';

export interface PortalProps {
  overlay?: ReactNode;
  visible: boolean;
  containerCss?: ViewProps['css'];
  bodyCss?: ViewProps['css'];
  onOutsideClick?: () => void;
}

const portalWrapperEl = createPortalWrapper();
document.body.appendChild(portalWrapperEl);

const Portal: FC<PortalProps> = ({ visible, overlay, onOutsideClick, children, containerCss, bodyCss }) => {
  const childRef = useRef<HTMLDivElement | null>(null);

  useOuterClick(
    childRef.current,
    () => {
      if (visible) {
        onOutsideClick?.();
      }
    },
    [visible],
  );

  const renderContent = (
    <View css={containerCss}>
      {overlay}
      <View ref={childRef} css={bodyCss}>
        {visible && children}
      </View>
    </View>
  );

  return createPortal(renderContent, portalWrapperEl);
};

export default Portal;
