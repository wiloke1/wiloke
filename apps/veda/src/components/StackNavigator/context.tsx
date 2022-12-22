import { createContext, ReactNode, useContext } from 'react';
import { StackNavigatorState, ActionType, GetStack, CreateStackNavigatorState } from './types';

export const StackNavigatorContext = createContext<StackNavigatorState>({
  stack: [],
  actionType: ActionType.Push,
  navigate: () => {},
  push: () => {},
  replace: () => {},
  emit: () => {},
  goBack: () => {},
});

export const CreateStackNavigatorContext = createContext<CreateStackNavigatorState | undefined>(undefined);

export const CreateStackNavigatorContextProvider = CreateStackNavigatorContext.Provider;

export interface StackNavigatorProviderProps<NameT extends any> {
  initialName: NameT;
  children: ReactNode;
}

export const useCreateStackNavigatorState = () => {
  const state = useContext(CreateStackNavigatorContext);
  return state as Required<CreateStackNavigatorState>;
};

export const useStackNavigator = <ParamListT extends Record<any, any>>() => {
  const state = useContext<StackNavigatorState<ParamListT>>(StackNavigatorContext);
  if (state.stack.length <= 0) {
    throw new Error('useStackNavigator phải nằm trong các Screen');
  }
  return state;
};

export const useStackState = <ParamListT extends Record<any, any>, NameT extends keyof ParamListT = keyof ParamListT>() => {
  const { stack } = useContext<StackNavigatorState<ParamListT>>(StackNavigatorContext);
  if (stack.length <= 0) {
    throw new Error('useStackState phải nằm trong các Screen');
  }
  return stack.find((_, index) => index === stack.length - 1) as GetStack<ParamListT, NameT>;
};
