import { Styles, Theme } from 'wiloke-react-core';

export const container = ({ colors }: Theme): Styles => ({
  backgroundColor: colors.light,
  padding: '15px',
  border: `1px solid ${colors.gray3}`,
  borderRadius: '6px',
  fontFamily: 'arial,sans-serif',
});

export const link: Styles = {
  color: '#202124',
  fontStyle: 'normal',
  fontSize: '14px',
  lineHeight: '1.3',
};

export const title: Styles = {
  color: '#1a0dab',
  fontSize: '20px',
};

export const description: Styles = {
  color: '#4d5156',
  fontSize: '14px',
  lineHeight: '1.58',
};
