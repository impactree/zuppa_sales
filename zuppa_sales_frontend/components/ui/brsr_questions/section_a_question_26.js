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

const question_26 = () => new Paragraph({
  children: [
    new TextRun({
      text: '  26. Overview of the entity’s material responsible business conduct issues ',
      break: 2,
    }),
    new TextRun({
      text: ' Please indicate material responsible business conduct and sustainability issues pertaining to  environmental and social matters that present a risk or an opportunity to your business,  rationale for identifying the same, approach to adapt or mitigate the risk along-with its  financial implications, as per the following format',
      break: 2,
    }),
  ],
});

const table_question_26 = () => new Table({
  rows: [
    new TableRow({
      children: [
        new TableCell({
          width: {
            size: 5505,
            type: WidthType.DXA,
          },
          children: [new Paragraph(' S.No ')],
        }),
        new TableCell({
          width: {
            size: 5505,
            type: WidthType.DXA,
          },
          children: [new Paragraph(' Material issue identified ')],
        }),
        new TableCell({
          width: {
            size: 5505,
            type: WidthType.DXA,
          },
          children: [
            new Paragraph(' Indicate whether risk or opportunity (R/O) '),
          ],
        }),
        new TableCell({
          width: {
            size: 5505,
            type: WidthType.DXA,
          },
          children: [
            new Paragraph(
              ' Rationale for  identifying the risk /  opportunity ',
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
              ' In case of  risk, approach to  adapt or  mitigate',
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
              ' Financial implications  of the risk or  opportunity (Indicate positive or  negative implications ',
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

module.exports = { question_26, table_question_26 };
