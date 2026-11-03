/* eslint-disable max-len */
/* eslint-disable func-names */
/* eslint-disable react/no-this-in-sfc */

'use client';

import { useDeviceDetection } from '@/hooks/useDeviceDetection';
import { IBusinessUnit } from '@/lib/interface/IAccount.interface';
import { BusinessUnitService } from '@/lib/service';
import {
  FieldArray, Form, Formik, FormikHelpers,
} from 'formik';
import { usePathname, useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { FaPlus } from 'react-icons/fa';
import { MdArrowForward } from 'react-icons/md';
import { IoIosAdd } from 'react-icons/io';
import {
  array, object, string, ValidationError,
} from 'yup';
import { Button } from '../Button/Button';
import { FormikField } from '../FormikField/FormikField';
import './BusinessUnitForm.css';

export interface IBusinessUnitField {
  name: string;
  sites: {
    location: string;
    name: string;
  }[];
}

export interface IBusinessUnitFields {
  business_units: IBusinessUnitField[];
}
export default function BusinessUnitForm({
  slug,
  currentBusinessUnit,
  onClose,
}: {
  slug: string;
  currentBusinessUnit?: IBusinessUnit | undefined;
  onClose?: () => void;
}) {
  const pathname = usePathname();
  const { isMobileOnly } = useDeviceDetection();

  const isSettingScreen = pathname?.includes('/settings/business_unit');
  const router = useRouter();
  const initialValues = {
    business_units: [
      {
        name: currentBusinessUnit?.name || '',
        sites: currentBusinessUnit?.sites ?? [
          {
            location: '',
            name: '',
          },
        ],
      },
    ],
  };

  const validationSchema = object().shape({
    business_units: array()
      .of(
        object().shape({
          name: string()
            .required('Business unit name is required')
            .test(
              'no-trailing-space',
              'Business unit name must not contain trailing spaces',
              (value) => value?.trim().length === value?.length,
            ),
          sites: array()
            .of(
              object().shape({
                location: string().required('Location is required'),
                name: string().required('Site name is required'),
              }),
            )
            .min(1, 'At least one site is required'),
        }),
      )
      .min(1, 'At least one business unit is required')
      .test('unique-business-units', function (businessUnits) {
        if (!businessUnits) return true;
        const businessUnitNames = businessUnits.map((unit) => unit.name?.toLowerCase());
        const duplicateUnitIndices: number[] = [];
        businessUnitNames?.forEach((name, index) => {
          if (
            businessUnitNames.indexOf(name) !== index
            && !duplicateUnitIndices?.includes(index)
          ) {
            duplicateUnitIndices?.push(index);
          }
        });
        if (duplicateUnitIndices.length > 0) {
          const errors = duplicateUnitIndices?.map((index) => this.createError({
            path: `business_units.${index}.name`,
            message: 'Business unit name must be unique',
          }));
          throw new ValidationError(errors);
        }
        return true;
      })
      .test('unique-site-locations', function (businessUnits) {
        if (!businessUnits) return true;
        const siteLocationNames: {
          location: string;
          name: string;
          path: string;
        }[] = [];
        const errors: ValidationError[] = [];
        businessUnits.forEach((unit, unitIndex) => {
          unit?.sites?.forEach((site, siteIndex) => {
            const duplicate = siteLocationNames.find(
              (s) => s.location === site?.location?.toLowerCase()
                && s.name === site?.name?.toLowerCase(),
            );

            if (duplicate) {
              errors.push(
                this.createError({
                  path: `business_units.${unitIndex}.sites.${siteIndex}.location`,
                  message: 'Site location must be unique',
                }),
                this.createError({
                  path: `business_units.${unitIndex}.sites.${siteIndex}.name`,
                  message: 'Site name must be unique',
                }),
              );
            } else {
              siteLocationNames.push({
                location: site?.location?.toLowerCase(),
                name: site?.name?.toLowerCase(),
                path: `business_units.${unitIndex}.sites.${siteIndex}`,
              });
            }
          });
        });
        if (errors.length > 0) {
          throw new ValidationError(errors);
        }
        return true;
      }),
  });

  const btnName = () => {
    if (isSettingScreen) {
      if (currentBusinessUnit) {
        return {
          name: 'Update',
          loadingName: 'Updating...',
          toastmsg: 'Updated',
        };
      }
      return {
        name: 'Add',
        loadingName: 'Saving...',
        toastmsg: 'Added',
      };
    }
    return {
      name: 'Save & Proceed',
      loadingName: 'Saving...',
      toastmsg: 'Added',
    };
  };

  const onSubmit = async (
    values: IBusinessUnitFields,
    { setSubmitting, validateForm }: FormikHelpers<IBusinessUnitFields>,
  ) => {
    validateForm(values);
    setSubmitting(true);
    let res;
    if (!currentBusinessUnit) {
      res = await BusinessUnitService.createBusinessUnit(
        values,
        slug,
        isSettingScreen
          ? undefined
          : {
            onboarding: true,
          },
      );
    } else {
      res = await BusinessUnitService.updateBusinessUnit(
        currentBusinessUnit.id,
        values?.business_units[0],
        slug,
      );
    }
    const { error, success } = res?.data as {
      error: string[];
      success: boolean;
    };
    if (success) {
      toast.success(`Business Unit ${btnName()?.toastmsg} Successfully`);
      if (!isSettingScreen) {
        router.push('/company_profile/standard_regulations');
      }
      onClose?.();
      router.refresh();
    } else {
      toast.error(error[0]);
    }
    setSubmitting(false);
  };

  return (
    <div style={isMobileOnly ? { width: '330px' } : { width: '700px' }}>
      {!isSettingScreen && (
        <div className="text-center mb-4 company-profile-header">
          <h5 className="page-title">Business Unit Details</h5>
          <span className="page-subtitle">
            Please enter your business unit details
          </span>
        </div>
      )}
      <div className="mt-5">
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
        >
          {({
            values,
            errors,
            isSubmitting,
            handleSubmit,
            resetForm,
            dirty,
          }) => (
            <Form onSubmit={handleSubmit}>
              <FieldArray name="business_units">
                {({ push: addBusinessUnit, remove: removeBusinessUnit }) => (
                  <div>
                    {values.business_units.map((unit, unitIndex) => (
                      // eslint-disable-next-line react/no-array-index-key
                      <div
                        // eslint-disable-next-line react/no-array-index-key
                        key={unitIndex}
                        className=" p-3 border rounded-1 bg-light mb-5 position-relative animated-element"
                      >
                        <div className=" text-capitalize pb-2">
                          {`Business Unit ${unitIndex + 1}`}
                        </div>
                        <div>
                          <FormikField
                            name={`business_units.${unitIndex}.name`}
                            label="Business Unit Name"
                            placeholder="Enter business unit name"
                            errors={errors}
                            customErrorMap={
                              (
                                errors?.business_units?.[unitIndex] as {
                                  name: string;
                                }
                              )?.name
                            }
                            validationSchema={validationSchema}
                            type="text"
                            isCustomRequired
                          />
                        </div>
                        <FieldArray name={`business_units.${unitIndex}.sites`}>
                          {({ push: addSite, remove: removeSite }) => unit.sites.map((site, siteIndex) => {
                            const customError = (
                              errors?.business_units?.[unitIndex] as {
                                sites: {
                                  location: string;
                                  name: string;
                                }[];
                              }
                            )?.sites?.[siteIndex];
                            return (
                              // eslint-disable-next-line react/jsx-key
                              <div className=" border p-3 mb-3 rounded-1 site-bg animated-element">
                                <div className=" text-capitalize pb-2">{`Site ${siteIndex + 1}`}</div>

                                <div className="row  position-relative">
                                  <div className="col-12 col-lg-6">
                                    <FormikField
                                      name={`business_units.${unitIndex}.sites.${siteIndex}.name`}
                                      label={`Site Name ${siteIndex + 1}`}
                                      placeholder="Enter site name"
                                      errors={errors}
                                      validationSchema={validationSchema}
                                      type="text"
                                      isCustomRequired
                                      customErrorMap={customError?.name}
                                    />
                                  </div>
                                  <div className="col-12 col-lg-6">
                                    <FormikField
                                      name={`business_units.${unitIndex}.sites.${siteIndex}.location`}
                                      label={`Location ${siteIndex + 1}`}
                                      placeholder="Enter location"
                                      errors={errors}
                                      validationSchema={validationSchema}
                                      type="text"
                                      isCustomRequired
                                      customErrorMap={customError?.location}
                                    />
                                  </div>
                                  <div className="d-flex justify-content-end gap-3 align-items-center adding-deleting-sites">
                                    <div>
                                      {(siteIndex > 0 || (siteIndex === 0 && unit.sites.length > 1)) && (
                                        <Button
                                          onClick={() => removeSite(siteIndex)}
                                          text="Delete Site"
                                          className="fs-14"
                                          btnclassName="business-btn-danger"
                                        />
                                      )}
                                    </div>
                                    {siteIndex === unit.sites.length - 1 && (
                                      <Button
                                        onClick={() => addSite({ location: '', name: '' })}
                                        text="Add More Sites"
                                        className="fs-14"
                                        btnclassName="business-btn"
                                        prefixIconChildren={
                                          <IoIosAdd size={22} />
                                        }
                                      />
                                    )}
                                  </div>
                                </div>
                              </div>
                            );
                          })}
                        </FieldArray>
                        <div className="delete-unit">
                          {(unitIndex > 0 || (unitIndex === 0 && values?.business_units?.length > 1)) && (
                            <Button
                              onClick={() => removeBusinessUnit(unitIndex)}
                              text="Delete business Unit"
                              className="fs-14"
                              btnclassName="delete-unit-btn"
                            />

                          )}
                        </div>
                      </div>
                    ))}
                    {!currentBusinessUnit && (
                      <div className="d-flex justify-content-center">
                        <Button
                          text="Add Business Unit"
                          onClick={() => addBusinessUnit({
                            name: '',
                            sites: [{ location: '', name: '' }],
                          })}
                          type="button"
                          variant="link"
                          className="w-100 mt-3 text-decoration-none ms-0 text-start textPrimary"
                          prefixIconChildren={
                            <FaPlus size={14} className="textSecondary me-2" />
                          }
                        />
                      </div>
                    )}
                  </div>
                )}
              </FieldArray>
              <div
                className={`d-flex ${isSettingScreen ? 'justify-content-end' : 'justify-content-center'} businessunit-btn-container`}
              >
                {isSettingScreen && (
                  <Button
                    text="Cancel"
                    onClick={() => {
                      resetForm();
                      onClose?.();
                      router.refresh();
                    }}
                    className="w-100"
                  />
                )}
                <Button
                  text={isSubmitting ? btnName()?.loadingName : btnName()?.name}
                  isDisabled={
                    isSettingScreen ? !dirty || isSubmitting : isSubmitting
                  }
                  isLoading={isSubmitting}
                  type="submit"
                  isSolid
                  className={`mt-0 w-100 ${isSettingScreen ? 'ms-2' : ''}`}
                  sufixIconChildren={
                    !isSettingScreen ? (
                      <MdArrowForward
                        size={20}
                        color="var(--icon-color)"
                        className="ms-3"
                      />
                    ) : (
                      ''
                    )
                  }
                />
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}
