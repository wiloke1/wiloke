import { css, Theme, ThemeColors } from 'wiloke-react-core';

export const wrapper = css`
  position: relative;
`;

export const uploadAntdContainer = (colors: ThemeColors) => css`
  debug: UploadAntd_uploadAntdContainer;
  display: block;

  & ~ .ant-upload-list.ant-upload-list-picture {
    .ant-upload-list-item-done {
      border-color: ${colors.success};
    }
  }
`;

export const myUploadContainer = (colors: ThemeColors) => css`
  debug: UploadAntd_uploadAntdContainer;
  display: block;
  height: 100%;
  position: relative;

  & ~ .ant-upload-list.ant-upload-list-picture {
    .ant-upload-list-item-done {
      border-color: ${colors.success};
    }
  }
  .ant-upload.ant-upload-select {
    display: block !important;
    width: 100%;
    height: 100%;
  }
`;

export const container = css`
  debug: UploadAntd_container;
  padding: 35px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  cursor: pointer;
`;

export const title = css`
  debug: UploadAntd_title;
  font-weight: 500;
  font-size: 18px;
  margin-bottom: 17px;
`;

export const uploadIcon = css`
  debug: UploadAntd_uploadIcon;
`;
export const desc = css`
  debug: UploadAntd_desc;
`;

export const overlay = ({ colors }: Theme) => css`
  debug: UploadAntd_overlay;
  position: absolute;
  inset: 0;
  z-index: 2;
  background-color: rgba(${colors.rgbPrimary}, 0.5);

  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
`;
