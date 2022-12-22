import { FC } from 'react';
import { Content } from './Content';
import { ArticleLinkPickerProvider } from './store/context/ArticlePickerContext';
import { ArticlePickerProps } from './types';

export const ArticlePicker: FC<ArticlePickerProps> = ({ value, onChange }) => {
  return (
    <ArticleLinkPickerProvider value={value} onChange={onChange}>
      <Content />
    </ArticleLinkPickerProvider>
  );
};
