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
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-tabs */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-restricted-syntax */
/* eslint-disable no-unused-vars */
/* eslint-disable max-len */

'use client';

import { useParams, useRouter, usePathname } from 'next/navigation';
import React, {
  useState,
  useEffect,
  forwardRef,
  useRef,
  useImperativeHandle,
} from 'react';
import './ImpactAssessment.css';
import Select from 'react-select';
import { CustomStyles } from '@/components/CustomStyles/CustomStyles';
import { Button } from '@/components/Button/Button';
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
import { IDataCube } from '@/lib/interface/IDataCube.interface';
import PageHeaderWrapper from '@/components/PageHeaderWrapper/PageHeaderWrapper';
import DateField from '@/components/ResponseInputFields/DateField';

export interface SocialImpactAssessmentFormRef {
  submitForm: () => Promise<void>;
  getValues: () => any;
}

type SocialImpactAssessmentProps = {
  initialValues: {
    hasSocialImpactAssessment: string;
    groups: {
      projectName: string; // TEXT
      projectDetails: string; // TEXT
      siaNotificationNumber: string; // TEXT
      notificationDate: string; // DATE (ISO string or "YYYY-MM-DD")
      externalAgency: string; // SINGLE_SELECT (Yes/No)
      resultsPublic: string; // SINGLE_SELECT (Yes/No)
      webLink: string; // TEXT (URL)
      negativeImpact: string; // TEXT
      correctiveAction: string;
    }[];
  };

  onChange: (data: any) => void;
  isViewPage: boolean;
};

const SocialImpactAssessmentForm = forwardRef<
  SocialImpactAssessmentFormRef,
  SocialImpactAssessmentProps
>(({ initialValues, onChange, isViewPage }, ref) => {
  const socialImpactAssessmentSchema = Yup.object({
    hasSocialImpactAssessment: Yup.string().required('Required'),
    groups: Yup.array().of(
      Yup.object({
        projectName: Yup.string().required('Required'),
        projectDetails: Yup.string().required('Required'),
        siaNotificationNumber: Yup.string().required('Required'),
        notificationDate: Yup.date().required('Required'),
        externalAgency: Yup.string().required('Required'),
        resultsPublic: Yup.string().required('Required'),
        webLink: Yup.string().url('Invalid URL').required('Required'),
        negativeImpact: Yup.string().required('Required'),
        correctiveAction: Yup.string().required('Required'),
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
      validationSchema={socialImpactAssessmentSchema}
      onSubmit={handleSubmit}
    >
      {(formik) => {
        useEffect(() => {
          onChange(formik.values);
        }, [formik.values, onChange]);

        useImperativeHandle(ref, () => ({
          submitForm: () => formik.submitForm(),
          getValues: () => formik.values,
        }));

        return (
          <Form>
            <div className="container-fluid">
              <h6 className="fw-bold mb-4 fs-16">Social Impact Assessment</h6>

              {/* Main Question */}
              <div className="row mb-3 align-items-center">
                <label className="col-md-4 col-form-label small-label fs-13">
                  Has the entity undertaken any social impact assessments
                </label>
                <div className="col-md-8">
                  <Select
                    isDisabled={isViewPage}
                    inputId="hasSocialImpactAssessment"
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
                      (option) => option.value === formik.values.hasSocialImpactAssessment,
                    )}
                    onChange={(selectedOption) => {
                      const value = selectedOption?.value;
                      formik.setFieldValue('hasSocialImpactAssessment', value);

                      // If Yes, ensure at least one group exists
                      if (
                        value === 'Yes'
                        && formik.values.groups?.length === 0
                      ) {
                        formik.setFieldValue('groups', [
                          {
                            projectName: '',
                            projectDetails: '',
                            siaNotificationNumber: '',
                            notificationDate: '',
                            externalAgency: '',
                            resultsPublic: '',
                            webLink: '',
                            negativeImpact: '',
                            correctiveAction: '',
                          },
                        ]);
                      }

                      // If No, reset groups
                      if (value === 'No') {
                        formik.setFieldValue('groups', []);
                      }
                    }}
                    placeholder="Select"
                  />
                  <ErrorMessage
                    name="hasSocialImpactAssessment"
                    component="div"
                    className="text-danger small"
                  />
                </div>
              </div>

              {/* Conditional Groups (only if Yes) */}
              {formik.values.hasSocialImpactAssessment === 'Yes' && (
                <FieldArray name="groups">
                  {({ push, remove }) => (
                    <>
                      {formik.values.groups.map((_, index: number) => (
                        <div key={index} className="custom-box mt-3">
                          {/* Project Name */}
                          <div className="row mb-3">
                            <label className="col-md-4 col-form-label small-label fs-13">
                              Name of Project
                            </label>
                            <div className="col-md-8">
                              <Field
                                disabled={isViewPage}
                                type="text"
                                name={`groups[${index}].projectName`}
                                className="form-control form-control-sm"
                                placeholder="Enter project name"
                              />
                              <ErrorMessage
                                name={`groups[${index}].projectName`}
                                component="div"
                                className="text-danger small"
                              />
                            </div>
                          </div>

                          {/* Project Details */}
                          <div className="row mb-3">
                            <label className="col-md-4 col-form-label small-label fs-13">
                              Details of Project
                            </label>
                            <div className="col-md-8">
                              <Field
                                disabled={isViewPage}
                                type="text"
                                name={`groups[${index}].projectDetails`}
                                className="form-control form-control-sm"
                                placeholder="Enter project details"
                              />
                              <ErrorMessage
                                name={`groups[${index}].projectDetails`}
                                component="div"
                                className="text-danger small"
                              />
                            </div>
                          </div>

                          {/* Notification Number */}
                          <div className="row mb-3">
                            <label className="col-md-4 col-form-label small-label fs-13">
                              SIA Notification number
                            </label>
                            <div className="col-md-8">
                              <Field
                                disabled={isViewPage}
                                type="text"
                                name={`groups[${index}].siaNotificationNumber`}
                                className="form-control form-control-sm"
                                placeholder="Enter notification number"
                              />
                              <ErrorMessage
                                name={`groups[${index}].siaNotificationNumber`}
                                component="div"
                                className="text-danger small"
                              />
                            </div>
                          </div>

                          {/* Date of Notification */}
                          <div className="row mb-3">
                            <label className="col-md-4 col-form-label small-label fs-13">
                              Date of Notification
                            </label>
                            <div
                              className="col-md-8"
                              style={{
                                color: isViewPage ? '#6c757d' : 'inherit',
                              }}
                            >
                              <DateField
                                placeholder="Select date"
                                isCustomRequired
                                isDisabled={isViewPage}
                                name={`groups[${index}].notificationDate`}
                                value={
                                  formik.values.groups[index]
                                    .notificationDate || ''
                                } // 👈 pass string
                                onChange={(value: string) => {
                                  formik.setFieldValue(
                                    `groups[${index}].notificationDate`,
                                    value || '',
                                  );
                                }}
                              />
                              <ErrorMessage
                                name={`groups[${index}].notificationDate`}
                                component="div"
                                className="text-danger small"
                              />
                            </div>
                          </div>

                          {/* External Agency */}
                          <div className="row mb-3">
                            <label className="col-md-4 col-form-label small-label fs-13">
                              Has the assessment been conducted by external
                              agency
                            </label>
                            <div className="col-md-8">
                              <Select
                                isDisabled={isViewPage}
                                inputId={`groups[${index}].externalAgency`}
                                classNamePrefix="custom_select_input"
                                placeholder="Select"
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
                                    === formik.values.groups[index].externalAgency,
                                )}
                                onChange={(selectedOption) => formik.setFieldValue(
                                  `groups[${index}].externalAgency`,
                                  selectedOption?.value,
                                )}
                              />
                              <ErrorMessage
                                name={`groups[${index}].externalAgency`}
                                component="div"
                                className="text-danger small"
                              />
                            </div>
                          </div>

                          {/* Results in Public Domain */}
                          <div className="row mb-3">
                            <label className="col-md-4 col-form-label small-label fs-13">
                              Results communicated in public domain
                            </label>
                            <div className="col-md-8">
                              <Select
                                isDisabled={isViewPage}
                                inputId={`groups[${index}].resultsPublic`}
                                classNamePrefix="custom_select_input"
                                placeholder="Select"
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
                                    === formik.values.groups[index].resultsPublic,
                                )}
                                onChange={(selectedOption) => formik.setFieldValue(
                                  `groups[${index}].resultsPublic`,
                                  selectedOption?.value,
                                )}
                              />
                              <ErrorMessage
                                name={`groups[${index}].resultsPublic`}
                                component="div"
                                className="text-danger small"
                              />
                            </div>
                          </div>

                          {/* Web Link */}
                          <div className="row mb-3">
                            <label className="col-md-4 col-form-label small-label fs-13">
                              Relevant Web Link
                            </label>
                            <div className="col-md-8">
                              <Field
                                disabled={isViewPage}
                                type="text"
                                name={`groups[${index}].webLink`}
                                className="form-control form-control-sm"
                                placeholder="Enter web link"
                              />
                              <ErrorMessage
                                name={`groups[${index}].webLink`}
                                component="div"
                                className="text-danger small"
                              />
                            </div>
                          </div>

                          {/* Negative Impact */}
                          <div className="row mb-3">
                            <label className="col-md-4 col-form-label small-label fs-13">
                              Details of Negative Social Impact identified
                            </label>
                            <div className="col-md-8">
                              <Field
                                disabled={isViewPage}
                                type="text"
                                name={`groups[${index}].negativeImpact`}
                                className="form-control form-control-sm"
                                placeholder="Enter details"
                              />
                              <ErrorMessage
                                name={`groups[${index}].negativeImpact`}
                                component="div"
                                className="text-danger small"
                              />
                            </div>
                          </div>

                          {/* Corrective Action */}
                          <div className="row mb-3">
                            <label className="col-md-4 col-form-label small-label fs-13">
                              Corrective Action taken
                            </label>
                            <div className="col-md-8">
                              <Field
                                disabled={isViewPage}
                                type="text"
                                name={`groups[${index}].correctiveAction`}
                                className="form-control form-control-sm"
                                placeholder="Enter corrective action"
                              />
                              <ErrorMessage
                                name={`groups[${index}].correctiveAction`}
                                component="div"
                                className="text-danger small"
                              />
                            </div>
                          </div>

                          {/* Delete Group */}
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

                      {/* Add Group */}
                      <div className="text-end">
                        {!isViewPage && (
                          <button
                            className="btn btn-dark btn-sm"
                            type="button"
                            onClick={() => push({
                              projectName: '',
                              projectDetails: '',
                              siaNotificationNumber: '',
                              notificationDate: '',
                              externalAgency: '',
                              resultsPublic: '',
                              webLink: '',
                              negativeImpact: '',
                              correctiveAction: '',
                            })}
                          >
                            Add Group
                          </button>
                        )}
                      </div>
                    </>
                  )}
                </FieldArray>
              )}
            </div>
          </Form>
        );
      }}
    </Formik>
  );
});

export interface EnvironmentalImpactAssessmentFormRef {
  submitForm: () => Promise<void>;
  getValues: () => any;
}

type EnvironmentalImpactAssessmentProps = {
  initialValues: {
    hasEnvironmentalImpactAssessment: string;
    groups: {
      projectName: string; // TEXT
      projectDetails: string; // TEXT
      eiaNotificationNumber: string; // TEXT
      notificationDate: string; // DATE (ISO string or "YYYY-MM-DD")
      externalAgency: string; // SINGLE_SELECT (Yes/No)
      resultsPublic: string; // SINGLE_SELECT (Yes/No)
      webLink: string; // TEXT (URL)
    }[];
  };

  onChange: (data: any) => void;
  isViewPage: boolean;
};

const EnvironmentalImpactAssessmentForm = forwardRef<
  EnvironmentalImpactAssessmentFormRef,
  EnvironmentalImpactAssessmentProps
>(({ initialValues, onChange, isViewPage }, ref) => {
  const environmentalImpactAssessmentSchema = Yup.object({
    hasEnvironmentalImpactAssessment: Yup.string().required('Required'),
    groups: Yup.array().of(
      Yup.object({
        projectName: Yup.string().required('Required'),
        projectDetails: Yup.string().required('Required'),
        eiaNotificationNumber: Yup.string().required('Required'),
        notificationDate: Yup.date().required('Required'),
        externalAgency: Yup.string().required('Required'),
        resultsPublic: Yup.string().required('Required'),
        webLink: Yup.string().url('Invalid URL').required('Required'),
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
      validationSchema={environmentalImpactAssessmentSchema}
      onSubmit={handleSubmit}
    >
      {(formik) => {
        useEffect(() => {
          onChange(formik.values);
        }, [formik.values, onChange]);

        useImperativeHandle(ref, () => ({
          submitForm: () => formik.submitForm(),
          getValues: () => formik.values,
        }));

        return (
          <Form>
            <div className="container-fluid">
              <h6 className="fw-bold mb-4 fs-16">
                Environmental Impact Assessment
              </h6>

              {/* Main Question */}
              <div className="row mb-3 align-items-center">
                <label className="col-md-4 col-form-label small-label fs-13">
                  Has the entity undertaken any environmental impact assessments
                </label>
                <div className="col-md-8">
                  <Select
                    isDisabled={isViewPage}
                    inputId="hasEnvironmentalImpactAssessment"
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
                        === formik.values.hasEnvironmentalImpactAssessment,
                    )}
                    onChange={(selectedOption) => {
                      const value = selectedOption?.value;
                      formik.setFieldValue(
                        'hasEnvironmentalImpactAssessment',
                        value,
                      );

                      if (
                        value === 'Yes'
                        && formik.values.groups?.length === 0
                      ) {
                        formik.setFieldValue('groups', [
                          {
                            projectName: '',
                            projectDetails: '',
                            eiaNotificationNumber: '',
                            notificationDate: '',
                            externalAgency: '',
                            resultsPublic: '',
                            webLink: '',
                          },
                        ]);
                      }

                      if (value === 'No') {
                        formik.setFieldValue('groups', []);
                      }
                    }}
                    placeholder="Select"
                  />
                  <ErrorMessage
                    name="hasEnvironmentalImpactAssessment"
                    component="div"
                    className="text-danger small"
                  />
                </div>
              </div>

              {/* Conditional Groups */}
              {formik.values.hasEnvironmentalImpactAssessment === 'Yes' && (
                <FieldArray name="groups">
                  {({ push, remove }) => (
                    <>
                      {formik.values.groups.map((_, index: number) => (
                        <div key={index} className="custom-box mt-3">
                          {/* Project Name */}
                          <div className="row mb-3">
                            <label className="col-md-4 col-form-label small-label fs-13">
                              Name of Project
                            </label>
                            <div className="col-md-8">
                              <Field
                                disabled={isViewPage}
                                type="text"
                                name={`groups[${index}].projectName`}
                                className="form-control form-control-sm"
                                placeholder="Enter project name"
                              />
                              <ErrorMessage
                                name={`groups[${index}].projectName`}
                                component="div"
                                className="text-danger small"
                              />
                            </div>
                          </div>

                          {/* Project Details */}
                          <div className="row mb-3">
                            <label className="col-md-4 col-form-label small-label fs-13">
                              Details of Project
                            </label>
                            <div className="col-md-8">
                              <Field
                                disabled={isViewPage}
                                type="text"
                                name={`groups[${index}].projectDetails`}
                                className="form-control form-control-sm"
                                placeholder="Enter project details"
                              />
                              <ErrorMessage
                                name={`groups[${index}].projectDetails`}
                                component="div"
                                className="text-danger small"
                              />
                            </div>
                          </div>

                          {/* EIA Notification Number */}
                          <div className="row mb-3">
                            <label className="col-md-4 col-form-label small-label fs-13">
                              EIA Notification number
                            </label>
                            <div className="col-md-8">
                              <Field
                                disabled={isViewPage}
                                type="text"
                                name={`groups[${index}].eiaNotificationNumber`}
                                className="form-control form-control-sm"
                                placeholder="Enter notification number"
                              />
                              <ErrorMessage
                                name={`groups[${index}].eiaNotificationNumber`}
                                component="div"
                                className="text-danger small"
                              />
                            </div>
                          </div>

                          {/* Date of Notification */}
                          <div className="row mb-3">
                            <label className="col-md-4 col-form-label small-label fs-13">
                              Date of Notification
                            </label>
                            <div
                              className="col-md-8"
                              style={{
                                color: isViewPage ? '#6c757d' : 'inherit',
                              }}
                            >
                              <DateField
                                placeholder="Select date"
                                isCustomRequired
                                isDisabled={isViewPage}
                                name={`groups[${index}].notificationDate`}
                                value={
                                  formik.values.groups[index]
                                    .notificationDate || ''
                                } // 👈 pass string
                                onChange={(value: string) => {
                                  formik.setFieldValue(
                                    `groups[${index}].notificationDate`,
                                    value || '',
                                  );
                                }}
                              />

                              <ErrorMessage
                                name={`groups[${index}].notificationDate`}
                                component="div"
                                className="text-danger small"
                              />
                            </div>
                          </div>

                          {/* External Agency */}
                          <div className="row mb-3">
                            <label className="col-md-4 col-form-label small-label fs-13">
                              Has the assessment been conducted by external
                              agency
                            </label>
                            <div className="col-md-8">
                              <Select
                                isDisabled={isViewPage}
                                inputId={`groups[${index}].externalAgency`}
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
                                    === formik.values.groups[index].externalAgency,
                                )}
                                onChange={(selectedOption) => formik.setFieldValue(
                                  `groups[${index}].externalAgency`,
                                  selectedOption?.value,
                                )}
                                placeholder="Select"
                              />
                              <ErrorMessage
                                name={`groups[${index}].externalAgency`}
                                component="div"
                                className="text-danger small"
                              />
                            </div>
                          </div>

                          {/* Results in Public Domain */}
                          <div className="row mb-3">
                            <label className="col-md-4 col-form-label small-label fs-13">
                              Results communicated in public domain
                            </label>
                            <div className="col-md-8">
                              <Select
                                isDisabled={isViewPage}
                                inputId={`groups[${index}].resultsPublic`}
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
                                    === formik.values.groups[index].resultsPublic,
                                )}
                                onChange={(selectedOption) => formik.setFieldValue(
                                  `groups[${index}].resultsPublic`,
                                  selectedOption?.value,
                                )}
                                placeholder="Select"
                              />
                              <ErrorMessage
                                name={`groups[${index}].resultsPublic`}
                                component="div"
                                className="text-danger small"
                              />
                            </div>
                          </div>

                          {/* Web Link */}
                          <div className="row mb-3">
                            <label className="col-md-4 col-form-label small-label fs-13">
                              Relevant Web Link
                            </label>
                            <div className="col-md-8">
                              <Field
                                disabled={isViewPage}
                                type="text"
                                name={`groups[${index}].webLink`}
                                className="form-control form-control-sm"
                                placeholder="Enter web link"
                              />
                              <ErrorMessage
                                name={`groups[${index}].webLink`}
                                component="div"
                                className="text-danger small"
                              />
                            </div>
                          </div>

                          {/* Delete Group */}
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

                      {/* Add Group */}
                      <div className="text-end">
                        {!isViewPage && (
                          <button
                            className="btn btn-dark btn-sm"
                            type="button"
                            onClick={() => push({
                              projectName: '',
                              projectDetails: '',
                              eiaNotificationNumber: '',
                              notificationDate: '',
                              externalAgency: '',
                              resultsPublic: '',
                              webLink: '',
                            })}
                          >
                            Add Group
                          </button>
                        )}
                      </div>
                    </>
                  )}
                </FieldArray>
              )}
            </div>
          </Form>
        );
      }}
    </Formik>
  );
});

const ImpactAssessment: React.FC<{
  user: IUser;
  disclosureData?: any;
  id?: string;
  apiKey?: string | any;
  datacubes?: IDataCube[];
}> = ({
  user, disclosureData, id, apiKey, datacubes,
}) => {
  // console.log(disclosureData, 'disclosureData');
  const pathname = usePathname();
  const isViewPage = pathname.endsWith('/view');

  const [socialIndicator, setSocialIndicator] = useState({
    name: 'Social Impact Assessment',
    status: 'Pending',
    percent: '0%',
    badge: 'bg-danger',
  });

  const [environmentalIndicator, setEnvironmentalIndicator] = useState({
    name: 'Environmental Impact Assessment',
    status: 'Pending',
    percent: '0%',
    badge: 'bg-danger',
  });

  const indicators = [socialIndicator, environmentalIndicator];
  const urlParams = useParams();
  const [activeIndicator, setActiveIndicator] = useState(indicators[0]);

  const calculateFormCompletionPercent = (
    formData: any,
    dependencyKey: any,
    groupIndex = 0,
  ) => {
    const dependency = formData?.[dependencyKey];

    if (dependency === 'No') return 100;
    if (dependency !== 'Yes') return 0;

    const group = formData.groups?.[groupIndex] || {};
    const total = 1 + Object.keys(group).length;
    let filled = dependency ? 1 : 0;

    Object.values(group).forEach((val) => {
      if (val !== '' && val !== null && val !== undefined) filled += 1;
    });

    return Math.round((filled / total) * 100);
  };

  const socialImpactAssessmentFormRef = useRef<SocialImpactAssessmentFormRef>(null);
  const environmentalImpactAssessmentFormRef = useRef<EnvironmentalImpactAssessmentFormRef>(null);
  const [selectedYear, setSelectedYear] = useState<any>('');
  const [isLoading, setIsLoading] = useState(false);

  const [socialImpactFormData, setSocialImpactFormData] = useState({
    hasSocialImpactAssessment: '',
    groups: [
      {
        projectName: '',
        projectDetails: '',
        siaNotificationNumber: '',
        notificationDate: '',
        externalAgency: '',
        resultsPublic: '',
        webLink: '',
        negativeImpact: '',
        correctiveAction: '',
      },
    ],
  });
  const [environmentalImpactFormData, setEnvironmentalImpactFormData] = useState({
    hasEnvironmentalImpactAssessment: '',
    groups: [
      {
        projectName: '',
        projectDetails: '',
        eiaNotificationNumber: '',
        notificationDate: '',
        externalAgency: '',
        resultsPublic: '',
        webLink: '',
      },
    ],
  });

  const [isSocialImpactDataLoaded, setIsSocialImpactDataLoaded] = useState(false);
  const [isEnvironmentalImpactDataLoaded, setIsEnvironmentalImpactDataLoaded] = useState(false);

  // ------------------------- Social Impact Assessment -------------------------
  const socialImpactQuestions = [
    {
      id: 'UID_95',
      key: 'hasSocialImpactAssessment',
      label: 'Has the entity undertaken any social impact assessments?',
      isGroup: false,
    },
    {
      id: 'UID_96',
      key: 'projectName',
      label: 'Name of Project',
      isGroup: true,
    },
    {
      id: 'UID_97',
      key: 'projectDetails',
      label: 'Details of Project',
      isGroup: true,
    },
    {
      id: 'UID_98',
      key: 'siaNotificationNumber',
      label: 'SIA Notification number',
      isGroup: true,
    },
    {
      id: 'UID_99',
      key: 'notificationDate',
      label: 'Date of Notification',
      isGroup: true,
    },
    {
      id: 'UID_100',
      key: 'externalAgency',
      label: 'Has the assessment been conducted by external agency',
      isGroup: true,
    },
    {
      id: 'UID_101',
      key: 'resultsPublic',
      label: 'Results communicated in public domain',
      isGroup: true,
    },
    {
      id: 'UID_102',
      key: 'webLink',
      label: 'Relevant Web Link',
      isGroup: true,
    },
    {
      id: 'UID_103',
      key: 'negativeImpact',
      label: 'Details of Negative Social Impact identified',
      isGroup: true,
    },
    {
      id: 'UID_104',
      key: 'correctiveAction',
      label: 'Corrective Action taken',
      isGroup: true,
    },
  ];

  const parseSocialFromApi = (questionsFromApi: any[]) => {
    const formData: any = {
      hasSocialImpactAssessment: '',
      groups: [],
    };

    // Find the main question UID_95
    const mainQuestion = questionsFromApi.find(
      (q: any) => q.universal_question_id === 'UID_95',
    );

    formData.hasSocialImpactAssessment = mainQuestion?.answer || '';

    const hasAnsweredYes = mainQuestion?.answer === 'Yes';

    if (hasAnsweredYes && Array.isArray(mainQuestion?.group)) {
      formData.groups = mainQuestion.group.map((groupSet: any[]) => {
        const groupObj: any = {};

        // groupSet is an array of question-answer objects
        groupSet.forEach((item: any) => {
          const matched = socialImpactQuestions.find(
            (q) => q.id === item.universal_question_id,
          );
          if (matched) {
            groupObj[matched.key] = item.answer ?? '';
          }
        });

        return groupObj;
      });
    }

    return formData;
  };

  const buildSocialImpactOutput = (socialImpactRaw: any) => {
    const mainQuestion = socialImpactQuestions.find((q) => !q.isGroup);
    const groupQuestions = socialImpactQuestions.filter((q) => q.isGroup);
    const output: any[] = [];

    if (mainQuestion) {
      const mainAnswer = socialImpactRaw.hasSocialImpactAssessment || '';
      const mainEntry: any = {
        universal_question_id: mainQuestion.id,
        question_title: mainQuestion.label,
        answer: mainAnswer,
      };

      if (
        mainAnswer === 'Yes'
        && Array.isArray(socialImpactRaw.groups)
        && socialImpactRaw.groups.length > 0
      ) {
        mainEntry.group = socialImpactRaw.groups.map((groupAns: any) => groupQuestions.map((q) => ({
          universal_question_id: q.id,
          question_title: q.label,
          answer: groupAns[q.key] || '',
        })));
      }

      output.push(mainEntry);
    }

    return output;
  };
  // ------------------------- Environmental Impact Assessment -------------------------
  const environmentalImpactQuestions = [
    {
      id: 'UID_105',
      key: 'hasEnvironmentalImpactAssessment',
      label: 'Has the entity undertaken any environmental impact assessments?',
      isGroup: false,
    },
    {
      id: 'UID_106',
      key: 'projectName',
      label: 'Name of Project',
      isGroup: true,
    },
    {
      id: 'UID_107',
      key: 'projectDetails',
      label: 'Details of Project',
      isGroup: true,
    },
    {
      id: 'UID_108',
      key: 'eiaNotificationNumber',
      label: 'EIA Notification number',
      isGroup: true,
    },
    {
      id: 'UID_109',
      key: 'notificationDate',
      label: 'Date of Notification',
      isGroup: true,
    },
    {
      id: 'UID_110',
      key: 'externalAgency',
      label: 'Has the assessment been conducted by external agency',
      isGroup: true,
    },
    {
      id: 'UID_111',
      key: 'resultsPublic',
      label: 'Results communicated in public domain',
      isGroup: true,
    },
    {
      id: 'UID_112',
      key: 'webLink',
      label: 'Relevant Web Link',
      isGroup: true,
    },
  ];

  const parseEnvironmentalFromApi = (questionsFromApi: any[]) => {
    const formData: any = {
      hasEnvironmentalImpactAssessment: '',
      groups: [],
    };

    // Get the main question by ID
    const mainQuestion = questionsFromApi.find(
      (q: any) => q.universal_question_id === 'UID_105',
    );

    formData.hasEnvironmentalImpactAssessment = mainQuestion?.answer || '';

    const hasAnsweredYes = mainQuestion?.answer === 'Yes';

    if (hasAnsweredYes) {
      // If group data exists from API
      if (Array.isArray(mainQuestion.group) && mainQuestion.group.length > 0) {
        formData.groups = mainQuestion.group.map((groupSet: any[]) => {
          const groupObj: any = {};
          groupSet.forEach((item: any) => {
            const matched = environmentalImpactQuestions.find(
              (q) => q.id === item.universal_question_id,
            );
            if (matched) {
              groupObj[matched.key] = item.answer;
            }
          });
          return groupObj;
        });
      }
    }

    return formData;
  };

  const buildEnvironmentalImpactOutput = (environmentalImpactRaw: any) => {
    const mainQuestion = environmentalImpactQuestions.find((q) => !q.isGroup);
    const groupQuestions = environmentalImpactQuestions.filter(
      (q) => q.isGroup,
    );
    const output: any[] = [];

    if (mainQuestion) {
      const mainAnswer = environmentalImpactRaw.hasEnvironmentalImpactAssessment || '';
      const mainEntry: any = {
        universal_question_id: mainQuestion.id,
        question_title: mainQuestion.label,
        answer: mainAnswer,
      };

      if (
        mainAnswer === 'Yes'
        && Array.isArray(environmentalImpactRaw.groups)
        && environmentalImpactRaw.groups.length > 0
      ) {
        mainEntry.group = environmentalImpactRaw.groups.map((groupAns: any) => groupQuestions.map((q) => ({
          universal_question_id: q.id,
          question_title: q.label,
          answer: groupAns[q.key] || '',
        })));
      }

      output.push(mainEntry);
    }

    return output;
  };

  useEffect(() => {
    const socialPercent = calculateFormCompletionPercent(
      socialImpactFormData,
      'hasSocialImpactAssessment',
    );

    const environmentalPercent = calculateFormCompletionPercent(
      environmentalImpactFormData,
      'hasEnvironmentalImpactAssessment',
    );

    setSocialIndicator((prev) => ({
      ...prev,
      percent: `${socialPercent}%`,
      status: socialPercent === 100 ? 'Completed' : 'Pending',
      // badge: ownershipPercent === 100 ? 'bg-success' : 'bg-danger',
    }));

    setEnvironmentalIndicator((prev) => ({
      ...prev,
      percent: `${environmentalPercent}%`,
      status: environmentalPercent === 100 ? 'Completed' : 'Pending',
      // badge: publicPolicyPercent === 100 ? 'bg-success' : 'bg-danger',
    }));
  }, [socialImpactFormData, environmentalImpactFormData]);

  useEffect(() => {
    if (disclosureData?.indicators?.length > 0) {
      const socialIndicatorData = disclosureData.indicators.find(
        (item: any) => item.name?.trim()?.toLowerCase() === 'social impact assessment',
      );

      if (socialIndicatorData?.questions?.length > 0) {
        const parsedSocial = parseSocialFromApi(socialIndicatorData.questions);
        setSocialImpactFormData(parsedSocial);
        setIsSocialImpactDataLoaded(true);
      }

      const environmentalIndicatorData = disclosureData.indicators.find(
        (item: any) => item.name?.trim()?.toLowerCase() === 'environmental impact assessment',
      );

      if (environmentalIndicatorData?.questions?.length > 0) {
        const parsedEnvironmental = parseEnvironmentalFromApi(
          environmentalIndicatorData.questions,
        );
        setEnvironmentalImpactFormData(parsedEnvironmental);
        setIsEnvironmentalImpactDataLoaded(true);
      }

      // setSelectedYear(disclosureData?.financial_year || '');
      setSelectedYear(disclosureData?.datacube?.id || '');
    }
  }, [disclosureData]);

  // console.log(socialImpactFormData, 'social');
  // console.log(environmentalImpactFormData, 'environmental');

  const renderForm = () => {
    if (id) {
      if (!isSocialImpactDataLoaded && !isEnvironmentalImpactDataLoaded) {
        return <p>Loading form data...</p>;
      }
    }

    return (
      <>
        {/* Social Impact Assessment Form */}
        <div
          style={{
            display:
              activeIndicator.name === 'Social Impact Assessment'
                ? 'block'
                : 'none',
          }}
        >
          <SocialImpactAssessmentForm
            ref={socialImpactAssessmentFormRef}
            initialValues={socialImpactFormData}
            onChange={(data) => setSocialImpactFormData(data)}
            isViewPage={isViewPage}
          />
        </div>

        {/* Environmental Impact Assessment Form */}
        <div
          style={{
            display:
              activeIndicator.name === 'Environmental Impact Assessment'
                ? 'block'
                : 'none',
          }}
        >
          <EnvironmentalImpactAssessmentForm
            ref={environmentalImpactAssessmentFormRef}
            initialValues={environmentalImpactFormData}
            onChange={(data) => setEnvironmentalImpactFormData(data)}
            isViewPage={isViewPage}
          />
        </div>
      </>
    );
  };
  const router = useRouter();

  const handlePreviewClick = async () => {
    if (!selectedYear) {
      toast.error('Please select a financial year before submitting the form.');
      return false;
    }

    const submitPromises: Promise<void>[] = [];

    // Submit Social Impact Assessment form
    if (socialImpactAssessmentFormRef.current) {
      submitPromises.push(socialImpactAssessmentFormRef.current.submitForm());
    }

    // Submit Environmental Impact Assessment form
    if (environmentalImpactAssessmentFormRef.current) {
      submitPromises.push(
        environmentalImpactAssessmentFormRef.current.submitForm(),
      );
    }

    await Promise.all(submitPromises);

    const allFormValues = {
      financial_year: selectedYear,
      socialImpactAssessment:
        socialImpactAssessmentFormRef.current?.getValues?.() || {},
      environmentalImpactAssessment:
        environmentalImpactAssessmentFormRef.current?.getValues?.() || {},
    };

    // === Validation Start ===
    const isAnySocialImpactFieldEmpty = () => {
      const mainField = allFormValues.socialImpactAssessment.hasSocialImpactAssessment;
      if (!mainField?.trim()) return true;
      if (mainField.trim().toLowerCase() !== 'yes') return false;

      const groupEntries = Array.isArray(
        allFormValues.socialImpactAssessment.groups,
      )
        ? allFormValues.socialImpactAssessment.groups
        : [];

      return groupEntries.some((group: Record<string, string>) => socialImpactQuestions
        .filter((q) => q.isGroup)
        .some((q) => !group?.[q.key]?.trim()));
    };

    const isAnyEnvironmentalImpactFieldEmpty = () => {
      const mainField = allFormValues.environmentalImpactAssessment
        .hasEnvironmentalImpactAssessment;
      if (!mainField?.trim()) return true;
      if (mainField.trim().toLowerCase() !== 'yes') return false;

      const groupEntries = Array.isArray(
        allFormValues.environmentalImpactAssessment.groups,
      )
        ? allFormValues.environmentalImpactAssessment.groups
        : [];

      return groupEntries.some((group: Record<string, string>) => environmentalImpactQuestions
        .filter((q) => q.isGroup)
        .some((q) => !group?.[q.key]?.trim()));
    };

    if (isAnySocialImpactFieldEmpty() || isAnyEnvironmentalImpactFieldEmpty()) {
      toast.error('Please fill out all fields before submitting.');
      return false;
    }
    // === Validation End ===

    const socialImpactOutput = buildSocialImpactOutput(
      allFormValues.socialImpactAssessment,
    );
    const environmentalImpactOutput = buildEnvironmentalImpactOutput(
      allFormValues.environmentalImpactAssessment,
    );

    const finalOutput: any = {
      name: 'Impact Assessment',
      datacube_id: selectedYear,
      submitted_by: user?.id,
      indicators: [
        {
          name: 'Social Impact Assessment',
          questions: socialImpactOutput,
        },
        {
          name: 'Environmental Impact Assessment',
          questions: environmentalImpactOutput,
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

    const { success, error } = res?.data as {
      success: boolean;
      error: string[];
    };
    if (success) {
      toast.success('Impact Assessment data submitted successfully');
      router.push('/disclosure/impact_assessment');
    } else {
      toast.error(error[0]);
    }

    setIsLoading(false);
    return true;
  };

  const yearOptions = datacubes?.map((datacube) => ({
    label: datacube.financial_year ?? datacube.name,
    value: datacube.id,
  })) ?? [];
  useEffect(() => {
    if (yearOptions.length === 1) {
      setSelectedYear(yearOptions[0].value);
    }
  }, [yearOptions]);

  const breadCrumbsItem = React.useMemo(
    () => [
      { title: 'Impact Assessment', url: '/disclosure/impact_assessment' },
      { title: activeIndicator?.name, url: '#' },
    ],
    [activeIndicator?.name],
  );

  const breadCrumbMenu = [{ title: '', breadCrumb: breadCrumbsItem }];

  return (
    <PageHeaderWrapper
      breadCrumbMenu={breadCrumbMenu}
      extraClassName="my-4 px-4 pt-3"
      title="Impact Assessment"
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
                onChange={(opt: any) => setSelectedYear(opt?.value || '')}
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

export default ImpactAssessment;
