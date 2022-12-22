import Field from 'components/Field';
import { SwitchBeautyDebounce } from 'containers/BuilderPage/components/SchemaField/components/InputDebounced/InputDebounced';
import { FC } from 'react';
import { i18n } from 'translation';
import { FormSchemaSettingProps } from '../../type';

/**
 * Lưu ý: Nếu có update ở đây cần xem xét lại việc file "SchemaField/SchemaBlocks/components/forms/FormBlock/fields/ForceRenderSectionField/ForceRenderSectionField.tsx" cũng cần có sự update tương tự
 * Vì các field này gần như là giống nhau nhưng cách update data cũng như data type truyền vào có sự khác nhau nên tách ra và cần xem xét việc update cả 2
 */
export const ForceRenderSectionField: FC<FormSchemaSettingProps> = ({ data, onChange }) => {
  const handleChange = (checked: boolean) => {
    onChange?.({
      forceRenderSection: checked,
    });
  };

  return (
    <Field label={i18n.t('schema.force_render_section')}>
      <SwitchBeautyDebounce onValueChange={handleChange} checked={data.forceRenderSection} />
    </Field>
  );
};
