import { CodeEditor } from 'components/CodeEditor/CodeEditor';
import { FC } from 'react';
import { View } from 'wiloke-react-core';

export interface ThemeScssProps {
  value: string;
  onChange?: (value: string) => void;
}

const ThemeScss: FC<ThemeScssProps> = ({ onChange, value }) => {
  return (
    <View css={{ width: '100%', height: '100%' }}>
      <CodeEditor
        id="scss"
        language="scss"
        value={value}
        onChange={value => {
          onChange?.(value ?? '');
        }}
      />
    </View>
  );
};

export default ThemeScss;
