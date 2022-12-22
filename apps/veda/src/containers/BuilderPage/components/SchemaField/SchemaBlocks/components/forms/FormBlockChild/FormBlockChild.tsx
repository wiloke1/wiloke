import { FC } from 'react';
import { SchemaSettingField, SettingBlock } from 'types/Schema';
import { View } from 'wiloke-react-core';
import { SchemaBlocksProps } from '../../../type';
import { FormSchemaSetting } from '../../../../components/FormSchemaSetting/FormSchemaSetting';
import { useSchemaBlocks } from '../../../contexts/SchemaBlocksContext';
import { getError } from '../../../utils';

export interface FormBlockChildProps extends Pick<SchemaBlocksProps, 'section'> {
  parentBlock: SettingBlock;
  blockChildData: SchemaSettingField;
}

export const FormBlockChild: FC<FormBlockChildProps> = ({ parentBlock, blockChildData, section, ...rest }) => {
  const { editBlockChild } = useSchemaBlocks();
  const { id: blockId, children, type } = parentBlock;
  const { id } = blockChildData;

  return (
    <View>
      <FormSchemaSetting
        {...rest}
        section={section}
        variant="blocks"
        error={getError({
          variant: 'blockChild',
          blockId,
          blockChildId: id,
          blocks: children,
          formEditData: blockChildData,
        })}
        data={blockChildData}
        onChange={data => {
          editBlockChild({
            newData: data,
            blockId: blockId,
            blockChildId: id,
          });
        }}
        blockType={type}
      />
    </View>
  );
};
