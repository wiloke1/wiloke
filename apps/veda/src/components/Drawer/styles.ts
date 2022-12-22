import { css, Theme } from 'wiloke-react-core';

export const container = css`
  debug: Drawer_container;
  position: relative;
  backface-visibility: hidden;
  transform: translateZ(0);
`;

export const drawer = (active: boolean, hasDrawerParentEl: boolean, delay: number, duration: number) => ({ colors }: Theme) => css`
  debug: Drawer_drawer;
  position: absolute;
  top: 0;
  left: 0;
  width: calc(100% + 100px);
  height: 100%;
  z-index: 1;
  padding-right: 100px;
  visibility: ${active ? 'visible' : 'hidden'};
  backface-visibility: hidden;
  transform: perspective(1px) translateX(${active ? (hasDrawerParentEl ? '40px' : '0px') : '100%'}) translateZ(0);
  transition: all ${duration}ms ease ${delay}ms;
  box-shadow: 0 0 100px ${active ? `rgba(${colors.rgbGray9}, 0.5)` : 'transparent'};
`;

export const content = css`
  debug: Drawer-content;
  width: 100%;
  height: 100%;
`;

export const child = (active: boolean, delay: number, duration: number) => css`
  debug: Drawer_child;
  will-change: transform;
  transform: translateX(${active ? -40 : 0}px);
  transition: all ${duration + 50}ms ease ${delay}ms;
  overflow: hidden;
`;
