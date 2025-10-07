'use client';

import { cn } from '@/lib/utils';

interface Step {
  id: number;
  title: string;
  description: string;
}

interface ProgressIndicatorProps {
  steps: Step[];
  currentStep: number;
  completedSteps: number[];
  onStepClick: (step: number) => void;
}

export function ProgressIndicator({ 
  steps, 
  currentStep, 
  completedSteps, 
  onStepClick 
}: ProgressIndicatorProps) {
  return (
    <div className="w-full">
      <div className="flex items-center justify-between">
        {steps.map((step, index) => {
          const isActive = step.id === currentStep;
          const isCompleted = completedSteps.includes(step.id);
          const isClickable = step.id <= currentStep || completedSteps.includes(step.id - 1);

          return (
            <div key={step.id} className="flex items-center">
              <div className="flex flex-col items-center">
                <button
                  onClick={() => isClickable && onStepClick(step.id)}
                  disabled={!isClickable}
                  className={cn(
                    'step-indicator',
                    isActive && 'active',
                    isCompleted && 'completed',
                    !isActive && !isCompleted && 'pending',
                    isClickable && 'cursor-pointer hover:scale-105',
                    !isClickable && 'cursor-not-allowed opacity-50'
                  )}
                >
                  {isCompleted ? (
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  ) : (
                    step.id
                  )}
                </button>
                <div className="mt-2 text-center">
                  <div className={cn(
                    'text-sm font-medium',
                    isActive && 'text-primary',
                    isCompleted && 'text-green-600',
                    !isActive && !isCompleted && 'text-gray-500'
                  )}>
                    {step.title}
                  </div>
                  <div className="text-xs text-gray-400 mt-1">
                    {step.description}
                  </div>
                </div>
              </div>
              
              {index < steps.length - 1 && (
                <div className={cn(
                  'flex-1 h-0.5 mx-4 mt-8',
                  completedSteps.includes(step.id) ? 'bg-green-500' : 'bg-gray-200'
                )} />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
