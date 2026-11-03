/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-nested-ternary */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unsafe-optional-chaining */
/* eslint-disable consistent-return */
/* eslint-disable no-unused-vars */
/* eslint @typescript-eslint/no-unused-vars: off */
/* eslint-disable max-len */
/* eslint no-shadow: off */
/* eslint-disable no-param-reassign */
/* eslint-disable no-await-in-loop */
/* eslint-disable no-restricted-syntax */
/* eslint-disable @next/next/no-assign-module-variable */
/* eslint-disable @typescript-eslint/no-use-before-define */
/* eslint-disable react/jsx-no-useless-fragment */
/* eslint-disable no-restricted-globals */
/* eslint-disable import/no-unresolved */

'use client';

import React, {
  Suspense, useEffect, useState, useRef,
} from 'react';
import Select from 'react-select';
import {
  MdChevronRight,
  MdOutlineKeyboardDoubleArrowRight,
} from 'react-icons/md';
import { BiLoaderCircle } from 'react-icons/bi';
import { DataCube } from '@/lib/service';
import { IDataCube } from '@/lib/interface/IDataCube.interface';
import Skeleton from 'react-loading-skeleton';
import { Spinner } from 'react-bootstrap';
import PageHeaderWrapper from '../PageHeaderWrapper/PageHeaderWrapper';
import { Option } from '../types';
import './AnalyticsModule.css';
import { CustomStyles } from '../CustomStyles/CustomStyles';
import { Button } from '../Button/Button';
import PageNotFound from '../PageNotFound/PageNotFound';
import IndicatorHeader from '../Cards/IndicatorHeader';
import AnalyticsDataCard from '../Cards/AnalyticsDataCard';
import AnalyticsTextArea from '../Cards/AnalyticsTextArea';
import AnalyticsChart from '../Charts/AnalyticsChart';
import AnalyticsTable from './AnalyticsTable';
import 'react-loading-skeleton/dist/skeleton.css';
import { TextCapture } from './text-select';

export const IndicatorHeaderSkeleton = () => (
  <div className="mb-3">
    <Skeleton height={40} width="100%" />
  </div>
);

export const AnalyticsCardSkeleton = () => (
  <div className="p-3 border rounded mb-3">
    <Skeleton height={20} width={100} />
    <Skeleton height={40} width={80} className="mt-2" />
  </div>
);

export const AnalyticsTextAreaSkeleton = () => (
  <div className="p-3 border rounded mb-3">
    <Skeleton count={3} />
  </div>
);

export const AnalyticsTableSkeleton = () => (
  <div className="p-3 border rounded mb-3">
    <Skeleton height={25} width="100%" className="mb-2" />
    <Skeleton height={200} width="100%" />
  </div>
);

export const AnalyticsChartSkeleton = () => (
  <div className="p-3 border rounded mb-3">
    <Skeleton height={300} />
  </div>
);

export default function Analytics({
  // modulesList,
  datacubes,
  token,
  apiKey,
}: {
  // modulesList?: IModules[];
  datacubes?: IDataCube[];
  token: string;
  apiKey: string;
}) {
  const [modulesList, setModulesList] = useState<any[]>([]);
  const [moduleSelected, setModuleSelected] = useState<string>('');
  const [widgetsData, setWidgetsData] = useState<any>();
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
  const [sites, setSites] = useState<{ label: string; value: string }[]>([]);

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
  const [modules, setModules] = useState<any>();
  const [isLoading, setIsLoading] = useState(false);
  const [initialIndicators, setInitialIndicators] = useState<any[]>([]);
  const [widgetId, setWidgetId] = useState<string[]>([]);
  const [filterMap, setFilterMap] = useState<string>('[]');
  const [filteredDataMap, setFilteredDataMap] = useState<Record<string, any>>(
    {},
  );

  const [searchTerm, setSearchTerm] = useState('');

  // Filter modules based on search term
  const filteredModules = Array.isArray(modulesList)
    ? modulesList.filter((module: any) => module?.name?.toLowerCase().includes(searchTerm.toLowerCase()))
    : [];

  useEffect(() => {
    setData(datacubes ?? []);
    const yearOptions = datacubes?.map((d) => ({
      label: d.financial_year,
      value: d.id,
    }));
    setFinancialYears(yearOptions ?? []);
    // setSelectedFY(yearOptions?.[0] ?? null);
    // set default selected FY to first option when landing page
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
      setSelectedFrequency(yearlyOpt[0]);
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
    setSelectedSite(sitesArray?.[1] ?? null);
  }, [selectedFY, data]);

  useEffect(() => {
    if (selectedFY && selectedFrequency && selectedSite) {
      handleFilter();
    }
  }, [selectedFrequency, selectedSite]);

  // Trigger initial filter call when defaults are set and widgetIds are available
  useEffect(() => {
    // only run when we have the minimum required pieces
    if (!selectedFY?.value) return;
    // widgetId array is needed to call get responses
    if (!widgetId || widgetId.length === 0) return;

    // call filter with the default selections
    // small timeout to allow any current state updates (optional)
    const t = setTimeout(() => {
      handleFilter();
    }, 500);

    return () => clearTimeout(t);
  }, [selectedFY, selectedFrequency, selectedSite, widgetId]);

  // useEffect(() => {
  //   setWidgetsData([]); // clears old widget view
  //   setModules([]);
  // }, [selectedFY, selectedBU, selectedSite]);

  //   useEffect(() => {
  //   const fetchWidgets = async () => {
  //     if (!token || !setModuleSelected) return; // only call when ready
  //     try {
  //       const res = await DataCube.getWidgetData(token, moduleSelected);
  //       // assuming same response shape as modules → { success, data: [...] }
  //       setWidgetsData(res?.data?.data || []);
  //     } catch (err) {
  //       console.error("Error fetching widgets:", err);
  //       setWidgetsData([]); // fallback
  //     }
  //   };

  //   fetchWidgets();
  // }, [token, setModuleSelected]);

  useEffect(() => {
    if (modulesList?.length > 0 && !moduleSelected) {
      setModuleSelected(modulesList[0].id); // store the first module's id
    }
  }, [modulesList, moduleSelected]);

  const getModuleById = async (moduleId: string) => {
    const res = await DataCube.getWidgetData(token, moduleId);
    const { data } = res.data as {
      success: boolean;
      data: any;
    };
    setModuleSelected(moduleId);
    setWidgetsData(data[moduleId]);
    setInitialIndicators(data[moduleId]?.indicators || []);

    const widgetIds: string[] = [];

    data[moduleId]?.indicators?.forEach((indicator: any) => {
      indicator.widget_blocks?.forEach((block: any) => {
        block.widget_columns?.forEach((col: any) => {
          col.widget_types?.forEach((type: any) => {
            type.widget_item?.forEach((item: any) => {
              item.combined_parameters?.forEach((param: any) => {
                param.custom_parameter?.forEach((custom: any) => {
                  if (custom.widget_id) {
                    widgetIds.push(custom.widget_id);
                  }
                  // custom.answer = widget_res_answer[custom.id]   filter
                });
              });
            });
          });
        });
      });
    });

    // store all or unique widgetIds
    const uniqueWidgetIds = Array.from(new Set(widgetIds));

    setWidgetId(uniqueWidgetIds);
  };
  // console.log('widgetId', widgetId);

  useEffect(() => {
    if (moduleSelected) getModuleById(moduleSelected);
  }, [moduleSelected]);

  const getColumn = (widgetColumnsLength: number) => {
    if (widgetColumnsLength === 2) {
      return 'col-lg-6';
    }
    if (widgetColumnsLength === 3) {
      return 'col-lg-4';
    }
    return 'col-lg-12';
  };

  // const applyFilter = async (filterValues: string, cpKey: string) => {
  //   try {
  //     const res = await DataCube.getChartFilterResponse(
  //       selectedFY?.value ?? '',
  //       selectedFrequency?.value ?? '',
  //       selectedSite?.value ?? '',
  //       apiKey,
  //       filterValues,
  //       token
  //     );

  //     setFilteredDataMap((prev) => ({
  //       ...prev,
  //       [cpKey]: res, // ✅ store directly
  //     }));
  //   } catch (err) {
  //     console.error(err);
  //   }
  // };

  // console.log(filteredDataMap, 'filter');

  const getWidgetType = (WidgetType: any) => {
    const customParameters = WidgetType?.widget_item?.[0]?.combined_parameters?.[0]?.custom_parameter;
    const labels = Array.from(
      new Set(customParameters?.map((item: any) => item.label)),
    );
    const flatLabels = Array.from(new Set(labels?.flat()));
    const legends = Array.from(
      new Set(customParameters?.map((item: any) => item.legends)),
    );
    const flatLegends = Array.from(new Set(legends?.flat()));
    const questionTexts = customParameters?.[0]?.question_texts || [];

    const columns = questionTexts.map((q: string) => ({
      key: q, // must match data keys
      label: q.toLocaleLowerCase(), // display label
    }));
    // console.log(columns, 'columns');
    const cp = customParameters?.[0]; // each custom_param may carry answer now
    const data = cp?.answer && Array.isArray(cp.answer) && cp.answer.length > 0
      ? cp.answer
      : [
        columns.reduce(
          (row: any, col: any) => {
            row[col.key] = 'nil';
            return row;
          },
              {} as Record<string, string>,
        ),
      ];

    // console.log(data, 'data');
    // eslint-disable-next-line default-case
    switch (WidgetType?.type) {
      case 'card':
        return (
          <>
            {isLoading ? (
              <AnalyticsCardSkeleton />
            ) : (
              <AnalyticsDataCard cardData={WidgetType?.widget_item?.[0]} />
            )}
          </>
        );
        // return <AnalyticsDataCard cardData={WidgetType?.widget_item?.[0]} />

      case 'textArea':
        // return <AnalyticsTextArea cardData={WidgetType?.widget_item?.[0]} />;
        return (
          <>
            {isLoading ? (
              <AnalyticsTextAreaSkeleton />
            ) : (
              <AnalyticsTextArea cardData={WidgetType?.widget_item?.[0]} />
            )}
          </>
        );

      case 'table':
        return (
          <>
            {isLoading ? (
              <AnalyticsTableSkeleton />
            ) : (
              <AnalyticsTable
                title={WidgetType?.widget_item?.[0]?.title}
                columns={columns}
                data={data}
              />
            )}
          </>
        );

      case 'chart': {
        // const widgetItem = WidgetType?.widget_item?.[0];
        // const isTimeSeries = WidgetType?.is_time_series;

        // if (isTimeSeries) {
        //   // Timeseries charts
        //   const cpList =
        //     widgetItem?.combined_parameters?.[0]?.custom_parameter ?? [];

        //   // Collect categories (x-axis labels)
        //   const categories = cpList[0]?.answer?.map((a: any) => a.label) ?? [];

        //   // Build series from each custom parameter
        //   const series = cpList.map((cp: any) => ({
        //     name: cp.legends || cp.label || 'Series',
        //     data: cp.answer?.map((a: any) => a.value) ?? [],
        //   }));
        const widgetItem = WidgetType?.widget_item?.[0];
        const cpKey = widgetItem?.combined_parameters?.[0]?.custom_parameter_id;

        const filteredResponse = filteredDataMap?.[cpKey];
        const answerMap = filteredResponse?.data?.data?.[0]?.answer_map;

        const extractNumber = (value: any): number => {
          if (value == null) return 50;

          if (Array.isArray(value)) return extractNumber(value[0]);

          if (typeof value === 'string') {
            const match = value.match(/-?\d+(\.\d+)?/);
            return match ? Number(match[0]) : 50;
          }

          return typeof value === 'number' ? value : 50;
        };

        // console.log('📦 widgetId:', widgetItem?.id);
        // console.log('📦 raw filteredResponse:', filteredResponse);
        // console.log('📦 extracted answerMap:', answerMap);

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

          /** 🔹 Detects whether it's monthly or quarterly */
          const detectCategories = (labels: string[]) => {
            if (!labels.length) return [];

            // ✅ If all are quarters
            if (labels.every((l) => QUARTERS.includes(normalizeLabel(l)))) {
              return QUARTERS;
            }

            // ✅ Otherwise treat as months
            const mappedLabels = labels
              .map((l) => normalizeLabel(l))
              .filter((x) => MONTHS.includes(x));

            // Return months in FY order (Apr → Mar)
            return MONTHS.filter((m) => mappedLabels.includes(m));
          };

          const cpList = widgetItem?.combined_parameters?.[0]?.custom_parameter ?? [];

          // // ✅ Collect all labels from API and normalize them
          // const allLabels = cpList.flatMap((cp: any) =>
          //   Array.isArray(cp.answer)
          //     ? cp.answer.map((a: any) => normalizeLabel(a.label))
          //     : []
          // );

          const allLabels = cpList.flatMap((cp: any) => {
            if (Array.isArray(cp.answer) && cp.answer.length) {
              return cp.answer.map((a: any) => normalizeLabel(a.label));
            }
            // scalar (yearly) answers → prefer financial year label (e.g. "2021-2022")
            const fallback = selectedFY?.label || selectedFrequency?.label || 'Year';
            return [normalizeLabel(fallback)];
          });

          // // ✅ Determine final categories
          // const categories = detectCategories(allLabels);

          // Determine categories; if detectCategories returned empty (single point), use fallback single category
          let categories = detectCategories(allLabels);
          if (!categories || categories.length === 0) {
            // For yearly datacubes prefer the selected financial year string
            categories = [
              selectedFY?.label || selectedFrequency?.label || 'Year',
            ];
          }

          let series: any[] = [];

          if (
            ['pie', 'donut', 'radialBar'].includes(WidgetType?.chart_type || '')
          ) {
            // Pie-like charts → just values
            series = cpList.map((cp: any) => {
              const raw = Array.isArray(cp.answer)
                ? cp.answer[0]?.value
                : cp.answer;
              const num = parseFloat(
                typeof raw === 'string' ? raw.replace(/[^0-9.-]+/g, '') : raw,
              );
              return isNaN(num) ? 0 : num;
            });
          } else {
            // Line / bar / area etc.
            // series = cpList.map((cp: any) => ({
            //   name: cp.legends?.[0] || cp.label?.[0] || 'Series',
            //   data:
            //     Array.isArray(cp.answer) && cp.answer.length
            //       ? categories.map((cat) => {
            //         const match = cp.answer.find(
            //           (a: any) => normalizeLabel(a.label).toLowerCase()
            //               === cat.toLowerCase(),
            //         );

            //         const raw = match?.value ?? 0;
            //         const num = parseFloat(
            //           typeof raw === 'string'
            //             ? raw.replace(/[^0-9.-]+/g, '')
            //             : raw,
            //         );
            //         return isNaN(num) ? 0 : num;
            //       })
            //       : Array(categories.length).fill(0),
            // }));

            series = cpList.map((cp: any) => {
              const name = cp.legends?.[0] || cp.label?.[0] || 'Series';

              // If answer is array -> map values to categories
              if (Array.isArray(cp.answer) && cp.answer.length) {
                const data = categories.map((cat) => {
                  const match = cp.answer.find(
                    (a: any) => normalizeLabel(a.label).toLowerCase()
                      === cat.toLowerCase(),
                  );
                  const raw = match?.value ?? 0;
                  const num = parseFloat(
                    typeof raw === 'string'
                      ? raw.replace(/[^0-9.-]+/g, '')
                      : raw,
                  );
                  return isNaN(num) ? 0 : num;
                });
                return { name, data };
              }

              // Scalar answer (yearly) -> single value series aligned to single category
              const rawScalar = cp.answer ?? 0;
              const scalarNum = parseFloat(
                typeof rawScalar === 'string'
                  ? rawScalar.replace(/[^0-9.-]+/g, '')
                  : rawScalar,
              );
              return { name, data: [isNaN(scalarNum) ? 0 : scalarNum] };
            });
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
                  type={WidgetType?.chart_type}
                  categories={categories}
                  series={series}
                />
              )}
            </>
          );
        }

        // --- existing normal chart rendering (pie, bar, etc.) ---
        // return (
        //   <AnalyticsChart
        //     title={widgetItem?.title}
        //     isStacked={WidgetType?.is_stacked}
        //     isHorizontal={WidgetType?.is_horizontal}
        //     isMetric={WidgetType?.is_metric}
        //     type={WidgetType?.chart_type}
        //     categories={
        //       WidgetType?.chart_type === 'pie' ||
        //       WidgetType?.chart_type === 'donut' ||
        //       WidgetType?.chart_type === 'radialBar'
        //         ? widgetItem?.combined_parameters?.[0]?.custom_parameter
        //             ?.flatMap((item: any) => item.legends)
        //             .filter((legend: any) => legend.trim() !== '')
        //         : flatLabels?.filter(
        //             (label: any) =>
        //               typeof label === 'string' && label.trim() !== ''
        //           )
        //     }
        //     series={
        //       WidgetType?.chart_type === 'pie' ||
        //       WidgetType?.chart_type === 'donut' ||
        //       WidgetType?.chart_type === 'radialBar'
        //         ? customParameters.map((item: any) => item?.answer ?? 0)
        //         : flatLegends.map((legend) => ({
        //             name: legend,
        //             data: flatLabels.map((label) => {
        //               const normalize = (val: any) =>
        //                 Array.isArray(val) ? val[0] : val;
        //               const match = customParameters.find(
        //                 (item: any) =>
        //                   normalize(item.label) === label &&
        //                   normalize(item.legends) === legend
        //               );
        //               // console.log(match, 'match');
        //               return match?.answer ?? 0;
        //             }),
        //           }))
        //     }
        //   />
        // );
        // const originalCpList =
        //   widgetItem?.combined_parameters?.[0]?.custom_parameter ?? [];
        // const cpList = originalCpList.map((cp: any) => {
        //   const uid = cp.universal_question_id;

        //   if (answerMap && answerMap[uid]) {
        //     return {
        //       ...cp,
        //       answer: extractNumber(answerMap[uid]), // ✅ 45
        //     };
        //   }
        //   return cp;
        // });

        // console.log(
        //   '🧩 originalCpList:',
        //   originalCpList.map((cp: any) => ({
        //     uid: cp.universal_question_id,
        //     answer: cp.answer,
        //   }))
        // );

        // console.log(
        //   '✅ merged cpList:',
        //   cpList.map((cp: any) => ({
        //     uid: cp.universal_question_id,
        //     answer: cp.answer,
        //   }))
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
                isFilters={widgetItem?.filter}
                type={WidgetType?.chart_type}
                filters={[...(widgetItem?.filters || [])].sort(
                  (a, b) => a.sequence - b.sequence,
                )}
                onFilterChange={(selectedOption) => {
                  const { filterId, optionId } = selectedOption;

                  // Parse existing JSON string → array
                  let currentArray = [];
                  try {
                    currentArray = JSON.parse(filterMap);
                  } catch {
                    currentArray = [];
                  }

                  // Remove existing filter if present
                  currentArray = currentArray.filter(
                    (item: any) => item.filter_id !== String(filterId),
                  );

                  // Add new filter
                  currentArray.push({
                    filter_id: String(filterId),
                    option_id: String(optionId),
                  });

                  // Build JSON string
                  const jsonString = JSON.stringify(currentArray);

                  // Save the updated JSON string to state
                  setFilterMap(jsonString);

                  // 👉 Call your API with the JSON string (correct)
                  // applyFilter(jsonString, cpKey);
                }}
                categories={
                  WidgetType?.chart_type === 'pie'
                  || WidgetType?.chart_type === 'donut'
                  || WidgetType?.chart_type === 'radialBar'
                    ? widgetItem?.combined_parameters?.[0]?.custom_parameter
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
                    ? customParameters.map((item: any) => item?.answer ?? 50)
                    : flatLegends.map((legend) => ({
                      name: legend,
                      data: flatLabels.map((label) => {
                        const normalize = (val: any) => (Array.isArray(val) ? val[0] : val);
                        const match = customParameters.find(
                          (item: any) => normalize(item.label) === label
                              && normalize(item.legends) === legend,
                        );
                          // console.log(match, 'match');
                        return match?.answer ?? 50;
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

  const updateAnswers = async (
    data: any,
    answers: {
      customParameterId: string;
      value: any;
      widget_type: string;
      combinedParamId?: string;
      widgetId?: string;
    }[],
    {
      selectedFY,
      selectedSite,
      apiKey,
      token,
    }: { selectedFY: any; selectedSite: any; apiKey: string; token: string },
  ) => {
    // console.log(widgetId, 'widgetId');
    const answerMap = new Map(answers.map((a) => [a.customParameterId, a]));
    const updatedData = JSON.parse(JSON.stringify(data));
    const module = updatedData;

    const promises: Promise<void>[] = [];

    module?.indicators?.forEach((indicator: any) => {
      indicator.widget_blocks?.forEach((block: any) => {
        block.widget_columns?.forEach((col: any) => {
          col.widget_types?.forEach((type: any) => {
            type.widget_item?.forEach((item: any) => {
              // ✅ CASE 1: Timeseries charts
              if (type.type === 'chart' && type.is_time_series) {
                item.combined_parameters?.forEach((param: any) => {
                  param.custom_parameter?.forEach((cp: any) => {
                    const key = cp.custom_parameter_id ?? cp.id;
                    const match = answerMap.get(key);

                    if (match && match.widgetId) {
                      promises.push(
                        (async () => {
                          const res = await DataCube.getAnalyticsTimeSeries(
                            selectedFY?.value ?? '',
                            selectedSite?.value ?? '',
                            apiKey,
                            match.widgetId!, // ✅ use widgetId from answers
                            token,
                          );

                          const tsResponse = res?.data?.response ?? [];

                          // find the matching param in response
                          const matchParam = tsResponse.find(
                            (r: any) => r.custom_param_id === cp.id,
                          );
                          function safeValue(val: any) {
                            return val == null ? 0 : val; // covers null & undefined
                          }
                          if (matchParam) {
                            cp.answer = matchParam.frequency_data.map(
                              (f: any) => ({
                                label: f.frequency_name,
                                // value: f.calculated_value,
                                value: safeValue(f.calculated_value),
                              }),
                            );
                          } else {
                            cp.answer = [];
                          }
                        })(),
                      );
                    }
                  });
                });

                return; // skip normal flow
              }

              // ✅ CASE 2: Normal combined_parameters
              item.combined_parameters?.forEach((param: any) => {
                param.custom_parameter?.forEach((cp: any) => {
                  const key = cp.custom_parameter_id ?? cp.id;
                  const match = answerMap.get(key);

                  if (match) {
                    if (match.widget_type === 'chart') {
                      if (param.id === match.combinedParamId) {
                        cp.answer = match.value;
                      }
                    } else {
                      cp.answer = match.value;
                    }
                  }
                });
              });

              // ✅ CASE 3: Tables
              if (type.type === 'table') {
                item.custom_parameter?.forEach((cp: any) => {
                  const key = cp.custom_parameter_id ?? cp.id;
                  const match = answerMap.get(key);

                  if (match) {
                    cp.answer = match.value;
                  }
                });
              }
            });
          });
        });
      });
    });

    await Promise.all(promises);
    return updatedData;
  };

  const handleFilter = async () => {
    setIsLoading(true);
    if (!selectedFY?.value) {
      setIsLoading(false);
      return;
    }

    try {
      const successfulResponses: any[] = [];

      for (const id of widgetId) {
        try {
          const res = await DataCube.getDataCubeWidgetResponse(
            selectedFY?.value ?? '',
            selectedFrequency?.value ?? '',
            selectedSite?.value ?? '',
            apiKey,
            id,
            token,
          );

          if (res?.data?.success) {
            successfulResponses.push(res);
          }
          // console.log('api trigger');
        } catch (err) {
          console.error(`Error for widgetId ${id}:`, err);
        }
      }

      const formatted = successfulResponses.flatMap((res: any) => res.data.response.flatMap((item: any) => {
        const type = item.widget_type;

        if (type === 'card' || type === 'textArea') {
          return {
            customParameterId: item.custom_parameter_id,
            value: item.calculated_value,
            widget_type: type,
          };
        }

        // if (type === 'textArea') {
        //   return {
        //     customParameterId: item.custom_parameter_id,
        //     value: item.calculated_value.split(',').pop().trim(),
        //     widget_type: type,
        //   };
        // }

        if (type === 'chart' && Array.isArray(item.combinedParams)) {
          return item.combinedParams.map((cp: any) => ({
            customParameterId: cp.custom_parameter_id,
            value: cp.calculated_value,
            widget_type: type,
            combinedParamId: item.combined_parameter_id,
            widgetId: item.widget_id,
          }));
        }

        if (type === 'table' && Array.isArray(item.rows)) {
          const numRows = item.rows[0]?.values.length || 0;

          const tableRows = Array.from({ length: numRows }, (_, rowIndex) => {
            const rowObj: Record<string, any> = {};
            item.rows.forEach((r: any, colIndex: number) => {
              rowObj[`q${colIndex}`] = r.values[rowIndex] ?? null;
            });
            return rowObj;
          });

          return {
            customParameterId: item.custom_parameter_id,
            value: tableRows,
            widget_type: type,
          };
        }

        return [];
      }));

      if (widgetsData) {
        const updated = await updateAnswers(widgetsData, formatted, {
          selectedFY,
          selectedSite,
          apiKey,
          token,
        });
        setWidgetsData(updated); // ✅ resolved data, not Promise
      }
    } catch (err) {
      console.error('Error fetching widget data:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchModules = async () => {
    try {
      const res = await DataCube.getModuleList(token);
      setModulesList(res?.data?.data || []);
    } catch (err) {
      console.error('Failed to fetch modules', err);
    }
  };

  const didFetch = useRef(false);

  useEffect(() => {
    if (didFetch.current) return;
    didFetch.current = true;

    fetchModules();
  }, [token]);

  return (
    <PageHeaderWrapper
      //   breadCrumbMenu={breadCrumbMenu}
      extraClassName="px-3"
      iswhite
      title="Analytics"
      stackComponent={(
        <div className="d-flex align-items-center gap-3">
          <div className="">
            {/* <label className="form_label mb-3">Choose Financial Year *</label> */}
            <Select
              id="sector"
              value={selectedFY}
              onChange={(e) => {
                setSelectedFY(e as Option);
              }}
              placeholder="Financial year"
              options={financialYears}
              isMulti={false}
              //   isDisabled={isDisabled}
              styles={CustomStyles}
              classNamePrefix="custom_select_input"
              data-testid="customSelect"
              inputId="sector"
            />
            {/* {error?.final_year && (
                      <div className="error-message">{error?.final_year}</div>
                    )} */}
          </div>
          <div className="">
            {/* <label className="form_label mb-3">Choose Financial Year *</label> */}
            <Select
              // isDisabled={frequencies?.length === 1}
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
              // isDisabled={isDisabled}
              styles={CustomStyles}
              classNamePrefix="custom_select_input"
              data-testid="customSelect"
              inputId="sector"
            />
            {/* {error?.final_year && (
                      <div className="error-message">{error?.final_year}</div>
                    )} */}
          </div>
          {/* <div className=""> */}
          {/* <label className="form_label mb-3">Choose Financial Year *</label> */}
          {/* <Select<{ label: string; value: string }>
              id="sector"
              value={selectedBU}
              onChange={(e) => {
                setSelectedBU(e as { label: string; value: string } | null);
              }}
              placeholder="Business unit"
              options={businessUnits}
              isMulti={false}
              //   isDisabled={isDisabled}
              styles={CustomStyles}
              classNamePrefix="custom_select_input"
              data-testid="customSelect"
              inputId="sector"
            /> */}
          {/* {error?.final_year && (
                      <div className="error-message">{error?.final_year}</div>
                    )} */}
          {/* </div> */}
          <div className="">
            {/* <label className="form_label mb-3">Choose Financial Year *</label> */}
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
              //   isDisabled={isDisabled}
              styles={CustomStyles}
              classNamePrefix="custom_select_input"
              data-testid="customSelect"
              inputId="sector"
            />
            {/* {error?.final_year && (
                      <div className="error-message">{error?.final_year}</div>
                    )} */}
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
              onClick={handleFilter}
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
              <h6>Modules</h6>

              {/* 🔍 Search Input */}
              <input
                type="text"
                placeholder="Search modules..."
                className="form-control mb-3"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />

              {filteredModules.length > 0 ? (
                filteredModules.map((module: any) => (
                  <div
                    key={module?.id}
                    className={`d-flex justify-content-between gap-2 mt-3 is_radius ${
                      moduleSelected === module?.id ? 'active' : ''
                    }`}
                  >
                    <div
                      className="p-2 py-3 d-flex flex-column gap-2 flex-grow-1"
                      aria-hidden
                      onClick={() => getModuleById(module?.id)}
                    >
                      <h6 className="fs-14 fw-600 mb-0 letter-spacing text-capitalize">
                        {module?.name}
                      </h6>
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
                <p className="text-muted mt-3">No modules found</p>
              )}
            </div>
          </div>
        </div>
        <div className="col-12 col-md-9">
          {widgetsData ? (
            <Suspense fallback={<div>Widgets Loading...</div>}>
              {/* Module Title */}
              <h4 className="fs-18 fw-700 mb-3">{widgetsData?.name}</h4>

              {/* Loop over indicators */}
              {widgetsData?.indicators?.map((indicator: any) => (
                <div key={indicator?.id}>
                  {isLoading ? (
                    <IndicatorHeaderSkeleton />
                  ) : (
                    <IndicatorHeader title={indicator?.name} />
                  )}

                  {/* Widget Blocks */}
                  {indicator?.widget_blocks
                    ?.sort(
                      (a: any, b: any) => (a?.sequence ?? 0) - (b?.sequence ?? 0),
                    )
                    ?.map((block: any) => (
                      <div className="row mt-0" key={block?.id}>
                        {block?.widget_columns
                          ?.sort(
                            (a: any, b: any) => (a?.sequence ?? 0) - (b?.sequence ?? 0),
                          )
                          ?.map((column: any) => (
                            <div
                              className={`${getColumn(block?.widget_columns?.length)} g-1`}
                              key={`${block?.id}-${column?.sequence}`}
                            >
                              {getWidgetType(column?.widget_types?.[0])}
                            </div>
                          ))}
                      </div>
                    ))}
                </div>
              ))}
            </Suspense>
          ) : (
            <div className="bg-white">
              <PageNotFound />
              ?
            </div>
          )}
        </div>
      </div>
      <div className="fixed bottom-8 right-8 z-[200]">
        <TextCapture token={token} apiKey={apiKey} />
      </div>
    </PageHeaderWrapper>
  );
}
