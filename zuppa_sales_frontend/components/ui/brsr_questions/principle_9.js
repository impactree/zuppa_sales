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
//   const grievanceDataSet = require("../models/grievanceData");
//   const productPerformanceDataSet = require("../models/productPerformanceData");

//   const consumerComplaints = grievanceDataSet?.find(
//     (task) => task.task_name === "Customer Complaints"
//   ).response;

// const noOfComplaintsDataPrivacy = consumerComplaints.filter(
//     (res) => res.question_id === "65e57c0c7cf7487e73c0f2b9"
//   );

//   const noOfComplaintsResolvedDataPrivacy = consumerComplaints.filter(
//     (res) => res.question_id === "65e57c0c7cf7487e73c0f2ba"
//   );

//   const noOfComplaintsPendingDataPrivacy = `${
//     parseInt(noOfComplaintsDataPrivacy[0].value) - parseInt(noOfComplaintsResolvedDataPrivacy[0].value)
//   }`;

//   const noOfComplaintsAdvertising = consumerComplaints.filter(
//     (res) => res.question_id === "65e57c0c7cf7487e73c0f2bc"
//   );

//   const noOfComplaintsResolvedAdvertising = consumerComplaints.filter(
//     (res) => res.question_id === "65e57c0c7cf7487e73c0f2ba"
//   );

//   const noOfComplaintsPendingAdvertising = `${
//     parseInt(noOfComplaintsAdvertising[0].value) - parseInt(noOfComplaintsResolvedAdvertising[0].value)
//   }`;

//   const noOfComplaintsCyberSecurity = consumerComplaints.filter(
//     (res) => res.question_id === "65e57c0c7cf7487e73c0f2bf"
//   );

//   const noOfComplaintsResolvedCyberSecurity = consumerComplaints.filter(
//     (res) => res.question_id === "65e57c0c7cf7487e73c0f2c0"
//   );

//   const noOfComplaintsPendingCyberSecurity = `${
//     parseInt(noOfComplaintsCyberSecurity[0].value) - parseInt(noOfComplaintsResolvedCyberSecurity[0].value)
//   }`;

//   const noOfComplaintsEssentialServices = consumerComplaints.filter(
//     (res) => res.question_id === "65e57c0c7cf7487e73c0f2c2"
//   );

//   const noOfComplaintsResolvedEssentialServices = consumerComplaints.filter(
//     (res) => res.question_id === "65e57c0c7cf7487e73c0f2c3"
//   );

//   const noOfComplaintsPendingEssentialServices = `${
//     parseInt(noOfComplaintsEssentialServices[0].value) - parseInt(noOfComplaintsResolvedEssentialServices[0].value)
//   }`;

//   const noOfComplaintsRestrictiveTrade = consumerComplaints.filter(
//     (res) => res.question_id === "65e57c0c7cf7487e73c0f2c5"
//   );

//   const noOfComplaintsResolvedRestrictiveTrade = consumerComplaints.filter(
//     (res) => res.question_id === "65e57c0c7cf7487e73c0f2c6"
//   );

//   const noOfComplaintsPendingRestrictiveTrade = `${
//     parseInt(noOfComplaintsRestrictiveTrade[0].value) - parseInt(noOfComplaintsResolvedRestrictiveTrade[0].value)
//   }`;

//   const noOfComplaintsUnfairTrade = consumerComplaints.filter(
//     (res) => res.question_id === "65e57c0c7cf7487e73c0f2c8"
//   );

//   const noOfComplaintsResolvedUnfairTrade = consumerComplaints.filter(
//     (res) => res.question_id === "65e57c0c7cf7487e73c0f2c9"
//   );

//   const noOfComplaintsPendingUnfairTrade = `${
//     parseInt(noOfComplaintsUnfairTrade[0].value) - parseInt(noOfComplaintsResolvedUnfairTrade[0].value)
//   }`;

//   const noOfComplaintsOthers = consumerComplaints.filter(
//     (res) => res.question_id === "65e57c0c7cf7487e73c0f2cb"
//   );

//   const noOfComplaintsResolvedOthers = consumerComplaints.filter(
//     (res) => res.question_id === "65e57c0c7cf7487e73c0f2cc"
//   );

//   const noOfComplaintsPendingOthers = `${
//     parseInt(noOfComplaintsOthers[0].value) - parseInt(noOfComplaintsResolvedOthers[0].value)
//   }`;

//   const productRecalls = grievanceDataSet?.find(
//     (task) => task.task_name === "Product Recall"
//   ).response;

//   const noOfVoluntaryRecalls = productRecalls.filter(
//     (res) => res.question_id === "65e57c0c7cf7487e73c0f2dc"
//   );

//   const noOfForcedRecalls = productRecalls.filter(
//     (res) => res.question_id === "65e57c0c7cf7487e73c0f2dd"
//   );

// //turnover of products
//   const productCommunication = productPerformanceDataSet?.find(
//     (task) => task.task_name === "Product Communication"
//   ).response;

//   const productQuality = productCommunication.filter(
//     (res) => res.question_id === "65e596867cf7487e73c0f32b"
//   );

//   const safeUseProduct = productCommunication.filter(
//     (res) => res.question_id === "65e596867cf7487e73c0f32c"
//   );

//   const recycleProduct = productCommunication.filter(
//     (res) => res.question_id === "65e596867cf7487e73c0f32d"
//   );

const principle_9 = () => new Paragraph({
  children: [
    new TextRun({
      text: 'PPRINCIPLE 9 Businesses should engage with and provide value to  their consumers in a responsible manner  ',
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

const consumerComplaintMechanisms = () => new Paragraph({
  text: '1. Describe the mechanisms in place to receive and respond to consumer complaints and  feedback.   ',
  spacing: { before: 200, after: 200 },
});

const questionTurnoverProductServiceInfo = () => new Paragraph({
  text: '2. Turnover of products and/ services as a percentage of turnover from all products/service  that carry information about: ',
  spacing: { before: 200, after: 200 },
});

const tableTurnoverProductServiceInfo = () => new Table({
  width: {
    size: 100,
    type: WidthType.PERCENTAGE,
  },
  rows: [
    new TableRow({
      children: [
        new TableCell({
          children: [new Paragraph('As a percentage to total turnover')],
        }),
        new TableCell({
          children: [new Paragraph('FY _____ (Current Financial Year)')],
        }),
        new TableCell({
          children: [new Paragraph('FY ______ (Previous Financial Year)')],
        }),
      ],
    }),

    new TableRow({
      children: [
        new TableCell({
          children: [
            new Paragraph(
              'Environmental and social parameters relevant to the product',
            ),
          ],
        }),
        new TableCell({
          children: [
            new Paragraph(
              '',
              // productQuality[0].value
            ),
          ],
        }),
        new TableCell({
          children: [new Paragraph('')],
        }),
      ],
    }),

    new TableRow({
      children: [
        new TableCell({
          children: [new Paragraph('Safe and responsible usage')],
        }),
        new TableCell({
          children: [
            new Paragraph(
              '',
              // safeUseProduct[0].value
            ),
          ],
        }),
        new TableCell({
          children: [new Paragraph('')],
        }),
      ],
    }),

    new TableRow({
      children: [
        new TableCell({
          children: [new Paragraph('Recycling and/or safe disposal')],
        }),
        new TableCell({
          children: [
            new Paragraph(
              '',
              // recycleProduct[0].value
            ),
          ],
        }),
        new TableCell({
          children: [new Paragraph('')],
        }),
      ],
    }),
  ],
});

const questionConsumerComplaints = () => new Paragraph({
  text: '3. Number of consumer complaints in respect of the following: ',
  spacing: { before: 200, after: 200 },
});

const tableConsumerComplaints = () => new Table({
  width: {
    size: 100,
    type: WidthType.PERCENTAGE,
  },
  rows: [
    new TableRow({
      children: [
        new TableCell({
          children: [new Paragraph('')],
          rowSpan: 2,
        }),
        new TableCell({
          children: [new Paragraph('FY _____ (Current Financial Year)')],
          columnSpan: 2,
        }),
        new TableCell({
          children: [new Paragraph('Remarks')],
          rowSpan: 2,
        }),
        new TableCell({
          children: [new Paragraph('FY _____ (Previous Financial Year)')],
          columnSpan: 2,
        }),
        new TableCell({
          children: [new Paragraph('Remarks')],
          rowSpan: 2,
        }),
      ],
    }),
    new TableRow({
      children: [
        new TableCell({
          children: [new Paragraph('Received during the year')],
        }),
        new TableCell({
          children: [
            new Paragraph('Pending resolutions at the end of the year'),
          ],
        }),
        new TableCell({
          children: [new Paragraph('Received during the year')],
        }),
        new TableCell({
          children: [
            new Paragraph('Pending resolutions at the end of the year'),
          ],
        }),
      ],
    }),

    new TableRow({
      children: [
        new TableCell({
          children: [new Paragraph('Data privacy')],
        }),
        new TableCell({
          children: [
            new Paragraph(
              '',
              // noOfComplaintsDataPrivacy[0].value
            ),
          ],
        }),
        new TableCell({
          children: [
            new Paragraph(
              '',
              // noOfComplaintsPendingDataPrivacy
            ),
          ],
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
          children: [new Paragraph('Advertising')],
        }),
        new TableCell({
          children: [
            new Paragraph(
              '',
              // noOfComplaintsAdvertising[0].value
            ),
          ],
        }),
        new TableCell({
          children: [
            new Paragraph(
              '',
              // noOfComplaintsPendingAdvertising
            ),
          ],
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
          children: [new Paragraph('Cyber-security')],
        }),
        new TableCell({
          children: [
            new Paragraph(
              ' ',
              // noOfComplaintsCyberSecurity[0].value
            ),
          ],
        }),
        new TableCell({
          children: [
            new Paragraph(
              ' ',
              // noOfComplaintsPendingCyberSecurity
            ),
          ],
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
          children: [new Paragraph('Delivery of essential services')],
        }),
        new TableCell({
          children: [
            new Paragraph(
              '',
              // noOfComplaintsEssentialServices[0].value
            ),
          ],
        }),
        new TableCell({
          children: [
            new Paragraph(
              ' ',
              // noOfComplaintsPendingEssentialServices
            ),
          ],
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
          children: [new Paragraph('Restrictive Trade Practices')],
        }),
        new TableCell({
          children: [
            new Paragraph(
              ' ',
              // noOfComplaintsRestrictiveTrade[0].value
            ),
          ],
        }),
        new TableCell({
          children: [
            new Paragraph(
              ' ',
              // noOfComplaintsPendingRestrictiveTrade
            ),
          ],
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
          children: [new Paragraph('Unfair Trade Practices')],
        }),
        new TableCell({
          children: [
            new Paragraph(
              '',
              // noOfComplaintsUnfairTrade[0].value
            ),
          ],
        }),
        new TableCell({
          children: [
            new Paragraph(
              '',
              // noOfComplaintsPendingRestrictiveTrade
            ),
          ],
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
          children: [new Paragraph('Other')],
        }),
        new TableCell({
          children: [
            new Paragraph(
              '',
              // noOfComplaintsOthers[0].value
            ),
          ],
        }),
        new TableCell({
          children: [
            new Paragraph(
              '',
              // noOfComplaintsPendingOthers
            ),
          ],
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

const questionproductRecalls = () => new Paragraph({
  text: '4. Details of instances of product recalls on account of safety issues:',
  spacing: { before: 200, after: 200 },
});

const productRecallsTable = () => new Table({
  width: {
    size: 100,
    type: WidthType.PERCENTAGE,
  },
  rows: [
    new TableRow({
      children: [
        new TableCell({
          children: [
            new Paragraph(
              'Details of instances of product recalls on account of safety issues',
            ),
          ],
        }),
        new TableCell({
          children: [new Paragraph('Number')],
        }),
        new TableCell({
          children: [new Paragraph('Reasons for recall')],
        }),
      ],
    }),

    new TableRow({
      children: [
        new TableCell({
          children: [new Paragraph('Voluntary recalls')],
        }),
        new TableCell({
          children: [
            new Paragraph(
              ' ',
              // noOfVoluntaryRecalls[0].value
            ),
          ],
        }),
        new TableCell({
          children: [new Paragraph('')],
        }),
      ],
    }),

    new TableRow({
      children: [
        new TableCell({
          children: [new Paragraph('Forced recalls')],
        }),
        new TableCell({
          children: [
            new Paragraph(
              '',
              // noOfForcedRecalls[0].value
            ),
          ],
        }),
        new TableCell({
          children: [new Paragraph('')],
        }),
      ],
    }),
  ],
});

const cyberSecurityPolicyQuestion = () => new Paragraph({
  text: '5. Does the entity have a framework/policy on cyber security and risks related to data privacy? (Yes/No) If available, provide a web-link of the policy.',
  spacing: { before: 200, after: 200 },
});

const correctiveActionsDetailsProduct = () => new Paragraph({
  text: '6. Provide details of any corrective actions taken or underway on issues relating to  advertising, and delivery of essential services; cyber security and data privacy of  customers; re-occurrence of instances of product recalls; penalty / action taken by  regulatory authorities on safety of products / services.',
  spacing: { before: 200, after: 200 },
});

const dataBreachesDetails = () => new Paragraph({
  text: '7. Provide the following information relating to data breaches: a. Number of instances of data breaches  b. Percentage of data breaches involving personally identifiable information of  customers c. Impact, if any, of the data breaches ',
  spacing: { before: 200, after: 200 },
});

const p9_leadership_indicators = () => new Paragraph({
  children: [
    new TextRun({
      text: 'Leadership Indicators',
      bold: true,
      break: 2,
    }),
  ],
});

const productInfoAccessDetails = () => new Paragraph({
  text: '1. Channels / platforms where information on products and services of the entity can be accessed (provide web link, if available).',
  spacing: { before: 200, after: 200 },
});

const consumerEducationDetails = () => new Paragraph({
  text: '2. Steps taken to inform and educate consumers about safe and responsible usage of products and/or services.',
  spacing: { before: 200, after: 200 },
});

const serviceDisruptionDetails = () => new Paragraph({
  text: '3. Mechanisms in place to inform consumers of any risk of disruption/discontinuation of essential services.',
  spacing: { before: 200, after: 200 },
});

const productInfoDisplayDetails = () => new Paragraph({
  text: '4. Does the entity display product information on the product over and above what is mandated as per local laws? (Yes/No/Not Applicable) If yes, provide details in brief. Did your entity carry out any survey with regard to consumer satisfaction relating to the major products / services of the entity, significant locations of operation of the entity or the entity as a whole? (Yes/No)',
  spacing: { before: 200, after: 200 },
});

module.exports = {
  principle_9,
  consumerComplaintMechanisms,
  questionTurnoverProductServiceInfo,
  tableTurnoverProductServiceInfo,
  questionConsumerComplaints,
  tableConsumerComplaints,
  questionproductRecalls,
  productRecallsTable,
  cyberSecurityPolicyQuestion,
  correctiveActionsDetailsProduct,
  dataBreachesDetails,
  productInfoAccessDetails,
  consumerEducationDetails,
  serviceDisruptionDetails,
  productInfoDisplayDetails,
  p9_leadership_indicators,
};
