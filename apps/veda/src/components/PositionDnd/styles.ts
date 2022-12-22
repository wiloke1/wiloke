import { css, Theme } from 'wiloke-react-core';

export const container = ({ colors }: Theme) => css`
  position: relative;
  z-index: 9;
  overflow: hidden;
  width: 200px;
  height: 200px;
  border: 2px solid ${colors.gray4};
  user-select: none;
  &:after {
    content: '';
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 1;
  }
`;

export const thumb = ({ colors }: Theme) => css`
  position: absolute;
  z-index: -1;
  width: 20px;
  height: 20px;
  background-color: ${colors.primary};
  border-radius: 50%;
  pointer-events: none;
  transform: translate(-50%, -50%);
`;
