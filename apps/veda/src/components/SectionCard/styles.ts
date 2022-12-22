import { Styles, Theme } from 'wiloke-react-core';

export const container = ({ colors }: Theme): Styles => ({
  className: 'SectionCard-container',
  borderRadius: '6px',
  border: `1px solid ${colors.gray3}`,
  overflow: 'hidden',
  backgroundColor: colors.light,
});

export const body: Styles = {
  className: 'SectionCard-body',
  padding: '10px',
};

export const image = ({ colors }: Theme): Styles => ({
  className: 'SectionCard-image',
  position: 'relative',
  width: '50px',
  marginTop: '-46px',
  padding: '2px',
  backgroundColor: colors.light,
  border: `1px solid ${colors.gray3}`,
  borderRadius: '6px',
  zIndex: 3,
});

export const type = ({ colors }: Theme): Styles => ({
  className: 'SectionCard-type',
  textTransform: 'uppercase',
  fontSize: '10px',
  letterSpacing: '0.1em',
  fontWeight: 500,
  backgroundColor: colors.gray2,
  display: 'inline-block',
  padding: '2px',
  borderRadius: '2px',
});

export const text: Styles = {
  className: 'SectionCard-text',
  lineHeight: '1.4em',
  height: '2.8em',
};

export const footer: Styles = {
  className: 'SectionCard-footer',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
};

export const by: Styles = {
  className: 'SectionCard-by',
  marginRight: '4px',
  fontStyle: 'italic',
};

export const head: Styles = {
  className: 'SectionCard-head',
  position: 'relative',
  display: 'flex',
  justifyContent: 'space-between',
  width: '100%',
  alignItems: 'center',
};

export const save: Styles = {
  className: 'SectionCard-save',
  position: 'absolute',
  top: '2px',
  right: '2px',
};

export const featureContent = ({ colors }: Theme): Styles => ({
  className: 'SectionCard-content',
  position: 'absolute',
  top: 0,
  left: 0,
  zIndex: 10,
  width: '100%',
  height: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexDirection: 'column',
  backgroundColor: `rgba(${colors.rgbLight}, 0.6)`,
});

export const featureContainer: Styles = {
  className: 'SectionCard-feature',
  position: 'relative',
  overflow: 'hidden',
  cursor: 'pointer',
};

export const button = (disabled: boolean): Styles => ({
  className: 'SectionCard-button',
  opacity: disabled ? 0.6 : 1,
  cursor: disabled ? 'not-allowed' : 'pointer',
  fontWeight: 500,
});
