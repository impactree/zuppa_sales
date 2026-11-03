/* eslint-disable @typescript-eslint/no-explicit-any */

'use client';

import { IAccount } from '@/lib/interface/IAccount.interface';
import { IDataCube } from '@/lib/interface/IDataCube.interface';
import { IModules, IStandard } from '@/lib/interface/IStandard.interface';
import { AuthService, DataCube } from '@/lib/service';
import { convertToPascalCase } from '@/lib/utils';
import { useParams, usePathname, useRouter } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';
import {
  Col, FormGroup, FormLabel, Row,
} from 'react-bootstrap';
import toast from 'react-hot-toast';
import {
  MdArrowForward,
  MdLock,
  MdOutlineKeyboardDoubleArrowRight,
} from 'react-icons/md';
import Select from 'react-select';
import Avatar from '../Avatar/Avatar';
import { Button } from '../Button/Button';
import { useUser } from '../Context/userProvider';
import { CustomStyles } from '../CustomStyles/CustomStyles';
import PageHeaderWrapper from '../PageHeaderWrapper/PageHeaderWrapper';
import PageNotFound from '../PageNotFound/PageNotFound';
import { BreadCrumbProps, Option } from '../types';
import './StandardRegulationsForm.css';

export default function StandardRegulationsForm({
  standards,
  account,
}: Readonly<{
  standards: IStandard[] | undefined;
  account: IAccount | null;
}>) {
  const context = useUser();
  const router = useRouter();
  const urlParamas = useParams();
  const pathname = usePathname();
  const isProject = pathname?.startsWith('/data_cubes');
  const [isLoading, setIsLoading] = useState(false);
  const [selectStandard, setSelectedStandard] = useState<IStandard[]>();
  const [currentStandard, setCurrentStandard] = useState<IStandard>();
  const [selectModule, setSelectModule] = useState<IModules>();
  const [chooseFinalYr, setChooseFinalYr] = useState('');
  const [frequency, setFrequency] = useState('');
  const [error, setError] = useState({
    frequency: '',
    final_year: '',
    standards: '',
    // name: '',
  });
  const [modules, setModules] = useState<IModules[]>();

  const getModules = useCallback(
    async (id: string) => {
      const res = await DataCube.datacubeStandards(
        urlParamas?.subdomain as string,
        [id],
      );
      const { success, data } = res?.data as {
        success: boolean;
        data: IModules[];
      };
      if (success) {
        setModules(data);
        if (data[0]) {
          setSelectModule(data[0]);
        }
      }
    },
    [urlParamas?.subdomain],
  );

  useEffect(() => {
    if (standards) {
      const standard = standards[0];
      setSelectedStandard([standard]);
      setCurrentStandard(standard);
      getModules(standard?.id);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [standards]);

  const onSave = async () => {
    setIsLoading(true);
    if (isProject) {
      const errors: {
        frequency: string;
        final_year: string;
        standards: string;
        // name: string;
      } = {
        frequency: '',
        final_year: '',
        standards: '',
        // name: '',
      };
      if (!frequency) errors.frequency = 'Time Frequency is required';
      if (!chooseFinalYr) errors.final_year = 'Financial Year is required';
      // if (!name) errors.name = 'Name is required';
      if (!selectStandard || selectStandard.length === 0) {
        errors.standards = 'At least one Standard is required';
      }

      if (errors.frequency || errors.final_year || errors.standards) {
        setError(errors);
        setIsLoading(false);
        return;
      }
      setError({
        frequency: '',
        final_year: '',
        standards: '',
      });
      const resp = await DataCube.create(
        {
          frequency,
          financial_year: chooseFinalYr?.replace('_', '-'),
          standards:
            selectStandard?.map((item) => ({
              ...item,
              description: 'test',
            })) || [],
          name: chooseFinalYr?.replace('_', '-'),
          description: '',
        },
        urlParamas?.subdomain as string,
      );
      const {
        success,
        data,
        error: _error,
      } = resp?.data as {
        error: string[];
        success: boolean;
        data: IDataCube;
      };
      if (success) {
        toast.success('Data Cubes is created successfully');
        router.push(`/data_cubes/${data?.id}`);
        router.refresh();
      } else {
        toast.error(_error[0]);
      }
      // } else if (selectStandard && account) {
    } else if (account) {
      const response = await AuthService.updateOnboarding(
        urlParamas?.subdomain as string,
        'standard',
      );
      const { success } = response?.data as { success: boolean };
      if (success) {
        router.push('/company_profile/invite_user');
      } else {
        toast.error('Something went wrong, please try again later');
      }
    }
    setIsLoading(false);
  };

  const getFinancialYears = (years: number) => {
    const currentYear = new Date().getFullYear();
    const currentMonth = new Date().getMonth();
    const finalYear = currentMonth >= 3 ? currentYear : currentYear - 1;
    return Array.from({ length: years }, (_, i) => {
      const startYear = finalYear - i;
      const endYear = startYear + 1;
      const label = `${startYear}_${endYear}`;
      return { label, value: label };
    });
  };

  const timeFrame = ['MONTHLY', 'QUARTERLY', 'YEARLY'];

  const getValues = () => getFinancialYears(10)
    .filter((opt): opt is Option => !('options' in opt))
    .find((item) => chooseFinalYr?.includes(item?.value));

  const breadCrumbMenu: BreadCrumbProps[] = [
    {
      title: 'Create Data Cube',
      breadCrumb: pathname.endsWith('/new')
        ? [
          {
            title: 'Data Cubes',
            url: '/data_cubes',
          },
          {
            title: 'Create Data Cube',
            url: '/data_cubes/new',
          },
        ]
        : [
          {
            title: 'Data Cubes',
            url: '/data_cubes',
          },
        ],
    },
  ];

  const getSelectedStand = (standard: IStandard) => {
    const isUnchecking = selectStandard?.includes(standard);
    const selectedData = (isUnchecking
      ? (selectStandard || []).filter((item) => item !== standard)
      : [...(selectStandard || []), standard]);
    setSelectedStandard(selectedData);
    if (isUnchecking) {
      setCurrentStandard(selectedData[0] || undefined);
      if (selectedData[0]) {
        getModules(selectedData[0]?.id);
      } else {
        setModules(undefined);
        setSelectModule(undefined);
      }
    } else {
      setCurrentStandard(standard);
      getModules(standard?.id);
    }
  };

  const renderStandardsList = () => (
    <div className="project-standard-container px-3 py-2 rounded-1">
      <Row className="h-100">
        <Col className="col-12 col-lg-3 border-end">
          <div className="py-3">
            <div>
              <div className="fw-500 pb-2">Select an Preview</div>
              <h4 className="fw-600 pb-4">Standards</h4>
            </div>
            <div className="position-relative ">
              {standards?.length ? (
                standards?.map((standard) => (
                  <div
                    className={`standard-select mb-3 px-3 py-2 ${currentStandard?.id === standard?.id ? 'active' : ''}`}
                    key={standard.name}
                  >
                    <FormGroup
                      controlId={standard.name}
                      className="position-relative"
                    >
                      <div
                        aria-hidden
                        className={`d-flex align-items-center cursor-pointer ${currentStandard?.id === standard?.id ? 'standard-checked' : ''}`}
                        onClick={() => {
                          if (isProject) {
                            const errors: {
                              frequency: string;
                              final_year: string;
                              standards: string;
                            } = {
                              frequency: '',
                              final_year: '',
                              standards: '',
                            };
                            if (!frequency) {
                              errors.frequency = 'Frequency is required';
                            }
                            if (!chooseFinalYr) {
                              errors.final_year = 'Financial Year is required';
                            }
                            if (
                              !selectStandard
                              || selectStandard.length === 0
                            ) {
                              errors.standards = 'At least one Standard is required';
                            }
                            if (
                              errors.frequency
                              || errors.final_year
                              || errors.standards
                            ) {
                              setError(errors);
                            }
                            getSelectedStand(standard);
                          }
                        }}
                      >
                        {isProject && (
                          <input
                            type="checkbox"
                            className="select-checkbox"
                            checked={
                              isProject
                                ? selectStandard
                                  ?.map((item) => item?.id)
                                  ?.includes(standard?.id)
                                : currentStandard?.id === standard?.id
                            }
                            onChange={() => {
                              if (isProject) {
                                const errors: {
                                  frequency: string;
                                  final_year: string;
                                  standards: string;
                                  // name: string;
                                } = {
                                  frequency: '',
                                  final_year: '',
                                  standards: '',
                                  // name: '',
                                };
                                if (!frequency) {
                                  errors.frequency = 'Frequency is required';
                                }
                                // if (!name) {
                                //   errors.name = 'Name is required';
                                // }
                                if (!chooseFinalYr) {
                                  errors.final_year = 'Financial Year is required';
                                }
                                if (
                                  !selectStandard
                                  || selectStandard.length === 0
                                ) {
                                  errors.standards = 'At least one Standard is required';
                                }
                                if (
                                  errors.frequency
                                  || errors.final_year
                                  || errors.standards
                                  // || errors.name
                                ) {
                                  setError(errors);
                                }
                                getSelectedStand(standard);
                              }
                            }}
                          />
                        )}
                        <FormLabel className="form_label">
                          <div className="d-flex align-items-center cursor-pointer gap-3 ps-2">
                            <div>
                              <Avatar
                                name={standard.name}
                                size="60px"
                                className="rounded-circle"
                                avator={standard?.logo_url || ''}
                              />
                            </div>
                            <div>
                              <h6 className="standard-name-title mb-0 pb-2 d-flex align-items-center gap-1">
                                {standard.name}
                                {/* {modules && modules?.length > 0 ? ( */}
                                <MdOutlineKeyboardDoubleArrowRight
                                  size={22}
                                />
                                {/* ) : (
                                  <TiWarning color="var(--danger)" size={22} />
                                )} */}
                              </h6>
                              {/* <div className="standard-name-subtitle">
                                {`${modules?.length || 0} Mandatory`}
                              </div> */}
                              {/* <div className="standard-name-subtitle">
                                {`${modules?.length || 0} Optional`}
                              </div> */}
                            </div>
                          </div>
                        </FormLabel>
                      </div>
                    </FormGroup>
                  </div>
                ))
              ) : (
                <PageNotFound />
              )}
            </div>
            {error?.standards && (
              <div className="error-message">{error?.standards}</div>
            )}
          </div>
        </Col>
        <Col className="col-12 col-lg-4 border-end">
          <div className="py-3">
            <div className="d-flex justify-content-between">
              <div className="fw-500 pb-2">
                {`Modules ${currentStandard?.id ? 'of' : ''}`}
              </div>
              {currentStandard?.id && (
                <div className=" fw-500 pb-2">
                  {`${modules?.length || 0} Mandatory`}
                  {/* {' '}
                  <span className="fs-16 fw-600">/</span>
                  {` ${modules?.length || 0} Optional`} */}
                </div>
              )}
            </div>
            {currentStandard?.id ? (
              <>
                <div>
                  <h4 className="fw-600 pb-4">{currentStandard?.name}</h4>
                </div>
                <div className="module-container">
                  {modules?.length ? (
                    modules?.map((module) => (
                      <div
                        className={`module-select mb-3 py-3 px-2 rounded-1
                        ${module?.id === selectModule?.id ? 'active' : ''}`}
                        key={module?.id}
                        onClick={() => setSelectModule(module)}
                        aria-hidden
                      >
                        <div>
                          <div className="standard-name-title pb-2 d-flex align-items-center gap-1 text-capitalize">
                            {module?.name}
                            <MdOutlineKeyboardDoubleArrowRight size={22} />
                          </div>
                          <div className="d-flex gap-2 align-items-center fs-14">
                            <MdLock size={18} className="textPrimary" />
                            <span className="fs-13 fw-600 textSecondary">
                              Mandatory
                            </span>
                            {`- ${module?.indicators?.length || 0}
                              /
                              ${module?.indicators?.length || 0}
                            Mandatory`}
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <PageNotFound />
                  )}
                </div>
              </>
            ) : (
              <PageNotFound />
            )}
          </div>
        </Col>
        <Col>
          <div className="py-3">
            <div className="d-flex justify-content-between">
              <div className="fw-500 pb-2">
                {`Indicators ${selectModule?.id ? 'of' : ''}`}
              </div>
              {selectModule?.id && (
                <div className="fw-500 pb-2">
                  {`${selectModule?.indicators?.length || 0} Mandatory `}
                  {/* <span className="fs-16 fw-600">/</span>
                  {` ${selectModule?.indicators?.length || 0} Optional`} */}
                </div>
              )}
            </div>
            {selectModule?.id ? (
              <>
                <div>
                  <h4 className="fw-600 pb-4">{selectModule?.name}</h4>
                </div>
                <div className="module-container">
                  {selectModule?.indicators?.map((indicator) => (
                    <div
                      className="module-select rounded-1"
                      key={indicator?.name}
                    >
                      <div className="py-3 px-2">
                        <h5 className="standard-name-title pb-2 mb-1 d-flex align-items-center gap-1 text-capitalize">
                          {indicator?.name}
                        </h5>
                        <div className="d-flex gap-2 align-items-center fs-14">
                          <MdLock size={18} color="var(--icon-color)" />
                          <span className="fs-13 fw-600 textSecondary">
                            Mandatory
                          </span>
                          {' '}
                          {/* - Human Resource */}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            ) : (
              <PageNotFound />
            )}
          </div>
        </Col>
      </Row>
    </div>
  );

  return (
    <div className="">
      {isProject ? (
        <PageHeaderWrapper
          breadCrumbMenu={breadCrumbMenu}
          stackComponent={(
            <div className="d-flex align-items-center">
              <div className="d-flex justify-content-between">
                <div className="d-flex justify-content-center">
                  {context?.currentRole?.DATA_CUBE?.includes('WRITE') && (
                    <Button
                      text={`${isLoading ? 'Creating...' : isProject ? 'Proceed to assign tasks' : 'Next'}`} // eslint-disable-line no-nested-ternary
                      isDisabled={isLoading
                        || !(frequency?.length
                          && chooseFinalYr?.length
                          && selectStandard?.length
                        )}
                      isLoading={isLoading}
                      onClick={onSave}
                      isSolid
                      className="w-100 mt-0 mb-0"
                      sufixIconChildren={(
                        <MdArrowForward
                          size={24}
                          color="var(--icon-color)"
                          className="ms-3"
                        />
                      )}
                    />
                  )}
                </div>
              </div>
            </div>
          )}
        >
          <div className="d-flex flex-column gap-5">
            <div className=" d-flex justify-content-center">
              <div className={`row ${isProject ? '' : 'pb-5'} `}>
                {/* <div className="col-12 col-md-4 mb-2">
                  <label className="form_label mb-3">
                    Name *
                  </label>
                  <div>
                    <input
                      className="form-control"
                      type="text"
                      onChange={(e) => setName(e?.target?.value)}
                      value={name}
                      id="name"
                    />
                  </div>
                  {error?.name && (
                    <div className="error-message">{error?.name}</div>
                  )}
                </div> */}
                <div className="col-12 col-md-6 mb-2">
                  <label className="form_label mb-3">
                    Choose Financial Year *
                  </label>
                  <Select
                    id="sector"
                    value={getValues()}
                    onChange={(e) => setChooseFinalYr(e?.value as string)}
                    placeholder="Select Financial year"
                    options={getFinancialYears(10)}
                    isMulti={false}
                    //   isDisabled={isDisabled}
                    styles={CustomStyles}
                    classNamePrefix="custom_select_input"
                    data-testid="customSelect"
                    inputId="sector"
                  />
                  {error?.final_year && (
                    <div className="error-message">{error?.final_year}</div>
                  )}
                </div>
                <div className="col-12 col-md-6 mb-2">
                  <label className="form_label mb-3">Choose Time Frame *</label>
                  <div className="d-flex gap-3 flex-wrap flex-lg-nowrap">
                    {timeFrame.map((timeframe) => (
                      <div
                        aria-hidden
                        className=""
                        key={timeframe}
                        onClick={() => setFrequency(timeframe)}
                      >
                        <FormGroup controlId={timeframe} className="">
                          <div
                            className={`timeframe-option-container ${frequency === timeframe ? 'checked' : ''}`}
                            aria-hidden
                          >
                            <input
                              type="radio"
                              className="select-checkbox"
                              name="time-frame"
                              checked={frequency === timeframe}
                            />
                            <FormLabel className="mb-0 cursor-pointer">
                              <div className="ms-2">
                                <p className="mb-0">
                                  {convertToPascalCase(
                                    timeframe?.replaceAll('-', ' '),
                                  )}
                                </p>
                              </div>
                            </FormLabel>
                          </div>
                        </FormGroup>
                      </div>
                    ))}
                  </div>
                  {error?.frequency && (
                    <div className="error-message">{error?.frequency}</div>
                  )}
                </div>
              </div>
            </div>
            {renderStandardsList()}
          </div>
        </PageHeaderWrapper>
      ) : (
        <div className="ps-5 pe-5">
          {renderStandardsList()}
          <div className="d-flex justify-content-center standard-btn-container">
            <Button
              text="Next"
              isDisabled={isLoading}
              onClick={onSave}
              isSolid
              className="w-100 mt-0 mb-1 standard-submit-btn"
              sufixIconChildren={(
                <MdArrowForward
                  size={24}
                  color="var(--icon-color)"
                  className="ms-3"
                />
              )}
            />
          </div>
        </div>
      )}
    </div>
  );
}
