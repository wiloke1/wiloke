import { css, Theme } from 'wiloke-react-core';
import { RgbColors } from 'wiloke-react-core/dist/types/RgbColors';

export const container = css`
  debug: Navigation-container;
  display: flex;
  width: 100%;
  flex-direction: column;
  padding: 10px;
  overflow: hidden;
`;

export const title = ({ colors }: Theme) => css`
  text-transform: uppercase;
  letter-spacing: 1px;
  padding-bottom: 10px;
  font-weight: 600;
  color: ${colors.gray6};
`;

export const link = ({ fonts, colors }: Theme) => css`
  debug: Navigation-link;
  text-decoration: none;
  display: flex;
  align-items: center;
  width: 100%;
  font-size: 13px;
  padding: 10px;
  border-radius: 4px;
  font-family: ${fonts.secondary};
  margin-bottom: 3px;
  transition: 0.3s;
  justify-content: space-between;

  &:hover {
    background-color: rgba(${colors.rgbGray1}, 1);
  }
`;

export const flex = css`
  width: 100%;
  display: flex;
`;

export const active = (color: RgbColors) => css`
  debug: Navigation-active-link;
  background-color: rgba(${color.rgbGray2}, 1);
  color: rgb(${color.rgbPrimary});
`;

export const parent = css`
  position: relative;
  display: block;
`;

export const icon = css`
  margin-right: 10px;
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const num = ({ colors }: Theme) => css`
  min-width: 22px;
  height: 18px;
  line-height: 18px;
  text-align: center;
  border-radius: 11px;
  color: ${colors.gray8};
  font-size: 12px;
`;
