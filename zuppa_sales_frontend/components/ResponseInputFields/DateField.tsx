/* eslint-disable @typescript-eslint/no-explicit-any */
import moment from 'moment';
import { MdCalendarMonth } from 'react-icons/md';
import DatePicker from 'react-multi-date-picker';
import {
  formatDateValue,
  getDateFormat,
} from '../FormikDateField/FormikDateField';
import { FormikDateFieldProps } from '../types';

export const handleDateChange = (
  date: any,
  onChange: any,
  onlyMonthPicker: boolean,
  onlyYearPicker: boolean,
) => {
  if (date === null) {
    onChange(date);
  } else {
    let formattedDate;
    if (onlyMonthPicker) {
      formattedDate = moment.unix(date?.unix).format('MMMM');
    } else if (onlyYearPicker) {
      formattedDate = moment.unix(date?.unix).format('yyyy');
    } else {
      formattedDate = moment.unix(date?.unix).format('YYYY-MM-DD');
    }
    onChange(formattedDate);
  }
};

export default function DateField({
  name,
  minDate,
  maxDate,
  isDisabled,
  onlyYearPicker = false,
  onlyMonthPicker = false,
  placeholder,
  isQuarter = false,
  quarter,
  value,
  onChange,
}: Readonly<FormikDateFieldProps>) {
  return (
    <div className="position-relative">
      <DatePicker
        editable={false}
        name={name}
        value={formatDateValue(value, onlyMonthPicker, onlyYearPicker)}
        disabled={isDisabled}
        format={getDateFormat(onlyYearPicker, onlyMonthPicker)}
        onChange={(date) => handleDateChange(date, onChange, onlyMonthPicker, onlyYearPicker)}
        minDate={minDate}
        maxDate={maxDate}
        onlyMonthPicker={onlyMonthPicker}
        onlyYearPicker={onlyYearPicker}
        placeholder={placeholder}
      />
      {!isDisabled && (
        <span className="calender_icon">
          <MdCalendarMonth
            size={20}
            color="var(--icon-color)"
            className="ms-3"
          />
        </span>
      )}
      {isQuarter && <span className="quarter_container">{quarter}</span>}
    </div>
  );
}
