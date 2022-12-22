import { View, Text, Space } from 'wiloke-react-core';
import { animatedLoading } from 'styles/loading';
import * as styles from './styles';

export const SectionCardLoading = () => {
  return (
    <View css={styles.container}>
      <View css={styles.featureContainer}>
        <View css={styles.featureContent}></View>
        <View css={{ ...animatedLoading, paddingTop: `${56.25}%` }} backgroundColor="gray3" />
      </View>

      <View css={styles.body}>
        <View css={styles.footer}>
          <Text radius={4} width={100} height={14} backgroundColor="gray3" css={animatedLoading}></Text>
          <View>
            <Text radius={4} width={60} height={14} backgroundColor="gray3" size={10} css={animatedLoading}></Text>
          </View>
        </View>
        <Space size={5} />
        <Text radius={4} width={140} height={16} backgroundColor="gray3" css={animatedLoading}></Text>
        <Space size={5} />
        <View css={styles.footer}>
          <Text radius={4} width={60} height={14} backgroundColor="gray3" css={animatedLoading}></Text>
          <View>
            <Text radius={4} width={60} height={14} backgroundColor="gray3" size={10} css={animatedLoading}></Text>
          </View>
        </View>
      </View>
    </View>
  );
};
