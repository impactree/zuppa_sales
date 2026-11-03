import { formatValue, FormikPhoneNumber } from "@/components/FormikPhoneNumber/FormikPhoneNumber";
import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/react";
import { FieldInputProps, Form, Formik } from "formik";
import * as yup from "yup";

jest.mock(
  "@/components/FormikPhoneNumber/FormikPhoneNumber.css",
  () => jest.fn()
);
jest.mock("react-phone-number-input/style.css", () => jest.fn());
interface FormikPhoneNumberProps {
  name: string;
  label: string;
  errors?: string;
  isDisabled?: boolean;
  validationSchema?: yup.AnySchema;
  onChange?: (value: string) => void
}

const renderFormikPhoneNumber = (props: FormikPhoneNumberProps) => {
  return render(
    <Formik initialValues={{ [props.name]: "" }} onSubmit={() => { }}>
      <Form>
        <FormikPhoneNumber {...props} />
      </Form>
    </Formik>
  );
};

test("renders without errors", () => {
  renderFormikPhoneNumber({ name: "phone", label: "Phone Number" });
  expect(screen.getByLabelText(/Phone Number/i)).toBeInTheDocument();
});
const validationSchema = yup.object().shape({
  phone: yup
    .string()
    .required("Phone number is required")
    .matches(/^\+91 \d{10}$/, "Invalid Phone Number"),
});

test("displays phone input in disabled state when isDisabled prop is true", () => {
  renderFormikPhoneNumber({
    name: "phone",
    label: "Phone Number",
    validationSchema: validationSchema,
    isDisabled: true,
    onChange: jest.fn(),
  });
  const input = screen.getByPlaceholderText(/Enter phone number/i);
  expect(input).toBeDisabled();
});

test("updates phone number value when valid input is provided", () => {
  const validationSchema = yup.object().shape({
    phone: yup
      .string()
      .required("Phone number is required")
      .matches(/^\+91 \d{10}$/, "Invalid Phone Number"),
  });
  renderFormikPhoneNumber({
    name: "phone",
    label: "Phone Number",
    validationSchema,
    onChange: jest.fn(),
  });
  const input = screen.getByPlaceholderText(/Enter phone number/i);
  fireEvent.change(input, { target: { value: "+91 9876543210" } });
  expect((input as HTMLInputElement).value).toBe("+91 98765 43210");
});
test("updates formik state with valid input", () => {
  const { getByPlaceholderText, getByDisplayValue } = renderFormikPhoneNumber(
    {
      name: "phone",
      label: "Phone Number",
      validationSchema: validationSchema,
    }
  );
  const input = getByPlaceholderText(/Enter phone number/i);
  fireEvent.change(input, { target: { value: "+91 9876543210" } });
  expect(getByDisplayValue("+91 98765 43210")).toBeInTheDocument();
});

test("does not display error-related elements for invalid phone number", () => {
  renderFormikPhoneNumber({
    name: "phone",
    label: "Phone Number",
    validationSchema: validationSchema,
  });
  const input = screen.getByPlaceholderText(/Enter phone number/i);
  fireEvent.change(input, { target: { value: "12345" } });
  expect(screen.queryByText("Invalid Phone Number")).not.toBeInTheDocument();
  expect(screen.queryByRole("alert")).not.toBeInTheDocument();
});
test("does not display error message for invalid phone number", () => {
  renderFormikPhoneNumber({
    name: "phone",
    label: "Phone Number",
    validationSchema: validationSchema,
  });
  const input = screen.getByPlaceholderText(/Enter phone number/i);
  fireEvent.change(input, { target: { value: "12345" } });
  expect(screen.queryByText("Invalid Phone Number")).not.toBeInTheDocument();
});

test("formats and validates valid phone number input", () => {
  renderFormikPhoneNumber({
    name: "phone",
    label: "Phone Number",
    validationSchema: validationSchema,
  });
  const input = screen.getByPlaceholderText(/Enter phone number/i);
  fireEvent.change(input, { target: { value: "+91 9876543210" } });
  expect((input as HTMLInputElement).value).toBe("+91 98765 43210");
});

let mockFieldValue: FieldInputProps<any>;

beforeEach(() => {
  mockFieldValue = {
    name: "phone",
    value: undefined,
    onChange: jest.fn(),
    onBlur: jest.fn(),
  };
});

test("should return the value as a string if it's already a string or number", () => {
  const value = "12345";
  expect(formatValue(value, mockFieldValue)).toBe("12345");

  const numValue = 12345;
  expect(formatValue(numValue as any, mockFieldValue)).toBe("12345");
});

test("should return the field value as a string if it's a string or number", () => {
  mockFieldValue.value = "98765";
  expect(formatValue(undefined, mockFieldValue)).toBe("98765");

  mockFieldValue.value = 98765;
  expect(formatValue(undefined, mockFieldValue)).toBe("98765");
});

test("should return the stringified value if the field value is neither string nor number", () => {
  mockFieldValue.value = { phone: "+91 9876543210" };
  expect(formatValue(undefined, mockFieldValue)).toBe(
    '{"phone":"+91 9876543210"}'
  );
});

test("should return an empty string if there is no value or field value", () => {
  expect(formatValue(undefined, mockFieldValue)).toBe("");
});

test("should return the stringified value if the value is null", () => {
  mockFieldValue.value = null;
  expect(formatValue(undefined, mockFieldValue)).toBe("");
});

test("should return an empty string if the fieldValue is an empty object", () => {
  mockFieldValue.value = {};
  expect(formatValue(undefined, mockFieldValue)).toBe("{}");
});