import { equals } from 'ramda';
import { SetStateAction, useState } from 'react';

export interface HistoryState<T extends any> {
  past: T[];
  present: T | undefined;
  future: T[];
}

export interface Config {
  max?: number;
}

const useUndoRedo = <T extends any = any>(config?: Config) => {
  const [history, setHistoryState] = useState<HistoryState<T>>({ past: [], present: undefined, future: [] });
  const [acted, setActed] = useState(false);

  const handleUndo = () => {
    setHistoryState(state => {
      const { past, present, future } = state;
      if (past.length > 0) {
        return {
          // Loại bỏ phần tử cuối cùng khỏi past
          past: past.slice(0, past.length - 1),
          // Set phần tử đã bỏ của past vào present
          present: past[past.length - 1],
          // Chèn present cũ vào đầu future
          future: !!present ? [present, ...future] : future,
        };
      }
      return state;
    });
    setActed(true);
  };

  const handleRedo = () => {
    setHistoryState(state => {
      const { past, present, future } = state;
      if (future.length > 0) {
        return {
          // Loại bỏ phần tử đầu tiên khỏi future
          future: future.slice(1),
          // Set phần tử đã bỏ của future vào present
          present: future[0],
          // Chèn present cũ vào cuối past
          past: !!present ? [...past, present] : past,
        };
      }
      return state;
    });
    setActed(true);
  };

  const handleReset = () => {
    setHistoryState({
      past: [],
      present: undefined,
      future: [],
    });
  };

  const updateHistory = (value: T) => {
    if (acted) {
      return;
    }
    setHistoryState(state => {
      const { past, present } = state;
      // Chèn present cũ vào cuối past
      const newPast = !!present && !equals(present, value) ? [...past, present] : past;
      const newPastCheckMax = config?.max != null && newPast.length > config.max ? newPast.filter((_, index) => index > 0) : newPast;
      return {
        past: newPastCheckMax,
        // Set phần tử mới
        present: value,
        // Loại bỏ phần tử đầu tiên khỏi future
        future: [],
      };
    });

    setActed(false);
  };

  const setHistory = (value: SetStateAction<HistoryState<T>>) => {
    if (acted) {
      return;
    }
    setHistoryState(value);
    setActed(false);
  };

  return {
    ...history,
    acted,
    canUndo: history.past.length > 0,
    canRedo: history.future.length > 0,
    onUndo: handleUndo,
    onRedo: handleRedo,
    onReset: handleReset,
    updateHistory,
    setActed,
    setHistory,
  };
};

export default useUndoRedo;
