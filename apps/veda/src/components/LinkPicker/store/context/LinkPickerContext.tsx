import { getLinkType } from 'components/LinkPicker/utils/getLinkType';
import { createContext, FC, useContext, useEffect, useReducer } from 'react';
import { useDeepCompareEffect } from 'react-use';
import { LinkPickerProps, PickerType } from '../../types';
import { Action, getDefaultState, reducerLinkPicker } from './reducer';

interface ILinkPickerContext {
  label?: string;
  summary?: string;
  value: string;
  type: PickerType;
  AfterLabel?: LinkPickerProps['AfterLabel'];
  dispatch: React.Dispatch<Action>;
}

const LinkPickerContext = createContext<ILinkPickerContext | null>(null);

export const useLinkPicker = () => {
  const context = useContext(LinkPickerContext);
  if (context === null) {
    console.log('Error to connect Context');
  }
  return context as ILinkPickerContext;
};

export const LinkPickerProvider: FC<LinkPickerProps> = ({ value, label, summary, AfterLabel, children, onChange }) => {
  const [state, dispatch] = useReducer(reducerLinkPicker, getDefaultState(value));
  const { value: valueState, type } = state;

  useEffect(() => {
    dispatch({
      type: '@LinkPicker/setPickerType',
      payload: {
        type: getLinkType(value),
      },
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    dispatch({
      type: '@LinkPicker/setSettings',
      payload: {
        value,
      },
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useDeepCompareEffect(() => {
    const nextValue = valueState[type];
    if (nextValue !== value) {
      onChange?.(nextValue);
    }
  }, [state]);

  return (
    <LinkPickerContext.Provider value={{ value: valueState[type], label, summary, AfterLabel, dispatch, type: type }}>
      {children}
    </LinkPickerContext.Provider>
  );
};
