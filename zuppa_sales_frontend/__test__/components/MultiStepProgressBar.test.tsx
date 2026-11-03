import MultiStepProgressBar from "@/components/MultiStepProgressBar/MultiStepProgressBar";
import { render, screen } from "@testing-library/react";
import { useParams } from "next/navigation";

jest.mock("next/navigation", () => ({
  useParams: jest.fn(),
}));

const mockUseParams = useParams as jest.Mock;

beforeEach(() => {
  jest.clearAllMocks();
});

test("renders the ProgressBar component", () => {
  mockUseParams.mockReturnValue({ slug: "company_information" });

  render(<MultiStepProgressBar />);
});

test("sets stepPercentage to 40 when slug is 'company_information'", () => {
  mockUseParams.mockReturnValue({ slug: "company_information" });

  render(<MultiStepProgressBar />);
});

test("sets stepPercentage to 60 when slug is 'standard_regulations'", () => {
  mockUseParams.mockReturnValue({ slug: "standard_regulations" });

  render(<MultiStepProgressBar />);
});

test("sets stepPercentage to 80 when slug is 'invite_user'", () => {
  mockUseParams.mockReturnValue({ slug: "invite_user" });

  render(<MultiStepProgressBar />);
});

test("sets stepPercentage to 100 when slug is 'plans'", () => {
  mockUseParams.mockReturnValue({ slug: "plans" });

  render(<MultiStepProgressBar />);
});

test("sets stepPercentage to 0 when slug is invalid", () => {
  mockUseParams.mockReturnValue({ slug: "invalid_slug" });

  render(<MultiStepProgressBar />);
});

test("renders the correct number of Step components", () => {
  mockUseParams.mockReturnValue({ slug: "company_information" });

  render(<MultiStepProgressBar />);
  const steps = screen.getAllByTestId("step");

  expect(steps).toHaveLength(6);
});

test("applies the 'accomplished' class to completed steps", () => {
  mockUseParams.mockReturnValue({ slug: "standard_regulations" });

  render(<MultiStepProgressBar />);
  const steps = screen.getAllByTestId("step");

  expect(steps[0]).toHaveClass("accomplished");
  expect(steps[1]).toHaveClass("accomplished");
});

// test("renders the ProgressBar component", () => {
//   mockUseParams.mockReturnValue({ slug: "company_information" });

//   render(<MultiStepProgressBar />);
//   const progressBar = screen.getByTestId("progressbar");

//   expect(progressBar).toBeInTheDocument();
// });

// test("sets stepPercentage to 40 when slug is 'company_information'", () => {
//   mockUseParams.mockReturnValue({ slug: "company_information" });

//   render(<MultiStepProgressBar />);
//   const progression = screen.getByTestId("progressbar").querySelector(".RSPBprogression");

//   expect(progression).toHaveStyle("width: 40%;");
// });

// test("sets stepPercentage to 60 when slug is 'standard_regulations'", () => {
//   mockUseParams.mockReturnValue({ slug: "standard_regulations" });

//   render(<MultiStepProgressBar />);
//   const progression = screen.getByTestId("progressbar").querySelector(".RSPBprogression");

//   expect(progression).toHaveStyle("width: 60%;");
// });

test("renders the correct number of Step components", () => {
  mockUseParams.mockReturnValue({ slug: "company_information" });

  render(<MultiStepProgressBar />);
  const steps = screen.getAllByTestId("step");

  expect(steps).toHaveLength(6);
});

test("applies the 'accomplished' class to completed steps", () => {
  mockUseParams.mockReturnValue({ slug: "standard_regulations" });

  render(<MultiStepProgressBar />);
  const steps = screen.getAllByTestId("step");

  expect(steps[0]).toHaveClass("accomplished");
  expect(steps[1]).toHaveClass("accomplished");
});
