import { CSSObjectWithLabel } from 'react-select';
import { CustomStylesProps } from '../types';

export const CustomStyles = {
  option: (
    styles: CSSObjectWithLabel,
    { isFocused, isSelected }: CustomStylesProps,
  ): CSSObjectWithLabel => {
    let backgroundColor;
    let color;

    if (isSelected) {
      backgroundColor = 'var(--secondary)';
      color = 'var(--white)';
    } else if (isFocused) {
      backgroundColor = 'var(--hoverColor)';
      color = 'var(--secondary)';
    }

    return {
      ...styles,
      backgroundColor,
      color,
    };
  },
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control: (provided: CSSObjectWithLabel, state: any): CSSObjectWithLabel => ({
    ...provided,
    backgroundColor: state.isDisabled ? '#e9ecef' : 'var(--white)',
    minHeight: '44px',
    height: '44px',
    cursor: 'pointer',
    // minWidth: '596px',
  }),
  menuList: (styles: CSSObjectWithLabel): CSSObjectWithLabel => ({
    ...styles,
    backgroundColor: 'var(--white)',
    maxHeight: '200px',
    overflowY: 'auto',
    cursor: 'pointer',
  }),
};
