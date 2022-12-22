import { css } from 'wiloke-react-core';

export const rightItem = () => css`
  debug: StatisticBox__right-icon;
  width: 30px;
  height: 30px;
  border-radius: 6px;
  margin-right: 10px;

  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;

export const flex = css`
  debug: StatisticBox-flex;
  display: flex;
  padding: 0;
`;

export const sectionFilter = css`
  debug: section-filter;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;
