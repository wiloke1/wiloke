import { css } from 'wiloke-react-core';

export const container = css`
  debug: ModalCreate-container;
  padding: 20px;
  position: relative;
  height: 100%;
  overflow: hidden;
`;

export const hiddenContent = css`
  debug: ModalCreate__drawer-content;
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  z-index: 9;
  overflow: hidden;
  /* padding: 10px; */
`;

export const btnBack = css`
  display: flex;
  align-items: center;
  cursor: pointer;

  margin-right: 10px;
`;
