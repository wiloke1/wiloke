import Button from 'components/Button';
import { useChangeModalAdminSettings } from 'containers/Admin/Modals';
import { useSelector } from 'react-redux';
import { articlePageSelector } from 'store/selectors';
import { i18n } from 'translation';

export const ButtonDeletePages = () => {
  const { ids, isSelectAll } = useSelector(articlePageSelector);
  const changeModalAdminSettings = useChangeModalAdminSettings();

  const _handleDeleteAll = () => {
    changeModalAdminSettings({ deleteArticle: true });
  };

  if (isSelectAll || ids.length > 0) {
    return (
      <Button
        size="small"
        backgroundColor="danger"
        color="light"
        fontFamily="secondary"
        css={{ lineHeight: 1.2, paddingTop: '11px', paddingBottom: '11px' }}
        radius={6}
        onClick={_handleDeleteAll}
      >
        {i18n.t('general.delete')}
      </Button>
    );
  }

  return null;
};
