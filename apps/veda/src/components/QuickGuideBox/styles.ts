import { ColorNames, css, Theme } from 'wiloke-react-core';

export const container = css`
  debug: QuickGuideBox-container;

  position: relative;
  display: flex;
  align-items: center;
  padding: 5px;
  margin-bottom: 10px;
`;

export const icon = css`
  debug: QuickGuideBox-icon-container;
  width: 48px;
  height: 48px;
  border-radius: 6px;

  display: flex;
  align-items: center;
  justify-content: center;

  position: relative;
  overflow: hidden;
  z-index: 1;
`;

export const iconOverlay = (color: ColorNames) => ({ colors }: Theme) => css`
  debug: QuickGuideBox-icon-overlay;
  position: absolute;
  inset: 0;
  z-index: 0;

  background-color: ${colors[color]};
  opacity: 0.15;
`;

export const link = css`
  debug: QuickGuideBox-link;

  position: absolute;
  inset: 0;
`;

export const title = css`
  text-transform: uppercase;
  font-weight: 500;
`;
