import HeaderDrawer from 'components/HeaderDrawer';
import ScrollBars from 'components/ScrollBars';
import { useStackNavigator } from 'components/StackNavigator';
import { LeftBarParamList } from 'containers/BuilderPage/components/SidebarScreen/SidebarScreen';
import { FC, ReactNode } from 'react';
import { View, ViewProps } from 'wiloke-react-core';

export interface DefaultScreenProps {
  scrollTo?: number;
  title: string;
  contentCss?: ViewProps['css'];
  HeaderRight?: ReactNode;
  goBack?: () => void;
  withScrollbars?: boolean;
}

const DefaultScreen: FC<DefaultScreenProps> = ({ title, children, scrollTo, contentCss, goBack, HeaderRight, withScrollbars = true }) => {
  const navigation = useStackNavigator<LeftBarParamList>();
  if (withScrollbars) {
    return (
      <View css={{ height: '100%' }} backgroundColor="gray2" className="DefaultScreen-container">
        <HeaderDrawer
          title={title}
          goBack={() => {
            navigation.goBack();
            goBack?.();
          }}
          Right={HeaderRight}
        />
        <ScrollBars css={{ height: 'calc(100% - 54px) !important' }} scrollTo={scrollTo}>
          <View css={[{ padding: '10px' }, contentCss]}>{children}</View>
        </ScrollBars>
      </View>
    );
  }
  return (
    <View css={{ height: '100%' }} backgroundColor="gray2" className="DefaultScreen-container">
      <HeaderDrawer
        title={title}
        goBack={() => {
          navigation.goBack();
          goBack?.();
        }}
        Right={HeaderRight}
      />
      <View css={[{ padding: '10px' }, contentCss]}>{children}</View>
    </View>
  );
};

export default DefaultScreen;
