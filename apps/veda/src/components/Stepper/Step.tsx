import { FC } from 'react';
import { StepProps } from './index';

export const Step: FC<StepProps> = ({ goNextStep, goPreviousStep, isFirst, isLast, step }) => {
  return (
    <div className="step">
      <div className="step-body">IM THE STEP {step}</div>
      <div className="step-actions">
        {/* If we are in the Step 1, we cannot go back, so we disable this */}
        <button className="step-button" disabled={isFirst} onClick={goPreviousStep}>
          GO PREVIOUS
        </button>
        {/* Same but with the last step */}
        <button className="step-button" disabled={isLast} onClick={goNextStep}>
          GO NEXT
        </button>
      </div>
    </div>
  );
};
