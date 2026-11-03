/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable max-len */

'use client';

import React, { useEffect, useState, useCallback } from 'react';
import { useEditorRef } from '@udecode/plate-common/react';
import { YjsPlugin } from '@udecode/plate-yjs/react';
import { ReactEditor } from 'slate-react';
import { Range as SlateRange, Node } from 'slate';

interface CursorData {
  name: string;
  color: string;
}

interface RemoteCursorPosition {
  clientId: number;
  data: CursorData;
  position: { top: number; left: number; height: number } | null;
}

interface RemoteCursorsOverlayProps {
  containerRef: React.RefObject<HTMLElement>;
}

/**
 * RemoteCursorsOverlay - Shows actual cursor marks at document positions
 *
 * Uses Slate's ReactEditor.toDOMRange to convert selection paths to DOM positions,
 * then renders cursor carets with user names at those positions.
 */
export function RemoteCursorsWithPositions({ containerRef }: RemoteCursorsOverlayProps) {
  const editor = useEditorRef();
  const [cursorPositions, setCursorPositions] = useState<RemoteCursorPosition[]>([]);

  // Convert Slate selection to screen position
  const getPositionFromSelection = useCallback((selection: any): { top: number; left: number; height: number } | null => {
    if (!selection || !selection.anchor || !selection.focus) {
      return null;
    }

    try {
      // Validate that the paths exist in the current document
      const anchorPath = selection.anchor.path;
      const focusPath = selection.focus.path;

      // Check if paths are valid in current document
      if (!anchorPath || !Array.isArray(anchorPath) || anchorPath.length === 0) {
        return null;
      }

      // Try to get the node at the path to validate it exists
      try {
        const node = Node.get(editor, anchorPath);
        if (!node) return null;
      } catch {
        // Path doesn't exist in current document
        return null;
      }

      // Create a Slate range from the selection
      const slateRange: SlateRange = {
        anchor: { path: anchorPath, offset: selection.anchor.offset || 0 },
        focus: { path: focusPath, offset: selection.focus.offset || 0 },
      };

      // Convert to DOM range
      const domRange = ReactEditor.toDOMRange(editor as any, slateRange);
      const rect = domRange.getBoundingClientRect();

      // Get container position for relative positioning
      const containerRect = containerRef.current?.getBoundingClientRect();
      if (!containerRect) return null;

      return {
        top: rect.top - containerRect.top,
        left: rect.left - containerRect.left,
        height: rect.height || 20,
      };
    } catch (error) {
      // Selection path doesn't exist in current document structure
      // console.log('Could not calculate cursor position:', error);
      return null;
    }
  }, [editor, containerRef]);

  useEffect(() => {
    let cleanup: (() => void) | undefined;
    let retryCount = 0;
    const maxRetries = 20;

    const setupAwareness = () => {
      try {
        const yjsPluginOptions = editor.getOptions(YjsPlugin);
        const provider = yjsPluginOptions?.provider || yjsPluginOptions?.hocuspocusProvider;

        if (!provider) {
          retryCount += 1;
          if (retryCount < maxRetries) setTimeout(setupAwareness, 500);
          return;
        }

        const { awareness } = provider;
        if (!awareness) {
          retryCount += 1;
          if (retryCount < maxRetries) setTimeout(setupAwareness, 500);
          return;
        }

        // console.log('✅ RemoteCursorsWithPositions: Awareness ready');

        const updateCursors = () => {
          const states = awareness.getStates();
          const positions: RemoteCursorPosition[] = [];

          // console.log('🔍 RemoteCursors: Total awareness states:', states.size);

          states.forEach((state: any, clientId: number) => {
            if (clientId === awareness.clientID) return;

            // Get user info
            const userName = state.user?.name
              || state.cursor?.data?.name
              || state.name
              || 'Anonymous';
            const userColor = state.user?.color
              || state.cursor?.data?.color
              || state.color
              || '#3B82F6';

            // Get selection - check all possible locations
            const selection = state.cursor?.selection || state.selection;

            // console.log(`👤 Remote user "${userName}" (${clientId}):`, {
            //   hasSelection: !!selection,
            //   selectionData: selection,
            //   fullState: state,
            // });

            if (selection) {
              const position = getPositionFromSelection(selection);

              // console.log(`📍 Position calculated for "${userName}":`, position);

              positions.push({
                clientId,
                data: { name: userName, color: userColor },
                position,
              });
            }
          });

          // console.log('📊 Final cursor positions:', positions.length, positions);
          setCursorPositions(positions);
        };

        awareness.on('change', updateCursors);
        awareness.on('update', updateCursors);
        updateCursors();

        // Update more frequently for smoother cursor movement
        const interval = setInterval(updateCursors, 500);

        cleanup = () => {
          awareness.off('change', updateCursors);
          awareness.off('update', updateCursors);
          clearInterval(interval);
        };
      } catch (error) {
        console.error('RemoteCursorsWithPositions error:', error);
        retryCount += 1;
        if (retryCount < maxRetries) setTimeout(setupAwareness, 500);
      }
    };

    const timer = setTimeout(setupAwareness, 1000);

    return () => {
      clearTimeout(timer);
      if (cleanup) cleanup();
    };
  }, [editor, getPositionFromSelection]);

  // Filter cursors with valid positions
  const validCursors = cursorPositions.filter((c) => c.position !== null);

  if (validCursors.length === 0) {
    return null;
  }

  return (
    <>
      {validCursors.map((cursor) => (
        <div
          key={cursor.clientId}
          style={{
            position: 'absolute',
            top: cursor.position!.top,
            left: cursor.position!.left,
            zIndex: 100,
            pointerEvents: 'none',
          }}
        >
          {/* Cursor caret line */}
          <div
            style={{
              width: '2px',
              height: cursor.position!.height,
              backgroundColor: cursor.data.color,
              borderRadius: '1px',
            }}
          />
          {/* User name label */}
          <div
            style={{
              position: 'absolute',
              top: '-22px',
              left: '0',
              backgroundColor: cursor.data.color,
              color: 'white',
              padding: '2px 8px',
              borderRadius: '4px',
              fontSize: '11px',
              fontWeight: 600,
              whiteSpace: 'nowrap',
              boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
              transform: 'translateX(-50%)',
            }}
          >
            {cursor.data.name}
          </div>
        </div>
      ))}
    </>
  );
}
