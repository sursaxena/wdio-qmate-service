"use strict";
const {handleCookiesConsent} = require("../../../../utils");

describe("errorDialog - clickClose", function () {

  it("Preparation", async function () {
    await non_ui5.common.navigation.navigateToUrl("https://sapui5.hana.ondemand.com/#/entity/sap.m.Dialog/sample/sap.m.sample.Dialog");
    await handleCookiesConsent();
  });

  it("Execution", async function () {
    const dialogSelector = {
      "elementProperties": {
        "viewName": "sap.m.sample.Dialog.V",
        "metadata": "sap.m.Button",
        "text": "Dialog (Fixed Size)"
      }
    };
    await ui5.common.userInteraction.click(dialogSelector);
  });

  it("Verification", async function () {
    const dialogCloseButtonSelector = ui5.common.errorDialog.selectors.closeButton;
    await ui5.common.assertion.expectToBeVisible(dialogCloseButtonSelector);

    await ui5.common.errorDialog.clickClose();
    await ui5.common.assertion.expectToBeNotVisible(dialogCloseButtonSelector);
  });
});