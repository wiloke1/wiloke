import { CodeSpliting } from 'components/CodeSpliting';
import { Dashboard } from 'containers/Dashboard';
import { FC } from 'react';
import { THEME_TEMPLATES_MAIN_CONTENT } from 'utils/constants/chunkIds';
import { View } from 'wiloke-react-core';
import * as styles from './styles';

export const ThemeTemplates: FC = () => {
  return (
    <Dashboard
      disabledPaddingContent
      Content={() => (
        <View backgroundColor="gray1" css={styles.container}>
          <CodeSpliting
            component={() => import(/* webpackChunkName: "ThemeTemplatesMainContent", webpackPrefetch: true */ './components/Content')}
            CHUNK_ID={THEME_TEMPLATES_MAIN_CONTENT}
          />
        </View>
      )}
    />
  );
};
