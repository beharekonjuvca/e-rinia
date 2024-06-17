const { Given, When, Then } = require("@cucumber/cucumber");
const { assert } = require("chai");
const { By } = require("selenium-webdriver");

Given("I am on the registration page", async function () {
  await this.driver.get("http://localhost:3000/register");
});

When("I enter valid registration details", async function () {
  await this.driver.findElement(By.id("name")).sendKeys("Jane Doe");
  await this.driver.findElement(By.id("email")).sendKeys("jane@example.com");
  await this.driver.findElement(By.id("password")).sendKeys("password123");
});

When("I enter an invalid email", async function () {
  await this.driver.findElement(By.id("email")).sendKeys("jane");
});

When("I submit the registration form", async function () {
  await this.driver.findElement(By.css("form")).submit();
});

Then("I should be redirected to the dashboard", async function () {
  const url = await this.driver.getCurrentUrl();
  assert.equal(url, "http://localhost:3000/dashboard");
});

Then("I should see a welcome message", async function () {
  const welcome = await this.driver
    .findElement(By.id("welcome-message"))
    .getText();
  assert.include(welcome, "Welcome, Jane");
});

Then("I should see an error message about invalid email", async function () {
  const error = await this.driver.findElement(By.css(".error")).getText();
  assert.include(error, "Invalid email");
});
