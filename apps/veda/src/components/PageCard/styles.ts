import { css, Theme } from 'wiloke-react-core';

export const container = () => css`
  debug: PageCard-container;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
  cursor: pointer;
  user-select: none;
  position: relative;
`;

export const containerStyle2 = css`
  debug: PageCard-container2;
  justify-content: space-between;
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 10px;
  cursor: pointer;
  user-select: none;
  position: relative;
`;

export const containerStyle3 = css`
  debug: PageCard-container3;
  justify-content: space-between;
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 10px;
  cursor: pointer;
  user-select: none;
  position: relative;
`;

export const iconContainer = ({ colors }: Theme) => css`
  debug: PageCard-iconContainer;
  padding: 4px 8px;
  background-color: ${colors.gray2};
  border-radius: 10px;
  margin-bottom: 12px;
  margin-right: 0;
  width: 50px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const title = (isActive: boolean) => ({ colors }: Theme) => css`
  color: ${isActive ? colors.primary : colors.gray8};
  display: flex;
  align-items: center;
`;

export const isActive = (isActive: boolean) => ({ colors }: Theme) => {
  if (isActive === true) {
    return css`
      debug: PageCard-active;
      border-color: ${colors.primary} !important;
    `;
  }

  return css``;
};

export const loading = css`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2;
`;

export const overlay = ({ colors }: Theme) => css`
  z-index: 1;
  background-color: rgba(${colors.rgbLight}, 0.3);
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`;

export const icon = ({ colors }: Theme) => css`
  background-color: ${colors.gray2};
  color: ${colors.gray8};
`;

export const iconStyle3 = css`
  border-radius: 4px;
  width: 30px;
  height: 30px;
  max-height: 30px;
  overflow: hidden;
`;

export const bodyStyle3 = css`
  display: flex;
  align-items: center;
  flex: 1;
`;

export const titleStyle3 = css`
  display: flex;
  align-items: center;
  margin-left: 8px;
  flex: 1;
  padding-right: 4px;
`;

export const activeStyle3 = css`
  width: 23px;
  height: 23px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
`;
