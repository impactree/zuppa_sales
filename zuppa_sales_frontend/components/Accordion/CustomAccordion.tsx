import React from 'react';
import { Accordion as BootStrapAccordion } from 'react-bootstrap';
import { usePathname } from 'next/navigation';
import { AccordionProps } from '../types';
import './Accordion.css';

export function CustomAccordion({
  accordionText,
  accordionTextIcon,
  children,
  icon,
  rightHeader,
}: AccordionProps) {
  const pathname = usePathname();
  return (
    <div
      className={`${pathname.startsWith('/insights') ? '' : 'secondary-border'}`}
    >
      <BootStrapAccordion>
        <BootStrapAccordion.Item
          key=""
          eventKey=""
          id={accordionText}
          className={`${pathname.startsWith('/insights') ? 'accordion-item-analytics' : 'accordion-item'}`}
        >
          <div>
            <BootStrapAccordion.Header id={accordionText}>
              <div className=" d-flex align-items-center" id={accordionText}>
                {icon && (
                  <div className="accodion_icon d-flex align-items-center justify-content-center">
                    {icon}
                  </div>
                )}
                <div className="accodion_text">
                  {accordionText}
                  {accordionTextIcon && accordionTextIcon}
                </div>
                {rightHeader && <div>{rightHeader}</div>}
              </div>
            </BootStrapAccordion.Header>
            <BootStrapAccordion.Body data-testid="Test Content">
              <div>{children}</div>
            </BootStrapAccordion.Body>
          </div>
        </BootStrapAccordion.Item>
      </BootStrapAccordion>
    </div>
  );
}
