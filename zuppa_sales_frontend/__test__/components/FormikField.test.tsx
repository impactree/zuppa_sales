import { FormikField } from "@/components/FormikField/FormikField";
import { render } from "@testing-library/react";
import { Formik, useFormikContext } from "formik";
import * as Yup from "yup";

jest.mock("formik", () => ({
  ...jest.requireActual("formik"),
  useFormikContext: jest.fn(),
}));
jest.mock('next/navigation', () => ({
  usePathname: jest.fn(),
}));

test("renders date picker and updates form value on change", async () => {
  const mockContextValues = {
    values: { name: "" },
    errors: { name: "" },
    handleChange: jest.fn(),
    setFieldValue: jest.fn(),
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .required("Field is required")
      .max(50, "Field must be at most 50 characters long"),
  });

  const errors = {
    name: "Field is required",
  };

  (useFormikContext as jest.Mock).mockReturnValue(mockContextValues);

  render(
    <Formik
      initialValues={{ name: "" }}
      validationSchema={validationSchema}
      onSubmit={() => { }}
    >
      <FormikField
        name="name"
        label="Your Name Label"
        errors={errors}
        validationSchema={validationSchema}
        type={"text"}
      />
    </Formik>
  );
});
