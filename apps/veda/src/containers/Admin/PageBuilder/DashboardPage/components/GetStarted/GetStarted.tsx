import Box from 'components/FieldBox';
import { i18n } from 'translation';
import { View } from 'wiloke-react-core';
import * as styles from './styles';

const GetStarted = () => {
  return (
    <Box.WithTitle
      title={i18n.t('adminDashboard.get_started')}
      description={i18n.t('adminDashboard.get_started_description')}
      backgroundColor="light"
      css={styles.content}
      borderWidth={0}
    >
      <View
        css={{
          position: 'relative',
          width: '100%',
          overflow: 'hidden',
          paddingTop: '56%',
        }}
        radius={6}
      >
        <iframe
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            bottom: 0,
            right: 0,
            width: '100%',
            height: '100%',
            border: 'none',
          }}
          src={'https://www.youtube.com/embed/7xQyL2kXbI0'}
          frameBorder="0"
          allow="autoplay; encrypted-media"
          allowFullScreen
          title="video"
        />
      </View>
    </Box.WithTitle>
  );
};

export default GetStarted;
