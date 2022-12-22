import { css } from 'wiloke-react-core';

export const select = css`
  debug: FontField_select;
  .ant-select-selection-item {
    padding: 0 !important;
    font-size: 20px;
  }
  .ant-select-selection-search-input {
    height: 100% !important;
    padding: 0 !important;
    font-size: 20px !important;
  }
`;

export const dropdown = css`
  debug: FontField_dropdown;
  .ant-select-item {
    padding: 0 12px !important;
    height: 35px !important;
  }
`;

export const font = css`
  debug: FontField_font;
  height: 100%;
  display: flex;
  align-items: center;
  * {
    font-family: sans-serif;
  }
`;

export const loadingIcon = css`
  debug: FontField_loadingIcon;
  margin-left: 8px;
`;
