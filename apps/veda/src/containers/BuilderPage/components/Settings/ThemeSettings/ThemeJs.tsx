import { CodeEditor } from 'components/CodeEditor/CodeEditor';
import { FC } from 'react';
import { View } from 'wiloke-react-core';

export interface ThemeJsProps {
  value: string;
  onChange?: (value: string) => void;
}

const ThemeJs: FC<ThemeJsProps> = ({ onChange, value }) => {
  return (
    <View css={{ width: '100%', height: '100%' }}>
      <CodeEditor
        id="javascript"
        language="javascript"
        value={value}
        onChange={value => {
          onChange?.(value ?? '');
        }}
      />
    </View>
  );
};

export default ThemeJs;
