/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
/* eslint-disable no-shadow */
/* eslint-disable max-len */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable radix */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable consistent-return */

'use client';

import React, {
  useEffect, useMemo, useRef, useState,
} from 'react';
import { cn, withProps } from '@udecode/cn';
import { AlignPlugin } from '@udecode/plate-alignment/react';
import { AutoformatPlugin } from '@udecode/plate-autoformat/react';
import {
  BoldPlugin,
  CodePlugin,
  ItalicPlugin,
  StrikethroughPlugin,
  SubscriptPlugin,
  SuperscriptPlugin,
  UnderlinePlugin,
} from '@udecode/plate-basic-marks/react';
import { BlockquotePlugin } from '@udecode/plate-block-quote/react';
import { ExitBreakPlugin, SoftBreakPlugin } from '@udecode/plate-break/react';
import { CaptionPlugin } from '@udecode/plate-caption/react';
import {
  isCodeBlockEmpty,
  isSelectionAtCodeBlockStart,
  unwrapCodeBlock,
} from '@udecode/plate-code-block';
import {
  CodeBlockPlugin,
  CodeLinePlugin,
  CodeSyntaxPlugin,
} from '@udecode/plate-code-block/react';
import { CommentsPlugin } from '@udecode/plate-comments/react';
import {
  HtmlPlugin,
  isBlockAboveEmpty,
  isSelectionAtBlockStart,
  someNode,
} from '@udecode/plate-common';
import {
  createPlateEditor,
  ParagraphPlugin,
  Plate,
  PlateLeaf,
} from '@udecode/plate-common/react';
import { DndPlugin } from '@udecode/plate-dnd';
import { DocxPlugin } from '@udecode/plate-docx';
import { EmojiPlugin } from '@udecode/plate-emoji/react';
import { ExcalidrawPlugin } from '@udecode/plate-excalidraw/react';
import {
  FontBackgroundColorPlugin,
  FontColorPlugin,
  FontSizePlugin,
} from '@udecode/plate-font/react';
import { HEADING_KEYS, HEADING_LEVELS } from '@udecode/plate-heading';
import { HeadingPlugin } from '@udecode/plate-heading/react';
import { HighlightPlugin } from '@udecode/plate-highlight/react';
import { HorizontalRulePlugin } from '@udecode/plate-horizontal-rule/react';
import { IndentListPlugin } from '@udecode/plate-indent-list/react';
import { IndentPlugin } from '@udecode/plate-indent/react';
import { JuicePlugin } from '@udecode/plate-juice';
import { KbdPlugin } from '@udecode/plate-kbd/react';
import { LineHeightPlugin } from '@udecode/plate-line-height/react';
import { LinkPlugin } from '@udecode/plate-link/react';
import { TodoListPlugin } from '@udecode/plate-list/react';
import { MarkdownPlugin } from '@udecode/plate-markdown';
import { ImagePlugin, MediaEmbedPlugin } from '@udecode/plate-media/react';
import {
  MentionInputPlugin,
  MentionPlugin,
} from '@udecode/plate-mention/react';
import { NodeIdPlugin } from '@udecode/plate-node-id';
import { ResetNodePlugin } from '@udecode/plate-reset-node/react';
import { SelectOnBackspacePlugin } from '@udecode/plate-select';
// import { BlockSelectionPlugin } from '@udecode/plate-selection/react';
import { TabbablePlugin } from '@udecode/plate-tabbable/react';
import {
  TableCellHeaderPlugin,
  TableCellPlugin,
  TablePlugin,
  TableRowPlugin,
} from '@udecode/plate-table/react';
import { TrailingBlockPlugin } from '@udecode/plate-trailing-block';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

import { autoformatRules } from '@/lib/interface/plate/autoformat-rules';
import { BlockquoteElement } from '@/components/plate-ui/blockquote-element';
import { CodeBlockElement } from '@/components/plate-ui/code-block-element';
import { CodeLeaf } from '@/components/plate-ui/code-leaf';
import { CodeLineElement } from '@/components/plate-ui/code-line-element';
import { CodeSyntaxLeaf } from '@/components/plate-ui/code-syntax-leaf';
import { CommentLeaf } from '@/components/plate-ui/comment-leaf';
import { CommentsPopover } from '@/components/plate-ui/comments-popover';
import {
  CursorOverlay,
  DragOverCursorPlugin,
} from '@/components/plate-ui/cursor-overlay';
import { Editor } from '@/components/plate-ui/editor';
import { ExcalidrawElement } from '@/components/plate-ui/excalidraw-element';
import { FixedToolbar } from '@/components/plate-ui/fixed-toolbar';
import { FixedToolbarButtons } from '@/components/plate-ui/fixed-toolbar-buttons';
import { FloatingToolbar } from '@/components/plate-ui/floating-toolbar';
import { FloatingToolbarButtons } from '@/components/plate-ui/floating-toolbar-buttons';
import { HeadingElement } from '@/components/plate-ui/heading-element';
import { HighlightLeaf } from '@/components/plate-ui/highlight-leaf';
import { HrElement } from '@/components/plate-ui/hr-element';
import { ImageElement } from '@/components/plate-ui/image-element';
import {
  TodoLi,
  TodoMarker,
} from '@/components/plate-ui/indent-todo-marker-component';
import { KbdLeaf } from '@/components/plate-ui/kbd-leaf';
import { LinkElement } from '@/components/plate-ui/link-element';
import { LinkFloatingToolbar } from '@/components/plate-ui/link-floating-toolbar';
import { MediaEmbedElement } from '@/components/plate-ui/media-embed-element';
import { MentionElement } from '@/components/plate-ui/mention-element';
import { MentionInputElement } from '@/components/plate-ui/mention-input-element';
import { ParagraphElement } from '@/components/plate-ui/paragraph-element';
import { withPlaceholders } from '@/components/plate-ui/placeholder';
import {
  TableCellElement,
  TableCellHeaderElement,
} from '@/components/plate-ui/table-cell-element';
import { TableElement } from '@/components/plate-ui/table-element';
import { TableRowElement } from '@/components/plate-ui/table-row-element';
import { TodoListElement } from '@/components/plate-ui/todo-list-element';
import { withDraggables } from '@/components/plate-ui/with-draggables';
import { TooltipProvider } from '@/components/plate-ui/tooltip';
import { YjsPlugin } from '@udecode/plate-yjs/react';
// import { withYjs, withCursors, YjsEditor } from '@slate-yjs/core';
// import { HocuspocusProvider } from '@hocuspocus/provider';
// import { HocuspocusProvider } from '@hocuspocus/react';
import * as Y from 'yjs';
import { saveAs } from 'file-saver';
import {
  Document,
  Packer,
  Paragraph,
  Table,
  TableCell,
  TableRow,
  TextRun,
} from 'docx';
// import axios from 'axios';
// import { todo } from 'node:test';
// import { plugins } from 'prismjs';
// import { render } from 'react-dom';

// import {
//   Button, Modal, Form, Toast, ToastContainer,
// } from 'react-bootstrap';
import mammoth from 'mammoth';
import { Download } from 'lucide-react';
import { TextCapture } from '@/components/plate-ui/text-select';
import { UserService } from '@/lib/service';
import { IUser } from '@/lib/interface/IUser.interface';
import { generateBrsrTemplateBlob } from './brsr-template';
// import { ActiveUsersIndicator } from '../plate-ui/active-users-indicator';
import PageHeaderWrapper from '../PageHeaderWrapper/PageHeaderWrapper';
import { RemoteCursorsFloating } from '../plate-ui/remote-cursors-floating';
import { RemoteCursorsWithPositions } from '../plate-ui/remote-cursors-with-positions';
// import { RemoteCursorOverlay } from '../plate-ui/remote-cursor-overlay';
// import { fontSans } from '@/interfaces/fonts';
// import { HOSTNAME } from './generalConfig';

// Sample BRSR data structure
const brsrData = [
  {
    category: 'SECTION A: GENERAL DISCLOSURES',
    sections: [
      {
        title: 'I. DETAILS OF THE LISTED ENTITY',
        questions: [
          {
            id: '1',
            text: 'Corporate Identity Number (CIN) of the Listed Entity',
          },
          { id: '2', text: 'Name of the Listed Entity' },
          { id: '3', text: 'Year of incorporation' },
          { id: '4', text: 'Registered office address' },
          { id: '5', text: 'Corporate address' },
        ],
      },
      {
        title: 'II. PRODUCTS/SERVICES',
        questions: [
          { id: '6', text: 'Details of business activities' },
          { id: '7', text: 'Products/Services sold by the entity' },
        ],
      },
    ],
  },
  {
    category: 'SECTION B: MANAGEMENT AND PROCESS DISCLOSURES',
    sections: [
      {
        title:
          'This section is aimed at helping businesses demonstrate the structures, policies and processes put in place towards adopting the NGRBC Principles and Core Elements.',
        questions: [
          { id: 'P1', text: 'Policy and management processes' },
          { id: 'P2', text: 'Governance, leadership and oversight' },
        ],
      },
    ],
  },
  {
    category: 'SECTION C: PRINCIPLE WISE PERFORMANCE DISCLOSURE',
    sections: [
      {
        title:
          'PRINCIPLE 1: Businesses should conduct and govern themselves with integrity, and in a manner that is Ethical, Transparent and Accountable',
        questions: [
          {
            id: '1',
            text: 'Percentage coverage by training and awareness programmes on any of the Principles during the financial year',
          },
          {
            id: '2',
            text: 'Details of fines/penalties/punishment/award/compounding fees/settlement amount paid in proceedings',
          },
        ],
      },
    ],
  },
];

export const useMyEditor = (contentValue, userName = 'Anonymous') => {
  function randomColor() {
    const getRgb = () => Math.floor(Math.random() * 256);
    const rgbToHex = (r: any, g: any, b: any) => `#${[r, g, b]
      .map((x: any) => {
        const hex = x.toString(16);
        return hex.length === 1 ? `0${hex}` : hex;
      })
      .join('')}`;

    const handleGenerate = () => {
      const color = {
        r: getRgb(),
        g: getRgb(),
        b: getRgb(),
      };
      return rgbToHex(color.r, color.g, color.b);
    };
    return handleGenerate();
  }

  const editor = createPlateEditor({
    value: contentValue || [],
    skipInitialization: true,
    plugins: [
      // Nodes
      HeadingPlugin,
      BlockquotePlugin,
      CodeBlockPlugin,
      CodeLinePlugin,
      CodeSyntaxPlugin,
      HorizontalRulePlugin,
      LinkPlugin.configure({
        render: { afterEditable: () => <LinkFloatingToolbar /> },
      }),
      ImagePlugin,
      MediaEmbedPlugin,
      CaptionPlugin.configure({
        options: { plugins: [ImagePlugin, MediaEmbedPlugin] },
      }),
      MentionPlugin,
      MentionInputPlugin,
      TablePlugin,
      TableRowPlugin,
      TableCellPlugin,
      TableCellHeaderPlugin,
      TodoListPlugin,
      ExcalidrawPlugin,

      // Marks
      BoldPlugin,
      ItalicPlugin,
      UnderlinePlugin,
      StrikethroughPlugin,
      CodePlugin,
      SubscriptPlugin,
      SuperscriptPlugin,
      FontColorPlugin,
      FontBackgroundColorPlugin,
      FontSizePlugin,
      HighlightPlugin,
      KbdPlugin,
      HtmlPlugin,
      // Block Style
      AlignPlugin.configure({
        inject: {
          targetPlugins: [ParagraphPlugin.key, ...HEADING_LEVELS],
        },
      }),
      IndentPlugin.configure({
        inject: {
          targetPlugins: [
            ParagraphPlugin.key,
            BlockquotePlugin.key,
            CodeBlockPlugin.key,
            ...HEADING_LEVELS,
          ],
        },
      }),
      IndentListPlugin.configure({
        inject: {
          targetPlugins: [
            ParagraphPlugin.key,
            BlockquotePlugin.key,
            CodeBlockPlugin.key,
            ...HEADING_LEVELS,
          ],
        },
        options: {
          listStyleTypes: {
            todo: {
              liComponent: TodoLi,
              markerComponent: TodoMarker,
              type: 'todo',
            },
          },
        },
      }),
      LineHeightPlugin.configure({
        inject: {
          nodeProps: {
            defaultNodeValue: 1.5,
            validNodeValues: [1, 1.2, 1.5, 2, 3],
          },
          targetPlugins: [ParagraphPlugin.key, ...HEADING_LEVELS],
        },
      }),

      // Functionality
      AutoformatPlugin.configure({
        options: {
          rules: autoformatRules,
          enableUndoOnDelete: true,
        },
      }),
      DndPlugin.configure({
        options: { enableScroller: true },
      }),
      EmojiPlugin,
      ExitBreakPlugin.configure({
        options: {
          rules: [
            {
              hotkey: 'mod+enter',
            },
            {
              hotkey: 'mod+shift+enter',
              before: true,
            },
            {
              hotkey: 'enter',
              query: {
                start: true,
                end: true,
                allow: HEADING_LEVELS,
              },
              relative: true,
              level: 1,
            },
          ],
        },
      }),
      NodeIdPlugin,
      ResetNodePlugin.configure({
        options: {
          rules: [
            {
              types: [BlockquotePlugin.key, TodoListPlugin.key],
              defaultType: ParagraphPlugin.key,
              hotkey: 'Enter',
              predicate: isBlockAboveEmpty,
            },
            {
              types: [BlockquotePlugin.key, TodoListPlugin.key],
              defaultType: ParagraphPlugin.key,
              hotkey: 'Backspace',
              predicate: isSelectionAtBlockStart,
            },
            {
              types: [CodeBlockPlugin.key],
              defaultType: ParagraphPlugin.key,
              onReset: unwrapCodeBlock,
              hotkey: 'Enter',
              predicate: isCodeBlockEmpty,
            },
            {
              types: [CodeBlockPlugin.key],
              defaultType: ParagraphPlugin.key,
              onReset: unwrapCodeBlock,
              hotkey: 'Backspace',
              predicate: isSelectionAtCodeBlockStart,
            },
          ],
        },
      }),
      SelectOnBackspacePlugin.configure({
        options: {
          query: {
            allow: [ImagePlugin.key, HorizontalRulePlugin.key],
          },
        },
      }),
      SoftBreakPlugin.configure({
        options: {
          rules: [
            { hotkey: 'shift+enter' },
            {
              hotkey: 'enter',
              query: {
                allow: [
                  CodeBlockPlugin.key,
                  BlockquotePlugin.key,
                  TableCellPlugin.key,
                  TableCellHeaderPlugin.key,
                ],
              },
            },
          ],
        },
      }),
      TabbablePlugin.configure(({ editor }) => ({
        options: {
          query: () => {
            if (isSelectionAtBlockStart(editor)) return false;

            return !someNode(editor, {
              match: (n) => !!(
                n.type
                && ([
                  TablePlugin.key,
                  TodoListPlugin.key,
                  CodeBlockPlugin.key,
                ].includes(n.type as string)
                  || n.listStyleType)
              ),
            });
          },
        },
      })),
      TrailingBlockPlugin.configure({
        options: { type: ParagraphPlugin.key },
      }),
      DragOverCursorPlugin,

      // Collaboration
      CommentsPlugin.configure({
        options: {
          users: {
            1: {
              id: '1',
              name: '',
              avatarUrl: '',
            },
          },
          myUserId: '1',
        },
      }),

      // Deserialization
      DocxPlugin,
      MarkdownPlugin,
      JuicePlugin,
      // collaboration
      YjsPlugin.configure({
        options: {
          cursors: {
            autoSend: true,
            data: {
              name: userName || 'Anonymous',
              color: randomColor(),
            },
          },
          disableCursors: false,
          hocuspocusProviderOptions: {
            url: 'ws://13.235.31.115:1234', // Double check this URL
            name: 'test',
          },
        },
      }),
    ],
    override: {
      components: withDraggables(
        withPlaceholders({
          [BlockquotePlugin.key]: BlockquoteElement,
          [CodeBlockPlugin.key]: CodeBlockElement,
          [CodeLinePlugin.key]: CodeLineElement,
          [CodeSyntaxPlugin.key]: CodeSyntaxLeaf,
          [HorizontalRulePlugin.key]: HrElement,
          [HEADING_KEYS.h1]: withProps(HeadingElement, { variant: 'h1' }),
          [HEADING_KEYS.h2]: withProps(HeadingElement, { variant: 'h2' }),
          [HEADING_KEYS.h3]: withProps(HeadingElement, { variant: 'h3' }),
          [HEADING_KEYS.h4]: withProps(HeadingElement, { variant: 'h4' }),
          [HEADING_KEYS.h5]: withProps(HeadingElement, { variant: 'h5' }),
          [HEADING_KEYS.h6]: withProps(HeadingElement, { variant: 'h6' }),
          [ImagePlugin.key]: ImageElement,
          [LinkPlugin.key]: LinkElement,
          [MediaEmbedPlugin.key]: MediaEmbedElement,
          [MentionPlugin.key]: MentionElement,
          [MentionInputPlugin.key]: MentionInputElement,
          [ParagraphPlugin.key]: ParagraphElement,
          [TablePlugin.key]: TableElement,
          [TableRowPlugin.key]: TableRowElement,
          [TableCellPlugin.key]: TableCellElement,
          [TableCellHeaderPlugin.key]: TableCellHeaderElement,
          [TodoListPlugin.key]: TodoListElement,
          [ExcalidrawPlugin.key]: ExcalidrawElement,
          [BoldPlugin.key]: withProps(PlateLeaf, { as: 'strong' }),
          [CodePlugin.key]: CodeLeaf,
          [HighlightPlugin.key]: HighlightLeaf,
          [ItalicPlugin.key]: withProps(PlateLeaf, { as: 'em' }),
          [KbdPlugin.key]: KbdLeaf,
          [StrikethroughPlugin.key]: withProps(PlateLeaf, { as: 's' }),
          [SubscriptPlugin.key]: withProps(PlateLeaf, { as: 'sub' }),
          [SuperscriptPlugin.key]: withProps(PlateLeaf, { as: 'sup' }),
          [UnderlinePlugin.key]: withProps(PlateLeaf, { as: 'u' }),
          [CommentsPlugin.key]: CommentLeaf,
        }),
      ),
    },
    // value:
    //  [
    //   {
    //     id: '1',
    //     type: ParagraphPlugin.key,
    //     children: [{ text: 'Hello, World!' }],
    //   },
    // ],
  });

  // console.log("Editor Initialized with content:", contentValue);

  return editor;
};

export default function PlateEditor({
  token,
  apiKey,
  documentId,
}: {
  token: string;
  apiKey: string;
  documentId: string;
}) {
  const containerRef = useRef(null);
  const [editorValue, setEditorValue] = useState([]);
  const [userName, setUserName] = useState('Anonymous');
  const [userId, setUserId] = useState('');
  // Memoize editor to prevent new instance on every render
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const editor = useMemo(() => useMyEditor(editorValue, userName), [userName]);
  const [showModal, setShowModal] = useState(false);
  const [collabRole, setCollabRole] = useState('');
  const [toast, setToast] = useState({ show: false, message: '', bg: 'info' });
  const [isSynced, setIsSynced] = useState(false); // Track sync status
  const [isContentLoaded, setIsContentLoaded] = useState(false);

  const showToast = (message, bg = 'info') => {
    setToast({ show: true, message, bg });
    setTimeout(() => setToast({ show: false, message: '', bg: 'info' }), 3000);
  };

  const handleModalClose = () => setShowModal(false);
  const handleModalShow = () => setShowModal(true);
  const handleModalOk = () => {
    setShowModal(false);
    showToast('Collaborator added successfully!', 'success');
  };

  // // Function to fetch document from URL
  // const fetchDocumentFromUrl = async (url: string) => {
  //   try {
  //     const response = await fetch(url, {
  //       method: 'GET',
  //       headers: {
  //         'Authorization': `Bearer ${token}`,
  //         // Add any other headers if needed
  //       },
  //     });

  //     if (!response.ok) {
  //       throw new Error(`Failed to fetch document: ${response.status} ${response.statusText}`);
  //     }

  //     const blob = await response.blob();
  //     throw error;
  //   }
  // };

  // Fetch user information on component mount
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userResponse = await UserService.getCurrentUser(apiKey, token);
        const { user, success } = userResponse?.data as {
          user: IUser;
          success: boolean;
        };

        if (success && user?.name) {
          setUserName(user.name);
          setUserId(user.id); // Set user ID for active users indicator

          // Set awareness state for collaborative cursors after delays
          // Use multiple attempts to ensure provider is ready
          const userColor = randomColor();

          const trySetAwareness = (attempt: number = 1) => {
            try {
              const yjsPluginOptions = editor.getOptions(YjsPlugin);
              // Provider can be at either 'provider' or 'hocuspocusProvider' depending on version
              const provider = yjsPluginOptions?.provider || yjsPluginOptions?.hocuspocusProvider;

              // console.log(`[Attempt ${attempt}] Setting awareness for user: ${user.name}`);

              if (provider && provider.awareness) {
                const { awareness } = provider;
                const localState = awareness.getLocalState() || {};

                // Set user data in awareness so other clients can see it
                // Set in multiple formats for maximum compatibility

                // Format 1: user field (preferred)
                awareness.setLocalStateField('user', {
                  name: user.name,
                  color: userColor,
                });

                // Format 2: Direct name/color fields
                awareness.setLocalStateField('name', user.name);
                awareness.setLocalStateField('color', userColor);

                // Format 3: Update cursor.data if it exists (for YjsPlugin compatibility)
                if (localState.cursor) {
                  awareness.setLocalStateField('cursor', {
                    ...localState.cursor,
                    data: {
                      ...localState.cursor?.data,
                      name: user.name,
                      color: userColor,
                    },
                  });
                }

                // console.log('✅ Successfully set awareness state:', {
                //   name: user.name,
                //   color: userColor,
                //   clientId: awareness.clientID,
                // });

                // Log all current states for debugging
                const allStates = awareness.getStates();
                // console.log('📊 All awareness states:', Array.from(allStates.entries()));
                // console.log('📊 Number of connected clients:', allStates.size);

                return true;
              }
              // console.warn(`⚠️ [Attempt ${attempt}] Provider or awareness not available yet`);
              return false;
            } catch (error) {
              console.error(`❌ [Attempt ${attempt}] Failed to set awareness:`, error);
              return false;
            }
          };

          // Try immediately
          if (!trySetAwareness(1)) {
            // Try after 1.5 seconds
            setTimeout(() => {
              if (!trySetAwareness(2)) {
                // Final try after 3 seconds
                setTimeout(() => trySetAwareness(3), 3000);
              }
            }, 1500);
          }
        }
      } catch (error) {
        console.error('Failed to fetch user data:', error);
        // Keep default 'Anonymous' if fetch fails
      }
    };

    fetchUserData();
  }, [apiKey, token, editor]);

  // Periodically update awareness with user name to ensure it's propagated correctly
  // This runs independently and keeps the awareness synced with the current user name
  useEffect(() => {
    if (!editor || userName === 'Anonymous') {
      return;
    }

    // Generate a consistent color for this session (inline function)
    const generateColor = () => {
      const getRgb = () => Math.floor(Math.random() * 256);
      const r = getRgb(); const g = getRgb(); const
        b = getRgb();
      return `#${[r, g, b].map((x) => x.toString(16).padStart(2, '0')).join('')}`;
    };
    const userColor = generateColor();

    const updateAwareness = () => {
      try {
        const yjsPluginOptions = editor.getOptions(YjsPlugin);
        const provider = yjsPluginOptions?.provider || yjsPluginOptions?.hocuspocusProvider;

        if (provider && provider.awareness) {
          const { awareness } = provider;
          const localState = awareness.getLocalState() || {};

          // Update the user field with current user name
          awareness.setLocalStateField('user', {
            name: userName,
            color: userColor,
          });

          // Also set direct fields for compatibility
          awareness.setLocalStateField('name', userName);
          awareness.setLocalStateField('color', userColor);

          // Update cursor.data if cursor exists
          if (localState.cursor) {
            awareness.setLocalStateField('cursor', {
              ...localState.cursor,
              data: {
                ...localState.cursor?.data,
                name: userName,
                color: userColor,
              },
            });
          }

          // console.log('🔄 Periodic awareness update:', { name: userName, color: userColor });
        }
      } catch (error) {
        console.error('Periodic awareness update failed:', error);
      }
    };

    // Update immediately and then every 3 seconds
    updateAwareness();
    const interval = setInterval(updateAwareness, 3000);

    return () => clearInterval(interval);
  }, [editor, userName]);

  // MANUAL SELECTION SYNC: Broadcast editor selection to Yjs awareness
  // Since YjsPlugin's autoSend doesn't seem to be transmitting cursor positions,
  // we manually sync the selection whenever it changes
  useEffect(() => {
    if (!editor) return;

    let lastSelectionStr = '';

    const syncSelectionToAwareness = () => {
      try {
        const yjsPluginOptions = editor.getOptions(YjsPlugin);
        const provider = yjsPluginOptions?.provider || yjsPluginOptions?.hocuspocusProvider;

        if (!provider?.awareness) return;

        const { awareness } = provider;
        const { selection } = editor;

        // Only update if selection has changed
        const selectionStr = JSON.stringify(selection);
        if (selectionStr === lastSelectionStr) return;
        lastSelectionStr = selectionStr;

        if (selection) {
          // Set cursor selection in awareness for other clients to see
          awareness.setLocalStateField('cursor', {
            selection,
            data: {
              name: userName,
              color: awareness.getLocalState()?.user?.color || '#3B82F6',
            },
          });

          // Also set selection directly for compatibility
          awareness.setLocalStateField('selection', selection);

          // console.log('📤 Synced selection to awareness:', selection);
        }
      } catch (error) {
        console.error('Failed to sync selection:', error);
      }
    };

    // Subscribe to editor changes using an interval (since direct selection subscription is complex)
    const interval = setInterval(syncSelectionToAwareness, 200);

    // Initial sync
    setTimeout(syncSelectionToAwareness, 1000);

    return () => clearInterval(interval);
  }, [editor, userName]);

  // Track Yjs provider sync status for remote cursors
  // Since text sync is working, we'll enable cursors after a short delay
  // The useRemoteCursorOverlayPositions hook handles the actual cursor data
  useEffect(() => {
    if (!editor) {
      return;
    }

    // Enable cursor overlay after plugin initialization
    const timer = setTimeout(() => {
      // console.log('Enabling remote cursor overlay');
      setIsSynced(true);
    }, 2000); // Give the plugin time to fully initialize

    return () => clearTimeout(timer);
  }, [editor]);

  useEffect(() => {
    // Only run once when editor is ready and content hasn't been loaded
    if (!editor || !editor.tf || isContentLoaded) {
      return;
    }

    const loadInitialContent = async () => {
      showToast('Loading document... Please wait.', 'info');

      try {
        // 1️⃣ PRIORITY: Check for HTML from "Generate Report and Open Editor"
        const htmlContent = localStorage.getItem('reportHtml');
        const loadFromDocx = localStorage.getItem('loadFromDocx');

        if (loadFromDocx === 'true' && htmlContent) {
          // Wait a tick to ensure editor is ready
          const sleep = (ms: number) => new Promise<void>((resolve) => {
            setTimeout(() => resolve(), ms);
          });

          if (editor.api?.html?.deserialize) {
            try {
              const deserializedContent = editor.api.html.deserialize(htmlContent);

              if (deserializedContent && deserializedContent.length > 0) {
                editor.tf.setValue(deserializedContent);

                // IMPORTANT: Only clear flags AFTER successful load
                localStorage.removeItem('reportHtml');
                localStorage.removeItem('loadFromDocx');

                setIsContentLoaded(true);
                showToast('Report loaded successfully!', 'success');
                return;
              }
            } catch (deserializeError) {
              console.error('Error during HTML deserialization:', deserializeError);
            }
          }

          // Fallback parser for HTML
          const parser = new DOMParser();
          const doc = parser.parseFromString(htmlContent, 'text/html');
          const { body } = doc;

          const nodes: any[] = [];

          const parseNode = (node: Node): any => {
            if (node.nodeType === Node.TEXT_NODE) {
              const text = node.textContent?.trim();
              if (text) return { text };
              return null;
            }

            if (node.nodeType === Node.ELEMENT_NODE) {
              const element = node as HTMLElement;
              const children: any[] = [];

              element.childNodes.forEach((child) => {
                const parsed = parseNode(child);
                if (parsed) {
                  if (Array.isArray(parsed)) {
                    children.push(...parsed);
                  } else {
                    children.push(parsed);
                  }
                }
              });

              if (children.length === 0 && !['TABLE', 'TR', 'TD', 'TH', 'TBODY', 'THEAD'].includes(element.tagName)) {
                children.push({ text: '' });
              }

              switch (element.tagName) {
                case 'P':
                  return { type: 'p', children: children.length > 0 ? children : [{ text: '' }] };
                case 'H1':
                  return { type: 'h1', children: children.length > 0 ? children : [{ text: '' }] };
                case 'H2':
                  return { type: 'h2', children: children.length > 0 ? children : [{ text: '' }] };
                case 'H3':
                  return { type: 'h3', children: children.length > 0 ? children : [{ text: '' }] };
                case 'STRONG':
                case 'B':
                  return children.map((child) => ({ ...child, bold: true }));
                case 'EM':
                case 'I':
                  return children.map((child) => ({ ...child, italic: true }));
                case 'U':
                  return children.map((child) => ({ ...child, underline: true }));
                case 'BR':
                  return { type: 'p', children: [{ text: '' }] };
                case 'TABLE':
                  return {
                    type: 'table',
                    children: children.filter((c) => c && (c.type === 'tr' || c.type === 'tbody' || c.type === 'thead')),
                  };
                case 'THEAD':
                case 'TBODY':
                  return children.filter((c) => c && c.type === 'tr');
                case 'TR':
                  return {
                    type: 'tr',
                    children: children.filter((c) => c && (c.type === 'td' || c.type === 'th')),
                  };
                case 'TD': {
                  const tdAttrs: any = {};
                  if (element.hasAttribute('colspan')) {
                    tdAttrs.colSpan = parseInt(element.getAttribute('colspan') || '1');
                  }
                  if (element.hasAttribute('rowspan')) {
                    tdAttrs.rowSpan = parseInt(element.getAttribute('rowspan') || '1');
                  }
                  return {
                    type: 'td',
                    ...tdAttrs,
                    children: children.length > 0 ? children : [{ type: 'p', children: [{ text: '' }] }],
                  };
                }
                case 'TH': {
                  const thAttrs: any = {};
                  if (element.hasAttribute('colspan')) {
                    thAttrs.colSpan = parseInt(element.getAttribute('colspan') || '1');
                  }
                  if (element.hasAttribute('rowspan')) {
                    thAttrs.rowSpan = parseInt(element.getAttribute('rowspan') || '1');
                  }
                  return {
                    type: 'th',
                    ...thAttrs,
                    children: children.length > 0 ? children : [{ type: 'p', children: [{ text: '' }] }],
                  };
                }
                default:
                  return children;
              }
            }
            return null;
          };

          body.childNodes.forEach((node) => {
            const parsed = parseNode(node);
            if (parsed) {
              if (Array.isArray(parsed)) {
                nodes.push(...parsed);
              } else {
                nodes.push(parsed);
              }
            }
          });

          if (nodes.length > 0) {
            editor.tf.setValue(nodes);

            // Clear flags only after successful load
            localStorage.removeItem('reportHtml');
            localStorage.removeItem('loadFromDocx');

            setIsContentLoaded(true);
            showToast('Report loaded successfully!', 'success');
            return;
          }
        }

        // 2️⃣ Check for saved editor content
        const savedContent = localStorage.getItem('editorContent');
        if (savedContent) {
          try {
            const parsedContent = JSON.parse(savedContent);
            if (parsedContent && parsedContent.length > 0) {
              editor.tf.setValue(parsedContent);
              setIsContentLoaded(true);
              showToast('Loaded saved progress!', 'success');
              return;
            }
          } catch (parseError) {
            console.error('Failed to parse saved content:', parseError);
          }
        }

        // 3️⃣ Fallback to BRSR template

        showToast('Loading BRSR template...', 'info');

        const blob = await generateBrsrTemplateBlob(brsrData);
        const arrayBuffer = await blob.arrayBuffer();

        // Try mammoth first (more reliable than docx deserializer)
        const result = await mammoth.convertToHtml({ arrayBuffer });

        if (result.value) {
          if (editor.api?.html?.deserialize) {
            try {
              const deserializedContent = editor.api.html.deserialize(result.value);
              if (deserializedContent && deserializedContent.length > 0) {
                editor.tf.setValue(deserializedContent);
                setIsContentLoaded(true);
                showToast('BRSR template loaded successfully!', 'success');
                return;
              }
            } catch (deserializeError) {
              console.error('HTML deserialize failed, trying direct HTML:', deserializeError);
            }
          }

          // If HTML deserialize fails, set the HTML directly
          editor.tf.setValue(result.value);
          setIsContentLoaded(true);
          showToast('BRSR template loaded successfully!', 'success');
          return;
        }

        // Last resort - try docx deserializer
        if (editor.api?.docx?.deserialize) {
          const plateContent = await editor.api.docx.deserialize(arrayBuffer);
          if (plateContent && plateContent.length > 0) {
            editor.tf.setValue(plateContent);
            setIsContentLoaded(true);
            showToast('BRSR template loaded successfully!', 'success');
            return;
          }
        }

        // If everything fails
        throw new Error('All content loading methods failed');
      } catch (error) {
        console.error('Failed to load document content:', error);
        showToast('Failed to load document.', 'danger');

        // Set a minimal default content
        editor.tf.setValue([
          {
            type: 'p',
            children: [{ text: 'Editor ready. Start typing or paste your content here.' }],
          },
        ]);
        setIsContentLoaded(true);
      }
    };

    loadInitialContent();
  }, [editor, isContentLoaded]);

  // save progress
  const saveContentToLocalStorage = async () => {
    if (!editor) {
      showToast('Editor not ready to save content.', 'danger');
      return;
    }
    try {
      const content = editor.children;
      localStorage.setItem('editorContent', JSON.stringify(content));
      showToast('Progress saved successfully!', 'success');
      // console.log('Content saved to localStorage:', content);
    } catch (error) {
      // console.error('Failed to save content to localStorage:', error);
      showToast('Failed to save progress.', 'danger');
    }
  };

  // download docx
  const saveDocx = async () => {
    try {
      const doc = new Document({ sections: [] });
      const content = editor.children;

      const sections = content
        .map((node) => {
          if (node.type === 'p') {
            return new Paragraph({
              children: node.children.map(
                (child) => new TextRun({
                  text: child.text || '',
                  bold: child.bold || false,
                  italics: child.italic || false,
                  underline: child.underline ? { type: 'single' } : undefined,
                  strike: child.strikethrough || false,
                  color: child.color || undefined,
                  size: child.fontSize
                    ? parseInt(child.fontSize) * 2
                    : undefined,
                }),
              ),
              // alignment: node.align === 'center' ? AlignmentType.CENTER :
              //            node.align === 'right' ? AlignmentType.RIGHT :
              //            AlignmentType.LEFT,
            });
          }
          if (node.type === HEADING_KEYS.h1) {
            return new Paragraph({
              children: node.children.map(
                (child) => new TextRun({
                  text: child.text || '',
                  bold: true,
                  size: 32,
                }),
              ),
              heading: 'Heading1',
              // alignment: node.align === 'center' ? AlignmentType.CENTER :
              //            node.align === 'right' ? AlignmentType.RIGHT :
              //            AlignmentType.LEFT,
            });
          }
          if (node.type === HEADING_KEYS.h2) {
            return new Paragraph({
              children: node.children.map(
                (child) => new TextRun({
                  text: child.text || '',
                  bold: true,
                  size: 28,
                }),
              ),
              heading: 'Heading2',
              // alignment: node.align === 'center' ? AlignmentType.CENTER :
              //            node.align === 'right' ? AlignmentType.RIGHT :
              //            AlignmentType.LEFT,
            });
          }
          if (node.type === 'table') {
            const rows = node.children.map(
              (row) => new TableRow({
                children: row.children.map(
                  (cell) => new TableCell({
                    children: cell.children
                      .map((cellChild) => {
                        if (cellChild.type === 'p') {
                          return new Paragraph({
                            children: cellChild.children.map(
                              (textNode) => new TextRun({
                                text: textNode.text || '',
                                bold: textNode.bold || false,
                                italics: textNode.italic || false,
                                underline: textNode.underline
                                  ? { type: 'single' }
                                  : undefined,
                              }),
                            ),
                            // alignment: cellChild.align === 'center' ? AlignmentType.CENTER :
                            //            cellChild.align === 'right' ? AlignmentType.RIGHT :
                            //            AlignmentType.LEFT,
                          });
                        }
                        return null;
                      })
                      .filter(Boolean),
                  }),
                ),
              }),
            );
            return new Table({ rows });
          }
          if (node.type === 'todo') {
            return new Paragraph({
              children: [
                new TextRun({
                  text: node.checked ? '[X] ' : '[ ] ',
                }),
                ...node.children.map(
                  (child) => new TextRun({
                    text: child.text || '',
                    bold: child.bold || false,
                    italics: child.italic || false,
                  }),
                ),
              ],
              // alignment: node.align === 'center' ? AlignmentType.CENTER :
              //            node.align === 'right' ? AlignmentType.RIGHT :
              //            AlignmentType.LEFT,
            });
          }
          if (node.type === 'blockquote') {
            return new Paragraph({
              children: node.children.map(
                (child) => new TextRun({
                  text: child.text || '',
                  italics: true,
                }),
              ),
              indent: { left: 720 },
              // alignment: node.align === 'center' ? AlignmentType.CENTER :
              //            node.align === 'right' ? AlignmentType.RIGHT :
              //            AlignmentType.LEFT,
            });
          }
          return null;
        })
        .filter(Boolean);

      if (sections.length > 0) {
        doc.addSection({ children: sections });
      }

      const blob = await Packer.toBlob(doc);
      saveAs(blob, 'editor-document.docx');
      showToast('Document downloaded successfully!', 'success');
    } catch (error) {
      console.error('Error generating DOCX:', error);
      showToast('Failed to download document.', 'danger');
    }
  };

  return (
    <PageHeaderWrapper>
      <div className="bg-white">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold ps-3 mt-4 z-[99]">Editor</h3>
        </div>
        <TooltipProvider
          disableHoverableContent
          delayDuration={500}
          skipDelayDuration={0}
        >
          <DndProvider backend={HTML5Backend}>
            <Plate editor={editor} initialValue={editorValue}>
              <div
                ref={containerRef}
                className={cn(
                  'relative',
                  '[&_.slate-start-area-left]:!w-[64px] [&_.slate-start-area-right]:!w-[64px] [&_.slate-start-area-top]:!h-4',
                )}
              >
                <FixedToolbar className="sticky top-[132px] z-[150]">
                  <FixedToolbarButtons
                    onSaveDocx={saveDocx}
                    onSaveProgress={saveContentToLocalStorage}
                    containerRef={containerRef as React.RefObject<HTMLElement>}
                  />
                </FixedToolbar>

                <Editor
                  className="z-[40] px-[120px] py-16 ps-4 pe-4 pt-3 pb-3"
                  autoFocus
                  focusRing={false}
                  variant="ghost"
                  size="md"
                />

                {/* Cursor Overlay - shows remote cursors with user names at their actual positions */}
                <CursorOverlay containerRef={containerRef} />

                {/* Manual position-based cursor rendering using Slate DOM utilities */}
                <RemoteCursorsWithPositions containerRef={containerRef as React.RefObject<HTMLElement>} />

                {/* <FloatingToolbar>
                  <FloatingToolbarButtons />
                </FloatingToolbar> */}

                <CommentsPopover />

                {/* Collaboration indicator showing all active users via backend API */}
                {/* Disabled - using RemoteCursorsFloating (Yjs awareness) instead for better performance */}
                {/* <ActiveUsersIndicator
                  userName={userName}
                  userId={userId}
                  documentId={documentId}
                  apiKey={apiKey}
                  token={token}
                /> */}
              </div>
            </Plate>
          </DndProvider>
        </TooltipProvider>
        {/* Floating Chatbot Button - Bottom Right */}
        <div className="fixed bottom-8 right-8 z-[200]">
          <TextCapture token={token} apiKey={apiKey} />
        </div>
      </div>
    </PageHeaderWrapper>
  );
}
