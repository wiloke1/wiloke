import { css, Theme } from 'wiloke-react-core';

export const container = ({ colors }: Theme) => css`
  border: 2px dashed ${colors.gray3};
  background-color: ${colors.light};
  cursor: pointer;

  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  border-radius: 4px;
  padding: 30px;
  text-align: center;
`;
