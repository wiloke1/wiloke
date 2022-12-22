import BoxCenter from 'components/BoxCenter';
import Hotspot from 'components/Hotspot';
import Tooltip from 'components/Tooltip';
import { FC } from 'react';
import { i18n } from 'translation';
import { FontAwesome } from 'wiloke-react-core';

interface PageHotspotProps {
  onClick?: () => void;
}

export const PageHotspot: FC<PageHotspotProps> = ({ onClick }) => {
  return (
    <Tooltip portal text={i18n.t('publish_shopify.page_not_sync_yet')}>
      <BoxCenter className="page-hotspot" css={{ position: 'relative' }} onClick={onClick}>
        <Hotspot css={{ position: 'absolute', top: '5px', right: '5px' }} />
        <FontAwesome type="far" name="arrow-from-bottom" size={13} color="gray6" />
      </BoxCenter>
    </Tooltip>
  );
};
