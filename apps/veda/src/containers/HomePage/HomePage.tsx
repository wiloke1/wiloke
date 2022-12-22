import { NumberInput } from 'components/NumberInput';
import { FC } from 'react';
import { useHistory } from 'react-router-dom';
import { View } from 'wiloke-react-core';

const BuilderPage: FC = () => {
  const history = useHistory();

  return (
    <View>
      <button
        onClick={() => {
          history.push(`/builder?shop=demo.shopify.com&id=homepage`);
        }}
      >
        Add page
      </button>
      <br />
      <NumberInput sizeInput="small" />
    </View>
  );
};

export default BuilderPage;
