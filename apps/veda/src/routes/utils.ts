import { Role } from './types';

export const checkRole = <T extends Role = Role>(...args: T[]) => {
  const roles = args as Extract<Role, T>[];
  return (role: Role) => {
    return roles.includes(role as any);
  };
};
