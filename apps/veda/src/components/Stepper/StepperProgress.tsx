import { View } from 'wiloke-react-core';
import * as styles from './styles';

interface StepperProgressProps {
  stepTitles: string[];
  currentStep: number;
}

export const StepperProgress: React.FC<StepperProgressProps> = ({ stepTitles, currentStep }) => {
  const progressPerStep = 100 / (stepTitles.length - 1);
  const progress = (currentStep - 1) * progressPerStep;
  return (
    <View className="stepper-progress" css={styles.stepperProgress}>
      <View className="stepper-progress-wrapper" css={styles.stepperProgressWrapper}>
        <View className="stepper-progress-bar" css={styles.stepperProgressBar} style={{ width: progress + '%' }} />
        {stepTitles.map((title, i) => (
          <View className="step-title" css={styles.stepTitle}>
            <View className="step-title-number" css={styles.stepTitleNumber}>
              {i + 1}
            </View>
            {title}
          </View>
        ))}
      </View>
    </View>
  );
};
