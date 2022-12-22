import AsyncComponent from 'components/AsyncComponent';
import MyModal from 'components/MyModal';
import { FC } from 'react';
import { useSelector } from 'react-redux';
import {
  useSetModalUpdateAddon,
  useSetModalUpdateSection,
  useUpdateAddonVersion,
  useUpdateSectionVersion,
} from 'store/actions/versions/actionSectionVersion';
import { pagesSelector, themeAddonsSelector, versionSelector } from 'store/selectors';
import { i18n } from 'translation';
import { SectionOfPage_Atom_N_ClientOrTheme_Atom_N_Client } from 'types/Sections';
import { timeConverter } from 'utils/timeAgo';
import { v4 } from 'uuid';
import { Space, Text, View } from 'wiloke-react-core';

import { SettingsChanges } from './components/SettingsChanges';
import * as styles from './styles';

export const ModalVersion: FC = () => {
  const { sectionsVersion, addonsVersion, modalUpdateSection, modalUpdateAddon, getNewVersionRequest } = useSelector(versionSelector);
  const { updateVersionStatus } = useSelector(pagesSelector);
  const { updateVersionStatus: updateVersionAddonStatus } = useSelector(themeAddonsSelector);

  const updateVersionSection = useUpdateSectionVersion();
  const updateVersionAddon = useUpdateAddonVersion();

  const setModalUpdateSection = useSetModalUpdateSection();
  const setModalUpdateAddon = useSetModalUpdateAddon();

  const handleCancel = () => {
    setModalUpdateSection(undefined);
    setModalUpdateAddon(undefined);
  };

  const handleUpdate = () => {
    if (modalUpdateSection?.parentCommandId) {
      updateVersionSection.request({ id: modalUpdateSection.parentCommandId });
    }
    if (modalUpdateAddon && modalUpdateAddon?.parentCommandId) {
      updateVersionAddon.request({
        id: modalUpdateAddon.parentCommandId,
        prevAddonSection: modalUpdateAddon.body as SectionOfPage_Atom_N_ClientOrTheme_Atom_N_Client,
      });
    }
  };

  const renderChangelogs = () => {
    let history: typeof sectionsVersion[string] | typeof addonsVersion[string] | undefined = undefined;
    if (modalUpdateSection?.parentCommandId) {
      history = sectionsVersion[modalUpdateSection.parentCommandId];
    }
    if (modalUpdateAddon?.parentCommandId) {
      history = addonsVersion[modalUpdateAddon.parentCommandId];
    }
    if (history?.data) {
      return history.data.changelogs.map((changelog, index) => (
        <View className="changelog-box" key={v4()} css={styles.changelogBox}>
          <View>
            <View css={{ display: 'flex', alignItems: 'center' }}>
              <Text fontFamily="secondary" tagName="h5">
                {i18n.t('general.version')}: {changelog.version}
              </Text>
              {index === 0 && (
                <Text tagName="span" css={styles.changelogLatest}>
                  {i18n.t('general.latest')}
                </Text>
              )}
            </View>
            <Space size={2} />
            <Text fontFamily="secondary">{changelog.description}</Text>
          </View>

          <View fontFamily="secondary">{changelog.createdDateTimestamp ? timeConverter(changelog.createdDateTimestamp) : null}</View>
        </View>
      ));
    }
    return null;
  };

  const renderSuccess = (
    <>
      <View tagName="h4" css={styles.heading}>
        Details
      </View>

      <SettingsChanges />
    </>
  );

  return (
    <MyModal
      isLoading={updateVersionStatus === 'loading' || updateVersionAddonStatus === 'loading'}
      headerText={`${i18n.t('general.update', { textTransform: 'capitalize', text: i18n.t('general.version') })}`}
      cancelText={`${i18n.t('general.cancel')}`}
      okText={i18n.t('general.update')}
      isVisible={!!modalUpdateSection || !!modalUpdateAddon}
      onCancel={handleCancel}
      onOk={handleUpdate}
      size="medium"
    >
      <View row>
        <View columns={[6]}>
          <AsyncComponent status={getNewVersionRequest} Success={renderSuccess} />
        </View>
        <View columns={[6]}>
          <View tagName="h4" css={styles.heading}>
            Releases
          </View>

          <View css={styles.changelogContainer}>{renderChangelogs()}</View>
        </View>
      </View>
    </MyModal>
  );
};
