import { css, Theme } from 'wiloke-react-core';

export const browser = ({ colors }: Theme) => css`
  debug: LayoutSettingSkeleton_browser;
  border-radius: 4px;
  border: 1px solid ${colors.gray3};
  box-shadow: 0 10px 15px rgba(${colors.rgbGray9}, 0.1);
  user-select: none;
  overflow: hidden;
`;

export const header = ({ colors }: Theme) => css`
  debug: LayoutSettingSkeleton_header;
  border-bottom: 1px solid ${colors.gray3};
  padding: 5px 20%;
  background-color: ${colors.gray1};
`;

export const text = ({ colors }: Theme) => css`
  debug: LayoutSettingSkeleton_text;
  padding: 5px;
  text-align: center;
  color: ${colors.gray6};
  font-size: 12px;
`;

export const item = css`
  debug: LayoutSettingSkeleton_item;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;
