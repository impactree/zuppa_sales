import { Button } from '@/components/Button/Button';
import CustomSelect from '@/components/CustomSelect/CustomSelect';
import { CustomInputField } from '@/components/InputField/CustomInputField';
import { Option, Roles } from '@/components/types';
import { IUserFilter } from '@/lib/interface/IUser.interface';
import {
  applyFilter, convertToPascalCase, Params, resetFilter,
  userRole,
} from '@/lib/utils';
import {
  Field, FieldProps, Form, Formik,
} from 'formik';
import { usePathname, useRouter } from 'next/navigation';
import { object, string } from 'yup';
import FilterHeader from '../FilterHeader';

export default function UserFilter({
  params,
}: Readonly<{
  params: IUserFilter;
}>) {
  const router = useRouter();
  const pathname = usePathname();

  const validationSchema = object().shape({
    role: string(),
    status: string(),
  });

  const initialValues = {
    role: params?.role ?? '',
    status: params?.status ?? '',
  };

  const onSubmit = (value: IUserFilter) => {
    applyFilter(
      value as unknown as Params,
      router,
      params as unknown as Params,
      pathname,
    );
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {({
        values, errors, handleSubmit, setFieldValue, resetForm,
      }) => (
        <>
          <FilterHeader
            resetButton={() => resetFilter(router, resetForm, pathname)}
          />
          <Form onSubmit={handleSubmit}>
            <Field name="role">
              {({ field: formikField }: FieldProps<string>) => (
                <CustomInputField
                  validationSchema={validationSchema}
                  label="Role"
                  field={formikField}
                  error={errors?.role as string}
                  isCustomRequired
                >
                  <Field
                    name="role"
                    component={CustomSelect}
                    id={formikField.name}
                    onChange={(e: Option) => {
                      setFieldValue('role', e?.value);
                    }}
                    value={values?.role}
                    options={Roles?.map((item) => ({
                      label: convertToPascalCase(userRole(item)?.replaceAll('_', ' ')),
                      value: item,
                    }))}
                  />
                </CustomInputField>
              )}
            </Field>
            <Field name="status">
              {({ field: formikField }: FieldProps<string>) => (
                <CustomInputField
                  validationSchema={validationSchema}
                  label="Status"
                  field={formikField}
                  error={errors?.status as string}
                  isCustomRequired
                >
                  <Field
                    name="status"
                    component={CustomSelect}
                    id={formikField.name}
                    onChange={(e: Option) => {
                      setFieldValue('status', e?.value);
                    }}
                    value={values?.status}
                    options={[
                      { value: '', label: 'All' },
                      { value: 'ACTIVE', label: 'Active' },
                      { value: 'PENDING', label: 'Pending' },
                      // { value: 'INACTIVE', label: 'InActive' },
                      { value: 'BLOCKED', label: 'Blocked' },
                    ]}
                  />
                </CustomInputField>
              )}
            </Field>
            <div className=" d-flex gap-3 align-items-center justify-content-end mt-4 mb-3 pt-3">
              <Button
                text="Cancel"
                onClick={() => resetFilter(router, resetForm, pathname)}
              />
              <Button text="Apply" type="submit" isSolid />
            </div>
          </Form>
        </>
      )}
    </Formik>
  );
}
