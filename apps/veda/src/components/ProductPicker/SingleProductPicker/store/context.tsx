import { createContext, FC, useContext, useEffect, useReducer } from 'react';
import { useShallowCompareEffect } from 'react-use';
import { SingleProductPickerResult } from '../types';
import { SingleProductPickerProps } from '../types';
import { Actions, defaultState, reducer } from './reducer';

interface SingleProductPickerContext {
  product: SingleProductPickerResult;
  dispatch: React.Dispatch<Actions>;
}

const SingleProductPickerContext = createContext<SingleProductPickerContext | null>(null);

export const useSingleProductPicker = () => {
  const context = useContext(SingleProductPickerContext);
  if (context === null) {
    console.log('Error to connect Context');
  }
  return context as SingleProductPickerContext;
};

const defaultProduct = undefined;

export const SingleProductPickerProvider: FC<SingleProductPickerProps> = ({ product, children, onChange }) => {
  const [state, dispatch] = useReducer(reducer, { ...defaultState, product });

  useEffect(() => {
    if (product !== undefined) {
      dispatch({
        type: '@SetProduct',
        payload: {
          data: product,
        },
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [product]);

  useShallowCompareEffect(() => {
    if (state.product !== undefined) {
      onChange?.(state.product);
    }
  }, [state]);

  return (
    <SingleProductPickerContext.Provider
      value={{
        product: state.product ? state.product : defaultProduct,
        dispatch,
      }}
    >
      {children}
    </SingleProductPickerContext.Provider>
  );
};
