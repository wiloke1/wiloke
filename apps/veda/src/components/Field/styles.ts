import { css, Theme } from 'wiloke-react-core';

export const container = css`
  debug: Field-container;
  margin-bottom: 12px;
  position: relative;
`;

export const inner = css`
  debug: Field-inner;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const label = css`
  debug: Field-label;
  line-height: 1.35;
  margin-top: 0px;
  font-weight: 500;
`;

export const note = ({ colors }: Theme) => css`
  debug: Field-note;
  position: relative;
  z-index: 9;
  font-size: 13px;
  line-height: 1.4;
  margin: 0px;
  margin-left: 8px !important;
  color: ${colors.gray6};
`;

export const popover = (top: number, left: number, maxWidth: number) => ({ colors }: Theme) => css`
  debug: Field-popover;
  position: absolute;
  top: ${top - 10}px;
  left: ${left - 20}px;
  font-size: 13px;
  z-index: 999;
  transform: translateY(-100%);
  background-color: ${colors.gray8};
  color: ${colors.gray2};
  border-radius: 6px;
  padding: 8px 15px;
  max-width: ${maxWidth}px;
  &:after {
    content: '';
    position: absolute;
    left: 18px;
    bottom: 1px;
    transform: translateY(100%);
    width: 0;
    height: 0;
    border: solid transparent;
    border-width: 7px 8px;
    border-top-color: ${colors.gray8};
  }
`;

export const description = css`
  debug: Field-description;
  font-size: 13px;
  font-style: italic;
`;
