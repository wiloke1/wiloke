import Button from 'components/Button';
import Field from 'components/Field';
import { SwitchBeautyDebounce, TextInputDebounce } from 'containers/BuilderPage/components/SchemaField/components/InputDebounced/InputDebounced';
import { FC } from 'react';
import { i18n } from 'translation';
import { SettingRadioGroup, SettingSelect } from 'types/Schema';
import { v4 } from 'uuid';
import { FontAwesome, View } from 'wiloke-react-core';
import { FormSchemaSettingProps } from '../../../type';

export const Select_RadioGroup: FC<FormSchemaSettingProps> = ({ data, onChange }) => {
  const _data = data as SettingSelect | SettingRadioGroup;
  return (
    <View>
      {_data.options.map(item => (
        <View key={item.id} css={{ marginBottom: '8px' }}>
          <View css={{ display: 'flex', alignItems: 'end', '> *': { flex: '1 1 auto', margin: '0 8px 0 0' } }}>
            <Field fontSize={12} label={i18n.t('general.label')}>
              <TextInputDebounce
                block
                autoFocus
                value={item.label}
                onValueChange={value => {
                  onChange?.({
                    options: _data.options.map(option => {
                      if (option.id === item.id) {
                        return {
                          ...option,
                          label: value,
                          value:
                            option.label.toLowerCase().replaceAll(' ', '_') === option.value
                              ? value.toLowerCase().replaceAll(' ', '_')
                              : option.value,
                        };
                      }
                      return option;
                    }),
                  } as SettingSelect);
                }}
              />
            </Field>
            <Field fontSize={12} label={i18n.t('general.value')}>
              <TextInputDebounce
                block
                value={item.value.toString()}
                maxLength={15} // @tuong -> Shopify thường giới hạn 25 kí tự ==> Giới hạn 15 vì cần nối thêm những cái khác nữa
                onValueChange={value => {
                  onChange?.({
                    children: item.value === _data.children ? value : _data.children,
                    options: _data.options.map(option => {
                      if (option.id === item.id) {
                        return { ...option, value };
                      }
                      return option;
                    }),
                  } as SettingSelect);
                }}
              />
            </Field>
            <Field fontSize={12} label={i18n.t('general.default')}>
              <SwitchBeautyDebounce
                disableText=""
                enableText=""
                checked={!!_data.children && _data.children === item.value}
                onChange={checked => {
                  if (checked) {
                    onChange?.({
                      children: item.value,
                    } as SettingSelect);
                  } else {
                    onChange?.({
                      children: '',
                    } as SettingSelect);
                  }
                }}
              />
            </Field>
            <Button
              backgroundColor="gray2"
              size="small"
              radius={6}
              color="gray9"
              css={{ height: '46px' }}
              onClick={() => {
                onChange?.({
                  options: _data.options.filter(option => option.id !== item.id),
                } as SettingSelect);
              }}
            >
              <FontAwesome type="far" name="trash" size={18} />
            </Button>
          </View>
        </View>
      ))}
      <Button
        block
        radius={6}
        backgroundColor="gray2"
        color="gray8"
        css={{ marginTop: '8px' }}
        onClick={() => {
          onChange?.({
            options: _data.options.concat({ label: '', value: '', id: v4() }),
          } as any);
        }}
      >
        {i18n.t('general.add', { text: i18n.t('general.value', { text: i18n.t('general.default') }), textTransform: 'capitalize' })}
      </Button>
    </View>
  );
};
