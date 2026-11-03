/* eslint-disable no-plusplus */
/* eslint-disable no-await-in-loop */
/* eslint-disable @typescript-eslint/no-explicit-any */

'use client';

import {
  Form, Formik, FormikErrors, FormikHelpers,
} from 'formik';
import { debounce } from 'lodash';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';
// import Link from 'next/link';
import { useDeviceDetection } from '@/hooks/useDeviceDetection';
import { AuthService } from '@/lib/service';
import { getDomainFromSubdomain } from '@/lib/utils';
import { useRouter } from 'next/navigation';
import {
  ChangeEvent, useCallback, useEffect, useState,
} from 'react';
import toast from 'react-hot-toast';
import { MdArrowForward, MdBuild } from 'react-icons/md';
import { boolean, object, string } from 'yup';
import { Button } from '../Button/Button';
import CustomCheckbox from '../Checkbox/Checkbox';
import { FormikField } from '../FormikField/FormikField';
import './SignUpForm.css';

interface IField {
  fullname: string;
  email: string;
  password: string;
  company_name: string;
  workspace_url: string;
  terms: string;
}

export const handleSignUpSubmit = async (
  values: IField,
  { setSubmitting }: FormikHelpers<IField>,
  router: AppRouterInstance,
  setDetails: (details: { email: string; slug: string }) => void,
) => {
  setSubmitting(true);
  const res = await AuthService.signUp({
    name: values.fullname,
    account_name: values.company_name,
    slug: `${values.workspace_url}`,
    email: values.email,
    password: values.password,
  });
  const { success, error } = res?.data as { error: string[]; success: boolean };
  if (success) {
    setDetails({
      email: values.email,
      slug: values.workspace_url,
    });
    toast.success('User Registered');
    router.refresh();
  } else {
    toast.error(error[0]);
  }
  setSubmitting(false);
};

export default function SignUpForm() {
  const router = useRouter();
  // const { isMobile } = useDeviceDetection();
  const { isMobileOnly } = useDeviceDetection();

  const [hideEyeIcon, setHideEyeIcon] = useState(false);
  const [isManual, setIsManual] = useState<boolean>(false);
  const [details, setDetails] = useState({
    email: '',
    slug: '',
  });
  const [resendCooldown, setResendCooldown] = useState<number>(0);
  const [redirectTimer, setRedirectTimer] = useState<number>();

  const resedInvitation = async () => {
    const response = await AuthService?.resendInvitationForSignUp({
      email: details?.email,
      slug: details?.slug,
    });
    const { success, error } = response?.data as unknown as {
      success: boolean;
      message: string;
      error: string | string[];
    };

    if (success) {
      toast.success('Account re-invited');
      setResendCooldown(60);
    } else if (error[0] === 'ONLY PENDING ACCOUNTS CAN BE RE-INVITED') {
      toast.error('Account is already activated');
    } else {
      toast.error('Account not active');
    }
  };

  useEffect(() => {
    let interval: NodeJS.Timeout | undefined;
    if (resendCooldown > 0) {
      interval = setInterval(() => {
        setResendCooldown((prev) => prev - 1);
      }, 1000);
    }
    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [resendCooldown]);

  useEffect(() => {
    let interval: NodeJS.Timeout | undefined;
    if (redirectTimer && redirectTimer > 0) {
      interval = setInterval(() => {
        setRedirectTimer((prev) => prev && prev - 1);
      }, 1000);
    } else if (redirectTimer === 0) {
      router.push('/sign_in');
    }
    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [redirectTimer]);

  const validationSchema = object({
    fullname: string()
      .matches(/^[a-zA-Z\s]*$/, 'Name must be contains letters and spaces')
      .required('Full Name is required')
      .min(3, 'Minimum 3 characters required')
      .max(50, 'Do not more than 50 characters'),
    company_name: string()
      .required('Company Name is required')
      .min(2, 'Minimum 2 characters required')
      .max(50, 'Do not more than 50 characters'),
    workspace_url: string()
      .max(20, 'Workspace URL must be between 4 and 20 characters')
      .min(4, 'Workspace URL must be between 4 and 20 characters')
      .matches(
        /^(?=.{4,20}$)/,
        'Workspace URL must be between 4 and 20 characters',
      )
      .required('Workspace URL is required'),
    email: string()
      .email('Invalid email address')
      .matches(
        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        'Invalid email format',
      )
      .required('Email address is required'),
    password: string()
      .min(8, 'Minimum 8 characters required')
      .max(16, 'Do not more than 16 characters')
      .matches(
        /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[\W_]).{8,16}$/,
        'Password Must contains uppercase,lowercase,special character and number',
      )
      .required('Password is required'),
    terms: boolean()
      .oneOf([true], 'Agree Terms and Conditions is required')
      .required('Agree Terms and Conditions is required'),
  });

  const onSubmit = async (
    values: IField,
    formikHelpers: FormikHelpers<IField>,
  ) => {
    formikHelpers.validateForm(values);
    await handleSignUpSubmit(values, formikHelpers, router, setDetails);
  };

  const setError = (message: string, setFieldError?: any) => {
    if (setFieldError) {
      setFieldError('slug', message);
    }
  };

  const verifySlug = async (
    valueslug: string,
    setFieldValue?: (
      field: string,
      value: any,
      shouldValidate?: boolean
    ) => Promise<void | FormikErrors<IField>> | undefined,
    setFieldError?: (field: string, message: string | undefined) => void,
  ) => {
    if (valueslug.length < 4) {
      setError(
        'Workspace URL must be between 4 and 20 characters',
        setFieldError,
      );
      return;
    }
    let counter = 1;
    let generatedSlug = valueslug;
    const baseSlug = valueslug.replace(/[^A-Za-z0-9]/g, '');
    setError('', setFieldError);
    try {
      let res = await AuthService.slugVerify(generatedSlug);
      let { success } = res?.data as {
        success: boolean;
      };
      if (success) {
        setError('', setFieldError);
        return;
      }
      setError('Workspace URL already taken', setFieldError);
      while (!success && counter <= 100) {
        generatedSlug = `${baseSlug}${counter}`;
        res = await AuthService.slugVerify(generatedSlug);
        ({ success } = res?.data ?? {});

        if (success) {
          setError('', setFieldError);
          if (setFieldValue) {
            await setFieldValue('workspace_url', generatedSlug);
          }
          return;
        }
        counter += 1;
      }

      if (counter > 100) {
        setError(
          'Could not generate a unique slug after multiple attempts.',
          setFieldError,
        );
      }
    } catch (error) {
      setError('An error occurred while verifying the slug.', setFieldError);
    }
  };

  const formatSlugName = (inputName: string) => {
    const cleanName = (name: string) => name
      .trim()
      .toLowerCase()
      .replace(/[^a-z0-9\s]/g, '');

    const limitLength = (
      text: string,
      maxLength: number,
    ) => (text.length > maxLength ? text.slice(0, maxLength) : text);

    const buildShortName = (words: string[], maxLength: number) => {
      let result = words[0] || '';
      for (let i = 1; i < words.length && result.length < maxLength; i++) {
        result += words[i].slice(0, maxLength - result.length);
      }
      return limitLength(result, maxLength);
    };

    const createInitials = (words: string[], maxLength: number) => limitLength(words.map((word) => word.charAt(0)).join(''), maxLength);

    const name = cleanName(inputName);
    const words = name.split(' ').filter(Boolean);

    // Check for single-word names longer than 10 characters
    if (!name.includes(' ') && name.length > 10) {
      return limitLength(name, 10);
    }

    // Handle names with 1 to 3 words
    if (words.length >= 1 && words.length <= 3) {
      return buildShortName(words, 10);
    }

    // Handle names with more than 3 words
    if (words.length > 3) {
      return createInitials(words, 10);
    }

    // Fallback case: If none of the conditions match, return the cleaned name with a length limit
    return limitLength(name, 10);
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debouncedVerifySlug = useCallback(
    debounce((formattedValue, setFieldValue, setFieldError) => {
      verifySlug(formattedValue, setFieldValue, setFieldError);
    }, 1000),
    [],
  );

  const handleOrganisationChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    setFieldValue: (
      field: string,
      value: any,
      shouldValidate?: boolean
    ) => Promise<void | FormikErrors<IField>> | undefined,
    setFieldError: (field: string, message: string | undefined) => void,
  ) => {
    let value = e?.target?.value;
    if (value.startsWith(' ')) {
      value = value.trimStart();
    }

    if (!isManual) {
      const formattedValue = formatSlugName(value);
      debouncedVerifySlug(formattedValue, setFieldValue, setFieldError);
      setFieldValue('workspace_url', formattedValue);
    }

    setFieldValue('company_name', value);
  };

  return (
    <div
      style={
        isMobileOnly
          ? { width: '330px', paddingTop: '80px' }
          : { width: '500px' }
      }
      className="signup-form-scroll"
    >
      <div className="text-center mb-4 page-header-container">
        <h5 className="page-title">
          {!details?.email ? 'Create an Account' : 'Verify Account'}
        </h5>
        <span className="page-subtitle">
          {!details?.email
            ? 'Create your Rubicr account today and get started'
            : 'Confirm your account'}
        </span>
      </div>
      <div className="mt-5">
        {details?.email === '' ? (
          <Formik
            initialValues={{
              fullname: '',
              company_name: '',
              workspace_url: '',
              email: '',
              password: '',
              terms: '',
            }}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
            validateOnChange={false}
          >
            {({
              values,
              errors,
              handleSubmit,
              isSubmitting,
              setFieldValue,
              setFieldError,
            }) => (
              <Form onSubmit={handleSubmit}>
                <div>
                  <FormikField
                    name="fullname"
                    errors={errors}
                    validationSchema={validationSchema}
                    label="Full Name"
                    type="text"
                    placeholder="Enter your Full Name"
                  />
                </div>
                <div>
                  <FormikField
                    name="company_name"
                    label="Company Name"
                    type="text"
                    placeholder="Enter your Company Name"
                    value={values.company_name}
                    onChange={(e) => {
                      handleOrganisationChange(e, setFieldValue, setFieldError);
                    }}
                    validationSchema={validationSchema}
                    errors={errors}
                    icon={<MdBuild />}
                  />
                </div>
                <div>
                  <FormikField
                    name="workspace_url"
                    label="Workspace URL"
                    type="text"
                    placeholder="Enter your Workspace URL"
                    rightIcon
                    icon={<span className="fs-14">{`.${getDomainFromSubdomain(window.location.hostname)}`}</span>}
                    value={values.workspace_url}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => {
                      setIsManual(true);
                      const slugValue = e?.target?.value?.replace(
                        /[^A-Za-z0-9]/g,
                        '',
                      );
                      setFieldValue('workspace_url', slugValue);
                      if (slugValue?.length > 3) {
                        verifySlug(slugValue, undefined, setFieldError);
                      }
                    }}
                    disabled={!values?.company_name}
                    validationSchema={validationSchema}
                    errors={errors}
                  />
                </div>
                <div>
                  <FormikField
                    name="email"
                    errors={errors}
                    validationSchema={validationSchema}
                    label="Email Address"
                    type="email"
                    placeholder="Enter your email address"
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
                <div className="mt-2 mb-5 position-relative">
                  <CustomCheckbox
                    name="terms"
                    label={(
                      <span className="agree-terms">
                        I agree to your terms and conditions
                        {/* {' '}
                          <Link href="#" className="textSecondary">Terms and Conditions</Link> */}
                      </span>
                    )}
                    type="checkbox"
                    errors={errors}
                    validationSchema={validationSchema}
                  />
                </div>
                <div className="d-flex justify-content-center signup-btn-container">
                  <Button
                    text={isSubmitting ? 'Saving...' : 'Save & Proceed'}
                    isDisabled={isSubmitting}
                    isLoading={isSubmitting}
                    type="submit"
                    isSolid
                    className="w-100 mt-0 signup-btn"
                    sufixIconChildren={(
                      <MdArrowForward
                        size={24}
                        color="var(--icon-color)"
                        className="ms-3"
                      />
                    )}
                  />
                </div>
              </Form>
            )}
          </Formik>
        ) : (
          <div>
            <div className="magic-link-text text-center text-uppercase">
              Check your mail for Magic link
            </div>
            {/* <Button
              type="button"
              text="Check your mail for Magic link"
              isSolid
              className="w-100 mt-3"
            /> */}
            <p className="mt-2 text-center fw-500 fs-14">
              Not Received Yet!
              {' '}
              <span
                aria-hidden
                className="cursor-pointer text-decoration-underline fw-600"
                onClick={() => (resendCooldown === 0 ? resedInvitation() : null)}
              >
                {resendCooldown > 0
                  ? `Resend ${resendCooldown}s`
                  : 'Resend Link'}
              </span>
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
