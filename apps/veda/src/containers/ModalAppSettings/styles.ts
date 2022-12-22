import { css, Theme } from 'wiloke-react-core';

export const field = ({ colors }: Theme) => css`
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid ${colors.gray3};
  padding-top: 15px;
  padding-bottom: 15px;
  &:last-child {
    border-bottom: 0;
  }
`;

export const left = css`
  width: calc(100% - 150px);
  padding-right: 30px;
`;

export const right = css`
  width: 150px;
  display: flex;
  justify-content: flex-end;
`;
