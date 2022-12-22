import Empty from 'components/Empty';
import Field from 'components/Field';
import SeoPreview from 'components/SeoPreview';
import SwitchBeauty from 'components/SwitchBeauty';
import Textarea from 'components/Textarea';
import TextInput from 'components/TextInput';
import Title from 'components/Title';
import withDebounce from 'hocs/withDebounce';
import { FC } from 'react';
import { useSelector } from 'react-redux';
import { i18n } from 'translation';
import { PageSettings } from 'types/Result';
import getPageInfo from 'utils/functions/getInfo';
import { Space, Styles, View } from 'wiloke-react-core';
import { dashboardPageSettingsSelector, useChangeSettingsDashboardPage } from '..';

const containerStyles: Styles = {
  className: 'GeneralSettings-container',
  padding: '20px',
  flex: 1,
};

const TextInputDebounce = withDebounce(TextInput, 'value', 'onValueChange');

export const GeneralSettings: FC = () => {
  const { page } = useSelector(dashboardPageSettingsSelector);
  const shop = getPageInfo('shop');
  const changeSettings = useChangeSettingsDashboardPage();

  const myWebsite = `https://www.${shop}`;

  const getLink = () => {
    switch (page?.type) {
      case 'article':
        return `${myWebsite}/blogs/my-article`;
      case 'collection':
        return `${myWebsite}/collections`;
      case 'product':
        return `${myWebsite}/products`;
      default:
        return page?.pageSettings?.generalSettings.handle || myWebsite;
    }
  };

  if (page) {
    const pageSettings = page?.pageSettings as PageSettings;

    const renderFieldSlug = (
      <Field
        label={i18n.t('builderPage.page_settings.general_settings.seo.url_slug.title')}
        note={i18n.t('builderPage.page_settings.general_settings.seo.url_slug.text')}
      >
        <TextInputDebounce
          value={pageSettings.generalSettings.handle}
          block
          sizeInput="medium"
          onValueChange={value => {
            changeSettings({
              page: {
                ...page,
                pageSettings: {
                  ...pageSettings,
                  generalSettings: {
                    ...pageSettings.generalSettings,
                    handle: value,
                  },
                },
              },
              isChangingHandle: true,
            });
          }}
        />
      </Field>
    );

    return (
      <View css={containerStyles}>
        <View css={{ padding: '20px', height: page?.type !== 'page' ? '100%' : 'auto' }} radius={6} backgroundColor="gray1">
          <View row>
            <View columns={[5]}>
              <Space size={10} />
              <Title
                title={i18n.t('builderPage.page_settings.general_settings.general.title')}
                text={i18n.t('builderPage.page_settings.general_settings.general.text')}
                titleCss={{ fontSize: '20px' }}
              />
            </View>
            <View columns={[7]}>
              <Field label={i18n.t('builderPage.page_settings.general_settings.general.name')}>
                <TextInputDebounce
                  value={pageSettings.generalSettings.label}
                  block
                  sizeInput="medium"
                  onValueChange={value => {
                    changeSettings({
                      page: {
                        ...page,
                        label: value,
                        pageSettings: {
                          ...pageSettings,
                          generalSettings: {
                            ...pageSettings.generalSettings,
                            label: value,
                          },
                        },
                      },
                    });
                  }}
                />
              </Field>
              <Field label={i18n.t('builderPage.page_settings.general_settings.general.enable_header_footer')}>
                <SwitchBeauty
                  checked={pageSettings.generalSettings.headerFooterEnabled}
                  radius={6}
                  borderColor="gray3"
                  borderWidth={1}
                  enableText={i18n.t('general.enable')}
                  disableText={i18n.t('general.disable')}
                  onValueChange={value => {
                    changeSettings({
                      page: {
                        ...page,
                        pageSettings: {
                          ...pageSettings,
                          generalSettings: {
                            ...pageSettings.generalSettings,
                            headerFooterEnabled: value,
                          },
                        },
                      },
                    });
                  }}
                />
              </Field>
            </View>
          </View>
        </View>

        {page?.type === 'page' && (
          <>
            <Space size={20} />
            <View css={{ padding: '20px' }} radius={6} backgroundColor="gray1">
              <View row>
                <View columns={[5]}>
                  <Space size={10} />
                  <Title
                    title={i18n.t('builderPage.page_settings.general_settings.seo.title')}
                    text={i18n.t('builderPage.page_settings.general_settings.seo.text')}
                    titleCss={{ fontSize: '20px' }}
                  />
                </View>
                <View columns={[7]}>
                  <Field label={i18n.t('general.preview')}>
                    <SeoPreview
                      link={getLink()}
                      title={pageSettings.generalSettings.metaTitle || i18n.t('builderPage.page_settings.general_settings.meta_title_placeholder')}
                      description={
                        pageSettings.generalSettings.metaDescription ||
                        i18n.t('builderPage.page_settings.general_settings.meta_description_placeholder')
                      }
                    />
                  </Field>
                  {renderFieldSlug}
                  <Field
                    label={i18n.t('builderPage.page_settings.general_settings.seo.meta_title.title')}
                    note={i18n.t('builderPage.page_settings.general_settings.seo.meta_title.text')}
                  >
                    <TextInputDebounce
                      value={pageSettings.generalSettings.metaTitle}
                      block
                      sizeInput="medium"
                      onValueChange={value => {
                        changeSettings({
                          page: {
                            ...page,
                            pageSettings: {
                              ...pageSettings,
                              generalSettings: {
                                ...pageSettings.generalSettings,
                                metaTitle: value,
                              },
                            },
                          },
                        });
                      }}
                    />
                  </Field>
                  <Field
                    label={i18n.t('builderPage.page_settings.general_settings.seo.meta_description.title')}
                    note={i18n.t('builderPage.page_settings.general_settings.seo.meta_description.text')}
                  >
                    <Textarea
                      value={pageSettings.generalSettings.metaDescription}
                      onChangeText={value => {
                        changeSettings({
                          page: {
                            ...page,
                            pageSettings: {
                              ...pageSettings,
                              generalSettings: {
                                ...pageSettings.generalSettings,
                                metaDescription: value,
                              },
                            },
                          },
                        });
                      }}
                    />
                  </Field>
                </View>
              </View>
            </View>
          </>
        )}
        <Space size={20} />
      </View>
    );
  }

  return <Empty />;
};
