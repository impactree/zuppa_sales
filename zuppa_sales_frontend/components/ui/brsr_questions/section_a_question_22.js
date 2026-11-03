/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable camelcase */
const {
  Paragraph,
  Table,
  TableCell,
  TableRow,
  WidthType,
} = require('docx');
// const fs = require("fs");
// const dataSet = require("../models/hrGeneralData");
// const missingDataSet = require("../models/missingData");

// const turnoverDetails = dataSet.find(
//   (task) => task.task_name === "Markets Served"
// ).response;

const question_22 = () => new Paragraph({
  text: ' 22. Turnover rate for permanent employees and workers ',
  spacing: {
    before: 200,
    after: 200,
  },
});

const table_question_22 = async (obj) => {
  // const res = await axios.get("http://localhost:5000/report-template/download?report_name=BRSR&financial_year=2024&financial_quarter=q4");
  const turnoverDetails = obj?.turnoverRatePEW?.turnoverRatePEW;

  return new Table({
    rows: [
      new TableRow({
        children: [
          new TableCell({
            width: {
              size: 5505,
              type: WidthType.DXA,
            },
            children: [new Paragraph(' ')],
            rowSpan: 2,
          }),
          new TableCell({
            width: {
              size: 5505,
              type: WidthType.DXA,
            },
            children: [
              new Paragraph(' FY_____  (Turnover rate in current FY )'),
            ],
            columnSpan: 3,
          }),
          new TableCell({
            width: {
              size: 5505,
              type: WidthType.DXA,
            },
            children: [
              new Paragraph(' FY_____  (Turnover rate in previous FY )'),
            ],
            columnSpan: 3,
          }),
          new TableCell({
            width: {
              size: 5505,
              type: WidthType.DXA,
            },
            children: [
              new Paragraph(
                ' FY_____  (Turnover rate in year prior to previous FY )',
              ),
            ],
            columnSpan: 3,
          }),
        ],
      }),
      new TableRow({
        children: [
          new TableCell({
            width: {
              size: 5505,
              type: WidthType.DXA,
            },
            children: [new Paragraph(' Male ')],
          }),
          new TableCell({
            width: {
              size: 5505,
              type: WidthType.DXA,
            },
            children: [new Paragraph(' Female ')],
          }),
          new TableCell({
            width: {
              size: 5505,
              type: WidthType.DXA,
            },
            children: [new Paragraph(' Total ')],
          }),
          new TableCell({
            width: {
              size: 5505,
              type: WidthType.DXA,
            },
            children: [new Paragraph(' Male ')],
          }),
          new TableCell({
            width: {
              size: 5505,
              type: WidthType.DXA,
            },
            children: [new Paragraph(' Female ')],
          }),
          new TableCell({
            width: {
              size: 5505,
              type: WidthType.DXA,
            },
            children: [new Paragraph(' Total ')],
          }),
          new TableCell({
            width: {
              size: 5505,
              type: WidthType.DXA,
            },
            children: [new Paragraph(' Male ')],
          }),
          new TableCell({
            width: {
              size: 5505,
              type: WidthType.DXA,
            },
            children: [new Paragraph(' Female ')],
          }),
          new TableCell({
            width: {
              size: 5505,
              type: WidthType.DXA,
            },
            children: [new Paragraph(' Total ')],
          }),
        ],
      }),
      new TableRow({
        children: [
          new TableCell({
            width: {
              size: 5505,
              type: WidthType.DXA,
            },
            children: [new Paragraph(' Permanent Employees  ')],
          }),
          new TableCell({
            width: {
              size: 5505,
              type: WidthType.DXA,
            },
            children: [new Paragraph(turnoverDetails?.currentYear?.['Permanent Employees']?.Male?.toString() || ' ')],
          }),
          new TableCell({
            width: {
              size: 5505,
              type: WidthType.DXA,
            },
            children: [new Paragraph(turnoverDetails?.currentYear?.['Permanent Employees']?.Female?.toString() || ' ')],
          }),
          new TableCell({
            width: {
              size: 5505,
              type: WidthType.DXA,
            },
            children: [new Paragraph(turnoverDetails?.currentYear?.['Permanent Employees']?.Total?.toString() || ' ')],
          }),
          new TableCell({
            width: {
              size: 5505,
              type: WidthType.DXA,
            },
            children: [new Paragraph(turnoverDetails?.previousYear?.['Permanent Employees']?.Male?.toString() || ' ')],
          }),
          new TableCell({
            width: {
              size: 5505,
              type: WidthType.DXA,
            },
            children: [new Paragraph(turnoverDetails?.previousYear?.['Permanent Employees']?.Female?.toString() || ' ')],
          }),
          new TableCell({
            width: {
              size: 5505,
              type: WidthType.DXA,
            },
            children: [new Paragraph(turnoverDetails?.previousYear?.['Permanent Employees']?.Total?.toString() || ' ')],
          }),
          new TableCell({
            width: {
              size: 5505,
              type: WidthType.DXA,
            },
            children: [new Paragraph(turnoverDetails?.prior_previousYear?.['Permanent Employees']?.Male?.toString() || ' ')],
          }),
          new TableCell({
            width: {
              size: 5505,
              type: WidthType.DXA,
            },
            children: [new Paragraph(turnoverDetails?.prior_previousYear?.['Permanent Employees']?.Female?.toString() || ' ')],
          }),
          new TableCell({
            width: {
              size: 5505,
              type: WidthType.DXA,
            },
            children: [new Paragraph(turnoverDetails?.prior_previousYear?.['Permanent Employees']?.Total?.toString() || ' ')],
          }),
        ],
      }),
      new TableRow({
        children: [
          new TableCell({
            width: {
              size: 5505,
              type: WidthType.DXA,
            },
            children: [new Paragraph(' Permanent Workers ')],
          }),
          new TableCell({
            width: {
              size: 5505,
              type: WidthType.DXA,
            },
            children: [new Paragraph(turnoverDetails?.currentYear?.['Permanent Workers']?.Male?.toString() || ' ')],
          }),
          new TableCell({
            width: {
              size: 5505,
              type: WidthType.DXA,
            },
            children: [new Paragraph(turnoverDetails?.currentYear?.['Permanent Workers']?.Female?.toString() || ' ')],
          }),
          new TableCell({
            width: {
              size: 5505,
              type: WidthType.DXA,
            },
            children: [new Paragraph(turnoverDetails?.currentYear?.['Permanent Workers']?.Total?.toString() || ' ')],
          }),
          new TableCell({
            width: {
              size: 5505,
              type: WidthType.DXA,
            },
            children: [new Paragraph(turnoverDetails?.previousYear?.['Permanent Workers']?.Male?.toString() || ' ')],
          }),
          new TableCell({
            width: {
              size: 5505,
              type: WidthType.DXA,
            },
            children: [new Paragraph(turnoverDetails?.previousYear?.['Permanent Workers']?.Female?.toString() || ' ')],
          }),
          new TableCell({
            width: {
              size: 5505,
              type: WidthType.DXA,
            },
            children: [new Paragraph(turnoverDetails?.previousYear?.['Permanent Workers']?.Total?.toString() || ' ')],
          }),
          new TableCell({
            width: {
              size: 5505,
              type: WidthType.DXA,
            },
            children: [new Paragraph(turnoverDetails?.prior_previousYear?.['Permanent Workers']?.Male?.toString() || ' ')],
          }),
          new TableCell({
            width: {
              size: 5505,
              type: WidthType.DXA,
            },
            children: [new Paragraph(turnoverDetails?.prior_previousYear?.['Permanent Workers']?.Female?.toString() || ' ')],
          }),
          new TableCell({
            width: {
              size: 5505,
              type: WidthType.DXA,
            },
            children: [new Paragraph(turnoverDetails?.prior_previousYear?.['Permanent Workers']?.Total?.toString() || ' ')],
          }),
        ],
      }),
    ],
  });
};

module.exports = { question_22, table_question_22 };
