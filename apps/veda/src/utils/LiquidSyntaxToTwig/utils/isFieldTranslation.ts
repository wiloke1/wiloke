import { SchemaSettingField } from 'types/Schema';

/** Function để nhận biết setting truyền vào có phải đang sử dụng translation hay không */
export const isFieldTranslation = (item: SchemaSettingField) => {
  return (
    typeof item.children === 'string' && (/({\s*)(veda\.[\w.]*)(\s*})/g.test(item.children) || /{{\s*["'].*["']\s*\|\s*t.*}}/g.test(item.children))
  );
};
