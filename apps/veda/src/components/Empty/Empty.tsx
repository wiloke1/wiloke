import { Text, View } from 'wiloke-react-core';
import _ from 'lodash';
import { FC } from 'react';
import { memo } from 'react';

export interface EmptyProps {
  emoijSize?: number;
  textSize?: number;
  text?: string;
}

const errEmoij = ['(^_^)b', "(='X'=)", '(o^^)o', '(·.·)', '(o_o)/', '(>_<)', '(^Д^)/', '(^-^*)', '(≥o≤)'];

const Empty: FC<EmptyProps> = ({ emoijSize = 50, textSize = 14, text = 'No data' }) => {
  return (
    <View css={{ textAlign: 'center' }}>
      <Text color="gray4" size={emoijSize} fontFamily="secondary" css={{ fontWeight: 600 }}>
        {errEmoij[_.random(0, errEmoij.length - 1)]}
      </Text>
      <Text color="gray8" size={textSize}>
        {text}
      </Text>
    </View>
  );
};

export default memo(Empty);
