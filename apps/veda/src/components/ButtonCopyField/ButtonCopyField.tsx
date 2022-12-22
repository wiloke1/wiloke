import TextInput from 'components/TextInput';
import { FC } from 'react';
import { View } from 'wiloke-react-core';

export interface ButtonCopyFieldProps {
  valueCopy: string;
  value: string;
  onChangeValueCopy?: (value: string) => void;
  onChangeValue?: (value: string) => void;
}

const ButtonCopyField: FC<ButtonCopyFieldProps> = ({ onChangeValueCopy, onChangeValue, value, valueCopy }) => {
  return (
    <View>
      <TextInput value={value} placeholder="Copy code" block borderWidth={2} borderColor="gray3" radius={10} onValueChange={onChangeValue} />
      <View css={{ height: '10px' }} />
      <TextInput value={valueCopy} placeholder="Copied" block borderWidth={2} borderColor="gray3" radius={10} onValueChange={onChangeValueCopy} />
    </View>
  );
};

export default ButtonCopyField;
