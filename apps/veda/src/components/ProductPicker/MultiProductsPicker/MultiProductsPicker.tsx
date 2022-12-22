import { FC } from 'react';
import { Content } from './Content';
import { MultiProductsPickerProvider } from './store/context';
import { MultiProductsPickerProps } from './types';

export const MultiProductsPicker: FC<MultiProductsPickerProps> = ({ products, onChange }) => {
  return (
    <MultiProductsPickerProvider products={products} onChange={onChange}>
      <Content />
    </MultiProductsPickerProvider>
  );
};
