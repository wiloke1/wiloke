import { FC } from 'react';
import { View, ViewProps } from 'wiloke-react-core';

export interface BoxCenterProps extends ViewProps {
  size?: number;
}

const BoxCenter: FC<BoxCenterProps> = ({ size = 30, css, children, ...rest }) => {
  return (
    <View
      {...rest}
      css={[
        {
          width: `${size}px`,
          height: `${size}px`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
        },
        css,
      ]}
    >
      {children}
    </View>
  );
};

export default BoxCenter;
