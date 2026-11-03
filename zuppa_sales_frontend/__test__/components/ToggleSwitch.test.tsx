import { ToggleSwitch } from "@/components/ToggleSwitch/ToggleSwitch";
import { SwitchProps } from "@/components/types";
import "@testing-library/jest-dom";
import { fireEvent, render } from "@testing-library/react";

jest.mock(
  "@/components/ToggleSwitch/ToggleSwitch.scss",
  () => jest.fn()
);
const mockOnChange = jest.fn();
const testProps: SwitchProps = {
  textOff: "Off",
  textOn: "On",
  onChange: mockOnChange,
  isDisabled: false,
  checked: false,
};

describe("ToggleSwitch component", () => {
  it("renders ToggleSwitch correctly with default props", () => {
    const { getByText, getByRole } = render(
      <ToggleSwitch {...testProps} />
    );

    expect(getByText("Off")).toBeInTheDocument();
    expect(getByText("On")).toBeInTheDocument();

    const toggleSwitch = getByRole("checkbox");
    expect(toggleSwitch).not.toBeChecked();
  });

  it("triggers onChange function when clicked", () => {
    const { getByRole } = render(<ToggleSwitch {...testProps} />);
    const toggleSwitch = getByRole("checkbox");

    fireEvent.click(toggleSwitch);

    expect(mockOnChange).toHaveBeenCalledTimes(1);
    expect(mockOnChange).toHaveBeenCalledWith(expect.any(Object));
  });

  it("renders ToggleSwitch with custom class", () => {
    const customProps: SwitchProps = {
      ...testProps,
      className: "custom-class",
    };
    const { container } = render(<ToggleSwitch {...customProps} />);

    expect(container.firstChild).toHaveClass("custom-class");
  });

  it("renders ToggleSwitch with default switch style", () => {
    const defaultProps: SwitchProps = {
      ...testProps,
      isSwitchDefault: true,
    };
    const { container } = render(<ToggleSwitch {...defaultProps} />);

    expect(container.querySelector(".toggle_switch")).toHaveClass(
      "switch_default"
    );
  });

  it("renders ToggleSwitch with disabled state", () => {
    const disabledProps: SwitchProps = {
      ...testProps,
      isDisabled: true,
    };
    const { getByRole } = render(<ToggleSwitch {...disabledProps} />);
    const toggleSwitch = getByRole("checkbox");

    expect(toggleSwitch).toBeDisabled();
  });
  it("renders ToggleSwitch as an eligibility switch when 'isSwitchEligibility' prop is true", () => {
    const eligibilityProps: SwitchProps = {
      ...testProps,
    };
    const {getByTestId, getByText } = render(
      <ToggleSwitch {...eligibilityProps} />
    );
    const toggleSwitch = getByTestId("toggle_switch_input");
    const onText = getByText("On");
    const offText = getByText("Off");
    expect(toggleSwitch).toHaveAttribute("type", "checkbox");
    expect(onText).toHaveClass("pe-4 fw-semibold");
    expect(offText).toHaveClass("ps-4 pe-1 fw-semibold");
    expect(toggleSwitch).not.toBeChecked();
  });

  it("renders ToggleSwitch as checked when 'checked' prop is true", () => {
    const checkedProps: SwitchProps = {
      ...testProps,
      checked: true,
    };
    const { getByRole } = render(<ToggleSwitch {...checkedProps} />);
    const toggleSwitch = getByRole("checkbox");

    expect(toggleSwitch).toBeChecked();
  });

  it("remains disabled after clicking when 'isDisabled' prop is true", () => {
    const disabledProps: SwitchProps = {
      ...testProps,
      isDisabled: true,
    };
    const { getByRole } = render(<ToggleSwitch {...disabledProps} />);
    const toggleSwitch = getByRole("checkbox");

    fireEvent.click(toggleSwitch);

    expect(toggleSwitch).toBeDisabled();
  });
});
