import DraftBox from 'components/DraftBox';
import Field from 'components/Field';
import MyModal from 'components/MyModal';
import Textarea from 'components/Textarea';
import withDebounce from 'hocs/withDebounce';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { i18n } from 'translation';
import { View } from 'wiloke-react-core';
import { useRejectThemeDraft } from '../store/actions/actionThemesDraft';
import { themesDraftSelector, useSetModalRejectDraft } from '../store/reducers/sliceThemesDraft';

const TextareaDebounce = withDebounce(Textarea, 'value', 'onChangeText');

export const ModalRejectThemeDraft = () => {
  const { modalRejectDraft, queueRejecting } = useSelector(themesDraftSelector);
  const [message, setMessage] = useState('Tương lai có thể sẽ có nhập message reject');

  const setModalRejectDraft = useSetModalRejectDraft();
  const rejectThemeDraft = useRejectThemeDraft();

  useEffect(() => {
    setMessage('Tương lai có thể sẽ có nhập message reject');
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
        rejectThemeDraft.request({
          item: modalRejectDraft,
          message,
        });
      }}
      okText={i18n.t('general.reject')}
      headerText={`${i18n.t('general.reject', { text: i18n.t('general.theme', { text: i18n.t('adminDashboard.draft') }) })}`}
    >
      <View css={{ padding: '2px 6px' }}>
        <Field>
          <DraftBox
            key={modalRejectDraft.commandId}
            title={modalRejectDraft.label}
            image={modalRejectDraft.featuredImage}
            CustomDropdown={<></>}
            cssContainer={{ padding: '15px 20px', marginBottom: '0' }}
          />
        </Field>
        <Field label={`${i18n.t('general.reject', { text: i18n.t('general.message') })}`}>
          <TextareaDebounce disabled value={message} onChangeText={setMessage} />
        </Field>
      </View>
    </MyModal>
  );
};
