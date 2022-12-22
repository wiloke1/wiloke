import { Styles, Theme } from 'wiloke-react-core';

export const container = (hide: boolean) => ({ colors }: Theme): Styles => ({
  className: 'AddonsCard-container',
  borderRadius: '6px',
  border: `1px solid ${colors.gray3}`,
  overflow: 'hidden',
  backgroundColor: colors.light,
  opacity: hide ? '0.6' : '1',
});

export const body: Styles = {
  className: 'AddonsCard-body',
  padding: '10px 15px 5px',
};

export const image = ({ colors }: Theme): Styles => ({
  className: 'AddonsCard-image',
  position: 'relative',
  width: '50px',
  marginTop: '-46px',
  padding: '2px',
  backgroundColor: colors.light,
  border: `1px solid ${colors.gray3}`,
  borderRadius: '6px',
  zIndex: 11,
});

export const type: Styles = {
  className: 'AddonsCard-type',
  textTransform: 'uppercase',
  fontSize: '10px',
  letterSpacing: '0.1em',
  fontWeight: 500,
};

export const text: Styles = {
  className: 'AddonsCard-text',
  lineHeight: '1.4em',
  height: '2.8em',
};

export const footer: Styles = {
  className: 'AddonsCard-footer',
  padding: '0 15px 15px',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
};

export const by: Styles = {
  className: 'AddonsCard-by',
  marginRight: '4px',
  fontStyle: 'italic',
};

export const head: Styles = {
  className: 'AddonsCard-head',
  position: 'relative',
  paddingRight: '20px',
};

export const save: Styles = {
  className: 'AddonsCard-save',
  position: 'absolute',
  top: '2px',
  right: '2px',
};

export const featureContent = ({ colors }: Theme): Styles => ({
  className: 'AddonsCard-content',
  position: 'absolute',
  top: 0,
  left: 0,
  zIndex: 11,
  width: '100%',
  height: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexDirection: 'column',
  backgroundColor: `rgba(${colors.rgbLight}, 0.6)`,
});

export const featureButton = (disabled: boolean): Styles => ({
  className: 'AddonsCard-button',
  opacity: disabled ? 0.6 : 1,
  cursor: disabled ? 'not-allowed' : 'pointer',
  fontWeight: 500,
  minWidth: '100px',
});

export const featureContainer: Styles = {
  className: 'AddonsCard-fearure',
  position: 'relative',
  overflow: 'hidden',
};
