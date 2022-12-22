import { FC } from 'react';
import { css, View, ViewProps } from 'wiloke-react-core';

export interface AnimateFlickerProps extends ViewProps {}

const styles = {
  container: css`
    animation-duration: 1.5s;
    animation-iteration-count: infinite;
    animation-timing-function: ease;
    animation-name: {
      50% {
        opacity: 0.3;
      }
    }
  `,
};

export const AnimateFlicker: FC<AnimateFlickerProps> = ({ ...rest }) => {
  return <View {...rest} css={[styles.container, rest.css]} />;
};
