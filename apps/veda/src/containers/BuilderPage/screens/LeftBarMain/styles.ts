import { css, Styles, Theme } from 'wiloke-react-core';

export const container: Styles = {
  height: '100%',
};

export const content: Styles = {
  className: 'LeftBarMain-content',
  padding: '10px 10px 0',
};

export const footer = ({ colors }: Theme): Styles => ({
  padding: '10px',
  borderTop: `1px solid ${colors.gray3}`,
  backgroundColor: colors.light,
  display: 'flex',
  alignItems: 'center',
});

export const btn: Styles = {
  height: '46px',
};

export const clearBtn: Styles = {
  height: '46px',
  width: '46px',
  marginLeft: '10px',
  flexShrink: 0,
};

export const header = ({ colors }: Theme): Styles => ({
  height: '54px',
  borderBottom: `1px solid ${colors.gray3}`,
  backgroundColor: colors.light,
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '10px',
});

export const headerLeft = css`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const back = ({ colors }: Theme) => css`
  border: 1px solid ${colors.gray3};
  border-radius: 4px;
`;
