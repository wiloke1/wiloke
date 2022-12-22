import { FC } from 'react';
import { LineAwesome, Styles, Text, Theme, View } from 'wiloke-react-core';
import useOnLine from './useOnLine';

const containerStyles = ({ colors }: Theme): Styles => ({
  position: 'fixed',
  inset: 0,
  zIndex: 9999999,
  backgroundColor: colors.light,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  flexDirection: 'column',
});

const textStyles: Styles = {
  textAlign: 'center',
};

const OfflineOverlay: FC = () => {
  const onLine = useOnLine();

  if (onLine) {
    return null;
  }

  return (
    <View css={containerStyles}>
      <LineAwesome name="wifi" size={150} color="gray3" />
      <Text size={20} css={textStyles} fontFamily="secondary">
        You are offline
      </Text>
    </View>
  );
};

export default OfflineOverlay;
