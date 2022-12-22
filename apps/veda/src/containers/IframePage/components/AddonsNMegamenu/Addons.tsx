import { useIframeSelector } from 'containers/IframePage/hooks/useIframeSelector';
import { equals } from 'ramda';
import { FC, memo, ReactElement, useMemo, useState } from 'react';
import { createPortal } from 'react-dom';
import { useSelector } from 'react-redux';
import { useDeepCompareEffect } from 'react-use';
import { iframeSelectors, pageSectionsSelector, themeAddonsSelector } from 'store/selectors';
import { PageSection } from 'types/Sections';
import { Consts } from 'utils/constants/constants';
import { isSectionAddons } from 'utils/functions/checkSectionType';
import { ProgressLoader, useStyleSheet } from 'wiloke-react-core';
import LiquidComponent from '../LiquidComponent';
import { UserBlockingPriority, shouldYield, runWithPriority, TransitionEffectCallback, useTransitionEffect } from '../useTransitionEffect';
import { Defer } from './Defer';

const { Addons: AddonsTagName } = Consts.FakeTags;

interface AddonProps {
  sectionAddon: PageSection;
  readyForRender: boolean;
}

const Addon: FC<AddonProps> = memo(({ sectionAddon, readyForRender }) => {
  const { styles } = useStyleSheet();
  const [reactEls, setReactEls] = useState<ReactElement[]>([]);
  const [isPending, startTransitionEffect, stopTransitionEffect] = useTransitionEffect();

  const themeAddon = useIframeSelector(themeAddonsSelector, equals);

  function* getReactElements() {
    const isEnablePosition = themeAddon.data.find(item => item.sectionId === sectionAddon.id)?.positionEnabled;
    if (sectionAddon && sectionAddon.enable && isEnablePosition) {
      const { id } = sectionAddon;
      const addonEls = Array.from(document.querySelectorAll(`${AddonsTagName}[data-id="${id}"]`));
      const addonReactEls: ReactElement[] = [];
      const cleanup = () => {};

      const update = () => {
        runWithPriority(UserBlockingPriority, () => {
          setReactEls(addonReactEls);
        });
      };
      for (let j = 0; j < addonEls.length; j++) {
        const el = addonEls[j];
        const $addonScopeEl = el.querySelector('script[type="application/json"') as HTMLScriptElement;
        try {
          const addonScope = JSON.parse($addonScopeEl.innerHTML);
          yield addonReactEls.push(createPortal(<LiquidComponent section={sectionAddon} addonScope={addonScope} index={j} />, el));
        } catch {
          yield addonReactEls.push(createPortal(<LiquidComponent section={sectionAddon} index={j} />, el));
        }
        if (shouldYield()) {
          update();
          yield cleanup;
        }
      }
      update();
      return cleanup;
    } else {
      setReactEls([]);
    }
  }

  useDeepCompareEffect(() => {
    stopTransitionEffect();
    if (readyForRender) {
      startTransitionEffect(getReactElements as TransitionEffectCallback);
    }
    return () => {
      stopTransitionEffect();
    };
  }, [sectionAddon, themeAddon.data, readyForRender]);

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

export const Addons = () => {
  const sections = useIframeSelector(pageSectionsSelector);
  const sectionsRenderStatus = useSelector(iframeSelectors.sectionsRenderStatus);

  const sectionsAddon = useMemo(() => sections.filter(section => isSectionAddons(section.type)), [sections]);

  const readyForRender = useMemo(() => {
    return Object.values(sectionsRenderStatus).every(({ status }) => status === 'ready');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sectionsRenderStatus, sectionsAddon]);

  return (
    <Defer chunkSize={1}>
      {sectionsAddon.map(sectionAddon => {
        return <Addon sectionAddon={sectionAddon} key={sectionAddon.id} readyForRender={readyForRender} />;
      })}
    </Defer>
  );
};
