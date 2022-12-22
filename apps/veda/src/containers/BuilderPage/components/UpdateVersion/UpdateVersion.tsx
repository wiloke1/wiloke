import BoxCenter from 'components/BoxCenter';
import Hotspot from 'components/Hotspot';
import Tooltip from 'components/Tooltip';
import { FC } from 'react';
import { useSelector } from 'react-redux';
import { useUpdateVersionAddonFlow, useUpdateVersionSectionFlow } from 'store/actions/versions/actionSectionVersion';
import { versionSelector } from 'store/selectors';
import { i18n } from 'translation';
import { AddonOfTheme_Atom_N_Client, ThemeAddon } from 'types/Addons';
import { PageSection, ProductSection, SectionOfPage_Atom_N_ClientOrTheme_Atom_N_Client } from 'types/Sections';
import { FontAwesome } from 'wiloke-react-core';

interface UpdateVersionSection {
  type: 'section';
  item: ProductSection;
}

interface UpdateVersionAddon {
  type: 'addons';
  item: ThemeAddon;
}

export type UpdateVersionProps = UpdateVersionSection | UpdateVersionAddon;

const UpdateVersion: FC<UpdateVersionProps> = ({ type, item }) => {
  const { sectionsVersion, addonsVersion } = useSelector(versionSelector);
  const updateVersionSectionFlow = useUpdateVersionSectionFlow();
  const updateVersionAddonFlow = useUpdateVersionAddonFlow();

  const _mappingHasNewVersion: Record<typeof type, (mapItem: PageSection | ThemeAddon) => boolean> = {
    addons: mapItem => {
      if ('parentCommandId' in mapItem && 'currentVersion' in mapItem && mapItem.parentCommandId) {
        const sourceVersion = addonsVersion[mapItem.parentCommandId]?.data;
        return !!sourceVersion && sourceVersion?.version !== mapItem.currentVersion;
      }
      return false;
    },
    section: mapItem => {
      if ('parentCommandId' in mapItem && 'currentVersion' in mapItem && mapItem.parentCommandId) {
        const sourceVersion = sectionsVersion[mapItem.parentCommandId]?.data;
        return !!sourceVersion && sourceVersion?.version !== mapItem.currentVersion;
      }
      return false;
    },
  };

  const handleClick: React.MouseEventHandler<HTMLElement> = event => {
    event.stopPropagation();
    if (type === 'section') {
      updateVersionSectionFlow.request({ section: item as SectionOfPage_Atom_N_ClientOrTheme_Atom_N_Client });
    } else {
      updateVersionAddonFlow.request({ addon: item as AddonOfTheme_Atom_N_Client });
    }
  };

  if (!_mappingHasNewVersion[type](item)) {
    return null;
  }

  return (
    <Tooltip portal text={i18n.t('general.update', { text: i18n.t(`general.${type}`), textTransform: 'capitalize' })}>
      <BoxCenter css={{ position: 'relative' }} onClick={handleClick}>
        <Hotspot css={{ position: 'absolute', top: '5px', right: '5px' }} />
        <FontAwesome type="far" name="arrow-from-bottom" size={13} color="gray6" />
      </BoxCenter>
    </Tooltip>
  );
};

export default UpdateVersion;
