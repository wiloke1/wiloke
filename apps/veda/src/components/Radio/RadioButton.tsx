import React, { FC } from 'react';
import { useRadioState } from './context';
import Radio, { RadioProps } from './Radio';

export interface RadioButtonProps extends RadioProps {}

const RadioButton: FC<RadioButtonProps> = props => {
  const stateContext = useRadioState();
  const { ...rest } = props;

  if (stateContext) {
    // eslint-disable-next-line
    rest.checked = String(props.value) === stateContext.value;
    // eslint-disable-next-line
    rest.disabled = props.disabled || (stateContext.disabled as boolean);
    // eslint-disable-next-line
    rest.block = props.block || (stateContext.block as boolean);
  }
  return <Radio {...rest} variant="button" />;
};

export default RadioButton;
