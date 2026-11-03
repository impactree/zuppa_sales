/* eslint-disable @typescript-eslint/no-explicit-any */

import { Params } from '@/lib/utils';
import { FieldInputProps } from 'formik';
import {
  ChangeEvent,
  ReactElement, ReactNode,
} from 'react';
import { AnyObject, AnySchema } from 'yup';

export type ToastProps = Readonly<{
  message: string;
  type: 'SUCCESS' | 'ERROR' | 'LOADING';
  position?:
  | 'top-right'
  | 'top-center'
  | 'top-left'
  | 'bottom-right'
  | 'bottom-center'
  | 'bottom-left';
  autoClose?: number;
}>;

export type ModalProps = Readonly<{
  show: boolean;
  onHide?: () => void;
  title?: string;
  children: ReactNode;
  className?: string;
  size?: 'sm' | 'lg' | 'xl' | '';
  fullscreen?: string | true;
  onClose?: () => void;
}>;

export type InputFieldProps = Readonly<{
  validationSchema: AnySchema<AnyObject>;
  label: string;
  type?: string;
  field: {
    name: string;
    value: string;
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  };
  isValid: boolean;
  error: string;
  autoFocus?: boolean;
  placeholder?: string;
  component?: ReactNode;
  disabled?: boolean;
  as?: string;
  isPassword?: boolean;
  setPasswordIcon?: (data: boolean) => void;
  passwordIcon?: boolean;
  maxLength?: number;
  rightIcon?: boolean;
  icon?: React.ReactNode;
  onBlur?: () => void;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  unit?: string;
  value?: string;
  isCustomRequired?: boolean
  isSideBySide?: boolean;
}>;

export type CustomInputFieldProps = Readonly<{
  validationSchema: AnySchema<AnyObject> | undefined;
  label: string | ReactNode;
  field: {
    name: string;
    value: Date | string | string[] | number | undefined | unknown;
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  };
  error: string | undefined;
  children: ReactNode;
  isCustomRequired?: boolean
  placeholder?: string;
  isSideBySide?: boolean;
}>;

export type FormikTimeFieldProps = Readonly<{
  name: string;
  label: string;
  errors?: string;
  validationSchema?: AnySchema<AnyObject, any>;
  isDisabled?: boolean;
  value?: string;
  onChange?: (time: string) => void;
  use12Hours?: boolean;
}>;

export type FormikPhoneNumberProps = Readonly<{
  name: string;
  label: string;
  errors?: string;
  isDisabled?: boolean;
  validationSchema?: AnySchema<AnyObject>;
  onChange?: (phoneNumber: any) => void;
  isInternational?: boolean;
  value?: string;
  isCustomRequired?: boolean;
}>;

export type FormikFieldProps = Readonly<{
  name: string;
  errors: Record<string, string> | any;
  validationSchema: AnySchema<AnyObject>;
  label: string;
  type: string;
  autoFocus?: boolean;
  placeholder?: string;
  disabled?: boolean;
  as?: string;
  isPassword?: boolean;
  setPasswordIcon?: (data: boolean) => void;
  passwordIcon?: boolean;
  maxLength?: number;
  rightIcon?: boolean;
  icon?: React.ReactNode;
  onBlur?: () => void;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  unit?: string;
  value?: string;
  isCustomRequired?: boolean;
  customErrorMap?: string;
}>;

export type FormikDateFieldProps = Readonly<{
  name: string;
  label?: string;
  errors?: string;
  validationSchema?: AnySchema<AnyObject>;
  minDate?: Date | string | number;
  maxDate?: Date | string | number;
  isDisabled?: boolean;
  onlyYearPicker?: boolean;
  onlyMonthPicker?: boolean;
  placeholder?: string;
  isQuarter?: boolean;
  quarter?: string;
  isCustomRequired?: boolean;
  value?: string;
  onChange?: (date: string) => void;
}>;

export type CustomStylesProps = Readonly<{
  isFocused: boolean;
  isSelected: boolean;
}>;

export type Option = Readonly<{
  label: string;
  value: string;
  id?: number;
}>;

export type CustomCreatableSelectProps = Readonly<{
  options: Option[];
  isMulti?: boolean;
  className?: string;
  placeholder?: string;
  callback?: (value: Option[]) => void;
  isDisabled: boolean;
  isClearable: boolean;
  field?: FieldInputProps<any> extends infer F ? F : never;
  form?: {
    setFieldValue: (name: string, value: string | string[]) => void;
  };
  displayName?: string;
  maxLength?: number;
}>;

export type CustomSelectProps = Readonly<{
  options: Option[];
  isMulti?: boolean;
  className?: string;
  placeholder?: string;
  id: string;
  callback?: (value: Option) => void;
  isDisabled: boolean;
  value?: Option | null | string;
  isClearable?: boolean;
  onFieldUpdate?: (value: Option[] | Option) => void;
  field?: any;
  form?: {
    setFieldValue: (name: string, value: string | string[]) => void;
  };
  isCustomOption?: boolean
}>;

export type AccordionProps = Readonly<{
  accordionText?: string | ReactElement;
  children: string | ReactElement;
  className?: string;
  icon?: ReactNode;
  rightHeader?: ReactNode;
  accordionTextIcon?: ReactNode;
}>;

export type BreadCrumbProps = Readonly<{
  title: string;
  url?: string;
  isSubTitle?: boolean;
  isTitle?: boolean;
  onClick?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  breadCrumb?:
  | {
    title: string;
    url: string;
    onClick?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  }[]
  ;
}>;

export type ButtonProps = Readonly<{
  text: string;
  variant?: string;
  className?: string;
  btnclassName?: string;
  type?: 'submit' | 'reset' | 'button';
  onClick?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  onDoubleClick?: (() => void);
  isDisabled?: boolean;
  isLoading?: boolean;
  prefixIconChildren?: ReactNode;
  sufixIconChildren?: ReactNode;
  isDanger?: boolean;
  isSolid?: boolean;
  isSolidSecondary?: boolean;
  isLink?: boolean;
  isPill?: boolean;
  isBorderButton?: boolean;
  style?: React.CSSProperties;
}>;

export type NavBarMenuItemsProps = Readonly<{
  url?: string;
  text: string;
  subText: string;
  subMenu?: string;
  isRadius?: boolean;
  menu?: string;
  icon?: ReactNode;
  settingIcon?: ReactNode;
}>;

export type PillProps = Readonly<{
  pillText: string;
  pillClass?: string;
}>;

export type SwitchProps = Readonly<{
  toggle?: boolean;
  textOff: string;
  textOn: string;
  isSwitchDefault?: boolean;
  checked?: boolean;
  className?: string;
  onChange?: ((e: ChangeEvent<HTMLInputElement>) => void);
  isDisabled?: boolean;
  label?: string
}>;

export type IModalProps = Readonly<{
  show: boolean;
  onHide?: () => void;
  title?: string;
  children: ReactNode;
  className?: string;
  size: 'sm' | 'lg' | 'xl' | undefined;
  fullscreen?: string | true;
  onClose?: () => void;
}>;

export type IBreadCrumbProps = Readonly<{
  breadCrumb: readonly BreadCrumbProps[];
}>;

export type ICheckboxProps = Readonly<{
  name: string;
  error: string;
  checked: boolean;
  label: string;
}>

export type IModalStyleProps = Readonly<{
  title?: string;
  className?: string;
  size?: 'sm' | 'lg' | 'xl' | undefined;
  fullscreen?: string | true;
  onClose?: () => void;
  content?: ReactNode;
}>;

export type ISearchProps = Readonly<{
  params: Params;
  className?: string;
  placeholder?: string;
   paramName?: string;
}>;

export type CustomCheckboxProps = Readonly<{
  name: string;
  label: string | ReactNode;
  errors?: Record<string, string>;
  validationSchema?: AnySchema<AnyObject>;
  isDisabled?: boolean;
  type: 'checkbox' | 'radio';
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
}>;

export type ActionType =
  | 'Create'
  | 'Invite'
  | 'Edit'
  | 'Delete'
  | 'Block'
  | 'Unblock'
  | 'ResendInvitation'
  | 'Configure'
  | 'Re-Assign'
  | null;

export type IQuestionType = 'TEXT'
  | 'MULTI_SELECT'
  | 'SINGLE_SELECT'
  | 'NUMBER'
  | 'DATE'
  | 'FILE'
  | 'URL'
  | 'MIXED_TYPE'

export type IUserRole = 'GUEST'
  | 'ADMIN'
  | 'SUSTAINABILITY_MANAGER'
  | 'DATA_REVIEWER'
  | 'DATA_PROVIDER'

export type ITaskStatus = 'CREATED'
  | 'IN_PROGRESS'
  | 'SUBMITTED'
  | 'REASSIGNED'
  | 'REVIEWING'
  | 'COMPLETED'
  | 'REJECTED'

export type IDataCubeStatus = 'CREATED'
  | 'SETUP'
  | 'DATA_COLLECTING'
  | 'REPORT_GENERATED'

export type QuestionWrapperProps = Readonly<{
  label: string | ReactNode;
  children: ReactNode;
  isCustomRequired?: boolean;
  toolTip: string | null;
}>;

export type TextFieldProps = Readonly<{
  label?: string;
  type?: string;
  isValid: boolean;
  autoFocus?: boolean;
  placeholder?: string;
  component?: ReactNode;
  disabled?: boolean;
  as?: string;
  maxLength?: number;
  rightIcon?: boolean;
  icon?: React.ReactNode;
  onBlur?: () => void;
  onFocus?: () => void;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onKeyPress?: (event: React.KeyboardEvent<HTMLInputElement>) => void;
  unit?: string;
  value?: string;
  isCustomRequired?: boolean;
  className?: string;
  error?: string;
  // spellCheck?: boolean;
}>;

export const Roles = [
  'GUEST',
  'ADMIN',
  'SUSTAINABILITY_MANAGER',
  'DATA_REVIEWER',
  'DATA_PROVIDER',
];
