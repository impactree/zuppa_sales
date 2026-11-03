declare module "react-step-progress-bar" {
  import { CSSProperties, ReactNode } from "react";

  export interface ProgressBarProps {
    percent: number;
    filledBackground?: string;
    unfilledBackground?: string;
    height?: number;
    width?: string;
    hasStepZero?: boolean;
    children?: ReactNode;
  }

  export interface StepProps {
    transition?: string;
    position?: number;
    children?: (props: { accomplished: boolean; index: number }) => ReactNode;
  }

  export const ProgressBar: React.FC<ProgressBarProps>;
  export const Step: React.FC<StepProps>;
}
