import SkipButton from "@/components/SkipButton/SkipButton";
import { AuthService } from "@/lib/service";
import { fireEvent, render, screen } from "@testing-library/react";
import { useRouter } from "next/navigation";

jest.mock("@/lib/service", () => ({
  AuthService: {
    updateOnboarding: jest.fn(),
  },
}));

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

const mockPush = jest.fn();
const mockApiKey = "test-api-key";

beforeEach(() => {
  jest.clearAllMocks();
  (useRouter as jest.Mock).mockReturnValue({ push: mockPush });
});

test("renders the button with correct text", () => {
  render(<SkipButton apiKey={mockApiKey} type="standard" />);
  expect(screen.getByText("Skip")).toBeInTheDocument();
});

test("calls AuthService.updateOnboarding and navigates to the correct route on success for 'standard'", async () => {
  (AuthService.updateOnboarding as jest.Mock).mockResolvedValueOnce({
    data: { success: true },
  });

  render(<SkipButton apiKey={mockApiKey} type="standard" />);
  const button = screen.getByText("Skip");

  await fireEvent.click(button);

  expect(AuthService.updateOnboarding).toHaveBeenCalledWith(mockApiKey, "standard");
  expect(mockPush).toHaveBeenCalledWith("/company_profile/invite_user");
});

test("calls AuthService.updateOnboarding and navigates to the correct route on success for 'invite'", async () => {
  (AuthService.updateOnboarding as jest.Mock).mockResolvedValueOnce({
    data: { success: true },
  });

  render(<SkipButton apiKey={mockApiKey} type="invite" />);
  const button = screen.getByText("Skip");

  await fireEvent.click(button);

  expect(AuthService.updateOnboarding).toHaveBeenCalledWith(mockApiKey, "invite");
  expect(mockPush).toHaveBeenCalledWith("/company_profile/plans");
});

test("calls AuthService.updateOnboarding and navigates to the correct route on success for 'business_unit'", async () => {
  (AuthService.updateOnboarding as jest.Mock).mockResolvedValueOnce({
    data: { success: true },
  });

  render(<SkipButton apiKey={mockApiKey} type="business_unit" />);
  const button = screen.getByText("Skip");

  await fireEvent.click(button);

  expect(AuthService.updateOnboarding).toHaveBeenCalledWith(mockApiKey, "business_unit");
  expect(mockPush).toHaveBeenCalledWith("/company_profile/standard_regulations");
});

test("calls AuthService.updateOnboarding and navigates to the correct route on success for 'plan'", async () => {
  (AuthService.updateOnboarding as jest.Mock).mockResolvedValueOnce({
    data: { success: true },
  });

  render(<SkipButton apiKey={mockApiKey} type="plan" />);
  const button = screen.getByText("Skip");

  await fireEvent.click(button);

  expect(AuthService.updateOnboarding).toHaveBeenCalledWith(mockApiKey, "plan");
  expect(mockPush).toHaveBeenCalledWith("/dashboard");
});

test("handles API failure gracefully", async () => {
  const consoleSpy = jest.spyOn(console, "error").mockImplementation(() => { });

  (AuthService.updateOnboarding as jest.Mock).mockRejectedValueOnce(new Error("API Error"));

  render(<SkipButton apiKey={mockApiKey} type="standard" />);
  const button = screen.getByText("Skip");

  await fireEvent.click(button);

  expect(AuthService.updateOnboarding).toHaveBeenCalledWith(mockApiKey, "standard");
  expect(consoleSpy).toHaveBeenCalledWith("Failed to update onboarding:", expect.any(Error));

  consoleSpy.mockRestore();
});

test("navigates to the default route if type is invalid", async () => {
  (AuthService.updateOnboarding as jest.Mock).mockResolvedValueOnce({
    data: { success: true },
  });

  render(<SkipButton apiKey={mockApiKey} type={undefined} />);
  const button = screen.getByText("Skip");

  await fireEvent.click(button);

  expect(AuthService.updateOnboarding).toHaveBeenCalledWith(mockApiKey, undefined);
  expect(mockPush).toHaveBeenCalledWith("/company_profile/business_unit");
});
