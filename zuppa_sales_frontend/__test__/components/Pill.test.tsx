import { Pill } from "@/components/Pill/Pill";
import * as utils from "@/lib/utils";
import { render, screen } from "@testing-library/react";

jest.mock("@/lib/utils", () => ({
  convertToPascalCase: jest.fn(),
  getStatusColor: jest.fn(),
}));

const pillText = "active_status";

beforeEach(() => {
  jest.clearAllMocks();
});

test("should render the pill text correctly transformed to PascalCase", () => {
  (utils.convertToPascalCase as jest.Mock).mockReturnValue("Active Status");

  render(<Pill pillText={pillText} />);

  expect(screen.getByText("Active Status")).toBeInTheDocument();
});

test("should apply the correct class based on getStatusColor", () => {
  (utils.getStatusColor as jest.Mock).mockReturnValue("green");

  render(<Pill pillText={pillText} />);

  const pill = screen.getByTestId(pillText);
  expect(pill).toHaveClass("green-pill");
});

test("should render with the correct id and data-testid", () => {
  (utils.convertToPascalCase as jest.Mock).mockReturnValue("Active Status");
  (utils.getStatusColor as jest.Mock).mockReturnValue("green");

  render(<Pill pillText={pillText} />);

  const pill = screen.getByTestId(pillText);
  expect(pill).toHaveAttribute("id", pillText);
  expect(pill).toHaveAttribute("data-testid", pillText);
});

test("should handle the case when the pillText contains underscores or hyphens", () => {
  (utils.convertToPascalCase as jest.Mock).mockReturnValue("Active Status");

  render(<Pill pillText="active_status-example" />);

  expect(screen.getByTestId("active_status-example")).toBeInTheDocument();
});
