/* eslint-disable camelcase */
/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-var-requires */
const {
  TextRun,
  Paragraph,
} = require('docx');
// const fs = require("fs");
//   const dataSet = require("../models/hrGeneralData");

const section_c = () => new Paragraph({
  children: [
    new TextRun({
      text: 'SECTION C: PRINCIPLE WISE PERFORMANCE DISCLOSURE ',
      bold: true,
      break: 1,
    }),
    new TextRun({
      text: 'This section is aimed at helping entities demonstrate their performance in integrating the  Principles and Core Elements with key processes and decisions. The information sought is  categorized as “Essential” and “Leadership”. While the essential indicators are expected to be  disclosed by every entity that is mandated to file this report, the leadership indicators may be  voluntarily disclosed by entities which aspire to progress to a higher level in their quest to be  socially, environmentally and ethically responsible. ',
      break: 1,
    }),
  ],
});

module.exports = { section_c };
