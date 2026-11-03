/* eslint-disable no-param-reassign */
/* eslint-disable @typescript-eslint/no-explicit-any */

'use client';

import { useDeviceDetection } from '@/hooks/useDeviceDetection';
import { IAccount } from '@/lib/interface/IAccount.interface';
import { AuthService } from '@/lib/service';
import {
  Field, FieldProps, Form, Formik, FormikHelpers,
} from 'formik';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect } from 'react';
import toast from 'react-hot-toast';
import { MdArrowForward, MdOutlineEdit } from 'react-icons/md';
import { isValidPhoneNumber } from 'react-phone-number-input';
import { array, object, string } from 'yup';
import { Button } from '../Button/Button';
import { useUser } from '../Context/userProvider';
import { FormikField } from '../FormikField/FormikField';
import { FormikPhoneNumber } from '../FormikPhoneNumber/FormikPhoneNumber';
import IndustriesSelect from '../IndustriesSelect/IndustriesSelect';
import { CustomInputField } from '../InputField/CustomInputField';
import SectorSelect from '../SectorSelect/SectorSelect';
import { Option } from '../types';
import './CompanyInformationForm.css';

interface CompanyInformation {
  company_name: string;
  official_email_id: string;
  sectors: string[];
  industries: string[];
  company_website_url: string;
  phone_number: string;
  address: string;
  tax_id: string;
  standards: string[];
  time_frame: string;
}

const handleCompanyProfileSubmit = async (
  values: CompanyInformation,
  slug: string,
  {
    setSubmitting,
    validateForm,
    setFieldError,
  }: FormikHelpers<CompanyInformation>,
  router: AppRouterInstance,
  isSettings: boolean,
) => {
  if (
    values?.phone_number?.length > 0
    && !isValidPhoneNumber(values?.phone_number)
  ) {
    setFieldError('phone_number', 'Must be valid Phone Number');
  } else {
    validateForm(values);
    if (!values.phone_number) delete (values as any).phone_number;
    if (!values.tax_id) delete (values as any).tax_id;
    setSubmitting(true);
    const res = await AuthService.companyInformation(values, slug, {
      onboarding: !isSettings,
    });
    const { success, error } = res?.data as {
      error: string[];
      success: boolean;
    };
    if (success) {
      toast.success('Company Information Registered');
      if (!isSettings) {
        router.push('/company_profile/business_unit');
      }
      router.refresh();
    } else {
      toast.error(error[0]);
    }
    setSubmitting(false);
  }
};

export default function CompanyInformationForm({
  slug,
  account,
}: Readonly<{ slug: string; account?: IAccount | null }>) {
  const context = useUser();
  const { isMobileOnly } = useDeviceDetection();
  const pathname = usePathname();
  const router = useRouter();
  const isSettings = pathname?.startsWith('/settings');

  useEffect(() => {
    if (!context?.currentRole) {
      context?.getCurrentRoleAccess();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const hasAccess = context?.currentRole?.ORGANIZATION?.includes('UPDATE');

  const validationSchema = object({
    company_name: string()
      .required('Company name is required')
      .min(2, 'Minimum 2 characters required')
      .max(50, 'Do not more than 50 characters'),
    official_email_id: string()
      .email('Invalid email address')
      .matches(/^[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}$/, 'Invalid email format')
      .required('Official email id is required'),
    sectors: array()
      .min(1, 'Sector selection is required')
      .required('Sector selection is required'),
    industries: array()
      .min(1, 'Industry selection is required')
      .required('Industry selection is required'),
    company_website_url: string()
      .matches(
        /^(https?:\/\/)?([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,6}(\/[a-zA-Z0-9\-_/]*)?$/,
        'Enter a valid website URL',
      )
      .required('Company website URL is required'),
    phone_number: string().nullable().notRequired(),
    address: string().required('Address is required'),
    tax_id: string()
      .nullable()
      .test(
        'tax-id-format',
        'Invalid Tax ID format',
        (value) => !value || /^\d{2}[A-Z]{5}\d{4}[A-Z][1-9A-Z]Z[0-9A-Z]$/.test(value),
      )
      .notRequired(),
  });

  const onSubmit = async (
    values: CompanyInformation,
    formikHelpers: FormikHelpers<CompanyInformation>,
  ) => {
    if (
      values?.phone_number?.length > 0
      && !isValidPhoneNumber(values?.phone_number)
    ) {
      formikHelpers.setFieldError('phone_number', 'Must be valid Phone Number');
    }
    const transformedValues = {
      ...values,
      sectors: Array.isArray(values.sectors)
        ? values.sectors
        : [values.sectors],
    };
    await handleCompanyProfileSubmit(
      transformedValues,
      slug,
      formikHelpers,
      router,
      isSettings,
    );
  };
  const initialValues = {
    company_name: account?.account_name ?? '',
    official_email_id: account?.official_email_id ?? '',
    sectors: account?.sectors || [],
    industries: account?.industries ?? [],
    company_website_url: account?.website_url ?? '',
    phone_number: account?.phone_number ?? '',
    address: account?.address ?? '',
    tax_id: account?.tax_id ?? '',
    standards: ['BRSR'],
    time_frame: 'quarter',
  };

  const className = () => {
    if (isMobileOnly) {
      return { width: '290px' };
    }
    if (isSettings) {
      return { width: '100%' };
    }
    return { width: '700px' };
  };

  return (
    <div style={className()}>
      {isSettings ? (
        ''
      ) : (
        <div className="text-center mb-4 company-profile-header mb-4">
          <h5 className="page-title">Enter your Company Details</h5>
          <span className="page-subtitle">
            Please provide your company information
          </span>
        </div>
      )}
      <div className="mt-5">
        <Formik
          initialValues={initialValues}
          onSubmit={onSubmit}
          validationSchema={validationSchema}
          validateOnChange={false}
          enableReinitialize
        >
          {({
            errors,
            handleSubmit,
            isSubmitting,
            values,
            setFieldValue,
            resetForm,
            dirty,
          }) => (
            <Form onSubmit={handleSubmit}>
              <div className="row mt-0">
                <div className={isSettings ? 'col-lg-12' : 'col-12 col-lg-6'}>
                  <div>
                    <FormikField
                      name="company_name"
                      label="Company Name"
                      placeholder="Enter your company name"
                      type="text"
                      validationSchema={validationSchema}
                      errors={errors}
                      icon={isSettings ? <MdOutlineEdit /> : ''}
                      rightIcon={!!isSettings}
                      disabled={!hasAccess}
                    />
                  </div>
                </div>
                <div className={isSettings ? 'col-lg-12' : 'col-12 col-lg-6'}>
                  <div>
                    <Field name="sectors">
                      {({ field: formikField }: FieldProps<string>) => (
                        <CustomInputField
                          validationSchema={validationSchema}
                          label="Sector Type"
                          field={formikField}
                          error={errors.sectors as string}
                          isSideBySide={!!isSettings}
                          placeholder="Enter sector type"
                        >
                          <Field
                            name={formikField.name}
                            component={SectorSelect}
                            id={formikField.name}
                            value={values?.sectors}
                            onChange={(e: Option) => setFieldValue(formikField.name, [e?.value])}
                            isMulti={false}
                            slug={slug}
                            isDisabled={!hasAccess}
                          />
                        </CustomInputField>
                      )}
                    </Field>
                  </div>
                </div>
              </div>
              <div className={`row ${isSettings ? 'mt-0' : 'mt-2'}`}>
                <div className={isSettings ? 'col-lg-12' : 'col-12 col-lg-6'}>
                  <div>
                    <FormikField
                      name="official_email_id"
                      label="Official Mail ID"
                      placeholder="Enter Offical Mail ID"
                      type="email"
                      validationSchema={validationSchema}
                      errors={errors}
                      icon={isSettings ? <MdOutlineEdit /> : ''}
                      rightIcon={!!isSettings}
                      disabled={!hasAccess}
                    />
                  </div>
                </div>
                <div className={isSettings ? 'col-lg-12' : 'col-12 col-lg-6'}>
                  <div>
                    <Field name="industries">
                      {({ field: formikField }: FieldProps<string>) => (
                        <CustomInputField
                          validationSchema={validationSchema}
                          label="Industry Type"
                          field={formikField}
                          error={errors.industries as string}
                          isSideBySide={!!isSettings}
                          placeholder="Enter industry type"
                        >
                          <Field
                            name={formikField.name}
                            component={IndustriesSelect}
                            id={formikField.name}
                            value={values?.industries}
                            onChange={(e: Option[]) => {
                              setFieldValue(
                                formikField.name,
                                e?.map((item) => item?.value),
                              );
                            }}
                            isMulti
                            slug={slug}
                            sectorId={values?.sectors[0]}
                            isDisabled={!hasAccess}
                          />
                        </CustomInputField>
                      )}
                    </Field>
                  </div>
                </div>
              </div>
              <div className={`row ${isSettings ? 'mt-0' : 'mt-2'}`}>
                <div className={isSettings ? 'col-lg-12' : 'col-12 col-lg-6'}>
                  <div>
                    <FormikField
                      name="company_website_url"
                      label="Website"
                      placeholder="Enter Company Website"
                      type="text"
                      validationSchema={validationSchema}
                      errors={errors}
                      icon={isSettings ? <MdOutlineEdit /> : ''}
                      rightIcon={!!isSettings}
                      disabled={!hasAccess}
                    />
                  </div>
                </div>
                <div className={isSettings ? 'col-lg-12' : 'col-12 col-lg-6'}>
                  <div>
                    <FormikField
                      name="address"
                      label="Address"
                      placeholder="Enter Address"
                      type="text"
                      validationSchema={validationSchema}
                      errors={errors}
                      icon={isSettings ? <MdOutlineEdit /> : ''}
                      rightIcon={!!isSettings}
                      disabled={!hasAccess}
                    />
                  </div>
                </div>
              </div>
              <div className={`row ${isSettings ? 'mt-0' : 'mt-2'}`}>
                <div className={isSettings ? 'col-lg-12' : 'col-12 col-lg-6'}>
                  <div>
                    <FormikField
                      name="tax_id"
                      label="Tax ID"
                      placeholder="Enter Tax ID"
                      type="text"
                      validationSchema={validationSchema}
                      errors={errors}
                      icon={isSettings ? <MdOutlineEdit /> : ''}
                      rightIcon={!!isSettings}
                      disabled={!hasAccess}
                    />
                  </div>
                </div>
                {/* <div className="col-12 col-lg-6"> */}
                <div className={isSettings ? 'col-lg-12' : 'col-12 col-lg-6'}>
                  <div>
                    <FormikPhoneNumber
                      name="phone_number"
                      label="Phone Number"
                      validationSchema={validationSchema}
                      errors={errors.phone_number}
                      isDisabled={!hasAccess}
                    />
                  </div>
                </div>
              </div>
              {hasAccess && (
                <div
                  className={`${isSettings ? 'd-flex justify-content-end mt-3 mb-5' : 'd-flex justify-content-center company-information-btn-container'} `}
                >
                  {isSettings ? (
                    <div className="me-3">
                      <Button
                        text="Cancel"
                        onClick={() => resetForm()}
                        className="w-100"
                      />
                    </div>
                  ) : (
                    ''
                  )}
                  <Button
                    text={
                      isSubmitting
                        ? `${isSettings ? 'Updating' : 'Saving...'}`
                        : `${isSettings ? 'Update' : 'Save & Proceed'}`
                    }
                    isDisabled={
                      isSettings ? !dirty || isSubmitting : isSubmitting
                    }
                    isLoading={isSubmitting}
                    type="submit"
                    isSolid
                    className={`w-100 ${isSettings ? '' : 'company-info-btn mt-3'}`}
                    sufixIconChildren={
                      isSettings ? (
                        ''
                      ) : (
                        <MdArrowForward
                          size={20}
                          color="var(--icon-color)"
                          className="ms-3"
                        />
                      )
                    }
                  />
                </div>
              )}
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}
