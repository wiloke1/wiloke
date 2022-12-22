import Modal, { ModalProps } from 'antd/lib/modal';
import { FC } from 'react';
import { FontAwesome, useStyleSheet, useTheme } from 'wiloke-react-core';
import { classNames } from 'wiloke-react-core/utils';
import * as style from './styles';

export interface ModalAntdProps extends ModalProps {}

const ModalAntd: FC<ModalAntdProps> = ({ ...rest }) => {
  const { colors } = useTheme();
  const { styles } = useStyleSheet(colors);

  return (
    <Modal
      {...rest}
      closeIcon={
        <FontAwesome
          type="fal"
          name="times"
          size={20}
          color="gray9"
          css={{
            lineHeight: '24px',
          }}
        />
      }
      className={classNames(styles(style.container), rest.className)}
    />
  );
};

export { ModalAntd };
