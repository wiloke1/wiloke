import Button from 'components/Button';
import ChooseImage from 'components/ChooseImage';
import Field from 'components/Field';
import MyModal from 'components/MyModal';
import SwitchBeauty from 'components/SwitchBeauty';
import TextInput from 'components/TextInput';
import { useSaveAtomMegaMenu } from 'containers/BuilderPage/store/saveForBuilder/actions';
import { useSetModalAdminMegaMenuVisible } from 'containers/BuilderPage/store/saveForBuilder/slice';
import { useCreateAdminMegaMenuChangelog } from 'containers/ChooseTemplate/store/actions';
import withDebounce from 'hocs/withDebounce';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { megaMenuSelector, saveForBuilderSelector } from 'store/selectors';
import { i18n } from 'translation';
import { AdminSection } from 'types/Sections';
import { getUserInfo } from 'utils/functions/getUserInfo';
import { Space, View } from 'wiloke-react-core';
import { useSaveAdminMegaMenu } from './utils/useSaveAdminMegaMenu';

const DebounceInput = withDebounce(TextInput, 'value', 'onValueChange');

export const ModalAdminMegaMenu = () => {
  const { saveSectionStatus, modalAdminMegaMenuVisible: modalMegaMenuVisible } = useSelector(saveForBuilderSelector);
  const { createChangelogStatus } = useSelector(megaMenuSelector.adminMegaMenu);

  const setModalSectionVisible = useSetModalAdminMegaMenuVisible();
  const saveAtomMegaMenu = useSaveAtomMegaMenu();
  const createChangelog = useCreateAdminMegaMenuChangelog();

  const {
    image,
    label,
    methodType,
    section,
    setImage,
    setLabel,
    setMethodType,
    changelog,
    setChangelog,
    setVersion,
    version,
  } = useSaveAdminMegaMenu();
  const { id } = getUserInfo();
  const [error, setError] = useState('');

  const handleSaveSection = () => {
    if (section) {
      const newSection: AdminSection = {
        ...section,
        label,
        image,
        id: section.id,
        category: undefined,
        createdBy: section.createdBy || section.userId ? section.createdBy || section.userId : id,
        type: 'megamenu',
        currentVersion: methodType === 'create' ? '1.0.0' : version,
      };
      saveAtomMegaMenu.request({ type: methodType, data: newSection });
    }
  };

  const handleCreateChangelog = () => {
    if (section && version) {
      createChangelog.request({
        content: changelog,
        version: version,
        versionId: section.commandId,
      });
    }
  };

  const handleCancel = () => {
    saveAtomMegaMenu.cancel();
    setModalSectionVisible(false);
  };

  return (
    <MyModal
      size="medium"
      isLoading={saveSectionStatus === 'loading'}
      headerText={`${i18n.t('general.save', { text: i18n.t('general.section') })}`}
      depsHeightRecalculation={section}
      isVisible={modalMegaMenuVisible}
      onCancel={handleCancel}
      onOk={handleSaveSection}
      okText={i18n.t('general.save', { text: 'to admin database' })}
    >
      <View css={{ margin: 'auto', padding: '20px 0' }}>
        <Field label={i18n.t('general.createNewSection')}>
          <SwitchBeauty
            checked={methodType === 'create'}
            radius={6}
            borderColor="gray3"
            borderWidth={1}
            enableText={i18n.t('general.enable')}
            disableText={i18n.t('general.disable')}
            onValueChange={value => {
              setMethodType(value ? 'create' : 'update');
            }}
          />
        </Field>

        <Field label={i18n.t('general.title')}>
          <DebounceInput value={label} block sizeInput="medium" onValueChange={setLabel} />
        </Field>

        {!!section?.commandId && (
          <Field label={i18n.t('general.changelog')}>
            <View tagName="span">{i18n.t('general.current', { text: i18n.t('general.version') })}</View>
            <TextInput disabled value={section?.currentVersion} block />
            <Space size={8} />
            <DebounceInput
              placeholder={i18n.t('general.version')}
              value={version}
              block
              sizeInput="medium"
              borderColor={!!error ? 'danger' : 'gray3'}
              onValueChange={val => {
                if (val !== '') {
                  setError('');
                } else {
                  setError(i18n.t('builderPage.increase_version_to_update_section'));
                }

                setVersion(val);
              }}
            />
            {error ? (
              <View tagName="span" color="warning">
                {error}
              </View>
            ) : null}
            <Space size={8} />
            <DebounceInput placeholder={i18n.t('general.content')} value={changelog} block sizeInput="medium" onValueChange={setChangelog} />
            <Space size={8} />
            <Button size="extra-small" radius={4} loading={createChangelogStatus === 'loading'} onClick={handleCreateChangelog}>
              {i18n.t('general.create', { text: i18n.t('general.changelog') })}
            </Button>
          </Field>
        )}

        <Field label={i18n.t('builderPage.save_for_builder.preview_image')} width={400}>
          <ChooseImage
            value={image}
            onChange={({ src, width, height }) => {
              setImage({
                src: src,
                width: width ?? 0,
                height: height ?? 0,
              });
            }}
            mode="popup"
          />
        </Field>
      </View>
    </MyModal>
  );
};
