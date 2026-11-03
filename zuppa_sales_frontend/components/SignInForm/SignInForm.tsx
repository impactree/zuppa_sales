'use client';

import { useDeviceDetection } from '@/hooks/useDeviceDetection';
import { Form, Formik, FormikHelpers } from 'formik';
import { getSession, signIn } from 'next-auth/react';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Stack } from 'react-bootstrap';
import { toast } from 'react-hot-toast';
import { MdArrowForward } from 'react-icons/md';
import { object, string } from 'yup';
import { Button } from '../Button/Button';
import { FormikField } from '../FormikField/FormikField';

export const handleSignInSubmit = async (
  values: { email: string; password: string },
  slug: string,
  {
    setSubmitting,
    validateForm,
    setFieldError,
  }: FormikHelpers<{ email: string; password: string }>,
  router: AppRouterInstance,
) => {
  validateForm(values);
  setSubmitting(true);

  const res = await signIn('credentials', {
    email: values.email,
    password: values.password,
    slug,
    redirect: false,
  });

  if (res?.error) {
    setFieldError('email', 'Accept Invitation / Invalid Email or Password');
    setSubmitting(false);
    return;
  }

  const session = await getSession();
  const currentStage = session?.user?.account?.current_onboarding_stage ?? -1;

  const onboardingPath = [
    '/company_profile/company_information',
    '/company_profile/business_unit',
    '/company_profile/standard_regulations',
    '/company_profile/invite_user',
    '/home',
  ];

  const adjustedStage = currentStage >= 4 ? 4 : currentStage;
  const targetPath = onboardingPath[adjustedStage];

  toast.success('Signed In');
  router.push(targetPath);
  router.refresh();

  setSubmitting(false);
};

export default function SignInForm({ slug }: Readonly<{ slug: string }>) {
  const router = useRouter();
  const { isMobileOnly } = useDeviceDetection();

  const [hideEyeIcon, setHideEyeIcon] = useState(false);

  const validationSchema = object({
    email: string()
      .email('Invalid email address')
      .matches(
        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        'Invalid email format',
      )
      .required('Email address is required'),
    password: string().required('Password is required'),
  });

  const onSubmit = async (
    values: { email: string; password: string },
    formikHelpers: FormikHelpers<{ email: string; password: string }>,
  ) => {
    await handleSignInSubmit(values, slug, formikHelpers, router);
  };

  return (
    <Formik
      initialValues={{ email: '', password: '' }}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
      validateOnChange={false}
    >
      {({ errors, handleSubmit, isSubmitting }) => (
        <Form
          onSubmit={handleSubmit}
          style={isMobileOnly ? { width: '330px' } : { width: '500px' }}
        >
          <div className="text-center  mb-4 page-header-container">
            <h5 className="page-title">Login</h5>
            <span className="page-subtitle">Access your account securely</span>
          </div>
          <div className="mt-5">
            <FormikField
              name="email"
              errors={errors}
              validationSchema={validationSchema}
              label="Email Address"
              type="email"
              placeholder="Enter your email address"
              rightIcon
            />
          </div>
          <div>
            <FormikField
              name="password"
              errors={errors}
              validationSchema={validationSchema}
              label="Password"
              type={hideEyeIcon ? 'text' : 'password'}
              isPassword
              placeholder="Enter your password"
              passwordIcon={hideEyeIcon}
              setPasswordIcon={setHideEyeIcon}
            />
          </div>
          <Stack direction="horizontal" className="justify-content-end mb-5">
            <a
              href="/forgot_password"
              className="text-decoration-none text-dark fw-400 font-size-15"
            >
              Forgot Password
            </a>
          </Stack>
          <Stack>
            <Button
              text={isSubmitting ? 'Logging in...' : 'Login to account'}
              isDisabled={isSubmitting}
              isLoading={isSubmitting}
              type="submit"
              isSolid
              className="w-100 fs-14"
              sufixIconChildren={(
                <MdArrowForward
                  size={24}
                  color="var(--icon-color)"
                  className="ms-3"
                />
              )}
            />
            {/* <a
              href={process.env.NEXT_PUBLIC_BE?.replace('api', 'app')}
              className=
              "text-decoration-none textPrimary text-center fw-600 mt-5 fs-15"
            >
              Create An account
            </a> */}
          </Stack>
        </Form>
      )}
    </Formik>
  );
}
