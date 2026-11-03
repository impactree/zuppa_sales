import {
  CustomCreatableSelect, getValue, onChange, onInputChange,
} from "@/components/CustomCreatableSelect/CustomCreatableSelect";
import "@testing-library/jest-dom";
import { render } from "@testing-library/react";

const setInputValueMock = jest.fn();
const fieldMock = {
  name: "fieldName",
  value: "",
  onChange: jest.fn(),
  onBlur: jest.fn(),
};
const options = [
  { label: "Option 1", value: "1" },
  { label: "Option 2", value: "2" },
];
const formMock = { setFieldValue: jest.fn() };

test("renders correctly with default props", () => {
  render(
    <CustomCreatableSelect
      options={options}
      field={fieldMock}
      form={formMock}
      isDisabled={false}
      isClearable={false}
    />
  );
});

test("calls setFieldValue when selecting an option", async () => {
  render(
    <CustomCreatableSelect
      options={options}
      field={fieldMock}
      form={formMock}
      isDisabled={false}
      isClearable={false}
    />
  );
});

test("calls setFieldValue with single option value", () => {
  onChange(options[0], formMock, fieldMock);
  expect(formMock.setFieldValue).toHaveBeenCalledWith("fieldName", "1");
});

test("calls setFieldValue with single option value", () => {
  onChange(options[0], formMock, fieldMock, false, jest.fn());
  expect(formMock.setFieldValue).toHaveBeenCalledWith("fieldName", "1");
});

test("returns single option object", () => {
  const result = getValue(fieldMock, false, options);
  expect(result).toEqual(null);
});
test("returns single option object", () => {
  const result = getValue({ ...fieldMock, value: "123" }, false, options);
  expect(result).toEqual({ label: "123", value: "123" });
});
test("returns single option object", () => {
  const result = getValue({ ...fieldMock, value: "123" }, false, []);
  expect(result).toEqual({ label: "123", value: "123" });
});

test("returns single option object", () => {
  const result = getValue({ ...fieldMock, value: ["abc", "efg"] }, true, []);
  expect(result).toEqual([
    { label: "abc", value: "abc" },
    { label: "efg", value: "efg" },
  ]);
});

test("returns single option object", () => {
  const result = getValue({ ...fieldMock, value: "123" }, true, options);
  expect(result).toEqual([
    { label: "Option 1", value: "Option 1" },
    { label: "Option 2", value: "Option 2" },
    { label: "123", value: "123" },
  ]);
});

test("returns single option object", () => {
  const result = getValue(
    { ...fieldMock, value: ["abc", "efg"] },
    true,
    options
  );
  expect(result).toEqual([
    { label: "abc", value: "abc" },
    { label: "efg", value: "efg" },
  ]);
});
test("sets input value based on maxLength", () => {
  onInputChange("1234567890", setInputValueMock, 5);
  expect(setInputValueMock).toHaveBeenCalledWith("12345");
});

test("sets input value based on maxLength", () => {
  onInputChange("1234567890", setInputValueMock, 500);
  expect(setInputValueMock).toHaveBeenCalledWith("1234567890");
});
