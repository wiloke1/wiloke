import { css, Theme } from 'wiloke-react-core';

const isMac = navigator.userAgent.includes('Mac OS X');

export const container = ({ colors }: Theme) => {
  if (isMac) {
    return css`
      overflow-x: hidden;
      overflow-y: auto;
    `;
  }
  return css`
    overflow-x: hidden;
    overflow-y: auto;
    /* width */
    &::-webkit-scrollbar {
      width: 5px;
    }
    /* Track */
    &::-webkit-scrollbar-track {
      background-color: rgba(${colors.gray9}, 0.1);
    }
    /* Handle */
    &::-webkit-scrollbar-thumb {
      background-color: rgba(${colors.gray9}, 0.2);
      border-radius: 5px;
      background-clip: padding-box;
    }
  `;
};
