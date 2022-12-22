import ChooseImage from 'components/ChooseImage';
import Field from 'components/Field';
import MyModal from 'components/MyModal';
import SwitchBeauty from 'components/SwitchBeauty';
import TextInput from 'components/TextInput';
import { useSaveDraftMegaMenu } from 'containers/BuilderPage/store/saveForBuilder/actions';
import { useSetModalDevMegaMenuVisible } from 'containers/BuilderPage/store/saveForBuilder/slice';
import withDebounce from 'hocs/withDebounce';
import { useSelector } from 'react-redux';
import { saveForBuilderSelector } from 'store/selectors';
import { i18n } from 'translation';
import { DevSection } from 'types/Sections';
import { getUserInfo } from 'utils/functions/getUserInfo';
import { View } from 'wiloke-react-core';
import { useSaveDevMegaMenu } from './utils/useSaveDevMegaMenu';

const DebounceInput = withDebounce(TextInput, 'value', 'onValueChange');

export const ModalDevMegaMenu = () => {
  const { saveSectionStatus, modalDevMegaMenuVisible: modalMegaMenuVisible } = useSelector(saveForBuilderSelector);

  const setModalSectionVisible = useSetModalDevMegaMenuVisible();
  const saveSectionForBuilder = useSaveDraftMegaMenu();

  const { image, label, methodType, section, changelog, setImage, setLabel, setMethodType, setChangelog } = useSaveDevMegaMenu();
  const { id } = getUserInfo();

  const handleSaveSection = () => {
    if (section) {
      const newSection: DevSection = {
        ...section,
        label,
        image,
        status: methodType === 'create' ? 'draft' : section.status,
        changelog: changelog,
        id: section.id,
        category: {
          name: '',
          description: '',
          commandId: '',
        },
        userId: section.userId ? section.userId : id,
        type: 'megamenu',
      };
      saveSectionForBuilder.request({ type: methodType, data: newSection });
    }
  };

  const handleCancel = () => {
    saveSectionForBuilder.cancel();
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

        <Field label={i18n.t('general.description')}>
          <DebounceInput value={changelog} block sizeInput="medium" onValueChange={setChangelog} />
        </Field>

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
