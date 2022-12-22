import { FC, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { FontAwesome, useStyleSheet, View } from 'wiloke-react-core';
import * as styles from './styles';

interface InputTagsProps {
  /** Đầu vào component: được cách nhau bằng dấu phẩy. VD: values="hello,kitty" */
  values?: string;
  onChange?: (values: string) => void;
}

export const InputTags: FC<InputTagsProps> = ({ values = '', onChange }) => {
  const [stateValues, setValues] = useState<string[]>([]);
  const [value, setValue] = useState<string>('');
  const [error, setError] = useState('');
  const [visible, setVisible] = useState(false);
  const [width, setWidth] = useState<number>(4);
  const measurer = useRef<HTMLElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const { styles: styleSheet } = useStyleSheet();

  useEffect(() => {
    if (!!values && values !== undefined) {
      setValues(values.trim().split(','));
    }
  }, [values]);

  useEffect(() => {
    setVisible(true);
  }, [value]);

  useLayoutEffect(() => {
    if (visible && measurer.current) {
      const rect = measurer.current.getBoundingClientRect();
      setWidth(rect.width);
      setVisible(false);
    }
  }, [visible]);

  const handleAddItem = (val: string) => {
    if (stateValues.includes(val)) {
      setValue('');
      setError('Value is existed!');
    } else if (!val) {
      setValue('');
      setError('Value cannot be empty!');
    } else {
      const newValues = stateValues.concat(val);
      setValues(newValues);
      setValue('');
      setError('');
      const result = newValues.map(val => val.trim()).join(',');
      onChange?.(result);
    }
  };

  const handleRemove = (val: string) => () => {
    const currentValues = stateValues;
    const newValues = currentValues.filter(v => v !== val);
    setValues(newValues);
    setError('');
    const result = newValues.map(val => val.trim()).join(',');
    onChange?.(result);
  };

  const handleKeyDown: React.KeyboardEventHandler<HTMLInputElement> = event => {
    if (event.key === ',' || event.key === 'Enter') {
      event.preventDefault();
      handleAddItem(event.currentTarget.value);
    }
  };

  const handleChange = (val: string) => {
    setValue(val);
    setError('');
  };

  return (
    <>
      <View
        css={styles.inputTagsContainer}
        borderColor="gray3"
        borderStyle="solid"
        borderWidth={1}
        backgroundColor="light"
        radius={4}
        onClick={() => {
          inputRef.current?.focus();
        }}
      >
        <View
          css={styles.tagInner}
          onClick={() => {
            inputRef.current?.focus();
          }}
        >
          {stateValues.length > 0 &&
            stateValues.map(item => (
              <View borderColor="gray3" borderStyle="solid" borderWidth={1} radius={4} css={styles.badge} key={item} backgroundColor="gray2">
                <View css={styles.badgeTitle}>{item}</View>
                <FontAwesome css={{ cursor: 'pointer' }} onClick={handleRemove(item)} type="far" name="times" />
              </View>
            ))}

          <View css={{ ...styles.inputContainer, width: `${width}px` }}>
            <View tagName="span" ref={measurer}>
              {visible && value}
            </View>
            <input
              ref={inputRef}
              className={styleSheet(styles.input)}
              value={value}
              onKeyDown={handleKeyDown}
              onChange={e => {
                handleChange(e.target.value);
              }}
            />
          </View>
        </View>
      </View>
      {!!error && <View color="danger">{error}</View>}
    </>
  );
};
