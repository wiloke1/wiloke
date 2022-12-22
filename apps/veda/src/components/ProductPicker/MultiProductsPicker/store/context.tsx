import { equals } from 'ramda';
import { createContext, FC, useContext, useEffect, useReducer, useRef } from 'react';
import { useDeepCompareEffect } from 'react-use';
import { MultiProductsPickerProps, MultiProductsPickerResult } from '../types';
import { Actions, defaultState, reducer } from './reducer';

interface IMultiProductsPickerContext {
  products: MultiProductsPickerResult;
  dispatch: React.Dispatch<Actions>;
}

const MultiProductsPickerContext = createContext<IMultiProductsPickerContext | null>(null);

export const useMultiProductsPicker = () => {
  const context = useContext(MultiProductsPickerContext);
  if (context === null) {
    console.log('Error to connect Context');
  }
  return context as IMultiProductsPickerContext;
};

export const MultiProductsPickerProvider: FC<MultiProductsPickerProps> = ({ products, children, onChange }) => {
  const [state, dispatch] = useReducer(reducer, { ...defaultState, products });
  const timeoutRef = useRef<number | undefined>();
  const isMountedRef = useRef<boolean>(false);

  useDeepCompareEffect(() => {
    if (!equals(state.products, products)) {
      dispatch({
        type: '@SetProducts',
        payload: {
          data: products,
        },
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [products]);

  useDeepCompareEffect(() => {
    if (isMountedRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = window.setTimeout(() => {
        onChange?.(state.products);
      }, 200);
    }
    return () => {
      clearTimeout(timeoutRef.current);
    };
  }, [state.products]);

  useEffect(() => {
    isMountedRef.current = true;
    return () => {
      isMountedRef.current = false;
    };
  }, []);

  return <MultiProductsPickerContext.Provider value={{ products: state.products, dispatch }}>{children}</MultiProductsPickerContext.Provider>;
};
