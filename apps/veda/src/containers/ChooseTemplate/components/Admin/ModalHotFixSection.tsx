import DraftBox from 'components/DraftBox';
import Field from 'components/Field';
import MyModal from 'components/MyModal';
import SelectAntd from 'components/SelectAntd';
import Textarea from 'components/Textarea';
import { useRejectAdminSection, useSetCurrentAdminSection } from 'containers/ChooseTemplate/store/actions';
import withDebounce from 'hocs/withDebounce';
import { FC, useState } from 'react';
import { useSelector } from 'react-redux';
import { useLoadmoreAuthors } from 'store/global/authors/action';
import { authorsSelector, sectionsSelector } from 'store/selectors';
import { i18n } from 'translation';
import { getUserInfo } from 'utils/functions/getUserInfo';
import { View } from 'wiloke-react-core';

const TextareaDebounce = withDebounce(Textarea, 'value', 'onChangeText');

export const ModalHotFixSection: FC = () => {
  const { currentSection, rejectStatus } = useSelector(sectionsSelector.adminSections);
  const authorState = useSelector(authorsSelector);

  const loadmoreAuthors = useLoadmoreAuthors();
  const setCurrentSection = useSetCurrentAdminSection();
  const rejectAtom = useRejectAdminSection();
  const { role } = getUserInfo();

  const [comment, setComment] = useState('');
  const [assignToUser, setAssignToUser] = useState<number | undefined>(undefined);

  if (!currentSection) {
    return null;
  }

  const handleReject = async () => {
    rejectAtom.request({ assignTo: assignToUser, commandId: currentSection.commandId, comment });
  };

  const handleCancel = () => {
    setCurrentSection(undefined);
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
            {currentSection.label}
          </View>
        </>
      }
      isLoading={rejectStatus[currentSection.commandId] === 'loading'}
    >
      <Field>
        <DraftBox
          key={currentSection.commandId}
          title={currentSection.label}
          slug={`${i18n.t('general.type')}: ${currentSection.type}`}
          image={currentSection.image?.src}
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
