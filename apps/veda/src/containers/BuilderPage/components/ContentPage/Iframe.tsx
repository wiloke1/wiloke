import { iframeLoadedSelector } from 'containers/BuilderPage/store/iframeLoaded/slice';
import { FC, useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { useSetIframeHover } from 'store/global/iframeHover/slice';
import {
  fullscreenSelector,
  isDraggingSelector,
  layoutSettingsSelector,
  pageSectionsSelector,
  responsiveSelector,
  sectionEdittingIdSelector,
  sectionIdCodeVisibleSelector,
} from 'store/selectors';
import { PageSection } from 'types/Sections';
import { View } from 'wiloke-react-core';
import { SectionContextMenu } from '../SectionContextMenu/SectionContextMenu';
import IframeSkeleton from './IframeSkeleton';
import * as styles from './styles';

const Iframe: FC = () => {
  const setIframeHover = useSetIframeHover();

  const isDragging = useSelector(isDraggingSelector);
  const responsive = useSelector(responsiveSelector);
  const fullscreen = useSelector(fullscreenSelector);
  const layoutSettings = useSelector(layoutSettingsSelector);
  const sectionIdCodeVisible = useSelector(sectionIdCodeVisibleSelector);
  const sectionEdittingId = useSelector(sectionEdittingIdSelector);
  const pageSections = useSelector(pageSectionsSelector);
  const section = pageSections.find(section => section.id === sectionEdittingId) as PageSection;
  const iframeContainerRef = useRef<HTMLElement | null>(null);
  const iframeRef = useRef<HTMLIFrameElement | null>(null);
  const visible = !!section && !!sectionIdCodeVisible;
  const iframeLoaded = useSelector(iframeLoadedSelector);
  const [scale, setScale] = useState(
    visible ? 1 : iframeContainerRef.current?.offsetWidth ? iframeContainerRef.current.offsetWidth / window.innerWidth : 1,
  );

  const getScale = () => {
    if (visible || fullscreen) {
      return 1;
    }
    if (!!iframeContainerRef.current?.offsetWidth) {
      if (iframeContainerRef.current.offsetWidth > layoutSettings.containerWidth + 200) {
        return 1;
      }
      return iframeContainerRef.current.offsetWidth / (layoutSettings.containerWidth + 100);
    }
    return 1;
  };

  useEffect(() => {
    const scale = getScale();
    setScale(scale);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visible, fullscreen]);

  useEffect(() => {
    if (iframeLoaded) {
      iframeRef.current?.contentDocument?.body?.setAttribute('data-scale', scale.toString());
    }
  }, [scale, iframeLoaded]);

  return (
    <View ref={iframeContainerRef} css={styles.iframe(isDragging, responsive)}>
      <View css={styles.zoom(scale)}>
        <View
          ref={iframeRef}
          tagName="iframe"
          id="iframe-content"
          src="/iframe"
          style={{ width: '100%', height: '100%' }}
          onMouseEnter={() => {
            setIframeHover(true);
          }}
          onMouseLeave={() => {
            setIframeHover(false);
          }}
        />
      </View>
      <SectionContextMenu iframeEl={iframeRef.current} />
      <IframeSkeleton />
    </View>
  );
};

export default Iframe;
