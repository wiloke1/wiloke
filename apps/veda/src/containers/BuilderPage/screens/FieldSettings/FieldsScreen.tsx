import { ScreenProps } from 'components/StackNavigator';
import DefaultScreen from 'containers/BuilderPage/components/DefaultScreen';
import { LeftBarParamList } from 'containers/BuilderPage/components/SidebarScreen/SidebarScreen';
import useDelay from 'hooks/useDelay';
import { FC, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useSetComponentName } from 'store/global/componentName/slice';
import { componentNameSelector, pageSectionsSelector, sectionArrFieldIndexActiveSelector, sectionIdActiveSelector } from 'store/selectors';
import { getLabel } from 'utils/functions/getLabel';
import { pmParent } from 'utils/functions/postMessage';
import { DataBindingBetweenItems } from './DataBindingBetweenItems';
import Fields from './Fields';

const FieldsScreen: FC<ScreenProps<LeftBarParamList, 'fieldsScreen'>> = ({ params }) => {
  const sectionIdActive = useSelector(sectionIdActiveSelector);
  const pageSections = useSelector(pageSectionsSelector);
  const sectionActive = pageSections.find(section => section.id === sectionIdActive);
  const componentName = useSelector(componentNameSelector);
  // Khi bấm sidebar sẽ truyền params và khi bấm iframe thì lấy trong redux
  const _componentName = componentName || params?.componentName;
  const setting = sectionActive?.data.settings.find(item => item.name === _componentName);
  const setComponentName = useSetComponentName();
  const sectionArrIndexActive = useSelector(sectionArrFieldIndexActiveSelector);
  const [scrollTo, setScrollTo] = useState<number>();
  const [delay, cancel] = useDelay();

  useEffect(() => {
    const handleAsync = async () => {
      await delay(sectionArrIndexActive >= 0 ? 50 : 200);
      if (!!_componentName) {
        const fieldSettingEl = document.querySelectorAll(`[data-child-name="${_componentName}"]`)[sectionArrIndexActive] as HTMLElement;
        if (!!fieldSettingEl) {
          setScrollTo(fieldSettingEl.offsetTop - 20);
        }
      } else {
        setScrollTo(undefined);
      }
    };
    handleAsync();
    return () => {
      cancel();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [_componentName, sectionArrIndexActive]);

  if (!setting) {
    return null;
  }

  return (
    <DefaultScreen
      title={getLabel(setting.label)}
      scrollTo={scrollTo}
      HeaderRight={setting.type === 'array' && <DataBindingBetweenItems setting={setting} />}
      goBack={() => {
        setComponentName('');
        pmParent.emit('@component/componentNameActive', {
          sectionId: sectionIdActive,
          componentName: '',
          value: false,
        });
      }}
    >
      <Fields setting={setting} />
    </DefaultScreen>
  );
};

export default FieldsScreen;
