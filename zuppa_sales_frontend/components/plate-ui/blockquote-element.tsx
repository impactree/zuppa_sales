'use client';

import React from 'react';
import { cn, withRef } from '@udecode/cn';
import { PlateElement } from './plate-element';

export const BlockquoteElement = withRef<typeof PlateElement>(
  ({ className, children, ...props }, ref) => (
    <PlateElement
      ref={ref}
      asChild
      className={cn('my-1 border-l-2 pl-6 italic', className)}
      {...props}
    >
      <blockquote>{children}</blockquote>
    </PlateElement>
  ),
);
