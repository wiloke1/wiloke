import { MutableRefObject, useEffect, useState } from 'react';

interface Listener {
  (): void;
}

let state: MutableRefObject<HTMLElement | null>[] = [];
let listeners: Listener[] = [];

const setState = (val: MutableRefObject<HTMLElement | null>) => {
  state = [val];
  listeners.forEach(listener => {
    listener();
  });
};

function getState(val: MutableRefObject<HTMLElement | null>): MutableRefObject<HTMLElement | null>;
function getState(): MutableRefObject<HTMLElement | null>[];
function getState(val?: MutableRefObject<HTMLElement | null>) {
  if (val) {
    return state.filter(item => item === val)[0];
  }
  return state;
}

const subscribe = (listener: Listener) => {
  listeners.push(listener);
};

const unsubscribe = (listener: Listener) => {
  listeners = listeners.filter(listener1 => listener !== listener1);
};

const clearState = () => {
  if (!!state.length) {
    state = [];
    listeners.forEach(listener => {
      listener();
    });
  }
};

const useGlobalState = () => {
  const [, setReactState] = useState(state);

  const handleSubscribe = () => {
    setReactState(state);
  };

  useEffect(() => {
    subscribe(handleSubscribe);
    return () => {
      unsubscribe(handleSubscribe);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state]);

  return {
    getState,
    setState,
    clearState,
  };
};

export default useGlobalState;
