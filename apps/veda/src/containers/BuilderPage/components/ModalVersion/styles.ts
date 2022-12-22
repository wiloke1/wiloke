import { css, Theme } from 'wiloke-react-core';

export const table = ({ colors, fonts }: Theme) => css`
  debug: Changelog_table;
  width: 100%;
  border-spacing: 2px;
  border-color: ${colors.gray3};

  th,
  td {
    padding: 5px;
    font-family: ${fonts.secondary};
    text-align: left;
  }

  & :not(caption) > * > * {
    border-bottom: 1px solid ${colors.gray3};
  }

  td:first-child,
  th:first-child {
    border-right: 1px solid ${colors.gray3};
  }
`;

export const textCenter = css`
  text-align: center;
`;

export const heading = css`
  debug: Changelog_heading;
  margin-bottom: 10px;
`;

export const changelogBox = ({ colors }: Theme) => css`
  debug: Changelog_box;
  padding: 6px 8px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid ${colors.gray3};
`;

export const changelogContainer = ({ colors }: Theme) => css`
  debug: Changelog_container;
  border-radius: 6px;
  background-color: ${colors.gray1};
  border: 1px solid ${colors.gray3};

  .changelog-box:last-child {
    border-bottom: unset !important;
  }
`;

export const changelogLatest = ({ colors, fonts }: Theme) => css`
  debug: Changelog_latest;
  font-size: 12px;
  color: ${colors.secondary};
  border: 1px solid ${colors.secondary};
  border-radius: 4px;
  padding: 0 8px;
  margin-left: 10px;
  font-weight: 500;
  font-family: ${fonts.secondary};
`;

export const changesBox = css`
  debug: Changes_box;
  padding-left: 0px;
  cursor: auto;

  &:hover {
    border-right: unset;
  }
`;

export const changesBoxContainer = css`
  debug: Changes_box_container;
  column-gap: 8px;
  display: flex;
  flex-wrap: wrap;
`;
