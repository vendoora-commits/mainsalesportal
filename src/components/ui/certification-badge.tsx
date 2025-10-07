'use client';

import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { Shield, CheckCircle } from 'lucide-react';

interface CertificationBadgeProps {
  certification: string;
  className?: string;
  variant?: 'full' | 'compact' | 'icon-only';
}

const certificationInfo: Record<string, { name: string; color: string; region: string }> = {
  // US Certifications
  'FCC': { name: 'FCC', color: 'blue', region: 'US' },
  'UL': { name: 'UL Listed', color: 'red', region: 'US' },
  'ETL': { name: 'ETL', color: 'blue', region: 'US' },
  'Energy Star': { name: 'Energy Star', color: 'green', region: 'US' },
  
  // EU Certifications
  'CE': { name: 'CE', color: 'blue', region: 'EU' },
  'RoHS': { name: 'RoHS', color: 'green', region: 'EU' },
  'WEEE': { name: 'WEEE', color: 'green', region: 'EU' },
  'UKCA': { name: 'UKCA', color: 'blue', region: 'UK' },
  'ErP': { name: 'ErP', color: 'green', region: 'EU' },
  
  // LATAM Certifications
  'INMETRO': { name: 'INMETRO', color: 'green', region: 'Brazil' },
  'NOM': { name: 'NOM', color: 'red', region: 'Mexico' },
  'IRAM': { name: 'IRAM', color: 'blue', region: 'Argentina' },
  
  // Africa Certifications
  'SABS': { name: 'SABS', color: 'blue', region: 'South Africa' },
  'KEBS': { name: 'KEBS', color: 'green', region: 'Kenya' },
  
  // GCC Certifications
  'SASO': { name: 'SASO', color: 'green', region: 'Saudi Arabia' },
  'ESMA': { name: 'ESMA', color: 'blue', region: 'UAE' },
  
  // APAC Certifications
  'CCC': { name: 'CCC', color: 'red', region: 'China' },
  'PSE': { name: 'PSE', color: 'blue', region: 'Japan' },
  'KC': { name: 'KC', color: 'blue', region: 'Korea' },
  'BSMI': { name: 'BSMI', color: 'orange', region: 'Taiwan' },
};

export function CertificationBadge({ 
  certification, 
  className,
  variant = 'full'
}: CertificationBadgeProps) {
  const info = certificationInfo[certification];

  if (!info) {
    return (
      <Badge variant="outline" className={cn('text-xs', className)}>
        {certification}
      </Badge>
    );
  }

  const colorClasses = {
    blue: 'bg-blue-100 text-blue-800 border-blue-300',
    red: 'bg-red-100 text-red-800 border-red-300',
    green: 'bg-green-100 text-green-800 border-green-300',
    orange: 'bg-orange-100 text-orange-800 border-orange-300',
  };

  if (variant === 'icon-only') {
    return (
      <div 
        className={cn('flex items-center justify-center w-8 h-8 rounded-full border', colorClasses[info.color as keyof typeof colorClasses], className)}
        title={`${info.name} - ${info.region}`}
      >
        <Shield className="h-4 w-4" />
      </div>
    );
  }

  if (variant === 'compact') {
    return (
      <Badge 
        variant="outline" 
        className={cn('text-xs font-medium border', colorClasses[info.color as keyof typeof colorClasses], className)}
      >
        <CheckCircle className="h-3 w-3 mr-1" />
        {certification}
      </Badge>
    );
  }

  return (
    <Badge 
      variant="outline" 
      className={cn('text-xs font-medium border', colorClasses[info.color as keyof typeof colorClasses], className)}
    >
      <Shield className="h-3 w-3 mr-1" />
      {info.name}
      <span className="ml-1 opacity-70">({info.region})</span>
    </Badge>
  );
}

/**
 * Group component for multiple certifications
 */
interface CertificationBadgesProps {
  certifications: string[];
  className?: string;
  variant?: 'full' | 'compact' | 'icon-only';
  max?: number;
}

export function CertificationBadges({ 
  certifications, 
  className,
  variant = 'compact',
  max
}: CertificationBadgesProps) {
  const displayCerts = max ? certifications.slice(0, max) : certifications;
  const remaining = max && certifications.length > max ? certifications.length - max : 0;

  return (
    <div className={cn('flex flex-wrap gap-2', className)}>
      {displayCerts.map((cert) => (
        <CertificationBadge key={cert} certification={cert} variant={variant} />
      ))}
      {remaining > 0 && (
        <Badge variant="outline" className="text-xs">
          +{remaining} more
        </Badge>
      )}
    </div>
  );
}

