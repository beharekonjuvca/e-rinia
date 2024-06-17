const { Given, When, Then } = require("@cucumber/cucumber");
const { Builder, By, until } = require("selenium-webdriver");
const assert = require("assert");

Given("I am on the volunteer login page", async function () {
  this.driver = await new Builder().forBrowser("chrome").build();
  await this.driver.get("http://localhost:3000/volunteer-login");
});

When("I login with valid credentials", async function () {
  await this.driver
    .findElement(By.id("email"))
    .sendKeys("volunteer@example.com");
  await this.driver.findElement(By.id("password")).sendKeys("password");
  await this.driver.findElement(By.css('button[type="submit"]')).click();
});

Then("I should be redirected to the volunteer dashboard", async function () {
  await this.driver.wait(until.urlIs("http://localhost:3000/volunteer"), 10000);
  const url = await this.driver.getCurrentUrl();
  assert.strictEqual(url, "http://localhost:3000/volunteer");
});

When("I navigate to the organizations gallery", async function () {
  await this.driver.findElement(By.linkText("Organizations")).click();
});

Then("I should see a list of organizations", async function () {
  let elements = await this.driver.findElements(
    By.className("organization-card")
  );
  assert(elements.length > 0, "Organizations are not displayed");
});

When("I navigate to the events gallery", async function () {
  await this.driver.findElement(By.linkText("Events")).click();
});

Then("I should see a list of events", async function () {
  let elements = await this.driver.findElements(By.className("event-card"));
  assert(elements.length > 0, "Events are not displayed");
});
