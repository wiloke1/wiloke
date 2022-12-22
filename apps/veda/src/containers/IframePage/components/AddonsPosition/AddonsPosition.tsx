import { useSectionIdForAddons } from 'containers/IframePage/globalState';
import { FC, useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { iframeSelectors } from 'store/selectors';
import { i18n } from 'translation';
import { Consts } from 'utils/constants/constants';
import { createPortal } from 'utils/functions/createPortal';
import { pmChildren } from 'utils/functions/postMessage';
import { View } from 'wiloke-react-core';
import { ButtonPlus } from './ButtonPlus';
import * as styles from './styles';
import useAddonsPosition from './useAddonsPosition';

const AddonsPosition: FC = () => {
  const beforeRef = useRef<HTMLElement | null>(null);
  const afterRef = useRef<HTMLElement | null>(null);
  const [sectionIdForAddons] = useSectionIdForAddons();
  const addonsPositionStart = useSelector(iframeSelectors.addonsPositionStart);
  const [added, setAdded] = useState(false);

  // NOTE: @tuong -> Chức năng "Addon Placholder" cần sự kết hợp của nhiều file -> Cần xem xét việc update tất cả các file khi có sự thay đổi nào đó ở 1 file bất kì
  // ["LiquidComponent.tsx", "AddonPosition.tsx", "useAddonsPosition.ts", "reducerPages.ts", "generateHelpers.ts/deleteAddonPlaceholder"]
  const { top, left, width, height, visible, element } = useAddonsPosition({
    beforeRef,
    afterRef,
    addToPlaceholder: target => {
      const sectionId = target.getAttribute(Consts.FakeTags.AddonsPlaceholder.id_attributeName);
      if (!!target && !!sectionId) {
        const openTagBase64 = target.getAttribute('veda-open-tag') as string;
        pmChildren.emit('@addAddonsPosition', {
          insert: 'before',
          openTag: decodeURIComponent(atob(openTagBase64)),
          tagName: target.tagName.toLowerCase(),
          sectionId,
          addonsSectionId: addonsPositionStart.addonsSectionId,
          indexBOC: Number(target.getAttribute('veda-index-boc')),
          hasStyleOrder: !!target.style.order,
        });
        setAdded(true);
      }
    },
  });

  useEffect(() => {
    if (addonsPositionStart.value) {
      setAdded(false);
    }
  }, [addonsPositionStart.value]);

  const handleAddAddons = (insert: 'before' | 'after') => () => {
    if (!added && !!element) {
      const openTagBase64 = element.getAttribute('veda-open-tag') as string;
      pmChildren.emit('@addAddonsPosition', {
        insert,
        openTag: decodeURIComponent(atob(openTagBase64)),
        tagName: element.tagName.toLowerCase(),
        sectionId: sectionIdForAddons,
        addonsSectionId: addonsPositionStart.addonsSectionId,
        indexBOC: Number(element.getAttribute('veda-index-boc')),
        hasStyleOrder: !!element.style.order,
      });
      setAdded(true);
    }
  };

  const renderContent = () => {
    return (
      <View css={styles.container} style={{ top, left, width, height }}>
        <ButtonPlus
          innerRef={beforeRef}
          css={[styles.before, styles.button]}
          tooltip={i18n.t('general.before')}
          onClick={handleAddAddons('before')}
        />
        <ButtonPlus innerRef={afterRef} css={[styles.after, styles.button]} tooltip={i18n.t('general.after')} onClick={handleAddAddons('after')} />
      </View>
    );
  };

  if (!visible || added) {
    return null;
  }

  return <>{createPortal(renderContent())}</>;
};

export default AddonsPosition;
