import { Accordion } from '@/components/Accordion/CustomAccordion';
import { AccordionProps } from '@/components/types';
import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';

const defaultProps: AccordionProps = {
  accordionText: 'Accordion Header',
  children: <div>Test Content</div>,
};

test('should render the accordion header text', () => {
  render(<Accordion {...defaultProps} />);
  const headerElement = screen.getByText('Accordion Header');
  expect(headerElement).toBeInTheDocument();
});

test('should display content when accordion is expanded', () => {
  render(<Accordion {...defaultProps} />);

  const headerElement = screen.getByText('Accordion Header');
  fireEvent.click(headerElement);

  const contentElement = screen.getByTestId('Test Content');
  expect(contentElement).toBeInTheDocument();
  expect(contentElement).toHaveTextContent('Test Content');
});

test('should render the icon if provided', () => {
  const icon = <span>Icon</span>;
  render(<Accordion {...defaultProps} icon={icon} />);

  const iconElement = screen.getByText('Icon');
  expect(iconElement).toBeInTheDocument();
});

test('should render rightHeader if provided', () => {
  const rightHeader = <span>Right Header</span>;
  render(<Accordion {...defaultProps} rightHeader={rightHeader} />);

  const rightHeaderElement = screen.getByText('Right Header');
  expect(rightHeaderElement).toBeInTheDocument();
});
