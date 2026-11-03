/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable max-len */
/* eslint-disable no-underscore-dangle */
/* eslint-disable react/no-array-index-key */

'use client';

import React, { useEffect, useState } from 'react';
import { cn } from '@udecode/cn';
import {
  createPlatePlugin,
  findEventRange,
  useEditorRef,
} from '@udecode/plate-common/react';
import { CursorOverlay as CursorOverlayPrimitive } from '@udecode/plate-cursor';
import { DndPlugin } from '@udecode/plate-dnd';
import { YjsPlugin } from '@udecode/plate-yjs/react';

import type {
  CursorData,
  CursorOverlayProps,
  CursorProps,
  CursorState,
} from '@udecode/plate-cursor';

// Extended cursor data to include name
interface ExtendedCursorData extends CursorData {
  name?: string;
}

// Custom Cursor rendering with name label
export function CursorWithName({
  caretPosition,
  classNames,
  data,
  disableCaret,
  disableSelection,
  selectionRects,
}: CursorProps<ExtendedCursorData>) {
  const { style, selectionStyle = style, name } = data ?? ({} as ExtendedCursorData);

  // Debug: log when this function is called
  //  console.log('🎨 CursorWithName rendering:', {
  //     hasCaretPosition: !!caretPosition,
  //     name,
  //     style,
  //     selectionRectsCount: selectionRects?.length,
  //     disableCaret,
  //   });

  return (
    <>
      {/* Selection rectangles (when text is selected) */}
      {!disableSelection
        && selectionRects.map((position, index) => (
          <div
            className={cn(
              'pointer-events-none absolute z-10 opacity-30',
              classNames?.selectionRect,
            )}
            key={index}
            style={{
              ...selectionStyle,
              ...position,
            }}
          />
        ))}
      {/* Cursor caret line with name label */}
      {!disableCaret && caretPosition && (
        <div
          className={cn(
            'pointer-events-none absolute z-10',
            classNames?.caret,
          )}
          style={{ ...caretPosition, ...style, width: '2px' }}
        >
          {/* Name label above the cursor */}
          {name && (
            <div
              style={{
                position: 'absolute',
                top: '-20px',
                left: '0',
                backgroundColor: style?.backgroundColor || '#3B82F6',
                color: 'white',
                padding: '2px 6px',
                borderRadius: '3px',
                fontSize: '11px',
                fontWeight: 500,
                whiteSpace: 'nowrap',
                transform: 'translateX(-50%)',
                zIndex: 100,
              }}
            >
              {name}
            </div>
          )}
        </div>
      )}
    </>
  );
}

// Standard cursor rendering (without name)
export function Cursor({
  caretPosition,
  classNames,
  data,
  disableCaret,
  disableSelection,
  selectionRects,
}: CursorProps<CursorData>) {
  const { style, selectionStyle = style } = data ?? ({} as CursorData);

  return (
    <>
      {!disableSelection
        && selectionRects.map((position) => (
          <div
            className={cn(
              'pointer-events-none absolute z-10 opacity-30',
              classNames?.selectionRect,
            )}
            key={`${position}`}
            style={{
              ...selectionStyle,
              ...position,
            }}
          />
        ))}
      {!disableCaret && caretPosition && (
        <div
          className={cn(
            'pointer-events-none absolute z-10 w-0.5',
            classNames?.caret,
          )}
          style={{ ...caretPosition, ...style }}
        />
      )}
    </>
  );
}

export const DragOverCursorPlugin = createPlatePlugin({
  handlers: {
    onDragEnd: ({ editor, plugin }) => {
      editor.setOption(plugin, 'cursors', {});
    },
    onDragLeave: ({ editor, plugin }) => {
      editor.setOption(plugin, 'cursors', {});
    },
    onDragOver: ({ editor, event, plugin }) => {
      if (editor.getOptions(DndPlugin).isDragging) return;

      const range = findEventRange(editor, event);

      if (!range) return;

      editor.setOption(plugin, 'cursors', {
        drag: {
          data: {
            style: {
              backgroundColor: 'hsl(222.2 47.4% 11.2%)',
              width: 3,
            },
          },
          key: 'drag',
          selection: range,
        },
      });
    },
    onDrop: ({ editor, plugin }) => {
      editor.setOption(plugin, 'cursors', {});
    },
  },
  key: 'dragOverCursor',
  options: { cursors: {} as Record<string, CursorState<CursorData>> },
});

// CursorOverlay that includes awareness-based remote cursors
export function CursorOverlay({ cursors, containerRef, ...props }: CursorOverlayProps & { containerRef?: React.RefObject<HTMLElement> }) {
  const editor = useEditorRef();
  const dynamicCursors = editor.useOption(DragOverCursorPlugin, 'cursors');
  const [awarenessCursors, setAwarenessCursors] = useState<Record<string, CursorState<ExtendedCursorData>>>({});

  // Debug: log containerRef status
  // console.log('📦 CursorOverlay: containerRef received:', {
  //   hasRef: !!containerRef,
  //   hasCurrent: !!containerRef?.current,
  //   currentElement: containerRef?.current?.tagName,
  // });

  useEffect(() => {
    let cleanup: (() => void) | undefined;
    let retryCount = 0;
    const maxRetries = 20;
    const retryInterval = 500;

    const setupAwareness = () => {
      try {
        // Access YjsPlugin options
        const yjsPluginOptions = editor.getOptions(YjsPlugin);

        // Debug: log what's available
        // console.log('🔍 CursorOverlay: YjsPlugin options keys:', Object.keys(yjsPluginOptions || {}));

        // The provider is at 'provider' key, not 'hocuspocusProvider'
        const provider = yjsPluginOptions?.provider || yjsPluginOptions?.hocuspocusProvider;

        if (!provider) {
          retryCount += 1;
          if (retryCount < maxRetries) {
            // console.log(`CursorOverlay: Provider not ready, retry ${retryCount}/${maxRetries}...`);
            setTimeout(setupAwareness, retryInterval);
          } else {
            // console.warn('CursorOverlay: Max retries reached, provider not available');
          }
          return;
        }

        // Debug: log provider properties
        // console.log('🔍 CursorOverlay: Provider found!');
        // console.log('🔍 CursorOverlay: Provider keys:', Object.keys(provider));
        // console.log('🔍 CursorOverlay: Provider.awareness exists:', !!provider.awareness);

        // Try to get awareness
        let { awareness } = provider;

        // If not directly on provider, try other locations
        if (!awareness) {
          awareness = (provider as any)._awareness;
          // if (awareness) console.log('Found awareness at _awareness');
        }

        if (!awareness) {
          awareness = (provider as any).getAwareness?.();
          // if (awareness) console.log('Found awareness via getAwareness()');
        }

        if (!awareness) {
          retryCount += 1;
          if (retryCount < maxRetries) {
            // console.log(`CursorOverlay: Awareness not ready, retry ${retryCount}/${maxRetries}...`);
            setTimeout(setupAwareness, retryInterval);
          } else {
            // console.warn('CursorOverlay: Max retries reached, awareness not available');
            // console.log('🔍 Provider has these keys:', Object.keys(provider));
          }
          return;
        }

        // console.log('✅ CursorOverlay: Awareness ready, clientId:', awareness.clientID);

        const updateCursors = () => {
          const states = awareness.getStates();
          const newCursors: Record<string, CursorState<ExtendedCursorData>> = {};

          states.forEach((state: any, clientId: number) => {
            // Skip our own cursor
            if (clientId === awareness.clientID) {
              return;
            }

            // Debug first remote state we see
            if (Object.keys(state).length > 0) {
              // console.log(`🔍 Remote client ${clientId} state:`, state);
            }

            // The cursor selection data might be in different places depending on YjsPlugin version
            // state.cursor?.selection may be explicitly null, so we need careful null checks
            let cursorSelection = null;

            if (state.cursor?.selection
              && state.cursor.selection.anchor
              && state.cursor.selection.focus) {
              cursorSelection = state.cursor.selection;
            } else if (state.selection
              && state.selection.anchor
              && state.selection.focus) {
              cursorSelection = state.selection;
            } else if (state.cursor?.anchor && state.cursor?.focus) {
              cursorSelection = {
                anchor: state.cursor.anchor,
                focus: state.cursor.focus,
              };
            }

            // Get user data from various possible locations in awareness state
            // 1. state.user (set by plate-editor via setLocalStateField)
            // 2. state.cursor.data (set by YjsPlugin)
            // 3. state.name/state.color (direct fields)
            const userName = state.user?.name
              || state.cursor?.data?.name
              || state.name
              || 'Anonymous';
            const userColor = state.user?.color
              || state.cursor?.data?.color
              || state.color
              || '#3B82F6';

            // console.log(`🔍 Client ${clientId} user info:`, { userName, userColor, rawState: state });

            // Only add cursor if we have a valid selection with anchor and focus
            if (cursorSelection && cursorSelection.anchor && cursorSelection.focus) {
              newCursors[`remote-${clientId}`] = {
                key: `remote-${clientId}`,
                selection: cursorSelection,
                data: {
                  style: { backgroundColor: userColor },
                  name: userName,
                },
              };

              // console.log(`🎯 Remote cursor for "${userName}":`, cursorSelection);
            } else {
              // console.log(`⚠️ Client ${clientId} has no valid selection yet`);
            }
          });

          const cursorCount = Object.keys(newCursors).length;
          if (cursorCount > 0) {
            // console.log(`📍 Found ${cursorCount} remote cursor(s)`);
          }
          setAwarenessCursors(newCursors);
        };

        // Listen for awareness changes
        awareness.on('change', updateCursors);
        awareness.on('update', updateCursors);

        // Initial update
        updateCursors();

        // Also poll periodically
        const interval = setInterval(updateCursors, 2000);

        cleanup = () => {
          awareness.off('change', updateCursors);
          awareness.off('update', updateCursors);
          clearInterval(interval);
        };
      } catch (error) {
        console.error('CursorOverlay: Error in setupAwareness:', error);
        retryCount += 1;
        if (retryCount < maxRetries) {
          setTimeout(setupAwareness, retryInterval);
        }
      }
    };

    // Start after a delay to ensure editor is ready
    const initTimer = setTimeout(setupAwareness, 1000);

    return () => {
      clearTimeout(initTimer);
      if (cleanup) cleanup();
    };
  }, [editor]);

  // Combine all cursor sources
  const combinedCursors = { ...cursors, ...dynamicCursors, ...awarenessCursors };

  // Filter out any cursors with invalid selections to prevent crashes
  const validCursors: typeof combinedCursors = {};
  Object.entries(combinedCursors).forEach(([key, cursor]) => {
    // A valid cursor must have a selection with anchor and focus that are valid objects
    const selection = cursor?.selection;
    if (selection
      && selection.anchor
      && selection.focus
      && typeof selection.anchor.path !== 'undefined'
      && typeof selection.anchor.offset !== 'undefined'
      && typeof selection.focus.path !== 'undefined'
      && typeof selection.focus.offset !== 'undefined') {
      validCursors[key] = cursor;
    }
  });

  return (
    <CursorOverlayPrimitive
      {...props}
      containerRef={containerRef}
      cursors={validCursors}
      onRenderCursor={CursorWithName as any}
    />
  );
}
