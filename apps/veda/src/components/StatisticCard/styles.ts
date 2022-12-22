import { css, Theme } from 'wiloke-react-core';

export const title = css`
  debug: StatisticBox-title;
  cursor: pointer;
  user-select: none;
  padding: 0;
  flex: 1;
  min-width: 100px;

  display: flex;
  align-items: center;
`;

export const checkbox = css`
  debug: StatisticBox-checkbox;
  padding: 0 15px;
  width: 50px;
`;

export const popover = css`
  debug: Popover-container;

  :global {
    .ant-popover-arrow-content {
      display: none;
    }
  }
`;

export const dropdown = ({ colors }: Theme) => css`
  debug: StatisticBox-dropdown;
  width: 30px;
  height: 30px;
  border: 1px solid ${colors.gray2};
  border-radius: 6px;

  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;

export const itemContainer = ({ colors }: Theme) => css`
  debug: StatisticBox-container;
  padding: 20px 15px;
  margin-bottom: 0px;
  border-bottom: 1px solid ${colors.gray3};
`;

export const imageContainer = css`
  debug: StatisticBox-image;
  overflow: hidden;
  width: 70px;
  height: 50px;
  margin-right: 10px;
  cursor: pointer;
`;

export const date = css`
  debug: StatisticBox-date;
  padding: 0px 15px;
  width: 250px;
`;

export const status = css`
  debug: StatisticBox-status;
  display: flex;
  align-items: center;
  padding: 0px 15px;
  width: 250px;
`;

export const actions = css`
  debug: StatisticBox-actions;
  width: 250px;
  display: flex;
  align-items: center;
  padding: 0px 15px;
  justify-content: flex-end;
`;

export const rightItem = css`
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
