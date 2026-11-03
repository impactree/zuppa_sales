/* eslint-disable camelcase */
/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable max-len */
const {
  TextRun,
  Paragraph,
  Table,
  TableCell,
  TableRow,
} = require('docx');
// const fs = require("fs");

const principle_3 = () => new Paragraph({
  children: [
    new TextRun({
      text: 'PRINCIPLE 3 Businesses should respect and promote the well-being  of all employees, including those in their value chains',
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

const questionEmployeeWellBeing = () => new Paragraph({
  text: '1. a. Details of measures for the well-being of employees:',
  spacing: { after: 200 },
});

const tableEmployeeWellBeing = async (obj) => {
  // const res = await axios.get("http://localhost:5000/report-template/download?report_name=BRSR&financial_year=2024&financial_quarter=q4");
  const healthInsurance = obj?.healthInsurance;
  //   console.log(healthInsurance);
  const accidentInsurance = obj?.accidentInsurance;
  const maternityBenefit = obj?.maternityBenefit;
  // const paternityBenefit = obj?.paternityBenefit;
  // const pfPayments = obj?.pFPayments?.pFpercentages;
  //   console.log(pfPayments);
  // const gratuityPayments = obj?.gratuityPayments?.gratuityPercentages;

  return new Table({
    columnWidths: [
      2505, 1000, 1000, 1000, 1000, 1000, 1000, 1000, 1000, 1000, 1000, 1000,
      1000,
    ],
    rows: [
      new TableRow({
        children: [
          new TableCell({
            children: [new Paragraph('% of employees covered by')],
            columnSpan: 12,
          }),
        ],
      }),
      new TableRow({
        children: [
          new TableCell({
            children: [new Paragraph('Category')],
            rowSpan: 2,
          }),
          new TableCell({
            children: [new Paragraph('Total (A)')],
            rowSpan: 2,
          }),
          new TableCell({
            children: [new Paragraph('Health insurance')],
            columnSpan: 2,
          }),
          new TableCell({
            children: [new Paragraph('Accident insurance')],
            columnSpan: 2,
          }),

          new TableCell({
            children: [new Paragraph('Maternity benefits')],
            columnSpan: 2,
          }),

          new TableCell({
            children: [new Paragraph('Paternity Benefits')],
            columnSpan: 2,
          }),

          new TableCell({
            children: [new Paragraph('Day Care facilities')],
            columnSpan: 2,
          }),
        ],
      }),

      new TableRow({
        children: [
          new TableCell({
            children: [new Paragraph('Number (B )')],
          }),
          new TableCell({
            children: [new Paragraph('% (B / A)')],
          }),
          new TableCell({
            children: [new Paragraph('Number (C )')],
          }),
          new TableCell({
            children: [new Paragraph('% (C / A)')],
          }),
          new TableCell({
            children: [new Paragraph('Number (D )')],
          }),
          new TableCell({
            children: [new Paragraph('% (D / A)')],
          }),
          new TableCell({
            children: [new Paragraph('Number (E )')],
          }),
          new TableCell({
            children: [new Paragraph('% (E / A)')],
          }),
          new TableCell({
            children: [new Paragraph('Number (F )')],
          }),
          new TableCell({
            children: [new Paragraph('% (F / A)')],
          }),
        ],
      }),
      new TableRow({
        children: [
          new TableCell({
            children: [new Paragraph('Permanent employees')],
            columnSpan: 12,
          }),
        ],
      }),
      new TableRow({
        children: [
          new TableCell({
            children: [new Paragraph('Male')],
          }),
          new TableCell({
            children: [
              new Paragraph(
                healthInsurance?.totalMalePermanentCount?.toString() || '',
              ),
            ],
          }),
          new TableCell({
            children: [
              new Paragraph(
                healthInsurance?.malePermanantInsuranceValue?.toString() || '',
              ),
            ],
          }),
          new TableCell({
            children: [
              new Paragraph(
                healthInsurance?.malePermanentEmployeesHealthInsurancePercentage?.toString()
                  || '',
              ),
            ],
          }),
          new TableCell({
            children: [
              new Paragraph(
                accidentInsurance?.malePermanantInsuranceValue?.toString() || '',
              ),
            ],
          }),
          new TableCell({
            children: [
              new Paragraph(
                accidentInsurance?.malePermanentEmployeesAccidentInsurancePercentage?.toString()
                  || '',
              ),
            ],
          }),
          new TableCell({
            children: [
              new Paragraph(
                maternityBenefit?.malePermanantInsuranceValue?.toString() || '',
              ),
            ],
          }),
          new TableCell({
            children: [
              new Paragraph(
                maternityBenefit?.malePermanentEmployeesMaternityBenefitPercentage?.toString()
                  || '',
              ),
            ],
          }),
          new TableCell({
            children: [
              new Paragraph(
                // paternityBenefit?.malePermanentEmployeesMaternityBenefitPercentage?.toString() ||
                '',
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
            children: [new Paragraph('Female')],
          }),
          new TableCell({
            children: [
              new Paragraph(
                healthInsurance?.totalFemalePermanentCount?.toString() || '',
              ),
            ],
          }),
          new TableCell({
            children: [
              new Paragraph(
                healthInsurance?.femalePermanantInsuranceValue?.toString() || '',
              ),
            ],
          }),
          new TableCell({
            children: [
              new Paragraph(
                healthInsurance?.femalePermanentEmployeesHealthInsurancePercentage?.toString()
                  || '',
              ),
            ],
          }),
          new TableCell({
            children: [
              new Paragraph(
                accidentInsurance?.femalePermanantInsuranceValue?.toString()
                  || '',
              ),
            ],
          }),
          new TableCell({
            children: [
              new Paragraph(
                accidentInsurance?.femalePermanentEmployeesAccidentInsurancePercentage?.toString()
                  || '',
              ),
            ],
          }),
          new TableCell({
            children: [
              new Paragraph(
                maternityBenefit?.femalePermanantInsuranceValue?.toString()
                  || '',
              ),
            ],
          }),
          new TableCell({
            children: [
              new Paragraph(
                maternityBenefit?.femalePermanentEmployeesMaternityBenefitPercentage?.toString()
                  || '',
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
            children: [
              new Paragraph(
                healthInsurance?.totalPermanentEmployees?.toString() || '',
              ),
            ],
          }),
          new TableCell({
            children: [
              new Paragraph(
                healthInsurance?.totalPermanentEmployeesHealthInsuranceCovered?.toString()
                  || '',
              ),
            ],
          }),
          new TableCell({
            children: [
              new Paragraph(
                healthInsurance?.totalPermanentEmployeesHealthInsurancePercentage?.toString()
                  || '',
              ),
            ],
          }),
          new TableCell({
            children: [
              new Paragraph(
                accidentInsurance?.totalPermanentEmployeesAccidentInsuranceCovered?.toString()
                  || '',
              ),
            ],
          }),
          new TableCell({
            children: [
              new Paragraph(
                accidentInsurance?.totalPermanentEmployeesAccidentInsurancePercentage?.toString()
                  || '',
              ),
            ],
          }),
          new TableCell({
            children: [
              new Paragraph(
                maternityBenefit?.totalPermanentEmployeesMaternityBenefitCovered?.toString()
                  || '',
              ),
            ],
          }),
          new TableCell({
            children: [
              new Paragraph(
                maternityBenefit?.totalPermanentEmployeesMaternityBenefitPercentage?.toString()
                  || '',
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
          new TableCell({
            children: [new Paragraph('')],
          }),
        ],
      }),
      new TableRow({
        children: [
          new TableCell({
            children: [new Paragraph('Other than Permanent employees')],
            columnSpan: 12,
          }),
        ],
      }),
      new TableRow({
        children: [
          new TableCell({
            children: [new Paragraph('Male')],
          }),
          new TableCell({
            children: [
              new Paragraph(
                healthInsurance?.totalMaleOtherthanPermanentEmployeesCount?.toString()
                  || '',
              ),
            ],
          }),
          new TableCell({
            children: [
              new Paragraph(
                healthInsurance?.maleOtherthanPermanantInsuranceValue?.toString()
                  || '',
              ),
            ],
          }),
          new TableCell({
            children: [
              new Paragraph(
                healthInsurance?.maleOtherthanPermanentEmployeesHealthInsurancePercentage?.toString()
                  || '',
              ),
            ],
          }),
          new TableCell({
            children: [
              new Paragraph(
                accidentInsurance?.maleOtherthanPermanantInsuranceValue?.toString()
                  || '',
              ),
            ],
          }),
          new TableCell({
            children: [
              new Paragraph(
                accidentInsurance?.maleOtherthanPermanentEmployeesAccidentInsurancePercentage?.toString()
                  || '',
              ),
            ],
          }),
          new TableCell({
            children: [
              new Paragraph(
                maternityBenefit?.maleOtherthanPermanantInsuranceValue?.toString()
                  || '',
              ),
            ],
          }),
          new TableCell({
            children: [
              new Paragraph(
                maternityBenefit?.maleOtherthanPermanentEmployeesMaternityBenefitPercentage?.toString()
                  || '',
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
          new TableCell({
            children: [new Paragraph('')],
          }),
        ],
      }),
      new TableRow({
        children: [
          new TableCell({
            children: [new Paragraph('Female')],
          }),
          new TableCell({
            children: [
              new Paragraph(
                healthInsurance?.totalFemaleOtherthanPermanentEmployeesCount?.toString()
                  || '',
              ),
            ],
          }),
          new TableCell({
            children: [
              new Paragraph(
                healthInsurance?.femaleOtherthanPermanantEmployeesInsuranceValue?.toString()
                  || '',
              ),
            ],
          }),
          new TableCell({
            children: [
              new Paragraph(
                healthInsurance?.femaleOtherthanPermanentEmployeesHealthInsurancePercentage?.toString()
                  || '',
              ),
            ],
          }),
          new TableCell({
            children: [
              new Paragraph(
                accidentInsurance?.femaleOtherthanPermanantEmployeesInsuranceValue?.toString()
                  || '',
              ),
            ],
          }),
          new TableCell({
            children: [
              new Paragraph(
                accidentInsurance?.femaleOtherthanPermanentEmployeesAccidenthInsurancePercentage?.toString()
                  || '',
              ),
            ],
          }),
          new TableCell({
            children: [
              new Paragraph(
                maternityBenefit?.femaleOtherthanPermanantEmployeesInsuranceValue?.toString()
                  || '',
              ),
            ],
          }),
          new TableCell({
            children: [
              new Paragraph(
                maternityBenefit?.femaleOtherthanPermanentEmployeesMaternityBenefitPercentage?.toString()
                  || '',
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
            children: [
              new Paragraph(
                healthInsurance?.totalOtherthanPermanentEmployees?.toString()
                  || '',
              ),
            ],
          }),
          new TableCell({
            children: [
              new Paragraph(
                healthInsurance?.totalOtherthanPermanentEmployeesHealthInsuranceCovered?.toString()
                  || '',
              ),
            ],
          }),
          new TableCell({
            children: [
              new Paragraph(
                healthInsurance?.totalOtherthanPermanentEmployeesHealthInsurancePercentage?.toString()
                  || '',
              ),
            ],
          }),
          new TableCell({
            children: [
              new Paragraph(
                accidentInsurance?.totalOtherthanPermanentEmployeesAccidentInsuranceCovered?.toString()
                  || '',
              ),
            ],
          }),
          new TableCell({
            children: [
              new Paragraph(
                accidentInsurance?.totalOtherthanPermanentEmployeesAccidentInsurancePercentage?.toString()
                  || '',
              ),
            ],
          }),
          new TableCell({
            children: [
              new Paragraph(
                maternityBenefit?.totalOtherthanPermanentEmployeesMaternityBenefitCovered?.toString()
                  || '',
              ),
            ],
          }),
          new TableCell({
            children: [
              new Paragraph(
                maternityBenefit?.totalOtherthanPermanentEmployeesMaternityBenefitPercentage?.toString()
                  || '',
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
          new TableCell({
            children: [new Paragraph('')],
          }),
        ],
      }),
    ],
  });
};

const questionWorkersWellBeing = () => new Paragraph({
  text: '  b. Details of measures for the well-being of workers:',
  spacing: { after: 200 },
});

const tableWorkersWellBeing = async (obj) => {
  // const res = await axios.get("http://localhost:5000/report-template/download?report_name=BRSR&financial_year=2024&financial_quarter=q4");
  const healthInsurance = obj?.healthInsurance;
  //   console.log(healthInsurance);
  const accidentInsurance = obj?.accidentInsurance;
  const maternityBenefit = obj?.maternityBenefit;

  return new Table({
    columnWidths: [
      2505, 1000, 1000, 1000, 1000, 1000, 1000, 1000, 1000, 1000, 1000, 1000,
      1000,
    ],
    rows: [
      new TableRow({
        children: [
          new TableCell({
            children: [new Paragraph('% of workers covered by')],
            columnSpan: 12,
          }),
        ],
      }),
      new TableRow({
        children: [
          new TableCell({
            children: [new Paragraph('Category')],
            rowSpan: 2,
          }),
          new TableCell({
            children: [new Paragraph('Total (A)')],
            rowSpan: 2,
          }),
          new TableCell({
            children: [new Paragraph('Health insurance')],
            columnSpan: 2,
          }),
          new TableCell({
            children: [new Paragraph('Accident insurance')],
            columnSpan: 2,
          }),

          new TableCell({
            children: [new Paragraph('Maternity benefits')],
            columnSpan: 2,
          }),

          new TableCell({
            children: [new Paragraph('Paternity Benefits')],
            columnSpan: 2,
          }),

          new TableCell({
            children: [new Paragraph('Day Care facilities')],
            columnSpan: 2,
          }),
        ],
      }),

      new TableRow({
        children: [
          new TableCell({
            children: [new Paragraph('Number (B )')],
          }),
          new TableCell({
            children: [new Paragraph('% (B / A)')],
          }),
          new TableCell({
            children: [new Paragraph('Number (C )')],
          }),
          new TableCell({
            children: [new Paragraph('% (C / A)')],
          }),
          new TableCell({
            children: [new Paragraph('Number (D )')],
          }),
          new TableCell({
            children: [new Paragraph('% (D / A)')],
          }),
          new TableCell({
            children: [new Paragraph('Number (E )')],
          }),
          new TableCell({
            children: [new Paragraph('% (E / A)')],
          }),
          new TableCell({
            children: [new Paragraph('Number (F )')],
          }),
          new TableCell({
            children: [new Paragraph('% (F / A)')],
          }),
        ],
      }),
      new TableRow({
        children: [
          new TableCell({
            children: [new Paragraph('Permanent workers')],
            columnSpan: 12,
          }),
        ],
      }),
      new TableRow({
        children: [
          new TableCell({
            children: [new Paragraph('Male')],
          }),
          new TableCell({
            children: [
              new Paragraph(
                healthInsurance?.totalPermanentWorkers?.toString() ?? '',
              ),
            ],
          }),
          new TableCell({
            children: [
              new Paragraph(
                healthInsurance?.malePermanantWorkersInsuranceValue?.toString()
                  ?? '',
              ),
            ],
          }),
          new TableCell({
            children: [
              new Paragraph(
                healthInsurance?.malePermanentWorkersHealthInsurancePercentage?.toString()
                  ?? '',
              ),
            ],
          }),
          new TableCell({
            children: [
              new Paragraph(
                accidentInsurance?.malePermanantWorkersInsuranceValue?.toString()
                  ?? '',
              ),
            ],
          }),
          new TableCell({
            children: [
              new Paragraph(
                accidentInsurance?.malePermanentWorkersAccidentInsurancePercentage?.toString()
                  ?? '',
              ),
            ],
          }),
          new TableCell({
            children: [
              new Paragraph(
                maternityBenefit?.malePermanantWorkersInsuranceValue?.toString()
                  ?? '',
              ),
            ],
          }),
          new TableCell({
            children: [
              new Paragraph(
                maternityBenefit?.malePermanentWorkersMaternityBenefitPercentage?.toString()
                  ?? '',
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
          new TableCell({
            children: [new Paragraph('')],
          }),
        ],
      }),
      new TableRow({
        children: [
          new TableCell({
            children: [new Paragraph('Female')],
          }),
          new TableCell({
            children: [
              new Paragraph(
                healthInsurance?.totalFemalePermanentCount?.toString() ?? '',
              ),
            ],
          }),
          new TableCell({
            children: [
              new Paragraph(
                healthInsurance?.femalePermanantInsuranceValue?.toString() ?? '',
              ),
            ],
          }),
          new TableCell({
            children: [
              new Paragraph(
                healthInsurance?.femalePermanentWorkersHealthInsurancePercentage?.toString()
                  ?? '',
              ),
            ],
          }),
          new TableCell({
            children: [
              new Paragraph(
                accidentInsurance?.femalePermanantInsuranceValue?.toString()
                  ?? '',
              ),
            ],
          }),
          new TableCell({
            children: [
              new Paragraph(
                accidentInsurance?.femalePermanentWorkersAccidentInsurancePercentage?.toString()
                  ?? '',
              ),
            ],
          }),
          new TableCell({
            children: [
              new Paragraph(
                maternityBenefit?.femalePermanantInsuranceValue?.toString()
                  ?? '',
              ),
            ],
          }),
          new TableCell({
            children: [
              new Paragraph(
                maternityBenefit?.femalePermanentWorkersMaternityBenefitPercentage?.toString()
                  ?? '',
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
            children: [
              new Paragraph(
                healthInsurance?.totalPermanentWorkers?.toString() ?? '',
              ),
            ],
          }),
          new TableCell({
            children: [
              new Paragraph(
                healthInsurance?.totalPermanentWorkersHealthInsuranceCovered?.toString()
                  ?? '',
              ),
            ],
          }),
          new TableCell({
            children: [
              new Paragraph(
                healthInsurance?.totalPermanentWorkersHealthInsurancePercentage?.toString()
                  ?? '',
              ),
            ],
          }),
          new TableCell({
            children: [
              new Paragraph(
                accidentInsurance?.totalPermanentWorkersAccidentInsuranceCovered?.toString()
                  ?? '',
              ),
            ],
          }),
          new TableCell({
            children: [
              new Paragraph(
                accidentInsurance?.totalPermanentWorkersAccidentInsurancePercentage?.toString()
                  ?? '',
              ),
            ],
          }),
          new TableCell({
            children: [
              new Paragraph(
                maternityBenefit?.totalPermanentWorkersMaternityBenefitCovered?.toString()
                  ?? '',
              ),
            ],
          }),
          new TableCell({
            children: [
              new Paragraph(
                maternityBenefit?.totalPermanentWorkersMaternityBenefitPercentage?.toString()
                  ?? '',
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
          new TableCell({
            children: [new Paragraph('')],
          }),
        ],
      }),
      new TableRow({
        children: [
          new TableCell({
            children: [new Paragraph('Other than Permanent employees')],
            columnSpan: 12,
          }),
        ],
      }),
      new TableRow({
        children: [
          new TableCell({
            children: [new Paragraph('Male')],
          }),
          new TableCell({
            children: [
              new Paragraph(
                healthInsurance?.totalMaleOtherthanPermanentWorkersCount?.toString()
                  ?? '',
              ),
            ],
          }),
          new TableCell({
            children: [
              new Paragraph(
                healthInsurance?.maleOtherthanPermanantInsuranceValue?.toString()
                  ?? '',
              ),
            ],
          }),
          new TableCell({
            children: [
              new Paragraph(
                healthInsurance?.maleOtherthanPermanentWorkersHealthInsurancePercentage?.toString()
                  ?? '',
              ),
            ],
          }),
          new TableCell({
            children: [
              new Paragraph(
                accidentInsurance?.maleOtherthanPermanantInsuranceValue?.toString()
                  ?? '',
              ),
            ],
          }),
          new TableCell({
            children: [
              new Paragraph(
                accidentInsurance?.maleOtherthanPermanentWorkersAccidentInsurancePercentage?.toString()
                  ?? '',
              ),
            ],
          }),
          new TableCell({
            children: [
              new Paragraph(
                maternityBenefit?.maleOtherthanPermanantInsuranceValue?.toString()
                  ?? '',
              ),
            ],
          }),
          new TableCell({
            children: [
              new Paragraph(
                maternityBenefit?.maleOtherthanPermanentWorkersMaternityBenefitPercentage?.toString()
                  ?? '',
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
          new TableCell({
            children: [new Paragraph('')],
          }),
        ],
      }),
      new TableRow({
        children: [
          new TableCell({
            children: [new Paragraph('Female')],
          }),
          new TableCell({
            children: [
              new Paragraph(
                healthInsurance?.totalFemaleOtherthanPermanentWorkersCount?.toString()
                  ?? '',
              ),
            ],
          }),
          new TableCell({
            children: [
              new Paragraph(
                healthInsurance?.femaleOtherthanPermanantWorkersInsuranceValue?.toString()
                  ?? '',
              ),
            ],
          }),
          new TableCell({
            children: [
              new Paragraph(
                healthInsurance?.femaleOtherthanPermanentWorkersHealthInsurancePercentage?.toString()
                  ?? '',
              ),
            ],
          }),
          new TableCell({
            children: [
              new Paragraph(
                accidentInsurance?.femaleOtherthanPermanantWorkersInsuranceValue?.toString()
                  ?? '',
              ),
            ],
          }),
          new TableCell({
            children: [
              new Paragraph(
                accidentInsurance?.femaleOtherthanPermanentWorkersAccidentInsurancePercentage?.toString()
                  ?? '',
              ),
            ],
          }),
          new TableCell({
            children: [
              new Paragraph(
                maternityBenefit?.femaleOtherthanPermanantWorkersInsuranceValue?.toString()
                  ?? '',
              ),
            ],
          }),
          new TableCell({
            children: [
              new Paragraph(
                maternityBenefit?.femaleOtherthanPermanentWorkersMaternityBenefitPercentage?.toString()
                  ?? '',
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
            children: [
              new Paragraph(
                healthInsurance?.totalOtherthanPermanentEmployees?.toString()
                  ?? '',
              ),
            ],
          }),
          new TableCell({
            children: [
              new Paragraph(
                healthInsurance?.totalOtherthanPermanentEmployeesHealthInsuranceCovered?.toString()
                  ?? '',
              ),
            ],
          }),
          new TableCell({
            children: [
              new Paragraph(
                healthInsurance?.totalOtherthanPermanentEmployeesHealthInsurancePercentage?.toString()
                  ?? '',
              ),
            ],
          }),
          new TableCell({
            children: [
              new Paragraph(
                accidentInsurance?.totalOtherthanPermanentEmployeesAccidentInsuranceCovered?.toString()
                  ?? '',
              ),
            ],
          }),
          new TableCell({
            children: [
              new Paragraph(
                accidentInsurance?.totalOtherthanPermanentEmployeesAccidentInsurancePercentage?.toString()
                  ?? '',
              ),
            ],
          }),
          new TableCell({
            children: [
              new Paragraph(
                maternityBenefit?.totalOtherthanPermanentEmployeesMaternityBenefitCovered?.toString()
                  ?? '',
              ),
            ],
          }),
          new TableCell({
            children: [
              new Paragraph(
                maternityBenefit?.totalOtherthanPermanentEmployeesMaternityBenefitPercentage?.toString()
                  ?? '',
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
          new TableCell({
            children: [new Paragraph('')],
          }),
        ],
      }),
    ],
  });
};

const questionSpendingWellbeing = () => new Paragraph({
  text: ' c. Spending on measures towards well-being of employees and workers (including  permanent and other than permanent) in the following format – ',
  spacing: { after: 200 },
});

const tableSpendingWellBeing = () => new Table({
  columnWidths: [3505, 3505, 3505],
  rows: [
    new TableRow({
      children: [
        new TableCell({
          children: [new Paragraph(' ')],
        }),
        new TableCell({
          children: [new Paragraph('FY _____ Current Financial Year')],
        }),
        new TableCell({
          children: [new Paragraph('FY _____ Previous Financial Year')],
        }),
      ],
    }),
    new TableRow({
      children: [
        new TableCell({
          children: [
            new Paragraph(
              'Cost incurred on well-being measures as a % of total revenue of the company',
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

const questionRetirementBenefits = () => new Paragraph({
  text: ' 2. Details of retirement benefits, for Current FY and Previous Financial Year. ',
  spacing: { after: 200 },
});

const tableRetirementBenefits = async (obj) => {
  // const res = await axios.get("http://localhost:5000/report-template/download?report_name=BRSR&financial_year=2024&financial_quarter=q4");
  const pfPayments = obj?.pFPayments?.pFpercentages;
  const gratuityPayments = obj?.gratuityPayments?.gratuityPercentages;
  const esiPayments = obj?.eSIPayments?.esiPercentages;

  return new Table({
    columnWidths: [2000, 1500, 1500, 2000, 1500, 1500, 1500, 1500, 1500],
    rows: [
      new TableRow({
        children: [
          new TableCell({
            children: [new Paragraph('Benefits')],
            rowSpan: 2,
          }),
          new TableCell({
            children: [new Paragraph('FY _____ Current Financial Year')],
            columnSpan: 3,
          }),
          new TableCell({
            children: [new Paragraph('FY _____ Previous Financial Year')],
            columnSpan: 3,
          }),
        ],
      }),
      new TableRow({
        children: [
          new TableCell({
            children: [
              new Paragraph(
                'No. of employees covered as a % of total employees',
              ),
            ],
          }),
          new TableCell({
            children: [
              new Paragraph('No. of workers covered as a % of total workers'),
            ],
          }),
          new TableCell({
            children: [
              new Paragraph(
                'Deducted and deposited with the authority (Y/N/N.A.)',
              ),
            ],
          }),
          new TableCell({
            children: [
              new Paragraph(
                'No. of employees covered as a % of total employees',
              ),
            ],
          }),
          new TableCell({
            children: [
              new Paragraph('No. of workers covered as a % of total workers'),
            ],
          }),
          new TableCell({
            children: [
              new Paragraph(
                'Deducted and deposited with the authority (Y/N/N.A.)',
              ),
            ],
          }),
        ],
      }),
      new TableRow({
        children: [
          new TableCell({
            children: [new Paragraph('PF')],
          }),
          new TableCell({
            children: [
              new Paragraph(
                pfPayments?.currentYear?.employeesPercentagePF?.toString() || '',
              ),
            ],
          }),
          new TableCell({
            children: [
              new Paragraph(
                pfPayments?.currentYear?.workersPercentagePF?.toString() || '',
              ),
            ],
          }),
          new TableCell({
            children: [new Paragraph('')],
          }),
          new TableCell({
            children: [
              new Paragraph(
                pfPayments?.previousYear?.employeesPercentagePF?.toString()
                  || '',
              ),
            ],
          }),
          new TableCell({
            children: [
              new Paragraph(
                pfPayments?.previousYear?.workersPercentagePF?.toString() || '',
              ),
            ],
          }),
          new TableCell({
            children: [new Paragraph('')],
          }),
        ],
      }),
      new TableRow({
        children: [
          new TableCell({
            children: [new Paragraph('Gratuity')],
          }),
          new TableCell({
            children: [
              new Paragraph(
                gratuityPayments?.currentYear?.employeesPercentageGratuity?.toString()
                  || '',
              ),
            ],
          }),
          new TableCell({
            children: [
              new Paragraph(
                gratuityPayments?.currentYear?.workersPercentageGratuity?.toString()
                  || '',
              ),
            ],
          }),
          new TableCell({
            children: [new Paragraph('')],
          }),
          new TableCell({
            children: [
              new Paragraph(
                gratuityPayments?.previousYear?.employeesPercentageGratuity?.toString()
                  || '',
              ),
            ],
          }),
          new TableCell({
            children: [
              new Paragraph(
                gratuityPayments?.previousYear?.workersPercentageGratuity?.toString()
                  || '',
              ),
            ],
          }),
          new TableCell({
            children: [new Paragraph('')],
          }),
        ],
      }),
      new TableRow({
        children: [
          new TableCell({
            children: [new Paragraph('ESI')],
          }),
          new TableCell({
            children: [
              new Paragraph(
                esiPayments?.currentYear?.employeesPercentageESI?.toString()
                  || '',
              ),
            ],
          }),
          new TableCell({
            children: [
              new Paragraph(
                esiPayments?.currentYear?.workersPercentageESI?.toString() || '',
              ),
            ],
          }),
          new TableCell({
            children: [new Paragraph('')],
          }),
          new TableCell({
            children: [
              new Paragraph(
                esiPayments?.previousYear?.employeesPercentageESI?.toString()
                  || '',
              ),
            ],
          }),
          new TableCell({
            children: [
              new Paragraph(
                esiPayments?.previousYear?.workersPercentageESI?.toString()
                  || '',
              ),
            ],
          }),
          new TableCell({
            children: [new Paragraph('')],
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
            children: [new Paragraph('')],
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
          new TableCell({
            children: [new Paragraph('')],
          }),
        ],
      }),
    ],
  });
};

const questionAccessibility = () => new Paragraph({
  text: '3. Accessibility of workplaces: Are the premises / offices of the entity accessible to differently abled employees and  workers, as per the requirements of the Rights of Persons with Disabilities Act, 2016? If  not, whether any steps are being taken by the entity in this regard. ',
  spacing: { before: 200, after: 200 },
});

const questionEqualOpportunityPolicy = () => new Paragraph({
  text: '4. Does the entity have an equal opportunity policy as per the Rights of Persons with Disabilities Act, 2016? If so, provide a web-link to the policy.',
  spacing: { before: 200, after: 200 },
});

const questionParentalLeaveRates = () => new Paragraph({
  text: '5. Return to work and Retention rates of permanent employees and workers that took  parental leave.',
  spacing: { before: 200, after: 200 },
});

const tableParentalLeaveRates = async (obj) => {
  // const res = await axios.get("http://localhost:5000/report-template/download?report_name=BRSR&financial_year=2024&financial_quarter=q4");
  const data = obj;
  return new Table({
    rows: [
      new TableRow({
        children: [
          new TableCell({
            children: [new Paragraph(' ')],
          }),
          new TableCell({
            children: [new Paragraph('Permanent employees')],
            columnSpan: 2,
          }),
          new TableCell({
            children: [new Paragraph('Permanent workers')],
            columnSpan: 2,
          }),
        ],
      }),
      new TableRow({
        children: [
          new TableCell({
            children: [new Paragraph('Gender')],
          }),
          new TableCell({
            children: [new Paragraph('Return to work rate')],
          }),
          new TableCell({
            children: [new Paragraph('Retention rate')],
          }),
          new TableCell({
            children: [new Paragraph('Return to work rate')],
          }),
          new TableCell({
            children: [new Paragraph('Retention rate')],
          }),
        ],
      }),
      new TableRow({
        children: [
          new TableCell({
            children: [new Paragraph('Male')],
          }),
          new TableCell({
            children: [
              new Paragraph(
                data?.malePermanentEmployeesReturntoWork?.toString() || 'N/A',
              ),
            ],
          }),
          new TableCell({
            children: [
              new Paragraph(
                data?.malePermanentEmployeesRetentionRate?.toString() || 'N/A',
              ),
            ],
          }),
          new TableCell({
            children: [
              new Paragraph(
                data?.malePermanentWorkersReturntoWork?.toString() || 'N/A',
              ),
            ],
          }),
          new TableCell({
            children: [
              new Paragraph(
                data?.malePermanentWorkersRetentionRate?.toString() || 'N/A',
              ),
            ],
          }),
        ],
      }),
      new TableRow({
        children: [
          new TableCell({
            children: [new Paragraph('Female')],
          }),
          new TableCell({
            children: [
              new Paragraph(
                data?.femalePermanentEmployeesReturntoWork?.toString() || 'N/A',
              ),
            ],
          }),
          new TableCell({
            children: [
              new Paragraph(
                data?.femalePermanentEmployeesRetentionRate?.toString() || 'N/A',
              ),
            ],
          }),
          new TableCell({
            children: [
              new Paragraph(
                data?.femalePermanentWorkersReturntoWork?.toString() || 'N/A',
              ),
            ],
          }),
          new TableCell({
            children: [
              new Paragraph(
                data?.femalePermanentWorkersRetentionRate?.toString() || 'N/A',
              ),
            ],
          }),
        ],
      }),
      new TableRow({
        children: [
          new TableCell({
            children: [new Paragraph('Total')],
          }),
          new TableCell({
            children: [
              new Paragraph(
                data?.totalMalePermanentEmployeesReturntoWorkRate?.toString()
                  || 'N/A',
              ),
            ],
          }),
          new TableCell({
            children: [
              new Paragraph(
                data?.totalMalePermanentEmployeesRetentionRate?.toString()
                  || 'N/A',
              ),
            ],
          }),
          new TableCell({
            children: [
              new Paragraph(
                data?.totalMalePermanentWorkersRetentionRate?.toString()
                  || 'N/A',
              ),
            ],
          }),
          new TableCell({
            children: [
              new Paragraph(
                data?.totalMalePermanentWorkersReturntoWorkRate?.toString()
                  || 'N/A',
              ),
            ],
          }),
        ],
      }),
    ],
  });
};

const questionGrievanceRedressMechanism = () => new Paragraph({
  text: '6. Is there a mechanism available to receive and redress grievances for the following  categories of employees and worker? If yes, give details of the mechanism in brief.',
  spacing: { before: 200, after: 200 },
});

const tableGrievanceRedressMechanism = () => new Table({
  columnWidths: [4000, 8000],
  rows: [
    new TableRow({
      children: [
        new TableCell({
          children: [new Paragraph('Category')],
        }),
        new TableCell({
          children: [
            new Paragraph(
              'Yes/No (If Yes, then give details of the mechanism in brief)',
            ),
          ],
        }),
      ],
    }),
    new TableRow({
      children: [
        new TableCell({
          children: [new Paragraph('Permanent Workers')],
        }),
        new TableCell({
          children: [new Paragraph('')],
        }),
      ],
    }),
    new TableRow({
      children: [
        new TableCell({
          children: [new Paragraph('Other than Permanent Workers')],
        }),
        new TableCell({
          children: [new Paragraph('')],
        }),
      ],
    }),
    new TableRow({
      children: [
        new TableCell({
          children: [new Paragraph('Permanent Employees')],
        }),
        new TableCell({
          children: [new Paragraph('')],
        }),
      ],
    }),
    new TableRow({
      children: [
        new TableCell({
          children: [new Paragraph('Other than Permanent Employees')],
        }),
        new TableCell({
          children: [new Paragraph('')],
        }),
      ],
    }),
  ],
});

const questionMembershipAssociationsUnions = () => new Paragraph({
  text: '7. Membership of employees and worker in association(s) or Unions recognised by the  listed entity: ',
  spacing: { after: 200 },
});

const tableMembershipAssociationsUnions = async (obj) => {
  // const res = await axios.get("http://localhost:5000/report-template/download?report_name=BRSR&financial_year=2024&financial_quarter=q4");
  const Uniondata = obj?.UnionMembership?.percentages;

  return new Table({
    columnWidths: [2000, 1500, 1500, 2000, 1500, 1500, 1500, 1500, 1500],
    rows: [
      new TableRow({
        children: [
          new TableCell({
            children: [new Paragraph('Category')],
            rowSpan: 2,
          }),
          new TableCell({
            children: [new Paragraph('FY _____ Current Financial Year')],
            columnSpan: 3,
          }),
          new TableCell({
            children: [new Paragraph('FY _____ Previous Financial Year')],
            columnSpan: 3,
          }),
        ],
      }),
      new TableRow({
        children: [
          new TableCell({
            children: [
              new Paragraph(
                'Total employees /  workers in  respective category (A)',
              ),
            ],
          }),
          new TableCell({
            children: [
              new Paragraph(
                'No. of employees / workers in respective category, who are part of association(s) or Union (B)',
              ),
            ],
          }),
          new TableCell({ children: [new Paragraph('% (B / A)')] }),
          new TableCell({
            children: [
              new Paragraph(
                'Total employees / workers in respective category (C)',
              ),
            ],
          }),
          new TableCell({
            children: [
              new Paragraph(
                'No. of employees / workers in respective category, who are part of association(s) or Union (D)',
              ),
            ],
          }),
          new TableCell({ children: [new Paragraph('% (D / C)')] }),
        ],
      }),
      new TableRow({
        children: [
          new TableCell({
            children: [new Paragraph('Total Permanent Employees')],
          }),
          new TableCell({
            children: [
              new Paragraph(
                Uniondata?.currentYear?.totalPermanentEmployeesCount?.toString()
                  || ' ',
              ),
            ],
          }),
          new TableCell({
            children: [
              new Paragraph(
                Uniondata?.currentYear?.totalPermanentEmployeesUnionCount?.toString()
                  || ' ',
              ),
            ],
          }),
          new TableCell({
            children: [
              new Paragraph(
                Uniondata?.currentYear?.totalEmployeesPercentage?.toString()
                  || ' ',
              ),
            ],
          }),
          new TableCell({
            children: [
              new Paragraph(
                Uniondata?.previousYear?.totalPermanentEmployeesCount?.toString()
                  || ' ',
              ),
            ],
          }),
          new TableCell({
            children: [
              new Paragraph(
                Uniondata?.previousYear?.totalPermanentEmployeesUnionCount?.toString()
                  || ' ',
              ),
            ],
          }),
          new TableCell({
            children: [
              new Paragraph(
                Uniondata?.previousYear?.totalEmployeesPercentage?.toString()
                  || ' ',
              ),
            ],
          }),
        ],
      }),
      new TableRow({
        children: [
          new TableCell({
            children: [new Paragraph('Male')],
          }),
          new TableCell({
            children: [
              new Paragraph(
                Uniondata?.currentYear?.malePermanentEmployeesCount?.toString()
                  || ' ',
              ),
            ],
          }),
          new TableCell({
            children: [
              new Paragraph(
                Uniondata?.currentYear?.malePermanentWorkersUnionCount?.toString()
                  || ' ',
              ),
            ],
          }),
          new TableCell({
            children: [
              new Paragraph(
                Uniondata?.currentYear?.maleEmployeesPercentage?.toString()
                  || ' ',
              ),
            ],
          }),
          new TableCell({
            children: [
              new Paragraph(
                Uniondata?.previousYear?.malePermanentEmployeesCount?.toString()
                  || ' ',
              ),
            ],
          }),
          new TableCell({
            children: [
              new Paragraph(
                Uniondata?.previousYear?.malePermanentWorkersUnionCount?.toString()
                  || ' ',
              ),
            ],
          }),
          new TableCell({
            children: [
              new Paragraph(
                Uniondata?.previousYear?.maleEmployeesPercentage?.toString()
                  || ' ',
              ),
            ],
          }),
        ],
      }),
      new TableRow({
        children: [
          new TableCell({
            children: [new Paragraph('Female')],
          }),
          new TableCell({
            children: [
              new Paragraph(
                Uniondata?.currentYear?.femalePermanentEmployeesCount?.toString()
                  || ' ',
              ),
            ],
          }),
          new TableCell({
            children: [
              new Paragraph(
                Uniondata?.currentYear?.femalePermanentEmployeesUnionCount?.toString()
                  || ' ',
              ),
            ],
          }),
          new TableCell({
            children: [
              new Paragraph(
                Uniondata?.currentYear?.femaleEmployeesPercentage?.toString()
                  || ' ',
              ),
            ],
          }),
          new TableCell({
            children: [
              new Paragraph(
                Uniondata?.previousYear?.femalePermanentEmployeesCount?.toString()
                  || ' ',
              ),
            ],
          }),
          new TableCell({
            children: [
              new Paragraph(
                Uniondata?.previousYear?.femalePermanentEmployeesUnionCount?.toString()
                  || ' ',
              ),
            ],
          }),
          new TableCell({
            children: [
              new Paragraph(
                Uniondata?.previousYear?.femaleEmployeesPercentage?.toString()
                  || ' ',
              ),
            ],
          }),
        ],
      }),
      new TableRow({
        children: [
          new TableCell({
            children: [new Paragraph('Total Permanent Workers ')],
          }),
          new TableCell({
            children: [
              new Paragraph(
                Uniondata?.currentYear?.totalPermanentWorkersCount?.toString()
                  || ' ',
              ),
            ],
          }),
          new TableCell({
            children: [
              new Paragraph(
                Uniondata?.currentYear?.totalPermanentWorkersUnionCount?.toString()
                  || ' ',
              ),
            ],
          }),
          new TableCell({
            children: [
              new Paragraph(
                Uniondata?.currentYear?.totalWorkersPercentage?.toString()
                  || ' ',
              ),
            ],
          }),
          new TableCell({
            children: [
              new Paragraph(
                Uniondata?.previousYear?.totalPermanentWorkersCount?.toString()
                  || ' ',
              ),
            ],
          }),
          new TableCell({
            children: [
              new Paragraph(
                Uniondata?.previousYear?.totalPermanentWorkersUnionCount?.toString()
                  || ' ',
              ),
            ],
          }),
          new TableCell({
            children: [
              new Paragraph(
                Uniondata?.previousYear?.totalWorkersPercentage?.toString()
                  || ' ',
              ),
            ],
          }),
        ],
      }),
      new TableRow({
        children: [
          new TableCell({
            children: [new Paragraph('Male ')],
          }),
          new TableCell({
            children: [
              new Paragraph(
                Uniondata?.currentYear?.malePermanentWorkerCount?.toString()
                  || ' ',
              ),
            ],
          }),
          new TableCell({
            children: [
              new Paragraph(
                Uniondata?.currentYear?.malePermanentWorkersUnionCount?.toString()
                  || ' ',
              ),
            ],
          }),
          new TableCell({
            children: [
              new Paragraph(
                Uniondata?.currentYear?.maleWorkersPercentage?.toString() || ' ',
              ),
            ],
          }),
          new TableCell({
            children: [
              new Paragraph(
                Uniondata?.previousYear?.malePermanentWorkerCount?.toString()
                  || ' ',
              ),
            ],
          }),
          new TableCell({
            children: [
              new Paragraph(
                Uniondata?.previousYear?.malePermanentWorkersUnionCount?.toString()
                  || ' ',
              ),
            ],
          }),
          new TableCell({
            children: [
              new Paragraph(
                Uniondata?.previousYear?.maleWorkersPercentage?.toString()
                  || ' ',
              ),
            ],
          }),
        ],
      }),
      new TableRow({
        children: [
          new TableCell({
            children: [new Paragraph('  Female ')],
          }),
          new TableCell({
            children: [
              new Paragraph(
                Uniondata?.currentYear?.femalePermanentWorkerCount?.toString()
                  || ' ',
              ),
            ],
          }),
          new TableCell({
            children: [
              new Paragraph(
                Uniondata?.currentYear?.femalePermanentWorkersUnionCount?.toString()
                  || ' ',
              ),
            ],
          }),
          new TableCell({
            children: [
              new Paragraph(
                Uniondata?.currentYear?.femaleWorkersPercentage?.toString()
                  || ' ',
              ),
            ],
          }),
          new TableCell({
            children: [
              new Paragraph(
                Uniondata?.previousYear?.femalePermanentWorkerCount?.toString()
                  || ' ',
              ),
            ],
          }),
          new TableCell({
            children: [
              new Paragraph(
                Uniondata?.previousYear?.femalePermanentWorkersUnionCount?.toString()
                  || ' ',
              ),
            ],
          }),
          new TableCell({
            children: [
              new Paragraph(
                Uniondata?.previousYear?.femaleWorkersPercentage?.toString()
                  || ' ',
              ),
            ],
          }),
        ],
      }),
    ],
  });
};

const questionTrainingDetails = () => new Paragraph({
  text: '8. Details of training given to employees and workers:',
  spacing: { after: 200 },
});

const tableTrainingDetails = async (obj) => {
  // const res = await axios.get("http://localhost:5000/report-template/download?report_name=BRSR&financial_year=2024&financial_quarter=q4");
  const data = obj?.SafetyandHealthBasedTraining?.percentages;

  return new Table({
    rows: [
      new TableRow({
        children: [
          new TableCell({ children: [new Paragraph('Category')], rowSpan: 3 }),
          new TableCell({
            children: [new Paragraph('FY _____ (Current Financial Year)')],
            columnSpan: 5,
          }),
          new TableCell({
            children: [new Paragraph('FY _____ (Previous Financial Year)')],
            columnSpan: 5,
          }),
        ],
      }),
      new TableRow({
        children: [
          new TableCell({ children: [new Paragraph('Total (A)')], rowSpan: 2 }),
          new TableCell({
            children: [new Paragraph('On Health and Safety Measures')],
            columnSpan: 2,
          }),
          new TableCell({
            children: [new Paragraph('Skill Upgradation')],
            columnSpan: 2,
          }),
          new TableCell({ children: [new Paragraph('Total (D)')], rowSpan: 2 }),
          new TableCell({
            children: [new Paragraph('On Health and Safety Measures')],
            columnSpan: 2,
          }),
          new TableCell({
            children: [new Paragraph('Skill Upgradation')],
            columnSpan: 2,
          }),
        ],
      }),
      new TableRow({
        children: [
          new TableCell({ children: [new Paragraph(' No. (B)')] }),
          new TableCell({ children: [new Paragraph('% (B / A)')] }),
          new TableCell({ children: [new Paragraph(' No. (C)')] }),
          new TableCell({ children: [new Paragraph('% (C / A)')] }),
          new TableCell({ children: [new Paragraph(' No. (E)')] }),
          new TableCell({ children: [new Paragraph('% (E / D)')] }),
          new TableCell({ children: [new Paragraph(' No. (F)')] }),
          new TableCell({ children: [new Paragraph('% (F / D)')] }),
        ],
      }),
      new TableRow({
        children: [
          new TableCell({
            children: [
              new Paragraph({ text: 'Employees', alignment: 'center' }),
            ],
            columnSpan: 11,
          }),
        ],
      }),
      new TableRow({
        children: [
          new TableCell({
            children: [new Paragraph('Male')],
          }),
          new TableCell({
            children: [
              new Paragraph(
                data?.currentYear?.totalMaleEmployeesCount?.toString() || ' ',
              ),
            ],
          }),
          new TableCell({
            children: [
              new Paragraph(
                data?.currentYear?.maleEmployeesHealthandsafetymeasuresCount?.toString()
                  || ' ',
              ),
            ],
          }),
          new TableCell({
            children: [
              new Paragraph(
                data?.currentYear?.maleEmployeesHealthandsafetymeasuresPercentage?.toString()
                  || ' ',
              ),
            ],
          }),
          new TableCell({
            children: [
              new Paragraph(
                data?.currentYear?.maleEmployeesSkillBasedTrainingCount?.toString()
                  || ' ',
              ),
            ],
          }),
          new TableCell({
            children: [
              new Paragraph(
                data?.currentYear?.maleEmployeesSkillBasedTrainingPercentage?.toString()
                  || ' ',
              ),
            ],
          }),
          new TableCell({
            children: [
              new Paragraph(
                data?.previousYear?.totalMaleEmployeesCount?.toString() || ' ',
              ),
            ],
          }),
          new TableCell({
            children: [
              new Paragraph(
                data?.previousYear?.maleEmployeesHealthandsafetymeasuresCount?.toString()
                  || ' ',
              ),
            ],
          }),
          new TableCell({
            children: [
              new Paragraph(
                data?.previousYear?.maleEmployeesHealthandsafetymeasuresPercentage?.toString()
                  || ' ',
              ),
            ],
          }),
          new TableCell({
            children: [
              new Paragraph(
                data?.previousYear?.maleEmployeesSkillBasedTrainingPercentage?.toString()
                  || ' ',
              ),
            ],
          }),
          new TableCell({
            children: [
              new Paragraph(
                data?.previousYear?.maleEmployeesSkillBasedTrainingPercentage?.toString()
                  || ' ',
              ),
            ],
          }),
        ],
      }),
      new TableRow({
        children: [
          new TableCell({
            children: [new Paragraph('Female')],
          }),
          new TableCell({
            children: [
              new Paragraph(
                data?.currentYear?.totalFemaleEmployeesCount?.toString() || ' ',
              ),
            ],
          }),
          new TableCell({
            children: [
              new Paragraph(
                data?.currentYear?.femaleEmployeesHealthandsafetymeasuresCount?.toString()
                  || ' ',
              ),
            ],
          }),
          new TableCell({
            children: [
              new Paragraph(
                data?.currentYear?.femaleEmployeesHealthandsafetymeasuresPercentage?.toString()
                  || ' ',
              ),
            ],
          }),
          new TableCell({
            children: [
              new Paragraph(
                data?.currentYear?.femaleEmployeesSkillBasedTrainingCount?.toString()
                  || ' ',
              ),
            ],
          }),
          new TableCell({
            children: [
              new Paragraph(
                data?.currentYear?.femaleEmployeesSkillBasedTrainingPercentage?.toString()
                  || ' ',
              ),
            ],
          }),
          new TableCell({
            children: [
              new Paragraph(
                data?.previousYear?.totalFemaleEmployeesCount?.toString() || ' ',
              ),
            ],
          }),
          new TableCell({
            children: [
              new Paragraph(
                data?.previousYear?.femaleEmployeesHealthandsafetymeasuresCount?.toString()
                  || ' ',
              ),
            ],
          }),
          new TableCell({
            children: [
              new Paragraph(
                data?.previousYear?.femaleEmployeesHealthandsafetymeasuresPercentage?.toString()
                  || ' ',
              ),
            ],
          }),
          new TableCell({
            children: [
              new Paragraph(
                data?.previousYear?.femaleEmployeesSkillBasedTrainingCount?.toString()
                  || ' ',
              ),
            ],
          }),
          new TableCell({
            children: [
              new Paragraph(
                data?.previousYear?.femaleEmployeesSkillBasedTrainingPercentage?.toString()
                  || ' ',
              ),
            ],
          }),
        ],
      }),
      new TableRow({
        children: [
          new TableCell({
            children: [new Paragraph('Total')],
          }),
          new TableCell({
            children: [
              new Paragraph(
                data?.currentYear?.totalEmployeesCount?.toString() || ' ',
              ),
            ],
          }),
          new TableCell({
            children: [
              new Paragraph(
                data?.currentYear?.totalEmployeesHealthandsafetymeasuresCount?.toString()
                  || ' ',
              ),
            ],
          }),
          new TableCell({
            children: [
              new Paragraph(
                data?.currentYear?.totalEmployeesHealthandsafetymeasuresPercentage?.toString()
                  || ' ',
              ),
            ],
          }),
          new TableCell({
            children: [
              new Paragraph(
                data?.currentYear?.totalEmployeesSkillBasedTrainingCount?.toString()
                  || ' ',
              ),
            ],
          }),
          new TableCell({
            children: [
              new Paragraph(
                data?.currentYear?.totalEmployeesSkillBasedTrainingPercentage?.toString()
                  || ' ',
              ),
            ],
          }),
          new TableCell({
            children: [
              new Paragraph(
                data?.previousYear?.totalEmployeesCount?.toString() || ' ',
              ),
            ],
          }),
          new TableCell({
            children: [
              new Paragraph(
                data?.previousYear?.totalEmployeesHealthandsafetymeasuresCount?.toString()
                  || ' ',
              ),
            ],
          }),
          new TableCell({
            children: [
              new Paragraph(
                data?.previousYear?.totalEmployeesHealthandsafetymeasuresPercentage?.toString()
                  || ' ',
              ),
            ],
          }),
          new TableCell({
            children: [
              new Paragraph(
                data?.previousYear?.totalEmployeesSkillBasedTrainingCount?.toString()
                  || ' ',
              ),
            ],
          }),
          new TableCell({
            children: [
              new Paragraph(
                data?.previousYear?.totalEmployeesSkillBasedTrainingPercentage?.toString()
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
              new Paragraph({ text: ' Workers ', alignment: 'center' }),
            ],
            columnSpan: 11,
          }),
        ],
      }),
      new TableRow({
        children: [
          new TableCell({
            children: [new Paragraph('Male')],
          }),
          new TableCell({
            children: [
              new Paragraph(
                data?.currentYear?.totalMaleWorkersCount?.toString() || ' ',
              ),
            ],
          }),
          new TableCell({
            children: [
              new Paragraph(
                data?.currentYear?.maleWorkersHealthandsafetymeasuresCount?.toString()
                  || ' ',
              ),
            ],
          }),
          new TableCell({
            children: [
              new Paragraph(
                data?.currentYear?.maleWorkersHealthandsafetymeasuresPercentage?.toString()
                  || ' ',
              ),
            ],
          }),
          new TableCell({
            children: [
              new Paragraph(
                data?.currentYear?.maleWorkersSkillBasedTrainingCount?.toString()
                  || ' ',
              ),
            ],
          }),
          new TableCell({
            children: [
              new Paragraph(
                data?.currentYear?.maleWorkersSkillBasedTrainingPercentage?.toString()
                  || ' ',
              ),
            ],
          }),
          new TableCell({
            children: [
              new Paragraph(
                data?.previousYear?.totalMaleWorkersCount?.toString() || ' ',
              ),
            ],
          }),
          new TableCell({
            children: [
              new Paragraph(
                data?.previousYear?.maleWorkersHealthandsafetymeasuresCount?.toString()
                  || ' ',
              ),
            ],
          }),
          new TableCell({
            children: [
              new Paragraph(
                data?.previousYear?.maleWorkersHealthandsafetymeasuresPercentage?.toString()
                  || ' ',
              ),
            ],
          }),
          new TableCell({
            children: [
              new Paragraph(
                data?.previousYear?.maleWorkersSkillBasedTrainingCount?.toString()
                  || ' ',
              ),
            ],
          }),
          new TableCell({
            children: [
              new Paragraph(
                data?.previousYear?.maleWorkersSkillBasedTrainingPercentage?.toString()
                  || ' ',
              ),
            ],
          }),
        ],
      }),
      new TableRow({
        children: [
          new TableCell({
            children: [new Paragraph('Female')],
          }),
          new TableCell({
            children: [
              new Paragraph(
                data?.currentYear?.totalFemaleWorkersCount?.toString() || ' ',
              ),
            ],
          }),
          new TableCell({
            children: [
              new Paragraph(
                data?.currentYear?.femaleWorkersHealthandsafetymeasuresCount?.toString()
                  || ' ',
              ),
            ],
          }),
          new TableCell({
            children: [
              new Paragraph(
                data?.currentYear?.femaleWorkersHealthandsafetymeasuresPercentage?.toString()
                  || ' ',
              ),
            ],
          }),
          new TableCell({
            children: [
              new Paragraph(
                data?.currentYear?.femaleWorkersSkillBasedTrainingCount?.toString()
                  || ' ',
              ),
            ],
          }),
          new TableCell({
            children: [
              new Paragraph(
                data?.currentYear?.femaleWorkersSkillBasedTrainingPercentage?.toString()
                  || ' ',
              ),
            ],
          }),
          new TableCell({
            children: [
              new Paragraph(
                data?.previousYear?.totalFemaleWorkersCount?.toString() || ' ',
              ),
            ],
          }),
          new TableCell({
            children: [
              new Paragraph(
                data?.previousYear?.femaleWorkersHealthandsafetymeasuresCount?.toString()
                  || ' ',
              ),
            ],
          }),
          new TableCell({
            children: [
              new Paragraph(
                data?.previousYear?.femaleWorkersHealthandsafetymeasuresPercentage?.toString()
                  || ' ',
              ),
            ],
          }),
          new TableCell({
            children: [
              new Paragraph(
                data?.previousYear?.femaleWorkersSkillBasedTrainingCount?.toString()
                  || ' ',
              ),
            ],
          }),
          new TableCell({
            children: [
              new Paragraph(
                data?.previousYear?.femaleWorkersSkillBasedTrainingPercentage?.toString()
                  || ' ',
              ),
            ],
          }),
        ],
      }),
      new TableRow({
        children: [
          new TableCell({
            children: [new Paragraph('Total')],
          }),
          new TableCell({
            children: [
              new Paragraph(
                data?.currentYear?.totalWorkersCount?.toString() || ' ',
              ),
            ],
          }),
          new TableCell({
            children: [
              new Paragraph(
                data?.currentYear?.totalWorkersHealthandsafetymeasuresCount?.toString()
                  || ' ',
              ),
            ],
          }),
          new TableCell({
            children: [
              new Paragraph(
                data?.currentYear?.totalWorkersHealthandsafetymeasuresPercentage?.toString()
                  || ' ',
              ),
            ],
          }),
          new TableCell({
            children: [
              new Paragraph(
                data?.currentYear?.totalWorkersSkillBasedTrainingCount?.toString()
                  || ' ',
              ),
            ],
          }),
          new TableCell({
            children: [
              new Paragraph(
                data?.currentYear?.totalWorkersSkillBasedTrainingPercentage?.toString()
                  || ' ',
              ),
            ],
          }),
          new TableCell({
            children: [
              new Paragraph(
                data?.previousYear?.totalWorkersCount?.toString() || ' ',
              ),
            ],
          }),
          new TableCell({
            children: [
              new Paragraph(
                data?.previousYear?.totalWorkersHealthandsafetymeasuresCount?.toString()
                  || ' ',
              ),
            ],
          }),
          new TableCell({
            children: [
              new Paragraph(
                data?.previousYear?.totalWorkersHealthandsafetymeasuresPercentage?.toString()
                  || ' ',
              ),
            ],
          }),
          new TableCell({
            children: [
              new Paragraph(
                data?.previousYear?.totalWorkersSkillBasedTrainingCount?.toString()
                  || ' ',
              ),
            ],
          }),
          new TableCell({
            children: [
              new Paragraph(
                data?.previousYear?.totalWorkersSkillBasedTrainingPercentage?.toString()
                  || ' ',
              ),
            ],
          }),
        ],
      }),
    ],
  });
};

const questionCareerDevelopmentReview = () => new Paragraph({
  text: '9. Details of performance and career development reviews of employees and worker:',
  spacing: { before: 200, after: 200 },
});

const tableCareerDevelopmentReview = async (obj) => {
  // const res = await axios.get("http://localhost:5000/report-template/download?report_name=BRSR&financial_year=2024&financial_quarter=q4");
  const PerformanceData = obj?.performanceManagement;

  return new Table({
    // columnWidths: [2000, 1500, 1500, 2000, 1500, 1500, 1500, 1500, 1500],
    rows: [
      new TableRow({
        children: [
          new TableCell({
            children: [new Paragraph('Category')],
            rowSpan: 2,
          }),
          new TableCell({
            children: [new Paragraph('FY _____ Current Financial Year')],
            columnSpan: 3,
          }),
          new TableCell({
            children: [new Paragraph('FY _____ Previous Financial Year')],
            columnSpan: 3,
          }),
        ],
      }),
      new TableRow({
        children: [
          new TableCell({ children: [new Paragraph('Total (A)')] }),
          new TableCell({ children: [new Paragraph('No. (B)')] }),
          new TableCell({ children: [new Paragraph('% (B / A)')] }),
          new TableCell({ children: [new Paragraph('Total (C)')] }),
          new TableCell({ children: [new Paragraph('No. (D)')] }),
          new TableCell({ children: [new Paragraph('% (D / C)')] }),
        ],
      }),
      new TableRow({
        children: [
          new TableCell({
            children: [new Paragraph(' Employees ')],
            columnSpan: 7,
          }),
        ],
      }),
      new TableRow({
        children: [
          new TableCell({
            children: [new Paragraph('Male')],
          }),
          new TableCell({
            children: [
              new Paragraph(
                PerformanceData?.currentYear?.totalMaleEmployeesCount?.toString()
                  || ' - ',
              ),
            ], // data not given in api placeholder written
          }),
          new TableCell({
            children: [
              new Paragraph(
                PerformanceData?.currentYear?.maleEmployeesPerformanceManagementCount?.toString()
                 || ' - ',
              ),
            ],
          }),
          new TableCell({
            children: [
              new Paragraph(
                PerformanceData?.currentYear?.maleEmployeesPerformanceManagementPercentage?.toString()
                  || ' - ',
              ),
            ],
          }),
          new TableCell({
            children: [
              new Paragraph(
                PerformanceData?.previousYear?.totalMaleEmployeesCount?.toString()
                || ' - ',
              ),
            ], // data not given in api placeholder written
          }),
          new TableCell({
            children: [
              new Paragraph(
                PerformanceData?.previousYear?.maleEmployeesPerformanceManagementCount?.toString()
                 || ' - ',
              ),
            ],
          }),
          new TableCell({
            children: [
              new Paragraph(
                PerformanceData?.previousYear?.maleEmployeesPerformanceManagementPercentage?.toString()
               || ' - ',
              ),
            ],
          }),
        ],
      }),
      new TableRow({
        children: [
          new TableCell({
            children: [new Paragraph('Female')],
          }),
          new TableCell({
            children: [
              new Paragraph(
                PerformanceData?.currentYear?.totalFemaleEmployeesCount?.toString()
               || ' - ',
              ),
            ], // data not given in api placeholder written
          }),
          new TableCell({
            children: [
              new Paragraph(
                PerformanceData?.currentYear?.femaleEmployeesPerformanceManagementCount?.toString()
                 || ' - ',
              ),
            ],
          }),
          new TableCell({
            children: [
              new Paragraph(
                PerformanceData?.currentYear?.femaleEmployeesPerformanceManagementPercentage?.toString()
                  || ' - ',
              ),
            ],
          }),
          new TableCell({
            children: [
              new Paragraph(
                PerformanceData?.previousYear?.totalFemaleEmployeesCount?.toString()
                 || ' - ',
              ),
            ], // data not given in api placeholder written
          }),
          new TableCell({
            children: [
              new Paragraph(
                PerformanceData?.previousYear?.femaleEmployeesPerformanceManagementCount?.toString()
                 || ' - ',
              ),
            ],
          }),
          new TableCell({
            children: [
              new Paragraph(
                PerformanceData?.previousYear?.femaleEmployeesPerformanceManagementPercentage?.toString()
                 || ' - ',
              ),
            ],
          }),
        ],
      }),
      new TableRow({
        children: [
          new TableCell({
            children: [new Paragraph('Total')],
          }),
          new TableCell({
            children: [
              new Paragraph(
                PerformanceData?.currentYear?.totalEmployeesCount?.toString() || ' - ',
              ),
            ], // data not given in api placeholder written
          }),
          new TableCell({
            children: [
              new Paragraph(
                PerformanceData?.currentYear?.totalEmployeesPerformanceManagementCount?.toString()
                  || ' - ',
              ),
            ],
          }),
          new TableCell({
            children: [
              new Paragraph(
                PerformanceData?.currentYear?.totalEmployeesPerformanceManagementPercentage?.toString()
                  || ' - ',
              ),
            ],
          }),
          new TableCell({
            children: [
              new Paragraph(
                PerformanceData?.previousYear?.totalEmployeesCount?.toString() || ' - ',
              ),
            ], // data not given in api placeholder written
          }),
          new TableCell({
            children: [
              new Paragraph(
                PerformanceData?.previousYear?.totalEmployeesPerformanceManagementCount?.toString()
                  || ' - ',
              ),
            ],
          }),
          new TableCell({
            children: [
              new Paragraph(
                PerformanceData?.previousYear?.totalEmployeesPerformanceManagementPercentage?.toString()
                  || ' - ',
              ),
            ],
          }),
        ],
      }),
      new TableRow({
        children: [
          new TableCell({
            children: [new Paragraph(' Workers ')],
            columnSpan: 7,
          }),
        ],
      }),
      new TableRow({
        children: [
          new TableCell({
            children: [new Paragraph('Male ')],
          }),
          new TableCell({
            children: [
              new Paragraph(
                PerformanceData?.currentYear?.totalMaleWorkersCount?.toString()
                  || ' - ',
              ),
            ], // data not given in api placeholder written
          }),
          new TableCell({
            children: [
              new Paragraph(
                PerformanceData?.currentYear?.maleWorkersPerformanceManagementCount?.toString()
                  || ' - ',
              ),
            ],
          }),
          new TableCell({
            children: [
              new Paragraph(
                PerformanceData?.currentYear?.maleWorkersPerformanceManagementPercentage?.toString()
                  || ' - ',
              ),
            ],
          }),
          new TableCell({
            children: [
              new Paragraph(
                PerformanceData?.previousYear?.totalMaleWorkersCount?.toString()
                  || ' - ',
              ),
            ], // data not given in api placeholder written
          }),
          new TableCell({
            children: [
              new Paragraph(
                PerformanceData?.previousYear?.maleWorkersPerformanceManagementCount?.toString()
                  || ' - ',
              ),
            ],
          }),
          new TableCell({
            children: [
              new Paragraph(
                PerformanceData?.previousYear?.maleWorkersPerformanceManagementPercentage?.toString()
                  || ' - ',
              ),
            ],
          }),
        ],
      }),
      new TableRow({
        children: [
          new TableCell({
            children: [new Paragraph('  Female ')],
          }),
          new TableCell({
            children: [
              new Paragraph(
                PerformanceData?.currentYear?.totalFemaleWorkersCount?.toString()
                  || ' - ',
              ),
            ], // data not given in api placeholder written
          }),
          new TableCell({
            children: [
              new Paragraph(
                PerformanceData?.currentYear?.femaleWorkersPerformanceManagementCount?.toString()
                  || ' - ',
              ),
            ],
          }),
          new TableCell({
            children: [
              new Paragraph(
                PerformanceData?.currentYear?.femaleWorkersPerformanceManagementPercentage?.toString()
                  || ' - ',
              ),
            ],
          }),
          new TableCell({
            children: [
              new Paragraph(
                PerformanceData?.previousYear?.totalFemaleWorkersCount?.toString()
                  || ' - ',
              ),
            ], // data not given in api placeholder written
          }),
          new TableCell({
            children: [
              new Paragraph(
                PerformanceData?.previousYear?.femaleWorkersPerformanceManagementCount?.toString()
                  || ' - ',
              ),
            ],
          }),
          new TableCell({
            children: [
              new Paragraph(
                PerformanceData?.previousYear?.femaleWorkersPerformanceManagementPercentage?.toString()
                  || ' - ',
              ),
            ],
          }),
        ],
      }),
      new TableRow({
        children: [
          new TableCell({
            children: [new Paragraph('Total Permanent Workers ')],
          }),
          new TableCell({
            children: [
              new Paragraph(
                PerformanceData?.currentYear?.totalWorkersCount?.toString() || ' - ',
              ),
            ], // data not given in api placeholder written
          }),
          new TableCell({
            children: [
              new Paragraph(
                PerformanceData?.currentYear?.totalWorkersPerformanceManagementCount?.toString()
                   || ' - ',
              ),
            ],
          }),
          new TableCell({
            children: [
              new Paragraph(
                PerformanceData?.currentYear?.totalWorkersPerformanceManagementPercentage?.toString()
                  || ' - ',
              ),
            ],
          }),
          new TableCell({
            children: [
              new Paragraph(
                PerformanceData?.previousYear?.totalWorkersCount?.toString() || ' - ',
              ),
            ], // data not given in api placeholder written
          }),
          new TableCell({
            children: [
              new Paragraph(
                PerformanceData?.previousYear?.totalWorkersPerformanceManagementCount?.toString()
                  || ' - ',
              ),
            ],
          }),
          new TableCell({
            children: [
              new Paragraph(
                PerformanceData?.previousYear?.totalWorkersPerformanceManagementPercentage?.toString()
                   || ' - ',
              ),
            ],
          }),
        ],
      }),
    ],
  });
};

const healthSafetyManagement = () => new Paragraph({
  children: [
    new TextRun({
      text: '10. Health and safety management system: a. Whether an occupational health and safety management system has been  implemented by the entity? (Yes/ No). If yes, the coverage such system?  b. What are the processes used to identify work-related hazards and assess risks on a  routine and non-routine basis by the entity?  ',
      break: 2,
    }),
    new TextRun({
      text: 'c. Whether you have processes for workers to report the work related hazards and to remove themselves from such risks. (Y/N)',
      break: 2,
    }),
    new TextRun({
      text: 'd. Do the employees/ worker of the entity have access to non-occupational medical  and healthcare services? (Yes/ No) ',
      break: 2,
    }),
  ],
});

const questionSafetyIncidents = () => new Paragraph({
  text: '11. Details of safety related incidents, in the following format:',
  spacing: { before: 200, after: 200 },
});

const tableSafetyIncidents = async (obj) => {
  // const res = await axios.get("http://localhost:5000/report-template/download?report_name=BRSR&financial_year=2024&financial_quarter=q4");
  const satefyMetricsData = obj?.safetyMetrics;

  return new Table({
    columnWidths: [3000, 2000, 2000, 2000, 2000],
    rows: [
      new TableRow({
        children: [
          new TableCell({
            children: [new Paragraph('Safety Incident/Number')],
          }),
          new TableCell({ children: [new Paragraph('Category*')] }),
          new TableCell({
            children: [new Paragraph('FY _____ (Current Financial Year)')],
          }),
          new TableCell({
            children: [new Paragraph('FY _____ (Previous Financial Year)')],
          }),
        ],
      }),

      new TableRow({
        children: [
          new TableCell({
            children: [
              new Paragraph(
                'Lost Time Injury Frequency Rate (LTIFR) (per one million-person hours worked)',
              ),
            ],
            rowSpan: 2,
          }),

          new TableCell({ children: [new Paragraph('Employees')] }),
          new TableCell({ children: [new Paragraph(satefyMetricsData?.currentYear?.LostTimeInjuries?.Employees?.toString() || ' - ')] }),
          new TableCell({ children: [new Paragraph(satefyMetricsData?.previousYear?.LostTimeInjuries?.Employees?.toString() || ' - ')] }),
        ],
      }),
      new TableRow({
        children: [
          new TableCell({ children: [new Paragraph('Workers')] }),
          new TableCell({ children: [new Paragraph(satefyMetricsData?.currentYear?.LostTimeInjuries?.Workers?.toString() || ' - ')] }),
          new TableCell({ children: [new Paragraph(satefyMetricsData?.previousYear?.LostTimeInjuries?.Workers?.toString() || ' - ')] }),
        ],
      }),

      new TableRow({
        children: [
          new TableCell({
            children: [new Paragraph('Total recordable work-related injuries')],
            rowSpan: 2,
          }),
          new TableCell({ children: [new Paragraph('Employees')] }),
          new TableCell({ children: [new Paragraph(satefyMetricsData?.currentYear?.RecordableInjuries?.Employees?.toString() || ' - ')] }),
          new TableCell({ children: [new Paragraph(satefyMetricsData?.previousYear?.RecordableInjuries?.Employees?.toString() || ' - ')] }),
        ],
      }),
      new TableRow({
        children: [
          new TableCell({ children: [new Paragraph('Workers')] }),
          new TableCell({ children: [new Paragraph(satefyMetricsData?.currentYear?.RecordableInjuries?.Workers?.toString() || ' - ')] }),
          new TableCell({ children: [new Paragraph(satefyMetricsData?.previousYear?.RecordableInjuries?.Workers?.toString() || ' - ')] }),
        ],
      }),
      new TableRow({
        children: [
          new TableCell({
            children: [new Paragraph('No. of fatalities')],
            rowSpan: 2,
          }),

          new TableCell({ children: [new Paragraph('Employees')] }),
          new TableCell({ children: [new Paragraph(satefyMetricsData?.currentYear?.Fatalities?.Employees?.toString() || ' - ')] }),
          new TableCell({ children: [new Paragraph(satefyMetricsData?.previousYear?.Fatalities?.Employees?.toString() || ' - ')] }),
        ],
      }),
      new TableRow({
        children: [
          new TableCell({ children: [new Paragraph('Workers')] }),
          new TableCell({ children: [new Paragraph(satefyMetricsData?.currentYear?.Fatalities?.Workers?.toString() || ' - ')] }),
          new TableCell({ children: [new Paragraph(satefyMetricsData?.previousYear?.Fatalities?.Workers?.toString() || ' - ')] }),
        ],
      }),
      new TableRow({
        children: [
          new TableCell({
            children: [
              new Paragraph(
                'High consequence work-related injury or ill-health (excluding fatalities)',
              ),
            ],
            rowSpan: 2,
          }),

          new TableCell({ children: [new Paragraph('Employees')] }),
          new TableCell({ children: [new Paragraph(satefyMetricsData?.currentYear?.NearMissInjuries?.Employees?.toString() || ' - ')] }),
          new TableCell({ children: [new Paragraph(satefyMetricsData?.previousYear?.NearMissInjuries?.Employees?.toString() || ' - ')] }),
        ],
      }),
      new TableRow({
        children: [
          new TableCell({ children: [new Paragraph('Workers')] }),
          new TableCell({ children: [new Paragraph(satefyMetricsData?.currentYear?.NearMissInjuries?.Workers?.toString() || ' - ')] }),
          new TableCell({ children: [new Paragraph(satefyMetricsData?.previousYear?.NearMissInjuries?.Workers?.toString() || ' - ')] }),
        ],
      }),
    ],
  });
};

const conditionSafetyRelated = () => new Paragraph({
  text: '*Including in the contract workforce ',
  spacing: { before: 200, after: 200 },
});

const questionMeasuresTaken = () => new Paragraph({
  text: '12. Describe the measures taken by the entity to ensure a safe and healthy work place.   ',
  spacing: { before: 200, after: 200 },
});

const questionComplaintsWorkingConditions = () => new Paragraph({
  text: '13. Number of Complaints on the following made by employees and workers:   ',
  spacing: { before: 200, after: 200 },
});

// const res = await axios.get(
//   "http://localhost:5000/report-template/download?report_name=BRSR&financial_year=2024&financial_quarter=q4?report_name=BRSR&financial_year=2024&financial_quarter=q4"
// );
// const data = obj?.employeeGrevienceRedressal;

const ComplaintsWorkingConditions = async (obj) => new Table({
  columnWidths: [2000, 1500, 1500, 2000, 1500, 1500, 1500, 1500, 1500],
  rows: [
    new TableRow({
      children: [
        new TableCell({
          children: [new Paragraph(' ')],
          rowSpan: 2,
        }),
        new TableCell({
          children: [new Paragraph('FY _____ Current Financial Year')],
          columnSpan: 3,
        }),
        new TableCell({
          children: [new Paragraph('FY _____ Previous Financial Year')],
          columnSpan: 3,
        }),
      ],
    }),
    new TableRow({
      children: [
        new TableCell({
          children: [new Paragraph('Filed during  the year')],
        }),
        new TableCell({
          children: [
            new Paragraph('Pending resolution  at the end  of year'),
          ],
        }),
        new TableCell({ children: [new Paragraph('Remarks')] }),
        new TableCell({
          children: [new Paragraph('Filed during  the year')],
        }),
        new TableCell({
          children: [
            new Paragraph('Pending resolution  at the end  of year'),
          ],
        }),
        new TableCell({ children: [new Paragraph('Remarks')] }),
      ],
    }),
    new TableRow({
      children: [
        new TableCell({
          children: [new Paragraph('Working Conditions')],
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
          children: [new Paragraph('Health &  Safety')],
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
const questionAssessmentWorkingConditions = () => new Paragraph({
  text: '14. Assessments for the year: ',
  spacing: { before: 200, after: 200 },
});

const tableAssessmentWorkingConditions = () => new Table({
  columnWidths: [4000, 8000],
  rows: [
    new TableRow({
      children: [
        new TableCell({
          children: [new Paragraph(' ')],
        }),
        new TableCell({
          children: [
            new Paragraph(
              '% of your plants and offices that were assessed (by entity or statutory authorities or third parties) ',
            ),
          ],
        }),
      ],
    }),
    new TableRow({
      children: [
        new TableCell({
          children: [new Paragraph('Health and safety practices')],
        }),
        new TableCell({
          children: [new Paragraph('')],
        }),
      ],
    }),
    new TableRow({
      children: [
        new TableCell({
          children: [new Paragraph('Working Conditions')],
        }),
        new TableCell({
          children: [new Paragraph('')],
        }),
      ],
    }),
  ],
});

const detailsCorrectiveAction = () => new Paragraph({
  text: '15. Provide details of any corrective action taken or underway to address safety-related  incidents (if any) and on significant risks / concerns arising from assessments of health  & safety practices and working conditions. ',
  spacing: { before: 200, after: 200 },
});

const p3_leadership_indicators = () => new Paragraph({
  children: [
    new TextRun({
      text: 'Leadership Indicators ',
      bold: true,
      break: 2,
    }),
    new TextRun({
      text: '1. Does the entity extend any life insurance or any compensatory package in the event of  death of (A) Employees (Y/N) (B) Workers (Y/N).  ',
      break: 2,
    }),
    new TextRun({
      text: '2. Provide the measures undertaken by the entity to ensure that statutory dues have been  deducted and deposited by the value chain partners.   ',
      break: 2,
    }),
  ],
});

const questionHighConsequenceInjuries = () => new Paragraph({
  text: '3. Provide the number of employees / workers having suffered high consequence work related injury / ill-health / fatalities (as reported in Q11 of Essential Indicators above),  who have been are rehabilitated and placed in suitable employment or whose family  members have been placed in suitable employment: ',
  spacing: { before: 200, after: 200 },
});

const tableHighConsequenceInjuries = () => new Table({
  // columnWidths: [4000, 8000],
  rows: [
    new TableRow({
      children: [
        new TableCell({
          children: [new Paragraph('  ')],
        }),
        new TableCell({
          children: [
            new Paragraph(' Total no. of affected employees/ workers '),
          ],
          columnSpan: 2,
        }),
        new TableCell({
          children: [
            new Paragraph(
              'No. of employees/workers that are rehabilitated and placed in suitable employment or whose family members have been placed in suitable employmentx ',
            ),
          ],
          columnSpan: 2,
        }),
      ],
    }),
    new TableRow({
      children: [
        new TableCell({
          children: [new Paragraph('  ')],
        }),
        new TableCell({
          children: [new Paragraph(' FY _____ Current Financial Year')],
        }),
        new TableCell({
          children: [new Paragraph('FY _____ Previous Financial Year ')],
        }),
        new TableCell({
          children: [new Paragraph(' FY _____ Current Financial Year')],
        }),
        new TableCell({
          children: [new Paragraph('FY _____ Previous Financial Year ')],
        }),
      ],
    }),
    new TableRow({
      children: [
        new TableCell({
          children: [new Paragraph('Employees')],
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
        new TableCell({
          children: [new Paragraph('')],
        }),
      ],
    }),
    new TableRow({
      children: [
        new TableCell({
          children: [new Paragraph('Workers ')],
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
        new TableCell({
          children: [new Paragraph('')],
        }),
      ],
    }),
  ],
});

const questionTransitionAssistance = () => new Paragraph({
  text: '4. Does the entity provide transition assistance programs to facilitate continued  employability and the management of career endings resulting from retirement or  termination of employment? (Yes/ No)  ',
  spacing: { before: 200, after: 200 },
});

const questionAssessmentValueChain = () => new Paragraph({
  text: '5. Details on assessment of value chain partners:   ',
  spacing: { before: 200, after: 200 },
});

const tableAssessmentValueChain = () => new Table({
  columnWidths: [4000, 8000],
  rows: [
    new TableRow({
      children: [
        new TableCell({
          children: [new Paragraph(' ')],
        }),
        new TableCell({
          children: [
            new Paragraph(
              '% of value chain partners (by value of business done with such partners) that were assessed ',
            ),
          ],
        }),
      ],
    }),
    new TableRow({
      children: [
        new TableCell({
          children: [new Paragraph('Health and safety practices')],
        }),
        new TableCell({
          children: [new Paragraph('')],
        }),
      ],
    }),
    new TableRow({
      children: [
        new TableCell({
          children: [new Paragraph('Working Conditions')],
        }),
        new TableCell({
          children: [new Paragraph('')],
        }),
      ],
    }),
  ],
});

const detailsCorrectiveActionValueChain = () => new Paragraph({
  text: '6. Provide details of any corrective actions taken or underway to address significant risks /  concerns arising from assessments of health and safety practices and working conditions of value chain partners.  ',
  spacing: { before: 200, after: 200 },
});

module.exports = {
  principle_3,
  questionEmployeeWellBeing,
  tableEmployeeWellBeing,
  questionWorkersWellBeing,
  tableWorkersWellBeing,
  questionSpendingWellbeing,
  tableSpendingWellBeing,
  questionRetirementBenefits,
  tableRetirementBenefits,
  questionAccessibility,
  questionEqualOpportunityPolicy,
  questionParentalLeaveRates,
  tableParentalLeaveRates,
  questionGrievanceRedressMechanism,
  tableGrievanceRedressMechanism,
  questionMembershipAssociationsUnions,
  tableMembershipAssociationsUnions,
  questionTrainingDetails,
  tableTrainingDetails,
  questionCareerDevelopmentReview,
  tableCareerDevelopmentReview,
  healthSafetyManagement,
  questionSafetyIncidents,
  tableSafetyIncidents,
  conditionSafetyRelated,
  questionMeasuresTaken,
  questionComplaintsWorkingConditions,
  ComplaintsWorkingConditions,
  questionAssessmentWorkingConditions,
  tableAssessmentWorkingConditions,
  detailsCorrectiveAction,
  p3_leadership_indicators,
  questionHighConsequenceInjuries,
  tableHighConsequenceInjuries,
  questionTransitionAssistance,
  questionAssessmentValueChain,
  tableAssessmentValueChain,
  detailsCorrectiveActionValueChain,
};
