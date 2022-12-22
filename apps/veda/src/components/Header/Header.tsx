import Button from 'components/Button';
import { FC, ReactNode } from 'react';
import { Sticky, View } from 'wiloke-react-core';
import * as styles from './styles';

export interface HeaderProps {
  onCancel?: () => void;
  onOk?: () => void;
  cancelText?: string;
  okText?: string;
  Left: ReactNode;
}

const Header: FC<HeaderProps> = ({ onCancel, onOk, cancelText = 'Cancel', okText = 'Ok', Left }) => {
  return (
    <Sticky>
      <View css={styles.header}>
        <View>{Left}</View>
        <View>
          <View css={styles.right}>
            <View css={{ marginRight: '10px' }}>
              <Button
                backgroundColor="gray2"
                color="gray8"
                size="medium"
                radius={10}
                fontFamily="secondary"
                css={{ fontWeight: 500 }}
                onClick={onCancel}
              >
                {cancelText}
              </Button>
            </View>
            <View>
              <Button backgroundColor="primary" size="medium" radius={10} fontFamily="secondary" css={{ fontWeight: 500 }} onClick={onOk}>
                {okText}
              </Button>
            </View>
          </View>
        </View>
      </View>
    </Sticky>
  );
};

export default Header;
