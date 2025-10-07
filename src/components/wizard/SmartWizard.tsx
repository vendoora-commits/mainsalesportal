'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  CheckCircle2, 
  Circle, 
  ArrowRight, 
  ArrowLeft, 
  Save, 
  Sparkles,
  AlertTriangle,
  TrendingUp,
  DollarSign,
  Package,
  Lightbulb
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { getSmartRecommendations, getCompatibilityWarnings, calculateSystemCost } from '@/lib/recommendations';
import type { Product } from '@/lib/product-catalog';
import type { PropertyType } from '@/types';

export interface WizardStep {
  id: string;
  title: string;
  description: string;
  component: React.ReactNode;
  isOptional?: boolean;
}

interface SmartWizardProps {
  steps: WizardStep[];
  onComplete: (data: unknown) => void;
  propertyType?: PropertyType;
  numberOfRooms?: number;
  budget?: number;
  className?: string;
}

export function SmartWizard({
  steps,
  onComplete,
  propertyType = 'hotel',
  numberOfRooms = 1,
  budget,
  className,
}: SmartWizardProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState<Set<number>>(new Set());
  const [selectedProducts, setSelectedProducts] = useState<Product[]>([]);
  const [recommendations, setRecommendations] = useState<unknown[]>([]);
  const [isLoadingRecommendations, setIsLoadingRecommendations] = useState(false);
  const [showRecommendations, setShowRecommendations] = useState(true);

  const progress = ((completedSteps.size) / steps.length) * 100;
  const currentStepData = steps[currentStep];
  const isLastStep = currentStep === steps.length - 1;
  const canProceed = completedSteps.has(currentStep) || currentStepData.isOptional;

  // Load recommendations when context changes
  useEffect(() => {
    loadRecommendations();
  }, [propertyType, numberOfRooms, budget, currentStep]);

  const loadRecommendations = async () => {
    setIsLoadingRecommendations(true);
    try {
      const recs = await getSmartRecommendations({
        propertyType,
        numberOfRooms,
        region: 'us', // TODO: Get from region detection
        budget,
        priorities: ['guest-experience', 'automation'],
        existingProducts: selectedProducts,
      });
      setRecommendations(recs);
    } catch (error) {
      console.error('Failed to load recommendations:', error);
    } finally {
      setIsLoadingRecommendations(false);
    }
  };

  // Calculate current cost
  const costInfo = selectedProducts.length > 0
    ? calculateSystemCost(selectedProducts, numberOfRooms)
    : { subtotal: 0, perRoom: 0, discount: 0, total: 0 };

  // Get compatibility warnings
  const compatibilityWarnings = getCompatibilityWarnings(selectedProducts);

  // Budget status
  const budgetStatus = budget
    ? costInfo.total <= budget
      ? 'within'
      : costInfo.total <= budget * 1.1
      ? 'close'
      : 'over'
    : 'none';

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCompletedSteps((prev) => new Set(prev).add(currentStep));
      setCurrentStep(currentStep + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      setCompletedSteps((prev) => new Set(prev).add(currentStep));
      onComplete({
        selectedProducts,
        propertyType,
        numberOfRooms,
        costInfo,
      });
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleStepClick = (stepIndex: number) => {
    if (stepIndex < currentStep || completedSteps.has(stepIndex)) {
      setCurrentStep(stepIndex);
    }
  };

  const handleAutoSave = () => {
    // Auto-save logic
    const savedData = {
      currentStep,
      completedSteps: Array.from(completedSteps),
      selectedProducts,
      propertyType,
      numberOfRooms,
      budget,
      timestamp: new Date().toISOString(),
    };
    localStorage.setItem('wizard-progress', JSON.stringify(savedData));
  };

  // Auto-save every 30 seconds
  useEffect(() => {
    const interval = setInterval(handleAutoSave, 30000);
    return () => clearInterval(interval);
  }, [currentStep, selectedProducts]);

  return (
    <div className={cn('space-y-6', className)}>
      {/* Header with Progress */}
      <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
        <CardHeader>
          <div className="flex items-center justify-between mb-4">
            <div>
              <CardTitle className="text-2xl">Smart Configuration Wizard</CardTitle>
              <CardDescription className="text-base mt-1">
                Step {currentStep + 1} of {steps.length}: {currentStepData.title}
              </CardDescription>
            </div>
            <Badge variant="secondary" className="text-lg px-4 py-2">
              {Math.round(progress)}% Complete
            </Badge>
          </div>
          <Progress value={progress} className="h-3" />
        </CardHeader>
      </Card>

      {/* Step Navigator */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center justify-between space-x-2 overflow-x-auto pb-2">
            {steps.map((step, index) => {
              const isCompleted = completedSteps.has(index);
              const isCurrent = index === currentStep;
              const isAccessible = index <= currentStep || isCompleted;

              return (
                <div key={step.id} className="flex items-center flex-shrink-0">
                  <button
                    onClick={() => handleStepClick(index)}
                    disabled={!isAccessible}
                    className={cn(
                      'flex flex-col items-center gap-2 p-3 rounded-lg transition-all',
                      isCurrent && 'bg-primary text-primary-foreground',
                      isCompleted && !isCurrent && 'bg-green-50 hover:bg-green-100',
                      !isCompleted && !isCurrent && 'hover:bg-gray-50',
                      !isAccessible && 'opacity-50 cursor-not-allowed'
                    )}
                  >
                    <div className="flex items-center gap-2">
                      {isCompleted ? (
                        <CheckCircle2 className="h-5 w-5 text-green-600" />
                      ) : (
                        <Circle className={cn('h-5 w-5', isCurrent && 'fill-current')} />
                      )}
                      <span className="text-sm font-medium whitespace-nowrap">
                        {step.title}
                      </span>
                    </div>
                    {step.isOptional && (
                      <Badge variant="outline" className="text-xs">
                        Optional
                      </Badge>
                    )}
                  </button>
                  {index < steps.length - 1 && (
                    <ArrowRight className="h-4 w-4 text-muted-foreground mx-2 flex-shrink-0" />
                  )}
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Budget & Cost Tracker */}
      {selectedProducts.length > 0 && (
        <Card className={cn(
          'border-2',
          budgetStatus === 'within' && 'border-green-200 bg-green-50',
          budgetStatus === 'close' && 'border-yellow-200 bg-yellow-50',
          budgetStatus === 'over' && 'border-red-200 bg-red-50'
        )}>
          <CardContent className="pt-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div>
                <p className="text-sm text-muted-foreground flex items-center gap-1">
                  <Package className="h-4 w-4" />
                  Products
                </p>
                <p className="text-2xl font-bold">{selectedProducts.length}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground flex items-center gap-1">
                  <DollarSign className="h-4 w-4" />
                  Subtotal
                </p>
                <p className="text-2xl font-bold">${costInfo.subtotal.toLocaleString()}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground flex items-center gap-1">
                  <TrendingUp className="h-4 w-4" />
                  Discount
                </p>
                <p className="text-2xl font-bold text-green-600">
                  -${costInfo.discount.toLocaleString()}
                </p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground flex items-center gap-1">
                  <DollarSign className="h-4 w-4" />
                  Total
                </p>
                <p className="text-2xl font-bold text-primary">
                  ${costInfo.total.toLocaleString()}
                </p>
              </div>
            </div>
            {budget && (
              <div className="mt-4 pt-4 border-t">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Budget: ${budget.toLocaleString()}</span>
                  <span className={cn(
                    'text-sm font-semibold',
                    budgetStatus === 'within' && 'text-green-600',
                    budgetStatus === 'close' && 'text-yellow-600',
                    budgetStatus === 'over' && 'text-red-600'
                  )}>
                    {budgetStatus === 'within' && '✓ Within Budget'}
                    {budgetStatus === 'close' && '⚠ Close to Budget'}
                    {budgetStatus === 'over' && '✗ Over Budget'}
                  </span>
                </div>
                <Progress 
                  value={Math.min((costInfo.total / budget) * 100, 100)} 
                  className={cn(
                    'h-2 mt-2',
                    budgetStatus === 'over' && '[&>div]:bg-red-500'
                  )}
                />
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* Compatibility Warnings */}
      {compatibilityWarnings.length > 0 && (
        <Card className="border-yellow-200 bg-yellow-50">
          <CardContent className="pt-6">
            <div className="flex items-start gap-3">
              <AlertTriangle className="h-5 w-5 text-yellow-600 mt-0.5" />
              <div className="flex-1">
                <h4 className="font-semibold text-yellow-900 mb-2">
                  Compatibility Warnings
                </h4>
                <ul className="space-y-1">
                  {compatibilityWarnings.map((warning, index) => (
                    <li key={index} className="text-sm text-yellow-800">
                      • {warning}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>{currentStepData.title}</CardTitle>
              <CardDescription>{currentStepData.description}</CardDescription>
            </CardHeader>
            <CardContent>
              {currentStepData.component}
            </CardContent>
          </Card>

          {/* Navigation Buttons */}
          <div className="flex items-center justify-between mt-6">
            <Button
              variant="outline"
              onClick={handlePrevious}
              disabled={currentStep === 0}
              className="gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              Previous
            </Button>
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                onClick={handleAutoSave}
                className="gap-2"
              >
                <Save className="h-4 w-4" />
                Save Progress
              </Button>
              <Button
                onClick={handleNext}
                disabled={!canProceed}
                className="gap-2"
              >
                {isLastStep ? 'Complete' : 'Next'}
                {!isLastStep && <ArrowRight className="h-4 w-4" />}
              </Button>
            </div>
          </div>
        </div>

        {/* AI Recommendations Sidebar */}
        <div className="lg:col-span-1">
          <Card className="sticky top-6">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Sparkles className="h-5 w-5 text-yellow-500" />
                  Smart Recommendations
                </CardTitle>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowRecommendations(!showRecommendations)}
                >
                  {showRecommendations ? 'Hide' : 'Show'}
                </Button>
              </div>
              <CardDescription>
                AI-powered suggestions for your property
              </CardDescription>
            </CardHeader>
            {showRecommendations && (
              <CardContent className="space-y-4">
                {isLoadingRecommendations ? (
                  <div className="text-center py-8">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
                    <p className="text-sm text-muted-foreground mt-2">
                      Loading recommendations...
                    </p>
                  </div>
                ) : recommendations.length === 0 ? (
                  <div className="text-center py-8">
                    <Lightbulb className="h-12 w-12 text-muted-foreground mx-auto mb-2" />
                    <p className="text-sm text-muted-foreground">
                      Complete more steps to get personalized recommendations
                    </p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {recommendations.slice(0, 5).map((rec: any, index) => (
                      <Card key={index} className="p-3 hover:shadow-md transition-shadow cursor-pointer">
                        <div className="flex items-start gap-2">
                          <Badge 
                            variant={
                              rec.category === 'essential' ? 'default' :
                              rec.category === 'recommended' ? 'secondary' :
                              rec.category === 'premium' ? 'outline' : 'secondary'
                            }
                            className="text-xs"
                          >
                            {rec.category}
                          </Badge>
                          <div className="flex-1 min-w-0">
                            <p className="font-medium text-sm truncate">
                              {rec.product?.name || 'Product'}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              ${rec.product?.price || 0}
                            </p>
                            {rec.reasons && rec.reasons.length > 0 && (
                              <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
                                {rec.reasons[0]}
                              </p>
                            )}
                          </div>
                        </div>
                      </Card>
                    ))}
                  </div>
                )}
              </CardContent>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
}

