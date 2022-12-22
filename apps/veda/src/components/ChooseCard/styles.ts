import { css, Theme } from 'wiloke-react-core';

export const container = (isRequesting: boolean) => ({ colors }: Theme) => css`
  debug: ChooseCard_container;
  position: relative;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${colors.gray1};
  overflow: hidden;
  border-radius: 4px;

  & * {
    pointer-events: ${isRequesting ? 'none' : undefined};
  }

  & img {
    height: 100% !important;
    width: 100% !important;
    object-fit: contain;
    border-radius: 6px;
    z-index: 2;
    max-width: 100%;
  }
`;

export const editBtn = css`
  debug: ChooseCard_editBtn;
  padding: 4px 8px;
  border-radius: 4px;
  text-align: center;
`;

export const blank = css`
  debug: ChooseCard_blank;
  padding: 64px 16px;
  text-align: center;
`;

export const overWithText = css`
  debug: ChooseCard_overWithText;
  padding: 16px;
  z-index: 4;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  position: absolute;
  cursor: pointer;
`;

export const contentWithText = css`
  debug: ChooseCard_contentWithText;
  display: flex;
  align-items: flex-end;
  justify-content: center;
  width: 100%;
  height: 100%;
`;

export const overBasic = css`
  debug: ChooseCard_overBasic;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  position: absolute;
  cursor: pointer;
  z-index: 2;
`;

export const loadingOverlay = ({ colors }: Theme) => css`
  debug: ChooseCard__loadingOverlay;
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

export const xIcon = ({ colors }: Theme) => css`
  debug: ChooseCard_xIcon;
  position: absolute;
  top: 8px;
  right: 8px;
  background-color: ${colors.dark};
  width: 18px;
  height: 18px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 20;
  cursor: pointer;

  & i {
    color: ${colors.gray3} !important;
  }
`;

export const image = css`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
  background-repeat: no-repeat;
  background-size: cover;
`;

export const removeIcon = (haveDelete: boolean) => ({ colors }: Theme) => css`
  debug: ChooseCard_removeIcon;
  position: absolute;
  top: ${haveDelete ? '36px' : '8px'};
  right: 8px;
  background-color: ${colors.dark};
  width: 18px;
  height: 18px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 20;
  cursor: pointer;

  & i {
    color: ${colors.gray3} !important;
  }
`;
