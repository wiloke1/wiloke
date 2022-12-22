import { css, Theme } from 'wiloke-react-core';

export const renderBlogSuccessContainer = ({ colors, fonts }: Theme) => css`
  padding-right: 20px;
  height: 100%;
  width: 100%;

  .veda-collapse-container {
    border-radius: 4px;
    overflow: hidden;
    border: 1px solid ${colors.gray3};
    box-shadow: none;

    .ant-collapse-item {
      background-color: ${colors.gray1};

      &:last-child {
        border-bottom: none;
      }
    }
    .ant-collapse-header {
      cursor: default;
      font-family: ${fonts.primary};
      font-size: 18px;
      font-weight: 500;
    }
  }
`;
