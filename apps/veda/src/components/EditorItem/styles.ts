import { css, Theme } from 'wiloke-react-core';

export const container = css`
  debug: EditorItem_container;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 100%;
  user-select: none;
`;

export const left = css`
  debug: EditorItem_left;
  display: flex;
  align-items: center;
  width: 70%;
`;

export const textWrap = css`
  debug: EditorItem_textWrap;
  flex-grow: 1;
  margin-left: 5px;
`;

export const right = css`
  debug: EditorItem_right;
  display: flex;
  flex-direction: row;
  align-items: center;
`;

export const title = ({ colors, fonts }: Theme) => css`
  debug: EditorItem_title;
  font-family: ${fonts.secondary};
  font-size: 14px;
  font-weight: 500;
  line-height: 1.2;
  color: ${colors.gray8};
`;
