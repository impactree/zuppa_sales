/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable max-len */
/* eslint-disable indent */

'use client';

import { useDeviceDetection } from '@/hooks/useDeviceDetection';
import { AuthService } from '@/lib/service';
import { convertToPascalCase, userRole } from '@/lib/utils';
import {
  Field,
  FieldArray,
  FieldProps,
  Form,
  Formik,
  FormikHelpers,
} from 'formik';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import { usePathname, useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { IoIosAdd } from 'react-icons/io';
import { MdArrowForward, MdDelete } from 'react-icons/md';
import { array, object, string } from 'yup';
import { Button } from '../Button/Button';
import CustomSelect from '../CustomSelect/CustomSelect';
import { FormikField } from '../FormikField/FormikField';
import { CustomInputField } from '../InputField/CustomInputField';
import SkipButton from '../SkipButton/SkipButton';
import { IUserRole, Option, Roles } from '../types';
import './UserInviteForm.css';

interface Invitation {
  email: string;
  name: string;
  role: IUserRole;
}

export const handleUserInviteSubmit = async (
  values: {
    invitation: Invitation[];
  },
  slug: string,
  {
    setSubmitting,
    validateForm,
  }: FormikHelpers<{
    invitation: Invitation[];
  }>,
  router: AppRouterInstance,
  isDashboard: boolean,
) => {
  validateForm(values);
  setSubmitting(true);
  const params = values?.invitation?.map((item) => ({
    email: item.email?.toLocaleLowerCase(),
    name: '',
    role: item?.role,
  }));
  let res;
  if (isDashboard) {
    res = await AuthService.inviteUsers(params, slug);
  } else {
    res = await AuthService.invitePeople({
      invitation: params,
      slug,
    });
  }
  const { success, error } = res?.data as { error: string[]; success: boolean };
  if (success) {
    toast.success('User Invited Successfully');
    if (!isDashboard) {
      // router.push('/company_profile/plans');
         router.push('/home');
    }
    router.refresh();
  } else {
    toast.error(error[0]);
  }
  setSubmitting(false);
};

export const isButtonDisabled = (invitation: Invitation[]) => invitation.some((item) => item.email?.length < 1);

export const handleDelete = (index: number, arrayHelpers: any) => {
  arrayHelpers.remove(index);
};

export const getIcon = (index: number, arrayHelpers: any) => (index > 0 ? (
  <MdDelete
    data-testid={`delete-icon-${index}`}
    size={20}
    color="var(--icon-color)"
    onClick={() => handleDelete(index, arrayHelpers)}
  />
  ) : (
    ''
  ));

export const pushNewUser = (arrayHelpers: any) => {
  arrayHelpers.push({
    email: '',
    name: '',
    role: 'SUSTAINABILITY_MANAGER',
  });
};
export default function UserInviteForm({
  slug,
  closeModal,
}: Readonly<{
  slug: string;
  closeModal?: () => void;
}>) {
  const pathname = usePathname();
  const isDashboard = pathname.startsWith('/home');
  const router = useRouter();
  const { isMobileOnly } = useDeviceDetection();
  const validationSchema = object({
    invitation: array()
      .of(
        object({
          email: string()
            .email('Invalid email address')
            .matches(
              /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
              'Invalid email format',
            )
            .required('Email address is required'),
          role: string().required('Role is required'),
        }),
      )
      .min(1, 'At least one invitation is required'),
  });
  const onSubmit = async (
    values: {
      invitation: Invitation[];
    },
    formikHelpers: FormikHelpers<{
      invitation: Invitation[];
    }>,
  ) => {
    await handleUserInviteSubmit(
      values,
      slug,
      formikHelpers,
      router,
      isDashboard,
    );
    closeModal?.();
  };

  return (
    <div style={isMobileOnly ? { width: '330px' } : { width: '700px' }}>
      <div
        className={`text-center mb-4 ${isDashboard ? '' : 'company-profile-header'}`}
      >
        <h5 className="page-title">Invite users</h5>
        <span className="page-subtitle">
          Please invite people and assign tasks
        </span>
      </div>
      <div className="mt-5">
        <Formik
          initialValues={{
            invitation: isDashboard
              ? [
                  {
                    email: '',
                    name: '',
                    role: 'DATA_PROVIDER',
                  },
                  {
                    email: '',
                    name: '',
                    role: 'DATA_REVIEWER',
                  },
                ]
              : [
                  {
                    email: '',
                    name: '',
                    role: 'SUSTAINABILITY_MANAGER',
                  },
                ],
          }}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
          validateOnChange
          validateOnBlur
        >
          {({
 values, errors, handleSubmit, isSubmitting, setFieldValue,
}) => (
  <Form onSubmit={handleSubmit}>
    <FieldArray
      name="invitation"
      render={(arrayHelpers) => (
        <div>
          {values.invitation.map((invite, index) => {
                      const error = errors?.invitation?.[index];
                      return (
                        // eslint-disable-next-line react/jsx-key
                        <div className="row  position-relative animated-element">
                          <div className="col-12 col-lg-6">
                            <FormikField
                              name={`invitation.${index}.email`}
                              label="Email Address"
                              placeholder="Enter Email Address"
                              errors={errors}
                              validationSchema={validationSchema}
                              type="text"
                              isCustomRequired
                              customErrorMap={(error as Invitation)?.email}
                            />
                          </div>
                          <div className="col-12 col-lg-6">
                            <Field
                              name={`invitation.${index}.role`}
                              className=""
                            >
                              {({ field: formikField }: FieldProps<string>) => (
                                <CustomInputField
                                  validationSchema={validationSchema}
                                  label="Role"
                                  field={formikField}
                                  error={(error as Invitation)?.role}
                                  isCustomRequired
                                >
                                  <Field
                                    name={`invitation.${index}.role`}
                                    component={CustomSelect}
                                    id={formikField.name}
                                    onChange={(e: Option) => {
                                      setFieldValue(
                                        `invitation.${index}.role`,
                                        e?.value,
                                      );
                                    }}
                                    value={values?.invitation?.[index]?.role}
                                    options={Roles?.map((item) => ({
                                      label: convertToPascalCase(
                                        userRole(item)?.replaceAll('_', ' '),
                                      ),
                                      value: item,
                                    }))}
                                    isDisabled={isDashboard}
                                  />
                                </CustomInputField>
                              )}
                            </Field>
                          </div>
                          {!isDashboard && (
                            <div className="d-flex justify-content-end gap-3 align-items-center adding-deleting-sites">
                              <div>
                                {(index > 0
                                  || (index === 0
                                    && values.invitation.length > 1)) && (
                                    <Button
                                      isLink
                                      onClick={() => arrayHelpers.remove(index)}
                                      text="Delete User"
                                      className="fs-14"
                                      btnclassName="business-btn-danger"
                                    />
                                )}
                              </div>
                              {index === values.invitation.length - 1 && (
                                <Button
                                  isLink
                                  onClick={() => arrayHelpers.push({
                                      email: '',
                                      name: '',
                                      role: 'SUSTAINABILITY_MANAGER',
                                    })}
                                  text="Add More"
                                  className="fs-14"
                                  btnclassName="business-btn"
                                  prefixIconChildren={<IoIosAdd size={22} />}
                                />
                              )}
                            </div>
                          )}
                        </div>
                      );
                    })}
          <div className="d-flex justify-content-center mt-4">
            <Button
              text={
                          // eslint-disable-next-line no-nested-ternary
                          isSubmitting
                            ? isDashboard
                              ? 'Inviting'
                              : 'Submitting...'
                            : isDashboard
                              ? 'Invite'
                              : 'Submit & Proceed'
                        }
              isLoading={isSubmitting}
              isDisabled={
                          isSubmitting ?? isButtonDisabled(values?.invitation)
                        }
              type="submit"
              isSolid
              className="w-100"
              sufixIconChildren={
                          isDashboard ? null : (
                            <MdArrowForward
                              size={20}
                              color="var(--icon-color)"
                              className="ms-3"
                            />
                          )
                        }
            />
            {isDashboard && (
            <div className="ms-3">
              <Button
                text="Cancel"
                onClick={() => {
                              if (closeModal) {
                                closeModal();
                              }
                            }}
                className="w-100"
              />
            </div>
                      )}
          </div>
          {!isDashboard && <SkipButton apiKey={slug} type="invite" />}
        </div>
                )}
    />
  </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}
