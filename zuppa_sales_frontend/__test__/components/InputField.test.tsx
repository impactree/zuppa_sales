import { InputField } from "@/components/InputField/InputField";
import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/react";
import { Formik } from "formik";
import * as Yup from "yup";

const validationSchema = Yup.object().shape({
  fieldName: Yup.string().required("Field is required"),
});
const handleChange = jest.fn();
const setPasswordIconMock = jest.fn();

test("renders the component with label", () => {
  render(
    <Formik
      initialValues={{ fieldName: "" }}
      validationSchema={validationSchema}
      onSubmit={() => { }}
    >
      <InputField
        validationSchema={validationSchema}
        label="Test Label"
        field={{ name: "fieldName", value: "", onChange: handleChange }}
        isValid={true}
        error=""
      />
    </Formik>
  );
});
test("renders an error message when the input is invalid", () => {
  const { getByText } = render(
    <Formik
      initialValues={{ fieldName: "" }}
      validationSchema={validationSchema}
      onSubmit={() => { }}
    >
      <InputField
        validationSchema={validationSchema}
        label="Test Label"
        field={{ name: "fieldName", value: "", onChange: handleChange }}
        isValid={false}
        error="Field is required"
      />
    </Formik>
  );
  const errorElement = getByText("Field is required");
  expect(errorElement).toBeInTheDocument();
});
test("calls onChange handler when input value changes", () => {
  render(
    <Formik
      initialValues={{ fieldName: "" }}
      validationSchema={validationSchema}
      onSubmit={() => { }}
    >
      <InputField
        validationSchema={validationSchema}
        label="Test Label"
        field={{ name: "fieldName", value: "", onChange: handleChange }}
        isValid={true}
        error=""
      />
    </Formik>
  );
});
test("toggles password visibility", () => {
  const setPasswordIconMock = jest.fn();
  render(
    <Formik
      initialValues={{ fieldName: "" }}
      validationSchema={validationSchema}
      onSubmit={() => { }}
    >
      <InputField
        validationSchema={validationSchema}
        label="Password"
        type="password"
        field={{ name: "password", value: "", onChange: handleChange }}
        isValid={true}
        error=""
        isPassword={true}
        setPasswordIcon={setPasswordIconMock}
        passwordIcon={true}
      />
    </Formik>
  );
  const eyeIconVisible = screen.getByTestId("password-eye-icon");
  expect(eyeIconVisible).toBeInTheDocument();
  fireEvent.click(eyeIconVisible);
  expect(setPasswordIconMock).toHaveBeenCalledWith(false);
  render(
    <Formik
      initialValues={{ fieldName: "" }}
      validationSchema={validationSchema}
      onSubmit={() => { }}
    >
      <InputField
        validationSchema={validationSchema}
        label="Password"
        type="password"
        field={{ name: "password", value: "", onChange: handleChange }}
        isValid={true}
        error=""
        isPassword={true}
        setPasswordIcon={setPasswordIconMock}
        passwordIcon={false}
      />
    </Formik>
  );
  const eyeIconInvisible = screen.getByTestId("password-eye-invisible-icon");
  expect(eyeIconInvisible).toBeInTheDocument();
  fireEvent.click(eyeIconInvisible);
  expect(setPasswordIconMock).toHaveBeenCalledWith(true);
});
test("toggles password invisibility", () => {
  render(
    <Formik
      initialValues={{ fieldName: "" }}
      validationSchema={validationSchema}
      onSubmit={() => { }}
    >
      <InputField
        validationSchema={validationSchema}
        label="Password"
        type="password"
        field={{ name: "password", value: "", onChange: handleChange }}
        isValid={true}
        error=""
        isPassword={true}
        setPasswordIcon={setPasswordIconMock}
        passwordIcon={true}
      />
    </Formik>
  );
});
test("renders the visible eye icon when passwordIcon is true", () => {
  render(
    <Formik
      initialValues={{ fieldName: "" }}
      validationSchema={validationSchema}
      onSubmit={() => { }}
    >
      <InputField
        validationSchema={validationSchema}
        label="Password"
        type="password"
        field={{ name: "password", value: "", onChange: handleChange }}
        isValid={true}
        error=""
        isPassword={true}
        setPasswordIcon={setPasswordIconMock}
        passwordIcon={true}
      />
    </Formik>
  );
  expect(screen.getByTestId("password-eye-icon")).toBeInTheDocument();
  expect(
    screen.queryByTestId("password-eye-invisible-icon")
  ).not.toBeInTheDocument();
});
test("renders the invisible eye icon when passwordIcon is false", () => {
  render(
    <Formik
      initialValues={{ fieldName: "" }}
      validationSchema={validationSchema}
      onSubmit={() => { }}
    >
      <InputField
        validationSchema={validationSchema}
        label="Password"
        type="password"
        field={{ name: "password", value: "", onChange: handleChange }}
        isValid={true}
        error=""
        isPassword={true}
        setPasswordIcon={setPasswordIconMock}
        passwordIcon={false}
      />
    </Formik>
  );
  expect(screen.getByTestId("password-eye-invisible-icon")).toBeInTheDocument();
  expect(screen.queryByTestId("password-eye-icon")).not.toBeInTheDocument();
});
test("renders the component with label", () => {
  render(
    <Formik
      initialValues={{ fieldName: "" }}
      validationSchema={validationSchema}
      onSubmit={() => { }}
    >
      <InputField
        validationSchema={validationSchema}
        label="Test Label"
        field={{
          name: "fieldName",
          value: "",
          onChange: handleChange,
        }}
        isValid={true}
        error=""
        type="text"
      />
    </Formik>
  );
});
test("applies correct class names and triggers onClick", () => {
  render(
    <Formik
      initialValues={{ fieldName: "" }}
      validationSchema={validationSchema}
      onSubmit={() => { }}
    >
      <InputField
        validationSchema={validationSchema}
        label="Password"
        type="password"
        field={{ name: "password", value: "", onChange: handleChange }}
        isValid={true}
        error=""
        isPassword={true}
        setPasswordIcon={setPasswordIconMock}
        passwordIcon={true}
      />
    </Formik>
  );
  const eyeIcon = screen.getByTestId("password-eye-icon");
  expect(eyeIcon).toHaveClass("icon-css");
  fireEvent.click(eyeIcon);
  expect(setPasswordIconMock).toHaveBeenCalledWith(false);
  render(
    <Formik
      initialValues={{ fieldName: "" }}
      validationSchema={validationSchema}
      onSubmit={() => { }}
    >
      <InputField
        validationSchema={validationSchema}
        label="Password"
        type="password"
        field={{ name: "password", value: "", onChange: handleChange }}
        isValid={true}
        error=""
        isPassword={true}
        setPasswordIcon={setPasswordIconMock}
        passwordIcon={false}
      />
    </Formik>
  );
  expect(eyeIcon).toHaveClass("icon-css");
});
