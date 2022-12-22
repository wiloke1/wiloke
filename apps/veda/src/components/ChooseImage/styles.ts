import { css, Theme } from 'wiloke-react-core';
import transparentSvg from './transparency.png';

export const container = ({ colors }: Theme) => css`
  border-radius: 6px;
  overflow: hidden;
  border: 1px solid ${colors.gray3};
  cursor: pointer;
  position: relative;
`;

export const imageContainer = css`
  debug: ChooseImage_imageContainer;
  position: relative;
  padding-top: 56.25%;
  overflow: hidden;
  cursor: pointer;
  background-image: url(${transparentSvg});
  background-size: contain;

  img {
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    max-width: 100%;
    object-fit: contain;
  }
`;

export const input = css`
  debug: ChooseImage_input;
  flex: 1 1 55%;
  height: 38px;
`;

export const clearButton = css`
  debug: ChooseImage_clearButton;
  width: 23px;
  height: 23px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  cursor: pointer;

  position: absolute;
  top: 5px;
  right: 5px;
  z-index: 10;
`;

export const removeBackgroundButton = css`
  debug: ChooseImage_removeBackgroundButton;
  width: 23px;
  height: 23px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  cursor: pointer;

  position: absolute;
  top: 36px;
  right: 5px;
  z-index: 10;
`;

export const field = css`
  @media (max-width: 400px) {
    margin-bottom: 8px;
  }
`;

export const iconContainer = css`
  display: flex;
  width: 100%;
  align-items: center;
`;

export const uploadContainer = css`
  padding: 10px;
  height: 100%;
`;

export const loadingOverlay = ({ colors }: Theme) => css`
  debug: ChooseImage__loadingOverlay;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(${colors.rgbGray8}, 0.6);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 123111;
`;
