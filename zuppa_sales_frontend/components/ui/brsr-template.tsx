/* eslint-disable camelcase */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint @typescript-eslint/no-unused-vars: off */

import { ReportService } from '@/lib/service';

/* eslint-disable @typescript-eslint/no-var-requires */
const docx = require('docx');

const {
  TextRun, Paragraph, Packer, Document,
} = docx;
const axios = require('axios');

const {
  question_16,
  table_question_16,
} = require('./brsr_questions/section_a_question_16');
const {
  question_17,
  table_question_17,
} = require('./brsr_questions/section_a_question_17');
const {
  question_18,
  table_question_18,
} = require('./brsr_questions/section_a_question_18');
const {
  table_question_19,
  question_19_a,
  question_19_b,
} = require('./brsr_questions/section_a_question_19');
const {
  table_question_20,
  question_20,
} = require('./brsr_questions/section_a_question_20');
const {
  question_21,
  table_question_21,
} = require('./brsr_questions/section_a_question_21');
const {
  question_22,
  table_question_22,
} = require('./brsr_questions/section_a_question_22');
const {
  question_23,
  table_question_23,
} = require('./brsr_questions/section_a_question_23');
const { question_24 } = require('./brsr_questions/section_a_question_24');
const {
  question_25,
  table_question_25,
} = require('./brsr_questions/section_a_question_25');
const {
  question_26,
  table_question_26,
} = require('./brsr_questions/section_a_question_26');
const {
  section_b,
  tableDisclosure,
  section_b_ngrbc,
  ngbrc_table,
  ngbrc_table2,
  ngbrc_table_question_12,
  question_12,
} = require('./brsr_questions/section_b');
const { section_c } = require('./brsr_questions/section_c');
const {
  principle_1,
  p1_question_1,
  p1_table_question1,
  p1_question_2,
  p1_table_question2,
  p1_question_3,
  p1_table_question3,
  p1_question_4,
  p1_question_5,
  p1_table_question5,
  p1_question_6,
  p1_table_question6,
  p1_question_7,
  p1_question_8,
  p1_table_question8,
  p1_question_9,
  p1_table_question9,
  p1_leadership_indicators,
  p1_leadership_question1,
  p1_leadership_question2,
} = require('./brsr_questions/principle_1');
const {
  principle_2,
  p2_question_1,
  p2_table_question1,
  p2_question_2,
  p2_question_3,
  p2_question_4,
  p2_leadership_indicators,
  p2_leadership_question1,
  p2_leadership_q1_table,
  p1_leadership_question3,
  p2_leadership_q3_table,
  p1_leadership_question4,
  p2_leadership_q4_table,
  tableReclaimedProducts,
  p2_leadership_question5,
  p2_question_2_answer,
} = require('./brsr_questions/principle_2');
const {
  questionEmployeeWellBeing,
  tableEmployeeWellBeing,
  principle_3,
  questionWorkersWellBeing,
  tableWorkersWellBeing,
  questionSpendingWellbeing,
  tableSpendingWellBeing,
  questionRetirementBenefits,
  tableRetirementBenefits,
  questionAccessibility,
  questionEqualOpportunityPolicy,
  questionParentalLeaveRates,
  tableParentalLeaveRates,
  questionGrievanceRedressMechanism,
  tableGrievanceRedressMechanism,
  tableMembershipAssociationsUnions,
  questionTrainingDetails,
  tableTrainingDetails,
  questionMembershipAssociationsUnions,
  // questionGrievanceRedressMechanism,
  questionCareerDevelopmentReview,
  tableCareerDevelopmentReview,
  questionSafetyIncidents,
  tableSafetyIncidents,
  conditionSafetyRelated,
  questionMeasuresTaken,
  ComplaintsWorkingConditions,
  questionComplaintsWorkingConditions,
  questionAssessmentWorkingConditions,
  tableAssessmentWorkingConditions,
  detailsCorrectiveAction,
  p3_leadership_indicators,
  questionHighConsequenceInjuries,
  tableHighConsequenceInjuries,
  questionTransitionAssistance,
  questionAssessmentValueChain,
  tableAssessmentValueChain,
  detailsCorrectiveActionValueChain,
} = require('./brsr_questions/principle_3');
const {
  principle_4,
  questionStakeholderGroups,
  tableStakeholderGroups,
  p4_leadership_indicators,
} = require('./brsr_questions/principle_4');
const {
  principle_5,
  questionHumanRightsTraining,
  tableHumanRightsTraining,
  questionMinimumWages,
  tableMinimumWages,
  tableRemunerationWages,
  questionRemunerationWages,
  questionGrossWagesFemales,
  tableGrossWagesFemales,
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
} = require('./brsr_questions/principle_5');
const {
  principle_6,
  questionEnergyConsumption,
  tableEnergyConsumption,
  noteEnergyConsumption,
  questionPATScheme,
  questionWaterDisclosures,
  tableWaterDisclosures,
  noteWaterDisclosures,
  questionZeroLiquidDischarge,
  questionAirEmissions,
  tableAirEmissions,
  noteAirEmissions,
  questionGHGEmissions,
  tableGHGEmissions,
  noteGHGEmissions,
  questionGHGProject,
  questionWasteManagement,
  tableWasteManagement,
  noteWasteManagement,
  detailsWasteManagement,
  questionEcologicallySensitiveAreas,
  tableEcologicallySensitiveAreas,
  questionEnvironmentalImpactAssessments,
  tableEnvironmentalImpactAssessments,
  questionEnvironmentalNonCompliance,
  tableEnvironmentalNonCompliance,
  p6_leadership_indicators,
  questionWaterStress,
  tableWaterStress,
  noteWaterStress,
  questionScope3Emissions,
  tableScope3Emissions,
  questionWaterDischargeDetails,
  tableWaterDischargeDetails,
  noteScope3Emissions,
  questionImpactOnBiodiversity,
  questionResourceEfficiencyInitiatives,
  tableResourceEfficiencyInitiatives,
  questionBusinessContinuityPlan,
  questionAdverseEnvironmentalImpact,
  questionValueChainAssessment,
} = require('./brsr_questions/principle_6');
const {
  principle_7,
  questionTradeAssociations,
  tableTradeAssociations,
  questionAntiCompetitiveConduct,
  tableAntiCompetitiveConduct,
  p7_leadership_indicators,
  questionPublicPolicyPositions,
  tablePublicPolicyPositions,
} = require('./brsr_questions/principle_7');
const {
  tableInputMaterials,
  principle_8,
  questionSocialImpactAssessments,
  tableSocialImpactAssessments,
  questionRehabilitationAndResettlement,
  tableRehabilitationAndResettlement,
  questionGrievanceCommunity,
  questionInputMaterials,
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
} = require('./brsr_questions/principle_8');
const {
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
  // consumerSatisfactionSurveyDetails,
  p9_leadership_indicators,
} = require('./brsr_questions/principle_9');

export const generateBrsrTemplateBlob = async ({ docurl }: { docurl: any }) => {
  try {
    const defaultCompanyInfo = {
      cin_number: '-',
      company_name: '-',
      establish_year: '-',
      registered_address: '-',
      corporate_address: '-',
      company_email: '-',
      company_telephone: '-',
      company_website: '-',
      reporting_year: '-',
      stock_name: '-',
      capital_paid: '-',
      contact_name: '-',
      contact_details: '-',
      reporting_boundary: '-',
      assurance_name: '-',
      assurance_type: '-',
    };

    let companyInfo = defaultCompanyInfo;
    let obj = { data: {} };

    try {
      const resp = await ReportService.downloadReportById(docurl);
      const res = await axios.get(
        'http://localhost:5000/report-template/download',
      );
      if (res.data?.companyInfo?.[0]?.response?.company_information) {
        companyInfo = {
          ...defaultCompanyInfo,
          ...res.data.companyInfo[0].response.company_information,
        };
      }
      obj = res.data || obj;
      // eslint-disable-next-line no-console

      // eslint-disable-next-line no-console
    } catch (apiError) {
      // eslint-disable-next-line no-console

    }

    const doc = new Document({
      sections: [
        {
          children: [
            new Paragraph({
              children: [
                new TextRun({
                  text: 'SECTION A: GENERAL DISCLOSURES',
                  bold: true,
                }),
              ],
            }),
            new Paragraph({ text: ' ' }),
            new Paragraph({
              text: 'I. Details of the listed entity ',
              spacing: {
                after: 200,
              },
            }),
            new Paragraph({
              text: `1. Corporate Identity Number (CIN) of the Listed Entity: ${companyInfo?.cin_number?.toString() || ''}`,
            }),
            new Paragraph({
              text: `2. Name of the Listed Entity: ${companyInfo?.company_name?.toString() || ''}`,
            }),
            new Paragraph({
              text: `3. Year of incorporation: ${companyInfo?.establish_year?.toString() || ''}`,
            }),
            new Paragraph({
              text: `4. Registered office address: ${companyInfo?.registered_address?.toString() || ''}`,
            }),
            new Paragraph({
              text: `5. Corporate address: ${companyInfo?.corporate_address?.toString() || ''}`,
            }),
            new Paragraph({
              text: `6. E-mail: ${companyInfo?.company_email?.toString() || ''}`,
            }),
            new Paragraph({
              text: `7. Telephone: ${companyInfo?.company_telephone?.toString() || ''}`,
            }),
            new Paragraph({
              text: `8. Website: ${companyInfo?.company_website?.toString() || ''}`,
            }),
            new Paragraph({
              text: `9. Financial year for which reporting is being done: ${companyInfo?.reporting_year?.toString() || ''}`,
            }),
            new Paragraph({
              text: `10. Name of the Stock Exchange(s) where shares are listed: ${companyInfo?.stock_name?.toString() || ''}`,
            }),
            new Paragraph({
              text: `11. Paid-up Capital: ${companyInfo?.capital_paid?.toString() || ''}`,
            }),
            new Paragraph({
              text: `12. Name and contact details (telephone, email address) of the person who may be contacted in case of any queries on the BRSR report: ${companyInfo?.contact_name?.toString() || ''}, ${companyInfo?.contact_details?.toString() || ''}`,
            }),
            new Paragraph({
              text: `13. Reporting boundary - Are the disclosures under this report made on a standalone basis (i.e. only for the entity) or on a consolidated basis (i.e. for the entity and all the entities which form a part of its consolidated financial statements, taken together): ${companyInfo?.reporting_boundary?.toString() || ''}`,
            }),
            new Paragraph({
              text: `14. Name of assurance provider: ${companyInfo?.assurance_name?.toString() || ''}`,
            }),
            new Paragraph({
              text: `15. Type of assurance obtained: ${companyInfo?.assurance_type?.toString() || ''}`,
              spacing: {
                after: 200,
              },
            }),
            new Paragraph({
              text: 'II. Products/services',
              spacing: {
                after: 200,
              },
            }),
            // section_a_i(),
            question_16(),
            await table_question_16(obj),
            question_17(),
            await table_question_17(obj),
            new Paragraph({
              text: 'III. Operations ',
              spacing: {
                before: 200,
              },
            }),
            question_18(),
            await table_question_18(obj),
            question_19_a(),
            table_question_19(),
            question_19_b(),
            question_20(),
            await table_question_20(obj),
            question_21(),
            await table_question_21(obj),
            question_22(),
            await table_question_22(obj),
            new Paragraph({
              text: ' V. Holding, Subsidiary and Associate Companies (including joint ventures)  ',
            }),
            question_23(),
            table_question_23(),
            new Paragraph({ text: ' VI. CSR Details  ' }),
            question_24(),
            new Paragraph({
              text: ' VII. Transparency and Disclosures Compliances  ',
            }),
            question_25(),
            await table_question_25(obj),
            question_26(),
            table_question_26(),
            section_b(),
            tableDisclosure(),
            section_b_ngrbc(),
            ngbrc_table(),
            ngbrc_table2(),
            new Paragraph({
              text: '   ',
            }),
            question_12(),
            ngbrc_table_question_12(),
            section_c(),
            principle_1(),
            p1_question_1(),
            p1_table_question1(),
            p1_question_2(),
            p1_table_question2(),
            p1_question_3(),
            p1_table_question3(),
            p1_question_4(),
            p1_question_5(),
            p1_table_question5(obj),
            p1_question_6(),
            p1_table_question6(obj),
            p1_question_7(),
            p1_question_8(),
            p1_table_question8(),
            p1_question_9(),
            p1_table_question9(),
            p1_leadership_indicators(),
            p1_leadership_question1(),
            p1_leadership_question2(),
            principle_2(),
            p2_question_1(),
            p2_table_question1(),
            await p2_question_2(obj),
            p2_question_3(),
            p2_question_4(),
            p2_leadership_indicators(),
            p2_leadership_question1(),
            p1_leadership_question2(),
            p2_leadership_q1_table(),
            p1_leadership_question3(),
            p2_leadership_q3_table(),
            p1_leadership_question4(),
            p2_leadership_q4_table(),
            p2_leadership_question5(),
            tableReclaimedProducts(),
            await p2_question_2_answer(obj),
            principle_3(),
            questionEmployeeWellBeing(),
            await tableEmployeeWellBeing(obj),
            questionWorkersWellBeing(),
            await tableWorkersWellBeing(obj),
            questionSpendingWellbeing(),
            tableSpendingWellBeing(),
            questionRetirementBenefits(),
            await tableRetirementBenefits(obj),
            questionAccessibility(),
            questionEqualOpportunityPolicy(),
            questionParentalLeaveRates(),
            await tableParentalLeaveRates(obj),
            questionGrievanceRedressMechanism(),
            tableGrievanceRedressMechanism(),
            questionMembershipAssociationsUnions(),
            await tableMembershipAssociationsUnions(obj),
            questionTrainingDetails(),
            await tableTrainingDetails(obj),
            questionCareerDevelopmentReview(),
            await tableCareerDevelopmentReview(obj),
            questionSafetyIncidents(),
            await tableSafetyIncidents(obj),
            conditionSafetyRelated(),
            questionMeasuresTaken(),
            questionComplaintsWorkingConditions(),
            await ComplaintsWorkingConditions(obj),
            questionAssessmentWorkingConditions(),
            tableAssessmentWorkingConditions(),
            detailsCorrectiveAction(),
            p3_leadership_indicators(),
            questionHighConsequenceInjuries(),
            tableHighConsequenceInjuries(),
            questionTransitionAssistance(),
            questionAssessmentValueChain(),
            tableAssessmentValueChain(),
            detailsCorrectiveActionValueChain(),
            principle_4(),
            questionStakeholderGroups(),
            tableStakeholderGroups(),
            p4_leadership_indicators(),
            principle_5(),
            questionHumanRightsTraining(),
            tableHumanRightsTraining(),
            questionMinimumWages(),
            await tableMinimumWages(obj),
            questionRemunerationWages(),
            tableRemunerationWages(),
            questionGrossWagesFemales(),
            tableGrossWagesFemales(),
            questionEmployeeComplaints(),
            tableEmployeeComplaints(),
            questionPoshFemales(),
            await tablePoshFemales(obj),
            questionAdverseConsequences(),
            questionHumanRightsRequirements(),
            questionAssessmentPlants(),
            tableAssessmentPlants(),
            p5_leadership_indicators(),
            questionBusinessProcessModified(),
            questionHumanRightsDueDiligence(),
            questionDisabilityAccessibility(),
            questionAssessmentPlantsValueChain(),
            tableAssessmentPlantsValuChain(obj),
            questionAssessmentMeasures(),
            principle_6(),
            questionEnergyConsumption(),
            await tableEnergyConsumption(obj),
            noteEnergyConsumption(),
            questionPATScheme(),
            questionWaterDisclosures(),
            tableWaterDisclosures(),
            noteWaterDisclosures(),
            questionWaterDischargeDetails(),
            await tableWaterDischargeDetails(obj),
            questionZeroLiquidDischarge(),
            questionAirEmissions(),
            await tableAirEmissions(obj),
            noteAirEmissions(),
            questionGHGEmissions(),
            tableGHGEmissions(),
            noteGHGEmissions(),
            questionGHGProject(),
            questionWasteManagement(),
            await tableWasteManagement(obj),
            noteWasteManagement(),
            detailsWasteManagement(),
            questionEcologicallySensitiveAreas(),
            tableEcologicallySensitiveAreas(),
            questionEnvironmentalImpactAssessments(),
            tableEnvironmentalImpactAssessments(),
            questionEnvironmentalNonCompliance(),
            tableEnvironmentalNonCompliance(),
            p6_leadership_indicators(),
            questionWaterStress(),
            tableWaterStress(obj),
            noteWaterStress(),
            questionScope3Emissions(),
            tableScope3Emissions(),
            noteScope3Emissions(),
            questionImpactOnBiodiversity(),
            questionResourceEfficiencyInitiatives(),
            tableResourceEfficiencyInitiatives(),
            questionBusinessContinuityPlan(),
            questionAdverseEnvironmentalImpact(),
            questionValueChainAssessment(),
            principle_7(),
            questionTradeAssociations(),
            tableTradeAssociations(),
            questionAntiCompetitiveConduct(),
            tableAntiCompetitiveConduct(),
            p7_leadership_indicators(),
            questionPublicPolicyPositions(),
            tablePublicPolicyPositions(),
            principle_8(),
            questionSocialImpactAssessments(),
            tableSocialImpactAssessments(),
            questionRehabilitationAndResettlement(),
            tableRehabilitationAndResettlement(),
            questionGrievanceCommunity(),
            questionInputMaterials(),
            tableInputMaterials(),
            questionJobCreation(),
            await tableJobCreation(obj),
            questionMitigateSocialImpacts(),
            tableMitigateSocialImpacts(),
            questionCSRProjects(),
            tableCSRProjects(),
            questionPreferentialProcurementPolicy(),
            questionIntellectualProperties(),
            tableIntellectualProperties(),
            questionCorrectiveActionsIPDisputes(),
            tableCorrectiveActionsIPDisputes(),
            questionCSRProjectBeneficiaries(),
            tableCSRProjectBeneficiaries(),
            principle_9(),
            consumerComplaintMechanisms(),
            questionTurnoverProductServiceInfo(),
            tableTurnoverProductServiceInfo(),
            questionConsumerComplaints(),
            tableConsumerComplaints(),
            questionproductRecalls(),
            productRecallsTable(),
            cyberSecurityPolicyQuestion(),
            correctiveActionsDetailsProduct(),
            dataBreachesDetails(),
            p9_leadership_indicators(),
            productInfoAccessDetails(),
            consumerEducationDetails(),
            serviceDisruptionDetails(),
            productInfoDisplayDetails(),
          ],
        },
      ],
    });

    const buffer = await Packer.toBuffer(doc);
    const blob = new Blob([buffer], {
      type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    });
    return blob;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Error generating BRSR document:', error);
    throw error;
  }
};

// module.exports = { generateBrsrTemplateBlob };
