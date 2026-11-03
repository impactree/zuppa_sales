/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */

'use client';

import React, { useEffect, useState } from 'react';
import { useEditorRef } from '@udecode/plate-common/react';
import { YjsPlugin } from '@udecode/plate-yjs/react';

interface CursorData {
  name: string;
  color: string;
}

interface RemoteCursor {
  clientId: number;
  data: CursorData;
  selection: any;
}

interface RemoteCursorsFloatingProps {
  containerRef: React.RefObject<HTMLElement>;
}

/**
 * RemoteCursorsFloating - Shows floating cursor indicators for remote collaborators
 *
 * Displays a compact, elegant indicator showing who is currently editing the document.
 */
export function RemoteCursorsFloating({ containerRef }: RemoteCursorsFloatingProps) {
  const editor = useEditorRef();
  const [remoteCursors, setRemoteCursors] = useState<RemoteCursor[]>([]);

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
          if (retryCount < maxRetries) {
            setTimeout(setupAwareness, 500);
          }
          return;
        }

        const { awareness } = provider;
        if (!awareness) {
          retryCount += 1;
          if (retryCount < maxRetries) {
            setTimeout(setupAwareness, 500);
          }
          return;
        }

        const updateCursors = () => {
          const states = awareness.getStates();
          const cursors: RemoteCursor[] = [];

          states.forEach((state: any, clientId: number) => {
            if (clientId === awareness.clientID) return;

            const userName = state.user?.name
              || state.cursor?.data?.name
              || state.name
              || 'Anonymous';
            const userColor = state.user?.color
              || state.cursor?.data?.color
              || state.color
              || '#3B82F6';

            const hasSelection = state.cursor?.selection || state.selection;

            if (hasSelection) {
              cursors.push({
                clientId,
                data: { name: userName, color: userColor },
                selection: hasSelection,
              });
            }
          });

          setRemoteCursors(cursors);
        };

        awareness.on('change', updateCursors);
        awareness.on('update', updateCursors);
        updateCursors();

        const interval = setInterval(updateCursors, 2000);

        cleanup = () => {
          awareness.off('change', updateCursors);
          awareness.off('update', updateCursors);
          clearInterval(interval);
        };
      } catch (error) {
        console.error('RemoteCursorsFloating error:', error);
        retryCount += 1;
        if (retryCount < maxRetries) {
          setTimeout(setupAwareness, 500);
        }
      }
    };

    const timer = setTimeout(setupAwareness, 1000);

    return () => {
      clearTimeout(timer);
      if (cleanup) cleanup();
    };
  }, [editor]);

  if (remoteCursors.length === 0) {
    return null;
  }

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
      }}
    >
      {/* Compact collaborators pill */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
          padding: '6px 14px',
          backgroundColor: 'white',
          borderRadius: '20px',
          boxShadow: '0 2px 12px rgba(0,0,0,0.12)',
          border: '1px solid #e5e7eb',
        }}
      >
        {/* Animated live dot */}
        <div
          style={{
            width: '8px',
            height: '8px',
            borderRadius: '50%',
            backgroundColor: '#22c55e',
            boxShadow: '0 0 0 2px rgba(34, 197, 94, 0.3)',
            animation: 'live-pulse 2s ease-in-out infinite',
          }}
        />

        {/* Stacked avatars for multiple users */}
        <div style={{ display: 'flex', marginLeft: '4px' }}>
          {remoteCursors.slice(0, 3).map((cursor, index) => (
            <div
              key={cursor.clientId}
              style={{
                width: '28px',
                height: '28px',
                borderRadius: '50%',
                backgroundColor: cursor.data.color,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                fontSize: '11px',
                fontWeight: 700,
                border: '2px solid white',
                marginLeft: index > 0 ? '-8px' : '0',
                zIndex: 10 - index,
                textTransform: 'uppercase',
                letterSpacing: '0.5px',
              }}
              title={cursor.data.name}
            >
              {cursor.data.name.charAt(0)}
            </div>
          ))}
          {remoteCursors.length > 3 && (
            <div
              style={{
                width: '28px',
                height: '28px',
                borderRadius: '50%',
                backgroundColor: '#6b7280',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                fontSize: '10px',
                fontWeight: 600,
                border: '2px solid white',
                marginLeft: '-8px',
              }}
            >
              +
              {remoteCursors.length - 3}
            </div>
          )}
        </div>

        {/* Name for single user, count for multiple */}
        <span
          style={{
            fontSize: '13px',
            fontWeight: 500,
            color: '#374151',
            marginLeft: '4px',
          }}
        >
          {remoteCursors.length === 1
            ? remoteCursors[0].data.name
            : `${remoteCursors.length} collaborators`}
        </span>

        {/* "editing" label */}
        <span
          style={{
            fontSize: '11px',
            fontWeight: 500,
            color: '#9ca3af',
            marginLeft: '2px',
          }}
        >
          editing
        </span>
      </div>

      <style>
        {`
                @keyframes live-pulse {
                    0%, 100% { 
                        box-shadow: 0 0 0 2px rgba(34, 197, 94, 0.3);
                    }
                    50% { 
                        box-shadow: 0 0 0 6px rgba(34, 197, 94, 0.1);
                    }
                }
            `}
      </style>
    </div>
  );
}
