import { css, Theme } from 'wiloke-react-core';

export type Size = 'small' | 'large';

export const container = (size: Size) => ({ colors }: Theme) => css`
  debug: UploadPlaceholder-container;
  display: flex;
  flex-direction: ${size === 'small' ? 'row' : 'column'};
  align-items: center;
  justify-content: center;
  padding: ${size === 'small' ? '8px 16px' : '20px'};
  border: 2px dashed ${colors.gray3};
  border-radius: ${size === 'small' ? 4 : 6}px;
  :global {
    .ant-upload.ant-upload-drag .ant-upload {
      padding: 0;
    }
  }
`;

export const uploadDesc = (size: Size) => css`
  debug: UploadPlaceholder-uploadDesc;
  margin-left: 8px;
  margin-top: ${size === 'large' ? '10px' : undefined};
  line-height: 1.2;
  text-align: left !important;
`;
