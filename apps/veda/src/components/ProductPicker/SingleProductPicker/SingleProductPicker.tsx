import { FC } from 'react';
import { Content } from './Content';
import { SingleProductPickerProvider } from './store/context';
import { SingleProductPickerProps } from './types';

export const SingleProductPicker: FC<SingleProductPickerProps> = ({ product, onChange }) => {
  return (
    <SingleProductPickerProvider product={product} onChange={onChange}>
      <Content />
    </SingleProductPickerProvider>
  );
};
