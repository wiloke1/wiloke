import { FC } from 'react';
import { ModalCollection } from './components/ModalCollection';
import { PickCollectionProvider, CollectionPickerProps } from './store/context/CollectionContext';

const CollectionPicker: FC<CollectionPickerProps> = ({ collection, onChange, onClick }) => {
  return (
    <PickCollectionProvider collection={collection} onChange={onChange}>
      <ModalCollection onClick={onClick} />
    </PickCollectionProvider>
  );
};

export default CollectionPicker;
