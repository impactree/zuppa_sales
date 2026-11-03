// src/components/FontFamilyDropdown.tsx
import React from 'react';
import {
  DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem,
} from './dropdown-menu';
import { ToolbarButton } from './toolbar';
// import { applyFontFamily } from './font-family-utils';

const fontFamilies = [
  { value: 'Arial', label: 'Arial' },
  { value: 'Courier New', label: 'Courier New' },
  { value: 'Georgia', label: 'Georgia' },
  { value: 'Times New Roman', label: 'Times New Roman' },
  { value: 'Verdana', label: 'Verdana' },
];

export function FontFamilyDropdown() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <ToolbarButton tooltip="Font Family">
          Font Family
        </ToolbarButton>
      </DropdownMenuTrigger>

      <DropdownMenuContent>
        {fontFamilies.map((font) => (
          <DropdownMenuItem
            key={font.value}
            // onClick={() => applyFontFamily(font.value)}
          >
            {font.label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
