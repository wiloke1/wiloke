import { css, Theme } from 'wiloke-react-core';

export const container = ({ colors }: Theme) => css`
  position: absolute;
  z-index: 9999;
  border: 2px solid ${colors.primary};
  pointer-events: none;
`;

export const buttonContainer = ({ colors }: Theme) => css`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: ${colors.primary};
  color: ${colors.light};
  pointer-events: auto;
  cursor: pointer;
  font-size: 16px;
`;

export const button = css`
  position: absolute;
  left: 0;
  right: 0;
  margin: auto;
`;

export const before = css`
  top: -15px;
`;
export const after = css`
  bottom: -15px;
`;

export const tooltip = css`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
`;
