'use client';

import { useDeviceDetection } from '@/hooks/useDeviceDetection';
import { AuthService } from '@/lib/service';
import { Form, Formik, FormikHelpers } from 'formik';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Stack } from 'react-bootstrap';
import { toast } from 'react-hot-toast';
import { MdArrowForward } from 'react-icons/md';
import { object, ref, string } from 'yup';
import { Button } from '../Button/Button';
import { FormikField } from '../FormikField/FormikField';

export const handleResetPasswordSubmit = async (
  values: {
    password: string;
    confirmPassword: string;
  },
  slug: string,
  token: string,
  {
    setSubmitting,
    validateForm,
  }: FormikHelpers<{
    password: string;
    confirmPassword: string;
  }>,
  router: AppRouterInstance,
) => {
  validateForm(values);
  setSubmitting(true);
  const res = await AuthService.resetPassword({
    password: values.password,
    passwordConfirmation: values?.confirmPassword,
    token,
    slug,
  });
  const { success } = res?.data as { error: string[]; success: boolean };
  if (success) {
    toast.success('Password Updated');
  }
  router.push('/sign_in');
  setSubmitting(false);
};

export default function ResetPasswordForm({
  slug,
  token,
}: Readonly<{
  slug: string;
  token: string;
}>) {
  const router = useRouter();
  const { isMobileOnly } = useDeviceDetection();

  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);

  const validationSchema = object({
    password: string()
      .max(40, 'Password must be between 8 and 40 characters')
      .min(8, 'Password must be between 8 and 40 characters')
      .matches(/^(?=.{8,40}$)/, 'Password must be between 8 and 40 characters')
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
      .required('New password is required'),
    confirmPassword: string()
      .oneOf([ref('password')], 'Confirm password must match')
      .required('Confirm password is required'),
  });
  const onSubmit = async (
    values: {
      password: string;
      confirmPassword: string;
    },
    formikHelpers: FormikHelpers<{
      password: string;
      confirmPassword: string;
    }>,
  ) => {
    await handleResetPasswordSubmit(values, slug, token, formikHelpers, router);
  };
  return (
    <Formik
      initialValues={{
        password: '',
        confirmPassword: '',
      }}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
      validateOnChange={false}
    >
      {({ errors, handleSubmit, isSubmitting }) => (
        <Form
          onSubmit={handleSubmit}
          style={isMobileOnly ? { width: '330px' } : { width: '500px' }}
        >
          <div className="text-center mb-4 page-header-container">
            <h5 className="page-title">Reset password</h5>
            <span className="page-subtitle">Please set a new password</span>
          </div>
          <div className="mt-5">
            <FormikField
              name="password"
              errors={errors}
              validationSchema={validationSchema}
              label="Enter New Password"
              type={passwordVisible ? 'text' : 'password'}
              setPasswordIcon={setPasswordVisible}
              passwordIcon={passwordVisible}
              isPassword
              placeholder="Enter New Password"
            />
          </div>
          <div>
            <FormikField
              name="confirmPassword"
              errors={errors}
              validationSchema={validationSchema}
              label="Re-Enter New Password"
              type={confirmPasswordVisible ? 'text' : 'password'}
              setPasswordIcon={setConfirmPasswordVisible}
              passwordIcon={confirmPasswordVisible}
              isPassword
              placeholder="Re-Enter New Password"
            />
          </div>
          <Stack>
            <Button
              text={isSubmitting ? 'Reseting...' : 'Update Password'}
              isDisabled={isSubmitting}
              isLoading={isSubmitting}
              type="submit"
              isSolid
              className="w-100"
              sufixIconChildren={(
                <MdArrowForward
                  size={24}
                  color="var(--icon-color)"
                  className="ms-3"
                />
              )}
            />
          </Stack>
        </Form>
      )}
    </Formik>
  );
}
