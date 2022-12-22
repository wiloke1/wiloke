import Empty from 'components/Empty';
import TextInput from 'components/TextInput';
import withDebounce from 'hocs/withDebounce';
import { isEmpty } from 'ramda';
import React, { ReactNode, useEffect, useRef, useState } from 'react';
import { createPortal } from 'utils/functions/createPortal';
import offset from 'utils/functions/offset';
import { View } from 'wiloke-react-core';
import * as styles from './styles';

const DebounceInput = withDebounce(TextInput, 'value', 'onValueChange');

export interface AutocompleteInputProps {
  data: string[];
  renderSuggestion?: (suggestion: string, index: number) => ReactNode;
  onSelect?: (suggestion: string) => void;
}

const AutocompleteInput = ({ data, onSelect, renderSuggestion }: AutocompleteInputProps) => {
  const [inputValue, setInputValue] = useState<string>('');
  const [visible, setVisible] = useState(false);
  const [top, setTop] = useState(0);
  const [left, setLeft] = useState(0);
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);

  const inputField = useRef<HTMLInputElement>(null);

  const _handleVisible = () => {
    setWidth(inputField.current?.offsetWidth || 0);
    setHeight(inputField.current?.offsetHeight || 0);

    if (inputField.current !== document.activeElement) {
      setVisible(false);
    } else {
      setVisible(true);
      setTop(offset(inputField.current as Element).top);
      setLeft(offset(inputField.current as Element).left);
    }
  };

  useEffect(() => {
    document.addEventListener('click', _handleVisible);
    return () => {
      document.removeEventListener('click', _handleVisible);
    };
  }, []);

  const _handleChange = (value: string) => {
    setInputValue(value);
  };

  const _handleSelect = (suggestion: string) => () => {
    setInputValue(suggestion);
    onSelect?.(suggestion);
  };

  const _renderSuggestItem = (item: string, index: number) => {
    if (renderSuggestion) {
      renderSuggestion(item, index);
    }

    return (
      <View css={{ padding: '10px', cursor: 'pointer' }} backgroundColorHover="gray2" key={index} onClick={_handleSelect(item)}>
        {item}
      </View>
    );
  };

  const renderSuggestions = () => {
    const _data = inputValue
      ? data.filter(suggest => {
          const result = suggest.toLowerCase().includes(inputValue.toLowerCase());
          return result;
        })
      : data;

    return (
      <View css={[styles.tooltipText, styles.placementTooltipText(top, left, width, height)]}>
        {isEmpty(_data) ? <Empty /> : _data.map(_renderSuggestItem)}
      </View>
    );
  };

  return (
    <View>
      <DebounceInput block value={inputValue} onValueChange={_handleChange} innerRef={inputField} />
      {visible && createPortal(renderSuggestions())}
    </View>
  );
};

export default AutocompleteInput;
