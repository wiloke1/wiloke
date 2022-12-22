import { css, Theme } from 'wiloke-react-core';

export const container = css`
  debug: StackNavigator-container;
  position: relative;
  overflow: hidden;
  width: 100%;
  height: 100%;
`;

export const item = ({ colors }: Theme) => css`
  debug: StackNavigator-item;
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 9;
  background-color: ${colors.light};
`;

export const anim = (start: string, end: string, duration: number) => css`
  debug: StackNavigator-animIn;
  will-change: animation;
  animation-duration: ${duration}ms;
  animation-fill-mode: both;
  animation-timing-function: ease;
  animation-name: {
    0% {
      transform: translateX(${start});
    }
    100% {
      transform: translateX(${end});
    }
  }
`;

export const underlay = (active: boolean, underlayColor: string, duration: number) => css`
  debug: StackNavigator-underlay;
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background-color: ${underlayColor};
  pointer-events: none;
  opacity: ${active ? '1' : '0'};
  transition: all ${duration}ms ease;
`;
