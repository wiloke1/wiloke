import { FC, ReactNode } from 'react';
import { useSelector } from 'react-redux';
import { Role } from 'routes/types';
import { authSelector } from 'store/selectors';

export interface GuardedComponentProps {
  /** Children sẽ hiển thị nếu auth role nằm trong mảng prop role hoặc prop condition true */
  children?: ReactNode;
  /** Nếu điều kiện hiển thị children sai thì sẽ hiển thị default */
  Default?: ReactNode;
  /** Để kiểm tra xem auth role có nằm trong roles này không */
  roles?: Role[];
  /** Để kiểm tra xem auth id có bằng userId này không */
  userId?: number;
  /** Điều kiện thứ 3 đi kèm thêm bổ sung cho roles để hiển thị children */
  condition?: boolean;
}

const GuardedComponent: FC<GuardedComponentProps> = ({ condition = true, roles = [], userId, children, Default = null }) => {
  const data = useSelector(authSelector);
  if (roles.includes(data.role as Role) && (userId !== undefined && data.role !== 'admin' ? userId === data.id : true) && condition) {
    return <>{children}</>;
  }
  return <>{Default}</>;
};

export default GuardedComponent;
