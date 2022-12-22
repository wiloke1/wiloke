import { css, Theme } from 'wiloke-react-core';

export const selectedItem = ({ colors }: Theme) => css`
  height: 150px;
  width: 100%;
  padding: 10px;
  position: absolute;
  bottom: 0px;
  left: 0px;
  border-top: 1px solid ${colors.gray3};
`;

export const createLink = ({ colors }: Theme) => css`
  margin-top: 10px;
  padding: 10px;
  display: inline-block;
  display: flex;
  align-items: center;
  height: 46px;
  width: 100%;
  background-color: ${colors.light};
  border-radius: 4px;
  justify-content: space-between;
`;

export const icon = css`
  border-radius: 4px;
  width: 30px;
  height: 30px;
  max-height: 30px;
  margin-right: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const filter = css`
  debug: BlogPicker-filter;
  display: flex;
  align-items: center;
  width: 100%;
  column-gap: 8px;
`;

export const refreshIcon = ({ colors }: Theme) => css`
  debug: BlogPicker-refresh-icon;

  width: 44px;
  height: 44px;
  background-color: ${colors.light};
  border: 1px solid ${colors.gray3};
  border-radius: 6px;

  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;
