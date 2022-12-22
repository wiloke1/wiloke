export interface IStep {
  title: string;
  element: (stepProps: StepProps) => JSX.Element;
}

export interface StepProps {
  goNextStep: () => void;
  goPreviousStep: () => void;
  currentStep: number;
  isLast: boolean;
  isFirst: boolean;
  step: number;
}

export interface StepperProps {
  steps: IStep[];
}
