/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable max-len */
/* eslint-disable consistent-return */

'use client';

import React, { useEffect, useState } from 'react';
import { YjsPlugin } from '@udecode/plate-yjs/react';

export interface CursorData {
  name: string;
  color: string;
}

interface ActiveCollaborator {
  clientId: number;
  data: CursorData;
}

interface RemoteCursorOverlayProps {
  editor: any;
  isSynced: boolean;
}

/**
 * RemoteCursorOverlay - Shows active collaborators as floating name badges
 *
 * This component displays the names and colors of other users who are currently
 * collaborating on the document. Since getting accurate cursor positions requires
 * deeper integration with slate-yjs, this shows collaborators as badges near the
 * editor header.
 */
export function RemoteCursorOverlay({ editor, isSynced }: RemoteCursorOverlayProps) {
  const [collaborators, setCollaborators] = useState<ActiveCollaborator[]>([]);

  useEffect(() => {
    if (!editor || !isSynced) {
      return;
    }

    // Try to get the Yjs provider from the editor
    let provider: any = null;

    try {
      const yjsPluginOptions = editor.getOptions(YjsPlugin);
      provider = yjsPluginOptions?.hocuspocusProvider;

      if (!provider) {
        // console.log('RemoteCursorOverlay: Yjs provider not found');
        return;
      }

      // console.log('RemoteCursorOverlay: Yjs provider found, setting up awareness listener');
    } catch (error) {
      console.error('RemoteCursorOverlay: Error accessing Yjs provider:', error);
      return;
    }

    const { awareness } = provider;
    if (!awareness) {
      // console.log('RemoteCursorOverlay: Awareness not found on provider');
      return;
    }

    const updateCollaborators = () => {
      const states = awareness.getStates();
      const remoteCollaborators: ActiveCollaborator[] = [];

      states.forEach((state: any, clientId: number) => {
        // Skip our own cursor
        if (clientId === awareness.clientID) {
          return;
        }

        // The cursor data can be in state.user, state.cursor?.data, or directly on state
        const cursorData = state.user || state.cursor?.data || state;

        if (cursorData && cursorData.name) {
          remoteCollaborators.push({
            clientId,
            data: {
              name: cursorData.name,
              color: cursorData.color || '#3B82F6',
            },
          });
        }
      });

      // console.log(`RemoteCursorOverlay: Found ${remoteCollaborators.length} remote collaborators`);
      setCollaborators(remoteCollaborators);
    };

    // Listen for awareness changes
    awareness.on('change', updateCollaborators);

    // Initial update
    updateCollaborators();

    // Also update on a timer to catch any missed updates
    const interval = setInterval(updateCollaborators, 2000);

    // Cleanup
    return () => {
      awareness.off('change', updateCollaborators);
      clearInterval(interval);
    };
  }, [editor, isSynced]);

  if (!isSynced || collaborators.length === 0) {
    return null;
  }

  return (
    <div
      style={{
        position: 'absolute',
        top: '10px',
        right: '10px',
        zIndex: 100,
        display: 'flex',
        gap: '8px',
        flexWrap: 'wrap',
      }}
    >
      {collaborators.map((collaborator) => (
        <div
          key={collaborator.clientId}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            padding: '4px 10px',
            background: `${collaborator.data.color}15`,
            border: `1.5px solid ${collaborator.data.color}`,
            borderRadius: '16px',
            fontSize: '12px',
            fontWeight: 500,
            color: collaborator.data.color,
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
          }}
        >
          <div
            style={{
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              background: collaborator.data.color,
              animation: 'pulse 2s ease-in-out infinite',
            }}
          />
          <span>{collaborator.data.name}</span>
          <style>
            {`
            @keyframes pulse {
              0%, 100% { opacity: 1; }
              50% { opacity: 0.5; }
            }
          `}
          </style>
        </div>
      ))}
    </div>
  );
}
