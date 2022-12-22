import { Colors, css } from 'wiloke-react-core';

export const container = (colors: Colors) => css`
  debug: ModalAtnd-Container;

  .ant-modal-content {
    border-radius: 16px;
    overflow: hidden;
  }

  .ant-modal-header {
    padding-top: 20px;
    padding-bottom: 20px;
  }

  .ant-modal-close {
    top: -7px;
  }

  .ant-modal-close-x {
    width: 40px;
    height: 40px;
  }

  .ant-modal-title {
    font-size: 18px;
    line-height: 27px;
    color: ${colors.gray9};
    font-weight: 600;
  }

  .ant-modal-footer {
    padding-top: 16px;
    padding-bottom: 16px;
  }

  .ant-btn {
    font-size: 14px;
    line-height: 21px;
    font-weight: 500;
    padding: 11px 18px;
    border-radius: 10px;
    height: auto;
    border: unset;

    background-color: ${colors.gray2};
    color: ${colors.gray8};

    &:hover {
      color: ${colors.gray8};
    }
  }

  .ant-btn-primary {
    background-color: ${colors.gray8};
    color: ${colors.light};
    margin-left: 10px;

    &:hover {
      color: ${colors.light};
    }
  }
`;
