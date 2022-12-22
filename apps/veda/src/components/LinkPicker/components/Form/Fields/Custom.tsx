import { useLinkPicker } from 'components/LinkPicker/store/context/LinkPickerContext';
import { View } from 'wiloke-react-core';
import { DebounceTextInput } from './Fields';

export const Custom = () => {
  const { value, dispatch } = useLinkPicker();
  return (
    <View css={{ marginTop: '8px' }}>
      <DebounceTextInput
        value={value}
        placeholder="https://your-website.com..."
        onValueChange={val => {
          dispatch({
            type: '@LinkPicker/setSettings',
            payload: {
              value: val,
            },
          });
        }}
        sizeInput="small"
        block
      />
    </View>
  );
};
