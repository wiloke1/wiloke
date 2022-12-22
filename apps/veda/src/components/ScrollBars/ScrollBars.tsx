import useDelay from 'hooks/useDelay';
import { ComponentType, MutableRefObject, useEffect, useRef } from 'react';
import { FC } from 'react';
import Scrollbars, { ScrollbarProps } from 'react-custom-scrollbars';
import { ViewProps, withStyles } from 'wiloke-react-core';

export interface ScrollBarsProps extends ScrollbarProps {
  innerRef?: MutableRefObject<Scrollbars | null>;
  css?: ViewProps['css'];
  scrollTo?: number;
}

const ScrollbarsWithStyles = withStyles<any, ScrollbarProps>(Scrollbars as ComponentType);

const ScrollBars: FC<ScrollBarsProps> = ({ css, children, hideTracksWhenNotNeeded = true, scrollTo, ...rest }) => {
  const [delayScrollTop, cancelDelayScrollTop] = useDelay();
  const scrollBarsRef = useRef<Scrollbars | null>(null);

  useEffect(() => {
    const handleAsync = async () => {
      if (typeof scrollTo !== 'undefined') {
        await delayScrollTop();
        scrollBarsRef.current?.scrollTop(scrollTo);
      }
    };
    handleAsync();
    return () => {
      cancelDelayScrollTop();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [scrollTo]);

  return (
    <ScrollbarsWithStyles {...(rest as any)} ref={scrollBarsRef} css={css} hideTracksWhenNotNeeded={hideTracksWhenNotNeeded}>
      {children}
    </ScrollbarsWithStyles>
  );
};

export default ScrollBars;
