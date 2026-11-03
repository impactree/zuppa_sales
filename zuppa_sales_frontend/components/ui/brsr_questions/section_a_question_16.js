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

const fetchBusinessInfo = async (obj) => {
  try {
    const companyInfo = obj?.companyInfo?.[0]?.response;
    return companyInfo?.business || [];
  } catch (error) {
    console.error('Error fetching company info:', error);
    return []; // Fallback to empty array
  }
};

const question_16 = () => new Paragraph({
  text: '16. Details of business activities (accounting for 90% of the turnover): ',
  spacing: {
    after: 200,
  },
});

const table_question_16 = async (obj) => {
  const businessData = await fetchBusinessInfo(obj);

  const businessHeaderRow = new TableRow({
    children: [
      new TableCell({
        width: {
          size: 3505,
          type: WidthType.DXA,
        },
        children: [new Paragraph('S. No')],
      }),
      new TableCell({
        width: {
          size: 5505,
          type: WidthType.DXA,
        },
        children: [new Paragraph('Description of Main Activity')],
      }),
      new TableCell({
        width: {
          size: 5505,
          type: WidthType.DXA,
        },
        children: [new Paragraph('Description of Business Activity')],
      }),
      new TableCell({
        width: {
          size: 5505,
          type: WidthType.DXA,
        },
        children: [new Paragraph('% of Turnover of the entity')],
      }),
    ],
  });

  const businessRows = businessData.map(
    (business, index) => new TableRow({
      children: [
        new TableCell({
          width: {
            size: 3505,
            type: WidthType.DXA,
          },
          children: [new Paragraph(`${index + 1}`)],
        }),
        new TableCell({
          width: {
            size: 5505,
            type: WidthType.DXA,
          },
          children: [new Paragraph(business?.main_activity?.toString() || '')],
        }),
        new TableCell({
          width: {
            size: 5505,
            type: WidthType.DXA,
          },
          children: [new Paragraph(business?.business_activity?.toString() || '')],
        }),
        new TableCell({
          width: {
            size: 5505,
            type: WidthType.DXA,
          },
          children: [new Paragraph(business?.business_turnover_percentage?.toString() || '')],
        }),
      ],
    }),
  );

  return new Table({
    columnWidths: [3505, 5505, 5505, 5505],
    rows: [businessHeaderRow, ...businessRows],
  });
};

module.exports = { table_question_16, question_16 };
