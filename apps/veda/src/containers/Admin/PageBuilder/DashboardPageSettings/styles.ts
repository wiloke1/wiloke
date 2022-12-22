import { css, Styles, Theme } from 'wiloke-react-core';

export const body: Styles = {
  display: 'flex',
  height: '100%',
};

export const navItem = ({ colors }: Theme): Styles => ({
  borderBottom: `1px solid ${colors.gray3}`,
});

export const content: Styles = {
  width: '100%',
};

export const settingBtn = ({ colors }: Theme): Styles => ({
  width: '36px',
  height: '36px',
  borderRadius: '4px',
  border: `1px solid ${colors.gray3}`,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  marginLeft: '10px',
  cursor: 'pointer',
});

export const tr: Styles = {
  display: 'flex',
  alignItems: 'center',
};

export const tdItem: Styles = {
  width: '100%',
  padding: '0 6px',
};

export const tdAction: Styles = {
  padding: '0 6px',
  marginBottom: '12px',
};

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
