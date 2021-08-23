var path = require("path");
var AuthHandler = function () {
  this.attachAuthHandling = async function () {
    const authConfig = require("./authConfig.js");
    if (browser.config.params && browser.config.params.auth) {
      const formType = browser.config.params.auth.formType;
      if (formType) {
        if (!authConfig[formType] || !authConfig[formType].name || !path.resolve(authConfig[formType].name)) {
          throw new Error(`Please provide a valid 'formType' instead of '${formType}'.`);
        }
        console.log(path.resolve(authConfig[formType].name));
        const execAuthenticator = require(authConfig[formType].name);
        await execAuthenticator();
      }
    }
  };
};
module.exports = new AuthHandler();
