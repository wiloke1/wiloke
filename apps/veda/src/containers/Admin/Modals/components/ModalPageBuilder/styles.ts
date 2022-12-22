import { css, Theme } from 'wiloke-react-core';

export const hiddenContent = css`
  debug: ModalCreate-content;
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  z-index: 9;
  overflow: hidden;
`;

export const btnBack = css`
  display: flex;
  align-items: center;
  cursor: pointer;

  margin-right: 10px;
`;

export const container = css`
  debug: ModalCreate-container;
  padding: 20px;
  position: relative;
  height: 100%;
  overflow: hidden;
`;

export const buttonActive = (isActive: boolean) => ({ colors }: Theme) => css`
  border: 1px solid ${isActive ? colors.primary : colors.gray3};
  background-color: rgba(${isActive ? colors.rgbPrimary : colors.light}, ${isActive ? 0.2 : 1});
  border-radius: 6px;
  color: ${colors.gray8};
  min-width: 100px;
  justify-content: flex-start;
  padding: 10px;
`;

export const fakeCheckbox = (isActive: boolean) => ({ colors }: Theme) => css`
  width: 13px;
  height: 13px;
  border: 2px solid ${isActive ? colors.primary : colors.gray3};
  border-radius: 50%;
  background-color: ${colors.light};
`;
