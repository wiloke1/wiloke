import DraftBox from 'components/DraftBox';
import Field from 'components/Field';
import MyModal from 'components/MyModal';
import Textarea from 'components/Textarea';
import withDebounce from 'hocs/withDebounce';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { i18n } from 'translation';
import { View } from 'wiloke-react-core';
import { useRejectPageDraft } from './store/actions/actionPagesDraft';
import { pagesDraftSelector, useSetModalRejectDraft } from './store/reducers/slicePagesDraft';

const TextareaDebounce = withDebounce(Textarea, 'value', 'onChangeText');

export const ModalRejectDraft = () => {
  const { modalRejectDraft, queueRejecting } = useSelector(pagesDraftSelector);
  const [message, setMessage] = useState(modalRejectDraft?.changelog ?? '');

  const setModalRejectDraft = useSetModalRejectDraft();
  const rejectPageDraft = useRejectPageDraft();

  useEffect(() => {
    setMessage(modalRejectDraft?.changelog ?? '');
  }, [modalRejectDraft]);

  if (!modalRejectDraft) {
    return null;
  }

  return (
    <MyModal
      isVisible
      onCancel={() => setModalRejectDraft(undefined)}
      isLoading={queueRejecting.includes(modalRejectDraft.commandId)}
      onOk={() => {
        rejectPageDraft.request({
          item: modalRejectDraft,
          message,
        });
      }}
      okText={i18n.t('general.reject')}
      headerText={`${i18n.t('general.reject', { text: i18n.t('general.page', { text: i18n.t('adminDashboard.draft') }) })}`}
    >
      <View css={{ padding: '2px 6px' }}>
        <Field>
          <DraftBox
            key={modalRejectDraft.commandId}
            title={modalRejectDraft.label}
            slug={`${i18n.t('general.type')}: ${modalRejectDraft.type}`}
            image={modalRejectDraft.image.src}
            CustomDropdown={<></>}
            cssContainer={{ padding: '15px 20px', marginBottom: '0' }}
          />
        </Field>
        <Field label={`${i18n.t('general.reject', { text: i18n.t('general.message') })}`}>
          <TextareaDebounce value={message} onChangeText={setMessage} />
        </Field>
      </View>
    </MyModal>
  );
};
