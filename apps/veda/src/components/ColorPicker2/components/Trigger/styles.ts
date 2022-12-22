import { css, Theme } from 'wiloke-react-core';

export const targetPicker = css`
  position: relative;
  z-index: 1;
  cursor: pointer;
  width: 42px;
  height: 20px;
`;

export const targetBackground = css`
  width: 100%;
  height: 100%;
  overflow: hidden;
  &:after {
    content: '';
    background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAMUlEQVQ4T2NkYGAQYcAP3uCTZhw1gGGYhAGBZIA/nYDCgBDAm9BGDWAAJyRCgLaBCAAgXwixzAS0pgAAAABJRU5ErkJggg==');
    position: absolute;
    background-repeat: repeat;
    background-size: auto;
    border-radius: inherit;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    z-index: -1;
  }
`;

export const box = css`
  height: 46px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const colorDetailsContainer = css`
  display: inherit;
  margin-left: 32px;
`;

export const colorDetails = ({ colors }: Theme) => css`
  font-size: 14px;
  color: ${colors.gray7};
`;
