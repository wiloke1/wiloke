import { useSelector } from 'react-redux';
import { authSelector } from 'store/selectors';
import { Role } from './types';
import { checkRole } from './utils';

const useGuarded = () => {
  const data = useSelector(authSelector);
  return (...roles: Role[]) => checkRole(...roles)(data.role as Role);
};

export default useGuarded;
