import Button from 'components/Button';
import Field from 'components/Field';
import { COLLAPSE_GROUP_NAME_BLOCKS_CHILD } from 'containers/BuilderPage/components/SchemaField/SchemaBlocks/const';
import { useSchemaBlocks } from 'containers/BuilderPage/components/SchemaField/SchemaBlocks/contexts/SchemaBlocksContext';
import Sortable from 'components/Sortable';
import { FC } from 'react';
import { i18n } from 'translation';
import { BlockChild } from '../../../BlockChild';
import { FormBlockProps } from '../FormBlock';

export const ChildrenField: FC<FormBlockProps> = ({ blockData, ...rest }) => {
  const { id, children } = blockData;
  const { addBlockChild, sortBlockChild, closeCollapse } = useSchemaBlocks();

  return (
    <Field label={i18n.t('schema.fields', { text: i18n.t('schema.children'), textTransform: 'capitalize' })}>
      <Sortable
        itemCss={{ marginBottom: '4px' }}
        droppableId={id}
        keyExtractor={block => block.id}
        data={children}
        renderItem={blockChildDragItem => <BlockChild {...rest} blockChildDragItem={blockChildDragItem} parentBlock={blockData} />}
        onBeforeCapture={() => {
          closeCollapse({ groupName: COLLAPSE_GROUP_NAME_BLOCKS_CHILD });
        }}
        onDragEnd={({ source, destination }) => {
          if (!destination) {
            return;
          }
          sortBlockChild({ blockId: id, sourceIndex: source.index, destinationIndex: destination.index });
        }}
      />
      <Button block size="small" radius={6} backgroundColor="gray2" color="gray8" onClick={() => addBlockChild({ blockId: id })}>
        {i18n.t('schema.add', { text: i18n.t('schema.children'), textTransform: 'capitalize' })}
      </Button>
    </Field>
  );
};
