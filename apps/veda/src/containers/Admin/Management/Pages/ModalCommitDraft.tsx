import DraftBox from 'components/DraftBox';
import Field from 'components/Field';
import MyModal from 'components/MyModal';
import Textarea from 'components/Textarea';
import withDebounce from 'hocs/withDebounce';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { i18n } from 'translation';
import { View } from 'wiloke-react-core';
import { useCommitPageDraft } from './store/actions/actionPagesDraft';
import { pagesDraftSelector, useSetModalCommitDraft } from './store/reducers/slicePagesDraft';

const TextareaDebounce = withDebounce(Textarea, 'value', 'onChangeText');

export const ModalCommitDraft = () => {
  const { modalCommitDraft, queueCommiting } = useSelector(pagesDraftSelector);
  const [message, setMessage] = useState(modalCommitDraft?.changelog ?? '');

  const setModalCommitDraft = useSetModalCommitDraft();
  const commitPageDraft = useCommitPageDraft();

  useEffect(() => {
    setMessage(modalCommitDraft?.changelog ?? '');
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
        commitPageDraft.request({
          item: modalCommitDraft,
          message,
        });
      }}
      okText={i18n.t('general.commit')}
      headerText={i18n.t('general.commit_page', { text: i18n.t('builderPage.draft') })}
    >
      <View css={{ padding: '2px 6px' }}>
        <Field>
          <DraftBox
            key={modalCommitDraft.commandId}
            title={modalCommitDraft.label}
            slug={`${i18n.t('general.type')}: ${modalCommitDraft.type}`}
            image={modalCommitDraft.image.src}
            CustomDropdown={<></>}
            cssContainer={{ padding: '15px 20px', marginBottom: '0' }}
          />
        </Field>
        <Field label={`${i18n.t('general.commit', { text: i18n.t('general.message') })}`}>
          <TextareaDebounce value={message} onChangeText={setMessage} />
        </Field>
      </View>
    </MyModal>
  );
};
