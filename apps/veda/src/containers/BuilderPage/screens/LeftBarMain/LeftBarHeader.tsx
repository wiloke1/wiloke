import BoxCenter from 'components/BoxCenter';
import Dropdown from 'components/Dropdown';
import Logo from 'components/Logo';
import { FC } from 'react';
import { useSelector } from 'react-redux';
import { useSetAppSettingsVisible } from 'store/global/appSettings/slice';
import { pageDataSelector, pageSettingsSelector } from 'store/selectors';
import { i18n } from 'translation';
import { FileImportExportContent } from 'types/FileImportExport';
import { Consts } from 'utils/constants/constants';
import fileDownload from 'utils/functions/fileDownload';
import getPageInfo from 'utils/functions/getInfo';
import { FontAwesome, View } from 'wiloke-react-core';
import { Exit } from './Exit';
import * as styles from './styles';

/**
 * LeftBarHeader
 * @description Component tại đầu trang bên trái
 */
const LeftBarHeader: FC = () => {
  const page = useSelector(pageDataSelector);
  const pageSettings = useSelector(pageSettingsSelector);
  const setAppSettingsVisible = useSetAppSettingsVisible();
  const pageId = getPageInfo('id');

  const handlePageExport = () => {
    const data = JSON.stringify({
      page,
      pageSettings: {
        generalSettings: pageSettings.generalSettings[pageId],
        vendors: pageSettings.vendors[pageId],
        globalJs: pageSettings.globalJs[pageId],
        globalScss: pageSettings.globalScss[pageId],
      },
    } as Required<FileImportExportContent>);
    const name = `${page.label.replace(/\s/g, '-')}-${page.commandId}.${Consts.AppName}`;
    fileDownload({
      data,
      name,
    });
  };

  const handleOpenAppSettings = () => {
    setAppSettingsVisible(true);
  };

  return (
    <View css={styles.header}>
      <View css={styles.headerLeft}>
        <Exit />
        <Logo />
      </View>
      <Dropdown
        data={[
          { icon: 'cog', label: i18n.t('general.app_settings'), value: 'app_settings' },
          { icon: 'file-alt', label: i18n.t('general.documents'), value: 'documents' },
          { icon: 'life-ring', label: i18n.t('general.support'), value: 'support' },
          { icon: 'history', label: i18n.t('general.version'), value: 'version' },
          {
            icon: 'file-export',
            label: i18n.t('general.page', { text: i18n.t('general.export'), textTransform: 'capitalize' }),
            value: 'page_export',
          },
        ]}
        onClick={type => {
          switch (type) {
            case 'page_export':
              return handlePageExport();
            case 'app_settings':
              return handleOpenAppSettings();
          }
        }}
      >
        <BoxCenter onClick={() => {}}>
          <FontAwesome type="far" name="ellipsis-v" size={18} color="gray8" colorHover="primary" />
        </BoxCenter>
      </Dropdown>
    </View>
  );
};

export default LeftBarHeader;
