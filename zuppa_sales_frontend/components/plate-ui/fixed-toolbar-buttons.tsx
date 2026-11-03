/* eslint-disable react/jsx-pascal-case */
import React from 'react';

import { Download, Save } from 'lucide-react';
import {
  BoldPlugin,
  CodePlugin,
  ItalicPlugin,
  StrikethroughPlugin,
  UnderlinePlugin,
} from '@udecode/plate-basic-marks/react';
import { useEditorReadOnly } from '@udecode/plate-common/react';
import {
  FontBackgroundColorPlugin,
  FontColorPlugin,
} from '@udecode/plate-font/react';
// import { ListStyleType } from '@udecode/plate-indent-list';
import { ImagePlugin } from '@udecode/plate-media/react';

import { Icons, iconVariants } from '@/components/icons';
import { AlignDropdownMenu } from '@/components/plate-ui/align-dropdown-menu';
import { ColorDropdownMenu } from '@/components/plate-ui/color-dropdown-menu';
import { CommentToolbarButton } from '@/components/plate-ui/comment-toolbar-button';
// import { EmojiDropdownMenu } from '@/components/plate-ui/emoji-dropdown-menu';
// import { IndentListToolbarButton } from '@/components/plate-ui/indent-list-toolbar-button';

import { IndentToolbarButton } from '@/components/plate-ui/indent-toolbar-button';
import { LineHeightDropdownMenu } from '@/components/plate-ui/line-height-dropdown-menu';
import { LinkToolbarButton } from '@/components/plate-ui/link-toolbar-button';
import { MediaToolbarButton } from '@/components/plate-ui/media-toolbar-button';
import { MoreDropdownMenu } from '@/components/plate-ui/more-dropdown-menu';
import { OutdentToolbarButton } from '@/components/plate-ui/outdent-toolbar-button';
import { TableDropdownMenu } from '@/components/plate-ui/table-dropdown-menu';
import { IndentTodoToolbarButton } from './indent-todo-toolbar-button';

import { InsertDropdownMenu } from './insert-dropdown-menu';
import { MarkToolbarButton } from './mark-toolbar-button';
import { ModeDropdownMenu } from './mode-dropdown-menu';
import { ToolbarGroup } from './toolbar';
import { TurnIntoDropdownMenu } from './turn-into-dropdown-menu';
// import saveDocx from '../ui/plate-editor';
import { FontSizeDropdownMenu } from './font-size-element';
import { RemoteCursorsFloating } from './remote-cursors-floating';
// import { FontFamilyDropdown } from './font-family-element';
// import { TextCapture } from './text-select';

interface FixedToolbarButtonsProps {
  onSaveDocx: () => Promise<void>;
  onSaveProgress: () => Promise<void>;
  containerRef: React.RefObject<HTMLElement>;
}

export function FixedToolbarButtons({
  onSaveDocx,
  onSaveProgress,
  containerRef,
}: FixedToolbarButtonsProps) {
  const readOnly = useEditorReadOnly();
  return (
    <div className="w-full plate-theme">
      <div
        className="flex flex-wrap items-center gap-1"
        style={{
          transform: 'translateX(calc(-1px))',
        }}
      >
        {!readOnly && (
          <>
            <ToolbarGroup noSeparator>
              <InsertDropdownMenu />
              <TurnIntoDropdownMenu />
            </ToolbarGroup>
            <ToolbarGroup noSeparator>
              <FontSizeDropdownMenu />
              {/* <FontFamilyDropdown/> */}
            </ToolbarGroup>
            <ToolbarGroup>
              <MarkToolbarButton
                nodeType={BoldPlugin.key}
                tooltip="Bold (⌘+B)"
                className="hover:text-amber-600"
              >
                <Icons.bold />
              </MarkToolbarButton>
              <MarkToolbarButton
                nodeType={ItalicPlugin.key}
                tooltip="Italic (⌘+I)"
                className="hover:text-amber-600"
              >
                <Icons.italic />
              </MarkToolbarButton>
              <MarkToolbarButton
                nodeType={UnderlinePlugin.key}
                tooltip="Underline (⌘+U)"
                className="hover:text-amber-600"
              >
                <Icons.underline />
              </MarkToolbarButton>

              <MarkToolbarButton
                nodeType={StrikethroughPlugin.key}
                tooltip="Strikethrough (⌘+⇧+M)"
                className="hover:text-amber-600"
              >
                <Icons.strikethrough />
              </MarkToolbarButton>
              <MarkToolbarButton
                nodeType={CodePlugin.key}
                tooltip="Code (⌘+E)"
                className="hover:text-amber-600"
              >
                <Icons.code />
              </MarkToolbarButton>
            </ToolbarGroup>

            <ToolbarGroup>
              <ColorDropdownMenu
                nodeType={FontColorPlugin.key}
                tooltip="Text Color"
              >
                <Icons.color className={iconVariants({ variant: 'toolbar' })} />
              </ColorDropdownMenu>
              <ColorDropdownMenu
                nodeType={FontBackgroundColorPlugin.key}
                tooltip="Highlight Color"
              >
                <Icons.bg className={iconVariants({ variant: 'toolbar' })} />
              </ColorDropdownMenu>
            </ToolbarGroup>

            <ToolbarGroup>
              <AlignDropdownMenu />

              <LineHeightDropdownMenu />

              {/* <IndentListToolbarButton nodeType={ListStyleType.Disc} />

              */}

              {/* <IndentListToolbarButton nodeType={ListStyleType.Decimal} /> */}

              <IndentTodoToolbarButton className="hover:text-amber-600" />

              <OutdentToolbarButton className="hover:text-amber-600" />
              <IndentToolbarButton className="hover:text-amber-600" />
            </ToolbarGroup>

            <ToolbarGroup>
              <LinkToolbarButton className="hover:text-amber-600" />
              <MediaToolbarButton
                nodeType={ImagePlugin.key}
                className="hover:text-amber-600"
              />
              <TableDropdownMenu />
              {/* <TextCapture token={token} apiKey={apiKey} /> */}
              <MoreDropdownMenu />
            </ToolbarGroup>
          </>
        )}

        <div className="grow" />

        <ToolbarGroup noSeparator className="flex items-center gap-2">
          <button
            onClick={onSaveProgress}
            type="button"
            className="inline-flex items-center justify-center p-2 text-black rounded-md hover:bg-gray-100"
            title="Save Progress"
          >
            <Save className="w-5 h-5 hover:text-amber-600" />
          </button>

          <button
            onClick={onSaveDocx}
            type="button"
            className="inline-flex items-center justify-center p-2 text-black rounded-md hover:bg-gray-100"
            title="Download DOCX"
          >
            <Download className="w-5 h-5 hover:text-amber-600" />
          </button>
          <CommentToolbarButton />
          <ModeDropdownMenu />
          {/* Collaboration indicator - shows who is editing */}
          <RemoteCursorsFloating containerRef={containerRef} />
        </ToolbarGroup>
      </div>
    </div>
  );
}
