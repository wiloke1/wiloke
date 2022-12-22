import { css } from 'wiloke-react-core';

export const container = css`
  debug: SelectTagsContainer;
  div.ant-select-selector {
    padding-top: 6px !important;
    padding-bottom: 6px !important;
    border-radius: 4px !important;
  }

  .ant-select-multiple .ant-select-selection-item {
    margin-top: 0 !important;
    margin-bottom: 0 !important;
    padding-top: 2px !important;
    padding-bottom: 2px !important;
  }

  .ant-select-selection-item {
    margin-top: 1px !important;
    margin-bottom: 1px !important;
    padding-top: 2px !important;
    padding-bottom: 2px !important;
  }
`;

export const inputTagsContainer = css`
  debug: InputTagsContainer;

  position: relative;
  cursor: text;
  position: relative;
  transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
  padding: 0 4px;
  overflow: hidden;
`;

export const badgeContainer = css`
  debug: InputTags_badgeContainer;
  display: flex;
  flex-wrap: wrap;
`;

export const badge = css`
  debug: InputTags_badge;
  padding: 3px 8px;
  margin: 2px;
  min-width: 50px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  flex: none;
  align-self: center;
  max-width: 100%;
`;

export const badgeTitle = css`
  debug: InputTags_badgeTitle;
  flex: 1;
  margin-right: 4px;
`;

export const tagInner = css`
  debug: InputTags_tagInner;

  position: relative;
  display: flex;
  flex: auto;
  flex-wrap: wrap;
  max-width: 100%;
  min-height: 42px;
`;

export const inputContainer = css`
  debug: InputTags_inputContainer;

  margin-inline-start: 0;
  position: relative;
  max-width: 100%;
  align-self: center;
`;

export const input = css`
  debug: InputTags_input;
  margin: 0;
  padding: 0;
  background: transparent;
  border: none;
  outline: none;
  appearance: none;

  width: 100%;
  min-width: 4.1px;
  cursor: auto;
`;
