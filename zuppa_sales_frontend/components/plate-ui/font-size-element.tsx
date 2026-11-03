// src/components/plate-ui/font-size-dropdown-menu.tsx (or wherever this file is)

'use client';

import React from 'react';
import { DropdownMenuProps } from '@radix-ui/react-dropdown-menu';
import { useEditorRef } from '@udecode/plate-common/react'; // Corrected import path for useEditorRef
import { Editor } from 'slate';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
  useOpenState,
} from './dropdown-menu';
import { ToolbarButton } from './toolbar';

// Define font size options
const fontSizes = [
  { value: '12px', label: '12px' },
  { value: '14px', label: '14px' },
  { value: '16px', label: '16px' },
  { value: '18px', label: '18px' },
  { value: '24px', label: '24px' },
];

// Function to apply font size mark (called with editor reference)
const applyFontSize = (editor: SlateEditor, fontSize: string) => {
  if (editor.selection) {
    Editor.removeMark(editor, 'fontSize'); // Remove existing font size
    Editor.addMark(editor, 'fontSize', fontSize); // Add new font size
  }
};

export function FontSizeDropdownMenu({ ...props }: DropdownMenuProps) {
  const editor = useEditorRef(); // Gets the editor instance
  const openState = useOpenState(); // Manages open state of dropdown

  // Calculate currentFontSize based on editor's selection directly
  // This will re-evaluate whenever the editor's selection or other relevant state changes,
  // making the displayed font size dynamic.
  const currentFontSize = React.useMemo(() => {
    if (!editor || !editor.selection) {
      return '16px'; // Default if no editor or selection
    }
    const marks = Editor.marks(editor);
    // Plate/Slate marks can sometimes be undefined or null if not active
    return marks && marks.fontSize ? (marks.fontSize as string) : '16px';
  }, [editor]); // Dependencies: re-calculate when selection or editor instance changes

  // Handle font size change
  const handleFontSizeChange = (fontSize: string) => {
    // We no longer need to set `selectedFontSize` state here.
    // `currentFontSize` will automatically update when `applyFontSize` changes the editor's marks.
    applyFontSize(editor, fontSize); // Apply font size to editor
  };

  return (
    <DropdownMenu modal={false} {...openState} {...props}>
      <DropdownMenuTrigger asChild>
        <ToolbarButton
          pressed={openState.open}
          tooltip="Font Size"
          className="hover:text-amber-600"
          isDropdown
        >
          {/* Show the dynamically derived current font size */}
          <span>{currentFontSize}</span>
        </ToolbarButton>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="start"
        className="min-w-0 z-[99999] bg-white opacity-100"
      >
        <DropdownMenuRadioGroup
          className="flex flex-col gap-0.5 "
          value={currentFontSize} // Use currentFontSize as the value for the radio group
          onValueChange={handleFontSizeChange}
        >
          {fontSizes.map(({ value, label }) => (
            <DropdownMenuRadioItem key={value} value={value} hideIcon>
              <span>{label}</span>
            </DropdownMenuRadioItem>
          ))}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
