import { css, Theme } from 'wiloke-react-core';

export const container = ({ colors }: Theme) => css`
  debug: badge-container;
  background-color: ${colors.gray3};
  padding: 4px 8px;
  display: inline-flex;
  align-items: center;
  column-gap: 4px;
  border-radius: 4px;
`;

export const text = (active: boolean) => ({ colors }: Theme) => css`
  color: ${active ? colors.primary : colors.gray8};
`;

export const withImageContainer = ({ colors }: Theme) => css`
  debug: BadgeWithImage-container;
  padding: 5px;
  display: flex;
  align-items: center;
  column-gap: 4px;
  border-radius: 4px;
  background-color: ${colors.gray2};
`;

export const imageContainer = css`
  debug: BadgeWithImage-image;
  width: 25px;
  height: 25px;
  max-height: 25px;
  margin-right: 5px;
  overflow: hidden;
  border-radius: 4px;
`;

export const withImageTitle = css`
  debug: BadgeWithImage-text;
  margin-right: 5px;
  max-width: 70px;
  font-size: 13px;
`;

export const deleteIcon = css`
  debug: BadgeWithImage-delete-icon;
  cursor: pointer;
`;
