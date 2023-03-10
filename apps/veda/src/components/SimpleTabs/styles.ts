import { Styles, Theme } from 'wiloke-react-core';

export const tab: Styles = {
  className: 'SimpleTabs-tab',
  display: 'flex',
  alignItems: 'center',
};

export const item = (active: boolean, highlight: boolean) => ({ colors, fonts }: Theme): Styles => ({
  className: 'SimpleTabs-item',
  position: 'relative',
  zIndex: 1,
  cursor: 'pointer',
  fontFamily: fonts.secondary,
  fontWeight: 500,
  ...(highlight
    ? {
        color: active ? colors.light : colors.gray8,
        padding: '10px 30px',
        '&:after': {
          content: '""',
          position: 'absolute',
          zIndex: -1,
          top: '50%',
          left: '50%',
          width: '80%',
          height: '70%',
          transform: 'translate(-50%, -50%)',
          backgroundColor: active ? colors.secondary : colors.gray2,
          borderRadius: '4px',
        },
      }
    : {
        padding: '10px 20px',
        borderBottom: `2px solid ${active ? colors.primary : colors.transparent}`,
        color: active ? colors.primary : colors.gray8,
      }),
});
