import Tooltip from 'components/Tooltip';
import { FC } from 'react';
import { i18n } from 'translation';
import { css, FontAwesome, Theme, View } from 'wiloke-react-core';
import { useCanEdit } from './useCanEdit';

export interface FolderProps {
  onCreateFile?: () => void;
  onRefresh?: () => void;
}

const styles = {
  folder: ({ colors }: Theme) => css`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 8px 10px;
    font-weight: 500;
    color: rgba(${colors.rgbGray3}, 0.8);
    background-color: #19192f;
    margin-top: 10px;
  `,
  inner: css`
    display: flex;
    align-items: center;
  `,
  action: ({ colors }: Theme) => css`
    width: 10px;
    cursor: pointer;
    margin-left: 12px;
    color: rgba(${colors.rgbGray3}, 0.5);
    &:hover {
      color: rgba(${colors.rgbGray3}, 0.8);
    }
  `,
};

export const Folder: FC<FolderProps> = ({ onCreateFile, onRefresh }) => {
  const canEdit = useCanEdit();

  return (
    <View css={styles.folder}>
      <View css={styles.inner}>
        <View>
          <FontAwesome type="fas" name="cubes" css={{ marginRight: '5px', color: '#d29250' }} />
        </View>
        <View>Snippets</View>
      </View>
      <View>
        {canEdit && (
          <Tooltip portal text="Refresh Data" css={styles.action} onClick={onRefresh}>
            <FontAwesome type="far" name="sync-alt" size={11} />
          </Tooltip>
        )}
        <Tooltip
          portal
          placement={canEdit ? 'top' : 'right'}
          text={canEdit ? i18n.t('general.new_file') : 'You do not have permission to edit this file'}
          css={styles.action}
          onClick={canEdit ? onCreateFile : () => {}}
        >
          <FontAwesome type="far" name="plus" size={14} />
        </Tooltip>
      </View>
    </View>
  );
};
