"use strict";

describe("userInteraction - clearAndFill form field", function () {
  let element;
  it("Preparation", async function () {
    await common.navigation.navigateToUrl("http://localhost:34005/forms.html");
    element = await nonUi5.element.getElementById("ExampleValue1", 10000);

    // Check field is empty before the test
    common.assertion.expectValueToBe(element, "", "value");
  });

  it("Execution and Verification", async function () {
    await nonUi5.userInteraction.clearAndFill(element, "First test value");
    await common.assertion.expectValueToBe(element, "First test value", "value");

    await expect(nonUi5.userInteraction.clearAndFill(element))
      .rejects.toThrow("Function 'clearAndFill' failed: Please provide an element and value as arguments.");
    await common.assertion.expectValueToBe(element, "First test value", "value");

    await nonUi5.userInteraction.clearAndFill(element, "Second test value");
    await common.assertion.expectValueToBe(element, "Second test value", "value");

    await expect(nonUi5.userInteraction.clearAndFill())
      .rejects.toThrow("Function 'clearAndFill' failed: Please provide an element and value as arguments.");
    await common.assertion.expectValueToBe(element, "Second test value", "value");

    await expect(nonUi5.userInteraction.clearAndFill(element, null))
      .rejects.toThrow("Function 'clearAndFill' failed: Please provide an element and value as arguments.");;
    await common.assertion.expectValueToBe(element, "Second test value", "value");
  });
});

describe("userInteraction - clearAndFill form field without value (unhappy case)", function () {
  let element;
  it("Preparation", async function () {
    await common.navigation.navigateToUrl("http://localhost:34005/forms.html");
  });
});

describe("userInteraction - clearAndFill a button (unhappy case)", function () {
  it("Preparation", async function () {
    await common.navigation.navigateToUrl("http://localhost:34005/buttons.html");
  });

  it("Execution and Verification", async function () {
    const elem = await nonUi5.element.getElementById("Default", 10000);
    await expect(nonUi5.userInteraction.clearAndFill(elem, "New test value"))
      .rejects.toThrow(/invalid element state/);
  });
});