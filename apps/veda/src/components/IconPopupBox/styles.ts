import { css, Theme } from 'wiloke-react-core';

export const container = (size: number) => ({ colors }: Theme) => css`
  debug: FieldBox_container;
  width: ${size}px;
  height: ${size}px;
  border-color: ${colors.gray3};

  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;
