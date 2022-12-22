import ScrollBars from 'components/ScrollBars';
import useBodyHeight from 'hooks/useBodyHeight';
import useDelay from 'hooks/useDelay';
import { FC, ReactNode, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { View, ViewProps } from 'wiloke-react-core';
import * as styles from './styles';

export type GoBack = () => void;
export type HeaderFn = (goBack: GoBack) => ReactNode;

export interface DrawerProps extends ViewProps {
  active: boolean;
  Content: ReactNode;
  Header?: ReactNode | HeaderFn;
  scrollBarAttrId?: string;
  scrollDisabled?: boolean;
  scrollTop?: number;
  drawerParentSelector?: string;
  drawerCss?: ViewProps['css'];
  delay?: number;
  height?: string;
  duration?: number;
}

const Drawer: FC<DrawerProps> = ({
  children,
  Content,
  Header,
  active,
  scrollBarAttrId: id,
  scrollDisabled = false,
  drawerParentSelector,
  drawerCss,
  delay = 50,
  height,
  scrollTop,
  duration = 100,
  css,
  ...rest
}) => {
  const bodyHeight = useBodyHeight();
  const headerRef = useRef<HTMLElement | null>(null);
  const [headerHeight, setHeaderHeight] = useState(0);
  const drawerParentEl: HTMLElement | null = !!drawerParentSelector ? document.querySelector(drawerParentSelector) : null;
  const [activeState, setActiveState] = useState(active);
  const [afterActive, setAfterActive] = useState(active);
  const [wait, cancel] = useDelay();

  useEffect(() => {
    setActiveState(active);
  }, [active]);

  useEffect(() => {
    const handleAsync = async () => {
      await wait(activeState ? 0 : duration);
      setAfterActive(activeState);
    };
    handleAsync();
    return () => {
      cancel();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeState]);

  useEffect(() => {
    if (!!headerRef.current && activeState) {
      setHeaderHeight(headerRef.current.offsetHeight);
    }
    if (!!drawerParentEl) {
      drawerParentEl.style.transition = !!duration ? `all ${duration}ms ease ${delay}ms` : 'none';
      drawerParentEl.style.transform = `translateX(${activeState ? -40 : 0}px)`;
      return () => {
        drawerParentEl.style.transform = `translateX(0px)`;
      };
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeState]);

  const handleBack = () => {
    setActiveState(false);
  };

  const renderDrawer = (
    <View css={[styles.drawer(activeState, !!drawerParentEl, delay, duration), drawerCss]}>
      <View ref={headerRef}>{typeof Header === 'function' ? (Header as HeaderFn)(handleBack) : Header}</View>
      {afterActive && (
        <View css={{ position: 'relative', height: `calc(100% - ${headerHeight}px)` }}>
          {scrollDisabled ? (
            Content
          ) : (
            <ScrollBars {...(!!id ? { id } : {})} scrollTo={scrollTop} css={styles.content} style={{ position: 'absolute' }}>
              {Content}
            </ScrollBars>
          )}
        </View>
      )}
    </View>
  );

  return (
    <View {...rest} css={[styles.container, css]} style={!!drawerParentEl ? {} : { height: height ?? bodyHeight }}>
      {!!drawerParentEl ? createPortal(renderDrawer, drawerParentEl) : renderDrawer}
      <View
        css={styles.child(!!drawerParentEl ? false : activeState, delay, duration)}
        style={!!drawerParentEl ? {} : { height: height ?? bodyHeight }}
      >
        {children}
      </View>
    </View>
  );
};

export default Drawer;
