import ScrollBars from 'components/ScrollBars';
import Tooltip from 'components/Tooltip';
import elasticlunr from 'elasticlunr';
import { isEmpty } from 'lodash';
import { FC, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import {
  useCreateLiquidSnippet,
  useDeleteLiquidSnippet,
  useGetLiquidSnippets,
  useUpdateLiquidSnippet,
  useUpdateLiquidSnippetFileName,
} from 'store/global/globalSnippets/action';
import { liquidSnippetsSelector } from 'store/global/globalSnippets/sliceGlobalSnippets';
import { i18n } from 'translation';
import { objectKeys } from 'utils/functions/objectKeys';
import { css, ProgressLoader, Theme, useStyleSheet, View } from 'wiloke-react-core';
import { DEFAULT_FILE, NEW_FILE } from './consts';
import { FileItem } from './FileItem';
import { Folder } from './Folder';
import { Search } from './Search';
import { useCanEdit } from './useCanEdit';

export interface ListLiquidFileProps {
  newSnippets: Record<string, string>;
  loaded?: boolean;
  fileName?: string;
  onChange?: (fileName: string) => void;
}

const elasticlunrIndex = elasticlunr<{ fileName: string }>(function() {
  this.addField('fileName');
  this.setRef('fileName');
});

const styles = {
  container: ({ colors }: Theme) => css`
    position: relative;
    width: 220px;
    flex-shrink: 0;
    background-color: #1f2039;
    color: rgba(${colors.rgbGray3}, 0.6);
    font-size: 13px;
    padding: 10px 0;
    user-select: none;
  `,
  folder: ({ colors }: Theme) => css`
    display: flex;
    align-items: center;
    padding: 8px 10px;
    font-weight: 500;
    color: rgba(${colors.rgbGray3}, 0.8);
  `,
  loader: css`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    z-index: 9;
  `,
};

export const ListLiquidFile: FC<ListLiquidFileProps> = ({ newSnippets, loaded, fileName: fileNameProp, onChange }) => {
  const { data: liquidSnippets, status } = useSelector(liquidSnippetsSelector);
  const [filesState, setFiles] = useState(liquidSnippets);
  const updateLiquidSnippetFileName = useUpdateLiquidSnippetFileName();
  const deleteLiquidSnippet = useDeleteLiquidSnippet();
  const createLiquidSnippet = useCreateLiquidSnippet();
  const updateLiquidSnippet = useUpdateLiquidSnippet();
  const getLiquidSnippet = useGetLiquidSnippets();
  const canEdit = useCanEdit();
  const [search, setSearch] = useState('');
  const [dataRender, setDataRender] = useState<string[]>(objectKeys(liquidSnippets));
  const [isDeleting, setIsDeleting] = useState(false);
  const { styles: styled } = useStyleSheet();

  useEffect(() => {
    objectKeys(filesState).forEach(item => {
      elasticlunrIndex.addDoc({ fileName: item });
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filesState]);

  useEffect(() => {
    setFiles(liquidSnippets);
  }, [liquidSnippets]);

  useEffect(() => {
    if (canEdit && loaded) {
      const result = elasticlunrIndex.search(search, { expand: true }).map(({ ref }) => {
        return elasticlunrIndex.documentStore.getDoc(ref);
      });
      setDataRender(isEmpty(result) ? objectKeys(filesState) : result.map(item => item.fileName));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search, filesState]);

  return (
    <View css={styles.container}>
      {status === 'loading' && <ProgressLoader containerClassName={styled(styles.loader)} done={true} color="secondary" />}
      <Search value={search} onChange={setSearch} />
      <View>
        <View
          onClick={() => {
            onChange?.(DEFAULT_FILE);
          }}
        >
          <FileItem active={fileNameProp === DEFAULT_FILE} fileName={DEFAULT_FILE} />
        </View>
        <Folder
          onCreateFile={() => setFiles(files => ({ [NEW_FILE]: '', ...files }))}
          onRefresh={() => {
            getLiquidSnippet.request({ showNotify: true });
          }}
        />
        <ScrollBars css={{ height: 'calc(100vh - 194px) !important' }}>
          {dataRender.map(fileName => (
            <Tooltip
              key={fileName}
              portal
              placement="right"
              text={canEdit ? '' : i18n.t('general.file_permission')}
              css={{ display: 'block' }}
              onClick={() => {
                if (fileName !== NEW_FILE && !isDeleting) {
                  onChange?.(fileName);
                }
              }}
            >
              <FileItem
                actionEnabled
                active={fileNameProp === fileName}
                fileName={fileName}
                onRename={newFileName => {
                  if (fileName !== newFileName) {
                    updateLiquidSnippetFileName.request({ oldFileName: fileName, newFileName });
                  }
                }}
                onDeleteStart={() => {
                  setIsDeleting(true);
                }}
                onDelete={fileName => {
                  if (fileName === NEW_FILE) {
                    setFiles(liquidSnippets);
                  } else {
                    deleteLiquidSnippet.request({ fileName });
                    onChange?.(DEFAULT_FILE);
                    setIsDeleting(false);
                  }
                }}
                onCreateFile={fileName => {
                  if (canEdit && loaded) {
                    createLiquidSnippet.request({ fileName, liquidContent: '' });
                  }
                }}
                onPublish={fileName => {
                  updateLiquidSnippet.request({ fileName, liquidContent: newSnippets[fileName] });
                }}
              />
            </Tooltip>
          ))}
        </ScrollBars>
      </View>
    </View>
  );
};
