import ChooseImage from 'components/ChooseImage';
import Field from 'components/Field';
import SeoPreview from 'components/SeoPreview';
import SocialSharePreview from 'components/SocialSharePreview';
import SwitchBeauty from 'components/SwitchBeauty';
import Textarea from 'components/Textarea';
import TextInput from 'components/TextInput';
import Title from 'components/Title';
import { useChangeSettingsDashboardPage } from 'containers/Admin/PageBuilder/DashboardPageSettings';
import withDebounce from 'hocs/withDebounce';
import { FC } from 'react';
import { useSelector } from 'react-redux';
import { useSetGeneralSettingsPage } from 'store/global/generalSettings/slice';
import { generalSettingsSelector, pageDataSelector } from 'store/selectors';
import { i18n } from 'translation';
import getPageInfo from 'utils/functions/getInfo';
import { Space, Styles, View } from 'wiloke-react-core';

const containerStyles: Styles = {
  className: 'GeneralSettings-container',
  padding: '20px',
};

const TextInputDebounce = withDebounce(TextInput, 'value', 'onValueChange');

const GeneralSettings: FC = () => {
  const generalSettings = useSelector(generalSettingsSelector);
  const setGeneralSettings = useSetGeneralSettingsPage();
  const pageData = useSelector(pageDataSelector);
  const shop = getPageInfo('shop');
  const myWebsite = `https://www.${shop}`;
  const disableSeoField = pageData.type !== 'home';
  const changeSettings = useChangeSettingsDashboardPage();

  const getLink = () => {
    switch (pageData.type) {
      case 'article':
        return `${myWebsite}/blogs/${generalSettings.handle}`;
      case 'collection':
        return `${myWebsite}/collections`;
      case 'product':
        return `${myWebsite}/products`;
      default:
        return generalSettings.handle || myWebsite;
    }
  };

  return (
    <View css={containerStyles}>
      <View css={{ padding: '20px' }} radius={6} backgroundColor="gray1">
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
                value={generalSettings.label}
                block
                sizeInput="medium"
                onValueChange={value => {
                  setGeneralSettings({ settings: { label: value } });
                }}
              />
            </Field>
            <Field label={i18n.t('builderPage.page_settings.general_settings.general.enable_header_footer')}>
              <SwitchBeauty
                checked={generalSettings.headerFooterEnabled}
                radius={6}
                borderColor="gray3"
                borderWidth={1}
                enableText={i18n.t('general.enable')}
                disableText={i18n.t('general.disable')}
                onValueChange={value => {
                  setGeneralSettings({ settings: { headerFooterEnabled: value } });
                }}
              />
            </Field>
          </View>
        </View>
      </View>
      <Space size={10} />
      <Space size={10} />
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
                title={generalSettings.metaTitle || i18n.t('builderPage.page_settings.general_settings.meta_title_placeholder')}
                description={generalSettings.metaDescription || i18n.t('builderPage.page_settings.general_settings.meta_description_placeholder')}
              />
            </Field>
            <Field
              label={i18n.t('builderPage.page_settings.general_settings.seo.url_slug.title')}
              note={i18n.t('builderPage.page_settings.general_settings.seo.url_slug.text')}
            >
              <TextInputDebounce
                value={generalSettings.handle}
                block
                sizeInput="medium"
                onValueChange={value => {
                  setGeneralSettings({ settings: { handle: value } });
                  changeSettings({ isChangingHandle: true });
                }}
              />
            </Field>
            <Field
              label={i18n.t('builderPage.page_settings.general_settings.seo.meta_title.title')}
              note={i18n.t('builderPage.page_settings.general_settings.seo.meta_title.text')}
            >
              <TextInputDebounce
                disabled={disableSeoField}
                value={generalSettings.metaTitle}
                block
                sizeInput="medium"
                onValueChange={value => {
                  setGeneralSettings({ settings: { metaTitle: value } });
                }}
              />
            </Field>
            <Field
              label={i18n.t('builderPage.page_settings.general_settings.seo.meta_description.title')}
              note={i18n.t('builderPage.page_settings.general_settings.seo.meta_description.text')}
            >
              <Textarea
                disabled={disableSeoField}
                value={generalSettings.metaDescription}
                onChangeText={value => {
                  setGeneralSettings({ settings: { metaDescription: value } });
                }}
              />
            </Field>
          </View>
        </View>
      </View>
      {!disableSeoField && (
        <>
          <Space size={10} />
          <View css={{ padding: '20px' }} radius={6} backgroundColor="gray1">
            <View row>
              <View columns={[5]}>
                <Space size={10} />
                <Title
                  title={i18n.t('builderPage.page_settings.general_settings.social_share.title')}
                  text={i18n.t('builderPage.page_settings.general_settings.social_share.text')}
                  titleCss={{ fontSize: '20px' }}
                />
              </View>
              <View columns={[7]}>
                <Field label={i18n.t('general.preview')}>
                  <SocialSharePreview
                    Top={
                      <ChooseImage
                        value={{ src: generalSettings.socialShareImage, width: 0, height: 0 }}
                        mode="popup"
                        onChange={value => {
                          setGeneralSettings({ settings: { socialShareImage: value.src } });
                        }}
                      />
                    }
                    link={getLink()}
                    title={generalSettings.metaTitle || i18n.t('builderPage.page_settings.general_settings.meta_title_placeholder')}
                    description={generalSettings.metaDescription || i18n.t('builderPage.page_settings.general_settings.meta_description_placeholder')}
                  />
                </Field>
              </View>
            </View>
          </View>
        </>
      )}
    </View>
  );
};

export default GeneralSettings;
