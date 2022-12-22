import Field from 'components/Field';
import { useLinkPicker } from 'components/LinkPicker/store/context/LinkPickerContext';
import { getEmail, getContent, getSubject } from 'components/LinkPicker/utils/getEmailContent';
import { useEmailModal } from 'components/LinkPicker/utils/globaState';
import { validateEmail } from 'components/LinkPicker/utils/validateEmail';
import MyModal from 'components/MyModal';
import Textarea from 'components/Textarea';
import { useEffect, useState } from 'react';
import { i18n } from 'translation';
import { Text } from 'wiloke-react-core';
import { DebounceTextInput } from '../Form/Fields/Fields';

export const EmailModal = () => {
  const { dispatch, value } = useLinkPicker();
  const [visible, setVisible] = useEmailModal();

  const [email, setEmail] = useState(getEmail(value));
  const [subject, setSubject] = useState(getSubject(value));
  const [content, setContent] = useState(getContent(value));
  const [checkEmail, setCheckEmail] = useState(true);

  useEffect(() => {
    setEmail(getEmail(value));
    setSubject(getSubject(value));
    setContent(getContent(value));
  }, [value]);

  const _closeModal = () => {
    setVisible(false);
  };

  const _handleOk = () => {
    dispatch({
      type: '@LinkPicker/setSettings',
      payload: {
        value: `mailto:${email}?subject=${subject}&body=${content}`,
      },
    });
    setVisible(false);
  };

  const _changeEmail = (value: string) => {
    const check = validateEmail(value);
    setCheckEmail(check);
    if (value === '') {
      setCheckEmail(true);
    }
    setEmail(value);
  };

  const _changeSubject = (value: string) => {
    setSubject(value);
  };

  const _changeContent = (value: string) => {
    setContent(value);
  };

  return (
    <MyModal
      bodyCss={{ minWidth: '600px' }}
      contentCss={{ height: '400px' }}
      headerText={i18n.t('general.settings', { text: i18n.t('general.email') })}
      onCancel={_closeModal}
      onOk={_handleOk}
      isVisible={visible}
    >
      <Field label={i18n.t('general.email', { text: i18n.t('general.address') })}>
        <DebounceTextInput
          borderColor={!checkEmail ? 'danger' : 'gray3'}
          value={email}
          placeholder="your-email@gmail.com"
          sizeInput="small"
          radius={6}
          block
          onValueChange={_changeEmail}
        />

        {!checkEmail && (
          <Text css={{ marginTop: '5px' }} color="danger">
            {i18n.t('general.invalid_email')}
          </Text>
        )}
      </Field>
      <Field label={i18n.t('general.email', { text: i18n.t('general.subject') })}>
        <DebounceTextInput value={subject} placeholder="Need help!" sizeInput="small" radius={6} block onValueChange={_changeSubject} />
      </Field>
      <Field label={i18n.t('general.email', { text: i18n.t('general.content') })}>
        <Textarea value={content} onChangeText={_changeContent} />
      </Field>
    </MyModal>
  );
};
