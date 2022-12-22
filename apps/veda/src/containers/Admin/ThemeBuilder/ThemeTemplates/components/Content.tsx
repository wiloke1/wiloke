import { notification } from 'antd';
import AsyncComponent from 'components/AsyncComponent';
import ImageTextCard from 'components/ImageTextCard';
import SectionPageHeader from 'components/SectionPageHeader';
import { useSocketForImportThemeAtomToClientService } from 'hooks/useSocket/useSocketForImportThemeAtomToClientService';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { themeBuilderSelector } from 'store/selectors';
import { i18n } from 'translation';
import { GridSmart, View } from 'wiloke-react-core';
import { useDeleteProductTheme, useGetThemeTemplates, useImportThemeAtomToClient } from '../actions';

export const Content = () => {
  const { requestStatus, templates, importStatus, deleteStatus } = useSelector(themeBuilderSelector.templates);

  const importThemeAtomToClient = useImportThemeAtomToClient();
  const getTemplates = useGetThemeTemplates();
  const deleteTheme = useDeleteProductTheme();

  const { connect, statusSocketConnection } = useSocketForImportThemeAtomToClientService();
  const history = useHistory();

  useEffect(() => {
    getTemplates.request({ search: '' });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleInstall = (parentCommandId: string) => () => {
    connect({
      onSuccess: () => {
        importThemeAtomToClient.request({
          themeAtomCommandId: parentCommandId,
          onFulfill: () => {
            history.push('/theme', {
              justInstalled: true,
            });
          },
        });
      },
      onError: () => {
        notification.error({
          message: i18n.t('publish_shopify.init_sync_error'),
        });
      },
    });
  };

  const renderGetThemesSuccess = () => {
    return templates.map(item => (
      <ImageTextCard.Style2
        key={item.commandId}
        label={item.name}
        heightImage={item.featuredImage ? 330 : 320}
        widthImage={250}
        src={item?.featuredImage}
        description={item.description}
        onAdd={handleInstall(item.parentCommandId)}
        loadingAdd={
          statusSocketConnection === 'loading' || importStatus[item.parentCommandId] === 'loading' || deleteStatus[item.commandId] === 'loading'
        }
        onDelete={() => {
          deleteTheme.request({ commandId: item.commandId });
        }}
        disabledIconSave
      />
    ));
  };

  return (
    <View>
      <SectionPageHeader
        disableButton
        title={i18n.t('adminDashboard.theme_templates')}
        description="A forest of aesthetic theme templates for you to handpick and customize."
        buttonContent={i18n.t('general.create_button', { text: 'theme' })}
      />

      <AsyncComponent
        status={requestStatus}
        Request={
          <GridSmart columnWidth={250} columnGap={20} columnCount={5}>
            {[0, 1, 2, 3].map(item => (
              <ImageTextCard.Loading key={item} height={350} />
            ))}
          </GridSmart>
        }
        Success={
          <GridSmart columnWidth={250} columnGap={20} columnCount={5}>
            {renderGetThemesSuccess()}
          </GridSmart>
        }
      />
    </View>
  );
};

export default Content;
