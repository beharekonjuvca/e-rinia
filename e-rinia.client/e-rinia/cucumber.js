module.exports = {
  default: {
    require: [
      "tests/step_definitions/**/*.js",
      "tests/support/**/*.js",
      "tests/features/**/*.js",
    ],
    format: ["json:tests/reports/cucumber_report.json"],
  },
};
