/* eslint-disable no-unused-vars */
/* eslint @typescript-eslint/no-unused-vars: off */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/no-use-before-define */
/* eslint jsx-a11y/click-events-have-key-events: off */
/* eslint-disable no-underscore-dangle */
/* eslint-disable react/no-array-index-key */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint no-shadow: off */
/* eslint-disable no-nested-ternary */
/* eslint-disable no-unused-expressions */
/* eslint-disable brace-style */

'use client';

import React, {
  useState, useEffect, useMemo, useCallback,
} from 'react';
// import PageHeaderWrapper from '../PageHeaderWrapper/PageHeaderWrapper';
import './CustomDashboard.css';
import Select from 'react-select';
import { CustomStyles } from '@/components/CustomStyles/CustomStyles';
import { Params } from '@/lib/utils';
import {
  MdOutlineAdd,
  MdOutlineKeyboardDoubleArrowRight,
  MdDeleteOutline,
  MdCancel,
} from 'react-icons/md';
import { IoMdAdd, IoMdCard } from 'react-icons/io';
import Image from 'next/image';
import createDashboardImage from '@/assests/create_dashboard.png';
import {
  FiSave,
  FiTrash2,
  FiDownload,
  FiChevronRight,
  FiChevronDown,
  FiMaximize2,
} from 'react-icons/fi';
import { PencilSimpleLine, MathOperations } from 'phosphor-react';
// import AnalyticsChart from '../Charts/Chart';

// chart filters option
import pieChartIcon from '@/assests/filter-options/pie-chart.png';
import barChartIcon from '@/assests/filter-options/bar-chart.png';
import lineChartIcon from '@/assests/filter-options/line-chart.png';
import areaChartIcon from '@/assests/filter-options/area-chart.png';
import donutChartIcon from '@/assests/filter-options/donut-chart.png';
import scatterPlotIcon from '@/assests/filter-options/scatter-plot-chart.png';
import comboChartIcon from '@/assests/filter-options/combo-chart.png';
import card from '@/assests/filter-options/card.png';
import arrowIcon from '@/assests/filter-options/arrow.png';
import undoButton from '@/assests/filter-options/phosphor-icons/ArrowUUpLeft.png';
import redoButton from '@/assests/filter-options/phosphor-icons/ArrowUUpRight.png';
import refreshButton from '@/assests/filter-options/phosphor-icons/ArrowClockwise.png';
import dashboardCreateImage from '@/assests/Charts-drag-drop.png';
import maximizeIcon from '@/assests/maximizeIcon.png';
import xIcon from '@/assests/xIcon.png';
import vectorIcon from '@/assests/Vector.png';
import { customDashboardChart, DataCube } from '@/lib/service';
import { redirect, useParams } from 'next/navigation';
import { X } from 'lucide-react';
import { auth } from '@/lib/auth';

import { createPortal } from 'react-dom';
import { TbArrowBigLeftLines } from 'react-icons/tb';
import { BiSolidEdit } from 'react-icons/bi';

import { IoSearch } from 'react-icons/io5';

import toast from 'react-hot-toast';
import { BreadCrumbProps } from '../types';
import Chart from '../Charts/Chart';
import { CustomFormulaModal } from './CustomFormula';
import { DeleteModal } from './PopupModal';
import { TextField } from '../ResponseInputFields/TextField';
import { Button } from '../Button/Button';
import AnalyticsChart from '../Charts/AnalyticsChart';
import Search from '../Search/Search';
import AnalyticsDataCard from '../Cards/AnalyticsDataCard';
// import html2pdf from "html2pdf.js";

interface DashboardItem {
  dashboardName: string;
}

interface ChartItem {
  chartName: string;
}

type QuestionItem = {
  label: string;
  value: string;
};

type Legend = {
  id: string;
  title: string;
  macro_function: string;
  questions: (string | QuestionItem)[];
};

type Label = {
  id: string;
  title: string;
  legends: Legend[];
};

type ChartState = {
  labels: Label[];
  chartTitle: string;
};

export default function CustomDashboard() {
  const params = useParams();
  // if (!session) {
  //   return redirect('/sign_in');
  // }
  // const token = (session?.user as { accessToken: string })?.accessToken;
  // const apiKey = (session?.user as unknown as { apiKey: string })?.apiKey;
  const [activeView, setActiveView] = useState<'dashboard' | 'chart'>(
    'dashboard',
  );
  const [dashboards, showDashboards] = useState<boolean>(true);

  const [dashOpen, setDashOpen] = useState<boolean>(false);
  const [openMyCharts, setOpenMyCharts] = useState(false);
  const [openCharts, setOpenCharts] = useState(true);
  const [openDefaultCharts, setOpenDefaultCharts] = useState(false);
  const [openNewChart, setOpenNewChart] = useState(true);

  const [charts, showCharts] = useState<boolean>(false);
  const [isCreatingDashboard, setIsCreatingDashboard] = useState<boolean>(true);
  const [chartType, setChartType] = useState<string>('bar');
  const [showMoreOptions, setShowMoreOptions] = useState<boolean>(false);
  const [activeDashboardTab, setActiveDashboardTab] = useState<
    'myDashboards' | 'defaultCharts'
  >('myDashboards');
  const [activeChartTab, setActiveChartTab] = useState<
    'myCharts' | 'defaultCharts' | 'newChart'
  >('myCharts');

  const [myChartList, setMyChartList] = useState<any[]>([]);

  const [dashboardList, setDashboardList] = useState<any[]>([]);
  const [selectedDefaultCharts, setSelectedDefaultCharts] = useState<any[]>([]);
  const [selectedMyCharts, setSelectedMyCharts] = useState<any[]>([]);

  const [droppedCharts, setDroppedCharts] = useState<any[]>([]);

  const [activeDashboardIndex, setActiveDashboardIndex] = useState(0);

  const [searchMyChart, setSearchMyChart] = useState('');
  const [searchDefaultChart, setSearchDefaultChart] = useState('');

  const [isEditMyCharts, setIsEditMyCharts] = useState<boolean>(false);
  const [showChartDelete, setShowChartDelete] = useState<boolean>(false);
  const [showChartEdit, setShowChartEdit] = useState<boolean>(false);
  const [activeMyChartsId, setActiveMyChartsId] = useState<string>('');

  const [activeMyDashboardId, setActiveMyDashboardId] = useState<string>('');
  const [isEditMyDashboard, setIsEditMyDashboard] = useState<boolean>(false);
  const [showDashboardDelete, setshowDashboardDelete] = useState<boolean>(false);
  const [showDashboardEdit, setshowDashboardEdit] = useState<boolean>(false);

  const [newDashboardName, setNewDashboardName] = useState<string>('');

  const [expandedCharts, setExpandedCharts] = useState<Set<string>>(new Set());

  const [modulesList, setModulesList] = useState<any[]>([]);
  const [moduleSelected, setModuleSelected] = useState<string | null>(null);

  const [indicatorsList, setIndicatorsList] = useState<any[]>([]);
  const [indicatorSelected, setIndicatorSelected] = useState<string | null>(
    null,
  );

  const [subIndicatorList, setSubIndicatorList] = useState<any[]>([]);
  const [subIndicatorSelected, setSubIndicatorSelected] = useState<
    string | null
  >(null);

  const [questionsList, setQuestionsList] = useState<any[]>([]);
  const [standardQuestionsList, setstandardQuestionsList] = useState<any[]>([]);

  const [modulesData, setModulesData] = useState<any[]>([]);

  const [allQuestionsList, setAllQuestionsList] = useState<any[]>([]);

  // 🧩 State
  // ⭐ Move this OUTSIDE the component
  // ⭐ labels: runs only once
  const [chartState, setChartState] = useState<ChartState>({
    labels: [
      {
        id: crypto.randomUUID(),
        title: '',
        legends: [
          {
            id: crypto.randomUUID(),
            title: '',
            questions: [],
            macro_function: '',
          },
        ],
      },
    ],
    chartTitle: '',
  });

  const [undoStack, setUndoStack] = useState<ChartState[]>([]);
  const [redoStack, setRedoStack] = useState<ChartState[]>([]);

  // Function to update labels
  const updateChartState = (newState: ChartState) => {
    setUndoStack([...undoStack, chartState]); // save current state
    setChartState(newState);
    setRedoStack([]); // clear redo stack
  };

  // Undo
  const undo = () => {
    if (!undoStack.length) return;
    const previous = undoStack[undoStack.length - 1];
    setUndoStack(undoStack.slice(0, -1));
    setRedoStack([...redoStack, chartState]);
    setChartState(previous);
  };

  const redo = () => {
    if (!redoStack.length) return;
    const next = redoStack[redoStack.length - 1];
    setRedoStack(redoStack.slice(0, -1));
    setUndoStack([...undoStack, chartState]);
    setChartState(next);
  };

  // Chart title
  const handleChartTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateChartState({ ...chartState, chartTitle: e.target.value });
  };

  // Label title
  const changeLabelTitle = (id: string, title: string) => {
    const newLabels = chartState.labels.map((label) => (label.id === id ? { ...label, title } : label));
    updateChartState({ ...chartState, labels: newLabels });
  };

  // ⭐ activeLabelId: use the same initial label
  const [activeLabelId, setActiveLabelId] = useState<string | null>(
    chartState.labels[0]?.id,
  );
  const [activeLegendId, setActiveLegendId] = useState<string | null>(
    chartState.labels[0]?.legends[0]?.id,
  );
  const [customFormulaOpen, setCustomFormulaOpen] = useState(false);

  const [searchDashboard, setSearchDashboard] = useState('');
  // dashboard
  // Loaders for charts and dashboards (try API first, fallback to localStorage)
  const loadDefaultChartList = useCallback(async () => {
    try {
      if (
        customDashboardChart
        && typeof (customDashboardChart as any).getWidgetChartList === 'function'
      ) {
        const widgetRes = await (
          customDashboardChart as any
        ).getWidgetChartList(params?.subdomain);
        const dashboardRes = await (
          customDashboardChart as any
        ).getDashboardChartList(params?.subdomain);

        const widgetData = widgetRes?.data?.data ?? widgetRes?.data ?? widgetRes ?? [];
        const dashboardData = dashboardRes?.data?.data ?? dashboardRes?.data ?? dashboardRes ?? [];

        const combinedData = [
          ...(Array.isArray(widgetData) ? widgetData : []),
          ...(Array.isArray(dashboardData) ? dashboardData : []),
        ];

        setCombinedDefautChartList(combinedData);
        return;
      }

      if (typeof window !== 'undefined') {
        const saved = localStorage.getItem('chartList');
        setCombinedDefautChartList(saved ? JSON.parse(saved) : []);
      } else {
        setCombinedDefautChartList([]);
      }
    } catch (err) {
      console.error('❌ loadChartList error', err);
      setCombinedDefautChartList([]);
    }
  }, [customDashboardChart, params?.subdomain]);

  const loadMyChartList = async () => {
    try {
      if (
        customDashboardChart
        && typeof (customDashboardChart as any).getWidgetChartList === 'function'
      ) {
        const res = await customDashboardChart.getMyChartList(
          params?.subdomain as string,
        );
        const data = res?.data?.data ?? res?.data ?? res;

        setMyChartList(Array.isArray(data) ? data : []);

        if (Array.isArray(data) && data.length > 0 && activeMyChartsId) {
          const selectedChart = data.find(
            (item: any) => String(item.id) === String(activeMyChartsId),
          );

          setChartType(selectedChart?.chart_type);
          if (selectedChart) {
            const transformedLabels = selectedChart.customItems?.flatMap((customItem: any) => {
              const allCustomParams = customItem?.combinedParameters?.flatMap(
                (combo: any) => combo?.customParameters || [],
              ) || [];

              const labelMap: Record<string, any> = {};

              allCustomParams.forEach((param: any) => {
                const labelName = param.label?.[0] ?? '';

                if (!labelMap[labelName]) {
                  labelMap[labelName] = {
                    id: crypto.randomUUID(),
                    title: labelName,
                    legends: [],
                  };
                }

                labelMap[labelName].legends.push({
                  id: String(param.id),
                  title: param.legends?.[0] || '',
                  questions: param.questions || [],
                  macro_function: param.macro_function || '',
                  custom_parameter_id: param.id,
                });
              });

              return Object.values(labelMap);
            }) || [];

            updateChartState({
              ...chartState,
              labels: transformedLabels,
              chartTitle: selectedChart?.customItems?.[0]?.title || '',
            });
          }
        }
      }
    } catch (err) {
      console.error('loadChartList error', err);
      setMyChartList([]);
    }
  };

  useEffect(() => {
    if (activeMyChartsId) {
      loadMyChartList();
    }
  }, [activeMyChartsId]);

  // dashboard
  const loadDashboardList = useCallback(async () => {
    try {
      let list: any[] = [];

      if (
        customDashboardChart
        && typeof (customDashboardChart as any).getDashboardList === 'function'
      ) {
        const res = await (customDashboardChart as any).getDashboardList(
          params?.subdomain,
        );

        const data = res?.data?.data ?? res?.data ?? res;
        list = Array.isArray(data) ? data : [];
        setDashboardList(list);
        return list;
      }

      if (typeof window !== 'undefined') {
        const saved = localStorage.getItem('dashboardList');
        list = saved ? JSON.parse(saved) : [];
        setDashboardList(list);
        return list;
      }

      setDashboardList([]);
      return [];
    } catch (err) {
      console.error('loadDashboardList error', err);
      setDashboardList([]);
      return [];
    }
  }, [customDashboardChart, params?.subdomain]);

  // 🧠 Filter only defaultDashboardList based on search term
  const filteredDashboards = useMemo(() => {
    if (!searchDashboard.trim()) return dashboardList;

    return dashboardList?.filter((dashboard: any) => getChartTitle(dashboard)
      ?.toLowerCase()
      ?.includes(searchDashboard.toLowerCase()));
  }, [searchDashboard, dashboardList]);

  const loadDashboardToGrid = useCallback(
    (dashboard: any) => {
      if (!dashboard) return;

      try {
        setLoadedDashboard(dashboard);

        const droppedStructure: any[] = [];
        const expanded = new Set<string>(); // ✅ Set to track expanded charts

        (dashboard.blocks || [])
          .sort((a: any, b: any) => (a.sequence ?? 0) - (b.sequence ?? 0))
          .forEach((block: any) => {
            const isSingleColumn = (block.columns?.length ?? 0) === 1; // ✅ check single-column block

            (block.columns || [])
              .sort((a: any, b: any) => (a.sequence ?? 0) - (b.sequence ?? 0))
              .forEach((col: any) => {
                const typeObj = col.types?.[0]; // only take the first type
                if (!typeObj) return;

                const widgetObj = typeObj.widget_type_obj
                  || typeObj.customType
                  || typeObj.dashboard_type_obj;

                if (widgetObj) {
                  droppedStructure.push({
                    ...widgetObj,
                    id: typeObj.id,
                  });

                  // ✅ If single-column block, mark this chart as expanded
                  if (isSingleColumn) {
                    expanded.add(String(typeObj.id));
                  }
                }
              });
          });

        setDroppedCharts(droppedStructure);
        setExpandedCharts(expanded); // ✅ set expanded charts
        setNewDashboardName(dashboard?.name || 'Untitled Dashboard');
      } catch (error) {
        console.error('❌ Error loading dashboard to grid:', error);
      }
    },
    [showDashboards, showCharts, setActiveView],
  );

  useEffect(() => {
    loadDefaultChartList();
    loadDashboardList();
    loadMyChartList();
  }, []);

  const getModules = useCallback(async () => {
    try {
      const res = await DataCube.getModuleList();
      const { success, data } = res?.data || {};

      if (success && Array.isArray(data)) {
        setModulesData(data);

        setModulesList(
          data.map((module) => ({
            label: module.name,
            value: module.id,
          })),
        );
      }
    } catch (error) {
      console.error('Error fetching modules:', error);
    }
  }, []);

  useEffect(() => {
    getModules();
  }, []);

  // 🟢 Watch for moduleSelected changes
  useEffect(() => {
    if (moduleSelected) {
      // Find the full module object from modulesData
      const selectedModule = modulesData.find(
        (m: any) => m.id === moduleSelected,
      );

      if (selectedModule && selectedModule.indicators?.length) {
        const formattedIndicators = selectedModule.indicators.map(
          (indicator: any) => ({
            label: indicator.name,
            value: indicator.id,
          }),
        );
        setIndicatorsList(formattedIndicators);
        setIndicatorSelected(null); // reset indicator selection
      } else {
        setIndicatorsList([]);
        setIndicatorSelected(null);
      }
    } else {
      setIndicatorsList([]);
      setIndicatorSelected(null);
    }
  }, [moduleSelected, modulesData]);

  // 🟢 Watch for indicatorSelected changes
  useEffect(() => {
    if (indicatorSelected) {
      const selectedModule = modulesData.find((m) => m.id === moduleSelected);
      const selectedIndicator = selectedModule?.indicators?.find(
        (ind: any) => ind.id === indicatorSelected,
      );

      if (selectedIndicator) {
        // 🧩 Extract all questions
        const allQuestions = selectedIndicator.standard_question.map(
          (q: any) => ({
            label: q.title,
            value: q.universal_question_id,
          }),
        );

        setAllQuestionsList(allQuestions); // ✅ Store all questions (unfiltered)

        // 🧩 Extract sub-indicators
        const subIndicators = Array.from(
          new Map(
            selectedIndicator.standard_question
              .filter((q: any) => q.sub_indicator_id)
              .map((q: any) => [
                q.sub_indicator_id.id,
                {
                  label: q.sub_indicator_id.name,
                  value: q.sub_indicator_id.id,
                },
              ]),
          ).values(),
        );

        // ✅ Handle case with no sub-indicators
        if (subIndicators.length === 0) {
          setSubIndicatorList([
            { label: 'No Sub-Indicator', value: 'no-sub-indicator' },
          ]);
          setSubIndicatorSelected('no-sub-indicator');
        } else {
          setSubIndicatorList(subIndicators);
          setSubIndicatorSelected(null);
        }

        setQuestionsList([]); // reset filtered questions
      }
    } else {
      setSubIndicatorList([]);
      setSubIndicatorSelected(null);
      setQuestionsList([]);
      setAllQuestionsList([]); // ✅ reset here too
    }
  }, [indicatorSelected, moduleSelected, modulesData]);

  // 🧠 Second useEffect - load questions (with “No Sub-Indicator” fallback)
  useEffect(() => {
    if (indicatorSelected && subIndicatorSelected) {
      const selectedModule = modulesData.find((m) => m.id === moduleSelected);
      const selectedIndicator = selectedModule?.indicators?.find(
        (ind: any) => ind.id === indicatorSelected,
      );

      if (selectedIndicator) {
        let filteredQuestions = [];

        if (subIndicatorSelected === 'no-sub-indicator') {
          // ✅ Case: Indicator has no sub-indicators — take all questions
          filteredQuestions = selectedIndicator.standard_question;
        } else {
          // ✅ Case: Normal filtering by sub-indicator
          filteredQuestions = selectedIndicator.standard_question.filter(
            (q: any) => q.sub_indicator_id?.id === subIndicatorSelected,
          );
        }

        // ✅ Keep only "NUMBER" type questions
        filteredQuestions = filteredQuestions.filter(
          (q: any) => q.question_type === 'NUMBER' || q.question_type === 'MIXED_TYPE',
        );

        // ✅ Remove duplicates by title
        const uniqueQuestions = Array.from(
          new Map(
            filteredQuestions.map((q: any) => [
              q.title.trim(),
              { label: q.title, value: q.universal_question_id },
            ]),
          ).values(),
        );

        setQuestionsList(uniqueQuestions);
      }
    } else {
      setQuestionsList([]);
    }
  }, [indicatorSelected, subIndicatorSelected, moduleSelected, modulesData]);

  useEffect(() => {
    const fetchStandardQuestions = async () => {
      try {
        const res = await customDashboardChart.getStandardQuestions();
        const data = Array.isArray(res?.data?.data) ? res.data.data : [];
        setstandardQuestionsList(data);
      } catch (error) {
        console.error('Failed to load standard questions:', error);
      }
    };

    fetchStandardQuestions();
  }, []);

  const activeLabel = chartState.labels.find((l) => l.id === activeLabelId)
    || chartState.labels[0]
    || null;

  const activeLegend = activeLabel?.legends.find((lg) => lg.id === activeLegendId)
    || activeLabel?.legends?.[0]
    || null;

  const sQuestions = standardQuestionsList.map((q) => ({
    label: q.title,
    value: q.universal_question_id,
  }));

  const customFormulaQuestions = sQuestions.filter((q: any) => activeLegend?.questions?.some(
    (lq: any) => lq === q.value || lq.value === q.value,
  ));

  // Add new label
  const handleAddNewLabel = () => {
    const newLabelId = crypto.randomUUID();
    const lastLabel = chartState.labels[chartState.labels.length - 1];

    const newLabel: Label = {
      id: newLabelId,
      title: '', // New label title is empty
      legends: lastLabel
        ? lastLabel.legends.map((legend) => ({
          id: crypto.randomUUID(), // fresh legend ID
          title: legend.title || '', // copy only the legend title
          questions: [], // start with empty questions
          macro_function: '', // keep macro if needed
        }))
        : [
          {
            id: crypto.randomUUID(),
            title: '',
            questions: [],
            macro_function: '',
          },
        ],
    };

    updateChartState({
      ...chartState,
      labels: [...chartState.labels, newLabel],
    });

    // Activate the newly created label
    setActiveLabelId(newLabelId);
  };

  // Label Title change
  const handleLabelTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;

    const updatedLabels = chartState.labels.map((label) => (label.id === activeLabelId ? { ...label, title: newValue } : label));

    updateChartState({
      ...chartState,
      labels: updatedLabels,
    });
  };

  // Add new legend
  const handleAddNewLegend = () => {
    if (!activeLabelId) return;

    const newLegendId = crypto.randomUUID();
    const nextLabels = chartState.labels.map((label) => (label.id === activeLabelId
      ? {
        ...label,
        legends: [
          ...label.legends,
          {
            id: newLegendId,
            title: '',
            questions: [],
            macro_function: '',
          },
        ],
      }
      : label));

    updateChartState({ ...chartState, labels: nextLabels });
    setActiveLegendId(newLegendId);
  };

  // remove legend
  const handleRemoveLegend = (labelId: string, legendId: string) => {
    const nextLabels = chartState.labels.map((label) => {
      if (label.id !== labelId) return label;
      if (label.legends.length === 1) return label;
      return {
        ...label,
        legends: label.legends.filter((lg) => lg.id !== legendId),
      };
    });

    updateChartState({ ...chartState, labels: nextLabels });

    if (activeLegendId === legendId) setActiveLegendId(null);
  };

  // legend title change
  const handleLegendTitleChange = (
    labelId: string,
    legendId: string,
    newTitle: string,
  ) => {
    const nextLabels = chartState.labels.map((label) => (label.id === labelId
      ? {
        ...label,
        legends: label.legends.map((lg) => (lg.id === legendId ? { ...lg, title: newTitle } : lg)),
      }
      : label));

    updateChartState({ ...chartState, labels: nextLabels });
  };

  // legend delete API
  const handleDeleteLegend = async (chartId: string, customId: string) => {
    const tenantId = params?.subdomain as string;

    try {
      await customDashboardChart.deleteCustomParameter(
        tenantId,
        chartId,
        customId,
      );

      const nextLabels = chartState.labels.map((label) => (label.legends.some((lg) => lg.id === customId)
        ? {
          ...label,
          legends: label.legends.filter((lg) => lg.id !== customId),
        }
        : label));

      updateChartState({ ...chartState, labels: nextLabels });

      if (activeLegendId === customId) setActiveLegendId(null);
    } catch (error) {
      console.error('Failed to delete legend:', error);
    }
  };

  /* ===== DRAG & DROP QUESTIONS ===== */
  const handleDragStart = (e: React.DragEvent, question: any) => {
    e.dataTransfer.setData('question', JSON.stringify(question));
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  // charts drop
  const handleDrop = (e: React.DragEvent, legendId: string) => {
    e.preventDefault();
    if (!activeLabel) return;

    const question = JSON.parse(e.dataTransfer.getData('question'));

    const nextLabels = chartState.labels.map((label) => (label.id === activeLabelId
      ? {
        ...label,
        legends: label.legends.map((lg) => (lg.id === legendId
          ? {
            ...lg,
            questions: lg.questions.includes(question.value)
              ? lg.questions
              : [...lg.questions, question.value],
          }
          : lg)),
      }
      : label));

    updateChartState({ ...chartState, labels: nextLabels });
  };

  // remove dropped questions
  const handleRemoveQuestion = (
    labelId: string,
    legendId: string,
    questionValue: string,
  ) => {
    const nextLabels = chartState.labels.map((label) => (label.id === labelId
      ? {
        ...label,
        legends: label.legends.map((lg) => (lg.id === legendId
          ? {
            ...lg,
            questions: lg.questions.filter((q) => {
              if (typeof q === 'object' && q !== null) {
                return q.value !== questionValue;
              }
              return q !== questionValue;
            }),
          }
          : lg)),
      }
      : label));

    updateChartState({ ...chartState, labels: nextLabels });
  };
  /* ===== UTILITY: Normalize Questions ===== */
  const normalizeQuestions = (questions: any[]): string[] => questions.map((q) => (typeof q === 'string' ? q : q?.id || ''));

  /* ===== BUILD PAYLOAD FOR SAVE ===== */
  const buildChartPayload = () => {
    const { labels, chartTitle } = chartState;

    // CARD chart type
    if (chartType === 'card') {
      const cardLabel = labels[0];
      const cardLegend = cardLabel?.legends[0];

      return {
        type: 'card',
        chart_type: chartType,
        is_stacked: false,
        is_horizontal: false,
        is_metric: false,
        is_time_series: false,
        custom_items: [
          {
            title: chartTitle,
            combined_parameters: [
              {
                sequence: 0,
                custom_parameters: [
                  {
                    sequence: 0,
                    questions: normalizeQuestions(cardLegend?.questions || []),
                    universal_questions: normalizeQuestions(
                      cardLegend?.questions || [],
                    ),
                    macro_function: cardLegend?.macro_function || '',
                    unit: '',
                    legends: [cardLegend?.title || ''],
                    label: [cardLabel?.title || ''],
                    custom_item_id: `custom_${Date.now()}`,
                  },
                ],
              },
            ],
          },
        ],
      };
    }

    // Other chart types
    const allCustomParameters = labels.flatMap((label) => label.legends.map((legend, idx) => ({
      sequence: idx,
      questions: normalizeQuestions(legend.questions),
      universal_questions: normalizeQuestions(legend.questions),
      macro_function: legend.macro_function,
      unit: '',
      legends: [legend.title],
      label: [label.title],
      custom_item_id: `custom_${Date.now()}_${idx}`,
    })));

    return {
      type: 'chart',
      chart_type: chartType,
      is_stacked: false,
      is_horizontal: false,
      is_metric: false,
      is_time_series: false,
      custom_items: [
        {
          title: chartTitle,
          combined_parameters: [
            {
              sequence: 0,
              custom_parameters: allCustomParameters,
            },
          ],
        },
      ],
    };
  };

  /* ===== SAVE CHART ===== */
  const handleSaveChart = async () => {
    const tenantId = params?.subdomain as string;

    try {
      if (!chartState.chartTitle.trim()) {
        toast.error('Please Enter a Chart Title');
        return;
      }

      if (!chartType) {
        toast.error('Please Select a Chart Type');
        return;
      }

      const payload = buildChartPayload();

      // Call your API
      const res = await customDashboardChart.createCharts(tenantId, payload);
      if (res?.data?.success) {
        toast.success('Chart Saved Successfully');
        const newLabelId = crypto.randomUUID();
        const newLegendId = crypto.randomUUID();
        setActiveLabelId(newLabelId);
        setActiveLegendId(newLegendId);

        setChartState({
          labels: [
            {
              id: newLabelId,
              title: '',
              legends: [
                {
                  id: newLegendId,
                  title: '',
                  questions: [],
                  macro_function: '',
                },
              ],
            },
          ],
          chartTitle: '',
        });
        setChartType('');
        setModuleSelected(null);
        setQuestionsList([]);
        loadMyChartList();
      }
      // Reset UI
    } catch (error) {
      console.error('❌ Error creating chart:', error);
      toast.error('Failed to create chart. Please try again.');
    }
  };

  /* ===== BUILD PAYLOAD FOR EDIT ===== */
  const buildEditChartPayload = (activeMyChart: any) => {
    if (!activeMyChart) return null;

    const { labels, chartTitle } = chartState;
    const isCard = activeMyChart.type === 'card';

    if (isCard) {
      const cardLabel = labels[0];
      const cardLegend = cardLabel.legends[0];

      return {
        type: activeMyChart.type,
        chart_type: activeMyChart.chart_type,
        is_stacked: activeMyChart.is_stacked,
        is_horizontal: activeMyChart.is_horizontal,
        is_metric: activeMyChart.is_metric,
        is_time_series: activeMyChart.is_time_series,
        custom_items: [
          {
            id: activeMyChart.customItems[0].id,
            title: chartTitle,
            combined_parameters: [
              {
                id: activeMyChart.customItems[0].combinedParameters[0].id,
                sequence: 0,
                custom_parameters: [
                  {
                    id: activeMyChart.customItems[0].combinedParameters[0]
                      .customParameters[0].id,
                    sequence: 0,
                    questions: normalizeQuestions(cardLegend.questions),
                    universal_questions: normalizeQuestions(
                      cardLegend.questions,
                    ),
                    macro_function: cardLegend.macro_function,
                    unit: '',
                    legends: [cardLegend.title],
                    label: [cardLabel.title],
                  },
                ],
              },
            ],
          },
        ],
      };
    }

    // MULTI-LEGEND chart
    const existingItem = activeMyChart.customItems[0];
    const existingCP = existingItem.combinedParameters[0];

    const updatedCustomParameters = labels.flatMap((label) => label.legends.map((legend, idx) => ({
      id: legend.id,
      sequence: idx,
      questions: normalizeQuestions(legend.questions),
      universal_questions: normalizeQuestions(legend.questions),
      macro_function: legend.macro_function,
      unit: '',
      legends: [legend.title],
      label: [label.title],
    })));

    return {
      type: activeMyChart.type,
      chart_type: chartType,
      is_stacked: activeMyChart.is_stacked,
      is_horizontal: activeMyChart.is_horizontal,
      is_metric: activeMyChart.is_metric,
      is_time_series: activeMyChart.is_time_series,
      custom_items: [
        {
          id: existingItem.id,
          title: chartTitle,
          combined_parameters: [
            {
              id: existingCP.id,
              sequence: 0,
              custom_parameters: updatedCustomParameters,
            },
          ],
        },
      ],
    };
  };

  /* ===== EDIT CHART ===== */
  const handleEditChart = async (activeMyChart: any) => {
    try {
      const tenantId = Array.isArray(params?.subdomain)
        ? params.subdomain[0]
        : params?.subdomain || '';

      const payload = buildEditChartPayload(activeMyChart);

      if (!payload) {
        return;
      }

      await customDashboardChart.updateCharts(
        tenantId,
        String(activeMyChart.id),
        payload,
      );

      // Reset UI
      setModuleSelected(null);
      setQuestionsList([]);
      loadMyChartList();
    } catch (error) {
      console.error('❌ Failed to update chart', error);
    }
  };

  const [loadedDashboard, setLoadedDashboard] = useState<any | null>(null);

  const btnTextClass = 'd-flex align-items-center gap-2 justify-content-center fw-600 fs-14';
  const btnChartClass = 'd-flex align-items-center gap-2 justify-content-between fw-600 fs-14';

  const [combinedDefaultChartList, setCombinedDefautChartList] = useState<
    any[]
  >([]);

  // dashboard
  const getChartTitle = (item: any): string => item?.title
    ?? item?.name
    ?? item?.widget_item?.[0]?.title
    ?? item?.dashboard_items?.[0]?.title
    ?? item?.customItems?.[0]?.title
    ?? item?.chartName
    ?? 'Chart';

  // 🧠 Filter for Default Charts
  const filteredDefaultCharts = useMemo(() => {
    if (!searchDefaultChart.trim()) return combinedDefaultChartList;
    return combinedDefaultChartList.filter((chart: any) => (chart.chartName ?? chart.name ?? getChartTitle(chart))
      ?.toLowerCase()
      .includes(searchDefaultChart.toLowerCase()));
  }, [searchDefaultChart, combinedDefaultChartList]);

  // 🧠 Filter for My Charts
  const filteredMyCharts = useMemo(() => {
    if (!searchMyChart.trim()) return myChartList;
    return myChartList.filter((chart: any) => (chart?.customItems?.[0]?.title ?? chart.chartName ?? chart.name)
      ?.toLowerCase()
      .includes(searchMyChart.toLowerCase()));
  }, [searchMyChart, myChartList]);

  // dashboard
  const getChartId = (item: any): string => String(
    item?.id
        ?? item?.customItems?.[0]?.id
        ?? item?.widget_item?.[0]?.id
        ?? item?.dashboard_items?.[0]?.id
        ?? item?.widget_item?.[0]?.widget_id
        ?? item?.chartId
        ?? item?.chart_id
        ?? item?._localId,
  );

  // dashboard
  const getTypeIds = (item: any) => {
    if (!item) return {};

    // Case 1: from myCharts → custom_type_id
    if (item._source === 'myCharts' && item.custom_type_id) {
      return { custom_type_id: item.custom_type_id };
    }

    // Case 2: from defaultCharts → widget_type_id or dashboard_type_id
    if (item._source === 'defaultCharts') {
      if (Array.isArray(item.widget_item) && item.widget_item.length > 0) {
        return { widget_type_id: item.widget_type_id || item.id };
      }
      if (
        Array.isArray(item.dashboard_items)
        && item.dashboard_items.length > 0
      ) {
        return { dashboard_type_id: item.dashboard_type_id || item.id };
      }
    }

    return {};
  };

  // dashboard
  const onDragStartDefaultChart = (
    e: React.DragEvent<HTMLButtonElement>,
    item: any,
  ) => {
    e.dataTransfer.setData(
      'application/json',
      JSON.stringify({ source: 'defaultCharts', item }),
    );
  };

  // dashboard
  // allow dragging from "My Charts" as well
  const onDragStartMyChart = (
    e: React.DragEvent<HTMLButtonElement>,
    item: any,
  ) => {
    e.dataTransfer.setData(
      'application/json',
      JSON.stringify({ source: 'myCharts', item }),
    );
  };

  // Drop charts to create dashboard
  const onDropToGrid = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();

    try {
      const dataStr = e.dataTransfer.getData('application/json');
      if (!dataStr) return;

      const { source, item: sourceItem } = JSON.parse(dataStr);
      if (!sourceItem) return;

      const id = getChartId(sourceItem)
        ?? `local_${Date.now()}_${Math.random().toString(36).slice(2)}`;

      // Deep clone
      let item = JSON.parse(JSON.stringify(sourceItem));
      delete item._source;

      if (!getChartId(item)) item._localId = id;

      // --- 🟦 DEFAULT CHARTS HANDLING ---
      if (source === 'defaultCharts') {
        item._source = 'defaultCharts';

        if (Array.isArray(item.widget_item) && item.widget_item.length > 0) {
          // ✅ Widget charts
          item.widget_type_id = item.id;
          delete item.id;

          item.widget_item = item.widget_item.map((wItem: any) => ({
            ...wItem,
            title: wItem.title || 'Untitled',
          }));

          delete item.customItems;
          delete item.dashboard_items;
        }

        // ✅ Dashboard charts (your case)
        else if (
          Array.isArray(item.dashboard_items)
          && item.dashboard_items.length > 0
        ) {
          item.dashboard_type_id = item.id;
          delete item.id;

          item.dashboard_items = item.dashboard_items.map((dItem: any) => ({
            ...dItem,
            title: dItem.title || 'Untitled',
            dashboard_combined_parameters: Array.isArray(
              dItem.dashboard_combined_parameters,
            )
              ? dItem.dashboard_combined_parameters
              : [],
          }));

          delete item.customItems;
          delete item.widget_item;
        }
      }

      // --- 🟩 MY CHARTS HANDLING ---
      else if (source === 'myCharts') {
        const firstCustom = item?.customItems?.[0];

        // ✅ Rename id → custom_type_id
        item.custom_type_id = item.id;
        delete item.id;

        item = {
          ...item,
          _source: 'myCharts',
          chartName: firstCustom?.title || 'Untitled Chart',
          chartType: item?.chart_type || firstCustom?.type || 'bar',
          type: item?.type || 'chart',
        };

        delete item.widget_item;
        delete item.dashboard_items;
        delete item.chart_type;
      }

      setDroppedCharts((prev) => {
        const getUniqueKey = (chart: any) => chart.custom_type_id
          || chart.widget_type_id
          || chart.dashboard_type_id;

        const newKey = getUniqueKey(item);

        const alreadyPresent = prev.some(
          (item) => getUniqueKey(item) === newKey,
        );

        if (alreadyPresent) {
          return prev; // don't add duplicate
        }

        return [...prev, item];
      });
    } catch (err) {
      console.error('❌ Drop error:', err);
    }
  };

  // dashboard
  const onDragOverAllow = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  // dashboard
  const onDragOverScrollContainer = (e: React.DragEvent<HTMLDivElement>) => {
    const el = e.currentTarget as HTMLDivElement;
    const rect = el.getBoundingClientRect();
    const edge = 40;
    if (e.clientY - rect.top < edge) {
      el.scrollTop -= 20;
    } else if (rect.bottom - e.clientY < edge) {
      el.scrollTop += 20;
    }
  };

  // remove dropped dashboard
  const removeFromGrid = (id: string | number | undefined) => {
    if (!id) return;

    setDroppedCharts((prev) => prev.filter((p) => p._loadedFromDashboard || getChartId(p) !== id));

    setSelectedDefaultCharts((prev) => prev.filter((p) => p._loadedFromDashboard || getChartId(p) !== id));

    setSelectedMyCharts((prev) => prev.filter((p) => p._loadedFromDashboard || getChartId(p) !== id));
  };

  // chart and card component for drag and drop
  const renderDroppedChart = (item: any): React.ReactNode => {
    if (item?.columns && Array.isArray(item.columns)) {
      return (
        <>
          {item.columns.map((col: any, colIdx: number) => col.types?.map((typeItem: any, typeIdx: number) => (
            <div key={`col-${colIdx}-type-${typeIdx}`} className="col-12">
              {renderDroppedChart(typeItem)}
            </div>
          )))}
        </>
      );
    }

    const title = getChartTitle(item);
    const itemType = String(item?.type || 'chart').toLowerCase();
    const isMyChart = item?._source === 'myCharts' || !!item?.customItems;

    // Normalize structure
    let customParameters: any[] = [];

    if (isMyChart) {
      // 🟢 Handle MyCharts
      const combined = item?.customItems?.[0]?.combinedParameters || [];
      customParameters = combined.flatMap(
        (cp: any) => cp?.customParameters || [],
      );
    } else {
      // 🟣 Handle DefaultCharts or DashboardCharts
      const combinedParams = item?.widget_item?.[0]?.combined_parameters
        || item?.dashboard_items?.[0]?.dashboard_combined_parameters
        || [];

      customParameters = combinedParams.flatMap(
        (combo: any) => combo?.custom_parameter || combo?.dashboard_custom_parameters || [],
      );
    }

    // Extract labels and legends
    const labels: string[] = Array.from(
      new Set(
        customParameters
          .map((cp: any) => cp.label)
          .flat()
          .filter((l: any) => typeof l === 'string' && l.trim() !== ''),
      ),
    );

    const legends: string[] = Array.from(
      new Set(
        customParameters
          .map((cp: any) => cp.legends)
          .flat()
          .filter((l: any) => typeof l === 'string' && l.trim() !== ''),
      ),
    );

    // Card rendering
    if (itemType === 'card') {
      const cardData = isMyChart
        ? item?.customItems?.[0]
        : item?.widget_item?.[0];
      return <AnalyticsDataCard cardData={cardData} />;
    }

    // Chart rendering
    const chartType = (item?.chartType ?? item?.chart_type ?? 'bar') as any;

    const categories = chartType === 'pie' || chartType === 'donut' || chartType === 'radialBar'
      ? legends
      : labels;

    // Math.floor(Math.random() * 100)
    const series = chartType === 'pie' || chartType === 'donut' || chartType === 'radialBar'
      ? customParameters.map((cp: any) => cp.answer ?? 50)
      : legends.map((legend: string) => ({
        name: legend,
        data: labels.map((label: string) => {
          const normalize = (v: any) => (Array.isArray(v) ? v[0] : v);
          const match = customParameters.find(
            (cp: any) => normalize(cp.label) === label
                  && normalize(cp.legends) === legend,
          );
          return match?.answer ?? 50;
        }),
      }));

    return (
      <AnalyticsChart
        title={title}
        isStacked={item?.is_stacked}
        isHorizontal={item?.is_horizontal}
        isMetric={item?.is_metric}
        type={chartType}
        categories={categories}
        series={series}
      />
    );
  };

  const createSingleColumnBlock = (item: any, sequence: number) => {
    const typesObj = getTypeIds(item);

    return {
      number_of_columns: 1,
      sequence,
      columns: [
        {
          sequence: 0,
          span: 12, // ✅ FULL WIDTH
          types: Object.keys(typesObj).length ? [typesObj] : [],
        },
      ],
    };
  };

  const createTwoColumnBlock = (items: any[], sequence: number) => ({
    number_of_columns: items.length,
    sequence,
    columns: items.map((it, idx) => {
      const typesObj = getTypeIds(it);
      return {
        sequence: idx,
        span: 6,
        types: Object.keys(typesObj).length ? [typesObj] : [],
      };
    }),
  });

  // create dashboard payload
  const buildBlocksFromSelection = (
    items: any[],
    expandedCharts: Set<string>,
  ) => {
    const blocks: any[] = [];
    let buffer: any[] = [];

    items.forEach((item) => {
      const chartId = String(getChartId(item));
      const isExpanded = expandedCharts.has(chartId);

      // ✅ If this chart is col-12
      if (isExpanded) {
        // Flush pending half-row
        if (buffer.length > 0) {
          blocks.push(createTwoColumnBlock(buffer, blocks.length));
          buffer = [];
        }

        // Create single-column block
        blocks.push(createSingleColumnBlock(item, blocks.length));
      }
      // ✅ Normal col-6 item
      else {
        buffer.push(item);

        if (buffer.length === 2) {
          blocks.push(createTwoColumnBlock(buffer, blocks.length));
          buffer = [];
        }
      }
    });

    // Flush leftover item
    if (buffer.length > 0) {
      blocks.push(createTwoColumnBlock(buffer, blocks.length));
    }

    return blocks;
  };

  // save dashboard api call
  const handleSaveDashboard = async (): Promise<void> => {
    const tenantId = params?.subdomain as string;
    if (!newDashboardName.trim()) {
      toast.error('Please Enter a Dashboard Name');
      return;
    }
    if (droppedCharts.length === 0) {
      toast.error('Please drag charts to the layout before saving');
      return;
    }

    const blocks = buildBlocksFromSelection(droppedCharts, expandedCharts);

    const payload: any = {
      name: newDashboardName.trim(),
      number_of_blocks: blocks.length,
      sequence: 0,
      blocks,
    };

    try {
      // ✅ Normalize all types so they always contain all 3 keys
      payload.blocks = (payload.blocks || []).map(
        (block: any, blockIndex: number) => ({
          ...block,
          sequence: blockIndex, // ✅ ensure correct order
          number_of_columns: block.columns?.length || 0, // ✅ IMPORTANT
          columns: (block.columns || []).map((col: any, colIndex: number) => ({
            ...col,
            sequence: colIndex, // ✅ ensure column order
            types: (col.types || []).map((t: any) => ({
              widget_type_id: t.widget_type_id || null,
              dashboard_type_id: t.dashboard_type_id || null,
              custom_type_id: t.custom_type_id || null,
            })),
          })),
        }),
      );
    } catch (e) {
      console.error('Normalization error:', e);
    }

    // console.log('Final payload:', JSON.stringify(payload, null, 2));

    const res = await customDashboardChart.createDashboard(tenantId, payload);

    if ((res?.status as number) >= 200 && (res?.status as number) < 300) {
      loadDashboardList();
      toast.success('Dashboard Saved Successfully');
      setNewDashboardName('');
      setDroppedCharts([]);
      setActiveView('dashboard');
      showDashboards(true);
      showCharts(false);
      setExpandedCharts(new Set());
    } else {
      toast.error('Failed to Save Dashboard');
    }
  };

  // dashboard edit payload
  const buildEditBlocks = (
    items: any[],
    existingDashboard: any,
    expandedCharts: Set<string>,
  ) => {
    const blocks: any[] = [];
    const existingBlocks = existingDashboard?.blocks || [];
    let buffer: any[] = [];

    items.forEach((item) => {
      const chartId = String(getChartId(item));
      const isExpanded = expandedCharts.has(chartId);

      if (isExpanded) {
        // Flush pending buffer (normal charts)
        if (buffer.length > 0) {
          blocks.push(
            createTwoColumnEditBlock(buffer, existingBlocks, blocks.length),
          );
          buffer = [];
        }

        // Single-column block
        blocks.push(
          createSingleColumnEditBlock(item, existingBlocks, blocks.length),
        );
      } else {
        buffer.push(item);
        if (buffer.length === 2) {
          blocks.push(
            createTwoColumnEditBlock(buffer, existingBlocks, blocks.length),
          );
          buffer = [];
        }
      }
    });

    // Flush leftover normal charts
    if (buffer.length > 0) {
      blocks.push(
        createTwoColumnEditBlock(buffer, existingBlocks, blocks.length),
      );
    }

    return blocks;
  };

  // Helper for single-column block
  const createSingleColumnEditBlock = (
    item: any,
    existingBlocks: any[],
    blockIndex: number,
  ) => {
    const originalBlock = existingBlocks[blockIndex];
    const typesObj = getTypeIds(item);
    return {
      id: originalBlock?.id || '',
      number_of_columns: 1,
      sequence: blockIndex,
      columns: [
        {
          id: originalBlock?.columns?.[0]?.id || '',
          sequence: 0,
          span: 12,
          types: Object.keys(typesObj).length ? [typesObj] : [],
        },
      ],
    };
  };

  // Helper for two-column block
  const createTwoColumnEditBlock = (
    items: any[],
    existingBlocks: any[],
    blockIndex: number,
  ) => {
    const originalBlock = existingBlocks[blockIndex];
    return {
      id: originalBlock?.id || '',
      number_of_columns: items.length,
      sequence: blockIndex,
      columns: items.map((it, colIdx) => {
        const originalColumn = originalBlock?.columns?.[colIdx];
        const typesObj = getTypeIds(it);
        return {
          id: originalColumn?.id || '',
          sequence: colIdx,
          span: 6,
          types: Object.keys(typesObj).length ? [typesObj] : [],
        };
      }),
    };
  };

  // Edit dashboard api call
  const handleEditDashboard = async () => {
    const tenantId = params?.subdomain as string;
    if (!newDashboardName.trim()) {
      toast.error('Please enter a dashboard name');
      return;
    }
    if (droppedCharts.length === 0) {
      toast.error('Please drag charts to the layout before saving');
      return;
    }

    const blocks = buildEditBlocks(
      droppedCharts,
      loadedDashboard,
      expandedCharts,
    );

    const payload = {
      id: activeMyDashboardId, // REQUIRED FIX
      name: newDashboardName.trim(),
      number_of_blocks: blocks.length,
      sequence: 0,
      blocks,
    };

    try {
      // ✅ Normalize all types so they always contain all 3 keys
      payload.blocks = (payload.blocks || []).map((block: any) => ({
        ...block,
        columns: (block.columns || []).map((col: any) => ({
          ...col,
          types: (col.types || []).map((t: any) => ({
            widget_type_id: t.widget_type_id || null,
            dashboard_type_id: t.dashboard_type_id || null,
            custom_type_id: t.custom_type_id || null,
          })),
        })),
      }));
    } catch (e) {
      console.error('Normalization error:', e);
    }

    const res = await customDashboardChart.updateDashboard(
      tenantId,
      payload,
      activeMyDashboardId,
    );
    if ((res?.status as number) >= 200 && (res?.status as number) < 300) {
      toast.success('Dashboard saved successfully');
      setNewDashboardName('');
      setDroppedCharts([]);
      // setIsCreatingDashboard(false);
      setActiveView('dashboard');
      showDashboards(true);
      showCharts(false);
      loadDashboardList();
    } else {
      toast.error('Failed to save dashboard');
    }
  };

  // delete dashboard api call
  const handleDeleteDashboard = async (
    dashboardId: string,
    dashboardName: string,
  ): Promise<void> => {
    // const userConfirm = confirm(
    //   `Are you sure you want to delete "${dashboardName}"?`
    // );
    // if (!userConfirm) return;
    const tenantId = params?.subdomain as string;
    try {
      // 🔥 Call delete API
      await customDashboardChart.deleteDashboard(tenantId, dashboardId);

      // Update UI list
      setDashboardList((prev) => prev.filter((d) => d.id !== dashboardId));
      loadDashboardList();
      //  setDroppedCharts([])
      //  setIsCreatingDashboard(true)

      // alert(`Dashboard "${dashboardName}" deleted successfully!`);
    } catch (error) {
      console.error('Delete dashboard failed:', error);
      toast.error('Failed to delete the dashboard. Please try again.');
    }
  };

  // delete one item in dashboard api
  const handleDashboardTypeDelete = async (dashboardTypeId: string) => {
    const tenantId = params?.subdomain as string;
    try {
      const res = await customDashboardChart.deleteDashboardByTypeId(
        tenantId,
        dashboardTypeId,
      );
      setDroppedCharts((prev) => prev.filter(
        (chart) => chart.id !== dashboardTypeId, // Remove the chart with matching id
      ));
      loadDashboardList();
    } catch (error) {
      console.error('Failed to delete dashboard type:', error);
      // toast.error("Error deleting dashboard");
    }
  };
  // delete my charts api
  const handleDeleteChart = async (chartId: string): Promise<void> => {
    if (!chartId) return;

    // if (!confirm('Are you sure you want to delete this chart?')) return;
    const tenantId = params?.subdomain as string;
    try {
      await customDashboardChart.deleteChartByTypeId(tenantId, chartId);

      // Remove from UI list after deleting
      setMyChartList((prev: any[]) => prev.filter((c) => c.id !== chartId));
      setChartState({
        labels: [
          {
            id: crypto.randomUUID(),
            title: '',
            legends: [
              {
                id: crypto.randomUUID(),
                title: '',
                questions: [],
                macro_function: '',
              },
            ],
          },
        ],
        chartTitle: '',
      });
      loadMyChartList();
      // alert('Chart deleted successfully');
    } catch (error) {
      toast.error('Failed to delete chart');
    }
  };

  // chart and card preview function call
  const renderChart = (type: string): React.ReactNode => {
    // 🧱 Step 1: Get payload (consistent with backend structure)
    const payload = buildChartPayload();

    const chartType = (payload?.chart_type as
        | 'area'
        | 'line'
        | 'bar'
        | 'pie'
        | 'donut'
        | 'radialBar'
        | 'radar'
        | 'heatmap'
        | 'scatter'
        | 'bubble'
        | 'treemap'
        | 'polarArea'
        | 'candlestick'
        | 'boxPlot'
        | 'rangeBar'
        | 'rangeArea') || 'bar';

    const customItems = payload?.custom_items || [];
    const combinedParams = customItems?.[0]?.combined_parameters?.[0]?.custom_parameters || [];

    // 🧩 Extract categories (labels) & legends
    const flatLabels = Array.from(
      new Set(combinedParams.flatMap((p) => p.label || [])),
    );
    const flatLegends = Array.from(
      new Set(combinedParams.flatMap((p) => p.legends || [])),
    );

    // 🧮 Generate static/random data for preview
    const randomData = () => Math.floor(Math.random() * 100);

    // ✅ Detect circular chart types
    const isCircularChart = ['pie', 'donut', 'radialBar', 'polarArea'].includes(
      chartType,
    );

    // 🧠 Correct data structure for ApexCharts
    const series = isCircularChart
      ? flatLabels.map(() => randomData()) // ✅ Pie/Donut → simple array of numbers
      : flatLegends.map((legend) => ({
        name: legend,
        data: flatLabels.map(() => randomData()), // ✅ Axis-based → [{name, data}]
      }));

    const categories = isCircularChart ? flatLabels : flatLabels; // ✅ Use labels for both cases

    // 🟨 Handle empty preview
    if (!flatLabels.length && !flatLegends.length) {
      return (
        <div
          className="d-flex justify-content-center align-items-center flex-column"
          style={{ height: '400px' }}
        >
          <Image
            src={createDashboardImage}
            alt="Create Chart Background Image"
            width={300}
            height={200}
          />
          <p className="mt-3 text-muted">
            {isCircularChart
              ? 'Add categories to preview chart'
              : 'Add labels and legends to preview chart'}
          </p>
        </div>
      );
    }

    // 🟩 Handle CARD type separately
    if (type === 'card') {
      const staticCard = {
        title: chartState.chartTitle,
        combined_parameters: [
          {
            custom_parameters: [
              {
                answer: randomData(),
              },
            ],
          },
        ],
      };
      return <AnalyticsDataCard cardData={staticCard} />;
    }

    // 🧭 Step 2: Render Chart Component
    return (
      <Chart
        title={chartState.chartTitle || 'Chart Preview'}
        isStacked={payload?.is_stacked}
        isHorizontal={payload?.is_horizontal}
        isMetric={payload?.is_metric}
        type={chartType}
        categories={categories}
        series={series}
      />
    );
  };

  const handleTextFieldChange = (
    e: React.ChangeEvent<HTMLInputElement>,
  ): void => {
    setNewDashboardName(e.target.value);
  };

  const handleResize = (chartId: string) => {
    setExpandedCharts((prev) => {
      const next = new Set(prev);
      if (next.has(chartId)) {
        next.delete(chartId); // collapse
      } else {
        next.add(chartId); // expand
      }
      return next;
    });
  };

  const activeMyChart = myChartList.find((i: any) => i.id === activeMyChartsId);

  return (
    <>
      <div className="mt-4">
        <div className="row bg-white m-0" style={{ minHeight: '85vh' }}>
          <div className="col-lg-3 border-end">
            <div className="p-1">
              <div className="ps-4 py-3">
                <h4 className="fw-700 mb-0">Custom Dashboard</h4>
                <span className="settings-subtitle">
                  Create a custom dashboard
                </span>
              </div>
              <hr className="m-0" />
              <div className="d-flex gap-3 flex-wrap p-3">
                <button
                  type="button"
                  className={`custom-dashboard-btns ${activeView === 'dashboard' ? 'active' : ''}`}
                  onClick={() => {
                    showCharts(false);
                    showDashboards(true);
                    setActiveView('dashboard');
                  }}
                >
                  <div className={btnTextClass}>Dashboard</div>
                </button>

                <button
                  type="button"
                  className={`custom-dashboard-btns ${activeView === 'chart' ? 'active' : ''}`}
                  onClick={() => {
                    showDashboards(false);
                    showCharts(true);
                    setActiveView('chart');
                    // setDroppedCharts([])
                  }}
                >
                  <div className={btnTextClass}>Chart</div>
                </button>
              </div>

              {/* charts tab list */}
              {charts && (
                <div>
                  {/* MY CHARTS ACCORDION */}
                  <div className="cd-accordion-container mt-3">
                    <div
                      className="cd-accordion-header"
                      onClick={() => setOpenMyCharts(!openMyCharts)}
                    >
                      <span className="cd-accordion-title">My Charts</span>
                      <span className="cd-accordion-icon">
                        {openMyCharts ? (
                          <FiChevronDown size={24} color="#000000" />
                        ) : (
                          <FiChevronRight size={24} color="#000000" />
                        )}
                      </span>
                    </div>

                    {openMyCharts && (
                      <div className="cd-accordion-body">
                        <hr className="custom-hr" />

                        {/* Search */}
                        <div className="mt-2 position-relative cd-search_input">
                          <input
                            type="text"
                            placeholder="Search My Charts..."
                            className="w-100"
                            value={searchMyChart}
                            onChange={(e) => setSearchMyChart(e.target.value)}
                          />
                          <span className="search_icon">
                            <IoSearch color="var(--textLight)" fontSize={20} />
                          </span>
                        </div>

                        {/* Chart list */}
                        <div
                          className="mt-3 d-flex flex-column gap-2 accordion-list"
                          style={{ maxHeight: '40vh', overflowY: 'auto' }}
                        >
                          {filteredMyCharts?.map((chart, i) => (
                            <button
                              key={i}
                              className={`custom-dashboard-list-btns w-100 ${
                                chart.id === activeMyChartsId ? 'active' : ''
                              }`}
                              onClick={(e) => {
                                e.stopPropagation();
                                setIsEditMyCharts(true);
                                setActiveMyChartsId(chart.id);
                                // loadMyChartList();
                              }}
                              type="button"
                            >
                              <div className={btnChartClass}>
                                <div>
                                  {chart?.customItems?.[0]?.title
                                    || 'Untitled Chart'}
                                </div>

                                <div className="icon-box">
                                  <div
                                    className="icon-wrapper"
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      setActiveMyChartsId(chart.id);
                                      setShowChartDelete(true);
                                    }}
                                  >
                                    <FiTrash2 size={17} />
                                  </div>
                                </div>
                              </div>
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* NEW CHART ACCORDION */}
                  <div className="cd-accordion-container mt-2">
                    <div
                      className="cd-accordion-header"
                      onClick={() => setOpenNewChart(!openNewChart)}
                    >
                      <span className="cd-accordion-title">Questions</span>
                      <span className="cd-accordion-icon">
                        {openNewChart ? (
                          <FiChevronDown size={24} color="#000000" />
                        ) : (
                          <FiChevronRight size={24} color="#000000" />
                        )}
                      </span>
                    </div>

                    {openNewChart && (
                      <div
                        className="cd-accordion-body"
                        style={{
                          minHeight: '40vh',
                          maxHeight: '60vh',
                          overflowY: 'auto',
                        }}
                      >
                        <hr className="custom-hr" />

                        {/* Modules */}
                        <Select
                          options={modulesList}
                          value={
                            moduleSelected
                              ? modulesList.find(
                                (m) => m.value === moduleSelected,
                              )
                              : null
                          }
                          onChange={(s) => setModuleSelected(s?.value)}
                          placeholder="Modules"
                          styles={CustomStyles}
                          classNamePrefix="custom_select_input"
                        />

                        {/* Indicators */}
                        <div className="mt-1">
                          <Select
                            options={indicatorsList}
                            value={
                              indicatorSelected
                                ? indicatorsList.find(
                                  (i) => i.value === indicatorSelected,
                                )
                                : null
                            }
                            onChange={(s) => setIndicatorSelected(s?.value)}
                            placeholder="Indicators"
                            styles={CustomStyles}
                            classNamePrefix="custom_select_input"
                            isDisabled={!moduleSelected}
                          />
                        </div>

                        {/* Sub indicators */}
                        <div className="mt-1">
                          <Select
                            options={subIndicatorList}
                            value={
                              subIndicatorSelected
                                ? subIndicatorList.find(
                                  (s) => s.value === subIndicatorSelected,
                                )
                                : null
                            }
                            onChange={(s) => setSubIndicatorSelected(s?.value)}
                            placeholder="Sub Indicators"
                            styles={CustomStyles}
                            classNamePrefix="custom_select_input"
                            isDisabled={!indicatorSelected}
                          />
                        </div>

                        {/* Question List */}
                        <div className="questions-list mt-3">
                          {questionsList?.length > 0 ? (
                            questionsList.map((q) => (
                              <div
                                key={q.value}
                                draggable
                                className="question-item"
                                onDragStart={(e) => handleDragStart?.(e, q)}
                              >
                                {q.label}
                              </div>
                            ))
                          ) : (
                            <p className="text-muted text-center mt-3">
                              No questions available
                            </p>
                          )}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* CREATE BUTTON */}
                  <div className="create-btn-wrapper">
                    <Button
                      text="Create Charts"
                      prefixIconChildren={<MdOutlineAdd color="#ffffff" />}
                      isPill
                      className="cd-create-btn mt-3"
                      onClick={() => {
                        setActiveMyChartsId('');
                        // Reset editing mode
                        setIsEditMyCharts(false);
                        setChartType('');

                        // Set default active tab (New Chart tab)
                        // setActiveChartTab('newChart');

                        // Reset chartState with new IDs
                        const newLabelId = crypto.randomUUID();
                        const newLegendId = crypto.randomUUID();

                        setChartState({
                          labels: [
                            {
                              id: newLabelId,
                              title: '',
                              legends: [
                                {
                                  id: newLegendId,
                                  title: '',
                                  questions: [],
                                  macro_function: '',
                                },
                              ],
                            },
                          ],
                          chartTitle: '',
                        });

                        // Set the active label
                        setActiveLabelId(newLabelId);
                      }}
                    />
                  </div>
                </div>
              )}

              {/* Dashboards List */}
              {dashboards && (
                <div>
                  {/* my charts */}
                  <div className="cd-accordion-container mt-3">
                    <div
                      className="cd-accordion-header"
                      onClick={() => setOpenCharts(!openCharts)}
                    >
                      <span className="cd-accordion-title">My Charts</span>
                      <span className="cd-accordion-icon">
                        {openCharts ? (
                          <FiChevronDown size={24} color="#000000" />
                        ) : (
                          <FiChevronRight size={24} color="#000000" />
                        )}
                      </span>
                    </div>

                    {openCharts && (
                      <div className="cd-accordion-body">
                        <hr className="custom-hr" />

                        {/* Search */}
                        <div className="mt-2 position-relative cd-search_input">
                          <input
                            type="text"
                            placeholder="Search My Charts..."
                            className="w-100"
                            value={searchMyChart}
                            onChange={(e) => setSearchMyChart(e.target.value)}
                          />
                          <span className="search_icon">
                            <IoSearch color="var(--textLight)" fontSize={20} />
                          </span>
                        </div>

                        {/* Chart list */}
                        <div
                          className="mt-3 d-flex flex-column gap-2 cd-accordion-list"
                          style={{ maxHeight: '40vh', overflowY: 'auto' }}
                          onDragOver={onDragOverScrollContainer}
                        >
                          {filteredMyCharts?.map((chart, i) => (
                            <button
                              key={i}
                              className="custom-dashboard-list-btns w-100 mt-2"
                              draggable
                              onDragStart={(e) => onDragStartMyChart?.(e, chart)}
                              // onClick={() => {
                              //   setIsEditMyCharts(true);
                              //   setActiveMyChartsId(chart.id);
                              // }}
                              type="button"
                            >
                              <div className={btnChartClass}>
                                <div>
                                  {chart?.customItems?.[0]?.title
                                    || 'Untitled Chart'}
                                </div>

                                <MdOutlineKeyboardDoubleArrowRight size={18} />
                              </div>
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* default charts */}
                  <div className="cd-accordion-container mt-2">
                    <div
                      className="cd-accordion-header"
                      onClick={() => setOpenDefaultCharts(!openDefaultCharts)}
                    >
                      <span className="cd-accordion-title">Default Charts</span>
                      <span className="cd-accordion-icon">
                        {openDefaultCharts ? (
                          <FiChevronDown size={24} color="#000000" />
                        ) : (
                          <FiChevronRight size={24} color="#000000" />
                        )}
                      </span>
                    </div>

                    {openDefaultCharts && (
                      <div className="cd-accordion-body">
                        <hr className="custom-hr" />

                        {/* Search */}
                        <div className="mt-2 position-relative cd-search_input">
                          <input
                            type="text"
                            placeholder="Search Default Charts..."
                            className="w-100"
                            value={searchDefaultChart}
                            onChange={(e) => setSearchDefaultChart(e.target.value)}
                          />
                          <span className="search_icon">
                            <IoSearch color="var(--textLight)" fontSize={20} />
                          </span>
                        </div>

                        {/* Default chart list */}
                        <div
                          className="mt-3 d-flex flex-column gap-2 cd-accordion-list"
                          style={{ maxHeight: '40vh', overflowY: 'auto' }}
                          onDragOver={onDragOverScrollContainer}
                        >
                          {filteredDefaultCharts?.map((chart, i) => (
                            <button
                              key={i}
                              className="custom-dashboard-list-btns w-100 mt-2"
                              draggable
                              onDragStart={(e) => onDragStartDefaultChart?.(e, chart)}
                              type="button"
                            >
                              <div className={btnChartClass}>
                                <div>
                                  {chart.chartName
                                    ?? chart.name
                                    ?? getChartTitle(chart)}
                                </div>
                                <MdOutlineKeyboardDoubleArrowRight size={18} />
                              </div>
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* my dashboard   */}
                  <div className="cd-accordion-container mt-2">
                    <div
                      className="cd-accordion-header"
                      onClick={() => setDashOpen(!dashOpen)}
                    >
                      <span className="cd-accordion-title">My Dashboards</span>
                      <span className="cd-accordion-icon">
                        {dashOpen ? (
                          <FiChevronDown size={24} color="#000000" />
                        ) : (
                          <FiChevronRight size={24} color="#000000" />
                        )}
                      </span>
                    </div>

                    {dashOpen && (
                      <div className="cd-accordion-body mt-0">
                        <hr className="custom-hr" />
                        {/* Search */}
                        <div
                          className="mt-2 position-relative cd-search_input mt-1"
                          style={{ cursor: 'pointer' }}
                        >
                          <input
                            type="text"
                            name="dashboardSearchInput"
                            placeholder="Search dashboards..."
                            className="w-100"
                            maxLength={50}
                            value={searchDashboard}
                            onChange={(e) => setSearchDashboard(e.target.value)}
                          />
                          <span className="search_icon">
                            <IoSearch color="var(--textLight)" fontSize={20} />
                          </span>
                        </div>

                        {/* Dashboard List (NO TABS ANYMORE) */}
                        <div
                          className="mt-3 d-flex gap-2 flex-column cd-accordion-list"
                          style={{ maxHeight: '40vh', overflowY: 'auto' }}
                          onDragOver={onDragOverScrollContainer}
                        >
                          {filteredDashboards.map((dashboard, index) => (
                            <button
                              key={index}
                              type="button"
                              className={`custom-dashboard-list-btns w-100 ${
                                dashboard.id === activeMyDashboardId
                                  ? 'active'
                                  : ''
                              }`}
                              onClick={() => {
                                setIsCreatingDashboard(false);
                                setIsEditMyDashboard(true);
                                loadDashboardToGrid(dashboard);
                                setActiveDashboardIndex(index);
                                setActiveMyDashboardId(dashboard?.id);
                              }}
                            >
                              <div className={btnChartClass}>
                                <div>{dashboard.name}</div>

                                <div className="icon-box">
                                  <div
                                    // className="icon-wrapper"
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      setshowDashboardDelete(true);
                                      setActiveMyDashboardId(dashboard?.id);
                                    }}
                                  >
                                    <FiTrash2 size={17} />
                                  </div>
                                </div>
                              </div>
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Create dashboard button */}
                  <div className="create-btn-wrapper">
                    <Button
                      text="Create Dashboard"
                      prefixIconChildren={<MdOutlineAdd color="#ffffff" />}
                      isPill
                      className="cd-create-btn mt-3"
                      onClick={() => {
                        setIsCreatingDashboard(true);
                        setNewDashboardName('');
                        setOpenCharts(true);
                        showDashboards(true);
                        showCharts(false);
                        // setActiveView('chart');
                        // setActiveChartTab('myCharts');
                        setDroppedCharts([]);
                      }}
                    />
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="col-lg-9">
            <div className="px-2 py-4">
              {dashboards ? (
                <>
                  <div className="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center gap-3 mb-4">
                    <div
                      className="d-flex align-items-center gap-2 flex-grow-1"
                      style={{ maxWidth: '500px' }}
                    >
                      <div
                        className="flex-grow-1"
                        style={{ width: '100%', minWidth: '300px' }}
                      >
                        <TextField
                          type="text"
                          placeholder="Enter Dashboard Name"
                          value={newDashboardName}
                          onChange={handleTextFieldChange}
                          isValid={false}
                          isCustomRequired
                        />
                      </div>
                      <div className="d-flex gap-2">
                        <button
                          type="button"
                          className="custom-dashboard-save-btns d-flex align-items-center gap-1 px-3 py-2"
                          onClick={
                            isEditMyDashboard
                              ? handleEditDashboard
                              : handleSaveDashboard
                          }
                          title="Save Dashboard"
                        >
                          <FiSave size={20} color="#ffffff" />
                          <span
                            className="fw-300 fs-14"
                            style={{ color: '#ffffff' }}
                          >
                            Save
                          </span>
                        </button>
                      </div>
                    </div>

                    <div className="d-flex gap-2 w-100 w-md-auto justify-content-start justify-content-md-end">
                      <button
                        type="button"
                        className="custom-dashboard-action-btns px-3 py-2"
                        onClick={() => {
                          setDroppedCharts([]);
                          // exit create mode without saving and clear temporary state
                          // setIsCreatingDashboard(false);
                          showDashboards(true);
                          showCharts(false);
                          setSelectedDefaultCharts([]);
                          setNewDashboardName('');
                          setActiveView('dashboard');
                        }}
                      >
                        <Image
                          src={refreshButton}
                          alt="Refresh"
                          width={24}
                          height={24}
                        />
                      </button>
                    </div>
                  </div>

                  <hr className="mt-3" />

                  <div className="row g-4">
                    <div className="col-12">
                      <div
                        className="border rounded p-1"
                        style={{
                          backgroundColor: '#f0f0f08c',
                          minHeight: '70vh',
                          margin: '5px',
                          overflowY: 'auto',
                        }}
                        onDrop={onDropToGrid}
                        onDragOver={onDragOverAllow}
                      >
                        <div className="row g-1">
                          {/* Empty dashboard message */}
                          {droppedCharts.length === 0 && (
                            <div
                              className="d-flex flex-column align-items-center justify-content-center"
                              style={{ gap: '0px', minHeight: '600px' }}
                            >
                              <Image
                                src={dashboardCreateImage}
                                alt="Create Dashboard"
                                height={300}
                                width={600}
                                style={{ objectFit: 'contain' }}
                              />
                              <p className="text-center mt-3">
                                Drag a chart from the left panel and drop it
                                here
                              </p>
                            </div>
                          )}

                          {/* Render all dropped charts (no special layout logic) */}
                          {droppedCharts.map((item, idx) => {
                            const chartId = getChartId(item);
                            const isExpanded = expandedCharts.has(chartId);

                            return (
                              <div
                                key={`chart-${idx}`}
                                className={`g-2 ${isExpanded ? 'col-12' : 'col-md-6'}`}
                              >
                                {/* Wrapper for chart + icon */}
                                <div
                                  className="chart-container"
                                  style={{ position: 'relative' }}
                                >
                                  {/* Top-right icons */}
                                  <div>
                                    {isCreatingDashboard && (
                                      <div className="d-flex gap-2 chart-remove-icon">
                                        {/* ✅ Maximize button */}
                                        <button
                                          type="button"
                                          onClick={() => handleResize(chartId)}
                                          style={{
                                            width: '24px',
                                            height: '24px',
                                          }}
                                        >
                                          <FiMaximize2
                                            size={20}
                                            strokeWidth={3}
                                          />
                                        </button>

                                        {/* Remove button */}
                                        <button
                                          type="button"
                                          onClick={() => removeFromGrid(chartId)}
                                          style={{
                                            width: '24px',
                                            height: '24px',
                                          }}
                                        >
                                          <X size={20} strokeWidth={3} />
                                        </button>
                                      </div>
                                    )}

                                    {isEditMyDashboard && (
                                      <div className="d-flex gap-2 chart-remove-icon">
                                        {/* ✅ Maximize button */}
                                        <button
                                          type="button"
                                          onClick={() => handleResize(chartId)}
                                          style={{
                                            width: '24px',
                                            height: '24px',
                                          }}
                                        >
                                          <FiMaximize2
                                            size={20}
                                            strokeWidth={3}
                                          />
                                        </button>

                                        {/* Remove button */}
                                        <button
                                          type="button"
                                          onClick={() => handleDashboardTypeDelete(item.id)}
                                          style={{
                                            width: '24px',
                                            height: '24px',
                                          }}
                                        >
                                          <X size={20} strokeWidth={3} />
                                        </button>
                                      </div>
                                    )}
                                  </div>

                                  {/* Render chart */}
                                  {renderDroppedChart(item)}
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              ) : charts ? (
                <>
                  {/* Chart Creation Section - Updated with Save button on left and new icons on right */}
                  <div className="d-flex justify-content-between align-items-center mb-4">
                    <div
                      className="d-flex align-items-center gap-2"
                      style={{ width: '450px' }}
                    >
                      <div style={{ width: '100%', minWidth: '350px' }}>
                        <TextField
                          type="text"
                          placeholder="Chart Title"
                          value={chartState.chartTitle}
                          onChange={handleChartTitleChange}
                          isValid={false}
                          isCustomRequired
                        />
                      </div>
                      <button
                        type="button"
                        className="custom-dashboard-save-btns d-flex align-items-center gap-1 px-3 py-3"
                        onClick={() => (isEditMyCharts
                          ? handleEditChart(activeMyChart)
                          : handleSaveChart())}
                      >
                        <FiSave size={18} color="#ffffff" />
                        <span
                          className="fw-300 fs-14"
                          style={{ color: '#ffffff' }}
                        >
                          Save
                        </span>
                      </button>
                    </div>
                    <div className="d-flex gap-2">
                      <button
                        type="button"
                        className="custom-dashboard-action-btns d-flex align-items-center justify-content-center"
                        onClick={undo}
                        title="Undo"
                      >
                        <Image
                          src={undoButton}
                          alt="Undo"
                          width={24}
                          height={24}
                        />
                      </button>
                      <button
                        type="button"
                        className="custom-dashboard-action-btns d-flex align-items-center justify-content-center"
                        onClick={redo}
                        title="Redo"
                      >
                        <Image
                          src={redoButton}
                          alt="Redo"
                          width={24}
                          height={24}
                        />
                      </button>
                      <button
                        type="button"
                        className="custom-dashboard-action-btns d-flex align-items-center justify-content-center"
                        onClick={() => updateChartState({
                          chartTitle: '',
                          labels: [
                            {
                              id: crypto.randomUUID(),
                              title: '',
                              legends: [
                                {
                                  id: crypto.randomUUID(),
                                  title: '',
                                  questions: [],
                                  macro_function: '',
                                },
                              ],
                            },
                          ],
                        })}
                        title="Refresh"
                      >
                        <Image
                          src={refreshButton}
                          alt="Refresh"
                          width={24}
                          height={24}
                        />
                      </button>
                    </div>
                  </div>

                  {/* Chart Type Filters */}
                  <div className="mb-2 d-flex align-items-center gap-3">
                    <div className="d-flex border border-1 rounded-3 position-relative">
                      <button
                        type="button"
                        className="chart-tooltip py-2 px-3 border-end"
                        data-tooltip="Card"
                        onClick={() => setChartType('card')}
                      >
                        <Image
                          src={card}
                          alt="card"
                          width={24}
                          height={24}
                          className="mt-1"
                        />
                      </button>

                      <button
                        type="button"
                        className="chart-tooltip py-2 px-3 cursor-pointer border-end"
                        data-tooltip="Pie Chart"
                        onClick={() => setChartType('pie')}
                      >
                        <Image
                          src={pieChartIcon}
                          alt="Pie Chart"
                          width={24}
                          height={24}
                        />
                      </button>
                      <button
                        type="button"
                        className="chart-tooltip py-2 px-3 cursor-pointer border-end"
                        data-tooltip="Bar Chart"
                        onClick={() => setChartType('bar')}
                      >
                        <Image
                          src={barChartIcon}
                          alt="Bar Chart"
                          width={24}
                          height={24}
                        />
                      </button>
                      <button
                        type="button"
                        className="chart-tooltip py-2 px-3 cursor-pointer border-end"
                        data-tooltip="Line Chart"
                        onClick={() => setChartType('line')}
                      >
                        <Image
                          src={lineChartIcon}
                          alt="Line Chart"
                          width={24}
                          height={24}
                        />
                      </button>
                      <button
                        type="button"
                        className="chart-tooltip py-2 px-3 cursor-pointer border-end"
                        data-tooltip="Area Chart"
                        onClick={() => setChartType('area')}
                      >
                        <Image
                          src={areaChartIcon}
                          alt="Area Chart"
                          width={24}
                          height={24}
                        />
                      </button>
                      <button
                        type="button"
                        className="chart-tooltip py-2 px-3 cursor-pointer border-end"
                        data-tooltip="Donut Chart"
                        onClick={() => setChartType('donut')}
                      >
                        <Image
                          src={donutChartIcon}
                          alt="Donut Chart"
                          width={24}
                          height={24}
                        />
                      </button>
                      <button
                        type="button"
                        className="chart-tooltip py-2 px-3 cursor-pointer border-end"
                        data-tooltip="Scatter Plot"
                        onClick={() => setChartType('scatter')}
                        disabled
                      >
                        <Image
                          src={scatterPlotIcon}
                          alt="Scatter Plot"
                          width={30}
                          height={30}
                        />
                      </button>
                      <button
                        type="button"
                        className="chart-tooltip py-2 px-3 cursor-pointer border-end"
                        data-tooltip="Bubble Chart"
                        onClick={() => setChartType('bubble')}
                        disabled
                      >
                        <Image
                          src={comboChartIcon}
                          alt="Bubble Chart"
                          width={30}
                          height={30}
                        />
                      </button>
                      <button
                        type="button"
                        className="chart-tooltip py-2 px-3 cursor-pointer border-end"
                        data-tooltip="Radar Chart"
                        onClick={() => setChartType('radar')}
                        disabled
                      >
                        <Image
                          src={arrowIcon}
                          alt="Radar Chart"
                          width={30}
                          height={30}
                        />
                      </button>
                      <div
                        className="py-2 px-3 cursor-pointer position-relative"
                        onClick={() => setShowMoreOptions(!showMoreOptions)}
                      >
                        <div className="d-flex flex-column gap-1">
                          <div
                            className="bg-dark rounded-circle"
                            style={{ width: '3px', height: '3px' }}
                          />
                          <div
                            className="bg-dark rounded-circle"
                            style={{ width: '3px', height: '3px' }}
                          />
                          <div
                            className="bg-dark rounded-circle"
                            style={{ width: '3px', height: '3px' }}
                          />
                        </div>

                        {showMoreOptions && (
                          <div
                            className="position-absolute top-100 end-0 mt-1 bg-white border rounded shadow-lg z-3"
                            style={{ minWidth: '200px' }}
                          >
                            <div className="p-2">
                              <div
                                className="py-2 px-3 cursor-pointer hover-bg-light"
                                onClick={() => setChartType('heatmap')}
                              >
                                Heat Map
                              </div>
                              <div
                                className="py-2 px-3 cursor-pointer hover-bg-light"
                                onClick={() => setChartType('treemap')}
                              >
                                Tree Map
                              </div>
                              <div
                                className="py-2 px-3 cursor-pointer hover-bg-light"
                                onClick={() => setChartType('radialBar')}
                              >
                                Radial Bar
                              </div>
                              <div
                                className="py-2 px-3 cursor-pointer hover-bg-light"
                                onClick={() => setChartType('polarArea')}
                              >
                                Polar Area
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Labels Section */}
                  {!['pie', 'donut', 'radialBar'].includes(chartType)
                    && chartType !== 'card' && (
                      <div>
                        {/* Label Tabs */}
                        <div className="d-flex align-items-center gap-1 mb-1">
                          <div className="d-flex align-items-center gap-1 mb-1">
                            <div className="d-flex gap-1 flex-wrap">
                              {chartState.labels.map((label, index) => {
                                const isActive = label.id === activeLabelId;
                                return (
                                  <div
                                    key={label.id}
                                    onClick={() => setActiveLabelId(label.id)}
                                    className={`label-box position-relative ${isActive ? 'active' : ''}`}
                                  >
                                    <button
                                      type="button"
                                      className="cancel-icon"
                                      onClick={(e) => {
                                        e.stopPropagation();

                                        // Remove label and update chartState
                                        const nextLabels = chartState.labels.filter(
                                          (l) => l.id !== label.id,
                                        );

                                        updateChartState({
                                          ...chartState,
                                          labels: nextLabels,
                                        });

                                        // Update active label if needed
                                        if (activeLabelId === label.id) {
                                          setActiveLabelId(
                                            nextLabels[0]?.id || null,
                                          );
                                        }
                                      }}
                                    >
                                      <MdCancel size={16} color="gray" />
                                    </button>

                                    <span className="fw-600 fs-14">{`Label ${index + 1}`}</span>
                                  </div>
                                );
                              })}
                            </div>
                          </div>

                          <button
                            type="button"
                            className="btn btn-link text-primary p-0 fw-600 fs-14 text-decoration-none d-flex align-items-center gap-1"
                            onClick={handleAddNewLabel}
                          >
                            <IoMdAdd size={18} color="#007bff" />
                            <span>New Label</span>
                          </button>
                        </div>

                        {/* Label Title Input */}
                        {activeLabel && (
                          <div className="label-title-box mt-1">
                            <div className="label-title-inner">
                              <span className="label-title-text">
                                Label Title:
                              </span>
                              <input
                                type="text"
                                className="label-title-input"
                                placeholder="Enter title for Label"
                                value={activeLabel.title}
                                onChange={handleLabelTitleChange}
                              />
                            </div>
                          </div>
                        )}
                      </div>
                  )}

                  {/* Legends Section — belongs to the active label */}
                  {activeLabel && chartType !== 'card' && (
                    <div className="d-flex legend-section mt-3 mb-2">
                      <div className="legends-container">
                        {activeLabel.legends.map((legend, index) => (
                          <div
                            key={legend.id}
                            className="legend-card position-relative"
                            style={{
                              background: '#F5F5F5',
                              border: '1px solid #E0E0E0',
                              borderRadius: '8px',
                              padding: '12px',
                              width: '280px',
                            }}
                            onDrop={(e) => handleDrop(e, legend.id)}
                            onDragOver={handleDragOver}
                          >
                            {/* Header */}
                            <div className="d-flex justify-content-between align-items-center mb-2">
                              <h6 className="fw-600 mb-0">{`Legend ${index + 1}`}</h6>
                              <button
                                type="button"
                                className="legend-close-btn"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  isEditMyCharts
                                    ? handleDeleteLegend(
                                      activeMyChartsId,
                                      legend.id,
                                    )
                                    : handleRemoveLegend(
                                      activeLabel.id,
                                      legend.id,
                                    );
                                }}
                              >
                                {/* <X size={16} /> */}
                                <MdCancel size={16} color="gray" />
                              </button>
                            </div>

                            {/* Title Input */}
                            <TextField
                              type="text"
                              placeholder="Enter Legend Title"
                              value={legend.title}
                              onChange={(e) => handleLegendTitleChange(
                                activeLabel.id,
                                legend.id,
                                e.target.value,
                              )}
                              isValid={false}
                              isCustomRequired
                            />

                            {/* Dropped Questions */}
                            <div className="legend-questions mt-2">
                              {legend.questions.length > 0 ? (
                                legend.questions.map((q: any) => {
                                  const isObj = typeof q === 'object' && q !== null;
                                  const qValue = isObj ? q.value : q;
                                  const qLabel = (isObj ? q.label : '')
                                    || questionsList.find(
                                      (item) => item.value === qValue,
                                    )?.label
                                    || allQuestionsList.find(
                                      (item) => item.value === qValue,
                                    )?.label
                                    || standardQuestionsList?.find(
                                      (item) => item.universal_question_id === qValue,
                                    )?.title
                                    || qValue;

                                  return (
                                    <div
                                      key={qValue}
                                      className="legend-question-item d-flex justify-content-between align-items-center mt-1"
                                    >
                                      <span className="text-truncate">
                                        {qLabel}
                                      </span>
                                      <button
                                        type="button"
                                        className="remove-question-btn"
                                        onClick={(e) => {
                                          e.stopPropagation();
                                          handleRemoveQuestion(
                                            activeLabel.id,
                                            legend.id,
                                            qValue,
                                          );
                                        }}
                                      >
                                        <X size={14} />
                                      </button>
                                    </div>
                                  );
                                })
                              ) : (
                                <span className="text-muted fs-12">
                                  Drag questions here
                                </span>
                              )}
                            </div>

                            {/* ⚙️ Formula Icon */}
                            <div
                              className="legend-footer d-flex justify-content-start mt-3"
                              onClick={() => {
                                setCustomFormulaOpen(true);
                                setActiveLegendId(legend.id);
                              }}
                              style={{ cursor: 'pointer' }}
                            >
                              <MathOperations
                                size={20}
                                color="#6c757d"
                                weight="bold"
                              />
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* ➕ Add New Legend */}
                      <div className="d-flex align-items-center justify-content-between mt-3">
                        <button
                          type="button"
                          className="btn btn-link text-primary p-0 fw-600 fs-14 text-decoration-none d-flex align-items-center gap-1"
                          onClick={handleAddNewLegend}
                        >
                          <IoMdAdd size={18} color="#007bff" />
                          <span>New Legend</span>
                        </button>
                      </div>
                    </div>
                  )}

                  {/* --- CARD TYPE SECTION --- */}
                  {chartType === 'card' && chartState.labels.length > 0 && (
                    <div className="legends-section mt-3 mb-2">
                      <div
                        className="legend-card position-relative"
                        style={{
                          background: '#F5F5F5',
                          border: '1px solid #E0E0E0',
                          borderRadius: '8px',
                          padding: '12px',
                          width: '280px',
                        }}
                        onDrop={(e) => handleDrop(e, chartState.labels[0].legends[0].id)} // only one drop area
                        onDragOver={handleDragOver}
                      >
                        {/* Header */}
                        <div className="d-flex justify-content-between align-items-center mb-2">
                          <h6 className="fw-600 mb-0">Questions</h6>
                        </div>

                        {/* Dropped Questions */}
                        <div className="legend-questions mt-2">
                          {chartState.labels[0].legends[0].questions.length
                          > 0 ? (
                              chartState.labels[0].legends[0].questions.map(
                                (q: string | QuestionItem) => {
                                  const isObj = typeof q === 'object' && q !== null;
                                  const qValue = isObj ? q.value : q;

                                  const qLabel = (isObj ? q.label : '')
                                  || questionsList.find(
                                    (item) => item.value === qValue,
                                  )?.label
                                  || allQuestionsList.find(
                                    (item) => item.value === qValue,
                                  )?.label
                                  || standardQuestionsList?.find(
                                    (item) => item.universal_question_id === qValue,
                                  )?.title
                                  || qValue;

                                  return (
                                    <div
                                      key={String(qValue)}
                                      className="legend-question-item d-flex justify-content-between align-items-center mt-1"
                                    >
                                      <span className="text-truncate">
                                        {qLabel}
                                      </span>
                                      <button
                                        type="button"
                                        className="remove-question-btn"
                                        onClick={(e) => {
                                          e.stopPropagation();

                                          const nextLabels = chartState.labels.map((label) => (label.id === chartState.labels[0].id
                                            ? {
                                              ...label,
                                              legends: label.legends.map(
                                                (lg) => (lg.id
                                                      === label.legends[0].id
                                                  ? {
                                                    ...lg,
                                                    questions:
                                                              lg.questions.filter(
                                                                (question) => {
                                                                  if (
                                                                    typeof question
                                                                      === 'object'
                                                                    && question
                                                                      !== null
                                                                  ) {
                                                                    return (
                                                                      question.value
                                                                      !== qValue
                                                                    );
                                                                  }
                                                                  return (
                                                                    question
                                                                    !== qValue
                                                                  );
                                                                },
                                                              ),
                                                  }
                                                  : lg),
                                              ),
                                            }
                                            : label));

                                          updateChartState({
                                            ...chartState,
                                            labels: nextLabels,
                                          });
                                        }}
                                      >
                                        <X size={14} />
                                      </button>
                                    </div>
                                  );
                                },
                              )
                            ) : (
                              <span className="text-muted fs-12">
                                Drag questions here
                              </span>
                            )}
                        </div>

                        {/* Formula Icon */}
                        <div
                          className="legend-footer d-flex justify-content-start mt-3"
                          onClick={() => {
                            setCustomFormulaOpen(true);
                            setActiveLegendId(
                              chartState.labels[0].legends[0].id,
                            );
                          }}
                          style={{ cursor: 'pointer' }}
                        >
                          <MathOperations size={20} color="#6c757d" />
                        </div>
                      </div>
                    </div>
                  )}

                  <h4
                    className="fs-16 fw-700 text-center py-3 rounded-2 mb-1 mt-5"
                    style={{ backgroundColor: '#FFFDED' }}
                  >
                    Preview
                  </h4>
                  <div className="render-chart mt-3">
                    <div className="p-2">{renderChart(chartType)}</div>
                  </div>
                </>
              ) : null}
            </div>
          </div>
        </div>
      </div>
      {/* Custom Formula Modal */}
      <CustomFormulaModal
        isOpen={customFormulaOpen}
        onClose={() => setCustomFormulaOpen(false)}
        questionsList={customFormulaQuestions}
        macroFunction={activeLegend?.macro_function || ''}
        onSave={(uidFormula) => {
          const nextLabels = chartState.labels.map((label) => (label.id === activeLabelId
            ? {
              ...label,
              legends: label.legends.map((legend) => (legend.id === activeLegendId
                ? { ...legend, macro_function: uidFormula }
                : legend)),
            }
            : label));

          updateChartState({
            ...chartState,
            labels: nextLabels,
          });

          setCustomFormulaOpen(false);
        }}
      />

      {/* Delete popup */}
      {(showChartDelete || showDashboardDelete) && (
        <DeleteModal
          open={
            activeView === 'dashboard' ? showDashboardDelete : showChartDelete
          }
          onCancel={() => {
            if (activeView === 'dashboard') {
              setshowDashboardDelete(false);
            } else {
              setShowChartDelete(false);
            }
          }}
          onConfirm={() => {
            if (activeView === 'dashboard') {
              setIsEditMyDashboard(true);
              setIsCreatingDashboard(false);
              handleDeleteDashboard(activeMyDashboardId, newDashboardName);
              loadDashboardList();
              setshowDashboardDelete(false);
            } else {
              setIsEditMyCharts(true);
              loadMyChartList();
              handleDeleteChart(activeMyChartsId);
              setShowChartDelete(false);
            }
          }}
          //  onConfirm={() => activeView === 'dashboard' ? setshowDashboardDelete(false) : setShowChartDelete(false)}
          message={
            activeView === 'dashboard'
              ? 'Are You Sure Want To Delete Dashboard?'
              : 'Are You Sure Want To Delete Chart?'
          }
        />
      )}
    </>
  );
}
