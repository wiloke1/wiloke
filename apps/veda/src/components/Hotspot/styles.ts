import { css, Theme } from 'wiloke-react-core';

export const container = ({ colors }: Theme) => css`
  debug: Hotspot-container;
  position: relative;
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background-color: ${colors.quaternary};
`;

export const inner = css`
  debug: Hotspot-inner;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 500%;
  height: 500%;
  border-radius: 50%;
  background-color: inherit;
  animation-duration: 1.5s;
  animation-iteration-count: infinite;
  animation-timing-function: linear;
  animation-name: {
    0% {
      transform: translate(-50%, -50%) scale(0);
      opacity: 1;
    }
    80%,
    100% {
      transform: translate(-50%, -50%) scale(1);
      opacity: 0;
    }
  }
`;
