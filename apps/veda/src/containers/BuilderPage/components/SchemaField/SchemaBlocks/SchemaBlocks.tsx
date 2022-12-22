import Button from 'components/Button';
import Sortable from 'components/Sortable';
import { FC } from 'react';
import { i18n } from 'translation';
import { View } from 'wiloke-react-core';
import { Block } from './components/Block';
import { COLLAPSE_GROUP_NAME_BLOCKS, ROOT_DROPPABLE_ID } from './const';
import { SchemaBlocksProvider, useSchemaBlocks } from './contexts/SchemaBlocksContext';
import { SchemaBlocksProps } from './type';

const Blocks: FC<SchemaBlocksProps> = ({ section }) => {
  const { blocks, sortBlock, addBlock, closeCollapse } = useSchemaBlocks();
  return (
    <View>
      <Sortable
        droppableId={ROOT_DROPPABLE_ID}
        keyExtractor={block => block.id}
        itemCss={{ marginBottom: '5px' }}
        data={blocks}
        onBeforeCapture={() => {
          closeCollapse({ groupName: COLLAPSE_GROUP_NAME_BLOCKS });
        }}
        onDragEnd={({ source, destination }) => {
          if (!destination) {
            return;
          }
          sortBlock({ sourceIndex: source.index, destinationIndex: destination.index });
        }}
        renderItem={blockDragItem => <Block section={section} blockDragItem={blockDragItem} />}
      />
      <Button block size="small" radius={6} backgroundColor="gray3" color="gray8" onClick={addBlock}>
        {i18n.t('general.add', { text: i18n.t('general.block'), textTransform: 'capitalize' })}
      </Button>
    </View>
  );
};

export const SchemaBlocks: FC<SchemaBlocksProps> = props => {
  return (
    <SchemaBlocksProvider {...props}>
      <Blocks {...props} />
    </SchemaBlocksProvider>
  );
};
