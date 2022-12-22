import SimpleTabs from 'components/SimpleTabs';
import { ScreenProps } from 'components/StackNavigator';
import { LeftBarParamList } from 'containers/BuilderPage/components/SidebarScreen/SidebarScreen';
import { FC } from 'react';
import { useSelector } from 'react-redux';
import { useSetSidebarTabActive } from 'store/actions/actionSidebarTabActive';
import { sidebarTabActiveSelector } from 'store/selectors';
import { i18n } from 'translation';
import { View } from 'wiloke-react-core';
import LeftBarAddons from './LeftBarAddons';
import LeftBarHeader from './LeftBarHeader';
import LeftBarSections from './LeftBarSections';
import * as styles from './styles';

const LeftBarMainScreen: FC<ScreenProps<LeftBarParamList, 'sectionsScreen'>> = () => {
  const sidebarTabActive = useSelector(sidebarTabActiveSelector);
  const setSidebarTabActive = useSetSidebarTabActive();

  return (
    <View css={styles.container} backgroundColor="gray2">
      <LeftBarHeader />
      <SimpleTabs
        defaultValue={sidebarTabActive}
        value={sidebarTabActive}
        data={[
          { label: i18n.t('general.sections'), value: 'sections' },
          { label: i18n.t('general.addons'), value: 'add-ons' },
        ]}
        tabCss={({ colors }) => ({ backgroundColor: colors.light })}
        tabItemCss={() => ({ width: '50%', textAlign: 'center' })}
        containerCss={{ height: 'calc(100% - 35px)' }}
        onChange={setSidebarTabActive}
      >
        {value => (
          <>
            {value === 'sections' && <LeftBarSections />}
            {value === 'add-ons' && <LeftBarAddons />}
          </>
        )}
      </SimpleTabs>
    </View>
  );
};

export default LeftBarMainScreen;
