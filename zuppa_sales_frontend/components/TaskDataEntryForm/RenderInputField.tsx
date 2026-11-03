/* eslint no-shadow: off */
/* eslint-disable react-hooks/exhaustive-deps */
import { IMixedQuestions } from '@/lib/interface/IStandard.interface';
import { IDataCubeQuestionOptions } from '@/lib/interface/ITask.interface';
import { TaskService } from '@/lib/service';
import { useParams } from 'next/navigation';
import React, { useCallback, useMemo, useState } from 'react';
import toast from 'react-hot-toast';
import { IoMdAddCircleOutline, IoMdRemoveCircleOutline } from 'react-icons/io';
import DateField from '../ResponseInputFields/DateField';
import InputSelectField from '../ResponseInputFields/InputSelectField';
import { NumberField } from '../ResponseInputFields/NumberField';
import { TextField } from '../ResponseInputFields/TextField';
import { IQuestionType } from '../types';

interface RenderInputFieldProps {
  type: IQuestionType;
  placeholder: string;
  value: string | string[];
  isDisabled: boolean;
  options: IDataCubeQuestionOptions[];
  mixedQuestions: IMixedQuestions[];
  handleValueChange: (data: string | string[]) => void;
  error?: string;
}

const RenderInputField: React.FC<RenderInputFieldProps> = ({
  type,
  placeholder,
  value,
  isDisabled,
  options,
  mixedQuestions,
  handleValueChange,
  error,
}) => {
  const { subdomain } = useParams();
  const slug = subdomain as string;
  const [localMixedValue, setLocalMixedValue] = useState<
    Record<
      string,
      {
        amount: string;
        unit: string;
      }
    >
  >({});
  const [numberError, setNumberError] = useState<string>('');
  const [localValidationError, setLocalValidationError] = useState<string>('');

  const uploadFile = useCallback(
    async (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e?.target?.files?.[0];
      if (!file) return '';

      const formData = new FormData();
      formData.append('file', file);
      try {
        const {
          data: { success, url, error },
        } = await TaskService.uploadFile(slug, formData);
        if (success) return url;
        toast.error(error.join(', '));
      } catch (err) {
        toast.error('File upload failed');
      }
      return '';
    },
    [slug],
  );

  // const handleMixedInput = useCallback(
  //   (id: string, key: 'amount' | 'unit', val: string) => {
  //     setLocalMixedValue((prevState) => {
  //       const prev = prevState[id] || { amount: '', unit: '' };
  //       const updated = { ...prev, [key]: val };
  //       if (updated.amount && updated.unit) {
  //         handleValueChange(`${updated.amount},${updated.unit}`);
  //       }
  //       return { ...prevState, [id]: updated };
  //     });
  //   },
  //   [handleValueChange],
  // );

  // const handleMixedInput = useCallback(
  //   (id: string, key: 'amount' | 'unit', val: string) => {
  //     setLocalMixedValue((prevState) => {
  //       // Use stored value OR fallback to parsed "value" from props
  //       const valueParts = (value as string)?.split(',') || [];
  //       const fallbackAmount = valueParts[0] ?? '';
  //       const fallbackUnit = valueParts[1] ?? '';

  //       const prev = prevState[id] || {
  //         amount: fallbackAmount || '',
  //         unit: fallbackUnit || '',
  //       };

  //       // Only update the changed key
  //       const updated = { ...prev, [key]: val };

  //       // Call parent when both exist
  //       if (updated.amount && updated.unit) {
  //         handleValueChange(`${updated.amount},${updated.unit}`);
  //       }

  //       return { ...prevState, [id]: updated };
  //     });
  //   },
  //   [handleValueChange, value]
  // );

  // const handleMixedInput = useCallback(
  //   (id: string, key: 'amount' | 'unit', val: string) => {
  //     setLocalMixedValue((prevState) => {
  //       // Parse fallback from props
  //       const valueParts = (value as string)?.split(',') || [];
  //       const fallbackAmount = valueParts[0] ?? '';
  //       const fallbackUnit = valueParts[1] ?? '';

  //       const prev = prevState[id] || {
  //         amount: fallbackAmount,
  //         unit: fallbackUnit,
  //       };

  //       let updated = { ...prev, [key]: val };

  //       // 🚨 If amount is cleared, also clear the unit
  //       if (key === 'amount' && val.trim() === '') {
  //         updated = { amount: '', unit: '' };
  //       }

  //       // Only call parent if both fields exist
  //       if (updated.amount && updated.unit) {
  //         handleValueChange(`${updated.amount},${updated.unit}`);
  //       } else {
  //         // If either is missing, clear parent value
  //         handleValueChange('');
  //       }

  //       return { ...prevState, [id]: updated };
  //     });
  //   },
  //   [handleValueChange, value]
  // );

  const handleMixedInput = useCallback(
    (id: string, key: 'amount' | 'unit', val: string) => {
      setLocalMixedValue((prevState) => {
        const valueParts = (value as string)?.split(',') || [];
        const fallbackAmount = valueParts[0] ?? '';
        const fallbackUnit = valueParts[1] ?? '';

        const prev = prevState[id] || {
          amount: fallbackAmount,
          unit: fallbackUnit,
        };

        let updated = { ...prev, [key]: val };

        // 🚨 if number is cleared, also clear unit
        if (key === 'amount' && val === '') {
          updated = { amount: '', unit: '' };
          handleValueChange('');
        } else if (updated.amount && updated.unit) {
          handleValueChange(`${updated.amount},${updated.unit}`);
        }

        return { ...prevState, [id]: updated };
      });
    },
    [handleValueChange, value],
  );

  // useEffect(() => {
  //   if (typeof value === 'string' && value.includes(',')) {
  //     const [amount, unit] = value.split(',');
  //     setLocalMixedValue((prev) => {
  //       const updated: Record<string, { amount: string; unit: string }> = {};
  //       mixedQuestions.forEach((mq) => {
  //         updated[mq.id] = {
  //           amount: amount ?? '',
  //           unit: unit ?? '',
  //         };
  //       });
  //       return { ...prev, ...updated };
  //     });
  //   }
  // }, [value, mixedQuestions, localMixedValue]);

  const renderTextInput = useCallback(() => {
    const displayError = error || localValidationError;
    return (
      <TextField
        type={type.toLowerCase()}
        placeholder={placeholder}
        isValid={!displayError}
        error={displayError}
        isCustomRequired
        value={value as string}
        onChange={async (e) => {
          const raw = type === 'FILE' ? await uploadFile(e) : e.target.value;
          const val = (raw || '') as string;

          // Only apply regex validation for text-like fields but do not block typing
          if (type === 'TEXT') {
            const trimmed = val.trim();
            const hasTwoLetters = /[A-Za-z].*[A-Za-z]/.test(trimmed);
            const onlySpecial = /^[^A-Za-z0-9]+$/.test(trimmed);
            const onlyNumbers = /^[0-9]+$/.test(trimmed);

            if (
              trimmed.length > 0
              && (!hasTwoLetters || onlySpecial || onlyNumbers)
            ) {
              setLocalValidationError(
                'Only special characters / numbers not allowed. Min 2 Alphabet letters required',
              );
            } else if (localValidationError) {
              setLocalValidationError('');
            }
          } else if (localValidationError) {
            setLocalValidationError('');
          }

          handleValueChange(val);
        }}
        disabled={isDisabled}
      />
    );
  }, [
    type,
    placeholder,
    value,
    isDisabled,
    handleValueChange,
    uploadFile,
    error,
    localValidationError,
  ]);

  const renderNumberInput = useCallback(() => {
    const numericValue = parseInt((value as string) || '0', 10) || 0;
    return (
      <>
        <NumberField
          key={placeholder}
          placeholder={placeholder}
          isValid={false}
          // isValid={!error && !numberError}
          // error={error || numberError}
          isCustomRequired
          rightIcon
          value={value as string}
          onChange={(e) => handleValueChange(e.target.value)}
          // onChange={(e) => {
          //   const v = (e.target.value || '').toString();
          //   const num = Number(v);
          //   if (v !== '' && !Number.isNaN(num) && num < 0) {
          //     setNumberError('Value cannot be negative');
          //     handleValueChange('');
          //   } else {
          //     if (numberError) setNumberError('');
          //     handleValueChange(v);
          //   }
          // }}
          icon={(
            <span className="d-inline-flex">
              <IoMdRemoveCircleOutline
                onClick={() => numericValue > 0
                  && handleValueChange((numericValue - 1).toString())}
                // Negative input prevention handled in onChange
                // onClick={() => {
                //   if (numericValue > 0 && !isDisabled) {
                //     setNumberError('');
                //     handleValueChange((numericValue - 1).toString());
                //   }
                // }}
                size={22}
                color={numericValue === 0 || isDisabled ? '#A6A6A6' : 'black'}
                className="me-2"
              />
              <IoMdAddCircleOutline
                color={isDisabled ? '#A6A6A6' : 'black'}
                size={22}
                onClick={() => handleValueChange((numericValue + 1).toString())}
                // onClick={() => {
                //   if (!isDisabled) {
                //     setNumberError('');
                //     handleValueChange((numericValue + 1).toString());
                //   }
                // }}
              />
            </span>
          )}
          disabled={isDisabled}
        />
        {error ? <div className="invalid-feedback d-block">{error}</div> : null}
      </>
    );
  }, [placeholder, value, isDisabled, handleValueChange]);
  // }, [placeholder, value, isDisabled, handleValueChange, numberError]);

  const renderSelectInput = useCallback(
    (isMulti: boolean) => (
      <>
        <InputSelectField
          onChange={(e) => {
            const selected = Array.isArray(e)
              ? e.map((item) => item.value)
              : e?.value;
            handleValueChange(selected);
          }}
          options={options.map((opt) => ({
            label: opt.text || opt.value,
            value: opt.id || '',
          }))}
          isMulti={isMulti}
          placeholder={placeholder}
          value={value}
          isDisabled={isDisabled}
        />
        {error ? <div className="invalid-feedback d-block">{error}</div> : null}
      </>
    ),
    [options, placeholder, value, isDisabled, handleValueChange],
  );

  const renderMixedInput = useMemo(
    () => mixedQuestions?.map((mixedQuestion) => {
      const { id } = mixedQuestion;
      const valueParts = (value as string)?.split(',') || [];
      const amount = localMixedValue[id]?.amount ?? valueParts[0] ?? '';
      const unit = localMixedValue[id]?.unit ?? valueParts[1] ?? '';
      const numeric = parseInt(amount || '0', 10);

      return (
        <div className="row" key={id}>
          <div className="col-lg-6 mb-3">
            <NumberField
              key={mixedQuestion?.value_name}
                // placeholder={mixedQuestion?.value_name}
              placeholder="Number"
              isValid={!error && !numberError}
              error={error || numberError}
              isCustomRequired
              rightIcon
              value={amount}
                // onChange={(e) => handleMixedInput(id, 'amount', e.target.value)}
              onChange={(e) => {
                const v = (e.target.value || '').toString();
                const num = Number(v);
                if (v !== '' && !Number.isNaN(num) && num < 0) {
                  setNumberError('Value cannot be negative');
                  // handleValueChange('');
                  handleMixedInput(id, 'amount', '');
                } else {
                  if (numberError) setNumberError('');
                  // handleValueChange(v);
                  handleMixedInput(id, 'amount', v);
                }
              }}
              icon={(
                <span className="d-inline-flex">
                  <IoMdRemoveCircleOutline
                    onClick={() => {
                      if (numeric && !isDisabled) {
                        setNumberError('');
                        handleMixedInput(
                          id,
                          'amount',
                          (numeric - 1).toString(),
                        );
                      }
                    }}
                    size={22}
                    color={numeric === 0 || isDisabled ? '#A6A6A6' : 'black'}
                    className="me-2"
                  />
                  <IoMdAddCircleOutline
                    size={22}
                    color={isDisabled ? '#A6A6A6' : 'black'}
                    onClick={() => {
                      if (!isDisabled) {
                        setNumberError('');
                        handleMixedInput(
                          id,
                          'amount',
                          (numeric + 1).toString(),
                        );
                      }
                    }}
                  />
                </span>
                )}
              disabled={isDisabled}
            />
          </div>
          <div className="col-lg-6 mb-3">
            {/* <InputSelectField
                onChange={(option) => {
                  const selectedValue = Array.isArray(option)
                    ? option[0]?.value
                    : option?.value;
                  if (selectedValue) {
                    handleMixedInput(id, 'unit', selectedValue);
                  }
                }}
                options={mixedQuestion?.unit_enum?.map((item) => ({
                  label: item,
                  value: item,
                }))}
                isMulti={false}
                // placeholder={mixedQuestion?.unit_name}
                placeholder={'Unit'}
                value={unit}
                isDisabled={isDisabled}
              /> */}
            <InputSelectField
              onChange={(option) => {
                const selectedValue = Array.isArray(option)
                  ? option[0]?.value
                  : option?.value;
                if (selectedValue) {
                  handleMixedInput(id, 'unit', selectedValue);
                } else {
                  // 🚨 if cleared, reset unit
                  handleMixedInput(id, 'unit', '');
                }
              }}
              options={mixedQuestion?.unit_enum?.map((item) => ({
                label: item,
                value: item,
              }))}
              isMulti={false}
              placeholder="Unit"
                // 🚨 Now always read from local state
                // value={String(amount).length > 0 ? unit : null}
              value={unit}
              isDisabled={isDisabled}
            />
          </div>
        </div>
      );
    }),
    [mixedQuestions, localMixedValue, value, handleMixedInput, isDisabled],
  );

  const renderDateInput = useCallback(
    () => (
      <DateField
        placeholder={placeholder}
        isCustomRequired
        value={value as string}
        onChange={handleValueChange}
        name={placeholder}
        isDisabled={isDisabled}
      />
    ),
    [placeholder, value, handleValueChange, isDisabled],
  );

  switch (type) {
    case 'TEXT':
    case 'URL':
    case 'FILE':
      return renderTextInput();
    case 'DATE':
      return renderDateInput();
    case 'NUMBER':
      return renderNumberInput();
    case 'MULTI_SELECT':
    case 'SINGLE_SELECT':
      return renderSelectInput(type === 'MULTI_SELECT');
    case 'MIXED_TYPE':
      // eslint-disable-next-line react/jsx-no-useless-fragment
      return <>{renderMixedInput}</>;
    default:
      return null;
  }
};

export default React.memo(RenderInputField);
