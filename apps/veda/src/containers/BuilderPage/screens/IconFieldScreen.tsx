import IconUIField from 'components/IconUIField';
import { ScreenProps, useStackNavigator } from 'components/StackNavigator';
import { FC, useEffect, useState } from 'react';
import { LeftBarParamList } from 'containers/BuilderPage/components/SidebarScreen/SidebarScreen';

const IconFieldScreen: FC<ScreenProps<LeftBarParamList, 'iconFieldScreen'>> = ({ params }) => {
  const navigation = useStackNavigator<LeftBarParamList>();
  const { label, value, onChange, onImageClick } = params;

  const [valueState, setValueState] = useState(value);

  useEffect(() => {
    // set value onMount
    setValueState(value);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <IconUIField
      label={label}
      value={valueState}
      onChange={newValue => {
        onChange(newValue);
        setValueState(newValue as typeof value);
        if (newValue.replace(/.*\s/g, '') !== value.replace(/.*\s/g, '')) {
          navigation.goBack();
        }
      }}
      goBack={() => {
        navigation.goBack();
      }}
      onImageClick={onImageClick}
    />
  );
};

export default IconFieldScreen;
