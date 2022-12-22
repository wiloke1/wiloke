import { css, Styles, Theme } from 'wiloke-react-core';

export const dragItem = ({ colors }: Theme): Styles => ({
  border: `1px solid ${colors.gray3}`,
  borderRadius: '6px',
  backgroundColor: colors.light,
});

export const label = css`
  display: flex;
  align-items: center;
  cursor: pointer;
`;
