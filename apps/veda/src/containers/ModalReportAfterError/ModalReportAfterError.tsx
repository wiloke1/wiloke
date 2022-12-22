import Field from 'components/Field';
import MyModal from 'components/MyModal';
import SelectAntd from 'components/SelectAntd';
import SimpleTabs from 'components/SimpleTabs';
import Textarea from 'components/Textarea';
import { useCrispChat } from 'containers/CrispChat/hooks/useCrispChat';
import { FC, useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { customerReportService } from 'services/CustomerReportService';
import { authSelector } from 'store/selectors';
import { i18n } from 'translation';
import { FontAwesome, View } from 'wiloke-react-core';
import { Props, Report, State, Static } from './@types';

interface CustomerReportDescription {
  comment: string;
  severity: 'low' | 'normal' | 'high' | 'urgent';
}

const reportHandlers = new Map<string, Report>();
export const ModalReportAfterError: FC<Props> & Static = ({ id }) => {
  const [state, setState] = useState<State>({
    isVisible: false,
    cause: '',
    description: '',
  });

  const [{ comment, severity }, setCustomerReportDescription] = useState<CustomerReportDescription>({ comment: '', severity: 'high' });

  const { shopName, email } = useSelector(authSelector);
  const { initialized, reportError, getLink } = useCrispChat();

  const handleCancel = useCallback(() => {
    setState({
      isVisible: false,
      cause: '',
      description: '',
    });
  }, []);

  const handleOk = useCallback(() => {
    customerReportService.create({
      chatLink: getLink() ?? '',
      description: comment,
      customerEmail: email,
      shopName,
      severity,
    });
    reportError({
      comment,
      cause: state.cause,
      description: state.description,
    });
    setState({
      isVisible: false,
      cause: '',
      description: '',
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [comment]);

  const handleSetReport: Report = data => {
    setState({
      ...data,
      isVisible: true,
    });
  };

  const handleChangeComment = useCallback((value: string) => {
    setCustomerReportDescription(state => ({ ...state, comment: value }));
  }, []);

  const handleChangeSeveriry = useCallback((value: string) => {
    setCustomerReportDescription(state => ({
      ...state,
      severity: value as CustomerReportDescription['severity'],
    }));
  }, []);

  useEffect(() => {
    reportHandlers.set(id, handleSetReport);
    return () => {
      reportHandlers.delete(id);
    };
  }, [id]);

  return (
    <MyModal
      depsHeightRecalculation={state.isVisible}
      isVisible={state.isVisible}
      onCancel={handleCancel}
      onOk={handleOk}
      headerText={i18n.t('ModalReportAfterError.title')}
      cancelText=""
      okText={i18n.t('ModalReportAfterError.send')}
      isLoading={!initialized}
    >
      <View css={{ padding: '6px 10px' }}>
        <View css={{ display: 'flex', alignItems: 'center', marginBottom: '24px' }}>
          <View css={{ marginRight: '12px' }}>
            <FontAwesome type="far" color="warning" name="exclamation-triangle" size={32} />
          </View>
          <View>
            <View css={{ fontSize: '16px', fontWeight: '500' }}>{state.cause}</View>
            <View>{i18n.t('ModalReportAfterError.description')}</View>
          </View>
        </View>
        <View css={{ marginBottom: '24px' }}>
          <Field label={i18n.t('ModalReportAfterError.severity.title')}>
            <SelectAntd
              value={severity}
              onChange={handleChangeSeveriry}
              data={[
                { label: i18n.t('ModalReportAfterError.severity.options.low'), value: 'low' },
                { label: i18n.t('ModalReportAfterError.severity.options.normal'), value: 'normal' },
                { label: i18n.t('ModalReportAfterError.severity.options.high'), value: 'high' },
                { label: i18n.t('ModalReportAfterError.severity.options.urgent'), value: 'urgent' },
              ]}
            />
          </Field>
          <Field label={i18n.t('ModalReportAfterError.comments')}>
            <Textarea onChangeText={handleChangeComment} value={comment} />
          </Field>
        </View>
        <View>
          <SimpleTabs
            defaultValue="app_message"
            data={[
              { label: i18n.t('ModalReportAfterError.app_message'), value: 'app_message' },
              { label: i18n.t('ModalReportAfterError.app_status'), value: 'app_status' },
            ]}
          >
            {value => <Textarea disabled value={value === 'app_message' ? state.description : 'APP STATE'} />}
          </SimpleTabs>
        </View>
      </View>
    </MyModal>
  );
};

ModalReportAfterError.getActions = (id: Props['id']) => {
  const report = reportHandlers.get(id);
  if (report) {
    return {
      report,
    };
  }
  throw new Error(`ModalReportAfterError -> ${id} not exist`);
};
