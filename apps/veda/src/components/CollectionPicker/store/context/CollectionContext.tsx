import { createContext, FC, useContext, useEffect, useReducer } from 'react';
import { Actions, defaultState, reducer } from '../reducer';

export type CollectionPickerResult =
  | undefined
  | {
      itemId: number;
      handle: string;
      featuredImg: string | undefined;
    };

export interface CollectionPickerProps {
  /** Đầu vào là 1 collection, có thể là undefined */
  collection: CollectionPickerResult;
  onClick?: () => void;
  /** Sự kiện onChange, params: { id: number; handle: string; featuredImg: string | undefined; } */
  onChange?: (collection: CollectionPickerResult) => void;
}

interface PickCollectionContext {
  collection: CollectionPickerResult;
  dispatch: React.Dispatch<Actions>;
}

const PickCollectionContext = createContext<PickCollectionContext | null>(null);

export const useChooseCollection = () => {
  const context = useContext(PickCollectionContext);
  if (context === null) {
    console.log('Error to connect Context');
  }
  return context as PickCollectionContext;
};

export const PickCollectionProvider: FC<CollectionPickerProps> = ({ collection, children, onChange }) => {
  const [state, dispatch] = useReducer(reducer, { ...defaultState, collection });
  const { collection: collectionState } = state;

  useEffect(() => {
    dispatch({
      type: '@SetInitialCollection',
      payload: {
        data: collection,
      },
    });
  }, [collection]);

  useEffect(() => {
    if (collectionState !== undefined) {
      onChange?.(collectionState);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [collectionState]);

  return <PickCollectionContext.Provider value={{ collection: collectionState, dispatch }}>{children}</PickCollectionContext.Provider>;
};
