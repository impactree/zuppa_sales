/* eslint-disable no-unused-vars */
/* eslint @typescript-eslint/no-unused-vars: off */
import { ISite } from '@/lib/interface/IAccount.interface';
import { IIndicators, IModules } from '@/lib/interface/IStandard.interface';
import {
  FormGroup, FormLabel, OverlayTrigger, Tooltip,
} from 'react-bootstrap';
import { BsInfo } from 'react-icons/bs';
import { MdKeyboardDoubleArrowRight } from 'react-icons/md';

interface ModuleListProps {
  modules: IModules[];
  selectedModuleIds: string[];
  isAllModulesSelected: boolean;
  getModulesAssigned: (module: IModules) => {
    status: string;
    label: string;
    color: string;
    unAssigendSites: ISite[];
    disable: boolean;
  };
  getIndicatorAssigned: (indicator: IIndicators) => {
    status: string;
    label: string;
    color: string;
    unAssigendSites: ISite[];
    disable: boolean;
  };
  getQuestionAssigned: (question: string) => {
    status: string;
    label: string;
    color: string;
    unAssigendSites: ISite[];
    disable: boolean;
  };
  onSelectAll: () => void;
  onModuleSelect: (module: IModules) => void;
  onIndicatorSelect: (indicator: IIndicators, moduleId: string) => void;
  selectedModules: IModules[];
}

export const ModuleList = ({
  modules,
  selectedModuleIds,
  isAllModulesSelected,
  getModulesAssigned,
  getIndicatorAssigned,
  getQuestionAssigned,
  onSelectAll,
  onModuleSelect,
  onIndicatorSelect,
  selectedModules,
}: ModuleListProps) => (
  <div className="pt-4">
    <div className="module-header-container">
      <p className="module-header-container-subtitle">Choose</p>
      <h4 className="module-header-container-title">Modules & Indicators</h4>
    </div>
    <div className="mt-4">
      <div>
        <FormGroup>
          <div
            style={{ paddingLeft: '29px' }}
            className="select-container d-flex align-items-center cursor-pointer gap-3"
            aria-hidden
            onClick={() => {
              const allModulesAssigned = modules.every((module) => {
                const hasAssignedIndicators = module.indicators.some(
                  (indicator) => getIndicatorAssigned(indicator).disable,
                );
                return (
                  getModulesAssigned(module).disable || hasAssignedIndicators
                );
              });
              if (!allModulesAssigned) {
                onSelectAll();
              }
            }}
          >
            <input
              type="checkbox"
              className="select-checkbox"
              style={{ border: '1px solid var(--primary)' }}
              name="time-frame"
              checked={isAllModulesSelected}
              disabled={modules.every(
                (module) => getModulesAssigned(module).disable,
              )}
            />
            <FormLabel className="mb-0 cursor-pointer">
              <div>Select All</div>
            </FormLabel>
          </div>
        </FormGroup>
      </div>
      <hr className="mb-0 mt-0 textSecondary" />
      <div>
        {modules?.map((module) => (
          <div key={module?.id}>
            <FormGroup controlId={module?.id}>
              <div
                style={{ paddingLeft: '29px' }}
                className={`select-container d-flex align-items-center justify-content-between cursor-pointer ${selectedModuleIds.includes(module?.id) ? 'active' : ''}`}
                aria-hidden
                onClick={() => {
                  if (!getModulesAssigned(module).disable) {
                    onModuleSelect(module);
                  }
                }}
              >
                <div className="d-flex align-items-center gap-3">
                  <input
                    type="checkbox"
                    className="select-checkbox"
                    name="time-frame"
                    checked={selectedModuleIds.includes(module?.id)}
                    disabled={getModulesAssigned(module).disable}
                  />
                  <FormLabel className="mb-0 cursor-pointer">
                    <div className="d-flex gap-3 align-items-center">
                      <span className="module-name">{module?.name}</span>
                      <MdKeyboardDoubleArrowRight size={20} />
                    </div>
                  </FormLabel>
                </div>
                {/* <span
                  className="d-flex justify-content-end fs-12 me-3"
                  style={{ color: getModulesAssigned(module).color }}
                >
                  {getModulesAssigned(module).label}
                  {getModulesAssigned(module)?.unAssigendSites?.length > 0 && (
                    <OverlayTrigger
                      placement="right"
                      overlay={(
                        <Tooltip
                          id="tooltip-standard"
                          className="custom-tooltip"
                        >
                          {getModulesAssigned(module)?.unAssigendSites.map(
                            (site, idx) => (
                              <div
                                key={site?.id}
                                className=" mb-2 py-1 px-2 rounded-2 fw-semibold"
                                style={{ background: '#f6f5f3' }}
                              >
                                {`${idx + 1})${site.name}`}
                              </div>
                            ),
                          )}
                        </Tooltip>
                      )}
                    >
                      <div
                        className="d-flex align-items-center fw-semibold fs-13"
                        aria-describedby="tooltip-standard"
                      >
                        <BsInfo size={15} />
                      </div>
                    </OverlayTrigger>
                  )}
                </span> */}
              </div>
            </FormGroup>
            {selectedModuleIds.includes(module?.id) && (
              <div style={{ paddingLeft: '40px' }}>
                <ul className="list-group">
                  {module?.indicators.map((indicator) => (
                    <FormGroup controlId={indicator?.id} key={indicator?.id}>
                      <li
                        className="w-100 p-3 d-flex align-items-center justify-content-between border-top border-start cursor-pointer"
                        aria-hidden
                        onClick={() => {
                          const hasAssignedQuestions = indicator.question_sequence.some(
                            (question) => getQuestionAssigned(question?.id).disable,
                          );
                          if (
                            !getIndicatorAssigned(indicator).disable
                            && !hasAssignedQuestions
                          ) {
                            onIndicatorSelect(indicator, module.id);
                          }
                        }}
                      >
                        <div className="d-flex align-items-center gap-3">
                          <input
                            type="checkbox"
                            className="select-checkbox"
                            name="time-frame"
                            checked={selectedModules
                              ?.flatMap((item) => item?.indicators)
                              .some(
                                (item) => item?.id === indicator?.id
                                  && item?.question_sequence?.length > 0,
                              )}
                            disabled={getIndicatorAssigned(indicator).disable}
                          />
                          <FormLabel className="mb-0 cursor-pointer">
                            <div className="d-flex gap-3 align-items-center">
                              <span className="indicator-name">
                                {indicator?.name}
                              </span>
                            </div>
                          </FormLabel>
                        </div>
                        {/* <span
                          className="d-flex justify-content-end fs-12"
                          style={{
                            color: getIndicatorAssigned(indicator)?.color,
                          }}
                        >
                          {getIndicatorAssigned(indicator)?.label}
                          {getIndicatorAssigned(indicator)?.unAssigendSites
                            ?.length > 0 && (
                            <OverlayTrigger
                              placement="right"
                              overlay={
                                <Tooltip
                                  id="tooltip-standard"
                                  className="custom-tooltip"
                                >
                                  {getIndicatorAssigned(
                                    indicator
                                  )?.unAssigendSites.map((site, idx) => (
                                    <div
                                      key={site?.id}
                                      className=" mb-2 py-1 px-2 rounded-2 fw-semibold"
                                      style={{ background: '#f6f5f3' }}
                                    >
                                      {`${idx + 1})${site.name}`}
                                    </div>
                                  ))}
                                </Tooltip>
                              }
                            >
                              <div
                                className="d-flex align-items-center fw-semibold fs-13"
                                aria-describedby="tooltip-standard"
                              >
                                <BsInfo size={15} />
                              </div>
                            </OverlayTrigger>
                          )}
                        </span> */}
                      </li>
                    </FormGroup>
                  ))}
                </ul>
              </div>
            )}
            <hr className="mb-0 mt-0 textSecondary" />
          </div>
        ))}
      </div>
    </div>
  </div>
);
