import DraftBox from 'components/DraftBox';
import Field from 'components/Field';
import MyModal from 'components/MyModal';
import Textarea from 'components/Textarea';
import withDebounce from 'hocs/withDebounce';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { i18n } from 'translation';
import { View } from 'wiloke-react-core';
import { useCommitThemeDraft } from '../store/actions/actionThemesDraft';
import { themesDraftSelector, useSetModalCommitDraft } from '../store/reducers/sliceThemesDraft';

const TextareaDebounce = withDebounce(Textarea, 'value', 'onChangeText');

export const ModalCommitThemeDraft = () => {
  const { modalCommitDraft, queueCommiting } = useSelector(themesDraftSelector);
  const [message, setMessage] = useState('Tương lai có thể sẽ có nhập message commit');

  const setModalCommitDraft = useSetModalCommitDraft();
  const commitThemeDraft = useCommitThemeDraft();

  useEffect(() => {
    setMessage('Tương lai có thể sẽ có nhập message commit');
  }, [modalCommitDraft]);

  if (!modalCommitDraft) {
    return null;
  }

  return (
    <MyModal
      isVisible
      onCancel={() => setModalCommitDraft(undefined)}
      isLoading={queueCommiting.includes(modalCommitDraft.commandId)}
      onOk={() => {
        commitThemeDraft.request({
          item: modalCommitDraft,
          message,
        });
      }}
      okText={i18n.t('general.commit')}
      headerText={`${i18n.t('general.commit', { text: i18n.t('general.theme', { text: i18n.t('adminDashboard.draft') }) })}`}
    >
      <View css={{ padding: '2px 6px' }}>
        <Field>
          <DraftBox
            key={modalCommitDraft.commandId}
            title={modalCommitDraft.label}
            image={modalCommitDraft.featuredImage}
            CustomDropdown={<></>}
            cssContainer={{ padding: '15px 20px', marginBottom: '0' }}
          />
        </Field>
        <Field label={`${i18n.t('general.commit', { text: i18n.t('general.message') })}`}>
          <TextareaDebounce disabled value={message} onChangeText={setMessage} />
        </Field>
      </View>
    </MyModal>
  );
};
