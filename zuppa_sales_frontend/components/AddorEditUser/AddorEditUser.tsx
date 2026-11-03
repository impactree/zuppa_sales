'use client';

import { IUser } from '@/lib/interface/IUser.interface';
import { AuthService, UserService } from '@/lib/service';
import { convertToPascalCase, userRole } from '@/lib/utils';
import {
  Field, FieldProps, Formik, FormikHelpers,
} from 'formik';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import { usePathname, useRouter } from 'next/navigation';
import { Form } from 'react-bootstrap';
import toast from 'react-hot-toast';
import { MdLockOutline, MdOutlineEdit } from 'react-icons/md';
import { isValidPhoneNumber } from 'react-phone-number-input';
import { boolean, object, string } from 'yup';
import { Button } from '../Button/Button';
import CustomSelect from '../CustomSelect/CustomSelect';
import { FormikField } from '../FormikField/FormikField';
import { FormikPhoneNumber } from '../FormikPhoneNumber/FormikPhoneNumber';
import { CustomInputField } from '../InputField/CustomInputField';
import { IUserRole, Option, Roles } from '../types';

interface AddOrEditMemberProps {
  apiKey: string;
  id: string;
  onClose?: () => void;
  isCurrentUser?: boolean;
  isResendInvitation?: boolean;
  user?: IUser;
  isInvite?: boolean;
}

interface FormValues {
  name: string;
  phone_number: string;
  email: string;
  department: string;
  isUser: boolean;
  role: IUserRole;
  id: string;
}

export const getMessage = (
  isResendInvitation: boolean,
  isCurrentUser: boolean,
  isInvite?: boolean,
): string => {
  if (isResendInvitation) {
    return 'Invitation resended';
  }
  if (isCurrentUser) {
    return 'Profile updated';
  }
  if (isInvite) {
    return 'User Invited';
  }
  return 'User Updated';
};

export const handleAddOrEditUser = async (
  values: FormValues,
  formikHelpers: FormikHelpers<FormValues>,
  router: AppRouterInstance,
  apiKey: string,
  options: {
    isResendInvitation: boolean;
    isCurrentUser: boolean;
    isInvite?: boolean;
    onClose?: () => void;
  },
) => {
  const { validateForm, setFieldError } = formikHelpers;
  const {
    isResendInvitation, isCurrentUser, isInvite, onClose,
  } = options;
  if (
    values?.phone_number?.length > 0
    && !isValidPhoneNumber(values?.phone_number)
    && !isResendInvitation
    && !isInvite
  ) {
    setFieldError('phone_number', 'Must be valid Phone Number');
  } else {
    await validateForm(values);

    let res;
    if (isInvite) {
      res = await AuthService.inviteUsers(
        [{ email: values.email, role: values?.role }],
        apiKey,
      );
    } else if (isCurrentUser) {
      res = await UserService.updateCurrentUser(
        {
          name: values.name,
          phone_number: values.phone_number || '',
        },
        apiKey,
      );
    } else if (isResendInvitation) {
      res = await AuthService.resendInvitation({
        email: values.email,
        slug: apiKey,
        id: values.id,
      });
    } else {
      res = await UserService.updateUserById(
        {
          name: values.name,
          phone_number: values.phone_number || '',
          role: values.role,
        },
        apiKey,
        values?.id,
      );
    }

    const { success, error } = res?.data as {
      success: boolean;
      error: string[];
    };

    if (success) {
      toast.success(getMessage(isResendInvitation, isCurrentUser, isInvite));
      if (onClose) onClose();
      router.refresh();
    } else {
      toast.error(error[0]);
    }
  }
};

export const getButtonText = (
  isResendInvitation: boolean,
  isCurrentUser: boolean,
  user?: IUser,
) => {
  if (isResendInvitation) {
    return {
      name: 'Resend',
      loadingName: 'Resending',
      toastmsg: 'Resended',
    };
  }
  if (isCurrentUser) {
    return {
      name: 'Update',
      loadingName: 'Updating',
      toastmsg: 'Updated',
    };
  }
  if (user) {
    return {
      name: 'Save',
      loadingName: 'Saving',
      toastmsg: 'Saved',
    };
  }
  return {
    name: 'Invite',
    loadingName: 'Inviting',
    toastmsg: 'Invited',
  };
};

export default function AddorEditUser({
  isCurrentUser = false,
  isResendInvitation = false,
  user,
  apiKey,
  onClose,
  id,
  isInvite,
}: Readonly<AddOrEditMemberProps>) {
  const router = useRouter();
  const pathname = usePathname();
  const initialValues: FormValues = {
    name: user?.name ?? '',
    phone_number: user?.phone_number ?? '',
    email: user?.email ?? '',
    isUser: isCurrentUser || !(isInvite || isResendInvitation),
    role: user?.role ?? 'SUSTAINABILITY_MANAGER',
    department: '',
    id: user?.id ?? '',
  };

  const showField = !isInvite || (!isResendInvitation && (user || isCurrentUser));
  const showEmailField = true;
  const showRoleField = isInvite || (isResendInvitation && (user || isCurrentUser));
  const disableEmail = isCurrentUser || (user && !isInvite && !isResendInvitation);
  const disableRole = isCurrentUser || isResendInvitation || user?.id === id;
  const disableName = isResendInvitation;
  const disablePhone = isResendInvitation;

  const validationSchema = object({
    email: string()
      .email('Invalid email address')
      .matches(
        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        'Invalid email format',
      )
      .when('isUser', {
        is: false,
        then: (schema) => schema.required('Email is required'),
        otherwise: (schema) => schema.notRequired(),
      }),
    phone_number: string().nullable().notRequired(),
    name: string()
      .matches(/^[a-zA-Z\s]*$/, 'Name must be contains letters and spaces')
      .max(40, 'Name must be between 3 and 40 characters')
      .min(3, 'Name must be between 3 and 40 characters')
      .matches(/^(?=.{3,40}$)/, 'Name must be between 3 and 40 characters')
      .when('isUser', {
        is: true,
        then: (schema) => schema.required('Name is required'),
        otherwise: (schema) => schema.notRequired(),
      }),
    role: string().when('isUser', {
      is: false,
      then: (schema) => schema.required('Role is required'),
      otherwise: (schema) => schema.notRequired(),
    }),
    isUser: boolean(),
  });

  const handleFormSubmit = async (
    values: FormValues,
    formikHelpers: FormikHelpers<FormValues>,
  ) => {
    await handleAddOrEditUser(values, formikHelpers, router, apiKey, {
      isResendInvitation,
      isCurrentUser,
      isInvite,
      onClose,
    });
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleFormSubmit}
      enableReinitialize
      validateOnChange={false}
    >
      {({
        errors,
        isSubmitting,
        handleSubmit: submitForm,
        setFieldValue,
        values,
        resetForm,
        dirty,
      }) => (
        <Form onSubmit={submitForm} className="w-100">
          {showField && !isResendInvitation ? (
            <div className={isCurrentUser ? '' : 'only-popup'}>
              <FormikField
                name="name"
                errors={errors as Record<string, string>}
                validationSchema={validationSchema}
                label="Name"
                type="text"
                placeholder="Enter your name"
                isCustomRequired
                onChange={(e) => {
                  const value = e.target.value.replace(/[^a-zA-Z\s]/g, '');
                  setFieldValue('name', value);
                }}
                disabled={disableName}
                icon={isCurrentUser ? <MdOutlineEdit /> : null}
                rightIcon
              />
            </div>
          ) : (
            ''
          )}
          {showEmailField && (
            <div className={isCurrentUser ? '' : 'only-popup mt-3'}>
              <FormikField
                name="email"
                errors={errors as Record<string, string>}
                validationSchema={validationSchema}
                label="Email"
                type="email"
                placeholder="Enter your email"
                isCustomRequired
                disabled={!isResendInvitation ? disableEmail : false}
                icon={isCurrentUser ? <MdLockOutline /> : null}
                rightIcon
              />
            </div>
          )}
          {showField && !isResendInvitation ? (
            <div className={isCurrentUser ? '' : 'only-popup mt-3'}>
              <FormikPhoneNumber
                name="phone_number"
                label="Phone Number"
                onChange={(phoneNumber) => {
                  setFieldValue('phone_number', phoneNumber);
                }}
                value={values?.phone_number}
                errors={errors?.phone_number}
                validationSchema={validationSchema}
                isCustomRequired={false}
                isDisabled={disablePhone}
              />
            </div>
          ) : (
            ''
          )}
          {showRoleField && (
            <div className={isCurrentUser ? '' : 'only-popup mt-3'}>
              <Field name="role" className="">
                {({ field: formikField }: FieldProps<string>) => (
                  <CustomInputField
                    validationSchema={validationSchema}
                    label="Role"
                    field={formikField}
                    error={errors?.role as string}
                    isCustomRequired
                    isSideBySide={!!pathname?.startsWith('/settings')}
                    placeholder="Enter the role"
                  >
                    <Field
                      name="role"
                      component={CustomSelect}
                      id={formikField.name}
                      onChange={(e: Option) => {
                        setFieldValue('role', e?.value);
                      }}
                      value={values?.role}
                      options={Roles?.map((role: string) => ({
                        label: convertToPascalCase(userRole(role)?.replaceAll('_', ' ')),
                        value: role as IUserRole,
                      }))}
                      isDisabled={disableRole}
                    />
                  </CustomInputField>
                )}
              </Field>
            </div>
          )}
          <div className="d-flex justify-content-end mt-5 gap-3">
            <Button
              text="Cancel"
              onClick={() => {
                if (onClose) {
                  onClose();
                }
                resetForm();
              }}
              className="w-100"
            />
            <Button
              text={
                isSubmitting
                  ? `${getButtonText(isResendInvitation, isCurrentUser, user)?.loadingName}`
                  : getButtonText(isResendInvitation, isCurrentUser, user)?.name
              }
              type="submit"
              isLoading={isSubmitting}
              isDisabled={isCurrentUser ? !dirty || isSubmitting : isSubmitting}
              isSolid
              className="w-100"
            />
          </div>
        </Form>
      )}
    </Formik>
  );
}
