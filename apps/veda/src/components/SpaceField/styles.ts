import { css, Theme } from 'wiloke-react-core';

export const container = ({ colors }: Theme) => css`
  position: relative;
  border: 1px solid ${colors.gray3};
  background-color: ${colors.light};
  border-radius: 6px;
  height: 140px;
`;

export const item = css`
  position: absolute;
  width: 80px;
`;

export const top = css`
  top: 10px;
  left: 50%;
  transform: translateX(-50%);
`;

export const right = css`
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
`;

export const bottom = css`
  bottom: 10px;
  left: 50%;
  transform: translateX(-50%);
`;

export const left = css`
  left: 10px;
  top: 50%;
  transform: translateY(-50%);
`;

export const center = ({ colors }: Theme) => css`
  position: absolute;
  margin: auto;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: ${colors.gray1};
  border: 1px solid ${colors.gray3};
  width: 30px;
  height: 30px;
  border-radius: 4px;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  &:hover {
    border-color: ${colors.gray3};
  }
`;

export const dragCoordinates = css`
  input {
    cursor: ew-resize !important;
  }
`;
