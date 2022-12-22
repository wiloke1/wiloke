import { Confirm } from 'components/Confirm/Confirm';
import Tooltip from 'components/Tooltip';
import { FC } from 'react';
import { i18n } from 'translation';
import { css, FontAwesome, Text, View } from 'wiloke-react-core';
import { useCanEdit } from './useCanEdit';

export interface ActionsProps {
  fileName: string;
  onDeleteStart?: () => void;
  onRename?: (fileName: string) => void;
  onDelete?: (fileName: string) => void;
  onPublish?: (fileName: string) => void;
}

const styles = {
  actions: css`
    display: flex;
    align-items: center;
    justify-content: flex-end;
    flex-shrink: 0;
  `,
  tooltip: css`
    display: flex;
    align-items: center;
    justify-content: center;
    margin-left: 8px;
    width: 10px;
    height: 10px;
  `,
};

export const Actions: FC<ActionsProps> = ({ fileName, onDelete, onRename, onPublish, onDeleteStart }) => {
  const canEdit = useCanEdit();

  const renderDelete = () => {
    return (
      <Tooltip portal css={styles.tooltip} text={canEdit ? i18n.t('general.delete') : ''} onClick={() => onDeleteStart?.()}>
        <FontAwesome type="fal" name="times" size={14} />
      </Tooltip>
    );
  };

  return (
    <View css={styles.actions}>
      {canEdit && (
        <Tooltip
          portal
          css={styles.tooltip}
          text={canEdit ? i18n.t('general.publish') : ''}
          onClick={event => {
            event.stopPropagation();
            onPublish?.(fileName);
          }}
        >
          <FontAwesome type="far" name="arrow-alt-to-top" size={10} />
        </Tooltip>
      )}
      <Tooltip
        portal
        css={styles.tooltip}
        text={canEdit ? i18n.t('general.rename') : ''}
        onClick={() => {
          if (canEdit) {
            onRename?.(fileName);
          }
        }}
      >
        <FontAwesome type="far" name="pencil" size={10} />
      </Tooltip>
      {canEdit ? (
        <Confirm
          title={i18n.t('general.delete')}
          message={
            <View>
              Are you sure you want to delete{' '}
              <Text tagName="span" css={{ fontWeight: '500' }}>
                {fileName}
              </Text>
              ? The file will be permanently removed.
            </View>
          }
          okText={i18n.t('general.delete')}
          onOk={onClose => {
            onDelete?.(fileName);
            onClose();
          }}
        >
          {renderDelete()}
        </Confirm>
      ) : (
        renderDelete()
      )}
    </View>
  );
};
