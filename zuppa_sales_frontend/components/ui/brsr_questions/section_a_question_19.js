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

const question_19_a = () => new Paragraph({
  children: [
    new TextRun({
      text: ' 19. Markets served by the entity: ',
      break: 2,
    }),
    new TextRun({
      text: ' a. Number of locations ',
      break: 2,
    }),
  ],
});

const question_19_b = () => new Paragraph({
  children: [
    new TextRun({
      text: ' b. What is the contribution of exports as a percentage of the total turnover of the entity?',
      break: 1,
    }),
    new TextRun({
      text: ' c. A brief on types of customers ',
      break: 2,
    }),
    new TextRun({
      text: ' IV. Employees',
      break: 2,
    }),
  ],
});

const table_question_19 = () => new Table({
  rows: [
    new TableRow({
      children: [
        new TableCell({
          width: {
            size: 5505,
            type: WidthType.DXA,
          },
          children: [new Paragraph({ text: ' Locations ' })],
        }),
        new TableCell({
          width: {
            size: 5505,
            type: WidthType.DXA,
          },
          children: [new Paragraph({ text: ' Number ' })],
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
          children: [new Paragraph({ text: ' National (No. of States) ' })],
        }),
        new TableCell({
          width: {
            size: 5505,
            type: WidthType.DXA,
          },
          children: [new Paragraph({ text: '  ' })],
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
          children: [
            new Paragraph({ text: 'International (No. of Countries) ' }),
          ],
        }),
        new TableCell({
          width: {
            size: 5505,
            type: WidthType.DXA,
          },
          children: [new Paragraph({ text: '  ' })],
        }),
      ],
    }),
  ],
});

module.exports = { question_19_a, question_19_b, table_question_19 };
