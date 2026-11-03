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
/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
/* eslint-disable no-restricted-syntax */
/* eslint-disable no-continue */
/* eslint-disable no-nested-ternary */
/* eslint-disable react/jsx-props-no-multi-spaces */

'use client';

import { useRouter, useParams, usePathname } from 'next/navigation';
import React, {
  useState,
  useEffect,
  forwardRef,
  useRef,
  useImperativeHandle,
  useMemo,
} from 'react';
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
import './ManagementDisclosure.css';
import { DisclosureService } from '@/lib/service';
import toast from 'react-hot-toast';
import { IUser } from '@/lib/interface/IUser.interface';
import { IDataCube } from '@/lib/interface/IDataCube.interface';
import PageHeaderWrapper from '@/components/PageHeaderWrapper/PageHeaderWrapper';

export interface PolicyManagementFormRef {
  submitForm: () => Promise<void>;
  getValues: () => any;
}

type PolicyManagementFormProps = {
  initialValues: {
    groups: {
      policyName: string;
      coversBrsrPrinciples: string; // ✅ changed from object to string
      approvedByBoard: string;
      policyWebLink: string;
      translatedToProcedures: string;
      extendedToValueChain: string;
      adoptedStandards: string;
      specificGoalsAndTargets: string;
      performanceAgainstTargets: string;
      reviewedByBoardOrCommittee: string;
      performanceReviewFrequency: string;
      statutoryComplianceReviewed: string;
      statutoryComplianceFrequency: string;
      externalAssessmentConducted: string;
      externalAssessmentAgencyName: string;
      // groups: {
      //   principlesNotMaterial: string;
      //   notReadyToImplementPolicies: string;
      //   lackOfResources: string;
      //   plannedNextFinancialYear: string;
      //   otherReason: string;
      // }[]; // ✅ moved outside coversBrsrPrinciples
    }[];
  };
  onChange: (data: any) => void;
  isViewPage: boolean;
};

const PolicyManagementForm = forwardRef<
  PolicyManagementFormRef,
  PolicyManagementFormProps
>(({ initialValues, onChange, isViewPage }, ref) => {
  const PolicyManagementSchema = Yup.object().shape({
    groups: Yup.array().of(
      Yup.object().shape({
        policyName: Yup.string().required('Required'),
        coversBrsrPrinciples: Yup.string().required('Required'), // ✅ now just a string

        approvedByBoard: Yup.string().required('Required'),
        policyWebLink: Yup.string().url('Enter a valid URL').nullable(),
        translatedToProcedures: Yup.string().required('Required'),
        extendedToValueChain: Yup.string().required('Required'),
        adoptedStandards: Yup.string().required('Required'),
        specificGoalsAndTargets: Yup.string().required('Required'),
        performanceAgainstTargets: Yup.string().required('Required'),
        reviewedByBoardOrCommittee: Yup.string().required('Required'),
        performanceReviewFrequency: Yup.string().required('Required'),
        statutoryComplianceReviewed: Yup.string().required('Required'),
        statutoryComplianceFrequency: Yup.string().required('Required'),
        externalAssessmentConducted: Yup.string().required('Required'),
        externalAssessmentAgencyName: Yup.string().required('Required'),

        // ✅ moved outside coversBrsrPrinciples
        // groups: Yup.array().of(
        //   Yup.object().shape({
        //     principlesNotMaterial: Yup.string().required('Required'),
        //     notReadyToImplementPolicies: Yup.string().required('Required'),
        //     lackOfResources: Yup.string().required('Required'),
        //     plannedNextFinancialYear: Yup.string().required('Required'),
        //     otherReason: Yup.string().required('Required'),
        //   }),
        // ),
      }),
    ),
  });

  const handleSubmit = (values: typeof initialValues) => {
    // console.log('✅ Form data:', values);
    // alert('Form submitted successfully!');
  };

  return (
    <Formik
      enableReinitialize
      initialValues={initialValues}
      validationSchema={PolicyManagementSchema}
      onSubmit={handleSubmit}
    >
      {(formik) => {
        useEffect(() => {
          onChange(formik.values);
        }, [formik.values, onChange]);

        useImperativeHandle(ref, () => ({
          submitForm: () => formik.submitForm(),
          getValues: () => formik.values,
          // isValid: () => formik.isValid,
        }));

        return (
          <div className="container-fluid">
            <h6 className="fw-bold mb-4 fs-16">
              Policy and Management Processes
            </h6>
            <Form>
              <FieldArray name="groups">
                {({ remove, push }) => (
                  <>
                    {formik.values.groups.map((_, index) => (
                      <div key={index} className="custom-box">
                        {/* 1. Name of the Policy */}
                        <div className="row mb-3 align-items-center">
                          <label className="col-md-4 col-form-label small-label fs-13">
                            Name of the Policy
                          </label>
                          <div className="col-md-8">
                            <Field
                              disabled={isViewPage}
                              type="text"
                              name={`groups[${index}].policyName`}
                              className="form-control form-control-sm"
                              placeholder="Enter policy name"
                            />
                            <ErrorMessage
                              name={`groups[${index}].policyName`}
                              component="div"
                              className="text-danger small"
                            />
                          </div>
                        </div>

                        {/* 2. Does this policy cover any of the BRSR Principles & its core elements of the NGRBCs */}
                        <div className="row mb-3 align-items-center">
                          <label className="col-md-4 col-form-label small-label fs-13">
                            Does this policy cover any of the BRSR Principles &
                            its core elements of the NGRBCs
                          </label>
                          <div className="col-md-8">
                            <Select
                              isDisabled={isViewPage}
                              inputId={`groups[${index}].coversBrsrPrinciples`}
                              classNamePrefix="custom_select_input"
                              styles={CustomStyles}
                              options={[
                                {
                                  label:
                                    'Businesses should conduct & govern themselves with integrity, ethics, transparency, and accountability (Principle 1)',
                                  value: 'Principle 1',
                                },
                                {
                                  label:
                                    'Businesses should provide goods & services in a manner that is sustainable and safe (Principle 2)',
                                  value: 'Principle 2',
                                },
                                {
                                  label:
                                    'Businesses should prioritize the well-being of all employees, including those in their value chains (Principle 3)',
                                  value: 'Principle 3',
                                },
                                {
                                  label:
                                    'Businesses should respect the interests of and be responsive to all its stakeholders (Principle 4)',
                                  value: 'Principle 4',
                                },
                                {
                                  label:
                                    'Businesses should respect and promote human rights (Principle 5)',
                                  value: 'Principle 5',
                                },
                                {
                                  label:
                                    'Businesses must prioritize environmental protection and restoration (Principle 6)',
                                  value: 'Principle 6',
                                },
                                {
                                  label:
                                    'Businesses engaging in influencing public and regulatory policy, should act responsibly & transparently (Principle 7)',
                                  value: 'Principle 7',
                                },
                                {
                                  label:
                                    'Businesses should promote inclusive growth & equitable development. (Principle 8)',
                                  value: 'Principle 8',
                                },
                                {
                                  label:
                                    'Businesses should engage with & provide value to their consumers in a responsible manner. (Principle 9)',
                                  value: 'Principle 9',
                                },
                              ]}
                              value={[
                                {
                                  label:
                                    'Businesses should conduct & govern themselves with integrity, ethics, transparency, and accountability (Principle 1)',
                                  value: 'Principle 1',
                                },
                                {
                                  label:
                                    'Businesses should provide goods & services in a manner that is sustainable and safe (Principle 2)',
                                  value: 'Principle 2',
                                },
                                {
                                  label:
                                    'Businesses should prioritize the well-being of all employees, including those in their value chains (Principle 3)',
                                  value: 'Principle 3',
                                },
                                {
                                  label:
                                    'Businesses should respect the interests of and be responsive to all its stakeholders (Principle 4)',
                                  value: 'Principle 4',
                                },
                                {
                                  label:
                                    'Businesses should respect and promote human rights (Principle 5)',
                                  value: 'Principle 5',
                                },
                                {
                                  label:
                                    'Businesses must prioritize environmental protection and restoration (Principle 6)',
                                  value: 'Principle 6',
                                },
                                {
                                  label:
                                    'Businesses engaging in influencing public and regulatory policy, should act responsibly & transparently (Principle 7)',
                                  value: 'Principle 7',
                                },
                                {
                                  label:
                                    'Businesses should promote inclusive growth & equitable development. (Principle 8)',
                                  value: 'Principle 8',
                                },
                                {
                                  label:
                                    'Businesses should engage with & provide value to their consumers in a responsible manner. (Principle 9)',
                                  value: 'Principle 9',
                                },
                              ].find(
                                (option) => option.value
                                  === formik.values.groups?.[index]
                                    ?.coversBrsrPrinciples,
                              )}
                              onChange={(selectedOption) => {
                                const value = selectedOption?.value;
                                formik.setFieldValue(
                                  `groups[${index}].coversBrsrPrinciples`,
                                  value,
                                );
                                // if (
                                //   !formik.values.groups[index]
                                //     .coversBrsrPrinciples.groups ||
                                //   formik.values.groups[index]
                                //     .coversBrsrPrinciples.groups.length === 0
                                // ) {
                                //   formik.setFieldValue(
                                //     `groups[${index}].coversBrsrPrinciples.groups`,
                                //     [
                                //       {
                                //         principlesNotMaterial: '',
                                //         notReadyToImplementPolicies: '',
                                //         lackOfResources: '',
                                //         plannedNextFinancialYear: '',
                                //         otherReason: '',
                                //       },
                                //     ]
                                //   );
                                // }
                                // Example conditional logic placeholder (if needed in future)
                                // if (value !== '') {
                                //   formik.setFieldValue(
                                //     `groups[${index}].coversBrsrPrinciples.groups`,
                                //     []
                                //   );
                                // }
                              }}
                              placeholder="Select principle"
                            />
                            <ErrorMessage
                              name={`groups[${index}].coversBrsrPrinciples`}
                              component="div"
                              className="text-danger small"
                            />
                          </div>
                        </div>

                        {/* 3. Has the policy been approved by the Board */}
                        <div className="row mb-3 align-items-center">
                          <label className="col-md-4 col-form-label small-label fs-13">
                            Has the policy been approved by the Board
                          </label>
                          <div className="col-md-8">
                            <Select
                              isDisabled={isViewPage}
                              inputId={`groups[${index}].approvedByBoard`}
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
                                  === formik.values.groups?.[index]?.approvedByBoard,
                              )}
                              onChange={(selectedOption) => formik.setFieldValue(
                                `groups[${index}].approvedByBoard`,
                                selectedOption?.value,
                              )}
                              placeholder="Select"
                            />
                            <ErrorMessage
                              name={`groups[${index}].approvedByBoard`}
                              component="div"
                              className="text-danger small"
                            />
                          </div>
                        </div>

                        {/* 4. Web link of the policy, if available */}
                        <div className="row mb-3 align-items-center">
                          <label className="col-md-4 col-form-label small-label fs-13">
                            Web link of the policy, if available
                          </label>
                          <div className="col-md-8">
                            <Field
                              disabled={isViewPage}
                              type="text"
                              name={`groups[${index}].policyWebLink`}
                              className="form-control form-control-sm"
                              placeholder="Enter URL (if any)"
                            />
                            <ErrorMessage
                              name={`groups[${index}].policyWebLink`}
                              component="div"
                              className="text-danger small"
                            />
                          </div>
                        </div>

                        {/* 5. Is this policy translated into procedures in the entity */}
                        <div className="row mb-3 align-items-center">
                          <label className="col-md-4 col-form-label small-label fs-13">
                            Is this policy translated into procedures in the
                            entity
                          </label>
                          <div className="col-md-8">
                            <Select
                              isDisabled={isViewPage}
                              inputId={`groups[${index}].translatedToProcedures`}
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
                                  === formik.values.groups?.[index]
                                    ?.translatedToProcedures,
                              )}
                              onChange={(selectedOption) => formik.setFieldValue(
                                `groups[${index}].translatedToProcedures`,
                                selectedOption?.value,
                              )}
                              placeholder="Select"
                            />
                            <ErrorMessage
                              name={`groups[${index}].translatedToProcedures`}
                              component="div"
                              className="text-danger small"
                            />
                          </div>
                        </div>

                        {/* 6. Is this policy extended to the entity's value chain partners */}
                        <div className="row mb-3 align-items-center">
                          <label className="col-md-4 col-form-label small-label fs-13">
                            Is this policy extended to the entity's value chain
                            partners
                          </label>
                          <div className="col-md-8">
                            <Select
                              isDisabled={isViewPage}
                              inputId={`groups[${index}].extendedToValueChain`}
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
                                  === formik.values.groups?.[index]
                                    ?.extendedToValueChain,
                              )}
                              onChange={(selectedOption) => formik.setFieldValue(
                                `groups[${index}].extendedToValueChain`,
                                selectedOption?.value,
                              )}
                              placeholder="Select"
                            />
                            <ErrorMessage
                              name={`groups[${index}].extendedToValueChain`}
                              component="div"
                              className="text-danger small"
                            />
                          </div>
                        </div>

                        {/* 7. Name of the national and international codes/certifications/... */}
                        <div className="row mb-3 align-items-center">
                          <label className="col-md-4 col-form-label small-label fs-13">
                            Name of the national and international
                            codes/certifications/labels/standards adopted by
                            your entity and mapped to this principle
                          </label>
                          <div className="col-md-8">
                            <Field
                              disabled={isViewPage}
                              type="text"
                              name={`groups[${index}].adoptedStandards`}
                              className="form-control form-control-sm"
                              placeholder="Enter standards/codes"
                            />
                            <ErrorMessage
                              name={`groups[${index}].adoptedStandards`}
                              component="div"
                              className="text-danger small"
                            />
                          </div>
                        </div>

                        {/* 8. Specific commitments, goals and targets set by the entity */}
                        <div className="row mb-3 align-items-center">
                          <label className="col-md-4 col-form-label small-label fs-13">
                            Specific commitments, goals and targets set by the
                            entity with defined timelines, if any
                          </label>
                          <div className="col-md-8">
                            <Field
                              disabled={isViewPage}
                              type="text"
                              name={`groups[${index}].specificGoalsAndTargets`}
                              className="form-control form-control-sm"
                              placeholder="Enter goals/targets"
                            />
                            <ErrorMessage
                              name={`groups[${index}].specificGoalsAndTargets`}
                              component="div"
                              className="text-danger small"
                            />
                          </div>
                        </div>

                        {/* 9. Performance of the entity against goals */}
                        <div className="row mb-3 align-items-center">
                          <label className="col-md-4 col-form-label small-label fs-13">
                            Performance of the entity against the specific
                            commitments, goals and targets along-with reasons in
                            case the same are not met
                          </label>
                          <div className="col-md-8">
                            <Field
                              disabled={isViewPage}
                              type="text"
                              name={`groups[${index}].performanceAgainstTargets`}
                              className="form-control form-control-sm"
                              placeholder="Enter performance details"
                            />
                            <ErrorMessage
                              name={`groups[${index}].performanceAgainstTargets`}
                              component="div"
                              className="text-danger small"
                            />
                          </div>
                        </div>

                        {/* 10. Has performance been reviewed by Board or Committee */}
                        <div className="row mb-3 align-items-center">
                          <label className="col-md-4 col-form-label small-label fs-13">
                            Has performance against this policy been reviewed by
                            the Director/ Board Committee/ or any other
                            committee
                          </label>
                          <div className="col-md-8">
                            <Field
                              disabled={isViewPage}
                              type="text"
                              name={`groups[${index}].reviewedByBoardOrCommittee`}
                              className="form-control form-control-sm"
                              placeholder="Enter review details"
                            />
                            <ErrorMessage
                              name={`groups[${index}].reviewedByBoardOrCommittee`}
                              component="div"
                              className="text-danger small"
                            />
                          </div>
                        </div>

                        {/* 11. Review frequency of performance */}
                        <div className="row mb-3 align-items-center">
                          <label className="col-md-4 col-form-label small-label fs-13">
                            Review frequency of the performance against this
                            policy
                          </label>
                          <div className="col-md-8">
                            <Select
                              isDisabled={isViewPage}
                              inputId={`groups[${index}].performanceReviewFrequency`}
                              classNamePrefix="custom_select_input"
                              styles={CustomStyles}
                              options={[
                                { label: 'Annually', value: 'Annually' },
                                { label: 'Half-Yearly', value: 'Half-Yearly' },
                                { label: 'Quarterly', value: 'Quarterly' },
                              ]}
                              value={[
                                { label: 'Annually', value: 'Annually' },
                                { label: 'Half-Yearly', value: 'Half-Yearly' },
                                { label: 'Quarterly', value: 'Quarterly' },
                              ].find(
                                (option) => option.value
                                  === formik.values.groups?.[index]
                                    ?.performanceReviewFrequency,
                              )}
                              onChange={(selectedOption) => formik.setFieldValue(
                                `groups[${index}].performanceReviewFrequency`,
                                selectedOption?.value,
                              )}
                              placeholder="Select"
                            />
                            <ErrorMessage
                              name={`groups[${index}].performanceReviewFrequency`}
                              component="div"
                              className="text-danger small"
                            />
                          </div>
                        </div>

                        {/* 12. Has compliance with statutory requirements been reviewed */}
                        <div className="row mb-3 align-items-center">
                          <label className="col-md-4 col-form-label small-label fs-13">
                            Has compliance with relevant statutory requirements
                            been reviewed and non-compliances rectified by the
                            Director/ Board/ other committee
                          </label>
                          <div className="col-md-8">
                            <Field
                              disabled={isViewPage}
                              type="text"
                              name={`groups[${index}].statutoryComplianceReviewed`}
                              className="form-control form-control-sm"
                              placeholder="Enter compliance review details"
                            />
                            <ErrorMessage
                              name={`groups[${index}].statutoryComplianceReviewed`}
                              component="div"
                              className="text-danger small"
                            />
                          </div>
                        </div>

                        {/* 13. How often is compliance reviewed */}
                        <div className="row mb-3 align-items-center">
                          <label className="col-md-4 col-form-label small-label fs-13">
                            How often is compliance with relevant statutory
                            requirements reviewed and non-compliances rectified
                          </label>
                          <div className="col-md-8">
                            <Select
                              isDisabled={isViewPage}
                              inputId={`groups[${index}].statutoryComplianceFrequency`}
                              classNamePrefix="custom_select_input"
                              styles={CustomStyles}
                              options={[
                                { label: 'Annually', value: 'Annually' },
                                { label: 'Half-Yearly', value: 'Half-Yearly' },
                                { label: 'Quarterly', value: 'Quarterly' },
                              ]}
                              value={[
                                { label: 'Annually', value: 'Annually' },
                                { label: 'Half-Yearly', value: 'Half-Yearly' },
                                { label: 'Quarterly', value: 'Quarterly' },
                              ].find(
                                (option) => option.value
                                  === formik.values.groups?.[index]
                                    ?.statutoryComplianceFrequency,
                              )}
                              onChange={(selectedOption) => formik.setFieldValue(
                                `groups[${index}].statutoryComplianceFrequency`,
                                selectedOption?.value,
                              )}
                              placeholder="Select"
                            />
                            <ErrorMessage
                              name={`groups[${index}].statutoryComplianceFrequency`}
                              component="div"
                              className="text-danger small"
                            />
                          </div>
                        </div>

                        {/* 14. Independent assessment by external agency */}
                        <div className="row mb-3 align-items-center">
                          <label className="col-md-4 col-form-label small-label fs-13">
                            Has the entity carried out independent
                            assessment/evaluation of the working of this policy
                            by an external agency?
                          </label>
                          <div className="col-md-8">
                            <Select
                              isDisabled={isViewPage}
                              inputId={`groups[${index}].externalAssessmentConducted`}
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
                                  === formik.values.groups?.[index]
                                    ?.externalAssessmentConducted,
                              )}
                              onChange={(selectedOption) => formik.setFieldValue(
                                `groups[${index}].externalAssessmentConducted`,
                                selectedOption?.value,
                              )}
                              placeholder="Select"
                            />
                            <ErrorMessage
                              name={`groups[${index}].externalAssessmentConducted`}
                              component="div"
                              className="text-danger small"
                            />
                          </div>
                        </div>

                        {/* 15. If Yes, provide name of the agency */}
                        {formik.values.groups[index]
                          .externalAssessmentConducted === 'Yes' && (
                          <div className="row mb-3 align-items-center">
                            <label className="col-md-4 col-form-label small-label fs-13">
                              If Yes, provide name of the agency
                            </label>
                            <div className="col-md-8">
                              <Field
                                disabled={isViewPage}
                                type="text"
                                name={`groups[${index}].externalAssessmentAgencyName`}
                                className="form-control form-control-sm"
                                placeholder="Enter agency name"
                              />
                              <ErrorMessage
                                name={`groups[${index}].externalAssessmentAgencyName`}
                                component="div"
                                className="text-danger small"
                              />
                            </div>
                          </div>
                        )}

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
                    {/* Add Button */}
                    <div className="text-end">
                      {!isViewPage && (
                        <button
                          type="button"
                          className="btn btn-dark btn-sm"
                          onClick={() => push({
                            policyName: '',
                            coversBrsrPrinciples: '',
                            approvedByBoard: '',
                            policyWebLink: '',
                            translatedToProcedures: '',
                            extendedToValueChain: '',
                            adoptedStandards: '',
                            specificGoalsAndTargets: '',
                            performanceAgainstTargets: '',
                            reviewedByBoardOrCommittee: '',
                            performanceReviewFrequency: '',
                            statutoryComplianceReviewed: '',
                            statutoryComplianceFrequency: '',
                            externalAssessmentConducted: '',
                            externalAssessmentAgencyName: '',
                            groups: [
                              {
                                principlesNotMaterial: '',
                                notReadyToImplementPolicies: '',
                                lackOfResources: '',
                                plannedNextFinancialYear: '',
                                otherReason: '',
                              },
                            ],
                          })}
                        >
                          Add Group
                        </button>
                      )}
                    </div>
                  </>
                )}
              </FieldArray>

              {/* {formik.values.groups[0]?.coversBrsrPrinciples?.answer
                === '' && (
                <FieldArray> saved in notepad </FieldArray>
              )} */}
            </Form>
          </div>
        );
      }}
    </Formik>
  );
});

export interface EnvironmentalComplianceFormRef {
  submitForm: () => Promise<void>;
  getValues: () => any;
}

type EnvironmentalComplianceFormProps = {
  initialValues: {
    environmentalComplianceStatus: string;
    groups: {
      nonComplianceReason: string;
      nonComplianceInfo: string;
      regulatoryActions: string;
      correctiveAction: string;
    }[];
  };
  onChange: (data: any) => void;
  isViewPage: boolean;
};

const EnvironmentalComplianceForm = forwardRef<
  EnvironmentalComplianceFormRef,
  EnvironmentalComplianceFormProps
>(({ initialValues, onChange, isViewPage }, ref) => {
  const EnvironmentalComplianceSchema = Yup.object().shape({
    environmentalComplianceStatus: Yup.string().required('Required'),
    groups: Yup.array().of(
      Yup.object().shape({
        nonComplianceReason: Yup.string().required('Required'),
        nonComplianceInfo: Yup.string().required('Required'),
        regulatoryActions: Yup.string().required('Required'),
        correctiveAction: Yup.string().required('Required'),
      }),
    ),
  });

  const handleSubmit = (values: typeof initialValues) => {
    // console.log('✅ Form data:', values);
    // alert('Form submitted successfully!');
  };

  return (
    <Formik
      enableReinitialize
      initialValues={initialValues}
      validationSchema={EnvironmentalComplianceSchema}
      onSubmit={handleSubmit}
    >
      {(formik) => {
        useEffect(() => {
          onChange(formik.values);
        }, [formik.values, onChange]);

        useImperativeHandle(ref, () => ({
          submitForm: () => formik.submitForm(),
          getValues: () => formik.values,
          isValid: () => formik.isValid,
        }));

        return (
          <Form>
            <div className="container-fluid">
              <h6 className="fw-bold mb-4 fs-16">
                Compliance with environmental laws
              </h6>

              {/* Compliance Status Dropdown */}
              <div className="row mb-3 align-items-center">
                <label className="col-md-4 col-form-label small-label fs-13">
                  Is the entity compliant with the applicable environmental law/
                  regulations/guidelines in India?
                </label>
                <div className="col-md-8">
                  <Select
                    isDisabled={isViewPage}
                    inputId="environmentalComplianceStatus"
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
                        === formik.values.environmentalComplianceStatus,
                    )}
                    onChange={(selectedOption) => {
                      const value = selectedOption?.value;
                      formik.setFieldValue(
                        'environmentalComplianceStatus',
                        value,
                      );

                      if (
                        value === 'Yes'
                        && formik.values.groups?.length === 0
                      ) {
                        formik.setFieldValue('groups', [
                          {
                            nonComplianceReason: '',
                            nonComplianceInfo: '',
                            regulatoryActions: '',
                            correctiveAction: '',
                          },
                        ]);
                      }

                      if (value === 'No') {
                        formik.setFieldValue('traditionalKnowledgeGroups', []);
                      }
                    }}
                    placeholder="Select compliance status"
                  />
                  <ErrorMessage
                    name="showGroup"
                    component="div"
                    className="text-danger small"
                  />
                </div>
              </div>

              {/* Conditional Groups (only if Yes) */}
              {formik.values.environmentalComplianceStatus === 'Yes' && (
                <FieldArray name="groups">
                  {({ push, remove }) => (
                    <>
                      {formik.values.groups.map((_, index) => (
                        <div key={index} className="custom-box">
                          {/* Law not complied with */}
                          <div className="row mb-3">
                            <label className="col-md-4 col-form-label small-label fs-13">
                              Specify the law/regulation/guidelines which was
                              not complied with
                            </label>
                            <div className="col-md-8">
                              <Field
                                disabled={isViewPage}
                                type="text"
                                name={`groups[${index}].nonComplianceReason`}
                                className="form-control form-control-sm"
                                placeholder="Enter law/regulation"
                              />
                              <ErrorMessage
                                name={`groups[${index}].nonComplianceReason`}
                                component="div"
                                className="text-danger small"
                              />
                            </div>
                          </div>

                          {/* Details of non-compliance */}
                          <div className="row mb-3">
                            <label className="col-md-4 col-form-label small-label fs-13">
                              Provide details of the non-compliance
                            </label>
                            <div className="col-md-8">
                              <Field
                                disabled={isViewPage}
                                type="text"
                                name={`groups[${index}].nonComplianceInfo`}
                                className="form-control form-control-sm"
                                placeholder="Enter details"
                              />
                              <ErrorMessage
                                name={`groups[${index}].nonComplianceInfo`}
                                component="div"
                                className="text-danger small"
                              />
                            </div>
                          </div>

                          {/* Regulatory actions */}
                          <div className="row mb-3">
                            <label className="col-md-4 col-form-label small-label fs-13">
                              Any fines/penalties/action taken by regulatory
                              agencies
                            </label>
                            <div className="col-md-8">
                              <Field
                                disabled={isViewPage}
                                type="text"
                                name={`groups[${index}].regulatoryActions`}
                                className="form-control form-control-sm"
                                placeholder="Enter penalties/actions"
                              />
                              <ErrorMessage
                                name={`groups[${index}].regulatoryActions`}
                                component="div"
                                className="text-danger small"
                              />
                            </div>
                          </div>

                          {/* Corrective actions */}
                          <div className="row mb-3">
                            <label className="col-md-4 col-form-label small-label fs-13">
                              Corrective action taken, if any
                            </label>
                            <div className="col-md-8">
                              <Field
                                disabled={isViewPage}
                                type="text"
                                name={`groups[${index}].correctiveAction`}
                                className="form-control form-control-sm"
                                placeholder="Enter penalties/actions"
                              />
                              <ErrorMessage
                                name={`groups[${index}].correctiveAction`}
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
                            type="button"
                            className="btn btn-dark btn-sm"
                            onClick={() => push({
                              nonComplianceReason: '',
                              nonComplianceInfo: '',
                              regulatoryActions: '',
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

export interface BusinessContinuityFormRef {
  submitForm: () => Promise<void>;
  getValues: () => any;
}

type BusinessContinuityFormProps = {
  initialValues: {
    businessContinuityPlan: string;
    policyLink: string;
  };
  onChange: (values: {
    businessContinuityPlan: string;
    policyLink: string;
  }) => void;
  isViewPage: boolean;
};

const BusinessContinuityForm = forwardRef<
  BusinessContinuityFormRef,
  BusinessContinuityFormProps
>(({ initialValues, onChange, isViewPage }, ref) => {
  const businessContinuitySchema = Yup.object({
    businessContinuityPlan: Yup.string().required('Required'),
    policyLink: Yup.string().required('Required'),
  });

  const handleSubmit = (values: typeof initialValues) => {
    // console.log('✅ Form data:', values);
  };

  return (
    <Formik
      enableReinitialize
      initialValues={initialValues}
      validationSchema={businessContinuitySchema}
      onSubmit={handleSubmit}
    >
      {(formik) => {
        // ✅ Expose methods to parent
        useImperativeHandle(ref, () => ({
          submitForm: () => formik.submitForm(),
          getValues: () => formik.values,
          isValid: formik.isValid,
        }));

        // ✅ Notify parent on form value change
        useEffect(() => {
          onChange(formik.values);
        }, [formik.values, onChange]);

        return (
          <div className="container-fluid">
            <h6 className="fw-bold mb-4 fs-16">
              Business Continuity & Disaster Management Plan
            </h6>

            <Form>
              {/* Business Continuity Plan */}
              <div className="row mb-3 align-items-center">
                <label className="col-md-4 col-form-label small-label fs-13">
                  Details of the business continuity and disaster management
                  plan of the entity
                </label>
                <div className="col-md-8">
                  <Field
                    disabled={isViewPage}
                    type="text"
                    name="businessContinuityPlan"
                    className="form-control form-control-sm"
                    placeholder="Enter plan details"
                  />
                  <ErrorMessage
                    name="businessContinuityPlan"
                    component="div"
                    className="text-danger small"
                  />
                </div>
              </div>
              <hr className="textSecondary" />

              {/* Policy Link */}
              <div className="row mb-3 align-items-center">
                <label className="col-md-4 col-form-label small-label fs-13">
                  Provide web link of the policy (if available)
                </label>
                <div className="col-md-8">
                  <Field
                    disabled={isViewPage}
                    type="text"
                    name="policyLink"
                    className="form-control form-control-sm"
                    placeholder="Enter policy link"
                  />
                  <ErrorMessage
                    name="policyLink"
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

const ManagementDisclosurePage: React.FC<{
  user: IUser;
  disclosureData?: any;
  id?: string;
  apiKey?: string | any;
  datacubes?: IDataCube[];
}> = ({
  user, disclosureData, id, apiKey, datacubes,
}) => {
  // console.log(user, 'USER');
  // console.log(disclosureData, 'DISCLOSURE DATA');
  const pathname = usePathname();
  const isViewPage = pathname.endsWith('/view');
  // console.log(isViewPage);
  const [policyIndicator, setPolicyIndicator] = useState({
    name: 'Policy & Management Processes',
    status: 'Pending',
    percent: '0%',
  });

  const [environmentIndicator, setEnvironmentIndicator] = useState({
    name: 'Compliance with environmental laws',
    status: 'Pending',
    percent: '0%',
  });

  const [businessIndicator, setBusinessIndicator] = useState({
    name: 'Business Continuity & Disaster Management Plan',
    status: 'Pending',
    percent: '0%',
  });

  const indicators = [policyIndicator, environmentIndicator, businessIndicator];
  const [activeIndicator, setActiveIndicator] = useState(indicators[0]);

  const urlParams = useParams();
  const policyManagementFormRef = useRef<PolicyManagementFormRef>(null);
  const environmentalComplianceFormRef = useRef<EnvironmentalComplianceFormRef>(null);
  const businessContinuityFormRef = useRef<BusinessContinuityFormRef>(null);

  const [selectedYear, setSelectedYear] = useState<any>('');
  const [isLoading, setIsLoading] = useState(false);

  const [policyFormData, setPolicyFormData] = useState({
    groups: [
      {
        policyName: '',
        coversBrsrPrinciples: '',
        approvedByBoard: '',
        policyWebLink: '',
        translatedToProcedures: '',
        extendedToValueChain: '',
        adoptedStandards: '',
        specificGoalsAndTargets: '',
        performanceAgainstTargets: '',
        reviewedByBoardOrCommittee: '',
        performanceReviewFrequency: '',
        statutoryComplianceReviewed: '',
        statutoryComplianceFrequency: '',
        externalAssessmentConducted: '',
        externalAssessmentAgencyName: '',
        // groups: [
        //   {
        //     principlesNotMaterial: '',
        //     notReadyToImplementPolicies: '',
        //     lackOfResources: '',
        //     plannedNextFinancialYear: '',
        //     otherReason: '',
        //   },
        // ],
      },
    ],
  });
  const [environmentFormData, setEnvironmentFormData] = useState({
    environmentalComplianceStatus: '',
    groups: [
      {
        nonComplianceReason: '',
        nonComplianceInfo: '',
        regulatoryActions: '',
        correctiveAction: '',
      },
    ],
  });
  const [businessFormData, setBusinessFormData] = useState({
    businessContinuityPlan: '',
    policyLink: '',
  });
  const policyManagementQuestions = [
    {
      key: 'policyName',
      label: 'Name of the Policy',
      id: 'UID_1516',
    },
    {
      key: 'coversBrsrPrinciples', // ✅ single value, not holding group
      label:
        'Does this policy cover any of the BRSR Principles & its core elements of the NGRBCs',
      id: 'UID_1517',
    },
    {
      key: 'approvedByBoard',
      label: 'Has the policy been approved by the Board',
      id: 'UID_1518',
    },
    {
      key: 'policyWebLink',
      label: 'Web link of the policy, if available',
      id: 'UID_1519',
    },
    {
      key: 'translatedToProcedures',
      label: 'Is this policy translated into procedures in the entity',
      id: 'UID_1520',
    },
    {
      key: 'extendedToValueChain',
      label: "Is this policy extended to the entity's value chain partners",
      id: 'UID_1521',
    },
    {
      key: 'adoptedStandards',
      label:
        'Name of the national and international codes/certifications/labels/ standards adopted by your entity',
      id: 'UID_1522',
    },
    {
      key: 'specificGoalsAndTargets',
      label:
        'Specific commitments, goals and targets set by the entity with defined timelines, if any.',
      id: 'UID_1523',
    },
    {
      key: 'performanceAgainstTargets',
      label:
        'Performance of the entity against the specific commitments, goals and targets along-with reasons',
      id: 'UID_1524',
    },
    {
      key: 'reviewedByBoardOrCommittee',
      label:
        'Has performance against this policy been reviewed by the Director/ Board Committee/ or any other committee',
      id: 'UID_1525',
    },
    {
      key: 'performanceReviewFrequency',
      label: 'Review frequency of the performance against this policy',
      id: 'UID_1526',
    },
    {
      key: 'statutoryComplianceReviewed',
      label:
        'Has compliance with relevant statutory requirements been reviewed',
      id: 'UID_1527',
    },
    {
      key: 'statutoryComplianceFrequency',
      label:
        'How often is compliance with relevant statutory requirements reviewed',
      id: 'UID_1528',
    },
    {
      key: 'externalAssessmentConducted',
      label:
        'Has the entity carried out independent assessment/ evaluation of the working of this policy by an external agency?',
      id: 'UID_1529',
    },
    {
      key: 'externalAssessmentAgencyName',
      label: 'If Yes, provide name of the agency',
      id: 'UID_1530',
      showIf: {
        key: 'externalAssessmentConducted',
        value: 'Yes',
      },
    },
    // ✅ Separate nested group section (sibling of the above questions)
    // {
    //   group: [
    //     {
    //       key: 'groups[0].principlesNotMaterial',
    //       label:
    //         'The entity does not consider the Principles material to its business',
    //       id: 'UID_1531',
    //     },
    //     {
    //       key: 'groups[0].notReadyToImplementPolicies',
    //       label:
    //         'The entity is not at a stage where it is in a position to formulate and implement the policies on specified principles',
    //       id: 'UID_1532',
    //     },
    //     {
    //       key: 'groups[0].lackOfResources',
    //       label:
    //         'The entity does not have the financial or/human and technical resources available for the task',
    //       id: 'UID_1533',
    //     },
    //     {
    //       key: 'groups[0].plannedNextFinancialYear',
    //       label: 'It is planned to be done in the next financial year',
    //       id: 'UID_1534',
    //     },
    //     {
    //       key: 'groups[0].otherReason',
    //       label: 'Any other reason (please specify)',
    //       id: 'UID_1535',
    //     },
    //   ],
    // },
  ];
  const isFilled = (val: any) => val !== ''
    && val !== null
    && val !== undefined
    && !(Array.isArray(val) && val.length === 0);

  const calculateFormCompletionPercent = (
    formData: any,
    type: 'policy' | 'environment' | 'business',
  ) => {
    if (!formData || typeof formData !== 'object') return 0;

    const valuesToConsider: any[] = [];

    if (type === 'policy') {
      const group = formData.groups?.[0];
      if (!group) return 0;

      policyManagementQuestions.forEach((q) => {
        // ✅ Skip if question has `showIf` but condition not met
        if (q.showIf && group[q.showIf.key] !== q.showIf.value) {
          return;
        }

        const value = group[q.key];
        valuesToConsider.push(value);
      });
    }

    if (type === 'environment') {
      const status = formData.environmentalComplianceStatus;
      const group = formData.groups?.[0] || {};
      valuesToConsider.push(status);
      if (status === 'Yes') {
        valuesToConsider.push(...Object.values(group));
      }
    }

    if (type === 'business') {
      valuesToConsider.push(...Object.values(formData));
    }

    const total = valuesToConsider.length;
    if (total === 0) return 0;
    const filled = valuesToConsider.filter(isFilled).length;

    return Math.round((filled / total) * 100);
  };

  // ===== Update Percentages & Status =====
  useEffect(() => {
    const policyPercent = calculateFormCompletionPercent(
      policyFormData,
      'policy',
    );
    const envPercent = calculateFormCompletionPercent(
      environmentFormData,
      'environment',
    );
    const businessPercent = calculateFormCompletionPercent(
      businessFormData,
      'business',
    );

    setPolicyIndicator((prev) => ({
      ...prev,
      percent: `${policyPercent}%`,
      status:
        policyPercent === 100
          ? 'Completed'
          : policyPercent > 0
            ? 'In Progress'
            : 'Pending',
    }));

    setEnvironmentIndicator((prev) => ({
      ...prev,
      percent: `${envPercent}%`,
      status:
        envPercent === 100
          ? 'Completed'
          : envPercent > 0
            ? 'In Progress'
            : 'Pending',
    }));

    setBusinessIndicator((prev) => ({
      ...prev,
      percent: `${businessPercent}%`,
      status:
        businessPercent === 100
          ? 'Completed'
          : businessPercent > 0
            ? 'In Progress'
            : 'Pending',
    }));
  }, [policyFormData, environmentFormData, businessFormData]);

  type GroupType = {
    policyName: string;
    coversBrsrPrinciples: string;
    approvedByBoard: string;
    policyWebLink: string;
    translatedToProcedures: string;
    extendedToValueChain: string;
    adoptedStandards: string;
    specificGoalsAndTargets: string;
    performanceAgainstTargets: string;
    reviewedByBoardOrCommittee: string;
    performanceReviewFrequency: string;
    statutoryComplianceReviewed: string;
    statutoryComplianceFrequency: string;
    externalAssessmentConducted: string;
    externalAssessmentAgencyName: string;
  };

  type PolicyFormData = {
    groups: GroupType[];
  };

  const parsePolicyFromApi = (questionGroup: any) => {
    const formData: PolicyFormData = { groups: [] };

    const groupData = questionGroup.groups ?? [];

    if (groupData.length > 0) {
      formData.groups = groupData.map((groupItems: any[]) => {
        const groupObj: any = {};

        groupItems.forEach((item) => {
          const matched = policyManagementQuestions.find(
            (q) => q.id === item.universal_question_id,
          );

          if (matched && 'key' in matched) {
            groupObj[matched.key] = item.answer ?? '';
          }
        });

        // Ensure all keys exist
        policyManagementQuestions.forEach((q) => {
          if ('key' in q && !(q.key in groupObj)) {
            groupObj[q.key] = '';
          }
        });

        return groupObj as GroupType;
      });
    } else {
      // No groups, add empty
      const emptyGroup: any = {};
      policyManagementQuestions.forEach((q) => {
        if ('key' in q) emptyGroup[q.key] = '';
      });
      formData.groups = [emptyGroup as GroupType];
    }

    return formData;
  };

  const parseEnvironmentFromApi = (questionsFromApi: any[]) => {
    const formData: any = {
      environmentalComplianceStatus: '',
      groups: [],
    };

    // Find the main (dependent) question
    const mainQuestion = questionsFromApi.find(
      (q: any) => q.universal_question_id === 'UID_1536', // update to actual question ID
    );

    formData.environmentalComplianceStatus = mainQuestion?.answer || '';

    const hasAnsweredYes = mainQuestion?.answer === 'Yes';

    // Only parse group questions if main answer is 'Yes'
    if (hasAnsweredYes) {
      if (Array.isArray(mainQuestion.group) && mainQuestion.group.length > 0) {
        formData.groups = mainQuestion.group.map((groupSet: any[]) => {
          const groupObj: any = {};
          groupSet.forEach((item: any) => {
            const matched = environmentalComplianceQuestions.find(
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
  const parseBusinessFromApi = (questionsFromApi: any[]) => {
    const formData: any = {
      businessContinuityPlan: '',
      policyLink: '',
    };

    questionsFromApi.forEach((item: any) => {
      const matched = businessContinuityQuestions.find(
        (q) => q.id === item.universal_question_id,
      );
      if (matched) {
        formData[matched.key] = item.answer;
      }
    });

    return formData;
  };

  const [isPolicyFormLoaded, setIsPolicyFormLoaded] = useState(false);
  const [isEnvironmentFormLoaded, setIsEnvironmentFormLoaded] = useState(false);
  const [isBusinessFormLoaded, setIsBusinessFormLoaded] = useState(false);

  useEffect(() => {
    if (disclosureData?.indicators?.length > 0) {
      // --- POLICY FORM ---
      const policyIndicator = disclosureData.indicators.find(
        (item: any) => item.name?.trim()?.toLowerCase() === 'policy & management processes',
      );
      console.log(policyIndicator, 'policyIndicator');

      if (policyIndicator?.questions?.length > 0) {
        const parsedPolicy = parsePolicyFromApi(policyIndicator.questions[0]); // ✅ Pass the first questionGroup
        setPolicyFormData(parsedPolicy as typeof policyFormData);
      }
      setIsPolicyFormLoaded(true);
      // assuming you maintain a loader like this

      // --- ENVIRONMENTAL FORM ---
      const environmentIndicator = disclosureData.indicators.find(
        (item: any) => item.name?.trim()?.toLowerCase()
          === 'compliance with environmental laws',
      );
      if (environmentIndicator?.questions?.length > 0) {
        const parsedEnvironment = parseEnvironmentFromApi(
          environmentIndicator.questions,
        );
        setEnvironmentFormData(parsedEnvironment);
      }
      setIsEnvironmentFormLoaded(true); // optional flag

      // --- BUSINESS FORM ---
      const businessIndicator = disclosureData.indicators.find(
        (item: any) => item.name?.trim()?.toLowerCase() === 'business continuity planning',
      );
      if (businessIndicator?.questions?.length > 0) {
        const parsedBusiness = parseBusinessFromApi(
          businessIndicator.questions,
        );
        setBusinessFormData(parsedBusiness);
      }
      setIsBusinessFormLoaded(true); // optional flag
      setSelectedYear(disclosureData?.financial_year || '');
    }
  }, [disclosureData]);

  const renderForm = () => {
    if (id) {
      if (
        !isPolicyFormLoaded
        && !isEnvironmentFormLoaded
        && !isBusinessFormLoaded
      ) {
        return <div>Loading...</div>; // Show loading state
      }
    }
    return (
      <>
        <div
          style={{
            display:
              activeIndicator.name === 'Policy & Management Processes'
                ? 'block'
                : 'none',
          }}
        >
          <PolicyManagementForm
            ref={policyManagementFormRef}
            initialValues={policyFormData}
            onChange={(data) => setPolicyFormData(data)}
            isViewPage={isViewPage}
          />
        </div>

        <div
          style={{
            display:
              activeIndicator.name === 'Compliance with environmental laws'
                ? 'block'
                : 'none',
          }}
        >
          <EnvironmentalComplianceForm
            ref={environmentalComplianceFormRef}
            initialValues={environmentFormData}
            onChange={(data) => setEnvironmentFormData(data)}
            isViewPage={isViewPage}
          />
        </div>

        <div
          style={{
            display:
              activeIndicator.name
              === 'Business Continuity & Disaster Management Plan'
                ? 'block'
                : 'none',
          }}
        >
          <BusinessContinuityForm
            ref={businessContinuityFormRef}
            initialValues={businessFormData}
            onChange={(data) => setBusinessFormData(data)}
            isViewPage={isViewPage}
          />
        </div>
      </>
    );
  };
  const router = useRouter();

  const buildPolicyManagementOutput = (data: any) => {
    const groups = (data.groups || []).map((group: any) => policyManagementQuestions
      .filter((q) => {
        // ✅ respect showIf (only include when condition is met)
        if (q.showIf) {
          return group[q.showIf.key] === q.showIf.value;
        }
        return true;
      })
      .map((q) => ({
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

  const validatePolicyManagementForm = (values: any): boolean => {
    const groups = values.groups || [];

    // ===== Validate Group A only =====
    const groupAQuestions = policyManagementQuestions.filter((q) => {
      if (q.showIf) {
        // we'll check condition later for each group
        return true;
      }
      return !('group' in q); // exclude groupB definitions
    });

    // validate each group
    return groups.every((group: any) => {
      const requiredQuestions = groupAQuestions.filter((q: any) => {
        if (q.showIf) {
          return group[q.showIf.key] === q.showIf.value;
        }
        return true;
      });

      return requiredQuestions.every((q: any) => {
        const value = group[q.key] ?? '';
        return String(value).trim() !== '';
      });
    });
  };

  const environmentalComplianceQuestions = [
    {
      id: 'UID_1536',
      label:
        'Is the entity compliant with the applicable environmental law/ regulations/ guidelines in India such as the Water (Prevention and Control of Pollution) Act, Air (Prevention and Control of Pollution) Act, Environment protection act and rules thereunder',
      key: 'environmentalComplianceStatus',
      isGroup: false, // main question
    },
    {
      id: 'UID_1537',
      label:
        'Specify the law / regulation / guidelines which was not complied with',
      key: 'nonComplianceReason',
      isGroup: true,
    },
    {
      id: 'UID_1538',
      label: 'Provide details of the non-compliance',
      key: 'nonComplianceInfo',
      isGroup: true,
    },
    {
      id: 'UID_1539',
      label: 'Any fines/penalties/action taken by regulatory agencies',
      key: 'regulatoryActions',
      isGroup: true,
    },
    {
      id: 'UID_1540',
      label: 'Corrective action taken, if any',
      key: 'correctiveAction',
      isGroup: true,
    },
  ];

  const buildEnvironmentalComplianceOutput = (envRaw: any) => {
    const mainQuestion = environmentalComplianceQuestions.find(
      (q) => !q.isGroup,
    );
    const groupQuestions = environmentalComplianceQuestions.filter(
      (q) => q.isGroup,
    );
    const envOutput: any[] = [];

    if (mainQuestion) {
      const mainAnswer = envRaw[mainQuestion.key] || '';
      const mainEntry: any = {
        universal_question_id: mainQuestion.id,
        question_title: mainQuestion.label,
        answer: mainAnswer,
      };

      // ✅ Always include group regardless of Yes or No
      if (
        mainAnswer === 'Yes'
        && Array.isArray(envRaw.groups)
        && envRaw.groups.length > 0
      ) {
        mainEntry.group = envRaw.groups.map((groupAns: any) => groupQuestions.map((q) => ({
          universal_question_id: q.id,
          question_title: q.label,
          answer: groupAns[q.key] || '',
        })));
      }

      envOutput.push(mainEntry);
    }

    return envOutput;
  };

  const validateEnvironmentalComplianceForm = (allFormValues: any) => {
    const mainField = allFormValues?.environmentalComplianceStatus
      ?.trim()
      ?.toLowerCase();

    if (!mainField) return false;

    if (mainField === 'yes') {
      const groupArray = allFormValues?.groups || [];
      const groupQuestions = environmentalComplianceQuestions.filter(
        (q) => q.isGroup,
      );

      // ❗ Require at least one group object
      if (!Array.isArray(groupArray) || groupArray.length === 0) return false;

      // ❗ Check each group's required fields
      return groupArray.every((groupObj: any) => groupQuestions.every((q) => {
        const ans = String(groupObj[q.key] ?? '').trim();
        return ans !== '';
      }));
    }

    return true;
  };

  const businessContinuityQuestions = [
    {
      id: 'UID_1541',
      label:
        'Details of the business continuity and disaster management plan of the entity',
      key: 'businessContinuityPlan',
    },
    {
      id: 'UID_1542',
      label: 'Provide web link of the policy (if available)',
      key: 'policyLink',
    },
  ];

  const buildBusinessContinuityOutput = (values: any) => businessContinuityQuestions.map((question) => ({
    universal_question_id: question.id,
    question_title: question.label,
    answer: values[question.key] || '',
  }));

  const validateBusinessContinuityForm = (values: any) => {
    for (const question of businessContinuityQuestions) {
      const answer = values?.[question.key];

      if (answer === undefined || answer === null || answer === '') {
        return false;
      }
    }

    return true;
  };

  const handlePreviewClick = async () => {
    if (!selectedYear) {
      toast.error('Please select a financial year before previewing the form.');
      return false;
    }

    await Promise.all([
      policyManagementFormRef.current?.submitForm?.(),
      environmentalComplianceFormRef.current?.submitForm?.(),
      businessContinuityFormRef.current?.submitForm?.(),
    ]);

    // Get values from each form
    const policyManagementValues = policyManagementFormRef.current?.getValues?.() || {};
    const environmentalValues = environmentalComplianceFormRef.current?.getValues?.() || {};
    const businessContinuityValues = businessContinuityFormRef.current?.getValues?.() || {};

    // console.log(policyManagementValues, '===========');
    // const policyOutput = buildPolicyManagementOutput({
    //   groupA: policyManagementValues.groupA || [],
    //   groupB: policyManagementValues.groupB || [],
    // });
    // Validate all forms
    const isPolicyFormValid = validatePolicyManagementForm(
      policyManagementValues,
    );
    const isEnvironmentalFormValid = validateEnvironmentalComplianceForm(environmentalValues);
    const isBusinessContinuityFormValid = validateBusinessContinuityForm(
      businessContinuityValues,
    );

    // 3. Validate all
    if (
      !isPolicyFormValid
      || !isEnvironmentalFormValid
      || !isBusinessContinuityFormValid
    ) {
      toast.error('Please complete all required fields in all forms.');
      return false;
    }
    // console.log(isPolicyFormValid, 'isPolicyFormValid');
    // console.log(isEnvironmentalFormValid, 'isEnvironmentalFormValid');
    // console.log(isBusinessContinuityFormValid, 'isBusinessContinuityFormValid');

    // Build final output using builder functions
    const finalOutput: any = {
      name: 'Management',
      datacube_id: selectedYear,
      submitted_by: user?.id,
      indicators: [
        {
          name: 'Policy & Management Processes',
          questions: buildPolicyManagementOutput(policyManagementValues),
        },
        {
          name: 'Compliance with Environmental Laws',
          questions: buildEnvironmentalComplianceOutput(environmentalValues),
        },
        {
          name: 'Business Continuity Planning',
          questions: buildBusinessContinuityOutput(businessContinuityValues),
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
      toast.success('Management data submitted successfully');
      router.push('/disclosure/management');
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

  // inside the component body (near your other hooks)
  const breadCrumbsItem = useMemo(
    () => [
      // clickable link for the management page
      { title: 'Management', url: '/disclosure/management' },
      { title: activeIndicator?.name, url: '#' },
    ],
    [activeIndicator?.name],
  );

  // wrapper expects an array whose elements have a `breadCrumb` array (see your example)
  const breadCrumbMenu = [{ title: '', breadCrumb: breadCrumbsItem }];

  return (
    <PageHeaderWrapper
      breadCrumbMenu={breadCrumbMenu}
      extraClassName="my-4 px-4 pt-3"
      title="Management"
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
      {/* Content area */}
      {datacubes && datacubes.length > 0 ? (
        <div className="row">
          {/* Sidebar */}
          <div className="col-12 col-lg-3 mb-4">
            <div className="p-3 border rounded bg-white">
              <div className="text-muted mb-2 fw-bold">Indicators</div>
              {indicators.map((indicator) => (
                <div
                  key={indicator.name}
                  className={`sidebarItem p-3 mb-3 ${
                    activeIndicator.name === indicator.name ? 'active' : ''
                  }`}
                  onClick={() => setActiveIndicator(indicator)}
                >
                  <div className="d-flex justify-content-between align-items-center mb-2">
                    <span
                      className={`fs-14 fw-500 ${
                        activeIndicator.name === indicator.name
                          ? 'text-warning fw-bold'
                          : ''
                      }`}
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

          {/* Main form content */}
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

export default ManagementDisclosurePage;

// const [policyFormData, setPolicyFormData] = useState({
//   groups: [
//     {
//       policyName: '',
//       coversBrsrPrinciples: {
//         answer: '',
//         groups: [
//           {
//             principlesNotMaterial: '',
//             notReadyToImplementPolicies: '',
//             lackOfResources: '',
//             plannedNextFinancialYear: '',
//             otherReason: '',
//           },
//         ],
//       },
//       approvedByBoard: '',
//       policyWebLink: '',
//       translatedToProcedures: '',
//       extendedToValueChain: '',
//       adoptedStandards: '',
//       specificGoalsAndTargets: '',
//       performanceAgainstTargets: '',
//       reviewedByBoardOrCommittee: '',
//       performanceReviewFrequency: '',
//       statutoryComplianceReviewed: '',
//       statutoryComplianceFrequency: '',
//       externalAssessmentConducted: '',
//       externalAssessmentAgencyName: '',
//     },
//   ],
// });
