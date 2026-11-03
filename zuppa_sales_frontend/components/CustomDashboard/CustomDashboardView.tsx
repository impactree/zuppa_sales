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
/* eslint-disable no-mixed-spaces-and-tabs */
/* eslint-disable no-tabs */
/* eslint-disable new-cap */

'use client';

import React, { Suspense, useEffect, useState } from 'react';
import { redirect, useParams, useRouter } from 'next/navigation';
import Select from 'react-select';
import {
  MdChevronRight,
  MdOutlineKeyboardDoubleArrowRight,
  MdOutlineAdd,
} from 'react-icons/md';
import { BiLoaderCircle } from 'react-icons/bi';
import { customDashboardChart, DataCube } from '@/lib/service';
import { IDataCube } from '@/lib/interface/IDataCube.interface';
import Skeleton from 'react-loading-skeleton';
import { Spinner } from 'react-bootstrap';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import html2pdf from 'html2pdf.js';
import { FiDownload } from 'react-icons/fi';
import PageHeaderWrapper from '../PageHeaderWrapper/PageHeaderWrapper';
import { Option } from '../types';
import './CustomDashboardView.css';
import { CustomStyles } from '../CustomStyles/CustomStyles';
import { Button } from '../Button/Button';
import PageNotFound from '../PageNotFound/PageNotFound';
import IndicatorHeader from '../Cards/IndicatorHeader';
import AnalyticsDataCard from '../Cards/AnalyticsDataCard';
import AnalyticsTextArea from '../Cards/AnalyticsTextArea';
import AnalyticsChart from '../Charts/AnalyticsChart';
import Chart from '../Charts/Chart';
import AnalyticsTable from '../AnalyticsModule/AnalyticsTable';
import 'react-loading-skeleton/dist/skeleton.css';

export const AnalyticsCardSkeleton = () => (
  <div className="p-3 border rounded mb-3">
    <Skeleton height={20} width={100} />
    <Skeleton height={40} width={80} className="mt-2" />
  </div>
);

export const AnalyticsChartSkeleton = () => (
  <div className="p-3 border rounded mb-3">
    <Skeleton height={300} />
  </div>
);

export const AnalyticsTextAreaSkeleton = () => (
  <div className="p-3 border rounded mb-3">
    <Skeleton count={3} />
  </div>
);

export default function CustomdashboardView({
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
  const params = useParams();
  const router = useRouter();
  const [dashboardList, setDashboardList] = useState<any[]>([]);
  const [dashboardSelected, setDashboardSelected] = useState<string>('');
  const [dashboardData, setDashboardData] = useState<any>();
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

  const [isLoading, setIsLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchDashboard = async () => {
      const res = await customDashboardChart.getDashboardList(
        params?.subdomain as string,
      );
      setDashboardList(res?.data?.data || []);
    };
    fetchDashboard();
    // setDashboardSelected(dashboardList[0].id)
  }, []);

  useEffect(() => {
    if (dashboardList?.length > 0 && !dashboardSelected) {
      setDashboardSelected(dashboardList[0].id); // store the first module's id
    }
  }, [dashboardList, dashboardSelected]);

  const getDashboardById = async (dashboardId: string) => {
    const res = await customDashboardChart.getDashboardById(
      params?.subdomain as string,
      dashboardId,
    );

    const { data } = res.data as {
      success: boolean;
      data: any;
    };

    setDashboardSelected(dashboardId);
    setDashboardData(data);
  };

  useEffect(() => {
    if (dashboardSelected) getDashboardById(dashboardSelected);
  }, [dashboardSelected]);

  // useEffect(() => {
  //   if (dashboardList.length > 0 && !dashboardSelected) {
  //     setDashboardSelected(dashboardList[0].id);
  //   }
  // }, [dashboardList, dashboardSelected]);

  // useEffect(() => {
  //   if (dashboardSelected) {
  //     const dashboardById = dashboardList.find(
  //       (i: any) => i.id === dashboardSelected
  //     );
  //     setDashboardData(dashboardById);
  //   }
  // }, [dashboardSelected]);

  const filteredDashboard = Array.isArray(dashboardList)
    ? dashboardList.filter((module: any) => module?.name?.toLowerCase().includes(searchTerm.toLowerCase()))
    : [];

  // const getDashboard = (DashboardId: string) => {

  // };

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
    if (!dashboardSelected) return;

    // call filter with the default selections
    // small timeout to allow any current state updates (optional)
    const t = setTimeout(() => {
      handleFilter();
    }, 50);

    return () => clearTimeout(t);
  }, [selectedFY, selectedFrequency, selectedSite]);

  const getColumn = (widgetColumnsLength: number) => {
    if (widgetColumnsLength === 2) {
      return 'col-lg-6';
    }
    if (widgetColumnsLength === 3) {
      return 'col-lg-4';
    }
    return 'col-lg-12';
  };

  const getTypeObj = (typeObject: any) => typeObject?.dashboard_items?.[0]?.dashboard_combined_parameters?.[0]
    ?.dashboard_custom_parameters
    ?? typeObject?.widget_item?.[0]?.combined_parameters?.[0]?.custom_parameter
    ?? typeObject?.customItems?.[0]?.combinedParameters[0]?.customParameters;

  const getDashboardType = (column: any) => {
    const type0 = column?.types?.[0];

    // If no types or empty array → return null
    if (!type0) return null;

    return (
      type0?.customType
      ?? type0?.widget_type_obj
      ?? type0?.dashboard_type_obj
      ?? null
    );
  };

  const getWidgetType = (WidgetType: any) => {
    //    const w = normalizeWidgetType(WidgetType);
    // if (!w) return null;

    // const customParameters = w.customParameters;

    const customParameters = getTypeObj(WidgetType);
    // console.log(customParameters, 'custom');

    const labels = Array.from(
      new Set(customParameters?.map((item: any) => item.label)),
    );
    const flatLabels = Array.from(new Set(labels?.flat()));
    // console.log(flatLabels, 'labels');
    const legends = Array.from(
      new Set(customParameters?.map((item: any) => item.legends)),
    );
    const flatLegends = Array.from(new Set(legends?.flat()));
    // console.log(flatLegends, 'legends');

    const questionTexts = customParameters?.[0]?.question_texts || [];

    const columns = questionTexts.map((q: any, index: number) => ({
      key: `q${index}`, // unique key
      label: q.toLocaleLowerCase(), // lowercase label
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
    const WidgetItem = WidgetType?.widget_item?.[0]
      ?? WidgetType?.dashboard_items?.[0]
      ?? WidgetType?.customItems[0];
    // eslint-disable-next-line default-case
    switch (WidgetType?.type) {
      case 'card':
        return (
          <>
            {isLoading ? (
              <AnalyticsCardSkeleton />
            ) : (
              <AnalyticsDataCard cardData={WidgetItem} />
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
              <AnalyticsTextArea cardData={WidgetItem} />
            )}
          </>
        );

      case 'table':
        return <AnalyticsTable columns={columns} data={data} />;

      case 'chart': {
        const widgetChartItem = WidgetType?.widget_item?.[0]
          ?? WidgetType?.dashboard_items?.[0]
          ?? WidgetType?.customItems[0];
        // const combinedParameter = widgetChartItem?.combined_parameters[0] ?? widgetChartItem?.dashboard_combined_parameters?.[0] ?? widgetChartItem?.combinedParameters[0]
        // const customParameter = combinedParameter?.custom_parameter ?? combinedParameter?.dashboard_custom_parameters ?? combinedParameter?.customParameters

        // const isTimeSeries = WidgetType?.is_time_series;

        // if (isTimeSeries) {
        //   const QUARTERS = ['Q1', 'Q2', 'Q3', 'Q4'];
        //   const MONTHS = [
        //     'Apr',
        //     'May',
        //     'Jun',
        //     'Jul',
        //     'Aug',
        //     'Sep',
        //     'Oct',
        //     'Nov',
        //     'Dec',
        //     'Jan',
        //     'Feb',
        //     'Mar',
        //   ];

        //   const MONTHS_MAP: Record<string, string> = {
        //     jan: 'Jan',
        //     january: 'Jan',
        //     feb: 'Feb',
        //     february: 'Feb',
        //     mar: 'Mar',
        //     march: 'Mar',
        //     apr: 'Apr',
        //     april: 'Apr',
        //     may: 'May',
        //     jun: 'Jun',
        //     june: 'Jun',
        //     jul: 'Jul',
        //     july: 'Jul',
        //     aug: 'Aug',
        //     august: 'Aug',
        //     sep: 'Sep',
        //     sept: 'Sep',
        //     september: 'Sep',
        //     oct: 'Oct',
        //     october: 'Oct',
        //     nov: 'Nov',
        //     november: 'Nov',
        //     dec: 'Dec',
        //     december: 'Dec',
        //   };

        //   const detectCategories = (labels: string[]) => {
        //     if (!labels.length) return [];

        //     if (labels.every((l) => QUARTERS.includes(l))) {
        //       return QUARTERS;
        //     }

        //     // Map all labels to standardized short months
        //     const mappedLabels = labels
        //       .map((l) => MONTHS_MAP[l.toLowerCase()])
        //       .filter(Boolean); // remove unknown labels

        //     // Return months in financial-year order
        //     return MONTHS.filter((m) => mappedLabels.includes(m));
        //   };

        //   const cpList =
        //     widgetChartItem?.combined_parameters?.[0]?.custom_parameter ?? [];

        //   // collect all labels from API
        //   const allLabels = cpList.flatMap((cp: any) =>
        //     Array.isArray(cp.answer) ? cp.answer.map((a: any) => a.label) : []
        //   );

        //   // get standardized categories
        //   const categories = detectCategories(allLabels);

        //   // // ✅ Collect categories from cp.answer[].label
        //   // const categories: string[] = Array.from(
        //   //   new Set(
        //   //     cpList.flatMap(
        //   //       (cp: any) =>
        //   //         Array.isArray(cp.answer) && cp.answer.length
        //   //           ? cp.answer.map((a: any) => a.label)
        //   //           : cp.label?.length
        //   //             ? cp.label
        //   //             : ['Category'] // fallback if both empty
        //   //     )
        //   //   )
        //   // );

        //   let series: any[] = [];

        //   if (
        //     WidgetType?.chart_type === 'pie' ||
        //     WidgetType?.chart_type === 'donut' ||
        //     WidgetType?.chart_type === 'radialBar'
        //   ) {
        //     // Pie-like charts → just values array
        //     series = cpList.map((cp: any) => {
        //       const raw = Array.isArray(cp.answer) ? cp.answer[0] : cp.answer;
        //       const num = parseFloat(
        //         typeof raw === 'string' ? raw.replace(/[^0-9.-]+/g, '') : raw
        //       );
        //       return isNaN(num) ? 0 : num;
        //     });
        //   } else {
        //     // Other charts → legends + data arrays
        //     series = cpList.map((cp: any) => ({
        //       name: cp.legends?.[0] || cp.label?.[0] || 'Series',
        //       data:
        //         Array.isArray(cp.answer) && cp.answer.length
        //           ? cp.answer.map((a: any) => {
        //               const raw = a.value;
        //               const num = parseFloat(
        //                 typeof raw === 'string'
        //                   ? raw.replace(/[^0-9.-]+/g, '')
        //                   : raw
        //               );
        //               return isNaN(num) ? 0 : num;
        //             })
        //           : [0],
        //     }));
        //   }

        //   return (
        //     <>
        //       {isLoading ? (
        //         <AnalyticsChartSkeleton />
        //       ) : (
        //         <AnalyticsChart
        //           title={widgetChartItem?.title}
        //           isStacked={WidgetType?.is_stacked}
        //           isHorizontal={WidgetType?.is_horizontal}
        //           isMetric={WidgetType?.is_metric}
        //           type={WidgetType?.chart_type}
        //           categories={categories}
        //           series={series}
        //         />
        //       )}
        //     </>
        //   );
        // }

        return (
          <>
            {isLoading ? (
              <AnalyticsChartSkeleton />
            ) : (
              <AnalyticsChart
                title={widgetChartItem?.title}
                isStacked={WidgetType?.is_stacked}
                isHorizontal={WidgetType?.is_horizontal}
                isMetric={WidgetType?.is_metric}
                type={WidgetType?.chart_type}
                categories={
                  WidgetType?.chart_type === 'pie'
                  || WidgetType?.chart_type === 'donut'
                  || WidgetType?.chart_type === 'radialBar'
                    ? customParameters
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
                        // console.log('   📌 LABEL:', label);
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
    dashboardData: any,
    answers: {
      customParameterId: string;
      value: any;
      widget_type: string;
      combinedParamId?: string;
      DashboardId?: string;
    }[],
    ctx: { selectedFY: any; selectedSite: any; apiKey: string; token: string },
  ) => {
    const answerMap = new Map(answers.map((a) => [a.customParameterId, a]));

    // deep clone
    const updated = JSON.parse(JSON.stringify(dashboardData));

    if (!updated?.blocks) {
      return updated;
    }

    updated.blocks.forEach((block: any, bi: number) => {
      block.columns?.forEach((col: any, ci: number) => {
        col.types?.forEach((typeObj: any, ti: number) => {
          // ---------- CASE 1: customType ----------
          if (typeObj.customType) {
            typeObj.customType.customItems?.forEach((customItem: any) => {
              customItem.combinedParameters?.forEach((combinedParam: any) => {
                combinedParam.customParameters?.forEach((customParam: any) => {
                  const key = customParam.id;
                  const match = answerMap.get(key);

                  if (match) {
                    // console.log("✔ Updating customType param", key, "→", match.value);
                    customParam.answer = match.value;
                  }
                });
              });
            });
          }

          // ---------- CASE 2: widget_type_obj (chart/card/table) ----------
          if (typeObj.widget_type_obj) {
            typeObj.widget_type_obj.widget_item?.forEach((widgetItem: any) => {
              widgetItem.combined_parameters?.forEach((combinedParam: any) => {
                combinedParam.custom_parameter?.forEach((customParam: any) => {
                  const key = customParam.id;
                  const match = answerMap.get(key);

                  if (match) {
                    // console.log("✔ Updating widget param", key, "→", match.value);
                    customParam.answer = match.value;
                  }
                });
              });
            });
          }
        });
      });
    });

    return updated;
  };

  const handleFilter = async () => {
    setIsLoading(true);
    if (!selectedFY?.value) {
      setIsLoading(false);
      return;
    }

    try {
      const successfulResponses: any[] = [];

      try {
        const res = await DataCube.getCustomTaskResponse(
          selectedFY?.value ?? '',
          selectedFrequency?.value ?? '',
          selectedSite?.value ?? '',
          apiKey,
          dashboardSelected,
          token,
        );

        if (res?.data?.success) {
          successfulResponses.push(res);
        }
      } catch (err) {
        console.error('Error for dashboard:', err);
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

        if (type === 'chart' && Array.isArray(item.combinedParams)) {
          return item.combinedParams.map((cp: any) => ({
            customParameterId: cp.custom_parameter_id,
            value: cp.calculated_value,
            widget_type: type,
            widgetId: item.widget_id,
          }));
        }

        // if (type === 'table' && Array.isArray(item.rows)) {
        //   const numRows = item.rows[0]?.values.length || 0;

        //   const tableRows = Array.from({ length: numRows }, (_, rowIndex) => {
        //     const rowObj: Record<string, any> = {};
        //     item.rows.forEach((r: any, colIndex: number) => {
        //       rowObj[`q${colIndex}`] = r.values[rowIndex] ?? null;
        //     });
        //     return rowObj;
        //   });

        //   return {
        //     customParameterId: item.custom_parameter_id,
        //     value: tableRows,
        //     widget_type: type,
        //   };
        // }

        return [];
      }));

      if (dashboardData) {
        const updated = await updateAnswers(dashboardData, formatted, {
          selectedFY,
          selectedSite,
          apiKey,
          token,
        });
        setDashboardData(updated);
      }
    } catch (err) {
      console.error('Error fetching widget data:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const getBlockWeight = (block: HTMLElement) => {
    // Chart
    if (block.querySelector('.apexcharts-canvas')) {
      return 2;
    }

    // Card
    if (block.querySelector('.card-title')) {
      return 1;
    }

    // Default (safe)
    return 1;
  };

  const handleDownloadPDF = async () => {
    const input = document.getElementById('dashboard-pdf');
    if (!input) return;

    const blocks = Array.from(
      input.querySelectorAll('[data-block-id]'),
    ) as HTMLElement[];
    if (blocks.length === 0) return;

    const pdf = new jsPDF('p', 'mm', 'a4');
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = pdf.internal.pageSize.getHeight();
    const margin = 8;
    const usableWidth = pdfWidth - margin * 2;

    // Split blocks into groups of 4 per page
    const MAX_PAGE_WEIGHT = 8;

    const blockGroups: HTMLElement[][] = [];
    let currentGroup: HTMLElement[] = [];
    let currentWeight = 0;

    blocks.forEach((block) => {
      const weight = getBlockWeight(block);

      // New page if limit exceeded
      if (currentWeight + weight > MAX_PAGE_WEIGHT) {
        blockGroups.push(currentGroup);
        currentGroup = [];
        currentWeight = 0;
      }

      currentGroup.push(block);
      currentWeight += weight;
    });

    // Push last page
    if (currentGroup.length) {
      blockGroups.push(currentGroup);
    }

    let isFirstPage = true;

    for (const group of blockGroups) {
      const tempContainer = document.createElement('div') as HTMLElement;
      tempContainer.style.position = 'fixed';
      tempContainer.style.left = '-9999px';
      tempContainer.style.top = '0';
      tempContainer.style.width = `${input.clientWidth}px`;
      tempContainer.style.background = '#f6f5f3';
      tempContainer.style.padding = '20px';
      tempContainer.style.fontSize = '40px';

      // Add title on first page only
      if (isFirstPage) {
        const originalTitle = input.querySelector(
          '#dashboard-title',
        ) as HTMLElement | null;
        if (originalTitle) {
          const titleClone = originalTitle.cloneNode(true) as HTMLElement;
          titleClone.style.fontSize = '30px';
          titleClone.style.marginBottom = '30px';
          titleClone.style.fontWeight = '600';
          titleClone.style.padding = '10px 0';
          tempContainer.appendChild(titleClone);
        }
      }

      // Clone blocks and apply styles
      group.forEach((block) => {
        const clone = block.cloneNode(true) as HTMLElement;

        // Hide elements not for PDF
        clone.querySelectorAll('.hide-in-pdf').forEach((el) => {
          (el as HTMLElement).style.display = 'none';
        });

        // Prevent splitting
        clone.querySelectorAll('*').forEach((el) => {
          (el as HTMLElement).style.breakInside = 'avoid';
          (el as HTMLElement).style.pageBreakInside = 'avoid';
        });

        // Widget items
        clone.querySelectorAll('.widget-item').forEach((el) => {
          (el as HTMLElement).style.maxHeight = '500px';
        });

        // Card titles and answers
        clone.querySelectorAll('.card-title, .card-answer').forEach((el) => {
          const htmlEl = el as HTMLElement;
          htmlEl.style.fontSize = '20px';
          htmlEl.style.lineHeight = '1.3';
          htmlEl.style.padding = '5px';
        });

        // Chart titles
        clone.querySelectorAll('.chart-title').forEach((el) => {
          const htmlEl = el as HTMLElement;
          htmlEl.style.fontSize = '20px';
          htmlEl.style.marginBottom = '30px';
          htmlEl.style.padding = '10px';
        });

        // Chart text/legend
        clone
          .querySelectorAll(
            '.apexcharts-text, .apexcharts-legend-text, .apexcharts-yaxis-label, .apexcharts-xaxis-label',
          )
          .forEach((el) => {
            const htmlEl = el as HTMLElement;
            htmlEl.style.fontSize = '18px';
            htmlEl.style.padding = '10px';
          });

        // ApexCharts legend fixes
        clone.querySelectorAll('.apexcharts-legend').forEach((el) => {
          const htmlEl = el as HTMLElement;
          htmlEl.style.display = 'flex';
          htmlEl.style.flexWrap = 'wrap';
          htmlEl.style.alignItems = 'center';
          htmlEl.style.gap = '12px';
          htmlEl.style.height = 'auto';
          htmlEl.style.overflow = 'visible';
        });

        clone.querySelectorAll('.apexcharts-legend-series').forEach((el) => {
          const htmlEl = el as HTMLElement;
          htmlEl.style.display = 'flex';
          htmlEl.style.flexDirection = 'row';
          htmlEl.style.alignItems = 'center';
          htmlEl.style.justifyContent = 'flex-start';
          htmlEl.style.gap = '3px';
          htmlEl.style.margin = '0';
          htmlEl.style.padding = '0';
          htmlEl.style.whiteSpace = 'nowrap';
          htmlEl.style.overflow = 'visible';
          htmlEl.style.maxWidth = '100%';
        });

        clone
          .querySelectorAll('.apexcharts-legend-series span')
          .forEach((el) => {
            const htmlEl = el as HTMLElement;
            htmlEl.style.display = 'flex';
            htmlEl.style.flexDirection = 'row';
            htmlEl.style.alignItems = 'center';
            htmlEl.style.gap = '5px';
          });

        clone.querySelectorAll('.apexcharts-legend-marker').forEach((el) => {
          const htmlEl = el as HTMLElement;
          htmlEl.style.width = '14px';
          htmlEl.style.height = '14px';
          htmlEl.style.display = 'inline-block';
          htmlEl.style.flexShrink = '0';
          htmlEl.style.marginTop = '18px';
        });

        clone.querySelectorAll('.apexcharts-legend-text').forEach((el) => {
          const htmlEl = el as HTMLElement;
          htmlEl.style.display = 'inline-block';
          htmlEl.style.fontSize = '16px';
          htmlEl.style.whiteSpace = 'nowrap';
          htmlEl.style.margin = '0';
          htmlEl.style.padding = '0';
          htmlEl.style.flexShrink = '0';
        });

        tempContainer.appendChild(clone);
      });

      document.body.appendChild(tempContainer);

      // Render canvas
      const canvas = await html2canvas(tempContainer, {
        scale: 2,
        backgroundColor: '#f6f5f3',
        useCORS: true,
      });

      document.body.removeChild(tempContainer);

      const imgData = canvas.toDataURL('image/png');
      const scalingFactor = usableWidth / canvas.width;
      const imgHeight = canvas.height * scalingFactor;

      if (!isFirstPage) pdf.addPage();
      isFirstPage = false;

      pdf.setFillColor(246, 245, 243);
      pdf.rect(0, 0, pdfWidth, pdfHeight, 'F');

      pdf.addImage(imgData, 'PNG', margin, margin, usableWidth, imgHeight);
    }

    const titleEl = input.querySelector('#dashboard-title');
    const fileName = titleEl?.textContent?.trim() || 'Dashboard';
    pdf.save(`${fileName}.pdf`);
  };

  return (
    <PageHeaderWrapper
      //   breadCrumbMenu={breadCrumbMenu}
      extraClassName="px-3"
      iswhite
      title={(
        <div>
          <h4 className="fs-18 fw-700">Custom Dashboard</h4>
          <h2 className="fs-14 fw-500 text-muted">My Dashboard</h2>
        </div>
      )}
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
              onClick={handleFilter}
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
              // onClick={handleFilter}
              isDisabled={isLoading}
            />
          </div>
        </div>
      )}
    >
      <div className="row">
        <div className="col-12 col-md-3 mt-0">
          <div className="analytics_module_container py-4">
            <div className="px-3">
              <div className="create-btn-wrapper">
                <Button
                  text="Create Dashboard/Charts"
                  isPill
                  className="create-btn mt-2 mb-2"
                  prefixIconChildren={<MdOutlineAdd color="#ffffff" />}
                  onClick={() => router.push('/insights/custom_dashboard/create')}
                />
              </div>

              {/* 🔍 Search Input */}
              <input
                type="text"
                placeholder="Search dashboard..."
                className="form-control mb-3 mt-2"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />

              {filteredDashboard.length > 0 ? (
                filteredDashboard.map((dashboard: any) => (
                  <div
                    key={dashboard?.id}
                    className={`d-flex justify-content-between gap-2 mt-3 is_radius ${
                      dashboardSelected === dashboard?.id ? 'active' : ''
                    }`}
                  >
                    <div
                      className="p-2 py-3 d-flex flex-column gap-2 flex-grow-1"
                      aria-hidden
                      onClick={() => getDashboardById(dashboard?.id)}
                    >
                      <h6 className="fs-14 fw-600 mb-0 letter-spacing text-capitalize">
                        {dashboard?.name}
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
                <p className="text-muted mt-3">No dashboard found</p>
              )}
            </div>
          </div>
        </div>
        <div className="col-12 col-md-9">
          <div id="dashboard-pdf">
            {dashboardData ? (
              <Suspense fallback={<div>Widgets Loading...</div>}>
                {/* Dashboard Title */}
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <h4 className="fs-18 fw-700 mb-2" id="dashboard-title">
                    {dashboardData?.name
                      ?.toLocaleLowerCase()
                      ?.replace(/\b\w/g, (char: any) => char.toUpperCase())}
                  </h4>
                  <button
                    type="button"
                    className="custom-dashboard-action-btns px-3 py-2 hide-in-pdf"
                    onClick={handleDownloadPDF}
                  >
                    <div className="d-flex align-items-center gap-2 justify-content-center fw-600 fs-14">
                      Download
                      <FiDownload size={18} color="#000000" />
                    </div>
                  </button>
                </div>

                {/* Map over blocks */}
                {dashboardData?.blocks
                  ?.sort(
                    (a: any, b: any) => (a?.sequence ?? 0) - (b?.sequence ?? 0),
                  )
                  ?.map((block: any) => (
                    <div
                      className="row mt-0"
                      key={block?.id}
                      data-block-id={block?.id}
                    >
                      {/* Map over columns inside blocks */}
                      {block?.columns
                        ?.sort(
                          (a: any, b: any) => (a?.sequence ?? 0) - (b?.sequence ?? 0),
                        )
                        ?.map((column: any) => {
                          const typeData = getDashboardType(column);

                          // ⛔ Skip this column completely if no valid type
                          if (!typeData) return null;

                          return (
                            <div
                              className={`widget-item ${getColumn(block?.columns?.length)} g-1`}
                              key={`${block?.id}-${column?.sequence}`}
                            >
                              <div className="widget-pdf-block">
                                {getWidgetType(typeData)}
                              </div>
                              <div className="page-break" />
                            </div>
                          );
                        })}
                    </div>
                  ))}
              </Suspense>
            ) : (
              <div className="bg-white">
                <PageNotFound />
              </div>
            )}
          </div>
        </div>
      </div>
    </PageHeaderWrapper>
  );
}
