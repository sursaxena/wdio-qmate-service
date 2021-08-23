/**
* @class userInteraction
* @memberof ui5.common
*/
const UserInteraction = function () {

  //----------------------------------- MOUSE ----------------------------------
  /**
   * @function click
   * @memberOf ui5.common.userInteraction
   * @description Clicks on the passed element.
   * @param {Object} selector - The selector describing the element.
   * @param {Number} index=0 - The index of the selector, in case there are more than
   * one elements visible at the same time. By default, it takes 0.
   * @param {Number} timeout=30000 - The timeout to wait (default value: 30 sec).
   * @example await ui5.common.userInteraction.click(selector);
   */
  this.click = async function (selector, index = 0, timeout = 30000) {
    let elem = null;
    await browser.waitUntil(async function () {
      elem = await ui5.common.locator.getDisplayedElement(selector, index, timeout);
      if (!elem) return false;
      return elem.isClickable();
    }, { timeout, timeoutMsg: `Element not clickable after ${timeout / 1000}s` });
    try {
      await elem.click();
    } catch (error) {
      if (error.message && error.message.match(new RegExp(/is not clickable at point/))) {
        const errorMessage = await utilities.function.mapWdioErrorToVyperErrorMessage(error, "click");
        throw new Error(errorMessage);
      } 
    }
  };

  /**
  * @function clickAndRetry
  * @memberOf ui5.common.userInteraction
  * @description Clicks on the passed element and retries in case it fails.
  * @param {Object} selector - The selector describing the element.
  * @param {Number} index=0 - The index of the selector, in case there are more than
  * one elements visible at the same time. By default, it takes 0.
  * @param {Number} timeout=30000 - The timeout to wait (default value: 30 sec).
  * @param {Number} retries - The number of retries, can be set in config for all functions under params stepsRetries. Default is 3 times.
  * @param {Number} interval - The interval of the retries, can be set in config for all functions under params stepRetriesIntervals. Default is 5 secs.
  * @example await ui5.common.userInteraction.clickAndRetry(selector, 0, 30000, 2, 1000);
  */
  this.clickAndRetry = async function (selector, index = 0, timeout = 30000, retries, interval) {
    await utilities.function.retry(this.click, [selector, index, timeout], retries, interval, this);
  };

  /**
  * @function clickTab
  * @memberOf ui5.common.userInteraction
  * @description Clicks on the passed tab and checks if the tab got selected successfully.
  * The function retries the click if the selection of the tab (blue underline) was not successful.
  * The maximum amount of retries is set to 3 per default.
  * @param {Object} selector - The selector describing the element.
  * @param {Number} index=0 - The index of the selector, in case there are more than
  * one elements visible at the same time. By default, it takes 0.
  * @param {Number} timeout=30000 - The timeout to wait (default value: 30 sec).
  * @example await ui5.common.userInteraction.clickTab(selector);
  */
  this.clickTab = async function (selector, index = 0, timeout = 30000) {
    await utilities.function.retry(async function (selector, index, timeout) {
      await ui5.common.userInteraction.click(selector);
      const tab = await ui5.common.locator.getDisplayedElement(selector, index, timeout);
      const classList = await tab.getAttribute("class");
      if (!classList.includes("sapUxAPAnchorBarButtonSelected")) {
        throw new Error();
      }
    }, [selector, index, timeout], 3, 5000, this);
  };

  /**
   * @function clickListItem
   * @memberOf ui5.common.userInteraction
   * @description Clicks on a specific item of a list (e.g. ColumnListItem, StandardListItem, etc.).
   * In some cases the default click function is not working correctly (clicks an element within the list item).
   * Therefore we recommend to use this function to open a specific list item.
   * @param {Object} selector - The selector describing the element.
   * @param {Integer} index - The index of the selector, in case there are more than
   * one elements visible at the same time. By default, it takes 0.
   * @param {Integer} timeout - The timeout to wait (default value: 30 sec).
   * @example await ui5.common.userInteraction.clickListItem(selector);
   */
  this.clickListItem = async function (selector, index = 0, timeout = 30000) {
    const elem = await common.locator.getDisplayedElement(selector, index, timeout);
    await ui5.common.client.executeControlInBrowser(function (control, done) {
      control.attachPress(function () {
        done();
      });
      control.firePress();
    }, elem);
  };

  //--------------------------------- KEYBOARD ---------------------------------
  /**
  * @function pressEnter
  * @memberOf ui5.common.userInteraction
  * @description Performs the Enter keypress.
  * @example await ui5.common.userInteraction.pressEnter();
  */
  this.pressEnter = async function () {
    await non_ui5.common.userInteraction.pressEnter();
  };

  /**
  * @function pressF4
  * @memberOf ui5.common.userInteraction
  * @description Performs the F4 keypress.
  * @example await ui5.common.userInteraction.pressF4();
  */
  this.pressF4 = async function () {
    await browser.keys("\uE034");
  };

  /**
   * @function pressTab
   * @memberOf ui5.common.userInteraction
   * @description Performs the Tab keypress.
   * @example await ui5.common.userInteraction.pressTab();
   */
  this.pressTab = async function () {
    await non_ui5.common.userInteraction.pressTab();
  };

  /**
   * @function pressBackspace
   * @memberOf ui5.common.userInteraction
   * @description Performs the Backspace keypress.
   * @example await ui5.common.userInteraction.pressBackspace();
   */
  this.pressBackspace = async function () {
    await non_ui5.common.userInteraction.pressBackspace();
  };

  /**
   * @function pressArrowLeft
   * @memberOf ui5.common.userInteraction
   * @description Performs the Arrow Left keypress.
   * @example await ui5.common.userInteraction.pressArrowLeft();
   */
  this.pressArrowLeft = async function () {
    await non_ui5.common.userInteraction.pressArrowLeft();
  };

  /**
   * @function pressArrowRight
   * @memberOf ui5.common.userInteraction
   * @description Performs the Arrow Right keypress.
   * @example await ui5.common.userInteraction.pressArrowRight();
   */
  this.pressArrowRight = async function () {
    await non_ui5.common.userInteraction.pressArrowRight();
  };

  /**
   * @function pressEscape
   * @memberOf ui.common.userInteraction
   * @description Performs the Escape keypress.
   * @example await ui5.common.userInteraction.pressEscape();
   */
  this.pressEscape = async function () {
    await non_ui5.common.userInteraction.pressEscape();
  };

  // Note: need to skip check from vyperForAll, because it is now required - vyper-wdio works with.
  /**
   * if (isChrome && isMac) {
      throw new Error("Select All is not supported in chrome Mac edition");
    } else {
   */
  /**
  * @function selectAll
  * @memberOf ui5.common.userInteraction
  * @description Select all (ctrl + a) at passed element.
  * @param {Object} selector - The selector describing the element.
  * @param {Number} index=0 - The index of the selector, in case there are more than
  * one elements visible at the same time. By default, it takes 0.
  * @param {Number} timeout=30000 - The timeout to wait (default value: 30 sec).
  * @example await ui5.common.userInteraction.selectAll(selector);
  */
  this.selectAll = async function (selector, index = 0, timeout = 30000) {
    if (selector !== undefined) {
      await this.click(selector, index, timeout);
    } else {
      console.log("Selector properties are undefined");
    }
    await browser.keys(["\uE051", "a"]);
  };

  //---------------------------------- INPUTS ----------------------------------
  /**
  * @function fill
  * @memberOf ui5.common.userInteraction
  * @description Fills the passed input if it is defined.
  * @param {Object} selector - The selector describing the element.
  * @param {String} value - The value with witch the input should be filled.
  * @param {Number} index - The index of the selector, in case there are more than
  * one elements visible at the same time. By default, it takes 0.
  * @param {Number} timeout - The timeout to wait (default value: 30 sec).
  * @example await ui5.common.userInteraction.fill(selector, "My Value");
  */
  this.fill = async function (selector, value, index = 0, timeout = 30000) {
    if (value !== null) {
      const id = await ui5.common.locator.getElementId(selector, index, timeout);
      let elem = null;
      if (selector.elementProperties.metadata === "sap.m.TextArea") {
        elem = await non_ui5.common.locator.getElementByCss("[id='" + id + "'] textarea", index, timeout);
      } else {
        elem = await non_ui5.common.locator.getElementByCss("[id='" + id + "'] input", index, timeout);
      }
      await elem.setValue(value);
    }
  };

  /**
  * @function fillAndRetry
  * @memberOf ui5.common.userInteraction
  * @description Fills the passed input if it is defined, and retries in case it fails.
  * @param {Object} selector - The selector describing the element.
  * @param {String} value - The value with witch the input should be filled.
  * @param {Number} index - The index of the selector, in case there are more than
  * one elements visible at the same time. By default, it takes 0.
  * @param {Number} timeout - The timeout to wait (default value: 30 sec).
  * @param {Number} retries - The number of retries, can be set in config for all functions under params stepsRetries. Default is 3 times.
  * @param {Number} interval - The interval of the retries, can be set in config for all functions under params stepRetriesIntervals. Default is 5 secs.
  * @example await ui5.common.userInteraction.fillAndRetry(selector, "My Value");
  */
  this.fillAndRetry = async function (selector, value, index = 0, timeout = 30000, retries, interval) {
    await utilities.function.retry(this.fill, [selector, value, index, timeout], retries, interval, this);
  };

  /**
  * @function fillActive
  * @memberOf ui5.common.userInteraction
  * @description Fills the active input.
  * @param {String} value - The value with witch the input should be filled.
  * @example await ui5.common.userInteraction.fillActive("My Value");
  */
  this.fillActive = async function (value) {
    if (value !== null) {
      const elem = await $(await browser.getActiveElement());
      await elem.addValue(value);
      return elem;
    } else {
      throw new Error("fillActive(): Function fillActive failed. Please provide a value as first parameter.");
    }
  };

  /**
  * @function fillActiveAndRetry
  * @memberOf ui5.common.userInteraction
  * @description Fills the active input, and retries in case it fails.
  * @param {String} value - The value with witch the input should be filled.
  * @param {Number} retries - The number of retries, can be set in config for all functions under params stepsRetries. Default is 3 times.
  * @param {Number} interval - The interval of the retries, can be set in config for all functions under params stepRetriesIntervals. Default is 5 secs.
  * @example await ui5.common.userInteraction.fillActiveAndRetry("My Value");
  */
  this.fillActiveAndRetry = async function (value, retries, interval) {
    return await utilities.function.retry(this.fillActive, [value], retries, interval, this);
  };

  /**
  * @function clearAndFillSmartFieldInput
  * @memberOf ui5.common.userInteraction
  * @description Clears the passed smart filed and fills it subsequently.
  * @param {Object} selector - The selector describing the element.
  * @param {String} value - The value with witch the input should be filled.
  * @param {Number} index - The index of the selector, in case there are more than
  * one elements visible at the same time. By default, it takes 0.
  * @param {Number} timeout - The timeout to wait (default value: 30 sec).
  * @example await ui5.common.userInteraction.clearAndFillSmartFieldInput(selector, "My Value");
  */
  this.clearAndFillSmartFieldInput = async function (selector, value, index = 0, timeout = 30000) {
    const id = await ui5.common.locator.getElementId(selector, index, timeout);
    const elem = await non_ui5.common.locator.getElementByCss(`input[id*='${id}']`);
    await elem.click();
    await ui5.common.userInteraction.selectAll(selector, index, timeout);
    await elem.setValue(value);
  };

  /**
  * @function clearSmartFieldInput
  * @memberOf ui5.common.userInteraction
  * @description Clears the passed smart filed.
  * @param {Object} selector - The selector describing the element.
  * @param {Number} index - The index of the selector, in case there are more than
  * one elements visible at the same time. By default, it takes 0.
  * @param {Number} timeout - The timeout to wait (default value: 30 sec).
  * @example await ui5.common.userInteraction.clearSmartFieldInput(selector);
  */
  this.clearSmartFieldInput = async function (selector, index = 0, timeout = 30000) {
    return await ui5.common.userInteraction.clear(selector, index, timeout);
  };

  /**
  * @function clearAndFillSmartFieldInputAndRetry
  * @memberOf ui5.common.userInteraction
  * @description Clears the passed smart filed and fills it, and retries in case it fails.
  * @param {Object} selector - The selector describing the element.
  * @param {String} value - The value with witch the input should be filled.
  * @param {Number} index - The index of the selector, in case there are more than
  * one elements visible at the same time. By default, it takes 0.
  * @param {Number} timeout - The timeout to wait (default value: 30 sec).
  * @param {Number} retries - The number of retries, can be set in config for all functions under params stepsRetries. Default is 3 times.
  * @param {Number} interval - The interval of the retries, can be set in config for all functions under params stepRetriesIntervals. Default is 5 secs.
  * @example await ui5.common.userInteraction.clearAndFillSmartFieldInputAndRetry(selector, "My Value");
  */
  this.clearAndFillSmartFieldInputAndRetry = async function (selector, value, index = 0, timeout = 30000, retries, interval) {
    await utilities.function.retry(this.clearAndFillSmartFieldInput, [selector, value, index, timeout], retries, interval, this);
  };

  /**
  * @function clearAndFill
  * @memberOf ui5.common.userInteraction
  * @description Clears the passed input if it is defined and fills it subsequently.
  * @param {Object} selector - The selector describing the element.
  * @param {String} value - The value with witch the input should be filled.
  * @param {Number} index - The index of the selector, in case there are more than
  * one elements visible at the same time. By default, it takes 0.
  * @param {Number} timeout - The timeout to wait (default value: 30 sec).
  * @example await ui5.common.userInteraction.clearAndFill(selector, "My Value");
  */
  this.clearAndFill = async function (selector, value, index = 0, timeout = 30000) {
    if (value !== null) {
      await this.clear(selector, index, timeout);
      return await this.fillActive(value);
    } else {
      throw new Error("Function clearAndFill failed. Please provide a value as second parameter.");
    }
  };

  /**
 * @function clearFillAndRetry
 * @memberOf ui5.common.userInteraction
 * @description Clears the passed input if it is defined and fills it, and retries in case it fails.
 * @param {Object} selector - The selector describing the element.
 * @param {String} value - The value with witch the input should be filled.
 * @param {Number} index - The index of the selector, in case there are more than
 * one elements visible at the same time. By default, it takes 0.
 * @param {Number} timeout - The timeout to wait (default value: 30 sec).
 * @param {Number} retries - The number of retries, can be set in config for all functions under params stepsRetries. Default is 3 times.
 * @param {Number} interval - The interval of the retries, can be set in config for all functions under params stepRetriesIntervals. Default is 5 secs.
 * @param {Boolean} verify - Verifies if the value was entered correctly. Default is true.
 * @example await ui5.common.userInteraction.clearFillAndRetry(selector, "My Value");
 */
  this.clearFillAndRetry = async function (selector, value, index = 0, timeout = 30000, retries, interval, verify = true) {
    return await utilities.function.retry(async (selector, value, index, timeout) => {
      const elem = await this.clearAndFill(selector, value, index, timeout);
      if (verify) {
        //Verify that value was entered correctly
        const elemValue = await elem.getValue();
        if (elemValue !== value) {
          throw new Error("Verification failed. Values could not be applied as expected.");
        }
      }
    }, [selector, value, index, timeout], retries, interval, this);
  };

  /**
  * @function clearAndFillActive
  * @memberOf ui5.common.userInteraction
  * @description Clears and fills the active input.
  * @param {String} value - The value with witch the input should be filled.
  * @example await ui5.common.userInteraction.clearAndFillActive("My Value");
  */
  this.clearAndFillActive = async function (value) {
    if (value !== null) {
      const elem = await $(await browser.getActiveElement());
      await elem.clearValue();
      await elem.setValue(value);
    } else {
      throw new Error("Function clearAndFillActive failed. Please provide a value as first parameter.");
    }
  };

  /**
  * @function clearFillActiveAndRetry
  * @memberOf ui5.common.userInteraction
  * @description Clears and fills the active input, and retries in case it fails.
  * @param {String} value - The value with witch the input should be filled.
  * @param {Number} retries - The number of retries, can be set in config for all functions under params stepsRetries. Default is 3 times.
  * @param {Number} interval - The interval of the retries, can be set in config for all functions under params stepRetriesIntervals. Default is 5 secs.
  * @example await ui5.common.userInteraction.clearFillActiveAndRetry("My Value");
  */
  this.clearFillActiveAndRetry = async function (value, retries, interval) {
    return await utilities.function.retry(this.clearAndFillActive, [value], retries, interval, this);
  };

  // need to be updated - would be better tu use clearHelper function
  /**
  * @function clear
  * @memberOf ui5.common.userInteraction
  * @description Clears the passed input.
  * @param {Object} selector - The selector describing the element.
  * @param {Number} index - The index of the selector, in case there are more than
  * one elements visible at the same time. By default, it takes 0.
  * @param {Number} timeout - The timeout to wait (default value: 30 sec).
  * @example await ui5.common.userInteraction.clear(selector);
  */
  this.clear = async function (selector, index = 0, timeout = 30000) {
    await clearHelper(selector, index, timeout);
  };

  // this is a private helper function which clears all types of input fields with or without tokens
  async function clearHelper(selector, index = 0, timeout = 30000) {
    let id, elem;
    if (selector) {
      await ui5.common.userInteraction.click(selector, index, timeout);
      id = await ui5.common.locator.getElementId(selector, index, timeout);
      elem = await browser.getActiveElement();
    } else {
      elem = await browser.getActiveElement();
      await elem.click();
      id = await utilities.function.getAttribute(elem, "id");
    }

    const tokenizers = await browser.execute(function (id) {
      const t = document.getElementById(id).querySelectorAll(".sapMTokenizer");
      const inputs = document.getElementById(id).getElementsByTagName("input");
      const textareas = document.getElementById(id).getElementsByTagName("textarea");

      if (inputs.length) {
        inputs[0].value = "";
      }

      if (textareas.length) {
        textareas[0].value = "";
      }
      return t;

    }, id);

    if (await tokenizers && await tokenizers.length) {
      await ui5.common.userInteraction.selectAll(selector, index, timeout);
      await ui5.common.userInteraction.pressBackspace();
    }
  }

  /**
  * @function clearAndRetry
  * @memberOf ui5.common.userInteraction
  * @description Clears the passed input.
  * @param {Object} selector - The selector describing the element, and retries in case it fails.
  * @param {Number} index - The index of the selector, in case there are more than
  * one elements visible at the same time. By default, it takes 0.
  * @param {Number} timeout - The timeout to wait (default value: 30 sec).
  * @param {Number} retries - The number of retries, can be set in config for all functions under params stepsRetries. Default is 3 times.
  * @param {Number} interval - The interval of the retries, can be set in config for all functions under params stepRetriesIntervals. Default is 5 secs.
  * @example await ui5.common.userInteraction.clearAndRetry(selector);
  */
  this.clearAndRetry = async function (selector, index = 0, timeout = 30000, retries, interval) {
    return await utilities.function.retry(this.clear, [selector, index, timeout], retries, interval, this);
  };

  /**
  * @function openF4Help
  * @memberOf ui5.common.userInteraction
  * @description Opens the F4-help of the passed element.
  * @param {Object} selector - The selector describing the element.
  * @param {Number} index - The index of the selector, in case there are more than
  * one elements visible at the same time. By default, it takes 0.
  * @param {Number} timeout - The timeout to wait (default value: 30 sec).
  * @param {Boolean} useF4Key - Specifies if the help is opened by pressing the F4-key or via the button.
  * The default value is true (triggered by pressing the F4-key). Set "useF4Key" to false, to trigger the search by clicking the button.
  * @example await ui5.common.userInteraction.openF4Help(selector, 0, 30000, false);
  */
  this.openF4Help = async function (selector, index = 0, timeout = 30000, useF4Key = true) {
    await ui5.common.userInteraction.click(selector, index, timeout);
    if (useF4Key === true) {
      await this.pressF4();
    } else {
      const id = await ui5.common.locator.getElementId(selector);
      const button = await non_ui5.common.locator.getElementByCss("[id='" + id + "-vhi']", 0, timeout);
      await button.click();
    }
  };

  //---------------------------------- SEARCH ----------------------------------
  /**
  * @function searchFor
  * @memberOf ui5.common.userInteraction
  * @description Searchs for the passed value and executes the search.
  * In case that the search is already filled, it will reset the field first.
  * @param {Object} selector - The selector describing the element.
  * @param {String} value - The value with witch the search input is being filled.
  * @param {Number} index - The index of the selector, in case there are more than
  * one elements visible at the same time. By default, it takes 0.
  * @param {Number} timeout - The timeout to wait (default value: 30 sec).
  * @param {Boolean} useEnter - Specifies if the search is triggered by pressing the Enter-key or via the search button.
  * The default value is true (triggered by pressing the Enter-key). Set "useEnter" to false, to trigger the search by clicking the search button.
  * @example await ui5.common.userInteraction.searchFor(selector, "My Value", 0, 30000, false);
  */
  this.searchFor = async function (selector, value, index = 0, timeout = 30000, useEnter = true) {
    await ui5.common.userInteraction.clearFillAndRetry(selector, value, index, timeout);
    if (useEnter === true) {
      return this.pressEnter(); // await in return is nit required - it slows the code, because the same Promise will be resolved twice
    } else {
      const id = await ui5.common.locator.getElementId(selector, index, timeout);
      const searchButton = await non_ui5.common.locator.getElementByCss("[id='" + id + "-search']", 0, timeout);
      return await searchButton.click();
    }
  };


  /**
  * @function resetSearch
  * @memberOf ui5.common.userInteraction
  * @description Resets the search field if it is filled.
  * In case that the search is not filled, it will raise an error.
  * @param {Object} selector - The selector describing the element.
  * @param {Number} index - The index of the selector, in case there are more than
  * one elements visible at the same time. By default, it takes 0.
  * @param {Number} timeout - The timeout to wait (default value: 30 sec).
  * @example await ui5.common.userInteraction.resetSearch(selector);
  */
  this.resetSearch = async function (selector, index = 0, timeout = 30000) {
    const id = await ui5.common.locator.getElementId(selector, index, timeout);
    const resetButton = await non_ui5.common.locator.getElementByCss("[id='" + id + "-reset']", 0, timeout);
    return resetButton.click();
  };

  //---------------------------------- SELECT ----------------------------------
  /**
  * @function selectComboBox
  * @memberOf ui5.common.userInteraction
  * @description Selects the passed value from the ComboBox.
  * Please note that the function will only work for the default ComboBox.
  * In special cases, please use the clickSelectArrow function.
  * @param {Object} selector - The selector describing the element.
  * @param {Number} value - The value of the element to be selected.
  * @param {Number} index - The index of the selector, in case there are more than
  * one elements visible at the same time. By default, it takes 0.
  * @example await ui5.common.userInteraction.selectComboBox(selector, "Germany");
  */
  this.selectComboBox = async function (selector, value, index = 0) {
    await this.clickSelectArrow(selector, index);
    if (value) {
      const ui5ControlProperties = {
        "elementProperties": { "metadata": "sap.m.StandardListItem", "mProperties": { "title": value } },
        "parentProperties": { "metadata": "sap.m.List", "mProperties": {} }
      };
      await ui5.common.locator.scrollToElement(ui5ControlProperties);
      await this.click(ui5ControlProperties);
    }
    // No return
  };

  /**
  * @function selectMultiComboBox
  * @memberOf ui5.common.userInteraction
  * @description Selects the passed values of the MultiComboBox.
  * Please note that the function will only work for the default MultiComboBox.
  * In special cases, please use the clickSelectArrow function.
  * @param {Object} selector - The selector describing the element.
  * @param {Number} values - The array of values of the elements to be selected.
  * @param {Number} index - The index of the selector, in case there are more than
  * one elements visible at the same time. By default, it takes 0.
  * @example await ui5.common.userInteraction.selectMultiComboBox(selector, ["Item1", "Item2"]);
  */
  this.selectMultiComboBox = async function (selector, values, index = 0) {
    await this.clickSelectArrow(selector, index);
    for (const v in values) {
      const ui5ControlProperties = {
        "elementProperties": { "metadata": "sap.m.CheckBox", "mProperties": {} },
        "parentProperties": { "metadata": "sap.m.StandardListItem", "mProperties": { "title": values[v] } }
      };
      await ui5.common.locator.scrollToElement(ui5ControlProperties);
      await this.click(ui5ControlProperties);
    }
    await this.pressEnter();
  };

  /**
  * @function selectBox
  * @memberOf ui5.common.userInteraction
  * @description Selects the passed value of the Select box.
  * Please note that the function will only work for the default select Box.
  * In special cases, please use the clickSelectArrow function.
  * @param {Object} selector - The selector describing the element.
  * @param {Number} value - The value of the element to be selected.
  * @param {Number} index - The index of the selector, in case there are more than
  * one elements visible at the same time. By default, it takes 0.
  * @example await ui5.common.userInteraction.selectBox(selector, "Germany");
  */
  this.selectBox = async function (selector, value, index = 0) {
    await this.clickSelectArrow(selector, index);
    if (value) {
      const ui5ControlProperties = {
        "elementProperties": { "metadata": "sap.ui.core.Item", "mProperties": { "text": value } },
        "parentProperties": { "metadata": "sap.m.SelectList", "mProperties": {} }
      };
      await ui5.common.locator.scrollToElement(ui5ControlProperties);
      await this.click(ui5ControlProperties);
    }
  };

  /**
  * @function clickSelectArrow
  * @memberOf ui5.common.userInteraction
  * @description Clicks the arrow icon at the passed selector (select box).
  * @param {Object} selector - The selector describing the element.
  * @param {Integer} index - The index of the selector, in case there are more than
   * @example await ui5.common.userInteraction.clickSelectArrow(selector);
  */
  this.clickSelectArrow = async function (selector, index = 0) {
    const id = await ui5.common.locator.getElementId(selector, index);
    const arrow = await non_ui5.common.locator.getElementByCss("[id='" + id + "-arrow']", 0, 3000);
    await arrow.click();
  };

  /**
  * @function clickSelectArrowAndRetry
  * @memberOf ui5.common.userInteraction
  * @description Clicks the arrow icon at the passed selector (select box), and retries in case it fails.
  * @param {Object} selector - The selector describing the element
  * @param {Number} retries - The number of retries, can be set in config for all functions under params stepsRetries. Default is 3 times.
  * @param {Number} interval - The interval of the retries, can be set in config for all functions under params stepRetriesIntervals. Default is 5 secs..
  * @param {Number} index - The index of the selector, in case there are more than
  * one elements visible at the same time. By default, it takes 0.
  * @example await ui5.common.userInteraction.clickSelectArrowAndRetry(selector);
  */
  this.clickSelectArrowAndRetry = async function (selector, retries, interval, index = 0) {
    return await utilities.function.retry(this.clickSelectArrow, [selector, index], retries, interval, this);
  };

};
module.exports = new UserInteraction();