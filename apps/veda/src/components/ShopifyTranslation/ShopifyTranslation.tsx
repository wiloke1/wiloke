import Button from 'components/Button';
import Field from 'components/Field';
import Hotspot from 'components/Hotspot';
import TextInput from 'components/TextInput';
import Tooltip from 'components/Tooltip';
import VirtualList from 'components/VirtualList/VirtualList';
import { cloneDeep, set } from 'lodash';
import { FC, useEffect } from 'react';
import { i18n } from 'translation';
import { Consts } from 'utils/constants/constants';
import { objectEntries } from 'utils/functions/objectEntries';
import { snakeToText } from 'utils/functions/snakeToText';
import { View, ViewProps } from 'wiloke-react-core';
import { flatternObject } from './flatternObject';
import * as styles from './styles';

export type Translation = Record<string, any>;

export interface ShopifyTranslationProps {
  containerCss?: ViewProps['css'];
  lang: string;
  value: Translation;
  onChange?: (translation: Translation) => void;
  /** Event dùng ở ngoài dashboard */
  onSave?: () => void;
}

interface Method {
  getValue(): Record<string, Translation>;
  getValue(lang?: string): Translation;
}

let globalTranslations: Record<string, Translation> = {};

export const ShopifyTranslation: FC<ShopifyTranslationProps> & Method = ({ containerCss, lang, value: translation, onChange, onSave }) => {
  const data = objectEntries(flatternObject(translation));

  useEffect(() => {
    return () => {
      globalTranslations = {};
    };
  }, []);

  useEffect(() => {
    globalTranslations = {
      ...globalTranslations,
      [lang]: translation,
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lang]);

  return (
    <View css={[styles.container, containerCss]}>
      {!!onSave && (
        <Tooltip
          placement="left"
          portal
          text="Please save json before saving settings"
          css={styles.button}
          onClick={() => {
            onSave?.();
          }}
        >
          <Hotspot css={{ position: 'absolute', top: 0, left: 0 }} />
          <Button backgroundColor="gray8" size="extra-small" radius={4}>
            {i18n.t('general.save', { text: 'Json' })}
          </Button>
        </Tooltip>
      )}

      <VirtualList
        disabledScrollStyle={false}
        rowCount={data.length}
        rowHeight={82}
        rowRender={index => {
          const dataSlice = data.slice(index, index + 1);
          const rowItem = dataSlice.length ? dataSlice : [];

          return rowItem.map(([key, val]) => {
            return (
              <Field
                key={`${lang}-${key}`}
                label={key
                  .split('.')
                  .map(snakeToText)
                  .join(' → ')}
                note={`Usage: {{ "${Consts.AppName}.${key}" | t }}`}
                notePopoverWidth={500}
                css={{ height: '82px', marginBottom: '0 !important' }}
              >
                <TextInput
                  block
                  defaultValue={val}
                  onValueChange={value => {
                    onChange?.(set(cloneDeep(translation), key, value));
                    globalTranslations = {
                      ...globalTranslations,
                      [lang]: set(cloneDeep(translation), key, value),
                    };
                  }}
                />
              </Field>
            );
          });
        }}
      />
    </View>
  );
};

ShopifyTranslation.getValue = (lang?: string) => {
  if (lang === undefined) {
    return globalTranslations;
  }
  return globalTranslations[lang];
};
