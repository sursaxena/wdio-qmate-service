const locatorCommands = require("./utils/addLocatorCommands");
const authenticatorHandler = require("../reuse/authenticator/authHandler");
/**
 * Gets executed before test execution begins. At this point you can access to all global
 * variables like `browser`. It is the perfect place to define custom commands.
 * @param {Array.<Object>} capabilities list of capabilities details
 * @param {Array.<String>} specs        List of spec file paths that are to be run
 * @param {Object}         browser      instance of created browser/device session
 */
module.exports = async function (capabilities, specs, browser) {
  // Add ui control selector & properties
  await locatorCommands.addControlCommands();
  await locatorCommands.addGetControlProperties();
  await locatorCommands.addInBrowserHandling();

  // Add ui control binding information
  await locatorCommands.addGetBindingInfos();
  //Add authenticators
  await authenticatorHandler.attachAuthHandling();

};
