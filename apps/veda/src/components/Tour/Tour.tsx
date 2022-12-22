import Button from 'components/Button';
import useDelay from 'hooks/useDelay';
import { FC, useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useDeepCompareEffect } from 'react-use';
import { i18n } from 'translation';
import { createPortal } from 'utils/functions/createPortal';
import offset from 'utils/functions/offset';
import storage from 'utils/functions/storage';
import { Text, View } from 'wiloke-react-core';
import {
  CLASSNAME,
  PREFIX,
  SKIP_NAME,
  useGlobalIndexes,
  useGlobalIndexesActive,
  useGlobalLeftProps,
  useGlobalMoveFreelyProps,
  useGlobalOffsetHeight,
  useGlobalOffsetLeft,
  useGlobalOffsetTop,
  useGlobalOffsetWidth,
  useGlobalOpen,
  useGlobalPlacementProps,
  useGlobalRightProps,
  useGlobalSkip,
  useGlobalTopProps,
} from './globalState';
import * as styles from './styles';
import { Pathname, TourProps } from './types';

const Tour: FC<TourProps> = ({
  children,
  title,
  text,
  top = 0,
  index = 0,
  left = 0,
  right,
  pathname,
  placement = 'right-top',
  hover = false,
  nextStep = 1,
  visible = true,
  moveFreely = false,
  nextDisabled = false,
  onNextEnd,
}) => {
  const [offsetTop, setOffsetTop] = useGlobalOffsetTop();
  const [offsetLeft, setOffsetLeft] = useGlobalOffsetLeft();
  const [offsetWidth, setOffsetWidth] = useGlobalOffsetWidth();
  const [offsetHeight, setOffsetHeight] = useGlobalOffsetHeight();
  const [isHover, setIsHover] = useState(false);
  const [open, setOpen] = useGlobalOpen();
  const [indexes, setIndexes] = useGlobalIndexes();
  const [indexesActive, setIndexesActive] = useGlobalIndexesActive();
  const [skip, setSkip] = useGlobalSkip();
  const ref = useRef<HTMLElement | null>(null);
  const location = useLocation();
  const [, setTopProps] = useGlobalTopProps();
  const [, setLeftProps] = useGlobalLeftProps();
  const [, setRightProps] = useGlobalRightProps();
  const [, setPlacementProps] = useGlobalPlacementProps();
  const [, setMoveFreelyProps] = useGlobalMoveFreelyProps();
  const [delay] = useDelay();

  useEffect(() => {
    setTopProps(state => ({
      ...state,
      [`${PREFIX}${index}`]: top,
    }));
    setLeftProps(state => ({
      ...state,
      [`${PREFIX}${index}`]: left,
    }));
    setRightProps(state => ({
      ...state,
      [`${PREFIX}${index}`]: right,
    }));
    setPlacementProps(state => ({
      ...state,
      [`${PREFIX}${index}`]: placement,
    }));
    setMoveFreelyProps(state => ({
      ...state,
      [`${PREFIX}${index}`]: moveFreely,
    }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSetOpen = (index: number, pathname: Pathname, value: boolean) => {
    if (skip) {
      return;
    }
    setOpen(open => {
      return Object.keys(open).reduce((obj, key) => {
        return {
          ...obj,
          [key]: false,
          [`${PREFIX}${index}(${pathname})`]: value,
        };
      }, {});
    });
  };

  const handleMeasure = () => {
    if (!!ref.current) {
      const { top, left } = offset(ref.current);
      setOffsetTop(state => ({
        ...state,
        [`${PREFIX}${index}`]: top,
      }));
      setOffsetLeft(state => ({
        ...state,
        [`${PREFIX}${index}`]: left,
      }));
      setOffsetWidth(state => ({
        ...state,
        [`${PREFIX}${index}`]: ref.current?.offsetWidth ?? 0,
      }));
      setOffsetHeight(state => ({
        ...state,
        [`${PREFIX}${index}`]: ref.current?.offsetHeight ?? 0,
      }));
    }
  };

  useEffect(() => {
    handleMeasure();

    if (skip) {
      return;
    }

    setIndexes(state => ({
      ...state,
      [pathname]: state[pathname]?.includes(index) ? state[pathname] : [...(state[pathname] ?? []), index],
    }));

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [index]);

  useDeepCompareEffect(() => {
    if (skip) {
      return;
    }
    const indexActive = indexesActive[location.pathname];
    const newIndex = Math.min(...(indexes[location.pathname] ?? [0]));
    handleSetOpen(indexActive ?? newIndex, location.pathname, true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [indexes, indexesActive, [location.pathname]]);

  useEffect(() => {
    storage.setItem(SKIP_NAME, skip ? 'true' : 'false');
  }, [skip]);

  const handleNext = async (step = 1) => {
    handleSetOpen(index + step, pathname, !hover);
    setIndexesActive(state => ({
      ...state,
      [pathname]: index + step,
    }));
    setIsHover(false);
  };

  const handleClose = async () => {
    handleMeasure();
    // Đưa vào queue để sau khi measure xong thì mới next
    await delay(0);
    handleNext(nextStep);
    onNextEnd?.();
  };

  const handleSkip = () => {
    handleSetOpen(index + 1, pathname, false);
    setSkip(true);
    setIsHover(false);
  };

  const handleMouseEnter = () => {
    if (!open[`${PREFIX}${index - 1}(${pathname})`]) {
      setIsHover(true);
    }
  };

  const renderContent = (
    <View
      css={styles.container(
        top,
        left,
        placement,
        moveFreely,
        right,
        offsetTop[`${PREFIX}${index}`],
        offsetLeft[`${PREFIX}${index}`],
        offsetWidth[`${PREFIX}${index}`],
        offsetHeight[`${PREFIX}${index}`],
      )}
      className={CLASSNAME}
    >
      <Text tagName="h5" color="light" css={{ marginBottom: '5px' }}>
        {title}
      </Text>
      <Text color="light" size={15}>
        {text}
      </Text>
      <View css={styles.footer}>
        {!nextDisabled && (
          <Button size="extra-small" radius={6} fontFamily="secondary" css={styles.close} onClick={handleClose}>
            {i18n.t('general.next')}
          </Button>
        )}
        <Button size="extra-small" radius={6} fontFamily="secondary" css={styles.skip} onClick={handleSkip}>
          {i18n.t('general.skip')}
        </Button>
      </View>
      <View css={styles.triangle(placement)} />
    </View>
  );

  return (
    <>
      {children({ ref, onNext: handleNext, onClose: handleClose, onMouseEnter: handleMouseEnter })}
      {!!open[`${PREFIX}${index}(${pathname})`] &&
        location.pathname === pathname &&
        !skip &&
        !(hover && !isHover) &&
        visible &&
        createPortal(renderContent)}
    </>
  );
};

export default Tour;
