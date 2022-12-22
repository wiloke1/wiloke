import ImagePlaceholder from 'components/ImagePlaceholder';
import { FC } from 'react';
import { animatedLoading } from 'styles/loading';
import { Space, View } from 'wiloke-react-core';
import * as styles from './styles';

export const AddonsCardLoading: FC = () => {
  return (
    <View
      radius={6}
      borderColor="gray3"
      borderWidth={1}
      borderStyle="solid"
      css={{
        opacity: '1',
        overflow: 'hidden',
        position: 'relative',
      }}
    >
      <ImagePlaceholder aspectRatio={16 / 9} />
      <View css={{ height: '100%', padding: '15px' }} backgroundColor="light">
        <View css={styles.image}>
          <View radius={4} backgroundColor="gray3" width={44} height={44} css={{ ...animatedLoading }} />
        </View>
        <Space size={8} />
        <View height={12} backgroundColor="gray3" width={30} radius={4} css={{ ...animatedLoading }} />
        <Space size={5} />
        <View height={20} backgroundColor="gray3" width={100} radius={4} css={{ ...animatedLoading }} />
        <Space size={5} />
        <View height={12} backgroundColor="gray3" width={130} radius={4} css={{ ...animatedLoading }} />
        <Space size={20} />
        <View height={12} backgroundColor="gray3" width={30} radius={4} css={{ ...animatedLoading }} />
      </View>
    </View>
  );
};
