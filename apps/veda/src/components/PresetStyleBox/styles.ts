import { css, Theme } from 'wiloke-react-core';

export const container = css`
  debug: PresetStyleBox-container;
  padding: 20px 20px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
`;

export const title = css`
  font-weight: bold;
  font-size: 18px;
  line-height: 27px;
`;

export const line = css`
  margin-top: 5px;
  margin-bottom: 30px;
`;

export const font = ({ colors }: Theme) => css`
  border-bottom: 1px solid ${colors.gray3};
  padding: 5px 0;

  display: flex;
  justify-content: space-between;
`;

export const colorGrid = css`
  padding-right: 0;
  display: grid;
  gap: 20px 10px;
  grid-template-columns: 1.75fr 1.25fr repeat(2, 0.5fr);
  grid-template-rows: 90px 55px;
`;

export const innerBox = css`
  justify-content: space-between;
  margin: 0;
`;

export const spaceBox = css`
  margin-bottom: 20px;
`;

export const innerBoxText = css`
  font-weight: 600;
  padding-left: 0;
`;

export const fontContainer = css`
  padding-right: 0;
`;

export const overlay = ({ colors }: Theme) => css`
  position: absolute;
  inset: 0;
  z-index: 1;
  background-color: rgba(${colors.rgbDark}, 0.6);
`;

export const loading = css`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 2;
`;

export const titleContainer = css`
  display: flex;
  justify-content: space-between;
`;
