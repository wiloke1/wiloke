import { Colors, css, Theme } from 'wiloke-react-core';

export const overlay = (colors: Colors) => css`
  min-width: 150px !important;
  padding: 6px 0;
  border-radius: 6px;
  background-color: ${colors.light};
  border: 1px solid ${colors.gray3};
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
