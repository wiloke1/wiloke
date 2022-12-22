import IframePlaceholder from 'components/IframePlaceholder';
import { FC } from 'react';
import { Space, View } from 'wiloke-react-core';
import * as styles from './styles';

const BuilderPageSkeleton: FC = () => {
  const renderItemDrag = (opacity = '1') => (
    <View>
      <View
        css={({ colors }) => ({
          height: '48px',
          width: '100%',
          border: `1px solid ${colors.gray3}`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '10px',
          opacity,
        })}
        radius={6}
        backgroundColor="light"
      >
        <View css={{ height: '10px', width: '40%' }} radius={4} backgroundColor="gray2" />
        <View css={{ height: '20px', width: '20px' }} radius={4} backgroundColor="gray2" />
      </View>
      <Space size={2} />
    </View>
  );

  return (
    <View css={[styles.container, styles.skeleton]}>
      <View css={styles.left}>
        <View
          backgroundColor="light"
          css={({ colors }) => ({
            height: '54px',
            borderBottom: `1px solid ${colors.gray3}`,
            padding: '10px',
            display: 'flex',
            alignItems: 'center',
          })}
        >
          <View css={{ height: '10px', width: '50%' }} radius={4} backgroundColor="gray2" />
        </View>
        <View css={{ padding: '10px', height: 'calc(100% - 54px) !important' }} backgroundColor="gray2">
          <View css={{ height: '10px', width: '80px', marginBottom: '5px' }} radius={4} backgroundColor="gray3" />
          {renderItemDrag()}
          {renderItemDrag()}
          <View css={{ height: '10px', width: '80px', marginBottom: '5px', marginTop: '15px' }} radius={4} backgroundColor="gray3" />
          {renderItemDrag()}
          {renderItemDrag()}
          {renderItemDrag()}
          {renderItemDrag()}
          {renderItemDrag('0.8')}
          {renderItemDrag('0.6')}
          {renderItemDrag('0.4')}
          {renderItemDrag('0.2')}
          <Space size={100} />
        </View>
      </View>
      <View css={styles.right(true)}>
        <View
          backgroundColor="light"
          css={({ colors }) => ({
            height: '54px',
            borderBottom: `1px solid ${colors.gray3}`,
            padding: '10px',
            display: 'flex',
            alignItems: 'center',
          })}
        >
          <View css={{ height: '36px', width: '150px', marginRight: '10px' }} radius={4} backgroundColor="gray2" />
          <View css={{ height: '36px', width: '36px', marginRight: '10px' }} radius={4} backgroundColor="gray2" />
          <View css={{ height: '36px', width: `${36 * 3}px`, marginRight: '10px' }} radius={4} backgroundColor="gray2" />
          <View css={{ height: '36px', width: `${36 * 2}px`, marginRight: '10px' }} radius={4} backgroundColor="gray2" />
          <View css={{ height: '36px', width: '200px', marginRight: '10px', opacity: '0.8' }} radius={4} backgroundColor="gray2" />
          <View css={{ height: '36px', width: '36px', marginRight: '10px', opacity: '0.4' }} radius={4} backgroundColor="gray2" />
        </View>
        <View css={{ position: 'relative', height: 'calc(100% - 54px)' }}>
          <IframePlaceholder />
        </View>
      </View>
    </View>
  );
};

export default BuilderPageSkeleton;
