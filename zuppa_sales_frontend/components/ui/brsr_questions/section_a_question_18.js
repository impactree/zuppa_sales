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

// Function to fetch product info
const fetchOpsInfo = async (obj) => {
  try {
    // const res = await axios.get(
    //   "http://localhost:5000/report-template/download?report_name=BRSR&financial_year=2024&financial_quarter=q4"
    // );
    const companyInfo = obj.companyInfo?.[0].response;
    return companyInfo?.operations || []; // Return the products array
  } catch (error) {
    console.error('Error fetching product info:', error);
    return []; // Fallback to empty array
  }
};

// Function to create a paragraph for question 18
const question_18 = () => new Paragraph({
  text: '18. Number of locations where plants and/or operations/offices of the entity are situated: ',
  spacing: {
    before: 200,
    after: 200,
  },
});

// Function to create the table for question 18
const table_question_18 = async (obj) => {
  const operationsData = await fetchOpsInfo(obj);
  // const operationsData = dataSet[0].response.operations

  // Define the header row for the table
  const operationsHeaderRow = new TableRow({
    children: [
      new TableCell({
        width: {
          size: 5505,
          type: WidthType.DXA,
        },
        children: [new Paragraph('Location')],
      }),
      new TableCell({
        width: {
          size: 5505,
          type: WidthType.DXA,
        },
        children: [new Paragraph('Number of Plants')],
      }),
      new TableCell({
        width: {
          size: 5505,
          type: WidthType.DXA,
        },
        children: [new Paragraph('Number of Offices')],
      }),
      new TableCell({
        width: {
          size: 5505,
          type: WidthType.DXA,
        },
        children: [new Paragraph('Total')],
      }),
    ],
  });

  // Define rows for operations data
  const operationsColumn = new TableRow({
    children: [
      new TableCell({
        width: {
          size: 5505,
          type: WidthType.DXA,
        },
        children: [new Paragraph('National')],
      }),
      new TableCell({
        width: {
          size: 5505,
          type: WidthType.DXA,
        },
        children: [new Paragraph(operationsData?.national_plants?.toString() || '')],
      }),
      new TableCell({
        width: {
          size: 5505,
          type: WidthType.DXA,
        },
        children: [new Paragraph(operationsData?.national_offices?.toString() || '')],
      }),
      new TableCell({
        width: {
          size: 5505,
          type: WidthType.DXA,
        },
        children: [new Paragraph(operationsData?.total_national_plants?.toString() || '')],
      }),
    ],
  });

  const operationsColumn2 = new TableRow({
    children: [
      new TableCell({
        width: {
          size: 5505,
          type: WidthType.DXA,
        },
        children: [new Paragraph('International')],
      }),
      new TableCell({
        width: {
          size: 5505,
          type: WidthType.DXA,
        },
        children: [new Paragraph(operationsData?.total_international_plants?.toString() || '')],
      }),
      new TableCell({
        width: {
          size: 5505,
          type: WidthType.DXA,
        },
        children: [new Paragraph(operationsData?.international_offices?.toString() || '')],
      }),
      new TableCell({
        width: {
          size: 5505,
          type: WidthType.DXA,
        },
        children: [new Paragraph(operationsData?.total_international_plants?.toString() || '')],
      }),
    ],
  });

  // Create and return the table
  return new Table({
    rows: [operationsHeaderRow, operationsColumn, operationsColumn2],
  });
};

// Export the functions
module.exports = { question_18, table_question_18 };
