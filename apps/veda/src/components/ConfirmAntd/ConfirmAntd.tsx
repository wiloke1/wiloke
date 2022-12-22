import React, { FC } from 'react';
import { Popconfirm, PopconfirmProps } from 'antd';
import { useStyleSheet, useTheme, View } from 'wiloke-react-core';
import { i18n } from 'translation';
import * as css from './styles';

export interface PopConfirmAntdProps extends PopconfirmProps {
  loading?: boolean;
}

const ConfirmAntd: FC<PopConfirmAntdProps> = ({ loading = false, ...rest }) => {
  const { colors, fonts } = useTheme();
  const { styles } = useStyleSheet(colors);

  return (
    <View className="PopConfirmAntd-container" css={css.container}>
      <Popconfirm
        {...rest}
        okText={i18n.t('general.confirm')}
        cancelButtonProps={{ className: styles(css.cancelButton), style: { fontFamily: fonts.secondary }, ...rest.cancelButtonProps }}
        okButtonProps={{ className: styles(css.confirmButton), style: { fontFamily: fonts.secondary }, loading, ...rest.okButtonProps }}
        icon={null}
      />
    </View>
  );
};

export default ConfirmAntd;
