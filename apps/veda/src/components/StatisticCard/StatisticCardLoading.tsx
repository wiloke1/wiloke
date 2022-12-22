import Box from 'components/FieldBox';
import { animatedLoading } from 'styles/loading';
import { LineAwesome, useTheme, View } from 'wiloke-react-core';

const StatisticBoxLoading = () => {
  const { colors } = useTheme();
  return (
    <Box
      radius={0}
      borderWidth={0}
      backgroundColor="light"
      css={{ padding: '0 15px', marginBottom: '20px', borderBottom: `1px solid ${colors.gray3}` }}
    >
      <View height={81} row css={{ alignItems: 'center', flexWrap: 'nowrap' }}>
        <View css={{ padding: '0 15px', width: '50px' }}>
          <View width={24} height={24} backgroundColor="gray3" radius={6} css={animatedLoading} />
        </View>

        <View css={{ marginRight: '10px', width: '70px', height: '50px', ...animatedLoading }} radius={3} backgroundColor="gray3" />

        <View css={{ flex: 1 }}>
          <View radius={6} backgroundColor="gray3" width={100} css={{ marginBottom: '5px', ...animatedLoading }} height={10} />
          <View radius={6} backgroundColor="gray3" width={200} height={10} css={animatedLoading} />
        </View>

        <View css={{ padding: '0px 15px', width: '250px' }}>
          <View width={40} height={7} backgroundColor="gray3" radius={6} css={{ ...animatedLoading, marginBottom: '4px' }} />
          <View width={40} height={7} backgroundColor="gray3" radius={6} css={animatedLoading} />
        </View>
        <View css={{ display: 'flex', alignItems: 'center', padding: '0px 15px', width: '250px' }}>
          <View width={40} height={22} backgroundColor="gray3" css={{ marginRight: '10px', ...animatedLoading }} radius={20} />
        </View>
        <View css={{ width: '250px', display: 'flex', alignItems: 'center', padding: '0px 15px', justifyContent: 'flex-end' }}>
          <View css={{ display: 'inline-block' }}>
            <LineAwesome name="ellipsis-h" size={18} color="gray5" css={{ lineHeight: '18px', ...animatedLoading }} />
          </View>
        </View>
      </View>
    </Box>
  );
};

export { StatisticBoxLoading };
