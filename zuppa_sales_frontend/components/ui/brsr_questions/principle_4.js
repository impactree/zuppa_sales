/* eslint-disable camelcase */
/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-var-requires */
const {
  TextRun,
  Paragraph,
  Table,
  TableCell,
  TableRow,
} = require('docx');
// const fs = require("fs");
// const dataSet = require("../models/hrGeneralData");

const principle_4 = () => new Paragraph({
  children: [
    new TextRun({
      text: 'PRINCIPLE 4: Businesses should respect the interests of and be  responsive to all its stakeholders',
      bold: true,
      break: 2,
    }),
    new TextRun({
      text: 'Essential Indicators ',
      bold: true,
      break: 2,
    }),
    new TextRun({
      text: '1. Describe the processes for identifying key stakeholder groups of the entity.  ',
      break: 2,
    }),
  ],
});

const questionStakeholderGroups = () => new Paragraph({
  text: '2. List stakeholder groups identified as key for your entity and the frequency of  engagement with each stakeholder group.  ',
  spacing: { after: 200 },
});

const tableStakeholderGroups = () => new Table({
  columnWidths: [3000, 2000, 2000, 2000, 2000],
  rows: [
    new TableRow({
      children: [
        new TableCell({ children: [new Paragraph('Stakeholder Group')] }),
        new TableCell({
          children: [
            new Paragraph(
              'Whether identified as Vulnerable & Marginalized Group (Yes/No)',
            ),
          ],
        }),
        new TableCell({
          children: [
            new Paragraph(
              'Channels of communication (Email, SMS, Newspaper, Pamphlets, Advertisement, Community Meetings, Notice Board, Website), Other',
            ),
          ],
        }),
        new TableCell({
          children: [
            new Paragraph(
              'Frequency of engagement (Annually/ Half yearly/ Quarterly / others – please specify)',
            ),
          ],
        }),
        new TableCell({
          children: [
            new Paragraph(
              'Purpose and scope of engagement including key topics and concerns raised during such engagement',
            ),
          ],
        }),
      ],
    }),

    new TableRow({
      children: [
        new TableCell({ children: [new Paragraph('')] }),
        new TableCell({ children: [new Paragraph('')] }),
        new TableCell({ children: [new Paragraph('')] }),
        new TableCell({ children: [new Paragraph('')] }),
        new TableCell({ children: [new Paragraph('')] }),
      ],
    }),
    new TableRow({
      children: [
        new TableCell({ children: [new Paragraph('')] }),
        new TableCell({ children: [new Paragraph('')] }),
        new TableCell({ children: [new Paragraph('')] }),
        new TableCell({ children: [new Paragraph('')] }),
        new TableCell({ children: [new Paragraph('')] }),
      ],
    }),
    new TableRow({
      children: [
        new TableCell({ children: [new Paragraph('')] }),
        new TableCell({ children: [new Paragraph('')] }),
        new TableCell({ children: [new Paragraph('')] }),
        new TableCell({ children: [new Paragraph('')] }),
        new TableCell({ children: [new Paragraph('')] }),
      ],
    }),
  ],
});

const p4_leadership_indicators = () => new Paragraph({
  children: [
    new TextRun({
      text: 'Leadership Indicators ',
      bold: true,
      break: 2,
    }),
    new TextRun({
      text: '1. Provide the processes for consultation between stakeholders and the Board on  economic, environmental, and social topics or if consultation is delegated, how is  feedback from such consultations provided to the Board.   ',
      break: 2,
    }),
    new TextRun({
      text: '2. Whether stakeholder consultation is used to support the identification and  management of environmental, and social topics (Yes / No). If so, provide details of  instances as to how the inputs received from stakeholders on these topics were  incorporated into policies and activities of the entity.    ',
      break: 2,
    }),
    new TextRun({
      text: '3. Provide details of instances of engagement with, and actions taken to, address the  concerns of vulnerable/ marginalized stakeholder groups.   ',
      break: 2,
    }),
  ],
});

module.exports = {
  principle_4,
  questionStakeholderGroups,
  tableStakeholderGroups,
  p4_leadership_indicators,
};
