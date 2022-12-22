import qs from 'qs';
import { isIframePage } from 'utils/isFramePage';

export interface Results {
  shop: string;
  id: string;
  themeId: string;
  entityVariant?: EntityType;
}

const getPageInfo = <KeyT extends keyof Results>(key: KeyT, locationSearch?: string) => {
  const windowLocation = isIframePage() ? window.parent.location : window.location;
  const result = qs.parse(locationSearch ?? windowLocation.search, { ignoreQueryPrefix: true, comma: true })[key] ?? '';
  return result as Results[KeyT];
};

export default getPageInfo;
