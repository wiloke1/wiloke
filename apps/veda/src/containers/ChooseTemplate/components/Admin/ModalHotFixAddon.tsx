import DraftBox from 'components/DraftBox';
import Field from 'components/Field';
import MyModal from 'components/MyModal';
import SelectAntd from 'components/SelectAntd';
import Textarea from 'components/Textarea';
import { useRejectAdminAddon } from 'containers/ChooseTemplate/store/actions';
import { useSetCurrentAdminAddon } from 'containers/ChooseTemplate/store/reducers/addons/admin.sliceAddons';
import withDebounce from 'hocs/withDebounce';
import { FC, useState } from 'react';
import { useSelector } from 'react-redux';
import { useLoadmoreAuthors } from 'store/global/authors/action';
import { addonSelector, authorsSelector } from 'store/selectors';
import { i18n } from 'translation';
import { getUserInfo } from 'utils/functions/getUserInfo';
import { View } from 'wiloke-react-core';

const TextareaDebounce = withDebounce(Textarea, 'value', 'onChangeText');

export const ModalHotFixAddon: FC = () => {
  const { rejectAddonStatus, currentAddon } = useSelector(addonSelector.adminAddons);
  const authorState = useSelector(authorsSelector);

  const loadmoreAuthors = useLoadmoreAuthors();
  const setCurrentAddon = useSetCurrentAdminAddon();
  const rejectAtom = useRejectAdminAddon();
  const { role } = getUserInfo();

  const [comment, setComment] = useState('');
  const [assignToUser, setAssignToUser] = useState<number | undefined>(undefined);

  if (!currentAddon) {
    return null;
  }

  const handleReject = async () => {
    rejectAtom.request({ assignTo: assignToUser, commandId: currentAddon.commandId, comment });
  };

  const handleCancel = () => {
    setCurrentAddon(undefined);
  };

  return (
    <MyModal
      isVisible
      onCancel={handleCancel}
      onOk={handleReject}
      okText={i18n.t('general.confirm')}
      headerText={
        <>
          {i18n.t('general.reject')}{' '}
          <View tagName="span" color="primary">
            {currentAddon.label}
          </View>
        </>
      }
      isLoading={rejectAddonStatus[currentAddon.commandId] === 'loading'}
    >
      <Field>
        <DraftBox
          key={currentAddon.commandId}
          title={currentAddon.label}
          slug={`${i18n.t('general.type')}: ${currentAddon.type}`}
          image={currentAddon.image?.src}
          CustomDropdown={<></>}
          cssContainer={{ padding: '15px 20px', marginBottom: '0' }}
        />
      </Field>

      <Field label={i18n.t('general.comment')}>
        <TextareaDebounce value={comment} onChangeText={setComment} />
      </Field>

      <Field label={i18n.t('general.assign_to')}>
        <SelectAntd
          value={assignToUser}
          loading={authorState.getStatus === 'loading' || authorState.loadmoreStatus === 'loading'}
          data={authorState.data.map(item => ({ label: item.name, value: item.id as number }))}
          onChange={setAssignToUser}
          onPopupScroll={e => {
            const { scrollHeight, scrollTop, clientHeight } = e.target as Element;
            if (
              scrollHeight - scrollTop - clientHeight < 300 &&
              authorState.getStatus === 'success' &&
              authorState.totalPages > authorState.page + 1
            ) {
              loadmoreAuthors.request({
                page: authorState.page + 1,
                role,
              });
            }
          }}
        />
      </Field>
    </MyModal>
  );
};
