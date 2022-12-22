import Button from 'components/Button';
import Field from 'components/Field';
import Box from 'components/FieldBox';
import { CSSProperties, FC, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { authSelector } from 'store/selectors';
import { i18n } from 'translation';
import { View } from 'wiloke-react-core';
import * as styles from './styles';

const inputStyles: CSSProperties = {
  display: 'block',
  padding: '10px',
  width: '100%',
  boxShadow: 'none',
  border: '1px solid #DEDEE9',
  outline: 'none',
  borderRadius: '4px',
};

export const LoginPage: FC = () => {
  const { status } = useSelector(authSelector);
  const history = useHistory();

  useEffect(() => {
    if (status === 'success') {
      history.push('/theme');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status]);

  return (
    <View className="Login-page" backgroundColor="gray2" css={styles.container}>
      <View tagName="h1" fontFamily="secondary" css={styles.title}>
        Veda dev login
      </View>
      <Box css={styles.form} borderColor="gray3" tagName="form" action="https://api.vedabuilder.com/" method="POST">
        <Field label={i18n.t('adminDashboard.username')}>
          <input name="username" style={inputStyles} />
        </Field>

        <Field label={i18n.t('adminDashboard.password')}>
          <input name="password" style={inputStyles} />
        </Field>
        <input type="text" hidden value="adminLogin" name="action" />
        <input type="text" hidden value="https://dashboard.vedabuilder.com/" name="redirectTo" />
        <Button type="submit" radius={4} size="small">
          {i18n.t('general.login')}
        </Button>
      </Box>
    </View>
  );
};
