import { FilterTypePage } from 'containers/Admin/types';

export const transformFilterType = (filterType: FilterTypePage) => {
  if (filterType === 'all') {
    return true;
  } else if (filterType === 'publish') {
    return true;
  } else {
    return false;
  }
};
