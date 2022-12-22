import { css, Theme } from 'wiloke-react-core';

export const button = ({ colors }: Theme) => css`
  background-color: rgba(${colors.rgbGray5}, 0.2);
  margin-bottom: 10px;
  padding: 13px 100px;
`;

export const buttonFlex = css`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const custom = css`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 10px;
`;

export const dropdown = ({ colors }: Theme) => css`
  height: 35px;
  color: ${colors.gray8};
  border-radius: 4px;
  padding: 0 8px;

  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  margin-left: 5px;
`;

export const draftThemeLatest = ({ colors, fonts }: Theme) => css`
  debug: DraftTheme_latest;
  font-size: 12px;
  color: ${colors.secondary};
  border: 1px solid ${colors.secondary};
  border-radius: 4px;
  padding: 0 8px;
  margin-left: 10px;
  font-weight: 500;
  font-family: ${fonts.secondary};
`;
