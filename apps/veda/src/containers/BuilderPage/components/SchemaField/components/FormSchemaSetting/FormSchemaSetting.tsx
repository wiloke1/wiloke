import { FC } from 'react';
import { View } from 'wiloke-react-core';
import { DefaultValueField } from './fields/DefautValueField/DefaultValueField';
import { DependenciesField } from './fields/DependenciesField/DependenciesField';
import { EnableMultiLevelField } from './fields/EnableMultiLevelField/EnableMultiLevelField';
import { ForceRenderSectionField } from './fields/ForceRenderSectionField/ForceRenderSectionField';
import { HelpTextField } from './fields/HelpTextField/HelpTextField';
import { LabelField } from './fields/LabelField/LabelField';
import { NameField } from './fields/NameField/NameField';
import { TypeField } from './fields/TypeField/TypeField';
import * as styles from './styles';
import { FormSchemaSettingProps } from './type';

/** "settings" và children của "blocks" có các thuộc tính bản chất là giống nhau + component này update khá nhiều và khá loạn -> Tách ra 1 component này để update 1 được 2 */
export const FormSchemaSetting: FC<FormSchemaSettingProps> = ({ data, onChange, error, ...rest }) => {
  return (
    <View css={styles.container}>
      <TypeField data={data} onChange={onChange} error={error} {...rest} />
      <LabelField data={data} onChange={onChange} error={error} {...rest} />
      <HelpTextField data={data} onChange={onChange} error={error} {...rest} />
      {data.type === 'divider' ? null : <NameField data={data} onChange={onChange} error={error} {...rest} />}
      {data.type === 'navigation' && <EnableMultiLevelField data={data} onChange={onChange} {...rest} />}
      {data.type === 'divider' ? null : <DefaultValueField data={data} onChange={onChange} error={error} {...rest} />}
      <DependenciesField data={data} onChange={onChange} error={error} {...rest} />
      {data.type === 'divider' ? null : <ForceRenderSectionField data={data} onChange={onChange} error={error} {...rest} />}
    </View>
  );
};
