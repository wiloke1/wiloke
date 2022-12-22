import { ArticlePickerProps, ArticlePickerResult } from 'components/ArticlePicker/types';
import { createContext, FC, useContext, useEffect, useReducer, useRef } from 'react';
import { Action, defaultState, reducerArticlePicker } from '../reducer';

interface IArticlePickerContext {
  value: ArticlePickerResult;
  dispatch: React.Dispatch<Action>;
}

const ArticlePickerContext = createContext<IArticlePickerContext | null>(null);

export const useArticlePicker = () => {
  const context = useContext(ArticlePickerContext);
  if (context === null) {
    console.log('Error to connect Context');
  }
  return context as IArticlePickerContext;
};

export const ArticleLinkPickerProvider: FC<ArticlePickerProps> = ({ value, children, onChange }) => {
  const [state, dispatch] = useReducer(reducerArticlePicker, { ...defaultState });
  const { value: valueState } = state;
  const timeoutRef = useRef<number | undefined>();

  useEffect(() => {
    dispatch({
      type: '@ArticlePicker/setSettings',
      payload: {
        value,
      },
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    clearTimeout(timeoutRef.current);
    timeoutRef.current = window.setTimeout(() => {
      if (valueState !== undefined) {
        onChange?.(valueState);
      }
    }, 200);
    return () => {
      clearTimeout(timeoutRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [valueState]);

  return <ArticlePickerContext.Provider value={{ value: valueState, dispatch }}>{children}</ArticlePickerContext.Provider>;
};
