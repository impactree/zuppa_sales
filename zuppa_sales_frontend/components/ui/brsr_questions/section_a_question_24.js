/* eslint-disable camelcase */
/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-var-requires */
const {
  TextRun,
  Paragraph,
} = require('docx');
// const fs = require("fs");
// const dataSet = require("../models/hrGeneralData");

const question_24 = () => new Paragraph({
  children: [
    new TextRun({
      text: ' 24. (i) Whether CSR is applicable as per section 135 of Companies Act, 2013: (Yes/No)',
      break: 2,
    }),
    new TextRun({
      text: ' (ii) Turnover (in Rs.)  ',
      break: 2,
    }),
    new TextRun({
      text: ' (iii) Net worth (in Rs.)  ',
      break: 2,
    }),
  ],
});

module.exports = { question_24 };
