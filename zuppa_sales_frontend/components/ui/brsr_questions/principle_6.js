/* eslint-disable camelcase */
/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable max-len */
const {
  TextRun,
  Paragraph,
  Table,
  TableCell,
  TableRow,
  WidthType,
} = require('docx');
// const fs = require("fs");
//   const dataSet = require("../models/hrGeneralData");

const principle_6 = () => new Paragraph({
  children: [
    new TextRun({
      text: 'PRINCIPLE 6: Businesses should respect and make efforts to protect  and restore the environment ',
      bold: true,
      break: 2,
    }),
    new TextRun({
      text: 'Essential Indicators ',
      bold: true,
      break: 2,
    }),
  ],
});

const questionEnergyConsumption = () => new Paragraph({
  text: '1. Employees and workers who have been provided training on human rights issues and  policy(ies) of the entity, in the following format:    ',
  spacing: { before: 200, after: 200 },
});

const tableEnergyConsumption = async (obj) => {
  // const res = await axios.get("http://localhost:5000/report-template/download?report_name=BRSR&financial_year=2024&financial_quarter=q4");
  const data = obj?.energyBalance;
  // const test = data?.[
  //   'Total_Electricity_Consumption(GJ)'
  // ]?.currentYear?.toString() || ' ';
  // console.log("total electricity", test);
  // console.log(data);
  // const totalElectricityObj = data?.find((item) => item?.hasOwnProperty?.('Total_Electricity_Consumption(GJ)'));

  // Retrieve the currentYear value
  // const test1 = totalElectricityObj
  //   ? totalElectricityObj["Total_Electricity_Consumption(GJ)"].currentYear.toString()
  //   : " ";

  // console.log("total1 electricity", test1);

  return new Table({
    width: {
      size: 100,
      type: WidthType.PERCENTAGE,
    },
    rows: [
      new TableRow({
        children: [
          new TableCell({
            children: [new Paragraph('Parameter')],
          }),
          new TableCell({
            children: [new Paragraph('FY _____ (Current Financial Year)')],
          }),
          new TableCell({
            children: [new Paragraph('FY ______ (Previous Financial Year)')],
          }),
        ],
      }),

      new TableRow({
        children: [
          new TableCell({
            children: [new Paragraph('From renewable sources')],
            columnSpan: 3,
          }),
          // new TableCell({
          //     children: [new Paragraph("")],
          // }),
          // new TableCell({
          //     children: [new Paragraph("")],
          // }),
        ],
      }),
      new TableRow({
        children: [
          new TableCell({
            children: [new Paragraph('Total electricity consumption (A)')],
          }),
          new TableCell({
            children: [
              new Paragraph(
                data?.[0]?.[
                  'Total_Electricity_Consumption(GJ)'
                ]?.currentYear?.toString() || ' ',
              ),
            ],
          }),
          new TableCell({
            children: [
              new Paragraph(
                data?.[0]?.[
                  'Total_Electricity_Consumption(GJ)'
                ]?.previousYear?.toString() || ' ',
              ),
            ],
          }),
        ],
      }),
      new TableRow({
        children: [
          new TableCell({
            children: [new Paragraph('Total fuel consumption (B)')],
          }),
          new TableCell({
            children: [
              new Paragraph(
                data?.[0]?.[
                  'Total_Fuel_Consumption(GJ)'
                ]?.currentYear?.toString() || ' ',
              ),
            ],
          }),
          new TableCell({
            children: [
              new Paragraph(
                data?.[0]?.[
                  'Total_Fuel_Consumption(GJ)'
                ]?.previousYear?.toString() || ' ',
              ),
            ],
          }),
        ],
      }),
      new TableRow({
        children: [
          new TableCell({
            children: [
              new Paragraph('Energy consumption through other sources (C)'),
            ],
          }),
          new TableCell({
            children: [
              new Paragraph(
                data?.[0]?.[
                  'Energy_Consumption_through_Other_sources(GJ)'
                ]?.currentYear?.toString() || ' ',
              ),
            ],
          }),
          new TableCell({
            children: [
              new Paragraph(
                data?.[0]?.[
                  'Energy_Consumption_through_Other_sources(GJ)'
                ]?.previousYear?.toString() || ' ',
              ),
            ],
          }),
        ],
      }),
      new TableRow({
        children: [
          new TableCell({
            children: [
              new Paragraph(
                'Total energy consumed from renewable sources (A+B+C)',
              ),
            ],
          }),
          new TableCell({
            children: [new Paragraph('')],
          }),
          new TableCell({
            children: [new Paragraph('')],
          }),
        ],
      }),

      new TableRow({
        children: [
          new TableCell({
            children: [new Paragraph('From non-renewable sources')],
          }),
          new TableCell({
            children: [new Paragraph('')],
          }),
          new TableCell({
            children: [new Paragraph('')],
          }),
        ],
      }),
      new TableRow({
        children: [
          new TableCell({
            children: [new Paragraph('Total electricity consumption (D)')],
          }),
          new TableCell({
            children: [new Paragraph('')],
          }),
          new TableCell({
            children: [new Paragraph('')],
          }),
        ],
      }),
      new TableRow({
        children: [
          new TableCell({
            children: [new Paragraph('Total fuel consumption (E)')],
          }),
          new TableCell({
            children: [new Paragraph('')],
          }),
          new TableCell({
            children: [new Paragraph('')],
          }),
        ],
      }),
      new TableRow({
        children: [
          new TableCell({
            children: [
              new Paragraph('Energy consumption through other sources (F)'),
            ],
          }),
          new TableCell({
            children: [new Paragraph('')],
          }),
          new TableCell({
            children: [new Paragraph('')],
          }),
        ],
      }),
      new TableRow({
        children: [
          new TableCell({
            children: [
              new Paragraph(
                'Total energy consumed from non-renewable sources (D+E+F)',
              ),
            ],
          }),
          new TableCell({
            children: [new Paragraph('')],
          }),
          new TableCell({
            children: [new Paragraph('')],
          }),
        ],
      }),

      new TableRow({
        children: [
          new TableCell({
            children: [new Paragraph('Total energy consumed (A+B+C+D+E+F)')],
          }),
          new TableCell({
            children: [new Paragraph('')],
          }),
          new TableCell({
            children: [new Paragraph('')],
          }),
        ],
      }),

      new TableRow({
        children: [
          new TableCell({
            children: [
              new Paragraph(
                'Energy intensity per rupee of turnover (Total energy consumed / Revenue from operations)',
              ),
            ],
          }),
          new TableCell({
            children: [new Paragraph('')],
          }),
          new TableCell({
            children: [new Paragraph('')],
          }),
        ],
      }),
      new TableRow({
        children: [
          new TableCell({
            children: [
              new Paragraph(
                'Energy intensity per rupee of turnover adjusted for Purchasing Power Parity (PPP) (Total energy consumed / Revenue from operations adjusted for PPP)',
              ),
            ],
          }),
          new TableCell({
            children: [new Paragraph('')],
          }),
          new TableCell({
            children: [new Paragraph('')],
          }),
        ],
      }),
      new TableRow({
        children: [
          new TableCell({
            children: [
              new Paragraph('Energy intensity in terms of physical output'),
            ],
          }),
          new TableCell({
            children: [new Paragraph('')],
          }),
          new TableCell({
            children: [new Paragraph('')],
          }),
        ],
      }),
      new TableRow({
        children: [
          new TableCell({
            children: [
              new Paragraph(
                'Energy intensity (optional) – the relevant metric may be selected by the entity',
              ),
            ],
          }),
          new TableCell({
            children: [new Paragraph('')],
          }),
          new TableCell({
            children: [new Paragraph('')],
          }),
        ],
      }),
    ],
  });
};

const noteEnergyConsumption = () => new Paragraph({
  text: 'Note: Indicate if any independent assessment/ evaluation/assurance has been carried out by an  external agency? (Y/N) If yes, name of the external agency  ',
  spacing: { before: 200, after: 200 },
});

const questionPATScheme = () => new Paragraph({
  text: '2. Does the entity have any sites / facilities identified as designated consumers (DCs) under the Performance, Achieve and Trade (PAT) Scheme of the Government of India? (Y/N) If yes, disclose whether targets set under the PAT scheme have been achieved. In case targets have not been achieved, provide the remedial action taken, if any.',
  spacing: { after: 200 },
});

const questionWaterDisclosures = () => new Paragraph({
  text: '3. Provide details of the following disclosures related to water, in the following format:',
  spacing: { after: 200 },
});

const tableWaterDisclosures = () => new Table({
  width: {
    size: 100,
    type: WidthType.PERCENTAGE,
  },
  rows: [
    new TableRow({
      children: [
        new TableCell({
          children: [new Paragraph('Parameter')],
        }),
        new TableCell({
          children: [new Paragraph('FY _____ (Current Financial Year)')],
        }),
        new TableCell({
          children: [new Paragraph('FY ______ (Previous Financial Year)')],
        }),
      ],
    }),

    new TableRow({
      children: [
        new TableCell({
          children: [
            new Paragraph('Water withdrawal by source (in kilolitres)'),
          ],
        }),
        new TableCell({
          children: [new Paragraph('')],
        }),
        new TableCell({
          children: [new Paragraph('')],
        }),
      ],
    }),
    new TableRow({
      children: [
        new TableCell({
          children: [new Paragraph('(i) Surface water')],
        }),
        new TableCell({
          children: [new Paragraph('')],
        }),
        new TableCell({
          children: [new Paragraph('')],
        }),
      ],
    }),
    new TableRow({
      children: [
        new TableCell({
          children: [new Paragraph('(ii) Groundwater')],
        }),
        new TableCell({
          children: [new Paragraph('')],
        }),
        new TableCell({
          children: [new Paragraph('')],
        }),
      ],
    }),
    new TableRow({
      children: [
        new TableCell({
          children: [new Paragraph('(iii) Third party water')],
        }),
        new TableCell({
          children: [new Paragraph('')],
        }),
        new TableCell({
          children: [new Paragraph('')],
        }),
      ],
    }),
    new TableRow({
      children: [
        new TableCell({
          children: [new Paragraph('(iv) Seawater / desalinated water')],
        }),
        new TableCell({
          children: [new Paragraph('')],
        }),
        new TableCell({
          children: [new Paragraph('')],
        }),
      ],
    }),
    new TableRow({
      children: [
        new TableCell({
          children: [new Paragraph('(v) Others')],
        }),
        new TableCell({
          children: [new Paragraph('')],
        }),
        new TableCell({
          children: [new Paragraph('')],
        }),
      ],
    }),
    new TableRow({
      children: [
        new TableCell({
          children: [
            new Paragraph(
              'Total volume of water withdrawal (in kilolitres) (i + ii + iii + iv + v)',
            ),
          ],
        }),
        new TableCell({
          children: [new Paragraph('')],
        }),
        new TableCell({
          children: [new Paragraph('')],
        }),
      ],
    }),
    new TableRow({
      children: [
        new TableCell({
          children: [
            new Paragraph(
              'Total volume of water consumption (in kilolitres)',
            ),
          ],
        }),
        new TableCell({
          children: [new Paragraph('')],
        }),
        new TableCell({
          children: [new Paragraph('')],
        }),
      ],
    }),

    new TableRow({
      children: [
        new TableCell({
          children: [
            new Paragraph(
              'Water intensity per rupee of turnover (Total water consumption / Revenue from operations)',
            ),
          ],
        }),
        new TableCell({
          children: [new Paragraph('')],
        }),
        new TableCell({
          children: [new Paragraph('')],
        }),
      ],
    }),
    new TableRow({
      children: [
        new TableCell({
          children: [
            new Paragraph(
              'Water intensity per rupee of turnover adjusted for Purchasing Power Parity (PPP) (Total water consumption / Revenue from operations adjusted for PPP)',
            ),
          ],
        }),
        new TableCell({
          children: [new Paragraph('')],
        }),
        new TableCell({
          children: [new Paragraph('')],
        }),
      ],
    }),
    new TableRow({
      children: [
        new TableCell({
          children: [
            new Paragraph('Water intensity in terms of physical output'),
          ],
        }),
        new TableCell({
          children: [new Paragraph('')],
        }),
        new TableCell({
          children: [new Paragraph('')],
        }),
      ],
    }),
    new TableRow({
      children: [
        new TableCell({
          children: [
            new Paragraph(
              'Water intensity (optional) – the relevant metric may be selected by the entity',
            ),
          ],
        }),
        new TableCell({
          children: [new Paragraph('')],
        }),
        new TableCell({
          children: [new Paragraph('')],
        }),
      ],
    }),
  ],
});

const noteWaterDisclosures = () => new Paragraph({
  text: 'Note: Indicate if any independent assessment/ evaluation/assurance has been carried out by an external  agency? (Y/N) If yes, name of the external agency. ',
  spacing: { before: 200, after: 200 },
});

const questionWaterDischargeDetails = () => new Paragraph({
  text: '4. Provide the following details related to water discharged:',
  spacing: { after: 200 },
});

const tableWaterDischargeDetails = async (obj) => {
  // const res = await axios.get("http://localhost:5000/report-template/download?report_name=BRSR&financial_year=2024&financial_quarter=q4");
  const data = obj?.waterDischarge;
  return new Table({
    width: {
      size: 100,
      type: WidthType.PERCENTAGE,
    },
    rows: [
      new TableRow({
        children: [
          new TableCell({
            children: [new Paragraph('Parameter')],
          }),
          new TableCell({
            children: [new Paragraph('FY _____ (Current Financial Year)')],
          }),
          new TableCell({
            children: [new Paragraph('FY ______ (Previous Financial Year)')],
          }),
        ],
      }),

      new TableRow({
        children: [
          new TableCell({
            children: [
              new Paragraph(
                'Water discharge by destination and level of treatment (in kilolitres)',
              ),
            ],
            columnSpan: 3,
          }),
        ],
      }),
      new TableRow({
        children: [
          new TableCell({
            children: [new Paragraph('(i) To Surface water')],
          }),
          new TableCell({
            children: [
              new Paragraph(
                data?.currentYear?.Surface_Water?.SurfaceWater?.toString()
                  || ' ',
              ),
            ],
          }),
          new TableCell({
            children: [
              new Paragraph(
                data?.previousYear?.Surface_Water?.SurfaceWater?.toString()
                  || ' ',
              ),
            ],
          }),
        ],
      }),
      new TableRow({
        children: [
          new TableCell({
            children: [new Paragraph('- No treatment')],
          }),
          new TableCell({
            children: [
              new Paragraph(
                data?.currentYear?.Surface_Water?.NoTreatment?.toString() || ' ',
              ),
            ],
          }),
          new TableCell({
            children: [
              new Paragraph(
                data?.previousYear?.Surface_Water?.NoTreatment?.toString()
                  || ' ',
              ),
            ],
          }),
        ],
      }),
      new TableRow({
        children: [
          new TableCell({
            children: [
              new Paragraph(
                '- With treatment – please specify level of treatment',
              ),
            ],
          }),
          new TableCell({
            children: [
              new Paragraph(
                data?.currentYear?.Surface_Water?.WithTreatment?.toString()
                  || ' ',
              ),
            ],
          }),
          new TableCell({
            children: [
              new Paragraph(
                data?.previousYear?.Surface_Water?.WithTreatment?.toString()
                  || ' ',
              ),
            ],
          }),
        ],
      }),
      new TableRow({
        children: [
          new TableCell({
            children: [new Paragraph('(ii) To Groundwater')],
          }),
          new TableCell({
            children: [
              new Paragraph(
                data?.currentYear?.Ground_Water?.SurfaceWater?.toString() || ' ',
              ),
            ],
          }),
          new TableCell({
            children: [
              new Paragraph(
                data?.previousYear?.Ground_Water?.SurfaceWater?.toString()
                  || ' ',
              ),
            ],
          }),
        ],
      }),
      new TableRow({
        children: [
          new TableCell({
            children: [new Paragraph('- No treatment')],
          }),
          new TableCell({
            children: [
              new Paragraph(
                data?.currentYear?.Ground_Water?.NoTreatment?.toString() || ' ',
              ),
            ],
          }),
          new TableCell({
            children: [
              new Paragraph(
                data?.previousYear?.Ground_Water?.NoTreatment?.toString() || ' ',
              ),
            ],
          }),
        ],
      }),
      new TableRow({
        children: [
          new TableCell({
            children: [
              new Paragraph(
                '- With treatment – please specify level of treatment',
              ),
            ],
          }),
          new TableCell({
            children: [
              new Paragraph(
                data?.currentYear?.Ground_Water?.WithTreatment?.toString()
                  || ' ',
              ),
            ],
          }),
          new TableCell({
            children: [
              new Paragraph(
                data?.previousYear?.Ground_Water?.WithTreatment?.toString()
                  || ' ',
              ),
            ],
          }),
        ],
      }),
      new TableRow({
        children: [
          new TableCell({
            children: [new Paragraph('(iii) To Seawater')],
          }),
          new TableCell({
            children: [
              new Paragraph(
                data?.currentYear?.Sea_Water?.SurfaceWater?.toString() || ' ',
              ),
            ],
          }),
          new TableCell({
            children: [
              new Paragraph(
                data?.previousYear?.Sea_Water?.SurfaceWater?.toString() || ' ',
              ),
            ],
          }),
        ],
      }),
      new TableRow({
        children: [
          new TableCell({
            children: [new Paragraph('- No treatment')],
          }),
          new TableCell({
            children: [
              new Paragraph(
                data?.currentYear?.Sea_Water?.NoTreatment?.toString() || ' ',
              ),
            ],
          }),
          new TableCell({
            children: [
              new Paragraph(
                data?.previousYear?.Sea_Water?.NoTreatment?.toString() || ' ',
              ),
            ],
          }),
        ],
      }),
      new TableRow({
        children: [
          new TableCell({
            children: [
              new Paragraph(
                '- With treatment – please specify level of treatment',
              ),
            ],
          }),
          new TableCell({
            children: [
              new Paragraph(
                data?.currentYear?.Sea_Water?.WithTreatment?.toString() || ' ',
              ),
            ],
          }),
          new TableCell({
            children: [
              new Paragraph(
                data?.previousYear?.Sea_Water?.WithTreatment?.toString() || ' ',
              ),
            ],
          }),
        ],
      }),
      new TableRow({
        children: [
          new TableCell({
            children: [new Paragraph('(iv) Sent to third-parties')],
          }),
          new TableCell({
            children: [
              new Paragraph(
                data?.currentYear?.Third_Party_Treatment?.SurfaceWater?.toString()
                  || ' ',
              ),
            ],
          }),
          new TableCell({
            children: [
              new Paragraph(
                data?.previousYear?.Third_Party_Treatment?.SurfaceWater?.toString()
                  || ' ',
              ),
            ],
          }),
        ],
      }),
      new TableRow({
        children: [
          new TableCell({
            children: [new Paragraph('- No treatment')],
          }),
          new TableCell({
            children: [
              new Paragraph(
                data?.currentYear?.Third_Party_Treatment?.NoTreatment?.toString()
                  || ' ',
              ),
            ],
          }),
          new TableCell({
            children: [
              new Paragraph(
                data?.previousYear?.Third_Party_Treatment?.NoTreatment?.toString()
                  || ' ',
              ),
            ],
          }),
        ],
      }),
      new TableRow({
        children: [
          new TableCell({
            children: [
              new Paragraph(
                '- With treatment – please specify level of treatment',
              ),
            ],
          }),
          new TableCell({
            children: [
              new Paragraph(
                data?.currentYear?.Third_Party_Treatment?.WithTreatment?.toString()
                  || ' ',
              ),
            ],
          }),
          new TableCell({
            children: [
              new Paragraph(
                data?.previousYear?.Third_Party_Treatment?.WithTreatment?.toString()
                  || ' ',
              ),
            ],
          }),
        ],
      }),
      new TableRow({
        children: [
          new TableCell({
            children: [new Paragraph('(v) Others')],
          }),
          new TableCell({
            children: [
              new Paragraph(
                data?.currentYear?.Others?.SurfaceWater?.toString() || ' ',
              ),
            ],
          }),
          new TableCell({
            children: [
              new Paragraph(
                data?.previousYear?.Others?.SurfaceWater?.toString() || ' ',
              ),
            ],
          }),
        ],
      }),
      new TableRow({
        children: [
          new TableCell({
            children: [new Paragraph('- No treatment')],
          }),
          new TableCell({
            children: [
              new Paragraph(
                data?.currentYear?.Others?.NoTreatment?.toString() || ' ',
              ),
            ],
          }),
          new TableCell({
            children: [
              new Paragraph(
                data?.previousYear?.Others?.NoTreatment?.toString() || ' ',
              ),
            ],
          }),
        ],
      }),
      new TableRow({
        children: [
          new TableCell({
            children: [
              new Paragraph(
                '- With treatment – please specify level of treatment',
              ),
            ],
          }),
          new TableCell({
            children: [
              new Paragraph(
                data?.currentYear?.Others?.WithTreatment?.toString() || ' ',
              ),
            ],
          }),
          new TableCell({
            children: [
              new Paragraph(
                data?.previousYear?.Others?.WithTreatment?.toString() || ' ',
              ),
            ],
          }),
        ],
      }),
      new TableRow({
        children: [
          new TableCell({
            children: [new Paragraph('Total water discharged (in kilolitres)')],
          }),
          new TableCell({
            // children: [new Paragraph('',
            //   // data?.currentYear?.Total_Discharge?.WithTreatment?.toString() || " "
            // )],
            children: [new Paragraph('')],
          }),
          new TableCell({
            children: [new Paragraph('')],
          }),
        ],
      }),
    ],
  });
};

const questionZeroLiquidDischarge = () => new Paragraph({
  text: '5. Has the entity implemented a mechanism for Zero Liquid Discharge? If yes, provide details of its coverage and implementation.',
  spacing: { after: 200 },
});

const questionAirEmissions = () => new Paragraph({
  text: '6. Please provide details of air emissions (other than GHG emissions) by the entity, in the  following format:',
  spacing: { after: 200 },
});

const tableAirEmissions = async (obj) => {
  // const res = await axios.get("http://localhost:5000/report-template/download?report_name=BRSR&financial_year=2024&financial_quarter=q4");
  const data = obj?.nonGHGEmission;
  return new Table({
    width: {
      size: 100,
      type: WidthType.PERCENTAGE,
    },
    rows: [
      new TableRow({
        children: [
          new TableCell({
            children: [new Paragraph('Parameter')],
          }),
          new TableCell({
            children: [new Paragraph('Please specify unit')],
          }),
          new TableCell({
            children: [new Paragraph('FY _____ (Current Financial Year)')],
          }),
          new TableCell({
            children: [new Paragraph('FY ______ (Previous Financial Year)')],
          }),
        ],
      }),

      new TableRow({
        children: [
          new TableCell({
            children: [new Paragraph('NOx')],
          }),
          new TableCell({
            children: [new Paragraph('')],
          }),
          new TableCell({
            children: [new Paragraph(data?.currentYear?.OtherthanGHGEmission?.Nox?.toString() || ' ')],
          }),
          new TableCell({
            children: [
              new Paragraph(
                data?.previousYear?.OtherthanGHGEmission?.Nox?.toString() || ' ',
              ),
            ],
          }),
        ],
      }),
      new TableRow({
        children: [
          new TableCell({
            children: [new Paragraph('SOx')],
          }),
          new TableCell({
            children: [new Paragraph('')],
          }),
          new TableCell({
            children: [new Paragraph(data?.currentYear?.OtherthanGHGEmission?.Sox?.toString() || ' ')],
          }),
          new TableCell({
            children: [
              new Paragraph(
                data?.previousYear?.OtherthanGHGEmission?.Sox?.toString() || ' ',
              ),
            ],
          }),
        ],
      }),
      new TableRow({
        children: [
          new TableCell({
            children: [new Paragraph('Particulate matter (PM)')],
          }),
          new TableCell({
            children: [new Paragraph('')],
          }),
          new TableCell({
            children: [new Paragraph(data?.currentYear?.OtherthanGHGEmission?.[
              'ParticulateMatter(PM)'
            ]?.toString() || ' ')],
          }),
          new TableCell({
            children: [
              new Paragraph(
                data?.previousYear?.OtherthanGHGEmission?.[
                  'ParticulateMatter(PM)'
                ]?.toString() || ' ',
              ),
            ],
          }),
        ],
      }),
      new TableRow({
        children: [
          new TableCell({
            children: [new Paragraph('Persistent organic pollutants (POP)')],
          }),
          new TableCell({
            children: [new Paragraph('')],
          }),
          new TableCell({
            children: [new Paragraph(data?.currentYear?.OtherthanGHGEmission?.[
              'PersistentOrganicPollutants(POP)'
            ]?.toString() || ' ')],
          }),
          new TableCell({
            children: [
              new Paragraph(
                data?.previousYear?.OtherthanGHGEmission?.[
                  'PersistentOrganicPollutants(POP)'
                ]?.toString() || ' ',
              ),
            ],
          }),
        ],
      }),
      new TableRow({
        children: [
          new TableCell({
            children: [new Paragraph('Volatile organic compounds (VOC)')],
          }),
          new TableCell({
            children: [new Paragraph('')],
          }),
          new TableCell({
            children: [new Paragraph(data?.currentYear?.OtherthanGHGEmission?.[
              'VolatileOrganicCompaounds(VOC)'
            ]?.toString() || ' ')],
          }),
          new TableCell({
            children: [
              new Paragraph(
                data?.previousYear?.OtherthanGHGEmission?.[
                  'VolatileOrganicCompaounds(VOC)'
                ]?.toString() || ' ',
              ),
            ],
          }),
        ],
      }),
      new TableRow({
        children: [
          new TableCell({
            children: [new Paragraph('Hazardous air pollutants (HAP)')],
          }),
          new TableCell({
            children: [new Paragraph('')],
          }),
          new TableCell({
            children: [new Paragraph(data?.currentYear?.OtherthanGHGEmission?.[
              'HazardousAirPollutants(HAP)'
            ]?.toString() || ' ')],
          }),
          new TableCell({
            children: [
              new Paragraph(
                data?.previousYear?.OtherthanGHGEmission?.[
                  'HazardousAirPollutants(HAP)'
                ]?.toString() || ' ',
              ),
            ],
          }),
        ],
      }),
      new TableRow({
        children: [
          new TableCell({
            children: [new Paragraph('Others – please specify')],
          }),
          new TableCell({
            children: [new Paragraph('')],
          }),
          new TableCell({
            children: [new Paragraph(data?.currentYear?.OtherthanGHGEmission?.Others?.toString() || ' ')],
          }),
          new TableCell({
            children: [
              new Paragraph(
                data?.previousYear?.OtherthanGHGEmission?.Others?.toString()
                  || ' ',
              ),
            ],
          }),
        ],
      }),
    ],
  });
};

const noteAirEmissions = () => new Paragraph({
  text: 'Note: Indicate if any independent assessment/ evaluation/assurance has been carried out by an external  agency? (Y/N) If yes, name of the external agency. ',
  spacing: { before: 200, after: 200 },
});

const questionGHGEmissions = () => new Paragraph({
  text: '7. Provide details of greenhouse gas emissions (Scope 1 and Scope 2 emissions) & its  intensity, in the following format: ',
  spacing: { before: 200, after: 200 },
});

const tableGHGEmissions = () => new Table({
  width: {
    size: 100,
    type: WidthType.PERCENTAGE,
  },
  rows: [
    new TableRow({
      children: [
        new TableCell({
          children: [new Paragraph('Parameter')],
        }),
        new TableCell({
          children: [new Paragraph('Unit')],
        }),
        new TableCell({
          children: [new Paragraph('FY _____ (Current Financial Year)')],
        }),
        new TableCell({
          children: [new Paragraph('FY ______ (Previous Financial Year)')],
        }),
      ],
    }),

    new TableRow({
      children: [
        new TableCell({
          children: [
            new Paragraph(
              'Total Scope 1 emissions (Break-up of the GHG into CO2, CH4, N2O, HFCs, PFCs, SF6, NF3, if available)',
            ),
          ],
        }),
        new TableCell({
          children: [new Paragraph('Metric tonnes of CO2 equivalent')],
        }),
        new TableCell({
          children: [new Paragraph('')],
        }),
        new TableCell({
          children: [new Paragraph('')],
        }),
      ],
    }),
    new TableRow({
      children: [
        new TableCell({
          children: [
            new Paragraph(
              'Total Scope 2 emissions (Break-up of the GHG into CO2, CH4, N2O, HFCs, PFCs, SF6, NF3, if available)',
            ),
          ],
        }),
        new TableCell({
          children: [new Paragraph('Metric tonnes of CO2 equivalent')],
        }),
        new TableCell({
          children: [new Paragraph('')],
        }),
        new TableCell({
          children: [new Paragraph('')],
        }),
      ],
    }),
    new TableRow({
      children: [
        new TableCell({
          children: [
            new Paragraph(
              'Total Scope 1 and Scope 2 emission intensity per rupee of turnover (Total Scope 1 and Scope 2 GHG emissions / Revenue from operations)',
            ),
          ],
        }),
        new TableCell({
          children: [new Paragraph('')],
        }),
        new TableCell({
          children: [new Paragraph('')],
        }),
        new TableCell({
          children: [new Paragraph('')],
        }),
      ],
    }),
    new TableRow({
      children: [
        new TableCell({
          children: [
            new Paragraph(
              'Total Scope 1 and Scope 2 emission intensity per rupee of turnover adjusted for Purchasing Power Parity (PPP) (Total Scope 1 and Scope 2 GHG emissions / Revenue from operations adjusted for PPP)',
            ),
          ],
        }),
        new TableCell({
          children: [new Paragraph('')],
        }),
        new TableCell({
          children: [new Paragraph('')],
        }),
        new TableCell({
          children: [new Paragraph('')],
        }),
      ],
    }),
    new TableRow({
      children: [
        new TableCell({
          children: [
            new Paragraph(
              'Total Scope 1 and Scope 2 emission intensity in terms of physical output',
            ),
          ],
        }),
        new TableCell({
          children: [new Paragraph('')],
        }),
        new TableCell({
          children: [new Paragraph('')],
        }),
        new TableCell({
          children: [new Paragraph('')],
        }),
      ],
    }),
    new TableRow({
      children: [
        new TableCell({
          children: [
            new Paragraph(
              'Total Scope 1 and Scope 2 emission intensity (optional) – the relevant metric may be selected by the entity',
            ),
          ],
        }),
        new TableCell({
          children: [new Paragraph('')],
        }),
        new TableCell({
          children: [new Paragraph('')],
        }),
        new TableCell({
          children: [new Paragraph('')],
        }),
      ],
    }),
  ],
});

const noteGHGEmissions = () => new Paragraph({
  text: 'Note: Indicate if any independent assessment/ evaluation/assurance has been carried out by an external  agency? (Y/N) If yes, name of the external agency. ',
  spacing: { before: 200, after: 200 },
});

const questionGHGProject = () => new Paragraph({
  text: '8. Does the entity have any project related to reducing Green House Gas emission? If Yes, then provide details.',
  spacing: { after: 200 },
});

const questionWasteManagement = () => new Paragraph({
  text: '9. Provide details related to waste management by the entity, in the following format:',
  spacing: { after: 200 },
});

const tableWasteManagement = async (obj) => {
  // const res = await axios.get("http://localhost:5000/report-template/download?report_name=BRSR&financial_year=2024&financial_quarter=q4");
  const data = obj?.['Waste Generation'];
  return new Table({
    width: {
      size: 100,
      type: WidthType.PERCENTAGE,
    },
    rows: [
      new TableRow({
        children: [
          new TableCell({
            children: [new Paragraph('Parameter')],
          }),
          new TableCell({
            children: [new Paragraph('FY _____ (Current Financial Year)')],
          }),
          new TableCell({
            children: [new Paragraph('FY ______ (Previous Financial Year)')],
          }),
        ],
      }),

      new TableRow({
        children: [
          new TableCell({
            children: [
              new Paragraph('Total Waste generated (in metric tonnes)'),
            ],
            columnSpan: 3,
          }),
        ],
      }),
      new TableRow({
        children: [
          new TableCell({
            children: [new Paragraph('Plastic waste (A)')],
          }),
          new TableCell({
            children: [
              new Paragraph(
                data?.[
                  'Plastics (Including Packaging)(MT)'
                ]?.currentYearValue?.toString() || ' ',
              ),
            ],
          }),
          new TableCell({
            children: [
              new Paragraph(
                data?.[
                  'Plastics (Including Packaging)(MT)'
                ]?.previousYearValue?.toString() || ' ',
              ),
            ],
          }),
        ],
      }),
      new TableRow({
        children: [
          new TableCell({
            children: [new Paragraph('E-waste (B)')],
          }),
          new TableCell({
            children: [
              new Paragraph(
                data?.['E-Waste(MT)']?.currentYearValue?.toString() || ' ',
              ),
            ],
          }),
          new TableCell({
            children: [
              new Paragraph(
                data?.['E-Waste(MT)']?.previousYearValue?.toString() || ' ',
              ),
            ],
          }),
        ],
      }),
      new TableRow({
        children: [
          new TableCell({
            children: [new Paragraph('Bio-medical waste (C)')],
          }),
          new TableCell({
            children: [
              new Paragraph(
                data?.['Bio-Medical Waste(MT)']?.currentYearValue?.toString()
                  || ' ',
              ),
            ],
          }),
          new TableCell({
            children: [
              new Paragraph(
                data?.[
                  'Bio-Medical Waste(MT)'
                ]?.previousYearValue?.toString() || ' ',
              ),
            ],
          }),
        ],
      }),
      new TableRow({
        children: [
          new TableCell({
            children: [new Paragraph('Construction and demolition waste (D)')],
          }),
          new TableCell({
            children: [
              new Paragraph(
                data?.[
                  'Construction & Demolition waste(MT)'
                ]?.currentYearValue?.toString() || ' ',
              ),
            ],
          }),
          new TableCell({
            children: [
              new Paragraph(
                data?.[
                  'Construction & Demolition waste(MT)'
                ]?.previousYearValue?.toString() || ' ',
              ),
            ],
          }),
        ],
      }),
      new TableRow({
        children: [
          new TableCell({
            children: [new Paragraph('Battery waste (E)')],
          }),
          new TableCell({
            children: [
              new Paragraph(
                data?.['Battery Waste(MT)']?.currentYearValue?.toString() || ' ',
              ),
            ],
          }),
          new TableCell({
            children: [
              new Paragraph(
                data?.['Battery Waste(MT)']?.previousYearValue?.toString()
                  || ' ',
              ),
            ],
          }),
        ],
      }),
      new TableRow({
        children: [
          new TableCell({
            children: [new Paragraph('Radioactive waste (F)')],
          }),
          new TableCell({
            children: [
              new Paragraph(
                data?.['Radioactive waste(MT)']?.currentYearValue?.toString()
                  || ' ',
              ),
            ],
          }),
          new TableCell({
            children: [
              new Paragraph(
                data?.[
                  'Radioactive waste(MT)'
                ]?.previousYearValue?.toString() || ' ',
              ),
            ],
          }),
        ],
      }),
      new TableRow({
        children: [
          new TableCell({
            children: [
              new Paragraph(
                'Other Hazardous waste. Please specify, if any. (G)',
              ),
            ],
          }),
          new TableCell({
            children: [
              new Paragraph(
                data?.['Hazardous waste(MT)']?.currentYearValue?.toString()
                  || ' ',
              ),
            ],
          }),
          new TableCell({
            children: [
              new Paragraph(
                data?.[
                  'Non Hazardous waste(MT)'
                ]?.previousYearValue?.toString() || ' ',
              ),
            ],
          }),
        ],
      }),
      new TableRow({
        children: [
          new TableCell({
            children: [
              new Paragraph(
                'Other Non-hazardous waste generated (H). Please specify, if any. (Break-up by composition i.e. by materials relevant to the sector)',
              ),
            ],
          }),
          new TableCell({
            children: [
              new Paragraph(
                data?.[
                  'Any other Non Hazardous waste(MT)'
                ]?.currentYearValue?.toString() || ' ',
              ),
            ],
          }),
          new TableCell({
            children: [
              new Paragraph(
                data?.[
                  'Any other Non Hazardous waste(MT)'
                ]?.previousYearValue?.toString() || ' ',
              ),
            ],
          }),
        ],
      }),
      new TableRow({
        children: [
          new TableCell({
            children: [new Paragraph('Total (A+B + C + D + E + F + G + H)')],
          }),
          new TableCell({
            children: [
              new Paragraph(
                data?.totalValues?.totalCurrentYear?.toString() || ' ',
              ),
            ],
          }),
          new TableCell({
            children: [
              new Paragraph(
                data?.totalValues?.totalPreviousYear?.toString() || ' ',
              ),
            ],
          }),
        ],
      }),

      new TableRow({
        children: [
          new TableCell({
            children: [
              new Paragraph(
                'Waste intensity per rupee of turnover (Total waste generated / Revenue from operations)',
              ),
            ],
          }),
          new TableCell({
            children: [new Paragraph('')],
          }),
          new TableCell({
            children: [new Paragraph('')],
          }),
        ],
      }),
      new TableRow({
        children: [
          new TableCell({
            children: [
              new Paragraph(
                'Waste intensity per rupee of turnover adjusted for Purchasing Power Parity (PPP) (Total waste generated / Revenue from operations adjusted for PPP)',
              ),
            ],
          }),
          new TableCell({
            children: [new Paragraph('')],
          }),
          new TableCell({
            children: [new Paragraph('')],
          }),
        ],
      }),
      new TableRow({
        children: [
          new TableCell({
            children: [
              new Paragraph('Waste intensity in terms of physical output'),
            ],
          }),
          new TableCell({
            children: [new Paragraph('')],
          }),
          new TableCell({
            children: [new Paragraph('')],
          }),
        ],
      }),
      new TableRow({
        children: [
          new TableCell({
            children: [
              new Paragraph(
                'Waste intensity (optional) – the relevant metric may be selected by the entity',
              ),
            ],
          }),
          new TableCell({
            children: [new Paragraph('')],
          }),
          new TableCell({
            children: [new Paragraph('')],
          }),
        ],
      }),

      new TableRow({
        children: [
          new TableCell({
            children: [
              new Paragraph(
                'For each category of waste generated, total waste recovered through recycling, re-using or other recovery operations (in metric tonnes)',
              ),
            ],
            columnSpan: 3,
          }),
        ],
      }),
      new TableRow({
        children: [
          new TableCell({
            children: [new Paragraph('Category of waste')],
          }),
          new TableCell({
            children: [new Paragraph('')],
          }),
          new TableCell({
            children: [new Paragraph('')],
          }),
        ],
      }),
      new TableRow({
        children: [
          new TableCell({
            children: [new Paragraph('(i) Recycled')],
          }),
          new TableCell({
            children: [new Paragraph('')],
          }),
          new TableCell({
            children: [new Paragraph('')],
          }),
        ],
      }),
      new TableRow({
        children: [
          new TableCell({
            children: [new Paragraph('(ii) Re-used')],
          }),
          new TableCell({
            children: [new Paragraph('')],
          }),
          new TableCell({
            children: [new Paragraph('')],
          }),
        ],
      }),
      new TableRow({
        children: [
          new TableCell({
            children: [new Paragraph('(iii) Other recovery operations')],
          }),
          new TableCell({
            children: [new Paragraph('')],
          }),
          new TableCell({
            children: [new Paragraph('')],
          }),
        ],
      }),
      new TableRow({
        children: [
          new TableCell({
            children: [new Paragraph('Total')],
          }),
          new TableCell({
            children: [new Paragraph('')],
          }),
          new TableCell({
            children: [new Paragraph('')],
          }),
        ],
      }),

      new TableRow({
        children: [
          new TableCell({
            children: [
              new Paragraph(
                'For each category of waste generated, total waste disposed by nature of disposal method (in metric tonnes)',
              ),
            ],
            columnSpan: 3,
          }),
        ],
      }),
      new TableRow({
        children: [
          new TableCell({
            children: [new Paragraph('Category of waste')],
          }),
          new TableCell({
            children: [new Paragraph('')],
          }),
          new TableCell({
            children: [new Paragraph('')],
          }),
        ],
      }),
      new TableRow({
        children: [
          new TableCell({
            children: [new Paragraph('(i) Incineration')],
          }),
          new TableCell({
            children: [new Paragraph('')],
          }),
          new TableCell({
            children: [new Paragraph('')],
          }),
        ],
      }),
      new TableRow({
        children: [
          new TableCell({
            children: [new Paragraph('(ii) Landfilling')],
          }),
          new TableCell({
            children: [new Paragraph('')],
          }),
          new TableCell({
            children: [new Paragraph('')],
          }),
        ],
      }),
      new TableRow({
        children: [
          new TableCell({
            children: [new Paragraph('(iii) Other disposal operations')],
          }),
          new TableCell({
            children: [new Paragraph('')],
          }),
          new TableCell({
            children: [new Paragraph('')],
          }),
        ],
      }),
      new TableRow({
        children: [
          new TableCell({
            children: [new Paragraph('Total')],
          }),
          new TableCell({
            children: [new Paragraph('')],
          }),
          new TableCell({
            children: [new Paragraph('')],
          }),
        ],
      }),
    ],
  });
};

const noteWasteManagement = () => new Paragraph({
  text: 'Note: Indicate if any independent assessment/ evaluation/assurance has been carried out by an external  agency? (Y/N) If yes, name of the external agency. ',
  spacing: { before: 200, after: 200 },
});

const detailsWasteManagement = () => new Paragraph({
  text: '10. Briefly describe the waste management practices adopted in your establishments. Describe the strategy adopted by your company to reduce usage of hazardous and toxic chemicals in your products and processes and the practices adopted to manage such wastes.',
  spacing: { after: 200 },
});

const questionEcologicallySensitiveAreas = () => new Paragraph({
  text: '11. If the entity has operations/offices in/around ecologically sensitive areas (such as national parks, wildlife sanctuaries, biosphere reserves, wetlands, biodiversity hotspots, forests, coastal regulation zones etc.) where environmental approvals / clearances are required, please specify details in the following format:',
  spacing: { after: 200 },
});

const tableEcologicallySensitiveAreas = () => new Table({
  width: { size: 100, type: WidthType.PERCENTAGE },
  rows: [
    new TableRow({
      children: [
        new TableCell({
          children: [new Paragraph('S. No.')],
        }),
        new TableCell({
          children: [new Paragraph('Location of operations/offices')],
        }),
        new TableCell({
          children: [new Paragraph('Type of operations')],
        }),
        new TableCell({
          children: [
            new Paragraph(
              'Whether the conditions of environmental approval / clearance are being complied with? (Y/N) If no, the reasons thereof and corrective action taken, if any.',
            ),
          ],
        }),
      ],
    }),
  ],
});

const questionEnvironmentalImpactAssessments = () => new Paragraph({
  text: '12. Details of environmental impact assessments of projects undertaken by the entity based  on applicable laws, in the current financial year: ',
  spacing: { after: 200 },
});

const tableEnvironmentalImpactAssessments = () => new Table({
  width: { size: 100, type: WidthType.PERCENTAGE },
  rows: [
    new TableRow({
      children: [
        new TableCell({
          children: [new Paragraph('Name and brief details of project')],
        }),
        new TableCell({
          children: [new Paragraph('EIA Notification No.')],
        }),
        new TableCell({
          children: [new Paragraph('Date')],
        }),
        new TableCell({
          children: [
            new Paragraph(
              'Whether conducted by independent external agency (Yes / No)',
            ),
          ],
        }),
        new TableCell({
          children: [
            new Paragraph('Results communicated in public domain (Yes / No)'),
          ],
        }),
        new TableCell({
          children: [new Paragraph('Relevant Web link')],
        }),
      ],
    }),
  ],
});

const questionEnvironmentalNonCompliance = () => new Paragraph({
  text: '13. Is the entity compliant with the applicable environmental law/ regulations/ guidelines in India; such as the Water (Prevention and Control of Pollution) Act, Air (Prevention and Control of Pollution) Act, Environment protection act and rules thereunder (Y/N). If not, provide details of all such non-compliances, in the following format: ',
  spacing: { after: 200 },
});

const tableEnvironmentalNonCompliance = () => new Table({
  width: { size: 100, type: WidthType.PERCENTAGE },
  rows: [
    new TableRow({
      children: [
        new TableCell({
          children: [new Paragraph('S. No.')],
        }),
        new TableCell({
          children: [
            new Paragraph(
              'Specify the law / regulation / guidelines which was not complied with',
            ),
          ],
        }),
        new TableCell({
          children: [new Paragraph('Provide details of the non-compliance')],
        }),
        new TableCell({
          children: [
            new Paragraph(
              'Any fines / penalties / action taken by regulatory agencies such as pollution control boards or by courts',
            ),
          ],
        }),
        new TableCell({
          children: [new Paragraph('Corrective action taken, if any')],
        }),
      ],
    }),
  ],
});

const p6_leadership_indicators = () => new Paragraph({
  children: [
    new TextRun({
      text: 'Leadership Indicators ',
      bold: true,
      break: 2,
    }),
  ],
});

const questionWaterStress = () => new Paragraph({
  text: '1. Water withdrawal, consumption and discharge in areas of water stress (in kilolitres): For each facility / plant located in areas of water stress, provide the following information:  (i) Name of the area (ii) Nature of operations(iii) Water withdrawal, consumption and discharge in the following format: ',
  spacing: { after: 200 },
});

const tableWaterStress = async (obj) => {
  const waterStressData = obj?.operationsinWaterstressAreas;
  // const hi = waterStressData?.currentYear?.WaterWithdrawalbySource?.["Surface Water(KL)"]?.toString() || " - "
  //   console.log("waterstress", hi )

  return new Table({
    width: {
      size: 100,
      type: WidthType.PERCENTAGE,
    },
    rows: [
      new TableRow({
        children: [
          new TableCell({
            children: [new Paragraph('Parameter')],
          }),
          new TableCell({
            children: [new Paragraph('FY _____ (Current Financial Year)')],
          }),
          new TableCell({
            children: [new Paragraph('FY ______ (Previous Financial Year)')],
          }),
        ],
      }),

      new TableRow({
        children: [
          new TableCell({
            children: [
              new Paragraph('Water withdrawal by source (in kilolitres)'),
            ],
          }),
          new TableCell({
            children: [new Paragraph('')],
          }),
          new TableCell({
            children: [new Paragraph('')],
          }),
        ],
      }),
      new TableRow({
        children: [
          new TableCell({
            children: [new Paragraph('(i) Surface water')],
          }),
          new TableCell({
            children: [new Paragraph(waterStressData?.currentYear?.WaterWithdrawalbySource?.['Surface Water(KL)']?.toString() || ' - ')],
          }),
          new TableCell({
            children: [new Paragraph(waterStressData?.previousYear?.WaterWithdrawalbySource?.['Surface Water(KL)']?.toString() || ' - ')],
          }),
        ],
      }),
      new TableRow({
        children: [
          new TableCell({
            children: [new Paragraph('(ii) Groundwater')],
          }),
          new TableCell({
            children: [new Paragraph(waterStressData?.currentYear?.WaterWithdrawalbySource?.['Groundwater(KL)']?.toString() || ' - ')],
          }),
          new TableCell({
            children: [new Paragraph(waterStressData?.previousYear?.WaterWithdrawalbySource?.['Groundwater(KL)']?.toString() || ' - ')],
          }),
        ],
      }),
      new TableRow({
        children: [
          new TableCell({
            children: [new Paragraph('(iii) Third party water')],
          }),
          new TableCell({
            children: [new Paragraph(waterStressData?.currentYear?.WaterWithdrawalbySource?.['Third Party Water(KL)']?.toString() || ' - ')],
          }),
          new TableCell({
            children: [new Paragraph(waterStressData?.previousYear?.WaterWithdrawalbySource?.['Third Party Water(KL)']?.toString() || ' - ')],
          }),
        ],
      }),
      new TableRow({
        children: [
          new TableCell({
            children: [new Paragraph('(iv) Seawater / desalinated water')],
          }),
          new TableCell({
            children: [new Paragraph(waterStressData?.currentYear?.WaterWithdrawalbySource?.['Sea Water / Desalinated Water(KL)']?.toString() || ' - ')],
          }),
          new TableCell({
            children: [new Paragraph(waterStressData?.previousYear?.WaterWithdrawalbySource?.['Sea Water / Desalinated Water(KL)']?.toString() || ' - ')],
          }),
        ],
      }),
      new TableRow({
        children: [
          new TableCell({
            children: [new Paragraph('(v) Others')],
          }),
          new TableCell({
            children: [new Paragraph(waterStressData?.currentYear?.WaterWithdrawalbySource?.['Others(KL)']?.toString() || ' - ')],
          }),
          new TableCell({
            children: [new Paragraph(waterStressData?.previousYear?.WaterWithdrawalbySource?.['Others(KL)']?.toString() || ' - ')],
          }),
        ],
      }),
      new TableRow({
        children: [
          new TableCell({
            children: [
              new Paragraph('Total volume of water withdrawal (in kilolitres)'),
            ],
          }),
          new TableCell({
            children: [new Paragraph(waterStressData?.currentYear?.WaterWithdrawalbySource?.totalValue?.toString() || ' - ')],
          }),
          new TableCell({
            children: [new Paragraph(waterStressData?.previousYear?.WaterWithdrawalbySource?.totalValue?.toString() || ' - ')],
          }),
        ],
      }),
      new TableRow({
        children: [
          new TableCell({
            children: [
              new Paragraph(
                'Total volume of water consumption (in kilolitres)',
              ),
            ],
          }),
          new TableCell({
            children: [new Paragraph(waterStressData?.currentYear?.WaterWithdrawalbySource?.['Groundwater(KL)']?.toString() || ' - ')],
          }),
          new TableCell({
            children: [new Paragraph(waterStressData?.previousYear?.WaterWithdrawalbySource?.['Groundwater(KL)']?.toString() || ' - ')],
          }),
        ],
      }),

      new TableRow({
        children: [
          new TableCell({
            children: [
              new Paragraph(
                'Water intensity per rupee of turnover (Water consumed / turnover)',
              ),
            ],
          }),
          new TableCell({
            children: [new Paragraph(waterStressData?.currentYear?.WaterWithdrawalbySource?.['Groundwater(KL)']?.toString() || ' - ')],
          }),
          new TableCell({
            children: [new Paragraph(waterStressData?.previousYear?.WaterWithdrawalbySource?.['Groundwater(KL)']?.toString() || ' - ')],
          }),
        ],
      }),
      new TableRow({
        children: [
          new TableCell({
            children: [
              new Paragraph(
                'Water intensity (optional) – the relevant metric may be selected by the entity',
              ),
            ],
          }),
          new TableCell({
            children: [new Paragraph(waterStressData?.currentYear?.WaterWithdrawalbySource?.['Groundwater(KL)']?.toString() || ' - ')],
          }),
          new TableCell({
            children: [new Paragraph(waterStressData?.previousYear?.WaterWithdrawalbySource?.['Groundwater(KL)']?.toString() || ' - ')],
          }),
        ],
      }),

      new TableRow({
        children: [
          new TableCell({
            children: [
              new Paragraph(
                'Water discharge by destination and level of treatment (in kilolitres)',
              ),
            ],
          }),
          new TableCell({
            children: [new Paragraph(waterStressData?.currentYear?.WaterWithdrawalbySource?.['Groundwater(KL)']?.toString() || ' - ')],
          }),
          new TableCell({
            children: [new Paragraph(waterStressData?.previousYear?.WaterWithdrawalbySource?.['Groundwater(KL)']?.toString() || ' - ')],
          }),
        ],
      }),
      new TableRow({
        children: [
          new TableCell({
            children: [new Paragraph('(i) Into Surface water')],
          }),
          new TableCell({
            children: [new Paragraph(waterStressData?.currentYear?.WaterWithdrawalbySource?.['Groundwater(KL)']?.toString() || ' - ')],
          }),
          new TableCell({
            children: [new Paragraph(waterStressData?.previousYear?.WaterWithdrawalbySource?.['Groundwater(KL)']?.toString() || ' - ')],
          }),
        ],
      }),
      new TableRow({
        children: [
          new TableCell({
            children: [new Paragraph('- No treatment')],
          }),
          new TableCell({
            children: [new Paragraph(waterStressData?.currentYear?.WaterWithdrawalbySource?.['Groundwater(KL)']?.toString() || ' - ')],
          }),
          new TableCell({
            children: [new Paragraph(waterStressData?.previousYear?.WaterWithdrawalbySource?.['Groundwater(KL)']?.toString() || ' - ')],
          }),
        ],
      }),
      new TableRow({
        children: [
          new TableCell({
            children: [
              new Paragraph(
                '- With treatment – please specify level of treatment',
              ),
            ],
          }),
          new TableCell({
            children: [new Paragraph(waterStressData?.currentYear?.WaterWithdrawalbySource?.['Groundwater(KL)']?.toString() || ' - ')],
          }),
          new TableCell({
            children: [new Paragraph(waterStressData?.previousYear?.WaterWithdrawalbySource?.['Groundwater(KL)']?.toString() || ' - ')],
          }),
        ],
      }),
      new TableRow({
        children: [
          new TableCell({
            children: [new Paragraph('(ii) Into Groundwater')],
          }),
          new TableCell({
            children: [new Paragraph(waterStressData?.currentYear?.WaterWithdrawalbySource?.['Groundwater(KL)']?.toString() || ' - ')],
          }),
          new TableCell({
            children: [new Paragraph(waterStressData?.previousYear?.WaterWithdrawalbySource?.['Groundwater(KL)']?.toString() || ' - ')],
          }),
        ],
      }),
      new TableRow({
        children: [
          new TableCell({
            children: [new Paragraph('- No treatment')],
          }),
          new TableCell({
            children: [new Paragraph(waterStressData?.currentYear?.WaterWithdrawalbySource?.['Groundwater(KL)']?.toString() || ' - ')],
          }),
          new TableCell({
            children: [new Paragraph(waterStressData?.previousYear?.WaterWithdrawalbySource?.['Groundwater(KL)']?.toString() || ' - ')],
          }),
        ],
      }),
      new TableRow({
        children: [
          new TableCell({
            children: [
              new Paragraph(
                '- With treatment – please specify level of treatment',
              ),
            ],
          }),
          new TableCell({
            children: [new Paragraph(waterStressData?.currentYear?.WaterWithdrawalbySource?.['Groundwater(KL)']?.toString() || ' - ')],
          }),
          new TableCell({
            children: [new Paragraph(waterStressData?.previousYear?.WaterWithdrawalbySource?.['Groundwater(KL)']?.toString() || ' - ')],
          }),
        ],
      }),
      new TableRow({
        children: [
          new TableCell({
            children: [new Paragraph('(iii) Into Seawater')],
          }),
          new TableCell({
            children: [new Paragraph(waterStressData?.currentYear?.WaterWithdrawalbySource?.['Groundwater(KL)']?.toString() || ' - ')],
          }),
          new TableCell({
            children: [new Paragraph(waterStressData?.previousYear?.WaterWithdrawalbySource?.['Groundwater(KL)']?.toString() || ' - ')],
          }),
        ],
      }),
      new TableRow({
        children: [
          new TableCell({
            children: [new Paragraph('- No treatment')],
          }),
          new TableCell({
            children: [new Paragraph(waterStressData?.currentYear?.WaterWithdrawalbySource?.['Groundwater(KL)']?.toString() || ' - ')],
          }),
          new TableCell({
            children: [new Paragraph(waterStressData?.previousYear?.WaterWithdrawalbySource?.['Groundwater(KL)']?.toString() || ' - ')],
          }),
        ],
      }),
      new TableRow({
        children: [
          new TableCell({
            children: [
              new Paragraph(
                '- With treatment – please specify level of treatment',
              ),
            ],
          }),
          new TableCell({
            children: [new Paragraph(waterStressData?.currentYear?.WaterWithdrawalbySource?.['Groundwater(KL)']?.toString() || ' - ')],
          }),
          new TableCell({
            children: [new Paragraph(waterStressData?.previousYear?.WaterWithdrawalbySource?.['Groundwater(KL)']?.toString() || ' - ')],
          }),
        ],
      }),
      new TableRow({
        children: [
          new TableCell({
            children: [new Paragraph('(iv) Sent to third-parties')],
          }),
          new TableCell({
            children: [new Paragraph(waterStressData?.currentYear?.WaterWithdrawalbySource?.['Groundwater(KL)']?.toString() || ' - ')],
          }),
          new TableCell({
            children: [new Paragraph(waterStressData?.previousYear?.WaterWithdrawalbySource?.['Groundwater(KL)']?.toString() || ' - ')],
          }),
        ],
      }),
      new TableRow({
        children: [
          new TableCell({
            children: [new Paragraph('- No treatment')],
          }),
          new TableCell({
            children: [new Paragraph(waterStressData?.currentYear?.WaterWithdrawalbySource?.['Groundwater(KL)']?.toString() || ' - ')],
          }),
          new TableCell({
            children: [new Paragraph(waterStressData?.previousYear?.WaterWithdrawalbySource?.['Groundwater(KL)']?.toString() || ' - ')],
          }),
        ],
      }),
      new TableRow({
        children: [
          new TableCell({
            children: [
              new Paragraph(
                '- With treatment – please specify level of treatment',
              ),
            ],
          }),
          new TableCell({
            children: [new Paragraph(waterStressData?.currentYear?.WaterWithdrawalbySource?.['Groundwater(KL)']?.toString() || ' - ')],
          }),
          new TableCell({
            children: [new Paragraph(waterStressData?.previousYear?.WaterWithdrawalbySource?.['Groundwater(KL)']?.toString() || ' - ')],
          }),
        ],
      }),
      new TableRow({
        children: [
          new TableCell({
            children: [new Paragraph('(v) Others')],
          }),
          new TableCell({
            children: [new Paragraph(waterStressData?.currentYear?.WaterWithdrawalbySource?.['Groundwater(KL)']?.toString() || ' - ')],
          }),
          new TableCell({
            children: [new Paragraph(waterStressData?.previousYear?.WaterWithdrawalbySource?.['Groundwater(KL)']?.toString() || ' - ')],
          }),
        ],
      }),
      new TableRow({
        children: [
          new TableCell({
            children: [new Paragraph('- No treatment')],
          }),
          new TableCell({
            children: [new Paragraph(waterStressData?.currentYear?.WaterWithdrawalbySource?.['Groundwater(KL)']?.toString() || ' - ')],
          }),
          new TableCell({
            children: [new Paragraph(waterStressData?.previousYear?.WaterWithdrawalbySource?.['Groundwater(KL)']?.toString() || ' - ')],
          }),
        ],
      }),
      new TableRow({
        children: [
          new TableCell({
            children: [
              new Paragraph(
                '- With treatment – please specify level of treatment',
              ),
            ],
          }),
          new TableCell({
            children: [new Paragraph(waterStressData?.currentYear?.WaterWithdrawalbySource?.['Groundwater(KL)']?.toString() || ' - ')],
          }),
          new TableCell({
            children: [new Paragraph(waterStressData?.previousYear?.WaterWithdrawalbySource?.['Groundwater(KL)']?.toString() || ' - ')],
          }),
        ],
      }),
      new TableRow({
        children: [
          new TableCell({
            children: [new Paragraph('Total water discharged (in kilolitres)')],
          }),
          new TableCell({
            children: [new Paragraph(waterStressData?.currentYear?.WaterWithdrawalbySource?.['Groundwater(KL)']?.toString() || ' - ')],
          }),
          new TableCell({
            children: [new Paragraph(waterStressData?.previousYear?.WaterWithdrawalbySource?.['Groundwater(KL)']?.toString() || ' - ')],
          }),
        ],
      }),
    ],
  });
};

const noteWaterStress = () => new Paragraph({
  text: 'Note: Indicate if any independent assessment/ evaluation/assurance has been carried out by an external  agency? (Y/N) If yes, name of the external agency. ',
  spacing: { before: 200, after: 200 },
});

const questionScope3Emissions = () => new Paragraph({
  text: '2. Please provide details of total Scope 3 emissions & its intensity, in the following format:  ',
  spacing: { before: 200, after: 200 },
});

const tableScope3Emissions = () => new Table({
  width: { size: 100, type: WidthType.PERCENTAGE },
  rows: [
    new TableRow({
      children: [
        new TableCell({
          children: [new Paragraph('Parameter')],
        }),
        new TableCell({
          children: [new Paragraph('Unit')],
        }),
        new TableCell({
          children: [new Paragraph('FY _____ (Current Financial Year)')],
        }),
        new TableCell({
          children: [new Paragraph('FY ______ (Previous Financial Year)')],
        }),
      ],
    }),
    new TableRow({
      children: [
        new TableCell({
          children: [
            new Paragraph(
              'Total Scope 3 emissions (Break-up of the GHG into CO2, CH4, N2O, HFCs, PFCs, SF6, NF3, if available)',
            ),
          ],
        }),
        new TableCell({
          children: [new Paragraph('Metric tonnes of CO2 equivalent')],
        }),
        new TableCell({ children: [new Paragraph('')] }),
        new TableCell({ children: [new Paragraph('')] }),
      ],
    }),
    new TableRow({
      children: [
        new TableCell({
          children: [
            new Paragraph('Total Scope 3 emissions per rupee of turnover'),
          ],
        }),
        new TableCell({ children: [new Paragraph('')] }),
        new TableCell({ children: [new Paragraph('')] }),
        new TableCell({ children: [new Paragraph('')] }),
      ],
    }),
    new TableRow({
      children: [
        new TableCell({
          children: [
            new Paragraph(
              'Total Scope 3 emission intensity (optional) – the relevant metric may be selected by the entity',
            ),
          ],
        }),
        new TableCell({ children: [new Paragraph('')] }),
        new TableCell({ children: [new Paragraph('')] }),
        new TableCell({ children: [new Paragraph('')] }),
      ],
    }),
  ],
});

const noteScope3Emissions = () => new Paragraph({
  text: 'Note: Indicate if any independent assessment/ evaluation/assurance has been carried out by an external  agency? (Y/N) If yes, name of the external agency. ',
  spacing: { before: 200, after: 200 },
});

const questionImpactOnBiodiversity = () => new Paragraph({
  text: '3. With respect to the ecologically sensitive areas reported at Question 11 of Essential Indicators above, provide details of significant direct & indirect impact of the entity on biodiversity in such areas along-with prevention and remediation activities.',
  spacing: { before: 200, after: 200 },
});

const questionResourceEfficiencyInitiatives = () => new Paragraph({
  text: '4. If the entity has undertaken any specific initiatives or used innovative technology or solutions to improve resource efficiency, or reduce impact due to emissions / effluent discharge / waste generated, please provide details of the same as well as outcome of such initiatives, as per the following format:',
  spacing: { before: 200, after: 200 },
});

const tableResourceEfficiencyInitiatives = () => new Table({
  width: { size: 100, type: WidthType.PERCENTAGE },
  rows: [
    new TableRow({
      children: [
        new TableCell({
          children: [new Paragraph('Sr. No ')],
        }),
        new TableCell({
          children: [new Paragraph('Initiative undertaken')],
        }),
        new TableCell({
          children: [
            new Paragraph(
              'Details of the initiative (Web-link, if  any, may be provided along-with  summary)',
            ),
          ],
        }),
        new TableCell({
          children: [new Paragraph('Outcome of  the initiative ')],
        }),
      ],
    }),
    new TableRow({
      children: [
        new TableCell({
          children: [new Paragraph('')],
        }),
        new TableCell({
          children: [new Paragraph('')],
        }),
        new TableCell({ children: [new Paragraph('')] }),
        new TableCell({ children: [new Paragraph('')] }),
      ],
    }),
    new TableRow({
      children: [
        new TableCell({
          children: [new Paragraph('')],
        }),
        new TableCell({ children: [new Paragraph('')] }),
        new TableCell({ children: [new Paragraph('')] }),
        new TableCell({ children: [new Paragraph('')] }),
      ],
    }),
    new TableRow({
      children: [
        new TableCell({
          children: [new Paragraph('')],
        }),
        new TableCell({ children: [new Paragraph('')] }),
        new TableCell({ children: [new Paragraph('')] }),
        new TableCell({ children: [new Paragraph('')] }),
      ],
    }),
  ],
});

const questionBusinessContinuityPlan = () => new Paragraph({
  text: '5. Does the entity have a business continuity and disaster management plan? Give details in 100 words/ web link.',
  spacing: { before: 200, after: 200 },
});

const questionAdverseEnvironmentalImpact = () => new Paragraph({
  text: '6. Disclose any significant adverse impact to the environment, arising from the value chain of the entity. What mitigation or adaptation measures have been taken by the entity in this regard.',
  spacing: { before: 200, after: 200 },
});

const questionValueChainAssessment = () => new Paragraph({
  text: '7. Percentage of value chain partners (by value of business done with such partners) that were assessed for environmental impacts.',
  spacing: { before: 200, after: 200 },
});

module.exports = {
  principle_6,
  questionEnergyConsumption,
  tableEnergyConsumption,
  noteEnergyConsumption,
  questionPATScheme,
  questionWaterDisclosures,
  tableWaterDisclosures,
  noteWaterDisclosures,
  questionWaterDischargeDetails,
  tableWaterDischargeDetails,
  questionZeroLiquidDischarge,
  questionAirEmissions,
  tableAirEmissions,
  noteAirEmissions,
  questionGHGEmissions,
  tableGHGEmissions,
  noteGHGEmissions,
  questionGHGProject,
  questionWasteManagement,
  tableWasteManagement,
  noteWasteManagement,
  detailsWasteManagement,
  questionEcologicallySensitiveAreas,
  tableEcologicallySensitiveAreas,
  questionEnvironmentalImpactAssessments,
  tableEnvironmentalImpactAssessments,
  questionEnvironmentalNonCompliance,
  tableEnvironmentalNonCompliance,
  p6_leadership_indicators,
  questionWaterStress,
  tableWaterStress,
  noteWaterStress,
  questionScope3Emissions,
  tableScope3Emissions,
  noteScope3Emissions,
  questionImpactOnBiodiversity,
  questionResourceEfficiencyInitiatives,
  tableResourceEfficiencyInitiatives,
  questionBusinessContinuityPlan,
  questionAdverseEnvironmentalImpact,
  questionValueChainAssessment,
};
