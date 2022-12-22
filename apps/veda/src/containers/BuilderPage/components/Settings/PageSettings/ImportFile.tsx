import Alert from 'components/Alert';
import Checkbox from 'components/Checkbox';
import { DragUploadAntd } from 'components/DragUploadAntd';
import UploadPlaceholder from 'components/UploadPlaceholder';
import { FC, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { createGlobalState } from 'react-use';
import { useSetFileDraft } from 'store/global/importFileDraft/slice';
import { defaultPickerRelateShopifySelector, importFileDraftSelector, pageDataSelector } from 'store/selectors';
import { i18n } from 'translation';
import { FileImportExportContent } from 'types/FileImportExport';
import { Consts } from 'utils/constants/constants';
import { FontAwesome, Space, Text, View } from 'wiloke-react-core';
import { adapterSectionsHadShopifyData } from 'utils/adapterSectionHadShopifyData';

const useFileName = createGlobalState('');
export const useFileContent = createGlobalState<Required<FileImportExportContent> | undefined>(undefined);
const usePageDataEnable = createGlobalState(true);
const usePageSettingsEnable = createGlobalState(false);

const ImportFile: FC = () => {
  const setFileDraft = useSetFileDraft();
  const [error, setError] = useState('');
  const [fileNameState, setFileNameState] = useFileName();
  const [fileContentState, setFileContentState] = useFileContent();
  const { fileName } = useSelector(importFileDraftSelector);
  const [pageDataEnable, setPageDataEnable] = usePageDataEnable();
  const [pageSettingsEnable, setPageSettingsEnable] = usePageSettingsEnable();
  const pageData = useSelector(pageDataSelector);

  // NOTE: @tuong -> Global mount sẽ lấy data này về => chắc chắn cái này được lấy về r mới vào được bước này nên không cần check "statusRequest"
  const { data } = useSelector(defaultPickerRelateShopifySelector);
  const { article, blog, collection, product } = data;

  useEffect(() => {
    if (!fileContentState) {
      return;
    }
    setFileDraft({
      fileName: fileNameState,
      fileContent: {
        page: pageDataEnable ? fileContentState.page : undefined,
        pageSettings: pageSettingsEnable ? fileContentState.pageSettings : undefined,
      },
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fileNameState, fileContentState, pageDataEnable, pageSettingsEnable]);

  return (
    <View css={{ padding: '20px' }}>
      <DragUploadAntd
        accept={`.${Consts.AppName}`}
        showUploadList={false}
        containerStyle={{ background: 'transparent', padding: 0 }}
        contentStyle={{ padding: '10px' }}
        customRequest={({ file, onSuccess, onError }) => {
          const reader = new FileReader();
          reader.readAsText(file as File);
          reader.onload = event => {
            const result = event.target?.result;
            if (typeof result === 'string') {
              try {
                const fileContentFromUpload = JSON.parse(result) as Required<FileImportExportContent>;
                const fileContent = {
                  ...fileContentFromUpload,
                  page: {
                    ...fileContentFromUpload.page,
                    // Phải giữ lại id và commandId của page đó khi import dữ liệu
                    commandId: pageData.commandId,
                    // NOTE: @tuong -> Có thể sử dụng những thứ khác để check (ví dụ: userId) thay vì check cứng theo nghiệp vụ như hiện tại
                    // Nghiệp vụ hiện tại: Import page bằng file => Chắc chắn sẽ phải tranform data shopify => Không check gì cả
                    sections: adapterSectionsHadShopifyData({
                      sections: fileContentFromUpload.page.sections,
                      article,
                      blog,
                      collection,
                      product,
                      isImportAction: true,
                    }),
                  },
                } as Required<FileImportExportContent>;
                if (!fileContent.page && !fileContent.pageSettings) {
                  throw new Error('Error');
                }
                setFileNameState((file as File).name);
                setFileContentState(fileContent);
                setError('');
                onSuccess?.('Success');
              } catch {
                setError(i18n.t('builderPage.page_settings.import.error'));
                setFileContentState(undefined);
                onError?.(new Error('Error'));
              }
            } else {
              setError(i18n.t('builderPage.page_settings.import.error'));
              setFileContentState(undefined);
              onError?.(new Error('Error'));
            }
          };
        }}
        Content={<UploadPlaceholder size="large" />}
      />
      {!!fileContentState && (
        <Alert
          radius={6}
          type="success"
          Icon={<FontAwesome type="far" name="file-import" size={20} />}
          message={i18n.t('builderPage.page_settings.import.upload_successfully')}
          backgroundColor="gray1"
          description={fileName}
          onClose={() => {
            setFileContentState(undefined);
            setFileDraft({ fileContent: undefined, fileName: undefined });
          }}
        />
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
      <View>
        <Space size={10} />
        <Text tagName="h5">{i18n.t('builderPage.page_settings.import.select_options')}:</Text>
        <Space size={10} />
        <Checkbox checked={pageDataEnable} onValueChange={setPageDataEnable}>
          {i18n.t('builderPage.page_settings.import.options.page_data')}
        </Checkbox>
        <Space size={10} />
        <Checkbox checked={pageSettingsEnable} onValueChange={setPageSettingsEnable}>
          {i18n.t('builderPage.page_settings.import.options.page_settings')} ({i18n.t('builderPage.page_settings.general.title')},{' '}
          {i18n.t('builderPage.page_settings.vendors.title')}, SCSS, Javascript)
        </Checkbox>
        <Space size={10} />
      </View>
    </View>
  );
};

export default ImportFile;
