'use client';

import {
  Field, FieldProps, Form, Formik,
} from 'formik';
import React from 'react';
import { convertToPascalCase } from '@/lib/utils';
import { object, string } from 'yup';
import { usePathname } from 'next/navigation';
import { CustomInputField } from '../InputField/CustomInputField';
import CustomSelect from '../CustomSelect/CustomSelect';
import { Button } from '../Button/Button';
import { Option } from '../types';

interface FormValues {
  emission_database: string;
  year: string;
}

export default function EmissionDatabaseForm() {
  const pathname = usePathname();
  const initialValues: FormValues = {
    emission_database: 'DEFRA',
    year: '2024',
  };

  const validationSchema = object({
    emission_database: string().required(
      'Emission Factor Database is required',
    ),
    year: string().required('Year is required'),
  });

  const handleFormSubmit = async () => {};
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleFormSubmit}
      enableReinitialize
      validateOnChange={false}
    >
      {({
        errors,
        isSubmitting,
        handleSubmit: submitForm,
        setFieldValue,
        values,
      }) => (
        <Form onSubmit={submitForm} className="w-100">
          <div>
            <Field name="emission_database" className="">
              {({ field: formikField }: FieldProps<string>) => (
                <CustomInputField
                  validationSchema={validationSchema}
                  label="Emission Database"
                  field={formikField}
                  error={errors?.emission_database as string}
                  isCustomRequired
                  isSideBySide={
                    !!pathname.startsWith('/settings/emissions_database')
                  }
                >
                  <Field
                    name="emission_database"
                    placeholder="Select Emission database"
                    component={CustomSelect}
                    id={formikField.name}
                    onChange={(e: Option) => {
                      setFieldValue('emission_database', e?.value);
                    }}
                    value={values?.emission_database}
                    options={['DEFRA', 'USEPA', 'Custom']?.map((item) => ({
                      label: item,
                      value: item,
                      isDisabled: item !== 'DEFRA',
                    }))}
                    isCustomOption
                  />
                </CustomInputField>
              )}
            </Field>
          </div>
          <div className="mt-2">
            <Field name="year" className="">
              {({ field: formikField }: FieldProps<string>) => (
                <CustomInputField
                  validationSchema={validationSchema}
                  label="Year"
                  field={formikField}
                  error={errors?.year as string}
                  isCustomRequired
                  isSideBySide={
                    !!pathname.startsWith('/settings/emissions_database')
                  }
                >
                  <Field
                    name="year"
                    component={CustomSelect}
                    placeholder="Select Year"
                    id={formikField.name}
                    onChange={(e: Option) => {
                      setFieldValue('year', e?.value);
                    }}
                    value={values?.year}
                    options={['2024', '2023', '2022']?.map((item) => ({
                      label: convertToPascalCase(
                        item?.replaceAll('_', ' ')?.replace('DATE', ''),
                      ),
                      value: item,
                      isDisabled: item !== '2024',
                    }))}
                    isCustomOption
                  />
                </CustomInputField>
              )}
            </Field>
          </div>
          <div className="d-flex justify-content-end mt-3">
            <Button
              text={isSubmitting ? 'Saving ...' : 'Submit'}
              type="submit"
              isLoading={isSubmitting}
              isDisabled
              isSolid
              className="w-100"
            />
          </div>
        </Form>
      )}
    </Formik>
  );
}
