import { StackNavigatorContext, StackNavigatorProviderProps } from './context';
import useStack from './useStack';

export const StackNavigatorProvider = <ParamListT extends Record<any, any>, NameT extends keyof ParamListT>({
  children,
  initialName,
}: StackNavigatorProviderProps<NameT>) => {
  const { stack, actionType, push, navigate, replace, emit, goBack } = useStack<ParamListT>(initialName);

  return (
    <StackNavigatorContext.Provider
      value={{
        stack,
        actionType,
        navigate,
        push,
        goBack,
        replace,
        emit,
      }}
    >
      {children}
    </StackNavigatorContext.Provider>
  );
};
