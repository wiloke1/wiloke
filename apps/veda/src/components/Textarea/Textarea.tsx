import { FC, useState } from 'react';
import { useMount } from 'react-use';
import { i18n } from 'translation';
import { FontAwesome, Text, View } from 'wiloke-react-core';
import * as styles from './styles';

export interface TextareaProps {
  disabled?: boolean;
  value?: string;
  defaultValue?: string;
  resetButtonEnabled?: boolean;
  onChange?: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onChangeText?: (value: string) => void;
  onReset?: () => void;
}

const Textarea: FC<TextareaProps> = ({
  value = '',
  defaultValue = '',
  onChange,
  onChangeText,
  onReset,
  disabled = false,
  resetButtonEnabled = false,
}) => {
  const [valueState, setValueState] = useState('');
  const [isFocus, setIsFocus] = useState(false);

  useMount(() => {
    setValueState(defaultValue);
  });

  return (
    <View css={styles.container}>
      <View
        disabled={disabled}
        tagName="textarea"
        css={[styles.input, navigator.userAgent.includes('Macintosh') ? {} : styles.scrollbar]}
        value={value}
        onFocus={() => {
          setIsFocus(true);
        }}
        onBlur={() => {
          setIsFocus(false);
        }}
        onChange={(event: React.ChangeEvent<HTMLTextAreaElement>) => {
          if (isFocus) {
            onChange?.(event);
            onChangeText?.(event.target.value);
          }
        }}
      />
      {resetButtonEnabled && valueState !== value && (
        <View css={styles.reset} onClick={onReset} backgroundColor="gray1" borderStyle="solid" borderWidth={1} borderColor="gray3">
          <FontAwesome type="far" name="undo" css={{ marginRight: '3px' }} color="gray7" />
          <Text size={13} color="gray7">
            {i18n.t('general.reset')}
          </Text>
        </View>
      )}
    </View>
  );
};

export default Textarea;
