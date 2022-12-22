import Button from 'components/Button';
import { Confirm } from 'components/Confirm/Confirm';
import Tooltip from 'components/Tooltip';
import { useDeleteAllSectionsFlow } from 'containers/BuilderPage/store/toolbarActions/action';
import { FC } from 'react';
import { useSelector } from 'react-redux';
import { mainSectionsSelector } from 'store/selectors';
import { i18n } from 'translation';
import getPageInfo from 'utils/functions/getInfo';
import { FontAwesome } from 'wiloke-react-core';
import * as styles from './styles';

export const ClearAllButton: FC = () => {
  const deleteAllSectionsFlow = useDeleteAllSectionsFlow();
  const isTheme = !!getPageInfo('themeId');
  const pageSections = useSelector(mainSectionsSelector);

  if (isTheme || pageSections.length === 0) {
    return null;
  }

  return (
    <Confirm
      title={i18n.t('general.clear_all', { text: i18n.t('general.sections') })}
      message={i18n.t('general.delete_all_confirm', { text: i18n.t('general.sections') })}
      onOk={onClose => {
        deleteAllSectionsFlow();
        // Thực hiện hành động xoá tất cả section ngoại trừ addons
        onClose();
      }}
    >
      <Tooltip text={i18n.t('general.clear_all', { text: i18n.t('general.sections') })} portal>
        <Button backgroundColor="gray2" size="small" block radius={6} fontFamily="secondary" css={styles.clearBtn}>
          <FontAwesome type="far" name="minus-circle" color="gray8" size={20} />
        </Button>
      </Tooltip>
    </Confirm>
  );
};
