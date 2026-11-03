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

const question_21 = () => new Paragraph({
  text: ' 21. Participation/Inclusion/Representation of women ',
  spacing: {
    before: 200,
    after: 200,
  },
});
const table_question_21 = async (obj) => {
  // const res = await axios.get("http://localhost:5000/report-template/download?report_name=BRSR&financial_year=2024&financial_quarter=q4");
  const participation = obj?.participation?.[0];

  const headerBOD = new TableRow({
    children: [
      new TableCell({
        width: {
          size: 5505,
          type: WidthType.DXA,
        },
        children: [new Paragraph('   ')],
        rowSpan: 2,
      }),
      new TableCell({
        width: {
          size: 5505,
          type: WidthType.DXA,
        },
        children: [new Paragraph('Total(A) ')],
        rowSpan: 2,
      }),
      new TableCell({
        width: {
          size: 5505,
          type: WidthType.DXA,
        },
        children: [new Paragraph('No. of percentage of females')],
        columnSpan: 2,
      }),
    ],
  });

  const rowsHeader2 = new TableRow({
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
    ],
  });

  const rowsBOD = new TableRow({
    children: [
      new TableCell({
        width: { size: 5505, type: WidthType.DXA },
        children: [new Paragraph('Board of Directors')],
      }),
      new TableCell({
        width: { size: 5505, type: WidthType.DXA },
        children: [new Paragraph(participation?.totalBod?.toString() || ' ')],
      }),
      new TableCell({
        width: { size: 5505, type: WidthType.DXA },
        children: [
          new Paragraph(participation?.totalBodFemale?.toString() || ' '),
        ],
      }),
      new TableCell({
        width: { size: 5505, type: WidthType.DXA },
        children: [
          new Paragraph(participation?.percentageFemaleBod?.toString() || ' '),
        ],
      }),
    ],
  });

  const rowsKMP = new TableRow({
    children: [
      new TableCell({
        width: { size: 5505, type: WidthType.DXA },
        children: [new Paragraph('Key Management Personnel')],
      }),
      new TableCell({
        width: { size: 5505, type: WidthType.DXA },
        children: [new Paragraph(participation?.totalKmp?.toString() || ' ')],
      }),
      new TableCell({
        width: { size: 5505, type: WidthType.DXA },
        children: [
          new Paragraph(participation?.totalKmpFemale?.toString() || ' '),
        ],
      }),
      new TableCell({
        width: { size: 5505, type: WidthType.DXA },
        children: [
          new Paragraph(participation?.percentageFemaleKmp?.toString() || ' '),
        ],
      }),
    ],
  });

  // const table_question_21 = () => {
  return new Table({
    rows: [headerBOD, rowsHeader2, rowsBOD, rowsKMP],
  });
};

module.exports = { question_21, table_question_21 };
