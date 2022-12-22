import { css, Theme } from 'wiloke-react-core';

export const container = ({ colors }: Theme) => css`
  debug: RecommendCard-container;
  padding: 20px;
  border-radius: 6px;
  background-color: ${colors.light};
  box-shadow: 0px 21px 79px rgba(${colors.rgbDark}, 0.08);
  /* border: 1px solid ${colors.gray2}; */
  display: flex;
  margin-bottom: 20px;
  min-height: 110px;
  flex-wrap: wrap;
`;

export const appImage = css`
  debug: RecommendCard-app-image;
  margin-right: 12px;
`;

export const img = css`
  width: 36px;
  height: 36px;
  border-radius: 6px;
  overflow: hidden;
`;

export const content = css`
  debug: RecommendCard-content;
  flex: 1;
`;

export const starsContainer = css`
  display: flex;
  align-items: center;
`;

export const stars = css`
  debug: RecommendCard-stars;
  display: flex;
  margin-right: 5px;
`;

export const action = css`
  debug: RecommendCard-action;

  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

export const descriptionContainer = css`
  max-width: 250px;
`;

export const description = css`
  font-size: 13px;
  line-height: 1.15;
  font-weight: 400;
  margin-bottom: 4px;
`;

export const title = css`
  font-weight: 500;
`;

export const users = css`
  display: inline-flex;
`;

export const userInner = ({ colors }: Theme) => css`
  border: 1px solid ${colors.light};
  width: 30px;
  height: 30px;
  border-radius: 50%;
  overflow: hidden;

  &:not(:last-child) {
    margin-right: -20px;
  }
`;

export const userInnerExpand = css`
  display: flex;
  align-items: center;
  justify-content: center;
`;
