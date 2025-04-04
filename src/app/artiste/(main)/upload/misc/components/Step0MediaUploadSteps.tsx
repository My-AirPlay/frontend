import { cn } from "@/lib/utils";
import { Check } from "lucide-react";
import { useEffect } from "react";
import { useMediaUploadStore } from "../store";
import { TMediaUploadStep } from "../store/media";

type StepItem = {
  name: string;
  label: string;
  value: string;
};

const steps: StepItem[] = [
  { name: "step-1", label: "Music Info", value: "musicInfo" },
  { name: "step-2", label: "Track Upload", value: "trackUpload" },
  { name: "step-3", label: "Music Cover", value: "coverArt" },
  { name: "step-4", label: "Distribution", value: "distribution" },
  { name: "step-5", label: "Preview", value: "preview" },
];

export default function Step0MediaUploadSteps() {
  const { currentStep, setCurrentStep } = useMediaUploadStore();
  
  // Ensure currentStep is synced with route on component mount
  useEffect(() => {
    console.log("Current step in UploadSteps:", currentStep);
    if (!currentStep || currentStep === 'selection') {
      setCurrentStep('musicInfo');
    }
  }, [currentStep, setCurrentStep]);
  
  const getStepStatus = (step: string) => {
    const stepValues = ['musicInfo', 'trackUpload', 'coverArt', 'distribution', 'preview'];
    const currentIndex = stepValues.indexOf(currentStep);
    const stepIndex = stepValues.indexOf(step);
    
    if (stepIndex < currentIndex) return 'complete';
    if (stepIndex === currentIndex) return 'active';
    return '';
  };

  const handleStepClick = (step: string) => {
    const stepValues = ['musicInfo', 'trackUpload', 'coverArt', 'distribution', 'preview'];
    const currentIndex = stepValues.indexOf(currentStep);
    const stepIndex = stepValues.indexOf(step);
    
    // Only allow going back to previous steps or staying on current step
    if (stepIndex <= currentIndex) {
      setCurrentStep(step as TMediaUploadStep);
    }
  };

  return (
    <div className="px-4 py-6">
      <div className="flex justify-center items-center gap-8 flex-wrap mt-8">
        {steps.map((step, i) => (
          <div 
            key={step.name}
            className={cn(
              "step-item cursor-pointer relative flex flex-col items-center", 
              getStepStatus(step.value)
            )}
            onClick={() => handleStepClick(step.value)}
          >
            <div className={cn(
              "step w-10 h-10 flex items-center justify-center rounded-full border border-gray-300",
              getStepStatus(step.value) === 'active' ? "bg-primary text-white" : "",
              getStepStatus(step.value) === 'complete' ? "bg-green-500 text-white" : ""
            )}>
              {getStepStatus(step.value) === 'complete' ? (
                <Check className="h-5 w-5" />
              ) : (
                i + 1
              )}
            </div>
            <p className="text-center mt-2 text-sm">{step.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
}