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
import './StakeholderIdentification.css';
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

export interface StakeholderIdentificationFormRef {
  submitForm: () => Promise<void>;
  getValues: () => any;
}

type StakeholderIdentificationFormProps = {
  initialValues: {
    processForIdentifying: string;
    boardConsultationProcess: string;
    isConsultationUsed: string;
    consultationInstances: string;
    vulnerableGroupActions: string;

    groups: {
      stakeholderName: string;
      isVulnerable: string;
      communicationChannel: string[];
      communicationChannelOther: string;
      engagementFrequency: string;
      engagementFrequencyOther: string;
      topicsDiscussed: string;
    }[];
  };

  onChange: (data: any) => void;
  isViewPage: boolean;
};

const StakeholderIdentificationForm = forwardRef<
  StakeholderIdentificationFormRef,
  StakeholderIdentificationFormProps
>(({ initialValues, onChange, isViewPage }, ref) => {
  const StakeholderIdentificationSchema = Yup.object().shape({
    processForIdentifying: Yup.string().required('Required'),
    boardConsultationProcess: Yup.string().required('Required'),
    isConsultationUsed: Yup.string().required('Required'),
    consultationInstances: Yup.string().required('Required'),
    vulnerableGroupActions: Yup.string().required('Required'),

    groups: Yup.array().of(
      Yup.object().shape({
        stakeholderName: Yup.string().required('Required'),
        isVulnerable: Yup.string().required('Required'),
        communicationChannel: Yup.array()
          .of(Yup.string())
          .min(1, 'Select at least one communication channel')
          .required('Required'),
        communicationChannelOther: Yup.string().required('Required'),
        engagementFrequency: Yup.string().required('Required'),
        engagementFrequencyOther: Yup.string().required('Required'),
        topicsDiscussed: Yup.string().required('Required'),
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
      validationSchema={StakeholderIdentificationSchema}
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
            <div className="row mb-3 align-items-center">
              <h6 className="fw-bold mb-4 fs-16">Stakeholder Identification</h6>

              <div className="row mb-3">
                <label className="col-md-4 col-form-label small-label fs-13">
                  Describe the processes for identifying key stakeholder groups
                </label>
                <div className="col-md-8">
                  <Field
                    disabled={isViewPage}
                    as="textarea"
                    name="processForIdentifying"
                    className="form-control form-control-sm"
                    placeholder="Enter stakeholder process"
                  />
                  <ErrorMessage
                    name="processForIdentifying"
                    component="div"
                    className="text-danger small"
                  />
                </div>
              </div>

              <FieldArray name="groups">
                {({ push, remove }) => (
                  <>
                    {formik.values.groups.map((_, index: number) => (
                      <div key={index} className="custom-box mt-3">
                        {/* Stakeholder Name */}
                        <div className="row mb-3">
                          <label className="col-md-4 col-form-label small-label fs-13">
                            Name of the stakeholder group
                          </label>
                          <div className="col-md-8">
                            <Field
                              disabled={isViewPage}
                              type="text"
                              name={`groups[${index}].stakeholderName`}
                              className="form-control form-control-sm"
                              placeholder="Enter stakeholder name"
                            />
                            <ErrorMessage
                              name={`groups[${index}].stakeholderName`}
                              component="div"
                              className="text-danger small"
                            />
                          </div>
                        </div>

                        {/* Vulnerable group? */}
                        <div className="row mb-3 align-items-center">
                          <label className="col-md-4 col-form-label small-label fs-13">
                            Are they identified as Vulnerable &amp; Marginalized
                            Group
                          </label>
                          <div className="col-md-8">
                            <Select
                              isDisabled={isViewPage}
                              inputId={`groups[${index}].isVulnerable`}
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
                                  === formik.values.groups[index].isVulnerable,
                              )}
                              onChange={(selected) => formik.setFieldValue(
                                `groups[${index}].isVulnerable`,
                                selected?.value,
                              )}
                            />
                            <ErrorMessage
                              name={`groups[${index}].isVulnerable`}
                              component="div"
                              className="text-danger small"
                            />
                          </div>
                        </div>

                        {/* Communication Channels */}
                        <div className="row mb-3 align-items-center">
                          <label className="col-md-4 col-form-label small-label fs-13">
                            Channels of communication
                          </label>
                          <div className="col-md-8">
                            <Select
                              isDisabled={isViewPage}
                              inputId={`groups[${index}].communicationChannel`}
                              classNamePrefix="custom_select_input"
                              placeholder="Select communication channels"
                              styles={CustomStyles}
                              options={[
                                { label: 'E-mail', value: 'E-mail' },
                                {
                                  label: 'Annual Report',
                                  value: 'Annual Report',
                                },
                                {
                                  label: 'Company Website',
                                  value: 'Company Website',
                                },
                                {
                                  label: 'Statutory and Voluntary Disclosures',
                                  value: 'Statutory and Voluntary Disclosures',
                                },
                                { label: 'Pamphlets', value: 'Pamphlets' },
                                {
                                  label: 'Advertisement',
                                  value: 'Advertisement',
                                },
                                {
                                  label: 'Community Meetings',
                                  value: 'Community Meetings',
                                },
                                {
                                  label: 'Notice Board',
                                  value: 'Notice Board',
                                },
                                { label: 'Newspaper', value: 'Newspaper' },
                                { label: 'SMS', value: 'SMS' },
                                { label: 'Others', value: 'Others' },
                              ]}
                              isMulti
                              value={[
                                { label: 'E-mail', value: 'E-mail' },
                                {
                                  label: 'Annual Report',
                                  value: 'Annual Report',
                                },
                                {
                                  label: 'Company Website',
                                  value: 'Company Website',
                                },
                                {
                                  label: 'Statutory and Voluntary Disclosures',
                                  value: 'Statutory and Voluntary Disclosures',
                                },
                                { label: 'Pamphlets', value: 'Pamphlets' },
                                {
                                  label: 'Advertisement',
                                  value: 'Advertisement',
                                },
                                {
                                  label: 'Community Meetings',
                                  value: 'Community Meetings',
                                },
                                {
                                  label: 'Notice Board',
                                  value: 'Notice Board',
                                },
                                { label: 'Newspaper', value: 'Newspaper' },
                                { label: 'SMS', value: 'SMS' },
                                { label: 'Others', value: 'Others' },
                              ].filter((option) => formik.values.groups[
                                index
                              ].communicationChannel?.includes(option.value))}
                              onChange={(selected) => formik.setFieldValue(
                                `groups[${index}].communicationChannel`,
                                selected
                                  ? selected.map((s: any) => s.value)
                                  : [],
                              )}
                            />
                            <ErrorMessage
                              name={`groups[${index}].communicationChannel`}
                              component="div"
                              className="text-danger small"
                            />
                          </div>
                        </div>

                        {/* Specify Channel if Others */}
                        {formik.values.groups[
                          index
                        ].communicationChannel?.includes('Others') && (
                          <div className="row mb-3">
                            <label className="col-md-4 col-form-label small-label fs-13">
                              Specify the channel of communication
                            </label>
                            <div className="col-md-8">
                              <Field
                                disabled={isViewPage}
                                type="text"
                                name={`groups[${index}].communicationChannelOther`}
                                className="form-control form-control-sm"
                                placeholder="Enter other channel"
                              />
                              <ErrorMessage
                                name={`groups[${index}].communicationChannelOther`}
                                component="div"
                                className="text-danger small"
                              />
                            </div>
                          </div>
                        )}

                        {/* Engagement Frequency */}
                        <div className="row mb-3 align-items-center">
                          <label className="col-md-4 col-form-label small-label fs-13">
                            Frequency of Engagement
                          </label>
                          <div className="col-md-8">
                            <Select
                              isDisabled={isViewPage}
                              inputId={`groups[${index}].engagementFrequency`}
                              classNamePrefix="custom_select_input"
                              placeholder="Select engagement frequency"
                              styles={CustomStyles}
                              options={[
                                { label: 'Annually', value: 'Annually' },
                                { label: 'Half-Yearly', value: 'Half-Yearly' },
                                { label: 'Quarterly', value: 'Quarterly' },
                                { label: 'Others', value: 'Others' },
                              ]}
                              value={[
                                { label: 'Annually', value: 'Annually' },
                                { label: 'Half-Yearly', value: 'Half-Yearly' },
                                { label: 'Quarterly', value: 'Quarterly' },
                                { label: 'Others', value: 'Others' },
                              ].find(
                                (option) => option.value
                                  === formik.values.groups?.[index]
                                    ?.engagementFrequency,
                              )}
                              onChange={(selected) => formik.setFieldValue(
                                `groups[${index}].engagementFrequency`,
                                selected?.value,
                              )}
                            />
                            <ErrorMessage
                              name={`groups[${index}].engagementFrequency`}
                              component="div"
                              className="text-danger small"
                            />
                          </div>
                        </div>

                        {/* Specify Frequency if Others */}
                        {formik.values.groups[
                          index
                        ].engagementFrequency?.includes('Others') && (
                          <div className="row mb-3">
                            <label className="col-md-4 col-form-label small-label fs-13">
                              Specify the frequency of engagement
                            </label>
                            <div className="col-md-8">
                              <Field
                                disabled={isViewPage}
                                type="text"
                                name={`groups[${index}].engagementFrequencyOther`}
                                className="form-control form-control-sm"
                                placeholder="Enter other frequency"
                              />
                              <ErrorMessage
                                name={`groups[${index}].engagementFrequencyOther`}
                                component="div"
                                className="text-danger small"
                              />
                            </div>
                          </div>
                        )}

                        {/* Topics Discussed */}
                        <div className="row mb-3">
                          <label className="col-md-4 col-form-label small-label fs-13">
                            Topics discussed &amp; Concerns addressed
                          </label>
                          <div className="col-md-8">
                            <Field
                              disabled={isViewPage}
                              type="text"
                              name={`groups[${index}].topicsDiscussed`}
                              className="form-control form-control-sm"
                              placeholder="Enter topics & concerns"
                            />
                            <ErrorMessage
                              name={`groups[${index}].topicsDiscussed`}
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
                            stakeholderName: '',
                            isVulnerable: '',
                            communicationChannel: [],
                            communicationChannelOther: '',
                            engagementFrequency: [],
                            engagementFrequencyOther: '',
                            topicsDiscussed: '',
                          })}
                        >
                          Add Group
                        </button>
                      )}
                    </div>
                  </>
                )}
              </FieldArray>

              {/* Board–Stakeholder Consultation Process */}
              <div className="row mb-3 mt-5">
                <label className="col-md-4 col-form-label small-label fs-13">
                  Describe the processes for consultation between Board and
                  stakeholders on economic, environmental and social topics or
                  if consultation delegated, how is feedback from such
                  consultations provided to Board
                </label>
                <div className="col-md-8">
                  <Field
                    as="textarea"
                    name="boardConsultationProcess"
                    className="form-control"
                    disabled={isViewPage}
                    placeholder="Enter board consultation"
                  />
                  <ErrorMessage
                    name="boardConsultationProcess"
                    component="div"
                    className="text-danger small"
                  />
                </div>
              </div>

              {/* Stakeholder Consultation Usage (Yes/No) */}
              <div className="row mb-3">
                <label className="col-md-4 col-form-label small-label fs-13">
                  Is stakeholder consultation used to support the identification
                  and management of environmental, and social topics?
                </label>
                <div className="col-md-8">
                  <Select
                    isDisabled={isViewPage}
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
                      (option) => option.value === formik.values.isConsultationUsed,
                    )}
                    onChange={(selectedOption) => formik.setFieldValue(
                      'isConsultationUsed',
                      selectedOption?.value || '',
                    )}
                    placeholder="Select"
                  />
                  <ErrorMessage
                    name="isConsultationUsed"
                    component="div"
                    className="text-danger small"
                  />
                </div>
              </div>

              {/* Instances of Incorporation (conditional on Yes above) */}
              {formik.values.isConsultationUsed === 'Yes' && (
                <div className="row mb-3">
                  <label className="col-md-4 col-form-label small-label fs-13">
                    If Yes, provide details of instances as to how the inputs
                    received from stakeholders on these topics were incorporated
                    into policies and activities of the entity.
                  </label>
                  <div className="col-md-8">
                    <Field
                      as="textarea"
                      name="consultationInstances"
                      className="form-control"
                      disabled={isViewPage}
                      placeholder="Enter consultation details"
                    />
                    <ErrorMessage
                      name="consultationInstances"
                      component="div"
                      className="text-danger small"
                    />
                  </div>
                </div>
              )}

              {/* Vulnerable/Marginalised Stakeholder Actions */}
              <div className="row mb-3">
                <label className="col-md-4 col-form-label small-label fs-13">
                  Provide details of instances of engagement with, and actions
                  taken to, address the concerns of vulnerable/marginalised
                  stakeholder groups.
                </label>
                <div className="col-md-8">
                  <Field
                    as="textarea"
                    name="vulnerableGroupActions"
                    className="form-control"
                    disabled={isViewPage}
                    placeholder="Enter vulnerable group actions"
                  />
                  <ErrorMessage
                    name="vulnerableGroupActions"
                    component="div"
                    className="text-danger small"
                  />
                </div>
              </div>
            </div>
          </Form>
        );
      }}
    </Formik>
  );
});

const StakeholderIdentification: React.FC<{
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
  const [stakeholderIndicator, setStakeholderIndicator] = useState({
    name: 'Stakeholder Identification',
    status: 'Pending',
    percent: '0%',
    badge: 'bg-danger',
  });

  const indicators = [stakeholderIndicator];
  const [activeIndicator, setActiveIndicator] = useState(indicators[0]);

  const urlParams = useParams();

  const stakeholderIdentificationFormRef = useRef<StakeholderIdentificationFormRef>(null);
  const [selectedYear, setSelectedYear] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const [stakeholderFormData, setStakeholderFormData] = useState({
    processForIdentifying: '',
    boardConsultationProcess: '',
    isConsultationUsed: '',
    consultationInstances: '',
    vulnerableGroupActions: '',
    groups: [
      {
        stakeholderName: '',
        isVulnerable: '',
        communicationChannel: [], // multi-select
        communicationChannelOther: '',
        engagementFrequency: '',
        engagementFrequencyOther: '',
        topicsDiscussed: '',
      },
    ],
  });

  type StakeholderGroup = {
    stakeholderName: string;
    isVulnerable: string;
    communicationChannel: string[];
    communicationChannelOther: string;
    engagementFrequency: string;
    engagementFrequencyOther: string;
    topicsDiscussed: string;
  };

  type StakeholderFormData = {
    processForIdentifying: string;
    boardConsultationProcess: string;
    isConsultationUsed: string;
    consultationInstances: string;
    vulnerableGroupActions: string;
    groups: StakeholderGroup[];
  };

  const calculateStakeholderCompletionPercent = (
    formData: StakeholderFormData,
    groupIndex = 0,
  ): number => {
    if (!formData) return 0;

    // --- Non-group fields ---
    const nonGroupKeys: (keyof StakeholderFormData)[] = [
      'processForIdentifying',
      'boardConsultationProcess',
      'isConsultationUsed',
      'consultationInstances',
      'vulnerableGroupActions',
    ];

    let totalFields = 0;
    let filledFields = 0;

    nonGroupKeys.forEach((key) => {
      // Dependency: consultationInstances only counts if isConsultationUsed === 'Yes'
      if (
        key === 'consultationInstances'
        && formData.isConsultationUsed !== 'Yes'
      ) {
        return; // skip counting this field
      }

      totalFields += 1;

      const value = formData[key];
      if (value !== '' && value !== null && value !== undefined) {
        filledFields += 1;
      }
    });

    // --- Group fields ---
    const group = formData.groups?.[groupIndex];
    if (group) {
      const groupKeys: (keyof StakeholderGroup)[] = [
        'stakeholderName',
        'isVulnerable',
        'communicationChannel',
        'communicationChannelOther',
        'engagementFrequency',
        'engagementFrequencyOther',
        'topicsDiscussed',
      ];

      groupKeys.forEach((key) => {
        // Group dependencies
        if (
          key === 'communicationChannelOther'
          && !group.communicationChannel.includes('Others')
        ) {
          return; // skip
        }
        if (
          key === 'engagementFrequencyOther'
          && group.engagementFrequency !== 'Others'
        ) {
          return; // skip
        }

        totalFields += 1;

        const value = group[key];
        if (
          value !== ''
          && value !== null
          && value !== undefined
          && (!Array.isArray(value) || value.length > 0)
        ) {
          filledFields += 1;
        }
      });
    }

    return totalFields === 0
      ? 0
      : Math.round((filledFields / totalFields) * 100);
  };

  useEffect(() => {
    const percent = calculateStakeholderCompletionPercent(stakeholderFormData);
    setStakeholderIndicator((prev) => ({
      ...prev,
      percent: `${percent}%`,
      status: percent === 100 ? 'Completed' : 'Pending',
    }));
  }, [stakeholderFormData]);

  const [isFormDataLoading, setIsFormDataLoading] = useState(false);

  const stakeholderQuestions = [
    {
      id: 'UID_83',
      key: 'processForIdentifying',
      label:
        'Describe the processes for identifying key stakeholder groups of the entity ',
      isGroup: false,
    },
    {
      id: 'UID_84',
      key: 'stakeholderName',
      label: 'Name of the stakeholder group',
      isGroup: true,
    },
    {
      id: 'UID_85',
      key: 'isVulnerable',
      label: 'Are they identified as Vulnerable & Marginalized Group',
      isGroup: true,
    },
    {
      id: 'UID_86',
      key: 'communicationChannel',
      label: 'Channels of communication',
      isGroup: true,
    },
    {
      id: 'UID_87',
      key: 'communicationChannelOther',
      label: 'Specify the channel of communication',
      isGroup: true,
    },
    {
      id: 'UID_88',
      key: 'engagementFrequency',
      label: 'Frequency of Engagement',
      isGroup: true,
    },
    {
      id: 'UID_89',
      key: 'engagementFrequencyOther',
      label: 'Specify the frequency of engagement',
      isGroup: true,
    },
    {
      id: 'UID_90',
      key: 'topicsDiscussed',
      label: 'Topics discussed & Concerns addressed',
      isGroup: true,
    },
    {
      id: 'UID_91',
      key: 'boardConsultationProcess',
      label:
        'Describe the processes for consultation between Board and stakeholders on economic, environmental and social topics or if consultation delegated, how is feedback from such consultations provided to Board ',
      isGroup: false,
    },
    {
      id: 'UID_92',
      key: 'isConsultationUsed',
      label:
        'Is stakeholder consultation used to support the identification and management of environmental, and social topics (Yes / No) ',
      isGroup: false,
    },
    {
      id: 'UID_93',
      key: 'consultationInstances',
      label:
        'If Yes, provide details of instances as to how the inputs received from stakeholders on these topics were incorporated into policies and activities of the entity. ',
      isGroup: false,
    },
    {
      id: 'UID_94',
      key: 'vulnerableGroupActions',
      label:
        'Provide details of instances of engagement with, and actions taken to, address the concerns of vulnerable/marginalised stakeholder groups. ',
      isGroup: false,
    },
  ];

  const buildStakeholderOutput = (stakeholderRaw: any) => {
    const groupQuestions = stakeholderQuestions.filter((q) => q.isGroup);
    const nonGroupQuestions = stakeholderQuestions.filter((q) => !q.isGroup);

    const stakeholderOutput: any[] = [];

    // Helper function to handle dependencies
    const getAnswer = (qKey: string, answer: any, source: any) => {
      // Non-group dependency
      if (
        qKey === 'consultationInstances'
        && source.isConsultationUsed !== 'Yes'
      ) {
        return '';
      }

      // Group dependencies
      if (
        qKey === 'communicationChannelOther'
        && !source.communicationChannel?.includes('Others')
      ) {
        return '';
      }

      if (
        qKey === 'engagementFrequencyOther'
        && !source.engagementFrequency?.includes('Others')
      ) {
        return '';
      }

      return answer;
    };

    // Process non-group questions
    nonGroupQuestions.forEach((q) => {
      const answer = getAnswer(
        q.key,
        stakeholderRaw[q.key] || '',
        stakeholderRaw,
      );

      if (answer !== '' && !(Array.isArray(answer) && answer.length === 0)) {
        stakeholderOutput.push({
          universal_question_id: q.id,
          question_title: q.label,
          answer,
        });
      }
    });

    // Process group questions
    const allGroups: any[] = [];

    if (
      Array.isArray(stakeholderRaw.groups)
      && stakeholderRaw.groups.length > 0
    ) {
      stakeholderRaw.groups.forEach((groupAns: any) => {
        const groupEntry = groupQuestions
          .map((q) => {
            const answer = getAnswer(q.key, groupAns[q.key] || '', groupAns);
            return {
              universal_question_id: q.id,
              question_title: q.label,
              answer,
            };
          })
          .filter(
            (q) => q.answer !== ''
              && !(Array.isArray(q.answer) && q.answer.length === 0),
          );

        if (groupEntry.length > 0) {
          allGroups.push(groupEntry);
        }
      });
    }

    // Add a single group object if there are any groups
    if (allGroups.length > 0) {
      stakeholderOutput.push({ groups: allGroups });
    }

    return stakeholderOutput;
  };

  const validateStakeholderForm = (
    formData: typeof stakeholderFormData,
  ): boolean => {
    if (!formData) return false;

    // Non-group required fields
    if (!formData.processForIdentifying?.trim()) return false;
    if (!formData.boardConsultationProcess?.trim()) return false;
    if (!formData.isConsultationUsed) return false;

    if (
      formData.isConsultationUsed === 'Yes'
      && !formData.consultationInstances?.trim()
    ) {
      return false;
    }

    if (!formData.vulnerableGroupActions?.trim()) return false;

    // Groups validation
    const groupArray = formData.groups || [];
    if (!Array.isArray(groupArray) || groupArray.length === 0) return false;

    return groupArray.every((group: any) => {
      if (!group.stakeholderName?.trim()) return false;
      if (!group.isVulnerable) return false;

      if (
        !group.communicationChannel
        || group.communicationChannel.length === 0
      ) return false;

      if (
        group.communicationChannel.includes('Others')
        && !group.communicationChannelOther?.trim()
      ) {
        return false;
      }

      if (!group.engagementFrequency) return false;

      if (
        group.engagementFrequency === 'Others'
        && !group.engagementFrequencyOther?.trim()
      ) {
        return false;
      }

      if (!group.topicsDiscussed?.trim()) return false;

      return true; // ✅ all good for this group
    });
  };

  const parseStakeholderFromApi = (questionsFromApi: any[]) => {
    const formData: any = {
      processForIdentifying: '',
      boardConsultationProcess: '',
      isConsultationUsed: '',
      consultationInstances: '',
      vulnerableGroupActions: '',
      groups: [],
    };

    // Map non-group questions
    stakeholderQuestions
      .filter((q) => !q.isGroup)
      .forEach((q) => {
        const questionFromApi = questionsFromApi.find(
          (item) => item.universal_question_id === q.id,
        );

        let answer = questionFromApi?.answer || '';

        // dependency: consultationInstances only if Yes
        if (
          q.key === 'consultationInstances'
          && formData.isConsultationUsed !== 'Yes'
        ) {
          answer = '';
        }

        formData[q.key] = answer;
      });

    // Process group questions
    const mainQuestionWithGroups = questionsFromApi.find(
      (q) => Array.isArray(q.groups) && q.groups.length > 0,
    );

    if (mainQuestionWithGroups) {
      formData.groups = mainQuestionWithGroups.groups.map((groupSet: any[]) => {
        const groupObj: any = {};
        groupSet.forEach((item) => {
          const matched = stakeholderQuestions.find(
            (q) => q.id === item.universal_question_id,
          );
          if (matched) {
            let { answer } = item;

            // group dependencies
            if (
              matched.key === 'communicationChannelOther'
              && !groupObj.communicationChannel?.includes('Others')
            ) {
              answer = '';
            }

            if (
              matched.key === 'engagementFrequencyOther'
              && !groupObj.engagementFrequency?.includes('Others')
            ) {
              answer = '';
            }

            groupObj[matched.key] = answer;
          }
        });
        return groupObj;
      });
    }

    return formData;
  };

  useEffect(() => {
    if (disclosureData?.indicators?.length > 0) {
      const stakeholderIndicator = disclosureData.indicators.find(
        (ind: any) => ind.name === 'Stakeholder Identification',
      );

      if (stakeholderIndicator?.questions?.length > 0) {
        const parsedData = parseStakeholderFromApi(
          stakeholderIndicator.questions,
        );
        // console.log(parsedData, 'parsedData');
        setStakeholderFormData(parsedData);
        setIsFormDataLoading(true);
      }
    }
  }, [disclosureData]);

  const router = useRouter();

  const renderForm = () => {
    if (id) {
      if (!isFormDataLoading) {
        return <p>Loading....</p>;
      }
    }
    return (
      <div
        style={{
          display:
            activeIndicator.name === 'Stakeholder Identification'
              ? 'block'
              : 'none',
        }}
      >
        <StakeholderIdentificationForm
          ref={stakeholderIdentificationFormRef}
          initialValues={stakeholderFormData}
          onChange={(data) => setStakeholderFormData(data)}
          isViewPage={isViewPage}
        />
      </div>
    );
  };

  const handlePreviewClick = async () => {
    if (!selectedYear) {
      toast.error('Please select a financial year before submitting the form.');
      return false;
    }

    const submitPromises: Promise<void>[] = [];

    // Submit both forms
    if (stakeholderIdentificationFormRef.current) {
      submitPromises.push(
        stakeholderIdentificationFormRef.current.submitForm(),
      );
    }

    await Promise.all(submitPromises);

    const allFormValues = {
      financial_year: selectedYear,
      stakeholder:
        stakeholderIdentificationFormRef.current?.getValues?.() || {},
    };

    const isFormValid = validateStakeholderForm(allFormValues.stakeholder);

    // === Validation Start ===
    if (!isFormValid) {
      toast.error('Please fill out all fields before submitting.');
      return false;
    }
    // === Validation End ===

    const stakeholderOutput = buildStakeholderOutput(allFormValues.stakeholder);

    const finalOutput: any = {
      name: 'Stakeholder Identification',
      datacube_id: selectedYear,
      submitted_by: user?.id,
      indicators: [
        {
          name: 'Stakeholder Identification',
          questions: stakeholderOutput,
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
      toast.success('Stakeholder Identification data submitted successfully');
      router.push('/disclosure/stakeholder_identification');
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
      {
        title: 'Stakeholder Identification',
        url: '/disclosure/stakeholder_identification',
      },
      { title: activeIndicator?.name, url: '#' },
    ],
    [activeIndicator?.name],
  );

  const breadCrumbMenu = [{ title: '', breadCrumb: breadCrumbsItem }];

  return (
    <PageHeaderWrapper
      breadCrumbMenu={breadCrumbMenu}
      extraClassName="my-4 px-4 pt-3"
      title="Stakeholder Identification"
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

export default StakeholderIdentification;
