import { css, Styles, Theme } from 'wiloke-react-core';

export const container = ({ colors }: Theme): Styles => ({
  className: 'ImageTextCard-container',
  borderRadius: '6px',
  border: `1px solid ${colors.gray3}`,
  overflow: 'hidden',
  backgroundColor: colors.light,
});

export const body: Styles = {
  className: 'ImageTextCard-body',
  position: 'relative',
  cursor: 'pointer',
};

export const content = ({ colors }: Theme): Styles => ({
  className: 'ImageTextCard-content',
  position: 'absolute',
  top: 0,
  left: 0,
  zIndex: 1,
  width: '100%',
  height: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: `rgba(${colors.rgbLight}, 0.6)`,
});

export const button = (disabled: boolean): Styles => ({
  className: 'ImageTextCard-button',
  opacity: disabled ? 0.6 : 1,
  cursor: disabled ? 'not-allowed' : 'pointer',
  fontWeight: 500,
});

export const footer: Styles = {
  className: 'ImageTextCard-footer',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '10px 15px',
  textAlign: 'left',
};

export const containerStyle2 = ({ colors }: Theme) => {
  return css`
    debug: ImageTextCard2-container;
    border-radius: 6px;
    overflow: hidden;
    background-color: ${colors.light};
    transition: 0.3s;

    &:hover {
      box-shadow: 0px 6px 15px rgba(${colors.rgbDark}, 0.1);
    }
    &:hover img {
      object-position: bottom center;
    }
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      object-position: top center;
      transition: all 2s ease-in-out;
    }
  `;
};

export const button2 = (disabled: boolean): Styles => ({
  className: 'ImageTextCard2-button',
  opacity: disabled ? 0.6 : 1,
  cursor: disabled ? 'not-allowed' : 'pointer',
  fontWeight: 500,
});

export const body2 = (): Styles => ({
  className: 'ImageTextCard2-body',
  position: 'relative',
  overflow: 'hidden',
});

export const content2 = ({ colors }: Theme): Styles => ({
  className: 'ImageTextCard2-content',
  position: 'absolute',
  top: 0,
  left: 0,
  zIndex: 1,
  width: '100%',
  height: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '0 25%',
  backgroundColor: `rgba(${colors.rgbDark}, 0.5)`,
  overflow: 'hidden',
});

export const container3 = (disable: boolean): Styles => ({
  className: 'ImageTextCard3-container',
  position: 'relative',
  cursor: disable ? 'not-allowed' : 'pointer',
  opacity: disable ? '0.6' : '1',
  padding: 0,
  borderRadius: '6px',
  overflow: 'hidden',
});

export const buttonAdd3 = ({ colors }: Theme): Styles => ({
  boxShadow: `0px 4px 5px rgba(${colors.rgbDark}, 0.25)`,
  position: 'absolute',
  left: '10px',
  top: '10px',
});

export const groupTitle: Styles = {
  paddingRight: '15px',
};

export const flexCenter: Styles = {
  display: 'flex',
  alignItems: 'center',
};

export const imageCardIcon1: Styles = {
  cursor: 'pointer',
  display: 'flex',
  alignItems: 'center',
};

export const animateWrapper = css`
  debug: image-wrapper;
  overflow: hidden;
  max-height: 320px;
  height: 320px;
  position: relative;
`;

export const imageCard2 = css`
  position: absolute;
  left: 0;
  top: 50%;
  transform: translateY(-50%);
  width: 100%;
`;
