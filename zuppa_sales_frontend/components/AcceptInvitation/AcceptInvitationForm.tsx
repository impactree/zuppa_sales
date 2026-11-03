'use client';

import { useDeviceDetection } from '@/hooks/useDeviceDetection';
import { IAccount } from '@/lib/interface/IAccount.interface';
import { IUser } from '@/lib/interface/IUser.interface';
import { AuthService } from '@/lib/service';
import { Form, Formik, FormikHelpers } from 'formik';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { MdArrowForward } from 'react-icons/md';
import { isValidPhoneNumber } from 'react-phone-number-input';
import { boolean, object, string } from 'yup';
import { Button } from '../Button/Button';
import CustomCheckbox from '../Checkbox/Checkbox';
import { FormikField } from '../FormikField/FormikField';
import { FormikPhoneNumber } from '../FormikPhoneNumber/FormikPhoneNumber';
import './AcceptInvitationForm.css';

interface IFields {
  email: string;
  name: string;
  company_name: string;
  phone_number: string;
  password: string;
  confirm_password: string;
  accept_terms_and_conditions: boolean;
  isAccount: boolean;
}

export const handleSubmitAcceptInvitation = async (
  values: IFields,
  slug: string,
  token: string,
  { validateForm, setFieldError }: FormikHelpers<IFields>,
  router: AppRouterInstance,
  isAccount: boolean,
) => {
  if (
    values?.phone_number?.length > 0
    && !isValidPhoneNumber(values?.phone_number)
  ) {
    setFieldError('phone_number', 'Must be valid Phone Number');
  } else {
    await validateForm(values);
    const res = isAccount
      ? await AuthService.acceptInvitationByAdmin(token, slug, {
        password: values?.password,
        confirm_password: values?.password,
        accept_terms_and_conditions: values.accept_terms_and_conditions,
      })
      : await AuthService.acceptInvitation(token, slug, {
        ...values,
        confirm_password: values?.password,
      });
    const { success, error } = res?.data as {
      success: boolean;
      error: string[];
    };
    if (success) {
      toast.success('Invitation Accepted!');
      router.push('/sign_in');
    } else {
      toast.error(error[0]);
    }
  }
};

export default function AcceptInvitationForm({
  isAccount,
  slug,
  token,
  user,
  account,
}: Readonly<{
  isAccount: boolean;
  slug: string;
  token: string;
  user: IUser;
  account?: IAccount;
}>) {
  const router = useRouter();
  const [newPasswordVisible, setNewPasswordVisible] = useState(false);
  const { isMobileOnly } = useDeviceDetection();

  const validationSchema = object({
    name: string()
      .matches(/^[a-zA-Z\s]*$/, 'Name must be contains letters and spaces')
      .max(40, 'Name must be between 3 and 40 characters')
      .min(3, 'Name must be between 3 and 40 characters')
      .matches(/^(?=.{3,40}$)/, 'Name must be between 3 and 40 characters')
      .trim()
      .when('isAccount', {
        is: false,
        then: (schema) => schema.required('Name is required'),
        otherwise: (schema) => schema.notRequired(),
      }),
    phone_number: string().notRequired(),
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
    accept_terms_and_conditions: boolean()
      .oneOf([true], 'Agree Terms and Conditions is required')
      .required('Agree Terms and Conditions is required'),
    isAccount: boolean().required(''),
  });

  const onSubmit = async (
    values: IFields,
    formikHelpers: FormikHelpers<IFields>,
  ) => {
    await handleSubmitAcceptInvitation(
      values,
      slug,
      token,
      formikHelpers,
      router,
      isAccount,
    );
  };

  return (
    <Formik
      initialValues={{
        email: user?.email ?? '',
        name: user?.name ?? '',
        company_name: account?.name ?? user?.account?.account_name ?? '',
        phone_number: user?.phone_number ?? '',
        password: '',
        confirm_password: '',
        accept_terms_and_conditions: false,
        isAccount,
      }}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
      validateOnChange={false}
    >
      {({
        handleSubmit, errors, isSubmitting, setFieldValue,
      }) => (
        <Form
          onSubmit={handleSubmit}
          style={
            isMobileOnly ? { width: '330px', paddingTop: '80px' } : { width: '500px' }
          }
        >
          <div className="text-center mb-4 page-header-container">
            <h5 className="page-title">Complete Registration</h5>
            <span className="page-subtitle">Join and start exploring</span>
          </div>
          <div className="mt-5">
            <FormikField
              name="company_name"
              errors={errors}
              validationSchema={validationSchema}
              label="Company Name"
              type="text"
              placeholder="Enter your Company Name"
              isCustomRequired
              disabled
            />
          </div>
          {!isAccount && (
          <div>
            <FormikField
              name="email"
              errors={errors}
              validationSchema={validationSchema}
              label="Email Address"
              type="text"
              placeholder="Enter your Email Address"
              isCustomRequired
              disabled
            />
          </div>
          )}
          {!isAccount && (
          <div>
            <FormikField
              name="name"
              errors={errors}
              validationSchema={validationSchema}
              label="Enter Your Name"
              type="text"
              placeholder="Enter your Name"
              isCustomRequired
              onChange={(e) => {
                const value = e.target.value.replace(/[^a-zA-Z\s]/g, '');
                setFieldValue('name', value);
              }}
            />
          </div>
          )}
          {/* {!isAccount && (
            <FormikField
              name="department"
              errors={errors}
              validationSchema={validationSchema}
              label="Department"
              type="text"
              placeholder="Enter your Department"
              isCustomRequired
              disabled
            />
          )} */}

          {!isAccount && (
          <div>
            <FormikPhoneNumber
              name="phone_number"
              label="Phone Number"
              errors={errors?.phone_number}
              validationSchema={validationSchema}
              isCustomRequired={false}
            />
          </div>
          )}
          <div>
            <FormikField
              name="password"
              errors={errors}
              validationSchema={validationSchema}
              label="Enter Password"
              type={newPasswordVisible ? 'text' : 'password'}
              setPasswordIcon={setNewPasswordVisible}
              passwordIcon={newPasswordVisible}
              isPassword
              placeholder="Enter your New password"
            />
          </div>
          <div className="mt-3">
            <CustomCheckbox
              name="accept_terms_and_conditions"
              label={(
                <span className="agree-terms">
                  I agree to your terms and conditions
                </span>
              )}
              type="checkbox"
              validationSchema={validationSchema}
              errors={errors}
            />
            <div className="d-flex justify-content-center accept-invitation-btn-container">
              <Button
                text={isSubmitting ? 'Completing...' : 'Let me in'}
                isLoading={isSubmitting}
                isDisabled={isSubmitting}
                type="submit"
                isSolid
                className="w-100 accept-invitation-btn mb-5"
                sufixIconChildren={(
                  <MdArrowForward
                    size={24}
                    color="var(--icon-color)"
                    className="ms-3"
                  />
                )}
              />
            </div>
            {/* <p className="text-center fs-15 fw-600 signin-link">
              Already have account?
              {' '}

              <Link href="/sign_in" className="textSecondary text-decoration-none">Login</Link>
            </p> */}
          </div>
        </Form>
      )}
    </Formik>
  );
}
