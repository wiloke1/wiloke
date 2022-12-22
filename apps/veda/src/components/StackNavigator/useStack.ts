import { useState } from 'react';
import { ActionType, GetStack } from './types';

let id = 1;

const useStack = <ParamListT extends Record<any, any>>(initialName: keyof ParamListT) => {
  type NameT = keyof ParamListT;
  type ParamsT = ParamListT[NameT];
  const [stack, setStack] = useState<GetStack<ParamListT, NameT>[]>([{ id, name: initialName }]);
  const [actionType, setActionType] = useState<ActionType>(ActionType.Push);

  const push = (name: NameT, params?: ParamsT) => {
    id++;
    setActionType(ActionType.Push);
    setStack(stack => [...stack, { id, name, params }]);
  };

  const replace = (name: NameT, params?: ParamsT) => {
    id++;
    setActionType(ActionType.Replace);
    setStack(stack =>
      stack.map((item, index) => {
        if (index === stack.length - 1) {
          return {
            id,
            name,
            params,
          };
        }
        return item;
      }),
    );
  };

  const goBack = (num = 1) => {
    setActionType(ActionType.Back);
    setStack(stack => {
      if (stack.length <= 1) {
        return stack;
      }
      return stack.filter((_, index) => {
        return index < stack.length - Math.min(num, stack.length - 1);
      });
    });
  };

  const navigate = (name: NameT, params?: ParamsT) => {
    setStack(stack => {
      const _index = stack.findIndex(item => item.name === name);
      if (_index >= 0) {
        if (_index === stack.length - 1) {
          id++;
          return [
            ...stack.filter((_, index) => index !== stack.length - 1),
            {
              id,
              name,
              params,
            },
          ];
        }
        setActionType(ActionType.Back);
        return stack.reduce((arr, item, index) => {
          if (_index < index && index < stack.length) {
            return arr;
          }
          return [...arr, item];
        }, [] as GetStack<ParamListT, keyof ParamListT>[]);
      } else {
        id++;
        setActionType(ActionType.Push);
        return [...stack, { id, name, params }];
      }
    });
  };

  const emit = (name: NameT, params?: ParamsT) => {
    setStack(stack =>
      stack.map((item, index) => {
        if (item.name === name && index === stack.length - 1) {
          return {
            ...item,
            params,
          };
        }
        return item;
      }),
    );
  };

  return {
    stack,
    actionType,
    push,
    navigate,
    replace,
    goBack,
    emit,
  };
};

export default useStack;
