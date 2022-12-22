import { css, Styles } from 'wiloke-react-core';

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

export const sectionTableHeader: Styles = {
  className: 'section-table-header',
  marginBottom: '10px',
  marginTop: '20px',
  padding: '0 15px',
  alignItems: 'center',
  flexWrap: 'nowrap',
};

export const checkbox: Styles = {
  className: 'page-checkbox',
  padding: '0px 15px',
  width: '50px',
};

export const name: Styles = {
  className: 'page-name',
  padding: '0',
  flex: 1,
  marginLeft: '80px',
  minWidth: '85px',
};

export const lastUpdate: Styles = {
  className: 'page-date',
  padding: '0px 15px',
  width: '250px',
};

export const status: Styles = {
  className: 'page-status',
  display: 'flex',
  alignItems: 'center',
  padding: '0px 15px',
  width: '250px',
};
