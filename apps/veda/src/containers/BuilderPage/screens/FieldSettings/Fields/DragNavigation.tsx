import { SettingDragMenu } from 'containers/BuilderPage/components/DraggableMenu';
import NavigateItem from 'components/NavigateItem';
import { useStackNavigator } from 'components/StackNavigator';
import { LeftBarParamList } from 'containers/BuilderPage/components/SidebarScreen/SidebarScreen';
import { useDeepCompareEffect } from 'react-use';
import { useUpdateSettingsValue } from 'store/actions/actionPages';
import { sectionIdActiveSelector } from 'store/selectors';
import { useSelector } from 'react-redux';
import { pmParent } from 'utils/functions/postMessage';
import { DataBindingFieldNameSelected } from 'containers/BuilderPage/components/DataBindingFieldNameSelected/DataBindingFieldNameSelected';
import { FieldContainerProps } from '../types';

export interface DragNavigationFieldProps<T> extends FieldContainerProps<T> {
  label: string;
  name: string;
  summary?: string;
  enabledMulti?: boolean;
}

const DragNavigationField = <T extends SettingDragMenu[]>({
  value,
  name,
  settingId,
  childId,
  grandChildId,
  label,
  summary,
  forceRenderSection,
  enabledMulti = true,
}: DragNavigationFieldProps<T>) => {
  const updateSettingsValue = useUpdateSettingsValue();
  const navigation = useStackNavigator<LeftBarParamList>();
  const sectionIdActive = useSelector(sectionIdActiveSelector);

  const handleChange = (value: SettingDragMenu[]) => {
    updateSettingsValue({
      value,
      settingId,
      childId,
      grandChildId,
    });
    if (forceRenderSection) {
      pmParent.emit('@rerender', { sectionId: sectionIdActive, action: 'DragNavigation.tsx' });
    }
  };

  useDeepCompareEffect(() => {
    navigation.emit('navigationFieldScreen', {
      settings: value,
      label,
      onChange: handleChange,
      multiLevelEnabled: enabledMulti,
    });
  }, [value, settingId, childId, grandChildId]);

  return (
    <NavigateItem
      label={label}
      summary={summary}
      AfterLabel={<DataBindingFieldNameSelected fieldName={name} />}
      onClick={() => {
        navigation.push('navigationFieldScreen', {
          settings: value,
          label,
          onChange: handleChange,
          multiLevelEnabled: enabledMulti,
        });
      }}
    />
  );
};

export default DragNavigationField;
