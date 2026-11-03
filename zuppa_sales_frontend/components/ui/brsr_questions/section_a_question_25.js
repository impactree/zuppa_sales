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
// const dataSet = require("../models/hrGeneralData");
// const grievanceDataSet = require("../models/grievanceData");

const question_25 = () => new Paragraph({
  text: ' 25. Complaints/Grievances on any of the principles (Principles 1 to 9) under the National  Guidelines on Responsible Business Conduct: ',
  spacing: {
    before: 200,
    after: 200,
  },
});

const table_question_25 = async (obj) => {
  // const res = await axios.get("http://localhost:5000/report-template/download?report_name=BRSR&financial_year=2024&financial_quarter=q4");
  const communityGrievanceData = obj?.communityGreviences;
  const shareholderGrievanceData = obj?.shareholdersGreviences;
  const employeeGrievanceData = obj?.employeesGreviences;
  const customerGrievanceData = obj?.customerGrievance;
  const investorGrievanceData = obj?.investorsGreviences;
  const valueChainGrievanceData = obj?.valueChainPartners;
  // const otherGrievanceData = obj;
  // console.log(grievanceData);
  // const employeesDetails = res.data.employeesDetails;
  return new Table({
    rows: [
      new TableRow({
        children: [
          new TableCell({
            width: {
              size: 5505,
              type: WidthType.DXA,
            },
            children: [
              new Paragraph(
                ' Stakeholder  group from  whom  complaint is  received ',
              ),
            ],
            rowSpan: 2,
          }),
          new TableCell({
            width: {
              size: 5505,
              type: WidthType.DXA,
            },
            children: [
              new Paragraph(
                ' Grievance  Redressal  Mechanism  in Place  (Yes/No)  (If Yes,  then  provide  web-link  for  grievance  redress  policy) ',
              ),
            ],
            rowSpan: 2,
          }),
          new TableCell({
            width: {
              size: 5505,
              type: WidthType.DXA,
            },
            children: [
              new Paragraph(' FY_____  (Turnover rate in current FY )'),
            ],
            columnSpan: 3,
          }),
          new TableCell({
            width: {
              size: 5505,
              type: WidthType.DXA,
            },
            children: [
              new Paragraph(' FY_____  (Turnover rate in previous FY )'),
            ],
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
            children: [new Paragraph(' Communities ')],
          }),
          new TableCell({
            width: {
              size: 5505,
              type: WidthType.DXA,
            },
            children: [
              new Paragraph(
                communityGrievanceData?.currentYear?.communitiesRelated?.toString()
                  || '',
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
                communityGrievanceData?.currentYear?.complaintsFiled?.toString()
                  || '',
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
                communityGrievanceData?.currentYear?.complaintsPending?.toString()
                  || '',
              ),
            ],
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
            children: [
              new Paragraph(
                communityGrievanceData?.previousYear?.complaintsFiled?.toString()
                  || '',
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
                communityGrievanceData?.previousYear?.complaintsPending?.toString()
                  || '',
              ),
            ],
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
      new TableRow({
        children: [
          new TableCell({
            width: {
              size: 5505,
              type: WidthType.DXA,
            },
            children: [new Paragraph(' Investors (other than shareholders) ')],
          }),
          new TableCell({
            width: {
              size: 5505,
              type: WidthType.DXA,
            },
            children: [
              new Paragraph(
                investorGrievanceData?.currentYear?.investorsRelated?.toString()
                  || '',
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
                investorGrievanceData?.currentYear?.complaintsFiled?.toString()
                  || '',
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
                investorGrievanceData?.currentYear?.complaintsPending?.toString()
                  || '',
              ),
            ],
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
            children: [
              new Paragraph(
                investorGrievanceData?.previousYear?.complaintsFiled?.toString()
                  || '',
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
                investorGrievanceData?.previousYear?.complaintsPending?.toString()
                  || '',
              ),
            ],
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
            children: [new Paragraph(' Shareholders ')],
          }),
          new TableCell({
            width: {
              size: 5505,
              type: WidthType.DXA,
            },
            children: [
              new Paragraph(
                shareholderGrievanceData?.currentYear?.shareholdersRelated?.toString()
                  || '',
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
                shareholderGrievanceData?.currentYear?.complaintsFiled?.toString()
                  || '',
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
                shareholderGrievanceData?.currentYear?.complaintsPending?.toString()
                  || '',
              ),
            ],
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
            children: [
              new Paragraph(
                shareholderGrievanceData?.previousYear?.complaintsFiled?.toString()
                  || '',
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
                shareholderGrievanceData?.previousYear?.complaintsPending?.toString()
                  || '',
              ),
            ],
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
            children: [new Paragraph(' Employees and workers ')],
          }),
          new TableCell({
            width: {
              size: 5505,
              type: WidthType.DXA,
            },
            children: [
              new Paragraph(
                employeeGrievanceData?.currentYear?.employeeRelated?.toString()
                  || '',
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
                employeeGrievanceData?.currentYear?.complaintsFiled?.toString()
                  || '',
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
                employeeGrievanceData?.currentYear?.complaintsPending?.toString()
                  || '',
              ),
            ],
          }),
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
            children: [
              new Paragraph(
                employeeGrievanceData?.previousYear?.complaintsFiled?.toString()
                  || '',
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
                employeeGrievanceData?.previousYear?.complaintsPending?.toString()
                  || '',
              ),
            ],
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
            children: [new Paragraph(' Customers ')],
          }),
          new TableCell({
            width: {
              size: 5505,
              type: WidthType.DXA,
            },
            children: [
              new Paragraph(
                customerGrievanceData?.currentYear?.coustomersRelated?.toString()
                  || '',
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
                customerGrievanceData?.currentYear?.complaintsFiled?.toString()
                  || '',
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
                customerGrievanceData?.currentYear?.complaintsPending?.toString()
                  || '',
              ),
            ],
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
            children: [
              new Paragraph(
                customerGrievanceData?.previousYear?.complaintsFiled?.toString()
                  || '',
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
                customerGrievanceData?.previousYear?.complaintsPending?.toString()
                  || '',
              ),
            ],
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
            children: [new Paragraph(' Value Chain Partners ')],
          }),
          new TableCell({
            width: {
              size: 5505,
              type: WidthType.DXA,
            },
            children: [
              new Paragraph(
                valueChainGrievanceData?.currentYear?.valueChainPartnersRelated?.toString()
                  || '',
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
                valueChainGrievanceData?.currentYear?.complaintsFiled?.toString()
                  || '',
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
                valueChainGrievanceData?.currentYear?.complaintsPending?.toString()
                  || '',
              ),
            ],
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
            children: [
              new Paragraph(
                valueChainGrievanceData?.previousYear?.complaintsFiled?.toString()
                  || '',
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
                valueChainGrievanceData?.previousYear?.complaintsPending?.toString()
                  || '',
              ),
            ],
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
            children: [new Paragraph(' Other (please  specify) ')],
          }),
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
            children: [new Paragraph('')],
          }),
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
};

module.exports = { question_25, table_question_25 };
