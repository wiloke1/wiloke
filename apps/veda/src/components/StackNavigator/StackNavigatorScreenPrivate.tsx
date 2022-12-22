import { FC } from 'react';
import { View } from 'wiloke-react-core';
import { useCreateStackNavigatorState, useStackNavigator } from './context';
import getAnimationStyles from './getAnimationStyles';
import * as styles from './styles';
import { ActionType, AnimationType } from './types';

export interface StackNavigatorScreenPrivateProps<NameT extends any> {
  name: NameT;
  component: FC<any>;
  animationEnabled: boolean;
  animationType: AnimationType;
  active: boolean;
}

const StackNavigatorScreenPrivate = <ParamListT extends Record<any, any>, NameT extends keyof ParamListT, T extends Record<string, any>>({
  name,
  component: Component,
  animationEnabled,
  animationType,
  active,
  ...rest
}: StackNavigatorScreenPrivateProps<NameT> & T) => {
  const { duration, underlayColor } = useCreateStackNavigatorState();
  const { actionType } = useStackNavigator<ParamListT>();
  const duration_ = actionType === ActionType.Replace ? 0 : duration;
  const { defaultIn, defaultOut, activeIn, activeOut } = getAnimationStyles(animationType);
  const style = actionType === ActionType.Push ? styles.anim('0', defaultIn, duration_) : styles.anim('0', defaultOut, duration_);
  const styleForScreenActive = actionType === ActionType.Push ? styles.anim(activeIn, '0', duration_) : styles.anim(activeOut, '0', duration_);

  return (
    <View css={[styles.item, animationEnabled ? (active ? styleForScreenActive : style) : {}]}>
      <Component name={name} {...rest} />
      <View css={styles.underlay(active, underlayColor, duration_)} />
    </View>
  );
};

export default StackNavigatorScreenPrivate;
