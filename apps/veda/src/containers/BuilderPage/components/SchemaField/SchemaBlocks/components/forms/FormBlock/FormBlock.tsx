import { SchemaBlocksProps } from 'containers/BuilderPage/components/SchemaField/SchemaBlocks';
import { FC } from 'react';
import { SettingBlock } from 'types/Schema';
import { View } from 'wiloke-react-core';
import { ChildrenField } from './fields/ChildrenField';
import { DependenciesField } from './fields/DependenciesField';
import { HelpTextField } from './fields/HelpTextField';
import { LabelField } from './fields/LabelField';
import { NameField } from './fields/NameField';
import { TypeField } from './fields/TypeField';

export interface FormBlockProps extends Pick<SchemaBlocksProps, 'section'> {
  blockData: SettingBlock;
}

export const FormBlock: FC<FormBlockProps> = ({ blockData, ...rest }) => {
  return (
    <View>
      <LabelField {...rest} blockData={blockData} />
      <NameField {...rest} blockData={blockData} />
      <TypeField {...rest} blockData={blockData} />
      <HelpTextField {...rest} blockData={blockData} />
      <ChildrenField {...rest} blockData={blockData} />
      <DependenciesField {...rest} blockData={blockData} />
    </View>
  );
};
