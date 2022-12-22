import { FC } from 'react';
import { View } from 'wiloke-react-core';

export const Card: FC = () => {
  return <View css={({ colors }) => ({ border: `5px solid ${colors.primary}` })}>Card 1</View>;
};
