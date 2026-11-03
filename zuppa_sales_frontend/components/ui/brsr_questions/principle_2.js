/* eslint-disable camelcase */
/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable max-len */
/* eslint-disable operator-linebreak */
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
// const procurementDataSet = require("../models/procurementData");

// const fetchReportData = async (obj) => {
//   // const res = await axios.get("http://localhost:5000/report-template/download?report_name=BRSR&financial_year=2024&financial_quarter=q4");
//   const sustainableSourcing =
//     obj.materialSourcing.currentYear["Sustainable Sourcing"];
//   return sustainableSourcing;
// };

const principle_2 = () => new Paragraph({
  children: [
    new TextRun({
      text: 'PRINCIPLE 2 Businesses should provide goods and services in a  manner that is sustainable and safe ',
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

const p2_question_1 = () => new Paragraph({
  text: '1. Percentage of R&D and capital expenditure (capex) investments in specific technologies  to improve the environmental and social impacts of product and processes to total R&D and capex investments made by the entity, respectively. ',
});

const p2_table_question1 = () => new Table({
  rows: [
    new TableRow({
      children: [
        new TableCell({
          width: {
            size: 5505,
            type: WidthType.DXA,
          },
          children: [new Paragraph('')],
        }),
        new TableCell({
          width: {
            size: 5505,
            type: WidthType.DXA,
          },
          children: [new Paragraph(' Current Financial Year')],
        }),
        new TableCell({
          width: {
            size: 5505,
            type: WidthType.DXA,
          },
          children: [new Paragraph('Previous Financial Year')],
        }),
        new TableCell({
          width: {
            size: 5505,
            type: WidthType.DXA,
          },
          children: [
            new Paragraph(
              ' Details of improvements in environmental and social impacts',
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
          children: [new Paragraph(' R&D ')],
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
    new TableRow({
      children: [
        new TableCell({
          width: {
            size: 5505,
            type: WidthType.DXA,
          },
          children: [new Paragraph(' Capex ')],
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
// const p2_question_2 = async (obj) =>
//   // const sustainableSourcing = obj.materialSourcing.currentYear["Sustainable Sourcing"];  // console.log(sustainableData.sustainableSourcing);
//   new Paragraph({
//     text: '2. a. Does the entity have procedures in place for sustainable sourcing? (Yes/No) b. If yes, what percentage of inputs were sourced sustainably?',
//     // ${sustainableData.sustainableSourcing["Does the company have a policy for sustainable sourcing"]}`,
//   });
const p2_question_2 = async (obj) => new Paragraph({
  text: '2. a. Does the entity have procedures in place for sustainable sourcing? (Yes/No) b. If yes, what percentage of inputs were sourced sustainably?',
});
const p2_question_2_answer = async (obj) => {
  const sustainableSourcing = obj?.materialSourcing?.currentYear['Sustainable Sourcing'];
  return new Paragraph({
    text: '',
    // sustainableData?.sustainableSourcing["Percentage of inputs sourced sustainably"],
  });
};

const p2_question_3 = () => new Paragraph({
  text: '3. Describe the processes in place to safely reclaim your products for reusing, recycling and  disposing at the end of life, for (a) Plastics (including packaging) (b) E-waste (c)  Hazardous waste and (d) other waste. ',
});

const p2_question_4 = () => new Paragraph({
  text: '4. Whether Extended Producer Responsibility (EPR) is applicable to the entity’s activities  (Yes / No). If yes, whether the waste collection plan is in line with the Extended Producer  Responsibility (EPR) plan submitted to Pollution Control Boards? If not, provide steps  taken to address the same.',
});

const p2_leadership_indicators = () => new Paragraph({
  children: [
    new TextRun({
      text: 'Leadership Indicators ',
      bold: true,
      break: 2,
    }),
    new TextRun({
      text: '1. Has the entity conducted Life Cycle Perspective / Assessments (LCA) for any of its  products (for manufacturing industry) or for its services (for service industry)? If yes,  provide details in the following format? ',
      break: 2,
    }),
  ],
});

const p2_leadership_question1 = () => new Table({
  rows: [
    new TableRow({
      children: [
        new TableCell({
          width: {
            size: 5505,
            type: WidthType.DXA,
          },
          children: [new Paragraph(' NIC Code ')],
        }),
        new TableCell({
          width: {
            size: 5505,
            type: WidthType.DXA,
          },
          children: [new Paragraph(' Name of Product/Service')],
        }),
        new TableCell({
          width: {
            size: 5505,
            type: WidthType.DXA,
          },
          children: [new Paragraph(' % of total Turnover contributed ')],
        }),
        new TableCell({
          width: {
            size: 5505,
            type: WidthType.DXA,
          },
          children: [
            new Paragraph(
              ' Boundary for which the Life Cycle Perspective / Assessment was conducted ',
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
              ' Whether conducted by independent external agency (Yes/No)',
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
              ' Results communicated in public domain (Yes/No) If yes, provide the web-link. ',
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

const p1_leadership_question2 = () => new Paragraph({
  text: '2. If there are any significant social or environmental concerns and/or risks arising from production or disposal of your products / services, as identified in the Life Cycle Perspective / Assessments (LCA) or through any other means, briefly describe the same along-with action taken to mitigate the same.',
});

const p2_leadership_q1_table = () => new Table({
  rows: [
    new TableRow({
      children: [
        new TableCell({
          width: {
            size: 5505,
            type: WidthType.DXA,
          },
          children: [new Paragraph(' Name of Product / Service ')],
        }),
        new TableCell({
          width: {
            size: 5505,
            type: WidthType.DXA,
          },
          children: [new Paragraph(' Description of the risk / concern')],
        }),
        new TableCell({
          width: {
            size: 5505,
            type: WidthType.DXA,
          },
          children: [new Paragraph(' Action Taken ')],
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
      ],
    }),
  ],
});

const p1_leadership_question3 = () => new Paragraph({
  text: '3. Percentage of recycled or reused input material to total material (by value) used in production (for manufacturing industry) or providing services (for service industry).',
});

const p2_leadership_q3_table = () => new Table({
  rows: [
    new TableRow({
      children: [
        new TableCell({
          width: {
            size: 5505,
            type: WidthType.DXA,
          },
          children: [new Paragraph(' Indicate input material ')],
          rowSpan: 2,
        }),
        new TableCell({
          width: {
            size: 5505,
            type: WidthType.DXA,
          },
          children: [
            new Paragraph(
              ' Recycled or re-used input material to total material',
            ),
          ],
          columnSpan: 2,
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
          children: [new Paragraph('  FY _____ Current Financial Year')],
        }),
        new TableCell({
          width: {
            size: 5505,
            type: WidthType.DXA,
          },
          children: [new Paragraph(' FY _____ Previous Financial Year ')],
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
          children: [new Paragraph(' ')],
        }),
        new TableCell({
          width: {
            size: 5505,
            type: WidthType.DXA,
          },
          children: [new Paragraph(' ')],
        }),
        new TableCell({
          width: {
            size: 5505,
            type: WidthType.DXA,
          },
          children: [new Paragraph(' ')],
        }),
      ],
    }),
  ],
});

const p1_leadership_question4 = () => new Paragraph({
  text: '4. Of the products and packaging reclaimed at end of life of products, amount (in metric  tonnes) reused, recycled, and safely disposed, as per the following format: ',
});

const p2_leadership_q4_table = () => new Table({
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
          children: [new Paragraph(' FY_____  (Current FY )')],
          columnSpan: 3,
        }),
        new TableCell({
          width: {
            size: 5505,
            type: WidthType.DXA,
          },
          children: [new Paragraph(' FY_____  (Previous FY )')],
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
          children: [new Paragraph('Re-Used  ')],
        }),
        new TableCell({
          width: {
            size: 5505,
            type: WidthType.DXA,
          },
          children: [new Paragraph(' Recycled')],
        }),
        new TableCell({
          width: {
            size: 5505,
            type: WidthType.DXA,
          },
          children: [new Paragraph('  Safely  ')],
        }),
        new TableCell({
          width: {
            size: 5505,
            type: WidthType.DXA,
          },
          children: [new Paragraph('Re-Used  ')],
        }),
        new TableCell({
          width: {
            size: 5505,
            type: WidthType.DXA,
          },
          children: [new Paragraph(' Recycled')],
        }),
        new TableCell({
          width: {
            size: 5505,
            type: WidthType.DXA,
          },
          children: [new Paragraph('  Safely  ')],
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
          children: [new Paragraph(' Plastics (including  packaging) ')],
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
        new TableCell({
          width: {
            size: 5505,
            type: WidthType.DXA,
          },
          children: [new Paragraph('  ')],
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
          children: [new Paragraph(' E-waste  ')],
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
        new TableCell({
          width: {
            size: 5505,
            type: WidthType.DXA,
          },
          children: [new Paragraph('  ')],
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
          children: [new Paragraph(' Hazardous waste ')],
        }),
        new TableCell({
          width: {
            size: 5505,
            type: WidthType.DXA,
          },
          children: [new Paragraph(' ')],
        }),
        new TableCell({
          width: {
            size: 5505,
            type: WidthType.DXA,
          },
          children: [new Paragraph(' ')],
        }),
        new TableCell({
          width: {
            size: 5505,
            type: WidthType.DXA,
          },
          children: [new Paragraph('   ')],
        }),
        new TableCell({
          width: {
            size: 5505,
            type: WidthType.DXA,
          },
          children: [new Paragraph('   ')],
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
    new TableRow({
      children: [
        new TableCell({
          width: {
            size: 5505,
            type: WidthType.DXA,
          },
          children: [new Paragraph(' Other waste ')],
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
          children: [new Paragraph(' ')],
        }),
        new TableCell({
          width: {
            size: 5505,
            type: WidthType.DXA,
          },
          children: [new Paragraph('   ')],
        }),
        new TableCell({
          width: {
            size: 5505,
            type: WidthType.DXA,
          },
          children: [new Paragraph('   ')],
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

const p2_leadership_question5 = () => new Paragraph({
  text: '5. Reclaimed products and their packaging materials (as percentage of products sold) for  each product category.',
  spacing: { after: 200 },
});

const tableReclaimedProducts = () => new Table({
  rows: [
    new TableRow({
      children: [
        new TableCell({
          width: {
            size: 3505,
            type: WidthType.DXA,
          },
          children: [new Paragraph('Indicate product category')],
        }),
        new TableCell({
          width: {
            size: 5505,
            type: WidthType.DXA,
          },
          children: [
            new Paragraph(
              'Reclaimed products and their packaging materials as % of total products sold in respective category',
            ),
          ],
        }),
      ],
    }),

    new TableRow({
      children: [
        new TableCell({
          width: {
            size: 3505,
            type: WidthType.DXA,
          },
          children: [new Paragraph('')],
        }),
        new TableCell({
          width: {
            size: 5505,
            type: WidthType.DXA,
          },
          children: [new Paragraph('')],
        }),
      ],
    }),
  ],
});

module.exports = {
  principle_2,
  p2_question_1,
  p2_table_question1,
  p2_question_2,
  p2_question_3,
  p2_question_4,
  p2_leadership_indicators,
  p2_leadership_question1,
  p1_leadership_question2,
  p2_leadership_q1_table,
  p1_leadership_question3,
  p2_leadership_q3_table,
  p1_leadership_question4,
  p2_leadership_q4_table,
  p2_leadership_question5,
  tableReclaimedProducts,
  p2_question_2_answer,
};
