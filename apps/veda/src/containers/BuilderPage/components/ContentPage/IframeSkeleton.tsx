import { AnimateFlicker } from 'components/AnimateFlicker';
import IframePlaceholder from 'components/IframePlaceholder';
import { addonsPositionStartSelector } from 'containers/BuilderPage/store/addonPosition/slice';
import { twigLoadingSelector } from 'containers/BuilderPage/store/twigLoading/slice';
import useDelay from 'hooks/useDelay';
import { FC, useEffect, useLayoutEffect, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { css, ProgressLoader, Theme, View } from 'wiloke-react-core';

const styles = {
  container: (loadingOpacity: string) => ({ colors }: Theme) => css`
    debug: IframeSkeleton_container;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 9;
    width: 100%;
    height: 100%;
    cursor: progress;
    background-color: rgba(${colors.rgbLight}, 0.5);
    opacity: ${loadingOpacity};
    cursor: progress;
  `,
  inner: ({ colors }: Theme) => css`
    debug: IframeSkeleton_inner;
    background-color: ${colors.light};
    margin-left: 301px;
    margin-top: 54px;
  `,
};

const IframeSkeleton: FC = () => {
  const twigLoading = useSelector(twigLoadingSelector);
  const [afterLoading, setAfterLoading] = useState(true);
  const [loadingOpacity, setLoadingOpacity] = useState('1');
  const [delay, cancel] = useDelay();
  const addonsPositionStart = useSelector(addonsPositionStartSelector);

  const loading = useMemo(() => twigLoading, [twigLoading]);

  useEffect(() => {
    return () => {
      setLoadingOpacity('1');
    };
  }, []);

  useEffect(() => {
    if (!afterLoading) {
      setLoadingOpacity('0.5');
    }
  }, [afterLoading]);

  useEffect(() => {
    if (addonsPositionStart.value) {
      return;
    }
    const handler = async () => {
      await delay(100);
      setAfterLoading(loading);
    };
    handler();
    return () => {
      cancel();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading, addonsPositionStart.value]);

  useLayoutEffect(() => {
    if (!afterLoading) {
      window.readyForScreenshot = true;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [afterLoading]);

  if (!afterLoading) {
    return null;
  }

  return (
    <View className="iframe-skeleton__container" css={styles.container(loadingOpacity)}>
      <View css={styles.inner}>
        <ProgressLoader done={!loading} />
        <AnimateFlicker>{loading && <IframePlaceholder />}</AnimateFlicker>
      </View>
    </View>
  );
};

export default IframeSkeleton;
