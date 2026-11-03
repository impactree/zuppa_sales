/* eslint-disable no-unused-vars */
/* eslint @typescript-eslint/no-unused-vars: off */
/* eslint jsx-a11y/click-events-have-key-events: off */
import React, { useState } from 'react';
import { Accordion as BootStrapAccordion } from 'react-bootstrap';
import { usePathname } from 'next/navigation';
import {
  IoChevronDownOutline,
  IoChevronForwardOutline,
  IoChevronUpOutline,
} from 'react-icons/io5';
import { AccordionProps } from '../types';
import './AccordionWithActions.css';

export function AccordionWithActions({
  accordionText,
  accordionTextIcon,
  children,
  icon,
  rightHeader,
}: AccordionProps) {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <BootStrapAccordion activeKey={isOpen ? '0' : ''}>
        <BootStrapAccordion.Item
          eventKey="0"
          id={accordionText}
          className="accordion-item-analytics"
        >
          {/* HEADER */}
          <BootStrapAccordion.Header
            id={accordionText}
            onClick={() => setIsOpen((prev) => !prev)}
          >
            <div className="d-flex align-items-center justify-content-between w-100 pe-3 accordion-custom-header">
              <div className="d-flex align-items-center gap-2">
                {/* Chevron icon before text */}
                <span className="accordion-chevron-icon">
                  {isOpen ? (
                    <IoChevronDownOutline size={18} />
                  ) : (
                    <IoChevronForwardOutline size={18} />
                  )}
                </span>

                {icon && (
                  <div className="accodion_icon d-flex align-items-center justify-content-center">
                    {icon}
                  </div>
                )}

                <div className="accodion_text d-flex align-items-center gap-1">
                  {accordionText}
                  {accordionTextIcon && accordionTextIcon}
                </div>
              </div>

              {/* Right header (no toggle when clicked) */}
              {rightHeader && (
                <div
                  onClick={(e) => {
                    e.stopPropagation();
                  }}
                >
                  {rightHeader}
                </div>
              )}
            </div>
          </BootStrapAccordion.Header>

          {/* BODY */}
          <BootStrapAccordion.Body data-testid="Test Content">
            <div>{children}</div>
          </BootStrapAccordion.Body>
        </BootStrapAccordion.Item>
      </BootStrapAccordion>
    </div>
  );
}
