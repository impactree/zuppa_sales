/* eslint-disable func-names */
/* eslint-disable react/no-this-in-sfc */
/* eslint-disable no-unused-vars */
/* eslint @typescript-eslint/no-unused-vars: off */
/* eslint-disable max-len */

'use client';

import { ISite } from '@/lib/interface/IAccount.interface';
import { IDataCube } from '@/lib/interface/IDataCube.interface';
import { IQuestionSequences } from '@/lib/interface/IStandard.interface';
import { ITask } from '@/lib/interface/ITask.interface';
import { TaskService } from '@/lib/service';
import {
  Field, FieldArray, FieldProps, Formik, FormikHelpers,
} from 'formik';
import { useParams } from 'next/navigation';
import { Form } from 'react-bootstrap';
import toast from 'react-hot-toast';
import { IoIosAdd } from 'react-icons/io';
import { RiDeleteBin3Line } from 'react-icons/ri';
import { array, object, string } from 'yup';
import { Button } from '../Button/Button';
import { CustomInputField } from '../InputField/CustomInputField';
import SiteSelect from '../SiteSelect/SiteSelect';
import { ActionType, ITaskStatus, Option } from '../types';
import UserSelect from '../UserSelect/UserSelect';
import './TaskAssignForm.css';

interface TaskAssign {
  site: string;
  data_provider: string;
  data_reviewer: string;
}
export const handleTaskAssignSubmit = async (
  values: {
    taskAssign: TaskAssign[];
  },
  {
    setSubmitting,
    validateForm,
  }: FormikHelpers<{
    taskAssign: TaskAssign[];
  }>,
  slug: string,
  actionType: ActionType,
  onClose: () => void,
  dataCube: IDataCube | undefined,
  question?: IQuestionSequences[],
  resetState?: () => void,
  currentTask?: ITask,
  updateStatus?: (data: ITaskStatus) => void,
) => {
  validateForm(values);
  setSubmitting(true);
  let res;
  if (actionType === 'Create') {
    res = await TaskService.createTask(
      {
        datacube_id: dataCube?.id || '',
        tasks:
          values?.taskAssign?.map((item) => ({
            data_provider: item?.data_provider,
            data_reviewer: item?.data_reviewer,
            sites: [item?.site],
            questions:
              dataCube?.datacube_question_sequences
                ?.filter((__item) => question
                  ?.map((qust) => qust?.id)
                  ?.includes(__item?.public_question_sequence_id))
                ?.map((_item) => _item?.id) || [],
            status: 'CREATED',
          })) ?? [],
      },
      slug,
    );
  } else {
    res = await TaskService.reAssign(slug, currentTask?.id as string, {
      data_provider: values?.taskAssign[0]?.data_provider,
      data_reviewer: values?.taskAssign[0]?.data_reviewer,
    });
  }
  const { success, error } = res?.data as {
    success: boolean;
    error: string[];
  };
  if (success) {
    if (!updateStatus) {
      toast?.success(
        actionType === 'Create'
          ? 'Tasks Created Successfully!'
          : 'Re-Assign Successfully!',
      );
    }
    onClose();
    resetState?.();
    if (actionType === 'Re-Assign') {
      updateStatus?.('REASSIGNED');
      toast.success('Task is Reassigned');
    }
  } else {
    toast.error(error.join(' ,'));
  }
  setSubmitting(false);
};
export const isButtonDisabled = (taskAssign: TaskAssign[]) => taskAssign.some((item) => item.data_provider?.length < 1);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const handleDelete = (index: number, arrayHelpers: any) => {
  arrayHelpers.remove(index);
};
export default function TaskAssignForm({
  question,
  actionType,
  onClose,
  currentTask,
  resetState,
  dataCube,
  updateStatus,
  sites,
}: {
  actionType: ActionType;
  onClose: () => void;
  dataCube?: IDataCube | undefined;
  resetState?: () => void;
  currentTask?: ITask;
  question?: IQuestionSequences[];
  updateStatus?: (data: ITaskStatus) => void;
  sites?: ISite[];
}) {
  const urlParams = useParams();
  const slug = urlParams?.subdomain as string;

  const validationSchema = object({
    taskAssign: array()
      .of(
        object({
          site: string().required('Site is required'),
          data_provider: string().required('Provider is required'),
          data_reviewer: string().required('Reviewer is required'),
        }),
      )
      .min(1, 'At least one invitation is required'),
  });
  const onSubmit = async (
    values: {
      taskAssign: TaskAssign[];
    },
    formikHelpers: FormikHelpers<{
      taskAssign: TaskAssign[];
    }>,
  ) => {
    await handleTaskAssignSubmit(
      values,
      formikHelpers,
      slug,
      actionType,
      onClose,
      dataCube,
      question,
      resetState,
      currentTask,
      updateStatus,
    );
  };

  const btnName = () => {
    if (actionType === 'Create') {
      return {
        loading: 'Assigning',
        btn: 'Assign',
      };
    }
    return {
      loading: 'Re-Assigning',
      btn: 'Re-Assign',
    };
  };

  return (
    <div style={{ height: '58vh', overflowY: 'scroll', paddingRight: '10px' }}>
      {/* {!currentTask && (
        <div className="text-center assign-modal-header-container">
          <h5 className="page-title">Assign</h5>
        </div>
      )} */}
      <Formik
        initialValues={{
          taskAssign: [
            {
              site: currentTask?.site?.id || '',
              data_provider: currentTask?.data_provider?.id || '',
              data_reviewer: currentTask?.data_reviewer?.id || '',
            },
          ],
        }}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
        validateOnChange
        enableReinitialize
      >
        {({
          values, errors, handleSubmit, isSubmitting, setFieldValue,
        }) => (
          <Form onSubmit={handleSubmit}>
            <FieldArray
              name="taskAssign"
              render={(arrayHelpers) => (
                <div>
                  {values.taskAssign.map((assign, index) => {
                    const error = errors?.taskAssign?.[index];
                    return (
                    // eslint-disable-next-line react/jsx-key
                      <div className=" p-3 border rounded-1 bg-light mb-3 position-relative animated-element">
                        <div className="">
                          <Field name={`taskAssign.${index}.site`}>
                            {({ field: formikField }: FieldProps<string>) => (
                              <CustomInputField
                                validationSchema={validationSchema}
                                label="Units"
                                field={formikField}
                                error={
                                  (error as TaskAssign)
                                    ?.site as unknown as string
                                }
                                isCustomRequired
                              >
                                <Field
                                  name={formikField.name}
                                  component={SiteSelect}
                                  id={formikField.name}
                                  onChange={(e: Option) => setFieldValue(formikField.name, e?.value)}
                                  isMulti={false}
                                  slug={urlParams?.subdomain}
                                  value={assign.site}
                                  isDisabled={currentTask?.id}
                                />
                              </CustomInputField>
                            )}
                          </Field>
                        </div>
                        <div className="">
                          <Field name={`taskAssign.${index}.data_provider`}>
                            {({ field: formikField }: FieldProps<string>) => (
                              <CustomInputField
                                validationSchema={validationSchema}
                                label="Data Provider"
                                field={formikField}
                                error={
                                  (error as TaskAssign)
                                    ?.data_provider as unknown as string
                                }
                                isCustomRequired
                              >
                                <Field
                                  name={formikField.name}
                                  component={UserSelect}
                                  id={formikField.name}
                                  onChange={(e: Option) => setFieldValue(formikField.name, e?.value)}
                                  slug={urlParams?.subdomain}
                                  value={assign.data_provider}
                                  currentRole="DATA_PROVIDER"
                                />
                              </CustomInputField>
                            )}
                          </Field>
                        </div>
                        <div className="">
                          <Field name={`taskAssign.${index}.data_reviewer`}>
                            {({ field: formikField }: FieldProps<string>) => (
                              <CustomInputField
                                validationSchema={validationSchema}
                                label="Data Reviewer"
                                field={formikField}
                                error={
                                  (error as TaskAssign)
                                    ?.data_reviewer as unknown as string
                                }
                                isCustomRequired
                              >
                                <Field
                                  name={formikField.name}
                                  component={UserSelect}
                                  id={formikField.name}
                                  onChange={(e: Option) => setFieldValue(formikField.name, e?.value)}
                                  isMulti={false}
                                  slug={urlParams?.subdomain}
                                  value={assign.data_reviewer}
                                  currentRole="DATA_REVIEWER"
                                />
                              </CustomInputField>
                            )}
                          </Field>
                        </div>
                        <div>
                          {(index > 0
                            || (index === 0 && values?.taskAssign?.length > 1))
                            && !currentTask && (
                              <div
                                aria-hidden
                                className="d-flex justify-content-center business-unit-deleteIcon-container business-btn mt-3"
                                style={{
                                  border: '1px solid #E92626',
                                  borderRadius: 20,
                                  padding: 10,
                                  marginBottom: 10,
                                  cursor: 'pointer',
                                  // width: '535px',
                                }}
                                onClick={() => arrayHelpers.remove(index)}
                              >
                                <RiDeleteBin3Line
                                  size={24}
                                  cursor="pointer"
                                  color="#292D32"
                                />
                              </div>
                          )}
                        </div>
                        {!currentTask
                          && values.taskAssign.length < (sites?.length ?? 0) && (
                            <Button
                              onClick={() => {
                                if (
                                  values.taskAssign.length
                                  < (sites?.length ?? 0)
                                ) {
                                  arrayHelpers.push({
                                    site: '',
                                    data_provider: '',
                                    data_reviewer: '',
                                  });
                                }
                              }}
                              text="Add More"
                              className="fs-14 mt-3"
                              btnclassName="business-btn"
                              prefixIconChildren={<IoIosAdd size={22} />}
                            />
                        )}
                      </div>
                    );
                  })}
                  <div className="d-flex justify-content-center w-100">
                    <Button
                      text={
                        isSubmitting
                          ? `${btnName()?.loading}...`
                          : btnName()?.btn
                      }
                      isLoading={isSubmitting}
                      isDisabled={
                        isSubmitting ?? isButtonDisabled(values?.taskAssign)
                      }
                      type="submit"
                      isSolid
                      className="w-100 mt-0 task-invite-btn"
                    />
                  </div>
                </div>
              )}
            />
          </Form>
        )}
      </Formik>
    </div>
  );
}
