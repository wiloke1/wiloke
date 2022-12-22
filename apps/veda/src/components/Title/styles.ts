import { Styles } from 'wiloke-react-core';

export const container = (hasRight: boolean): Styles => {
  if (hasRight) {
    return {
      className: 'Title_container',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      width: '100%',
    };
  }
  return {
    className: 'Title_container',
  };
};

export const item = (hasText: boolean): Styles => ({
  className: 'Title_item',
  display: 'flex',
  alignItems: hasText ? 'flex-start' : 'center',
});
