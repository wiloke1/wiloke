import Button from 'components/Button';
import Empty from 'components/Empty';
import { FC } from 'react';
import { useHistory } from 'react-router';
import { i18n } from 'translation';
import { View } from 'wiloke-react-core';

const NotFoundPage: FC = () => {
  const history = useHistory();

  return (
    <View
      css={{
        margin: 'auto',
        height: '100vh',
        padding: '100px 10px',
        textAlign: 'center',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Empty emoijSize={180} textSize={20} text="Unfortunately, this page doesn't exist." />

      <Button
        size="small"
        onClick={() => {
          history.push('/theme');
        }}
        radius={6}
        css={{ marginTop: '10px' }}
      >
        {i18n.t('builderPage.back_to_dashboard')}
      </Button>
    </View>
  );
};

export default NotFoundPage;
