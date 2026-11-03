/* eslint-disable  @typescript-eslint/no-explicit-any */
/* eslint-disable  consistent-return */

'use client';

import React, { useEffect, useState } from 'react';

export interface CursorData {
    name: string;
    color: string;
}

interface CustomCursorOverlayProps {
    editor: any;
}

interface CursorState {
    clientId: number;
    data: CursorData;
}

export function CustomCursorOverlay({ editor }: CustomCursorOverlayProps) {
  const [cursors, setCursors] = useState<CursorState[]>([]);

  useEffect(() => {
    // console.log('CustomCursorOverlay mounted, editor:', editor);

    if (!editor) {
      // console.warn('No editor provided to CustomCursorOverlay');
      return;
    }

    // Try to get the Yjs provider
    let provider: any = null;

    try {
      const yjsPluginOptions = editor.getOptions?.({ key: 'yjs' });
      provider = yjsPluginOptions?.hocuspocusProvider;

      if (!provider) {
        // console.warn('Yjs provider not found in editor options');
        return;
      }

      // console.log('Yjs provider found:', provider);
    } catch (error) {
      console.error('Error accessing Yjs provider:', error);
      return;
    }

    const { awareness } = provider;
    if (!awareness) {
      // console.warn('Awareness not found on provider');
      return;
    }

    // console.log('Awareness available, local client ID:', awareness.clientID);

    const updateCursors = () => {
      const states = awareness.getStates();
      // console.log('Awareness states:', states);

      const remoteCursors: CursorState[] = [];

      states.forEach((state: any, clientId: number) => {
        // console.log(`Client ${clientId} state:`, state);

        // Skip our own cursor
        if (clientId === awareness.clientID) {
          // console.log('Skipping own cursor');
          return;
        }

        // The cursor data should be in state.user or state.cursor
        // Check both locations
        const cursorData = state.user || state.cursor?.data || state;

        // console.log(`Client ${clientId} cursor data:`, cursorData);

        if (cursorData && cursorData.name) {
          remoteCursors.push({
            clientId,
            data: {
              name: cursorData.name,
              color: cursorData.color || '#000000',
            },
          });
          // console.log(`Added cursor for client ${clientId}:`, cursorData.name);
        } else {
          // console.log(`No valid cursor data for client ${clientId}`);
        }
      });

      // console.log('Total remote cursors:', remoteCursors.length, remoteCursors);
      setCursors(remoteCursors);
    };

    // Listen for awareness changes
    awareness.on('change', updateCursors);

    // Initial update
    updateCursors();

    // Cleanup
    return () => {
      awareness.off('change', updateCursors);
    };
  }, [editor]);

  // console.log('Rendering cursors:', cursors);

  if (cursors.length === 0) {
    return null;
  }

  return (
    <div style={{
      position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 9999,
    }}
    >
      {cursors.map((cursor, index) => (
        <div
          key={cursor.clientId}
          style={{
            position: 'absolute',
            top: '100px',
            left: `${200 + index * 150}px`,
            zIndex: 1000,
            pointerEvents: 'none',
          }}
        >
          <div
            style={{
              background: cursor.data.color,
              color: 'white',
              padding: '4px 8px',
              borderRadius: '4px',
              fontSize: '12px',
              whiteSpace: 'nowrap',
              boxShadow: '0 2px 8px rgba(0,0,0,0.3)',
              fontWeight: 'bold',
            }}
          >
            {cursor.data.name}
          </div>
        </div>
      ))}
    </div>
  );
}
