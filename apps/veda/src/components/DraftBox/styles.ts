import { css, Theme } from 'wiloke-react-core';

export const container = ({ colors }: Theme) => css`
  border-radius: 6px;
  position: relative;
  overflow: hidden;
  padding: 15px;
  border-bottom: 1px solid ${colors.gray2};
  cursor: pointer;
`;

export const dropdown = ({ colors }: Theme) => css`
  debug: DraftBox-dropdown;
  width: 35px;
  height: 35px;
  border: 1px solid ${colors.gray4};
  border-radius: 6px;

  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;

export const item = css`
  debug: DraftBox-item;
  display: flex;
`;

export const itemContent = css`
  debug: DraftBox-item__content;
  flex: 1;
  display: flex;
  align-items: center;
`;

export const actions = css`
  debug: DraftBox-item-actions;
  display: flex;
  align-items: center;
`;

export const imageContainer = css`
  debug: DraftBox-image_container;
  width: 70px;
  height: 60px;
  max-height: 60px;
  margin-right: 15px;
  overflow: hidden;
`;

export const overlay = ({ colors }: Theme) => css`
  debug: DraftBox-overlay;
  background-color: rgba(${colors.rgbGray5}, 0.6);
  position: absolute;
  inset: 0;
  z-index: 2;
  border-radius: 6px;
`;
