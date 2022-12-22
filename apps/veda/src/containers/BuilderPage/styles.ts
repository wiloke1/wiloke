import { css, Styles, Theme } from 'wiloke-react-core';

export const container: Styles = {
  className: 'BuilderPage_container',
  display: 'flex',
  height: '100vh',
  flexWrap: 'nowrap',
};

export const left = ({ colors }: Theme): Styles => ({
  className: 'BuilderPage_left',
  width: '301px',
  overflow: 'hidden',
  borderRight: `1px solid ${colors.gray3}`,
});

export const leftMain: Styles = {
  className: 'BuilderPage_leftMain',
  padding: '10px',
};

export const right = (codeVisible: boolean) => ({ colors }: Theme): Styles => ({
  className: 'BuilderPage_right',
  position: 'relative',
  width: '100%',
  flex: 1,
  backgroundColor: colors.gray2,
  ...(codeVisible ? { overflow: 'hidden' } : {}),
});

export const skeleton = css`
  cursor: progress;
  animation-duration: 1.5s;
  animation-iteration-count: infinite;
  animation-timing-function: ease;
  animation-name: {
    50% {
      opacity: 0.3;
    }
  }
`;
