/* eslint-disable default-param-last */
import { ISite } from '@/lib/interface/IAccount.interface';
import { IIndicators, IModules, IQuestionSequences } from '@/lib/interface/IStandard.interface';
import { ITask } from '@/lib/interface/ITask.interface';
import { useCallback, useMemo, useState } from 'react';

interface AssignmentStatus {
  status: 'not_assigned' | 'pending' | 'assigned';
  label: string;
  color: string;
  unAssigendSites: ISite[];
  disable: boolean
}

export const useModuleAssignment = (modules: IModules[], tasks: ITask[], sites: ISite[]) => {
  const [selectedModules, setSelectedModules] = useState<IModules[]>([]);

  const selectedModuleIds = useMemo(
    () => selectedModules.map((mod) => mod.id),
    [selectedModules],
  );

  const isAllModulesSelected = useMemo(
    () => modules?.every((mod) => selectedModuleIds?.includes(mod.id)),
    [modules, selectedModuleIds],
  );

  const filteredModules = useMemo(
    () => modules?.filter((mod) => selectedModules.some((sel) => sel.id === mod.id)),
    [modules, selectedModules],
  );

  const getUnassignedSites = useCallback((assignedTasks: ITask[] = []) => {
    const assignedSiteIds = new Set(assignedTasks.map((task) => task.site?.id));
    return sites?.filter((site) => !assignedSiteIds.has(site.id));
  }, [sites]);

  const getModulesAssigned = useCallback((module: IModules): AssignmentStatus => {
    const assignedTasks = tasks?.filter((
      task,
    ) => module?.indicators?.some((
      indicator,
    ) => task?.task_questions?.some(
      (tq) => tq?.question_sequence?.public_indicator_id === indicator.id,
    )));

    const unAssigendSites = getUnassignedSites(assignedTasks);

    const allQuestionsAssigned = module.indicators.every((
      indicator,
    ) => indicator.question_sequence.every((
      question,
    ) => {
      const questionTasks = tasks?.filter((
        task,
      ) => task.task_questions?.some((
        tq,
      ) => tq.question_sequence?.public_question_sequence_id === question.id));
      const questionUnassignedSites = getUnassignedSites(questionTasks);
      return questionTasks?.length > 0 && !questionUnassignedSites?.length;
    }));

    if (!assignedTasks?.length) {
      return {
        status: 'not_assigned',
        label: 'Not Assigned',
        color: '#FF6B6B',
        unAssigendSites,
        disable: false,
      };
    }

    if (allQuestionsAssigned) {
      return {
        status: 'assigned',
        label: 'Assigned',
        color: '#5DD0A7',
        unAssigendSites: [],
        disable: true,
      };
    }

    const allUnassignedSites = module.indicators.flatMap((
      indicator,
    ) => indicator.question_sequence.flatMap((question) => {
      const questionTasks = tasks?.filter((
        task,
      ) => task.task_questions?.some((
        tq,
      ) => tq.question_sequence?.public_question_sequence_id === question.id));
      return getUnassignedSites(questionTasks);
    }));

    const uniqueUnassignedSites = Array.from(new Set(allUnassignedSites.map((site) => site.id)))
      .map((id) => allUnassignedSites.find((site) => site.id === id))
      .filter((site): site is ISite => site !== undefined);

    return {
      status: 'pending',
      label: 'Pending',
      color: '#FEC260',
      unAssigendSites: uniqueUnassignedSites,
      disable: false,
    };
  }, [tasks, getUnassignedSites]);

  const getIndicatorAssigned = useCallback((indicator: IIndicators): AssignmentStatus => {
    const assignedTasks = tasks?.filter((
      task,
    ) => indicator?.question_sequence?.some((
      seqQust,
    ) => task?.task_questions?.some(
      (tq) => tq?.question_sequence?.public_question_sequence_id === seqQust.id,
    )));
    const unAssigendSites = getUnassignedSites(assignedTasks);
    const allQuestionsAssigned = indicator.question_sequence.every((question) => {
      const questionTasks = tasks?.filter((
        task,
      ) => task.task_questions?.some((
        tq,
      ) => tq.question_sequence?.public_question_sequence_id === question.id));
      const questionUnassignedSites = getUnassignedSites(questionTasks);
      return questionTasks?.length > 0 && !questionUnassignedSites?.length;
    });

    if (!assignedTasks?.length) {
      return {
        status: 'not_assigned',
        label: 'Not Assigned',
        color: '#FF6B6B',
        unAssigendSites,
        disable: false,
      };
    }

    if (allQuestionsAssigned) {
      return {
        status: 'assigned',
        label: 'Assigned',
        color: '#5DD0A7',
        unAssigendSites: [],
        disable: true,
      };
    }

    const allUnassignedSites = indicator.question_sequence.flatMap((question) => {
      const questionTasks = tasks?.filter((
        task,
      ) => task.task_questions?.some((
        tq,
      ) => tq.question_sequence?.public_question_sequence_id === question.id));
      return getUnassignedSites(questionTasks);
    });

    const uniqueUnassignedSites = Array.from(new Set(allUnassignedSites.map((site) => site.id)))
      .map((id) => allUnassignedSites.find((site) => site.id === id))
      .filter((site): site is ISite => site !== undefined);

    return {
      status: 'pending',
      label: 'Pending',
      color: '#FEC260',
      unAssigendSites: uniqueUnassignedSites,
      disable: false,
    };
  }, [tasks, getUnassignedSites]);

  const getQuestionAssigned = useCallback((questionId: string): AssignmentStatus => {
    const assignedTasks = tasks?.filter((task) => task?.task_questions?.some(
      (tq) => tq?.question_sequence?.public_question_sequence_id === questionId,
    ));
    const unAssigendSites = getUnassignedSites(assignedTasks);
    const isAssignedToAllSites = !unAssigendSites?.length && assignedTasks?.length > 0;

    if (!assignedTasks?.length) {
      return {
        status: 'not_assigned',
        label: 'Not Assigned',
        color: '#FF6B6B',
        unAssigendSites,
        disable: false,
      };
    }

    if (isAssignedToAllSites) {
      return {
        status: 'assigned',
        label: 'Assigned',
        color: '#5DD0A7',
        unAssigendSites: [],
        disable: true,
      };
    }

    return {
      status: 'pending',
      label: 'Pending',
      color: '#FEC260',
      unAssigendSites,
      disable: false,
    };
  }, [tasks, getUnassignedSites]);

  const toggleModuleSelection = useCallback((module: IModules) => {
    setSelectedModules((prevModules) => {
      if (prevModules.some((m) => m.id === module.id)) {
        return prevModules.filter((m) => m.id !== module.id);
      }
      const moduleWithUnassignedQuestions = {
        ...module,
        indicators: module.indicators.map((indicator) => ({
          ...indicator,
          question_sequence: indicator.question_sequence.filter(
            (question) => !getQuestionAssigned(question.id).disable,
          ),
        })),
      };
      return [...prevModules, moduleWithUnassignedQuestions];
    });
  }, [getQuestionAssigned]);

  const toggleIndicatorSelection = useCallback((
    indicator: IIndicators,
    moduleId: string,
  ) => {
    setSelectedModules((prev) => prev.map((mod) => {
      if (mod.id !== moduleId) return mod;
      const isSelected = mod.indicators.some((ind) => ind.id === indicator.id);
      if (isSelected) {
        return {
          ...mod,
          indicators: mod.indicators.filter((ind) => ind.id !== indicator.id),
        };
      }

      const indicatorWithUnassignedQuestions = {
        ...indicator,
        question_sequence: indicator.question_sequence.filter(
          (question) => !getQuestionAssigned(question.id).disable,
        ),
      };

      return {
        ...mod,
        indicators: [...mod.indicators, indicatorWithUnassignedQuestions],
      };
    }));
  }, [getQuestionAssigned]);

  const toggleQuestionSelection = useCallback((
    moduleId: string,
    indicator: IIndicators,
    question: IQuestionSequences,
  ) => {
    setSelectedModules((prev) => prev.map((mod) => {
      if (mod.id !== moduleId) return mod;
      return {
        ...mod,
        indicators: mod.indicators.map((ind) => {
          if (ind.id !== indicator.id) return ind;
          const isSelected = ind.question_sequence.some((q) => q.id === question.id);
          if (!isSelected && getQuestionAssigned(question.id).disable) {
            return ind;
          }

          return {
            ...ind,
            question_sequence: isSelected
              ? ind.question_sequence.filter((q) => q.id !== question.id)
              : [...ind.question_sequence, question],
          };
        }),
      };
    }));
  }, [getQuestionAssigned]);

  const toggleSelectAll = useCallback(() => {
    if (isAllModulesSelected) {
      setSelectedModules([]);
    } else {
      const unassignedModules = modules.filter((module) => {
        const hasAssignedIndicators = module.indicators.some(
          (indicator) => getIndicatorAssigned(indicator).disable,
        );
        const hasAssignedQuestions = module.indicators.some(
          (indicator) => indicator.question_sequence.some(
            (question) => getQuestionAssigned(question.id).disable,
          ),
        );
        return !getModulesAssigned(
          module,
        ).disable && !hasAssignedIndicators && !hasAssignedQuestions;
      });
      setSelectedModules(unassignedModules);
    }
  }, [
    isAllModulesSelected,
    modules,
    getModulesAssigned,
    getIndicatorAssigned,
    getQuestionAssigned,
  ]);

  return {
    selectedModules,
    setSelectedModules,
    selectedModuleIds,
    isAllModulesSelected,
    filteredModules,
    getModulesAssigned,
    getIndicatorAssigned,
    getQuestionAssigned,
    toggleModuleSelection,
    toggleIndicatorSelection,
    toggleQuestionSelection,
    toggleSelectAll,
  };
};
