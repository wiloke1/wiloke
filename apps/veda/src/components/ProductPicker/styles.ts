import { css, Theme } from 'wiloke-react-core';

export const product = css`
  debug: ProductPicker_product;
  cursor: pointer;
  overflow: hidden;
`;

export const input = css`
  debug: ProductPicker_input;
  flex: 1;
`;

export const title = css`
  debug: ProductPicker_title;
  padding: 4px;
`;

export const active = css`
  debug: ProductPicker_active;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

export const icon = css`
  debug: ProductPicker_icon;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

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
  margin-top: 8px;
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

export const filter = css`
  debug: ProductPicker-filter;
  display: flex;
  align-items: center;
  width: 100%;
  column-gap: 8px;
`;

export const refreshIcon = ({ colors }: Theme) => css`
  debug: ProductPicker-refresh-icon;

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
