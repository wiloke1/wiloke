import ChooseImage from 'components/ChooseImage';
import { useStackNavigator } from 'components/StackNavigator';
import { LeftBarParamList } from 'containers/BuilderPage/components/SidebarScreen/SidebarScreen';
import { useSelector } from 'react-redux';
import { useUpdateSettingsValue } from 'store/actions/actionPages';
import { sectionIdActiveSelector } from 'store/selectors';
import { PreviewImage } from 'types/Page';
import { pmParent } from 'utils/functions/postMessage';
import { FieldContainerProps } from '../types';

export interface ChooseImageFieldProps<T> extends FieldContainerProps<T> {
  label: string;
}

const ChooseImageField = <T extends PreviewImage>({
  value,
  settingId,
  childId,
  grandChildId,
  label,
  forceRenderSection,
}: ChooseImageFieldProps<T>) => {
  const updateSettingsValue = useUpdateSettingsValue();
  const navigation = useStackNavigator<LeftBarParamList>();
  const sectionIdActive = useSelector(sectionIdActiveSelector);

  const _handleUpdateValue = (value: PreviewImage) => {
    updateSettingsValue({
      value,
      settingId,
      childId,
      grandChildId,
    });
    if (forceRenderSection) {
      pmParent.emit('@rerender', { sectionId: sectionIdActive, action: 'ChooseImageField.tsx' });
    }
  };

  return (
    <ChooseImage.Button
      image={value}
      onClick={() => {
        navigation.push('chooseImageFieldScreen', {
          value,
          onChange: _handleUpdateValue,
          label,
        });
      }}
      onClear={_handleUpdateValue}
    />
  );
};

export default ChooseImageField;
