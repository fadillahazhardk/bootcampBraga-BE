const path = require("path");

module.exports = {
  public: {
    root: path.join(__dirname, "./../public"),
    prefix: "/",
  },
  assets: {
    root: path.join(__dirname, "./../public/assets"),
    prefix: "/assets",
    decorateReply: false,
  },
  forms: {
    root: path.join(__dirname, "./../public/forms"),
    prefix: "/forms",
    decorateReply: false,
  },
};
