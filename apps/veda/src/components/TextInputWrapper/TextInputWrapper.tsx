import { FC } from 'react';
import { LineAwesome, View } from 'wiloke-react-core';
import * as styles from './styles';

export interface TextInputWrapperProps {
  searching?: boolean;
  onClear?: () => void;
}

const TextInputWrapper: FC<TextInputWrapperProps> = ({ onClear, children, searching }) => {
  return (
    <View css={styles.container}>
      {children}
      <View onClick={searching ? onClear : () => {}} css={[styles.close, searching ? { cursor: 'pointer' } : {}]}>
        <LineAwesome name={searching ? 'close' : 'search'} size={18} color="gray8" />
      </View>
    </View>
  );
};

export default TextInputWrapper;
