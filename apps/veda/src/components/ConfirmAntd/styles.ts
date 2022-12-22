import { Colors, css, Theme } from 'wiloke-react-core';

export const container = ({ fonts }: Theme) => css`
  :global {
    .ant-popover-inner {
      border-radius: 6px;
    }

    .ant-popover-message-title {
      font-family: ${fonts.secondary};
      padding-left: 0px;
    }
  }
`;

export const cancelButton = (colors: Colors) => css`
  background-color: ${colors.gray2} !important;
  color: ${colors.gray8};
  border: none;
  outline: none;
  font-size: 13px;

  &:hover {
    background-color: ${colors.gray2};
    color: ${colors.gray8};
    border: none;
    outline: none;
  }
`;

export const confirmButton = (colors: Colors) => css`
  background-color: ${colors.primary} !important;
  color: ${colors.light};
  border: none;
  outline: none;
  font-size: 13px;

  &:hover {
    background-color: ${colors.primary};
    color: ${colors.light};
    border: none;
    outline: none;
  }
`;
