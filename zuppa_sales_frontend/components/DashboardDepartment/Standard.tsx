/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-nested-ternary */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unsafe-optional-chaining */
/* eslint-disable consistent-return */
/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable max-len */
/* eslint @typescript-eslint/no-unused-vars: off */
/* eslint array-callback-return: off */
/* eslint no-shadow: off */
/* eslint jsx-a11y/click-events-have-key-events: off */
/* eslint-disable no-param-reassign */
/* eslint-disable @typescript-eslint/no-use-before-define */
/* eslint-disable no-restricted-globals */
/* eslint-disable react/jsx-no-useless-fragment */
/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable no-lonely-if */
/* eslint-disable import/no-unresolved */
/* eslint-disable react/jsx-props-no-multi-spaces */

'use client';

import React, { Suspense, useEffect, useState } from 'react';
import Select from 'react-select';
import {
  MdChevronRight,
  MdOutlineKeyboardDoubleArrowRight,
} from 'react-icons/md';
import { DataCube } from '@/lib/service';
import { IDataCube } from '@/lib/interface/IDataCube.interface';
import { LogsIcon } from 'lucide-react';
import { AnyTxtRecord } from 'dns';
import { active } from 'd3';
import { BiLoaderCircle } from 'react-icons/bi';
import { Spinner } from 'react-bootstrap';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import PageHeaderWrapper from '../PageHeaderWrapper/PageHeaderWrapper';
import { Option } from '../types';
import './DashboardDepartment.css';
import { CustomStyles } from '../CustomStyles/CustomStyles';
import { Button } from '../Button/Button';
import PageNotFound from '../PageNotFound/PageNotFound';
import AnalyticsDataCard from '../Cards/AnalyticsDataCard';
import AnalyticsTextArea from '../Cards/AnalyticsTextArea';
import AnalyticsChart from '../Charts/AnalyticsChart';
import {
  AnalyticsCardSkeleton,
  AnalyticsChartSkeleton,
  AnalyticsTextAreaSkeleton,
  IndicatorHeaderSkeleton,
} from '../AnalyticsModule/Analytics';

interface IWidget {
  id: string;
  type: string;
  name?: string;
  title?: string;
  chart_type?: string;
  is_stacked?: boolean;
  is_horizontal?: boolean;
  is_metric?: boolean;
  is_time_series?: boolean;
  dashboard_items?: any[];
}

interface IDashboardTab {
  id: string;
  name: string;
  widgets: IWidget[];
  dashboardId?: string;
}

interface ITimeSeriesResponse {
  is_time_series: boolean;
  labels?: string[];
  data?: any[];
}

export default function Standard({
  datacubes,
  token,
  apiKey,
}: {
  datacubes?: IDataCube[];
  token: string;
  apiKey: string;
}) {
  const [data, setData] = useState<IDataCube[]>([]);
  const [financialYears, setFinancialYears] = useState<any[]>([
    {
      label: datacubes?.[0]?.financial_year,
      value: datacubes?.[0]?.id,
    },
  ]);
  const [frequencies, setFrequencies] = useState<
    { label: string; value: string }[]
  >([]);
  const [businessUnits, setBusinessUnits] = useState<
    { label: string; value: string }[]
  >([]);
  const [selectedFY, setSelectedFY] = useState<any>();
  const [selectedFrequency, setSelectedFrequency] = useState<{
    label: string;
    value: string;
  } | null>(null);
  const [selectedBU, setSelectedBU] = useState<{
    label: string;
    value: string;
  } | null>(null);
  const [selectedSite, setSelectedSite] = useState<{
    label: string;
    value: string;
  } | null>(null);
  const [sites, setSites] = useState<{ label: string; value: string }[]>([]);

  const [standardSelected, setStandardSelected] = useState<string>('');

  const [standardsList, setStandardsList] = useState<any[]>([]);

  const [isLoadingStandards, setIsLoadingStandards] = useState(false);

  const [standards, setStandards] = useState<any>();

  const [isLoading, setIsLoading] = useState(false);

  const [tabs, setTabs] = useState<IDashboardTab[]>([]);
  const [standardTabs, setStandardTabs] = useState<IDashboardTab[]>([]);

  const [dashboardData, setDashboardData] = useState<any[]>([]);
  const [standardData, setStandardData] = useState<any[]>([]);

  const [activeTab, setActiveTab] = useState<string>('');
  const [activeStandardTab, setActiveStandardTab] = useState<string>('');

  const [standardDashboards, setStandardDashboards] = useState<
    Record<string, any>
  >({});

  const [error, setError] = useState<string | null>(null);

  const [standardId, setStandardId] = useState<string>('');

  const [timeSeriesData, setTimeSeriesData] = useState<ITimeSeriesResponse | null>(null);
  const [isTimeSeriesLoading, setIsTimeSeriesLoading] = useState(false);
  const [hasTimeSeries, setHasTimeSeries] = useState(false);
  const [dashboardId, setDashboardId] = useState<string>('');
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterValues, setFilterValues] = useState<Record<string, string>>({});
  const [filterMap, setFilterMap] = useState<Record<string, string>>({});

  useEffect(() => {
    const fetchStandards = async () => {
      setIsLoadingStandards(true);
      try {
        const res = await DataCube.getActiveStandards();

        const standards = res?.data?.data; // ✅ this is the array
        if (Array.isArray(standards) && standards.length > 0) {
          setStandardsList(standards);

          if (isInitialLoad) {
            const firstStandard = standards[0];
            setStandardSelected(firstStandard.id);
            setStandardId(firstStandard.id);
            await getStandardById(firstStandard.id);
            setIsInitialLoad(false);
          }
        } else {
          console.error('No Standards data found in response:', res);
          setStandardsList([]);
          setError('No standards found');
        }
      } catch (error) {
        console.error('Failed to fetch Standards:', error);
        setStandardsList([]);
        setError('Failed to load Standards');
      } finally {
        setIsLoadingStandards(false);
      }
    };

    fetchStandards();
  }, [token, apiKey]);

  // console.log(standardsList, '=');

  useEffect(() => {
    setData(datacubes ?? []);
    const yearOptions = datacubes?.map((d) => ({
      label: d.financial_year,
      value: d.id,
    }));
    setFinancialYears(yearOptions ?? []);
    // setSelectedFY(yearOptions?.[0]);
    if (yearOptions && yearOptions.length > 0) {
      setSelectedFY(yearOptions[0]);
    } else {
      setSelectedFY(undefined);
    }
  }, [datacubes]);

  useEffect(() => {
    if (!selectedFY) {
      setFrequencies([]);
      setSelectedFrequency(null);
      return;
    }

    const selectedData = data.find(
      (d) => d.financial_year === selectedFY.label,
    );
    const list: any[] = Array.isArray(selectedData?.datacube_frequency)
      ? selectedData.datacube_frequency
      : [];

    // Month order for sorting monthly labels
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

    // YEARLY fallback (no time buckets)
    if (selectedData?.frequency === 'YEARLY' || list.length === 0) {
      const yearlyOpt = [
        { label: selectedData?.frequency ?? 'Yearly', value: 'all' },
      ];
      setFrequencies(yearlyOpt);
      // setSelectedFrequency(yearlyOpt[0]);
      setSelectedBU(null);
      setSelectedSite(null);
      setSites([]);
      return;
    }

    // build base options from datacube_frequency (unique by id)
    const frequencyOptions = [
      ...Array.from(
        new Map(
          list.map((freq: any) => [
            freq?.id,
            {
              label: freq?.frequency_name ?? freq?.frequency ?? '',
              value: freq?.id,
            },
          ]),
        ).values(),
      ),
    ];

    // always allow "All" at the top
    const withAll = [{ label: 'All', value: 'all' }, ...frequencyOptions];

    // examine labels (trim anything after underscore)
    const labels = withAll.slice(1).map((o) => (o.label || '').split('_')[0]);

    const isQuarterly = labels.some(
      (l) => /^Q[1-4]$/i.test(l) || /quarter/i.test(l),
    );
    const isMonthly = labels.some((l) => monthOrder.includes(l));

    let formatted: { label: string; value: string }[] = withAll;

    if (isQuarterly) {
      // order Q1..Q4
      const qOrder = ['Q1', 'Q2', 'Q3', 'Q4'];
      const mapByLabel = new Map(
        withAll.slice(1).map((o) => {
          const label = (o.label || '').split('_')[0].toUpperCase();
          return [label, { ...o, label }];
        }),
      );
      const quarters = qOrder
        .map((q) => mapByLabel.get(q))
        .filter(Boolean) as any[];
      formatted = [{ label: 'All', value: 'all' }, ...quarters];
    } else if (isMonthly) {
      // normalize month labels and sort by monthOrder
      const normalized = withAll.slice(1).map((o) => ({
        ...o,
        label: (o.label || '').split('_')[0],
      }));
      normalized.sort(
        (a, b) => monthOrder.indexOf(a.label) - monthOrder.indexOf(b.label),
      );
      formatted = [{ label: 'All', value: 'all' }, ...normalized];
    } else {
      // leave as-is (keeps original order), but keep "All" first
      formatted = withAll;
    }

    // apply
    setFrequencies(formatted);
    setSelectedFrequency(formatted[0] ?? null);

    // reset downstream filters
    setSelectedBU(null);
    setSelectedSite(null);
    setSites([]);
  }, [selectedFY, data]);

  // For Business unit dropdowns from FY
  useEffect(() => {
    if (!selectedFY) {
      setBusinessUnits([]);
      setSelectedBU(null);
      return;
    }

    const selectedData = data.find(
      (d) => d.financial_year === selectedFY.label,
    );

    const buMap = new Map();
    selectedData?.datacube_frequency?.forEach((freq) => {
      (Array.isArray(freq.task)
        ? freq.task
        : freq.task
          ? [freq.task]
          : []
      ).forEach((task) => {
        const bu = task.site.business_unit;
        if (!buMap.has(bu.id)) {
          buMap.set(bu.id, { label: bu.name, value: bu.id });
        }
      });
    });

    const buOptions = Array.from(buMap.values());
    setBusinessUnits(buOptions);

    // choose default BU as first item if present
    // setSelectedBU(buOptions?.[0] ?? null);

    setSelectedSite(null);
    setSites([]);
  }, [selectedFY, data]);

  // For Site dropdowns from Business unit
  useEffect(() => {
    if (!selectedFY) {
      setSites([]);
      setSelectedSite(null);
      return;
    }

    const selectedData = data.find(
      (d) => d.financial_year === selectedFY.label,
    );
    const siteMap = new Map();

    selectedData?.datacube_frequency?.forEach((freq) => {
      (Array.isArray(freq.task)
        ? freq.task
        : freq.task
          ? [freq.task]
          : []
      ).forEach((task) => {
        const { site } = task;
        if (!siteMap.has(site.id)) {
          siteMap.set(site.id, {
            label: `${site.name}`,
            value: site.id,
          });
        }
      });
    });

    const sitesArray = Array.from(siteMap.values());
    sitesArray.unshift({ label: 'All', value: 'all' });
    setSites(sitesArray);

    // choose default Site as first option (usually 'All')
    setSelectedSite(sitesArray?.[0] ?? null);
  }, [selectedFY, selectedFrequency, data]);

  useEffect(() => {
    if (!selectedFY?.value) return;
    // widgetId array is needed to call get responses
    if (!standardTabs || standardTabs.length === 0) return;

    // call filter with the default selections
    // small timeout to allow any current state updates (optional)
    const t = setTimeout(() => {
      handleStandardFilter();
    }, 50);

    return () => clearTimeout(t);
  }, [
    selectedFY,
    selectedFrequency,
    selectedSite,
    activeTab,
    activeStandardTab,
  ]);

  const getColumnClass = (widgetColumnsLength: number) => {
    if (widgetColumnsLength === 2) {
      return 'col-lg-6';
    }
    if (widgetColumnsLength === 3) {
      return 'col-lg-4';
    }
    return 'col-lg-12';
  };

  const extractWidgetsFromTab = (tab: any, dashboardId: string): IWidget[] => {
    const widgets: IWidget[] = [];

    tab.dashboard_blocks?.forEach((block: any) => {
      block.dashboard_columns?.forEach((column: any) => {
        column.dashboard_types?.forEach((type: any) => {
          const widget: IWidget = {
            id: type.id,
            type: type.type,
            chart_type: type.chart_type,
            is_stacked: type.is_stacked,
            is_horizontal: type.is_horizontal,
            is_metric: type.is_metric,
            is_time_series: type.is_time_series,
            dashboard_items: type.dashboard_items || [],
          };
          widgets.push(widget);
        });
      });
    });

    return widgets;
  };

  const transformTabToIndicator = (tab: any) => ({
    id: tab.id,
    name: tab.name,
    dashboard_blocks: tab.dashboard_blocks?.map((block: any) => ({
      id: block.id,
      sequence: block.sequence,
      dashboard_columns: block.dashboard_columns?.map((column: any) => ({
        id: column.id,
        sequence: column.sequence,
        dashboard_types: column.dashboard_types?.map((type: any) => ({
          ...type,
          dashboard_items: type.dashboard_items,
          is_time_series: type.is_time_series,
        })),
      })),
    })),
  });

  const applyFilter = async (
    widgetItemId: string,
    filterValues: Record<string, string>,
  ) => {
    try {
      const res = await DataCube.getChartFilterResponse(
        selectedFY?.value ?? '',
        selectedFrequency?.value ?? '',
        selectedSite?.value ?? '',
        apiKey,
        {
          widgetItemId,
          ...filterValues, // only ids
        },
        token,
      );

      // Merge filtered data into widgetsData
      setDashboardData((prev: any) => {
        const newData = { ...prev };

        if (newData[widgetItemId]) {
          newData[widgetItemId].filteredResponse = res;
        }

        return newData;
      });
    } catch (err) {
      console.error('Error fetching filtered data:', err);
    }
  };

  const getWidgetType = (WidgetType: any) => {
    // console.log(WidgetType, 'Type')
    const customParameters = WidgetType?.dashboard_items?.[0]?.dashboard_combined_parameters?.[0]
      ?.dashboard_custom_parameters;

    const flatLabels: string[] = Array.from(
      new Set(
        customParameters.flatMap((item: any) => (Array.isArray(item.label)
          ? (item.label as string[])
          : [item.label as string])),
      ),
    ).filter((l): l is string => typeof l === 'string' && l.trim() !== '');

    // ✅ Collect legends safely
    const flatLegends: string[] = Array.from(
      new Set(
        customParameters.flatMap((item: any) => (Array.isArray(item.legends)
          ? (item.legends as string[])
          : [item.legends as string])),
      ),
    ).filter((l): l is string => typeof l === 'string' && l.trim() !== '');

    // eslint-disable-next-line default-case
    switch (WidgetType?.type) {
      case 'card':
        // return <AnalyticsDataCard cardData={WidgetType?.dashboard_items?.[0]} />;
        return (
          <>
            {isLoading ? (
              <AnalyticsCardSkeleton />
            ) : (
              <AnalyticsDataCard cardData={WidgetType?.dashboard_items?.[0]} />
            )}
          </>
        );
      case 'textArea':
        // return <AnalyticsTextArea cardData={WidgetType?.dashboard_items?.[0]} />;
        return (
          <>
            {isLoading ? (
              <AnalyticsTextAreaSkeleton />
            ) : (
              <AnalyticsTextArea cardData={WidgetType?.dashboard_items?.[0]} />
            )}
          </>
        );
      case 'chart': {
        const widgetItem = WidgetType?.dashboard_items?.[0];
        const isTimeSeries = WidgetType?.is_time_series;

        if (isTimeSeries) {
          const QUARTERS = ['Q1', 'Q2', 'Q3', 'Q4'];

          const MONTHS = [
            'Apr',
            'May',
            'Jun',
            'Jul',
            'Aug',
            'Sep',
            'Oct',
            'Nov',
            'Dec',
            'Jan',
            'Feb',
            'Mar',
          ];

          const MONTHS_MAP: Record<string, string> = {
            jan: 'Jan',
            january: 'Jan',
            feb: 'Feb',
            february: 'Feb',
            mar: 'Mar',
            march: 'Mar',
            apr: 'Apr',
            april: 'Apr',
            may: 'May',
            jun: 'Jun',
            june: 'Jun',
            jul: 'Jul',
            july: 'Jul',
            aug: 'Aug',
            august: 'Aug',
            sep: 'Sep',
            sept: 'Sep',
            september: 'Sep',
            oct: 'Oct',
            october: 'Oct',
            nov: 'Nov',
            november: 'Nov',
            dec: 'Dec',
            december: 'Dec',
          };

          /** 🔹 Normalize label to short month or quarter form */
          const normalizeLabel = (label: string): string => {
            if (!label) return '';
            const trimmed = label.toString().trim();
            const lower = trimmed.toLowerCase();

            if (['q1', 'q2', 'q3', 'q4'].includes(lower)) {
              return trimmed.toUpperCase();
            }
            return MONTHS_MAP[lower] || trimmed;
          };

          const detectCategories = (labels: string[]) => {
            if (!labels.length) return [];

            if (labels.every((l) => QUARTERS.includes(l))) {
              return QUARTERS;
            }

            // Map all labels to standardized short months
            const mappedLabels = labels
              .map((l) => MONTHS_MAP[l.toLowerCase()])
              .filter(Boolean); // remove unknown labels

            // Return months in financial-year order
            return MONTHS.filter((m) => mappedLabels.includes(m));
          };

          const cpList = widgetItem?.dashboard_combined_parameters?.[0]
            ?.dashboard_custom_parameters ?? [];
          // const allLabels = cpList.flatMap((cp: any) => (Array.isArray(cp.answer)
          //   ? cp.answer.map((a: any) => normalizeLabel(a.label))
          //   : []));
          const allLabels = cpList.flatMap((cp: any) => {
            if (Array.isArray(cp.answer) && cp.answer.length) {
              return cp.answer.map((a: any) => normalizeLabel(a.label));
            }
            // scalar (yearly) answers → prefer financial year label (e.g. "2021-2022")
            const fallback = selectedFY?.label || selectedFrequency?.label || 'Year';
            return [normalizeLabel(fallback)];
          });
          let categories = detectCategories(allLabels);
          if (!categories || categories.length === 0) {
            // For yearly datacubes prefer the selected financial year string
            categories = [
              selectedFY?.label || selectedFrequency?.label || 'Year',
            ];
          }

          // // ✅ Collect categories from cp.answer[].label
          // const categories: string[] = Array.from(
          //   new Set(
          //     cpList.flatMap(
          //       (cp: any) =>
          //         Array.isArray(cp.answer) && cp.answer.length
          //           ? cp.answer.map((a: any) => a.label)
          //           : cp.label?.length
          //             ? cp.label
          //             : ['Category'] // fallback if both empty
          //     )
          //   )
          // );

          let series: any[] = [];

          if (
            WidgetType?.chart_type === 'pie'
            || WidgetType?.chart_type === 'donut'
            || WidgetType?.chart_type === 'radialBar'
          ) {
            // Pie-like charts → just values array
            series = cpList.map((cp: any) => {
              const raw = Array.isArray(cp.answer) ? cp.answer[0] : cp.answer;
              const num = parseFloat(
                typeof raw === 'string' ? raw.replace(/[^0-9.-]+/g, '') : raw,
              );
              return isNaN(num) ? 0 : num;
            });
          } else {
            // Other charts → legends + data arrays
            series = cpList.map((cp: any) => ({
              name: cp.legends?.[0] || cp.label?.[0] || 'Series',
              data:
                Array.isArray(cp.answer) && cp.answer.length
                  ? categories.map((cat) => {
                    const match = cp.answer.find((a: any) => a.label === cat);
                    const raw = match?.value ?? 0;
                    const num = parseFloat(
                      typeof raw === 'string'
                        ? raw.replace(/[^0-9.-]+/g, '')
                        : raw,
                    );
                    return isNaN(num) ? 0 : num;
                  })
                  : Array(categories.length).fill(0),
            }));
          }

          // return (
          //   <AnalyticsChart
          //     title={widgetItem?.title}
          //     isStacked={WidgetType?.is_stacked}
          //     isHorizontal={WidgetType?.is_horizontal}
          //     isMetric={WidgetType?.is_metric}
          //     type={WidgetType?.chart_type}
          //     categories={categories}
          //     series={series}
          //   />
          // );
          return (
            <>
              {isLoading ? (
                <AnalyticsChartSkeleton />
              ) : (
                <AnalyticsChart
                  title={widgetItem?.title}
                  isStacked={WidgetType?.is_stacked}
                  isHorizontal={WidgetType?.is_horizontal}
                  isMetric={WidgetType?.is_metric}
                  type={WidgetType?.chart_type}
                  categories={categories}
                  series={series}
                />
              )}
            </>
          );
        }

        return (
          <>
            {isLoading ? (
              <AnalyticsChartSkeleton />
            ) : (
              <AnalyticsChart
                title={widgetItem?.title}
                isStacked={WidgetType?.is_stacked}
                isHorizontal={WidgetType?.is_horizontal}
                isMetric={WidgetType?.is_metric}
                isFilters={widgetItem?.filter}
                type={WidgetType?.chart_type}
                // filters={[...(widgetItem?.filters || [])].sort(
                //   (a, b) => a.sequence - b.sequence
                // )}
                // onFilterChange={(selectedOption) => {
                //   const { filterId, optionId } = selectedOption;

                //   const newState = {
                //     ...filterValues,
                //     [filterId]: String(optionId), // ✅ store only id
                //   };

                //   setFilterValues(newState);

                //   setFilterMap((prevMap) => ({
                //     ...prevMap,
                //     [filterId]: String(optionId),
                //   }));

                //   // 👉 Trigger API here once
                //   const filterResponse = applyFilter(widgetItem?.id, newState);
                //   console.log(filterResponse, 'filterResponse');
                // }}
                categories={
                  WidgetType?.chart_type === 'pie'
                  || WidgetType?.chart_type === 'donut'
                  || WidgetType?.chart_type === 'radialBar'
                    ? widgetItem?.dashboard_combined_parameters?.[0]?.dashboard_custom_parameters
                      ?.flatMap((item: any) => item.legends)
                      .filter((legend: any) => legend.trim() !== '')
                    : flatLabels?.filter(
                      (label: any) => typeof label === 'string' && label.trim() !== '',
                    )
                }
                series={
                  WidgetType?.chart_type === 'pie'
                  || WidgetType?.chart_type === 'donut'
                  || WidgetType?.chart_type === 'radialBar'
                    ? customParameters.map((item: any) => {
                      const raw = Array.isArray(item?.answer)
                        ? (item.answer[0]?.value ?? item.answer[0]) // handle array of objects or numbers
                        : item?.answer;
                      const num = typeof raw === 'string'
                        ? parseFloat(raw.replace(/[^0-9.-]+/g, ''))
                        : raw;
                      return isNaN(num) ? 0 : num;
                    })
                    : flatLegends.map((legend) => ({
                      name: legend,
                      data: flatLabels.map((label) => {
                        const normalize = (val: any) => (Array.isArray(val) ? val[0] : val);

                        const match = customParameters.find((item: any) => {
                          const itemLegend = normalize(item.legends);
                          const itemLabel = normalize(item.label);
                          if (!itemLabel || itemLabel.trim() === '') {
                            return itemLegend === legend;
                          }
                          return itemLabel === label && itemLegend === legend;
                        });

                        const value = Array.isArray(match?.answer)
                          ? match.answer[0]
                          : match?.answer;

                        return value ?? 0;
                      }),
                    }))
                }
              />
            )}
          </>
        );
      }
    }
  };

  function DashboardResponse({
    dashboard,
    timeSeriesData,
    hasTimeSeries,
  }: {
    dashboard: any[];
    timeSeriesData: ITimeSeriesResponse | null;
    hasTimeSeries: boolean;
  }) {
    if (!dashboard || dashboard.length === 0) {
      return (
        <div className="text-center text-muted p-4">
          <PageNotFound isMessageShow isImageShow={false} />
        </div>
      );
    }

    return (
      <div className="bg-white p-3 rounded-2" style={{ minHeight: '75vh' }}>
        {dashboard.map((indicator) => (
          <div
            key={indicator.id}
            className="mb-4 border p-2 rounded-2 bg-light"
          >
            {/* <h5 className="fw-bold mb-3">{indicator.name}</h5> */}
            {isLoading && <IndicatorHeaderSkeleton />}

            {indicator?.dashboard_blocks
              ?.sort(
                (a: any, b: any) => (a?.sequence ?? 0) - (b?.sequence ?? 0),
              )
              ?.map((block: any) => (
                <div className="row mt-2" key={block?.id}>
                  {block?.dashboard_columns
                    ?.sort(
                      (a: any, b: any) => (a?.sequence ?? 0) - (b?.sequence ?? 0),
                    )
                    ?.map((column: any) => (
                      <div
                        key={column?.id}
                        className={`${getColumnClass(
                          block?.dashboard_columns?.length,
                        )} mb-3`}
                      >
                        {column?.dashboard_types?.map((type: any) => {
                          // extract custom parameter ID for time series lookup
                          let customParamId: string | undefined;
                          if (
                            type.dashboard_items?.[0]
                              ?.dashboard_combined_parameters?.[0]
                              ?.dashboard_custom_parameters?.[0]
                              ?.custom_parameter_id
                          ) {
                            customParamId = type.dashboard_items[0]
                              .dashboard_combined_parameters[0]
                              .dashboard_custom_parameters[0]
                              .custom_parameter_id;
                          } else if (
                            type.dashboard_items?.[0]
                              ?.dashboard_combined_parameters?.[0]
                              ?.dashboard_custom_parameters?.[0]?.id
                          ) {
                            customParamId = type.dashboard_items[0]
                              .dashboard_combined_parameters[0]
                              .dashboard_custom_parameters[0].id;
                          }

                          return getWidgetType(type);
                        })}
                      </div>
                    ))}
                </div>
              ))}
          </div>
        ))}
      </div>
    );
  }

  const getStandardById = async (standardId: string) => {
    if (standardSelected === standardId) return;
    setIsLoading(true);
    setError(null);

    try {
      let tabs: IDashboardTab[] = [];
      let data: any[] = [];
      let standardInfo: any = null;

      // ✅ If cached, use it
      if (standardDashboards[standardId]) {
        const cached = standardDashboards[standardId];
        tabs = cached.tabs;
        data = cached.data;
        standardInfo = cached.standard;
      } else {
        // ✅ Fetch fresh data
        const res = await DataCube.getDashboardByStandard(token, standardId);

        if (
          res?.data?.dashboards
          && Array.isArray(res.data.dashboards)
          && res.data.dashboards.length > 0
        ) {
          const dashboard = res.data.dashboards[0];
          setDashboardId(dashboard.id);

          if (dashboard.tabs && Array.isArray(dashboard.tabs)) {
            tabs = dashboard.tabs
              .slice()
              .sort((a: any, b: any) => a.sequence - b.sequence)
              .map((tab: any) => ({
                id: tab.id,
                name: tab.name,
                widgets: extractWidgetsFromTab(tab, dashboard.id),
                dashboardId: dashboard.id,
              }));

            data = dashboard.tabs.map(transformTabToIndicator);

            // Cache this standard's data
            standardInfo = standardsList.find((s) => s.id === standardId);
            setStandardDashboards((prev) => ({
              ...prev,
              [standardId]: { tabs, data, standard: standardInfo },
            }));
          }
        }
      }

      // ✅ Set current view state in a single update
      const firstTabId = tabs?.[0]?.id || '';
      setStandardTabs(tabs);
      setStandardData(data);
      setActiveStandardTab(firstTabId);
      setStandardSelected(standardId);
      setStandardId(standardId);
      if (standardInfo) setStandards({ standard: standardInfo });
    } catch (err) {
      console.error('Error fetching dashboard data', err);
      setError('Failed to load dashboard data.');
    } finally {
      setIsLoading(false);
    }
  };

  // console.log(standardId, '====');

  useEffect(() => {
    if (
      selectedFY?.value
      && selectedFrequency?.value
      && selectedBU?.value
      && selectedSite?.value
      && standardId
      && activeStandardTab
    ) {
      handleStandardFilter(); // safe to call now
    }
  }, [
    selectedFY,
    selectedFrequency,
    selectedBU,
    selectedSite,
    standardId,
    activeStandardTab,
  ]);

  const updateDashboardAnswers = async (
    data: any,
    answers: {
      customParameterId: string;
      value: any;
      widget_type: string;
      combinedParamId?: string;
    }[],
    {
      selectedFY,
      selectedSite,
      dashboardId,
      apiKey,
      token,
    }: {
      selectedFY: any;
      selectedSite: any;
      dashboardId: string;
      apiKey: string;
      token: string;
    },
  ) => {
    const answerMap = new Map(answers.map((a) => [a.customParameterId, a]));

    // deep clone
    const updatedData = JSON.parse(JSON.stringify(data));

    // helper to update a time series CP
    const updateTimeSeries = async (cp: any) => {
      try {
        const res = await DataCube.getDashboardDataCubeTimeSeries(
          selectedFY?.value ?? '',
          selectedSite?.value ?? '',
          dashboardId,
          apiKey,
          token,
        );

        const tsResponse = res?.data?.response ?? [];
        const matchParam = tsResponse.find(
          (r: any) => r.custom_param_id === cp.id,
        );

        cp.answer = matchParam
          ? matchParam.frequency_data.map((f: any) => ({
            label: f.frequency_name,
            value: f.calculated_value,
          }))
          : [];
      } catch (err) {
        console.error('Time series fetch error:', err);
        cp.answer = [];
      }
    };

    // collect widget update promises
    const widgetPromises: Promise<void>[] = [];

    updatedData?.dashboard_blocks?.forEach((block: any) => {
      block.dashboard_columns?.forEach((col: any) => {
        col.dashboard_types?.forEach((type: any) => {
          type.dashboard_items?.forEach((item: any) => {
            item.dashboard_combined_parameters?.forEach((param: any) => {
              param.dashboard_custom_parameters?.forEach((cp: any) => {
                const match = answerMap.get(cp.id);
                if (!match) return;

                if (type.type === 'chart' && type.is_time_series) {
                  // push async time series updater
                  widgetPromises.push(updateTimeSeries(cp));
                } else {
                  // chart/card/text → just assign values
                  if (
                    match.widget_type === 'chart'
                    && (!match.combinedParamId
                      || param.id === match.combinedParamId)
                  ) {
                    cp.answer = match.value;
                  } else {
                    cp.answer = match.value;
                  }
                }
              });
            });
          });
        });
      });
    });

    // run all updates concurrently
    await Promise.all(widgetPromises);
    return updatedData;
  };

  const handleStandardFilter = async () => {
    setIsLoading(true);
    if (!selectedFY?.value) {
      setIsLoading(false);
      return;
    }

    try {
      let successfulResponses: any[] = [];
      const res = await DataCube.getStandardDataCubeResponse(
        selectedFY?.value ?? '',
        selectedFrequency?.value ?? '',
        selectedSite?.value ?? '',
        standardId,
        activeStandardTab,
        apiKey,
        token,
      );

      if (res?.data?.success) {
        successfulResponses = [res?.data?.response];
      }

      const formatted = (successfulResponses ?? []).flatMap((res: any) => res.dashboards.flatMap((dashboard: any) => dashboard.tabs.flatMap((tab: any) => tab.blocks.flatMap((block: any) => block.columns.flatMap((col: any) => col.types.flatMap((typeObj: any) => {
        const { type } = typeObj;

        return typeObj.items.flatMap((item: any) => item.combinedParameters.flatMap((cp: any) => cp.customParams.flatMap((customParam: any) => {
          if (type === 'card' || type === 'textArea') {
            return {
              widget_type: type,
              customParameterId: customParam.id,
              value: customParam.calculated_value,
            };
          }

          if (type === 'chart') {
            return {
              widget_type: type,
              combinedParamId: cp.id,
              customParameterId: customParam.id,
              value: customParam.calculated_value,
            };
          }

          return [];
        })));
      }))))));

      if (dashboardData) {
        const tabToUpdate = standardData.find(
          (tab) => tab.id === activeStandardTab,
        );
        if (!tabToUpdate) return;

        // 2️⃣ Update only that tab
        const updatedTab = await updateDashboardAnswers(
          tabToUpdate,
          formatted,
          {
            selectedFY,
            selectedSite,
            dashboardId,
            apiKey,
            token,
          },
        );

        // suppose you know which tab you want to update
        setStandardData((prev) => prev.map((tab) => (tab.id === activeStandardTab ? { ...tab, ...updatedTab } : tab)));
      }
    } catch (error) {
      console.error('Failed to filter data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleStandardChange = async (tabId: string) => {
    setActiveStandardTab(tabId);
  };

  const currentStandardDashboard = standardDashboards[standardSelected];
  const currentStandardTabs = currentStandardDashboard?.tabs || [];
  // const activeStandardData = currentStandardDashboard
  //   ? currentStandardDashboard.data.find((i: any) => i.id === activeStandardTab)
  //   : null;
  const activeStandardData = standardData.find(
    (i: any) => i.id === activeStandardTab,
  );

  return (
    <PageHeaderWrapper
      extraClassName="px-3"
      iswhite
      title="Standard Dashboard"
      stackComponent={(
        <div className="d-flex align-items-center gap-3">
          <div className="">
            <Select
              id="sector"
              value={selectedFY}
              onChange={(e) => {
                setSelectedFY(e as Option);
              }}
              placeholder="Financial year"
              options={financialYears}
              isMulti={false}
              styles={CustomStyles}
              classNamePrefix="custom_select_input"
              data-testid="customSelect"
              inputId="sector"
            />
          </div>
          <div className="">
            <Select
              id="sector"
              value={selectedFrequency}
              onChange={(e) => {
                setSelectedFrequency(
                  e as { label: string; value: string } | null,
                );
              }}
              placeholder="Time frame"
              options={frequencies}
              isMulti={false}
              styles={CustomStyles}
              classNamePrefix="custom_select_input"
              data-testid="customSelect"
              inputId="sector"
            />
          </div>

          <div className="">
            <Select
              id="sector"
              value={selectedSite || ''}
              onChange={(e) => {
                if (e && typeof e === 'object' && 'value' in e) {
                  const site = sites.find(
                    (s) => s.value === (e as { value: string }).value,
                  ) ?? null;
                  setSelectedSite(site);
                } else {
                  setSelectedSite(null);
                }
              }}
              placeholder="Site/Location"
              options={sites}
              isMulti={false}
              styles={CustomStyles}
              classNamePrefix="custom_select_input"
              data-testid="customSelect"
              inputId="sector"
            />
          </div>
          <div>
            <Button
              text={isLoading ? 'Filtering...' : 'Filter'}
              type="submit"
              isSolid
              className="w-100 mt-0 mb-0"
              // sufixIconChildren={
              //   <MdChevronRight
              //     size={22}
              //     color="var(--icon-color)"
              //     className="ms-3"
              //   />
              // }
              sufixIconChildren={
                isLoading ? (
                  // <BiLoaderCircle style={{ marginLeft: 12 }} />
                  <Spinner size="sm" />
                ) : (
                  <MdChevronRight
                    size={22}
                    color="var(--icon-color)"
                    className="ms-3"
                  />
                )
              }
              // onClick={handleGlobalFilter}
              onClick={() => handleStandardFilter()}
              isDisabled={isLoading}
            />
          </div>
        </div>
      )}
    >
      <div className="row">
        <div className="col-12 col-md-3">
          <div className="analytics_module_container py-4">
            <div className="px-3">
              <h6>Standards</h6>

              {/* Show search input only for departments */}
              {/* {!isStandardDashboard && (
                <input
                  type="text"
                  placeholder="Search department..."
                  className="form-control mb-3"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              )} */}

              {/* 🌟 STANDARD LIST SECTION (no filter, no search) */}
              {isLoadingStandards ? (
                <div className="text-center p-3">
                  <div
                    className="spinner-border spinner-border-sm"
                    role="status"
                  >
                    <span className="visually-hidden">
                      Loading standards...
                    </span>
                  </div>
                  <span className="ms-2">Loading standards...</span>
                </div>
              ) : Array.isArray(standardsList) && standardsList.length > 0 ? (
                standardsList.map((standard: any) => (
                  <div
                    key={standard?.id}
                    className={`d-flex justify-content-between gap-2 mt-3 is_radius ${
                      standardSelected === standard?.id ? 'active' : ''
                    }`}
                  >
                    <div
                      className="p-2 py-3 d-flex flex-column gap-2 flex-grow-1"
                      onClick={() => getStandardById(standard?.id)}
                      style={{ cursor: 'pointer' }}
                    >
                      <h6 className="fs-14 fw-600 mb-0 letter-spacing text-capitalize">
                        {standard?.name}
                      </h6>
                    </div>

                    <div className="d-flex align-items-center">
                      <MdOutlineKeyboardDoubleArrowRight
                        size={24}
                        className="me-4"
                        color="#757575"
                      />
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center p-3 text-muted">
                  No standards found
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="col-12 col-md-9">
          <div>
            {/* Tabs */}
            {currentStandardTabs?.length > 0 && (
              <div className="mb-4">
                <div className="d-flex" style={{ backgroundColor: '#f8f9fa' }}>
                  {currentStandardTabs.map((option: any, index: number) => (
                    <div
                      key={option.id}
                      className={`tab-item ${
                        activeStandardTab === option.id ? 'active' : ''
                      }`}
                      onClick={() => handleStandardChange(option.id)}
                      style={{
                        flex: '1',
                        textAlign: 'center',
                        padding: '12px 16px',
                        cursor: 'pointer',
                        borderBottom:
                          activeStandardTab === option.id
                            ? '3px solid #f39c12'
                            : '1px solid var(--border-color)',
                        backgroundColor:
                          activeStandardTab === option.id
                            ? '#FFFDED'
                            : 'transparent',
                        color:
                          activeStandardTab === option.id
                            ? '#000000'
                            : '#6c757d',
                        fontWeight:
                          activeStandardTab === option.id ? '600' : '500',
                        fontSize: '16px',
                        transition: 'all 0.3s ease',
                        borderRight:
                          index < standardTabs.length - 1
                            ? '1px solid #e9ecef'
                            : 'none',
                        position: 'relative',
                      }}
                      onMouseEnter={(e) => {
                        const target = e.target as HTMLElement;
                        if (activeStandardTab !== option.id) {
                          target.style.backgroundColor = '#ffffff';
                          target.style.color = '#495057';
                        }
                      }}
                      onMouseLeave={(e) => {
                        const target = e.target as HTMLElement;
                        if (activeStandardTab !== option.id) {
                          target.style.backgroundColor = 'transparent';
                          target.style.color = '#6c757d';
                        }
                      }}
                    >
                      {option.name}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Dashboard content */}
            {!activeStandardData
            || !standardData
            || standardData.length === 0 ? (
              <div className="bg-white">
                <PageNotFound />
              </div>
              ) : (
                <DashboardResponse
                  dashboard={[activeStandardData]}
                  timeSeriesData={timeSeriesData}
                  hasTimeSeries={hasTimeSeries}
                />
              )}
          </div>
        </div>
      </div>
    </PageHeaderWrapper>
  );
}
