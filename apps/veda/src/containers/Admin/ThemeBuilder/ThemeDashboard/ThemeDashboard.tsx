import { CodeSpliting } from 'components/CodeSpliting';
import { Dashboard } from 'containers/Dashboard';
import { DRAFT_THEMES, LIVE_THEME, RIGHTBAR_ADMIN } from 'utils/constants/chunkIds';
import { View } from 'wiloke-react-core';

export const ThemeDashboard = () => {
  return (
    <Dashboard
      Content={() => (
        <View css={{ display: 'flex' }}>
          <View className="dashboard-admin" columns={[8, 8, 8]} css={{ padding: '0 0 20px' }}>
            <CodeSpliting
              component={() => import(/* webpackChunkName: "LiveTheme", webpackPrefetch: true */ './components/LiveTheme')}
              CHUNK_ID={LIVE_THEME}
            />
            <CodeSpliting
              component={() => import(/* webpackChunkName: "DraftThemes", webpackPrefetch: true */ './components/DraftThemes')}
              CHUNK_ID={DRAFT_THEMES}
            />
          </View>
          <CodeSpliting
            component={() => import(/* webpackChunkName: "RightBarAdmin", webpackPrefetch: true */ 'containers/Admin/RightBar')}
            CHUNK_ID={RIGHTBAR_ADMIN}
          />
        </View>
      )}
    />
  );
};
