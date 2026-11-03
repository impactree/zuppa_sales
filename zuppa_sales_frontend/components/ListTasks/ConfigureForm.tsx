/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint no-shadow: off */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable max-len */
/* eslint-disable no-plusplus */
/* eslint-disable no-unused-vars */
/* eslint @typescript-eslint/no-unused-vars: off */
/* eslint-disable react-hooks/exhaustive-deps */

'use client';

import { IDataCube } from '@/lib/interface/IDataCube.interface';
import { ITask } from '@/lib/interface/ITask.interface';
import { DataCube, TaskService } from '@/lib/service';
import { convertToPascalCase } from '@/lib/utils';
import { Form, Formik, FormikHelpers } from 'formik';
import moment from 'moment';
import { useParams, useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { number, object, string } from 'yup';
import { TiWarning } from 'react-icons/ti';
import { useCallback, useEffect, useState } from 'react';
import pLimit from 'p-limit';
import { Button } from '../Button/Button';
import { FormikDateField } from '../FormikDateField/FormikDateField';
import { FormikField } from '../FormikField/FormikField';
import { useModal } from '../Modal/Context';

interface FormValues {
  time_frame: string;
  configure_time: string;
  task_deadline: string;
}

function ConfigureForm({
  task,
  onClose,
  dataCube,
}: {
  task: ITask[] | undefined;
  dataCube: IDataCube | undefined | any;
  onClose?: () => void;
}) {
  const hideModal = useModal({});
  const router = useRouter();
  const urlParamas = useParams();
  const slug = urlParamas?.subdomain as string;
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [formValues, setFormValues] = useState<FormValues | null>(null);
  const [formikHelpers, setFormikHelpers] = useState<FormikHelpers<FormValues> | null>(null);
  const [tasks, setTasks] = useState<ITask[]>([]);
  const filterParams = {
    page: urlParamas?.page,
    // limit: searchParams?.limit,
    limit: '500',
    sort: urlParamas?.sort,
    search: urlParamas?.search,
    status: urlParamas?.status,
    project: dataCube?.id || '',
  };
  const getTasks = useCallback(async () => {
    const res = await DataCube.getTasks(
      dataCube.id,
      urlParamas?.subdomain as string,
      filterParams,
    );
    const { datacube } = res?.data as {
      datacube: IDataCube[];
    };
    setTasks(datacube?.flatMap((item: any) => item?.task) || []);
  }, [dataCube.id, urlParamas.subdomain]);

  useEffect(() => {
    getTasks();
  }, [getTasks]);
  const initialValues: FormValues = {
    time_frame: `${convertToPascalCase(
      (task?.[0]?.datacube_frequency?.frequency_name !== 'YEARLY'
        ? task?.[0]?.datacube_frequency?.frequency_name
        : task?.[0]?.datacube_frequency?.frequency_name) || '',
    )} (${dataCube?.datacube_frequency
      ?.map((f: any) => f?.frequency_name?.split('_')[0])
      ?.join(', ')})`,
    configure_time: '',
    task_deadline: '',
  };

  const validationSchema = object({
    time_frame: string().required('Time Frame is required'),
    configure_time: string().required('Configure Time is required'),
    task_deadline: number()
      .min(5, 'Min of 5 for Task Deadline')
      .max(99, 'Max of 99 for Task Deadline')
      .required('Task Deadline is required'),
  });

  const handleFormSubmit = async (
    values: FormValues,
    helpers: FormikHelpers<FormValues>,
  ) => {
    // Show confirmation modal instead of submitting directly
    setFormValues(values);
    setFormikHelpers(helpers);
    setShowConfirmation(true);
  };

  // const handleConfirmSubmit = async () => {
  //   if (!formValues || !formikHelpers) return;

  //   formikHelpers.setSubmitting(true);
  //   const res = await DataCube?.ConfigureDataCube(
  //     slug,
  //     dataCube?.datacube_frequency[0]?.id || '',
  //     {
  //       start_date: new Date(moment(formValues?.configure_time).toDate()),
  //       end_date: new Date(
  //         moment(formValues?.configure_time)
  //           .add(formValues?.task_deadline, 'days')
  //           .toDate()
  //       ),
  //     }
  //   );
  //   const { success, error } = res?.data as {
  //     success: boolean;
  //     error: string[];
  //   };
  //   if (success) {
  //     toast.success('Data Cube is published');
  //     hideModal();
  //     router.push(`/data_cubes/${urlParamas?.id}/tasks`);
  //   } else {
  //     toast.error(error.join(' ,'));
  //   }
  //   formikHelpers.setSubmitting(false);
  //   setShowConfirmation(false);
  // };

  // ✅ Adapted for your Task data JSON
  const handleConfirmSubmit = async () => {
    if (!formValues || !formikHelpers) return;

    try {
      formikHelpers.setSubmitting(true);

      // Step 1: Configure the datacube
      const res = await DataCube?.ConfigureDataCube(
        slug,
        dataCube?.datacube_frequency[0]?.id || '',
        {
          start_date: new Date(moment(formValues?.configure_time).toDate()),
          end_date: new Date(
            moment(formValues?.configure_time)
              .add(formValues?.task_deadline, 'days')
              .toDate(),
          ),
        },
      );

      const { success, error } = res?.data as {
      success: boolean;
      error: string[];
    };

      if (!success) {
        toast.error(error.join(', '));
        formikHelpers.setSubmitting(false);
        return;
      }

      toast.success('Data Cube Published Successfully!');

      // Step 2: Get all tasks
      const tasksToGenerate = (tasks && Array.isArray(tasks) ? tasks : task) || [];

      if (tasksToGenerate.length === 0) {
        toast('No tasks found to generate templates.');
        hideModal();
        router.push(`/data_cubes/${urlParamas?.id}/tasks`);
        return;
      }

      // Step 3: Extract UNIQUE site-module combinations
      const uniquePairs = Array.from(
        new Map(
          tasksToGenerate.map((t: any) => {
            const moduleId = t.module_id ?? t.moduleId ?? t.module?.id;
            const siteId = t.site?.id ?? t.siteId;
            const siteName = t.site?.name ?? t.siteName ?? 'Unknown Site';
            const moduleName = t.module_name ?? t.moduleName ?? 'Unknown Module';

            const key = `${siteId}_${moduleId}`;

            return [
              key,
              {
                siteId, moduleId, siteName, moduleName,
              },
            ];
          }),
        ).values(),
      );

      const totalTasks = uniquePairs.length;

      if (totalTasks === 0) {
        toast('No valid site-module combinations found.');
        hideModal();
        router.push(`/data_cubes/${urlParamas?.id}/tasks`);
        return;
      }

      /*
    ===============================================================
      EXCEL GENERATION CODE – COMMENTED OUT AS REQUESTED
    ===============================================================
    */

      /*
    toast.loading(`Generating Excel Templates... 0 of ${totalTasks} Completed`, {
      id: 'template-progress',
    });

    let completed = 0;

    const limit = pLimit(3);

    const updateProgress = () => {
      completed++;
      toast.loading(
        `Generating Excel Templates... ${completed} of ${totalTasks} Completed`,
        { id: 'template-progress' },
      );
    };

    const templatePromises = uniquePairs.map(
      ({ siteId, moduleId, siteName, moduleName }) =>
        limit(async () => {
          if (!moduleId || !siteId) {
            updateProgress();
            return;
          }

          const payload = { datacubeIds: dataCube?.id };

          try {
            await TaskService.generateTemplate(payload, moduleId, siteId, slug);
            updateProgress();
          } catch (err) {
            console.error(
              `❌ Error generating template for ${siteName} - ${moduleName}:`,
              err
            );
            updateProgress();
          }
        })
    );

    await Promise.all(templatePromises);

    toast.dismiss('template-progress');
    toast.success('All Excel Templates generated successfully!');
    */

      /*
    ===============================================================
      END OF COMMENTED EXCEL GENERATION CODE
    ===============================================================
    */

      hideModal();
      router.push(`/data_cubes/${urlParamas?.id}/tasks`);
    } catch (err) {
      console.error('Error during template generation:', err);
      toast.error('Something went wrong while processing.');
    } finally {
      toast.dismiss('template-progress');
      formikHelpers.setSubmitting(false);
      setShowConfirmation(false);
    }
  };

  return (
    <>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleFormSubmit}
        enableReinitialize
        validateOnChange={false}
      >
        {({
          errors, isSubmitting, handleSubmit: submitForm, resetForm,
        }) => (
          <Form onSubmit={submitForm} className="w-100">
            <div>
              <FormikField
                name="time_frame"
                errors={errors}
                validationSchema={validationSchema}
                label="Time Frame"
                type="text"
                disabled
              />
            </div>
            <div className="mt-2">
              <FormikDateField
                name="configure_time"
                label="Configure Time"
                placeholder="Select Configure Date"
                errors={errors?.configure_time as string}
                isCustomRequired
              />
            </div>
            <div className="mt-2">
              <FormikField
                name="task_deadline"
                errors={errors}
                validationSchema={validationSchema}
                label="Task Deadline"
                type="number"
                placeholder="Days"
              />
            </div>
            <div className="d-flex justify-content-end mt-3">
              <div className="me-3">
                <Button
                  text="Cancel"
                  onClick={() => {
                    if (onClose) {
                      onClose();
                    }
                    resetForm();
                  }}
                  className="w-100"
                />
              </div>
              <Button
                text={isSubmitting ? 'Publishing ...' : 'Publish'}
                type="submit"
                isLoading={isSubmitting}
                isSolid
                className="w-100"
              />
            </div>
          </Form>
        )}
      </Formik>

      {showConfirmation && (
        <div className="modal-overlay">
          <div className="modal-content p-4">
            <div className="text-center">
              <div className="d-flex align-items-center justify-content-center">
                <TiWarning color="var(--danger)" size={40} className="me-2" />
                <h5 className="fw-bold text-dark mb-0">
                  Are you sure you want to Configure & Publish these tasks?
                </h5>
              </div>
              <div className="d-flex justify-content-center gap-3 mt-4">
                <Button
                  text="Cancel"
                  onClick={() => {
                    setShowConfirmation(false);
                    if (formikHelpers) {
                      formikHelpers.setSubmitting(false);
                    }
                  }}
                />
                <Button text="Confirm" onClick={handleConfirmSubmit} isSolid />
              </div>
            </div>
          </div>
        </div>
      )}

      <style jsx>
        {`
          .modal-overlay {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background-color: rgba(0, 0, 0, 0.5);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 1000;
          }
          .modal-content {
            background: white;
            border-radius: 8px;
            max-width: 500px;
            width: 90%;
          }
        `}
      </style>
    </>
  );
}

export default ConfigureForm;
