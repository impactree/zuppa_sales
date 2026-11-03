'use client';

import { AuthService, UserService } from '@/lib/service';
import { Form, Formik, FormikHelpers } from 'formik';
import { signOut } from 'next-auth/react';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { object, ref, string } from 'yup';
import { Button } from '../Button/Button';
import { FormikField } from '../FormikField/FormikField';
import './ChangePassword.css';

interface IFields {
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
}

export const handleChangePassword = async (
  values: IFields,
  slug: string,
  helpers: FormikHelpers<IFields>,
  router: AppRouterInstance,
) => {
  await helpers.validateForm(values);
  const res = await UserService.changePassword({
    oldPassword: values.oldPassword,
    password: values.newPassword,
    passwordConfirmation: values.confirmPassword,
  }, slug);

  const { success, error } = res?.data as {
    success: boolean;
    error: string[];
  };

  if (success) {
    toast.success('Password updated successfully');
    await AuthService.logout({ slug });
    signOut({ redirect: false });
    router.push('/sign_in');
  } else {
    toast.error(error[0]);
  }
};

export default function ChangePassword({ slug }: Readonly<{ slug: string }>) {
  const router = useRouter();
  const [oldPasswordVisible, setOldPasswordVisible] = useState(false);
  const [newPasswordVisible, setNewPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);

  const validationSchema = object({
    oldPassword: string()
      .required('Old password is required')
      .max(18, 'Password must be between 8 and 18 characters')
      .min(8, 'Password must be between 8 and 18 characters')
      .matches(/^(?=.{8,18}$)/, 'Password must be between 8 and 18 characters')
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])/,
        'Must contains uppercase, special character and number',
      )
      .matches(
        /^(?=.*?[!"#$%&'()*+,-./:;<=>?@_`{}~])/,
        'Must contains uppercase, special character and number',
      )
      .matches(
        /^(?=.*\d)/,
        'Must contains uppercase, special character and number',
      ),
    newPassword: string()
      .max(18, 'Password must be between 8 and 18 characters')
      .min(8, 'Password must be between 8 and 18 characters')
      .matches(/^(?=.{8,18}$)/, 'Password must be between 8 and 18 characters')
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])/,
        'Must contains uppercase, special character and number',
      )
      .matches(
        /^(?=.*?[!"#$%&'()*+,-./:;<=>?@_`{}~])/,
        'Must contains uppercase, special character and number',
      )
      .matches(
        /^(?=.*\d)/,
        'Must contains uppercase, special character and number',
      )
      .notOneOf([ref('oldPassword')], 'Old Password must not match')
      .required('New password is required'),
    confirmPassword: string()
      .oneOf([ref('newPassword')], 'Passwords must match')
      .required('Please confirm your password'),
  });

  const onSubmit = async (
    values: IFields,
    formikHelpers: FormikHelpers<IFields>,
  ) => {
    await handleChangePassword(values, slug, formikHelpers, router);
  };

  return (
    <Formik
      initialValues={{
        oldPassword: '',
        newPassword: '',
        confirmPassword: '',
      }}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
      validateOnChange={false}
    >
      {({
        isSubmitting, errors, handleSubmit, resetForm, dirty,
      }) => (
        <Form onSubmit={handleSubmit}>
          <FormikField
            name="oldPassword"
            errors={errors}
            validationSchema={validationSchema}
            label="Old Password"
            type={oldPasswordVisible ? 'text' : 'password'}
            setPasswordIcon={setOldPasswordVisible}
            passwordIcon={oldPasswordVisible}
            isPassword
            placeholder="Enter your old password"
          />
          <FormikField
            name="newPassword"
            errors={errors}
            validationSchema={validationSchema}
            label="New Password"
            type={newPasswordVisible ? 'text' : 'password'}
            setPasswordIcon={setNewPasswordVisible}
            passwordIcon={newPasswordVisible}
            isPassword
            placeholder="Enter your New password"
          />
          <FormikField
            name="confirmPassword"
            errors={errors}
            validationSchema={validationSchema}
            label="Confirm Password"
            type={confirmPasswordVisible ? 'text' : 'password'}
            setPasswordIcon={setConfirmPasswordVisible}
            passwordIcon={confirmPasswordVisible}
            isPassword
            placeholder="Enter your Confirm password"
          />

          <div className="d-flex justify-content-end gap-3 mt-3">
            <div>
              <Button
                text="Cancel"
                onClick={() => resetForm()}
                className="w-100"
              />
            </div>
            <Button
              isDisabled={isSubmitting || !dirty}
              isLoading={isSubmitting}
              text="Update Password"
              variant="primary"
              type="submit"
              className="w-100"
              isSolid
            />
          </div>
        </Form>
      )}
    </Formik>
  );
}
