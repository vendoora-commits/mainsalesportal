'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Check, Sparkles, TrendingUp, Package, DollarSign, Info } from 'lucide-react';
import { cn } from '@/lib/utils';
import { CONFIGURATION_TEMPLATES, type ConfigurationTemplate } from '@/lib/configuration-templates';
import type { PropertyType } from '@/types';

interface TemplateSelectorProps {
  propertyType?: PropertyType;
  roomCount?: number;
  budget?: number;
  onSelectTemplate: (template: ConfigurationTemplate) => void;
  onSkip: () => void;
}

export function TemplateSelector({
  propertyType,
  roomCount,
  budget,
  onSelectTemplate,
  onSkip,
}: TemplateSelectorProps) {
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);

  // Filter templates based on criteria
  const filteredTemplates = CONFIGURATION_TEMPLATES.filter((template) => {
    if (propertyType && template.propertyType !== propertyType) return false;
    if (roomCount && (roomCount < template.roomRange[0] || roomCount > template.roomRange[1])) return false;
    if (budget && (budget < template.estimatedBudget[0] || budget > template.estimatedBudget[1])) return false;
    return true;
  });

  const handleSelectTemplate = (template: ConfigurationTemplate) => {
    setSelectedTemplate(template.id);
  };

  const handleContinue = () => {
    const template = filteredTemplates.find((t) => t.id === selectedTemplate);
    if (template) {
      onSelectTemplate(template);
    }
  };

  // Get best match if we have criteria
  const bestMatch = roomCount && propertyType
    ? filteredTemplates.find((t) => 
        roomCount >= t.roomRange[0] && 
        roomCount <= t.roomRange[1] &&
        (!budget || (budget >= t.estimatedBudget[0] && budget <= t.estimatedBudget[1]))
      )
    : null;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-3xl font-bold mb-2 flex items-center justify-center gap-2">
          <Sparkles className="h-8 w-8 text-yellow-500" />
          Choose a Configuration Template
        </h2>
        <p className="text-lg text-muted-foreground">
          Start with a pre-built configuration tailored to your needs, or build from scratch
        </p>
      </div>

      {/* Best Match Highlight */}
      {bestMatch && (
        <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <TrendingUp className="h-6 w-6 text-blue-600" />
              <div>
                <h4 className="font-semibold text-blue-900">
                  Best Match: {bestMatch.name}
                </h4>
                <p className="text-sm text-blue-700">
                  Based on your {propertyType} with {roomCount} rooms
                  {budget && ` and $${budget.toLocaleString()} budget`}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Templates Grid */}
      {filteredTemplates.length === 0 ? (
        <Card>
          <CardContent className="py-12 text-center">
            <Info className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">No Matching Templates</h3>
            <p className="text-muted-foreground mb-4">
              No pre-built templates match your criteria. You can build a custom configuration from scratch.
            </p>
            <Button onClick={onSkip}>
              Build Custom Configuration
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTemplates.map((template) => {
            const isSelected = selectedTemplate === template.id;
            const isBestMatch = bestMatch?.id === template.id;

            return (
              <Card
                key={template.id}
                className={cn(
                  'cursor-pointer transition-all hover:shadow-lg',
                  isSelected && 'ring-2 ring-primary shadow-lg',
                  isBestMatch && 'border-blue-300'
                )}
                onClick={() => handleSelectTemplate(template)}
              >
                {isBestMatch && (
                  <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-2 px-4 flex items-center justify-center gap-2">
                    <Sparkles className="h-4 w-4" />
                    <span className="text-sm font-semibold">Recommended for You</span>
                  </div>
                )}
                
                <CardHeader>
                  <div className="flex items-start justify-between mb-2">
                    <span className="text-4xl">{template.icon}</span>
                    {isSelected && (
                      <div className="bg-primary text-primary-foreground rounded-full p-1">
                        <Check className="h-4 w-4" />
                      </div>
                    )}
                  </div>
                  <CardTitle className="text-xl">{template.name}</CardTitle>
                  <CardDescription>{template.description}</CardDescription>
                </CardHeader>

                <CardContent className="space-y-4">
                  {/* Room Range & Budget */}
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div className="flex items-center gap-1">
                      <Package className="h-4 w-4 text-muted-foreground" />
                      <span className="text-muted-foreground">
                        {template.roomRange[0]}-{template.roomRange[1]} rooms
                      </span>
                    </div>
                    <div className="flex items-center gap-1">
                      <DollarSign className="h-4 w-4 text-muted-foreground" />
                      <span className="text-muted-foreground">
                        ${(template.estimatedBudget[0] / 1000).toFixed(0)}k-$
                        {(template.estimatedBudget[1] / 1000).toFixed(0)}k
                      </span>
                    </div>
                  </div>

                  {/* Products */}
                  <div>
                    <h4 className="font-semibold text-sm mb-2">Included Products:</h4>
                    <div className="flex flex-wrap gap-1">
                      {template.products.map((product) => (
                        <Badge
                          key={product.id}
                          variant={
                            product.priority === 'essential'
                              ? 'default'
                              : product.priority === 'recommended'
                              ? 'secondary'
                              : 'outline'
                          }
                          className="text-xs"
                        >
                          {product.category}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Key Features */}
                  <div>
                    <h4 className="font-semibold text-sm mb-2">Key Features:</h4>
                    <ul className="space-y-1">
                      {template.features.slice(0, 3).map((feature, index) => (
                        <li key={index} className="text-xs text-muted-foreground flex items-start gap-1">
                          <Check className="h-3 w-3 text-green-600 mt-0.5 flex-shrink-0" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Benefits */}
                  <div>
                    <h4 className="font-semibold text-sm mb-2">Benefits:</h4>
                    <ul className="space-y-1">
                      {template.benefits.slice(0, 2).map((benefit, index) => (
                        <li key={index} className="text-xs text-muted-foreground flex items-start gap-1">
                          <TrendingUp className="h-3 w-3 text-blue-600 mt-0.5 flex-shrink-0" />
                          <span>{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </CardContent>

                <CardFooter>
                  <Button
                    className="w-full"
                    variant={isSelected ? 'default' : 'outline'}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleSelectTemplate(template);
                    }}
                  >
                    {isSelected ? (
                      <>
                        <Check className="h-4 w-4 mr-2" />
                        Selected
                      </>
                    ) : (
                      'Select This Template'
                    )}
                  </Button>
                </CardFooter>
              </Card>
            );
          })}
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex items-center justify-center gap-4 pt-4">
        <Button variant="outline" onClick={onSkip} size="lg">
          Skip & Build Custom
        </Button>
        {selectedTemplate && (
          <Button onClick={handleContinue} size="lg" className="gap-2">
            Continue with Selected Template
            <Sparkles className="h-4 w-4" />
          </Button>
        )}
      </div>

      {/* Info Card */}
      <Card className="bg-gray-50">
        <CardContent className="pt-6">
          <div className="flex items-start gap-3">
            <Info className="h-5 w-5 text-blue-600 mt-0.5" />
            <div className="flex-1">
              <h4 className="font-semibold mb-1">About Templates</h4>
              <p className="text-sm text-muted-foreground">
                Templates provide a starting point based on industry best practices. You can customize any
                template after selection, adding or removing products to match your specific needs.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

