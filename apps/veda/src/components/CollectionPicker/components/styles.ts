import { css, Theme } from 'wiloke-react-core';

export const selectedItem = ({ colors }: Theme) => css`
  debug: CollectionPicker-selected-item;
  height: 150px;
  width: 100%;
  padding: 10px;
  position: absolute;
  bottom: 0px;
  left: 0px;
  border-top: 1px solid ${colors.gray3};
`;

export const createLink = ({ colors }: Theme) => css`
  debug: CollectionPicker-create-link;
  margin-top: 8px;
  padding: 10px;
  display: inline-block;
  display: flex;
  align-items: center;
  height: 46px;
  width: 100%;
  background-color: ${colors.light};
  border-radius: 4px;
  justify-content: space-between;
`;

export const icon = css`
  debug: CollectionPicker-icon;
  border-radius: 4px;
  width: 30px;
  height: 30px;
  max-height: 30px;
  margin-right: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const container = css`
  debug: CollectionPicker-container;
  height: 100%;
  position: relative;
`;

export const header = css`
  debug: CollectionPicker-header;
  padding: 10px 10px 0px 10px;
`;

export const filter = css`
  debug: CollectionPicker-filter;
  display: flex;
  align-items: center;
  width: 100%;
  column-gap: 8px;
`;

export const refreshIcon = ({ colors }: Theme) => css`
  debug: CollectionPicker-refresh-icon;

  width: 44px;
  height: 44px;
  background-color: ${colors.light};
  border: 1px solid ${colors.gray3};
  border-radius: 6px;

  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;
