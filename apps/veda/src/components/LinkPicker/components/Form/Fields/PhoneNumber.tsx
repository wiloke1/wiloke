import { useLinkPicker } from 'components/LinkPicker/store/context/LinkPickerContext';
import { View } from 'wiloke-react-core';
import { DebounceTextInput } from './Fields';

export const PhoneNumber = () => {
  const { dispatch, value } = useLinkPicker();

  const _changePhoneNumber = (value: string) => {
    dispatch({
      type: '@LinkPicker/setSettings',
      payload: {
        value: value,
      },
    });
  };

  return (
    <View>
      <DebounceTextInput
        type="text"
        value={value}
        onValueChange={_changePhoneNumber}
        placeholder='e.g., "tel:+123456789"'
        sizeInput="small"
        block
        css={{ marginTop: '8px' }}
      />
    </View>
  );
};
