/* eslint-disable camelcase */
/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-var-requires */
const {
  Paragraph,
  Table,
  TableCell,
  TableRow,
  WidthType,
} = require('docx');
// const fs = require("fs");
// const dataSet = require("../models/hrGeneralData");

const question_23 = () => new Paragraph({
  text: ' 23. (a) Names of holding / subsidiary / associate companies / joint ventures ',
  spacing: {
    before: 200,
    after: 200,
  },
});

const table_question_23 = () => new Table({
  rows: [
    new TableRow({
      children: [
        new TableCell({
          width: {
            size: 5505,
            type: WidthType.DXA,
          },
          children: [new Paragraph(' S.No.')],
        }),
        new TableCell({
          width: {
            size: 5505,
            type: WidthType.DXA,
          },
          children: [
            new Paragraph(
              ' Name of the holding / subsidiary /associate companies / Joint Venture  ',
            ),
          ],
        }),
        new TableCell({
          width: {
            size: 5505,
            type: WidthType.DXA,
          },
          children: [
            new Paragraph(
              ' Indicate whether  holding/ Subsidiary/  Associate/ Joint  Venture ',
            ),
          ],
        }),
        new TableCell({
          width: {
            size: 5505,
            type: WidthType.DXA,
          },
          children: [new Paragraph(' % of shares held by listed entity ')],
        }),
        new TableCell({
          width: {
            size: 5505,
            type: WidthType.DXA,
          },
          children: [
            new Paragraph(
              ' Does the entity indicated at  column A, participate in the  Business Responsibility  initiatives of the listed entity?  (Yes/No)  ',
            ),
          ],
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
          children: [new Paragraph('  ')],
        }),
        new TableCell({
          width: {
            size: 5505,
            type: WidthType.DXA,
          },
          children: [new Paragraph('  ')],
        }),
        new TableCell({
          width: {
            size: 5505,
            type: WidthType.DXA,
          },
          children: [new Paragraph('  ')],
        }),
        new TableCell({
          width: {
            size: 5505,
            type: WidthType.DXA,
          },
          children: [new Paragraph('  ')],
        }),
        new TableCell({
          width: {
            size: 5505,
            type: WidthType.DXA,
          },
          children: [new Paragraph('  ')],
        }),
      ],
    }),
  ],
});

module.exports = { question_23, table_question_23 };
