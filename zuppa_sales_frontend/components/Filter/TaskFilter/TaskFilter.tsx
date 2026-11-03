import { Button } from '@/components/Button/Button';
import { applyFilter, Params, resetFilter } from '@/lib/utils';
import {
  Field,
  FieldProps,
  Form, Formik,
} from 'formik';
import { useParams, usePathname, useRouter } from 'next/navigation';
import { object, string } from 'yup';
import { CustomInputField } from '@/components/InputField/CustomInputField';
import ProjectSelect from '@/components/ProjectSelect/ProjectSelect';
import { Option } from '@/components/types';
import FilterHeader from '../FilterHeader';

export default function TaskFilter({
  params,
}: Readonly<{
  params: Params
}>) {
  const router = useRouter();
  const pathname = usePathname();
  const urlParams = useParams();

  const validationSchema = object().shape({
    is_data_provider: string(),
    project: string(),
  });

  const initialValues = {
    is_data_provider: params?.is_data_provider ?? '',
    project: params?.project ?? '',
  };

  const onSubmit = (value: Params) => {
    applyFilter(value, router, params, pathname);
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {({
        values,
        errors,
        handleSubmit,
        setFieldValue,
        resetForm,
      }) => (
        <>
          <FilterHeader
            resetButton={() => resetFilter(router, resetForm, pathname)}
          />
          <Form onSubmit={handleSubmit}>
            <Field name="project">
              {({
                field: formikField,
              }: FieldProps<string>) => (
                <CustomInputField
                  validationSchema={validationSchema}
                  label="Projects"
                  field={formikField}
                  error={
                    errors?.project
                  }
                  isCustomRequired
                >
                  <Field
                    name={formikField.name}
                    component={ProjectSelect}
                    id={formikField.name}
                    onChange={(e: Option) => setFieldValue(
                      formikField.name,
                      e?.value,
                    )}
                    isMulti={false}
                    slug={urlParams?.subdomain}
                    value={values.project}
                  />
                </CustomInputField>
              )}
            </Field>
            <div className="d-flex justify-content-end mt-4">
              <Button text="Cancel" onClick={() => resetFilter(router, resetForm, pathname)} />
              <Button text="Apply" type="submit" isSolid className="ms-3" />
            </div>
          </Form>
        </>
      )}
    </Formik>
  );
}
