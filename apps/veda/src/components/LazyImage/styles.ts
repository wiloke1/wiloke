import { css, Styles } from 'wiloke-react-core';

export const container: Styles = {
  className: 'LazyImage-container',
  position: 'relative',
  overflow: 'hidden',
};

export const image = css`
  debug: LazyImage-background_image;
  background-position: 50% 50%;
  background-repeat: no-repeat;
`;
