import { css, Theme } from 'wiloke-react-core';

export const remove = ({ colors }: Theme) => css`
  width: 52px;
  height: 52px;
  line-height: 52px;
  text-align: center;
  border-radius: 10px;
  background-color: ${colors.gray2};
  color: ${colors.gray6};
  font-size: 22px;
  margin-left: 10px;
  cursor: pointer;
`;

export const header = ({ colors }: Theme) => css`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 10px 0;
  margin-bottom: 10px;
  background-color: ${colors.light};
`;

export const right = css`
  debug: WheelSetting_right;
  display: flex;
  flex-direction: row;
  justify-content: center;
`;
