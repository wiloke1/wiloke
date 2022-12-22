import Field from 'components/Field';
import MyModal from 'components/MyModal';
import { MyModalProps } from 'components/MyModal/MyModal';
import TextInput from 'components/TextInput';
import { equals } from 'ramda';
import { FC, useEffect, useState } from 'react';
import { getLocale, i18n } from 'translation';
import { langOptions } from 'translation/translation';
import { View } from 'wiloke-react-core';
export interface I18nComponentProps extends Pick<MyModalProps, 'onOk' | 'onCancel' | 'isVisible'> {
  label: string | Record<string, string>;
  onResult: (params: string | Record<string, string>) => void;
}

const I18N = langOptions.map(item => item.value);
export const I18nComponent: FC<I18nComponentProps> = ({ label, isVisible, onOk, onCancel, onResult }) => {
  const [modalVisibleState, setModalVisibleState] = useState(isVisible);
  const locale = getLocale();

  const [value, setValue] = useState<Record<string, string>>(
    I18N.reduce((res, language) => {
      return {
        ...res,
        [language]: typeof label === 'string' ? label : label[language],
      };
    }, {}),
  );

  useEffect(() => {
    setModalVisibleState(isVisible);
  }, [isVisible]);

  useEffect(() => {
    if (!equals(value, label)) {
      setValue(
        I18N.reduce((res, language) => {
          return {
            ...res,
            [language]: typeof label === 'string' ? label : label[language],
          };
        }, {}),
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [label]);

  return (
    <MyModal
      headerText={i18n.t('general.label')}
      isVisible={modalVisibleState}
      okText={i18n.t('general.save')}
      onCancel={() => {
        onCancel?.();
        setModalVisibleState(false);
        setValue(
          I18N.reduce((res, language) => {
            return {
              ...res,
              [language]: typeof label === 'string' ? label : label[language],
            };
          }, {}),
        );
      }}
      onOk={() => {
        const _objectValues = Array.from(new Set(Object.values(value)));
        const result = _objectValues.length > 1 ? value : _objectValues[0];
        onOk?.();
        onResult(result);
        setModalVisibleState(false);
      }}
    >
      <View>
        {I18N.map(language => {
          return (
            <Field key={language} label={langOptions.find(option => option.value === language)?.label}>
              <TextInput
                block
                autoFocus={locale === language}
                value={value[language]}
                onValueChange={value => {
                  setValue(state => ({ ...state, [language]: value }));
                }}
              />
            </Field>
          );
        })}
      </View>
    </MyModal>
  );
};
