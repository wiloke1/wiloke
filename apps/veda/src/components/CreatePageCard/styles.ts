import { css, Theme } from 'wiloke-react-core';

export const blankContainer = ({ colors }: Theme) => css`
  debug: CreatePageCard-container--blank;
  overflow: hidden;
  position: relative;
  padding-top: 127%;
  cursor: pointer;

  &:hover {
    box-shadow: 0 8px 12px rgb(0 0 0 / 6%);
    .create-page-icon {
      color: ${colors.primary};
    }
  }
`;

export const imageContainer = css`
  debug: CreatePageCard-container--image;
  overflow: hidden;
  position: relative;
  height: 100%;
`;

export const imageContent = css`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
  display: flex;
  justify-content: center;
`;

export const blankContent = css`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  text-align: center;
`;

export const defaultContainer = css`
  debug: CreatePageCard-container--default;
  width: 100%;
  height: 100%;
  position: relative;
  overflow: hidden;
`;

export const includeHeader = (includeHeader: boolean) => css`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  margin-top: ${includeHeader ? '0' : '-50px'};
  padding: 15px 8px;
  text-align: center;
`;
export const includeFooter = (includeHeader: boolean) => css`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  margin-bottom: ${includeHeader ? '0' : '-50px'};
  padding: 15px 8px;
  text-align: center;
`;
