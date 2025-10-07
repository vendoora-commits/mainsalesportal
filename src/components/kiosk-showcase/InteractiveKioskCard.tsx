'use client';

import { useEffect, useRef, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface InteractiveKioskCardProps {
  model: string;
  title: string;
  description: string;
  whiteImagePath: string;
  blackImagePath: string;
  whiteAlt: string;
  blackAlt: string;
  price?: number;
  features?: string[];
}

export function InteractiveKioskCard({
  model,
  title,
  description,
  whiteImagePath,
  blackImagePath,
  whiteAlt,
  blackAlt,
  price,
  features = [],
}: InteractiveKioskCardProps) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const [currentFinish, setCurrentFinish] = useState<'white' | 'black'>('white');
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const wrap = wrapRef.current;
    if (!wrap) return;

    const handleClick = () => {
      setCurrentFinish(prev => prev === 'white' ? 'black' : 'white');
    };

    wrap.addEventListener('click', handleClick);

    return () => {
      wrap.removeEventListener('click', handleClick);
    };
  }, []);

  return (
    <Card className="kiosk-product-card overflow-hidden">
      <CardContent className="p-6">
        {/* Interactive Kiosk Image */}
        <div 
          ref={wrapRef}
          className="kiosk-wrap"
          role="button"
          aria-pressed={currentFinish === 'black'}
          tabIndex={0}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <img
            src={whiteImagePath}
            alt={whiteAlt}
            className={`kiosk-img white ${currentFinish === 'white' && !isHovered ? 'active' : ''}`}
            loading="lazy"
          />
          <img
            src={blackImagePath}
            alt={blackAlt}
            className={`kiosk-img black ${currentFinish === 'black' || isHovered ? 'active' : ''}`}
            loading="lazy"
          />
        </div>

        {/* Finish Indicator */}
        <div className="kiosk-finish-indicator justify-center">
          <span className={`kiosk-finish-dot white ${currentFinish === 'white' && !isHovered ? 'scale-110' : 'opacity-50'}`}></span>
          <span className="text-sm">Hover or tap to swap finish</span>
          <span className={`kiosk-finish-dot black ${currentFinish === 'black' || isHovered ? 'scale-110' : 'opacity-50'}`}></span>
        </div>

        {/* Product Info */}
        <div className="mt-6 text-center">
          <h3 className="kiosk-product-title">{title}</h3>
          <p className="kiosk-product-description">{description}</p>
          
          {price && (
            <div className="text-2xl font-bold text-primary mb-4">
              ${price.toLocaleString()}
            </div>
          )}
          
          {features.length > 0 && (
            <div className="flex flex-wrap gap-2 justify-center mb-4">
              {features.map((feature, index) => (
                <Badge key={index} variant="outline" className="text-xs">
                  {feature}
                </Badge>
              ))}
            </div>
          )}
          
          <div className="flex gap-2 justify-center">
            <button className="button button--sm">
              <img className="button__icon" src="/vendoora-assets/icons/kiosk.svg" alt="" aria-hidden="true" />
              View Details
            </button>
            <button className="button button--secondary button--sm">
              <img className="button__icon" src="/vendoora-assets/icons/save.svg" alt="" aria-hidden="true" />
              Add to Quote
            </button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

