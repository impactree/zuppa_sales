/* eslint-disable camelcase */
/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-var-requires */
const {
  TextRun,
  Paragraph,
  Table,
  TableCell,
  TableRow,
  WidthType,
} = require('docx');
// const fs = require("fs");
// const dataSet = require("../models/hrGeneralData");

const question_20 = () => new Paragraph({
  children: [
    new TextRun({
      text: '20. Details as at the end of Financial Year:',
      break: 1,
    }),
    new TextRun({
      text: 'a. Employees and workers (including differently abled):',
      break: 1,
    }),
  ],
  spacing: {
    after: 200,
  },
});

const table_question_20 = async (obj) => {
  // const res = await axios.get("http://localhost:5000/report-template/download?report_name=BRSR&financial_year=2024&financial_quarter=q4");
  const employeesDetails = obj?.employeesDetails;
  const differentlyAbled = obj?.differentlyAbledDetails?.[0];
  // console.log('differentlyabled', differentlyAbled.malePermanentCount);
  // console.log(employeesDetails.currentYear);

  const employeeHeaderRows = new TableRow({
    children: [
      new TableCell({
        width: {
          size: 5505,
          type: WidthType.DXA,
        },
        children: [new Paragraph('S. No')],
        rowSpan: 2,
      }),
      new TableCell({
        width: {
          size: 5505,
          type: WidthType.DXA,
        },
        children: [new Paragraph('Particulars ')],
        rowSpan: 2,
      }),
      new TableCell({
        width: {
          size: 5505,
          type: WidthType.DXA,
        },
        children: [new Paragraph('Total (A)')],
        rowSpan: 2,
      }),
      new TableCell({
        width: {
          size: 5505,
          type: WidthType.DXA,
        },
        children: [new Paragraph('Male')],
        columnSpan: 2,
      }),
      new TableCell({
        width: {
          size: 5505,
          type: WidthType.DXA,
        },
        children: [new Paragraph('Female')],
        columnSpan: 2,
      }),
    ],
  });

  const employeeRows1 = new TableRow({
    children: [
      new TableCell({
        width: {
          size: 5505,
          type: WidthType.DXA,
        },
        children: [new Paragraph('No. (B)')],
      }),
      new TableCell({
        width: {
          size: 5505,
          type: WidthType.DXA,
        },
        children: [new Paragraph('% (B / A)')],
      }),
      new TableCell({
        width: {
          size: 5505,
          type: WidthType.DXA,
        },
        children: [new Paragraph('No. (B)')],
      }),
      new TableCell({
        width: {
          size: 5505,
          type: WidthType.DXA,
        },
        children: [new Paragraph('% (B / A)')],
      }),
    ],
  });

  const employeeTable = new TableRow({
    children: [
      new TableCell({
        width: { size: 5505, type: WidthType.DXA },
        children: [new Paragraph({ text: 'Employees', alignment: 'center' })],
        columnSpan: 7,
        verticalAlign: 'center',
      }),
    ],
  });

  const employeeRowPermanant = new TableRow({
    children: [
      new TableCell({
        width: { size: 5505, type: WidthType.DXA },
        children: [new Paragraph('1')],
      }),
      new TableCell({
        width: { size: 5505, type: WidthType.DXA },
        children: [new Paragraph('Permanent (D)')],
      }),
      new TableCell({
        width: { size: 5505, type: WidthType.DXA },
        children: [
          new Paragraph(
            employeesDetails?.currentYear?.totalPermanentEmployees?.toString()
              || '',
          ),
        ],
      }),
      new TableCell({
        width: { size: 5505, type: WidthType.DXA },
        children: [
          new Paragraph(
            employeesDetails?.currentYear?.malePermanentCount?.toString() || '',
          ),
        ],
      }),
      new TableCell({
        width: { size: 5505, type: WidthType.DXA },
        children: [
          new Paragraph(
            employeesDetails?.currentYear?.malePermanentEmployeesPercentage?.toString()
              || '',
          ),
        ],
      }),
      new TableCell({
        width: { size: 5505, type: WidthType.DXA },
        children: [
          new Paragraph(
            employeesDetails?.currentYear?.femalePermanentCount?.toString()
              || '',
          ),
        ],
      }),
      new TableCell({
        width: { size: 5505, type: WidthType.DXA },
        children: [
          new Paragraph(
            employeesDetails?.currentYear?.femalePermanentEmployeesPercentage?.toString()
              || '',
          ),
        ],
      }),
    ],
  });

  const employeeRowOther = new TableRow({
    children: [
      new TableCell({
        width: { size: 5505, type: WidthType.DXA },
        children: [new Paragraph('2')],
      }),
      new TableCell({
        width: { size: 5505, type: WidthType.DXA },
        children: [new Paragraph('Other than Permanent (E)')],
      }),
      new TableCell({
        width: { size: 5505, type: WidthType.DXA },
        children: [
          new Paragraph(
            employeesDetails?.currentYear?.totalNonPermanentEmployees?.toString()
              || '',
          ),
        ],
      }),
      new TableCell({
        width: { size: 5505, type: WidthType.DXA },
        children: [
          new Paragraph(
            employeesDetails?.currentYear?.maleOtherPermanentCount?.toString()
              || '',
          ),
        ],
      }),
      new TableCell({
        width: { size: 5505, type: WidthType.DXA },
        children: [
          new Paragraph(
            employeesDetails?.currentYear?.maleNonPermanentEmployeesPercentage?.toString()
              || '',
          ),
        ],
      }),
      new TableCell({
        width: { size: 5505, type: WidthType.DXA },
        children: [
          new Paragraph(
            employeesDetails?.currentYear?.femaleOtherPermanentCount?.toString()
              || '',
          ),
        ],
      }),
      new TableCell({
        width: { size: 5505, type: WidthType.DXA },
        children: [
          new Paragraph(
            employeesDetails?.currentYear?.femaleNonPermanentEmployeesPercentage?.toString()
              || '',
          ),
        ],
      }),
    ],
  });

  const employeeRowTotal = new TableRow({
    children: [
      new TableCell({
        width: { size: 5505, type: WidthType.DXA },
        children: [new Paragraph('3')],
      }),
      new TableCell({
        width: { size: 5505, type: WidthType.DXA },
        children: [new Paragraph('Total employees (D + E)')],
      }),
      new TableCell({
        width: { size: 5505, type: WidthType.DXA },
        children: [
          new Paragraph(
            employeesDetails?.currentYear?.totalPermanentEmployees?.toString()
              || '',
          ),
        ],
      }),
      new TableCell({
        width: { size: 5505, type: WidthType.DXA },
        children: [
          new Paragraph(
            employeesDetails?.currentYear?.totalMaleEmployees?.toString() || '',
          ),
        ],
      }),
      new TableCell({
        width: { size: 5505, type: WidthType.DXA },
        children: [
          new Paragraph(
            employeesDetails?.currentYear?.totalMalePermanentEmployeesPercentage?.toString()
              || '',
          ),
        ],
      }),
      new TableCell({
        width: { size: 5505, type: WidthType.DXA },
        children: [
          new Paragraph(
            employeesDetails?.currentYear?.totalFemaleEmployees?.toString()
              || '',
          ),
        ],
      }),
      new TableCell({
        width: { size: 5505, type: WidthType.DXA },
        children: [
          new Paragraph(
            employeesDetails?.currentYear?.totalFemalePermanentEmployeesPercentage?.toString()
              || '',
          ),
        ],
      }),
    ],
  });

  const workerTable = new TableRow({
    children: [
      new TableCell({
        width: { size: 5505, type: WidthType.DXA },
        children: [new Paragraph({ text: 'Workers', alignment: 'center' })],
        columnSpan: 7,
        verticalAlign: 'center',
      }),
    ],
  });

  const workerRowPermanant = new TableRow({
    children: [
      new TableCell({
        width: { size: 5505, type: WidthType.DXA },
        children: [new Paragraph('4')],
      }),
      new TableCell({
        width: { size: 5505, type: WidthType.DXA },
        children: [new Paragraph('Permanent (D)')],
      }),
      new TableCell({
        width: { size: 5505, type: WidthType.DXA },
        children: [
          new Paragraph(
            employeesDetails?.currentYear?.totalPermanentWorkers?.toString()
              || '',
          ),
        ],
      }),
      new TableCell({
        width: { size: 5505, type: WidthType.DXA },
        children: [
          new Paragraph(
            employeesDetails?.currentYear?.malePermanentWorkerCount?.toString()
              || '',
          ),
        ],
      }),
      new TableCell({
        width: { size: 5505, type: WidthType.DXA },
        children: [
          new Paragraph(
            employeesDetails?.currentYear?.malePermanentWorkersPercentage?.toString()
              || '',
          ),
        ],
      }),
      new TableCell({
        width: { size: 5505, type: WidthType.DXA },
        children: [
          new Paragraph(
            employeesDetails?.currentYear?.femalePermanentWorkerCount?.toString()
              || '',
          ),
        ],
      }),
      new TableCell({
        width: { size: 5505, type: WidthType.DXA },
        children: [
          new Paragraph(
            employeesDetails?.currentYear?.femalePermanentWorkersPercentage?.toString()
              || '',
          ),
        ],
      }),
    ],
  });

  const workerRowOther = new TableRow({
    children: [
      new TableCell({
        width: { size: 5505, type: WidthType.DXA },
        children: [new Paragraph('5')],
      }),
      new TableCell({
        width: { size: 5505, type: WidthType.DXA },
        children: [new Paragraph('Other than Permanent (E)')],
      }),
      new TableCell({
        width: { size: 5505, type: WidthType.DXA },
        children: [
          new Paragraph(
            employeesDetails?.currentYear?.totalNonPermanentWorkers?.toString()
              || '',
          ),
        ],
      }),
      new TableCell({
        width: { size: 5505, type: WidthType.DXA },
        children: [
          new Paragraph(
            employeesDetails?.currentYear?.maleOtherPermanentWorkerCount?.toString()
              || '',
          ),
        ],
      }),
      new TableCell({
        width: { size: 5505, type: WidthType.DXA },
        children: [
          new Paragraph(
            employeesDetails?.currentYear?.maleNonPermanentWorkersPercentage?.toString()
              || '',
          ),
        ],
      }),
      new TableCell({
        width: { size: 5505, type: WidthType.DXA },
        children: [
          new Paragraph(
            employeesDetails?.currentYear?.femaleOtherPermanentWorkerCount?.toString()
              || '',
          ),
        ],
      }),
      new TableCell({
        width: { size: 5505, type: WidthType.DXA },
        children: [
          new Paragraph(
            employeesDetails?.currentYear?.femaleNonPermanentWorkersPercentage?.toString()
              || '',
          ),
        ],
      }),
    ],
  });

  const workerRowTotal = new TableRow({
    children: [
      new TableCell({
        width: { size: 5505, type: WidthType.DXA },
        children: [new Paragraph('6')],
      }),
      new TableCell({
        width: { size: 5505, type: WidthType.DXA },
        children: [new Paragraph('Total employees (D + E)')],
      }),
      new TableCell({
        width: { size: 5505, type: WidthType.DXA },
        children: [
          new Paragraph(
            employeesDetails?.currentYear?.totalWorkers?.toString() || '',
          ),
        ],
      }),
      new TableCell({
        width: { size: 5505, type: WidthType.DXA },
        children: [
          new Paragraph(
            employeesDetails?.currentYear?.totalMaleWorkers?.toString() || '',
          ),
        ],
      }),
      new TableCell({
        width: { size: 5505, type: WidthType.DXA },
        children: [
          new Paragraph(
            employeesDetails?.currentYear?.totalMalePermanentWorkersPercentage?.toString()
              || '',
          ),
        ],
      }),
      new TableCell({
        width: { size: 5505, type: WidthType.DXA },
        children: [
          new Paragraph(
            employeesDetails?.currentYear?.totalFemaleWorkers?.toString() || '',
          ),
        ],
      }),
      new TableCell({
        width: { size: 5505, type: WidthType.DXA },
        children: [
          new Paragraph(
            employeesDetails?.currentYear?.totalFemalePermanentWorkersPercentage?.toString()
              || '',
          ),
        ],
      }),
    ],
  });

  const differentlyabledTable = new TableRow({
    children: [
      new TableCell({
        width: { size: 5505, type: WidthType.DXA },
        children: [
          new Paragraph({
            text: 'Differently Abled Employees',
            alignment: 'center',
          }),
        ],
        columnSpan: 7,
        verticalAlign: 'center',
      }),
    ],
  });

  const differentlyabledRowPermanent = new TableRow({
    children: [
      new TableCell({
        width: { size: 5505, type: WidthType.DXA },
        children: [new Paragraph('4')],
      }),
      new TableCell({
        width: { size: 5505, type: WidthType.DXA },
        children: [new Paragraph('Permanent (D)')],
      }),
      new TableCell({
        width: { size: 5505, type: WidthType.DXA },
        children: [
          new Paragraph(
            differentlyAbled?.totalPermanentEmployees?.toString() || '',
          ),
        ],
      }),
      new TableCell({
        width: { size: 5505, type: WidthType.DXA },
        children: [
          new Paragraph(differentlyAbled?.malePermanentCount?.toString() || ''),
        ],
      }),
      new TableCell({
        width: { size: 5505, type: WidthType.DXA },
        children: [
          new Paragraph(
            differentlyAbled?.malePermanentEmployeesPercentage?.toString() || '',
          ),
        ],
      }),
      new TableCell({
        width: { size: 5505, type: WidthType.DXA },
        children: [
          new Paragraph(
            differentlyAbled?.femalePermanentCount?.toString() || '',
          ),
        ],
      }),
      new TableCell({
        width: { size: 5505, type: WidthType.DXA },
        children: [
          new Paragraph(
            differentlyAbled?.femalePermanentEmployeesPercentage?.toString()
              || '',
          ),
        ],
      }),
    ],
  });

  const differentlyabledRowOther = new TableRow({
    children: [
      new TableCell({
        width: { size: 5505, type: WidthType.DXA },
        children: [new Paragraph('5')],
      }),
      new TableCell({
        width: { size: 5505, type: WidthType.DXA },
        children: [new Paragraph('Other than Permanent (E)')],
      }),
      new TableCell({
        width: { size: 5505, type: WidthType.DXA },
        children: [
          new Paragraph(
            differentlyAbled?.totalNonPermanentEmployees?.toString() || '',
          ),
        ],
      }),
      new TableCell({
        width: { size: 5505, type: WidthType.DXA },
        children: [
          new Paragraph(
            differentlyAbled?.maleOtherPermanentCount?.toString() || '',
          ),
        ],
      }),
      new TableCell({
        width: { size: 5505, type: WidthType.DXA },
        children: [
          new Paragraph(
            differentlyAbled?.maleNonPermanentEmployeesPercentage?.toString()
              || '',
          ),
        ],
      }),
      new TableCell({
        width: { size: 5505, type: WidthType.DXA },
        children: [
          new Paragraph(
            differentlyAbled?.femaleOtherPermanentCount?.toString() || '',
          ),
        ],
      }),
      new TableCell({
        width: { size: 5505, type: WidthType.DXA },
        children: [
          new Paragraph(
            differentlyAbled?.femaleNonPermanentEmployeesPercentage?.toString()
              || '',
          ),
        ],
      }),
    ],
  });

  const differentlyabledRowTotal = new TableRow({
    children: [
      new TableCell({
        width: { size: 5505, type: WidthType.DXA },
        children: [new Paragraph('6')],
      }),
      new TableCell({
        width: { size: 5505, type: WidthType.DXA },
        children: [new Paragraph('Total employees (D + E)')],
      }),
      new TableCell({
        width: { size: 5505, type: WidthType.DXA },
        children: [
          new Paragraph(differentlyAbled?.totalEmployees?.toString() || ''),
        ],
      }),
      new TableCell({
        width: { size: 5505, type: WidthType.DXA },
        children: [
          new Paragraph(differentlyAbled?.totalMaleEmployees?.toString() || ''),
        ],
      }),
      new TableCell({
        width: { size: 5505, type: WidthType.DXA },
        children: [
          new Paragraph(
            differentlyAbled?.totalMalePermanentEmployeesPercentage?.toString()
              || '',
          ),
        ],
      }),
      new TableCell({
        width: { size: 5505, type: WidthType.DXA },
        children: [
          new Paragraph(
            differentlyAbled?.totalFemaleEmployees?.toString() || '',
          ),
        ],
      }),
      new TableCell({
        width: { size: 5505, type: WidthType.DXA },
        children: [
          new Paragraph(
            differentlyAbled?.totalFemalePermanentEmployeesPercentage?.toString()
              || '',
          ),
        ],
      }),
    ],
  });

  const differentlyabledWorkersTable = new TableRow({
    children: [
      new TableCell({
        width: { size: 5505, type: WidthType.DXA },
        children: [
          new Paragraph({
            text: 'Differently Abled Workers',
            alignment: 'center',
          }),
        ],
        columnSpan: 7,
        verticalAlign: 'center',
      }),
    ],
  });

  const differentlyabledWorkersRowPermanent = new TableRow({
    children: [
      new TableCell({
        width: { size: 5505, type: WidthType.DXA },
        children: [new Paragraph('4')],
      }),
      new TableCell({
        width: { size: 5505, type: WidthType.DXA },
        children: [new Paragraph('Permanent Workers (D)')],
      }),
      new TableCell({
        width: { size: 5505, type: WidthType.DXA },
        children: [
          new Paragraph(
            differentlyAbled?.totalPermanentWorkers?.toString() || '',
          ),
        ],
      }),
      new TableCell({
        width: { size: 5505, type: WidthType.DXA },
        children: [
          new Paragraph(
            differentlyAbled?.malePermanentWorkerCount?.toString() || '',
          ),
        ],
      }),
      new TableCell({
        width: { size: 5505, type: WidthType.DXA },
        children: [
          new Paragraph(
            differentlyAbled?.malePermanentWorkersPercentage?.toString() || '',
          ),
        ],
      }),
      new TableCell({
        width: { size: 5505, type: WidthType.DXA },
        children: [
          new Paragraph(
            differentlyAbled?.femalePermanentWorkerCount?.toString() || '',
          ),
        ],
      }),
      new TableCell({
        width: { size: 5505, type: WidthType.DXA },
        children: [
          new Paragraph(
            differentlyAbled?.femalePermanentWorkersPercentage?.toString() || '',
          ),
        ],
      }),
    ],
  });

  const differentlyabledWorkersRowOther = new TableRow({
    children: [
      new TableCell({
        width: { size: 5505, type: WidthType.DXA },
        children: [new Paragraph('5')],
      }),
      new TableCell({
        width: { size: 5505, type: WidthType.DXA },
        children: [new Paragraph('Other than Permanent Workers (E)')],
      }),
      new TableCell({
        width: { size: 5505, type: WidthType.DXA },
        children: [
          new Paragraph(
            differentlyAbled?.totalNonPermanentWorkers?.toString() || '',
          ),
        ],
      }),
      new TableCell({
        width: { size: 5505, type: WidthType.DXA },
        children: [
          new Paragraph(
            differentlyAbled?.maleOtherPermanentWorkerCount?.toString() || '',
          ),
        ],
      }),
      new TableCell({
        width: { size: 5505, type: WidthType.DXA },
        children: [
          new Paragraph(
            differentlyAbled?.maleNonPermanentWorkersPercentage?.toString()
              || '',
          ),
        ],
      }),
      new TableCell({
        width: { size: 5505, type: WidthType.DXA },
        children: [
          new Paragraph(
            differentlyAbled?.femaleOtherPermanentWorkerCount?.toString() || '',
          ),
        ],
      }),
      new TableCell({
        width: { size: 5505, type: WidthType.DXA },
        children: [
          new Paragraph(
            differentlyAbled?.femaleNonPermanentWorkersPercentage?.toString()
              || '',
          ),
        ],
      }),
    ],
  });

  const differentlyabledWorkersRowTotal = new TableRow({
    children: [
      new TableCell({
        width: { size: 5505, type: WidthType.DXA },
        children: [new Paragraph('6')],
      }),
      new TableCell({
        width: { size: 5505, type: WidthType.DXA },
        children: [new Paragraph('Total workers (D + E)')],
      }),
      new TableCell({
        width: { size: 5505, type: WidthType.DXA },
        children: [
          new Paragraph(differentlyAbled?.totalWorkers?.toString() || ''),
        ],
      }),
      new TableCell({
        width: { size: 5505, type: WidthType.DXA },
        children: [
          new Paragraph(differentlyAbled?.totalMaleWorkers?.toString() || ''),
        ],
      }),
      new TableCell({
        width: { size: 5505, type: WidthType.DXA },
        children: [
          new Paragraph(
            differentlyAbled?.totalMalePermanentWorkersPercentage?.toString()
              || '',
          ),
        ],
      }),
      new TableCell({
        width: { size: 5505, type: WidthType.DXA },
        children: [
          new Paragraph(differentlyAbled?.totalFemaleWorkers?.toString() || ''),
        ],
      }),
      new TableCell({
        width: { size: 5505, type: WidthType.DXA },
        children: [
          new Paragraph(
            differentlyAbled?.totalFemalePermanentWorkersPercentage?.toString()
              || '',
          ),
        ],
      }),
    ],
  });

  // const table_question_20 = () => {

  return new Table({
    rows: [
      employeeHeaderRows,
      employeeRows1,
      employeeTable,
      employeeRowPermanant,
      employeeRowOther,
      employeeRowTotal,
      workerTable,
      workerRowPermanant,
      workerRowOther,
      workerRowTotal,
      differentlyabledTable,
      differentlyabledRowPermanent,
      differentlyabledRowOther,
      differentlyabledRowTotal,
      differentlyabledWorkersTable,
      differentlyabledWorkersRowPermanent,
      differentlyabledWorkersRowOther,
      differentlyabledWorkersRowTotal,
    ],
  });
};

module.exports = { question_20, table_question_20 };
