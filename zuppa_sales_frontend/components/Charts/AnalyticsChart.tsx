/* eslint-disable @typescript-eslint/no-explicit-any */

'use client';

import ReactApexChart from 'react-apexcharts';
import { ApexOptions } from 'apexcharts';
import Select from 'react-select';
import { ReactNode, useState } from 'react';
import { Option } from '../types';
import { CustomStyles } from '../CustomStyles/CustomStyles';
import './Chart.css';

export interface SeriesProps {
  name: string;
  data: number[];
}

export interface IMetricData {
  name: string;
  value: number;
  prefixUnit?: string;
  suffixUnit?: string;
  icon?: ReactNode;
}
export default function AnalyticsChart({
  type,
  categories,
  series,
  title,
  cardClass,
  isStacked = false,
  isHorizontal = false,
  isFilters = false,
  isLocationFilter = false,
  isTimeFrequencyFilter = false,
  isValueFilter = false,
  isMetric = false,
  metricData,
}: {
  type:
    | 'line'
    | 'area'
    | 'bar'
    | 'pie'
    | 'donut'
    | 'radialBar'
    | 'scatter'
    | 'bubble'
    | 'heatmap'
    | 'candlestick'
    | 'boxPlot'
    | 'radar'
    | 'polarArea'
    | 'rangeBar'
    | 'rangeArea'
    | 'treemap'
    | undefined;
  title: string;
  categories: string[];
  series: SeriesProps[] | number[];
  cardClass?: string;
  isStacked?: boolean;
  isHorizontal?: boolean;
  isFilters?: boolean;
  isLocationFilter?: boolean;
  isTimeFrequencyFilter?: boolean;
  isValueFilter?: boolean;
  isMetric?: boolean;
  metricData?: IMetricData;
}) {
  const [chartFilter, setChartFilter] = useState('');
  const locationOption = [
    {
      label: 'Site1 - Chennai',
      value: 'Site1 - Chennai',
    },
    {
      label: 'Site1 - Mumbai',
      value: 'Site1 - Mumbai',
    },
  ];

  const timeFrequencyOption = [
    {
      label: 'Monthly',
      value: 'Monthly',
    },
    {
      label: 'Quarterly',
      value: 'Quarterly',
    },
    {
      label: 'Yearly',
      value: 'Yearly',
    },
  ];

  const equipmentOption = [
    {
      label: 'Equipment 1',
      value: 'Equipment 1',
    },
    {
      label: 'Equipment 2',
      value: 'Equipment 2',
    },
    {
      label: 'Equipment 3',
      value: 'Equipment 3',
    },
  ];

  const getLocationValues = () => locationOption
    .filter((opt): opt is Option => !('options' in opt))
    .find((item: any) => chartFilter?.includes(item?.value));

  const getTimeFrequencyValues = () => timeFrequencyOption
    .filter((opt): opt is Option => !('options' in opt))
    .find((item: any) => chartFilter?.includes(item?.value));

  const getEquipmentValues = () => equipmentOption
    .filter((opt): opt is Option => !('options' in opt))
    .find((item: any) => chartFilter?.includes(item?.value));

  const barChartOption: any = {
    series,
    options: {
      chart: {
        id: 'bar-id',
        stacked: isStacked,
        toolbar: {
          show: false,
          offsetX: 0,
          offsetY: 0,
          tools: {
            download: false,
            selection: false,
            zoom: false,
            zoomin: false,
            zoomout: false,
            pan: false,
            reset: false,
            customIcons: [],
          },
        },
      },
      plotOptions: {
        bar: {
          borderRadius: 5,
          borderRadiusApplication: 'end',
          horizontal: isHorizontal,
        },
      },
      xaxis: {
        categories,
        tickAmount: 'dataPoints',
        axisBorder: {
          show: false,
        },
        axisTicks: {
          show: false,
        },
        labels: {
          show: true,
          rotate: -45,
          rotateAlways: false,
          hideOverlappingLabels: true,
          showDuplicates: false,
          trim: true,
          maxHeight: 120,
          formatter(val: string) {
            const maxLength = 10; // adjust based on space
            return val.length > maxLength
              ? `${val.substring(0, maxLength)}…`
              : val;
          },
          style: {
            colors: [],
            fontSize: '12px',
            fontFamily: 'Helvetica, Arial, sans-serif',
            fontWeight: 400,
            cssClass: 'apexcharts-xaxis-label',
          },
        },
      },
      yaxis: {
        labels: {
          show: true,
          style: {
            colors: ['#767676'],
            fontSize: '10px',
            fontFamily: 'Helvetica, Arial, sans-serif',
            fontWeight: 400,
            cssClass: 'apexcharts-yaxis-label',
          },
          formatter(val: number) {
            return val.toFixed(0);
          },
        },
      },
      tooltip: {
        // y: {
        //   formatter: function (_val: number, opts: any) {
        //     const categoryIndex = opts.dataPointIndex;
        //     return categories[categoryIndex]; // show full text in tooltip
        //   },
        // },
        x: {
          formatter(val: string) {
            return val; // always return full text, no trimming
          },
        },
      },

      colors: ['#5DD0A7', '#FBA900', '#38C5F8', '#FF4C51'],
      fill: {
        type: 'gradient',
        gradient: {
          shade: 'light',
          type: 'vertical',
          shadeIntensity: 0.2,
          gradientToColors: ['#DEF6ED', '#DEF6ED', '#DEF6ED', '#DEF6ED'],
          inverseColors: false,
          opacityFrom: 1,
          opacityTo: 1,
          stops: [0, 100],
        },
      },
      legend: {
        show: true,
        horizontalAlign: 'left',
        markers: {
          size: 7,
          shape: 'square',
          strokeWidth: 1,
        },
      },
      dataLabels: {
        enabled: false,
      },
      grid: {
        position: 'back',
        strokeDashArray: 7,
      },
    },
  };

  const pieChartOption: {
    options: ApexOptions;
    series: ApexOptions['series'];
  } = {
    series,
    options: {
      chart: {
        id: 'pie-id',
      },
      plotOptions: {
        pie: {
          startAngle: 0,
          endAngle: 360,
          expandOnClick: true,
          offsetX: 0,
          offsetY: 0,
          customScale: 1,
          dataLabels: {
            offset: 0,
            minAngleToShowLabel: 0,
          },
        },
      },
      labels: categories,
      colors: ['#64D2AB', '#FBA901', '#39C5F8', '#FF4C51'],
      fill: {
        type: 'gradient',
        gradient: {
          shade: 'light',
          type: 'diagonal1',
          shadeIntensity: 0.5,
          gradientToColors: ['#D1F3E6', '#E1EFD6', '#D5F4ED', '#D1F3E6'],
          inverseColors: true,
          opacityFrom: 1,
          opacityTo: 1,
          stops: [0, 100],
        },
      },
      legend: {
        show: true,
        position: 'bottom',
        horizontalAlign: 'left',
        markers: {
          size: 7,
          shape: 'square',
          strokeWidth: 1,
        },
      },
      dataLabels: {
        enabled: false,
        style: {
          fontSize: '12px',
          fontFamily: 'Helvetica, Arial, sans-serif',
          // fontWeight: 'bold',
          colors: ['black'],
        },
      },
    },
  };

  const donutChartOption: {
    options: ApexOptions | any;
    series: ApexOptions['series'];
  } = {
    series,
    options: {
      chart: {
        id: 'donut-id',
      },
      plotOptions: {
        pie: {
          startAngle: 0,
          endAngle: 360,
          expandOnClick: false,
          offsetX: 0,
          offsetY: 0,
          customScale: 1,
          dataLabels: {
            offset: 0,
            minAngleToShowLabel: 0,
          },
          donut: {
            size: '70%',
            background: '#F5F5F5',
            labels: {
              show: true,
              size: '20%',
              name: {
                show: true,
                fontSize: '12px',
                fontFamily: 'Helvetica, Arial, sans-serif',
                fontWeight: 600,
                color: '#232538',
                offsetY: -20,
                formatter(val: any) {
                  return val;
                },
              },
              value: {
                show: true,
                fontSize: '20px',
                fontFamily: 'Helvetica, Arial, sans-serif',
                fontWeight: 700,
                color: '#232538',
                offsetY: 0,
                formatter(val: any) {
                  return val;
                },
              },
              total: {
                show: true,
                showAlways: false,
                label: 'Total',
                fontSize: '12px',
                fontFamily: 'Helvetica, Arial, sans-serif',
                fontWeight: 500,
                color: '#232538',
                offsetY: 20,
                formatter(w: any) {
                  return w.globals.seriesTotals.reduce(
                    (a: any, b: any) => a + b,
                    0,
                  );
                },
              },
            },
          },
        },
      },
      stroke: {
        show: true,
        curve: 'smooth',
        lineCap: 'round',
        width: 4,
        dashArray: 0,
      },
      labels: categories,
      colors: ['#64D2AB', '#FBA901', '#39C5F8'],
      fill: {
        type: 'gradient',
        gradient: {
          shade: 'light',
          type: 'diagonal1',
          shadeIntensity: 0.5,
          gradientToColors: ['#D1F3E6', '#E1EFD6', '#D5F4ED'],
          inverseColors: true,
          opacityFrom: 0.8,
          opacityTo: 1,
          stops: [0, 100],
        },
      },
      legend: {
        show: true,
        position: 'bottom',
        horizontalAlign: 'left',
        markers: {
          size: 7,
          shape: 'square',
          strokeWidth: 1,
        },
      },
      tooltip: {
        enabled: true,
        followCursor: true,
        style: {
          cursor: 'pointer',
        },
      },
      dataLabels: {
        enabled: false,
        style: {
          fontSize: '12px',
          fontFamily: 'Helvetica, Arial, sans-serif',
          colors: ['black'],
        },
      },
    },
  };

  const gaugeChartOption: {
    options: ApexOptions | any;
    series: ApexOptions['series'];
  } = {
    series,
    options: {
      chart: {
        type: 'radialBar',
        offsetY: -20,
        sparkline: { enabled: true },
      },
      plotOptions: {
        radialBar: {
          startAngle: -90,
          endAngle: 90,
          hollow: {
            size: '75%',
            background: '#64D2AB33',
            margin: 10,
          },
          track: {
            background: '#ECEFF6',
            strokeWidth: '100%',
          },
          dataLabels: {
            name: {
              show: true,
              fontSize: '10px',
              fontFamily: 'Helvetica, Arial, sans-serif',
              fontWeight: 700,
              color: '#000000',
              offsetY: -20,
              //   formatter: function (val: any) {
              //     return 'Employees';
              //   },
            },
            value: {
              offsetY: -60,
              fontSize: '24px',
              fontWeight: 700,
              color: '#232538',
              formatter: (val: any) => `${val}%`,
            },
          },
        },
      },
      stroke: {
        show: true,
        curve: 'smooth',
        lineCap: 'round',
        width: 4,
        dashArray: 0,
      },
      labels: categories,
      colors: ['#64D2AB'],
      fill: {
        type: 'gradient',
        gradient: {
          shade: 'light',
          type: 'diagonal1',
          shadeIntensity: 1,
          gradientToColors: ['#D1F3E6'],
          inverseColors: true,
          opacityFrom: 1,
          opacityTo: 1,
          stops: [0, 100],
        },
      },
      dataLabels: {
        enabled: false,
        style: {
          fontSize: '12px',
          fontFamily: 'Helvetica, Arial, sans-serif',
          colors: ['black'],
        },
      },
    },
  };

  const lineChart: {
    options: ApexOptions | any;
    series: ApexOptions['series'];
  } = {
    series,
    options: {
      chart: {
        id: 'line-id',
        toolbar: {
          show: true,
          offsetX: 0,
          offsetY: 0,
          tools: {
            download: true,
            selection: false,
            zoom: false,
            zoomin: false,
            zoomout: false,
            pan: false,
            reset: false,
            customIcons: [],
          },
        },
      },
      plotOptions: {
        bar: {
          borderRadius: 5,
          borderRadiusApplication: 'end',
          horizontal: false,
        },
      },
      xaxis: {
        categories,
        axisBorder: {
          show: false,
        },
        axisTicks: {
          show: false,
        },
      },
      yaxis: {
        labels: {
          show: true,
          style: {
            colors: ['#767676'],
            fontSize: '10px',
            fontFamily: 'Helvetica, Arial, sans-serif',
            fontWeight: 400,
            cssClass: 'apexcharts-yaxis-label',
          },
          formatter(val: number) {
            return val.toFixed(0);
          },
        },
      },
      colors: ['#5DD0A7', '#FBA900', '#38C5F8', '#FF4C51'],
      legend: {
        show: true,
        horizontalAlign: 'left',
        markers: {
          size: 7,
          shape: 'square',
          strokeWidth: 1,
        },
      },
      dataLabels: {
        style: {
          fontSize: '14px',
          fontFamily: 'Helvetica, Arial, sans-serif',
          fontWeight: 'bold',
          colors: ['black'],
        },
        formatter(val: number) {
          return val.toFixed(0);
        },
      },
      grid: {
        position: 'back',
        strokeDashArray: 7,
      },
      stroke: {
        show: true,
        curve: 'straight',
        lineCap: 'round',
        width: 4,
        dashArray: 0,
      },
      markers: {
        strokeColor: ['#5DD0A7', '#FBA900', '#38C5F8', '#FF4C51'],
        size: 4,
        shape: 'circle',
        fillOpacity: 0,
      },
    },
  };

  const areaChart: {
    options: ApexOptions | any;
    series: ApexOptions['series'];
  } = {
    series,
    options: {
      chart: {
        id: 'area-id',
        toolbar: {
          show: true,
          offsetX: 0,
          offsetY: 0,
          tools: {
            download: true,
            selection: false,
            zoom: false,
            zoomin: false,
            zoomout: false,
            pan: false,
            reset: false,
            customIcons: [],
          },
        },
      },
      plotOptions: {
        bar: {
          borderRadius: 5,
          borderRadiusApplication: 'end',
          horizontal: false,
        },
      },
      xaxis: {
        categories,
        axisBorder: {
          show: false,
        },
        axisTicks: {
          show: false,
        },
      },
      yaxis: {
        labels: {
          show: true,
          style: {
            colors: ['#767676'],
            fontSize: '10px',
            fontFamily: 'Helvetica, Arial, sans-serif',
            fontWeight: 400,
            cssClass: 'apexcharts-yaxis-label',
          },
          formatter(val: number) {
            return val.toFixed(0);
          },
        },
      },
      fill: {
        type: 'gradient',
        gradient: {
          shade: 'light',
          type: 'vertical',
          shadeIntensity: 0.5,
          gradientToColors: ['#DEF6ED', '#DEF6ED', '#DEF6ED'],
          inverseColors: false,
          opacityFrom: 1,
          opacityTo: 1,
          stops: [0, 100],
        },
      },
      colors: ['#5DD0A7', '#FBA900', '#38C5F8'],
      legend: {
        show: true,
        horizontalAlign: 'left',
        markers: {
          size: 7,
          shape: 'square',
          strokeWidth: 1,
        },
      },
      dataLabels: {
        enabled: false,
        formatter(val: number) {
          return val.toFixed(0);
        },
      },
      grid: {
        position: 'back',
        strokeDashArray: 7,
      },
    },
  };

  const getChartOption = () => {
    if (type === 'pie') {
      return pieChartOption.options;
    }
    if (type === 'bar') {
      return barChartOption.options;
    }
    if (type === 'line') {
      return lineChart.options;
    }
    if (type === 'area') {
      return areaChart.options;
    }
    if (type === 'donut') {
      return donutChartOption.options;
    }
    // if (type === 'radialBar') {
    //   return gaugeChartOption.options;
    // }
    return gaugeChartOption.options;
  };

  const getChartSeries = () => {
    if (type === 'pie') {
      return pieChartOption.series;
    }
    if (type === 'bar') {
      return barChartOption.series;
    }
    if (type === 'line') {
      return lineChart.series;
    }
    if (type === 'area') {
      return areaChart.series;
    }
    if (type === 'donut') {
      return donutChartOption.series;
    }
    // if (type === 'radialBar') {
    //   return gaugeChartOption.series;
    // }
    return gaugeChartOption.series;
  };

  return (
    <div className="m-1">
      <div
        className={`${cardClass} bg-white w-100 h-100 rounded-3 px-4 pt-4 pb-3 position-relative`}
      >
        <div className="d-flex justify-content-between align-items-center mb-1">
          {title && (
            <h6 style={{ color: '#2B3674' }} className="chart-title fs-14 fw-700 mb-2">
              {title}
            </h6>
          )}
          {isFilters && (
            <div className="d-flex gap-2">
              {isFilters && isLocationFilter && (
                <Select
                  id="sector"
                  value={getLocationValues()}
                  onChange={(e) => setChartFilter(e?.value as string)}
                  placeholder="Location"
                  options={locationOption}
                  isMulti={false}
                  //   isDisabled={isDisabled}
                  styles={CustomStyles}
                  classNamePrefix="custom_select_input_chart"
                  data-testid="customSelect"
                  inputId="sector"
                />
              )}
              {isFilters && isTimeFrequencyFilter && (
                <Select
                  id="sector"
                  value={getTimeFrequencyValues()}
                  onChange={(e) => setChartFilter(e?.value as string)}
                  placeholder="monthly"
                  options={timeFrequencyOption}
                  isMulti={false}
                  //   isDisabled={isDisabled}
                  styles={CustomStyles}
                  classNamePrefix="custom_select_input_chart"
                  data-testid="customSelect"
                  inputId="sector"
                />
              )}
              {isFilters && isValueFilter && (
                <Select
                  id="sector"
                  value={getEquipmentValues()}
                  onChange={(e) => setChartFilter(e?.value as string)}
                  placeholder="Equipment"
                  options={equipmentOption}
                  isMulti={false}
                  //   isDisabled={isDisabled}
                  styles={CustomStyles}
                  classNamePrefix="custom_select_input_chart"
                  data-testid="customSelect"
                  inputId="sector"
                />
              )}
            </div>
          )}
        </div>
        {isMetric && (
          <div className="d-flex justify-content-between align-items-center mt-3">
            <div>
              <p className="mb-0" style={{ fontSize: 10, fontWeight: 400 }}>
                {metricData?.name}
              </p>
              <p style={{ color: '#2B3674' }} className="fs-14 fw-700 mb-0">
                {metricData?.prefixUnit}
                {' '}
                {metricData?.value}
                {' '}
                {metricData?.suffixUnit}
              </p>
            </div>
            {metricData?.icon && (
              <div
                style={{
                  padding: 8,
                  backgroundColor: '#FFFDED',
                  borderRadius: 40,
                }}
              >
                {metricData?.icon}
              </div>
            )}
          </div>
        )}
        <ReactApexChart
          // options={pieChartOption?.options}
          // series={pieChartOption?.series}
          // type={type}
          // height={height}
          key={type?.toLowerCase()}
          options={getChartOption()}
          series={getChartSeries()}
          type={type}
          height={300}
        />
        {/* <div className="d-flex justify-content-end trend">
        <p className="m-0">
          <MdOutlineArrowDropUp color="#05CD99"></MdOutlineArrowDropUp>
          <span className="fs-12">+4.91%</span>
        </p>
      </div> */}
      </div>
    </div>
  );
}
