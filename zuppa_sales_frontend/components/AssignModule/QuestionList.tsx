/* eslint-disable no-unused-vars */
/* eslint @typescript-eslint/no-unused-vars: off */
/* eslint-disable max-len */
/* eslint-disable indent */
import { ISite } from '@/lib/interface/IAccount.interface';
import {
  IIndicators,
  IModules,
  IQuestionSequences,
} from '@/lib/interface/IStandard.interface';
import {
 FormGroup, FormLabel, OverlayTrigger, Tooltip,
} from 'react-bootstrap';
import { BsInfo } from 'react-icons/bs';
import './AssignModule.css';

interface QuestionListProps {
  filteredModules: IModules[];
  selectedQuestionIds: string[];
  isAllSelected: boolean;
  getQuestionAssigned: (questionId: string) => {
    status: string;
    label: string;
    color: string;
    unAssigendSites: ISite[];
    disable: boolean;
  };
  onSelectAll: () => void;
  onQuestionSelect: (
    moduleId: string,
    indicator: IIndicators,
    question: IQuestionSequences
  ) => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onRuleAndGroupQuestionsClick: (questions: any[]) => void;
}

export const QuestionList = ({
  filteredModules,
  selectedQuestionIds,
  isAllSelected,
  getQuestionAssigned,
  onSelectAll,
  onQuestionSelect,
  onRuleAndGroupQuestionsClick,
}: QuestionListProps) => {
  const sortQuestion = (questionSequences: IQuestionSequences[]) => questionSequences.sort((a, b) => a.sequence - b.sequence);

  return (
    <div className="pt-4">
      <div className="module-header-container">
        <p className="module-header-container-subtitle">Choose</p>
        <h4 className="module-header-container-title">Questions</h4>
      </div>
      <div className="mt-4">
        <div>
          <FormGroup>
            <div
              style={{ paddingLeft: '29px' }}
              className="select-container d-flex align-items-center cursor-pointer gap-3"
              aria-hidden
              onClick={() => {
                const allQuestionsAssigned = filteredModules
                  .flatMap((mod) => mod.indicators)
                  .flatMap((ind) => ind.question_sequence)
                  .every(
                    (question) => getQuestionAssigned(question.id).disable,
                  );
                if (!allQuestionsAssigned) {
                  onSelectAll();
                }
              }}
            >
              <input
                type="checkbox"
                className="select-checkbox"
                style={{ border: '1px solid var(--primary)' }}
                name="select-all"
                checked={isAllSelected}
                disabled={filteredModules
                  .flatMap((mod) => mod.indicators)
                  .flatMap((ind) => ind.question_sequence)
                  .every(
                    (question) => getQuestionAssigned(question.id).disable,
                  )}
              />
              <FormLabel className="mb-0">
                <div>Select All</div>
              </FormLabel>
            </div>
          </FormGroup>
        </div>
        <hr className="mb-0 mt-0 textSecondary" />
        <div>
          {filteredModules.map((_module) => _module?.indicators?.map((_indicator) => sortQuestion(_indicator?.question_sequence)?.map((__question) => (
            <div
              style={{ paddingLeft: '29px' }}
              className=""
              key={__question?.id}
            >
              <FormGroup
                controlId={__question?.id}
                className="d-flex align-items-center"
              >
                <div
                  aria-hidden
                  className="select-container d-flex align-items-center cursor-pointer gap-3 w-100"
                >
                  <input
                    type="checkbox"
                    className="select-checkbox"
                    name="time-frame"
                    checked={selectedQuestionIds.includes(__question.id)}
                    onChange={() => {
                          onQuestionSelect(_module.id, _indicator, __question);
                        }}
                    disabled={getQuestionAssigned(__question?.id)?.disable}
                  />
                  <FormLabel className="mb-0 flex-grow-1">
                    <div className="d-flex align-items-center cursor-pointer gap-3">
                      <span
                        className="question-name"
                        aria-hidden
                        onClick={() => (getQuestionAssigned(__question?.id)?.disable
                                ? null
                                : onQuestionSelect(
                                    _module.id,
                                    _indicator,
                                    __question,
                                  ))}
                      >
                        {__question?.standard_question_id?.title
                              || __question?.group_questions?.name}
                      </span>
                      {__question?.question_rules?.length > 0 && (
                      <span
                        aria-hidden
                        onClick={() => onRuleAndGroupQuestionsClick(
                                  __question?.question_rules?.flatMap(
                                    (item) => item?.parent_question_id,
                                  ),
                                )}
                        className="me-3 question-name cursor-pointer textSecondary"
                      >
                        {`Dependent Questions (${__question?.question_rules?.length})`}
                      </span>
                          )}
                      {__question?.group_questions?.group_question_sequences
                            ?.length > 0 && (
                            <span
                              className="question-name cursor-pointer textSecondary"
                              aria-hidden
                              onClick={() => onRuleAndGroupQuestionsClick(
                                  __question?.group_questions
                                    ?.group_question_sequences,
                                )}
                            >
                              {`Group Questions (${
                                __question?.group_questions
                                  ?.group_question_sequences?.length
                              })`}
                            </span>
                          )}
                    </div>
                  </FormLabel>
                  {/* <span
                    className="d-flex justify-content-end fs-12"
                    style={{
                      color: getQuestionAssigned(__question?.id)?.color,
                      minWidth: 120,
                      maxWidth: 200,
                    }}
                  >
                    {getQuestionAssigned(__question?.id)?.label}
                    {getQuestionAssigned(__question?.id)?.unAssigendSites
                      ?.length > 0 && (
                      <OverlayTrigger
                        placement="left"
                        overlay={(
                          <Tooltip
                            id="tooltip-standard"
                            className="custom-tooltip"
                          >
                            {getQuestionAssigned(
                              __question?.id,
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
              <hr className="mb-0 mt-0 textSecondary" />
            </div>
              ))))}
        </div>
      </div>
    </div>
  );
};
