import { useLocation } from 'react-router';
import { LocationStates } from 'routes/LocationStates';
import getPageInfo from './functions/getInfo';

const getDefaultEntityType = (): EntityType => {
  const entityVariant = getPageInfo('entityVariant');
  return entityVariant ?? 'Client';
  // if (entityVariant) {
  //   return entityVariant;
  // } else {
  //   const { role } = getUserInfo();
  //   if (role === 'admin') {
  //     return 'Atom';
  //   }
  //   if (role === 'dev') {
  //     return 'Draft';
  //   }
  //   return 'Client';
  // }
};

export const getEntityVariant = (location: ReturnType<typeof useLocation>) => {
  try {
    const state = (location.state as unknown) as LocationStates['/builder'];
    if (window.location.pathname === '/builder') {
      return state?.entityVariant ?? getDefaultEntityType();
    }
    return getDefaultEntityType();
  } catch {
    return getDefaultEntityType();
  }
};
