import Collapse from 'components/Collapse';
import DragItem from 'components/DragItem';
import DragItemRight from 'components/DragItemRight';
import { RenderItemParam } from 'components/Sortable';
import { FC } from 'react';
import { SchemaSettingField, SettingBlock } from 'types/Schema';
import { getLabel } from 'utils/functions/getLabel';
import { View } from 'wiloke-react-core';
import { COLLAPSE_GROUP_NAME_BLOCKS_CHILD } from '../const';
import { useSchemaBlocks } from '../contexts/SchemaBlocksContext';
import { SchemaBlocksProps } from '../type';
import { getDescriptionOfBlocksField } from '../utils';
import { FormBlockChild } from './forms/FormBlockChild/FormBlockChild';

export interface BlockChildProps extends Pick<SchemaBlocksProps, 'section'> {
  parentBlock: SettingBlock;
  blockChildDragItem: RenderItemParam<SchemaSettingField>;
}

export const BlockChild: FC<BlockChildProps> = ({ parentBlock, blockChildDragItem, ...rest }) => {
  const { index, dragHandleProps, item } = blockChildDragItem;
  const { id, label } = item;
  const { id: blockId } = parentBlock;
  const { blocks, duplicateBlockChild, deleteBlockChild } = useSchemaBlocks();
  const blockIndex = blocks.findIndex(block => block.id === blockId);

  return (
    <Collapse
      name={id}
      groupName={COLLAPSE_GROUP_NAME_BLOCKS_CHILD}
      renderHeader={(handler, active) => {
        return (
          <View {...dragHandleProps}>
            <DragItem
              variant="variant2"
              active={active}
              label={getLabel(label)}
              description={getDescriptionOfBlocksField({ variant: 'blockChild', data: item })}
              onEdit={handler}
              innerCss={{ backgroundColor: 'transparent' }}
              RightItem={
                <DragItemRight
                  onEdit={handler}
                  onDuplicate={() => {
                    duplicateBlockChild({
                      blockIndex,
                      blockChildIndex: index,
                    });
                  }}
                  onDelete={() => {
                    deleteBlockChild({
                      blockId,
                      blockChildId: id,
                    });
                  }}
                />
              }
            />
          </View>
        );
      }}
    >
      <FormBlockChild {...rest} parentBlock={parentBlock} blockChildData={item} />
    </Collapse>
  );
};
