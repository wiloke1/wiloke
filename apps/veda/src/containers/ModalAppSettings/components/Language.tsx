import SelectLang from 'components/SelectLang';
import Title from 'components/Title';
import { FC } from 'react';
import { useSetReloadPage } from 'store/actions/actionReloadPage';
import { useGetLiquidTranslationsObject } from 'store/actions/liquid/actionLiquidVariables';
import { i18n } from 'translation';
import { View } from 'wiloke-react-core';
import * as styles from '../styles';

export const Language: FC = () => {
  const setReloadPage = useSetReloadPage();

  const getLiquidTranslationsObject = useGetLiquidTranslationsObject();

  return (
    <View css={styles.field}>
      <View css={styles.left}>
        <Title title={i18n.t('general.language')} text="Lorem ipsum dolor sit amet, consectetur adipiscing elit" />
      </View>
      <View css={styles.right}>
        <View css={{ width: '150px' }}>
          <SelectLang
            onClickItem={value => {
              setReloadPage(undefined);
              getLiquidTranslationsObject.request({ locale: value });
            }}
          />
        </View>
      </View>
    </View>
  );
};
