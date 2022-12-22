import IconUIField, { IconValue } from 'components/IconUIField';
import { useStackNavigator } from 'components/StackNavigator';
import { LeftBarParamList } from 'containers/BuilderPage/components/SidebarScreen/SidebarScreen';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useUpdateSettingsValue } from 'store/actions/actionPages';
import { sectionIdActiveSelector } from 'store/selectors';
import { i18n } from 'translation';
import { pmParent } from 'utils/functions/postMessage';
import { FieldContainerProps } from '../types';

export interface IconFieldProps<T> extends FieldContainerProps<T> {
  label: string;
}

const IconField = <T extends IconValue>({ value, label, settingId, childId, grandChildId, forceRenderSection }: IconFieldProps<T>) => {
  const updateSettingsValue = useUpdateSettingsValue();
  const navigation = useStackNavigator<LeftBarParamList>();
  const sectionIdActive = useSelector(sectionIdActiveSelector);

  const handleChange = (value: IconValue | Omit<string, IconValue>) => {
    updateSettingsValue({
      value,
      settingId,
      childId,
      grandChildId,
    });
    if (forceRenderSection) {
      pmParent.emit('@rerender', { sectionId: sectionIdActive, action: 'IconField.tsx' });
    }
  };

  const handleImageClick = () => {
    navigation.push('chooseImageFieldScreen', {
      value: { src: value, width: 0, height: 0 },
      onChange: ({ src }) => {
        handleChange(`<img src="${src}" width="30" alt="" />`);
      },
      label: i18n.t('general.choose_image'),
    });
  };

  useEffect(() => {
    navigation.emit('iconFieldScreen', {
      value,
      label,
      onChange: handleChange,
      onImageClick: handleImageClick,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value, settingId, childId, grandChildId]);

  return (
    <IconUIField.Button
      value={value}
      onClick={() => {
        navigation.push('iconFieldScreen', {
          value,
          label,
          onChange: handleChange,
          onImageClick: handleImageClick,
        });
      }}
    />
  );
};

export default IconField;
