/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-console */
/* eslint-disable no-alert */
/* eslint-disable @typescript-eslint/no-use-before-define */
/* eslint-disable no-shadow */
/* eslint-disable no-redeclare */
/* eslint-disable react/display-name */
/* eslint-disable react/no-array-index-key */
/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react/no-unescaped-entities */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable max-len */
/* eslint-disable no-nested-ternary */
/* eslint-disable no-restricted-syntax */
/* eslint-disable no-plusplus */
/* eslint-disable guard-for-in */

'use client';

import { useRouter, useParams, usePathname } from 'next/navigation';
import React, {
  useState,
  useEffect,
  forwardRef,
  useRef,
  useImperativeHandle,
} from 'react';
import Select from 'react-select';
import { CustomStyles } from '@/components/CustomStyles/CustomStyles';
import { Button } from '@/components/Button/Button';
import './GeneralDisclosure.css'; // your custom styles
import {
  Formik,
  Form,
  Field,
  ErrorMessage,
  FieldArray,
  // FormikProps,
} from 'formik';
import * as Yup from 'yup';
import { DisclosureService } from '@/lib/service';
import toast from 'react-hot-toast';
import { IUser } from '@/lib/interface/IUser.interface';
import { buildCustomRoute } from 'next/dist/server/lib/router-utils/filesystem';
import { IDataCube } from '@/lib/interface/IDataCube.interface';
import PageHeaderWrapper from '@/components/PageHeaderWrapper/PageHeaderWrapper';

export interface CompanyInformationFormRef {
  submitForm: () => Promise<void>;
  getValues: () => any;
}
type CompanyInformationFormProps = {
  initialValues: {
    cin: string;
    entityName: string;
    incorporationYear: number | string;
    regOfficeAddress: string;
    corpAddress: string;
    email: string;
    telephone: number | string;
    website: string;
    financialYear: number | string;
    stockExchange: string;
    paidUpCapitalAmount: number | string;
    paidUpCapitalUnit: string;
    contactPersonName: string;
    contactPersonDetails: string;
    reportingBoundary: string;
    assuranceProvider: string;
    assuranceType: string;
  };
  onChange: (values: any) => void;
  isViewPage: boolean;
};
const CompanyInformationForm = forwardRef<
  CompanyInformationFormRef,
  CompanyInformationFormProps
>(({ initialValues, onChange, isViewPage }, ref) => {
  // ✅ Validation schema with Yup
  const CompanyInformationSchema = Yup.object().shape({
    cin: Yup.string().required('Required'),
    entityName: Yup.string().required('Required'),
    incorporationYear: Yup.number().required('Required'),
    regOfficeAddress: Yup.string().required('Required'),
    corpAddress: Yup.string().required('Required'),
    email: Yup.string().email('Invalid email').required('Required'),
    telephone: Yup.string().required('Required'),
    website: Yup.string().required('Required'),
    financialYear: Yup.string().required('Required'),
    stockExchange: Yup.string().required('Required'),
    paidUpCapitalAmount: Yup.number().required('Required'),
    paidUpCapitalUnit: Yup.string().required('Required'),
    contactPersonName: Yup.string().required('Required'),
    contactPersonDetails: Yup.string().required('Required'),
    reportingBoundary: Yup.string().required('Required'),
    assuranceProvider: Yup.string().required('Required'),
    assuranceType: Yup.string().required('Required'),
  });

  const handleSubmit = (values: typeof initialValues) => {
    // console.log('✅ Form data:', values);
    // alert(`Form submitted successfully!\n\n${JSON.stringify(values, null, 2)}`);
  };

  return (
    <Formik
      enableReinitialize
      initialValues={initialValues}
      validationSchema={CompanyInformationSchema}
      onSubmit={handleSubmit}
    >
      {(formik) => {
        // 👇 Expose submitForm() method
        useImperativeHandle(ref, () => ({
          submitForm: () => formik.submitForm(),
          getValues: () => formik.values,
        }));

        // ✅ Notify parent on form value change
        useEffect(() => {
          onChange(formik.values);
        }, [formik.values, onChange]);
        return (
          <div className="container-fluid">
            <h6 className="fw-bold mb-4 fs-16">Company Information</h6>

            <Form className="container-fluid">
              {/* CIN */}
              <div className="row mb-3 align-items-center">
                <label className="col-md-4 col-form-label small-label">
                  Corporate Identity Number (CIN) *
                </label>
                <div className="col-md-8">
                  <Field
                    disabled={isViewPage}
                    name="cin"
                    className="form-control form-control-sm"
                  />
                  <ErrorMessage
                    name="cin"
                    component="small"
                    className="text-danger"
                  />
                </div>
              </div>
              <hr className="textSecondary" />
              {/* Entity Name */}
              <div className="row mb-3 align-items-center">
                <label className="col-md-4 col-form-label small-label">
                  Name of Listed Entity *
                </label>
                <div className="col-md-8">
                  <Field
                    disabled={isViewPage}
                    name="entityName"
                    className="form-control form-control-sm"
                  />
                  <ErrorMessage
                    name="entityName"
                    component="small"
                    className="text-danger"
                  />
                </div>
              </div>
              <hr className="textSecondary" />
              {/* Incorporation Year */}
              <div className="row mb-3 align-items-center">
                <label className="col-md-4 col-form-label small-label">
                  Year of Incorporation *
                </label>
                <div className="col-md-8">
                  <Field
                    disabled={isViewPage}
                    type="number"
                    name="incorporationYear"
                    className="form-control form-control-sm"
                  />
                  <ErrorMessage
                    name="incorporationYear"
                    component="small"
                    className="text-danger"
                  />
                </div>
              </div>
              <hr className="textSecondary" />
              {/* Registered Office Address */}
              <div className="row mb-3 align-items-center">
                <label className="col-md-4 col-form-label small-label">
                  Registered Office Address *
                </label>
                <div className="col-md-8">
                  <Field
                    disabled={isViewPage}
                    as="textarea"
                    name="regOfficeAddress"
                    rows={2}
                    className="form-control form-control-sm"
                  />
                  <ErrorMessage
                    name="regOfficeAddress"
                    component="small"
                    className="text-danger"
                  />
                </div>
              </div>
              <hr className="textSecondary" />
              {/* Corporate Address */}
              <div className="row mb-3 align-items-center">
                <label className="col-md-4 col-form-label small-label">
                  Corporate Address *
                </label>
                <div className="col-md-8">
                  <Field
                    disabled={isViewPage}
                    as="textarea"
                    name="corpAddress"
                    rows={1}
                    className="form-control form-control-sm"
                  />
                  <ErrorMessage
                    name="corpAddress"
                    component="small"
                    className="text-danger"
                  />
                </div>
              </div>
              <hr className="textSecondary" />
              {/* Email */}
              <div className="row mb-3 align-items-center">
                <label className="col-md-4 col-form-label small-label">
                  Email *
                </label>
                <div className="col-md-8">
                  <Field
                    disabled={isViewPage}
                    type="email"
                    name="email"
                    className="form-control form-control-sm"
                  />
                  <ErrorMessage
                    name="email"
                    component="small"
                    className="text-danger"
                  />
                </div>
              </div>
              <hr className="textSecondary" />
              {/* Telephone */}
              <div className="row mb-3 align-items-center">
                <label className="col-md-4 col-form-label small-label">
                  Telephone *
                </label>
                <div className="col-md-8">
                  <Field
                    disabled={isViewPage}
                    type="text"
                    name="telephone"
                    className="form-control form-control-sm"
                  />
                  <ErrorMessage
                    name="telephone"
                    component="small"
                    className="text-danger"
                  />
                </div>
              </div>
              <hr className="textSecondary" />
              {/* Website */}
              <div className="row mb-3 align-items-center">
                <label className="col-md-4 col-form-label small-label">
                  Website *
                </label>
                <div className="col-md-8">
                  <Field
                    disabled={isViewPage}
                    name="website"
                    className="form-control form-control-sm"
                  />
                  <ErrorMessage
                    name="website"
                    component="small"
                    className="text-danger"
                  />
                </div>
              </div>
              <hr className="textSecondary" />
              {/* Financial Year */}
              <div className="row mb-3 align-items-center">
                <label className="col-md-4 col-form-label small-label">
                  Financial Year *
                </label>
                <div className="col-md-8">
                  <Field
                    disabled={isViewPage}
                    type="text"
                    name="financialYear"
                    className="form-control form-control-sm"
                  />
                  <ErrorMessage
                    name="financialYear"
                    component="small"
                    className="text-danger"
                  />
                </div>
              </div>
              <hr className="textSecondary" />
              {/* Stock Exchange */}
              <div className="row mb-3 align-items-center">
                <label className="col-md-4 col-form-label small-label">
                  Stock Exchange *
                </label>
                <div className="col-md-8">
                  <Field
                    disabled={isViewPage}
                    name="stockExchange"
                    className="form-control form-control-sm"
                  />
                  <ErrorMessage
                    name="stockExchange"
                    component="small"
                    className="text-danger"
                  />
                </div>
              </div>
              <hr className="textSecondary" />
              {/* Paid Up Capital */}
              <div className="row mb-3 align-items-center">
                <label className="col-md-4 col-form-label small-label">
                  Paid up Capital *
                </label>
                <div className="col-md-8">
                  <div className="row g-2">
                    <div className=" col-md-6">
                      <Field
                        disabled={isViewPage}
                        type="number"
                        name="paidUpCapitalAmount"
                        placeholder="Amount"
                        className="form-control form-control-sm"
                      />
                    </div>
                    <div className="col-md-6 ">
                      <Select
                        isDisabled={isViewPage}
                        inputId="paidUpCapitalUnit"
                        classNamePrefix="custom_select_input"
                        styles={CustomStyles}
                        options={[
                          { label: 'Crores', value: 'Crores' },
                          { label: 'Lakhs', value: 'Lakhs' },
                          { label: 'Thousands', value: 'Thousands' },
                          { label: 'Rupees', value: 'Rupees' },
                        ]}
                        value={[
                          { label: 'Crores', value: 'Crores' },
                          { label: 'Lakhs', value: 'Lakhs' },
                          { label: 'Thousands', value: 'Thousands' },
                          { label: 'Rupees', value: 'Rupees' },
                        ].find(
                          (option) => option.value === formik.values.paidUpCapitalUnit,
                        )}
                        onChange={(selectedOption) => formik.setFieldValue(
                          'paidUpCapitalUnit',
                          selectedOption?.value,
                        )}
                        placeholder="Select Unit"
                      />
                    </div>
                  </div>
                  <ErrorMessage
                    name="paidUpCapitalAmount"
                    component="small"
                    className="text-danger"
                  />
                  <ErrorMessage
                    name="paidUpCapitalUnit"
                    component="small"
                    className="text-danger"
                  />
                </div>
              </div>

              <hr className="textSecondary" />
              {/* Contact Person Name */}
              <div className="row mb-3 align-items-center">
                <label className="col-md-4 col-form-label small-label">
                  Contact Person Name *
                </label>
                <div className="col-md-8">
                  <Field
                    disabled={isViewPage}
                    name="contactPersonName"
                    className="form-control form-control-sm"
                  />
                  <ErrorMessage
                    name="contactPersonName"
                    component="small"
                    className="text-danger"
                  />
                </div>
              </div>
              <hr className="textSecondary" />
              {/* Contact Person Details */}
              <div className="row mb-3 align-items-center">
                <label className="col-md-4 col-form-label small-label">
                  Contact Person Details *
                </label>
                <div className="col-md-8">
                  <Field
                    disabled={isViewPage}
                    name="contactPersonDetails"
                    className="form-control form-control-sm"
                  />
                  <ErrorMessage
                    name="contactPersonDetails"
                    component="small"
                    className="text-danger"
                  />
                </div>
              </div>
              <hr className="textSecondary" />
              {/* Reporting Boundary */}
              <div className="row mb-3 align-items-center">
                <label className="col-md-4 col-form-label small-label">
                  Reporting Boundary *
                </label>
                <div className="col-md-8">
                  <Field
                    disabled={isViewPage}
                    name="reportingBoundary"
                    className="form-control form-control-sm"
                  />
                  <ErrorMessage
                    name="reportingBoundary"
                    component="small"
                    className="text-danger"
                  />
                </div>
              </div>
              <hr className="textSecondary" />
              {/* Assurance Provider */}
              <div className="row mb-3 align-items-center">
                <label className="col-md-4 col-form-label small-label">
                  Assurance Provider *
                </label>
                <div className="col-md-8">
                  <Field
                    disabled={isViewPage}
                    name="assuranceProvider"
                    className="form-control form-control-sm"
                  />
                  <ErrorMessage
                    name="assuranceProvider"
                    component="small"
                    className="text-danger"
                  />
                </div>
              </div>
              <hr className="textSecondary" />
              {/* Assurance Type */}
              <div className="row mb-3 align-items-center">
                <label className="col-md-4 col-form-label small-label">
                  Assurance Type *
                </label>
                <div className="col-md-8">
                  <Field
                    disabled={isViewPage}
                    name="assuranceType"
                    className="form-control form-control-sm"
                  />
                  <ErrorMessage
                    name="assuranceType"
                    component="small"
                    className="text-danger"
                  />
                </div>
              </div>
              <hr className="textSecondary" />
              {/* <div className="text-end">
            <button type="submit" className="btn btn-primary btn-sm">
              Submit
            </button>
          </div> */}
            </Form>
          </div>
        );
      }}
    </Formik>
  );
});

export interface DetailsOfBusinessFormRef {
  submitForm: () => Promise<void>;
  getValues: () => any;
}
type DetailsOfBusinessFormProps = {
  initialValues: {
    groups: {
      mainActivity: string;
      businessActivity: string;
      turnover: number | string;
      unit: string;
    }[];
  };
  onChange: (data: any) => void;
  isViewPage: boolean;
};
const DetailsOfBusinessForm = forwardRef<
  DetailsOfBusinessFormRef,
  DetailsOfBusinessFormProps
>(({ initialValues, onChange, isViewPage }, ref) => {
  const DetailsOfBusinessSchema = Yup.object().shape({
    groups: Yup.array().of(
      Yup.object().shape({
        mainActivity: Yup.string().required('Required'),
        businessActivity: Yup.string().required('Required'),
        turnover: Yup.number()
          .typeError('Must be a number')
          .required('Required'),
        unit: Yup.string().required('Required'),
      }),
    ),
  });

  const handleSubmit = (values: typeof initialValues) => {
    // console.log('✅ Submitted:', values);
    // alert('Form submitted successfully!');
  };
  return (
    <Formik
      enableReinitialize
      initialValues={initialValues}
      validationSchema={DetailsOfBusinessSchema}
      onSubmit={handleSubmit}
    >
      {(formik) => {
        // 👇 Expose submitForm() method
        useImperativeHandle(ref, () => ({
          submitForm: () => formik.submitForm(),
          getValues: () => formik.values,
        }));

        // ✅ Notify parent on form value change
        useEffect(() => {
          onChange(formik.values);
        }, [formik.values, onChange]);

        return (
          <div className="container-fluid">
            <h6 className="fw-bold mb-4 fs-16">
              Details of Businesses / Services (accounting for 90% of the
              entity’s turnover)
            </h6>

            <Form className="container-fluid">
              <FieldArray name="groups">
                {({ remove, push }) => (
                  <>
                    {formik.values.groups.map((_, index: number) => (
                      <div key={index} className="custom-box">
                        {/* Row 1 */}
                        <div className="row mb-3">
                          <label className="col-md-4 col-form-label small-label">
                            Description of Main Activity of the entity
                          </label>
                          <div className="col-md-8">
                            <Field
                              disabled={isViewPage}
                              type="text"
                              name={`groups[${index}].mainActivity`}
                              className="form-control form-control-sm"
                              placeholder="Main Activity"
                            />
                            <ErrorMessage
                              name={`groups[${index}].mainActivity`}
                              component="small"
                              className="text-danger"
                            />
                          </div>
                        </div>

                        {/* Row 2 */}
                        <div className="row mb-3">
                          <label className="col-md-4 col-form-label small-label">
                            Description of Business Activity
                          </label>
                          <div className="col-md-8">
                            <Field
                              disabled={isViewPage}
                              type="text"
                              name={`groups[${index}].businessActivity`}
                              className="form-control form-control-sm"
                              placeholder="Business Activity"
                            />
                            <ErrorMessage
                              name={`groups[${index}].businessActivity`}
                              component="small"
                              className="text-danger"
                            />
                          </div>
                        </div>

                        {/* Row 3 */}
                        <div className="row mb-3">
                          <label className="col-md-4 col-form-label small-label">
                            {/* Turnover (in Rs.) */}
                            % of Turnover of the entity
                            *
                          </label>
                          <div className="col-md-8">
                            <div className="row g-2">
                              <div className="col-md-6 ">
                                <Field
                                  disabled={isViewPage}
                                  type="number"
                                  name={`groups[${index}].turnover`}
                                  className="form-control form-control-sm"
                                  placeholder="Amount"
                                />
                              </div>
                              <div className="col-md-6">
                                <Select
                                  isDisabled={isViewPage}
                                  inputId={`groups[${index}].unit`}
                                  classNamePrefix="custom_select_input"
                                  styles={CustomStyles}
                                  options={[
                                    // { label: 'Crores', value: 'Crores' },
                                    // { label: 'Lakhs', value: 'Lakhs' },
                                    // { label: 'Thousands', value: 'Thousands' },
                                    // { label: 'Rupees', value: 'Rupees' },
                                    { label: '%', value: '%' },
                                  ]}
                                  value={[
                                    // { label: 'Crores', value: 'Crores' },
                                    // { label: 'Lakhs', value: 'Lakhs' },
                                    // { label: 'Thousands', value: 'Thousands' },
                                    // { label: 'Rupees', value: 'Rupees' },
                                    { label: '%', value: '%' },
                                  ].find(
                                    (option) => option.value
                                      === formik.values.groups?.[index]?.unit,
                                  )}
                                  onChange={(selectedOption) => formik.setFieldValue(
                                    `groups[${index}].unit`,
                                    selectedOption?.value,
                                  )}
                                  placeholder="Select unit"
                                />
                              </div>
                            </div>
                            <ErrorMessage
                              name={`groups[${index}].turnover`}
                              component="div"
                              className="text-danger small"
                            />
                            <ErrorMessage
                              name={`groups[${index}].unit`}
                              component="div"
                              className="text-danger small"
                            />
                          </div>
                        </div>

                        {/* ✅ Remove Button - stays inside .custom-box */}
                        {!isViewPage && formik.values.groups.length > 1 && (
                          <div className="text-end">
                            <button
                              type="button"
                              className="btn btn-sm btn-link text-warning fw-bold fs-4.5 text-decoration-none"
                              onClick={() => remove(index)}
                            >
                              Delete
                            </button>
                          </div>
                        )}
                      </div> // ✅ Closing custom-box div at correct place
                    ))}

                    {/* Add Button */}
                    <div className="text-end">
                      {!isViewPage && (
                        <button
                          type="button"
                          className="btn btn-dark btn-sm"
                          onClick={() => push({
                            mainActivity: '',
                            businessActivity: '',
                            turnover: '',
                            unit: '',
                            remarks: '',
                          })}
                        >
                          Add Group
                        </button>
                      )}
                    </div>
                  </>
                )}
              </FieldArray>
            </Form>
          </div>
        );
      }}
    </Formik>
  );
});

// 🔹 Overtime Hours Form
export interface ProductsServicesFormRef {
  submitForm: () => Promise<void>;
  getValues: () => any;
}
type ProductsServicesFormProps = {
  initialValues: {
    groups: {
      productService: string;
      nicCode: string;
      turnover: number | string;
      unit: string;
    }[];
  };
  onChange: (data: any) => void;
  isViewPage: boolean;
};
const ProductsServicesForm = forwardRef<
  ProductsServicesFormRef,
  ProductsServicesFormProps
>(({ initialValues, onChange, isViewPage }, ref) => {
  const validationSchema = Yup.object({
    groups: Yup.array().of(
      Yup.object({
        productService: Yup.string().required('Required'),
        nicCode: Yup.string().required('Required'),
        turnover: Yup.number()
          .typeError('Must be a number')
          .positive('Must be positive')
          .required('Required'),
        unit: Yup.string().required('Select unit'),
      }),
    ),
  });

  const handleSubmit = (values: typeof initialValues) => {
    // console.log('✅ Form data:', values);
  };

  return (
    <Formik
      enableReinitialize
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {(formik) => {
        // 👇 Expose submitForm() method
        useImperativeHandle(ref, () => ({
          submitForm: () => formik.submitForm(),
          getValues: () => formik.values,
        }));

        // ✅ Notify parent on form value change
        useEffect(() => {
          onChange(formik.values);
        }, [formik.values, onChange]);

        return (
          <div className="container-fluid">
            <h6 className="fw-bold mb-4 fs-16">
              Products / Services Sold by Entity (accounting for 90% of the
              entity’s turnover)
            </h6>

            <Form>
              <FieldArray name="groups">
                {({ push, remove }) => (
                  <>
                    {formik.values.groups.map((_, index) => (
                      <div key={index} className="custom-box">
                        {/* Product Service */}
                        <div className="row mb-3">
                          <label className="col-md-4 col-form-label small-label fs-13">
                            Product / Services Sold *
                          </label>
                          <div className="col-md-8">
                            <Field
                              disabled={isViewPage}
                              type="text"
                              name={`groups[${index}].productService`}
                              className="form-control form-control-sm"
                              placeholder="Describe product/service"
                            />
                            <ErrorMessage
                              name={`groups[${index}].productService`}
                              component="div"
                              className="text-danger small"
                            />
                          </div>
                        </div>
                        <hr className="textSecondary" />
                        {/* NIC Code */}
                        <div className="row mb-3">
                          <label className="col-md-4 col-form-label small-label fs-13">
                            NIC Code *
                          </label>
                          <div className="col-md-8">
                            <Field
                              disabled={isViewPage}
                              type="text"
                              name={`groups[${index}].nicCode`}
                              className="form-control form-control-sm"
                              placeholder="Enter NIC Code"
                            />
                            <ErrorMessage
                              name={`groups[${index}].nicCode`}
                              component="div"
                              className="text-danger small"
                            />
                          </div>
                        </div>
                        <hr className="textSecondary" />
                        {/* Turnover */}
                        <div className="row mb-3 align-items-center">
                          <label className="col-md-4 col-form-label small-label">
                            {/* Turnover (in Rs.) * */}
                            % of Total Turnover
                            contributed *
                          </label>
                          <div className="col-md-8">
                            <div className="row g-2">
                              <div className=" col-md-6">
                                <Field
                                  disabled={isViewPage}
                                  type="number"
                                  name={`groups[${index}].turnover`}
                                  className="form-control form-control-sm"
                                  placeholder="Amount"
                                />
                              </div>
                              <div className="col-md-6">
                                <Select
                                  isDisabled={isViewPage}
                                  inputId={`groups[${index}].unit`}
                                  classNamePrefix="custom_select_input"
                                  styles={CustomStyles}
                                  options={[
                                    // { label: 'Crores', value: 'Crores' },
                                    // { label: 'Lakhs', value: 'Lakhs' },
                                    // { label: 'Thousands', value: 'Thousands' },
                                    // { label: 'Rupees', value: 'Rupees' },
                                    { label: '%', value: '%' },
                                  ]}
                                  value={[
                                    // { label: 'Crores', value: 'Crores' },
                                    // { label: 'Lakhs', value: 'Lakhs' },
                                    // { label: 'Thousands', value: 'Thousands' },
                                    // { label: 'Rupees', value: 'Rupees' },
                                    { label: '%', value: '%' },
                                  ].find(
                                    (option) => option.value
                                      === formik.values.groups?.[index]?.unit,
                                  )}
                                  onChange={(selectedOption) => formik.setFieldValue(
                                    `groups[${index}].unit`,
                                    selectedOption?.value,
                                  )}
                                  placeholder="Select unit"
                                />
                              </div>
                            </div>
                            <ErrorMessage
                              name={`groups[${index}].turnover`}
                              component="div"
                              className="text-danger small"
                            />
                            <ErrorMessage
                              name={`groups[${index}].unit`}
                              component="div"
                              className="text-danger small"
                            />
                          </div>
                        </div>
                        <hr className="textSecondary" />
                        {/* Remove button */}
                        {!isViewPage && formik.values.groups.length > 1 && (
                          <div className="text-end">
                            <button
                              type="button"
                              className="btn btn-sm btn-link text-warning fw-bold fs-4.5 text-decoration-none"
                              onClick={() => remove(index)}
                            >
                              Delete
                            </button>
                          </div>
                        )}
                      </div>
                    ))}

                    {/* Add button */}
                    <div className="text-end">
                      {!isViewPage && (
                        <button
                          type="button"
                          className="btn btn-dark btn-sm"
                          onClick={() => push({
                            productService: '',
                            nicCode: '',
                            turnover: '',
                            unit: '',
                          })}
                        >
                          Add Group
                        </button>
                      )}
                    </div>
                  </>
                )}
              </FieldArray>
            </Form>
          </div>
        );
      }}
    </Formik>
  );
});

export interface LocationsWherePlantsFormRef {
  submitForm: () => Promise<void>;
  getValues: () => any;
}
type LocationsWherePlantsFormProps = {
  initialValues: {
    nationalPlants: number | string;
    nationalOffices: number | string;
    internationalPlants: number | string;
    internationalOffices: number | string;
  };
  onChange: (data: any) => void;
  isViewPage: boolean;
};
const LocationsWherePlantsForm = forwardRef<
  LocationsWherePlantsFormRef,
  LocationsWherePlantsFormProps
>(({ initialValues, onChange, isViewPage }, ref) => {
  const validationSchema = Yup.object({
    nationalPlants: Yup.number()
      .typeError('Must be a number')
      .required('Required')
      .min(0, 'Cannot be negative'),
    nationalOffices: Yup.number()
      .typeError('Must be a number')
      .required('Required')
      .min(0, 'Cannot be negative'),
    internationalPlants: Yup.number()
      .typeError('Must be a number')
      .required('Required')
      .min(0, 'Cannot be negative'),
    internationalOffices: Yup.number()
      .typeError('Must be a number')
      .required('Required')
      .min(0, 'Cannot be negative'),
  });

  const handleSubmit = (values: typeof initialValues) => {
    // console.log('Form submitted:', values);
  };
  return (
    <Formik
      enableReinitialize
      initialValues={initialValues}
      validationSchema={validationSchema}
      //    innerRef={ref}
      onSubmit={handleSubmit}
    >
      {(formik) => {
        // 👇 Expose submitForm() method
        useImperativeHandle(ref, () => ({
          submitForm: () => formik.submitForm(),
          getValues: () => formik.values,
        }));

        // ✅ Notify parent on form value change
        useEffect(() => {
          onChange(formik.values);
        }, [formik.values, onChange]);

        return (
          <div className="container-fluid">
            <h6 className="fw-bold mb-4 fs-16">
              Locations where plants and/or operations/offices of the entity are
              situated
            </h6>

            <Form>
              {/* National - Number of Plants */}
              <div className="row mb-3 align-items-center">
                <label className="col-md-4 col-form-label small-label fs-13">
                  National - Number of Plants *
                </label>
                <div className="col-md-8">
                  <Field
                    disabled={isViewPage}
                    type="number"
                    name="nationalPlants"
                    className="form-control form-control-sm"
                    placeholder="Enter number"
                  />
                  <ErrorMessage
                    name="nationalPlants"
                    component="div"
                    className="text-danger small"
                  />
                </div>
              </div>
              <hr className="textSecondary" />
              {/* National - Number of Offices */}
              <div className="row mb-3 align-items-center">
                <label className="col-md-4 col-form-label small-label fs-13">
                  National - Number of Offices *
                </label>
                <div className="col-md-8">
                  <Field
                    disabled={isViewPage}
                    type="number"
                    name="nationalOffices"
                    className="form-control form-control-sm"
                    placeholder="Enter number"
                  />
                  <ErrorMessage
                    name="nationalOffices"
                    component="div"
                    className="text-danger small"
                  />
                </div>
              </div>
              <hr className="textSecondary" />
              {/* International - Number of Plants */}
              <div className="row mb-3 align-items-center">
                <label className="col-md-4 col-form-label small-label fs-13">
                  International - Number of Plants *
                </label>
                <div className="col-md-8">
                  <Field
                    disabled={isViewPage}
                    type="number"
                    name="internationalPlants"
                    className="form-control form-control-sm"
                    placeholder="Enter number"
                  />
                  <ErrorMessage
                    name="internationalPlants"
                    component="div"
                    className="text-danger small"
                  />
                </div>
              </div>
              <hr className="textSecondary" />
              {/* International - Number of Offices */}
              <div className="row mb-3 align-items-center">
                <label className="col-md-4 col-form-label small-label fs-13">
                  International - Number of Offices *
                </label>
                <div className="col-md-8">
                  <Field
                    disabled={isViewPage}
                    type="number"
                    name="internationalOffices"
                    className="form-control form-control-sm"
                    placeholder="Enter number"
                  />
                  <ErrorMessage
                    name="internationalOffices"
                    component="div"
                    className="text-danger small"
                  />
                </div>
              </div>
              <hr className="textSecondary" />
            </Form>
          </div>
        );
      }}
    </Formik>
  );
});

export interface MarketServedFormRef {
  submitForm: () => Promise<void>;
  getValues: () => any;
}
type MarketServedFormProps = {
  initialValues: {
    nationalStates: number | string;
    internationalCountries: number | string;
  };
  onChange: (data: any) => void;
  isViewPage: boolean;
};
const MarketServedForm = forwardRef<MarketServedFormRef, MarketServedFormProps>(
  ({ initialValues, onChange, isViewPage }, ref) => {
    const MarketServedForm = Yup.object({
      nationalStates: Yup.number()
        .typeError('Must be a number')
        .required('Required')
        .min(0, 'Must be zero or more'),
      internationalCountries: Yup.number()
        .typeError('Must be a number')
        .required('Required')
        .min(0, 'Must be zero or more'),
    });
    const handleSubmit = (values: typeof initialValues) => {
      // console.log('Form submitted');
    };
    return (
      <Formik
        enableReinitialize
        initialValues={initialValues}
        validationSchema={MarketServedForm}
        //    innerRef={ref}
        onSubmit={handleSubmit}
      >
        {(formik) => {
          // 👇 Expose submitForm() method
          useImperativeHandle(ref, () => ({
            submitForm: () => formik.submitForm(),
            getValues: () => formik.values,
          }));

          // ✅ Notify parent on form value change
          useEffect(() => {
            onChange(formik.values);
          }, [formik.values, onChange]);
          return (
            <div className="container-fluid">
              <h6 className="fw-bold mb-4 fs-16">
                Markets served by the entity
              </h6>

              <Form>
                {/* National States */}
                <div className="row mb-3 align-items-center">
                  <label className="col-md-4 col-form-label small-label fs-13">
                    National - No's of States *
                  </label>
                  <div className="col-md-8">
                    <Field
                      disabled={isViewPage}
                      type="number"
                      name="nationalStates"
                      className="form-control form-control-sm"
                      placeholder="Enter number of states"
                    />
                    <ErrorMessage
                      name="nationalStates"
                      component="div"
                      className="text-danger small"
                    />
                  </div>
                </div>
                <hr className="textSecondary" />
                {/* International Countries */}
                <div className="row mb-3 align-items-center">
                  <label className="col-md-4 col-form-label small-label fs-13">
                    International (No. of countries) *
                  </label>
                  <div className="col-md-8">
                    <Field
                      disabled={isViewPage}
                      type="number"
                      name="internationalCountries"
                      className="form-control form-control-sm"
                      placeholder="Enter number of countries"
                    />
                    <ErrorMessage
                      name="internationalCountries"
                      component="div"
                      className="text-danger small"
                    />
                  </div>
                </div>
                <hr className="textSecondary" />
              </Form>
            </div>
          );
        }}
      </Formik>
    );
  },
);

export interface TypesOfCustomersFormRef {
  submitForm: () => Promise<void>;
  getValues: () => any;
}
type TypesOfCustomerSchemaFormProps = {
  initialValues: {
    customerDescription: string;
  };
  onChange: (data: any) => void;
  isViewPage: boolean;
};
const TypesOfCustomersForm = forwardRef<
  TypesOfCustomersFormRef,
  TypesOfCustomerSchemaFormProps
>(({ initialValues, onChange, isViewPage }, ref) => {
  const TypesOfCustomerSchema = Yup.object({
    customerDescription: Yup.string().required('Required'),
  });
  const handleSubmit = (values: typeof initialValues) => {
    // console.log('Form submitted:', values);
  };
  return (
    <Formik
      enableReinitialize
      initialValues={initialValues}
      validationSchema={TypesOfCustomerSchema}
      //    innerRef={ref}
      onSubmit={handleSubmit}
    >
      {(formik) => {
        // 👇 Expose submitForm() method
        useImperativeHandle(ref, () => ({
          submitForm: () => formik.submitForm(),
          getValues: () => formik.values,
        }));

        // ✅ Notify parent on form value change
        useEffect(() => {
          onChange(formik.values);
        }, [formik.values, onChange]);
        return (
          <div className="container-fluid">
            <h6 className="fw-bold mb-4 fs-16">
              Details on the Type of customers
            </h6>

            <Form>
              <div className="row mb-3 align-items-center">
                <label className="col-md-4 col-form-label small-label fs-13">
                  Description on Types of Customers *
                </label>
                <div className="col-md-8">
                  <Field
                    disabled={isViewPage}
                    as="textarea"
                    name="customerDescription"
                    className="form-control form-control-sm"
                    rows={3}
                    placeholder="Describe types of customers"
                  />
                  <ErrorMessage
                    name="customerDescription"
                    component="div"
                    className="text-danger small"
                  />
                </div>
              </div>
              <hr className="textSecondary" />
            </Form>
          </div>
        );
      }}
    </Formik>
  );
});
export interface HoldingCompanyFormRef {
  submitForm: () => Promise<void>;
  getValues: () => any;
}
type HoldingCompanyFormProps = {
  initialValues: {
    groups: {
      companyName: string;
      companyType: string;
      sharesHeld: string | number;
      participates: string;
    }[];
  };
  onChange: (data: any) => void;
  isViewPage: boolean;
};
const HoldingCompanyForm = forwardRef<
  HoldingCompanyFormRef,
  HoldingCompanyFormProps
>(({ initialValues, onChange, isViewPage }, ref) => {
  const HoldingCompanySchema = Yup.object({
    groups: Yup.array().of(
      Yup.object({
        companyName: Yup.string().required('Required'),
        companyType: Yup.string().required('Required'),
        sharesHeld: Yup.number()
          .typeError('Must be a number')
          .min(0, 'Cannot be negative')
          .required('Required'),
        participates: Yup.string().required('Required'),
      }),
    ),
  });

  const handleSubmit = (values: typeof initialValues) => {
    // console.log('✅ Submitted');
    // alert(JSON.stringify(values, null, 2));
  };

  return (
    <Formik
      enableReinitialize
      initialValues={initialValues}
      validationSchema={HoldingCompanySchema}
      onSubmit={handleSubmit}
    >
      {(formik) => {
        // 👇 Expose submitForm() method
        useImperativeHandle(ref, () => ({
          submitForm: () => formik.submitForm(),
          getValues: () => formik.values,
        }));

        // ✅ Notify parent on form value change
        useEffect(() => {
          onChange(formik.values);
        }, [formik.values, onChange]);

        return (
          <div className="container-fluid">
            <h6 className="fw-bold mb-4 fs-16">
              Holding, Subsidiary and Associate Companies (Including Joint
              Ventures)
            </h6>

            <Form>
              <FieldArray name="groups">
                {({ push, remove }) => (
                  <>
                    {formik.values.groups.map((_, index: number) => (
                      <div key={index} className="custom-box">
                        {/* Name */}
                        <div className="row mb-3 align-items-center">
                          <label className="col-md-4 col-form-label small-label fs-13">
                            Names of holding/subsidiary/associate/joint ventures
                            *
                          </label>
                          <div className="col-md-8">
                            <Field
                              disabled={isViewPage}
                              type="text"
                              name={`groups[${index}].companyName`}
                              className="form-control form-control-sm"
                              placeholder="Enter company name"
                            />
                            <ErrorMessage
                              name={`groups[${index}].companyName`}
                              component="div"
                              className="text-danger small"
                            />
                          </div>
                        </div>
                        <hr className="textSecondary" />
                        {/* Type */}
                        <div className="row mb-3 align-items-center">
                          <label className="col-md-4 col-form-label small-label fs-13">
                            Indicate whether holding/subsidiary/associate/joint
                            venture *
                          </label>
                          <div className="col-md-8">
                            <Select
                              isDisabled={isViewPage}
                              inputId={`groups[${index}].companyType`}
                              classNamePrefix="custom_select_input"
                              styles={CustomStyles}
                              options={[
                                {
                                  label: 'Holding Company',
                                  value: 'Holding Company',
                                },
                                {
                                  label: 'Subsidiary Company',
                                  value: 'Subsidiary Company',
                                },
                                {
                                  label: 'Associate Company',
                                  value: 'Associate Company',
                                },
                                {
                                  label: 'Joint Venture',
                                  value: 'Joint Venture',
                                },
                              ]}
                              value={[
                                {
                                  label: 'Holding Company',
                                  value: 'Holding Company',
                                },
                                {
                                  label: 'Subsidiary Company',
                                  value: 'Subsidiary Company',
                                },
                                {
                                  label: 'Associate Company',
                                  value: 'Associate Company',
                                },
                                {
                                  label: 'Joint Venture',
                                  value: 'Joint Venture',
                                },
                              ].find(
                                (option) => option.value
                                  === formik.values.groups?.[index]?.companyType,
                              )}
                              onChange={(selectedOption) => formik.setFieldValue(
                                `groups[${index}].companyType`,
                                selectedOption?.value,
                              )}
                              placeholder="Select type"
                            />
                            <ErrorMessage
                              name={`groups[${index}].companyType`}
                              component="div"
                              className="text-danger small"
                            />
                          </div>
                        </div>
                        <hr className="textSecondary" />
                        {/* % of shares held */}
                        <div className="row mb-3 align-items-center">
                          <label className="col-md-4 col-form-label small-label fs-13">
                            % of shares held by listed entity *
                          </label>
                          <div className="col-md-8">
                            <Field
                              disabled={isViewPage}
                              type="number"
                              name={`groups[${index}].sharesHeld`}
                              className="form-control form-control-sm"
                              placeholder="Enter % of shares"
                            />
                            <ErrorMessage
                              name={`groups[${index}].sharesHeld`}
                              component="div"
                              className="text-danger small"
                            />
                          </div>
                        </div>
                        <hr className="textSecondary" />
                        {/* Participation */}
                        <div className="row mb-3 align-items-center">
                          <label className="col-md-4 col-form-label small-label fs-13">
                            Does the holding / subsidiary / associate companies
                            / joint ventures participate in the Business
                            Responsibility initiatives of the listed entity
                          </label>
                          <div className="col-md-8">
                            <Select
                              isDisabled={isViewPage}
                              inputId={`groups[${index}].participates`}
                              classNamePrefix="custom_select_input"
                              styles={CustomStyles}
                              options={[
                                { label: 'Yes', value: 'Yes' },
                                { label: 'No', value: 'No' },
                              ]}
                              value={[
                                { label: 'Yes', value: 'Yes' },
                                { label: 'No', value: 'No' },
                              ].find(
                                (option) => option.value
                                  === formik.values.groups?.[index]?.participates,
                              )}
                              onChange={(selectedOption) => formik.setFieldValue(
                                `groups[${index}].participates`,
                                selectedOption?.value,
                              )}
                              placeholder="Select"
                            />
                            <ErrorMessage
                              name={`groups[${index}].participates`}
                              component="div"
                              className="text-danger small"
                            />
                          </div>
                        </div>
                        <hr className="textSecondary" />
                        {/* Remove */}
                        {!isViewPage && formik.values.groups.length > 1 && (
                          <div className="text-end">
                            <button
                              type="button"
                              className="btn btn-sm btn-link text-warning fw-bold fs-4.5 text-decoration-none"
                              onClick={() => remove(index)}
                            >
                              Delete
                            </button>
                          </div>
                        )}
                      </div>
                    ))}

                    {/* Add */}
                    <div className="text-end">
                      {!isViewPage && (
                        <button
                          type="button"
                          className="btn btn-dark btn-sm"
                          onClick={() => push({
                            companyName: '',
                            companyType: '',
                            sharesHeld: '',
                            participates: '',
                          })}
                        >
                          Add Group
                        </button>
                      )}
                    </div>
                  </>
                )}
              </FieldArray>

              {/* Submit */}
            </Form>
          </div>
        );
      }}
    </Formik>
  );
});
export interface CSRDetailsFormRef {
  submitForm: () => Promise<void>;
  getValues: () => any;
}
type CSRDetailsFormProps = {
  initialValues: {
    csrApplicable: string;
  };
  onChange: (data: any) => void;
  isViewPage: boolean;
};
const CSRDetailsForm = forwardRef<CSRDetailsFormRef, CSRDetailsFormProps>(
  ({ initialValues, onChange, isViewPage }, ref) => {
    const CSRDetailsSchema = Yup.object({
      csrApplicable: Yup.string().required('Required'),
    });

    const handleSubmit = (values: typeof initialValues) => {
      // console.log('✅ Form data:', values);
      // alert(
      //   `Form submitted successfully!\n\n${JSON.stringify(values, null, 2)}`
      // );
    };
    return (
      <Formik
        enableReinitialize
        initialValues={initialValues}
        validationSchema={CSRDetailsSchema}
        onSubmit={handleSubmit}
      >
        {(formik) => {
          // 👇 Expose submitForm() method
          useImperativeHandle(ref, () => ({
            submitForm: () => formik.submitForm(),
            getValues: () => formik.values,
          }));

          // ✅ Notify parent on form value change
          useEffect(() => {
            onChange(formik.values);
          }, [formik.values, onChange]);
          return (
            <div className="container-fluid">
              <h6 className="fw-bold mb-4 fs-16">CSR Details</h6>

              <Form>
                {/* CSR Applicable */}
                <div className="row mb-3 align-items-center">
                  <label className="col-md-4 col-form-label small-label fs-13">
                    Whether CSR is applicable as per section 135 of Companies
                    Act, 2013 *
                  </label>
                  <div className="col-md-8">
                    <Select
                      isDisabled={isViewPage}
                      inputId="csrApplicable"
                      classNamePrefix="custom_select_input"
                      styles={CustomStyles}
                      options={[
                        { label: 'Yes', value: 'Yes' },
                        { label: 'No', value: 'No' },
                      ]}
                      value={[
                        { label: 'Yes', value: 'Yes' },
                        { label: 'No', value: 'No' },
                      ].find(
                        (option) => option.value === formik.values.csrApplicable,
                      )}
                      onChange={(selectedOption) => formik.setFieldValue(
                        'csrApplicable',
                        selectedOption?.value,
                      )}
                      placeholder="Select"
                    />
                    <ErrorMessage
                      name="csrApplicable"
                      component="div"
                      className="text-danger small"
                    />
                  </div>
                </div>
                <hr className="textSecondary" />
              </Form>
            </div>
          );
        }}
      </Formik>
    );
  },
);

export interface MaterialIssuesFormRef {
  submitForm: () => Promise<void>;
  getValues: () => any;
}
type MaterialIssuesFormProps = {
  initialValues: {
    groups: {
      materialIssue: string;
      riskOrOpportunity: string;
      rationale: string;
      approach: string;
      financialImplications: string;
    }[];
  };
  onChange: (data: any) => void;
  isViewPage: boolean;
};

const MaterialIssuesForm = forwardRef<
  MaterialIssuesFormRef,
  MaterialIssuesFormProps
>(({ initialValues, onChange, isViewPage }, ref) => {
  const MaterialIssuesSchema = Yup.object({
    groups: Yup.array().of(
      Yup.object().shape({
        materialIssue: Yup.string().required('Required'),
        riskOrOpportunity: Yup.string().required('Required'),
        rationale: Yup.string().required('Required'),
        approach: Yup.string().required('Required'),
        financialImplications: Yup.string().required('Required'),
      }),
    ),
  });
  const handleSubmit = (values: typeof initialValues) => {
    // console.log('✅ Form data:', values);
    // alert(`Form submitted successfully!\n\n${JSON.stringify(values, null, 2)}`);
  };
  return (
    <Formik
      enableReinitialize
      initialValues={initialValues}
      validationSchema={MaterialIssuesSchema}
      onSubmit={handleSubmit}
    >
      {(formik) => {
        // 👇 Expose submitForm() method
        useImperativeHandle(ref, () => ({
          submitForm: () => formik.submitForm(),
          getValues: () => formik.values,
        }));

        // ✅ Notify parent on form value change
        useEffect(() => {
          onChange(formik.values);
        }, [formik.values, onChange]);

        return (
          <div className="container-fluid">
            <h6 className="fw-bold mb-4 fs-16">
              Overview of the Entity’s Material Responsible Business Conduct
              Issues
            </h6>

            <Form>
              <FieldArray name="groups">
                {({ push, remove }) => (
                  <>
                    {formik.values.groups.map((_, index: number) => (
                      <div key={index} className="custom-box">
                        {/* Material Issue Identified */}
                        <div className="row mb-3 align-items-center">
                          <label className="col-md-4 col-form-label small-label fs-13">
                            Material issue identified *
                          </label>
                          <div className="col-md-8">
                            <Field
                              disabled={isViewPage}
                              type="text"
                              name={`groups[${index}].materialIssue`}
                              className="form-control form-control-sm"
                              placeholder="Enter material issue"
                            />
                            <ErrorMessage
                              name="materialIssue"
                              component="div"
                              className="text-danger small"
                            />
                          </div>
                        </div>
                        <hr className="textSecondary" />
                        {/* Indicate whether Risk or Opportunity */}
                        <div className="row mb-3 align-items-center">
                          <label className="col-md-4 col-form-label small-label fs-13">
                            Indicate whether Risk or Opportunity (R/O) *
                          </label>
                          <div className="col-md-8">
                            <Select
                              isDisabled={isViewPage}
                              inputId={`groups[${index}].riskOrOpportunity`}
                              classNamePrefix="custom_select_input"
                              styles={CustomStyles}
                              options={[
                                { label: 'Risk', value: 'Risk' },
                                { label: 'Opportunity', value: 'Opportunity' },
                              ]}
                              value={[
                                { label: 'Risk', value: 'Risk' },
                                { label: 'Opportunity', value: 'Opportunity' },
                              ].find(
                                (option) => option.value
                                  === formik.values.groups?.[index]
                                    ?.riskOrOpportunity,
                              )}
                              onChange={(selectedOption) => formik.setFieldValue(
                                `groups[${index}].riskOrOpportunity`,
                                selectedOption?.value,
                              )}
                              placeholder="Select"
                            />
                            <ErrorMessage
                              name="riskOrOpportunity"
                              component="div"
                              className="text-danger small"
                            />
                          </div>
                        </div>
                        <hr className="textSecondary" />
                        {/* Rationale */}
                        <div className="row mb-3 align-items-center">
                          <label className="col-md-4 col-form-label small-label fs-13">
                            Rationale for identifying the risk / opportunity *
                          </label>
                          <div className="col-md-8">
                            <Field
                              disabled={isViewPage}
                              type="text"
                              name={`groups[${index}].rationale`}
                              className="form-control form-control-sm"
                              placeholder="Enter rationale"
                            />
                            <ErrorMessage
                              name="rationale"
                              component="div"
                              className="text-danger small"
                            />
                          </div>
                        </div>
                        <hr className="textSecondary" />
                        {/* Approach to adapt or mitigate */}
                        <div className="row mb-3 align-items-center">
                          <label className="col-md-4 col-form-label small-label fs-13">
                            In case of risk, approach to adapt or mitigate *
                          </label>
                          <div className="col-md-8">
                            <Field
                              disabled={isViewPage}
                              type="text"
                              name={`groups[${index}].approach`}
                              className="form-control form-control-sm"
                              placeholder="Enter approach"
                            />
                            <ErrorMessage
                              name="approach"
                              component="div"
                              className="text-danger small"
                            />
                          </div>
                        </div>
                        <hr className="textSecondary" />
                        {/* Financial Implications */}
                        <div className="row mb-3 align-items-center">
                          <label className="col-md-4 col-form-label small-label fs-13">
                            Financial implications of the risk or opportunity *
                          </label>
                          <div className="col-md-8">
                            <Field
                              disabled={isViewPage}
                              type="text"
                              name={`groups[${index}].financialImplications`}
                              className="form-control form-control-sm"
                              placeholder="Enter financial implications"
                            />
                            <ErrorMessage
                              name="financialImplications"
                              component="div"
                              className="text-danger small"
                            />
                          </div>
                        </div>
                        <hr className="textSecondary" />

                        {/* Delete Group Button */}
                        {!isViewPage && formik.values.groups.length > 1 && (
                          <div className="text-end">
                            {!isViewPage && (
                              <button
                                type="button"
                                className="btn btn-sm btn-link text-danger fw-bold"
                                onClick={() => remove(index)}
                              >
                                Delete Group
                              </button>
                            )}
                          </div>
                        )}
                      </div>
                    ))}
                    <div className="text-end">
                      {!isViewPage && (
                        <button
                          type="button"
                          className="btn btn-dark btn-sm"
                          onClick={() => push({
                            materialIssue: '',
                            riskOrOpportunity: '',
                            rationale: '',
                            approach: '',
                            financialImplications: '',
                          })}
                        >
                          Add Group
                        </button>
                      )}
                    </div>
                  </>
                )}
              </FieldArray>
            </Form>
          </div>
        );
      }}
    </Formik>
  );
});

const GeneralDisclosurePage: React.FC<{
  user: IUser;
  disclosureData?: any;
  id?: string;
  apiKey?: string | any;
  datacubes?: IDataCube[];
}> = ({
  user, disclosureData, id, apiKey, datacubes,
}) => {
  // console.log('Disclosure Data:', JSON.stringify(disclosureData, null, 2));
  // console.log('USER_ID======', user);
  console.log(datacubes, 'datacubes =-=-=-=-');
  const pathname = usePathname();
  const isViewPage = pathname.endsWith('/view');
  const [companyInfoIndicator, setCompanyInfoIndicator] = useState({
    name: 'Company Information',
    status: 'Pending',
    percent: '0%',
    badge: 'bg-danger',
  });

  const [detailsOfBusinessIndicator, setDetailsOfBusinessIndicator] = useState({
    name: 'Details of Businesses / Services (accounting for 90% of the entity’s turnover)',
    status: 'Pending',
    percent: '0%',
    badge: 'bg-danger',
  });

  const [productsServicesIndicator, setProductsServicesIndicator] = useState({
    name: 'Products / Services Sold by Entity (accounting for 90% of the entity’s turnover)',
    status: 'Pending',
    percent: '0%',
    badge: 'bg-danger',
  });

  const [locationsIndicator, setLocationsIndicator] = useState({
    name: 'Locations where plants and/or operations/offices of the entity are situated',
    status: 'Pending',
    percent: '0%',
    badge: 'bg-danger',
  });

  const [marketServedIndicator, setMarketServedIndicator] = useState({
    name: 'Markets served by the entity',
    status: 'Pending',
    percent: '0%',
    badge: 'bg-danger',
  });

  const [typesOfCustomersIndicator, setTypesOfCustomersIndicator] = useState({
    name: 'Details on the Type of customers',
    status: 'Pending',
    percent: '0%',
    badge: 'bg-danger',
  });

  const [holdingCompanyIndicator, setHoldingCompanyIndicator] = useState({
    name: 'Holding, Subsidiary and Associate Companies (Including Joint Ventures)',
    status: 'Pending',
    percent: '0%',
    badge: 'bg-danger',
  });

  const [csrDetailsIndicator, setCsrDetailsIndicator] = useState({
    name: 'CSR Details',
    status: 'Pending',
    percent: '0%',
    badge: 'bg-danger',
  });

  const [materialIssuesIndicator, setMaterialIssuesIndicator] = useState({
    name: 'Overview of the entity’s material responsible business conduct issues',
    status: 'Pending',
    percent: '0%',
    badge: 'bg-danger',
  });

  const indicators = [
    companyInfoIndicator,
    detailsOfBusinessIndicator,
    productsServicesIndicator,
    locationsIndicator,
    marketServedIndicator,
    typesOfCustomersIndicator,
    holdingCompanyIndicator,
    csrDetailsIndicator,
    materialIssuesIndicator,
  ];

  const calculateFormCompletionPercent = (formData: any): number => {
    if (!formData || typeof formData !== 'object') return 0;

    let totalFields = 0;
    let filledFields = 0;

    const countFields = (data: any) => {
      if (Array.isArray(data)) {
        if (data.length > 0) {
          countFields(data[0]); // Only first group
        }
      } else if (typeof data === 'object' && data !== null) {
        for (const key in data) {
          const value = data[key];

          if (key === 'groups' && Array.isArray(value)) {
            countFields(value); // Recurse only into first item of 'groups'
          } else if (typeof value === 'object' && value !== null) {
            countFields(value);
          } else {
            totalFields++;
            if (value !== '' && value !== null && value !== undefined) {
              filledFields++;
            }
          }
        }
      }
    };

    countFields(formData);

    return totalFields === 0
      ? 0
      : Math.round((filledFields / totalFields) * 100);
  };

  const urlParams = useParams();
  const [activeIndicator, setActiveIndicator] = useState(indicators[0]);
  const [selectedYear, setSelectedYear] = useState<any>('');
  const [isLoading, setIsLoading] = useState(false);
  // Refs
  const companyInformationFormRef = useRef<any>(null);
  const detailsOfBusinessFormRef = useRef<any>(null);
  const productsServicesFormRef = useRef<any>(null);
  const locationsWherePlantsFormRef = useRef<any>(null);
  const marketServedFormRef = useRef<any>(null);
  const typesOfCustomersFormRef = useRef<any>(null);
  const holdingCompanyFormRef = useRef<any>(null);
  const csrDetailsFormRef = useRef<any>(null);
  const materialIssuesFormRef = useRef<any>(null);

  // States for form data
  const [companyInfoData, setCompanyInfoData] = useState({
    cin: '',
    entityName: '',
    incorporationYear: '',
    regOfficeAddress: '',
    corpAddress: '',
    email: '',
    telephone: '',
    website: '',
    financialYear: '',
    stockExchange: '',
    paidUpCapitalAmount: '',
    paidUpCapitalUnit: '',
    contactPersonName: '',
    contactPersonDetails: '',
    reportingBoundary: '',
    assuranceProvider: '',
    assuranceType: '',
  });
  const [detailsOfBusinessData, setDetailsOfBusinessData] = useState({
    groups: [
      {
        mainActivity: '',
        businessActivity: '',
        turnover: '',
        unit: '',
      },
    ],
  });
  const [productsServicesData, setProductsServicesData] = useState({
    groups: [
      {
        productService: '',
        nicCode: '',
        turnover: '',
        unit: '',
      },
    ],
  });
  const [locationsData, setLocationsData] = useState({
    nationalPlants: '',
    nationalOffices: '',
    internationalPlants: '',
    internationalOffices: '',
  });
  const [marketServedData, setMarketServedData] = useState({
    nationalStates: '',
    internationalCountries: '',
  });
  const [typesOfCustomersData, setTypesOfCustomersData] = useState({
    customerDescription: '',
  });
  const [holdingCompanyData, setHoldingCompanyData] = useState({
    groups: [
      {
        companyName: '',
        companyType: '',
        sharesHeld: '',
        participates: '',
      },
    ],
  });
  const [csrDetailsData, setCsrDetailsData] = useState({ csrApplicable: '' });
  const [materialIssuesData, setMaterialIssuesData] = useState({
    groups: [
      {
        materialIssue: '',
        riskOrOpportunity: '',
        rationale: '',
        approach: '',
        financialImplications: '',
      },
    ],
  });

  useEffect(() => {
    const getStatus = (percent: number) => {
      if (percent === 100) return 'Completed';
      if (percent > 0) return 'In Progress';
      return 'Pending';
    };

    const indicatorMap = [
      {
        name: 'Company Information',
        formData: companyInfoData,
        setIndicator: setCompanyInfoIndicator,
      },
      {
        name: 'Details of Businesses / Services (accounting for 90% of the entity’s turnover)',
        formData: detailsOfBusinessData,
        setIndicator: setDetailsOfBusinessIndicator,
      },
      {
        name: 'Products / Services Sold by Entity (accounting for 90% of the entity’s turnover)',
        formData: productsServicesData,
        setIndicator: setProductsServicesIndicator,
      },
      {
        name: 'Locations where plants and/or operations/offices of the entity are situated',
        formData: locationsData,
        setIndicator: setLocationsIndicator,
      },
      {
        name: 'Markets served by the entity',
        formData: marketServedData,
        setIndicator: setMarketServedIndicator,
      },
      {
        name: 'Details on the Type of customers',
        formData: typesOfCustomersData,
        setIndicator: setTypesOfCustomersIndicator,
      },
      {
        name: 'Holding, Subsidiary and Associate Companies (Including Joint Ventures)',
        formData: holdingCompanyData,
        setIndicator: setHoldingCompanyIndicator,
      },
      {
        name: 'CSR Details',
        formData: csrDetailsData,
        setIndicator: setCsrDetailsIndicator,
      },
      {
        name: 'Overview of the entity’s material responsible business conduct issues',
        formData: materialIssuesData,
        setIndicator: setMaterialIssuesIndicator,
      },
    ];

    indicatorMap.forEach(({ name, formData, setIndicator }) => {
      const percentValue = calculateFormCompletionPercent(formData);
      const status = getStatus(percentValue);

      const updated = {
        name,
        percent: `${percentValue}%`,
        status,
        badge: 'bg-danger',
      };

      setIndicator(updated);

      // Update activeIndicator if it matches
      if (activeIndicator?.name === name) {
        setActiveIndicator(updated);
      }
    });
  }, [
    companyInfoData,
    detailsOfBusinessData,
    productsServicesData,
    locationsData,
    marketServedData,
    typesOfCustomersData,
    holdingCompanyData,
    csrDetailsData,
    materialIssuesData,
    activeIndicator?.name, // so UI updates when the selected one changes
  ]);

  const parseCompanyInfoFromApi = (questionsFromApi: any[]) => {
    const formData = {
      cin: '',
      entityName: '',
      incorporationYear: '',
      regOfficeAddress: '',
      corpAddress: '',
      email: '',
      telephone: '',
      website: '',
      financialYear: '',
      stockExchange: '',
      paidUpCapitalAmount: '',
      paidUpCapitalUnit: '',
      contactPersonName: '',
      contactPersonDetails: '',
      reportingBoundary: '',
      assuranceProvider: '',
      assuranceType: '',
    };

    questionsFromApi.forEach((item: any) => {
      const matched = companyInfoQuestions.find(
        (q) => q.id === item.universal_question_id,
      );
      if (matched && matched.key) {
        formData[matched.key as keyof typeof formData] = item.answer;

        if (matched.hasUnit && matched.unitKey && 'unit' in item) {
          formData[matched.unitKey as keyof typeof formData] = item.unit;
        }
      }
    });

    return formData;
  };
  const parseDetailsOfBusinessFromApi = (questionsFromApi: any[]) => {
    const formData = {
      groups: [] as {
        mainActivity: string;
        businessActivity: string;
        turnover: string;
        unit: string;
      }[],
    };

    const groupData = questionsFromApi
      .filter((q) => Array.isArray(q.groups))
      .flatMap((q) => q.groups); // flatten multiple group sets

    if (groupData.length > 0) {
      formData.groups = groupData.map((group: any[]) => {
        const groupObj: any = {
          mainActivity: '',
          businessActivity: '',
          turnover: '',
          unit: '',
        };

        group.forEach((item) => {
          const matched = detailsOfBusinessQuestions.find(
            (q) => q.id === item.universal_question_id,
          );
          if (matched) {
            groupObj[matched.key] = item.answer ?? '';

            if (matched.hasUnit && matched.unitKey && 'unit' in item) {
              groupObj[matched.unitKey] = item.unit ?? '';
            }
          }
        });

        return groupObj;
      });
    } else {
      // No group data, add an empty group row to render in form
      formData.groups = [
        {
          mainActivity: '',
          businessActivity: '',
          turnover: '',
          unit: '',
        },
      ];
    }

    return formData;
  };
  const parseProductsServicesFromApi = (questionsFromApi: any[] = []) => {
    const formData = {
      groups: [] as {
        productService: string;
        nicCode: string;
        turnover: string;
        unit: string;
      }[],
    };

    // Look for any group data from 'groups' or 'group' fields
    const groupData: any[] = questionsFromApi.flatMap((q) => (Array.isArray(q.groups) ? q.groups : Array.isArray(q.group) ? q.group : []));

    if (groupData.length > 0) {
      formData.groups = groupData.map((group: any[]) => {
        const groupObj = {
          productService: '',
          nicCode: '',
          turnover: '',
          unit: '',
        };

        group.forEach((item) => {
          const matched = productsServicesQuestions.find(
            (q) => q.id === item.universal_question_id,
          );

          if (matched) {
            groupObj[matched.key as keyof typeof groupObj] = item.answer ?? '';

            if (matched.hasUnit && matched.unitKey && 'unit' in item) {
              groupObj[matched.unitKey as keyof typeof groupObj] = item.unit ?? '';
            }
          }
        });

        return groupObj;
      });
    } else {
      formData.groups = [
        {
          productService: '',
          nicCode: '',
          turnover: '',
          unit: '',
        },
      ];
    }

    return formData;
  };

  const parseLocationsFromApi = (questionsFromApi: any[]) => {
    const formData = {
      nationalPlants: '',
      nationalOffices: '',
      internationalPlants: '',
      internationalOffices: '',
    };

    questionsFromApi.forEach((item: any) => {
      const matched = locationsQuestions.find(
        (q) => q.id === item.universal_question_id,
      );
      if (matched) {
        formData[matched.key as keyof typeof formData] = item.answer;
      }
    });

    return formData;
  };
  const parseMarketServedFromApi = (questionsFromApi: any[] = []) => {
    const formData = {
      nationalStates: '',
      internationalCountries: '',
    };

    questionsFromApi.forEach((item: any) => {
      const matched = marketServedQuestions.find(
        (q) => q.id === item.universal_question_id,
      );

      if (matched && matched.key in formData) {
        formData[matched.key as keyof typeof formData] = item.answer ?? '';
      }
    });

    return formData;
  };
  const parseTypesOfCustomersFromApi = (questionsFromApi: any[]) => {
    const formData = {
      customerDescription: '',
    };

    questionsFromApi.forEach((item: any) => {
      const matched = typesOfCustomersQuestions.find(
        (q) => q.id === item.universal_question_id,
      );
      if (matched) {
        formData[matched.key as keyof typeof formData] = item.answer;
      }
    });

    return formData;
  };
  const parseHoldingCompanyFromApi = (questionsFromApi: any[]) => {
    const formData = {
      groups: [] as {
        companyName: string;
        companyType: string;
        sharesHeld: string;
        participates: string;
      }[],
    };

    const groupData = questionsFromApi
      .filter((q) => Array.isArray(q.groups))
      .flatMap((q) => q.groups); // flatten all group arrays

    if (groupData.length > 0) {
      formData.groups = groupData.map((group: any[]) => {
        const groupObj: any = {
          companyName: '',
          companyType: '',
          sharesHeld: '',
          participates: '',
        };

        group.forEach((item) => {
          const matched = holdingCompanyQuestions.find(
            (q) => q.id === item.universal_question_id,
          );
          if (matched) {
            groupObj[matched.key] = item.answer ?? '';
          }
        });

        return groupObj;
      });
    } else {
      // Fallback: provide a blank row to render in the form
      formData.groups = [
        {
          companyName: '',
          companyType: '',
          sharesHeld: '',
          participates: '',
        },
      ];
    }

    return formData;
  };

  const parseCsrDetailsFromApi = (questionsFromApi: any[]) => {
    const formData = {
      csrApplicable: '',
    };

    const mainQuestion = questionsFromApi.find(
      (q) => q.universal_question_id === 'UID_1510',
    );

    formData.csrApplicable = mainQuestion?.answer || '';

    return formData;
  };
  const parseMaterialIssuesFromApi = (questionsFromApi: any[]) => {
    const formData = {
      groups: [] as {
        materialIssue: string;
        riskOrOpportunity: string;
        rationale: string;
        approach: string;
        financialImplications: string;
      }[],
    };

    const groupData = questionsFromApi
      .filter((q) => Array.isArray(q.groups))
      .flatMap((q) => q.groups); // flatten all group arrays

    if (groupData.length > 0) {
      formData.groups = groupData.map((group: any[]) => {
        const groupObj = {
          materialIssue: '',
          riskOrOpportunity: '',
          rationale: '',
          approach: '',
          financialImplications: '',
        };

        group.forEach((item: any) => {
          const matched = materialIssuesQuestions.find(
            (q) => q.id === item.universal_question_id,
          );
          if (matched) {
            groupObj[matched.key as keyof typeof groupObj] = item.answer ?? '';
          }
        });

        return groupObj;
      });
    } else {
      // Fallback: show one empty row for user to fill
      formData.groups = [
        {
          materialIssue: '',
          riskOrOpportunity: '',
          rationale: '',
          approach: '',
          financialImplications: '',
        },
      ];
    }

    return formData;
  };

  const [isCompanyInfoLoaded, setIsCompanyInfoLoaded] = useState(false);
  const [isDetailsOfBusinessLoaded, setIsDetailsOfBusinessLoaded] = useState(false);
  const [isProductsServicesLoaded, setIsProductsServicesLoaded] = useState(false);
  const [isLocationsLoaded, setIsLocationsLoaded] = useState(false);
  const [isMarketServedLoaded, setIsMarketServedLoaded] = useState(false);
  const [isTypesOfCustomersLoaded, setIsTypesOfCustomersLoaded] = useState(false);
  const [isHoldingCompanyLoaded, setIsHoldingCompanyLoaded] = useState(false);
  const [isCsrDetailsLoaded, setIsCsrDetailsLoaded] = useState(false);
  const [isMaterialIssuesLoaded, setIsMaterialIssuesLoaded] = useState(false);

  useEffect(() => {
    if (disclosureData?.indicators?.length > 0) {
      // 1. Company Information
      const companyInfoIndicator = disclosureData.indicators.find(
        (item: any) => item.name?.trim()?.toLowerCase() === 'company information',
      );
      if (companyInfoIndicator?.questions?.length > 0) {
        const parsed = parseCompanyInfoFromApi(companyInfoIndicator.questions);
        setCompanyInfoData(parsed);
        setIsCompanyInfoLoaded(true);
      }

      // 2. Details of Business
      const detailsOfBusinessIndicator = disclosureData.indicators.find(
        (item: any) => item.name?.trim()?.toLowerCase()
          === "details of businesses / services (accounting for 90% of the entity's turnover)",
      );
      if (detailsOfBusinessIndicator?.questions?.length > 0) {
        const parsed = parseDetailsOfBusinessFromApi(
          detailsOfBusinessIndicator.questions,
        );
        setDetailsOfBusinessData(parsed);
        setIsDetailsOfBusinessLoaded(true);
      }

      // 3. Products & Services
      const productsServicesIndicator = disclosureData.indicators.find(
        (item: any) => item.name
          === "Products / Services Sold by Entity (accounting for 90% of the entity's turnover)",
      );
      if (Array.isArray(productsServicesIndicator?.questions)) {
        const parsed = parseProductsServicesFromApi(
          productsServicesIndicator.questions,
        );
        setProductsServicesData(parsed);
        setIsProductsServicesLoaded(true);
      }

      // 4. Locations
      const locationsIndicator = disclosureData.indicators.find(
        (item: any) => item.name?.trim()?.toLowerCase()
          === 'locations where plants and/or operations/offices of the entity are situated',
      );
      if (locationsIndicator?.questions?.length > 0) {
        const parsed = parseLocationsFromApi(locationsIndicator.questions);
        setLocationsData(parsed);
        setIsLocationsLoaded(true);
      }

      // 5. Markets Served
      const marketServedIndicator = disclosureData.indicators.find(
        (item: any) => item.name?.trim()?.toLowerCase() === 'markets served by the entity',
      );
      if (marketServedIndicator?.questions?.length > 0) {
        const parsed = parseMarketServedFromApi(
          marketServedIndicator.questions,
        );
        setMarketServedData(parsed);
        setIsMarketServedLoaded(true);
      }

      // 6. Types of Customers
      const typesOfCustomersIndicator = disclosureData.indicators.find(
        (item: any) => item.name?.trim()?.toLowerCase()
          === 'details on the type of customers',
      );
      if (typesOfCustomersIndicator?.questions?.length > 0) {
        const parsed = parseTypesOfCustomersFromApi(
          typesOfCustomersIndicator.questions,
        );
        setTypesOfCustomersData(parsed);
        setIsTypesOfCustomersLoaded(true);
      }

      // 7. Holding Company
      const holdingCompanyIndicator = disclosureData.indicators.find(
        (item: any) => item.name?.trim()?.toLowerCase()
          === 'holding, subsidiary and associate companies (including joint ventures)',
      );
      if (holdingCompanyIndicator?.questions?.length > 0) {
        const parsed = parseHoldingCompanyFromApi(
          holdingCompanyIndicator.questions,
        );
        setHoldingCompanyData(parsed);
        setIsHoldingCompanyLoaded(true);
      }

      // 8. CSR Details
      const csrDetailsIndicator = disclosureData.indicators.find(
        (item: any) => item.name?.trim()?.toLowerCase() === 'csr details',
      );
      if (csrDetailsIndicator?.questions?.length > 0) {
        const parsed = parseCsrDetailsFromApi(csrDetailsIndicator.questions);
        setCsrDetailsData(parsed);
        setIsCsrDetailsLoaded(true);
      }

      // 9. Material Issues
      const materialIssuesIndicator = disclosureData.indicators.find(
        (item: any) => item.name?.trim()?.toLowerCase()
          === 'overview of the entity’s material responsible business conduct issues',
      );
      if (materialIssuesIndicator?.questions?.length > 0) {
        const parsed = parseMaterialIssuesFromApi(
          materialIssuesIndicator.questions,
        );
        setMaterialIssuesData(parsed);
        setIsMaterialIssuesLoaded(true);
      }

      // Set year if available
      setSelectedYear(disclosureData?.financial_year || '');
    }
  }, [disclosureData]);

  const isAllGeneralDisclosureLoaded = isCompanyInfoLoaded
    && isDetailsOfBusinessLoaded
    && isProductsServicesLoaded
    && isLocationsLoaded
    && isMarketServedLoaded
    && isTypesOfCustomersLoaded
    && isHoldingCompanyLoaded
    && isCsrDetailsLoaded
    && isMaterialIssuesLoaded;

  const renderForm = () => {
    if (id) {
      if (!isAllGeneralDisclosureLoaded) {
        return <div>Loading......</div>;
      }
    }
    return (
      <>
        <div
          style={{
            display:
              activeIndicator.name === 'Company Information' ? 'block' : 'none',
          }}
        >
          <CompanyInformationForm
            ref={companyInformationFormRef}
            initialValues={companyInfoData}
            onChange={setCompanyInfoData}
            isViewPage={isViewPage}
          />
        </div>

        <div
          style={{
            display:
              activeIndicator.name
              === 'Details of Businesses / Services (accounting for 90% of the entity’s turnover)'
                ? 'block'
                : 'none',
          }}
        >
          <DetailsOfBusinessForm
            ref={detailsOfBusinessFormRef}
            initialValues={detailsOfBusinessData}
            onChange={setDetailsOfBusinessData}
            isViewPage={isViewPage}
          />
        </div>

        <div
          style={{
            display:
              activeIndicator.name
              === 'Products / Services Sold by Entity (accounting for 90% of the entity’s turnover)'
                ? 'block'
                : 'none',
          }}
        >
          <ProductsServicesForm
            ref={productsServicesFormRef}
            initialValues={productsServicesData}
            onChange={setProductsServicesData}
            isViewPage={isViewPage}
          />
        </div>

        <div
          style={{
            display:
              activeIndicator.name
              === 'Locations where plants and/or operations/offices of the entity are situated'
                ? 'block'
                : 'none',
          }}
        >
          <LocationsWherePlantsForm
            ref={locationsWherePlantsFormRef}
            initialValues={locationsData}
            onChange={setLocationsData}
            isViewPage={isViewPage}
          />
        </div>

        <div
          style={{
            display:
              activeIndicator.name === 'Markets served by the entity'
                ? 'block'
                : 'none',
          }}
        >
          <MarketServedForm
            ref={marketServedFormRef}
            initialValues={marketServedData}
            onChange={setMarketServedData}
            isViewPage={isViewPage}
          />
        </div>

        <div
          style={{
            display:
              activeIndicator.name === 'Details on the Type of customers'
                ? 'block'
                : 'none',
          }}
        >
          <TypesOfCustomersForm
            ref={typesOfCustomersFormRef}
            initialValues={typesOfCustomersData}
            onChange={setTypesOfCustomersData}
            isViewPage={isViewPage}
          />
        </div>

        <div
          style={{
            display:
              activeIndicator.name
              === 'Holding, Subsidiary and Associate Companies (Including Joint Ventures)'
                ? 'block'
                : 'none',
          }}
        >
          <HoldingCompanyForm
            ref={holdingCompanyFormRef}
            initialValues={holdingCompanyData}
            onChange={setHoldingCompanyData}
            isViewPage={isViewPage}
          />
        </div>

        <div
          style={{
            display: activeIndicator.name === 'CSR Details' ? 'block' : 'none',
          }}
        >
          <CSRDetailsForm
            ref={csrDetailsFormRef}
            initialValues={csrDetailsData}
            onChange={setCsrDetailsData}
            isViewPage={isViewPage}
          />
        </div>

        <div
          style={{
            display:
              activeIndicator.name
              === 'Overview of the entity’s material responsible business conduct issues'
                ? 'block'
                : 'none',
          }}
        >
          <MaterialIssuesForm
            ref={materialIssuesFormRef}
            initialValues={materialIssuesData}
            onChange={setMaterialIssuesData}
            isViewPage={isViewPage}
          />
        </div>
      </>
    );
  };

  const companyInfoQuestions = [
    {
      id: 'UID_1477',
      label: 'Corporate Identity Number (CIN) of the Listed Entity',
      key: 'cin',
    },
    {
      id: 'UID_1478',
      label: 'Name of listed entity',
      key: 'entityName',
    },
    {
      id: 'UID_1479',
      label: 'Year of Incorporation',
      key: 'incorporationYear',
    },
    {
      id: 'UID_1480',
      label: 'Registered Office Address',
      key: 'regOfficeAddress',
    },
    {
      id: 'UID_1481',
      label: 'Corporate Address',
      key: 'corpAddress',
    },
    {
      id: 'UID_1482',
      label: 'Email',
      key: 'email',
    },
    {
      id: 'UID_1483',
      label: 'Telephone',
      key: 'telephone',
    },
    {
      id: 'UID_1484',
      label: 'Website',
      key: 'website',
    },
    {
      id: 'UID_1485',
      label: 'Financial Year for which Reporting is done',
      key: 'financialYear',
    },
    {
      id: 'UID_1486',
      label: 'Name of stock exchange where shares are listed',
      key: 'stockExchange',
    },
    {
      id: 'UID_1487',
      label: 'Paid up Capital',
      key: 'paidUpCapitalAmount',
      hasUnit: true,
      unitKey: 'paidUpCapitalUnit',
    },
    {
      id: 'UID_1488',
      label: 'Name of Person to be contacted in case of any queries',
      key: 'contactPersonName',
    },
    {
      id: 'UID_1489',
      label:
        'Contact details of Person to be contacted in case of any queries on the BRSR report',
      key: 'contactPersonDetails',
    },
    {
      id: 'UID_1490',
      label:
        'Reporting Boundary (Are the disclosures under this report made on a standalone basis or on a consolidated basis )',
      key: 'reportingBoundary',
    },
    {
      id: 'UID_1491',
      label: 'Name of Assurance Provider',
      key: 'assuranceProvider',
    },
    {
      id: 'UID_1492',
      label: 'Type of Assurance obtained',
      key: 'assuranceType',
    },
  ];
  const buildCompanyInfoOutput = (data: any) => companyInfoQuestions.map((q) => ({
    question_title: q.label,
    universal_question_id: q.id,
    answer: data[q.key] || '',
    ...(q.hasUnit ? { unit: data[q.unitKey] || '' } : {}),
  }));
  const detailsOfBusinessQuestions = [
    {
      id: 'UID_1493',
      label: 'Description of Main Activity of the entity',
      key: 'mainActivity',
    },
    {
      id: 'UID_1494',
      label: 'Description of Business Activity',
      key: 'businessActivity',
    },
    {
      id: 'UID_1495',
      label: 'Turnover (in Rs.)',
      key: 'turnover',
      hasUnit: true,
      unitKey: 'unit',
    },
  ];
  const buildDetailsOfBusinessOutput = (data: any) => {
    const groups = (data.groups || []).map((group: any) => detailsOfBusinessQuestions.map((q) => ({
      question_title: q.label,
      universal_question_id: q.id,
      answer: group[q.key] || '',
      ...(q.hasUnit ? { unit: group[q.unitKey] || '' } : {}),
    })));

    return [
      {
        groups,
      },
    ];
  };
  const productsServicesQuestions = [
    {
      id: 'UID_1496',
      label: 'Product / Services Sold *',
      key: 'productService',
    },
    {
      id: 'UID_1497',
      label: 'NIC Code *',
      key: 'nicCode',
    },
    {
      id: 'UID_1498',
      label: 'Turnover (in Rs.) ',
      key: 'turnover',
      hasUnit: true,
      unitKey: 'unit',
    },
  ];
  const buildProductServicesOutput = (data: any) => {
    const groups = (data.groups || []).map((group: any) => productsServicesQuestions.map((q) => ({
      question_title: q.label,
      universal_question_id: q.id,
      answer: group[q.key] || '',
      ...(q.hasUnit ? { unit: group[q.unitKey] || '' } : {}),
    })));

    return [
      {
        groups,
      },
    ];
  };
  const locationsQuestions = [
    {
      id: 'UID_1499',
      label: 'National - Number of Plants',
      key: 'nationalPlants',
    },
    {
      id: 'UID_1500',
      label: 'National - Number of Offices',
      key: 'nationalOffices',
    },
    {
      id: 'UID_1501',
      label: 'International - Number of Plants',
      key: 'internationalPlants',
    },
    {
      id: 'UID_1502',
      label: 'International - Number of Offices',
      key: 'internationalOffices',
    },
  ];
  const buildLocationsOutput = (data: any) => locationsQuestions.map((q) => ({
    question_title: q.label,
    universal_question_id: q.id,
    answer: data[q.key] || '',
  }));
  const marketServedQuestions = [
    {
      id: 'UID_1503',
      label: "National - No's of States",
      key: 'nationalStates',
    },
    {
      id: 'UID_1504',
      label: 'International (No. of countries)',
      key: 'internationalCountries',
    },
  ];
  const buildMarketServedOutput = (data: any) => marketServedQuestions.map((q) => ({
    question_title: q.label,
    universal_question_id: q.id,
    answer: data[q.key] || '',
  }));
  const typesOfCustomersQuestions = [
    {
      id: 'UID_1505',
      label: 'Description on types of customers ',
      key: 'customerDescription',
    },
  ];
  const buildtypesOfCustomerOutput = (data: any) => typesOfCustomersQuestions.map((q) => ({
    question_title: q.label,
    universal_question_id: q.id,
    answer: data[q.key] || '',
  }));
  const holdingCompanyQuestions = [
    {
      id: 'UID_1506',
      label: 'Names of holding/subsidiary/associate/joint ventures ',
      key: 'companyName',
    },
    {
      id: 'UID_1507',
      label: 'Indicate whether holding/subsidiary/associate/joint venture ',
      key: 'companyType',
    },
    {
      id: 'UID_1508',
      label: '% of shares held by listed entity ',
      key: 'sharesHeld',
    },
    {
      id: 'UID_1509',
      label:
        'Does the holding / subsidiary / associate companies / joint ventures participate in the Business Responsibility initiatives of the listed entity ',
      key: 'participates',
    },
  ];
  const buildHoldingCompanyOutput = (data: any) => {
    const groups = (data.groups || []).map((group: any) => holdingCompanyQuestions.map((q) => ({
      question_title: q.label,
      universal_question_id: q.id,
      answer: group[q.key] || '',
    })));

    return [
      {
        groups,
      },
    ];
  };

  const buildCrsDetailsOutput = (data: any) => {
    const questions = [
      {
        id: 'UID_1510',
        label:
          'Whether CSR is applicable as per section 135 of Companies Act, 2013',
        key: 'csrApplicable',
      },
    ];
    return questions.map((q) => ({
      question_title: q.label,
      universal_question_id: q.id,
      answer: data[q.key] || '',
    }));
  };
  const materialIssuesQuestions = [
    {
      id: 'UID_1511',
      label: 'Material issue identified-k',
      key: 'materialIssue',
    },
    {
      id: 'UID_1512',
      label: 'Indicate whether risk or opportunity (R/O) ',
      key: 'riskOrOpportunity',
    },
    {
      id: 'UID_1513',
      label: 'Rationale for identifying the risk / opportunity ',
      key: 'rationale',
    },
    {
      id: 'UID_1514',
      label: 'In case of risk, approach to adapt or mitigate ',
      key: 'approach',
    },
    {
      id: 'UID_1515',
      label:
        'Financial implications of the risk or opportunity (Indicate positive or negative implications) ',
      key: 'financialImplications',
    },
  ];
  const buildMaterialIssued = (data: any) => {
    const groups = (data.groups || []).map((group: any) => materialIssuesQuestions.map((q) => ({
      question_title: q.label,
      universal_question_id: q.id,
      answer: group[q.key] || '',
    })));

    return [
      {
        groups,
      },
    ];
  };

  const validateCompanyInfoForm = (data: any): boolean => {
    const requiredFields = [
      'cin',
      'entityName',
      'incorporationYear',
      'regOfficeAddress',
      'corpAddress',
      'email',
      'telephone',
      'financialYear',
      'stockExchange',
      'paidUpCapitalAmount',
      'paidUpCapitalUnit',
      'contactPersonName',
      'contactPersonDetails',
      'reportingBoundary',
      'assuranceProvider',
      'assuranceType',
    ];

    return requiredFields.every((field) => !!data[field]?.toString().trim());
  };
  const validateDetailsOfBusinessForm = (data: any): boolean => {
    const groups = Array.isArray(data?.groups) ? data.groups : [];

    if (groups.length === 0) return false;

    return groups.every(
      (group: any) => group.mainActivity?.toString().trim()
        && group.businessActivity?.toString().trim()
        && group.turnover?.toString().trim()
        && group.unit?.toString().trim(),
    );
  };
  const validateProductsServicesForm = (data: any): boolean => {
    if (!Array.isArray(data.groups) || data.groups.length === 0) return false;

    return data.groups.every(
      (group: any) => group.productService?.trim()
        && group.nicCode?.trim()
        && group.turnover?.toString().trim()
        && group.unit?.trim(),
    );
  };
  const validateLocationsForm = (data: any): boolean => {
    const requiredFields = [
      'nationalPlants',
      'nationalOffices',
      'internationalPlants',
      'internationalOffices',
    ];

    return requiredFields.every((field) => !!data[field]?.toString().trim());
  };
  const validateMarketServedForm = (data: any): boolean => {
    const requiredFields = ['nationalStates', 'internationalCountries'];

    return requiredFields.every((field) => !!data[field]?.toString().trim());
  };
  const validateTypesOfCustomerForm = (data: any): boolean => !!data.customerDescription?.toString().trim();
  const validateHoldingCompanyForm = (data: any): boolean => {
    if (!Array.isArray(data.groups) || data.groups.length === 0) return false;

    return data.groups.every(
      (group: any) => group.companyName?.trim()
        && group.companyType?.trim()
        && group.sharesHeld?.toString().trim()
        && group.participates?.trim(),
    );
  };
  const validateCsrDetailsForm = (data: any): boolean => !!data.csrApplicable?.toString().trim();
  const validateMaterialIssuesForm = (data: any): boolean => {
    if (!Array.isArray(data.groups) || data.groups.length === 0) return false;

    return data.groups.every(
      (group: any) => group.materialIssue?.trim()
        && group.riskOrOpportunity?.trim()
        && group.rationale?.trim()
        && group.approach?.trim()
        && group.financialImplications?.trim(),
    );
  };

  const handlePreviewClick = async () => {
    if (!selectedYear) {
      toast.error('Please select a financial year before previewing the form.');
      return false;
    }
    await Promise.all([
      companyInformationFormRef.current?.submitForm?.(),
      detailsOfBusinessFormRef.current?.submitForm?.(),
      productsServicesFormRef.current?.submitForm?.(),
      locationsWherePlantsFormRef.current?.submitForm?.(),
      marketServedFormRef.current?.submitForm?.(),
      typesOfCustomersFormRef.current?.submitForm?.(),
      holdingCompanyFormRef.current?.submitForm?.(),
      csrDetailsFormRef.current?.submitForm?.(),
      materialIssuesFormRef.current?.submitForm?.(),
    ]);

    // Get values from each form

    const companyInfo = companyInformationFormRef.current?.getValues?.() || {};
    const detailsOfBusiness = detailsOfBusinessFormRef.current?.getValues?.() || {};
    const productsServices = productsServicesFormRef.current?.getValues?.() || {};
    const locations = locationsWherePlantsFormRef.current?.getValues?.() || {};
    const marketServed = marketServedFormRef.current?.getValues?.() || {};
    const typesOfCustomers = typesOfCustomersFormRef.current?.getValues?.() || {};
    const holdingCompany = holdingCompanyFormRef.current?.getValues?.() || {};
    const csrDetails = csrDetailsFormRef.current?.getValues?.() || {};
    const materialIssues = materialIssuesFormRef.current?.getValues?.() || {};

    const isValid = validateCompanyInfoForm(companyInfo)
      && validateDetailsOfBusinessForm(detailsOfBusiness)
      && validateProductsServicesForm(productsServices)
      && validateLocationsForm(locations)
      && validateMarketServedForm(marketServed)
      && validateTypesOfCustomerForm(typesOfCustomers)
      && validateHoldingCompanyForm(holdingCompany)
      && validateCsrDetailsForm(csrDetails)
      && validateMaterialIssuesForm(materialIssues);

    if (!isValid) {
      toast.error(
        'Please complete all required fields in the General Disclosure forms.',
      );
      return false;
    }

    const finalOutput = {
      name: 'General',
      datacube_id: selectedYear,
      submitted_by: user?.id,
      indicators: [
        {
          name: 'Company Information',
          questions: buildCompanyInfoOutput(companyInfo),
        },
        {
          name: "Details of Businesses / Services (accounting for 90% of the entity's turnover)",
          questions: buildDetailsOfBusinessOutput(detailsOfBusiness),
        },
        {
          name: "Products / Services Sold by Entity (accounting for 90% of the entity's turnover)",
          questions: buildProductServicesOutput(productsServices),
        },
        {
          name: 'Locations where plants and/or operations/offices of the entity are situated',
          questions: buildLocationsOutput(locations),
        },
        {
          name: 'Markets served by the entity',
          questions: buildMarketServedOutput(marketServed),
        },
        {
          name: 'Details on the Type of customers',
          questions: buildtypesOfCustomerOutput(typesOfCustomers),
        },
        {
          name: 'Holding, Subsidiary and Associate Companies (Including Joint Ventures)',
          questions: buildHoldingCompanyOutput(holdingCompany),
        },
        {
          name: 'CSR Details',
          questions: buildCrsDetailsOutput(csrDetails),
        },
        {
          name: 'Overview of the entity’s material responsible business conduct issues',
          questions: buildMaterialIssued(materialIssues),
        },
      ],
    };

    // console.log(finalOutput, 'finalOutput');

    let res;
    if (id) {
      res = await DisclosureService.update(apiKey, id, finalOutput);
    } else {
      res = await DisclosureService.create(
        finalOutput,
        urlParams?.subdomain as string,
      );
    }
    setIsLoading(true);
    console.log(res, 'res');
    const { success, error } = res?.data as {
      success: boolean;
      error: string[];
    };
    if (success) {
      toast.success('General data submitted successfully');
      router.push('/disclosure/general');
    } else {
      toast.error(error[0]);
    }
    setIsLoading(false);
    // console.log('📦 FINAL OUTPUT', finalOutput);
    // alert('✅ Preview Generated!\nCheck the console for combined form values.');
    return true;
  };
  // const getFinancialYears = (
  //   years: number
  // ): { label: string; value: string }[] => {
  //   const currentYear = new Date().getFullYear();
  //   const currentMonth = new Date().getMonth();
  //   const finalYear = currentMonth >= 3 ? currentYear : currentYear - 1;
  //   return Array.from({ length: years }, (_, i) => {
  //     const startYear = finalYear - i;
  //     const endYear = startYear + 1;
  //     const label = `${startYear}_${endYear}`;
  //     return { label, value: label };
  //   });
  // };
  // const yearOptions = getFinancialYears(10);
  const router = useRouter();

  const yearOptions = datacubes?.map((datacube) => ({
    label: datacube.financial_year ?? datacube.name,
    value: datacube.id,
  })) ?? [];

  useEffect(() => {
    if (yearOptions.length === 1) {
      setSelectedYear(yearOptions[0].value);
    }
  }, [yearOptions]);

  const breadCrumbsItem = React.useMemo(() => [
    { title: 'General', url: '/disclosure/general' },
    { title: activeIndicator?.name, url: '#' },
  ], [activeIndicator?.name]);

  const breadCrumbMenu = [{ title: '', breadCrumb: breadCrumbsItem }];

  return (
    <PageHeaderWrapper
      breadCrumbMenu={breadCrumbMenu}
      extraClassName="my-4 px-4 pt-3"
      title="General"
      iswhite
      stackComponent={
        datacubes && datacubes.length > 0 ? (
          <div className="d-flex justify-content-end align-items-center gap-3">
            <div className="min-width-select">
              <Select
                isDisabled={isViewPage}
                placeholder="Select Financial Year"
                options={yearOptions}
                value={yearOptions?.find((opt) => opt?.value === selectedYear)}
                onChange={(opt) => setSelectedYear(opt?.value || '')}
                isMulti={false}
                classNamePrefix="custom_select_input"
                styles={CustomStyles}
              />
            </div>
            {!isViewPage && (
              <Button
                isSolid
                text={isLoading ? 'Saving...' : 'Submit'}
                onClick={handlePreviewClick}
                isLoading={isLoading}
              />
            )}
          </div>
        ) : undefined
      }
    >
      {datacubes && datacubes.length > 0 ? (
        <div className="row">
          <div className="col-12 col-lg-3 mb-4">
            <div className="p-3 border rounded bg-white">
              <div className="text-muted mb-2 fw-bold">Indicators</div>
              {indicators.map((indicator) => (
                <div
                  key={indicator.name}
                  className={`sidebarItem p-3 mb-3 ${activeIndicator.name === indicator.name ? 'active' : ''}`}
                  onClick={() => setActiveIndicator(indicator)}
                >
                  <div className="d-flex justify-content-between align-items-center mb-2">
                    <span
                      className={`fs-14 fw-500 ${activeIndicator.name === indicator.name ? 'text-warning fw-bold' : ''}`}
                    >
                      {indicator.name}
                    </span>
                  </div>
                  <div className="text-muted fs-14">
                    {indicator.percent}
                    {' '}
                    Completed
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="col-12 col-lg-9">
            <div className="p-4 border rounded bg-white">{renderForm()}</div>
          </div>
        </div>
      ) : (
        <div className="alert alert-warning text-center" role="alert">
          Please create your first datacube to view this content.
        </div>
      )}
    </PageHeaderWrapper>
  );
};

export default GeneralDisclosurePage;
