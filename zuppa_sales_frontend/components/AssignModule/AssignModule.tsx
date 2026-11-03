/* eslint-disable default-param-last */
/* eslint-disable max-len */

'use client';

import { ISite } from '@/lib/interface/IAccount.interface';
import { IDataCube } from '@/lib/interface/IDataCube.interface';
import {
  IGroupQuestionSequences,
  IModules,
  IStandardQuestions,
} from '@/lib/interface/IStandard.interface';
import { ITask } from '@/lib/interface/ITask.interface';
import { useModuleAssignment } from '@/lib/hooks/useModuleAssignment';
import { BusinessUnitService, DataCube } from '@/lib/service';
import { useParams } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import { MdArrowForward } from 'react-icons/md';
import { Button } from '../Button/Button';
import { useModal } from '../Modal/Context';
import PageHeaderWrapper from '../PageHeaderWrapper/PageHeaderWrapper';
import PreviewModule from '../PreviewModule/PreviewModule';
import { BreadCrumbProps } from '../types';
import { ModuleList } from './ModuleList';
import { QuestionList } from './QuestionList';
import './AssignModule.css';

export default function AssignModule({
  modules,
  dataCube,
}: {
  modules: IModules[];
  dataCube: IDataCube;
}) {
  const [tasks, setTasks] = useState<ITask[]>([]);
  const [sites, setSites] = useState<ISite[]>([]);
  const [isAssignTask, setIsAssignTask] = useState(false);
  const [ruleAndGroupQuestions, setRuleAndGroupQuestions] = useState<(IStandardQuestions | IGroupQuestionSequences)[]>();
  const params = useParams();
  const hideModal = useModal({});

  const {
    selectedModules,
    setSelectedModules,
    selectedModuleIds,
    isAllModulesSelected,
    filteredModules,
    getModulesAssigned,
    getQuestionAssigned,
    toggleModuleSelection,
    toggleQuestionSelection,
    toggleSelectAll,
    getIndicatorAssigned,
    toggleIndicatorSelection,
  } = useModuleAssignment(modules, tasks, sites);

  const getTasks = useCallback(async () => {
    const res = await DataCube.getTasks(dataCube.id, params?.subdomain as string);
    const { datacube } = res?.data as {
      datacube: IDataCube;
    };
    setTasks(datacube?.task || []);
  }, [dataCube.id, params.subdomain]);

  useEffect(() => {
    getTasks();
  }, [getTasks]);

  const getSites = useCallback(async () => {
    const res = await BusinessUnitService.getSites(params?.subdomain as string);
    const { site: _sites } = res?.data as unknown as { site: ISite[] };
    setSites(_sites);
  }, [params.subdomain]);

  useEffect(() => {
    getSites();
  }, [getSites]);

  const questions = selectedModules
    .flatMap((mod) => mod.indicators)
    .flatMap((ind) => ind.question_sequence);

  const breadCrumbMenu: BreadCrumbProps[] = [
    {
      title: 'Assign Task',
      breadCrumb: [
        {
          title: 'Data Cube',
          url: '/data_cubes',
        },
        {
          title: dataCube?.name,
          url: `/data_cubes/${dataCube?.id}`,
        },
        {
          title: 'Assign Task',
          url: `/data_cubes/${params?.id}`,
        },
      ],
    },
  ];

  const isGroupQuestion = (
    item: IStandardQuestions | IGroupQuestionSequences,
  ): item is IGroupQuestionSequences => 'standard_question' in item;

  const onCloseModal = () => {
    setRuleAndGroupQuestions(undefined);
    hideModal();
  };

  const ruleAndGroupQuestionsModal = useModal({
    style: {
      size: 'lg',
      title:
        ruleAndGroupQuestions?.[0] && isGroupQuestion(ruleAndGroupQuestions[0])
          ? 'Group Questions'
          : 'Rule Questions',
      onClose: () => onCloseModal(),
    },
    content: ruleAndGroupQuestions?.map((question, questionIndex) => {
      const item = ruleAndGroupQuestions?.[0] && isGroupQuestion(ruleAndGroupQuestions[0])
        ? (question as IGroupQuestionSequences)?.standard_question
        : (question as IStandardQuestions);
      return (
        <div
          className="d-flex align-items-start gap-2 mb-2 roleCheckbox"
          key={question?.id}
        >
          <div className="flex-grow-1">
            <div className="d-flex justify-content-between align-items-center mb-1">
              <div>
                <span className="me-3">
                  {`${questionIndex + 1}. ${item?.title}`}
                </span>
              </div>
            </div>
          </div>
        </div>
      );
    }),
  });

  useEffect(() => {
    if (ruleAndGroupQuestions) {
      ruleAndGroupQuestionsModal();
    }
  }, [ruleAndGroupQuestions, ruleAndGroupQuestionsModal]);

  const getUpdateData = async () => {
    getTasks();
  };

  const totalQuestions = filteredModules
    ?.flatMap((mod) => mod.indicators)
    .flatMap((ind) => ind.question_sequence).length;

  const selectedQuestionIds = selectedModules
    .flatMap((mod) => mod.indicators)
    .flatMap((ind) => ind.question_sequence)
    .map((q) => q.id);

  const isAllSelected = selectedQuestionIds.length === totalQuestions;

  return isAssignTask ? (
    <PreviewModule
      setIsAssignTask={setIsAssignTask}
      setSelectedModules={setSelectedModules}
      selectedModules={selectedModules}
      question={questions}
      dataCube={dataCube}
      setRuleAndGroupQuestions={setRuleAndGroupQuestions}
      getUpdateData={getUpdateData}
      sites={sites}
    />
  ) : (
    <PageHeaderWrapper
      breadCrumbMenu={breadCrumbMenu}
      title="Select to assign"
      stackComponent={(
        <div className="d-flex align-items-center">
          <div className="d-flex justify-content-between">
            <div className="">
              <Button
                onClick={() => setIsAssignTask(true)}
                text="Preview & Assign"
                type="submit"
                isSolid
                isDisabled={!questions?.length}
                className="w-100 assign-task-btn mb-0"
                sufixIconChildren={
                  questions?.length > 0 ? (
                    <>
                      <span className="badge text-bg-secondary p-2 ms-2 rounded-pill bg-danger">
                        {questions?.length}
                      </span>
                      <MdArrowForward
                        size={24}
                        color="var(--icon-color)"
                        className="ms-3"
                      />
                    </>
                  ) : (
                    <MdArrowForward
                      size={24}
                      color="var(--icon-color)"
                      className="ms-3"
                    />
                  )
                }
              />
            </div>
          </div>
        </div>
      )}
    >
      <div className="module-list-container">
        <Row className="module-list-row">
          <Col className="col-lg-5 module-list-column-container p-0">
            <ModuleList
              modules={modules}
              selectedModuleIds={selectedModuleIds}
              selectedModules={selectedModules}
              isAllModulesSelected={isAllModulesSelected}
              getModulesAssigned={getModulesAssigned}
              getIndicatorAssigned={getIndicatorAssigned}
              getQuestionAssigned={getQuestionAssigned}
              onSelectAll={toggleSelectAll}
              onModuleSelect={toggleModuleSelection}
              onIndicatorSelect={toggleIndicatorSelection}
            />
          </Col>
          <Col className="col-lg-7">
            {filteredModules?.length > 0 ? (
              <QuestionList
                filteredModules={filteredModules}
                selectedQuestionIds={selectedQuestionIds}
                isAllSelected={isAllSelected}
                getQuestionAssigned={getQuestionAssigned}
                onSelectAll={toggleSelectAll}
                onQuestionSelect={toggleQuestionSelection}
                onRuleAndGroupQuestionsClick={setRuleAndGroupQuestions}
              />
            ) : (
              <div className="py-3 fw-semibold text-center text-danger">
                Please select the Modules & Indicators
              </div>
            )}
          </Col>
        </Row>
      </div>
    </PageHeaderWrapper>
  );
}
