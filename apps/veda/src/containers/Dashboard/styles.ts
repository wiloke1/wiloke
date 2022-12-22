import { css } from 'wiloke-react-core';

export const container = css`
  debug: Template-container;
`;

export const content = (hasSubmenu: boolean, disabledScroll: boolean) => css`
  debug: Template-content;
  width: ${hasSubmenu ? 'calc(100% - 370px)' : 'calc(100% - 91px)'};
  margin-left: ${hasSubmenu ? '370px' : '91px'};
  overflow: hidden;
  overflow-y: ${disabledScroll ? 'hidden' : 'auto'};
  height: 100vh;
  position: relative;
`;

export const sidebar = (hasSubmenu: boolean) => () => css`
  debug: Template-sidebar;
  position: fixed;
  width: ${hasSubmenu ? '370px' : '91px'};
  height: 100%;
  top: 0;
  left: 0;
  overflow: hidden;
`;
