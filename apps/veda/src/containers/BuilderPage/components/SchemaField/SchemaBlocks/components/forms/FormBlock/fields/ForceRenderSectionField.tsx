import Field from 'components/Field';
import { SwitchBeautyDebounce } from 'containers/BuilderPage/components/SchemaField/components/InputDebounced/InputDebounced';
import { useSchemaBlocks } from 'containers/BuilderPage/components/SchemaField/SchemaBlocks/contexts/SchemaBlocksContext';
import { FC } from 'react';
import { i18n } from 'translation';
import { FormBlockProps } from '../FormBlock';

/**
 * Lưu ý: Nếu có update ở đây cần xem xét lại việc file "SchemaField/components/FormSchemaSetting/fields/ForceRenderSectionField/ForceRenderSectionField.tsx" cũng cần có sự update tương tự
 * Vì các field này gần như là giống nhau nhưng cách update data cũng như data type truyền vào có sự khác nhau nên tách ra và cần xem xét việc update cả 2
 */
export const HelpTextField: FC<FormBlockProps> = ({ blockData }) => {
  const { id, forceRenderSection } = blockData;
  const { editBlock } = useSchemaBlocks();

  const handleChange = (checked: boolean) => {
    editBlock({
      blockId: id,
      newData: {
        forceRenderSection: checked,
      },
    });
  };

  return (
    <Field label={i18n.t('schema.force_render_section')}>
      <SwitchBeautyDebounce onValueChange={handleChange} checked={forceRenderSection} />
    </Field>
  );
};
