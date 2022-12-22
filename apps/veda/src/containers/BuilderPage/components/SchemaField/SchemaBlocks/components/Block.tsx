import Collapse from 'components/Collapse';
import DragItem from 'components/DragItem';
import DragItemRight from 'components/DragItemRight';
import { RenderItemParam } from 'components/Sortable';
import { FC } from 'react';
import { SettingBlock } from 'types/Schema';
import { getLabel } from 'utils/functions/getLabel';
import { View } from 'wiloke-react-core';
import { i18n } from 'translation';
import { v4 } from 'uuid';
import { message } from 'antd';
import { SchemaBlocksProps } from '../type';
import { COLLAPSE_GROUP_NAME_BLOCKS } from '../const';
import { useSchemaBlocks } from '../contexts/SchemaBlocksContext';
import { getDescriptionOfBlocksField } from '../utils';
import { FormBlock } from './forms/FormBlock/FormBlock';

interface BlockProps extends Pick<SchemaBlocksProps, 'section'> {
  blockDragItem: RenderItemParam<SettingBlock>;
}

export const Block: FC<BlockProps> = ({ blockDragItem, ...rest }) => {
  const { duplicateBlock, deleteBlock, copyBlock, pasteBlock, clipboard } = useSchemaBlocks();
  const { item, dragHandleProps, index } = blockDragItem;
  const { id, label } = item;

  return (
    <Collapse
      name={id}
      groupName={COLLAPSE_GROUP_NAME_BLOCKS}
      renderHeader={(handler, active) => {
        return (
          <View {...dragHandleProps}>
            <DragItem
              variant="variant2"
              active={active}
              label={getLabel(label)}
              description={getDescriptionOfBlocksField({ variant: 'block', data: item })}
              onEdit={handler}
              innerCss={{ backgroundColor: 'transparent' }}
              RightItem={
                <DragItemRight
                  onEdit={handler}
                  onDuplicate={() => {
                    duplicateBlock(index);
                  }}
                  onDelete={() => {
                    deleteBlock({ blockId: id });
                  }}
                  additionalItems={[
                    {
                      iconName: 'copy',
                      text: i18n.t('general.copy', { text: i18n.t('builderPage.schema.blocks.title') }),
                      key: v4(),
                      disabled: !clipboard,
                      onClick: () => {
                        copyBlock({ blockId: id });
                        message.success(i18n.t('general.copied'));
                      },
                    },
                    {
                      iconName: 'paste',
                      text: i18n.t('general.paste', { text: i18n.t('builderPage.schema.blocks.title') }),
                      key: v4(),
                      disabled: !clipboard,
                      onClick: () => {
                        if (clipboard) {
                          pasteBlock({
                            newData: clipboard,
                            blockId: id,
                          });
                        }
                      },
                    },
                  ]}
                />
              }
            />
          </View>
        );
      }}
    >
      <View css={{ padding: '8px 20px' }}>
        <FormBlock {...rest} blockData={item} />
      </View>
    </Collapse>
  );
};
