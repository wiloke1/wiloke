import useDelay from 'hooks/useDelay';
import { Children, FC, ReactElement, ReactNode, useEffect, useState } from 'react';
import { View, ViewProps } from 'wiloke-react-core';
import { CreateStackNavigatorContextProvider, useCreateStackNavigatorState, useStackNavigator } from './context';
import { StackNavigatorProvider } from './StackNavigatorProvider';
import StackNavigatorScreenPrivate from './StackNavigatorScreenPrivate';
import * as styles from './styles';
import { ActionType, AnimationType, CreateStackNavigatorState, GetStack } from './types';

export interface StackNavigatorProps<NameT extends any> {
  initialName: NameT;
  children: ReactNode;
  header?: ReactNode;
  duration?: number;
  animationType?: AnimationType;
  containerCss?: ViewProps['css'];
}

interface StackNavigatorContentProps {
  children: ReactNode;
  containerCss?: ViewProps['css'];
}

export interface CreateStackNavigatorParams extends CreateStackNavigatorState {}

type StackNavigatorFC<ParamListT extends Record<any, any>> = FC<StackNavigatorProps<keyof ParamListT>> & {
  Screen: <NameT extends keyof ParamListT, P extends any>(props: { name: NameT; component: FC<P> } & Omit<P, 'params'>) => ReactElement;
};

const StackNavigatorScreen = () => {
  throw new Error('StackNavigator.Screen phải nằm trong StackNavigator');
};

const StackNavigatorContent = <ParamListT extends Record<any, any>>({ children, containerCss }: StackNavigatorContentProps) => {
  const { stack, actionType } = useStackNavigator<ParamListT>();
  const [stackState, setStackState] = useState<GetStack<ParamListT, keyof ParamListT>[]>(stack);
  const [delay, cancel] = useDelay();
  const { duration, animationType } = useCreateStackNavigatorState();
  const animationEnabled = animationType !== 'none';

  useEffect(() => {
    if (!animationEnabled) {
      return;
    }
    const handleAsync = async () => {
      if (actionType === ActionType.Back) {
        await delay(duration);
        setStackState(stack);
      } else {
        setStackState(stack);
      }
    };
    handleAsync();
    return () => {
      cancel();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [actionType, stack]);

  const renderItem = (item: GetStack<ParamListT, keyof ParamListT>, index: number) => {
    if (index < stack.length - 2) {
      return null;
    }
    return Children.map(children, child => {
      if ((child as ReactElement).type !== StackNavigatorScreen) {
        throw new Error('Con của StackNavigator phải là StackNavigator.Screen');
      }
      if ((child as ReactElement).props?.name !== item.name) {
        return null;
      }
      return (
        <StackNavigatorScreenPrivate
          {...{ ...(child as ReactElement).props, ...item }}
          active={index === stack.length - 1}
          animationEnabled={animationEnabled ? stackState.length > 1 : false}
          animationType={animationType}
        />
      );
    });
  };

  return <View css={[styles.container, containerCss]}>{(animationEnabled ? stackState : stack).map(renderItem)}</View>;
};

const createStackNavigator = <ParamListT extends Record<string, any>>(options?: CreateStackNavigatorParams) => {
  const StackNavigator: StackNavigatorFC<ParamListT> = ({ children, initialName, header, duration, containerCss, animationType }) => {
    return (
      <CreateStackNavigatorContextProvider
        value={{
          duration: duration ?? options?.duration ?? 200,
          underlayColor: options?.underlayColor ?? 'rgba(0, 0, 0, 0.05)',
          animationType: animationType ?? options?.animationType ?? 'stack',
        }}
      >
        <StackNavigatorProvider initialName={initialName}>
          {header}
          <StackNavigatorContent containerCss={containerCss}>{children}</StackNavigatorContent>
        </StackNavigatorProvider>
      </CreateStackNavigatorContextProvider>
    );
  };

  StackNavigator.Screen = StackNavigatorScreen;

  return StackNavigator;
};

export default createStackNavigator;
