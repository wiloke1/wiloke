import Field from 'components/Field';
import Tooltip from 'components/Tooltip';
import {
  IGNORE_TYPES_IN_ARRAY_FIELD,
  labelOfTypes as labelOfTypes_,
} from 'containers/BuilderPage/components/SchemaField/components/FormSchemaSetting/fields/TypeField/TypeField';
import { RadioDebounce, SliderBeautyDebounce } from 'containers/BuilderPage/components/SchemaField/components/InputDebounced/InputDebounced';
import { BLOCK_TYPES } from 'containers/BuilderPage/components/SchemaField/SchemaBlocks/const';
import { useSchemaBlocks } from 'containers/BuilderPage/components/SchemaField/SchemaBlocks/contexts/SchemaBlocksContext';
import { FC } from 'react';
import { i18n } from 'translation';
import { SettingBlock } from 'types/Schema';
import { View } from 'wiloke-react-core';
import { FormBlockProps } from '../FormBlock';

export const labelOfTypes: Record<SettingBlock['type'], string> = {
  array: i18n.t('schema.fieldLabel.array'),
  object: i18n.t('schema.fieldLabel.object'),
};

const ignoreFieldTypes = IGNORE_TYPES_IN_ARRAY_FIELD.map(item => `"${labelOfTypes_[item]}"`).join(' ');

/**
 * Lưu ý: Nếu có update ở đây cần xem xét lại việc file "SchemaField/components/FormSchemaSetting/fields/TypeField/TypeField.tsx" cũng cần có sự update tương tự
 * Vì các field này gần như là giống nhau nhưng cách update data cũng như data type truyền vào có sự khác nhau nên tách ra và cần xem xét việc update cả 2
 */
export const TypeField: FC<FormBlockProps> = ({ blockData }) => {
  const { type, children, id } = blockData;
  const { editBlock } = useSchemaBlocks();

  return (
    <>
      <Field label={i18n.t('schema.type')}>
        <RadioDebounce.Group
          block
          size="large"
          value={type}
          onChangeValue={value => {
            editBlock({
              blockId: id,
              newData: {
                type: value as SettingBlock['type'],
              },
            });
          }}
        >
          {BLOCK_TYPES.map(blockType => {
            // NOTE: @tuong -> Nếu đang là object mà có "IGNORE_TYPES_IN_ARRAY_FIELD" thì không phải đảo sang array
            const isInvalid =
              blockType === 'array' && type === 'object' && !!children.find(fieldChild => IGNORE_TYPES_IN_ARRAY_FIELD.includes(fieldChild.type));
            if (isInvalid) {
              return (
                <RadioDebounce.Button key={blockType} value={blockType} disabled={isInvalid}>
                  <Tooltip
                    text={i18n.t('schema.must_be_object', {
                      field_types: ignoreFieldTypes,
                    })}
                    css={{ width: '100%', height: '100%' }}
                  >
                    <View>{labelOfTypes[blockType]}</View>
                  </Tooltip>
                </RadioDebounce.Button>
              );
            }
            return (
              <RadioDebounce.Button key={blockType} value={blockType} disabled={isInvalid}>
                {labelOfTypes[blockType]}
              </RadioDebounce.Button>
            );
          })}
        </RadioDebounce.Group>
      </Field>
      {type === 'array' && (
        <Field label="Max items of array field">
          <SliderBeautyDebounce
            borderColor="gray3"
            borderInputColor="gray3"
            clearEnabled
            value={type === 'array' ? blockData.max : undefined}
            onValueChange={val => {
              editBlock({
                blockId: id,
                newData: {
                  max: val,
                },
              });
            }}
          />
        </Field>
      )}
    </>
  );
};
