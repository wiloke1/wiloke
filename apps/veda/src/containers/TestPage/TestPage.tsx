import ChooseImage from 'components/ChooseImage';
import { MyUpload } from 'components/DragUploadAntd/MyUpload';
import { MessageMaintain } from 'components/MessageMaintain';
import { createPublishStepLoading } from 'components/PublishStepLoading';
import { range } from 'ramda';
import { FC, useEffect } from 'react';
import { useGetMetafields } from 'store/actions/shopify/actionMetafields';
import { View } from 'wiloke-react-core';

const publishStepLoading = createPublishStepLoading(2);

const TestPage: FC = () => {
  const getMetaField = useGetMetafields();

  useEffect(() => {
    getMetaField.request({ ownerType: 'COLLECTION' });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <View container css={{ padding: '100px 0' }}>
      <MessageMaintain />
      <button
        onClick={() => {
          publishStepLoading.next({
            title: 'Step 1',
            description: 'Integer sed justo at enim vehicula ultrices eget nec ligula. Nunc eleifend facilisis ligula in egestas.',
          });
        }}
      >
        Step 1
      </button>
      <button
        onClick={() => {
          publishStepLoading.next({
            title: 'Step 2',
            description: 'Integer sed justo at enim vehicula ultrices eget nec ligula. Nunc eleifend facilisis ligula in egestas.',
          });
        }}
      >
        Step 2
      </button>
      <button
        onClick={() => {
          publishStepLoading.next();
        }}
      >
        Done
      </button>
      <button
        onClick={() => {
          publishStepLoading.open();
        }}
      >
        Show
      </button>

      <View css={{ width: '300px', padding: '10px' }}>
        <ChooseImage mode="popup" imageWidth={500} />
      </View>

      <View css={{ width: '600px', padding: '10px' }}>
        <MyUpload multiple>
          {range(0, 10).map(item => (
            <View key={item} height={50} borderColor="gray3" borderStyle="solid" borderWidth={1} css={{ width: '100%' }}>
              {item}
            </View>
          ))}
        </MyUpload>
      </View>
    </View>
  );
};

export default TestPage;
