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
//   const dataSet = require("../models/hrGeneralData");

const principle_8 = () => new Paragraph({
  children: [
    new TextRun({
      text: 'PRINCIPLE 8 Businesses should promote inclusive growth and  equitable development ',
      bold: true,
      break: 2,
    }),
    new TextRun({
      text: 'Essential Indicators',
      bold: true,
      break: 2,
    }),
  ],
});

const questionSocialImpactAssessments = () => new Paragraph({
  text: '2. Provide details of corrective action taken or underway on any issues related to anti competitive conduct by the entity, based on adverse orders from regulatory authorities.   ',
  spacing: { before: 200, after: 200 },
});

const tableSocialImpactAssessments = () => new Table({
  width: {
    size: 100,
    type: WidthType.PERCENTAGE,
  },
  rows: [
    new TableRow({
      children: [
        new TableCell({
          children: [new Paragraph('Name and brief details of project')],
        }),
        new TableCell({
          children: [new Paragraph('SIA Notification No.')],
        }),
        new TableCell({
          children: [new Paragraph('Date of notification')],
        }),
        new TableCell({
          children: [
            new Paragraph(
              'Whether conducted by independent external agency (Yes / No)',
            ),
          ],
        }),
        new TableCell({
          children: [
            new Paragraph('Results communicated in public domain (Yes / No)'),
          ],
        }),
        new TableCell({
          children: [new Paragraph('Relevant Web link')],
        }),
      ],
    }),

    new TableRow({
      children: [
        new TableCell({
          children: [new Paragraph('')],
        }),
        new TableCell({
          children: [new Paragraph('')],
        }),
        new TableCell({
          children: [new Paragraph('')],
        }),
        new TableCell({
          children: [new Paragraph('')],
        }),
        new TableCell({
          children: [new Paragraph('')],
        }),
        new TableCell({
          children: [new Paragraph('')],
        }),
      ],
    }),
  ],
});

const questionRehabilitationAndResettlement = () => new Paragraph({
  text: '2. Provide details of corrective action taken or underway on any issues related to anti competitive conduct by the entity, based on adverse orders from regulatory authorities.   ',
  spacing: { before: 200, after: 200 },
});

const tableRehabilitationAndResettlement = () => new Table({
  width: {
    size: 100,
    type: WidthType.PERCENTAGE,
  },
  rows: [
    new TableRow({
      children: [
        new TableCell({
          children: [new Paragraph('S. No.')],
        }),
        new TableCell({
          children: [new Paragraph('Name of Project')],
        }),
        new TableCell({
          children: [new Paragraph('State')],
        }),
        new TableCell({
          children: [new Paragraph('District')],
        }),
        new TableCell({
          children: [
            new Paragraph('No. of Project Affected Families (PAFs)'),
          ],
        }),
        new TableCell({
          children: [new Paragraph('% of PAFs covered by R&R')],
        }),
        new TableCell({
          children: [
            new Paragraph('Amounts paid to PAFs in the FY (In INR)'),
          ],
        }),
      ],
    }),

    new TableRow({
      children: [
        new TableCell({
          children: [new Paragraph('')],
        }),
        new TableCell({
          children: [new Paragraph('')],
        }),
        new TableCell({
          children: [new Paragraph('')],
        }),
        new TableCell({
          children: [new Paragraph('')],
        }),
        new TableCell({
          children: [new Paragraph('')],
        }),
        new TableCell({
          children: [new Paragraph('')],
        }),
        new TableCell({
          children: [new Paragraph('')],
        }),
      ],
    }),
  ],
});

const questionGrievanceCommunity = () => new Paragraph({
  text: '3. Describe the mechanisms to receive and redress grievances of the community.  ',
  spacing: { before: 200, after: 200 },
});

const questionInputMaterials = () => new Paragraph({
  text: '4. Percentage of input material (inputs to total inputs by value) sourced from suppliers: ',
  spacing: { before: 200, after: 200 },
});

const tableInputMaterials = () => new Table({
  width: {
    size: 100,
    type: WidthType.PERCENTAGE,
  },
  rows: [
    new TableRow({
      children: [
        new TableCell({
          children: [new Paragraph('')],
        }),
        new TableCell({
          children: [new Paragraph('FY _____ (Current Financial Year)')],
        }),
        new TableCell({
          children: [new Paragraph('FY _____ (Previous Financial Year)')],
        }),
      ],
    }),

    new TableRow({
      children: [
        new TableCell({
          children: [
            new Paragraph('Directly sourced from MSMEs/ small producers'),
          ],
        }),
        new TableCell({
          children: [new Paragraph('')],
        }),
        new TableCell({
          children: [new Paragraph('')],
        }),
      ],
    }),
    new TableRow({
      children: [
        new TableCell({
          children: [new Paragraph('Directly from within India')],
        }),
        new TableCell({
          children: [new Paragraph('')],
        }),
        new TableCell({
          children: [new Paragraph('')],
        }),
      ],
    }),
  ],
});

const questionJobCreation = () => new Paragraph({
  text: '5. Job creation in smaller towns – Disclose wages paid to persons employed (including  employees or workers employed on a permanent or non-permanent / on contract basis)  in the following locations, as % of total wage cost  ',
  spacing: { before: 200, after: 200 },
});

const tableJobCreation = async (obj) => {
  // const res = await axios.get("http://localhost:5000/report-template/download?report_name=BRSR&financial_year=2024&financial_quarter=q4");
  const data = obj?.wagesPaidtoPersons;
  return new Table({
    width: {
      size: 100,
      type: WidthType.PERCENTAGE,
    },
    rows: [
      new TableRow({
        children: [
          new TableCell({
            children: [new Paragraph('Location')],
          }),
          new TableCell({
            children: [new Paragraph('FY _____ (Current Financial Year)')],
          }),
          new TableCell({
            children: [new Paragraph('FY _____ (Previous Financial Year)')],
          }),
        ],
      }),

      new TableRow({
        children: [
          new TableCell({
            children: [new Paragraph('Rural')],
          }),
          new TableCell({
            children: [
              new Paragraph(
                data?.currentYear?.Rural?.['Total wage cost']?.toString() || ' ',
              ),
            ],
          }),
          new TableCell({
            children: [
              new Paragraph(
                data?.previousYear?.Rural?.['Total wage cost']?.toString()
                  || ' ',
              ),
            ],
          }),
        ],
      }),

      new TableRow({
        children: [
          new TableCell({
            children: [new Paragraph('Semi-urban')],
          }),
          new TableCell({
            children: [
              new Paragraph(
                data?.currentYear?.['Semi-Urban']?.[
                  'Total wage cost'
                ]?.toString() || ' ',
              ),
            ],
          }),
          new TableCell({
            children: [
              new Paragraph(
                data?.currentYear?.['Semi-Urban']?.[
                  'Total wage cost'
                ]?.toString() || ' ',
              ),
            ],
          }),
        ],
      }),

      new TableRow({
        children: [
          new TableCell({
            children: [new Paragraph('Urban')],
          }),
          new TableCell({
            children: [
              new Paragraph(
                data?.currentYear?.Urban?.['Total wage cost']?.toString() || ' ',
              ),
            ],
          }),
          new TableCell({
            children: [
              new Paragraph(
                data?.currentYear?.Urban?.['Total wage cost']?.toString() || ' ',
              ),
            ],
          }),
        ],
      }),

      new TableRow({
        children: [
          new TableCell({
            children: [new Paragraph('Metropolitan')],
          }),
          new TableCell({
            children: [
              new Paragraph(
                data?.currentYear?.Metropolitan?.[
                  'Total wage cost'
                ]?.toString() || ' ',
              ),
            ],
          }),
          new TableCell({
            children: [
              new Paragraph(
                data?.currentYear?.Metropolitann?.[
                  'Total wage cost'
                ]?.toString() || ' ',
              ),
            ],
          }),
        ],
      }),
    ],
  });
};

const p8_leadership_indicators = () => new Paragraph({
  children: [
    new TextRun({
      text: 'Leadership Indicators ',
      bold: true,
      break: 2,
    }),
  ],
});

const questionMitigateSocialImpacts = () => new Paragraph({
  text: '5. Job creation in smaller towns – Disclose wages paid to persons employed (including  employees or workers employed on a permanent or non-permanent / on contract basis)  in the following locations, as % of total wage cost  ',
  spacing: { before: 200, after: 200 },
});

const tableMitigateSocialImpacts = () => new Table({
  width: {
    size: 100,
    type: WidthType.PERCENTAGE,
  },
  rows: [
    new TableRow({
      children: [
        new TableCell({
          children: [
            new Paragraph('Details of negative social impact identified'),
          ],
        }),
        new TableCell({
          children: [new Paragraph('Corrective action taken')],
        }),
      ],
    }),

    new TableRow({
      children: [
        new TableCell({
          children: [new Paragraph('')],
        }),
        new TableCell({
          children: [new Paragraph('')],
        }),
      ],
    }),
  ],
});

const questionCSRProjects = () => new Paragraph({
  text: '5. Job creation in smaller towns – Disclose wages paid to persons employed (including  employees or workers employed on a permanent or non-permanent / on contract basis)  in the following locations, as % of total wage cost  ',
  spacing: { before: 200, after: 200 },
});

const tableCSRProjects = () => new Table({
  width: {
    size: 100,
    type: WidthType.PERCENTAGE,
  },
  rows: [
    new TableRow({
      children: [
        new TableCell({
          children: [new Paragraph('S. No.')],
        }),
        new TableCell({
          children: [new Paragraph('State')],
        }),
        new TableCell({
          children: [new Paragraph('Aspirational District')],
        }),
        new TableCell({
          children: [new Paragraph('Amount spent (In INR)')],
        }),
      ],
    }),

    new TableRow({
      children: [
        new TableCell({
          children: [new Paragraph('')],
        }),
        new TableCell({
          children: [new Paragraph('')],
        }),
        new TableCell({
          children: [new Paragraph('')],
        }),
        new TableCell({
          children: [new Paragraph('')],
        }),
      ],
    }),
  ],
});

const questionPreferentialProcurementPolicy = () => new Paragraph({
  children: [
    new TextRun({
      text: '3. (a) Do you have a preferential procurement policy where you give preference to purchase from suppliers comprising marginalized /vulnerable groups? (Yes/No)',
      break: 2,
    }),
    new TextRun({
      text: '(b) From which marginalized /vulnerable groups do you procure?',
      break: 2,
    }),
    new TextRun({
      text: '(c) What percentage of total procurement (by value) does it constitute?',
      break: 2,
    }),
  ],
  spacing: { before: 200, after: 200 },
});

const questionIntellectualProperties = () => new Paragraph({
  text: '4. Details of the benefits derived and shared from the intellectual properties owned or acquired by your entity (in the current financial year), based on traditional knowledge:',
  spacing: { before: 200, after: 200 },
});

const tableIntellectualProperties = () => new Table({
  width: {
    size: 100,
    type: WidthType.PERCENTAGE,
  },
  rows: [
    new TableRow({
      children: [
        new TableCell({
          children: [new Paragraph('S. No.')],
        }),
        new TableCell({
          children: [
            new Paragraph(
              'Intellectual Property based on traditional knowledge',
            ),
          ],
        }),
        new TableCell({
          children: [new Paragraph('Owned/Acquired (Yes/No)')],
        }),
        new TableCell({
          children: [new Paragraph('Benefit shared (Yes/No)')],
        }),
        new TableCell({
          children: [new Paragraph('Basis of calculating benefit share')],
        }),
      ],
    }),

    new TableRow({
      children: [
        new TableCell({
          children: [new Paragraph('')],
        }),
        new TableCell({
          children: [new Paragraph('')],
        }),
        new TableCell({
          children: [new Paragraph('')],
        }),
        new TableCell({
          children: [new Paragraph('')],
        }),
        new TableCell({
          children: [new Paragraph('')],
        }),
      ],
    }),
    new TableRow({
      children: [
        new TableCell({
          children: [new Paragraph('')],
        }),
        new TableCell({
          children: [new Paragraph('')],
        }),
        new TableCell({
          children: [new Paragraph('')],
        }),
        new TableCell({
          children: [new Paragraph('')],
        }),
        new TableCell({
          children: [new Paragraph('')],
        }),
      ],
    }),
  ],
});

const questionCorrectiveActionsIPDisputes = () => new Paragraph({
  text: '5. Details of corrective actions taken or underway, based on any adverse order in  intellectual property related disputes wherein usage of traditional knowledge is involved.',
  spacing: { before: 200, after: 200 },
});

const tableCorrectiveActionsIPDisputes = () => new Table({
  width: {
    size: 100,
    type: WidthType.PERCENTAGE,
  },
  rows: [
    new TableRow({
      children: [
        new TableCell({
          children: [new Paragraph('Name of authority')],
        }),
        new TableCell({
          children: [new Paragraph('Brief of the Case')],
        }),
        new TableCell({
          children: [new Paragraph('Corrective action taken')],
        }),
      ],
    }),

    new TableRow({
      children: [
        new TableCell({
          children: [new Paragraph('')],
        }),
        new TableCell({
          children: [new Paragraph('')],
        }),
        new TableCell({
          children: [new Paragraph('')],
        }),
      ],
    }),
    new TableRow({
      children: [
        new TableCell({
          children: [new Paragraph('')],
        }),
        new TableCell({
          children: [new Paragraph('')],
        }),
        new TableCell({
          children: [new Paragraph('')],
        }),
      ],
    }),
  ],
});

const questionCSRProjectBeneficiaries = () => new Paragraph({
  text: '6. Details of beneficiaries of CSR Projects:',
  spacing: { before: 200, after: 200 },
});

const tableCSRProjectBeneficiaries = () => new Table({
  width: {
    size: 100,
    type: WidthType.PERCENTAGE,
  },
  rows: [
    new TableRow({
      children: [
        new TableCell({
          children: [new Paragraph('S. No.')],
        }),
        new TableCell({
          children: [new Paragraph('CSR Project')],
        }),
        new TableCell({
          children: [
            new Paragraph('No. of persons benefitted from CSR Projects'),
          ],
        }),
        new TableCell({
          children: [
            new Paragraph(
              '% of beneficiaries from vulnerable and marginalized groups',
            ),
          ],
        }),
      ],
    }),

    new TableRow({
      children: [
        new TableCell({
          children: [new Paragraph('')],
        }),
        new TableCell({
          children: [new Paragraph('')],
        }),
        new TableCell({
          children: [new Paragraph('')],
        }),
        new TableCell({
          children: [new Paragraph('')],
        }),
      ],
    }),
    new TableRow({
      children: [
        new TableCell({
          children: [new Paragraph('')],
        }),
        new TableCell({
          children: [new Paragraph('')],
        }),
        new TableCell({
          children: [new Paragraph('')],
        }),
        new TableCell({
          children: [new Paragraph('')],
        }),
      ],
    }),
  ],
});

module.exports = {
  principle_8,
  questionSocialImpactAssessments,
  tableSocialImpactAssessments,
  questionRehabilitationAndResettlement,
  tableRehabilitationAndResettlement,
  questionGrievanceCommunity,
  questionInputMaterials,
  tableInputMaterials,
  p8_leadership_indicators,
  questionJobCreation,
  tableJobCreation,
  questionMitigateSocialImpacts,
  tableMitigateSocialImpacts,
  questionCSRProjects,
  tableCSRProjects,
  questionPreferentialProcurementPolicy,
  questionIntellectualProperties,
  tableIntellectualProperties,
  questionCorrectiveActionsIPDisputes,
  tableCorrectiveActionsIPDisputes,
  questionCSRProjectBeneficiaries,
  tableCSRProjectBeneficiaries,
};
