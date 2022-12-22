import { css, Theme } from 'wiloke-react-core';
import 'emoji-mart/css/emoji-mart.css';

export const container = ({ colors }: Theme) => css`
  debug: EmoijPickerWrap_container;
  position: relative;
  .emoji-mart {
    position: absolute;
    top: 100%;
    right: 0;
    z-index: 10;
    transform: translateY(5px);
  }
  .emoji-mart-title-label {
    display: none;
  }
  .emoji-mart-anchor-selected {
    color: ${colors.primary} !important;
  }
  .emoji-mart-anchor-bar {
    background-color: ${colors.primary} !important;
  }
`;

export const icon = css`
  debug: EmoijPickerWrap_icon;
  position: absolute;
  top: 50%;
  right: 15px;
  z-index: 9;
  transform: translateY(-50%);
  cursor: pointer;
`;
