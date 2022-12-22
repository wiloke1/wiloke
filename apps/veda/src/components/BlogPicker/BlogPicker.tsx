import { FC } from 'react';
import { Content } from './Content';
import { BlogLinkPickerProvider } from './store/context/BlogContext';
import { BlogPickerProps } from './types';

export const BlogPicker: FC<BlogPickerProps> = ({ value, onChange }) => {
  return (
    <BlogLinkPickerProvider value={value} onChange={onChange}>
      <Content />
    </BlogLinkPickerProvider>
  );
};
