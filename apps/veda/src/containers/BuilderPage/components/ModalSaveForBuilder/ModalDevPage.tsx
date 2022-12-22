import { notification } from 'antd';
import Button from 'components/Button';
import Field from 'components/Field';
import MyModal from 'components/MyModal';
import SwitchBeauty from 'components/SwitchBeauty';
import TextInput from 'components/TextInput';
import { useSavePageForDev } from 'containers/BuilderPage/store/saveForBuilder/actions';
import { modalDevPageVisibleSelector, useSetModalDevPageVisible } from 'containers/BuilderPage/store/saveForBuilder/slice';
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
import { layoutSettingsSelector, pageDataSelector, cssVariablesSelector, saveForBuilderSelector, socketOfSyncShopifySelector } from 'store/selectors';
import { i18n } from 'translation';
import { Consts } from 'utils/constants/constants';
import getPageInfo from 'utils/functions/getInfo';
import { getUserInfo } from 'utils/functions/getUserInfo';
import { getEntityVariant } from 'utils/getEntityVariant';
import useResultForSave from '../TopBar/useResultForSave';

const DebounceInput = withDebounce(TextInput, 'value', 'onValueChange', 200);

export const ModalDevPage = () => {
  const page = useSelector(pageDataSelector);
  const visible = useSelector(modalDevPageVisibleSelector);
  const layoutSettings = useSelector(layoutSettingsSelector);
  const cssVariables = useSelector(cssVariablesSelector);
  const { savePageStatus } = useSelector(saveForBuilderSelector);
  const { statusSyncToShopify } = useSelector(socketOfSyncShopifySelector);

  const { getResult, isExtracting } = useResultForSave();
  const setModalDevPageVisible = useSetModalDevPageVisible();
  const saveDevPage = useSavePageForDev();
  const setPageLabel = useSetPageLabel();
  const setPageAfterCreate = useSetPageAfterCreate();
  const [method, setMethod] = useState<'create' | 'update'>('update');

  const { role } = getUserInfo();
  const shop = getPageInfo('shop');
  const themeId = getPageInfo('themeId');
  const location = useLocation<'/builder'>();
  const history = useHistory<'/builder'>();

  const { connect, disconnect, statusSocketConnection } = useSocketForSyncShopify();

  const handleSave = (isOverrideIndividualPages: boolean) => () => {
    setModalDevPageVisible(false);
    syncPageNotification.next({
      title: 'Step 1',
      description: i18n.t('publish_shopify.init_sync'),
    });

    connect({
      onSuccess: async () => {
        try {
          const isCreatePage = page.commandId === Consts.BlankCommandId || method === 'create';
          if (getEntityVariant(location as Location<keyof LocationStates>) === 'Draft') {
            const result = await getResult('throw');
            const pageData = result.pages[page.commandId];

            // Nếu page không có section thì không cho save
            if (typeof pageData === 'undefined') {
              notification.error({
                message: i18n.t('builderPage.must_have_section'),
              });
              return;
            } else {
              saveDevPage.request({
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
                        entityVariant: 'Draft',
                      },
                      search: `?shop=${shop}&id=${pageResponse.commandId}${!!themeId ? '&themeId=' + themeId : ''}`,
                    });

                    setPageAfterCreate(pageResponse);
                  }
                },
                isOverrideIndividualPages,
              });
            }
          } else {
            // TODO: I18n
            notification.error({
              message: 'Bạn đang vào page atom nên không thể sử dụng chức năng update page draft',
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
    setModalDevPageVisible(false);
  };

  return (
    <MyModal
      headerText={i18n.t('general.save', { text: i18n.t('general.page') })}
      isVisible={visible}
      onCancel={handleCancel}
      isLoading={isExtracting || statusSyncToShopify === 'loading' || savePageStatus === 'loading'}
      okText=""
      cancelText=""
      size="small"
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
          loading={statusSocketConnection === 'loading' || savePageStatus === 'loading' || isExtracting || statusSyncToShopify === 'loading'}
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
    >
      <Field label={i18n.t('builderPage.save_for_builder.create_new_page')}>
        <SwitchBeauty
          checked={method === 'create'}
          disabled={role === 'admin'}
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
