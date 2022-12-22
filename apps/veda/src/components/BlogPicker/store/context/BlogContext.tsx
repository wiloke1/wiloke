import { BlogPickerProps, BlogPickerResult } from 'components/BlogPicker/types';
import { createContext, FC, useContext, useEffect, useReducer } from 'react';
import { Action, defaultState, reducerBlogPicker } from '../reducer';

interface IBlogPickerContext {
  value: BlogPickerResult;
  dispatch: React.Dispatch<Action>;
}

const BlogPickerContext = createContext<IBlogPickerContext | null>(null);

export const useBlogPicker = () => {
  const context = useContext(BlogPickerContext);
  if (context === null) {
    console.log('Error to connect Context');
  }
  return context as IBlogPickerContext;
};

export const BlogLinkPickerProvider: FC<BlogPickerProps> = ({ value, children, onChange }) => {
  const [state, dispatch] = useReducer(reducerBlogPicker, { ...defaultState });
  const { value: valueState } = state;

  useEffect(() => {
    dispatch({
      type: '@BlogPicker/setSettings',
      payload: {
        value,
      },
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (valueState !== undefined) {
      onChange?.(valueState);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [valueState]);

  return <BlogPickerContext.Provider value={{ value: valueState, dispatch }}>{children}</BlogPickerContext.Provider>;
};
