'use client';

import { ISite } from '@/lib/interface/IAccount.interface';
import { IDataCube } from '@/lib/interface/IDataCube.interface';
import {
  IGroupQuestionSequences,
  IModules,
  IQuestionSequences,
  IStandardQuestions,
} from '@/lib/interface/IStandard.interface';
import { useMemo } from 'react';
import { Accordion } from 'react-bootstrap';
import { MdArrowForward, MdKeyboardDoubleArrowRight } from 'react-icons/md';
import { CustomAccordion } from '../Accordion/CustomAccordion';
import { Button } from '../Button/Button';
import { useModal } from '../Modal/Context';
import PageHeaderWrapper from '../PageHeaderWrapper/PageHeaderWrapper';
import TaskAssignForm from '../TaskAssignForm/TaskAssignForm';
import { BreadCrumbProps } from '../types';
import './PreviewModule.css';

export default function PreviewModule({
  setIsAssignTask,
  selectedModules,
  question,
  setSelectedModules,
  dataCube,
  setRuleAndGroupQuestions,
  getUpdateData,
  sites,
}: {
  setIsAssignTask: (value: boolean) => void;
  selectedModules: IModules[];
  question: IQuestionSequences[];
  setSelectedModules: (value: IModules[]) => void;
  dataCube: IDataCube;
  setRuleAndGroupQuestions: (
    data: (IStandardQuestions | IGroupQuestionSequences)[] | undefined
  ) => void;
  getUpdateData: () => void;
  sites: ISite[];
}) {
  const hideModal = useModal({});
  const resetState = () => {
    setSelectedModules([]);
    setIsAssignTask(false);
    getUpdateData();
  };
  const model = useModal({
    style: {
      title: 'Assign',
      onClose: () => hideModal(),
    },
    content: (
      <TaskAssignForm
        question={question}
        actionType="Create"
        onClose={hideModal}
        resetState={resetState}
        dataCube={dataCube}
        sites={sites}
      />
    ),
  });

  const breadCrumbsItem = useMemo(
    () => [
      {
        title: 'Data Cube',
        url: '/data_cubes',
        tag: true,
      },
      {
        title: dataCube?.name,
        url: `/data_cubes/${dataCube?.id}`,
        onClick: () => setIsAssignTask(false),
      },
      {
        title: 'Assign Task',
        url: `/data_cubes/${dataCube?.id}`,
        onClick: () => setIsAssignTask(false),
      },
      {
        title: 'Review Selected Tasks',
        url: `/data_cubes/${dataCube?.id}`,
        onClick: () => setIsAssignTask(true),
      },
    ],
    [dataCube?.id, dataCube?.name, setIsAssignTask],
  );

  const breadCrumbMenu: BreadCrumbProps[] = [
    {
      title: 'Review Selected Tasks',
      breadCrumb: breadCrumbsItem,
    },
  ];
  return (
    // <div className="">
    <PageHeaderWrapper
      breadCrumbMenu={breadCrumbMenu}
      title="Review Selected Tasks"
      stackComponent={(
        <div className="d-flex align-items-center">
          <div className="d-flex justify-content-between">
            <div className="">
              <Button
                text="Assign"
                type="submit"
                isSolid
                className="w-100 mt-0 invite-assign-btn"
                onClick={model}
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
        </div>
      )}
    >
      <div className="module-list-container">
        <div className="secondary-border-top">
          {selectedModules.map((module) => (
            <div key={module?.id}>
              <CustomAccordion
                accordionText={module?.name}
                rightHeader
                accordionTextIcon={(
                  <MdKeyboardDoubleArrowRight
                    size={20}
                    className="d-inline-flex ms-3"
                  />
                )}
              >
                <div>
                  {module?.indicators.map((indicator) => (
                    <div
                      className="sub-child-accordion ps-4 ps-lg-5"
                      key={indicator.id}
                    >
                      <Accordion>
                        <Accordion.Item eventKey="0">
                          <Accordion.Header>
                            <span className=" fs-15">{indicator?.name}</span>
                            <span className=" ms-3">
                              <MdKeyboardDoubleArrowRight size={20} />
                            </span>
                          </Accordion.Header>
                          <Accordion.Body>
                            <div>
                              {indicator?.question_sequence.map(
                                (_question, index) => (
                                  <div key={_question?.id}>
                                    <div className="mb-3 pb-3 border-bottom">
                                      {`${index + 1}. ${_question?.standard_question_id?.title || _question?.group_questions?.name}`}
                                      {_question?.question_rules?.length
                                        > 0 && (
                                        <span
                                          aria-hidden
                                          onClick={() => setRuleAndGroupQuestions(
                                            _question?.question_rules?.flatMap(
                                              (item) => item?.parent_question_id,
                                            ),
                                          )}
                                          className="me-3 question-name ms-3 cursor-pointer textSecondary"
                                        >
                                          {`Dependent Questions (${_question?.question_rules?.length})`}
                                        </span>
                                      )}
                                      {_question?.group_questions
                                        ?.group_question_sequences?.length
                                        > 0 && (
                                        <span
                                          className="question-name cursor-pointer textSecondary"
                                          aria-hidden
                                          onClick={() => setRuleAndGroupQuestions(
                                            _question?.group_questions
                                              ?.group_question_sequences,
                                          )}
                                        >
                                          {`Group Questions (${_question?.group_questions?.group_question_sequences?.length})`}
                                        </span>
                                      )}
                                    </div>
                                  </div>
                                ),
                              )}
                            </div>
                          </Accordion.Body>
                        </Accordion.Item>
                      </Accordion>
                    </div>
                  ))}
                </div>
              </CustomAccordion>
            </div>
          ))}
        </div>
      </div>
    </PageHeaderWrapper>
    // </div>
  );
}
