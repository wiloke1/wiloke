export interface Stack {
  name: any;
  params?: any;
}
export interface GetStack<ParamListT extends Record<any, any>, NameT extends keyof ParamListT> {
  id: number;
  name: NameT;
  params?: ParamListT[NameT];
}

export type ScreenProps<StackStateT extends Record<any, any>, NameT extends keyof StackStateT, PropsT extends Record<any, any> = Record<any, any>> = {
  name: NameT;
  params: StackStateT[NameT];
} & PropsT;

export interface StackNavigatorState<ParamListT extends Record<any, any> = Record<any, any>> {
  stack: GetStack<ParamListT, keyof ParamListT>[];
  actionType: ActionType;
  navigate: <NameT extends keyof ParamListT>(name: NameT, params?: ParamListT[NameT]) => void;
  push: <NameT extends keyof ParamListT>(name: NameT, params?: ParamListT[NameT]) => void;
  replace: <NameT extends keyof ParamListT>(name: NameT, params?: ParamListT[NameT]) => void;
  emit: <NameT extends keyof ParamListT>(name: NameT, params?: ParamListT[NameT]) => void;
  goBack: (num?: number) => void;
}

export type AnimationType = 'none' | 'slide' | 'stack';

export interface CreateStackNavigatorState {
  duration?: number;
  underlayColor?: string;
  animationType?: AnimationType;
}

export enum ActionType {
  Back,
  Push,
  Replace,
}
