import { Styles, Theme } from 'wiloke-react-core';

export const container = (active: boolean) => ({ colors }: Theme): Styles => ({
  className: 'AddonListItem-container',
  border: `1px solid ${active ? colors.primary : colors.gray3}`,
  padding: '10px',
  borderRadius: '6px',
  display: 'flex',
  marginBottom: '5px',
  backgroundColor: colors.light,
  cursor: 'pointer',
});

export const image: Styles = {
  className: 'AddonListItem-image',
  width: '40px',
  marginRight: '10px',
  flexShrink: 0,
};

export const right: Styles = {
  className: 'AddonListItem-right',
  marginRight: '-5px',
};
