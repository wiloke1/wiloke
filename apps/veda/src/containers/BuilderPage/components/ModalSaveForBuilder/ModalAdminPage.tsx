import { notification } from 'antd';
import Button from 'components/Button';
import Field from 'components/Field';
import MyModal from 'components/MyModal';
import SwitchBeauty from 'components/SwitchBeauty';
import TextInput from 'components/TextInput';
import { useSavePageForAdmin } from 'containers/BuilderPage/store/saveForBuilder/actions';
import { modalAdminPageVisibleSelector, useSetModalAdminPageVisible } from 'containers/BuilderPage/store/saveForBuilder/slice';
import withDebounce from 'hocs/withDebounce';
import { useSocketForSyncShopify } from 'hooks/useSocket/useSocketForSyncShopify';
import { useUndoRedoForRedux } from 'hooks/useUndoRedoForRedux/useUndoRedoForRedux';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { Location, useLocation } from 'react-router';
import { useHistory } from 'react-router-dom';
import { LocationStates } from 'routes/LocationStates';
import { useSetPageAfterCreate, useSetPageLabel } from 'store/actions/actionPages';
import { syncPageNotification } from 'store/global/socket/watchSyncToShopify';
import { cssVariablesSelector, layoutSettingsSelector, socketOfSyncShopifySelector, pageDataSelector, saveForBuilderSelector } from 'store/selectors';
import { i18n } from 'translation';
import { Consts } from 'utils/constants/constants';
import getPageInfo from 'utils/functions/getInfo';
import { getEntityVariant } from 'utils/getEntityVariant';
import useResultForSave from '../TopBar/useResultForSave';

const DebounceInput = withDebounce(TextInput, 'value', 'onValueChange', 200);

export const ModalAdminPage = () => {
  const visible = useSelector(modalAdminPageVisibleSelector);
  const { statusSyncToShopify } = useSelector(socketOfSyncShopifySelector);
  const page = useSelector(pageDataSelector);
  const { savePageStatus } = useSelector(saveForBuilderSelector);
  const layoutSettings = useSelector(layoutSettingsSelector);
  const cssVariables = useSelector(cssVariablesSelector);

  const { getResult, isExtracting } = useResultForSave();
  const setModalAdminPageVisible = useSetModalAdminPageVisible();
  const setPageLabel = useSetPageLabel();
  const savePageForAdmin = useSavePageForAdmin();
  const setPageAfterCreate = useSetPageAfterCreate();

  const [method, setMethod] = useState<'create' | 'update'>('update');

  const shop = getPageInfo('shop');
  const themeId = getPageInfo('themeId');
  const location = useLocation<'/builder'>();
  const history = useHistory<'/builder'>();

  const { connect, disconnect, statusSocketConnection } = useSocketForSyncShopify();

  const handleSave = (isOverrideIndividualPages: boolean) => () => {
    setModalAdminPageVisible(false);
    syncPageNotification.next({
      title: i18n.t('publish_shopify.sync_page_message.step', { text: '1' }),
      description: i18n.t('publish_shopify.sync_page_message.init'),
    });
    connect({
      onSuccess: async () => {
        try {
          const isCreatePage = page.commandId === Consts.BlankCommandId || method === 'create';
          if (method === 'update' && getEntityVariant(location as Location<keyof LocationStates>) === 'Draft') {
            // TODO: I18n
            notification.error({ message: 'Bạn đang sửa page draft nên không thể update như page atom' });
            return;
          }

          const result = await getResult('throw');
          const pageData = result.pages[page.commandId];

          // Nếu page không có section thì không cho save
          if (typeof pageData === 'undefined') {
            notification.error({
              message: i18n.t('builderPage.must_have_section'),
            });
            return;
          } else {
            savePageForAdmin.request({
              page: pageData.data.page,
              settings: {
                generalSettings: pageData.data.pageSettings.generalSettings,
                globalJs: pageData.data.pageSettings.globalJs,
                globalScss: pageData.data.pageSettings.globalScss,
                vendors: pageData.data.pageSettings.vendors,
                cssVariables,
                layoutSettings,
              },
              outputBuilder: result,
              method,
              isOverrideIndividualPages,
              onFulfill: pageResponse => {
                useUndoRedoForRedux.reset?.();
                disconnect({});
                // @duong: Nếu là tạo page thì sau khi save thành công sẽ thay id ở trên params bằng id mới của server trả về và xóa state params ở bên dashboard bắn sang
                if (isCreatePage) {
                  history.replace({
                    ...history.location,
                    state: {
                      ...history.location.state,
                      label: '',
                      isCreate: false,
                      entityVariant: 'Atom',
                    },
                    search: `?shop=${shop}&id=${pageResponse.commandId}${!!themeId ? '&themeId=' + themeId : ''}`,
                  });
                  setPageAfterCreate(pageResponse);
                }
              },
            });
          }
        } catch {
          disconnect({});
        }
      },
      onError: () => {
        notification.error({ message: i18n.t('publish_shopify.init_sync_error') });
      },
    });
  };

  const handleCancel = () => {
    setModalAdminPageVisible(false);
  };

  return (
    <MyModal
      headerText={i18n.t('general.save', { text: i18n.t('general.page') })}
      isVisible={visible}
      onCancel={handleCancel}
      okText=""
      cancelText=""
      FooterRight={[
        <Button
          key="1"
          backgroundColor="gray2"
          size="extra-small"
          radius={4}
          fontFamily="secondary"
          color="gray8"
          css={{ fontWeight: 500, marginRight: '10px' }}
          onClick={handleSave(false)}
        >
          {i18n.t('builderPage.not_override')}
        </Button>,
        <Button
          key="2"
          backgroundColor="primary"
          size="extra-small"
          radius={4}
          fontFamily="secondary"
          css={{ fontWeight: 500 }}
          onClick={handleSave(true)}
          loading={statusSocketConnection === 'loading' || isExtracting || statusSyncToShopify === 'loading' || savePageStatus === 'loading'}
        >
          {statusSocketConnection === 'loading'
            ? i18n.t('publish_shopify.init_sync')
            : isExtracting
            ? i18n.t('builderPage.extracting')
            : savePageStatus === 'loading'
            ? i18n.t('builderPage.saving')
            : statusSyncToShopify === 'loading'
            ? i18n.t('publish_shopify.syncing')
            : i18n.t('builderPage.confirm_override')}
        </Button>,
      ]}
      size="small"
    >
      <Field label={i18n.t('builderPage.save_for_builder.create_new_page')}>
        <SwitchBeauty
          checked={method === 'create'}
          radius={6}
          borderColor="gray3"
          borderWidth={1}
          enableText={i18n.t('general.enable')}
          disableText={i18n.t('general.disable')}
          onValueChange={value => {
            setMethod(value ? 'create' : 'update');
          }}
        />
      </Field>

      <Field label={i18n.t('adminDashboard.name_your_page')}>
        <DebounceInput
          block
          value={page.label}
          sizeInput="medium"
          onValueChange={value => {
            setPageLabel({ pageLabel: value });
          }}
        />
      </Field>
    </MyModal>
  );
};
