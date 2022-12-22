import Tooltip from 'components/Tooltip';
import { FC, useEffect, useState } from 'react';
import { createPortal } from 'utils/functions/createPortal';
import delay from 'utils/functions/delay';
import { ActivityIndicator, css, FontAwesome, Space, Text, Theme, View } from 'wiloke-react-core';
import { event, PublishStepLoadingPayload } from './event';

const WIDTH = 350;
const PADDING = 20;

const styles = {
  container: (isVisible: boolean, show: boolean) => ({ colors }: Theme) => css`
    debug: PublishStepLoading_container;
    position: fixed;
    top: 64px;
    right: 10px;
    z-index: 99999999;
    width: ${WIDTH}px;
    padding: ${PADDING}px;
    transition: 0.3s ease ${isVisible ? '0s' : '0.3s'};
    transform: translateX(${isVisible && show ? 0 : WIDTH + 20}px);
    &:before {
      content: '';
      position: absolute;
      inset: 0;
      z-index: -1;
      background-color: ${colors.light};
      border-radius: 6px;
      border: 1px solid ${colors.gray2};
      box-shadow: 0 5px 10px rgba(${colors.rgbGray9}, 0.15);
    }
  `,
  slide: (currentStep: number) => css`
    debug: PublishStepLoading_slide;
    display: flex;
    flex-wrap: nowrap;
    transition: 0.3s;
    transform: translateX(${currentStep * (PADDING * 2 - WIDTH)}px);
  `,
  inner: css`
    debug: PublishStepLoading_inner;
    overflow: hidden;
  `,
  item: css`
    debug: PublishStepLoading_item;
    flex-shrink: 0;
    width: ${WIDTH - PADDING * 2}px;
  `,
  progress: css`
    debug: PublishStepLoading_progress;
    border-radius: 10px;
    overflow: hidden;
    margin-top: 20px;
    width: 100%;
    height: 5px;
  `,
  progressItem: ({ colors }: Theme) => css`
    debug: PublishStepLoading_progressItem;
    display: block;
    position: relative;
    height: 100%;
    width: 0;
    border-radius: 10px;
    overflow: hidden;
    background: ${colors.primary};
  `,
  progressItemInner: css`
    debug: PublishStepLoading_progressItemInner;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent 0%, #4affc0 50%, transparent 100%);
    animation-duration: 1.5s;
    animation-iteration-count: infinite;
    animation-timing-function: ease;
    animation-name: {
      0% {
        transform: translateX(-100%);
      }
      100% {
        transform: translateX(100%);
      }
    }
  `,
  progressItem2: ({ colors }: Theme) => css`
    debug: PublishStepLoading_progressItem2;
    display: block;
    position: relative;
    height: 100%;
    width: 0;
    border-radius: 10px;
    overflow: hidden;
    background: ${colors.primary};
    background: linear-gradient(90deg, ${colors.primary} 0%, #4affc0 100%);
  `,
  close: css`
    debug: PublishStepLoading_close;
    position: absolute;
    top: 5px;
    right: 5px;
    width: 30px;
    height: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
  `,
  open: (show: boolean) => ({ colors }: Theme) => css`
    debug: PublishStepLoading_open;
    position: absolute;
    top: 10px;
    left: 0;
    z-index: -2;
    transform: translateX(${show ? '100%' : 'calc(-100% - 10px)'});
    transition: 0.4s ease ${show ? 0 : 0.3}s;
    width: 30px;
    height: 70px;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 0 10px rgba(${colors.rgbSecondary}, 0.2);
    border-radius: 6px 0 0 6px;
    cursor: pointer;
    background-color: ${colors.secondary};
  `,
  footer: css`
    debug: PublishStepLoading_footer;
    margin-top: 20px;
    display: flex;
    justify-content: flex-end;
  `,
};

export const PublishStepLoadingComponent: FC = () => {
  const [steps, setSteps] = useState<PublishStepLoadingPayload[]>([]);
  const [currentStep, setCurrentStep] = useState(-1);
  const [isVisible, setIsVisible] = useState(false);
  const [show, setShow] = useState(true);
  const [isEnd, setIsEnd] = useState(false);
  const [progressWidth, setProgressWidth] = useState(0);
  const [totalSteps, setTotalSteps] = useState(0);

  const init = (totalSteps: number) => {
    setTotalSteps(totalSteps);
    setIsEnd(false);
    // if (steps.length > 0) {
    //   setSteps(steps);
    //   setIsEnd(false);
    //   setIsVisible(true);
    // } else {
    //   setIsVisible(false);
    // }
  };

  const done = async () => {
    setIsVisible(false);
    setIsEnd(true);
    setProgressWidth(100);
    await delay(700);
    setSteps([]);
    setCurrentStep(-1);
    setShow(true);
  };

  const next = (step?: PublishStepLoadingPayload) => {
    if (!!step) {
      setSteps([...steps, step]);
      setCurrentStep(prev => prev + 1);
      setIsVisible(true);
    } else {
      done();
    }
  };

  const open = () => {
    setShow(true);
  };

  useEffect(() => {
    (async () => {
      if (currentStep < totalSteps) {
        await delay(0);
        setProgressWidth((100 / totalSteps) * (currentStep + 1));
      } else {
        done();
        await delay(400);
        setProgressWidth(0);
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentStep]);

  useEffect(() => {
    const initId = event.on('init', init);
    const nextId = event.on('next', next);
    const doneId = event.on('done', done);
    const openId = event.on('open', open);
    return () => {
      event.off(initId);
      event.off(nextId);
      event.off(doneId);
      event.off(openId);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentStep]);

  const renderProgress = () => {
    return (
      <View css={styles.progress} backgroundColor="gray1">
        {!isEnd && (
          <View
            css={styles.progressItem}
            style={{
              width: `calc(${progressWidth}% - 20px)`,
              transition: '3s linear',
            }}
          >
            <View css={styles.progressItemInner} />
          </View>
        )}
        <View
          tagName="span"
          css={styles.progressItem2}
          style={{
            transition: '0.3s',
            ...(isEnd
              ? {
                  width: `100%`,
                  visibility: 'visible',
                }
              : {
                  width: `calc(${progressWidth}% - 20px)`,
                  visibility: 'hidden',
                }),
          }}
        />
      </View>
    );
  };

  const renderContent = () => {
    return (
      <View css={styles.container(isVisible, show)}>
        <View css={styles.close} onClick={() => setShow(false)}>
          <FontAwesome type="fal" name="times" size={18} color="gray6" />
        </View>
        <Tooltip text={steps[currentStep]?.title ?? ''} placement="left" css={styles.open(show)} onClick={() => setShow(true)}>
          <ActivityIndicator size={14} color="light" />
        </Tooltip>
        <View css={styles.inner}>
          <View css={styles.slide(Math.min(currentStep, totalSteps - 1))}>
            {steps.map(item => {
              return (
                <View key={item.title} css={styles.item}>
                  <Text tagName="h5">{item.title}</Text>
                  <Space size={10} />
                  <Text>{item.description}</Text>
                </View>
              );
            })}
          </View>
        </View>
        {renderProgress()}
        {/* <View css={styles.footer}>
          <Button
            backgroundColor="gray2"
            color="gray8"
            size="extra-small"
            radius={4}
            fontFamily="secondary"
            css={{ fontWeight: 500 }}
            onClick={() => {
              done();
              event.emit('cancel', undefined);
            }}
          >
            {i18n.t('general.cancel')}
          </Button>
        </View> */}
      </View>
    );
  };

  return <>{createPortal(renderContent())}</>;
};
