import { PRESET_STYLE_FIELD } from 'utils/constants/chunkIds';
import { CodeSpliting } from 'components/CodeSpliting';
import SectionPageHeader from 'components/SectionPageHeader';
import { Dashboard } from 'containers/Dashboard';
import { FC } from 'react';
import { i18n } from 'translation';
import { View } from 'wiloke-react-core';

export const PresetStylesPage: FC = () => {
  return (
    <Dashboard
      hasSubmenu={false}
      disabledPaddingContent
      Content={() => (
        <View css={{ padding: '60px' }}>
          <SectionPageHeader
            disableButton
            title={i18n.t('general.presets', { text: i18n.t('general.style') })}
            description={i18n.t('adminDashboard.page_description.preset')}
          />

          <CodeSpliting
            component={() => import(/* webpackChunkName: "PresetStyleField", webpackPrefetch: true */ './PresetStyleField')}
            CHUNK_ID={PRESET_STYLE_FIELD}
          />
        </View>
      )}
    />
  );
};
