import { Element } from "../../../../@types/wdio";
import { VerboseLoggerFactory } from "../../helper/verboseLogger";
import ErrorHandler from "../../helper/errorHandler";
/**
 * @class element
 * @memberof mobile
 */
export class ElementModule {
    private vlf = new VerboseLoggerFactory("mobile", "element");
    private ErrorHandler = new ErrorHandler();

    /**
   * @function isVisible
   * @memberOf mobile.element
   * @description Returns a boolean if the mobile element is visible to the user.
   * @param {Object} element - The Mobile Ui element.
   * @param {Boolean} [strict=true] - If strict mode is enabled it will only return "true" if the element is visible on the mobile view and within the viewport.
   * If "false", it will be sufficient if the element is visible on the view but not inside the current viewport.
   * @returns {Boolean} Returns true or false.
   * @example const elem = await mobile.element.isVisible("button01");
   * await mobile.element.isVisible(elem);
   */
  async isVisible(element: Element, strict: boolean = true): Promise<boolean> {
    const vl = this.vlf.initLog(this.isVisible);
    try {
      if (strict) {
        return element.isDisplayedInViewport();
      } else {
        return element.isDisplayed();
      }
    } catch (error) {
      return this.ErrorHandler.logException(error);
    }
  }

  /**
   * @function isPresent
   * @memberOf mobile.element
   * @description Returns a boolean if the element is present at the DOM or not. It might be hidden.
   * @param {Object} elem - The element.
   * @returns {Boolean} Returns true or false.
   * @example
   * await mobile.element.isPresent(elem);
   */
  async isPresent(element: Element): Promise<boolean> {
    const vl = this.vlf.initLog(this.isPresent);
    return element.isExisting();
  }

  /**
   * @function waitToBePresent
   * @memberOf mobile.element
   * @description Waits until the element with the given selector is present.
   * @param {Object} selector - The CSS selector describing the element.
   * @param {Number} [timeout=30000] - The timeout to wait (ms).
   * @example await mobile.element.waitToBePresent(".input01");
   * @example await mobile.element.waitToBePresent("#button12");
   * @example await mobile.element.waitToBePresent("p:first-child");
   */
  async waitToBePresent(selector: any, timeout: number = parseFloat(process.env.QMATE_CUSTOM_TIMEOUT!) || 30000): Promise<void> {
    const vl = this.vlf.initLog(this.waitToBePresent);
    try {
      vl.log(`wdio.waitForExist invocation for selector ${selector}`);
      await $(selector).waitForExist({ timeout: timeout });
    } catch (error) {
      this.ErrorHandler.logException(error);
    }
  }

   /**
   * @function waitToBeVisible
   * @memberOf mobile.element
   * @description Waits until the element with the given selector is visible.
   * @param {Object} selector - The CSS selector describing the element.
   * @param {Number} [timeout=30000] - The timeout to wait (ms).
   * @example await mobile.element.waitToBeVisible(".input01");
   * @example await mobile.element.waitToBeVisible("#button12");
   * @example await mobile.element.waitToBeVisible("p:first-child");
   */
   async waitToBeVisible(selector: any, timeout: number = parseFloat(process.env.QMATE_CUSTOM_TIMEOUT!) || 30000) {
    const vl = this.vlf.initLog(this.waitToBeVisible);
    try {
      vl.log(`wdio.waitForDisplayed invocation for selector ${selector}`);
      await $(selector).waitForDisplayed({ timeout: timeout });
    } catch (error) {
      this.ErrorHandler.logException(error);
    }
  }

  /**
   * @function waitToBeClickable
   * @memberOf mobile.element
   * @description Waits until the element with the given selector is clickable.
   * @param {Object} selector - The CSS selector describing the element.
   * @param {Number} [timeout=30000] - The timeout to wait (ms).
   * @example await mobile.element.waitToBeClickable(".input01");
   * @example await mobile.element.waitToBeClickable("#button12");
   * @example await mobile.element.waitToBeClickable("p:first-child");
   */
  async waitToBeClickable(selector: any, timeout: number = parseFloat(process.env.QMATE_CUSTOM_TIMEOUT!) || 30000) {
    const vl = this.vlf.initLog(this.waitToBeClickable);
    try {
      vl.log(`wdio.waitForClickable invocation for selector ${selector}`);
      await $(selector).waitForClickable({ timeout: timeout });
    } catch (error) {
      this.ErrorHandler.logException(error);
    }
  }

 /**
   * @function isSelected
   * @memberOf mobile.element
   * @description Returns a boolean if the element (e.g. checkbox) is selected.
   * @param {Object} elem - The element.
   * @returns {boolean}
   * @example const elem = await mobile.element.getById("elem01");
   * const isSelected = await mobile.element.isSelected(elem);
   */
 async isSelected(elem: Element): Promise<boolean> {
  const vl = this.vlf.initLog(this.isSelected);
  return elem.isSelected();
}

/**
   * @function selectOptionByText
   * @memberOf mobile.element
   * @description select option with displayed text matching the argument.
   * @param {Object} elems - The list of elements.
   * @param {String} text - The containing text value of the element.
   * @example const elem = await mobile.element.selectOptionByText("//android.widget.ListView", "Country");
   * 
   */
async selectOptionByText(elems: Element[], text: string) {
  const vl = this.vlf.initLog(this.selectOptionByText);

  try {
    if (elems.length === 0) {
      vl.log("No matching elements found");
      return;
    }
    //Iterate through the radio buttons
    for (const elem of elems) {
      // Get the visible text for each radio button
      const elementText = await elem.getText();
      if (elementText === text) {
        // Match the label text
        await elem.click(); // Select the radio button
        break; // Exit the loop after selecting the correct radio button
      }
    }
  } catch (error) {
    this.ErrorHandler.logException(new Error(), (error as Error).message);
  }
}

/**
   * @function selectOptionByIndex
   * @memberOf mobile.element
   * @description select option with index.
   * @param {Object} elems - The list of elements.
   * @param {Number} index - index of the element.
   * @example const elem = await mobile.element.selectOptionByIndex("//android.widget.ListView", 1);
   * 
   */
async selectOptionByIndex(elems: Element[], index: number) {
  const vl = this.vlf.initLog(this.selectOptionByIndex);

  try {
    if (elems.length === 0) {
      vl.log("No radio buttons found");
      return;
    }
    const elem = elems[index];
    await elem.click();
  } catch (error) {
    this.ErrorHandler.logException(new Error(), (error as Error).message);
  }
}
}
export default new ElementModule();