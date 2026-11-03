import { BreadCrumb } from '@/components/BreadCrumb/BreadCrumb';
import { BreadCrumbProps } from '@/components/types';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import React from 'react';

jest.mock('next/link', () => function ({ children, href }: { children: React.ReactNode; href: string }) {
  return <a href={href}>{children}</a>;
});

const mockBreadCrumb: BreadCrumbProps[] = [
  { title: 'Home', isTitle: true, url: '/' },
  { title: 'Section', isSubTitle: true, url: '/section' },
  {
    title: 'Sub-section',
    breadCrumb: [
      { title: 'Page 1', url: '/page-1' },
      {
        title: 'Page 2',
        url: '',
      },
    ],
  },
];

test('should render the main title if isTitle is true', () => {
  render(<BreadCrumb breadCrumb={mockBreadCrumb} />);
  const titleElement = screen.getByText('Home');
  expect(titleElement).toBeInTheDocument();
  expect(titleElement).toHaveClass('Bread_crumb_title');
});

test('should render the sub-title if isSubTitle is true', () => {
  render(<BreadCrumb breadCrumb={mockBreadCrumb} />);
  const subTitleElement = screen.getByText('Section');
  expect(subTitleElement).toBeInTheDocument();
  expect(subTitleElement).toHaveClass('Bread_crumb_title');
});

test('should render breadcrumb links and divs for items without URLs', () => {
  render(<BreadCrumb breadCrumb={mockBreadCrumb} />);
  const linkElement = screen.getByText('Page 1');
  expect(linkElement.closest('a')).toHaveAttribute('href', '/page-1');

  const divElement = screen.getByText('Page 2');
  expect(divElement).toBeInTheDocument();
  expect(divElement.tagName).toBe('DIV');
});

test('should render separators between breadcrumb items', () => {
  render(<BreadCrumb breadCrumb={mockBreadCrumb} />);
  const separators = screen.getAllByText('/');
  expect(separators.length).toBe(2);
});
