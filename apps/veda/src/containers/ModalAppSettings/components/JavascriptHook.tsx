import Switch from 'components/Switch';
import Title from 'components/Title';
import { FC } from 'react';
import { useSelector } from 'react-redux';
import { appSettingsSelector, useChangeAppSettings } from 'store/global/appSettings/slice';
import { View } from 'wiloke-react-core';
import * as styles from '../styles';

export const JavascriptHook: FC = () => {
  const changeAppSettings = useChangeAppSettings();
  const { data } = useSelector(appSettingsSelector);

  return (
    <View css={styles.field}>
      <View css={styles.left}>
        <Title title="JavaScript Hook" text="Bật chức năng javascript hook lorem ipsum" />
      </View>
      <View css={styles.right}>
        <Switch
          checked={data.jsHookEnabled}
          onValueChange={value => {
            changeAppSettings({ jsHookEnabled: value });
          }}
        />
      </View>
    </View>
  );
};
