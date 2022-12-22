import { css, Theme } from 'wiloke-react-core';

export const container = ({ colors }: Theme) => css`
  padding: 20px;
  display: flex;
  align-items: stretch;
  cursor: pointer;
  margin-bottom: 10px;

  &:hover {
    background-color: rgba(${colors.rgbPrimary}, 0.1);
    border-color: ${colors.primary};
  }
`;

export const dot = ({ colors }: Theme) => css`
  color: ${colors.danger};
`;

export const avatar = css`
  margin: 0 15px;
`;
