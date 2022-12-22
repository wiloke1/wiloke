import { useEffect } from 'react';
import { useRef } from 'react';
import { FC } from 'react';
import { View, ViewProps } from 'wiloke-react-core';

export interface SizerProps extends ViewProps {
  getSize: (width: number, height: number) => void;
}

const Sizer: FC<SizerProps> = ({ getSize, ...rest }) => {
  const sizerRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (sizerRef.current) {
      getSize(sizerRef.current.offsetWidth, sizerRef.current.offsetHeight);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <View {...rest} ref={sizerRef} />;
};

export default Sizer;
