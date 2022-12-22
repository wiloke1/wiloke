import React, { FC, useEffect, useRef, useState } from 'react';
import { View } from 'wiloke-react-core';
import { StepperProps } from './index';
import { StepperProgress } from './StepperProgress';
import * as styles from './styles';

const Stepper: FC<StepperProps> = ({ steps }) => {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const stepperSelector = useRef<HTMLDivElement>(null);

  const moveStepper = () => {
    if (stepperSelector.current) {
      const stepper = stepperSelector.current;
      const stepWidth = stepper.offsetWidth / steps.length;
      stepper.style.transform = `translateX(-${stepWidth * (currentStep - 1)}px)`;
    }
  };

  // Every time our currentStep is updated, we are going to trigger this
  useEffect(() => {
    moveStepper();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentStep]);

  const _goNextStep = () => {
    const nextStep = currentStep + 1;
    if (nextStep <= steps.length) {
      setCurrentStep(nextStep);
    }
  };

  const _goPreviousStep = () => {
    const previousStep = currentStep - 1;
    if (previousStep >= 1) {
      setCurrentStep(previousStep);
    }
  };

  return (
    <View css={styles.stepper}>
      <StepperProgress stepTitles={steps.map(step => step.title)} currentStep={currentStep} />

      <View className="stepper-selector" css={styles.stepperSelector} ref={stepperSelector}>
        {steps.map((step, i) => (
          <View className="step-wrapper" css={styles.stepWrapper}>
            <step.element
              step={i + 1}
              goNextStep={_goNextStep}
              goPreviousStep={_goPreviousStep}
              currentStep={currentStep}
              isFirst={i === 0}
              isLast={i === steps.length - 1}
            />
          </View>
        ))}
      </View>
    </View>
  );
};

export default Stepper;
