/* eslint-disable camelcase */
/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable max-len */
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

const principle_5 = () => new Paragraph({
  children: [
    new TextRun({
      text: 'PRINCIPLE 5 Businesses should respect and promote human rights',
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

const questionHumanRightsTraining = () => new Paragraph({
  text: '1. Employees and workers who have been provided training on human rights issues and  policy(ies) of the entity, in the following format:    ',
  spacing: { before: 200, after: 200 },
});

const tableHumanRightsTraining = () => new Table({
  columnWidths: [2000, 1500, 1500, 2000, 1500, 1500, 1500, 1500, 1500],
  rows: [
    new TableRow({
      children: [
        new TableCell({
          children: [new Paragraph('Category')],
          rowSpan: 2,
        }),
        new TableCell({
          children: [new Paragraph('FY _____ Current Financial Year')],
          columnSpan: 3,
        }),
        new TableCell({
          children: [new Paragraph('FY _____ Previous Financial Year')],
          columnSpan: 3,
        }),
      ],
    }),
    new TableRow({
      children: [
        new TableCell({ children: [new Paragraph('Total (A)')] }),
        new TableCell({
          children: [
            new Paragraph('Total no. of employees/workers covered (B)'),
          ],
        }),
        new TableCell({ children: [new Paragraph('% (B / A)')] }),
        new TableCell({ children: [new Paragraph('Total (C)')] }),
        new TableCell({
          children: [
            new Paragraph('Total no. of employees/workers covered (D)'),
          ],
        }),
        new TableCell({ children: [new Paragraph('% (D / C)')] }),
      ],
    }),
    new TableRow({
      children: [
        new TableCell({
          children: [new Paragraph(' Employees ')],
          columnSpan: 7,
        }),
      ],
    }),
    new TableRow({
      children: [
        new TableCell({
          children: [new Paragraph('Male')],
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
    new TableRow({
      children: [
        new TableCell({
          children: [new Paragraph('Female')],
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
    new TableRow({
      children: [
        new TableCell({
          children: [new Paragraph('Total')],
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
    new TableRow({
      children: [
        new TableCell({
          children: [new Paragraph(' Workers ')],
          columnSpan: 7,
        }),
      ],
    }),
    new TableRow({
      children: [
        new TableCell({
          children: [new Paragraph('Male ')],
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
    new TableRow({
      children: [
        new TableCell({
          children: [new Paragraph('  Female ')],
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
    new TableRow({
      children: [
        new TableCell({
          children: [new Paragraph('Total Permanent Workers ')],
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

const questionMinimumWages = () => new Paragraph({
  text: '2. Details of minimum wages paid to employees and workers, in the following format:  ',
  spacing: { before: 200, after: 200 },
});

const tableMinimumWages = async (obj) => {
  // const res = await axios.get("http://localhost:5000/report-template/download?report_name=BRSR&financial_year=2024&financial_quarter=q4");
  const CYdata = obj?.minimumWages?.currentYear;
  const PYdata = obj?.minimumWages?.previousYear;
  return new Table({
    rows: [
      new TableRow({
        children: [
          new TableCell({ children: [new Paragraph('Category')], rowSpan: 3 }),
          new TableCell({
            children: [new Paragraph('FY _____ (Current Financial Year)')],
            columnSpan: 5,
          }),
          new TableCell({
            children: [new Paragraph('FY _____ (Previous Financial Year)')],
            columnSpan: 5,
          }),
        ],
      }),
      new TableRow({
        children: [
          new TableCell({ children: [new Paragraph('Total (A)')], rowSpan: 2 }),
          new TableCell({
            children: [new Paragraph('Equal to Minimum Wage (B)')],
            columnSpan: 2,
          }),
          new TableCell({
            children: [new Paragraph('More than Minimum Wage (C)')],
            columnSpan: 2,
          }),
          new TableCell({ children: [new Paragraph('Total (D)')], rowSpan: 2 }),
          new TableCell({
            children: [new Paragraph('Equal to Minimum Wage (E)')],
            columnSpan: 2,
          }),
          new TableCell({
            children: [new Paragraph('More than Minimum Wage (F)')],
            columnSpan: 2,
          }),
        ],
      }),
      new TableRow({
        children: [
          new TableCell({ children: [new Paragraph('No. (B)')] }),
          new TableCell({ children: [new Paragraph('% (B / A)')] }),
          new TableCell({ children: [new Paragraph('No. (C)')] }),
          new TableCell({ children: [new Paragraph('% (C / A)')] }),
          new TableCell({ children: [new Paragraph('No. (D)')] }),
          new TableCell({ children: [new Paragraph('% (E / D)')] }),
          new TableCell({ children: [new Paragraph('No. (F)')] }),
          new TableCell({ children: [new Paragraph('% (F / D)')] }),
        ],
      }),
      new TableRow({
        children: [
          new TableCell({
            children: [
              new Paragraph({ text: 'Employees', alignment: 'center' }),
            ],
            columnSpan: 11,
          }),
        ],
      }),
      new TableRow({
        children: [
          new TableCell({
            children: [new Paragraph('Permanent')],
          }),
          new TableCell({
            children: [
              new Paragraph(
                CYdata?.PermanentEmployees?.TotalEmployees?.toString() || ' ',
              ),
            ],
          }),
          new TableCell({
            children: [
              new Paragraph(
                CYdata?.PermanentEmployees?.TotalEqualToMin?.toString() || ' ',
              ),
            ],
          }),
          new TableCell({
            children: [
              new Paragraph(
                CYdata?.percentages?.EqualToMinPermanentEmployees?.toString()
                  || ' ',
              ),
            ],
          }),
          new TableCell({
            children: [
              new Paragraph(
                CYdata?.PermanentEmployees?.TotalMoreThanMin?.toString() || ' ',
              ),
            ],
          }),
          new TableCell({
            children: [
              new Paragraph(
                CYdata?.percentages?.MoreThanMinPermanentEmployees?.toString()
                  || ' ',
              ),
            ],
          }),
          new TableCell({
            children: [
              new Paragraph(
                PYdata?.percentages?.MoreThanMinPermanentEmployees?.toString()
                  || ' ',
              ),
            ],
          }),
          new TableCell({
            children: [
              new Paragraph(
                PYdata?.PermanentEmployees?.TotalEqualToMin?.toString() || ' ',
              ),
            ],
          }),
          new TableCell({
            children: [
              new Paragraph(
                PYdata?.percentages?.EqualToMinPermanentEmployees?.toString()
                  || ' ',
              ),
            ],
          }),
          new TableCell({
            children: [
              new Paragraph(
                PYdata?.PermanentEmployees?.TotalMoreThanMin?.toString() || ' ',
              ),
            ],
          }),
          new TableCell({
            children: [
              new Paragraph(
                PYdata?.percentages?.MoreThanMinPermanentEmployees?.toString()
                  || ' ',
              ),
            ],
          }),
        ],
      }),
      new TableRow({
        children: [
          new TableCell({
            children: [new Paragraph('Male')],
          }),
          new TableCell({
            children: [
              new Paragraph(
                CYdata?.PermanentEmployees?.TotalmalePermanentEmployees?.toString()
                  || ' ',
              ),
            ],
          }),
          new TableCell({
            children: [
              new Paragraph(
                CYdata?.PermanentEmployees?.MaleEqualToMin?.toString() || ' ',
              ),
            ],
          }),
          new TableCell({
            children: [
              new Paragraph(
                CYdata?.percentages?.EqualToMinMalePermanentEmployees?.toString()
                  || ' ',
              ),
            ],
          }),
          new TableCell({
            children: [
              new Paragraph(
                CYdata?.PermanentEmployees?.MaleMoreThanMin?.toString() || ' ',
              ),
            ],
          }),
          new TableCell({
            children: [
              new Paragraph(
                CYdata?.percentages?.MoreThanMinMalePermanentEmployees?.toString()
                  || ' ',
              ),
            ],
          }),
          new TableCell({
            children: [
              new Paragraph(
                PYdata?.PermanentEmployees?.TotalmalePermanentEmployees?.toString()
                  || ' ',
              ),
            ],
          }),
          new TableCell({
            children: [
              new Paragraph(
                PYdata?.PermanentEmployees?.MaleEqualToMin?.toString() || ' ',
              ),
            ],
          }),
          new TableCell({
            children: [
              new Paragraph(
                PYdata?.percentages?.EqualToMinMalePermanentEmployees?.toString()
                  || ' ',
              ),
            ],
          }),
          new TableCell({
            children: [
              new Paragraph(
                PYdata?.PermanentEmployees?.MaleMoreThanMin?.toString() || ' ',
              ),
            ],
          }),
          new TableCell({
            children: [
              new Paragraph(
                PYdata?.percentages?.MoreThanMinMalePermanentEmployees?.toString()
                  || ' ',
              ),
            ],
          }),
        ],
      }),
      new TableRow({
        children: [
          new TableCell({
            children: [new Paragraph('Female')],
          }),
          new TableCell({
            children: [
              new Paragraph(
                CYdata?.PermanentEmployees?.TotalFemalePermanentEmployees?.toString()
                  || ' ',
              ),
            ],
          }),
          new TableCell({
            children: [
              new Paragraph(
                CYdata?.PermanentEmployees?.FemaleEqualToMin?.toString() || ' ',
              ),
            ],
          }),
          new TableCell({
            children: [
              new Paragraph(
                CYdata?.percentages?.EqualToMinFemalePermanentEmployees?.toString()
                  || ' ',
              ),
            ],
          }),
          new TableCell({
            children: [
              new Paragraph(
                CYdata?.PermanentEmployees?.FemaleMoreThanMin?.toString() || ' ',
              ),
            ],
          }),
          new TableCell({
            children: [
              new Paragraph(
                CYdata?.percentages?.MoreThanMinFemalePermanentEmployees?.toString()
                  || ' ',
              ),
            ],
          }),
          new TableCell({
            children: [
              new Paragraph(
                PYdata?.PermanentEmployees?.TotalFemalePermanentEmployees?.toString()
                  || ' ',
              ),
            ],
          }),
          new TableCell({
            children: [
              new Paragraph(
                PYdata?.PermanentEmployees?.FemaleEqualToMin?.toString() || ' ',
              ),
            ],
          }),
          new TableCell({
            children: [
              new Paragraph(
                PYdata?.percentages?.EqualToMinFemalePermanentEmployees?.toString()
                  || ' ',
              ),
            ],
          }),
          new TableCell({
            children: [
              new Paragraph(
                PYdata?.PermanentEmployees?.FemaleMoreThanMin?.toString() || ' ',
              ),
            ],
          }),
          new TableCell({
            children: [
              new Paragraph(
                PYdata?.percentages?.MoreThanMinFemalePermanentEmployees?.toString()
                  || ' ',
              ),
            ],
          }),
        ],
      }),
      new TableRow({
        children: [
          new TableCell({
            children: [new Paragraph('Other than Permanent')],
          }),
          new TableCell({
            children: [
              new Paragraph(
                CYdata?.OtherThanPermanentEmployees?.TotalEmployees?.toString()
                  || ' ',
              ),
            ],
          }),
          new TableCell({
            children: [
              new Paragraph(
                CYdata?.OtherThanPermanentEmployees?.TotalEqualToMin?.toString()
                  || ' ',
              ),
            ],
          }),
          new TableCell({
            children: [
              new Paragraph(
                CYdata?.percentages?.EqualToMinOtherThanPermanentEmployees?.toString()
                  || ' ',
              ),
            ],
          }),
          new TableCell({
            children: [
              new Paragraph(
                CYdata?.OtherThanPermanentEmployees?.TotalMoreThanMin?.toString()
                  || ' ',
              ),
            ],
          }),
          new TableCell({
            children: [
              new Paragraph(
                CYdata?.percentages?.MoreThanMinOtherThanPermanentEmployees?.toString()
                  || ' ',
              ),
            ],
          }),
          new TableCell({
            children: [
              new Paragraph(
                PYdata?.OtherThanPermanentEmployees?.TotalEmployees?.toString()
                  || ' ',
              ),
            ],
          }),
          new TableCell({
            children: [
              new Paragraph(
                PYdata?.OtherThanPermanentEmployees?.TotalEqualToMin?.toString()
                  || ' ',
              ),
            ],
          }),
          new TableCell({
            children: [
              new Paragraph(
                PYdata?.percentages?.EqualToMinOtherThanPermanentEmployees?.toString()
                  || ' ',
              ),
            ],
          }),
          new TableCell({
            children: [
              new Paragraph(
                PYdata?.OtherThanPermanentEmployees?.TotalMoreThanMin?.toString()
                  || ' ',
              ),
            ],
          }),
          new TableCell({
            children: [
              new Paragraph(
                PYdata?.percentages?.MoreThanMinOtherThanPermanentEmployees?.toString()
                  || ' ',
              ),
            ],
          }),
        ],
      }),
      new TableRow({
        children: [
          new TableCell({
            children: [new Paragraph('Male')],
          }),
          new TableCell({
            children: [
              new Paragraph(
                CYdata?.OtherThanPermanentEmployees?.TotalmalePermanentEmployees?.toString()
                  || ' ',
              ),
            ],
          }),
          new TableCell({
            children: [
              new Paragraph(
                CYdata?.OtherThanPermanentEmployees?.MaleEqualToMin?.toString()
                  || ' ',
              ),
            ],
          }),
          new TableCell({
            children: [
              new Paragraph(
                CYdata?.percentages?.EqualToMinMaleOtherThanPermanentEmployees?.toString()
                  || ' ',
              ),
            ],
          }),
          new TableCell({
            children: [
              new Paragraph(
                CYdata?.OtherThanPermanentEmployees?.MaleMoreThanMin?.toString()
                  || ' ',
              ),
            ],
          }),
          new TableCell({
            children: [
              new Paragraph(
                CYdata?.percentages?.MoreThanMinMaleOtherThanPermanentEmployees?.toString()
                  || ' ',
              ),
            ],
          }),
          new TableCell({
            children: [
              new Paragraph(
                PYdata?.OtherThanPermanentEmployees?.TotalmalePermanentEmployees?.toString()
                  || ' ',
              ),
            ],
          }),
          new TableCell({
            children: [
              new Paragraph(
                PYdata?.OtherThanPermanentEmployees?.MaleEqualToMin?.toString()
                  || ' ',
              ),
            ],
          }),
          new TableCell({
            children: [
              new Paragraph(
                PYdata?.percentages?.EqualToMinMaleOtherThanPermanentEmployees?.toString()
                  || ' ',
              ),
            ],
          }),
          new TableCell({
            children: [
              new Paragraph(
                PYdata?.OtherThanPermanentEmployees?.MaleMoreThanMin?.toString()
                  || ' ',
              ),
            ],
          }),
          new TableCell({
            children: [
              new Paragraph(
                PYdata?.percentages?.MoreThanMinMaleOtherThanPermanentEmployees?.toString()
                  || ' ',
              ),
            ],
          }),
        ],
      }),
      new TableRow({
        children: [
          new TableCell({
            children: [new Paragraph('Female')],
          }),
          new TableCell({
            children: [
              new Paragraph(
                CYdata?.OtherThanPermanentEmployees?.TotalFemalePermanentEmployees?.toString()
                  || ' ',
              ),
            ],
          }),
          new TableCell({
            children: [
              new Paragraph(
                CYdata?.OtherThanPermanentEmployees?.FemaleEqualToMin?.toString()
                  || ' ',
              ),
            ],
          }),
          new TableCell({
            children: [
              new Paragraph(
                CYdata?.percentages?.EqualToMinFemaleOtherThanPermanentEmployees?.toString()
                  || ' ',
              ),
            ],
          }),
          new TableCell({
            children: [
              new Paragraph(
                CYdata?.OtherThanPermanentEmployees?.FemaleMoreThanMin?.toString()
                  || ' ',
              ),
            ],
          }),
          new TableCell({
            children: [
              new Paragraph(
                CYdata?.percentages?.MoreThanMinFemaleOtherThanPermanentEmployees?.toString()
                  || ' ',
              ),
            ],
          }),
          new TableCell({
            children: [
              new Paragraph(
                PYdata?.OtherThanPermanentEmployees?.TotalFemalePermanentEmployees?.toString()
                  || ' ',
              ),
            ],
          }),
          new TableCell({
            children: [
              new Paragraph(
                PYdata?.OtherThanPermanentEmployees?.FemaleEqualToMin?.toString()
                  || ' ',
              ),
            ],
          }),
          new TableCell({
            children: [
              new Paragraph(
                PYdata?.percentages?.EqualToMinFemaleOtherThanPermanentEmployees?.toString()
                  || ' ',
              ),
            ],
          }),
          new TableCell({
            children: [
              new Paragraph(
                PYdata?.OtherThanPermanentEmployees?.FemaleMoreThanMin?.toString()
                  || ' ',
              ),
            ],
          }),
          new TableCell({
            children: [
              new Paragraph(
                PYdata?.percentages?.MoreThanMinFemaleOtherThanPermanentEmployees?.toString()
                  || ' ',
              ),
            ],
          }),
        ],
      }),
      new TableRow({
        children: [
          new TableCell({
            children: [
              new Paragraph({ text: ' Workers ', alignment: 'center' }),
            ],
            columnSpan: 11,
          }),
        ],
      }),
      new TableRow({
        children: [
          new TableCell({
            children: [new Paragraph('Permanent')],
          }),
          new TableCell({
            children: [
              new Paragraph(
                CYdata?.PermanentWorkers?.TotalEmployees?.toString() || ' ',
              ),
            ],
          }),
          new TableCell({
            children: [
              new Paragraph(
                CYdata?.PermanentWorkers?.TotalEqualToMin?.toString() || ' ',
              ),
            ],
          }),
          new TableCell({
            children: [
              new Paragraph(
                CYdata?.percentages?.EqualToMinPermanentWorkers?.toString()
                  || ' ',
              ),
            ],
          }),
          new TableCell({
            children: [
              new Paragraph(
                CYdata?.PermanentWorkers?.TotalMoreThanMin?.toString() || ' ',
              ),
            ],
          }),
          new TableCell({
            children: [
              new Paragraph(
                CYdata?.percentages?.MoreThanMinPermanentWorkers?.toString()
                  || ' ',
              ),
            ],
          }),
          new TableCell({
            children: [
              new Paragraph(
                PYdata?.PermanentWorkers?.TotalEmployees?.toString() || ' ',
              ),
            ],
          }),
          new TableCell({
            children: [
              new Paragraph(
                PYdata?.PermanentWorkers?.TotalEqualToMin?.toString() || ' ',
              ),
            ],
          }),
          new TableCell({
            children: [
              new Paragraph(
                PYdata?.percentages?.EqualToMinPermanentWorkers?.toString()
                  || ' ',
              ),
            ],
          }),
          new TableCell({
            children: [
              new Paragraph(
                PYdata?.PermanentWorkers?.TotalMoreThanMin?.toString() || ' ',
              ),
            ],
          }),
          new TableCell({
            children: [
              new Paragraph(
                PYdata?.percentages?.MoreThanMinPermanentWorkers?.toString()
                  || ' ',
              ),
            ],
          }),
        ],
      }),
      new TableRow({
        children: [
          new TableCell({
            children: [new Paragraph('Male')],
          }),
          new TableCell({
            children: [
              new Paragraph(
                CYdata?.PermanentWorkers?.TotalmalePermanentEmployees?.toString()
                  || ' ',
              ),
            ],
          }),
          new TableCell({
            children: [
              new Paragraph(
                CYdata?.PermanentWorkers?.MaleEqualToMin?.toString() || ' ',
              ),
            ],
          }),
          new TableCell({
            children: [
              new Paragraph(
                CYdata?.percentages?.EqualToMinMalePermanentWorkers?.toString()
                  || ' ',
              ),
            ],
          }),
          new TableCell({
            children: [
              new Paragraph(
                CYdata?.PermanentWorkers?.MaleMoreThanMin?.toString() || ' ',
              ),
            ],
          }),
          new TableCell({
            children: [
              new Paragraph(
                CYdata?.percentages?.MoreThanMinMalePermanentWorkers?.toString()
                  || ' ',
              ),
            ],
          }),
          new TableCell({
            children: [
              new Paragraph(
                PYdata?.PermanentWorkers?.TotalmalePermanentEmployees?.toString()
                  || ' ',
              ),
            ],
          }),
          new TableCell({
            children: [
              new Paragraph(
                PYdata?.PermanentWorkers?.MaleEqualToMin?.toString() || ' ',
              ),
            ],
          }),
          new TableCell({
            children: [
              new Paragraph(
                PYdata?.percentages?.EqualToMinMalePermanentWorkers?.toString()
                  || ' ',
              ),
            ],
          }),
          new TableCell({
            children: [
              new Paragraph(
                PYdata?.PermanentWorkers?.MaleMoreThanMin?.toString() || ' ',
              ),
            ],
          }),
          new TableCell({
            children: [
              new Paragraph(
                PYdata?.percentages?.MoreThanMinMalePermanentWorkers?.toString()
                  || ' ',
              ),
            ],
          }),
        ],
      }),
      new TableRow({
        children: [
          new TableCell({
            children: [new Paragraph('Female')],
          }),
          new TableCell({
            children: [
              new Paragraph(
                CYdata?.PermanentWorkers?.TotalFemalePermanentEmployees?.toString()
                  || ' ',
              ),
            ],
          }),
          new TableCell({
            children: [
              new Paragraph(
                CYdata?.PermanentWorkers?.FemaleEqualToMin?.toString() || ' ',
              ),
            ],
          }),
          new TableCell({
            children: [
              new Paragraph(
                CYdata?.percentages?.EqualToMinFemalePermanentWorkers?.toString()
                  || ' ',
              ),
            ],
          }),
          new TableCell({
            children: [
              new Paragraph(
                CYdata?.PermanentWorkers?.FemaleMoreThanMin?.toString() || ' ',
              ),
            ],
          }),
          new TableCell({
            children: [
              new Paragraph(
                CYdata?.percentages?.MoreThanMinFemalePermanentWorkers?.toString()
                  || ' ',
              ),
            ],
          }),
          new TableCell({
            children: [
              new Paragraph(
                PYdata?.PermanentWorkers?.TotalFemalePermanentEmployees?.toString()
                  || ' ',
              ),
            ],
          }),
          new TableCell({
            children: [
              new Paragraph(
                PYdata?.PermanentWorkers?.FemaleEqualToMin?.toString() || ' ',
              ),
            ],
          }),
          new TableCell({
            children: [
              new Paragraph(
                PYdata?.percentages?.EqualToMinFemalePermanentWorkers?.toString()
                  || ' ',
              ),
            ],
          }),
          new TableCell({
            children: [
              new Paragraph(
                PYdata?.PermanentWorkers?.FemaleMoreThanMin?.toString() || ' ',
              ),
            ],
          }),
          new TableCell({
            children: [
              new Paragraph(
                PYdata?.percentages?.MoreThanMinFemalePermanentWorkers?.toString()
                  || ' ',
              ),
            ],
          }),
        ],
      }),
      new TableRow({
        children: [
          new TableCell({
            children: [new Paragraph('Other than Permanent')],
          }),
          new TableCell({
            children: [
              new Paragraph(
                CYdata?.OtherThanPermanentWorkers?.TotalEmployees?.toString()
                  || ' ',
              ),
            ],
          }),
          new TableCell({
            children: [
              new Paragraph(
                CYdata?.OtherThanPermanentWorkers?.TotalEqualToMin?.toString()
                  || ' ',
              ),
            ],
          }),
          new TableCell({
            children: [
              new Paragraph(
                CYdata?.percentages?.EqualToMinOtherThanPermanentWorkers?.toString()
                  || ' ',
              ),
            ],
          }),
          new TableCell({
            children: [
              new Paragraph(
                CYdata?.OtherThanPermanentWorkers?.TotalMoreThanMin?.toString()
                  || ' ',
              ),
            ],
          }),
          new TableCell({
            children: [
              new Paragraph(
                CYdata?.percentages?.MoreThanMinOtherThanPermanentWorkers?.toString()
                  || ' ',
              ),
            ],
          }),
          new TableCell({
            children: [
              new Paragraph(
                PYdata?.OtherThanPermanentWorkers?.TotalEmployees?.toString()
                  || ' ',
              ),
            ],
          }),
          new TableCell({
            children: [
              new Paragraph(
                PYdata?.OtherThanPermanentWorkers?.TotalEqualToMin?.toString()
                  || ' ',
              ),
            ],
          }),
          new TableCell({
            children: [
              new Paragraph(
                PYdata?.percentages?.EqualToMinOtherThanPermanentWorkers?.toString()
                  || ' ',
              ),
            ],
          }),
          new TableCell({
            children: [
              new Paragraph(
                PYdata?.OtherThanPermanentWorkers?.TotalMoreThanMin?.toString()
                  || ' ',
              ),
            ],
          }),
          new TableCell({
            children: [
              new Paragraph(
                PYdata?.percentages?.MoreThanMinOtherThanPermanentWorkers?.toString()
                  || ' ',
              ),
            ],
          }),
        ],
      }),
      new TableRow({
        children: [
          new TableCell({
            children: [new Paragraph('Male')],
          }),
          new TableCell({
            children: [
              new Paragraph(
                CYdata?.OtherThanPermanentWorkers?.TotalmalePermanentEmployees?.toString()
                  || ' ',
              ),
            ],
          }),
          new TableCell({
            children: [
              new Paragraph(
                CYdata?.OtherThanPermanentWorkers?.MaleEqualToMin?.toString()
                  || ' ',
              ),
            ],
          }),
          new TableCell({
            children: [
              new Paragraph(
                CYdata?.percentages?.EqualToMinOtherThanMalePermanentWorkers?.toString()
                  || ' ',
              ),
            ],
          }),
          new TableCell({
            children: [
              new Paragraph(
                CYdata?.OtherThanPermanentWorkers?.MaleMoreThanMin?.toString()
                  || ' ',
              ),
            ],
          }),
          new TableCell({
            children: [
              new Paragraph(
                CYdata?.percentages?.MoreThanMinOtherThanMalePermanentWorkers?.toString()
                  || ' ',
              ),
            ],
          }),
          new TableCell({
            children: [
              new Paragraph(
                PYdata?.OtherThanPermanentWorkers?.TotalmalePermanentEmployees?.toString()
                  || ' ',
              ),
            ],
          }),
          new TableCell({
            children: [
              new Paragraph(
                PYdata?.OtherThanPermanentWorkers?.MaleEqualToMin?.toString()
                  || ' ',
              ),
            ],
          }),
          new TableCell({
            children: [
              new Paragraph(
                PYdata?.percentages?.EqualToMinOtherThanMalePermanentWorkers?.toString()
                  || ' ',
              ),
            ],
          }),
          new TableCell({
            children: [
              new Paragraph(
                PYdata?.OtherThanPermanentWorkers?.MaleMoreThanMin?.toString()
                  || ' ',
              ),
            ],
          }),
          new TableCell({
            children: [
              new Paragraph(
                PYdata?.percentages?.MoreThanMinOtherThanMalePermanentWorkers?.toString()
                  || ' ',
              ),
            ],
          }),
        ],
      }),
      new TableRow({
        children: [
          new TableCell({
            children: [new Paragraph('Female')],
          }),
          new TableCell({
            children: [
              new Paragraph(
                CYdata?.OtherThanPermanentWorkers?.TotalFemalePermanentEmployees?.toString()
                  || ' ',
              ),
            ],
          }),
          new TableCell({
            children: [
              new Paragraph(
                CYdata?.OtherThanPermanentWorkers?.FemaleEqualToMin?.toString()
                  || ' ',
              ),
            ],
          }),
          new TableCell({
            children: [
              new Paragraph(
                CYdata?.percentages?.EqualToMinOtherThanFemalePermanentWorkers?.toString()
                  || ' ',
              ),
            ],
          }),
          new TableCell({
            children: [
              new Paragraph(
                CYdata?.OtherThanPermanentWorkers?.FemaleMoreThanMin?.toString()
                  || ' ',
              ),
            ],
          }),
          new TableCell({
            children: [
              new Paragraph(
                CYdata?.percentages?.MoreThanMinOtherThanFemalePermanentWorkers?.toString()
                  || ' ',
              ),
            ],
          }),
          new TableCell({
            children: [
              new Paragraph(
                PYdata?.OtherThanPermanentWorkers?.TotalFemalePermanentEmployees?.toString()
                  || ' ',
              ),
            ],
          }),
          new TableCell({
            children: [
              new Paragraph(
                PYdata?.OtherThanPermanentWorkers?.FemaleEqualToMin?.toString()
                  || ' ',
              ),
            ],
          }),
          new TableCell({
            children: [
              new Paragraph(
                PYdata?.percentages?.EqualToMinOtherThanFemalePermanentWorkers?.toString()
                  || ' ',
              ),
            ],
          }),
          new TableCell({
            children: [
              new Paragraph(
                PYdata?.OtherThanPermanentWorkers?.FemaleMoreThanMin?.toString()
                  || ' ',
              ),
            ],
          }),
          new TableCell({
            children: [
              new Paragraph(
                PYdata?.percentages?.MoreThanMinOtherThanFemalePermanentWorkers?.toString()
                  || ' ',
              ),
            ],
          }),
        ],
      }),
    ],
  });
};

const questionRemunerationWages = () => new Paragraph({
  text: '3. Details of remuneration/salary/wages a. Median remuneration / wages: ',
  spacing: { after: 200 },
});

const tableRemunerationWages = () => new Table({
  rows: [
    new TableRow({
      children: [
        new TableCell({
          width: {
            size: 5505,
            type: WidthType.DXA,
          },
          children: [new Paragraph('  ')],
          rowSpan: 2,
        }),
        new TableCell({
          width: {
            size: 5505,
            type: WidthType.DXA,
          },
          children: [new Paragraph(' Male ')],
          columnSpan: 2,
        }),
        new TableCell({
          width: {
            size: 5505,
            type: WidthType.DXA,
          },
          children: [new Paragraph(' Female ')],
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
          children: [new Paragraph(' Number ')],
        }),
        new TableCell({
          width: {
            size: 5505,
            type: WidthType.DXA,
          },
          children: [
            new Paragraph(
              ' Median remuneration/ salary/  wages of respective category ',
            ),
          ],
        }),
        new TableCell({
          width: {
            size: 5505,
            type: WidthType.DXA,
          },
          children: [new Paragraph(' Number ')],
        }),
        new TableCell({
          width: {
            size: 5505,
            type: WidthType.DXA,
          },
          children: [
            new Paragraph(
              ' Median remuneration/ salary/ wages of respective category',
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
          children: [new Paragraph(' Board of Directors ')],
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
          children: [new Paragraph(' Key Managerial Personnel ')],
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
          children: [new Paragraph(' Employees other than BoD and KMPs')],
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
          children: [new Paragraph(' Workers')],
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

const questionGrossWagesFemales = () => new Paragraph({
  text: 'b. Gross wages paid to females as % of total wages paid by the entity, in the following  format: ',
  spacing: { after: 200 },
});

const tableGrossWagesFemales = () => new Table({
  columnWidths: [5000, 2500, 2500],
  rows: [
    new TableRow({
      children: [
        new TableCell({ children: [new Paragraph(' ')] }),
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
            new Paragraph('Gross wages paid to females as % of total wages'),
          ],
        }),
        new TableCell({ children: [new Paragraph('')] }),
        new TableCell({ children: [new Paragraph('')] }),
      ],
    }),
  ],
});

const questionHumanRightsFocalPoint = () => new Paragraph({
  text: '4. Do you have a focal point (Individual/ Committee) responsible for addressing human  rights impacts or issues caused or contributed to by the business? (Yes/No) ',
  spacing: { after: 200 },
});

const questionInternalMechanisms = () => new Paragraph({
  text: '5. Describe the internal mechanisms in place to redress grievances related to human rights  issues.  ',
  spacing: { after: 200 },
});

const questionEmployeeComplaints = () => new Paragraph({
  text: '6. Number of Complaints on the following made by employees and workers:  ',
  spacing: { after: 200 },
});

const tableEmployeeComplaints = () => new Table({
  rows: [
    new TableRow({
      children: [
        new TableCell({
          width: {
            size: 5505,
            type: WidthType.DXA,
          },
          children: [new Paragraph('  ')],
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
          children: [
            new Paragraph(' Number of  complaints  filed during the  year '),
          ],
        }),
        new TableCell({
          width: {
            size: 5505,
            type: WidthType.DXA,
          },
          children: [
            new Paragraph(
              ' Number of  complaints  pending resolution  at close of  the year ',
            ),
          ],
        }),
        new TableCell({
          width: {
            size: 5505,
            type: WidthType.DXA,
          },
          children: [new Paragraph('  Remarks ')],
        }),
        new TableCell({
          width: {
            size: 5505,
            type: WidthType.DXA,
          },
          children: [
            new Paragraph(' Number of  complaints  filed during the  year '),
          ],
        }),
        new TableCell({
          width: {
            size: 5505,
            type: WidthType.DXA,
          },
          children: [
            new Paragraph(
              ' Number of  complaints  pending resolution  at close of  the year ',
            ),
          ],
        }),
        new TableCell({
          width: {
            size: 5505,
            type: WidthType.DXA,
          },
          children: [new Paragraph(' Remarks ')],
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
          children: [new Paragraph(' Sexual Harassment')],
        }),
        new TableCell({
          width: {
            size: 5505,
            type: WidthType.DXA,
          },
          children: [new Paragraph('0')],
        }),
        new TableCell({
          width: {
            size: 5505,
            type: WidthType.DXA,
          },
          children: [new Paragraph('0')],
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
          children: [new Paragraph(' Discrimination at  workplace ')],
        }),
        new TableCell({
          width: {
            size: 5505,
            type: WidthType.DXA,
          },
          children: [new Paragraph('0')],
        }),
        new TableCell({
          width: {
            size: 5505,
            type: WidthType.DXA,
          },
          children: [new Paragraph('0')],
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
          children: [new Paragraph(' Child Labour ')],
        }),
        new TableCell({
          width: {
            size: 5505,
            type: WidthType.DXA,
          },
          children: [new Paragraph('0')],
        }),
        new TableCell({
          width: {
            size: 5505,
            type: WidthType.DXA,
          },
          children: [new Paragraph('0')],
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
          children: [new Paragraph(' Forced Labour/Involuntary Labour ')],
        }),
        new TableCell({
          width: {
            size: 5505,
            type: WidthType.DXA,
          },
          children: [new Paragraph('0')],
        }),
        new TableCell({
          width: {
            size: 5505,
            type: WidthType.DXA,
          },
          children: [new Paragraph('0')],
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
          children: [new Paragraph(' Wages ')],
        }),
        new TableCell({
          width: {
            size: 5505,
            type: WidthType.DXA,
          },
          children: [new Paragraph('0')],
        }),
        new TableCell({
          width: {
            size: 5505,
            type: WidthType.DXA,
          },
          children: [new Paragraph('0')],
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
          children: [new Paragraph(' Other human  rights related  issues ')],
        }),
        new TableCell({
          width: {
            size: 5505,
            type: WidthType.DXA,
          },
          children: [new Paragraph('0')],
        }),
        new TableCell({
          width: {
            size: 5505,
            type: WidthType.DXA,
          },
          children: [new Paragraph('0')],
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

const questionPoshFemales = () => new Paragraph({
  text: '7. Complaints filed under the Sexual Harassment of Women at Workplace (Prevention,  Prohibition and Redressal) Act, 2013, in the following format:   ',
  spacing: { after: 200 },
});

const tablePoshFemales = async (obj) => {
  // const res = await axios.get("http://localhost:5000/report-template/download?report_name=BRSR&financial_year=2024&financial_quarter=q4");
  const data = obj?.pOSH;
  return new Table({
    columnWidths: [5000, 2500, 2500],
    rows: [
      new TableRow({
        children: [
          new TableCell({ children: [new Paragraph(' ')] }),
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
              new Paragraph(
                'Total Complaints reported under Sexual Harassment on of Women at Workplace (Prevention, Prohibition and Redressal) Act, 2013 (POSH) ',
              ),
            ],
          }),
          new TableCell({
            children: [
              new Paragraph(
                data?.currentYear?.Complaints_filed_under_POSH?.TotalComplaints?.toString()
                  || ' ',
              ),
            ],
          }),
          new TableCell({
            children: [
              new Paragraph(
                data?.previousYear?.Complaints_filed_under_POSH?.TotalComplaints?.toString()
                  || ' ',
              ),
            ],
          }),
        ],
      }),
      new TableRow({
        children: [
          new TableCell({
            children: [
              new Paragraph(
                'Complaints on POSH as a % of female employees / workers ',
              ),
            ],
          }),
          new TableCell({
            children: [
              new Paragraph(
                data?.currentYear?.Complaints_filed_under_POSH?.ComplaintsPercentage?.toString()
                  || ' ',
              ),
            ],
          }),
          new TableCell({
            children: [
              new Paragraph(
                data?.previousYear?.Complaints_filed_under_POSH?.ComplaintsPercentage?.toString()
                  || ' ',
              ),
            ],
          }),
        ],
      }),
      new TableRow({
        children: [
          new TableCell({
            children: [new Paragraph('Complaints on POSH upheld')],
          }),
          new TableCell({
            children: [
              new Paragraph(
                data?.currentYear?.Complaints_filed_under_POSH?.ComplaintsUpheld?.toString()
                  || ' ',
              ),
            ],
          }),
          new TableCell({
            children: [
              new Paragraph(
                data?.previousYear?.Complaints_filed_under_POSH?.ComplaintsUpheld?.toString()
                  || ' ',
              ),
            ],
          }),
        ],
      }),
    ],
  });
};

const questionAdverseConsequences = () => new Paragraph({
  text: '8. Mechanisms to prevent adverse consequences to the complainant in discrimination and harassment cases.',
  spacing: { after: 200 },
});

const questionHumanRightsRequirements = () => new Paragraph({
  text: '9. Do human rights requirements form part of your business agreements and contracts? (Yes/No)',
  spacing: { after: 200 },
});

const questionAssessmentPlants = () => new Paragraph({
  text: '10. Assessments for the year: ',
  spacing: { after: 200 },
});

const tableAssessmentPlants = () => new Table({
  columnWidths: [4000, 8000],
  rows: [
    new TableRow({
      children: [
        new TableCell({
          children: [new Paragraph(' ')],
        }),
        new TableCell({
          children: [
            new Paragraph(
              '% of your plants and offices that were assessed (by entity or statutory authorities or third parties) ',
            ),
          ],
        }),
      ],
    }),
    new TableRow({
      children: [
        new TableCell({
          children: [new Paragraph('Child labour')],
        }),
        new TableCell({
          children: [new Paragraph('')],
        }),
      ],
    }),
    new TableRow({
      children: [
        new TableCell({
          children: [new Paragraph('Forced/involuntary labour')],
        }),
        new TableCell({
          children: [new Paragraph('')],
        }),
      ],
    }),
    new TableRow({
      children: [
        new TableCell({
          children: [new Paragraph('Sexual harassment ')],
        }),
        new TableCell({
          children: [new Paragraph('')],
        }),
      ],
    }),
    new TableRow({
      children: [
        new TableCell({
          children: [new Paragraph('Discrimination at workplace')],
        }),
        new TableCell({
          children: [new Paragraph('')],
        }),
      ],
    }),
    new TableRow({
      children: [
        new TableCell({
          children: [new Paragraph('Wages ')],
        }),
        new TableCell({
          children: [new Paragraph('')],
        }),
      ],
    }),
    new TableRow({
      children: [
        new TableCell({
          children: [new Paragraph('Others – please specify ')],
        }),
        new TableCell({
          children: [new Paragraph('')],
        }),
      ],
    }),
  ],
});

const p5_leadership_indicators = () => new Paragraph({
  children: [
    new TextRun({
      text: 'Leadership Indicators ',
      bold: true,
      break: 2,
    }),
  ],
});

const questionBusinessProcessModified = () => new Paragraph({
  text: '1. Details of a business process being modified / introduced as a result of addressing human rights grievances/complaints.',
  spacing: { after: 200 },
});

const questionHumanRightsDueDiligence = () => new Paragraph({
  text: '2. Details of the scope and coverage of any Human rights due-diligence conducted.',
  spacing: { after: 200 },
});

const questionDisabilityAccessibility = () => new Paragraph({
  text: '3. Is the premise/office of the entity accessible to differently abled visitors, as per the requirements of the Rights of Persons with Disabilities Act, 2016?',
  spacing: { after: 200 },
});

const questionAssessmentPlantsValueChain = () => new Paragraph({
  text: '4. Details on assessment of value chain partners:',
  spacing: { after: 200 },
});

const tableAssessmentPlantsValuChain = async (obj) => {
  const valueChainData = obj?.Assessmentofvaluechainpartners?.assessmentOfValueChainPartnersResponses;

  return new Table({
    columnWidths: [4000, 8000],
    rows: [
      new TableRow({
        children: [
          new TableCell({
            children: [new Paragraph(' ')],
          }),
          new TableCell({
            children: [
              new Paragraph(
                '% of value chain partners (by value of business done  with such partners) that were assessed ',
              ),
            ],
          }),
        ],
      }),
      new TableRow({
        children: [
          new TableCell({
            children: [new Paragraph('Child labour')],
          }),
          new TableCell({
            children: [new Paragraph(valueChainData?.currentYear?.SexualHarassmentDiscrimiationchildforcedlabouraudit?.ofValuechainpartnersassessed?.toString() || ' ')],
          }),
        ],
      }),
      new TableRow({
        children: [
          new TableCell({
            children: [new Paragraph('Forced/involuntary labour')],
          }),
          new TableCell({
            children: [new Paragraph('')],
          }),
        ],
      }),
      new TableRow({
        children: [
          new TableCell({
            children: [new Paragraph('Sexual harassment ')],
          }),
          new TableCell({
            children: [new Paragraph('')],
          }),
        ],
      }),
      new TableRow({
        children: [
          new TableCell({
            children: [new Paragraph('Discrimination at workplace')],
          }),
          new TableCell({
            children: [new Paragraph('')],
          }),
        ],
      }),
      new TableRow({
        children: [
          new TableCell({
            children: [new Paragraph('Wages ')],
          }),
          new TableCell({
            children: [new Paragraph('')],
          }),
        ],
      }),
      new TableRow({
        children: [
          new TableCell({
            children: [new Paragraph('Others – please specify ')],
          }),
          new TableCell({
            children: [new Paragraph('')],
          }),
        ],
      }),
    ],
  });
};

const questionAssessmentMeasures = () => new Paragraph({
  text: '5. Provide details of any corrective actions taken or underway to address significant risks /  concerns arising from the assessments at Question 4 above. ',
  spacing: { after: 200 },
});

module.exports = {
  principle_5,
  questionHumanRightsTraining,
  tableHumanRightsTraining,
  questionMinimumWages,
  tableMinimumWages,
  questionRemunerationWages,
  tableRemunerationWages,
  questionGrossWagesFemales,
  tableGrossWagesFemales,
  questionHumanRightsFocalPoint,
  questionInternalMechanisms,
  questionEmployeeComplaints,
  tableEmployeeComplaints,
  questionPoshFemales,
  tablePoshFemales,
  questionAdverseConsequences,
  questionHumanRightsRequirements,
  questionAssessmentPlants,
  tableAssessmentPlants,
  p5_leadership_indicators,
  questionBusinessProcessModified,
  questionHumanRightsDueDiligence,
  questionDisabilityAccessibility,
  questionAssessmentPlantsValueChain,
  tableAssessmentPlantsValuChain,
  questionAssessmentMeasures,
};
