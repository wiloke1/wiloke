import Button from 'components/Button';
import Empty from 'components/Empty';
import MyModal, { MyModalProps } from 'components/MyModal';
import React, { FC, ReactNode, useEffect, useState } from 'react';
import { Image, View } from 'wiloke-react-core';
import { Step, useStep } from './useStep';
import * as styles from './styles';

interface OnChangeParams {
  step: Step;
  indexStep: number;
}

export interface StepModalProps {
  data: Step[];
  initialStep?: number;
  visible: MyModalProps['isVisible'];
  headerText?: MyModalProps['headerText'];
  onClose?: MyModalProps['onCancel'];
  onNext?: ({ indexStep, step }: OnChangeParams) => void;
  onPrevious?: ({ indexStep, step }: OnChangeParams) => void;
  renderItem?: (item: Step) => ReactNode;
}

const StepModal: FC<StepModalProps> = ({
  data = [],
  initialStep = 0,
  visible = false,
  headerText = 'Steps Modal',
  onClose,
  onNext,
  onPrevious,
  renderItem,
}) => {
  const { navigation, step, index } = useStep({ steps: data, initialStep });
  const [onChange, setOnChange] = useState<'next' | 'prev' | string>('');

  useEffect(() => {
    if (visible) {
      if (onChange === 'next') {
        onNext?.({ indexStep: index, step });
      }
      if (onChange === 'prev') {
        onPrevious?.({ indexStep: index, step });
      }
    } else {
      setOnChange('');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visible, onChange, index, step]);

  const handleNext = () => {
    navigation.next();
    setOnChange('next');
  };
  const handlePrevious = () => {
    navigation.previous();
    setOnChange('prev');
  };

  const renderContent = () => {
    return (
      <View css={styles.container}>
        {!!renderItem ? (
          renderItem?.(step)
        ) : (
          <>
            <Image aspectRatioInPercent={65} src={step.image} />
            <View css={styles.item}>
              <View color="dark" css={styles.title}>
                {step.heading}
              </View>
              <View>{step.description}</View>
            </View>
          </>
        )}

        <View css={styles.dots}>
          {data.map(item => (
            <View
              key={item.id}
              radius={50}
              backgroundColor={item.id === step.id ? 'facebook' : 'gray4'}
              css={styles.dot}
              onClick={() => {
                navigation.go(item.id);
              }}
            />
          ))}
        </View>

        <View css={styles.groupButton}>
          <Button block size="small" css={styles.prevButton} onClick={handlePrevious}>
            Prev
          </Button>
          <Button block size="small" onClick={handleNext} css={styles.nextButton}>
            Next
          </Button>
        </View>
      </View>
    );
  };

  return (
    <MyModal
      headerText={headerText}
      okText={''}
      cancelText={''}
      isVisible={visible}
      onCancel={onClose}
      depsHeightRecalculation={step}
      bodyCss={data.length < 1 ? { minHeight: '150px' } : {}}
    >
      {data.length ? renderContent() : <Empty />}
    </MyModal>
  );
};

export default StepModal;
