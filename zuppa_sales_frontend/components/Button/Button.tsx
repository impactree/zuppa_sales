import { Button as BootStrapButton, Spinner } from 'react-bootstrap';
import { ButtonProps } from '../types';
import './Button.css';

export function Button({
  text,
  variant,
  type,
  onClick,
  onDoubleClick,
  className = '',
  btnclassName = '',
  isDisabled,
  isLoading,
  prefixIconChildren,
  sufixIconChildren,
  isDanger,
  isSolid,
  isSolidSecondary,
  isLink,
  isPill,
  isBorderButton,
  style,
}: ButtonProps) {
  const getButtonClassName = () => {
    if (isLink) {
      return 'common_link_button';
    }
    if (isDanger) {
      return 'common_hallowdanger_button';
    }
    if (isSolid && !isSolidSecondary) {
      return 'common_solid_button';
    }
    if (!isSolid && isSolidSecondary) {
      return 'common_secondary_button';
    }
    if (isPill) {
      return 'common_pill_button';
    }
    if (isBorderButton) {
      return 'common_border_button';
    }
    return 'common_hallow_button';
  };

  // const getTextWeightClassName = () => {
  //   if (isSolid && !isSolidSecondary) {
  //     return 'fw-bold';
  //   }
  //   if (!isSolid && isSolidSecondary) {
  //     return 'fw-bold';
  //   }
  //   return 'fw-medium';
  // };
  return (
    <div className={`${getButtonClassName()} ${btnclassName}`} data-testid={text}>
      <BootStrapButton
        type={type ?? 'button'}
        className={`w-100 ${className}`}
        onDoubleClick={() => {
          if (onDoubleClick) {
            onDoubleClick();
          }
        }}
        onClick={(e) => {
          if (onClick) {
            onClick(e);
          }
        }}
        disabled={isDisabled ?? isLoading}
        id={text}
        variant={variant}
        style={style}
        data-testid={`button-${text}`}
      >
        <h6 className="m-0 fw-300 d-flex align-items-center justify-content-center">
          {prefixIconChildren}
          {isLoading ? (
            <span>
              <Spinner size="sm" />
              <span className="ms-2">{text}</span>
            </span>
          ) : (
            text
          )}
          {sufixIconChildren}
        </h6>
      </BootStrapButton>
    </div>
  );
}
