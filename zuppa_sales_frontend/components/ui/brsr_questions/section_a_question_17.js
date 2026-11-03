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

const fetchProductInfo = async (obj) => {
  try {
    // const res = await axios.get(
    //   "http://localhost:5000/report-template/download?report_name=BRSR&financial_year=2024&financial_quarter=q4"
    // );
    const companyInfo = obj?.companyInfo?.[0]?.response;
    return companyInfo?.products || []; // Return the products array
  } catch (error) {
    console.error('Error fetching product info:', error);
    return []; // Fallback to empty array
  }
};

const question_17 = () => new Paragraph({
  text: '17. Products/Services sold by the entity (accounting for 90% of the entity’s Turnover): ',
  spacing: {
    before: 200,
    after: 200,
  },
});

const table_question_17 = async (obj) => {
  const productData = await fetchProductInfo(obj);

  const productHeaderRow = new TableRow({
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
        children: [new Paragraph('Product/Service')],
      }),
      new TableCell({
        width: {
          size: 5505,
          type: WidthType.DXA,
        },
        children: [new Paragraph('NIC Code ')],
      }),
      new TableCell({
        width: {
          size: 5505,
          type: WidthType.DXA,
        },
        children: [new Paragraph('% of total Turnover contributed')],
      }),
    ],
  });

  const productRows = productData.map(
    (product, index) => new TableRow({
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
          children: [new Paragraph(product?.product_name?.toString() || '')],
        }),
        new TableCell({
          width: {
            size: 5505,
            type: WidthType.DXA,
          },
          children: [new Paragraph(product?.nic_code?.toString() || '')],
        }),
        new TableCell({
          width: {
            size: 5505,
            type: WidthType.DXA,
          },
          children: [new Paragraph(product?.product_turnover_percentage?.toString() || '')],
        }),
      ],
    }),
  );

  return new Table({
    columnWidths: [3505, 5505, 5505, 5505],
    rows: [productHeaderRow, ...productRows],
  });
};

module.exports = { question_17, table_question_17 };
