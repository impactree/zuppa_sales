/* eslint-disable @typescript-eslint/no-explicit-any */

import { Field, FieldProps, FormikValues } from 'formik';
import moment from 'moment';
import { useRef } from 'react';
import { MdCalendarMonth } from 'react-icons/md';
import DatePicker from 'react-multi-date-picker';
import { CustomInputField } from '../InputField/CustomInputField';
import { FormikDateFieldProps } from '../types';
import './FormikDateField.css';

export const formatDateValue = (
  value: any,
  onlyMonthPicker: boolean,
  onlyYearPicker: boolean,
) => {
  if (value) {
    if (onlyMonthPicker) {
      return moment().month(value).toDate();
    }
    if (onlyYearPicker) {
      return moment().year(value).toDate();
    }
    return moment(new Date(value)).format('DD/MM/YYYY');
  }
  return '';
};

export const getDateFormat = (
  onlyYearPicker: boolean,
  onlyMonthPicker: boolean,
) => {
  if (onlyYearPicker) return 'YYYY';
  if (onlyMonthPicker) return 'MMMM';
  return 'DD-MM-YYYY';
};

export const handleDateChange = (
  date: any,
  form: any,
  onlyMonthPicker: boolean,
  onlyYearPicker: boolean,
  name: string,
) => {
  if (date === null) {
    form.setFieldValue(name, date);
  } else {
    let formattedDate;
    if (onlyMonthPicker) {
      formattedDate = moment.unix(date?.unix).format('MMMM');
    } else if (onlyYearPicker) {
      formattedDate = moment.unix(date?.unix).format('yyyy');
    } else {
      formattedDate = moment.unix(date?.unix).format('YYYY-MM-DD');
    }
    form.setFieldValue(name, formattedDate);
  }
};

export function FormikDateField({
  name,
  label,
  errors,
  validationSchema,
  minDate,
  maxDate,
  isDisabled,
  onlyYearPicker = false,
  onlyMonthPicker = false,
  placeholder,
  isQuarter = false,
  quarter,
  isCustomRequired = false,
}: Readonly<FormikDateFieldProps>) {
  const inputId = `formikDateField_${name}`;
  const datePickerRef = useRef<any>(null);

  const handleCalendarIconClick = () => {
    if (datePickerRef.current && !isDisabled) {
      datePickerRef.current.openCalendar();
    }
  };

  return (
    <Field name={name}>
      {({ field, form }: FieldProps<FormikValues>) => (
        <CustomInputField
          validationSchema={validationSchema}
          label={label}
          error={errors}
          field={field}
          isCustomRequired={isCustomRequired}
        >
          <div className="position-relative" data-testid={inputId}>
            <DatePicker
              ref={datePickerRef}
              editable={false}
              name={name}
              value={formatDateValue(
                form.values[name],
                onlyMonthPicker,
                onlyYearPicker,
              )}
              disabled={isDisabled}
              format={getDateFormat(onlyYearPicker, onlyMonthPicker)}
              onChange={(date) => handleDateChange(
                date,
                form,
                onlyMonthPicker,
                onlyYearPicker,
                name,
              )}
              minDate={minDate}
              maxDate={maxDate}
              onlyMonthPicker={onlyMonthPicker}
              onlyYearPicker={onlyYearPicker}
              data-testid={inputId}
              id={inputId}
              placeholder={placeholder}
            />
            <span
              aria-hidden
              className="calender_icon"
              onClick={handleCalendarIconClick}
              style={{ cursor: 'pointer' }}
            >
              <MdCalendarMonth
                size={20}
                color="var(--icon-color)"
                className="ms-3"
              />
            </span>
            {isQuarter && <span className="quarter_container">{quarter}</span>}
          </div>
        </CustomInputField>
      )}
    </Field>
  );
}
