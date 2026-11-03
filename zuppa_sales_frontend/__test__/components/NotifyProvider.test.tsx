import { ToggleSwitch } from '@/components/ToggleSwitch/ToggleSwitch';
import { SwitchProps } from '@/components/types';
import { fireEvent, render, screen } from '@testing-library/react';

const defaultProps: SwitchProps = {
  textOff: 'Off',
  textOn: 'On',
  isSwitchDefault: false,
  onChange: jest.fn(),
  className: 'test-class',
  isDisabled: false,
  checked: false,
  label: 'Test Toggle',
};

afterEach(() => {
  jest.clearAllMocks();
});

test('calls onChange when the switch is toggled', () => {
  render(<ToggleSwitch {...defaultProps} />);

  const toggleInput = screen.getByTestId('toggle_switch_input');
  fireEvent.click(toggleInput);

  expect(defaultProps.onChange).toHaveBeenCalled();
});
