import { css, Theme } from 'wiloke-react-core';

export const container = css`
  debug: MenuItem_container;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  user-select: none;
  padding: 10px;
`;

export const left = css`
  display: flex;
  align-items: center;
`;

export const right = css`
  display: flex;
  align-items: center;
`;

export const icon = (active: boolean) => ({ colors }: Theme) => css`
  debug: MenuItem_icon;
  color: ${active ? colors.primary : colors.gray8};
`;

export const label = (active: boolean) => ({ colors }: Theme) => css`
  debug: MenuItem_label;
  display: block;
  color: ${active ? colors.primary : colors.gray8};
  font-size: 14px;
  font-weight: 500;
  text-align: center;
  &:hover {
    color: ${colors.primary};
  }
`;

export const num = ({ colors }: Theme) => css`
  min-width: 22px;
  height: 18px;
  line-height: 18px;
  text-align: center;
  border-radius: 11px;
  color: ${colors.gray8};
  background-color: ${colors.gray2};
  font-size: 12px;
`;

export const numPlus = ({ colors }: Theme) => css`
  color: ${colors.light};
  background-color: ${colors.danger};
  margin-right: 5px;
`;
