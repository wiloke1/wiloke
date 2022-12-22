import { FC, useEffect, useState } from 'react';
import { css, Text, Theme, View } from 'wiloke-react-core';
import { Actions, ActionsProps } from './Actions';
import { NEW_FILE } from './consts';
import { LiquidIcon } from './LiquidIcon';

export interface FileItemProps extends ActionsProps {
  active: boolean;
  actionEnabled?: boolean;
  onCreateFile?: (fileName: string) => void;
}

const styles = {
  item: ({ colors }: Theme) => css`
    position: relative;
    display: flex;
    align-items: center;
    padding: 5px 10px;
    cursor: pointer;
    &:hover {
      background-color: #2c2f4e;
      color: rgba(${colors.rgbGray3}, 0.8);
    }
  `,
  jcSpaceBetween: css`
    justify-content: space-between;
  `,
  active: ({ colors }: Theme) => css`
    color: rgba(${colors.rgbGray3}, 0.8);
    background-color: #2c2f4e;
    outline: 1px solid #36395d;
  `,
  itemInner: (actionVisible: boolean) => css`
    display: flex;
    align-items: center;
    width: ${actionVisible ? 'calc(100% - 40px)' : '100%'};
  `,
  textEllipsis: css`
    line-height: 24px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: pre;
  `,
  input: css`
    background-color: transparent;
    border: 1px solid #50547e;
    padding: 4px;
    height: 24px;
    margin-left: -5px;
    width: calc(100% + 5px);
  `,
};

export const FileItem: FC<FileItemProps> = ({
  active,
  fileName,
  actionEnabled = false,
  onDelete,
  onRename,
  onCreateFile,
  onDeleteStart,
  onPublish,
}) => {
  const [actionVisible, setActionVisible] = useState(false);
  const [isRename, setIsRename] = useState(false);
  const [isInputFocus, setIsInputFocus] = useState(false);
  const [newFileName, setNewFileName] = useState(fileName);
  const isCreate = fileName === NEW_FILE;

  useEffect(() => {
    if (isCreate) {
      setIsRename(true);
      setIsInputFocus(true);
      setNewFileName('');
    } else {
      setNewFileName(fileName);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fileName]);

  const handleKeyPress = (event: KeyboardEvent) => {
    if (event.key === 'Enter') {
      handleRename();
    } else if (event.key === 'Escape') {
      handleCancel();
    }
  };

  useEffect(() => {
    window.addEventListener('keyup', handleKeyPress);
    return () => {
      window.removeEventListener('keyup', handleKeyPress);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isInputFocus, newFileName]);

  function handleCancel() {
    onDelete?.(NEW_FILE);
    setIsInputFocus(false);
    setIsRename(false);
  }

  function handleRename() {
    if (isInputFocus) {
      if (isCreate) {
        if (newFileName === '') {
          onDelete?.(fileName);
        } else {
          if (/\.liquid$/.test(newFileName)) {
            onCreateFile?.(newFileName);
          } else {
            onCreateFile?.(`${newFileName}.liquid`);
          }
        }
      } else {
        if (newFileName) {
          if (/\.liquid$/.test(newFileName)) {
            onRename?.(newFileName);
          } else {
            onRename?.(`${newFileName}.liquid`);
          }
        }
      }
      setIsInputFocus(false);
    }
  }

  return (
    <View
      css={[styles.item, styles.jcSpaceBetween, active ? styles.active : {}]}
      onMouseEnter={() => {
        setActionVisible(true);
      }}
      onMouseLeave={() => {
        setActionVisible(false);
      }}
    >
      <View css={styles.itemInner(actionVisible && !isRename)}>
        <LiquidIcon />
        {isRename ? (
          <View
            autoFocus
            tagName="input"
            value={newFileName}
            css={styles.input}
            onFocus={() => {
              setIsInputFocus(true);
            }}
            onBlur={() => {
              handleRename();
              setIsInputFocus(false);
              setIsRename(false);
            }}
            onChange={event => {
              if (event.target instanceof HTMLInputElement) {
                const { value } = event.target;
                setNewFileName(value);
              }
            }}
          />
        ) : (
          <Text css={styles.textEllipsis}>{fileName === NEW_FILE ? '' : fileName}</Text>
        )}
      </View>
      {actionVisible && actionEnabled && !isRename && (
        <View css={{ width: '40px' }}>
          <Actions
            fileName={fileName}
            onRename={() => {
              setIsRename(true);
              setIsInputFocus(true);
            }}
            onDelete={onDelete}
            onDeleteStart={onDeleteStart}
            onPublish={onPublish}
          />
        </View>
      )}
    </View>
  );
};
