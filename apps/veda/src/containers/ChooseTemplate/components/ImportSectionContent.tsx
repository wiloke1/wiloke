import Alert from 'components/Alert';
import Button from 'components/Button';
import { DragUploadAntd, DragUploadAntdProps } from 'components/DragUploadAntd';
import UploadPlaceholder from 'components/UploadPlaceholder';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useAddSection, useChangeSection, useSetAddonToPages } from 'store/actions/actionPages';
import { useSetTemplateBoardVisible } from 'containers/ChooseTemplate/store/actions/actionTemplateBoardVisible';
import { checkIsSectionOrAddons, checkValidFileImport } from 'containers/ChooseTemplate/utils/checkValidImportSection';
import setScrollTo from 'containers/IframePage/setScrollTo';
import { useSetSidebarTabActive } from 'store/actions/actionSidebarTabActive';
import { useSetThemeAddon } from 'store/global/themeAddons';
import { chooseTemplateVisibleSelector, defaultPickerRelateShopifySelector, pageSectionsSelector, sectionEdittingIdSelector } from 'store/selectors';
import { i18n } from 'translation';
import { FileImportAddons, FileImportSection } from 'types/FileImportExport';
import { adapterSectionHadShopifyData } from 'utils/adapterSectionHadShopifyData';
import { Consts } from 'utils/constants/constants';
import { v4 } from 'uuid';
import { FontAwesome, View } from 'wiloke-react-core';
import { getUserInfo } from 'utils/functions/getUserInfo';

export const ImportSectionContent = () => {
  const [error, setError] = useState('');

  const [fileNameState, setFileNameState] = useState('');
  const [fileContentState, setFileContentState] = useState<FileImportSection | FileImportAddons | undefined>(undefined);

  const sectionIdActiveState = useSelector(sectionEdittingIdSelector);
  const pageSections = useSelector(pageSectionsSelector);
  const sectionActive = pageSections.find(item => item.id === sectionIdActiveState);
  const chooseTemplateVisible = useSelector(chooseTemplateVisibleSelector);

  // NOTE: @tuong -> Global mount sẽ lấy data này về => chắc chắn cái này được lấy về r mới vào được bước này nên không cần check "statusRequest"
  const { data } = useSelector(defaultPickerRelateShopifySelector);
  const { article, blog, collection, product } = data;

  const setTemplateBoardVisible = useSetTemplateBoardVisible();
  const changeSection = useChangeSection();
  const addSection = useAddSection();
  const addAddon = useSetThemeAddon();
  const setAddonToPages = useSetAddonToPages();
  const setSidebarTabActive = useSetSidebarTabActive();
  const { id } = getUserInfo();

  useEffect(() => {
    if (!chooseTemplateVisible.visible) {
      setFileContentState(undefined);
      setFileNameState('');
      // setSectionEditing('');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chooseTemplateVisible.visible]);

  const handleUploadFile: DragUploadAntdProps['customRequest'] = ({ file, onSuccess, onError }) => {
    const reader = new FileReader();
    reader.readAsText(file as File);
    reader.onload = event => {
      const result = event.target?.result;
      if (typeof result === 'string') {
        const fileContentFromUpload = JSON.parse(result) as FileImportSection | FileImportAddons;

        if (checkValidFileImport(fileContentFromUpload) === 'valid') {
          // Check file import là section hay addons
          // Section
          if (checkIsSectionOrAddons(fileContentFromUpload) === 'section') {
            const fileContent = {
              ...fileContentFromUpload,
              // NOTE: @tuong -> Có thể sử dụng những thứ khác để check (ví dụ: userId) thay vì check cứng theo nghiệp vụ như hiện tại
              // Nghiệp vụ hiện tại: Import section bằng file => Chắc chắn sẽ phải tranform data shopify => Không check gì cả
              ...adapterSectionHadShopifyData({
                section: fileContentFromUpload as FileImportSection,
                article,
                blog,
                collection,
                product,
                isImportAction: true,
              }),
              // Giữ lại id, commandId, parentCommandId của section đang được import khi import dữ liệu
              id: sectionActive ? sectionActive.id : `id_${v4()}`,
              commandId: sectionActive ? sectionActive.commandId : undefined,
              parentCommandId: sectionActive ? sectionActive.commandId : undefined,
              userId: id,
              category: {
                commandId: '',
                name: '',
                description: '',
              },
            } as Required<FileImportSection>;
            setFileNameState((file as File).name);
            setFileContentState(fileContent);
            setError('');
            onSuccess?.('Success');
          }

          // Addon
          if (checkIsSectionOrAddons(fileContentFromUpload) === 'addon') {
            const _newSectionId = `id_${v4()}`;

            const fileContent = {
              ...fileContentFromUpload,
              id: v4(),
              commandId: '',
              parentCommandId: '',
              sectionId: _newSectionId,
              body: {
                ...(fileContentFromUpload as FileImportAddons).body,
                commandId: '',
                parentCommandId: '',
                id: _newSectionId,
                userId: id,
                category: {
                  commandId: '',
                  name: '',
                  description: '',
                },
              } as any,
              category: {
                commandId: '',
                name: '',
                description: '',
              },
            } as FileImportAddons;
            setFileNameState((file as File).name);
            setFileContentState(fileContent);
            setError('');
            onSuccess?.('Success');
          }
        } else {
          setError(i18n.t('builderPage.choose_template.import_section_addons_failed'));
          setFileContentState(undefined);
          onError?.(new Error('Error'));
        }
      } else {
        setError(i18n.t('builderPage.page_settings.import.error'));
        setFileContentState(undefined);
        onError?.(new Error('Error'));
      }
    };
  };

  const renderAlertSuccess = () => {
    if (fileContentState !== undefined) {
      if (checkIsSectionOrAddons(fileContentState) === 'section') {
        return (
          <View css={{ textAlign: 'right' }}>
            {!!sectionActive && (
              <Button
                css={{ marginRight: '8px' }}
                radius={6}
                size="small"
                onClick={() => {
                  changeSection(chooseTemplateVisible.index, fileContentState as FileImportSection);
                  setTemplateBoardVisible({ visible: false });
                  setScrollTo(`[data-id="${fileContentState.id}"]`, { timeout: 100 });
                }}
              >
                {i18n.t('general.change_section')}
              </Button>
            )}

            <Button
              radius={6}
              size="small"
              backgroundColor="secondary"
              onClick={() => {
                addSection(chooseTemplateVisible.index, {
                  ...(fileContentState as FileImportSection),
                  id: `id_${v4()}`,
                });
                setTemplateBoardVisible({ visible: false });
                setScrollTo(`[data-id="${fileContentState.id}"]`, { timeout: 100 });
              }}
            >
              {i18n.t('general.createNewSection')}
            </Button>
          </View>
        );
      } else {
        return (
          <View css={{ textAlign: 'right' }}>
            <Button
              radius={6}
              size="small"
              backgroundColor="secondary"
              onClick={() => {
                addAddon({
                  addon: fileContentState as FileImportAddons,
                });
                setAddonToPages((fileContentState as FileImportAddons).body);
                setSidebarTabActive('add-ons');
                setTemplateBoardVisible({ visible: false });
              }}
            >
              {i18n.t('general.createNewAddons')}
            </Button>
          </View>
        );
      }
    } else {
      return null;
    }
  };

  return (
    <View css={{ padding: '20px' }} backgroundColor="light">
      <DragUploadAntd
        accept={`.${Consts.AppName}`}
        showUploadList={false}
        containerStyle={{ background: 'transparent', padding: 0 }}
        contentStyle={{ padding: '10px' }}
        customRequest={handleUploadFile}
        Content={<UploadPlaceholder size="large" text="Upload a section or addon file or drag & drop it here" />}
      />
      {!!fileContentState && (
        <>
          <Alert
            radius={6}
            type="success"
            Icon={<FontAwesome type="far" name="file-import" size={20} />}
            message={i18n.t('builderPage.page_settings.import.upload_successfully')}
            backgroundColor="gray1"
            description={fileNameState}
            onClose={() => {
              setFileContentState(undefined);
            }}
          />

          {renderAlertSuccess()}
        </>
      )}
      {!!error && (
        <Alert
          radius={6}
          type="danger"
          message={i18n.t('builderPage.page_settings.import.upload_failed')}
          description={error}
          backgroundColor="gray1"
          onClose={() => {
            setError('');
          }}
        />
      )}
    </View>
  );
};
