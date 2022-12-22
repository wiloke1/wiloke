import { css, Theme } from 'wiloke-react-core';

export const overlay = ({ colors }: Theme) => css`
  min-width: 150px !important;
  padding: 6px 0;
  border-radius: 6px;
  background-color: ${colors.light};
  border: 1px solid ${colors.gray3};
  box-shadow: 0 5px 10px rgba(${colors.rgbGray8}, 0.2);
`;

export const item = ({ colors }: Theme) => css`
  display: flex;
  align-items: center;
  color: ${colors.gray8};
  font-size: 14px;
  padding: 7px 12px;
  cursor: pointer;
  &:hover {
    background-color: ${colors.gray2};
  }
`;

export const icon = css`
  margin-right: 5px;
  width: 16px;
`;

export const divider = ({ colors }: Theme) => css`
  background-color: ${colors.gray3};
  height: 1px;
  margin: 3px 0;
`;
