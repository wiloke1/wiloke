import MyModal, { MyModalProps } from 'components/MyModal';
import { FC, ReactNode, useState } from 'react';
import { View } from 'wiloke-react-core';

type OnClose = () => void;

export interface ConfirmProps extends Omit<MyModalProps, 'onOk' | 'isVisible'> {
  title: string;
  message: ReactNode;
  disableClick?: boolean;
  onOk?: (onClose: OnClose) => void;
}

export const Confirm: FC<ConfirmProps> = ({ title, message, children, onCancel, onOk, isLoading, disableClick = false, ...rest }) => {
  const [visible, setVisible] = useState(false);

  return (
    <>
      <MyModal
        {...rest}
        depsHeightRecalculation={children}
        isLoading={isLoading}
        isVisible={visible}
        headerText={title}
        onCancel={() => {
          setVisible(false);
          onCancel?.();
        }}
        onOk={() => {
          onOk?.(() => setVisible(false));
        }}
      >
        {message}
      </MyModal>
      <View
        onClick={event => {
          event.stopPropagation();
          if (disableClick) {
            return;
          } else {
            setVisible(true);
          }
        }}
      >
        {children}
      </View>
    </>
  );
};
