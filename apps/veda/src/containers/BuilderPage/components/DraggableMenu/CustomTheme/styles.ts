import { css, Theme } from 'wiloke-react-core';

export const row = css`
  debug: CustomTheme-row;
  height: 100%;
  white-space: nowrap;
  display: flex;
  padding-left: 0px !important;
  border-radius: 6px;

  & > * {
    box-sizing: border-box;
  }
  & > div[draggable='true'] {
    width: 100%;
    border-radius: 6px;
  }
`;

export const rowLandingPad = ({ colors }: Theme) => css`
  debug: CustomTheme-rowLandingPad;
  border: none !important;
  box-shadow: none !important;
  outline: none !important;
  border-radius: 6px;
  overflow: hidden;
  background-color: rgba(${colors.rgbGray3}, 0.6) !important;

  * {
    opacity: 0 !important;
    background-color: rgba(${colors.rgbGray3}, 0.6) !important;
    overflow: hidden;
    border-radius: 6px;
  }
`;

export const rowCancelPad = ({ colors }: Theme) => css`
  debug: CustomTheme-rowCancelPad;
  border: none !important;
  box-shadow: none !important;
  outline: none !important;
  border-radius: 6px;
  overflow: hidden;
  background-color: rgba(${colors.rgbDanger}, 0.3);

  * {
    opacity: 0 !important;
    border: none !important;
    box-shadow: none !important;
    outline: none !important;
    border-radius: 6px;
    overflow: hidden;
    background-color: rgba(${colors.rgbDanger}, 0.3);
  }
`;

export const rowSearchMatch = css`
  debug: CustomTheme-rowSearchMatch;
  outline: solid 1px #0080ff;
`;

export const rowSearchFocus = css`
  debug: CustomTheme-rowSearchFocus;
  outline: solid 1px #fc6421;
`;

export const rowContents = css`
  debug: CustomTheme-rowContents;
  position: relative;
  height: 100%;
  padding: 0 10px 0;
  flex: 1 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: white;
`;

export const rowLabel = css`
  debug: CustomTheme-rowLabel;
  display: flex;
  align-items: center;
  height: 100%;
  flex: 0 1 auto;
  padding-right: 20px;
  width: 100%;
`;

export const rowTitle = css`
  debug: CustomTheme-rowTitle;
`;

export const rowTitleWithSubtitle = css`
  debug: CustomTheme-rowTitleWithSubtitle;
  display: block;
`;

export const rowSubtitle = css`
  debug: CustomTheme-rowSubtitle;
  font-size: 70%;
  line-height: 0.7;
  width: 95%;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  display: inline-block;
`;

export const rowToolbar = css`
  debug: CustomTheme-rowToolbar;
  flex: 0 1 auto;
  display: flex;
`;

export const toolbarButton = css`
  debug: CustomTheme-toolbarButton;
  display: inline-block;
  vertical-align: middle;
`;

export const button = css`
  debug: CustomTheme-button;
  width: 16px;
  height: 16px;
  cursor: pointer;

  &:focus {
    outline: 0;
  }
`;

export const collapseButton = css`
  debug: CustomTheme-collapseButton;
  background-color: red;
`;

export const expandButton = css`
  debug: CustomTheme-expandButton;
  background-color: black;
`;

export const lineChildren = css`
  debug: CustomTheme-lineChildren;
  height: 100%;
  display: inline-block;
  position: absolute;
`;

export const rowWrapper = css`
  debug: CustomTheme-rowWrapper;
  height: 100%;
  box-sizing: border-box;
  /* cursor: pointer; */
`;

export const rowWrapperDragDisabled = css`
  debug: CustomTheme-rowWrapperDragDisabled;
  cursor: default;
  &:hover {
    opacity: 1;
  }
`;
