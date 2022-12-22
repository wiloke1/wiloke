import { FC } from 'react';
import { EmailModal } from './components/EmailModal/EmailModal';
import { Form } from './components/Form/Form';
import { ShopifyModal } from './components/ShopifyModal/ShopifyModal';
import { LinkPickerProvider } from './store/context/LinkPickerContext';
import { LinkPickerProps } from './types';

const Content = () => {
  return (
    <>
      <Form />
      <ShopifyModal />
      <EmailModal />
    </>
  );
};

const LinkPicker: FC<LinkPickerProps> = ({ value, label, summary, AfterLabel = null, onChange }) => {
  return (
    <LinkPickerProvider value={value} label={label} summary={summary} AfterLabel={AfterLabel} onChange={onChange}>
      <Content />
    </LinkPickerProvider>
  );
};

export default LinkPicker;
