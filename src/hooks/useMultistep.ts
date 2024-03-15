import { ReactElement, useState } from "react";

export function useMultistep(steps: ReactElement[]) {
  const [currentStep, setCurrentStep] = useState(0);

  function nextStep() {
    setCurrentStep((i) => {
      if (i >= steps.length - 1) return i;
      return i + 1;
    });
  }

  function backStep() {
    setCurrentStep((i) => {
      if (i <= 0) return i;
      return i - 1;
    });
  }

  function gotoStep(index: number) {
    setCurrentStep(index);
  }

  return {
    currentStep,
    step: steps[currentStep],
    steps,
    isFirstStep: currentStep === 0,
    isFinishStep: currentStep === steps.length - 2,
    isLastStep: currentStep === steps.length - 1,
    gotoStep,
    nextStep,
    backStep,
  };
}
