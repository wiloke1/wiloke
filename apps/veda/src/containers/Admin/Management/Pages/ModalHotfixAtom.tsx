import DraftBox from 'components/DraftBox';
import Field from 'components/Field';
import MyModal from 'components/MyModal';
import SelectAntd from 'components/SelectAntd';
import Textarea from 'components/Textarea';
import withDebounce from 'hocs/withDebounce';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useGetAuthors, useLoadmoreAuthors } from 'store/global/authors/action';
import { authorsSelector } from 'store/selectors';
import { i18n } from 'translation';
import { View } from 'wiloke-react-core';
import { useHotfixPageAtom } from './store/actions/actionPagesAtom';
import { pagesAtomSelector, useModalHotfixPage } from './store/reducers/slicePagesAtom';

const TextareaDebounce = withDebounce(Textarea, 'value', 'onChangeText');

export const ModalHotfixAtom = () => {
  const { modalHotfix, queueHotfixing } = useSelector(pagesAtomSelector);

  const setModalHotfix = useModalHotfixPage();
  const hotfixPageAtom = useHotfixPageAtom();

  const getAuthors = useGetAuthors();
  const loadmoreAuthors = useLoadmoreAuthors();
  const { getStatus, loadmoreStatus, data, totalPages, page } = useSelector(authorsSelector);

  const [message, setMessage] = useState('');
  const [assignToUserId, setAssignToUserId] = useState<any>();

  useEffect(() => {
    if (modalHotfix) {
      setMessage('');
      setAssignToUserId(modalHotfix.userId);
    }
  }, [modalHotfix]);

  useEffect(() => {
    getAuthors.request({ role: 'dev' });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!modalHotfix) {
    return null;
  }

  return (
    <MyModal
      isVisible
      onCancel={() => setModalHotfix(undefined)}
      isLoading={queueHotfixing.includes(modalHotfix.commandId)}
      onOk={() => {
        hotfixPageAtom.request({
          commandId: modalHotfix.commandId,
          assignToUserId,
          message,
        });
      }}
      okText={i18n.t('general.hotfix')}
      headerText={`${i18n.t('general.hotfix', { text: i18n.t('general.page') })}`}
    >
      <View css={{ padding: '2px 6px' }}>
        <Field>
          <DraftBox
            key={modalHotfix.commandId}
            title={modalHotfix.label}
            slug={`${i18n.t('general.type')}: ${modalHotfix.type}`}
            image={modalHotfix.image.src}
            CustomDropdown={<></>}
            cssContainer={{ padding: '15px 20px', marginBottom: '0' }}
          />
        </Field>
        <Field label={`${i18n.t('general.hotfix', { text: i18n.t('general.message') })}`}>
          <TextareaDebounce value={message} onChangeText={setMessage} />
        </Field>

        <Field label={i18n.t('general.assign_to')}>
          <SelectAntd
            value={assignToUserId}
            loading={getStatus === 'loading' || loadmoreStatus === 'loading'}
            data={data.map(item => ({ label: item.name, value: item.id }))}
            onChange={setAssignToUserId}
            onPopupScroll={e => {
              const { scrollHeight, scrollTop, clientHeight } = e.target as Element;
              if (scrollHeight - scrollTop - clientHeight < 300 && getStatus === 'success' && totalPages > page + 1) {
                loadmoreAuthors.request({
                  page: page + 1,
                  role: 'dev',
                });
              }
            }}
          />
        </Field>
      </View>
    </MyModal>
  );
};
