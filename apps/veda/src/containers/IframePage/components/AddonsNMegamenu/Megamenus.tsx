import { useIframeSelector } from 'containers/IframePage/hooks/useIframeSelector';
import { equals } from 'ramda';
import { FC, memo, ReactElement, useEffect, useMemo, useState } from 'react';
import { createPortal } from 'react-dom';
import { useSelector } from 'react-redux';
import { iframeSelectors, pageSectionsSelector } from 'store/selectors';
import { PageSection } from 'types/Sections';
import { Consts } from 'utils/constants/constants';
import { isSectionMegamenu } from 'utils/functions/checkSectionType';
import { ProgressLoader, useStyleSheet } from 'wiloke-react-core';
import LiquidComponent from '../LiquidComponent';
import { NormalPriority, runWithPriority, TransitionEffectCallback, useTransitionEffect } from '../useTransitionEffect';
import { Defer } from './Defer';

const { Megamenu: MegamenusTagName } = Consts.FakeTags;

interface MegamenuProps {
  sectionMegamenu: PageSection;
  readyForRender: boolean;
}

const Megamenu: FC<MegamenuProps> = memo(({ sectionMegamenu, readyForRender }) => {
  const { styles } = useStyleSheet();
  const [reactEls, setReactEls] = useState<ReactElement[]>([]);
  const [isPending, startTransitionEffect, stopTransitionEffect] = useTransitionEffect();

  function* getReactElements() {
    if (sectionMegamenu && sectionMegamenu.enable) {
      const { id } = sectionMegamenu;
      const addonEls = Array.from(document.querySelectorAll(`${MegamenusTagName}[data-id="${id}"]`));
      const addonReactEls: ReactElement[] = [];
      for (let j = 0; j < addonEls.length; j++) {
        const el = addonEls[j];
        yield addonReactEls.push(createPortal(<LiquidComponent section={sectionMegamenu} index={j} />, el));
      }
      // Update
      runWithPriority(NormalPriority, () => {
        setReactEls(addonReactEls);
      });
    } else {
      setReactEls([]);
    }
  }

  useEffect(() => {
    stopTransitionEffect();
    if (readyForRender) {
      startTransitionEffect(getReactElements as TransitionEffectCallback);
    }
    return () => {
      stopTransitionEffect();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sectionMegamenu, readyForRender]);

  return (
    <>
      <ProgressLoader
        containerClassName={styles({ position: 'absolute', top: '0', left: '0', width: '100%', zIndex: 9 })}
        done={!isPending}
        color="secondary"
      />
      <Defer chunkSize={1}>{reactEls}</Defer>
    </>
  );
}, equals);

export const Megamenus = () => {
  const sections = useIframeSelector(pageSectionsSelector);
  const sectionsRenderStatus = useSelector(iframeSelectors.sectionsRenderStatus);

  const sectionsMegamenu = useMemo(() => sections.filter(section => isSectionMegamenu(section.type)), [sections]);

  const readyForRender = useMemo(() => {
    return Object.values(sectionsRenderStatus).every(({ status }) => status === 'ready');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sectionsRenderStatus, sectionsMegamenu]);

  return (
    <Defer chunkSize={1} timeout={0}>
      {sectionsMegamenu.map(sectionMegamenu => {
        return <Megamenu sectionMegamenu={sectionMegamenu} key={sectionMegamenu.id} readyForRender={readyForRender} />;
      })}
    </Defer>
  );
};
