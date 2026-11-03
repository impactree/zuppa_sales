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

'use client';

import { useParams, useRouter, usePathname } from 'next/navigation';
import React, {
  useState,
  useEffect,
  forwardRef,
  useRef,
  useImperativeHandle,
} from 'react';
import './MiscellaneousDisclosure.css';
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

export interface OwnershipIPFormRef {
  submitForm: () => Promise<void>;
  getValues: () => any;
}

type OwnnershipIPFormProps = {
  initialValues: {
    // [financialYear: string]: {
    ownsTraditionalKnowledgeIP: string;
    groups: {
      traditionalKnowledgeIPDetails: string;
      isIPOwnedOrAcquired: string;
      benefitsShared: string;
      benefitSharingBasis: string;
      ipDisputesExist: string;
      authorityName: string;
      caseBrief: string;
      correctiveActions: string;
    }[];
  };

  onChange: (data: any) => void;
  isViewPage: boolean;
};

const OwnershipIPForm = forwardRef<OwnershipIPFormRef, OwnnershipIPFormProps>(
  ({ initialValues, onChange, isViewPage }, ref) => {
    const OwnershipIPSchema = Yup.object().shape({
      ownsTraditionalKnowledgeIP: Yup.string().required('Required'),
      groups: Yup.array().of(
        Yup.object().shape({
          traditionalKnowledgeIPDetails: Yup.string().required('Required'),
          isIPOwnedOrAcquired: Yup.string().required('Required'),
          benefitsShared: Yup.string().required('Required'),
          benefitSharingBasis: Yup.string().required('Required'),
          ipDisputesExist: Yup.string().required('Required'),
          authorityName: Yup.string().required('Required'),
          caseBrief: Yup.string().required('Required'),
          correctiveActions: Yup.string().required('Required'),
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
        validationSchema={OwnershipIPSchema}
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
                  Ownership of Intellectual Property
                </h6>

                {/* Owns traditional knowledge IP */}

                <div className="row mb-3 align-items-center">
                  <label className="col-md-4 col-form-label small-label fs-13">
                    Does the entity own or acquired any intellectual properties
                    based on traditional knowledge
                  </label>
                  <div className="col-md-8">
                    <Select
                      isDisabled={isViewPage}
                      inputId="ownsTraditionalKnowledgeIP"
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
                          === formik.values.ownsTraditionalKnowledgeIP,
                      )}
                      onChange={(selectedOption) => {
                        const value = selectedOption?.value;
                        formik.setFieldValue(
                          'ownsTraditionalKnowledgeIP',
                          value,
                        );

                        // Replace `traditionalKnowledgeGroups` with your actual group field name
                        if (
                          value === 'Yes'
                          && formik.values.groups?.length === 0
                        ) {
                          formik.setFieldValue('groups', [
                            {
                              traditionalKnowledgeIPDetails: '',
                              isIPOwnedOrAcquired: '',
                              benefitsShared: '',
                              benefitSharingBasis: '',
                              ipDisputesExist: '',
                              authorityName: '',
                              caseBrief: '',
                              correctiveActions: '',
                            },
                          ]);
                        }

                        if (value === 'No') {
                          formik.setFieldValue('groups', []);
                        }
                      }}
                      placeholder="Select ownership status"
                    />

                    <ErrorMessage
                      name="ownsTraditionalKnowledgeIP"
                      component="div"
                      className="text-danger small"
                    />
                  </div>
                </div>

                {/* Conditional groups (only if yes) */}
                {formik.values.ownsTraditionalKnowledgeIP === 'Yes' && (
                  <FieldArray name="groups">
                    {({ push, remove }) => (
                      <>
                        {formik.values.groups.map((_, index: number) => (
                          <div key={index} className="custom-box mt-3">
                            {/* IP details */}
                            <div className="row mb-3">
                              <label className="col-md-4 col-form-label small-label fs-13">
                                Detail of Intellectual property based on
                                traditional knowledge
                                {' '}
                              </label>
                              <div className="col-md-8">
                                <Field
                                  disabled={isViewPage}
                                  type="text"
                                  name={`groups[${index}].traditionalKnowledgeIPDetails`}
                                  className="form-control form-control-sm"
                                  placeholder="Enter IP details"
                                />
                                <ErrorMessage
                                  name={`groups[${index}].traditionalKnowledgeIPDetails`}
                                  component="div"
                                  className="text-danger small"
                                />
                              </div>
                            </div>

                            {/* Is owned/acquired */}
                            <div className="row mb-3">
                              <label className="col-md-4 col-form-label small-label fs-13">
                                Is the intellectual property owned / acquired
                              </label>
                              <div className="col-md-8">
                                <Field
                                  disabled={isViewPage}
                                  type="text"
                                  name={`groups[${index}].isIPOwnedOrAcquired`}
                                  className="form-control form-control-sm"
                                  placeholder="Enter ownership type"
                                />
                                <ErrorMessage
                                  name={`groups[${index}].isIPOwnedOrAcquired`}
                                  component="div"
                                  className="text-danger small"
                                />
                              </div>
                            </div>

                            {/* Benefits shared */}
                            <div className="row mb-3 align-items-center">
                              <label className="col-md-4 col-form-label small-label fs-13">
                                Has the benefits been shared
                              </label>
                              <div className="col-md-8">
                                <Select
                                  isDisabled={isViewPage}
                                  inputId={`groups[${index}].benefitsShared`}
                                  classNamePrefix="custom_select_input"
                                  placeholder="Select"
                                  styles={CustomStyles}
                                  options={[
                                    { label: 'Yes', value: 'yes' },
                                    { label: 'No', value: 'no' },
                                  ]}
                                  value={[
                                    { label: 'Yes', value: 'yes' },
                                    { label: 'No', value: 'no' },
                                  ].find(
                                    (option) => option.value
                                      === formik.values.groups[index].benefitsShared,
                                  )}
                                  onChange={(selectedOption) => formik.setFieldValue(
                                    `groups[${index}].benefitsShared`,
                                    selectedOption?.value,
                                  )}
                                />
                                <ErrorMessage
                                  name={`groups[${index}].benefitsShared`}
                                  component="div"
                                  className="text-danger small"
                                />
                              </div>
                            </div>

                            {/* Basis of benefit sharing */}
                            <div className="row mb-3">
                              <label className="col-md-4 col-form-label small-label fs-13">
                                Basis of calculating the benefit shares
                                {' '}
                              </label>
                              <div className="col-md-8">
                                <Field
                                  disabled={isViewPage}
                                  type="text"
                                  name={`groups[${index}].benefitSharingBasis`}
                                  className="form-control form-control-sm"
                                  placeholder="Enter basis of benefit sharing"
                                />
                                <ErrorMessage
                                  name={`groups[${index}].benefitSharingBasis`}
                                  component="div"
                                  className="text-danger small"
                                />
                              </div>
                            </div>

                            {/* Dispute exists */}
                            <div className="row mb-3 align-items-center">
                              <label className="col-md-4 col-form-label small-label fs-13">
                                Has there been instances of intellectual
                                property related disputes based on any adverse
                                order
                              </label>
                              <div className="col-md-8">
                                <Select
                                  isDisabled={isViewPage}
                                  inputId={`groups[${index}].ipDisputesExist`}
                                  classNamePrefix="custom_select_input"
                                  placeholder="Select"
                                  styles={CustomStyles}
                                  options={[
                                    { label: 'Yes', value: 'yes' },
                                    { label: 'No', value: 'no' },
                                  ]}
                                  value={[
                                    { label: 'Yes', value: 'yes' },
                                    { label: 'No', value: 'no' },
                                  ].find(
                                    (option) => option.value
                                      === formik.values.groups[index]
                                        .ipDisputesExist,
                                  )}
                                  onChange={(selectedOption) => formik.setFieldValue(
                                    `groups[${index}].ipDisputesExist`,
                                    selectedOption?.value,
                                  )}
                                />
                                <ErrorMessage
                                  name={`groups[${index}].ipDisputesExist`}
                                  component="div"
                                  className="text-danger small"
                                />
                              </div>
                            </div>

                            {/* Authority name */}
                            <div className="row mb-3">
                              <label className="col-md-4 col-form-label small-label fs-13">
                                Name of the authority
                                {' '}
                              </label>
                              <div className="col-md-8">
                                <Field
                                  disabled={isViewPage}
                                  type="text"
                                  name={`groups[${index}].authorityName`}
                                  className="form-control form-control-sm"
                                  placeholder="Enter authority name"
                                />
                                <ErrorMessage
                                  name={`groups[${index}].authorityName`}
                                  component="div"
                                  className="text-danger small"
                                />
                              </div>
                            </div>

                            {/* Case brief */}
                            <div className="row mb-3">
                              <label className="col-md-4 col-form-label small-label fs-13">
                                Brief of the case
                                {' '}
                              </label>
                              <div className="col-md-8">
                                <Field
                                  disabled={isViewPage}
                                  type="text"
                                  name={`groups[${index}].caseBrief`}
                                  className="form-control form-control-sm"
                                  placeholder="Enter case brief"
                                />
                                <ErrorMessage
                                  name={`groups[${index}].caseBrief`}
                                  component="div"
                                  className="text-danger small"
                                />
                              </div>
                            </div>

                            {/* Corrective actions */}
                            <div className="row mb-3">
                              <label className="col-md-4 col-form-label small-label fs-13">
                                Details of corrective actions taken
                                {' '}
                              </label>
                              <div className="col-md-8">
                                <Field
                                  disabled={isViewPage}
                                  type="text"
                                  name={`groups[${index}].correctiveActions`}
                                  className="form-control form-control-sm"
                                  placeholder="Enter corrective actions"
                                />
                                <ErrorMessage
                                  name={`groups[${index}].correctiveActions`}
                                  component="div"
                                  className="text-danger small"
                                />
                              </div>
                            </div>

                            {/* Delete Group Button */}
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

                        {/* Add Group Button */}
                        <div className="text-end">
                          {!isViewPage && (
                            <button
                              className="btn btn-dark btn-sm"
                              type="button"
                              onClick={() => push({
                                traditionalKnowledgeIPDetails: '',
                                isIPOwnedOrAcquired: '',
                                benefitsShared: '',
                                benefitSharingBasis: '',
                                ipDisputesExist: '',
                                authorityName: '',
                                caseBrief: '',
                                correctiveActions: '',
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
  },
);

export interface PublicPolicyFormRef {
  submitForm: () => Promise<void>;
  getValues: () => any;
}

type PublicPositionFormProps = {
  initialValues: {
    advocatedPublicPolicy: string;
    groups: {
      policyAdvocated: string;
      advocacyMethod: string;
      infoAvailableInPublicDomain: string;
      boardReviewFrequency: string;
      boardReviewFrequencyDetails: string;
      policyWebLink: string;
    }[];
  };
  onChange: (data: any) => void;
  isViewPage: boolean;
};

const PublicPolicyForm = forwardRef<
  PublicPolicyFormRef,
  PublicPositionFormProps
>(({ initialValues, onChange, isViewPage }, ref) => {
  const PublicPolicySchema = Yup.object().shape({
    advocatedPublicPolicy: Yup.string().required('Required'),
    groups: Yup.array().of(
      Yup.object().shape({
        policyAdvocated: Yup.string().required('Required'),
        advocacyMethod: Yup.string().required('Required'),
        infoAvailableInPublicDomain: Yup.string().required('Required'),
        boardReviewFrequency: Yup.string().required('Required'),
        boardReviewFrequencyDetails: Yup.string().required('Required'),
        policyWebLink: Yup.string().required('Required'),
      }),
    ),
  });

  const handleSubmit = (values: typeof initialValues) => {
    // console.log('⏺ Submitted!');
    // console.log('✅ Form data:', values);
    // alert('Form submitted successfully!');
  };
  return (
    <Formik
      enableReinitialize
      initialValues={initialValues}
      validationSchema={PublicPolicySchema}
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
              <h6 className="fw-bold mb-4 fs-16">Public Policy Positions</h6>
              {/* Has the entity advocated any public policy positions */}
              <div className="row mb-3 align-items-center">
                <label className="col-md-4 col-form-label small-label fs-13">
                  Has the entity advocated any public policy positions
                </label>
                <div className="col-md-8">
                  <Select
                    isDisabled={isViewPage}
                    inputId="advocatedPublicPolicy"
                    classNamePrefix="custom_select_input"
                    styles={CustomStyles}
                    placeholder="Select"
                    options={[
                      { label: 'Yes', value: 'Yes' },
                      { label: 'No', value: 'No' },
                    ]}
                    value={[
                      { label: 'Yes', value: 'Yes' },
                      { label: 'No', value: 'No' },
                    ].find(
                      (option) => option.value === formik.values.advocatedPublicPolicy,
                    )}
                    onChange={(selectedOption) => {
                      const value = selectedOption?.value;
                      formik.setFieldValue('advocatedPublicPolicy', value);

                      // ✅ Insert empty group if "Yes" is selected and groups is empty
                      if (
                        value === 'Yes'
                        && formik.values.groups.length === 0
                      ) {
                        formik.setFieldValue('groups', [
                          {
                            policyAdvocated: '',
                            advocacyMethod: '',
                            infoAvailableInPublicDomain: '',
                            boardReviewFrequency: '',
                            boardReviewFrequencyDetails: '',
                            policyWebLink: '',
                          },
                        ]);
                      }

                      // ✅ Clear groups if "No" is selected
                      if (value === 'No') {
                        formik.setFieldValue('groups', []);
                      }
                    }}
                  />
                  <ErrorMessage
                    name="advocatedPublicPolicy"
                    component="div"
                    className="text-danger small"
                  />
                </div>
              </div>

              {/* Conditional groups (only if yes) */}
              {formik.values.advocatedPublicPolicy === 'Yes' && (
                <FieldArray name="groups">
                  {({ push, remove }) => (
                    <>
                      {formik.values.groups?.map((_, index: number) => (
                        <div key={index} className="custom-box mt-3">
                          {/* Public Policy Advocated */}
                          <div className="row mb-3">
                            <label className="col-md-4 col-form-label small-label fs-13">
                              Public Policy Advocated
                            </label>
                            <div className="col-md-8">
                              <Field
                                disabled={isViewPage}
                                type="text"
                                name={`groups[${index}].policyAdvocated`}
                                className="form-control form-control-sm"
                                placeholder="Enter public policy advocated"
                              />
                              <ErrorMessage
                                name={`groups[${index}].policyAdvocated`}
                                className="text-danger small"
                              />
                            </div>
                          </div>

                          {/* Method resorted for such advocacy */}
                          <div className="row mb-3">
                            <label className="col-md-4 col-form-label small-label fs-13">
                              Method resorted for such advocacy
                            </label>
                            <div className="col-md-8">
                              <Field
                                disabled={isViewPage}
                                type="text"
                                name={`groups[${index}].advocacyMethod`}
                                className="form-control form-control-sm"
                                placeholder="Enter advocacy method"
                              />
                              <ErrorMessage
                                name={`groups[${index}].advocacyMethod`}
                                component="div"
                                className="text-danger small"
                              />
                            </div>
                          </div>

                          {/* Is information available in public domain */}
                          <div className="row mb-3 align-items-center">
                            <label className="col-md-4 col-form-label small-label fs-13">
                              Is Information available in public domain
                            </label>
                            <div className="col-md-8">
                              <Select
                                isDisabled={isViewPage}
                                inputId={`groups[${index}].infoAvailableInPublicDomain`}
                                classNamePrefix="custom_select_input"
                                styles={CustomStyles}
                                placeholder="Select"
                                options={[
                                  { label: 'Yes', value: 'yes' },
                                  { label: 'No', value: 'no' },
                                ]}
                                value={[
                                  { label: 'Yes', value: 'yes' },
                                  { label: 'No', value: 'no' },
                                ].find(
                                  (option) => option.value
                                    === formik.values.groups[index]
                                      .infoAvailableInPublicDomain,
                                )}
                                onChange={(selectedOption) => formik.setFieldValue(
                                  `groups[${index}].infoAvailableInPublicDomain`,
                                  selectedOption?.value,
                                )}
                              />
                              <ErrorMessage
                                name={`groups[${index}].infoAvailableInPublicDomain`}
                                component="div"
                                className="text-danger small"
                              />
                            </div>
                          </div>

                          {/* Frequency of review by the Board */}
                          <div className="row mb-3 align-items-center">
                            <label className="col-md-4 col-form-label small-label fs-13">
                              Frequency of review by Board
                            </label>
                            <div className="col-md-8">
                              <Select
                                isDisabled={isViewPage}
                                inputId={`groups[${index}].boardReviewFrequency`}
                                classNamePrefix="custom_select_input"
                                styles={CustomStyles}
                                placeholder="Select"
                                options={[
                                  { label: 'Annually', value: 'Annually' },
                                  {
                                    label: 'Half-Yearly',
                                    value: 'Half-Yearly',
                                  },
                                  { label: 'Quarterly', value: 'Quarterly' },
                                  { label: 'Others', value: 'others' },
                                ]}
                                value={[
                                  { label: 'Annually', value: 'Annually' },
                                  {
                                    label: 'Half-Yearly',
                                    value: 'Half-Yearly',
                                  },
                                  { label: 'Quarterly', value: 'Quarterly' },
                                  { label: 'Others', value: 'others' },
                                ].find(
                                  (option) => option.value
                                    === formik.values.groups?.[index]
                                      ?.boardReviewFrequency,
                                )}
                                onChange={(selectedOption) => formik.setFieldValue(
                                  `groups[${index}].boardReviewFrequency`,
                                  selectedOption?.value,
                                )}
                              />
                              <ErrorMessage
                                name={`groups[${index}].boardReviewFrequency`}
                                component="div"
                                className="text-danger small"
                              />
                            </div>
                          </div>

                          {/* Specify the frequency of review */}
                          <div className="row mb-3">
                            <label className="col-md-4 col-form-label small-label fs-13">
                              Specify the frequency of review
                            </label>
                            <div className="col-md-8">
                              <Field
                                disabled={isViewPage}
                                type="text"
                                name={`groups[${index}].boardReviewFrequencyDetails`}
                                className="form-control form-control-sm"
                                placeholder="Enter review frequency details"
                              />
                              <ErrorMessage
                                name={`groups[${index}].boardReviewFrequencyDetails`}
                                component="div"
                                className="text-danger small"
                              />
                            </div>
                          </div>

                          {/* Web-link of the policy (if available) */}
                          <div className="row mb-3">
                            <label className="col-md-4 col-form-label small-label fs-13">
                              Web-link of the policy (if available)
                            </label>
                            <div className="col-md-8">
                              <Field
                                disabled={isViewPage}
                                type="text"
                                name={`groups[${index}].policyWebLink`}
                                className="form-control form-control-sm"
                                placeholder="Enter web link of the policy"
                              />
                              <ErrorMessage
                                name={`groups[${index}].policyWebLink`}
                                component="div"
                                className="text-danger small"
                              />
                            </div>
                          </div>

                          {/* Delete Group Button */}
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

                      {/* Add Group Button */}
                      <div className="text-end">
                        {!isViewPage && (
                          <button
                            className="btn btn-dark btn-sm"
                            type="button"
                            onClick={() => push({
                              policyAdvocated: '',
                              advocacyMethod: '',
                              infoAvailableInPublicDomain: '',
                              boardReviewFrequency: '',
                              boardReviewFrequencyDetails: '',
                              policyWebLink: '',
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

const MiscellaneousDisclosure: React.FC<{
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
  // console.log(isViewPage);

  const [ownershipIndicator, setOwnershipIndicator] = useState({
    name: 'Ownership of Intellectual Property',
    status: 'Pending',
    percent: '0%',
    badge: 'bg-danger',
  });

  const [publicPolicyIndicator, setPublicPolicyIndicator] = useState({
    name: 'Public Policy Positions',
    status: 'Pending',
    percent: '0%',
    badge: 'bg-danger',
  });
  const indicators = [ownershipIndicator, publicPolicyIndicator];
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

  const urlParams = useParams();
  const [activeIndicator, setActiveIndicator] = useState(indicators[0]);

  const ownershipFormRef = useRef<OwnershipIPFormRef>(null);
  const publicPolicyFormRef = useRef<PublicPolicyFormRef>(null);

  const [selectedYear, setSelectedYear] = useState<any>('');
  const [isLoading, setIsLoading] = useState(false);

  const [ownershipFormData, setOwnershipFormData] = useState({
    ownsTraditionalKnowledgeIP: '',
    groups: [
      {
        traditionalKnowledgeIPDetails: '',
        isIPOwnedOrAcquired: '',
        benefitsShared: '',
        benefitSharingBasis: '',
        ipDisputesExist: '',
        authorityName: '',
        caseBrief: '',
        correctiveActions: '',
      },
    ],
  });

  const [publicPolicyFormData, setPublicPolicyData] = useState({
    advocatedPublicPolicy: '',
    groups: [
      {
        policyAdvocated: '',
        advocacyMethod: '',
        infoAvailableInPublicDomain: '',
        boardReviewFrequency: '',
        boardReviewFrequencyDetails: '',
        policyWebLink: '',
      },
    ],
  });

  const [isOwnershipDataLoaded, setIsOwnershipDataLoaded] = useState(false);
  const [isPublicPolicyDataLoaded, setIsPublicPolicyDataLoaded] = useState(false);

  const parseOwnershipFromApi = (questionsFromApi: any[]) => {
    const formData: any = {
      ownsTraditionalKnowledgeIP: '',
      groups: [],
    };

    // Get the main question by ID
    const mainQuestion = questionsFromApi.find(
      (q: any) => q.universal_question_id === 'UID_1543',
    );

    formData.ownsTraditionalKnowledgeIP = mainQuestion?.answer || '';

    const hasAnsweredYes = mainQuestion?.answer === 'Yes';

    if (hasAnsweredYes) {
      // If group data exists from API
      if (Array.isArray(mainQuestion.group) && mainQuestion.group.length > 0) {
        formData.groups = mainQuestion.group.map((groupSet: any[]) => {
          const groupObj: any = {};
          groupSet.forEach((item: any) => {
            const matched = ownershipQuestions.find(
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

  const parsePublicPolicyFromApi = (questionsFromApi: any[]) => {
    const formData: any = {
      advocatedPublicPolicy: '',
      groups: [],
    };

    // Get the main question by ID
    const mainQuestion = questionsFromApi.find(
      (q: any) => q.universal_question_id === 'UID_1552',
    );

    formData.advocatedPublicPolicy = mainQuestion?.answer || '';

    const hasAnsweredYes = mainQuestion?.answer === 'Yes';

    if (hasAnsweredYes) {
      // If group data exists from API
      if (Array.isArray(mainQuestion.group) && mainQuestion.group.length > 0) {
        formData.groups = mainQuestion.group.map((groupSet: any[]) => {
          const groupObj: any = {};
          groupSet.forEach((item: any) => {
            const matched = publicPolicyQuestions.find(
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

  useEffect(() => {
    const ownershipPercent = calculateFormCompletionPercent(
      ownershipFormData,
      'ownsTraditionalKnowledgeIP',
    );

    const publicPolicyPercent = calculateFormCompletionPercent(
      publicPolicyFormData,
      'advocatedPublicPolicy',
    );

    setOwnershipIndicator((prev) => ({
      ...prev,
      percent: `${ownershipPercent}%`,
      status: ownershipPercent === 100 ? 'Completed' : 'Pending',
      // badge: ownershipPercent === 100 ? 'bg-success' : 'bg-danger',
    }));

    setPublicPolicyIndicator((prev) => ({
      ...prev,
      percent: `${publicPolicyPercent}%`,
      status: publicPolicyPercent === 100 ? 'Completed' : 'Pending',
      // badge: publicPolicyPercent === 100 ? 'bg-success' : 'bg-danger',
    }));
  }, [ownershipFormData, publicPolicyFormData]);

  useEffect(() => {
    if (disclosureData?.indicators?.length > 0) {
      const ownershipIndicatorData = disclosureData.indicators.find(
        (item: any) => item.name?.trim()?.toLowerCase()
          === 'ownership of intellectual property',
      );

      if (ownershipIndicatorData?.questions?.length > 0) {
        const parsedOwnership = parseOwnershipFromApi(
          ownershipIndicatorData.questions,
        );
        setOwnershipFormData(parsedOwnership);
        setIsOwnershipDataLoaded(true);
      }

      const publicPolicyIndicatorData = disclosureData.indicators.find(
        (item: any) => item.name?.trim()?.toLowerCase() === 'public policy positions',
      );

      if (publicPolicyIndicatorData?.questions?.length > 0) {
        const parsedPublicPolicy = parsePublicPolicyFromApi(
          publicPolicyIndicatorData.questions,
        );
        setPublicPolicyData(parsedPublicPolicy);
        setIsPublicPolicyDataLoaded(true);
      }

      // setSelectedYear(disclosureData?.financial_year || '');
      setSelectedYear(disclosureData?.datacube?.id || '');
    }
  }, [disclosureData]);

  // console.log(
  //   disclosureData?.datacube?.name,
  //   selectedYear,
  //   'disclosureData?.datacube?.name',
  // );

  const renderForm = () => {
    if (id) {
      if (!isOwnershipDataLoaded && !isPublicPolicyDataLoaded) {
        return <p>Loading form data...</p>;
      }
    }
    return (
      <>
        {/* Ownership of Intellectual Property Form */}
        <div
          style={{
            display:
              activeIndicator.name === 'Ownership of Intellectual Property'
                ? 'block'
                : 'none',
          }}
        >
          <OwnershipIPForm
            ref={ownershipFormRef}
            initialValues={ownershipFormData}
            onChange={(data) => setOwnershipFormData(data)}
            isViewPage={isViewPage}
          />
        </div>

        {/* Public Policy Positions Form */}
        <div
          style={{
            display:
              activeIndicator.name === 'Public Policy Positions'
                ? 'block'
                : 'none',
          }}
        >
          <PublicPolicyForm
            ref={publicPolicyFormRef}
            initialValues={publicPolicyFormData}
            onChange={(data) => setPublicPolicyData(data)}
            isViewPage={isViewPage}
          />
        </div>
      </>
    );
  };
  const router = useRouter();

  const ownershipQuestions = [
    {
      id: 'UID_1543',
      key: 'ownsTraditionalKnowledgeIP',
      label:
        'Does the entity own or acquired any intellectual properties based on traditional knowledge?',
      isGroup: false,
    },
    {
      id: 'UID_1544',
      key: 'traditionalKnowledgeIPDetails',
      label: 'Detail of Intellectual property based on traditional knowledge',
      isGroup: true,
    },
    {
      id: 'UID_1545',
      key: 'isIPOwnedOrAcquired',
      label: 'Is the intellectual property owned / acquired?',
      isGroup: true,
    },
    {
      id: 'UID_1546',
      key: 'benefitsShared',
      label: 'Has the benefits been shared?',
      isGroup: true,
    },
    {
      id: 'UID_1547',
      key: 'benefitSharingBasis',
      label: 'Basis of calculating the benefit shares',
      isGroup: true,
    },
    {
      id: 'UID_1548',
      key: 'ipDisputesExist',
      label:
        'Has there been instances of intellectual property related disputes based on any adverse order?',
      isGroup: true,
    },
    {
      id: 'UID_1549',
      key: 'authorityName',
      label: 'Name of the authority',
      isGroup: true,
    },
    {
      id: 'UID_1550',
      key: 'caseBrief',
      label: 'Brief of the case',
      isGroup: true,
    },
    {
      id: 'UID_1551',
      key: 'correctiveActions',
      label: 'Details of corrective actions taken',
      isGroup: true,
    },
  ];
  const buildOwnershipOutput = (ownershipRaw: any) => {
    const mainQuestion = ownershipQuestions.find(
      (q) => q.key === 'ownsTraditionalKnowledgeIP',
    );
    const groupQuestions = ownershipQuestions.filter((q) => q.isGroup);

    const ownershipOutput: any[] = [];

    if (mainQuestion) {
      const mainAnswer = ownershipRaw.ownsTraditionalKnowledgeIP || '';
      const mainEntry: any = {
        universal_question_id: mainQuestion.id,
        question_title: mainQuestion.label,
        answer: mainAnswer,
      };

      // Only include group key if answer is 'Yes' and there are group entries
      if (
        mainAnswer === 'Yes'
        && Array.isArray(ownershipRaw.groups)
        && ownershipRaw.groups.length > 0
      ) {
        mainEntry.group = ownershipRaw.groups.map((groupAns: any) => groupQuestions.map((q) => ({
          universal_question_id: q.id,
          question_title: q.label,
          answer: groupAns[q.key] || '',
        })));
      }

      ownershipOutput.push(mainEntry);
    }

    return ownershipOutput;
  };
  const publicPolicyQuestions = [
    {
      id: 'UID_1552',
      key: 'advocatedPublicPolicy',
      label: 'Has the entity advocated any public policy positions?',
      isGroup: false,
    },
    {
      id: 'UID_1553',
      key: 'policyAdvocated',
      label: 'Public Policy Advocated',
      isGroup: true,
    },
    {
      id: 'UID_1554',
      key: 'advocacyMethod',
      label: 'Method resorted for such advocacy',
      isGroup: true,
    },
    {
      id: 'UID_1555',
      key: 'infoAvailableInPublicDomain',
      label: 'Is Information available in public domain',
      isGroup: true,
    },
    {
      id: 'UID_1556',
      key: 'boardReviewFrequency',
      label: 'Frequency of review by Board',
      isGroup: true,
    },
    {
      id: 'UID_1557',
      key: 'boardReviewFrequencyDetails',
      label: 'Specify the frequency of review',
      isGroup: true,
    },
    {
      id: 'UID_1558',
      key: 'policyWebLink',
      label: 'Web-link of the policy (if available)',
      isGroup: true,
    },
  ];

  const buildPublicPolicyOutput = (publicPolicyRaw: any) => {
    const mainQuestion = publicPolicyQuestions.find((q) => !q.isGroup);
    const groupQuestions = publicPolicyQuestions.filter((q) => q.isGroup);

    const publicPolicyOutput: any[] = [];

    if (mainQuestion) {
      const mainAnswer = publicPolicyRaw[mainQuestion.key] || '';
      const mainEntry: any = {
        universal_question_id: mainQuestion.id,
        question_title: mainQuestion.label,
        answer: mainAnswer,
      };

      if (
        mainAnswer === 'Yes'
        && Array.isArray(publicPolicyRaw.groups)
        && publicPolicyRaw.groups.length > 0
      ) {
        mainEntry.group = publicPolicyRaw.groups.map((groupAns: any) => groupQuestions.map((q) => ({
          universal_question_id: q.id,
          question_title: q.label,
          answer: groupAns[q.key] || '',
        })));
      }

      publicPolicyOutput.push(mainEntry);
    }

    return publicPolicyOutput;
  };

  const handlePreviewClick = async () => {
    if (!selectedYear) {
      toast.error('Please select a financial year before submitting the form.');
      return false;
    }

    const submitPromises: Promise<void>[] = [];

    // Submit both forms
    if (ownershipFormRef.current) {
      submitPromises.push(ownershipFormRef.current.submitForm());
    }

    if (publicPolicyFormRef.current) {
      submitPromises.push(publicPolicyFormRef.current.submitForm());
    }

    await Promise.all(submitPromises);

    const allFormValues = {
      financial_year: selectedYear,
      ownershipIP: ownershipFormRef.current?.getValues?.() || {},
      publicPolicy: publicPolicyFormRef.current?.getValues?.() || {},
    };

    // === Validation Start ===
    const isAnyOwnershipFieldEmpty = () => {
      const mainField = allFormValues.ownershipIP.ownsTraditionalKnowledgeIP;
      if (!mainField?.trim()) return true;
      if (mainField.trim().toLowerCase() !== 'yes') {
        return false; // Skip group validation if answer is not 'yes'
      }
      const groupEntries = Array.isArray(allFormValues.ownershipIP.groups)
        ? allFormValues.ownershipIP.groups
        : [];

      return groupEntries.some((group: Record<string, string>) => ownershipQuestions
        .filter((q) => q.isGroup)
        .some((q) => !group?.[q.key]?.trim()));
    };

    const isAnyPublicPolicyFieldEmpty = () => {
      const mainField = allFormValues.publicPolicy.advocatedPublicPolicy;
      if (!mainField?.trim()) return true;
      if (mainField.trim().toLowerCase() !== 'yes') {
        return false; // Skip group validation if answer is not 'yes'
      }
      const groupEntries = allFormValues.publicPolicy.groups || [];
      return groupEntries.some((group: Record<string, string>) => publicPolicyQuestions
        .filter((q) => q.isGroup)
        .some((q) => !group?.[q.key]?.trim()));
    };

    if (isAnyOwnershipFieldEmpty() || isAnyPublicPolicyFieldEmpty()) {
      toast.error('Please fill out all fields before submitting.');
      return false;
    }
    // === Validation End ===

    const ownershipOutput = buildOwnershipOutput(allFormValues.ownershipIP);
    const publicPolicyOutput = buildPublicPolicyOutput(
      allFormValues.publicPolicy,
    );

    const finalOutput: any = {
      name: 'Miscellaneous',
      datacube_id: selectedYear,
      submitted_by: user?.id,
      indicators: [
        {
          name: 'Ownership of Intellectual Property',
          questions: ownershipOutput,
        },
        {
          name: 'Public Policy Positions',
          questions: publicPolicyOutput,
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
    // console.log(res, 'res');
    const { success, error } = res?.data as {
      success: boolean;
      error: string[];
    };
    if (success) {
      toast.success('Miscellaneous data submitted successfully');
      router.push('/disclosure/miscellaneous');
    } else {
      toast.error(error[0]);
    }
    setIsLoading(false);
    // console.log('📦 FINAL OUTPUT', finalOutput);
    // alert('✅ Preview Generated!\nCheck the console for combined form values.');
    return true;
  };

  // const getFinancialYears = (
  //   years: number,
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
      { title: 'Miscellaneous', url: '/disclosure/miscellaneous' },
      { title: activeIndicator?.name, url: '#' },
    ],
    [activeIndicator?.name],
  );

  const breadCrumbMenu = [{ title: '', breadCrumb: breadCrumbsItem }];

  return (
    <PageHeaderWrapper
      breadCrumbMenu={breadCrumbMenu}
      extraClassName="my-4 px-4 pt-3"
      title="Miscellaneous"
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

export default MiscellaneousDisclosure;
