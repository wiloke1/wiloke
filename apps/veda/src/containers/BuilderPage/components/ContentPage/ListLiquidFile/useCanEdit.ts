import { useSelector } from 'react-redux';
import { authSelector } from 'store/selectors';

export const useCanEdit = () => {
  const { role } = useSelector(authSelector);

  const canEdit = ['admin', 'dev'].includes(role);
  return canEdit;
};
