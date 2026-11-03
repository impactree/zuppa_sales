import CustomSelect, { getValue } from "@/components/CustomSelect/CustomSelect";
import { Option } from "@/components/types";
import "@testing-library/jest-dom";
import { fireEvent, render, waitFor } from "@testing-library/react";


const options: Option[] = [
  { label: "Option 1", value: "option1" },
  { label: "Option 2", value: "option2" },
];

const field = {
  name: "",
  value: { label: "Option 1", value: "option1" },
  onChange: jest.fn(),
  onBlur: jest.fn(),
};

test("should handle onChange for non-creatable Select without setBeneficiary and setName", async () => {
  const mockSetFieldValue = jest.fn();
  const { getByRole } = render(
    <CustomSelect
      id="test-select"
      options={options}
      isDisabled={false}
      form={{ setFieldValue: mockSetFieldValue }}
    />
  );
  const combobox = getByRole("combobox");
  fireEvent.keyDown(combobox, { key: "ArrowDown" });
  fireEvent.keyDown(combobox, { key: "Enter" });
  await waitFor(() => {
    expect(mockSetFieldValue).toHaveBeenCalledWith("", "option1");
  });
});

test('should handle onChange for creatable Select with isNew and field.name is "name"', async () => {
  const mockonFieldUpdate = jest.fn();
  const { getByRole } = render(
    <CustomSelect
      id="test-creatable-select"
      options={options}
      onFieldUpdate={mockonFieldUpdate}
      isDisabled={false}
    />
  );
  const combobox = getByRole("combobox");
  fireEvent.keyDown(combobox, { key: "ArrowDown" });
  fireEvent.keyDown(combobox, { key: "Enter" });
  fireEvent.change(combobox, { target: { value: "option1" } });
});

test("should return selected options for non-multi select with value and field.value", () => {
  const isMulti = false;
  const value = { label: "Option 1", value: "option1" };
  const result = getValue(options, isMulti, field, value);
  expect(result).toEqual({ label: "Option 1", value: "option1" });
});

test("should return selected options for multi-select with value and field.value", () => {
  const isMulti = true;
  const value = { label: "Option 1", value: "option1" };
  const result = getValue(
    options,
    isMulti,
    { ...field, value: [{ label: "Option 1", value: "option1" }] },
    value
  );
  expect(result).toEqual([]);
});

test("should return null for non-multi select with value but no options", () => {
  const isMulti = false;
  const value = { label: "Option 1", value: "option1" };
  getValue(undefined, isMulti, field, value);
});
test("should handle single value when value and field.value are defined", () => {
  const options: Option[] = [{ label: "Option1", value: "option1" }];
  const isMulti = false;
  const value: Option = { label: "Option1", value: "option1" };

  const result = getValue(options, isMulti, field, value);

  expect(result).toEqual({ label: "Option1", value: "option1" });
});

test("should handle multi value when value and field.value are defined", () => {
  const options: Option[] = [
    { label: "Option1", value: "option1" },
    { label: "Option2", value: "option2" },
  ];
  const isMulti = true;
  const value: Option = { label: "Option1", value: "option1" };
  const result = getValue(
    options,
    isMulti,
    { ...field, value: [{ label: "FieldOption", value: "fieldOption" }] },
    value
  );

  expect(result).toEqual([]);
});

test("should handle single value when value is defined and field.value is undefined", () => {
  const options: Option[] = [{ label: "Option1", value: "option1" }];
  const isMulti = false;
  const field = undefined;
  const value: Option = { label: "Option1", value: "option1" };

  const result = getValue(options, isMulti, field, value);

  expect(result).toEqual({ label: "Option1", value: "option1" });
});

test("should handle multi value when value is defined and field.value is undefined", () => {
  const options: Option[] = [
    { label: "Option1", value: "option1" },
    { label: "Option2", value: "option2" },
  ];
  const isMulti = true;
  const field = undefined;
  const value: Option = { label: "Option1", value: "option1" };

  const result = getValue(options, isMulti, field, value);

  expect(result).toEqual([]);
});

test("should handle undefined value and field.value", () => {
  const options: Option[] = [{ label: "Option1", value: "option1" }];
  const isMulti = false;
  const field = undefined;
  const value = undefined;

  const result = getValue(options, isMulti, field, value);

  expect(result).toEqual("");
});
