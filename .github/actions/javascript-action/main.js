const core = require("@actions/core");
const github = require("@actions/github");
const exec = require("@actions/exec");

const run = () => {
  // wyświetla wiadomość w logu
  core.notice("Hello, custom javascript action.");
};
run();
