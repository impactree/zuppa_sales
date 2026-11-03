/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable max-len */

'use client';

import React, { ReactNode, useState } from 'react';
import './DataCard.css';
import Select from 'react-select';
import { CustomStyles } from '../CustomStyles/CustomStyles';

export interface IOpsCardDta {
  title: string;
  name: string;
  value: number;
  prefixUnit?: string;
  suffixUnit?: string;
  icon?: ReactNode;
  cardColumn: string;
}

export default function OpsDataCard({
  cardData,
  cardClass,
  isFilters = false,
  isLocationFilter = false,
  isValueFilter = false,
}: {
  cardData: IOpsCardDta[];
  cardClass?: string;
  isFilters?: boolean;
  isLocationFilter?: boolean;
  isValueFilter?: boolean;
}) {
  const [chartFilter, setChartFilter] = useState('');
  const filterOptionArray = [
    {
      label: 'Site1 - Chennai',
      value: 'Site1 - Chennai',
    },
    {
      label: 'Site1 - Mumbai',
      value: 'Site1 - Mumbai',
    },
  ];
  //   const getValues = () =>
  //     filterOptionArray
  //       .filter((opt): opt is Option => !('options' in opt))
  //       .find((item: any) => chartFilter?.includes(item?.value));

  const getValues = (cardTitle: any) => filterOptionArray.find((item) => chartFilter[cardTitle] === item.value)
    || null;

  const handleChange = (value: string, cardTitle: string) => {
    setChartFilter((prev: any) => ({
      ...prev,
      [cardTitle]: value,
    }));
  };
  return (
    <div className="row mt-0">
      {cardData?.map((card: IOpsCardDta) => (
        <div className={`col-12 ${card?.cardColumn} mb-3`} key={card?.title}>
          <div
            className={`${cardClass} bg-white w-100 h-100 rounded-3 px-4 pt-4 pb-3 position-relative`}
          >
            <div className="d-flex justify-content-between align-items-center mb-2">
              <h6 style={{ color: '#2B3674' }} className="fs-14 fw-700 mb-0">
                {card?.title}
              </h6>
              {isFilters && (
                <div className="d-flex gap-2" key={card?.title}>
                  {isFilters && isLocationFilter && (
                    <Select
                      id="sector"
                      value={getValues(card?.title)}
                      onChange={(e) => handleChange(e?.value as string, card?.title)}
                      placeholder="Location"
                      options={filterOptionArray}
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
                      value={getValues(card?.title)}
                      onChange={(e) => setChartFilter(e?.value as string)}
                      placeholder="Equipment"
                      options={filterOptionArray}
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
            <div className="d-flex justify-content-between align-items-center mt-3">
              <div>
                <p className="mb-0" style={{ fontSize: 10, fontWeight: 400 }}>
                  {card?.name}
                </p>
                <p style={{ color: '#2B3674' }} className="fs-14 fw-700 mb-0">
                  {card?.prefixUnit}
                  {' '}
                  {card?.value}
                  {' '}
                  {card?.suffixUnit}
                </p>
              </div>
              {card?.icon && (
                <div
                  style={{
                    padding: 8,
                    backgroundColor: '#FFFDED',
                    borderRadius: 40,
                  }}
                >
                  {card?.icon}
                </div>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
