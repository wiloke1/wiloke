import { css, Styles, Theme } from 'wiloke-react-core';

export const container = css`
  debug: Textarea_container;
  position: relative;
`;

export const scrollbar: Styles = {
  '&::-webkit-scrollbar': {
    width: '6px',
  },
  '&::-webkit-scrollbar-track-piece': {
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
  },
  '&::-webkit-scrollbar-thumb:vertical': {
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    borderRadius: '5px',
  },
};

export const input = ({ colors }: Theme) => css`
  debug: Textarea_input;
  width: 100%;
  height: 90px;
  resize: vertical;
  border: 1px solid;
  border-color: ${colors.gray3};
  border-radius: 6px;
  padding: 10px 15px;
  color: ${colors.gray7};
  line-height: 1.6;
  &[disabled] {
    border-color: ${colors.gray2};
    background-color: ${colors.gray1};
    color: ${colors.gray5};
    cursor: not-allowed;
  }
`;

export const reset = css`
  display: flex;
  align-items: center;
  position: absolute;
  right: 15px;
  bottom: 0;
  padding: 2px 6px;
  border-radius: 6px;
  transform: translateY(50%);
  cursor: pointer;
`;
