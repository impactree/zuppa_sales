'use client';

import { useDeviceDetection } from '@//hooks/useDeviceDetection';
import { AuthService } from '@//lib/service';
import { Form, Formik, FormikHelpers } from 'formik';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import { useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast';
import { MdArrowForward } from 'react-icons/md';
import { object, string } from 'yup';
import { Button } from '../Button/Button';
import { FormikField } from '../FormikField/FormikField';
import './ForgotPasswordForm.css';

export const handleForgotPasswordSubmit = async (
  values: { email: string },
  slug: string,
  {
    setSubmitting,
    validateForm,
    setFieldError,
  }: FormikHelpers<{ email: string }>,
  router: AppRouterInstance,
) => {
  validateForm(values);
  setSubmitting(true);
  try {
    const res = await AuthService.forgotPassword({ email: values.email, slug });
    const { success } = res?.data as { error: string[]; success: boolean };

    if (success) {
      toast.success(`Password reset link sent to mail : ${values.email}`);
      router?.push('/sign_in');
    } else {
      setFieldError('email', 'Account not found / Accept Invitation');
    }
  } catch (error) {
    setFieldError('email', 'Unexpected error occurred');
  } finally {
    setSubmitting(false);
  }
};

export default function ForgotPasswordForm({
  slug,
}: Readonly<{ slug: string }>) {
  const router = useRouter();
  const { isMobileOnly } = useDeviceDetection();

  const validationSchema = object({
    email: string()
      .email('Invalid email address')
      .required('Email address is required'),
  });

  const onSubmit = async (
    values: { email: string },
    formikHelpers: FormikHelpers<{ email: string }>,
  ) => {
    await handleForgotPasswordSubmit(values, slug, formikHelpers, router);
  };
  return (
    <Formik
      initialValues={{ email: '' }}
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
            <h5 className="page-title">Forgot password</h5>
            <span className="page-subtitle">Recover your account</span>
          </div>
          <div className="mt-5">
            <FormikField
              name="email"
              errors={errors}
              validationSchema={validationSchema}
              label="Email Address"
              type="email"
              placeholder="Enter Email Address"
              rightIcon
              // icon={<MdOutlineMail size={20} color="var(--icon-color)" />}
            />
          </div>
          <div>
            <Button
              text={isSubmitting ? 'Reseting...' : 'Reset Link'}
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
          </div>
          <div className=" d-flex justify-content-center mt-4">
            <a
              href="/sign_in"
              className="text-decoration-none text-dark fw-400 font-size-15 "
            >
              Back
            </a>
          </div>
        </Form>
      )}
    </Formik>
  );
}
