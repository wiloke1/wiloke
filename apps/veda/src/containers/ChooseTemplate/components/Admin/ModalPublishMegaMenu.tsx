import { message } from 'antd';
import Field from 'components/Field';
import MyModal from 'components/MyModal';
import SelectAntd from 'components/SelectAntd';
import TextInput from 'components/TextInput';
import { pageTypeData } from 'containers/BuilderPage/components/ModalSaveForBuilder/utils/pageTypeData';
import { useGetAdminMegaMenuChangelog, usePublishAdminMegaMenuToProduct, useSetSettingsAdminMegaMenu } from 'containers/ChooseTemplate/store/actions';
import withDebounce from 'hocs/withDebounce';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { megaMenuSelector } from 'store/selectors';
import { i18n } from 'translation';
import { ProductSection } from 'types/Sections';

const DebounceInput = withDebounce(TextInput, 'value', 'onValueChange');

export const ModalPublishMegaMenu = () => {
  const { visible, data, megaMenuId, publishStatus } = useSelector(megaMenuSelector.adminMegaMenu);
  const currentSection = data.find(item => item.commandId === megaMenuId);

  const setSettingsAdminSection = useSetSettingsAdminMegaMenu();
  const publishAdminSectionReq = usePublishAdminMegaMenuToProduct();

  const [plan, setPlan] = useState('free');
  const [pageTypes, setPageTypes] = useState<any[]>([
    'page',
    'article',
    'collection',
    'product',
    'home',
    'cart',
    'pageNotFound',
    'password',
    'search',
    'login',
    'resetPassword',
    'activateAccount',
    'register',
    'account',
    'order',
    'addresses',
    'giftCard',
    'collections',
  ]);
  const [version, setVersion] = useState(currentSection?.currentVersion ?? '0');
  const getAdminChangelog = useGetAdminMegaMenuChangelog();

  useEffect(() => {
    if (!!currentSection) {
      setVersion(currentSection.currentVersion);
    }
  }, [currentSection]);

  useEffect(() => {
    if (visible && megaMenuId) {
      getAdminChangelog.request({ commandId: megaMenuId });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visible, megaMenuId]);

  const handleCancel = () => {
    setSettingsAdminSection({
      visible: false,
      megaMenuId: '',
    });
  };

  const handlePublish = () => {
    if (currentSection) {
      const transformProductSection: ProductSection = {
        ...currentSection,
        plan: undefined,
        category: undefined,
        downloadedCount: 0,
        pageTypes,
        parentCommandId: currentSection.commandId,
        tags: null,
        currentVersion: version,
        enable: true,
      };

      publishAdminSectionReq.request({ productMegaMenu: transformProductSection });
    } else {
      message.warning({
        content: i18n.t('publish_shopify.error_unknown.message'),
      });
    }
  };

  return (
    <MyModal
      size="medium"
      headerText={`${i18n.t('general.publish', { text: i18n.t('general.on', { text: i18n.t('general.application') }) })}`}
      okText={i18n.t('general.publish')}
      isVisible={visible}
      onCancel={handleCancel}
      onOk={handlePublish}
      isLoading={publishStatus === 'loading'}
    >
      <Field label={i18n.t('general.plan')}>
        <SelectAntd
          value={plan}
          onChange={val => {
            setPlan(val);
          }}
          data={[
            { value: 'free', label: i18n.t('general.free') },
            { value: 'pro', label: i18n.t('general.pro') },
            { value: 'enterprise', label: i18n.t('general.enterprise') },
          ]}
        />
      </Field>

      <Field label={`${i18n.t('general.section', { text: i18n.t('builderPage.save_for_builder.page_types') })}`}>
        <SelectAntd
          mode="multiple"
          value={pageTypes}
          data={pageTypeData}
          onChange={val => {
            setPageTypes(val);
          }}
        />
      </Field>

      <Field label={i18n.t('general.version')}>
        <DebounceInput block value={version} onValueChange={setVersion} />
      </Field>
    </MyModal>
  );
};
