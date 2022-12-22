import { css, Theme } from 'wiloke-react-core';

export const container = css`
  debug: StepModal-container;
`;

export const item = css`
  debug: StepModal-item;
  padding: 0 10px;
  text-align: center;
`;

export const title = css`
  debug: StepModal-item__title;
  padding: 10px 0;
`;

export const dots = css`
  debug: StepModal-dots;
  display: flex;
  justify-content: center;
  padding: 15px 0;
`;

export const dot = css`
  debug: StepModal-dot;
  margin: 0 3px;
  width: 8px;
  height: 8px;
  cursor: pointer;
`;

export const groupButton = css`
  debug: StepModal-groupButton;
  display: flex;
  margin-top: 20px;
`;

export const nextButton = ({ colors }: Theme) => css`
  font-weight: 500;
  user-select: none;
  background-color: ${colors.primary};
  border-radius: 4px;
`;

export const prevButton = ({ colors }: Theme) => css`
  font-weight: 500;
  user-select: none;
  margin-right: 10px;
  background-color: ${colors.gray2};
  border-radius: 4px;
  color: ${colors.gray8};
`;
