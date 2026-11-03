/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-unused-vars */
/* eslint @typescript-eslint/no-unused-vars: off */
/* eslint-disable no-console */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint no-shadow: off */
/* eslint-disable consistent-return */
/* eslint-disable no-unsafe-optional-chaining */
/* eslint-disable no-param-reassign */
/* eslint-disable block-scoped-var */
/* eslint jsx-a11y/click-events-have-key-events: off */
/* eslint-disable no-irregular-whitespace */
/* eslint-disable vars-on-top */
/* eslint-disable no-var */
/* eslint-disable react/jsx-props-no-multi-spaces */
/* eslint-disable react/no-children-prop */
/* eslint-disable no-unused-expressions */
/* eslint-disable no-nested-ternary */
/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable no-plusplus */

'use client';

import {
  MdOutlineFileDownload,
  MdOutlineKeyboardDoubleArrowRight,
} from 'react-icons/md';
import { RiFileExcel2Line } from 'react-icons/ri';
import { TiWarning } from 'react-icons/ti';
import { FiFileText } from 'react-icons/fi';
import {
  IoChevronDown,
  IoChevronForward,
  IoChevronUp,
  IoDownload,
  IoRepeat,
  IoSearch,
} from 'react-icons/io5';
import Select from 'react-select';
import { useTaskForm } from '@/lib/hooks/useTaskForm';
import { useTaskPermissions } from '@/lib/hooks/useTaskPermissions';
import { useTaskCalculations } from '@/lib/hooks/useTaskCalculations';
import { flushSync } from 'react-dom';
import { IDataCube } from '@/lib/interface/IDataCube.interface';
import { IUser } from '@/lib/interface/IUser.interface';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import {
  useParams,
  usePathname,
  useRouter,
  useSearchParams,
} from 'next/navigation';
import {
  useCallback, useEffect, useMemo, useRef, useState,
} from 'react';
import { useDebounce } from '@/hooks/use-debounce';
import {
  Dropdown,
  Image,
  Modal,
  OverlayTrigger,
  Tooltip,
} from 'react-bootstrap';
import { TableColumn } from 'react-data-table-component';
import toast from 'react-hot-toast';
import { PiDotsThreeOutlineVertical } from 'react-icons/pi';
import { FaChevronDown } from 'react-icons/fa';
import PreviewModal from '../TaskDataEntryForm/PreviewModal';
import { TextField } from '../ResponseInputFields/TextField';
import { IMeta } from '../../lib/interface/IMeta.interface';
import { ITask, ITaskQuestions } from '../../lib/interface/ITask.interface';
import { DataCube, TaskService, UserService } from '../../lib/service';
import {
  cleanedQuestions,
  convertToPascalCase,
  getStatusColor,
  Params,
  transformToNestedStructure,
} from '../../lib/utils';
import BlockOrUnblockOrDelete from '../BlockOrUnblockOrDelete/BlockOrUnblockOrDelete';
import { Button } from '../Button/Button';
import { useUser } from '../Context/userProvider';
import { useModal } from '../Modal/Context';
import PageHeaderWrapper from '../PageHeaderWrapper/PageHeaderWrapper';
import { Pill } from '../Pill/Pill';
import Search from '../Search/Search';
// import Sort from '../Sort/Sort';
import Table from '../Table/Table';
import TaskAssignForm from '../TaskAssignForm/TaskAssignForm';
import { ActionType, BreadCrumbProps } from '../types';
import ConfigureForm from './ConfigureForm';

import './ListTaskByBusinessUnit.css';

import Avatar from '../Avatar/Avatar';

import { AccordionWithActions } from '../Accordion/AccordionWithActions';
import FileUploader from '../FileUpLoader/FileUploader';

import { CustomStyles } from '../CustomStyles/CustomStyles';

interface StatusOption {
  value: string;
  label: string;
}

const statusOptions: StatusOption[] = [
  { value: '', label: 'All Status' },
  { value: 'CREATED', label: 'Created' },
  { value: 'IN_PROGRESS', label: 'In Progress' },
  { value: 'REASSIGNED', label: 'Reassigned' },
  { value: 'COMPLETED', label: 'Completed' },
  { value: 'REVIEWING', label: 'Reviewing' },
  { value: 'SUBMITTED', label: 'Submitted' },
  { value: 'REJECTED', label: 'Rejected' },
];

export default function ListTaskByBusinessUnit({
  tasks,
  meta,
  // params,
  dataCube,
  // businessUnit,
  apiKey,
  token,
  user,
}: Readonly<{
  tasks: ITask[];
  meta?: IMeta;
  // params?: Params;
  dataCube?: IDataCube | any;
  // businessUnit?: any;
  apiKey: any;
  token: any;
  user?: IUser;
}>) {
  const context = useUser();
  const urlParams = useParams();
  const router = useRouter();
  const [currentTask, setCurrentTask] = useState<ITask | undefined>();
  const [actionType, setActionType] = useState<ActionType>(null);
  // const [activeTab, setActiveTab] = useState<string>('');
  const hideModal = useModal({});
  const pathname = usePathname();
  const urlParamas = useParams();
  const searchParams = useSearchParams();

  // New States for New Task UI
  const [siteSearchTerm, setSiteSearchTerm] = useState('');
  const [moduleSearchTerm, setModuleSearchTerm] = useState('');
  const [openUploadFor, setOpenUploadFor] = useState<number | null>(null);
  const [activeTabId, setActiveTabId] = useState<string | null>(null);
  // Persistence key for filters
  const storageKey = `rubicr_tasks_filters_${pathname || 'root'}_${dataCube?.id || 'global'}`;
  const savedModuleIdRef = useRef<string | null>(null);
  const [activeSiteId, setActiveSiteId] = useState<string | null>(null);
  const [selectedProvider, setSelectedProvider] = useState<any>({});
  const [providerSearchTerm, setProviderSearchTerm] = useState('');
  const [selectedReviewer, setSelectedReviewer] = useState<any>({});
  const [reviewerSearchTerm, setReviewerSearchTerm] = useState('');
  const [selectedYear, setSelectedYear] = useState<any>('');
  const [modulesData, setModules] = useState<any[]>([]);
  const [businessUnit, setBusinessUnits] = useState<any>();
  const [selectedStatus, setSelectedStatus] = useState<string>('');
  const [isDownloading, setIsDownloading] = useState(false);
  const [generatingTemplates, setGeneratingTemplates] = useState<{
    [key: string]: boolean;
  }>({});
  // const [selectedDataCube, setSelectedDataCube] = useState('');
  // const [selectedFrequency, setSelectedFrequency] = useState('');
  const [selectedModule, setSelectedModule] = useState<any>();
  const [selectedTask, setSelectedTask] = useState('');
  const [selectedTaskData, setSelectedTaskData] = useState<any>(null);
  const [providers, setDataProviders] = useState<any>();
  const [reviewers, setDataReviewers] = useState<any>();
  const [moduleReassign, setModuleReassign] = useState<any>();
  const [showConfirm, setShowConfirm] = useState(false);
  const [ModuleReassignConfirm, setModuleReassignConfirm] = useState(false);
  const [pendingAction, setPendingAction] = useState<
    'provider' | 'reviewer' | null
  >(null);
  const [confirmData, setConfirmData] = useState<any>();
  const [confirmSubmit, setConfirmSubmit] = useState<boolean>(false);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [isTaskLoading, setIsTaskLoading] = useState(false);
  // Add new loading states at the top with other states
  const [isBusinessUnitLoading, setIsBusinessUnitLoading] = useState(true);
  const [isSiteLoading, setIsSiteLoading] = useState(true);
  const [isModuleLoading, setIsModuleLoading] = useState(true);
  const [task, setTask] = useState<any>();

  const slug = urlParams?.subdomain as string;

  // Request tracking to ignore stale responses
  const fetchRequestIdRef = useRef<number>(0);

  // Debounced filter values to reduce rapid refetches
  const debouncedStatus = useDebounce(selectedStatus, 300);
  const debouncedYear = useDebounce(selectedYear, 300);

  // Restore persisted filters on mount / when route/datacube changes
  useEffect(() => {
    try {
      if (typeof window !== 'undefined') {
        const raw = localStorage.getItem(storageKey);
        if (raw) {
          const parsed = JSON.parse(raw || '{}');
          if (parsed.activeTabId) setActiveTabId(parsed.activeTabId);
          if (parsed.activeSiteId) setActiveSiteId(parsed.activeSiteId);
          if (parsed.selectedStatus) setSelectedStatus(parsed.selectedStatus);
          if (parsed.selectedYear) setSelectedYear(parsed.selectedYear);
          if (parsed.siteSearchTerm) setSiteSearchTerm(parsed.siteSearchTerm);
          if (parsed.moduleSearchTerm) {
            setModuleSearchTerm(parsed.moduleSearchTerm);
          }
          if (parsed.selectedModuleId) {
            savedModuleIdRef.current = parsed.selectedModuleId;
          }
        }
      }
    } catch (e) {
      // ignore parse errors
    }
  }, [pathname, dataCube?.id]);

  const BusinessUnitSkeleton = () => (
    <div className="px-3 animate-pulse">
      <div className="py-3 mb-2">
        <div className="h-4 bg-gray-200 rounded w-32" />
      </div>
    </div>
  );

  const SiteSkeleton = () => (
    <div className="px-3 animate-pulse">
      {[1, 2, 3].map((i) => (
        <div key={i} className="mb-3">
          <div className="p-2 py-3 border rounded">
            <div className="h-4 bg-gray-200 rounded w-3/4 mb-2" />
            <div className="h-3 bg-gray-100 rounded w-1/4" />
          </div>
        </div>
      ))}
    </div>
  );

  const ModuleSkeleton = () => (
    <div className="px-3 animate-pulse">
      {[1, 2].map((i) => (
        <div key={i} className="mb-3">
          <div className="border rounded p-3">
            <div className="h-4 bg-gray-200 rounded w-1/2 mb-2" />
            <div className="h-3 bg-gray-100 rounded w-1/4 mb-3" />
            <div className="flex gap-2">
              {[1, 2, 3].map((j) => (
                <div key={j} className="h-8 w-16 bg-gray-200 rounded" />
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  const getSelectedLabel = () => {
    const option = statusOptions.find((opt) => opt.value === selectedStatus);
    return option ? option.label : 'All Status';
  };

  useEffect(() => {
    if (!businessUnit?.data?.length) return;

    setIsSiteLoading(true);
    try {
      // Find the active tab's data
      const activeTab = businessUnit.data.find(
        (tab: any) => tab.business_unit_id === activeTabId,
      );

      if (activeTab) {
        // When active tab changes, set its first site as default
        const firstSite = activeTab.sites?.[0];
        if (firstSite) {
          setActiveSiteId(firstSite.site_id);
        } else {
          setActiveSiteId('');
        }
      } else {
        // On first load, set defaults from the first tab
        const firstTab = businessUnit.data[0];
        const firstSite = firstTab?.sites?.[0];
        setActiveTabId(firstTab.business_unit_id);
        if (firstSite) setActiveSiteId(firstSite.site_id);
      }
    } finally {
      setIsSiteLoading(false);
    }
  }, [businessUnit, activeTabId]);

  const breadCrumbsItem = useMemo(() => {
    const isTaskPath = pathname?.startsWith('/tasks');
    const taskCount = businessUnit?.total_tasks || 0;

    if (isTaskPath) {
      return [];
    }
    return [
      {
        title: 'Data Cubes',
        url: '/data_cubes',
        tag: true,
      },
      {
        title: dataCube?.name || '',
        // url: `/data_cubes/${dataCube?.id}`,
        url: '/data_cubes',
        tag: true,
      },
      {
        title: pathname?.endsWith('/tasks')
          ? `Tasks (${taskCount})`
          : 'Task Overview',
        url: `/data_cubes/${dataCube?.id}/${pathname?.endsWith('/tasks') ? 'tasks' : 'task_overview'}`,
      },
    ];
  }, [
    businessUnit?.total_tasks,
    selectedYear,
    selectedStatus,
    pathname,
    dataCube?.id,
    dataCube?.name,
    tasks?.length,
  ]);

  const title = useMemo(() => {
    if (pathname.endsWith('/task_overview')) {
      return 'Task Overview';
    }
    const count = pathname.startsWith('/tasks')
      ? businessUnit?.total_tasks || 0
      : businessUnit?.total_tasks || 0;

    return `Tasks (${count})`;
  }, [businessUnit?.total_tasks, selectedYear, selectedStatus, pathname]);

  const breadCrumbMenu: BreadCrumbProps[] = useMemo(
    () => (breadCrumbsItem.length > 0
      ? [
        {
          title,
          breadCrumb: breadCrumbsItem,
        },
      ]
      : []),
    [breadCrumbsItem, title],
  );

  type Task = {
    id: number;
    frequency: string;
    status:
      | 'COMPLETED'
      | 'IN_PROGRESS'
      | 'REJECTED'
      | 'CREATED'
      | 'SUBMITTED'
      | 'REASSIGNED'
      | 'REVIEWING';
  };

  type Module = {
    id: number;
    datacube_name?: string;
    name: string;
    tasks: Task[];
    dataProvider: {
      id: number;
      name: string;
      avatar: string;
    };
    dataReviewer: {
      id: number;
      name: string;
      avatar: string;
    };
  };

  type Site = {
    id: string;
    name: string;
    taskCount: string;
    status: 'Completed' | 'In Progress' | 'Pending';
    modules: Module[] | any[];
  };

  type Tab = {
    id: string;
    name: string;
    icon: string;
    sites: Site[];
  };

  useEffect(() => {
    const getBusinessUnits = async (status: string, year: any) => {
      const reqId = ++fetchRequestIdRef.current;
      // keep existing businessUnit data while loading
      setIsBusinessUnitLoading(true);
      try {
        let res: any;
        if (pathname.startsWith('/data_cubes')) {
          res = await DataCube.getDatacubeBusinessUnitsBasedOnUser(
            dataCube?.id,
            apiKey,
            status,
            token,
          );
        } else {
          res = await TaskService.getBusinessUnitsBasedOnUser(
            apiKey,
            status,
            year,
            token,
          );
        }

        if (reqId === fetchRequestIdRef.current) {
          const businessUnitData = res?.data;
          setBusinessUnits(businessUnitData);
        }
        return res?.data;
      } catch (err) {
        console.error('Error fetching site modules:', err);
      } finally {
        if (reqId === fetchRequestIdRef.current) {
          setIsBusinessUnitLoading(false);
        }
      }
    };

    // fetch using debounced values to avoid rapid refetches
    getBusinessUnits(debouncedStatus, debouncedYear);
  }, [debouncedYear, debouncedStatus, pathname, dataCube?.id, apiKey, token]);

  const quarterOrder = ['Q1', 'Q2', 'Q3', 'Q4'];
  const monthOrder = [
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
    'January',
    'February',
    'March',
  ];

  const getOrderIndex = (frequency: string) => {
    if (!frequency) return 999;
    const f = frequency.trim().toUpperCase();

    // Check if it's a quarter
    const quarterIndex = quarterOrder.findIndex((q) => f.startsWith(q));
    if (quarterIndex !== -1) return quarterIndex;

    // Otherwise, check month order
    const monthIndex = monthOrder.findIndex((m) => f.toLowerCase().startsWith(m.toLowerCase()));
    return monthIndex !== -1 ? monthIndex : 999;
  };

  const groupedModules = useMemo(() => {
    const modules: any[] = [];
    modulesData?.forEach((task: any) => {
      const existingModule = modules.find(
        (m) => m.name === task.module_name && m.datacube_name === task.datacube_name,
      );

      const taskItem = {
        id: task.task_id,
        frequency: task.frequency_name,
        status: task.task_status,
      };

      if (existingModule) {
        existingModule.tasks.push(taskItem);
      } else {
        modules.push({
          id: task.datacube_id,
          datacube_id: task.datacube_id,
          datacube_name: task.datacube_name,
          timeframe: task?.frequency,
          moduleId: task.module_id,
          name: task.module_name,
          site_name: task?.site_name,
          yearly_sheet_link: task?.template_yearly_file_url,
          uploaded_yearly_file_url: task?.uploaded_yearly_file_url,
          tasks: [taskItem],
          dataProvider: {
            id: task.data_provider.id,
            name: task.data_provider.name,
            avatar: '',
          },
          dataReviewer: {
            id: task.data_reviewer.id,
            name: task.data_reviewer.name,
            avatar: '',
          },
        });
      }
    });

    // Sort tasks inside each module
    modules.forEach((module: any) => {
      module.tasks.sort(
        (a: any, b: any) => getOrderIndex(a.frequency) - getOrderIndex(b.frequency),
      );
    });

    return modules;
  }, [modulesData]);

  const activeTab: any = businessUnit?.data?.find(
    (t: any) => t.business_unit_id === activeTabId,
  );

  const activeSites = activeTab?.sites || [];
  const activeModules = activeSites.find((s: any) => s.id === activeSiteId)?.modules || [];

  // Filter sites based on search term
  const filteredSites = Array.isArray(activeSites)
    ? activeSites.filter((site: any) => site?.site_name?.toLowerCase().includes(siteSearchTerm.toLowerCase()))
    : [];
  // Filter modules based on search term
  // const filteredModules = Array.isArray(groupedModules)
  //   ? groupedModules.filter((module: any) =>
  //       module?.name?.toLowerCase().includes(moduleSearchTerm.toLowerCase())
  //     )
  //   : [];

  // Helper to generate a stable composite key for a module
  const getModuleKey = (m: any) => `${m?.moduleId ?? m?.id ?? ''}_${m?.datacube_id ?? m?.datacubeId ?? ''}_${String(
    m?.name ?? m?.module_name ?? '',
  )
    .toLowerCase()
    .trim()}`;

  const displayModules = useMemo(() => {
    // Prefer modules from the active site when available, otherwise use groupedModules
    const source = Array.isArray(activeModules) && activeModules.length
      ? activeModules
      : groupedModules;

    const filtered = Array.isArray(source)
      ? source.filter((item: any) => (!moduleSearchTerm.trim()
        ? true
        : String(item?.name || '')
          .toLowerCase()
          .includes(moduleSearchTerm.toLowerCase())))
      : [];

    // Deduplicate modules using composite key
    const seen = new Set();
    const uniqueFiltered = filtered.filter((m: any) => {
      const key = getModuleKey(m);
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    });

    return uniqueFiltered;
  }, [activeModules, groupedModules, moduleSearchTerm]);
  // show what's being rendered for debugging
  // eslint-disable-next-line no-console

  useEffect(() => {
    try {
      const el = document.querySelector('.module-list-container');
    } catch (e) {
      // ignore
    }
  }, [displayModules]);

  // After modules render, if there was a saved module id, restore the selectedModule
  useEffect(() => {
    try {
      const savedModuleId = savedModuleIdRef.current;
      if (savedModuleId && displayModules && displayModules.length) {
        const found = displayModules.find(
          (m: any) => String(m.moduleId || m.id) === String(savedModuleId),
        );
        if (found) {
          setSelectedModule(found);
        }
        // clear ref after attempt
        savedModuleIdRef.current = null;
      }
    } catch (e) {
      // ignore
    }
  }, [displayModules]);

  // Persist filters whenever they change
  useEffect(() => {
    try {
      if (typeof window === 'undefined') return;
      const toSave = {
        activeTabId,
        activeSiteId,
        selectedStatus,
        selectedYear,
        siteSearchTerm,
        moduleSearchTerm,
        selectedModuleId:
          selectedModule?.moduleId || selectedModule?.id || null,
      };
      localStorage.setItem(storageKey, JSON.stringify(toSave));
    } catch (e) {
      // ignore
    }
  }, [
    activeTabId,
    activeSiteId,
    selectedStatus,
    selectedYear,
    siteSearchTerm,
    moduleSearchTerm,
    selectedModule,
    storageKey,
  ]);
  useEffect(() => {
    try {
      const items = Array.from(document.querySelectorAll('.list-module-item'));
      // eslint-disable-next-line no-console
    } catch (e) {
      // ignore
    }
  }, [displayModules]);
  useEffect(() => {
    try {
      const container = document.querySelector('.module-list-container');
      if (!container) return;
      // count only direct children with the class to avoid nested/duplicated matches
      // @ts-ignore
      const directItems = Array.from(
        container.querySelectorAll(':scope > .list-module-item'),
      );
      // eslint-disable-next-line no-console
    } catch (e) {
      // ignore
    }
  }, [displayModules]);
  const handleClose = () => {
    setShowConfirm(false);
    // hideModal;
    setPendingAction(null);
  };

  const handleConfirm = async () => {
    if (!confirmData?.module) return;

    const payload = {
      task_ids: confirmData?.module?.tasks?.map((task: any) => task?.id),
      data_provider: confirmData?.provider?.id,
      data_reviewer: confirmData?.reviewer?.id,
    };

    try {
      setModuleReassignConfirm(true);
      await TaskService.reAssignModule(slug, payload);
      toast.success('Module reassigned successfully');
      setModuleReassignConfirm(false);
      // refreshTasks?.(); // refresh background task list
    } catch (error) {
      console.error('Reassign error:', error);
      toast.error('Failed to reassign module');
    } finally {
      setShowConfirm(false);
      setModuleReassignConfirm(false);
      // setShowConfirm(true);
      // hideModal();
    }
  };

  // Handle Provider selection using composite module key
  const handleSelectUser = (
    moduleKey: string,
    provider: { label: string; value: string },
  ) => {
    const reModule = displayModules.find(
      (mod: any) => getModuleKey(mod) === moduleKey,
    );

    const updatedProvider = { id: provider.value, name: provider.label };

    // optional auto default reviewer per moduleKey
    const defaultReviewer = (selectedReviewer
      && selectedReviewer[moduleKey]) || {
      id: provider.value,
      name: `${provider.label} Reviewer`,
    };

    // store provider/reviewer by moduleKey so multiple modules with same ids don't collide
    setSelectedProvider((prev: any) => ({
      ...(prev || {}),
      [moduleKey]: updatedProvider,
    }));
    setSelectedReviewer((prev: any) => ({
      ...(prev || {}),
      [moduleKey]: defaultReviewer,
    }));
    setModuleReassign(reModule);

    setConfirmData({
      module: reModule,
      provider: updatedProvider,
    });
    setPendingAction('provider');
    setShowConfirm(true);
  };

  // Handle Reviewer selection using composite module key
  const handleReviewerUser = (
    moduleKey: string,
    reviewer: { label: string; value: string },
  ) => {
    const reModule = displayModules.find(
      (mod: any) => getModuleKey(mod) === moduleKey,
    );
    const updatedReviewer = { id: reviewer.value, name: reviewer.label };

    setSelectedReviewer((prev: any) => ({
      ...(prev || {}),
      [moduleKey]: updatedReviewer,
    }));
    setModuleReassign(reModule);
    setConfirmData({
      module: reModule,
      reviewer: updatedReviewer,
    });
    setPendingAction('reviewer');
    setShowConfirm(true);
  };

  const yearOptions = pathname.startsWith('/tasks')
    ? (dataCube?.map((cube: any) => ({
      label: cube?.financial_year ?? cube?.name,
      value: cube?.financial_year ?? cube?.name,
    })) ?? [])
    : [];
  yearOptions.unshift({
    label: 'All',
    value: '',
  });
  useEffect(() => {
    if (yearOptions.length === 1) {
      setSelectedYear(yearOptions[0].value);
    }
  }, [yearOptions]);

  useEffect(() => {
    if (!activeSiteId) return;

    const fetchSiteModules = async () => {
      setIsModuleLoading(true);
      try {
        if (pathname.startsWith('/data_cubes')) {
          const res = await DataCube.getDatacubeTasksBySiteId(
            dataCube?.id,
            activeSiteId,
            apiKey,
            selectedStatus,
            token,
          );
          const { data } = res?.data;
          setModules(data);
        } else {
          const res = await TaskService.getTasksBySiteId(
            activeSiteId,
            apiKey,
            selectedStatus,
            selectedYear,
            token,
          );
          const { data } = res?.data;
          setModules(data);
        }
      } catch (err) {
        console.error('Error fetching site modules:', err);
      } finally {
        setIsModuleLoading(false);
      }
    };

    fetchSiteModules();
  }, [
    activeSiteId,
    selectedYear,
    selectedStatus,
    ModuleReassignConfirm,
    confirmSubmit,
    pathname,
    dataCube?.id,
    apiKey,
    token,
  ]);

  const handleDownloadOrGenerateTemplate = async (
    datacubename: string,
    modulename: string,
    moduleId: string,
    siteId: string,
    yearlysheet: string,
    datacubeId: string, // ✅ datacubeId parameter
  ) => {
    const moduleKey = `${moduleId}_${siteId}`;

    // If template exists, download it
    if (yearlysheet) {
      try {
        setIsDownloading(true);
        const link = document.createElement('a');
        link.href = yearlysheet;
        link.download = yearlysheet;
        link.style.display = 'none';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        toast.success('Template downloaded successfully');
      } catch (error) {
        console.error('Failed to download template:', error);
        toast.error('Failed to download template');
      } finally {
        setIsDownloading(false);
      }
    } else {
      // Generate template
      try {
        setGeneratingTemplates((prev) => ({ ...prev, [moduleKey]: true }));
        toast.loading('Generating template...', { id: 'generate-template' });

        // Handle both single datacube and array of datacubes
        let finalDatacubeId = datacubeId;

        // If coming from /data_cubes/:id/tasks route
        if (pathname.startsWith('/data_cubes') && dataCube?.id) {
          finalDatacubeId = dataCube.id;
        }
        // If coming from /tasks route, datacubeId should already be correct from module

        const payload = { datacubeIds: finalDatacubeId };

        await TaskService.generateTemplate(payload, moduleId, siteId, slug);

        toast.dismiss('generate-template');
        toast.success('Template generated successfully!');

        // Refresh modules data
        const res = pathname.startsWith('/data_cubes')
          ? await DataCube.getDatacubeTasksBySiteId(
            finalDatacubeId,
            activeSiteId,
            apiKey,
            selectedStatus,
            token,
          )
          : await TaskService.getTasksBySiteId(
            activeSiteId,
            apiKey,
            selectedStatus,
            selectedYear,
            token,
          );

        const { data } = res?.data;
        setModules(data);
      } catch (error) {
        console.error('❌ Failed to generate template:', error);
        toast.dismiss('generate-template');
        toast.error('Failed to generate template');
      } finally {
        setGeneratingTemplates((prev) => ({ ...prev, [moduleKey]: false }));
      }
    }
  };

  useEffect(() => {
    const getTaskBySelectedTask = async () => {
      if (!selectedTask) return;
      try {
        setIsTaskLoading(true);
        const res = await TaskService.getById(selectedTask, slug);
        const { task: _task, success } = res?.data || {};
        if (success && _task) {
          setSelectedTaskData(_task);
          setTask(_task);
        }
      } catch (error) {
        toast.error('Failed to fetch task data');
      } finally {
        setTimeout(() => setIsTaskLoading(false), 150);
      }
    };
    getTaskBySelectedTask();
  }, [selectedTask]);

  const { taskPermissions, userRoles } = useTaskPermissions({ task, user });
  const {
    modules,
    questions,
    getCurrentIndicator,
    calculateAnsweredPercentage,
    getCorrectionCount,
  } = useTaskCalculations({
    taskQuestions: selectedTaskData?.task_questions || [],
  });
  const {
    responses, isLoading, getTask, updateStatus, handleChange,
  } = useTaskForm({
    task,
    slug,
    selectedTaskId: selectedTask,
    onTaskUpdate: setTask,
    questions,
    isDataProvider: taskPermissions?.canEnterData,
  });

  // ensure we fetch responses for the newly selected task
  useEffect(() => {
    if (!selectedTask) return;
    getTask();
  }, [selectedTask, getTask]);
  const submittingRef = useRef(false);

  const onSubmit = async () => {
    // prevent re-entry when form-level loading or our submit already in progress
    if (isLoading || submittingRef.current) return;
    submittingRef.current = true;

    try {
      // flush pending state updates (important if user just clicked submit after last change)
      // eslint-disable-next-line no-promise-executor-return
      await new Promise((resolve) => setTimeout(resolve, 0));

      // make a snapshot of the latest state
      const latestQuestions = cleanedQuestions(questions);

      if (
        taskPermissions.canReview
        || (userRoles?.isAdmin && task?.status === 'REVIEWING')
      ) {
        const isAllApproved = latestQuestions.every(
          (item) => item?.is_approved !== null && item?.is_approved === true,
        );

        await updateStatus(isAllApproved ? 'COMPLETED' : 'REJECTED');
      } else if (
        taskPermissions.canEnterData
        || (userRoles?.isAdmin && task?.status === 'IN_PROGRESS')
      ) {
        await updateStatus('SUBMITTED');
      }

      // refresh server state to avoid race-condition where submission appears pending
      try {
        await getTask();
      } catch (refreshErr) {
        console.error('Failed to refresh task after submit', refreshErr);
      }

      if (pathname.includes('/tasks')) {
        await router.push(
          pathname?.includes('/data_cubes')
            ? `/data_cubes/${urlParams?.id}/tasks`
            : '/tasks',
        );

        // refresh parent after navigation
        try {
          router.refresh();
        } catch {
          /* ignore */
        }
      }
      setConfirmSubmit(true);
      hideModal();
    } catch (err) {
      console.error('Submit failed', err);
    } finally {
      submittingRef.current = false;
    }
  };

  const TaskSkeleton = () => (
    <div className="p-4 animate-pulse">
      <div className="h-6 bg-gray-300 rounded w-1/3 mb-4" />
      <div className="h-4 bg-gray-200 rounded w-full mb-2" />
      <div className="h-4 bg-gray-200 rounded w-5/6 mb-2" />
      <div className="h-4 bg-gray-200 rounded w-4/6" />
    </div>
  );

  const renderModalContent = () => (
    <>
      <div
        className="d-flex gap-2 flex-row justify-content-start mt-3 overflow-x-scroll pb-2"
        // style={{ width: 400 }}
      >
        {selectedModule?.tasks?.map((task: any) => {
          const getShortMonth = (monthName: string) => {
            const months: Record<string, string> = {
              April: 'Apr',
              May: 'May',
              June: 'Jun',
              July: 'Jul',
              August: 'Aug',
              September: 'Sep',
              October: 'Oct',
              November: 'Nov',
              December: 'Dec',
              January: 'Jan',
              February: 'Feb',
              March: 'Mar',
            };
            return months[monthName] || monthName;
          };

          return (
            <button
              type="button"
              key={task?.id}
              className={`px-4 py-2 rounded-pill frequency_btn ${
                selectedTask === task?.id ? 'active' : ''
              }`}
              style={{
                border:
                  task?.status === 'SUBMITTED'
                  || task?.status === 'REVIEWING'
                  || task?.status === 'COMPLETED'
                    ? '1px solid #2F855A'
                    : '1px solid var(--secondary)',
                backgroundColor:
                  task?.status === 'SUBMITTED'
                  || task?.status === 'REVIEWING'
                  || task?.status === 'COMPLETED'
                    ? '#d4e9dfff'
                    : '',
                // color: task?.status === 'SUBMITTED' ? 'black' : '',
              }}
              // onClick={() => setSelectedTask(task.id)}
              onClick={() => {
                // set selectedTask and task data synchronously to avoid race
                // const taskData =
                //   tasks?.find((t: any) => t?.id === task.id) ?? null;
                flushSync(() => {
                  setSelectedTask(task.id);
                  // setSelectedTaskData(taskData);
                  // setTask(taskData);
                });
                // immediately fetch responses for new task
                // getTask is stable (from useTaskForm) and will fetch using the updated `task`
                // getTask();
              }}
            >
              {getShortMonth(task?.frequency?.split('_')?.[0] || '')}
            </button>
          );
        })}
      </div>
      {isTaskLoading ? (
        <TaskSkeleton />
      ) : selectedTaskData && modules?.length > 0 ? (
        <PreviewModal
          key={`${selectedTask}-${responses?.length}`}
          taskId={selectedTaskData?.id}
          modules={modules}
          hideModal={hideModal}
          responses={responses}
          slug={slug}
          updateStatus={updateStatus}
          onSubmit={onSubmit}
        />
      ) // ) : (
      //   <div className="text-center text-muted mt-3">No modules available.</div>
      // )
        : null}
    </>
  );
  const modal = useModal({
    style: {
      size: 'xl',
      title: 'Preview',
      onClose: hideModal,
    },
    content: renderModalContent(), // render fresh content every render
  });

  useEffect(() => {
    if (selectedModule) {
      // open modal only after selectedModule is set
      modal();
    }
  }, [selectedModule, selectedTaskData, selectedTask]);

  useEffect(() => {
    // Only refresh modal content if modal is already open
    if (isPreviewOpen) {
      modal(); // re-render modal with new content
    }
  }, [responses, selectedTask]);

  useEffect(() => {
    if (selectedModule?.tasks?.length && !selectedTask) {
      const firstTaskId = selectedModule.tasks[0].id;
      setSelectedTask(firstTaskId);
    }
  }, [selectedModule]);

  useEffect(() => {
    if (confirmSubmit && selectedTask) {
      setSelectedModule((prev: any) => {
        if (!prev) return prev;
        const updatedTasks = prev.tasks.map((t: any) => (t.id === selectedTask ? { ...t, status: 'SUBMITTED' } : t));
        return { ...prev, tasks: updatedTasks };
      });

      // prevent repeat trigger
      setConfirmSubmit(false);
    }
  }, [confirmSubmit, selectedTask]);

  useEffect(() => {
    const loadProviderOptions = async () => {
      // const filter = { search: input, role: currentRole, status: 'ACTIVE' };
      const filter = { role: 'DATA_PROVIDER', status: 'ACTIVE', limit: '100' };
      const res = await UserService.getAllUsers(filter, slug);
      const { users } = res?.data as unknown as { users: IUser[] };
      const newOptions = users?.map((user) => ({
        label: user.name,
        value: user.id.toString(),
      })) || [];
      setDataProviders(newOptions);
      return newOptions || [];
    };
    loadProviderOptions();
    const loadReviewerOptions = async () => {
      // const filter = { search: input, role: currentRole, status: 'ACTIVE' };
      const filter = { role: 'DATA_REVIEWER', status: 'ACTIVE', limit: '100' };
      const res = await UserService.getAllUsers(filter, slug);
      const { users } = res?.data as unknown as { users: IUser[] };
      const newOptions = users?.map((user) => ({
        label: user.name,
        value: user.id.toString(),
      })) || [];
      setDataReviewers(newOptions);
      return newOptions || [];
    };
    loadReviewerOptions();
  }, []);

  const instruction = [
    {
      content: (
        <span className="mb-2">
          <span className="fw-600 textPrimary">
            Download the Excel Template
          </span>
          {' '}
          provided and fill in the required details.
        </span>
      ),
    },
    {
      content: (
        <span className="mb-2">
          <span className="fw-600 textPrimary">
            Do not leave any questions unanswered
          </span>
          {' '}
          — incomplete responses may prevent successful upload.
        </span>
      ),
    },
    {
      content: (
        <span className="mb-2">
          <span className="fw-600 textPrimary">Do not rename the sheets.</span>
          {' '}
          Sheet names are linked to reporting frequencies; changing them will
          cause the data to be stored incorrectly.
        </span>
      ),
    },
    {
      content: (
        <span className="mb-2">
          <span className="fw-600 textPrimary">For dropdown questions,</span>
          {' '}
          select responses
          {' '}
          <span className="fw-600 textPrimary">
            only from the available options
          </span>
          {' '}
          in the template.
        </span>
      ),
    },
    {
      content: (
        <span className="mb-2">
          <span className="fw-600 textPrimary">
            For number-based questions,
          </span>
          {' '}
          enter
          {' '}
          <span className="fw-600 textPrimary">numeric values only.</span>
          {' '}
          Text entries will cause the sheet to be
          {' '}
          <span className="fw-600 textPrimary">rejected.</span>
          {' '}
        </span>
      ),
    },
    {
      content: (
        <span className="mb-2">
          <span className="fw-600 textPrimary">If uploading in bulk,</span>
          {' '}
          please
          {' '}
          <span className="fw-600 textPrimary">
            open each task after upload, verify all answers, and then submit
          </span>
          {' '}
          to ensure data accuracy.
        </span>
      ),
    },
  ];
  return (
    <div className="bg-white">
      <PageHeaderWrapper
        breadCrumbMenu={breadCrumbMenu}
        extraClassName="my-4 px-4 pt-3"
        iswhite
        title={title}
        stackComponent={(
          <div className="d-flex align-items-center gap-3 flex-grow-1 justify-content-end">
            {pathname?.endsWith('/tasks') && (
              <div className="d-flex flex-grow-1 gap-3 justify-content-end flex-wrap flex-md-nowrap">
                {pathname?.startsWith('/tasks') ? (
                  <div className="">
                    {/* <StatusFilter paramName="task_status" /> */}
                    <div className="min-width-select">
                      <Select
                        //  isDisabled={isViewPage}
                        placeholder="Select Financial Year"
                        options={yearOptions}
                        value={yearOptions?.find(
                          (opt: any) => opt?.value === selectedYear,
                        )}
                        onChange={(opt) => setSelectedYear(opt?.value || '')}
                        isMulti={false}
                        classNamePrefix="custom_select_input"
                        styles={CustomStyles}
                      />
                    </div>
                  </div>
                ) : (
                  ''
                )}

                {/* <div className="">
                  <StatusFilter paramName="status" />
                </div> */}

                <div className="status-filter">
                  <style jsx>
                    {`
                      .dropdown-item.active,
                      .dropdown-item:active,
                      .dropdown-item.custom-active {
                        background-color: var(--textsecondary) !important;
                        color: #000 !important;
                      }
                      .dropdown-item.custom-active:hover {
                        background-color: var(--textsecondary) !important;
                        color: #000 !important;
                      }
                    `}
                  </style>
                  <Dropdown>
                    <Dropdown.Toggle
                      className="d-flex align-items-center justify-content-between gap-2 px-3 py-2 border rounded"
                      style={{
                        backgroundColor: 'white',
                        border: '1px solid #ced4da',
                        color: '#495057',
                        minWidth: '160px',
                        fontSize: '14px',
                      }}
                      id="status-filter-dropdown"
                    >
                      <span>{getSelectedLabel()}</span>
                      <FaChevronDown size={12} />
                    </Dropdown.Toggle>

                    <Dropdown.Menu style={{ minWidth: '160px' }}>
                      {statusOptions.map((option) => (
                        <Dropdown.Item
                          key={option.value}
                          onClick={() => setSelectedStatus(option.value)}
                          className={`d-flex align-items-center py-2 px-3 ${selectedStatus === option.value ? 'custom-active' : ''}`}
                          style={{
                            fontSize: '14px',
                            backgroundColor:
                              selectedStatus === option.value
                                ? 'var(--textsecondary) !important'
                                : 'transparent',
                            color:
                              selectedStatus === option.value
                                ? '#000 !important'
                                : '#495057',
                          }}
                        >
                          {option.label}
                        </Dropdown.Item>
                      ))}
                    </Dropdown.Menu>
                  </Dropdown>
                </div>

                {/* <div>
                  <Sort params={params as unknown as Params} />
                </div> */}
              </div>
            )}
            {pathname?.endsWith('/task_overview')
              && context?.currentRole?.DATA_CUBE?.includes('CONFIG') && (
                <div className="">
                  <Button
                    isPill
                    text="Configure / Publish"
                    onClick={() => {
                      setActionType('Configure');
                    }}
                    isDisabled={
                      dataCube?.status !== 'CREATED' || !(tasks?.length > 0)
                    }
                  />
                </div>
            )}
          </div>
        )}
      >
        {/* <Table<ITask> data={tasks} columns={columns} meta={meta} /> */}

        {/* Tabs Navigation with updated styling */}
        <div
          className="px-3 border-b border-border mb-6"
          style={{
            position: 'sticky',
            top: 200,
            background: 'white',
            zIndex: 200,
          }}
        >
          <nav className="flex gap-3 overflow-x-auto">
            {/* {tabs.map((tab: Tab) => ( */}

            {isBusinessUnitLoading ? (
              <BusinessUnitSkeleton />
            ) : (
              businessUnit?.data?.map((bu: any) => (
                <button
                  type="button"
                  key={bu.business_unit_id}
                  onClick={() => setActiveTabId(bu.business_unit_id)}
                  className={`flex items-center gap-2 py-3 px-1 fw-500 fs-16 
                        ${
                          activeTabId === bu.business_unit_id
                            ? 'active-tab'
                            : 'non-active-tab'
                        }
                      `}
                >
                  {/* <Icon name={tab.icon} size={16} /> */}
                  <span>{bu.business_unit_name}</span>
                </button>
              ))
            )}
          </nav>
        </div>

        <div className="row">
          <div className="col-12 col-md-3 pe-0">
            <div className="analytics_module_container py-4">
              <div className="px-3 bg-white">
                <div
                  className=""
                  style={{
                    position: 'sticky',
                    top: 265,
                    background: 'white',
                    zIndex: 100,
                  }}
                >
                  <h6 className="fw-700">Sites</h6>

                  {/* 🔍 Search Input */}
                  <div className="position-relative">
                    <input
                      type="text"
                      placeholder="Search sites..."
                      className="form-control mb-3 bg-light"
                      value={siteSearchTerm}
                      onChange={(e) => setSiteSearchTerm(e.target.value)}
                    />
                    <IoSearch
                      className="position-absolute"
                      style={{
                        top: '50%',
                        right: '15px',
                        transform: 'translateY(-50%)',
                      }}
                      color="#757575"
                      size={20}
                    />
                  </div>
                </div>
                <div className="site-list-container">
                  {isSiteLoading ? (
                    <SiteSkeleton />
                  ) : filteredSites.length > 0 ? (
                    filteredSites.map((site: any) => (
                      <div
                        key={site?.id}
                        onClick={() => {
                          setActiveSiteId(site.site_id);
                        }}
                        className={`d-flex justify-content-between gap-2 mb-3 is_radius ${
                          activeSiteId === site?.site_id ? 'active' : ''
                        }`}
                      >
                        <div
                          className="p-2 py-3 d-flex flex-column gap-2 flex-grow-1"
                          aria-hidden
                          //   onClick={() => getModuleById(module?.id)}
                        >
                          <h6 className="fs-15 fw-600 mb-0 letter-spacing text-capitalize">
                            {site?.site_name}
                          </h6>
                          <p className="m-0 fs-13">
                            <span className="me-1">
                              {site?.completed_module_count}
                              {' '}
                              /
                              {' '}
                              {site?.total_module_count}
                            </span>
                            <Pill pillText="Completed" />
                          </p>
                        </div>
                        <div>
                          <MdOutlineKeyboardDoubleArrowRight
                            size={24}
                            className="me-4"
                            color="#757575"
                          />
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="text-muted mt-3">No Sites found</p>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="col-12 col-md-9 ps-0 border-start">
            {/* <div className="analytics_module_container py-4"> */}
            <div className="py-4">
              <div className="px-3">
                <div
                  className=""
                  style={{
                    position: 'sticky',
                    top: 265,
                    background: 'white',
                    zIndex: 100,
                  }}
                >
                  <h6 className="fw-700">Modules</h6>

                  {/* 🔍 Search Input */}
                  <div className="position-relative">
                    <input
                      type="text"
                      placeholder="Search modules..."
                      className="form-control mb-3 bg-light"
                      value={moduleSearchTerm}
                      onChange={(e) => setModuleSearchTerm(e.target.value)}
                    />
                    <IoSearch
                      className="position-absolute"
                      style={{
                        top: '50%',
                        right: '15px',
                        transform: 'translateY(-50%)',
                      }}
                      color="#757575"
                      size={20}
                    />
                  </div>
                </div>
                <div className="module-list-container">
                  {/* <div className="d-flex justify-content-between align-items-center mb-2">
                    <small className="text-muted">
                      {moduleSearchTerm?.trim()
                        ? `Showing ${displayModules.length} module(s) for "${moduleSearchTerm}"`
                        : `Showing ${displayModules.length} module(s)`}
                    </small>
                  </div> */}
                  {isModuleLoading ? (
                    <ModuleSkeleton />
                  ) : displayModules.length > 0 ? (
                    displayModules.map((module: any, idx: number) => {
                      // const isUploadOpen = openUploadFor === module?.id;
                      const isUploadOpen = openUploadFor === idx;
                      const keyId = getModuleKey(module) || `${module?.id ?? idx}`;
                      const selectedUsers = selectedProvider[keyId] || module?.dataProvider;
                      const selectedReviewerUsers = selectedReviewer[keyId] || module?.dataReviewer;
                      return (
                        <div key={keyId} className="mb-3 list-module-item">
                          <AccordionWithActions
                            key={keyId}
                            // accordionText={`${module?.name} (
                            //   ${module?.datacube_name}
                            // )`}
                            accordionText={(
                              <div className="d-flex flex-column justify-content-center">
                                <h4 className="fs-14 fw-600">{module?.name}</h4>
                                <p className="text-light-gray fw-500 mb-0">
                                  {module?.datacube_name}
                                </p>
                              </div>
                            )}
                            children={(
                              <div className="border px-3 py-3 d-flex gap-3 flex-wrap">
                                {module?.tasks?.map((taskcard: any) => (
                                  <div
                                    key={taskcard?.id}
                                    className="task-frequency-card"
                                    // onClick={() => router.push(`/tasks/${taskcard?.id}`)}
                                    onClick={() => (pathname.startsWith('/data_cubes')
                                      ? router.push(
                                        `/data_cubes/${dataCube?.id}/tasks/${taskcard?.id}/view`,
                                      )
                                      : router.push(`/tasks/${taskcard?.id}`))}
                                  >
                                    <p className="fs-14 fw-600 mb-2">
                                      {taskcard?.frequency.split('_')[0]}
                                    </p>
                                    <Pill pillText={taskcard?.status} />
                                  </div>
                                ))}
                              </div>
                            )}
                            rightHeader={(
                              <div className="">
                                <div className="d-flex gap-4 align-items-center">
                                  <div className="d-flex align-items-center position-relative">
                                    <span className="fs-13 text-light-gray fw-600 letter-spacing me-2">
                                      Data Provider:
                                    </span>
                                    <Dropdown>
                                      <Dropdown.Toggle
                                        id="dropdown-custom"
                                        variant="light"
                                        className="p-0 border-0 bg-transparent shadow-none"
                                        style={{
                                          outline: 'none',
                                          boxShadow: 'none',
                                        }}
                                        onFocus={(e) => e.target.blur()}
                                      >
                                        <div title={selectedUsers?.name}>
                                          <Avatar
                                            name={selectedUsers?.name}
                                            size="26"
                                            avator=""
                                            className="rounded-circle"
                                            title={selectedUsers?.name || ''}
                                          />
                                        </div>
                                      </Dropdown.Toggle>
                                      {(user?.role === 'ADMIN'
                                        || user?.role
                                          === 'SUSTAINABILITY_MANAGER') && (
                                          <Dropdown.Menu
                                            style={{
                                              minWidth: '150px',
                                              maxHeight: '250px',
                                              overflowY: 'auto',
                                              borderRadius: '12px',
                                              border: '1px solid #e0e0e0',
                                              boxShadow:
                                              '0 4px 12px rgba(0,0,0,0.1)',
                                              padding: '10px',
                                              // backgroundColor: '#fff',
                                              background: '#232538',
                                            }}
                                            className="assign-menu"
                                          >
                                            <div
                                              className="position-relative mb-2"
                                              style={{
                                                display: 'flex',
                                                alignItems: 'center',
                                                background: '#f8f9fa',
                                                borderRadius: '8px',
                                                padding: '0px 8px',
                                                boxShadow:
                                                'inset 0 1px 2px rgba(0,0,0,0.05)',
                                              // left: '-50px',
                                              }}
                                            >
                                              <input
                                                type="text"
                                                placeholder="Search Providers..."
                                                className="border-0 bg-transparent p-2"
                                                style={{
                                                  fontSize: '13px',
                                                  outline: 'none',
                                                  boxShadow: 'none',
                                                }}
                                                value={providerSearchTerm}
                                                onChange={(e) => setProviderSearchTerm(
                                                  e.target.value,
                                                )}
                                              />
                                              <IoSearch
                                                style={{
                                                  color: '#757575',
                                                  marginRight: '6px',
                                                  flexShrink: 0,
                                                }}
                                                size={14}
                                              />
                                            </div>

                                            <div
                                              style={{
                                                maxHeight: '200px',
                                                overflowY: 'auto',
                                                paddingRight: '0px',
                                                scrollbarColor: '#232538 #C2D2E4',
                                                scrollbarWidth: 'thin',
                                                paddingBottom: '10px',
                                              }}
                                            >
                                              {providers
                                                ?.filter((provider: any) => provider.label
                                                  .toLowerCase()
                                                  .includes(
                                                    providerSearchTerm.toLowerCase(),
                                                  ))
                                                .map((provider: any) => {
                                                  const isSelected = module?.dataProvider?.name
                                                  === provider.label;
                                                  return (
                                                    <Dropdown.Item
                                                      key={provider.value}
                                                      onClick={() => handleSelectUser(
                                                        keyId,
                                                        provider,
                                                      )}
                                                      disabled={isSelected}
                                                      className="d-flex align-items-center gap-2 justify-content-between"
                                                      style={{
                                                        padding:
                                                        '20px 0px !important',
                                                        // borderRadius: '6px',
                                                        fontSize: '13px',
                                                        fontWeight: 500,
                                                        backgroundColor:
                                                        isSelected
                                                          ? '#FBA900'
                                                          : 'transparent',
                                                        color: 'white',
                                                        cursor: isSelected
                                                          ? 'not-allowed'
                                                          : 'pointer',
                                                        transition:
                                                        'background-color 0.2s ease',
                                                        borderBottom:
                                                        '1px solid white',
                                                      }}
                                                      onMouseEnter={(e) => {
                                                        if (!isSelected) {
                                                          e.currentTarget.style.backgroundColor = '#f1f3f5';
                                                        }
                                                      }}
                                                      onMouseLeave={(e) => {
                                                        if (!isSelected) {
                                                          e.currentTarget.style.backgroundColor = 'transparent';
                                                        }
                                                      }}
                                                    >
                                                      {/* <div className=""> */}
                                                      <p className="m-0 fs-14">
                                                        {provider.label}
                                                      </p>
                                                      <p className="m-0">
                                                        <IoRepeat size={16} />
                                                      </p>
                                                      {/* </div> */}
                                                    </Dropdown.Item>
                                                  );
                                                })}
                                            </div>
                                          </Dropdown.Menu>
                                      )}
                                    </Dropdown>
                                  </div>
                                  <div className="d-flex align-items-center position-relative">
                                    <span className="fs-13 text-light-gray fw-600 letter-spacing me-2">
                                      Data Reviewer:
                                    </span>
                                    <Dropdown>
                                      <Dropdown.Toggle
                                        // id="dropdown-custom"
                                        // variant="light"
                                        // className="p-0"
                                        id="dropdown-custom"
                                        variant="light"
                                        className="p-0 border-0 bg-transparent shadow-none"
                                        style={{
                                          outline: 'none',
                                          boxShadow: 'none',
                                        }}
                                        onFocus={(e) => e.target.blur()}
                                      >
                                        <div
                                          title={selectedReviewerUsers?.name}
                                        >
                                          <Avatar
                                            name={selectedReviewerUsers?.name}
                                            size="26"
                                            avator=""
                                            className="rounded-circle"
                                            title={
                                              selectedReviewerUsers?.name || ''
                                            }
                                          />
                                        </div>
                                      </Dropdown.Toggle>
                                      {(user?.role === 'ADMIN'
                                        || user?.role
                                          === 'SUSTAINABILITY_MANAGER') && (
                                          <Dropdown.Menu
                                            style={{
                                              minWidth: '250px',
                                              maxHeight: '250px',
                                              overflowY: 'auto',
                                              borderRadius: '12px',
                                              border: '1px solid #e0e0e0',
                                              boxShadow:
                                              '0 4px 12px rgba(0,0,0,0.1)',
                                              padding: '10px',
                                              // backgroundColor: '#fff',
                                              background: '#232538',
                                            }}
                                            className="assign-menu"
                                          >
                                            <div
                                              className="position-relative mb-2"
                                              style={{
                                                display: 'flex',
                                                alignItems: 'center',
                                                background: '#f8f9fa',
                                                borderRadius: '8px',
                                                padding: '0px 8px',
                                                boxShadow:
                                                'inset 0 1px 2px rgba(0,0,0,0.05)',
                                              // left: '-50px',
                                              }}
                                            >
                                              <input
                                                type="text"
                                                placeholder="Search Reviewers..."
                                                className="border-0 bg-transparent p-2"
                                                style={{
                                                  fontSize: '13px',
                                                  outline: 'none',
                                                  boxShadow: 'none',
                                                }}
                                                value={reviewerSearchTerm}
                                                onChange={(e) => setReviewerSearchTerm(
                                                  e.target.value,
                                                )}
                                              />
                                              <IoSearch
                                                style={{
                                                  color: '#757575',
                                                  marginRight: '6px',
                                                  flexShrink: 0,
                                                }}
                                                size={14}
                                              />
                                            </div>
                                            <div
                                              style={{
                                                maxHeight: '200px',
                                                overflowY: 'auto',
                                                paddingRight: '0px',
                                                scrollbarColor: '#232538 #C2D2E4',
                                                scrollbarWidth: 'thin',
                                                paddingBottom: '10px',
                                              }}
                                            >
                                              {/* Filter dropdown items based on search input */}
                                              {reviewers
                                                ?.filter((reviewer: any) => reviewer.label
                                                  .toLowerCase()
                                                  .includes(
                                                    reviewerSearchTerm.toLowerCase(),
                                                  ))
                                                .map((reviewer: any) => {
                                                  const isSelected = module?.dataReviewer?.name
                                                  === reviewer.label;
                                                  return (
                                                    <Dropdown.Item
                                                      key={reviewer.value}
                                                      onClick={() => handleReviewerUser(
                                                        keyId,
                                                        reviewer,
                                                      )}
                                                      className="d-flex align-items-center gap-2 justify-content-between"
                                                      style={{
                                                        padding:
                                                        '20px 0px !important',
                                                        // borderRadius: '6px',
                                                        fontSize: '13px',
                                                        fontWeight: 500,
                                                        backgroundColor:
                                                        isSelected
                                                          ? '#FBA900'
                                                          : 'transparent',
                                                        color: 'white',
                                                        cursor: isSelected
                                                          ? 'not-allowed'
                                                          : 'pointer',
                                                        transition:
                                                        'background-color 0.2s ease',
                                                        borderBottom:
                                                        '1px solid white',
                                                      }}
                                                      onMouseEnter={(e) => {
                                                        if (!isSelected) {
                                                          e.currentTarget.style.backgroundColor = '#f1f3f5';
                                                        }
                                                      }}
                                                      onMouseLeave={(e) => {
                                                        if (!isSelected) {
                                                          e.currentTarget.style.backgroundColor = 'transparent';
                                                        }
                                                      }}
                                                      disabled={isSelected}
                                                    >
                                                      <p className="m-0 fs-14">
                                                        {reviewer.label}
                                                      </p>
                                                      <p className="m-0">
                                                        <IoRepeat size={16} />
                                                      </p>
                                                    </Dropdown.Item>
                                                  );
                                                })}
                                            </div>
                                          </Dropdown.Menu>
                                      )}
                                    </Dropdown>
                                  </div>

                                  <div
                                    className="rounded-pill border px-3 py-2 position-relative"
                                    style={{
                                      backgroundColor: '#F5F5F5',
                                    }}
                                  >
                                    <p className="m-0 d-flex align-items-center gap-1">
                                      <RiFileExcel2Line
                                        size={26}
                                        color="#1D6F42"
                                      />
                                      <span className="ms-1 me-1 text-light-gray">
                                        |
                                      </span>
                                      {/* Toggle Icon */}
                                      {isUploadOpen ? (
                                        <IoChevronUp
                                          size={18}
                                          onClick={(e: any) => {
                                            e.stopPropagation();
                                            setOpenUploadFor(null);
                                          }}
                                          style={{ cursor: 'pointer' }}
                                        />
                                      ) : (
                                        <IoChevronDown
                                          size={18}
                                          onClick={(e) => {
                                            e.stopPropagation();
                                            setOpenUploadFor(idx);
                                          }}
                                          style={{ cursor: 'pointer' }}
                                        />
                                      )}
                                    </p>

                                    {/* Upload Dropdown */}
                                    {isUploadOpen && (
                                      <div className="excel-upload-container">
                                        <div className="bg-white border rounded-3 shadow-sm px-4 py-3">
                                          <p className="fs-14 text-light-gray fw-600 text-center mt-3">
                                            Download the Spreadsheet Template!
                                          </p>
                                          <Button
                                            text={
                                              module?.yearly_sheet_link
                                                ? 'Download Template'
                                                : 'Generate Template'
                                            }
                                            prefixIconChildren={
                                              module?.yearly_sheet_link ? (
                                                <MdOutlineFileDownload
                                                  className="me-1"
                                                  size={20}
                                                />
                                              ) : (
                                                <IoRepeat
                                                  className="me-1"
                                                  size={20}
                                                />
                                              )
                                            }
                                            isSolid
                                            btnclassName="w-100 mb-4"
                                            isLoading={
                                              generatingTemplates[
                                                `${module?.moduleId}_${activeSiteId}`
                                              ]
                                            }
                                            isDisabled={
                                              generatingTemplates[
                                                `${module?.moduleId}_${activeSiteId}`
                                              ]
                                            }
                                            onClick={() => handleDownloadOrGenerateTemplate(
                                              module?.datacube_name,
                                              module?.name,
                                              module?.moduleId,
                                              activeSiteId,
                                              module?.yearly_sheet_link,
                                              module?.datacube_id,
                                            )}
                                          />
                                          <FileUploader
                                            btnName="Task"
                                            datacubeId={
                                              module?.datacube_id ?? module?.id
                                            }
                                            moduleId={module?.moduleId}
                                            siteId={activeSiteId}
                                            flag="multiple"
                                            initialUploadedFileUrl={
                                              module?.uploaded_yearly_file_url
                                            }
                                          />
                                          <p className="fs-13 fw-600 text-light-gray mt-4">
                                            <span
                                              className="fw-600 fs-14 mb-1"
                                              style={{ color: 'red' }}
                                            >
                                              Instructions:
                                            </span>
                                            {/* <ol type="1"> */}
                                            {instruction?.map(
                                              (instruction: any, idx: any) => (
                                                // eslint-disable-next-line react/no-array-index-key
                                                <p className="mb-1" key={idx}>
                                                  {idx + 1}
                                                  .
                                                  {' '}
                                                  {instruction?.content}
                                                </p>
                                              ),
                                            )}
                                            {/* </ol> */}
                                          </p>
                                          <div className="d-flex align-items-center gap-2 mt-4">
                                            <div style={{ flex: 0.75 }}>
                                              <Button
                                                onClick={() => {
                                                  flushSync(() => {
                                                    setSelectedTask('');
                                                    setSelectedTaskData(null);
                                                  });
                                                  // setSelectedDataCube(
                                                  //   module?.datacube_name,
                                                  // );
                                                  // setSelectedFrequency(
                                                  //   module?.timeframe,
                                                  // );
                                                  setSelectedModule(module);
                                                  setOpenUploadFor(null);

                                                  setIsPreviewOpen(true); // ✅ track open state
                                                  modal(); // open modal
                                                }}
                                                text="Preview"
                                                type="submit"
                                                isPill
                                                className="w-100"
                                              />
                                            </div>
                                            <div style={{ flex: 0.5 }}>
                                              <Button
                                                text="Cancel"
                                                isBorderButton
                                                type="button"
                                                className="w-100"
                                                onClick={() => setOpenUploadFor(null)}
                                              />
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    )}
                                    {/* <FiFileText size={20} color="#1D6F42" /> */}
                                  </div>
                                </div>
                              </div>
                            )}
                          />
                        </div>
                      );
                    })
                  ) : (
                    <p className="text-muted mt-3">No modules found</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </PageHeaderWrapper>
      <Modal show={showConfirm} onHide={handleClose} centered>
        <Modal.Body>
          <div className="mt-2">
            <div className="d-flex align-items-center justify-content-center">
              <TiWarning color="var(--danger)" size={40} className="me-2" />
              <h5 className="fw-bold text-dark mb-0">
                Are you sure you want to Reassign this Module?
              </h5>
            </div>
            {confirmData?.provider?.name ? (
              <p className="ms-3 mt-2">
                <strong>Module:</strong>
                {' '}
                {confirmData?.module?.name || '—'}
                <br />
                <strong>Data Provider:</strong>
                {' '}
                {confirmData?.provider?.name || 'None'}
              </p>
            ) : (
              <p className="ms-3 mt-2">
                <strong>Module:</strong>
                {' '}
                {confirmData?.module?.name || '—'}
                <br />
                <strong>Data Reviewer:</strong>
                {' '}
                {confirmData?.reviewer?.name || 'None'}
              </p>
            )}
            <div className="d-flex justify-content-center gap-3 mt-4">
              <Button
                text="Cancel"
                // variant="secondary"
                onClick={handleClose}
              />
              <Button
                text="Reassign"
                // variant="primary"
                isSolid
                onClick={handleConfirm}
              />
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
}
