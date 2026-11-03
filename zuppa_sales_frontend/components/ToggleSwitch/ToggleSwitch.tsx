import { SwitchProps } from '../types';
import './ToggleSwitch.css';

export function ToggleSwitch({
  textOff,
  textOn,
  isSwitchDefault = false,
  onChange,
  className,
  isDisabled,
  checked,
  label,
}: SwitchProps) {
  const getSwitchClasses = () => {
    if (isSwitchDefault) {
      return 'toggle_switch switch_default';
    }
    return 'toggle_switch switch_custom';
  };

  const getOnClasses = () => {
    if (isSwitchDefault) {
      return 'on_default';
    }
    return 'on';
  };

  const getOffClasses = () => {
    if (isSwitchDefault) {
      return 'off_default';
    }
    return 'off';
  };
  return (
    <div className={`${className}`}>
      <label htmlFor="togBtn" className="common_toggle_switch">
        {label && <span className="switch_label">{label}</span>}
        <input
          type="checkbox"
          id="togBtn"
          disabled={isDisabled}
          checked={checked}
          onChange={onChange}
          aria-label={label ?? 'Toggle switch'}
          data-testid="toggle_switch_input"
        />
        <div className={getSwitchClasses()}>
          <div className={`pe-4 fw-semibold ${getOnClasses()}`}>
            {textOn}
          </div>
          <div
            className={`ps-4 pe-1 fw-semibold ${getOffClasses()}`}
          >
            {textOff}
          </div>
        </div>
      </label>
    </div>
  );
}
