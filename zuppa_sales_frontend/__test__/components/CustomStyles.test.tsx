import { CustomStyles } from "@/components/CustomStyles/CustomStyles";

test("returns styles for selected option", () => {
  const selectedStyles = CustomStyles.option(
    {},
    { isSelected: true, isFocused: false }
  );
  expect(selectedStyles.backgroundColor).toBe("var(--secondary)");
  expect(selectedStyles.color).toBe("var(--white)");
});

test("returns styles for focused option", () => {
  const focusedStyles = CustomStyles.option(
    {},
    { isSelected: false, isFocused: true }
  );
  expect(focusedStyles.backgroundColor).toBe("var(--hoverColor)");
  expect(focusedStyles.color).toBe("var(--secondary)");
});

test("returns default styles for unselected and unfocused option", () => {
  const defaultStyles = CustomStyles.option(
    {},
    { isSelected: false, isFocused: false }
  );
  expect(defaultStyles.backgroundColor).toBeUndefined();
  expect(defaultStyles.color).toBeUndefined();
});
