import Button from 'components/Button';
import DragItem from 'components/DragItem';
import MyModal from 'components/MyModal';
import ScrollBars from 'components/ScrollBars';
import SelectAntd from 'components/SelectAntd';
import { ShopifyTranslation, Translation } from 'components/ShopifyTranslation/ShopifyTranslation';
import Tooltip from 'components/Tooltip';
import { FC, useState } from 'react';
import { useSelector } from 'react-redux';
import {
  globalThemeTranslationSelector,
  useDeleteFileTranslation,
  useEditFileLanguageActive,
  useEditGlobalThemeTransition,
  useSetFileLanguageActive,
  useSetGlobalThemeTranslation,
} from 'store/global/globalTranslation/slice';
import { i18n } from 'translation';
import { translationLanguage } from 'utils/constants/translationLanguage';
import { FontAwesome, View } from 'wiloke-react-core';

export interface ThemeJsonProps {}

const ThemeJson: FC = () => {
  const { languageActive, translation } = useSelector(globalThemeTranslationSelector);
  const [visible, setVisible] = useState(false);
  const [fileName, setFileName] = useState('');
  const [isEdit, setIsEdit] = useState(false);

  const setFileActive = useSetFileLanguageActive();
  const addFileTranslation = useSetGlobalThemeTranslation();
  const deleteFile = useDeleteFileTranslation();
  const editFileName = useEditFileLanguageActive();
  const saveCurrentJson = useEditGlobalThemeTransition();

  const handleAddMoreFile = () => {
    setIsEdit(false);
    setVisible(true);
  };

  const handleSetEditFileName = (name: string) => () => {
    setIsEdit(true);
    setVisible(true);
    setFileActive(name);
    setFileName(name);
  };

  const handleDeleteFile = (lang: string) => () => {
    deleteFile({ fileName: lang });
  };

  const handleCancel = () => {
    setVisible(false);
    setFileName('');
    setIsEdit(false);
  };

  const handleOk = () => {
    setVisible(false);
    if (isEdit) {
      editFileName(fileName);
      setFileName('');
    } else {
      const firstValOfTranslate = Object.values(translation)[0] ?? '';

      addFileTranslation({ [fileName]: firstValOfTranslate });
      setFileActive(fileName);
      setFileName('');
    }
  };

  const getDescription = (label: string) => {
    if (label.length > 10) {
      return `${label.slice(0, 10)}...`;
    }
    return `${label}`;
  };

  return (
    <View css={{ width: '100%', height: '100%', display: 'flex' }}>
      <View css={{ width: '200px', padding: '4px' }} borderWidth={1} borderColor="gray3" borderStyle="solid" backgroundColor="gray1">
        <ScrollBars css={{ height: '100%' }}>
          {Object.keys(translation).map(lang => {
            return (
              <DragItem
                key={lang}
                active={lang === languageActive}
                css={{ borderRadius: 0, marginBottom: '4px' }}
                Icon={() => <></>}
                label={getDescription(lang)}
                innerCss={{ padding: '0 10px 0 0', height: '30px' }}
                onEdit={() => {
                  setFileActive(lang);
                }}
                RightItem={[
                  <Tooltip key="edit" portal text={i18n.t('builderPage.change_file_name')}>
                    <FontAwesome size={12} type="far" name="edit" onClick={handleSetEditFileName(lang)} />
                  </Tooltip>,
                  <Tooltip key="delete" portal text={i18n.t('general.delete')}>
                    <FontAwesome size={12} type="far" name="trash" css={{ marginLeft: '4px' }} onClick={handleDeleteFile(lang)} />
                  </Tooltip>,
                ]}
              />
            );
          })}

          <Button backgroundColor="secondary" size="extra-small" block onClick={handleAddMoreFile}>
            {i18n.t('builderPage.add_more_language')}
          </Button>
        </ScrollBars>
      </View>

      <ShopifyTranslation
        lang={languageActive}
        containerCss={{ width: '100%', height: '100%', padding: '20px' }}
        value={JSON.parse(translation[languageActive] || '{}') as Translation}
        onSave={
          window.location.pathname.includes('/builder')
            ? undefined
            : () => {
                const translation_ = ShopifyTranslation.getValue(languageActive);
                saveCurrentJson(JSON.stringify(translation_ ?? {}));
              }
        }
      />

      <MyModal
        isVisible={visible}
        headerText={`${isEdit ? i18n.t('general.edit') : i18n.t('general.create')} ${i18n.t('builderPage.translation_file')}`}
        onCancel={handleCancel}
        onOk={handleOk}
      >
        <SelectAntd
          placeholder={i18n.t('builderPage.select_language')}
          showSearch
          value={fileName}
          data={translationLanguage}
          onChange={val => {
            setFileName(val);
          }}
        />
      </MyModal>
    </View>
  );
};

export default ThemeJson;
