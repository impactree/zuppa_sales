/* eslint-disable @typescript-eslint/no-use-before-define */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint jsx-a11y/click-events-have-key-events: off */
/* eslint-disable import/no-unresolved */
/* eslint-disable consistent-return */
import React, { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import Image from 'next/image';
import { X } from 'lucide-react';
import vectorIcon from '@/assests/vector.png';

export function CustomFormulaModal({
  isOpen,
  onClose,
  questionsList,
  macroFunction,
  onSave,
}: {
  isOpen: boolean;
  onClose: () => void;
  onSave?: (uidFormula: string) => void;
  questionsList: { label: string; value: string }[];
  macroFunction?: string;
}) {
  // console.log(macroFunction, 'macrofunction')
  const [searchTerm, setSearchTerm] = useState('');
  const [uidFormula, setUidFormula] = useState<string>(macroFunction || '');
  const editorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setUidFormula(macroFunction || '');
  }, [macroFunction]);

  // Run when modal opens
  useEffect(() => {
    if (!isOpen) return;

    if (questionsList.length === 1) {
      setUidFormula(questionsList[0].value);
      if (editorRef.current) {
        editorRef.current.innerHTML = `"${questionsList[0].label}"`;
      }
      return;
    }

    const interval = setInterval(() => {
      if (editorRef.current) {
        const labelFormula = convertUidFormulaToLabels(macroFunction || '');
        editorRef.current.innerHTML = labelFormula;
        clearInterval(interval);
      }
    }, 50);

    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen, macroFunction, questionsList]);

  const insertMissingOperators = (formula: string) => {
    if (!formula) return '';

    // Extract all UIDs
    const uids = formula.match(/UID_\d+/g) || [];

    // If exactly 2 UIDs and no operator between them → add +
    if (uids.length === 2) {
      const pattern = new RegExp(`(${uids[0]})(\\s*)(${uids[1]})`);
      return formula.replace(pattern, `${uids[0]} + ${uids[1]}`);
    }

    // General case: add + if UIDs appear back-to-back
    return formula.replace(/(UID_\d+)(?=UID_\d+)/g, '$1 + ');
  };

  const convertUidFormulaToLabels = (formula: string) => {
    if (!formula) return '';
    const fixedFormula = insertMissingOperators(formula);
    return fixedFormula
      .split(/(UID_\d+|\+|\-|\*|\/|\(|\)|AND|OR)/) // keep operators
      .map((part) => {
        const trimmed = part.trim();
        const match = questionsList.find((q) => q.value === trimmed);
        return match ? `"${match.label}"` : part;
      })
      .join(' ');
  };

  if (!isOpen) return null;

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();

    const label = e.dataTransfer.getData('label');
    const value = e.dataTransfer.getData('value');

    if (!label || !value) return;

    const editor = editorRef.current;
    if (!editor) return;

    // Get cursor position at drop point
    let range: Range | null = null;
    const selection = window.getSelection();

    // Place cursor at drop position
    if (document.caretRangeFromPoint) {
      const caret = document.caretRangeFromPoint(e.clientX, e.clientY);
      if (caret) range = caret;
    } else if ((document as any).caretPositionFromPoint) {
      const pos = (document as any).caretPositionFromPoint(
        e.clientX,
        e.clientY,
      );
      if (pos) {
        range = document.createRange();
        range.setStart(pos.offsetNode, pos.offset);
        range.collapse(true);
      }
    }

    if (!range) return;

    // Create styled span for dropped question
    const span = document.createElement('span');
    span.textContent = `"${label}"`;
    span.contentEditable = 'false';
    span.dataset.value = value;
    span.style.cssText = `
    color: #FBA900;
    font-family: Inter;
    font-weight: 500;
    font-size: 13px;
    line-height: 131%;
    letter-spacing: 0.5%;
    padding: 1px 4px;
    border-radius: 3px;
    margin: 0 2px;
  `;

    // Insert span into caret position
    range.insertNode(span);

    // Move cursor after span
    range.setStartAfter(span);
    range.collapse(true);
    selection?.removeAllRanges();
    selection?.addRange(range);

    updateUidFormula();
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'copy';
  };

  /** 🔄 Convert HTML (editor) → UID formula string */
  const updateUidFormula = () => {
    const editor = editorRef.current;
    if (!editor) return;

    let expression = '';
    editor.childNodes.forEach((node) => {
      if (node.nodeType === Node.TEXT_NODE) {
        expression += node.textContent;
      } else if (node instanceof HTMLElement && node.dataset.value) {
        expression += node.dataset.value;
      }
    });

    setUidFormula(expression);
  };

  const handleSave = () => {
    onSave?.(uidFormula);
    onClose();
  };

  return createPortal(
    <div
      className="fixed inset-0 flex items-center justify-center bg-black/20 z-[9999]"
      onClick={onClose}
    >
      {/* Modal box */}
      <div
        className="relative flex flex-col shadow-lg"
        style={{
          marginTop: '20px',
          width: '60%',
          height: '80%',
          borderRadius: '12px',
          background: '#FFFFFF',
          borderLeft: '1px solid #B7C2D880',
          padding: '14px 18px 18px 18px',
        }}
        onClick={(e) => e.stopPropagation()}
        onDrop={(e) => e.stopPropagation()}
        onDragOver={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex justify-between items-center mb-2">
          <h5 className="font-semibold text-gray-800 text-[30px]">
            Add Custom Formula
          </h5>
          <button
            type="button"
            onClick={onClose}
            className="hover:bg-gray-100 rounded-full p-1 transition"
          >
            <X size={22} color="#6b7280" />
          </button>
        </div>

        {/* Note */}
        <p className="text-sm text-gray-600 mb-3">
          <span className="font-semibold">Note:</span>
          {' '}
          Drag and drop questions
          into the formula area below. Use operators like +, -, *, /, (), AND,
          OR.
        </p>

        {/* Body */}
        <div className="flex gap-3 flex-1 overflow-hidden">
          {/* Formula Area */}
          <div
            className="flex flex-col flex-1"
            style={{
              borderRadius: '14px',
              padding: '12px',
              background: '#F0F4F9',
            }}
          >
            <label className="text-sm font-medium mb-2">
              Formula:
              {' '}
              <span className="text-gray-500">
                Allowed Operators: +, -, *, /, (), AND, OR
              </span>
            </label>

            {/* Editable Area */}
            <div
              ref={editorRef}
              contentEditable
              suppressContentEditableWarning
              onInput={updateUidFormula}
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              className="flex-1 overflow-y-auto bg-white rounded-md p-3 text-sm outline-none"
              style={{
                fontFamily: 'Inter',
                fontSize: '13px',
                fontWeight: 400,
                minHeight: '100%',
                borderRadius: '8px',
                whiteSpace: 'pre-wrap',
                color: '#FBA900',
              }}
              data-placeholder="Write or drop questions here..."
            />
          </div>

          {/* Questions List */}
          <div
            className="flex flex-col"
            style={{
              width: '420px',
              borderRadius: '14px',
              padding: '12px',
              background: '#F0F4F9',
            }}
          >
            <p className="text-sm font-semibold text-gray-600 mb-2">
              Questions
            </p>

            {/* Search Box */}
            <div
              className="flex items-center mb-2"
              style={{
                borderRadius: '8px',
                padding: '10px 12px',
                background: '#FFFFFF',
              }}
            >
              <input
                type="text"
                placeholder="Search questions..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full text-sm outline-none bg-transparent"
              />
            </div>

            {/* Question Items */}
            <div
              className="flex flex-col overflow-y-auto"
              style={{ flex: 1, gap: '6px' }}
            >
              {questionsList
                ?.filter((q) => q.label.toLowerCase().includes(searchTerm.toLowerCase()))
                .map((q) => (
                  <div
                    key={q.value}
                    draggable
                    onDragStart={(e) => {
                      e.dataTransfer.setData('label', q.label);
                      e.dataTransfer.setData('value', q.value);
                    }}
                    className="cursor-pointer hover:bg-gray-50 transition-colors flex items-center"
                    style={{
                      borderRadius: '8px',
                      padding: '12px',
                      background: '#FFFFFF',
                      gap: '10px',
                    }}
                  >
                    <Image
                      src={vectorIcon}
                      alt="Question icon"
                      width={15}
                      height={15}
                    />
                    <p className="text-sm text-gray-700 m-0">{q.label}</p>
                  </div>
                ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-center items-center gap-3 mt-4">
          <button
            type="button"
            onClick={onClose}
            className="w-[101px] h-[49px] rounded-md border border-gray-300 bg-white text-gray-800 text-sm font-medium"
            style={{ borderRadius: ' 10px' }}
          >
            Cancel
          </button>

          <button
            type="submit"
            onClick={handleSave}
            className="w-[101px] h-[49px] rounded-md bg-[#232538] text-white text-sm font-medium border-none"
            style={{ borderRadius: ' 10px' }}
          >
            Save
          </button>
        </div>
      </div>
    </div>,
    document.body,
  );
}
