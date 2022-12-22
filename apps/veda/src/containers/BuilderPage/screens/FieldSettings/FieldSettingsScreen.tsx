import Empty from 'components/Empty';
import HeaderDrawer from 'components/HeaderDrawer';
import ScrollBars from 'components/ScrollBars';
import { ScreenProps, useStackNavigator } from 'components/StackNavigator';
import { LeftBarParamList } from 'containers/BuilderPage/components/SidebarScreen/SidebarScreen';
import useDelay from 'hooks/useDelay';
import { FC, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { componentNameSelector, pageSectionsSelector, sectionIdActiveSelector } from 'store/selectors';
import { i18n } from 'translation';
import { Space, View } from 'wiloke-react-core';
import FieldSettingsContent from './FieldSettingsContent';
import FieldSettingsHeader from './FieldSettingsHeader';
import * as styles from './styles';

const FieldSettingsScreen: FC<ScreenProps<LeftBarParamList, 'fieldSettingsScreen'>> = () => {
  const sectionIdActive = useSelector(sectionIdActiveSelector);
  const pageSections = useSelector(pageSectionsSelector);
  const sectionActive = pageSections.find(section => section.id === sectionIdActive);
  const componentName = useSelector(componentNameSelector);
  const [scrollTop, setScrollTop] = useState<number>();
  const [delay, cancel] = useDelay();
  const navigation = useStackNavigator<LeftBarParamList>();

  useEffect(() => {
    const handleAsync = async () => {
      await delay(300);
      if (!!componentName) {
        const fieldSettingEl: HTMLElement | null = document.querySelector(`[data-name="${componentName}"]`);
        if (!!fieldSettingEl) {
          setScrollTop(fieldSettingEl.offsetTop - 20);
        }
      } else {
        setScrollTop(undefined);
      }
    };
    handleAsync();
    return () => {
      cancel();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [componentName]);

  if (!sectionActive) {
    return (
      <View css={styles.container}>
        <HeaderDrawer
          title={i18n.t('general.back')}
          goBack={() => {
            navigation.goBack();
          }}
        />
        <Space size={100} />
        <Empty />
      </View>
    );
  }

  return (
    <View css={styles.container}>
      <FieldSettingsHeader />
      <View css={{ height: 'calc(100% - 54px)' }}>
        <ScrollBars scrollTo={scrollTop}>
          <FieldSettingsContent />
        </ScrollBars>
      </View>
    </View>
  );
};

export default FieldSettingsScreen;
