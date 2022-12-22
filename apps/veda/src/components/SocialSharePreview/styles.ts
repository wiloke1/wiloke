import { Styles, Theme } from 'wiloke-react-core';

export const container = ({ colors }: Theme): Styles => ({
  backgroundColor: colors.light,
  padding: '15px',
  border: `1px solid ${colors.gray3}`,
  borderRadius: '6px',
  fontFamily: 'arial,sans-serif',
});

export const link = ({ colors }: Theme): Styles => ({
  color: colors.gray8,
  fontSize: '14px',
  lineHeight: '1.3',
});

export const title = ({ colors }: Theme): Styles => ({
  color: colors.primary,
  fontSize: '18px',
});

export const description = ({ colors }: Theme): Styles => ({
  color: colors.gray7,
  fontSize: '14px',
  lineHeight: '1.58',
});
